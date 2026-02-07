import { Router } from "express";
import { getRandomContent, search } from "../controllers/searchController";

const router = Router();

// Public search endpoint - no authentication required
router.get("/", search);
router.get("/random", getRandomContent);

export default router;
