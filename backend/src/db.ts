import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { neonConfig } from "@neondatabase/serverless";
import ws from "ws";

// Configure WebSocket for Neon (required for Node.js environment)
neonConfig.webSocketConstructor = ws;

const connectionString = process.env.DATABASE_URL!;

// Create Prisma adapter
const adapter = new PrismaNeon({ connectionString });

// Create Prisma Client with Neon adapter
const prisma = new PrismaClient({ adapter });

export default prisma;
