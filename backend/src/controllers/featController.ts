import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/authMiddleware";
import * as featService from "../services/featService";

export const getFeatsMeta = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const search = req.query.search as string;
    let feats;

    if (search) {
      feats = await featService.searchFeats(search);
    } else {
      feats = await featService.getAllFeatsMeta();
    }

    res.status(200).json({
      success: true,
      data: feats,
    });
  } catch (error) {
    console.error("Error getting feats meta:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};

export const getFeatByExternalId = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const externalId = req.params.externalId as string;
    const feat = await featService.getFeatByExternalId(externalId);

    if (!feat) {
      res.status(404).json({
        success: false,
        error: "Feat not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: feat,
    });
  } catch (error) {
    console.error("Error getting feat by external id:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};

export const getFeats = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const search = req.query.search as string;
    let feats;

    if (search) {
      feats = await featService.searchFeats(search);
    } else {
      feats = await featService.getAllFeats();
    }

    res.status(200).json({
      success: true,
      data: feats,
    });
  } catch (error) {
    console.error("Error getting feats:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};

export const getFeatById = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const id = req.params.id as string;
    const feat = await featService.getFeatById(id);

    if (!feat) {
      res.status(404).json({
        success: false,
        error: "Feat not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: feat,
    });
  } catch (error) {
    console.error("Error getting feat by id:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};
