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
import { serverConfig } from "./config/security";
import { initializeSocket } from "./socket";

const PORT = process.env.PORT || 3001;

// Create HTTP server and initialize Socket.IO
const httpServer = http.createServer(app);
const io = initializeSocket(httpServer);

// Настройки таймаутов сервера
httpServer.timeout = serverConfig.timeout;
httpServer.keepAliveTimeout = serverConfig.keepAliveTimeout;
httpServer.headersTimeout = serverConfig.headersTimeout;

httpServer.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`🔌 WebSocket server initialized`);
  console.log(`🔒 Security features enabled:`);
  console.log(`   ✓ Helmet (Security Headers)`);
  console.log(`   ✓ Rate Limiting (100 req/15min general, 5 req/15min auth)`);
  console.log(`   ✓ Request Timeouts (30s standard)`);
  console.log(`   ✓ CORS Protection`);
  console.log(`   ✓ Input Sanitization`);
  console.log(`   ✓ Payload Size Limits (10MB)`);
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

// Graceful shutdown
const gracefulShutdown = (signal: string) => {
  console.log(`\n${signal} received. Starting graceful shutdown...`);

  httpServer.close(() => {
    console.log("✓ HTTP server closed");

    // Закрываем WebSocket соединения
    io.close(() => {
      console.log("✓ WebSocket server closed");
      console.log("✓ Graceful shutdown completed");
      process.exit(0);
    });
  });

  // Если через 10 секунд не удалось закрыть, принудительно завершаем
  setTimeout(() => {
    console.error("⚠️  Forced shutdown after timeout");
    process.exit(1);
  }, 10000);
};

// Обработчики сигналов для graceful shutdown
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));

// Обработчик необработанных ошибок
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});

process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  gracefulShutdown("UNCAUGHT_EXCEPTION");
});
