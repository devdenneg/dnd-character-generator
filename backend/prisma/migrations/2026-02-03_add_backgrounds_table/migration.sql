-- Migration: Add backgrounds table
-- This migration adds support for storing D&D 5e (2024) background data

-- Create Background model
CREATE TABLE IF NOT EXISTS "Background" (
    "id" TEXT NOT NULL,
    "externalId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "nameRu" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "skillProficiencies" TEXT[],
    "toolProficiencies" TEXT[],
    "languages" INTEGER NOT NULL,
    "equipment" TEXT[],
    "startingGold" INTEGER NOT NULL,
    "originFeat" TEXT NOT NULL,
    "abilityScoreIncrease" JSONB NOT NULL,
    "source" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Background_pkey" PRIMARY KEY ("id")
);

-- Create unique index on externalId
CREATE UNIQUE INDEX IF NOT EXISTS "Background_externalId_key" ON "Background"("externalId");

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS "Background_externalId_idx" ON "Background"("externalId");
CREATE INDEX IF NOT EXISTS "Background_source_idx" ON "Background"("source");
