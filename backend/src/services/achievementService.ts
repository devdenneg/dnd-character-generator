import prisma from "../db";
import { ACHIEVEMENT_ICONS, AchievementIcon } from "../types/achievement";

export interface AchievementInput {
  name: string;
  description: string;
  icon: AchievementIcon;
  category: string;
  rarity: string;
  xpReward?: number;
}

export interface AchievementWithStats {
  id: string;
  key: string;
  name: string;
  description: string;
  icon: AchievementIcon;
  category: string;
  xpReward: number;
  rarity: string;
  createdAt: Date;
  totalGiven: number;
}

export interface PlayerAchievementWithDetails {
  id: string;
  achievementId: string;
  userId: string;
  characterId: string | null;
  grantedById: string;
  grantedAt: Date;
  achievement: {
    id: string;
    key: string;
    name: string;
    description: string;
    icon: AchievementIcon;
    category: string;
    xpReward: number;
    rarity: string;
  };
  character: {
    id: string;
    name: string;
  } | null;
}

export class AchievementService {
  /**
   * Создание новой ачивки
   */
  static async createAchievement(
    data: AchievementInput
  ): Promise<AchievementWithStats> {
    if (!ACHIEVEMENT_ICONS.includes(data.icon)) {
      throw new Error(`Invalid achievement icon: ${data.icon}`);
    }

    // Генерируем уникальный ключ из названия
    const key = data.name.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '');

    const achievement = await prisma.achievement.create({
      data: {
        key,
        name: data.name,
        description: data.description,
        icon: data.icon,
        category: data.category,
        rarity: data.rarity,
        xpReward: data.xpReward || 0,
      },
    });

    return {
      ...achievement,
      icon: achievement.icon as AchievementIcon,
      totalGiven: 0
    };
  }

  /**
   * Получение всех ачивок
   */
  static async getAllAchievements(): Promise<AchievementWithStats[]> {
    const achievements = await prisma.achievement.findMany({
      orderBy: { createdAt: "desc" },
    });

    const achievementsWithCounts = await Promise.all(
      achievements.map(async (ach) => {
        const count = await prisma.playerAchievement.count({
          where: { achievementId: ach.id },
        });

        return {
          ...ach,
          icon: ach.icon as AchievementIcon,
          totalGiven: count,
        };
      }),
    );

    return achievementsWithCounts;
  }

  /**
   * Получение ачивки по ID
   */
  static async getAchievement(
    achievementId: string,
  ): Promise<AchievementWithStats | null> {
    const achievement = await prisma.achievement.findUnique({
      where: { id: achievementId },
    });

    if (!achievement) return null;

    const count = await prisma.playerAchievement.count({
      where: { achievementId: achievement.id },
    });

    return {
      ...achievement,
      icon: achievement.icon as AchievementIcon,
      totalGiven: count,
    };
  }

  /**
   * Выдача ачивки игроку
   */
  static async grantAchievement(
    achievementId: string,
    userId: string,
    characterId: string,
    grantedById: string,
  ): Promise<PlayerAchievementWithDetails | null> {
    const achievement = await prisma.achievement.findUnique({
      where: { id: achievementId },
    });

    if (!achievement) {
      throw new Error("Achievement not found");
    }

    const playerAchievement = await prisma.playerAchievement.create({
      data: {
        achievementId,
        userId,
        characterId,
        grantedById,
      },
      include: {
        character: {
          select: {
            id: true,
            name: true,
          },
        },
        achievement: true,
      },
    });

    return {
      id: playerAchievement.id,
      achievementId: playerAchievement.achievementId,
      userId: playerAchievement.userId,
      characterId: playerAchievement.characterId,
      grantedById: playerAchievement.grantedById,
      grantedAt: playerAchievement.grantedAt,
      achievement: {
        id: playerAchievement.achievement.id,
        key: playerAchievement.achievement.key,
        name: playerAchievement.achievement.name,
        description: playerAchievement.achievement.description,
        icon: playerAchievement.achievement.icon as AchievementIcon,
        category: playerAchievement.achievement.category,
        xpReward: playerAchievement.achievement.xpReward,
        rarity: playerAchievement.achievement.rarity,
      },
      character: playerAchievement.character,
    };
  }

  /**
   * Получение всех ачивок игрока
   */
  static async getPlayerAchievements(
    userId: string,
  ): Promise<PlayerAchievementWithDetails[]> {
    const playerAchievements = await prisma.playerAchievement.findMany({
      where: { userId },
      include: {
        achievement: true,
        character: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: { grantedAt: "desc" },
    });

    return playerAchievements.map((pa) => ({
      id: pa.id,
      achievementId: pa.achievementId,
      userId: pa.userId,
      characterId: pa.characterId,
      grantedById: pa.grantedById,
      grantedAt: pa.grantedAt,
      achievement: {
        id: pa.achievement.id,
        key: pa.achievement.key,
        name: pa.achievement.name,
        description: pa.achievement.description,
        icon: pa.achievement.icon as AchievementIcon,
        category: pa.achievement.category,
        xpReward: pa.achievement.xpReward,
        rarity: pa.achievement.rarity,
      },
      character: pa.character,
    }));
  }

  /**
   * Получение всех выданных ачивок в комнате
   */
  static async getRoomPlayerAchievements(
    roomId: string,
    requestingUserId: string,
  ): Promise<PlayerAchievementWithDetails[]> {
    // Проверяем, что пользователь - мастер комнаты
    const room = await prisma.room.findUnique({
      where: { id: roomId },
      include: {
        players: true,
      },
    });

    if (!room || room.masterId !== requestingUserId) {
      throw new Error("Only room master can get room player achievements");
    }

    // Получаем всех игроков комнаты
    const playerIds = room.players.map((p) => p.userId);

    // Получаем ачивки этих игроков
    const playerAchievements = await prisma.playerAchievement.findMany({
      where: {
        userId: { in: playerIds },
      },
      include: {
        achievement: true,
        character: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: { grantedAt: "desc" },
    });

    return playerAchievements.map((pa) => ({
      id: pa.id,
      achievementId: pa.achievementId,
      userId: pa.userId,
      characterId: pa.characterId,
      grantedById: pa.grantedById,
      grantedAt: pa.grantedAt,
      achievement: {
        id: pa.achievement.id,
        key: pa.achievement.key,
        name: pa.achievement.name,
        description: pa.achievement.description,
        icon: pa.achievement.icon as AchievementIcon,
        category: pa.achievement.category,
        xpReward: pa.achievement.xpReward,
        rarity: pa.achievement.rarity,
      },
      character: pa.character,
    }));
  }
}
