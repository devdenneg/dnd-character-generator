import { Router } from "express";
import { authMiddleware, optionalAuthMiddleware } from "../middleware/authMiddleware";
import {
  create,
  getById,
  getByShortId,
  levelUp,
  list,
  patchPrivacy,
  remove,
  update,
} from "../controllers/characterController";

const router = Router();

router.get("/s/:shortId", optionalAuthMiddleware, getByShortId);

router.use(authMiddleware);
router.post("/", create);
router.get("/", list);
router.get("/:id", getById);
router.put("/:id", update);
router.patch("/:id/level-up", levelUp);
router.patch("/:id/privacy", patchPrivacy);
router.delete("/:id", remove);

export default router;
