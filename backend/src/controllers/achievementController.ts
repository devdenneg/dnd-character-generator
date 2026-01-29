import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/authMiddleware";
import { AchievementService } from "../services/achievementService";
import { AchievementInput, AchievementUpdateInput, PlayerAchievementInput } from "../services/achievementService";
import { io } from "../socket";

/**
 * Создание новой ачивки
 */
export const createAchievement = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { roomId } = req.params;
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { name, description, icon, xpReward = 0 } = req.body as AchievementInput;

    const achievement = await AchievementService.createAchievement(roomId as string, userId, {
      name,
      description,
      icon,
      xpReward
    });

    return res.status(201).json(achievement);
  } catch (error: any) {
    if (error.message === "Only room master can create achievements") {
      return res.status(403).json({ error: error.message });
    }
    return res.status(400).json({ error: error.message });
  }
};

/**
 * Получение всех ачивок комнаты
 */
export const getRoomAchievements = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { roomId } = req.params;

    const achievements = await AchievementService.getRoomAchievements(roomId as string);
    return res.json(achievements);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};

/**
 * Получение одной ачивки комнаты
 */
export const getAchievement = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { roomId, achievementId } = req.params;

    const achievement = await AchievementService.getAchievement(achievementId as string, roomId as string);

    if (!achievement) {
      return res.status(404).json({ error: "Achievement not found" });
    }

    return res.json(achievement);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};

/**
 * Обновление ачивки
 */
export const updateAchievement = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { roomId, achievementId } = req.params;
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const updateData = req.body as AchievementUpdateInput;

    const achievement = await AchievementService.updateAchievement(achievementId as string, roomId as string, updateData);

    if (!achievement) {
      return res.status(404).json({ error: "Achievement not found" });
    }

    return res.json(achievement);
  } catch (error: any) {
    if (error.message === "Only room master can create achievements") {
      return res.status(403).json({ error: error.message });
    }
    return res.status(400).json({ error: error.message });
  }
};

/**
 * Удаление ачивки (мягкое удаление)
 */
export const deleteAchievement = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { roomId, achievementId } = req.params;
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const result = await AchievementService.deleteAchievement(achievementId as string, roomId as string);

    if (!result) {
      return res.status(404).json({ error: "Achievement not found" });
    }

    return res.json({ message: "Achievement deleted successfully" });
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};

/**
 * Выдача ачивки игроку
 */
export const grantAchievement = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { roomId } = req.params;
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const grantData = req.body as PlayerAchievementInput;

    const grantedAchievement = await AchievementService.grantAchievement(roomId as string, userId, {
      ...grantData,
      grantedById: userId
    });

    if (!grantedAchievement) {
      return res.status(400).json({ error: "Failed to grant achievement" });
    }

    // Отправляем уведомление игроку через WebSocket
    io.to(`user:${grantData.userId}`).emit("achievement-granted", {
      achievement: grantedAchievement.achievement,
      character: grantedAchievement.character,
      grantedAt: grantedAchievement.grantedAt
    });

    console.log(`🏆 Achievement granted to user ${grantData.userId}: ${grantedAchievement.achievement.name}`);

    return res.status(201).json(grantedAchievement);
  } catch (error: any) {
    if (error.message === "Only room master can grant achievements" ||
        error.message === "Achievement not found or does not belong to this room" ||
        error.message === "User is not a player in this room" ||
        error.message === "Cannot grant achievement to yourself") {
      return res.status(403).json({ error: error.message });
    }
    return res.status(400).json({ error: error.message });
  }
};

/**
 * Получение всех выданных ачивок пользователю
 */
export const getPlayerAchievements = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const achievements = await AchievementService.getPlayerAchievements(userId);
    return res.json(achievements);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};

/**
 * Получение всех выданных ачивок в комнате (только для мастера)
 */
export const getRoomPlayerAchievements = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { roomId } = req.params;
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const achievements = await AchievementService.getRoomPlayerAchievements(roomId as string, userId);
    return res.json(achievements);
  } catch (error: any) {
    if (error.message === "Only room master can get room player achievements") {
      return res.status(403).json({ error: error.message });
    }
    return res.status(400).json({ error: error.message });
  }
};