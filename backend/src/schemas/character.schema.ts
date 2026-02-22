import { z } from "zod";

const abilityScoresSchema = z.object({
  strength: z.number().int().min(1).max(30),
  dexterity: z.number().int().min(1).max(30),
  constitution: z.number().int().min(1).max(30),
  intelligence: z.number().int().min(1).max(30),
  wisdom: z.number().int().min(1).max(30),
  charisma: z.number().int().min(1).max(30),
});

const walletSchema = z.object({
  copper: z.number().int().min(0).default(0),
  silver: z.number().int().min(0).default(0),
  electrum: z.number().int().min(0).default(0),
  gold: z.number().int().min(0).default(0),
  platinum: z.number().int().min(0).default(0),
});

const equipmentItemSchema = z.object({
  id: z.string().min(1),
  quantity: z.number().int().min(1).default(1),
});

const characterDetailsSchema = z.object({
  alignment: z.string().max(100).optional(),
  personalityTraits: z.string().max(500).optional(),
  ideals: z.string().max(500).optional(),
  bonds: z.string().max(500).optional(),
  flaws: z.string().max(500).optional(),
  backstory: z.string().max(5000).optional(),
  age: z.string().max(50).optional(),
  height: z.string().max(50).optional(),
  weight: z.string().max(50).optional(),
  eyes: z.string().max(50).optional(),
  skin: z.string().max(50).optional(),
  hair: z.string().max(50).optional(),
});

export const createCharacterSchema = z.object({
  name: z.string().min(1).max(120),
  raceId: z.string().min(1),
  classId: z.string().min(1),
  subclassId: z.string().nullable().optional(),
  backgroundId: z.string().min(1),
  raceSnapshot: z.unknown().optional(),
  classSnapshot: z.unknown().optional(),
  backgroundSnapshot: z.unknown().optional(),
  abilityScores: abilityScoresSchema,
  abilityScoreMethod: z.enum(["standard", "pointbuy", "roll"]),
  abilityScoreIncreases: z.record(z.string(), z.number().int()).default({}),
  skillProficiencies: z.array(z.string()).default([]),
  toolProficiencies: z.array(z.string()).default([]),
  languages: z.array(z.string()).default([]),
  equipment: z.array(equipmentItemSchema).default([]),
  wallet: walletSchema.default({
    copper: 0,
    silver: 0,
    electrum: 0,
    gold: 0,
    platinum: 0,
  }),
  cantripsKnown: z.array(z.string()).default([]),
  spellsKnown: z.array(z.string()).default([]),
  spellsPrepared: z.array(z.string()).default([]),
  details: characterDetailsSchema.default({}),
  level: z.number().int().min(1).default(1),
  experience: z.number().int().min(0).default(0),
  isPublic: z.boolean().default(false),
});

export const updateCharacterSchema = createCharacterSchema.partial().omit({
  raceId: true,
  classId: true,
  backgroundId: true,
  abilityScores: true,
  abilityScoreMethod: true,
});

export const patchPrivacySchema = z.object({
  isPublic: z.boolean(),
});

const asiSchema = z
  .object({
    type: z.enum(["ability", "feat"]),
    abilityIncreases: abilityScoresSchema.partial().optional(),
    featId: z.string().min(1).optional(),
  })
  .superRefine((value, ctx) => {
    if (value.type === "ability") {
      if (!value.abilityIncreases) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "abilityIncreases is required when ASI type is ability",
          path: ["abilityIncreases"],
        });
      }
      return;
    }

    if (!value.featId) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "featId is required when ASI type is feat",
        path: ["featId"],
      });
    }
  });

const spellChangeSchema = z.object({
  added: z.array(z.string()).default([]),
  removed: z.array(z.string()).default([]),
});

export const levelUpCharacterSchema = z.object({
  hpRoll: z.number().int().min(1).max(20).optional(),
  hpMethod: z.enum(["roll", "average"]).default("average"),
  asi: asiSchema.optional(),
  featureChoices: z
    .array(
      z.object({
        featureId: z.string().min(1),
        choice: z.string().min(1),
      })
    )
    .default([]),
  subclassId: z.string().min(1).nullable().optional(),
  spellChanges: spellChangeSchema.default({ added: [], removed: [] }),
  cantripChanges: spellChangeSchema.default({ added: [], removed: [] }),
  expertiseGained: z.array(z.string()).default([]),
  experience: z.number().int().min(0).optional(),
});
