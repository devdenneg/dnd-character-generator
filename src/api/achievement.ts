import { apiClient } from "./client";
import { Achievement, PlayerAchievement } from "../types/achievement";

export const achievementApi = {
  // Создание новой ачивки в комнате
  createAchievement: async (roomId: string, data: Omit<Achievement, 'id' | 'roomId' | 'createdById' | 'createdAt' | 'updatedAt'>) => {
    const response = await apiClient.post<Achievement>(`/achievements/rooms/${roomId}`, data);
    return response.data;
  },

  // Получение всех ачивок комнаты
  getRoomAchievements: async (roomId: string) => {
    const response = await apiClient.get<Achievement[]>(`/achievements/rooms/${roomId}`);
    return response.data;
  },

  // Получение одной ачивки комнаты
  getAchievement: async (roomId: string, achievementId: string) => {
    const response = await apiClient.get<Achievement>(`/achievements/rooms/${roomId}/achievements/${achievementId}`);
    return response.data;
  },

  // Обновление ачивки
  updateAchievement: async (roomId: string, achievementId: string, data: Partial<Omit<Achievement, 'id' | 'roomId' | 'createdById' | 'createdAt' | 'updatedAt'>>) => {
    const response = await apiClient.put<Achievement>(`/achievements/rooms/${roomId}/achievements/${achievementId}`, data);
    return response.data;
  },

  // Удаление ачивки (мягкое удаление)
  deleteAchievement: async (roomId: string, achievementId: string) => {
    const response = await apiClient.delete(`/achievements/rooms/${roomId}/achievements/${achievementId}`);
    return response.data;
  },

  // Выдача ачивки игроку
  grantAchievement: async (roomId: string, data: { achievementId: string; userId: string; characterId: string; grantedById: string }) => {
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