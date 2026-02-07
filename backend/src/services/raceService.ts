import prisma from "../db";

export interface RaceTraitInput {
  externalId?: string;
  name: string;
  nameRu: string;
  description: any; // Handled as Json in Prisma
}

export interface RaceInput {
  externalId: string;
  name: string;
  nameRu: string;
  description: any; // Handled as Json in Prisma
  speed: string;
  size: string;
  source: any; // Handled as Json in Prisma
  image?: string;
  gallery?: string[];
  hasLineages?: boolean;
  lastUsername?: string;
  properties?: any; // Handled as Json in Prisma
  traits: RaceTraitInput[];
}



export async function getAllRaces(source?: string) {
  // Parsing source if it's passed as string from query, but here it's already filtered by Prisma
  // If source is Json, we might need a more complex filter, but usually we filter by a field inside source
  const races = await prisma.race.findMany({
    include: {
      traits: {
        orderBy: { createdAt: "asc" },
      },
    },
    orderBy: [{ name: "asc" }],
  });

  // Manual filtering if source criteria is provided
  if (source) {
    return races.filter(r => {
      if (typeof r.source === 'object' && r.source !== null) {
        return (r.source as any).name?.label === source;
      }
      return r.source === source;
    });
  }

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
        image: input.image,
        gallery: input.gallery,
        hasLineages: input.hasLineages || false,
        lastUsername: input.lastUsername,
        properties: input.properties,
        traits: {
          create: input.traits.map(t => ({
            externalId: t.externalId,
            name: t.name,
            nameRu: t.nameRu,
            description: t.description
          })),
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
          image: input.image,
          gallery: input.gallery,
          hasLineages: input.hasLineages || false,
          lastUsername: input.lastUsername,
          properties: input.properties,
          traits: {
            create: input.traits.map(t => ({
              externalId: t.externalId,
              name: t.name,
              nameRu: t.nameRu,
              description: t.description
            })),
          },
        },
        include: {
          traits: {
            orderBy: { createdAt: "asc" },
          },
        },
      })
    )
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
      ...(input.image && { image: input.image }),
      ...(input.gallery && { gallery: input.gallery }),
      ...(input.hasLineages !== undefined && { hasLineages: input.hasLineages }),
      ...(input.lastUsername && { lastUsername: input.lastUsername }),
      ...(input.properties && { properties: input.properties }),
      ...(input.traits && {
        traits: {
          create: input.traits.map(t => ({
            externalId: t.externalId,
            name: t.name,
            nameRu: t.nameRu,
            description: t.description
          })),
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

export async function searchRaces(query: string) {
  const races = await prisma.race.findMany({
    where: {
      OR: [
        { name: { contains: query, mode: "insensitive" } },
        { nameRu: { contains: query, mode: "insensitive" } },
      ],

    },
    select: {
      externalId: true,
      name: true,
      nameRu: true,
    },
    take: 50,
  });

  return races.map((race) => ({
    id: race.externalId,
    name: race.name,
    nameRu: race.nameRu,
    type: "race" as const,
    category: "Расы" as const,
  }));
}
