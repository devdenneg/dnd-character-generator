import { Response } from "express";
import { z } from "zod";
import { AuthenticatedRequest } from "../middleware/authMiddleware";
import {
  getAllBackgrounds,
  getBackgroundById,
  getBackgroundByExternalId,
  createBackground,
  updateBackground,
  deleteBackground,
} from "../services/backgroundService";

// Validation schemas
const abilityScoreIncreaseSchema = z.object({
  options: z.array(z.string()),
  amount: z.array(z.number()),
});

const createBackgroundSchema = z.object({
  externalId: z.string().min(1, "External ID is required"),
  name: z.string().min(1, "Name is required"),
  nameRu: z.string().min(1, "Russian name is required"),
  description: z.string().min(1, "Description is required"),
  skillProficiencies: z.array(z.string()),
  toolProficiencies: z.array(z.string()),
  languages: z.number().int().min(0),
  equipment: z.array(z.string()),
  startingGold: z.number().int().min(0),
  originFeat: z.string(),
  abilityScoreIncrease: abilityScoreIncreaseSchema,
  source: z.enum(["srd", "phb2024"], {
    errorMap: () => ({ message: "Source must be srd or phb2024" }),
  }),
});

const updateBackgroundSchema = z.object({
  externalId: z.string().min(1).optional(),
  name: z.string().min(1).optional(),
  nameRu: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  skillProficiencies: z.array(z.string()).optional(),
  toolProficiencies: z.array(z.string()).optional(),
  languages: z.number().int().min(0).optional(),
  equipment: z.array(z.string()).optional(),
  startingGold: z.number().int().min(0).optional(),
  originFeat: z.string().optional(),
  abilityScoreIncrease: abilityScoreIncreaseSchema.optional(),
  source: z.enum(["srd", "phb2024"]).optional(),
});

// Public endpoints - no authentication required
export async function list(req: AuthenticatedRequest, res: Response) {
  try {
    const source = req.query.source as string | undefined;
    const backgrounds = await getAllBackgrounds(source);

    res.status(200).json({
      success: true,
      data: { backgrounds },
    });
  } catch (error) {
    console.error("List backgrounds error:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
}

export async function getOne(req: AuthenticatedRequest, res: Response) {
  try {
    const id = req.params.id as string;

    const background = await getBackgroundById(id);

    if (!background) {
      res.status(404).json({
        success: false,
        error: "Background not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: { background },
    });
  } catch (error) {
    console.error("Get background error:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
}

export async function getByExternalId(req: AuthenticatedRequest, res: Response) {
  try {
    const externalId = req.params.externalId as string;

    const background = await getBackgroundByExternalId(externalId);

    if (!background) {
      res.status(404).json({
        success: false,
        error: "Background not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: { background },
    });
  } catch (error) {
    console.error("Get background by external ID error:", error);
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

    const validatedData = createBackgroundSchema.parse(req.body);

    // Transform externalId to id for service
    const background = await createBackground({
      id: validatedData.externalId,
      name: validatedData.name,
      nameRu: validatedData.nameRu,
      description: validatedData.description,
      skillProficiencies: validatedData.skillProficiencies,
      toolProficiencies: validatedData.toolProficiencies,
      languages: validatedData.languages,
      equipment: validatedData.equipment,
      startingGold: validatedData.startingGold,
      originFeat: validatedData.originFeat,
      abilityScoreIncrease: validatedData.abilityScoreIncrease,
      source: validatedData.source,
    });

    res.status(201).json({
      success: true,
      data: { background },
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

    console.error("Create background error:", error);
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

    const validatedData = updateBackgroundSchema.parse(req.body);

    // Transform externalId to id for service if present
    const updateData = validatedData.externalId
      ? { ...validatedData, id: validatedData.externalId }
      : validatedData;

    const background = await updateBackground(id, updateData);

    if (!background) {
      res.status(404).json({
        success: false,
        error: "Background not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: { background },
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

    console.error("Update background error:", error);
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

    await deleteBackground(id);

    res.status(200).json({
      success: true,
      message: "Background deleted successfully",
    });
  } catch (error) {
    console.error("Delete background error:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
}
