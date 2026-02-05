import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt";

export interface AuthenticatedRequest extends Request {
  userId?: string;
  userEmail?: string;
  userRole?: string;
}

export function authMiddleware(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      res.status(401).json({
        success: false,
        error: "Authorization header is required",
      });
      return;
    }

    const parts = authHeader.split(" ");

    if (parts.length !== 2 || parts[0] !== "Bearer") {
      res.status(401).json({
        success: false,
        error: "Invalid authorization format. Use: Bearer <token>",
      });
      return;
    }

    const token = parts[1];
    const payload = verifyToken(token);

    if (!payload) {
      res.status(401).json({
        success: false,
        error: "Invalid or expired token",
      });
      return;
    }

    // Attach user info to request
    req.userId = payload.userId;
    req.userEmail = payload.email;
    req.userRole = payload.role;

    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      error: "Authentication failed",
    });
  }
}

// Optional middleware - doesn't fail if no token, but attaches user if present
export function optionalAuthMiddleware(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader) {
      const parts = authHeader.split(" ");

      if (parts.length === 2 && parts[0] === "Bearer") {
        const token = parts[1];
        const payload = verifyToken(token);

        if (payload) {
          req.userId = payload.userId;
          req.userEmail = payload.email;
        }
      }
    }

    next();
  } catch {
    next();
  }
}
