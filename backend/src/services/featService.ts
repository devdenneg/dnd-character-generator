import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getAllFeats() {
  return await prisma.feat.findMany({
    orderBy: { nameRu: "asc" },
  });
}

export async function getFeatById(id: string) {
  return await prisma.feat.findUnique({
    where: { id },
  });
}

export async function searchFeats(query: string) {
  return await prisma.feat.findMany({
    where: {
      OR: [
        { name: { contains: query, mode: "insensitive" } },
        { nameRu: { contains: query, mode: "insensitive" } },
        { category: { contains: query, mode: "insensitive" } },
      ],
    },
    take: 10,
  });
}

export async function getGlobalSearchFeats(query: string) {
  const feats = await prisma.feat.findMany({
    where: {
      OR: [
        { name: { contains: query, mode: "insensitive" } },
        { nameRu: { contains: query, mode: "insensitive" } },
      ],
    },
    take: 5,
  });

  return feats.map((feat) => ({
    id: feat.id,
    name: feat.name,
    nameRu: feat.nameRu,
    type: "feat",
    category: "Черты",
  }));
}
