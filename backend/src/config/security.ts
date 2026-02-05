// Конфигурация безопасности для приложения

// Rate Limiting настройки
export const rateLimitConfig = {
  general: {
    windowMs: 15 * 60 * 1000, // 15 минут
    max: 100, // 100 запросов
  },
  auth: {
    windowMs: 15 * 60 * 1000, // 15 минут
    max: 5, // 5 попыток
  },
  create: {
    windowMs: 60 * 1000, // 1 минута
    max: 10, // 10 создания
  },
  websocket: {
    windowMs: 60 * 1000, // 1 минута
    max: 10, // 10 подключений
  },
};

// Timeout настройки (в миллисекундах)
export const timeoutConfig = {
  standard: 30000, // 30 секунд
  heavy: 60000, // 60 секунд
  quick: 10000, // 10 секунд
};

// CORS настройки
export const corsConfig = {
  allowedOrigins: [
    "http://localhost:5173",
    "http://localhost:4173",
    "https://devdenneg.github.io",
    process.env.FRONTEND_URL,
  ].filter(Boolean) as string[],
  credentials: true,
};

// Helmet настройки
export const helmetConfig = {
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
  hsts: {
    maxAge: 31536000, // 1 год
    includeSubDomains: true,
    preload: true,
  },
};

// Payload настройки
export const payloadConfig = {
  maxSize: 10 * 1024 * 1024, // 10MB
  jsonLimit: "10mb",
  urlEncodedLimit: "10mb",
};

// Server настройки
export const serverConfig = {
  timeout: 30000, // 30 секунд
  keepAliveTimeout: 65000, // 65 секунд (больше чем у load balancer)
  headersTimeout: 66000, // 66 секунд (больше чем keepAliveTimeout)
};
