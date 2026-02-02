import prisma from "../db";

export interface RaceTraitInput {
  name: string;
  nameRu: string;
  description: string;
}

export interface RaceInput {
  externalId: string;
  name: string;
  nameRu: string;
  description: string;
  speed: number;
  size: string;
  source: string;
  traits: RaceTraitInput[];
}

export async function getAllRaces(source?: string) {
  const races = await prisma.race.findMany({
    where: source ? { source } : undefined,
    include: {
      traits: {
        orderBy: { createdAt: "asc" },
      },
    },
    orderBy: [{ source: "asc" }, { name: "asc" }],
  });

  return races;
}

export async function getRaceById(id: string) {
  const race = await prisma.race.findUnique({
    where: { id },
    include: {
      traits: {
        orderBy: { createdAt: "asc" },
      },
    },
  });

  return race;
}

export async function getRaceByExternalId(externalId: string) {
  const race = await prisma.race.findUnique({
    where: { externalId },
    include: {
      traits: {
        orderBy: { createdAt: "asc" },
      },
    },
  });

  return race;
}

export async function createRace(input: RaceInput) {
  const race = await prisma.race.create({
    data: {
      externalId: input.externalId,
      name: input.name,
      nameRu: input.nameRu,
      description: input.description,
      speed: input.speed,
      size: input.size,
      source: input.source,
      traits: {
        create: input.traits,
      },
    },
    include: {
      traits: {
        orderBy: { createdAt: "asc" },
      },
    },
  });

  return race;
}

export async function createManyRaces(inputs: RaceInput[]) {
  const results = await prisma.$transaction(
    inputs.map((input) =>
      prisma.race.create({
        data: {
          externalId: input.externalId,
          name: input.name,
          nameRu: input.nameRu,
          description: input.description,
          speed: input.speed,
          size: input.size,
          source: input.source,
          traits: {
            create: input.traits,
          },
        },
        include: {
          traits: {
            orderBy: { createdAt: "asc" },
          },
        },
      }),
    ),
  );

  return results;
}

export async function updateRace(id: string, input: Partial<RaceInput>) {
  // First, fetch existing race with its traits
  const existingRace = await prisma.race.findUnique({
    where: { id },
    include: { traits: true },
  });

  if (!existingRace) {
    return null;
  }

  // If traits are provided, delete old ones and create new ones
  if (input.traits) {
    await prisma.raceTrait.deleteMany({
      where: { raceId: id },
    });
  }

  const race = await prisma.race.update({
    where: { id },
    data: {
      ...(input.externalId && { externalId: input.externalId }),
      ...(input.name && { name: input.name }),
      ...(input.nameRu && { nameRu: input.nameRu }),
      ...(input.description && { description: input.description }),
      ...(input.speed !== undefined && { speed: input.speed }),
      ...(input.size && { size: input.size }),
      ...(input.source && { source: input.source }),
      ...(input.traits && {
        traits: {
          create: input.traits,
        },
      }),
    },
    include: {
      traits: {
        orderBy: { createdAt: "asc" },
      },
    },
  });

  return race;
}

export async function deleteRace(id: string) {
  await prisma.race.delete({
    where: { id },
  });

  return true;
}

export async function seedRaces(races: RaceInput[]) {
  // Delete all existing races and their traits
  await prisma.raceTrait.deleteMany({});
  await prisma.race.deleteMany({});

  // Create new races with traits
  const createdRaces = await createManyRaces(races);

  return createdRaces;
}
