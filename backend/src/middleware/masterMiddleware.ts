import { NextFunction, Response } from "express";
import { AuthenticatedRequest } from "./authMiddleware";

export function masterMiddleware(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  if (req.userRole !== "master") {
    res.status(403).json({
      success: false,
      error: "Access denied. Master role required.",
    });
    return;
  }
  next();
}
