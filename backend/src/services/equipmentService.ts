import prisma from "../db";

export interface EquipmentInput {
  externalId: string;
  name: string;
  nameRu: string;
  category: string;
  cost: {
    quantity: number;
    unit: string;
  };
  weight?: number;
  source: string;
  description: string[];
  damage?: {
    dice: string;
    type: string;
  };
  armorClass?: number;
  armorType?: string;
  maxDexBonus?: number;
  properties?: string[];
}

export async function getAllEquipment(source?: string) {
  const equipment = await prisma.equipment.findMany({
    where: source ? { source } : undefined,
    orderBy: [{ source: "asc" }, { name: "asc" }],
  });

  return equipment;
}

export async function getEquipmentById(id: string) {
  const equipment = await prisma.equipment.findUnique({
    where: { id },
  });

  return equipment;
}

export async function getEquipmentByExternalId(externalId: string) {
  const equipment = await prisma.equipment.findUnique({
    where: { externalId },
  });

  return equipment;
}

export async function createEquipment(input: EquipmentInput) {
  const equipment = await prisma.equipment.create({
    data: {
      externalId: input.externalId,
      name: input.name,
      nameRu: input.nameRu,
      category: input.category,
      cost: input.cost,
      weight: input.weight,
      source: input.source,
      description: input.description,
      damage: input.damage,
      armorClass: input.armorClass,
      armorType: input.armorType,
      maxDexBonus: input.maxDexBonus,
      properties: input.properties || [],
    },
  });

  return equipment;
}

export async function createManyEquipment(inputs: EquipmentInput[]) {
  const results = await prisma.$transaction(
    inputs.map((input) =>
      prisma.equipment.create({
        data: {
          externalId: input.externalId,
          name: input.name,
          nameRu: input.nameRu,
          category: input.category,
          cost: input.cost,
          weight: input.weight,
          source: input.source,
          description: input.description,
          damage: input.damage,
          armorClass: input.armorClass,
          armorType: input.armorType,
          maxDexBonus: input.maxDexBonus,
          properties: input.properties || [],
        },
      })
    )
  );

  return results;
}

export async function updateEquipment(id: string, input: Partial<EquipmentInput>) {
  const existingEquipment = await prisma.equipment.findUnique({
    where: { id },
  });

  if (!existingEquipment) {
    return null;
  }

  const equipment = await prisma.equipment.update({
    where: { id },
    data: {
      ...(input.externalId && { externalId: input.externalId }),
      ...(input.name && { name: input.name }),
      ...(input.nameRu && { nameRu: input.nameRu }),
      ...(input.category && { category: input.category }),
      ...(input.cost && { cost: input.cost }),
      ...(input.weight !== undefined && { weight: input.weight }),
      ...(input.source && { source: input.source }),
      ...(input.description && { description: input.description }),
      ...(input.damage !== undefined && { damage: input.damage }),
      ...(input.armorClass !== undefined && { armorClass: input.armorClass }),
      ...(input.armorType !== undefined && { armorType: input.armorType }),
      ...(input.maxDexBonus !== undefined && { maxDexBonus: input.maxDexBonus }),
      ...(input.properties !== undefined && { properties: input.properties }),
    },
  });

  return equipment;
}

export async function deleteEquipment(id: string) {
  await prisma.equipment.delete({
    where: { id },
  });

  return true;
}

export async function seedEquipment(equipment: EquipmentInput[]) {
  // Delete all existing equipment
  await prisma.equipment.deleteMany({});

  // Create new equipment
  const createdEquipment = await createManyEquipment(equipment);

  return createdEquipment;
}

export async function searchEquipment(query: string) {
  const equipment = await prisma.equipment.findMany({
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
      category: true,
    },
    take: 50,
  });

  return equipment.map((item) => ({
    id: item.externalId,
    name: item.name,
    nameRu: item.nameRu,
    type: "equipment" as const,
    category: "Снаряжение" as const,
  }));
}
