-- Add spellcasting field to CharacterClass table
ALTER TABLE "CharacterClass" ADD COLUMN "spellcasting" JSONB;
