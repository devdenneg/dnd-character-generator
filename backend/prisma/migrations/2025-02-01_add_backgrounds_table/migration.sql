-- CreateTable
CREATE TABLE "Background" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "nameRu" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "skillProficiencies" TEXT NOT NULL,
    "toolProficiencies" TEXT NOT NULL,
    "languages" INTEGER NOT NULL,
    "equipment" TEXT NOT NULL,
    "originFeat" TEXT NOT NULL,
    "abilityScoreIncrease" TEXT NOT NULL,
    "source" TEXT NOT NULL DEFAULT 'phb2024',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Background_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "Background_key_key" UNIQUE ("key")
);

-- Create index for search
CREATE INDEX "Background_source_idx" ON "Background"("source");
