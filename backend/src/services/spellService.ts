import prisma from "../db";

export interface SpellInput {
  externalId: string;
  name: string;
  nameRu: string;
  level: number;
  school: string;
  castingTime: string;
  range: string;
  components: string;
  duration: string;
  description: string;
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
      description: input.description,
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
          description: input.description,
          classes: input.classes,
          source: input.source || "phb2024",
        },
      }),
    ),
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
      ...(input.description && { description: input.description }),
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
