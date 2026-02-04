import { Response } from "express";
import { z } from "zod";
import { AuthenticatedRequest } from "../middleware/authMiddleware";
import {
  getAllEquipment,
  getEquipmentById,
  getEquipmentByExternalId,
  createEquipment,
  updateEquipment,
  deleteEquipment,
  searchEquipment,
} from "../services/equipmentService";

// Validation schemas
const createEquipmentSchema = z.object({
  externalId: z.string().min(1, "External ID is required"),
  name: z.string().min(1, "Name is required"),
  nameRu: z.string().min(1, "Russian name is required"),
  category: z.string().min(1, "Category is required"),
  cost: z.object({
    quantity: z.number(),
    unit: z.string(),
  }),
  weight: z.number().optional(),
  source: z.string().min(1, "Source is required"),
  description: z.array(z.string()),
  damage: z
    .object({
      dice: z.string(),
      type: z.string(),
    })
    .optional(),
  armorClass: z.number().optional(),
  armorType: z.string().optional(),
  maxDexBonus: z.number().optional(),
  properties: z.array(z.string()).optional(),
});

const updateEquipmentSchema = z.object({
  externalId: z.string().min(1).optional(),
  name: z.string().min(1).optional(),
  nameRu: z.string().min(1).optional(),
  category: z.string().min(1).optional(),
  cost: z
    .object({
      quantity: z.number(),
      unit: z.string(),
    })
    .optional(),
  weight: z.number().optional(),
  source: z.string().min(1).optional(),
  description: z.array(z.string()).optional(),
  damage: z
    .object({
      dice: z.string(),
      type: z.string(),
    })
    .optional(),
  armorClass: z.number().optional(),
  armorType: z.string().optional(),
  maxDexBonus: z.number().optional(),
  properties: z.array(z.string()).optional(),
});

// Public endpoints - no authentication required
export async function list(req: AuthenticatedRequest, res: Response) {
  try {
    const source = req.query.source as string | undefined;
    const equipment = await getAllEquipment(source);

    res.status(200).json({
      success: true,
      data: { equipment },
    });
  } catch (error) {
    console.error("List equipment error:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
}

// Get equipment meta (without descriptions) - for list view
export async function listMeta(req: AuthenticatedRequest, res: Response) {
  try {
    const source = req.query.source as string | undefined;
    const equipment = await getAllEquipment(source);

    // Remove descriptions to reduce payload size
    const equipmentMeta = equipment.map(({ description, ...rest }) => rest);

    res.status(200).json({
      success: true,
      data: { equipment: equipmentMeta },
    });
  } catch (error) {
    console.error("List equipment meta error:", error);
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

    const results = await searchEquipment(query);

    res.status(200).json({
      success: true,
      data: { results },
    });
  } catch (error) {
    console.error("Search equipment error:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
}

export async function getOne(req: AuthenticatedRequest, res: Response) {
  try {
    const id = req.params.id as string;

    const equipment = await getEquipmentById(id);

    if (!equipment) {
      res.status(404).json({
        success: false,
        error: "Equipment not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: { equipment },
    });
  } catch (error) {
    console.error("Get equipment error:", error);
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

    const equipment = await getEquipmentByExternalId(externalId);

    if (!equipment) {
      res.status(404).json({
        success: false,
        error: "Equipment not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: { equipment },
    });
  } catch (error) {
    console.error("Get equipment by external ID error:", error);
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

    const validatedData = createEquipmentSchema.parse(req.body);
    const equipment = await createEquipment(validatedData);

    res.status(201).json({
      success: true,
      data: { equipment },
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

    console.error("Create equipment error:", error);
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

    const validatedData = updateEquipmentSchema.parse(req.body);
    const equipment = await updateEquipment(id, validatedData);

    if (!equipment) {
      res.status(404).json({
        success: false,
        error: "Equipment not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: { equipment },
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

    console.error("Update equipment error:", error);
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

    await deleteEquipment(id);

    res.status(200).json({
      success: true,
      message: "Equipment deleted successfully",
    });
  } catch (error) {
    console.error("Delete equipment error:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
}
