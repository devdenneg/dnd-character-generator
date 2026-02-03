import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import {
  list,
  getOne,
  getByExternalId,
  create,
  update,
  remove,
} from "../controllers/backgroundController";

const router = Router();

// Public endpoints - no authentication required for reading
router.get("/", list);
router.get("/external/:externalId", getByExternalId);
router.get("/:id", getOne);

// Admin endpoints - require authentication for modifying
router.post("/", authMiddleware, create);
router.put("/:id", authMiddleware, update);
router.delete("/:id", authMiddleware, remove);

export default router;
