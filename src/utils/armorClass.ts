// Armor Class Calculation Utilities

import type { Equipment } from '@/types/character';

/**
 * Calculate armor class based on armor, dexterity, and shield
 */
export function calculateArmorClass(
  baseAC: number,
  dexModifier: number,
  armor: Equipment | null,
  hasShield: boolean
): number {
  let ac = baseAC;

  if (armor?.armorClass) {
    ac = calculateArmorWithDex(armor, dexModifier);
  } else {
    // No armor: 10 + DEX modifier
    ac = 10 + dexModifier;
  }

  // Add shield bonus (+2 AC)
  if (hasShield) {
    ac += 2;
  }

  return ac;
}

/**
 * Calculate AC for specific armor type with dexterity modifier
 */
function calculateArmorWithDex(armor: Equipment, dexModifier: number): number {
  const baseAC = armor.armorClass || 10;

  switch (armor.armorType) {
    case 'light':
      // Light armor: base AC + full DEX modifier
      return baseAC + dexModifier;

    case 'medium':
      // Medium armor: base AC + DEX modifier (max +2)
      return baseAC + Math.min(dexModifier, armor.maxDexBonus ?? 2);

    case 'heavy':
      // Heavy armor: base AC only (no DEX modifier)
      return baseAC;

    case 'shield':
      // Shield adds +2 to AC (handled separately)
      return baseAC;

    default:
      return baseAC;
  }
}

/**
 * Check if character has a shield equipped
 */
export function hasShieldEquipped(equipment: Equipment[]): boolean {
  return equipment.some(item => item.armorType === 'shield');
}

/**
 * Get equipped armor (excluding shield)
 */
export function getEquippedArmor(equipment: Equipment[]): Equipment | null {
  return equipment.find(item =>
    item.category === 'armor' && item.armorType !== 'shield'
  ) || null;
}
