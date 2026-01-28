-- Migration: Add character selection to RoomPlayer
-- Adds characterId field to link players with their characters

-- Add characterId column to RoomPlayer table
ALTER TABLE "RoomPlayer" ADD COLUMN "characterId" TEXT;

-- Update existing records to have a temporary value (if any exist)
-- Note: This should be run before adding NOT NULL constraint
-- If there are existing records, you'll need to manually set their characterId

-- Make characterId NOT NULL
ALTER TABLE "RoomPlayer" ALTER COLUMN "characterId" SET NOT NULL;

-- Create index for characterId
CREATE INDEX "RoomPlayer_characterId_idx" ON "RoomPlayer"("characterId");

-- Add foreign key constraint
ALTER TABLE "RoomPlayer" 
    ADD CONSTRAINT "RoomPlayer_characterId_fkey" 
    FOREIGN KEY ("characterId") 
    REFERENCES "Character"("id") 
    ON DELETE CASCADE 
    ON UPDATE CASCADE;
