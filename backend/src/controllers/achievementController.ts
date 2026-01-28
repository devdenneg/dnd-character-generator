import { Request, Response } from "express";
import { z } from "zod";
import * as achievementService from "../services/achievementService";

// Получить все доступные достижения (справочник)
export async function listAchievements(req: Request, res: Response) {
  try {
    const achievements = achievementService.getAvailableAchievements();
    res.json({ achievements });
  } catch (error) {
    console.error("List achievements error:", error);
    res.status(500).json({ error: "Failed to fetch achievements" });
  }
}

// Получить достижения пользователя
export async function getUserAchievements(req: Request, res: Response) {
  try {
    const userId = req.params.userId;
    const achievements = await achievementService.getUserAchievements(userId);
    res.json({ achievements });
  } catch (error) {
    console.error("Get user achievements error:", error);
    res.status(500).json({ error: "Failed to fetch user achievements" });
  }
}

// Получить прогресс пользователя (опыт, уровень, достижения)
export async function getUserProgress(req: Request, res: Response) {
  try {
    const userId = req.params.userId;
    const progress = await achievementService.getUserProgress(userId);
    res.json(progress);
  } catch (error) {
    console.error("Get user progress error:", error);
    res.status(500).json({ error: "Failed to fetch user progress" });
  }
}

// Выдать достижение игроку (только для мастера в комнате)
const grantAchievementSchema = z.object({
  userId: z.string().uuid("Invalid user ID"),
  achievementId: z.string().min(1, "Achievement ID is required"),
  roomId: z.string().uuid("Invalid room ID").optional(),
});

export async function grantAchievement(req: Request, res: Response) {
  try {
    const validation = grantAchievementSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({
        error: "Validation failed",
        details: validation.error.errors,
      });
    }

    const { userId, achievementId, roomId } = validation.data;
    const giverId = req.user!.id;

    // Проверяем, является ли пользователь мастером
    if (req.user!.role !== "master") {
      return res
        .status(403)
        .json({ error: "Only masters can grant achievements" });
    }

    // Если указана комната, проверяем что мастер является владельцем
    if (roomId) {
      const prisma = (await import("../db")).default;
      const room = await prisma.room.findUnique({
        where: { id: roomId },
      });

      if (!room || room.masterId !== giverId) {
        return res
          .status(403)
          .json({ error: "You are not the master of this room" });
      }

      // Проверяем что пользователь в комнате
      const roomPlayer = await prisma.roomPlayer.findFirst({
        where: {
          roomId,
          userId,
        },
      });

      if (!roomPlayer) {
        return res.status(400).json({ error: "User is not in this room" });
      }
    }

    const result = await achievementService.grantAchievement(
      userId,
      achievementId,
      giverId,
      roomId,
    );

    res.json(result);
  } catch (error: any) {
    console.error("Grant achievement error:", error);

    if (error.message === "Achievement not found in registry") {
      return res.status(404).json({ error: error.message });
    }

    if (error.message === "User already has this achievement") {
      return res.status(409).json({ error: error.message });
    }

    res.status(500).json({ error: "Failed to grant achievement" });
  }
}

// Получить прогресс всех игроков в комнате (для мастера)
export async function getRoomPlayersProgress(req: Request, res: Response) {
  try {
    const roomId = req.params.roomId;
    const userId = req.user!.id;

    // Проверяем что пользователь - мастер этой комнаты
    const prisma = (await import("../db")).default;
    const room = await prisma.room.findUnique({
      where: { id: roomId },
    });

    if (!room) {
      return res.status(404).json({ error: "Room not found" });
    }

    if (room.masterId !== userId) {
      return res
        .status(403)
        .json({ error: "Only room master can view players progress" });
    }

    const playersProgress =
      await achievementService.getRoomPlayersProgress(roomId);
    res.json({ players: playersProgress });
  } catch (error) {
    console.error("Get room players progress error:", error);
    res.status(500).json({ error: "Failed to fetch players progress" });
  }
}
