import prisma from "../db";
import type { StartingEquipment, SpellcastingConfig } from "../types/equipment";

export interface ClassFeatureInput {
  name: string;
  nameRu: string;
  description: string;
  level: number;
}

export interface SubclassFeatureInput {
  name: string;
  nameRu: string;
  description: string;
  level: number;
}

export interface SubclassInput {
  externalId: string;
  name: string;
  nameRu: string;
  description: string;
  source?: string;
  features: SubclassFeatureInput[];
}

export interface CharacterClassInput {
  externalId: string;
  name: string;
  nameRu: string;
  description: string;
  hitDie: number;
  primaryAbility: string[];
  savingThrows: string[];
  armorProficiencies: string[];
  weaponProficiencies: string[];
  skillChoices: string[];
  skillCount: number;
  subclassLevel: number;
  source: string;
  features: ClassFeatureInput[];
  subclasses: SubclassInput[];
  startingEquipment?: StartingEquipment;
  spellcasting?: SpellcastingConfig;
}

export async function getAllClasses(source?: string) {
  const classes = await prisma.characterClass.findMany({
    where: source ? { source } : undefined,
    include: {
      features: {
        orderBy: { level: "asc" },
      },
      subclasses: {
        orderBy: { name: "asc" },
        include: {
          features: {
            orderBy: { level: "asc" },
          },
        },
      },
    },
    orderBy: [{ source: "asc" }, { name: "asc" }],
  });

  return classes;
}

export async function getClassById(id: string) {
  const classData = await prisma.characterClass.findUnique({
    where: { id },
    include: {
      features: {
        orderBy: { level: "asc" },
      },
      subclasses: {
        orderBy: { name: "asc" },
        include: {
          features: {
            orderBy: { level: "asc" },
          },
        },
      },
    },
  });

  return classData;
}

export async function getClassByExternalId(externalId: string) {
  const classData = await prisma.characterClass.findUnique({
    where: { externalId },
    include: {
      features: {
        orderBy: { level: "asc" },
      },
      subclasses: {
        orderBy: { name: "asc" },
        include: {
          features: {
            orderBy: { level: "asc" },
          },
        },
      },
    },
  });

  return classData;
}

export async function createClass(input: CharacterClassInput) {
  const classData = await prisma.characterClass.create({
    data: {
      externalId: input.externalId,
      name: input.name,
      nameRu: input.nameRu,
      description: input.description,
      hitDie: input.hitDie,
      primaryAbility: input.primaryAbility,
      savingThrows: input.savingThrows,
      armorProficiencies: input.armorProficiencies,
      weaponProficiencies: input.weaponProficiencies,
      skillChoices: input.skillChoices,
      skillCount: input.skillCount,
      subclassLevel: input.subclassLevel,
      source: input.source,
      startingEquipment: input.startingEquipment,
      spellcasting: input.spellcasting,
      features: {
        create: input.features,
      },
      subclasses: {
        create: input.subclasses.map((subclass) => ({
          externalId: subclass.externalId,
          name: subclass.name,
          nameRu: subclass.nameRu,
          description: subclass.description,
          source: subclass.source || "phb2024",
          features: {
            create: subclass.features,
          },
        })),
      },
    },
    include: {
      features: {
        orderBy: { level: "asc" },
      },
      subclasses: {
        orderBy: { name: "asc" },
        include: {
          features: {
            orderBy: { level: "asc" },
          },
        },
      },
    },
  });

  return classData;
}

export async function createManyClasses(inputs: CharacterClassInput[]) {
  const results = await prisma.$transaction(
    inputs.map((input) =>
      prisma.characterClass.create({
        data: {
          externalId: input.externalId,
          name: input.name,
          nameRu: input.nameRu,
          description: input.description,
          hitDie: input.hitDie,
          primaryAbility: input.primaryAbility,
          savingThrows: input.savingThrows,
          armorProficiencies: input.armorProficiencies,
          weaponProficiencies: input.weaponProficiencies,
          skillChoices: input.skillChoices,
          skillCount: input.skillCount,
          subclassLevel: input.subclassLevel,
          source: input.source,
          startingEquipment: input.startingEquipment,
          spellcasting: input.spellcasting,
          features: {
            create: input.features,
          },
          subclasses: {
            create: input.subclasses.map((subclass) => ({
              externalId: subclass.externalId,
              name: subclass.name,
              nameRu: subclass.nameRu,
              description: subclass.description,
              source: subclass.source || "phb2024",
              features: {
                create: subclass.features,
              },
            })),
          },
        },
        include: {
          features: {
            orderBy: { level: "asc" },
          },
          subclasses: {
            orderBy: { name: "asc" },
            include: {
              features: {
                orderBy: { level: "asc" },
              },
            },
          },
        },
      })
    )
  );

  return results;
}

export async function updateClass(
  id: string,
  input: Partial<CharacterClassInput>
) {
  // First, fetch existing class with its features and subclasses
  const existingClass = await prisma.characterClass.findUnique({
    where: { id },
    include: { features: true, subclasses: true },
  });

  if (!existingClass) {
    return null;
  }

  // Delete old features and subclasses if provided
  if (input.features) {
    await prisma.classFeature.deleteMany({
      where: { classId: id },
    });
  }

  if (input.subclasses) {
    // Get all subclass IDs for this class
    const subclassIds = existingClass.subclasses.map((s) => s.id);

    // Delete subclass features
    await prisma.subclassFeature.deleteMany({
      where: { subclassId: { in: subclassIds } },
    });

    // Delete subclasses
    await prisma.subclass.deleteMany({
      where: { id: { in: subclassIds } },
    });
  }

  const updateData: any = {};

  if (input.externalId !== undefined) updateData.externalId = input.externalId;
  if (input.name !== undefined) updateData.name = input.name;
  if (input.nameRu !== undefined) updateData.nameRu = input.nameRu;
  if (input.description !== undefined)
    updateData.description = input.description;
  if (input.hitDie !== undefined) updateData.hitDie = input.hitDie;
  if (input.primaryAbility !== undefined)
    updateData.primaryAbility = input.primaryAbility;
  if (input.savingThrows !== undefined)
    updateData.savingThrows = input.savingThrows;
  if (input.armorProficiencies !== undefined)
    updateData.armorProficiencies = input.armorProficiencies;
  if (input.weaponProficiencies !== undefined)
    updateData.weaponProficiencies = input.weaponProficiencies;
  if (input.skillChoices !== undefined)
    updateData.skillChoices = input.skillChoices;
  if (input.skillCount !== undefined) updateData.skillCount = input.skillCount;
  if (input.subclassLevel !== undefined)
    updateData.subclassLevel = input.subclassLevel;
  if (input.source !== undefined) updateData.source = input.source;
  if (input.startingEquipment !== undefined)
    updateData.startingEquipment = input.startingEquipment;
  if (input.spellcasting !== undefined)
    updateData.spellcasting = input.spellcasting;
  if (input.features) {
    updateData.features = {
      create: input.features,
    };
  }
  if (input.subclasses) {
    updateData.subclasses = {
      create: input.subclasses.map((subclass) => ({
        externalId: subclass.externalId,
        name: subclass.name,
        nameRu: subclass.nameRu,
        description: subclass.description,
        source: subclass.source || "phb2024",
        features: {
          create: subclass.features,
        },
      })),
    };
  }

  const classData = await prisma.characterClass.update({
    where: { id },
    data: updateData,
    include: {
      features: {
        orderBy: { level: "asc" },
      },
      subclasses: {
        orderBy: { name: "asc" },
        include: {
          features: {
            orderBy: { level: "asc" },
          },
        },
      },
    },
  });

  return classData;
}

export async function deleteClass(id: string) {
  await prisma.characterClass.delete({
    where: { id },
  });

  return true;
}

export async function seedClasses(classes: CharacterClassInput[]) {
  // Delete all existing classes and their features/subclasses
  const allClasses = await prisma.characterClass.findMany({
    select: { id: true, subclasses: { select: { id: true } } },
  });

  const subclassIds = allClasses.flatMap((c) => c.subclasses.map((s) => s.id));

  await prisma.subclassFeature.deleteMany({
    where: { subclassId: { in: subclassIds } },
  });

  await prisma.subclass.deleteMany({});

  await prisma.classFeature.deleteMany({});
  await prisma.characterClass.deleteMany({});

  // Create new classes with features and subclasses
  const createdClasses = await createManyClasses(classes);

  return createdClasses;
}
