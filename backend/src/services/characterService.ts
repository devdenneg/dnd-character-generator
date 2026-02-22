import { Prisma, type Character } from "@prisma/client";
import prisma from "../db";
import { generateShortId } from "../utils/shortId";

type JsonRecord = Record<string, unknown>;

interface CreateCharacterInput {
  name: string;
  raceId: string;
  classId: string;
  subclassId?: string | null;
  backgroundId: string;
  raceSnapshot?: unknown;
  classSnapshot?: unknown;
  backgroundSnapshot?: unknown;
  abilityScores: Record<string, number>;
  abilityScoreMethod: "standard" | "pointbuy" | "roll";
  abilityScoreIncreases: Record<string, number>;
  skillProficiencies: string[];
  toolProficiencies: string[];
  languages: string[];
  equipment: Array<{ id: string; quantity: number }>;
  wallet: Record<string, number>;
  cantripsKnown: string[];
  spellsKnown: string[];
  spellsPrepared: string[];
  details: Record<string, string | undefined>;
  level: number;
  experience: number;
  isPublic: boolean;
}

type UpdateCharacterInput = Partial<Omit<CreateCharacterInput, "raceId" | "classId" | "backgroundId" | "abilityScores" | "abilityScoreMethod">> & {
  name?: string;
};

interface LevelUpInput {
  hpRoll?: number;
  hpMethod: "roll" | "average";
  asi?: {
    type: "ability" | "feat";
    abilityIncreases?: Record<string, number>;
    featId?: string;
  };
  featureChoices: Array<{ featureId: string; choice: string }>;
  subclassId?: string | null;
  spellChanges: { added: string[]; removed: string[] };
  cantripChanges: { added: string[]; removed: string[] };
  expertiseGained: string[];
  experience?: number;
}

export class ServiceValidationError extends Error {}

function asRecord(value: unknown): JsonRecord {
  return typeof value === "object" && value !== null ? (value as JsonRecord) : {};
}

function asStringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
}

function asObjectArray(value: unknown): JsonRecord[] {
  return Array.isArray(value)
    ? value
        .map((item) => asRecord(item))
        .filter((item) => Object.keys(item).length > 0)
    : [];
}

function asNumberRecord(value: unknown): Record<string, number> {
  const source = asRecord(value);
  const result: Record<string, number> = {};

  Object.entries(source).forEach(([key, raw]) => {
    if (typeof raw === "number") {
      result[key] = raw;
    }
  });

  return result;
}

function uniq(values: string[]): string[] {
  return Array.from(new Set(values));
}

function progressionLimitByLevel(table: unknown, level: number): number | null {
  if (!Array.isArray(table)) {
    return null;
  }

  const row = table[level - 1];
  return typeof row === "number" ? row : null;
}

function getMeta(data: unknown): { shortId: string; isPublic: boolean } {
  const root = asRecord(data);
  const meta = asRecord(root.meta);
  return {
    shortId: typeof meta.shortId === "string" ? meta.shortId : "",
    isPublic: Boolean(meta.isPublic),
  };
}

function getProgression(data: unknown): { level: number; experience: number } {
  const root = asRecord(data);
  const progression = asRecord(root.progression);
  return {
    level: typeof progression.level === "number" ? progression.level : 1,
    experience: typeof progression.experience === "number" ? progression.experience : 0,
  };
}

function toCharacterResponse(character: Character, viewerUserId?: string) {
  const meta = getMeta(character.data);
  const progression = getProgression(character.data);

  return {
    id: character.id,
    shortId: meta.shortId,
    name: character.name,
    userId: character.userId,
    level: progression.level,
    experience: progression.experience,
    isPublic: meta.isPublic,
    data: character.data,
    createdAt: character.createdAt,
    updatedAt: character.updatedAt,
    isOwner: viewerUserId ? viewerUserId === character.userId : undefined,
  };
}

async function ensureUniqueShortId(): Promise<string> {
  for (let i = 0; i < 12; i += 1) {
    const shortId = generateShortId();
    const matches = await prisma.character.findMany({
      select: { id: true, data: true },
      where: {
        data: {
          path: ["meta", "shortId"],
          equals: shortId,
        },
      },
      take: 1,
    });

    if (matches.length === 0) {
      return shortId;
    }
  }

  return generateShortId(10);
}

function buildDataPayload(input: CreateCharacterInput, shortId: string): JsonRecord {
  const raceNameRu = asRecord(input.raceSnapshot).nameRu;
  const classNameRu = asRecord(input.classSnapshot).nameRu;

  return {
    version: 1,
    raceId: input.raceId,
    classId: input.classId,
    subclassId: input.subclassId ?? null,
    backgroundId: input.backgroundId,
    raceSnapshot: input.raceSnapshot ?? null,
    classSnapshot: input.classSnapshot ?? null,
    backgroundSnapshot: input.backgroundSnapshot ?? null,
    abilityScores: input.abilityScores,
    abilityScoreMethod: input.abilityScoreMethod,
    abilityScoreIncreases: input.abilityScoreIncreases,
    skillProficiencies: input.skillProficiencies,
    toolProficiencies: input.toolProficiencies,
    languages: input.languages,
    equipment: input.equipment,
    wallet: input.wallet,
    cantripsKnown: input.cantripsKnown,
    spellsKnown: input.spellsKnown,
    spellsPrepared: input.spellsPrepared,
    details: input.details,
    progression: {
      level: input.level,
      experience: input.experience,
    },
    // Legacy fields for existing room/player UI
    race: {
      nameRu: typeof raceNameRu === "string" ? raceNameRu : "",
    },
    class: {
      nameRu: typeof classNameRu === "string" ? classNameRu : "",
    },
    level: input.level,
    meta: {
      shortId,
      isPublic: input.isPublic,
    },
  };
}

export async function createCharacter(userId: string, input: CreateCharacterInput) {
  const shortId = await ensureUniqueShortId();
  const data = buildDataPayload(input, shortId);

  const character = await prisma.character.create({
    data: {
      userId,
      name: input.name,
      data: data as Prisma.InputJsonValue,
    },
  });

  return toCharacterResponse(character, userId);
}

export async function listCharacters(userId: string) {
  const characters = await prisma.character.findMany({
    where: { userId },
    orderBy: { updatedAt: "desc" },
  });

  return characters.map((character) => toCharacterResponse(character, userId));
}

export async function getCharacterById(id: string, userId: string) {
  const character = await prisma.character.findFirst({
    where: { id, userId },
  });

  if (!character) {
    return null;
  }

  return toCharacterResponse(character, userId);
}

export async function getCharacterByShortId(shortId: string, viewerUserId?: string) {
  const candidates = await prisma.character.findMany({
    where: {
      data: {
        path: ["meta", "shortId"],
        equals: shortId,
      },
    },
    take: 1,
  });

  const character = candidates[0];
  if (!character) {
    return null;
  }

  const meta = getMeta(character.data);
  const isOwner = viewerUserId === character.userId;

  if (!meta.isPublic && !isOwner) {
    return { forbidden: true as const };
  }

  return toCharacterResponse(character, viewerUserId);
}

export async function updateCharacter(id: string, userId: string, input: UpdateCharacterInput) {
  const existing = await prisma.character.findFirst({
    where: { id, userId },
  });

  if (!existing) {
    return null;
  }

  const currentData = asRecord(existing.data);
  const currentMeta = asRecord(currentData.meta);
  const currentProgression = asRecord(currentData.progression);

  const nextData: JsonRecord = {
    ...currentData,
    ...(input.raceSnapshot !== undefined ? { raceSnapshot: input.raceSnapshot } : {}),
    ...(input.classSnapshot !== undefined ? { classSnapshot: input.classSnapshot } : {}),
    ...(input.backgroundSnapshot !== undefined ? { backgroundSnapshot: input.backgroundSnapshot } : {}),
    ...(input.abilityScoreIncreases !== undefined ? { abilityScoreIncreases: input.abilityScoreIncreases } : {}),
    ...(input.skillProficiencies !== undefined ? { skillProficiencies: input.skillProficiencies } : {}),
    ...(input.toolProficiencies !== undefined ? { toolProficiencies: input.toolProficiencies } : {}),
    ...(input.languages !== undefined ? { languages: input.languages } : {}),
    ...(input.equipment !== undefined ? { equipment: input.equipment } : {}),
    ...(input.wallet !== undefined ? { wallet: input.wallet } : {}),
    ...(input.cantripsKnown !== undefined ? { cantripsKnown: input.cantripsKnown } : {}),
    ...(input.spellsKnown !== undefined ? { spellsKnown: input.spellsKnown } : {}),
    ...(input.spellsPrepared !== undefined ? { spellsPrepared: input.spellsPrepared } : {}),
    ...(input.details !== undefined ? { details: { ...asRecord(currentData.details), ...input.details } } : {}),
    progression: {
      ...currentProgression,
      ...(input.level !== undefined ? { level: input.level } : {}),
      ...(input.experience !== undefined ? { experience: input.experience } : {}),
    },
    meta: {
      ...currentMeta,
      ...(input.isPublic !== undefined ? { isPublic: input.isPublic } : {}),
    },
    ...(input.level !== undefined ? { level: input.level } : {}),
  };

  const updated = await prisma.character.update({
    where: { id },
    data: {
      name: input.name ?? existing.name,
      data: nextData as Prisma.InputJsonValue,
    },
  });

  return toCharacterResponse(updated, userId);
}

export async function levelUpCharacter(id: string, userId: string, input: LevelUpInput) {
  const existing = await prisma.character.findFirst({
    where: { id, userId },
  });

  if (!existing) {
    return null;
  }

  const currentData = asRecord(existing.data);
  const currentProgression = getProgression(existing.data);
  const currentLevel = currentProgression.level;
  const nextLevel = currentLevel + 1;

  if (nextLevel > 20) {
    throw new ServiceValidationError("Character is already at max level (20)");
  }

  const classSnapshot = asRecord(currentData.classSnapshot);
  const spellcasting = asRecord(classSnapshot.spellcasting);

  const currentCantrips = asStringArray(currentData.cantripsKnown);
  const currentSpells = asStringArray(currentData.spellsKnown);
  const nextCantrips = uniq(
    currentCantrips
      .filter((idValue) => !input.cantripChanges.removed.includes(idValue))
      .concat(input.cantripChanges.added)
  );
  const nextSpells = uniq(
    currentSpells
      .filter((idValue) => !input.spellChanges.removed.includes(idValue))
      .concat(input.spellChanges.added)
  );

  const cantripLimit = progressionLimitByLevel(spellcasting.cantripsKnown, nextLevel);
  const spellsLimit = progressionLimitByLevel(spellcasting.spellsKnown, nextLevel);

  if (cantripLimit !== null && nextCantrips.length > cantripLimit) {
    throw new ServiceValidationError(
      `Cantrips limit exceeded for level ${nextLevel}: max ${cantripLimit}`
    );
  }

  if (spellsLimit !== null && nextSpells.length > spellsLimit) {
    throw new ServiceValidationError(
      `Spells limit exceeded for level ${nextLevel}: max ${spellsLimit}`
    );
  }

  const currentAbilityScores = asNumberRecord(currentData.abilityScores);
  const currentAbilityIncreases = asNumberRecord(currentData.abilityScoreIncreases);

  const nextAbilityScores: Record<string, number> = { ...currentAbilityScores };
  const nextAbilityIncreases: Record<string, number> = { ...currentAbilityIncreases };

  if (input.asi?.type === "ability") {
    const increases = asNumberRecord(input.asi.abilityIncreases);
    const values = Object.values(increases);
    const total = values.reduce((sum, value) => sum + value, 0);
    const legalShape =
      (values.length === 1 && values[0] === 2) ||
      (values.length === 2 && values.every((value) => value === 1));

    if (!legalShape || total !== 2) {
      throw new ServiceValidationError("ASI ability increases must be +2 to one stat or +1 to two stats");
    }

    Object.entries(increases).forEach(([ability, delta]) => {
      const base = typeof nextAbilityScores[ability] === "number" ? nextAbilityScores[ability] : 10;
      nextAbilityScores[ability] = Math.max(1, Math.min(30, base + delta));
      nextAbilityIncreases[ability] = (nextAbilityIncreases[ability] ?? 0) + delta;
    });
  }

  const levelHistory = asObjectArray(currentData.levelHistory);
  levelHistory.push({
    level: nextLevel,
    timestamp: new Date().toISOString(),
    hpRoll: input.hpRoll,
    hpMethod: input.hpMethod,
    asi: input.asi ?? null,
    featureChoices: input.featureChoices,
    subclassId: input.subclassId ?? null,
    spellChanges: input.spellChanges,
    cantripChanges: input.cantripChanges,
    expertiseGained: input.expertiseGained,
  });

  const nextData: JsonRecord = {
    ...currentData,
    ...(input.subclassId !== undefined ? { subclassId: input.subclassId } : {}),
    abilityScores: nextAbilityScores,
    abilityScoreIncreases: nextAbilityIncreases,
    cantripsKnown: nextCantrips,
    spellsKnown: nextSpells,
    levelHistory,
    progression: {
      ...asRecord(currentData.progression),
      level: nextLevel,
      ...(input.experience !== undefined ? { experience: input.experience } : {}),
    },
    level: nextLevel,
  };

  const updated = await prisma.character.update({
    where: { id },
    data: {
      data: nextData as Prisma.InputJsonValue,
    },
  });

  return toCharacterResponse(updated, userId);
}

export async function setCharacterPrivacy(id: string, userId: string, isPublic: boolean) {
  const existing = await prisma.character.findFirst({
    where: { id, userId },
  });

  if (!existing) {
    return null;
  }

  const currentData = asRecord(existing.data);
  const currentMeta = asRecord(currentData.meta);

  const updated = await prisma.character.update({
    where: { id },
    data: {
      data: {
        ...currentData,
        meta: {
          ...currentMeta,
          isPublic,
        },
      } as Prisma.InputJsonValue,
    },
  });

  return toCharacterResponse(updated, userId);
}

export async function deleteCharacter(id: string, userId: string) {
  const existing = await prisma.character.findFirst({
    where: { id, userId },
    select: { id: true },
  });

  if (!existing) {
    return false;
  }

  await prisma.character.delete({ where: { id } });
  return true;
}
