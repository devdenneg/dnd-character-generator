import { Request, Response } from "express";
import prisma from "../db";

export const getAllBackgrounds = async (_req: Request, res: Response) => {
  try {
    const backgrounds = await prisma.background.findMany({
      orderBy: { source: "asc", name: "asc" },
    });

    res.json({
      success: true,
      backgrounds,
    });
  } catch (error: any) {
    console.error("Get backgrounds error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch backgrounds",
      details: error?.message || "Unknown error",
    });
  }
};

export const getBackgroundById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const background = await prisma.background.findUnique({
      where: { id },
    });

    if (!background) {
      return res.status(404).json({
        success: false,
        error: "Background not found",
      });
    }

    res.json({
      success: true,
      background,
    });
  } catch (error: any) {
    console.error("Get background error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch background",
      details: error?.message || "Unknown error",
    });
  }
};
