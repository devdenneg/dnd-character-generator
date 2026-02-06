import { Router } from "express";
import * as featController from "../controllers/featController";

const router = Router();

// Public routes for feats
router.get("/", featController.getFeats);
router.get("/:id", featController.getFeatById);

export default router;
