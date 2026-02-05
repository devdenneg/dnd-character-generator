import bcrypt from "bcrypt";
import prisma from "../db";
import { generateToken } from "../utils/jwt";

export interface RegisterInput {
  email: string;
  password: string;
  name?: string;
  role?: "player" | "master";
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    name: string | null;
    role: string;
  };
  token: string;
}

const SALT_ROUNDS = 10;

export async function registerUser(
  input: RegisterInput,
): Promise<AuthResponse> {
  const { email, password, name } = input;

  // Check if user exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error("User with this email already exists");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  // Create user
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
      role: input.role || "player",
    },
  });

  // Generate token with role
  const token = generateToken({
    userId: user.id,
    email: user.email,
    role: user.role as "player" | "master",
  });

  return {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
    token,
  };
}

export async function loginUser(input: LoginInput): Promise<AuthResponse> {
  const { email, password } = input;

  // Find user
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  // Check password
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  // Generate token with role
  const token = generateToken({
    userId: user.id,
    email: user.email,
    role: user.role as "player" | "master",
  });

  return {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
    token,
  };
}

export async function getUserById(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      createdAt: true,
    },
  });

  return user;
}
