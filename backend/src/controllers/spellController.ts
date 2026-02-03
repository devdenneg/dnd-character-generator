import { Response } from "express";
import { z } from "zod";
import { AuthenticatedRequest } from "../middleware/authMiddleware";
import {
  getAllSpells,
  getSpellById,
  getSpellByExternalId,
  getSpellsByClass,
  createSpell,
  updateSpell,
  deleteSpell,
  searchSpells,
} from "../services/spellService";

// Validation schemas
const createSpellSchema = z.object({
  externalId: z.string().min(1, "External ID is required"),
  name: z.string().min(1, "Name is required"),
  nameRu: z.string().min(1, "Russian name is required"),
  level: z.number().int().min(0).max(9, "Level must be between 0 and 9"),
  school: z.string().min(1, "School is required"),
  castingTime: z.string().min(1, "Casting time is required"),
  range: z.string().min(1, "Range is required"),
  components: z.string().min(1, "Components are required"),
  duration: z.string().min(1, "Duration is required"),
  description: z.string().min(1, "Description is required"),
  classes: z.array(z.string().min(1, "Class name is required")),
  source: z.enum(["srd", "phb2024"]).optional().default("phb2024"),
});

const updateSpellSchema = z.object({
  externalId: z.string().min(1).optional(),
  name: z.string().min(1).optional(),
  nameRu: z.string().min(1).optional(),
  level: z.number().int().min(0).max(9).optional(),
  school: z.string().min(1).optional(),
  castingTime: z.string().min(1).optional(),
  range: z.string().min(1).optional(),
  components: z.string().min(1).optional(),
  duration: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  classes: z.array(z.string().min(1)).optional(),
  source: z.enum(["srd", "phb2024"]).optional(),
});

// Public endpoints - no authentication required
export async function list(req: AuthenticatedRequest, res: Response) {
  try {
    const source = req.query.source as string | undefined;
    const spells = await getAllSpells(source);

    res.status(200).json({
      success: true,
      data: { spells },
    });
  } catch (error) {
    console.error("List spells error:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
}

export async function search(req: AuthenticatedRequest, res: Response) {
  try {
    const query = req.query.q as string;

    if (!query || query.trim().length === 0) {
      res.status(200).json({
        success: true,
        data: { results: [] },
      });
      return;
    }

    const results = await searchSpells(query);

    res.status(200).json({
      success: true,
      data: { results },
    });
  } catch (error) {
    console.error("Search spells error:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
}

export async function getOne(req: AuthenticatedRequest, res: Response) {
  try {
    const id = req.params.id as string;

    const spell = await getSpellById(id);

    if (!spell) {
      res.status(404).json({
        success: false,
        error: "Spell not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: { spell },
    });
  } catch (error) {
    console.error("Get spell error:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
}

export async function getByExternalId(
  req: AuthenticatedRequest,
  res: Response
) {
  try {
    const externalId = req.params.externalId as string;

    const spell = await getSpellByExternalId(externalId);

    if (!spell) {
      res.status(404).json({
        success: false,
        error: "Spell not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: { spell },
    });
  } catch (error) {
    console.error("Get spell by external ID error:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
}

export async function getByClass(req: AuthenticatedRequest, res: Response) {
  try {
    const classId = req.params.classId as string;
    const source = req.query.source as string | undefined;

    const spells = await getSpellsByClass(classId, source);

    res.status(200).json({
      success: true,
      data: { spells },
    });
  } catch (error) {
    console.error("Get spells by class error:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
}

// Admin endpoints - require authentication
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

    const validatedData = createSpellSchema.parse(req.body);
    const spell = await createSpell(validatedData);

    res.status(201).json({
      success: true,
      data: { spell },
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

    console.error("Create spell error:", error);
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

    const validatedData = updateSpellSchema.parse(req.body);
    const spell = await updateSpell(id, validatedData);

    if (!spell) {
      res.status(404).json({
        success: false,
        error: "Spell not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: { spell },
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

    console.error("Update spell error:", error);
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

    await deleteSpell(id);

    res.status(200).json({
      success: true,
      message: "Spell deleted successfully",
    });
  } catch (error) {
    console.error("Delete spell error:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
}
