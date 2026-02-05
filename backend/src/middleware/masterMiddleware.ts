import { Response, NextFunction } from "express";
import { authMiddleware, AuthenticatedRequest } from "./authMiddleware";

export async function masterMiddleware(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) {
  // First run auth middleware
  await new Promise<void>((resolve, reject) => {
    authMiddleware(req, res, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });

  // If auth middleware already sent response, return
  if (res.headersSent) return;

  // Check if user is master
  try {
    const { verifyToken } = await import("../utils/jwt");
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      res.status(401).json({
        success: false,
        error: "Authorization header is required",
      });
      return;
    }

    const token = authHeader.split(" ")[1];
    const payload = verifyToken(token);

    if (!payload || payload.role !== "master") {
      // Log for debugging
      console.log("Master middleware check failed:", {
        hasPayload: !!payload,
        role: payload?.role,
        userId: payload?.userId,
        email: payload?.email,
      });

      const errorMessage = !payload
        ? "Invalid or expired token"
        : `Access denied. Your role: ${payload.role || "none"}. Required: master.`;

      res.status(403).json({
        success: false,
        error: errorMessage,
      });
      return;
    }

    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Authentication failed",
    });
  }
}
