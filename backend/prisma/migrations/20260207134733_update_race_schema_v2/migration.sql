/*
  Warnings:

  - Changed the type of `description` on the `Race` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `source` on the `Race` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `description` on the `RaceTrait` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Race" ADD COLUMN     "gallery" TEXT[],
ADD COLUMN     "hasLineages" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "image" TEXT,
ADD COLUMN     "lastUsername" TEXT,
ADD COLUMN     "properties" JSONB,
DROP COLUMN "description",
ADD COLUMN     "description" JSONB NOT NULL,
ALTER COLUMN "speed" SET DATA TYPE TEXT,
DROP COLUMN "source",
ADD COLUMN     "source" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "RaceTrait" ADD COLUMN     "externalId" TEXT,
DROP COLUMN "description",
ADD COLUMN     "description" JSONB NOT NULL;
