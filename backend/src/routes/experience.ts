import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import { prisma } from '../db';

const router = Router();

// Типы данных
interface ExperienceData {
  experience: number;
  source: 'battle' | 'quest' | 'discovery' | 'roleplay' | 'dm_award' | 'treasure' | 'achievement';
  reason?: string;
}

interface ExperienceUpdateResponse {
  success: boolean;
  newLevel?: number;
  leveledUp: boolean;
  experienceGained: number;
  totalExperience: number;
}

// Добавить опыт персонажу
router.post('/characters/:id/experience', authMiddleware, async (req, res) => {
  try {
    const characterId = req.params.id;
    const userId = req.user.id;
    const { experience, source, reason }: ExperienceData = req.body;

    // Валидация
    if (!experience || experience <= 0) {
      return res.status(400).json({ error: 'Количество опыта должно быть положительным числом' });
    }

    if (experience > 10000) {
      return res.status(400).json({ error: 'Максимальное количество опыта за одно действие - 10000' });
    }

    // Проверка, что персонаж принадлежит пользователю
    const character = await prisma.character.findFirst({
      where: {
        id: characterId,
        userId: userId
      }
    });

    if (!character) {
      return res.status(404).json({ error: 'Персонаж не найден' });
    }

    // Получение текущего уровня и опыта
    const currentLevel = character.data.level || 1;
    const currentExperience = character.data.experience || 0;
    const newTotalExperience = currentExperience + experience;

    // Обновление персонажа
    const updatedCharacter = await prisma.character.update({
      where: { id: characterId },
      data: {
        data: {
          ...character.data,
          experience: newTotalExperience,
          level: calculateLevel(newTotalExperience)
        }
      }
    });

    // Логируем историю опыта
    await prisma.characterExperience.create({
      data: {
        characterId,
        userId,
        experience,
        source,
        reason,
        levelBefore: currentLevel,
        levelAfter: updatedCharacter.data.level || 1
      }
    });

    const response: ExperienceUpdateResponse = {
      success: true,
      newLevel: updatedCharacter.data.level,
      leveledUp: updatedCharacter.data.level > currentLevel,
      experienceGained: experience,
      totalExperience: newTotalExperience
    };

    res.json(response);
  } catch (error) {
    console.error('Error adding experience:', error);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
});

// Получить прогресс уровня персонажа
router.get('/characters/:id/experience', authMiddleware, async (req, res) => {
  try {
    const characterId = req.params.id;
    const userId = req.user.id;

    const character = await prisma.character.findFirst({
      where: {
        id: characterId,
        userId: userId
      }
    });

    if (!character) {
      return res.status(404).json({ error: 'Персонаж не найден' });
    });

    const level = character.data.level || 1;
    const experience = character.data.experience || 0;
    const nextLevelExp = getExperienceForNextLevel(level);

    res.json({
      level,
      experience,
      nextLevelExp,
      progress: calculateLevelUpProgress(experience, level)
    });
  } catch (error) {
    console.error('Error getting experience:', error);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
});

// Получить историю повышения уровня
router.get('/characters/:id/level-history', authMiddleware, async (req, res) => {
  try {
    const characterId = req.params.id;
    const userId = req.user.id;

    const history = await prisma.characterExperience.findMany({
      where: {
        characterId,
        userId
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 50
    });

    res.json(history);
  } catch (error) {
    console.error('Error getting level history:', error);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
});

// Вспомогательные функции
function calculateLevel(experience: number): number {
  const thresholds = [0, 300, 900, 2700, 6500, 14000, 23000, 34000, 48000, 64000, 85000, 100000, 120000, 140000, 165000, 195000, 225000, 265000, 305000, 355000];

  for (let i = thresholds.length - 1; i >= 0; i--) {
    if (experience >= thresholds[i]) {
      return i;
    }
  }
  return 1;
}

function getExperienceForNextLevel(currentLevel: number): number {
  if (currentLevel >= 19) return 0;
  const thresholds = [0, 300, 900, 2700, 6500, 14000, 23000, 34000, 48000, 64000, 85000, 100000, 120000, 140000, 165000, 195000, 225000, 265000, 305000, 355000];
  return thresholds[currentLevel + 1] || 0;
}

function calculateLevelUpProgress(experience: number, level: number): number {
  if (level >= 19) return 100;

  const currentThreshold = getThresholdForLevel(level);
  const nextThreshold = getThresholdForLevel(level + 1);
  const expNeeded = nextThreshold - currentThreshold;
  const currentExp = experience - currentThreshold;

  return Math.min(100, Math.max(0, (currentExp / expNeeded) * 100));
}

function getThresholdForLevel(level: number): number {
  const thresholds = [0, 300, 900, 2700, 6500, 14000, 23000, 34000, 48000, 64000, 85000, 100000, 120000, 140000, 165000, 195000, 225000, 265000, 305000, 355000];
  return thresholds[level] || 0;
}

export default router;