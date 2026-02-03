// D&D 5e Calculation Utilities

/**
 * Calculate ability modifier from ability score
 * Formula: (score - 10) / 2, rounded down
 */
export function calculateModifier(score: number): number {
  return Math.floor((score - 10) / 2);
}

/**
 * Calculate proficiency bonus based on character level
 * Formula: ceil(level / 4) + 1
 */
export function calculateProficiencyBonus(level: number): number {
  return Math.ceil(level / 4) + 1;
}

/**
 * Calculate hit points for a character
 * @param level - Character level
 * @param hitDie - Hit die size (d6, d8, d10, d12)
 * @param conModifier - Constitution modifier
 * @returns Total hit points
 */
export function calculateHitPoints(
  level: number,
  hitDie: number,
  conModifier: number
): number {
  // First level: max hit die + CON modifier
  const firstLevelHP = hitDie + conModifier;

  // Additional levels: average of hit die + CON modifier per level
  const additionalLevels = level - 1;
  const avgHitDieRoll = Math.floor(hitDie / 2) + 1;
  const additionalHP = additionalLevels * (avgHitDieRoll + conModifier);

  return firstLevelHP + additionalHP;
}

/**
 * Format modifier with + or - sign
 */
export function formatModifier(mod: number): string {
  return mod >= 0 ? `+${mod}` : `${mod}`;
}

/**
 * Calculate spell save DC
 * Formula: 8 + proficiency bonus + spellcasting ability modifier
 */
export function calculateSpellSaveDC(
  proficiencyBonus: number,
  abilityModifier: number
): number {
  return 8 + proficiencyBonus + abilityModifier;
}

/**
 * Calculate spell attack bonus
 * Formula: proficiency bonus + spellcasting ability modifier
 */
export function calculateSpellAttackBonus(
  proficiencyBonus: number,
  abilityModifier: number
): number {
  return proficiencyBonus + abilityModifier;
}

/**
 * Calculate initiative
 * Formula: dexterity modifier
 */
export function calculateInitiative(dexModifier: number): number {
  return dexModifier;
}

/**
 * Calculate passive perception
 * Formula: 10 + wisdom modifier + proficiency bonus (if proficient)
 */
export function calculatePassivePerception(
  wisModifier: number,
  proficiencyBonus: number,
  isProficient: boolean
): number {
  return 10 + wisModifier + (isProficient ? proficiencyBonus : 0);
}
