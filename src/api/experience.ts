import { api } from './client';

export interface ExperienceData {
  experience: number;
  source: 'battle' | 'quest' | 'discovery' | 'roleplay' | 'dm_award' | 'treasure' | 'achievement';
  reason?: string;
}

export interface ExperienceUpdateResponse {
  success: boolean;
  newLevel?: number;
  leveledUp: boolean;
  experienceGained: number;
  totalExperience: number;
}

export interface ExperienceHistory {
  id: string;
  characterId: string;
  userId: string;
  experience: number;
  source: string;
  reason?: string;
  levelBefore: number;
  levelAfter: number;
  createdAt: string;
}

export const experienceAPI = {
  // Добавить опыт персонажу
  addExperience: async (
    characterId: string,
    experienceData: ExperienceData
  ): Promise<ExperienceUpdateResponse> => {
    const response = await api.post(`/characters/${characterId}/experience`, experienceData);
    return response.data;
  },

  // Получить текущий прогресс уровня персонажа
  getProgress: async (characterId: string) => {
    const response = await api.get(`/characters/${characterId}/experience`);
    return response.data;
  },

  // Получить историю повышения уровня
  getLevelHistory: async (characterId: string): Promise<ExperienceHistory[]> => {
    const response = await api.get(`/characters/${characterId}/level-history`);
    return response.data;
  },

  // Добавить опыт через комнату (для Мастера)
  addExperienceInRoom: async (
    roomId: string,
    characterId: string,
    experienceData: ExperienceData
  ) => {
    const response = await api.post(`/rooms/${roomId}/players/${characterId}/experience`, experienceData);
    return response.data;
  },

  // Массовое добавление опыта (для Мастера)
  addExperienceToMultiple: async (
    roomId: string,
    playerIds: string[],
    experienceData: ExperienceData
  ) => {
    const response = await api.post(`/rooms/${roomId}/experience/broadcast`, {
      ...experienceData,
      playerIds
    });
    return response.data;
  }
};