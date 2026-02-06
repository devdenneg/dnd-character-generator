import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getAllFeats() {
  return await prisma.feat.findMany({
    orderBy: { nameRu: "asc" },
  });
}

export async function getAllFeatsMeta() {
  return await prisma.feat.findMany({
    select: {
      id: true,
      name: true,
      nameRu: true,
      category: true,
      prerequisite: true,
      source: true,
    },
    orderBy: { nameRu: "asc" },
  });
}

export async function getFeatById(id: string) {
  return await prisma.feat.findUnique({
    where: { id },
  });
}

export async function getFeatByExternalId(externalId: string) {
  // In the Feat model, the 'id' field stores the slug (e.g. "aberrant-dragonmark-uaeu")
  // So we just need to find by id.
  return await prisma.feat.findUnique({
    where: { id: externalId },
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
