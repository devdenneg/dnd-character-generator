import { NextFunction, Request, Response } from "express";

// Максимальный размер payload (10MB)
const MAX_PAYLOAD_SIZE = 10 * 1024 * 1024;

// Middleware для проверки размера payload
export function validatePayloadSize(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const contentLength = req.headers["content-length"];

  if (contentLength && parseInt(contentLength) > MAX_PAYLOAD_SIZE) {
    res.status(413).json({
      success: false,
      error: "Размер запроса слишком большой. Максимум 10MB.",
    });
    return;
  }

  next();
}

// Middleware для проверки Content-Type
export function validateContentType(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Пропускаем GET запросы
  if (req.method === "GET" || req.method === "DELETE") {
    next();
    return;
  }

  const contentType = req.headers["content-type"];

  // Проверяем что Content-Type указан для POST/PUT/PATCH
  if (!contentType) {
    res.status(400).json({
      success: false,
      error: "Content-Type header обязателен",
    });
    return;
  }

  // Разрешаем только JSON и form-data
  const allowedTypes = [
    "application/json",
    "multipart/form-data",
    "application/x-www-form-urlencoded",
  ];

  const isAllowed = allowedTypes.some((type) => contentType.includes(type));

  if (!isAllowed) {
    res.status(415).json({
      success: false,
      error: "Неподдерживаемый Content-Type. Используйте application/json",
    });
    return;
  }

  next();
}

// Middleware для санитизации строк (базовая защита от XSS)
export function sanitizeStrings(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  if (req.body) {
    req.body = sanitizeObject(req.body);
  }

  if (req.query) {
    req.query = sanitizeObject(req.query);
  }

  if (req.params) {
    req.params = sanitizeObject(req.params);
  }

  next();
}

// Рекурсивная функция для санитизации объектов
function sanitizeObject(obj: any): any {
  if (typeof obj === "string") {
    // Удаляем потенциально опасные символы
    return obj
      .replace(/[<>]/g, "") // Удаляем < и >
      .trim();
  }

  if (Array.isArray(obj)) {
    return obj.map(sanitizeObject);
  }

  if (obj !== null && typeof obj === "object") {
    const sanitized: any = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        sanitized[key] = sanitizeObject(obj[key]);
      }
    }
    return sanitized;
  }

  return obj;
}
