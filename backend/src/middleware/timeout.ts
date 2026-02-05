import { NextFunction, Request, Response } from "express";

// Middleware для установки таймаута на запросы
export function requestTimeout(timeoutMs: number = 30000) {
  return (req: Request, res: Response, next: NextFunction) => {
    // Устанавливаем таймаут на запрос
    req.setTimeout(timeoutMs, () => {
      if (!res.headersSent) {
        res.status(408).json({
          success: false,
          error: "Время ожидания запроса истекло",
        });
      }
    });

    // Устанавливаем таймаут на ответ
    res.setTimeout(timeoutMs, () => {
      if (!res.headersSent) {
        res.status(408).json({
          success: false,
          error: "Время ожидания ответа истекло",
        });
      }
    });

    next();
  };
}

// Специальный таймаут для тяжелых операций (например, генерация PDF, загрузка больших данных)
export const heavyOperationTimeout = requestTimeout(60000); // 60 секунд

// Стандартный таймаут для обычных операций
export const standardTimeout = requestTimeout(30000); // 30 секунд

// Быстрый таймаут для простых операций
export const quickTimeout = requestTimeout(10000); // 10 секунд
