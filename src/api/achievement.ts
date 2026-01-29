import { apiClient } from "./client";
import { Achievement, PlayerAchievement } from "../types/achievement";

export const achievementApi = {
  // Получение всех ачивок комнаты
  getRoomAchievements: async (roomId: string) => {
    const response = await apiClient.get<Achievement[]>(`/achievements/rooms/${roomId}`);
    return response.data;
  },

  // Выдача ачивки игроку
  grantAchievement: async (roomId: string, data: { achievementId: string; userId: string; characterId: string }) => {
    const response = await apiClient.post<PlayerAchievement>(`/achievements/rooms/${roomId}/grant`, data);
    return response.data;
  },

  // Получение всех ачивок пользователя
  getPlayerAchievements: async () => {
    const response = await apiClient.get<PlayerAchievement[]>(`/achievements/me/achievements`);
    return response.data;
  },

  // Получение всех выданных ачивок в комнате (только для мастера)
  getRoomPlayerAchievements: async (roomId: string) => {
    const response = await apiClient.get<PlayerAchievement[]>(`/achievements/rooms/${roomId}/player-achievements`);
    return response.data;
  }
};