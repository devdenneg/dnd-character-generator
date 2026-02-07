-- CreateTable
CREATE TABLE "Monster" (
    "id" TEXT NOT NULL,
    "externalId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "nameRu" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "alignment" TEXT NOT NULL,
    "ac" JSONB NOT NULL,
    "hp" JSONB NOT NULL,
    "speed" TEXT NOT NULL,
    "str" INTEGER NOT NULL,
    "dex" INTEGER NOT NULL,
    "con" INTEGER NOT NULL,
    "int" INTEGER NOT NULL,
    "wis" INTEGER NOT NULL,
    "cha" INTEGER NOT NULL,
    "saves" JSONB,
    "skills" JSONB,
    "vulnerabilities" TEXT,
    "resistances" TEXT,
    "immunities" TEXT,
    "senses" TEXT,
    "languages" TEXT,
    "cr" TEXT NOT NULL,
    "traits" JSONB,
    "actions" JSONB,
    "reactions" JSONB,
    "legendary" JSONB,
    "description" JSONB,
    "source" TEXT NOT NULL DEFAULT 'phb2024',
    "imageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Monster_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Monster_externalId_key" ON "Monster"("externalId");

-- CreateIndex
CREATE INDEX "Monster_externalId_idx" ON "Monster"("externalId");

-- CreateIndex
CREATE INDEX "Monster_name_idx" ON "Monster"("name");

-- CreateIndex
CREATE INDEX "Monster_nameRu_idx" ON "Monster"("nameRu");

-- CreateIndex
CREATE INDEX "Monster_type_idx" ON "Monster"("type");

-- CreateIndex
CREATE INDEX "Monster_cr_idx" ON "Monster"("cr");
