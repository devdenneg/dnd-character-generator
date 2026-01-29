export interface ExperienceThreshold {
  level: number;
  experienceRequired: number;
  proficiencyBonus: number;
}

export const EXPERIENCE_THRESHOLDS: ExperienceThreshold[] = [
  { level: 1, experienceRequired: 0, proficiencyBonus: 2 },
  { level: 2, experienceRequired: 300, proficiencyBonus: 2 },
  { level: 3, experienceRequired: 900, proficiencyBonus: 2 },
  { level: 4, experienceRequired: 2700, proficiencyBonus: 2 },
  { level: 5, experienceRequired: 6500, proficiencyBonus: 3 },
  { level: 6, experienceRequired: 14000, proficiencyBonus: 3 },
  { level: 7, experienceRequired: 23000, proficiencyBonus: 3 },
  { level: 8, experienceRequired: 34000, proficiencyBonus: 3 },
  { level: 9, experienceRequired: 48000, proficiencyBonus: 4 },
  { level: 10, experienceRequired: 64000, proficiencyBonus: 4 },
  { level: 11, experienceRequired: 85000, proficiencyBonus: 4 },
  { level: 12, experienceRequired: 100000, proficiencyBonus: 4 },
  { level: 13, experienceRequired: 120000, proficiencyBonus: 5 },
  { level: 14, experienceRequired: 140000, proficiencyBonus: 5 },
  { level: 15, experienceRequired: 165000, proficiencyBonus: 5 },
  { level: 16, experienceRequired: 195000, proficiencyBonus: 5 },
  { level: 17, experienceRequired: 225000, proficiencyBonus: 6 },
  { level: 18, experienceRequired: 265000, proficiencyBonus: 6 },
  { level: 19, experienceRequired: 305000, proficiencyBonus: 6 },
  { level: 20, experienceRequired: 355000, proficiencyBonus: 6 }
];

export interface LevelUpResult {
  newLevel: number;
  leveledUp: boolean;
  experienceGained: number;
  featuresGained: string[];
  hitPointsIncrease: number;
}

export class LevelService {
  static calculateLevel(experience: number): number {
    // Find the highest level where experience is >= required
    for (let i = EXPERIENCE_THRESHOLDS.length - 1; i >= 0; i--) {
      if (experience >= EXPERIENCE_THRESHOLDS[i].experienceRequired) {
        return EXPERIENCE_THRESHOLDS[i].level;
      }
    }
    return 1;
  }

  static getExperienceForNextLevel(currentLevel: number): number {
    if (currentLevel >= 20) return 0;
    const nextLevel = currentLevel + 1;
    const threshold = EXPERIENCE_THRESHOLDS.find(t => t.level === nextLevel);
    return threshold ? threshold.experienceRequired : 0;
  }

  static calculateLevelUpProgress(experience: number, level: number): number {
    if (level >= 20) return 100;

    const currentLevelThreshold = EXPERIENCE_THRESHOLDS.find(t => t.level === level);
    const nextLevelThreshold = EXPERIENCE_THRESHOLDS.find(t => t.level === level + 1);

    if (!currentLevelThreshold || !nextLevelThreshold) return 0;

    const currentExp = experience - currentLevelThreshold.experienceRequired;
    const expNeeded = nextLevelThreshold.experienceRequired - currentLevelThreshold.experienceRequired;

    return Math.min(100, Math.max(0, (currentExp / expNeeded) * 100));
  }

  static checkLevelUp(currentLevel: number, currentExperience: number, experienceGained: number): LevelUpResult {
    const newTotalExperience = currentExperience + experienceGained;
    const newLevel = this.calculateLevel(newTotalExperience);

    const leveledUp = newLevel > currentLevel;
    const featuresGained: string[] = [];
    const hitPointsIncrease = leveledUp ? Math.floor(Math.random() * 12) + 1 : 0;

    // Calculate features gained for each level gained
    if (leveledUp) {
      for (let level = currentLevel + 1; level <= newLevel; level++) {
        featuresGained.push(`Уровень ${level}`);
      }
    }

    return {
      newLevel,
      leveledUp,
      experienceGained,
      featuresGained,
      hitPointsIncrease
    };
  }

  static getProficiencyBonus(level: number): number {
    const threshold = EXPERIENCE_THRESHOLDS.find(t => t.level === level);
    return threshold ? threshold.proficiencyBonus : 2;
  }
}