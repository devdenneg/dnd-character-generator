import prisma from "../db";
import {
  ACHIEVEMENTS,
  calculateLevel,
  experienceForLevel,
} from "../../../src/data/achievements";

export async function getUserAchievements(userId: string) {
  const achievements = await prisma.userAchievement.findMany({
    where: { userId },
    include: {
      giver: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
    orderBy: { earnedAt: "desc" },
  });

  // Обогащаем данные из справочника
  return achievements.map((ua) => {
    const achievementData = ACHIEVEMENTS.find((a) => a.id === ua.achievementId);
    return {
      ...ua,
      ...achievementData,
    };
  });
}

export async function grantAchievement(
  userId: string,
  achievementId: string,
  giverId: string,
  roomId?: string,
) {
  // Проверяем, существует ли ачивка в справочнике
  const achievementData = ACHIEVEMENTS.find((a) => a.id === achievementId);
  if (!achievementData) {
    throw new Error("Achievement not found in registry");
  }

  // Проверяем, не получал ли пользователь эту ачивку ранее
  const existing = await prisma.userAchievement.findUnique({
    where: {
      userId_achievementId: {
        userId,
        achievementId,
      },
    },
  });

  if (existing) {
    throw new Error("User already has this achievement");
  }

  // Создаём запись о полученной ачивке
  const userAchievement = await prisma.userAchievement.create({
    data: {
      userId,
      achievementId,
      givenBy: giverId,
      roomId,
    },
    include: {
      giver: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  // Обновляем опыт пользователя
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { experience: true, level: true },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const newExperience = user.experience + achievementData.experience;
  const newLevel = calculateLevel(newExperience);

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: {
      experience: newExperience,
      level: newLevel,
    },
  });

  return {
    userAchievement: {
      ...userAchievement,
      ...achievementData,
    },
    user: updatedUser,
    levelUp: newLevel > user.level,
    experienceGained: achievementData.experience,
  };
}

export async function getUserProgress(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      experience: true,
      level: true,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const achievements = await getUserAchievements(userId);

  const currentLevelExp = experienceForLevel(user.level);
  const nextLevelExp = experienceForLevel(user.level + 1);
  const progress =
    ((user.experience - currentLevelExp) / (nextLevelExp - currentLevelExp)) *
    100;

  return {
    user,
    achievements,
    progress: {
      currentLevel: user.level,
      experience: user.experience,
      experienceToNextLevel: nextLevelExp - user.experience,
      progressPercent: Math.min(100, Math.max(0, progress)),
      totalAchievements: achievements.length,
      availableAchievements: ACHIEVEMENTS.length,
    },
  };
}

export async function getRoomPlayersProgress(roomId: string) {
  const roomPlayers = await prisma.roomPlayer.findMany({
    where: { roomId },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          experience: true,
          level: true,
        },
      },
      character: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  const playersWithProgress = await Promise.all(
    roomPlayers.map(async (rp) => {
      const achievements = await getUserAchievements(rp.user.id);
      const currentLevelExp = experienceForLevel(rp.user.level);
      const nextLevelExp = experienceForLevel(rp.user.level + 1);
      const progress =
        ((rp.user.experience - currentLevelExp) /
          (nextLevelExp - currentLevelExp)) *
        100;

      return {
        roomPlayerId: rp.id,
        user: rp.user,
        character: rp.character,
        achievements,
        progress: {
          currentLevel: rp.user.level,
          experience: rp.user.experience,
          experienceToNextLevel: nextLevelExp - rp.user.experience,
          progressPercent: Math.min(100, Math.max(0, progress)),
          totalAchievements: achievements.length,
        },
      };
    }),
  );

  return playersWithProgress;
}

export function getAvailableAchievements() {
  return ACHIEVEMENTS;
}
