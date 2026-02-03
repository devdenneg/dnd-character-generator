// Character Creation Validation Utilities

import type {
  Race,
  CharacterClass,
  AbilityScores,
  Equipment,
} from '@/types/character';

/**
 * Validate race selection
 */
export function validateRaceSelection(race: Race | null): boolean {
  return race !== null;
}

/**
 * Validate class selection
 */
export function validateClassSelection(cls: CharacterClass | null): boolean {
  return cls !== null;
}

/**
 * Validate skill selection
 * @param selectedSkills - All selected skills
 * @param requiredCount - Number of class skills required
 * @param backgroundSkills - Skills from background (don't count toward class requirement)
 */
export function validateSkillSelection(
  selectedSkills: string[],
  requiredCount: number,
  backgroundSkills: string[]
): boolean {
  const classSkills = selectedSkills.filter(
    skill => !backgroundSkills.includes(skill)
  );
  return classSkills.length >= requiredCount;
}

/**
 * Validate ability scores based on generation method
 */
export function validateAbilityScores(
  scores: AbilityScores,
  method: 'standard' | 'pointbuy' | 'roll'
): boolean {
  const values = Object.values(scores);

  // All scores must be between 1 and 30
  if (values.some(score => score < 1 || score > 30)) {
    return false;
  }

  if (method === 'standard') {
    // Standard array: [15, 14, 13, 12, 10, 8]
    const standardArray = [15, 14, 13, 12, 10, 8];
    const sortedScores = [...values].sort((a, b) => b - a);
    return sortedScores.every((score, idx) => score === standardArray[idx]);
  }

  if (method === 'pointbuy') {
    // Point buy: scores between 8-15, total cost = 27 points
    if (values.some(score => score < 8 || score > 15)) {
      return false;
    }
    const totalCost = values.reduce((sum, score) => sum + getPointBuyCost(score), 0);
    return totalCost === 27;
  }

  // Roll: any valid scores (already checked above)
  return true;
}

/**
 * Get point buy cost for a score
 */
function getPointBuyCost(score: number): number {
  const costs: Record<number, number> = {
    8: 0,
    9: 1,
    10: 2,
    11: 3,
    12: 4,
    13: 5,
    14: 7,
    15: 9,
  };
  return costs[score] ?? 0;
}

/**
 * Validate equipment selection
 * @returns Object with validation result and error messages
 */
export function validateEquipment(
  equipment: Equipment[],
  _characterClass: CharacterClass | null
): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Must have at least one gear pack
  const hasGearPack = equipment.some(item => item.category === 'gear' || item.category === 'pack');
  if (!hasGearPack) {
    errors.push('Требуется набор снаряжения');
  }

  // Class-specific requirements could be added here
  // For example: Fighter must have a weapon, etc.

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Validate spell selection for spellcasters
 */
export function validateSpellSelection(
  cantripsKnown: number,
  spellsKnown: number,
  requiredCantrips: number,
  requiredSpells: number
): boolean {
  return cantripsKnown >= requiredCantrips && spellsKnown >= requiredSpells;
}

/**
 * Validate character name
 */
export function validateCharacterName(name: string): boolean {
  return name.trim().length > 0 && name.trim().length <= 100;
}
