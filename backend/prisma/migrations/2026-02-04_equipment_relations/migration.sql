-- CreateTable
CREATE TABLE "BackgroundEquipment" (
    "id" TEXT NOT NULL,
    "backgroundId" TEXT NOT NULL,
    "equipmentId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BackgroundEquipment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClassEquipment" (
    "id" TEXT NOT NULL,
    "classId" TEXT NOT NULL,
    "equipmentId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ClassEquipment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "BackgroundEquipment_backgroundId_idx" ON "BackgroundEquipment"("backgroundId");

-- CreateIndex
CREATE INDEX "BackgroundEquipment_equipmentId_idx" ON "BackgroundEquipment"("equipmentId");

-- CreateIndex
CREATE UNIQUE INDEX "BackgroundEquipment_backgroundId_equipmentId_key" ON "BackgroundEquipment"("backgroundId", "equipmentId");

-- CreateIndex
CREATE INDEX "ClassEquipment_classId_idx" ON "ClassEquipment"("classId");

-- CreateIndex
CREATE INDEX "ClassEquipment_equipmentId_idx" ON "ClassEquipment"("equipmentId");

-- CreateIndex
CREATE UNIQUE INDEX "ClassEquipment_classId_equipmentId_key" ON "ClassEquipment"("classId", "equipmentId");

-- AddForeignKey
ALTER TABLE "BackgroundEquipment" ADD CONSTRAINT "BackgroundEquipment_backgroundId_fkey" FOREIGN KEY ("backgroundId") REFERENCES "Background"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BackgroundEquipment" ADD CONSTRAINT "BackgroundEquipment_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES "Equipment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassEquipment" ADD CONSTRAINT "ClassEquipment_classId_fkey" FOREIGN KEY ("classId") REFERENCES "CharacterClass"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassEquipment" ADD CONSTRAINT "ClassEquipment_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES "Equipment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AlterTable: Remove old equipment column from Background
ALTER TABLE "Background" DROP COLUMN IF EXISTS "equipment";

-- AlterTable: Remove old startingEquipment column from CharacterClass and add startingGold
ALTER TABLE "CharacterClass" DROP COLUMN IF EXISTS "startingEquipment";
ALTER TABLE "CharacterClass" ADD COLUMN IF NOT EXISTS "startingGold" INTEGER NOT NULL DEFAULT 0;
