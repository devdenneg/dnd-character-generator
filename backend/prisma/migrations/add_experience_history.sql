-- Добавляем таблицу для истории опыта персонажей
CREATE TABLE IF NOT EXISTS "CharacterExperience" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "characterId" UUID NOT NULL,
    "userId" UUID NOT NULL,
    experience INTEGER NOT NULL,
    source VARCHAR(50) NOT NULL,
    reason TEXT,
    "levelBefore" INTEGER NOT NULL,
    "levelAfter" INTEGER NOT NULL,
    createdAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY ("characterId") REFERENCES "Characters"("id") ON DELETE CASCADE,
    FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE,

    INDEX idx_character_experience_character_id ("characterId"),
    INDEX idx_character_experience_created_at ("createdAt")
);

-- Добавляем комментарии для документа
COMMENT ON TABLE "CharacterExperience" IS 'История получения опыта персонажами';
COMMENT ON COLUMN "CharacterExperience"."characterId" IS 'ID персонажа';
COMMENT ON COLUMN "CharacterExperience"."userId" IS 'ID пользователя, которому принадлежит персонаж';
COMMENT ON COLUMN "CharacterExperience".experience IS 'Количество полученного опыта';
COMMENT ON COLUMN "CharacterExperience".source IS 'Источник опыта (battle, quest, discovery и т.д.)';
COMMENT ON COLUMN "CharacterExperience".reason IS 'Причина получения опыта (опционально)';
COMMENT ON COLUMN "CharacterExperience"."levelBefore" IS 'Уровень до получения опыта';
COMMENT ON COLUMN "CharacterExperience"."levelAfter" IS 'Уровень после получения опыта';
COMMENT ON COLUMN "CharacterExperience".createdAt IS 'Дата получения опыта';