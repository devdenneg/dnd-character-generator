-- Обновление структуры Achievement для соответствия Neon БД

-- Удаляем внешние ключи
ALTER TABLE "Achievement" DROP CONSTRAINT IF EXISTS "Achievement_roomId_fkey";
ALTER TABLE "Achievement" DROP CONSTRAINT IF EXISTS "Achievement_createdById_fkey";

-- Удаляем старые поля
ALTER TABLE "Achievement" DROP COLUMN IF EXISTS "roomId";
ALTER TABLE "Achievement" DROP COLUMN IF EXISTS "createdById";
ALTER TABLE "Achievement" DROP COLUMN IF EXISTS "updatedAt";
ALTER TABLE "Achievement" DROP COLUMN IF EXISTS "deletedAt";

-- Добавляем новые поля
ALTER TABLE "Achievement" ADD COLUMN IF NOT EXISTS "key" TEXT NOT NULL DEFAULT '';
ALTER TABLE "Achievement" ADD COLUMN IF NOT EXISTS "category" TEXT NOT NULL DEFAULT 'general';
ALTER TABLE "Achievement" ADD COLUMN IF NOT EXISTS "rarity" TEXT NOT NULL DEFAULT 'common';

-- Обновляем существующие записи (генерируем ключи из названий)
UPDATE "Achievement" SET "key" = LOWER(REGEXP_REPLACE(name, '[^a-zA-Z0-9]+', '_', 'g')) WHERE "key" = '';
