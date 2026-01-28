import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import * as achievementController from "../controllers/achievementController";

const router = Router();

// Все роуты требуют авторизации
router.use(authMiddleware);

// Получить все доступные достижения (справочник)
router.get("/", achievementController.listAchievements);

// Получить достижения конкретного пользователя
router.get("/user/:userId", achievementController.getUserAchievements);

// Получить прогресс пользователя (опыт, уровень, достижения)
router.get("/user/:userId/progress", achievementController.getUserProgress);

// Выдать достижение игроку (только мастер)
router.post("/grant", achievementController.grantAchievement);

// Получить прогресс всех игроков в комнате (только мастер комнаты)
router.get(
  "/room/:roomId/progress",
  achievementController.getRoomPlayersProgress,
);

export default router;
