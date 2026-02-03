import { Router } from "express";
import { search } from "../controllers/searchController";

const router = Router();

// Public search endpoint - no authentication required
router.get("/", search);

export default router;
