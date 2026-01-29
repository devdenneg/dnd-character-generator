import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import * as achievementController from "../controllers/achievementController";

const router = Router();

// Все маршруты требуют аутентификации
router.use(authMiddleware);

// CRUD для ачивок
router.post("/rooms/:roomId", achievementController.createAchievement);
router.get("/rooms/:roomId", achievementController.getRoomAchievements);
router.get("/rooms/:roomId/achievements/:achievementId", achievementController.getAchievement);
router.put("/rooms/:roomId/achievements/:achievementId", achievementController.updateAchievement);
router.delete("/rooms/:roomId/achievements/:achievementId", achievementController.deleteAchievement);

// Выдача ачивок
router.post("/rooms/:roomId/grant", achievementController.grantAchievement);

// Получение ачивок пользователя
router.get("/me/achievements", achievementController.getPlayerAchievements);

// Получение всех выданных ачивок в комнате (для мастера)
router.get("/rooms/:roomId/player-achievements", achievementController.getRoomPlayerAchievements);

export default router;