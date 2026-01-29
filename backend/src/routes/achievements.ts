import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import * as achievementController from "../controllers/achievementController";

const router = Router();

// Все роуты требуют аутентификации
router.use(authMiddleware);

// Ачивки
router.get("/rooms/:roomId", achievementController.getRoomAchievements);

// Выдача ачивок
router.post("/rooms/:roomId/grant", achievementController.grantAchievement);

// Получение выданных ачивок
router.get("/me/achievements", achievementController.getPlayerAchievements);
router.get(
  "/rooms/:roomId/player-achievements",
  achievementController.getRoomPlayerAchievements,
);

export default router;
