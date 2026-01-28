import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret";
// Convert "7d" to seconds (7 days = 604800 seconds)
const JWT_EXPIRES_IN_SECONDS = 7 * 24 * 60 * 60; // 7 days

export interface JwtPayload {
  userId: string;
  email: string;
}

export function generateToken(payload: JwtPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN_SECONDS });
}

export function verifyToken(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
  } catch {
    return null;
  }
}
