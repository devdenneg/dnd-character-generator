import { Request, Response } from "express";
import { z } from "zod";
import * as roomService from "../services/roomService";
import { AuthenticatedRequest } from "../middleware/authMiddleware";

const createRoomSchema = z.object({
  name: z.string().min(1).max(100),
  maxPlayers: z.number().int().min(1).max(20),
  password: z.string().min(4),
});

const updateRoomSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  maxPlayers: z.number().int().min(1).max(20).optional(),
  password: z.string().min(4).optional(),
  isActive: z.boolean().optional(),
});

const verifyPasswordSchema = z.object({
  password: z.string(),
});

const joinRoomSchema = z.object({
  password: z.string().min(4),
  characterId: z.string().uuid(),
});

export async function create(req: AuthenticatedRequest, res: Response) {
  try {
    const validatedData = createRoomSchema.parse(req.body);
    const userId = req.userId;

    const room = await roomService.createRoom(userId, validatedData);

    // Don't send password hash to client
    const { password, ...roomWithoutPassword } = room;

    res.status(201).json({
      success: true,
      data: roomWithoutPassword,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: "Validation error",
        details: error.issues,
      });
    }

    console.error("Create room error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to create room",
    });
  }
}

export async function list(req: Request, res: Response) {
  try {
    const userId = req.userId;
    const rooms = await roomService.getRoomsByMasterId(userId);

    res.json({
      success: true,
      data: rooms,
    });
  } catch (error) {
    console.error("List rooms error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch rooms",
    });
  }
}

export async function listActive(req: Request, res: Response) {
  try {
    const rooms = await roomService.getAllActiveRooms();

    res.json({
      success: true,
      data: rooms,
    });
  } catch (error) {
    console.error("List active rooms error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch rooms",
    });
  }
}

export async function getById(req: Request, res: Response) {
  try {
    const roomId = req.params.id as string;
    const room = await roomService.getRoomById(roomId);

    if (!room) {
      return res.status(404).json({
        success: false,
        error: "Room not found",
      });
    }

    // Don't send password hash to client
    const { password, ...roomWithoutPassword } = room;

    res.json({
      success: true,
      data: roomWithoutPassword,
    });
  } catch (error) {
    console.error("Get room error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch room",
    });
  }
}

export async function update(req: AuthenticatedRequest, res: Response) {
  try {
    const roomId = req.params.id as string;
    const userId = req.userId;
    const validatedData = updateRoomSchema.parse(req.body);

    const room = await roomService.updateRoom(roomId, userId, validatedData);

    if (!room) {
      return res.status(404).json({
        success: false,
        error: "Room not found or unauthorized",
      });
    }

    // Don't send password hash to client
    const { password, ...roomWithoutPassword } = room;

    res.json({
      success: true,
      data: roomWithoutPassword,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: "Validation error",
        details: error.issues,
      });
    }

    console.error("Update room error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to update room",
    });
  }
}

export async function remove(req: AuthenticatedRequest, res: Response) {
  try {
    const roomId = req.params.id as string;
    const userId = req.userId;

    const deleted = await roomService.deleteRoom(roomId, userId);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        error: "Room not found or unauthorized",
      });
    }

    res.json({
      success: true,
      message: "Room deleted successfully",
    });
  } catch (error) {
    console.error("Delete room error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to delete room",
    });
  }
}

export async function verifyPassword(req: Request, res: Response) {
  try {
    const roomId = req.params.id as string;
    const { password } = verifyPasswordSchema.parse(req.body);

    const isValid = await roomService.verifyRoomPassword(roomId, password);

    res.json({
      success: true,
      data: { valid: isValid },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: "Validation error",
        details: error.issues,
      });
    }

    console.error("Verify password error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to verify password",
    });
  }
}

export async function joinRoom(req: AuthenticatedRequest, res: Response) {
  try {
    const roomId = req.params.id as string;
    const userId = req.userId;
    const { password, characterId } = joinRoomSchema.parse(req.body);

    const result = await roomService.joinRoom(
      roomId,
      userId,
      characterId,
      password,
    );

    if (!result.success) {
      return res.status(result.status || 400).json({
        success: false,
        error: result.error,
      });
    }

    res.json({
      success: true,
      data: result.data,
      message: "Successfully joined room",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: "Validation error",
        details: error.issues,
      });
    }

    console.error("Join room error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to join room",
    });
  }
}

export async function getRoomPlayers(req: Request, res: Response) {
  try {
    const roomId = req.params.id as string;
    const players = await roomService.getRoomPlayers(roomId);

    res.json({
      success: true,
      data: players,
    });
  } catch (error) {
    console.error("Get room players error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch room players",
    });
  }
}

export async function startGame(req: AuthenticatedRequest, res: Response) {
  try {
    const roomId = req.params.id as string;
    const userId = req.userId;

    const room = await roomService.startGame(roomId, userId);

    if (!room) {
      return res.status(404).json({
        success: false,
        error: "Room not found or you are not the master",
      });
    }

    res.json({
      success: true,
      data: room,
      message: "Game started successfully",
    });
  } catch (error) {
    console.error("Start game error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to start game",
    });
  }
}
