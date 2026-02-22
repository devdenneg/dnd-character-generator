import type { Response } from "express";
import { z } from "zod";
import { type AuthenticatedRequest } from "../middleware/authMiddleware";
import {
  createCharacter,
  deleteCharacter,
  getCharacterById,
  getCharacterByShortId,
  levelUpCharacter,
  listCharacters,
  ServiceValidationError,
  setCharacterPrivacy,
  updateCharacter,
} from "../services/characterService";
import {
  createCharacterSchema,
  levelUpCharacterSchema,
  patchPrivacySchema,
  updateCharacterSchema,
} from "../schemas/character.schema";

function handleZodError(error: unknown, res: Response) {
  if (error instanceof z.ZodError) {
    res.status(400).json({
      success: false,
      error: "Validation error",
      details: error.issues,
    });
    return true;
  }

  return false;
}

export async function create(req: AuthenticatedRequest, res: Response) {
  try {
    const userId = req.userId!;
    const payload = createCharacterSchema.parse(req.body);
    const character = await createCharacter(userId, payload);

    res.status(201).json({ success: true, data: { character } });
  } catch (error) {
    if (handleZodError(error, res)) return;
    console.error("Create character error:", error);
    res.status(500).json({ success: false, error: "Failed to create character" });
  }
}

export async function list(req: AuthenticatedRequest, res: Response) {
  try {
    const userId = req.userId!;
    const characters = await listCharacters(userId);
    res.json({ success: true, data: { characters } });
  } catch (error) {
    console.error("List characters error:", error);
    res.status(500).json({ success: false, error: "Failed to fetch characters" });
  }
}

export async function getById(req: AuthenticatedRequest, res: Response) {
  try {
    const userId = req.userId!;
    const id = req.params.id as string;
    const character = await getCharacterById(id, userId);

    if (!character) {
      res.status(404).json({ success: false, error: "Character not found" });
      return;
    }

    res.json({ success: true, data: { character } });
  } catch (error) {
    console.error("Get character error:", error);
    res.status(500).json({ success: false, error: "Failed to fetch character" });
  }
}

export async function getByShortId(req: AuthenticatedRequest, res: Response) {
  try {
    const shortId = req.params.shortId as string;
    const character = await getCharacterByShortId(shortId, req.userId);

    if (!character) {
      res.status(404).json({ success: false, error: "Character not found" });
      return;
    }

    if ("forbidden" in character) {
      res.status(403).json({ success: false, error: "Character is private" });
      return;
    }

    res.json({ success: true, data: { character } });
  } catch (error) {
    console.error("Get by shortId error:", error);
    res.status(500).json({ success: false, error: "Failed to fetch character" });
  }
}

export async function update(req: AuthenticatedRequest, res: Response) {
  try {
    const userId = req.userId!;
    const id = req.params.id as string;
    const payload = updateCharacterSchema.parse(req.body);
    const character = await updateCharacter(id, userId, payload);

    if (!character) {
      res.status(404).json({ success: false, error: "Character not found" });
      return;
    }

    res.json({ success: true, data: { character } });
  } catch (error) {
    if (handleZodError(error, res)) return;
    console.error("Update character error:", error);
    res.status(500).json({ success: false, error: "Failed to update character" });
  }
}

export async function patchPrivacy(req: AuthenticatedRequest, res: Response) {
  try {
    const userId = req.userId!;
    const id = req.params.id as string;
    const { isPublic } = patchPrivacySchema.parse(req.body);
    const character = await setCharacterPrivacy(id, userId, isPublic);

    if (!character) {
      res.status(404).json({ success: false, error: "Character not found" });
      return;
    }

    res.json({ success: true, data: { character } });
  } catch (error) {
    if (handleZodError(error, res)) return;
    console.error("Patch privacy error:", error);
    res.status(500).json({ success: false, error: "Failed to update privacy" });
  }
}

export async function remove(req: AuthenticatedRequest, res: Response) {
  try {
    const userId = req.userId!;
    const id = req.params.id as string;
    const deleted = await deleteCharacter(id, userId);

    if (!deleted) {
      res.status(404).json({ success: false, error: "Character not found" });
      return;
    }

    res.json({ success: true, message: "Character deleted" });
  } catch (error) {
    console.error("Delete character error:", error);
    res.status(500).json({ success: false, error: "Failed to delete character" });
  }
}

export async function levelUp(req: AuthenticatedRequest, res: Response) {
  try {
    const userId = req.userId!;
    const id = req.params.id as string;
    const payload = levelUpCharacterSchema.parse(req.body);
    const character = await levelUpCharacter(id, userId, payload);

    if (!character) {
      res.status(404).json({ success: false, error: "Character not found" });
      return;
    }

    res.json({ success: true, data: { character } });
  } catch (error) {
    if (handleZodError(error, res)) return;
    if (error instanceof ServiceValidationError) {
      res.status(400).json({ success: false, error: error.message });
      return;
    }
    console.error("Level up character error:", error);
    res.status(500).json({ success: false, error: "Failed to level up character" });
  }
}
