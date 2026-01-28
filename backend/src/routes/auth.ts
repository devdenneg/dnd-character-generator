import { Router } from "express";
import { register, login, logout, me } from "../controllers/authController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

// Public routes
router.post("/register", register);
router.post("/login", login);

// Protected routes
router.post("/logout", authMiddleware, logout);
router.get("/me", authMiddleware, me);

export default router;
