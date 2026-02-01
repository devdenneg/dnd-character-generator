import { Router } from "express";
import { getAllBackgrounds, getBackgroundById } from "../controllers/backgroundController";

const router = Router();

router.get("/", getAllBackgrounds);
router.get("/:id", getBackgroundById);

export default router;
