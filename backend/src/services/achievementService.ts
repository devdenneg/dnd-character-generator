import { PrismaClient } from "@prisma/client";
import { ACHIEVEMENT_ICONS, AchievementIcon } from "../types/achievement";

const prisma = new PrismaClient();

export interface AchievementInput {
  name: string;
  description: string;
  icon: AchievementIcon;
  xpReward?: number;
}

export interface AchievementUpdateInput {
  name?: string;
  description?: string;
  icon?: AchievementIcon;
  xpReward?: number;
}

export interface PlayerAchievementInput {
  achievementId: string;
  userId: string;
  characterId: string;
  grantedById?: string;
}

export interface AchievementWithStats {
  id: string;
  name: string;
  description: string;
  icon: AchievementIcon;
  xpReward: number;
  roomId: string;
  createdById: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  totalGiven: number; // Количество выданных экземпляров
}

export interface PlayerAchievementWithDetails {
  id: string;
  achievementId: string;
  userId: string;
  characterId: string | null;
  grantedById: string;
  grantedAt: Date;
  achievement: AchievementWithStats;
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
    roomId: string,
    createdByUserId: string,
    data: AchievementInput
  ): Promise<AchievementWithStats> {
    // Проверяем, что иконка допустима
    if (!ACHIEVEMENT_ICONS.includes(data.icon)) {
      throw new Error(`Invalid achievement icon: ${data.icon}`);
    }

    // Проверяем, что создатель является мастером комнаты
    const room = await prisma.room.findUnique({
      where: { id: roomId },
      include: { master: true }
    });

    if (!room || room.masterId !== createdByUserId) {
      throw new Error("Only room master can create achievements");
    }

    const achievement = await prisma.achievement.create({
      data: {
        ...data,
        roomId,
        createdById: createdByUserId,
      },
      select: {
        id: true,
        name: true,
        description: true,
        icon: true,
        xpReward: true,
        roomId: true,
        createdById: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
      }
    });

    // Возвращаем ачивку с количеством выданных экземпляров
    return {
      ...achievement,
      icon: achievement.icon as AchievementIcon,
      totalGiven: 0 // Сейчас еще никто не получил
    };
  }

  /**
   * Получение всех ачивок комнаты
   */
  static async getRoomAchievements(roomId: string): Promise<AchievementWithStats[]> {
    // Сначала получаем список ачивок
    const achievements = await prisma.achievement.findMany({
      where: {
        roomId,
        deletedAt: null,
      },
      select: {
        id: true,
        name: true,
        description: true,
        icon: true,
        xpReward: true,
        roomId: true,
        createdById: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
      }
    });

    // Получаем количество выданных для каждой ачивки
    const achievementsWithCounts = await Promise.all(
      achievements.map(async (ach) => {
        const count = await prisma.playerAchievement.count({
          where: { achievementId: ach.id }
        });

        return {
          ...ach,
          icon: ach.icon as AchievementIcon,
          totalGiven: count
        };
      })
    );

    return achievementsWithCounts;
  }

  /**
   * Получение ачивки по ID с подсчетом количества выданных экземпляров
   */
  static async getAchievement(
    achievementId: string,
    roomId: string
  ): Promise<AchievementWithStats | null> {
    const achievement = await prisma.achievement.findUnique({
      where: {
        id: achievementId,
        roomId,
        deletedAt: null,
      },
      select: {
        id: true,
        name: true,
        description: true,
        icon: true,
        xpReward: true,
        roomId: true,
        createdById: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
      }
    });

    if (!achievement) return null;

    const count = await prisma.playerAchievement.count({
      where: { achievementId }
    });

    return {
      ...achievement,
      icon: achievement.icon as AchievementIcon,
      totalGiven: count
    };
  }

  /**
   * Обновление ачивки
   */
  static async updateAchievement(
    achievementId: string,
    roomId: string,
    updatedData: AchievementUpdateInput
  ): Promise<AchievementWithStats | null> {
    // Проверяем, что обновляемая ачивка принадлежит комнате
    const existingAchievement = await prisma.achievement.findUnique({
      where: { id: achievementId, roomId },
    });

    if (!existingAchievement) {
      return null;
    }

    // Проверяем, что иконка допустима, если она передана
    if (updatedData.icon && !ACHIEVEMENT_ICONS.includes(updatedData.icon)) {
      throw new Error(`Invalid achievement icon: ${updatedData.icon}`);
    }

    const updatedAchievement = await prisma.achievement.update({
      where: { id: achievementId, roomId },
      data: {
        ...updatedData,
        updatedAt: new Date(),
      },
      select: {
        id: true,
        name: true,
        description: true,
        icon: true,
        xpReward: true,
        roomId: true,
        createdById: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
      }
    });

    // Возвращаем ачивку с количеством выданных экземпляров
    const count = await prisma.playerAchievement.count({
      where: { achievementId }
    });

    return {
      ...updatedAchievement,
      icon: updatedAchievement.icon as AchievementIcon,
      totalGiven: count
    };
  }

  /**
   * Мягкое удаление ачивки
   */
  static async deleteAchievement(
    achievementId: string,
    roomId: string
  ): Promise<boolean> {
    const result = await prisma.achievement.update({
      where: { id: achievementId, roomId },
      data: { deletedAt: new Date() },
    });

    return result !== null;
  }

  /**
   * Выдача ачивки игроку
   */
  static async grantAchievement(
    roomId: string,
    grantorId: string,
    data: PlayerAchievementInput
  ): Promise<PlayerAchievementWithDetails | null> {
    // Проверяем, что комнаты действительно существует и пользователь является мастером
    const room = await prisma.room.findUnique({
      where: { id: roomId },
      include: { master: true }
    });

    if (!room || room.masterId !== grantorId) {
      throw new Error("Only room master can grant achievements");
    }

    // Проверяем, что достижение принадлежит комнате
    const achievement = await prisma.achievement.findUnique({
      where: {
        id: data.achievementId,
        roomId,
        deletedAt: null
      }
    });

    if (!achievement) {
      throw new Error("Achievement not found or does not belong to this room");
    }

    // Проверяем, что пользователь является игроком этой комнаты
    const roomPlayer = await prisma.roomPlayer.findUnique({
      where: {
        roomId_userId: {
          roomId,
          userId: data.userId
        }
      },
      include: {
        character: true
      }
    });

    if (!roomPlayer) {
      throw new Error("User is not a player in this room");
    }

    // Проверяем, что персонаж принадлежит игроку
    if (roomPlayer.character.userId !== data.userId) {
      throw new Error("Character does not belong to this user");
    }

    // Проверяем, что пользователь не выдает себе ачивку
    if (grantorId === data.userId) {
      throw new Error("Cannot grant achievement to yourself");
    }

    // Создаем запись о выданной ачивке
    const playerAchievement = await prisma.playerAchievement.create({
      data: {
        achievementId: data.achievementId,
        userId: data.userId,
        characterId: data.characterId,
        grantedById: grantorId,
      },
      include: {
        character: true
      }
    });

    // Возвращаем полную информацию о выданной ачивке
    return {
      id: playerAchievement.id,
      achievementId: playerAchievement.achievementId,
      userId: playerAchievement.userId,
      characterId: playerAchievement.characterId,
      grantedById: playerAchievement.grantedById,
      grantedAt: playerAchievement.grantedAt,
      achievement: {
        ...achievement,
        icon: achievement.icon as AchievementIcon,
        totalGiven: 0 // Устанавливаем 0, так как мы не запрашиваем его здесь, а это общее количество
      },
      character: playerAchievement.character ? {
        id: playerAchievement.character.id,
        name: playerAchievement.character.name
      } : null
    };
  }

  /**
   * Получение всех выданных ачивок пользователю
   */
  static async getPlayerAchievements(userId: string): Promise<PlayerAchievementWithDetails[]> {
    const playerAchievements = await prisma.playerAchievement.findMany({
      where: { userId },
      include: {
        achievement: true,
        character: true
      },
      orderBy: {
        grantedAt: 'desc'
      }
    });

    return playerAchievements.map(pa => ({
      id: pa.id,
      achievementId: pa.achievementId,
      userId: pa.userId,
      characterId: pa.characterId,
      grantedById: pa.grantedById,
      grantedAt: pa.grantedAt,
      achievement: {
        ...pa.achievement,
        icon: pa.achievement.icon as AchievementIcon,
        totalGiven: 0 // Устанавливаем 0, так как мы не запрашиваем его здесь, а это общее количество
      },
      character: pa.character ? {
        id: pa.character.id,
        name: pa.character.name
      } : null
    }));
  }

  /**
   * Получение всех выданных ачивок в комнате (только для мастера)
   */
  static async getRoomPlayerAchievements(roomId: string, masterId: string): Promise<PlayerAchievementWithDetails[]> {
    // Сначала проверяем, что пользователь является мастером комнаты
    const room = await prisma.room.findUnique({
      where: { id: roomId },
      include: { master: true }
    });

    if (!room || room.masterId !== masterId) {
      throw new Error("Only room master can get room player achievements");
    }

    const playerAchievements = await prisma.playerAchievement.findMany({
      where: {
        achievement: { roomId }
      },
      include: {
        achievement: true,
        character: true
      },
      orderBy: {
        grantedAt: 'desc'
      }
    });

    return playerAchievements.map(pa => ({
      id: pa.id,
      achievementId: pa.achievementId,
      userId: pa.userId,
      characterId: pa.characterId,
      grantedById: pa.grantedById,
      grantedAt: pa.grantedAt,
      achievement: {
        ...pa.achievement,
        icon: pa.achievement.icon as AchievementIcon,
        totalGiven: 0 // Устанавливаем 0, так как мы не запрашиваем его здесь
      },
      character: pa.character ? {
        id: pa.character.id,
        name: pa.character.name
      } : null
    }));
  }
}
