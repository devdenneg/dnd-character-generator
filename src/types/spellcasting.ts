// Spellcasting Types for D&D Character Generator

import type { AbilityName } from './character';

/**
 * Spellcasting configuration for a class
 */
export interface SpellcastingConfig {
  ability: AbilityName;
  cantripsKnown: number[];
  spellsKnown?: number[];
  spellSlots: number[][];
}

/**
 * Spell slots by level (1-9)
 */
export interface SpellSlots {
  level1: number;
  level2: number;
  level3: number;
  level4: number;
  level5: number;
  level6: number;
  level7: number;
  level8: number;
  level9: number;
}

/**
 * Warlock pact magic slots
 */
export interface WarlockSlot {
  slots: number;
  level: number;
}

/**
 * Spellcasting statistics for character sheet
 */
export interface SpellcastingStats {
  ability: AbilityName | null;
  abilityModifier: number;
  spellSaveDC: number;
  spellAttackBonus: number;
  spellSlots: SpellSlots;
  cantripsKnown: number;
  spellsKnown: number;
}

/**
 * Caster type classification
 */
export type CasterType = 'full' | 'half' | 'third' | 'warlock' | 'none';

/**
 * Spell school types
 */
export type SpellSchool =
  | 'Abjuration'
  | 'Conjuration'
  | 'Divination'
  | 'Enchantment'
  | 'Evocation'
  | 'Illusion'
  | 'Necromancy'
  | 'Transmutation';

/**
 * Spell component types
 */
export interface SpellComponents {
  verbal: boolean;
  somatic: boolean;
  material: boolean;
  materialDescription?: string;
}

/**
 * Helper to parse spell components string
 */
export function parseSpellComponents(components: string): SpellComponents {
  return {
    verbal: components.includes('V'),
    somatic: components.includes('S'),
    material: components.includes('M'),
    materialDescription: components.match(/M \(([^)]+)\)/)?.[1],
  };
}
