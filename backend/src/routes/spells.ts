import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import {
  list,
  listMeta,
  getOne,
  getByExternalId,
  getByClass,
  create,
  update,
  remove,
} from "../controllers/spellController";

const router = Router();

// Public endpoints - no authentication required for reading
router.get("/meta", listMeta);
router.get("/", list);
router.get("/class/:classId", getByClass);
router.get("/external/:externalId", getByExternalId);
router.get("/:id", getOne);

// Admin endpoints - require authentication for modifying
router.post("/", authMiddleware, create);
router.put("/:id", authMiddleware, update);
router.delete("/:id", authMiddleware, remove);

export default router;
