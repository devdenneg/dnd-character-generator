import { Response } from "express";
import { z } from "zod";
import { AuthenticatedRequest } from "../middleware/authMiddleware";
import {
  createCharacter,
  getCharactersByUserId,
  getCharacterById,
  updateCharacter,
  deleteCharacter,
} from "../services/characterService";

// Validation schemas
const createCharacterSchema = z.object({
  name: z.string().min(1, "Name is required"),
  data: z.any(),
});

const updateCharacterSchema = z.object({
  name: z.string().min(1).optional(),
  data: z.any().optional(),
});

export async function create(req: AuthenticatedRequest, res: Response) {
  try {
    const userId = req.userId;

    if (!userId) {
      res.status(401).json({
        success: false,
        error: "Not authenticated",
      });
      return;
    }

    const validatedData = createCharacterSchema.parse(req.body);
    const character = await createCharacter(userId, validatedData);

    res.status(201).json({
      success: true,
      data: { character },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        success: false,
        error: "Validation error",
        details: error.issues,
      });
      return;
    }

    console.error("Create character error:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
}

export async function list(req: AuthenticatedRequest, res: Response) {
  try {
    const userId = req.userId;

    if (!userId) {
      res.status(401).json({
        success: false,
        error: "Not authenticated",
      });
      return;
    }

    const characters = await getCharactersByUserId(userId);

    res.status(200).json({
      success: true,
      data: { characters },
    });
  } catch (error) {
    console.error("List characters error:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
}

export async function getOne(req: AuthenticatedRequest, res: Response) {
  try {
    const userId = req.userId;
    const id = req.params.id as string;

    if (!userId) {
      res.status(401).json({
        success: false,
        error: "Not authenticated",
      });
      return;
    }

    const character = await getCharacterById(id, userId);

    if (!character) {
      res.status(404).json({
        success: false,
        error: "Character not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: { character },
    });
  } catch (error) {
    console.error("Get character error:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
}

export async function update(req: AuthenticatedRequest, res: Response) {
  try {
    const userId = req.userId;
    const id = req.params.id as string;

    if (!userId) {
      res.status(401).json({
        success: false,
        error: "Not authenticated",
      });
      return;
    }

    const validatedData = updateCharacterSchema.parse(req.body);
    const character = await updateCharacter(id, userId, validatedData);

    if (!character) {
      res.status(404).json({
        success: false,
        error: "Character not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: { character },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        success: false,
        error: "Validation error",
        details: error.issues,
      });
      return;
    }

    console.error("Update character error:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
}

export async function remove(req: AuthenticatedRequest, res: Response) {
  try {
    const userId = req.userId;
    const id = req.params.id as string;

    if (!userId) {
      res.status(401).json({
        success: false,
        error: "Not authenticated",
      });
      return;
    }

    const deleted = await deleteCharacter(id, userId);

    if (!deleted) {
      res.status(404).json({
        success: false,
        error: "Character not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Character deleted successfully",
    });
  } catch (error) {
    console.error("Delete character error:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
}
