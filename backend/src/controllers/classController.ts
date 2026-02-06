import { Response } from "express";
import { z } from "zod";
import { AuthenticatedRequest } from "../middleware/authMiddleware";
import {
    createClass,
    deleteClass,
    getAllClasses,
    getAllClassesMeta,
    getClassByExternalId,
    getClassById,
    searchClasses,
    updateClass
} from "../services/classService";

// Validation schemas
const createClassFeatureSchema = z.object({
  name: z.string().min(1, "Feature name is required"),
  nameRu: z.string().min(1, "Feature Russian name is required"),
  description: z.string().min(1, "Feature description is required"),
  level: z.number().int().positive("Level must be positive"),
});

const createSubclassFeatureSchema = z.object({
  name: z.string().min(1, "Feature name is required"),
  nameRu: z.string().min(1, "Feature Russian name is required"),
  description: z.string().min(1, "Feature description is required"),
  level: z.number().int().positive("Level must be positive"),
});

const createSubclassSchema = z.object({
  externalId: z.string().min(1, "Subclass external ID is required"),
  name: z.string().min(1, "Subclass name is required"),
  nameRu: z.string().min(1, "Subclass Russian name is required"),
  description: z.string().min(1, "Subclass description is required"),
  source: z.enum(["srd", "phb2024"]).optional(),
  features: z
    .array(createSubclassFeatureSchema)
    .min(1, "Subclass must have at least one feature"),
});

const spellcastingSchema = z
  .object({
    ability: z.string().min(1, "Spellcasting ability is required"),
    cantripsKnown: z
      .array(z.number())
      .min(1, "Cantrips known must have at least 1 value")
      .max(20, "Cantrips known must have at most 20 values"),
    spellsKnown: z
      .array(z.number())
      .min(1, "Spells known must have at least 1 value")
      .max(20, "Spells known must have at most 20 values")
      .optional(),
    spellSlots: z
      .array(z.array(z.number()))
      .min(1, "Spell slots must have at least 1 level")
      .max(20, "Spell slots must have at most 20 character levels")
      .optional(),
  })
  .optional();

const equipmentWithQuantitySchema = z.object({
  equipmentId: z.string(),
  quantity: z.number().int().min(1).default(1),
});

const createClassSchema = z.object({
  externalId: z.string().min(1, "External ID is required"),
  name: z.string().min(1, "Name is required"),
  nameRu: z.string().min(1, "Russian name is required"),
  description: z.string().min(1, "Description is required"),
  hitDie: z.number().int().positive("Hit die must be positive"),
  primaryAbility: z.array(z.string()).min(1, "Primary ability is required"),
  savingThrows: z.array(z.string()).min(1, "Saving throws are required"),
  armorProficiencies: z.array(z.string()),
  weaponProficiencies: z.array(z.string()),
  skillChoices: z.array(z.string()),
  skillCount: z.number().int().min(0, "Skill count must be non-negative"),
  subclassLevel: z.number().int().positive("Subclass level must be positive"),
  source: z.enum(["srd", "phb2024"], {
    errorMap: () => ({ message: "Source must be srd or phb2024" }),
  }),
  features: z
    .array(createClassFeatureSchema)
    .min(1, "Class must have at least one feature"),
  subclasses: z.array(createSubclassSchema),
  startingGold: z.number().int().min(0).optional(),
  spellcasting: spellcastingSchema,
});

const updateClassSchema = z.object({
  externalId: z.string().min(1).optional(),
  name: z.string().min(1).optional(),
  nameRu: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  hitDie: z.number().int().positive().optional(),
  primaryAbility: z.array(z.string()).optional(),
  savingThrows: z.array(z.string()).optional(),
  armorProficiencies: z.array(z.string()).optional(),
  weaponProficiencies: z.array(z.string()).optional(),
  skillChoices: z.array(z.string()).optional(),
  skillCount: z.number().int().min(0).optional(),
  subclassLevel: z.number().int().positive().optional(),
  source: z.enum(["srd", "phb2024"]).optional(),
  features: z.array(createClassFeatureSchema).optional(),
  subclasses: z.array(createSubclassSchema).optional(),
  startingGold: z.number().int().min(0).optional(),
  spellcasting: spellcastingSchema,
});

// Public endpoints - no authentication required
export async function list(req: AuthenticatedRequest, res: Response) {
  try {
    const source = req.query.source as string | undefined;

    // Use meta optimized query for the list view
    // The frontend only needs basic info: name, image, hitDie, casterType, source
    const classes = await getAllClassesMeta(source);

    res.status(200).json({
      success: true,
      data: { classes },
    });
  } catch (error) {
    console.error("List classes error:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
}

// Get classes meta (without description, features, and subclasses) - for list view
export async function listMeta(req: AuthenticatedRequest, res: Response) {
  try {
    const source = req.query.source as string | undefined;
    const classes = await getAllClasses(source);

    // Remove description, features, and subclasses to reduce payload size
    const classesMeta = classes.map(
      ({ description, features, subclasses, ...rest }) => rest
    );

    res.status(200).json({
      success: true,
      data: { classes: classesMeta },
    });
  } catch (error) {
    console.error("List classes meta error:", error);
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

    const results = await searchClasses(query);

    res.status(200).json({
      success: true,
      data: { results },
    });
  } catch (error) {
    console.error("Search classes error:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
}

export async function getOne(req: AuthenticatedRequest, res: Response) {
  try {
    const id = req.params.id as string;

    const classData = await getClassById(id);

    if (!classData) {
      res.status(404).json({
        success: false,
        error: "Class not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: { class: classData },
    });
  } catch (error) {
    console.error("Get class error:", error);
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

    const classData = await getClassByExternalId(externalId);

    if (!classData) {
      res.status(404).json({
        success: false,
        error: "Class not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: { class: classData },
    });
  } catch (error) {
    console.error("Get class by external ID error:", error);
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

    // Optional: Check if user is admin
    // const user = await prisma.user.findUnique({ where: { id: userId } });
    // if (user?.role !== "admin") {
    //   res.status(403).json({ success: false, error: "Forbidden" });
    //   return;
    // }

    const validatedData = createClassSchema.parse(req.body);
    const classData = await createClass(validatedData);

    res.status(201).json({
      success: true,
      data: { class: classData },
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

    console.error("Create class error:", error);
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

    // Optional: Check if user is admin
    // const user = await prisma.user.findUnique({ where: { id: userId } });
    // if (user?.role !== "admin") {
    //   res.status(403).json({ success: false, error: "Forbidden" });
    //   return;
    // }

    const validatedData = updateClassSchema.parse(req.body);
    const classData = await updateClass(id, validatedData);

    if (!classData) {
      res.status(404).json({
        success: false,
        error: "Class not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: { class: classData },
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

    console.error("Update class error:", error);
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

    // Optional: Check if user is admin
    // const user = await prisma.user.findUnique({ where: { id: userId } });
    // if (user?.role !== "admin") {
    //   res.status(403).json({ success: false, error: "Forbidden" });
    //   return;
    // }

    await deleteClass(id);

    res.status(200).json({
      success: true,
      message: "Class deleted successfully",
    });
  } catch (error) {
    console.error("Delete class error:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
}
