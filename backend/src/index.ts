import dotenv from "dotenv";
import { existsSync } from "fs";
import { resolve } from "path";

// Load .env.local if exists (for local development), otherwise .env (for production)
const envLocalPath = resolve(__dirname, "../.env.local");
const envPath = resolve(__dirname, "../.env");

if (existsSync(envLocalPath)) {
  console.log("📝 Loading .env.local (local development)");
  dotenv.config({ path: envLocalPath });
} else if (existsSync(envPath)) {
  console.log("📝 Loading .env (production)");
  dotenv.config({ path: envPath });
} else {
  console.log("⚠️  No .env file found, using environment variables");
}

import http from "http";
import app from "./app";
import { initializeSocket } from "./socket";

const PORT = process.env.PORT || 3001;

// Create HTTP server and initialize Socket.IO
const httpServer = http.createServer(app);
const io = initializeSocket(httpServer);

httpServer.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`🔌 WebSocket server initialized`);
  console.log(`📚 API endpoints:`);
  console.log(`   POST /api/auth/register - Register new user`);
  console.log(`   POST /api/auth/login    - Login user`);
  console.log(`   POST /api/auth/logout   - Logout user`);
  console.log(`   GET  /api/auth/me       - Get current user`);
  console.log(`   GET  /api/characters    - Get user's characters`);
  console.log(`   POST /api/characters    - Create character`);
  console.log(`   GET  /api/characters/:id - Get character by ID`);
  console.log(`   PUT  /api/characters/:id - Update character`);
  console.log(`   DELETE /api/characters/:id - Delete character`);
  console.log(`   GET  /api/rooms/active  - Get active rooms (public)`);
  console.log(`   GET  /api/rooms         - Get master's rooms`);
  console.log(`   POST /api/rooms         - Create room`);
  console.log(`   GET  /api/rooms/:id     - Get room by ID`);
  console.log(`   PUT  /api/rooms/:id     - Update room`);
  console.log(`   DELETE /api/rooms/:id   - Delete room`);
  console.log(`   POST /api/rooms/:id/join - Join room (player)`);
});
