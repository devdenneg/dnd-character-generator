import { apiClient } from "./client";
import type { Achievement } from "../data/achievements";

export interface UserAchievement {
  id: string;
  userId: string;
  achievementId: string;
  roomId?: string;
  givenBy?: string;
  earnedAt: string;
  giver?: {
    id: string;
    name: string | null;
    email: string;
  };
  // Данные из справочника
  name?: string;
  description?: string;
  category?: string;
  experience?: number;
  icon?: string;
}

export interface UserProgress {
  user: {
    id: string;
    name: string | null;
    email: string;
    experience: number;
    level: number;
  };
  achievements: UserAchievement[];
  progress: {
    currentLevel: number;
    experience: number;
    experienceToNextLevel: number;
    progressPercent: number;
    totalAchievements: number;
    availableAchievements: number;
  };
}

export interface RoomPlayerProgress {
  roomPlayerId: string;
  user: {
    id: string;
    name: string | null;
    email: string;
    experience: number;
    level: number;
  };
  character: {
    id: string;
    name: string;
  };
  achievements: UserAchievement[];
  progress: {
    currentLevel: number;
    experience: number;
    experienceToNextLevel: number;
    progressPercent: number;
    totalAchievements: number;
  };
}

export const achievementsApi = {
  // Получить все доступные достижения
  getAll: async (): Promise<{ achievements: Achievement[] }> => {
    const response = await apiClient.get("/achievements");
    return response.data;
  },

  // Получить достижения пользователя
  getUserAchievements: async (
    userId: string,
  ): Promise<{ achievements: UserAchievement[] }> => {
    const response = await apiClient.get(`/achievements/user/${userId}`);
    return response.data;
  },

  // Получить прогресс пользователя
  getUserProgress: async (userId: string): Promise<UserProgress> => {
    const response = await apiClient.get(
      `/achievements/user/${userId}/progress`,
    );
    return response.data;
  },

  // Выдать достижение (только мастер)
  grant: async (data: {
    userId: string;
    achievementId: string;
    roomId?: string;
  }): Promise<{
    userAchievement: UserAchievement;
    user: {
      id: string;
      experience: number;
      level: number;
    };
    levelUp: boolean;
    experienceGained: number;
  }> => {
    const response = await apiClient.post("/achievements/grant", data);
    return response.data;
  },

  // Получить прогресс всех игроков в комнате
  getRoomPlayersProgress: async (
    roomId: string,
  ): Promise<{ players: RoomPlayerProgress[] }> => {
    const response = await apiClient.get(
      `/achievements/room/${roomId}/progress`,
    );
    return response.data;
  },
};
