
import prisma from "../db";

// Get lightweight metadata for all terms (without descriptions)
export const getTermsMeta = async (category?: string, search?: string) => {
  const where: any = {};

  if (category && category !== "all") {
    where.category = category;
  }

  if (search) {
    // For meta search, we can't search in description (not selected)
    // So we only search by name fields
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { nameRu: { contains: search, mode: "insensitive" } },
    ];
  }

  return await prisma.glossaryTerm.findMany({
    where,
    select: {
      id: true,
      name: true,
      nameRu: true,
      category: true,
      source: true,
    },
    orderBy: { nameRu: "asc" },
  });
};

// Get full term data (with description) - used for drawer
export const getTerms = async (category?: string, search?: string) => {
  const where: any = {};

  if (category && category !== "all") {
    where.category = category;
  }

  if (search) {
    // Search in name, nameRu, and description (JSON field)
    // For JSON search, we convert to string and use string_contains
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { nameRu: { contains: search, mode: "insensitive" } },
      {
        description: {
          path: '$',
          string_contains: search
        }
      },
    ];
  }

  return await prisma.glossaryTerm.findMany({
    where,
    orderBy: { nameRu: "asc" },
  });
};

export const getTermById = async (id: string) => {
  return await prisma.glossaryTerm.findUnique({
    where: { id },
  });
};


export const getCategories = async () => {
    const categories = await prisma.glossaryTerm.groupBy({
        by: ['category'],
    });
    return categories.map((c: { category: string }) => c.category).sort();
};

export const searchGlossaryTerms = async (query: string) => {
  const terms = await prisma.glossaryTerm.findMany({
    where: {
      OR: [
        { name: { contains: query, mode: "insensitive" } },
        { nameRu: { contains: query, mode: "insensitive" } },
        {
          description: {
            path: [],
            string_contains: query
          }
        },
      ],
    },
    select: {
      id: true,
      name: true,
      nameRu: true,
      category: true,
    },
    take: 20,
    orderBy: { nameRu: "asc" },
  });

  return terms.map((term: { id: string; name: string; nameRu: string; category: string }) => ({
    id: term.id,
    name: term.name,
    nameRu: term.nameRu,
    type: "glossary" as const,
    category: term.category || "Глоссарий",
  }));
};
