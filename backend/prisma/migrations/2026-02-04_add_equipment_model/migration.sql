-- CreateTable
CREATE TABLE "Equipment" (
    "id" TEXT NOT NULL,
    "externalId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "nameRu" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "cost" JSONB NOT NULL,
    "weight" DOUBLE PRECISION,
    "source" TEXT NOT NULL,
    "description" JSONB NOT NULL,
    "damage" JSONB,
    "armorClass" INTEGER,
    "armorType" TEXT,
    "maxDexBonus" INTEGER,
    "properties" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Equipment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Equipment_externalId_key" ON "Equipment"("externalId");

-- CreateIndex
CREATE INDEX "Equipment_externalId_idx" ON "Equipment"("externalId");

-- CreateIndex
CREATE INDEX "Equipment_category_idx" ON "Equipment"("category");

-- CreateIndex
CREATE INDEX "Equipment_source_idx" ON "Equipment"("source");
