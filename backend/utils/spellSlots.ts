/**
 * Standard D&D 5e spell slot progression tables
 * Based on caster type (FULL, HALF, THIRD, PACT)
 */

export type CasterType = 'FULL' | 'HALF' | 'THIRD' | 'PACT' | 'NONE';

interface SpellSlotEntry {
  level: number;
  slots: number[];  // Index 0 = 1st level, Index 8 = 9th level
}

// Full casters: Bard, Cleric, Druid, Sorcerer, Wizard
const FULL_CASTER_SLOTS: SpellSlotEntry[] = [
  { level: 1, slots: [2, 0, 0, 0, 0, 0, 0, 0, 0] },
  { level: 2, slots: [3, 0, 0, 0, 0, 0, 0, 0, 0] },
  { level: 3, slots: [4, 2, 0, 0, 0, 0, 0, 0, 0] },
  { level: 4, slots: [4, 3, 0, 0, 0, 0, 0, 0, 0] },
  { level: 5, slots: [4, 3, 2, 0, 0, 0, 0, 0, 0] },
  { level: 6, slots: [4, 3, 3, 0, 0, 0, 0, 0, 0] },
  { level: 7, slots: [4, 3, 3, 1, 0, 0, 0, 0, 0] },
  { level: 8, slots: [4, 3, 3, 2, 0, 0, 0, 0, 0] },
  { level: 9, slots: [4, 3, 3, 3, 1, 0, 0, 0, 0] },
  { level: 10, slots: [4, 3, 3, 3, 2, 0, 0, 0, 0] },
  { level: 11, slots: [4, 3, 3, 3, 2, 1, 0, 0, 0] },
  { level: 12, slots: [4, 3, 3, 3, 2, 1, 0, 0, 0] },
  { level: 13, slots: [4, 3, 3, 3, 2, 1, 1, 0, 0] },
  { level: 14, slots: [4, 3, 3, 3, 2, 1, 1, 0, 0] },
  { level: 15, slots: [4, 3, 3, 3, 2, 1, 1, 1, 0] },
  { level: 16, slots: [4, 3, 3, 3, 2, 1, 1, 1, 0] },
  { level: 17, slots: [4, 3, 3, 3, 2, 1, 1, 1, 1] },
  { level: 18, slots: [4, 3, 3, 3, 3, 1, 1, 1, 1] },
  { level: 19, slots: [4, 3, 3, 3, 3, 2, 1, 1, 1] },
  { level: 20, slots: [4, 3, 3, 3, 3, 2, 2, 1, 1] },
];

// Half casters: Paladin, Ranger
const HALF_CASTER_SLOTS: SpellSlotEntry[] = [
  { level: 1, slots: [0, 0, 0, 0, 0, 0, 0, 0, 0] },
  { level: 2, slots: [2, 0, 0, 0, 0, 0, 0, 0, 0] },
  { level: 3, slots: [3, 0, 0, 0, 0, 0, 0, 0, 0] },
  { level: 4, slots: [3, 0, 0, 0, 0, 0, 0, 0, 0] },
  { level: 5, slots: [4, 2, 0, 0, 0, 0, 0, 0, 0] },
  { level: 6, slots: [4, 2, 0, 0, 0, 0, 0, 0, 0] },
  { level: 7, slots: [4, 3, 0, 0, 0, 0, 0, 0, 0] },
  { level: 8, slots: [4, 3, 0, 0, 0, 0, 0, 0, 0] },
  { level: 9, slots: [4, 3, 2, 0, 0, 0, 0, 0, 0] },
  { level: 10, slots: [4, 3, 2, 0, 0, 0, 0, 0, 0] },
  { level: 11, slots: [4, 3, 3, 0, 0, 0, 0, 0, 0] },
  { level: 12, slots: [4, 3, 3, 0, 0, 0, 0, 0, 0] },
  { level: 13, slots: [4, 3, 3, 1, 0, 0, 0, 0, 0] },
  { level: 14, slots: [4, 3, 3, 1, 0, 0, 0, 0, 0] },
  { level: 15, slots: [4, 3, 3, 2, 0, 0, 0, 0, 0] },
  { level: 16, slots: [4, 3, 3, 2, 0, 0, 0, 0, 0] },
  { level: 17, slots: [4, 3, 3, 3, 1, 0, 0, 0, 0] },
  { level: 18, slots: [4, 3, 3, 3, 1, 0, 0, 0, 0] },
  { level: 19, slots: [4, 3, 3, 3, 2, 0, 0, 0, 0] },
  { level: 20, slots: [4, 3, 3, 3, 2, 0, 0, 0, 0] },
];

// Third casters: Eldritch Knight, Arcane Trickster
const THIRD_CASTER_SLOTS: SpellSlotEntry[] = [
  { level: 1, slots: [0, 0, 0, 0, 0, 0, 0, 0, 0] },
  { level: 2, slots: [0, 0, 0, 0, 0, 0, 0, 0, 0] },
  { level: 3, slots: [2, 0, 0, 0, 0, 0, 0, 0, 0] },
  { level: 4, slots: [3, 0, 0, 0, 0, 0, 0, 0, 0] },
  { level: 5, slots: [3, 0, 0, 0, 0, 0, 0, 0, 0] },
  { level: 6, slots: [3, 0, 0, 0, 0, 0, 0, 0, 0] },
  { level: 7, slots: [4, 2, 0, 0, 0, 0, 0, 0, 0] },
  { level: 8, slots: [4, 2, 0, 0, 0, 0, 0, 0, 0] },
  { level: 9, slots: [4, 2, 0, 0, 0, 0, 0, 0, 0] },
  { level: 10, slots: [4, 3, 0, 0, 0, 0, 0, 0, 0] },
  { level: 11, slots: [4, 3, 0, 0, 0, 0, 0, 0, 0] },
  { level: 12, slots: [4, 3, 0, 0, 0, 0, 0, 0, 0] },
  { level: 13, slots: [4, 3, 2, 0, 0, 0, 0, 0, 0] },
  { level: 14, slots: [4, 3, 2, 0, 0, 0, 0, 0, 0] },
  { level: 15, slots: [4, 3, 2, 0, 0, 0, 0, 0, 0] },
  { level: 16, slots: [4, 3, 3, 0, 0, 0, 0, 0, 0] },
  { level: 17, slots: [4, 3, 3, 0, 0, 0, 0, 0, 0] },
  { level: 18, slots: [4, 3, 3, 0, 0, 0, 0, 0, 0] },
  { level: 19, slots: [4, 3, 3, 1, 0, 0, 0, 0, 0] },
  { level: 20, slots: [4, 3, 3, 1, 0, 0, 0, 0, 0] },
];

// Pact Magic: Warlock (different progression)
const PACT_MAGIC_SLOTS: SpellSlotEntry[] = [
  { level: 1, slots: [1, 0, 0, 0, 0, 0, 0, 0, 0] },
  { level: 2, slots: [2, 0, 0, 0, 0, 0, 0, 0, 0] },
  { level: 3, slots: [0, 2, 0, 0, 0, 0, 0, 0, 0] },
  { level: 4, slots: [0, 2, 0, 0, 0, 0, 0, 0, 0] },
  { level: 5, slots: [0, 0, 2, 0, 0, 0, 0, 0, 0] },
  { level: 6, slots: [0, 0, 2, 0, 0, 0, 0, 0, 0] },
  { level: 7, slots: [0, 0, 0, 2, 0, 0, 0, 0, 0] },
  { level: 8, slots: [0, 0, 0, 2, 0, 0, 0, 0, 0] },
  { level: 9, slots: [0, 0, 0, 0, 2, 0, 0, 0, 0] },
  { level: 10, slots: [0, 0, 0, 0, 2, 0, 0, 0, 0] },
  { level: 11, slots: [0, 0, 0, 0, 3, 0, 0, 0, 0] },
  { level: 12, slots: [0, 0, 0, 0, 3, 0, 0, 0, 0] },
  { level: 13, slots: [0, 0, 0, 0, 3, 0, 0, 0, 0] },
  { level: 14, slots: [0, 0, 0, 0, 3, 0, 0, 0, 0] },
  { level: 15, slots: [0, 0, 0, 0, 3, 0, 0, 0, 0] },
  { level: 16, slots: [0, 0, 0, 0, 3, 0, 0, 0, 0] },
  { level: 17, slots: [0, 0, 0, 0, 4, 0, 0, 0, 0] },
  { level: 18, slots: [0, 0, 0, 0, 4, 0, 0, 0, 0] },
  { level: 19, slots: [0, 0, 0, 0, 4, 0, 0, 0, 0] },
  { level: 20, slots: [0, 0, 0, 0, 4, 0, 0, 0, 0] },
];

/**
 * Get spell slot progression for a given caster type
 */
export function getSpellSlotProgression(casterType: CasterType): SpellSlotEntry[] {
  switch (casterType) {
    case 'FULL':
      return FULL_CASTER_SLOTS;
    case 'HALF':
      return HALF_CASTER_SLOTS;
    case 'THIRD':
      return THIRD_CASTER_SLOTS;
    case 'PACT':
      return PACT_MAGIC_SLOTS;
    case 'NONE':
    default:
      return [];
  }
}

/**
 * Generate table entries for spell slots
 * Returns array of table column objects compatible with the existing table structure
 */
export function generateSpellSlotTableEntries(casterType: CasterType) {
  const progression = getSpellSlotProgression(casterType);
  if (progression.length === 0) return [];

  const entries = [];

  // Create a column for each spell level (1-9)
  for (let spellLevel = 1; spellLevel <= 9; spellLevel++) {
    const scaling = progression
      .map(entry => ({
        level: entry.level,
        value: entry.slots[spellLevel - 1].toString()
      }))
      .filter(s => s.value !== '0'); // Only include non-zero values

    if (scaling.length > 0) {
      entries.push({
        name: `${spellLevel} ур.`,
        scaling
      });
    }
  }

  return entries;
}
