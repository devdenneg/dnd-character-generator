-- Add characterId to PlayerAchievement
ALTER TABLE "PlayerAchievement" ADD COLUMN "characterId" TEXT;

-- Add foreign key to Character
ALTER TABLE "PlayerAchievement" ADD CONSTRAINT "PlayerAchievement_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"(id) ON DELETE CASCADE ON UPDATE CASCADE;

-- Add index for characterId
CREATE INDEX IF NOT EXISTS "PlayerAchievement_characterId_idx" ON "PlayerAchievement"("characterId");
