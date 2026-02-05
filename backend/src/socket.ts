import { Server as HTTPServer } from "http";
import jwt from "jsonwebtoken";
import { Server as SocketIOServer } from "socket.io";
import prisma from "./db";

export let io: SocketIOServer;

interface JWTPayload {
  userId: string;
  email: string;
  role: string;
}

// Rate limiting для WebSocket событий
interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const eventRateLimits = new Map<string, RateLimitEntry>();
const MAX_EVENTS_PER_MINUTE = 50;
const RATE_LIMIT_WINDOW = 60000; // 1 минута

function checkRateLimit(socketId: string): boolean {
  const now = Date.now();
  const entry = eventRateLimits.get(socketId);

  if (!entry || now > entry.resetTime) {
    eventRateLimits.set(socketId, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW,
    });
    return true;
  }

  if (entry.count >= MAX_EVENTS_PER_MINUTE) {
    return false;
  }

  entry.count++;
  return true;
}

function cleanupRateLimits() {
  const now = Date.now();
  for (const [socketId, entry] of eventRateLimits.entries()) {
    if (now > entry.resetTime) {
      eventRateLimits.delete(socketId);
    }
  }
}

// Очистка каждые 5 минут
setInterval(cleanupRateLimits, 5 * 60 * 1000);

export function initializeSocket(httpServer: HTTPServer) {
  io = new SocketIOServer(httpServer, {
    cors: {
      origin: process.env.FRONTEND_URL || "http://localhost:5173",
      credentials: true,
    },
  });

  // Middleware для аутентификации
  io.use((socket, next) => {
    const token = socket.handshake.auth.token;

    if (!token) {
      return next(new Error("Authentication error"));
    }

    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || "your-secret-key",
      ) as JWTPayload;
      socket.data.userId = decoded.userId;
      socket.data.email = decoded.email;
      socket.data.role = decoded.role;
      next();
    } catch (err) {
      next(new Error("Authentication error"));
    }
  });

  io.on("connection", (socket) => {
    console.log(
      `🔌 User connected: ${socket.data.email} (${socket.data.userId})`,
    );

    // Присоединяем к личной комнате для уведомлений
    socket.join(`user:${socket.data.userId}`);

    // Middleware для rate limiting событий
    socket.use((packet, next) => {
      if (!checkRateLimit(socket.id)) {
        console.warn(
          `⚠️  Rate limit exceeded for ${socket.data.email}, disconnecting`,
        );
        socket.emit("error", {
          message: "Слишком много событий. Подключение будет разорвано.",
        });
        socket.disconnect(true);
        return;
      }
      next();
    });

    // Присоединение к комнате
    socket.on("join-room", async (roomId: string) => {
      try {
        // Валидация roomId
        if (!roomId || typeof roomId !== "string" || roomId.length > 100) {
          socket.emit("error", { message: "Некорректный ID комнаты" });
          return;
        }

        const room = await prisma.room.findUnique({
          where: { id: roomId },
          include: {
            master: { select: { id: true, name: true, email: true } },
            players: {
              include: {
                user: { select: { id: true, name: true, email: true } },
              },
            },
          },
        });

        if (!room) {
          socket.emit("error", { message: "Комната не найдена" });
          return;
        }

        // Join socket room
        socket.join(`room:${roomId}`);

        // Обновить статус игрока на online
        const player = room.players.find(
          (p) => p.userId === socket.data.userId,
        );
        if (player) {
          await prisma.roomPlayer.update({
            where: { id: player.id },
            data: { isOnline: true },
          });
        }

        // Уведомить всех в комнате о новом подключении
        const updatedPlayers = await prisma.roomPlayer.findMany({
          where: { roomId },
          include: {
            user: { select: { id: true, name: true, email: true } },
            character: {
              select: {
                id: true,
                name: true,
                data: true,
              },
            },
          },
        });

        io.to(`room:${roomId}`).emit("room-players-updated", {
          roomId,
          players: updatedPlayers,
        });

        console.log(`✅ User ${socket.data.email} joined room ${roomId}`);
      } catch (error) {
        console.error("Error joining room:", error);
        socket.emit("error", { message: "Ошибка при входе в комнату" });
      }
    });

    // Выход из комнаты
    socket.on("leave-room", async (roomId: string) => {
      try {
        // Валидация roomId
        if (!roomId || typeof roomId !== "string" || roomId.length > 100) {
          socket.emit("error", { message: "Некорректный ID комнаты" });
          return;
        }

        socket.leave(`room:${roomId}`);

        // Обновить статус игрока на offline
        await prisma.roomPlayer.updateMany({
          where: {
            roomId,
            userId: socket.data.userId,
          },
          data: { isOnline: false },
        });

        // Уведомить всех в комнате
        const updatedPlayers = await prisma.roomPlayer.findMany({
          where: { roomId },
          include: {
            user: { select: { id: true, name: true, email: true } },
            character: {
              select: {
                id: true,
                name: true,
                data: true,
              },
            },
          },
        });

        io.to(`room:${roomId}`).emit("room-players-updated", {
          roomId,
          players: updatedPlayers,
        });

        console.log(`👋 User ${socket.data.email} left room ${roomId}`);
      } catch (error) {
        console.error("Error leaving room:", error);
      }
    });

    // Отключение пользователя
    socket.on("disconnect", async () => {
      try {
        // Очистка rate limit для этого сокета
        eventRateLimits.delete(socket.id);
        // Найти все комнаты пользователя и установить offline
        const playerRooms = await prisma.roomPlayer.findMany({
          where: { userId: socket.data.userId },
          select: { roomId: true },
        });

        await prisma.roomPlayer.updateMany({
          where: { userId: socket.data.userId },
          data: { isOnline: false },
        });

        // Уведомить каждую комнату
        for (const { roomId } of playerRooms) {
          const updatedPlayers = await prisma.roomPlayer.findMany({
            where: { roomId },
            include: {
              user: { select: { id: true, name: true, email: true } },
              character: {
                select: {
                  id: true,
                  name: true,
                  data: true,
                },
              },
            },
          });

          io.to(`room:${roomId}`).emit("room-players-updated", {
            roomId,
            players: updatedPlayers,
          });
        }

        console.log(`❌ User disconnected: ${socket.data.email}`);
      } catch (error) {
        console.error("Error on disconnect:", error);
      }
    });
  });

  return io;
}
