// Zod validation schemas for character data

import { z } from "zod";

/**
 * Ability scores schema
 */
export const abilityScoresSchema = z.object({
  strength: z.number().min(1).max(30),
  dexterity: z.number().min(1).max(30),
  constitution: z.number().min(1).max(30),
  intelligence: z.number().min(1).max(30),
  wisdom: z.number().min(1).max(30),
  charisma: z.number().min(1).max(30),
});

/**
 * Wallet schema
 */
export const walletSchema = z.object({
  copper: z.number().min(0),
  silver: z.number().min(0),
  electrum: z.number().min(0),
  gold: z.number().min(0),
  platinum: z.number().min(0),
});

/**
 * Equipment item schema
 */
export const equipmentSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  nameRu: z.string(),
  category: z.enum(["weapon", "armor", "gear", "tool", "pack"]),
  cost: z.object({
    quantity: z.number(),
    unit: z.string(),
  }),
  weight: z.number(),
  description: z.string().optional(),
  damage: z
    .object({
      dice: z.string(),
      type: z.string(),
    })
    .optional(),
  armorClass: z.number().optional(),
  armorType: z.enum(["light", "medium", "heavy", "shield"]).optional(),
  maxDexBonus: z.number().optional(),
  properties: z.array(z.string()).optional(),
  source: z.enum(["class", "background"]).optional(),
  externalId: z.string().optional(),
});

/**
 * Spell schema
 */
export const spellSchema = z.object({
  id: z.string(),
  name: z.string(),
  nameRu: z.string(),
  level: z.number().min(0).max(9),
  school: z.string(),
  castingTime: z.string(),
  range: z.string(),
  components: z.string(),
  duration: z.string(),
  description: z.string(),
  classes: z.array(z.string()),
});

/**
 * Race trait schema
 */
export const raceTraitSchema = z.object({
  name: z.string(),
  nameRu: z.string(),
  description: z.string(),
});

/**
 * Race schema
 */
export const raceSchema = z
  .object({
    id: z.string(),
    externalId: z.string(),
    name: z.string(),
    nameRu: z.string(),
    description: z.string(),
    speed: z.number(),
    size: z.enum(["Small", "Medium", "Large"]),
    traits: z.array(raceTraitSchema),
    source: z.enum(["srd", "phb2024"]),
  })
  .nullable();

/**
 * Class feature schema
 */
export const classFeatureSchema = z.object({
  name: z.string(),
  nameRu: z.string(),
  description: z.string(),
  level: z.number(),
});

/**
 * Subclass schema
 */
export const subclassSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    nameRu: z.string(),
    description: z.string(),
    features: z.array(classFeatureSchema),
  })
  .nullable();

/**
 * Spellcasting config schema
 */
export const spellcastingConfigSchema = z.object({
  ability: z.enum([
    "strength",
    "dexterity",
    "constitution",
    "intelligence",
    "wisdom",
    "charisma",
  ]),
  cantripsKnown: z.array(z.number()),
  spellsKnown: z.array(z.number()).optional(),
  spellSlots: z.array(z.array(z.number())),
});

/**
 * Starting equipment schema
 */
export const startingEquipmentSchema = z.object({
  equipment: z.array(equipmentSchema),
  gold: z.number(),
});

/**
 * Character class schema
 */
export const characterClassSchema = z
  .object({
    id: z.string(),
    externalId: z.string(),
    name: z.string(),
    nameRu: z.string(),
    description: z.string(),
    hitDie: z.number(),
    primaryAbility: z.array(
      z.enum([
        "strength",
        "dexterity",
        "constitution",
        "intelligence",
        "wisdom",
        "charisma",
      ])
    ),
    savingThrows: z.array(
      z.enum([
        "strength",
        "dexterity",
        "constitution",
        "intelligence",
        "wisdom",
        "charisma",
      ])
    ),
    armorProficiencies: z.array(z.string()),
    weaponProficiencies: z.array(z.string()),
    skillChoices: z.array(z.string()),
    skillCount: z.number(),
    features: z.array(classFeatureSchema),
    subclasses: z.array(subclassSchema),
    subclassLevel: z.number(),
    startingEquipment: startingEquipmentSchema.optional(),
    spellcasting: spellcastingConfigSchema.optional().nullable(),
    source: z.enum(["srd", "phb2024"]),
  })
  .nullable();

/**
 * Background schema
 */
export const backgroundSchema = z
  .object({
    id: z.string(),
    externalId: z.string(),
    name: z.string(),
    nameRu: z.string(),
    description: z.string(),
    skillProficiencies: z.array(z.string()),
    toolProficiencies: z.array(z.string()),
    languages: z.number(),
    equipment: z.array(z.string()),
    startingGold: z.number().optional(),
    originFeat: z.string().optional(),
    abilityScoreIncrease: z.object({
      options: z.array(
        z.enum([
          "strength",
          "dexterity",
          "constitution",
          "intelligence",
          "wisdom",
          "charisma",
        ])
      ),
      amount: z.tuple([z.number(), z.number(), z.number()]),
    }),
    source: z.enum(["srd", "phb2024"]),
  })
  .nullable();

/**
 * Complete character data schema
 */
export const characterDataSchema = z.object({
  // Core Choices
  race: raceSchema,
  class: characterClassSchema,
  subclass: subclassSchema,
  background: backgroundSchema,

  // Ability Scores
  abilityScores: abilityScoresSchema,
  abilityScoreMethod: z.enum(["standard", "pointbuy", "roll"]),
  abilityScoreIncreases: abilityScoresSchema.partial(),

  // Skills & Proficiencies
  skillProficiencies: z.array(z.string()),
  expertiseSkills: z.array(z.string()),
  toolProficiencies: z.array(z.string()),
  languages: z.array(z.string()),

  // Equipment
  equipment: z.array(equipmentSchema),
  wallet: walletSchema,

  // Spells
  cantripsKnown: z.array(spellSchema),
  spellsKnown: z.array(spellSchema),
  spellsPrepared: z.array(spellSchema),

  // Character Details
  alignment: z.string(),
  personalityTraits: z.string(),
  ideals: z.string(),
  bonds: z.string(),
  flaws: z.string(),
  backstory: z.string(),
  appearance: z.string(),
  age: z.string(),
  height: z.string(),
  weight: z.string(),
  eyes: z.string(),
  skin: z.string(),
  hair: z.string(),
});

/**
 * Create character input schema
 */
export const createCharacterSchema = z.object({
  name: z.string().min(1).max(100),
  data: characterDataSchema,
});

/**
 * Update character input schema
 */
export const updateCharacterSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  data: characterDataSchema.optional(),
});
