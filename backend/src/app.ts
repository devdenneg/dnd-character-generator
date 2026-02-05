import compression from "compression";
import cors from "cors";
import express from "express";
import mongoSanitize from "express-mongo-sanitize";
import helmet from "helmet";
import hpp from "hpp";
import { corsConfig, helmetConfig, payloadConfig } from "./config/security";
import { generalLimiter } from "./middleware/rateLimiter";
import {
  sanitizeStrings,
  validateContentType,
  validatePayloadSize,
} from "./middleware/security";
import { standardTimeout } from "./middleware/timeout";
import achievementRoutes from "./routes/achievements";
import authRoutes from "./routes/auth";
import backgroundRoutes from "./routes/backgrounds";
import characterRoutes from "./routes/characters";
import classRoutes from "./routes/classes";
import equipmentRoutes from "./routes/equipment";
import raceRoutes from "./routes/races";
import roomRoutes from "./routes/rooms";
import searchRoutes from "./routes/search";
import spellRoutes from "./routes/spells";
import uploadRoutes from "./routes/upload";

const app = express();
// Trust proxy (Nginx) for correct protocol detection
app.set("trust proxy", 1);

// Security Headers - должен быть первым
app.use(helmet(helmetConfig));

// Compression
app.use(compression());

// CORS - строгая политика для production
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, curl, etc.)
      if (!origin) return callback(null, true);

      // В production разрешаем только указанные origins
      if (process.env.NODE_ENV === "production") {
        if (corsConfig.allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error("Not allowed by CORS"));
        }
      } else {
        // В development разрешаем все
        callback(null, true);
      }
    },
    credentials: corsConfig.credentials,
  })
);

// Body parsing с ограничением размера
app.use(express.json({ limit: payloadConfig.jsonLimit }));
app.use(
  express.urlencoded({
    extended: true,
    limit: payloadConfig.urlEncodedLimit,
  })
);

// Sanitization
app.use(mongoSanitize()); // Защита от NoSQL injection
app.use(hpp()); // Защита от HTTP Parameter Pollution
app.use(sanitizeStrings); // Базовая санитизация строк

// Security middleware
app.use(validatePayloadSize);
app.use(validateContentType);

// Rate limiting - применяется ко всем routes
app.use("/api", generalLimiter);

// Timeout для всех запросов
app.use(standardTimeout);

// Health check (без rate limiting)
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Static files - serve uploaded files (for CDN)
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/characters", characterRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/achievements", achievementRoutes);
app.use("/api/races", raceRoutes);
app.use("/api/classes", classRoutes);
app.use("/api/backgrounds", backgroundRoutes);
app.use("/api/spells", spellRoutes);
app.use("/api/equipment", equipmentRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/upload", uploadRoutes);

// 404 handler
app.use((_req, res) => {
  res.status(404).json({
    success: false,
    error: "Route not found",
  });
});

// Error handler - улучшенный с логированием
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    // Логируем ошибку
    console.error("Error:", {
      message: err.message,
      stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
      path: req.path,
      method: req.method,
      ip: req.ip,
      timestamp: new Date().toISOString(),
    });

    // CORS ошибка
    if (err.message === "Not allowed by CORS") {
      res.status(403).json({
        success: false,
        error: "CORS policy: Origin not allowed",
      });
      return;
    }

    // Общая ошибка сервера
    res.status(500).json({
      success: false,
      error:
        process.env.NODE_ENV === "development"
          ? err.message
          : "Internal server error",
    });
  }
);

export default app;

