import { useState, useCallback } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { experienceAPI, ExperienceData, ExperienceUpdateResponse, ExperienceHistory } from '@/api/experience';
import { toast } from 'sonner';

export function useExperience(characterId: string) {
  const queryClient = useQueryClient();

  // Получение прогресса уровня
  const { data: progress, isLoading: isLoadingProgress } = useQuery({
    queryKey: ['experience', characterId],
    queryFn: () => experienceAPI.getProgress(characterId),
    enabled: !!characterId,
  });

  // Получение истории опыта
  const { data: history, isLoading: isLoadingHistory } = useQuery({
    queryKey: ['experienceHistory', characterId],
    queryFn: () => experienceAPI.getLevelHistory(characterId),
    enabled: !!characterId,
  });

  // Добавление опыта
  const addExperience = useMutation({
    mutationFn: (data: ExperienceData) => experienceAPI.addExperience(characterId, data),
    onSuccess: (response) => {
      // Инвалидируем кэш прогресса
      queryClient.invalidateQueries({ queryKey: ['experience', characterId] });

      if (response.leveledUp) {
        toast.success(`🎉 Персонаж достиг ${response.newLevel} уровня!`, {
          description: `Получено ${response.experienceGained} опыта`,
        });
      } else {
        toast.success(`+${response.experienceGained} опыта`, {
          description: `Всего опыта: ${response.totalExperience}`,
        });
      }
    },
    onError: (error: any) => {
      toast.error('Ошибка при добавлении опыта', {
        description: error.response?.data?.error || 'Попробуйте еще раз',
      });
    },
  });

  // Функция для тестирования добавления опыта
  const testAddExperience = useCallback((amount: number, source: ExperienceData['source'] = 'quest') => {
    addExperience.mutate({
      experience: amount,
      source,
      reason: 'Тестовое добавление опыта',
    });
  }, [addExperience]);

  return {
    progress,
    history,
    isLoading: isLoadingProgress || isLoadingHistory,
    addExperience,
    testAddExperience,
  };
}