import { Request, Response } from "express";
import { z } from "zod";
import { registerUser, loginUser, getUserById } from "../services/authService";

// Validation schemas
const registerSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  name: z.string().optional(),
  role: z.enum(["player", "master"]).optional(),
});

const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
});

export async function register(req: Request, res: Response) {
  try {
    const validatedData = registerSchema.parse(req.body);
    const result = await registerUser(validatedData);

    res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        success: false,
        error: "Validation error",
        details: error.issues,
      });
      return;
    }

    if (error instanceof Error) {
      res.status(400).json({
        success: false,
        error: error.message,
      });
      return;
    }

    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const validatedData = loginSchema.parse(req.body);
    const result = await loginUser(validatedData);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        success: false,
        error: "Validation error",
        details: error.issues,
      });
      return;
    }

    if (error instanceof Error) {
      res.status(401).json({
        success: false,
        error: error.message,
      });
      return;
    }

    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
}

export async function logout(_req: Request, res: Response) {
  // With JWT, logout is handled client-side by removing the token
  // Optionally, you can implement token blacklisting here
  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
}

export async function me(req: Request, res: Response) {
  try {
    const userId = (req as any).userId;

    if (!userId) {
      res.status(401).json({
        success: false,
        error: "Not authenticated",
      });
      return;
    }

    const user = await getUserById(userId);

    if (!user) {
      res.status(404).json({
        success: false,
        error: "User not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: { user },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
}
