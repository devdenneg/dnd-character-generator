import prisma from "../db";

export async function getAllMonstersMeta(source?: string) {
  const monsters = await prisma.monster.findMany({
    where: source ? { source } : undefined,
    select: {
      id: true,
      externalId: true,
      name: true,
      nameRu: true,
      type: true,
      size: true,
      cr: true,
      source: true,
    },
    orderBy: { nameRu: "asc" },
  });

  return monsters;
}

export async function getMonsterByExternalId(externalId: string) {
  const monster = await prisma.monster.findUnique({
    where: { externalId },
  });
  return monster;
}

export async function getMonsterById(id: string) {
  const monster = await prisma.monster.findUnique({
    where: { id },
  });
  return monster;
}

export async function searchMonsters(query: string) {
  const monsters = await prisma.monster.findMany({
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
      type: true,
      cr: true,
    },
    take: 50,
  });

  return monsters.map((m) => ({
    id: m.externalId,
    name: m.name,
    nameRu: m.nameRu,
    type: "monster" as const,
    category: "Бестиарий" as const,
    description: `CR ${m.cr}, ${m.type}`,
  }));
}
