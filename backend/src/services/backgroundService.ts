import prisma from "../db";

export interface BackgroundInput {
  id: string;
  name: string;
  nameRu: string;
  description: string;
  skillProficiencies: string[];
  toolProficiencies: string[];
  languages: number;
  equipmentIds: string[]; // Array of equipment IDs instead of strings
  startingGold: number;
  originFeat: string;
  abilityScoreIncrease: {
    options: string[];
    amount: number[];
  };
  source: string;
}

export async function getAllBackgrounds(source?: string) {
  const backgrounds = await prisma.background.findMany({
    where: source ? { source } : undefined,
    include: {
      equipment: {
        include: {
          equipment: true,
        },
      },
    },
    orderBy: [{ source: "asc" }, { name: "asc" }],
  });

  return backgrounds.map((bg) => ({
    ...bg,
    equipment: bg.equipment.map((e) => e.equipment),
  }));
}

export async function getBackgroundById(id: string) {
  const background = await prisma.background.findUnique({
    where: { id },
    include: {
      equipment: {
        include: {
          equipment: true,
        },
      },
    },
  });

  if (!background) return null;

  return {
    ...background,
    equipment: background.equipment.map((e) => e.equipment),
  };
}

export async function getBackgroundByExternalId(externalId: string) {
  const background = await prisma.background.findUnique({
    where: { externalId },
    include: {
      equipment: {
        include: {
          equipment: true,
        },
      },
    },
  });

  if (!background) return null;

  return {
    ...background,
    equipment: background.equipment.map((e) => e.equipment),
  };
}

export async function createBackground(input: BackgroundInput) {
  const background = await prisma.background.create({
    data: {
      externalId: input.id,
      name: input.name,
      nameRu: input.nameRu,
      description: input.description,
      skillProficiencies: input.skillProficiencies,
      toolProficiencies: input.toolProficiencies,
      languages: input.languages,
      startingGold: input.startingGold,
      originFeat: input.originFeat,
      abilityScoreIncrease: input.abilityScoreIncrease,
      source: input.source,
      equipment: {
        create: input.equipmentIds.map((equipmentId) => ({
          equipment: {
            connect: { id: equipmentId },
          },
        })),
      },
    },
    include: {
      equipment: {
        include: {
          equipment: true,
        },
      },
    },
  });

  return {
    ...background,
    equipment: background.equipment.map((e) => e.equipment),
  };
}

export async function createManyBackgrounds(inputs: BackgroundInput[]) {
  const results = await prisma.$transaction(
    inputs.map((input) =>
      prisma.background.create({
        data: {
          externalId: input.id,
          name: input.name,
          nameRu: input.nameRu,
          description: input.description,
          skillProficiencies: input.skillProficiencies,
          toolProficiencies: input.toolProficiencies,
          languages: input.languages,
          startingGold: input.startingGold,
          originFeat: input.originFeat,
          abilityScoreIncrease: input.abilityScoreIncrease,
          source: input.source,
          equipment: {
            create: input.equipmentIds.map((equipmentId) => ({
              equipment: {
                connect: { id: equipmentId },
              },
            })),
          },
        },
        include: {
          equipment: {
            include: {
              equipment: true,
            },
          },
        },
      })
    )
  );

  return results.map((bg) => ({
    ...bg,
    equipment: bg.equipment.map((e) => e.equipment),
  }));
}

export async function updateBackground(
  id: string,
  input: Partial<BackgroundInput>
) {
  // If equipment is being updated, delete old relations and create new ones
  const updateData: any = {
    ...(input.id && { externalId: input.id }),
    ...(input.name && { name: input.name }),
    ...(input.nameRu && { nameRu: input.nameRu }),
    ...(input.description && { description: input.description }),
    ...(input.skillProficiencies && {
      skillProficiencies: input.skillProficiencies,
    }),
    ...(input.toolProficiencies && {
      toolProficiencies: input.toolProficiencies,
    }),
    ...(input.languages !== undefined && { languages: input.languages }),
    ...(input.startingGold !== undefined && {
      startingGold: input.startingGold,
    }),
    ...(input.originFeat && { originFeat: input.originFeat }),
    ...(input.abilityScoreIncrease && {
      abilityScoreIncrease: input.abilityScoreIncrease,
    }),
    ...(input.source && { source: input.source }),
  };

  if (input.equipmentIds) {
    // Delete existing equipment relations
    await prisma.backgroundEquipment.deleteMany({
      where: { backgroundId: id },
    });

    // Create new equipment relations
    updateData.equipment = {
      create: input.equipmentIds.map((equipmentId) => ({
        equipment: {
          connect: { id: equipmentId },
        },
      })),
    };
  }

  const background = await prisma.background.update({
    where: { id },
    data: updateData,
    include: {
      equipment: {
        include: {
          equipment: true,
        },
      },
    },
  });

  return {
    ...background,
    equipment: background.equipment.map((e) => e.equipment),
  };
}

export async function deleteBackground(id: string) {
  await prisma.background.delete({
    where: { id },
  });

  return true;
}

export async function seedBackgrounds(backgrounds: BackgroundInput[]) {
  // Delete all existing backgrounds
  await prisma.background.deleteMany({});

  // Create new backgrounds
  const createdBackgrounds = await createManyBackgrounds(backgrounds);

  return createdBackgrounds;
}

export async function searchBackgrounds(query: string) {
  const backgrounds = await prisma.background.findMany({
    where: {
      OR: [
        { name: { contains: query, mode: "insensitive" } },
        { nameRu: { contains: query, mode: "insensitive" } },
        { description: { contains: query, mode: "insensitive" } },
      ],
    },
    select: {
      externalId: true,
      name: true,
      nameRu: true,
    },
    take: 50,
  });

  return backgrounds.map((bg) => ({
    id: bg.externalId,
    name: bg.name,
    nameRu: bg.nameRu,
    type: "background" as const,
    category: "Предыстории" as const,
  }));
}
