import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import * as roomController from "../controllers/roomController";

const router = Router();

// Public routes
router.get("/active", roomController.listActive);
router.post("/:id/verify", roomController.verifyPassword);

// Protected routes (require authentication)
router.use(authMiddleware);

router.post("/", roomController.create);
router.get("/", roomController.list);
router.get("/:id", roomController.getById);
router.get("/:id/players", roomController.getRoomPlayers);
router.put("/:id", roomController.update);
router.delete("/:id", roomController.remove);
router.post("/:id/join", roomController.joinRoom);
router.post("/:id/start", roomController.startGame);

export default router;
