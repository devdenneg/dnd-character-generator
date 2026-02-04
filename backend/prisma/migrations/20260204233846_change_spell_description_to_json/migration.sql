-- AlterTable
ALTER TABLE "Spell" ALTER COLUMN "description" SET DATA TYPE JSONB USING
  CASE
    WHEN "description" IS NULL THEN NULL
    WHEN "description" ~ '^\[.*\]$' OR "description" ~ '^\{.*\}$' THEN "description"::jsonb
    ELSE to_jsonb(ARRAY["description"])
  END;
