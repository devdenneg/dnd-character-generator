import bcrypt from "bcrypt";
import prisma from "../db";

export interface CreateRoomInput {
  name: string;
  maxPlayers: number;
  password: string;
}

export interface UpdateRoomInput {
  name?: string;
  maxPlayers?: number;
  password?: string;
  isActive?: boolean;
}

const SALT_ROUNDS = 10;

export async function createRoom(masterId: string, input: CreateRoomInput) {
  // Hash password
  const hashedPassword = await bcrypt.hash(input.password, SALT_ROUNDS);

  const room = await prisma.room.create({
    data: {
      masterId,
      name: input.name,
      maxPlayers: input.maxPlayers,
      password: hashedPassword,
    },
    include: {
      master: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  return room;
}

export async function getRoomsByMasterId(masterId: string) {
  const rooms = await prisma.room.findMany({
    where: { masterId },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      maxPlayers: true,
      isActive: true,
      createdAt: true,
      updatedAt: true,
      master: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  return rooms;
}

export async function getAllActiveRooms() {
  const rooms = await prisma.room.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      maxPlayers: true,
      createdAt: true,
      master: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  return rooms;
}

export async function getRoomById(roomId: string) {
  const room = await prisma.room.findUnique({
    where: { id: roomId },
    include: {
      master: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  return room;
}

export async function updateRoom(
  roomId: string,
  masterId: string,
  input: UpdateRoomInput,
) {
  // Check if room belongs to master
  const existing = await prisma.room.findFirst({
    where: {
      id: roomId,
      masterId,
    },
  });

  if (!existing) {
    return null;
  }

  // Hash new password if provided
  const updateData: any = {
    ...(input.name && { name: input.name }),
    ...(input.maxPlayers && { maxPlayers: input.maxPlayers }),
    ...(input.isActive !== undefined && { isActive: input.isActive }),
  };

  if (input.password) {
    updateData.password = await bcrypt.hash(input.password, SALT_ROUNDS);
  }

  const room = await prisma.room.update({
    where: { id: roomId },
    data: updateData,
    include: {
      master: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  return room;
}

export async function deleteRoom(roomId: string, masterId: string) {
  // Check if room belongs to master
  const existing = await prisma.room.findFirst({
    where: {
      id: roomId,
      masterId,
    },
  });

  if (!existing) {
    return false;
  }

  await prisma.room.delete({
    where: { id: roomId },
  });

  return true;
}

export async function verifyRoomPassword(
  roomId: string,
  password: string,
): Promise<boolean> {
  const room = await prisma.room.findUnique({
    where: { id: roomId },
    select: { password: true },
  });

  if (!room) {
    return false;
  }

  return bcrypt.compare(password, room.password);
}

export async function joinRoom(
  roomId: string,
  userId: string,
  password: string,
) {
  // Get room with players count
  const room = await prisma.room.findUnique({
    where: { id: roomId },
    include: {
      master: {
        select: { id: true, name: true, email: true },
      },
      players: true,
    },
  });

  if (!room) {
    return {
      success: false,
      error: "Комната не найдена",
      status: 404,
    };
  }

  if (!room.isActive) {
    return {
      success: false,
      error: "Комната неактивна",
      status: 403,
    };
  }

  // Verify password
  const isPasswordValid = await bcrypt.compare(password, room.password);
  if (!isPasswordValid) {
    return {
      success: false,
      error: "Неверный пароль",
      status: 401,
    };
  }

  // Check if already joined
  const existingPlayer = await prisma.roomPlayer.findUnique({
    where: {
      roomId_userId: {
        roomId,
        userId,
      },
    },
  });

  if (existingPlayer) {
    // Update to online if rejoining
    await prisma.roomPlayer.update({
      where: { id: existingPlayer.id },
      data: { isOnline: true },
    });

    return {
      success: true,
      data: {
        room: {
          id: room.id,
          name: room.name,
          maxPlayers: room.maxPlayers,
          master: room.master,
        },
        alreadyJoined: true,
      },
    };
  }

  // Check if room is full
  if (room.players.length >= room.maxPlayers) {
    return {
      success: false,
      error: "Комната заполнена",
      status: 403,
    };
  }

  // Add player to room
  const roomPlayer = await prisma.roomPlayer.create({
    data: {
      roomId,
      userId,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  return {
    success: true,
    data: {
      room: {
        id: room.id,
        name: room.name,
        maxPlayers: room.maxPlayers,
        master: room.master,
      },
      player: roomPlayer,
    },
  };
}
