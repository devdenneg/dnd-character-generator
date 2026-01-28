import crypto from 'crypto';

interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  photo_url?: string;
}

interface TelegramInitData {
  query_id?: string;
  user?: TelegramUser;
  auth_date: number;
  hash: string;
}

/**
 * Проверяет подлинность initData от Telegram Web App
 * @param initData - строка initData от Telegram
 * @param botToken - токен бота из .env
 * @returns объект с данными пользователя или null
 */
export function validateTelegramWebAppData(
  initData: string,
  botToken: string
): TelegramInitData | null {
  try {
    // Парсим initData
    const params = new URLSearchParams(initData);
    const hash = params.get('hash');
    
    if (!hash) {
      return null;
    }

    // Убираем hash из параметров
    params.delete('hash');

    // Сортируем параметры и создаем data-check-string
    const dataCheckString = Array.from(params.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, value]) => `${key}=${value}`)
      .join('\n');

    // Создаем секретный ключ из токена бота
    const secretKey = crypto
      .createHmac('sha256', 'WebAppData')
      .update(botToken)
      .digest();

    // Вычисляем hash
    const calculatedHash = crypto
      .createHmac('sha256', secretKey)
      .update(dataCheckString)
      .digest('hex');

    // Сравниваем хеши
    if (calculatedHash !== hash) {
      console.error('Telegram auth: Invalid hash');
      return null;
    }

    // Проверяем время (не более 1 часа)
    const authDate = parseInt(params.get('auth_date') || '0');
    const now = Math.floor(Date.now() / 1000);
    
    if (now - authDate > 3600) {
      console.error('Telegram auth: Data is too old');
      return null;
    }

    // Парсим данные пользователя
    const userParam = params.get('user');
    if (!userParam) {
      return null;
    }

    const user: TelegramUser = JSON.parse(userParam);

    return {
      query_id: params.get('query_id') || undefined,
      user,
      auth_date: authDate,
      hash,
    };
  } catch (error) {
    console.error('Telegram auth validation error:', error);
    return null;
  }
}

/**
 * Создает или находит пользователя по Telegram ID
 */
export function getTelegramUsername(user: TelegramUser): string {
  return user.username || `${user.first_name}_${user.id}`;
}

export function getTelegramEmail(user: TelegramUser): string {
  return `telegram_${user.id}@telegram.user`;
}
