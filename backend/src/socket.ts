import { Server as SocketIOServer } from "socket.io";
import { Server as HTTPServer } from "http";
import jwt from "jsonwebtoken";
import prisma from "./db";

interface JWTPayload {
  userId: string;
  email: string;
  role: string;
}

export function initializeSocket(httpServer: HTTPServer) {
  const io = new SocketIOServer(httpServer, {
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

    // Присоединение к комнате
    socket.on("join-room", async (roomId: string) => {
      try {
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
