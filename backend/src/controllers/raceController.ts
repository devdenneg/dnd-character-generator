import { Response } from "express";
import { z } from "zod";
import { AuthenticatedRequest } from "../middleware/authMiddleware";
import {
  createRace,
  deleteRace,
  getAllRaces,
  getRaceByExternalId,
  getRaceById,
  RaceInput,
  searchRaces,
  updateRace
} from "../services/raceService";


// Validation schemas
const createRaceSchema = z.object({
  externalId: z.string().min(1, "External ID is required"),
  name: z.string().min(1, "Name is required"),
  nameRu: z.string().min(1, "Russian name is required"),
  description: z.any(),
  speed: z.string().min(1, "Speed is required"),
  size: z.string().min(1, "Size is required"),
  source: z.any(),
  image: z.string().optional(),
  gallery: z.array(z.string()).optional().default([]),
  hasLineages: z.boolean().optional().default(false),
  lastUsername: z.string().optional(),
  properties: z.any().optional(),
  traits: z.array(
    z.object({
      externalId: z.string().optional(),
      name: z.string().min(1),
      nameRu: z.string().min(1),
      description: z.any(),
    })
  ),
});

const updateRaceSchema = z.object({
  externalId: z.string().min(1).optional(),
  name: z.string().min(1).optional(),
  nameRu: z.string().min(1).optional(),
  description: z.any().optional(),
  speed: z.string().min(1).optional(),
  size: z.string().optional(),
  source: z.any().optional(),
  image: z.string().optional(),
  gallery: z.array(z.string()).optional(),
  hasLineages: z.boolean().optional(),
  lastUsername: z.string().optional(),
  properties: z.any().optional(),
  traits: z
    .array(
      z.object({
        externalId: z.string().optional(),
        name: z.string().min(1),
        nameRu: z.string().min(1),
        description: z.any(),
      })
    )
    .optional(),
});



// Public endpoints - no authentication required
export async function list(req: AuthenticatedRequest, res: Response) {
  try {
    const source = req.query.source as string | undefined;
    const races = await getAllRaces(source);

    res.status(200).json({
      success: true,
      data: { races },
    });
  } catch (error) {
    console.error("List races error:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
}

// Get races meta (without description and traits) - for list view
export async function listMeta(req: AuthenticatedRequest, res: Response) {
  try {
    const source = req.query.source as string | undefined;
    const races = await getAllRaces(source);

    // Remove description and traits to reduce payload size
    const racesMeta = races.map(({ description, traits, ...rest }) => rest);

    res.status(200).json({
      success: true,
      data: { races: racesMeta },
    });
  } catch (error) {
    console.error("List races meta error:", error);
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

    const results = await searchRaces(query);

    res.status(200).json({
      success: true,
      data: { results },
    });
  } catch (error) {
    console.error("Search races error:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
}

export async function getOne(req: AuthenticatedRequest, res: Response) {
  try {
    const id = req.params.id as string;

    const race = await getRaceById(id);

    if (!race) {
      res.status(404).json({
        success: false,
        error: "Race not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: { race },
    });
  } catch (error) {
    console.error("Get race error:", error);
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

    const race = await getRaceByExternalId(externalId);

    if (!race) {
      res.status(404).json({
        success: false,
        error: "Race not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: { race },
    });
  } catch (error) {
    console.error("Get race by external ID error:", error);
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

    const validatedData = createRaceSchema.parse(req.body);
    const race = await createRace(validatedData as any as RaceInput);


    res.status(201).json({
      success: true,
      data: { race },
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

    console.error("Create race error:", error);
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

    const validatedData = updateRaceSchema.parse(req.body);
    const race = await updateRace(id, validatedData as any as Partial<RaceInput>);


    if (!race) {
      res.status(404).json({
        success: false,
        error: "Race not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: { race },
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

    console.error("Update race error:", error);
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

    await deleteRace(id);

    res.status(200).json({
      success: true,
      message: "Race deleted successfully",
    });
  } catch (error) {
    console.error("Delete race error:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
}
