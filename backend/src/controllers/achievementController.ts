import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/authMiddleware";
import { AchievementService } from "../services/achievementService";

export const getRoomAchievements = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  try {
    const achievements = await AchievementService.getAllAchievements();
    return res.json(achievements);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};

export const grantAchievement = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  try {
    const { roomId } = req.params;
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { achievementId, userId: targetUserId, characterId } = req.body;

    if (!achievementId || !targetUserId || !characterId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const grantedAchievement = await AchievementService.grantAchievement(
      achievementId,
      targetUserId,
      characterId,
      userId,
    );

    if (!grantedAchievement) {
      return res.status(400).json({ error: "Failed to grant achievement" });
    }

    console.log(
      `🏆 Achievement granted to user ${targetUserId}: ${grantedAchievement.achievement.name}`,
    );

    return res.status(201).json(grantedAchievement);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};

export const getPlayerAchievements = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
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

export const getRoomPlayerAchievements = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  try {
    const { roomId } = req.params;
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const achievements = await AchievementService.getRoomPlayerAchievements(
      roomId as string,
      userId,
    );
    return res.json(achievements);
  } catch (error: any) {
    if (error.message === "Only room master can get room player achievements") {
      return res.status(403).json({ error: error.message });
    }
    return res.status(400).json({ error: error.message });
  }
};
