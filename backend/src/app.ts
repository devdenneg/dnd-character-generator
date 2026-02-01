import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth";
import characterRoutes from "./routes/characters";
import roomRoutes from "./routes/rooms";
import achievementRoutes from "./routes/achievements";

const app = express();

// CORS - allow multiple origins
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:4173",
  "https://devdenneg.github.io",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, curl, etc.)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(null, true); // Allow all in development
      }
    },
    credentials: true,
  }),
);
app.use(express.json());

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/characters", characterRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/achievements", achievementRoutes);

// 404 handler
app.use((_req, res) => {
  res.status(404).json({
    success: false,
    error: "Route not found",
  });
});

// Error handler
app.use(
  (
    err: Error,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction,
  ) => {
    console.error("Error:", err);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  },
);

export default app;
