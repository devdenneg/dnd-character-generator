import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export interface CreateCharacterInput {
  name: string;
  data: any;
}

export interface UpdateCharacterInput {
  name?: string;
  data?: any;
}

export async function createCharacter(
  userId: string,
  input: CreateCharacterInput,
) {
  const character = await prisma.character.create({
    data: {
      userId,
      name: input.name,
      data: input.data,
    },
  });

  return character;
}

export async function getCharactersByUserId(userId: string) {
  const characters = await prisma.character.findMany({
    where: { userId },
    orderBy: { updatedAt: "desc" },
    select: {
      id: true,
      name: true,
      data: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return characters;
}

export async function getCharacterById(characterId: string, userId: string) {
  const character = await prisma.character.findFirst({
    where: {
      id: characterId,
      userId,
    },
  });

  return character;
}

export async function updateCharacter(
  characterId: string,
  userId: string,
  input: UpdateCharacterInput,
) {
  // First check if the character belongs to the user
  const existing = await prisma.character.findFirst({
    where: {
      id: characterId,
      userId,
    },
  });

  if (!existing) {
    return null;
  }

  const character = await prisma.character.update({
    where: { id: characterId },
    data: {
      ...(input.name && { name: input.name }),
      ...(input.data && { data: input.data }),
    },
  });

  return character;
}

export async function deleteCharacter(characterId: string, userId: string) {
  // First check if the character belongs to the user
  const existing = await prisma.character.findFirst({
    where: {
      id: characterId,
      userId,
    },
  });

  if (!existing) {
    return false;
  }

  await prisma.character.delete({
    where: { id: characterId },
  });

  return true;
}
