-- Migration: Add isStarted field to Room table
-- Adds ability for master to start the game and lock the room

-- Add isStarted column
ALTER TABLE "Room" ADD COLUMN "isStarted" BOOLEAN NOT NULL DEFAULT false;
