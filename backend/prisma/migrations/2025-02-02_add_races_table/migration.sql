-- Migration: Add races and race_traits tables
-- This migration adds support for storing D&D 5e (2024) race data

-- Create Race model
CREATE TABLE IF NOT EXISTS "Race" (
    "id" TEXT NOT NULL,
    "externalId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "nameRu" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "speed" INTEGER NOT NULL,
    "size" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Race_pkey" PRIMARY KEY ("id")
);

-- Create unique index on externalId
CREATE UNIQUE INDEX IF NOT EXISTS "Race_externalId_key" ON "Race"("externalId");

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS "Race_source_idx" ON "Race"("source");

-- Create RaceTrait model
CREATE TABLE IF NOT EXISTS "RaceTrait" (
    "id" TEXT NOT NULL,
    "raceId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "nameRu" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RaceTrait_pkey" PRIMARY KEY ("id")
);

-- Create foreign key constraint
ALTER TABLE "RaceTrait" ADD CONSTRAINT "RaceTrait_raceId_fkey" 
    FOREIGN KEY ("raceId") REFERENCES "Race"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS "RaceTrait_raceId_idx" ON "RaceTrait"("raceId");
