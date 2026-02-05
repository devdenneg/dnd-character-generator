import { Router } from "express";
import { login, logout, me, register, telegramAuth } from "../controllers/authController";
import { authMiddleware } from "../middleware/authMiddleware";
import { authLimiter } from "../middleware/rateLimiter";

const router = Router();

// Public routes - с строгим rate limiting для защиты от brute force
router.post("/register", authLimiter, register);
router.post("/login", authLimiter, login);
router.post("/telegram-auth", authLimiter, telegramAuth);

// Protected routes
router.post("/logout", authMiddleware, logout);
router.get("/me", authMiddleware, me);

export default router;
