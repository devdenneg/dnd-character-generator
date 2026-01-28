import { Router } from "express";
import { register, login, logout, me, telegramAuth } from "../controllers/authController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

// Public routes
router.post("/register", register);
router.post("/login", login);
router.post("/telegram-auth", telegramAuth);

// Protected routes
router.post("/logout", authMiddleware, logout);
router.get("/me", authMiddleware, me);

export default router;
