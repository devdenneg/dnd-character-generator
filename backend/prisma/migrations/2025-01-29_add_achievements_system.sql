-- Миграция: Система достижений и опыта
-- Дата: 2025-01-29
-- Описание: Добавление полей experience/level к User и таблицы UserAchievement

-- Добавить поля опыта и уровня к таблице User
ALTER TABLE "User" 
ADD COLUMN "experience" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN "level" INTEGER NOT NULL DEFAULT 1;

-- Создать таблицу для хранения полученных пользователями достижений
CREATE TABLE "UserAchievement" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "achievementId" TEXT NOT NULL,
    "roomId" TEXT,
    "givenBy" TEXT,
    "earnedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserAchievement_pkey" PRIMARY KEY ("id")
);

-- Создать индексы для производительности
CREATE INDEX "UserAchievement_userId_idx" ON "UserAchievement"("userId");
CREATE INDEX "UserAchievement_achievementId_idx" ON "UserAchievement"("achievementId");
CREATE INDEX "UserAchievement_roomId_idx" ON "UserAchievement"("roomId");

-- Уникальное ограничение: пользователь может получить ачивку только один раз
CREATE UNIQUE INDEX "UserAchievement_userId_achievementId_key" ON "UserAchievement"("userId", "achievementId");

-- Внешние ключи
ALTER TABLE "UserAchievement" ADD CONSTRAINT "UserAchievement_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "UserAchievement" ADD CONSTRAINT "UserAchievement_givenBy_fkey" FOREIGN KEY ("givenBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- Комментарии
COMMENT ON COLUMN "User"."experience" IS 'Общий опыт игрока';
COMMENT ON COLUMN "User"."level" IS 'Текущий уровень игрока (вычисляется по формуле от experience)';
COMMENT ON TABLE "UserAchievement" IS 'Полученные пользователями достижения';
COMMENT ON COLUMN "UserAchievement"."achievementId" IS 'ID достижения из справочника achievements.ts';
COMMENT ON COLUMN "UserAchievement"."roomId" IS 'ID комнаты, в которой было выдано достижение (опционально)';
COMMENT ON COLUMN "UserAchievement"."givenBy" IS 'ID мастера, который выдал достижение';
