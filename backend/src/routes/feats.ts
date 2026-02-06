import { Router } from "express";
import * as featController from "../controllers/featController";

const router = Router();

// Public routes for feats
router.get("/meta", featController.getFeatsMeta);
router.get("/external/:externalId", featController.getFeatByExternalId);
router.get("/", featController.getFeats);
router.get("/:id", featController.getFeatById);

export default router;
