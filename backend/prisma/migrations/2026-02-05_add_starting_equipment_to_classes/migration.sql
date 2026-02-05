-- Add startingEquipment field to CharacterClass table
-- This migration adds support for rich JSON equipment data from PHB 2024

ALTER TABLE "CharacterClass" ADD COLUMN "startingEquipment" JSONB;

-- Add comment for documentation
COMMENT ON COLUMN "CharacterClass"."startingEquipment" IS 'Rich equipment data from PHB 2024 in JSON format';
