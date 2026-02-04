import prisma from "../db";
import { Prisma } from "@prisma/client";

// Types for description content
export interface ListContent {
  type: "list";
  attrs: {
    type: "unordered" | "ordered";
  };
  content: string[];
}

export interface TableContent {
  type: "table";
  caption?: string;
  colLabels: string[];
  colStyles: string[];
  rows: string[][];
}

export type DescriptionItem = string | ListContent | TableContent;

export interface SpellInput {
  id?: string;
  externalId: string;
  name: string;
  nameRu: string;
  level: number;
  school: string;
  castingTime: string;
  range: string;
  components: string;
  duration: string;
  description: DescriptionItem[];
  classes: string[];
  source?: string;
}

export async function getAllSpells(source?: string) {
  const spells = await prisma.spell.findMany({
    where: source ? { source } : undefined,
    orderBy: [{ level: "asc" }, { name: "asc" }],
  });

  return spells;
}

// Get only meta data (without description) for list view
export async function getAllSpellsMeta(source?: string) {
  const spells = await prisma.spell.findMany({
    where: source ? { source } : undefined,
    select: {
      id: true,
      externalId: true,
      name: true,
      nameRu: true,
      level: true,
      school: true,
      castingTime: true,
      range: true,
      components: true,
      duration: true,
      classes: true,
      source: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: [{ level: "asc" }, { name: "asc" }],
  });

  return spells;
}

export async function getSpellById(id: string) {
  const spell = await prisma.spell.findUnique({
    where: { id },
  });

  return spell;
}

export async function getSpellByExternalId(externalId: string) {
  const spell = await prisma.spell.findUnique({
    where: { externalId },
  });

  return spell;
}

export async function getSpellsByClass(classId: string, source?: string) {
  const spells = await prisma.spell.findMany({
    where: {
      classes: {
        has: classId,
      },
      ...(source && { source }),
    },
    orderBy: [{ level: "asc" }, { name: "asc" }],
  });

  return spells;
}

export async function createSpell(input: SpellInput) {
  const spell = await prisma.spell.create({
    data: {
      externalId: input.externalId,
      name: input.name,
      nameRu: input.nameRu,
      level: input.level,
      school: input.school,
      castingTime: input.castingTime,
      range: input.range,
      components: input.components,
      duration: input.duration,
      description: input.description as Prisma.JsonArray,
      classes: input.classes,
      source: input.source || "phb2024",
    },
  });

  return spell;
}

export async function createManySpells(inputs: SpellInput[]) {
  const results = await prisma.$transaction(
    inputs.map((input) =>
      prisma.spell.create({
        data: {
          externalId: input.externalId,
          name: input.name,
          nameRu: input.nameRu,
          level: input.level,
          school: input.school,
          castingTime: input.castingTime,
          range: input.range,
          components: input.components,
          duration: input.duration,
          description: input.description as Prisma.JsonArray,
          classes: input.classes,
          source: input.source || "phb2024",
        },
      })
    )
  );

  return results;
}

export async function updateSpell(id: string, input: Partial<SpellInput>) {
  const spell = await prisma.spell.update({
    where: { id },
    data: {
      ...(input.externalId && { externalId: input.externalId }),
      ...(input.name && { name: input.name }),
      ...(input.nameRu && { nameRu: input.nameRu }),
      ...(input.level !== undefined && { level: input.level }),
      ...(input.school && { school: input.school }),
      ...(input.castingTime && { castingTime: input.castingTime }),
      ...(input.range && { range: input.range }),
      ...(input.components && { components: input.components }),
      ...(input.duration && { duration: input.duration }),
      ...(input.description && { description: input.description as Prisma.JsonArray }),
      ...(input.classes && { classes: input.classes }),
      ...(input.source && { source: input.source }),
    },
  });

  return spell;
}

export async function deleteSpell(id: string) {
  await prisma.spell.delete({
    where: { id },
  });

  return true;
}

export async function seedSpells(spells: SpellInput[]) {
  // Delete all existing spells
  await prisma.spell.deleteMany({});

  // Create new spells
  const createdSpells = await createManySpells(spells);

  return createdSpells;
}

export async function searchSpells(query: string) {
  const spells = await prisma.spell.findMany({
    where: {
      OR: [
        { name: { contains: query, mode: "insensitive" } },
        { nameRu: { contains: query, mode: "insensitive" } },
        { school: { contains: query, mode: "insensitive" } },
      ],
    },
    select: {
      externalId: true,
      name: true,
      nameRu: true,
    },
    take: 50,
  });

  return spells.map((spell) => ({
    id: spell.externalId,
    name: spell.name,
    nameRu: spell.nameRu,
    type: "spell" as const,
    category: "Заклинания" as const,
  }));
}
