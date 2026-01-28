import { PrismaClient } from "@prisma/client";

// Check if we're using Neon (serverless) or regular PostgreSQL
const isNeon = process.env.DATABASE_URL?.includes('neon.tech');

let prisma: PrismaClient;

if (isNeon) {
  // Use Neon adapter for serverless PostgreSQL
  const { PrismaNeon } = require("@prisma/adapter-neon");
  const { neonConfig } = require("@neondatabase/serverless");
  const ws = require("ws");
  
  neonConfig.webSocketConstructor = ws;
  const connectionString = process.env.DATABASE_URL!;
  const adapter = new PrismaNeon({ connectionString });
  
  prisma = new PrismaClient({ adapter });
} else {
  // Use regular Prisma Client for standard PostgreSQL
  prisma = new PrismaClient();
}

export default prisma;
