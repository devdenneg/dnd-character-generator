import rateLimit from "express-rate-limit";

// Общий rate limiter для всех API endpoints
export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 100, // максимум 100 запросов с одного IP
  message: {
    success: false,
    error: "Слишком много запросов с вашего IP. Пожалуйста, попробуйте позже.",
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  // Пропускаем успешные запросы (не считаем их в лимите)
  skipSuccessfulRequests: false,
  // Пропускаем неудачные запросы
  skipFailedRequests: false,
});

// Строгий rate limiter для auth endpoints (защита от brute force)
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 5, // максимум 5 попыток
  message: {
    success: false,
    error:
      "Слишком много попыток входа. Пожалуйста, попробуйте через 15 минут.",
  },
  standardHeaders: true,
  legacyHeaders: false,
  // Считаем только неудачные попытки входа
  skipSuccessfulRequests: true,
});

// Rate limiter для создания ресурсов (персонажи, комнаты)
export const createLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 минута
  max: 10, // максимум 10 создания в минуту
  message: {
    success: false,
    error: "Слишком много операций создания. Пожалуйста, подождите минуту.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Rate limiter для WebSocket подключений
export const websocketLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 минута
  max: 10, // максимум 10 подключений в минуту
  message: {
    success: false,
    error: "Слишком много подключений. Пожалуйста, подождите минуту.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});
