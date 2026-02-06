-- -------------------------------------------------------------
-- TablePlus 6.8.0(654)
--
-- https://tableplus.com/
--
-- Database: dnd_generator
-- Generation Time: 2026-02-06 13:31:03.4230
-- -------------------------------------------------------------


DROP TABLE IF EXISTS "public"."User";
-- Table Definition
CREATE TABLE "public"."User" (
    "id" text NOT NULL,
    "email" text NOT NULL,
    "password" text NOT NULL,
    "name" text,
    "role" text NOT NULL DEFAULT 'player'::text,
    "createdAt" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp(3) NOT NULL,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."Character";
-- Table Definition
CREATE TABLE "public"."Character" (
    "id" text NOT NULL,
    "userId" text NOT NULL,
    "name" text NOT NULL,
    "data" jsonb NOT NULL,
    "createdAt" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp(3) NOT NULL,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."Room";
-- Table Definition
CREATE TABLE "public"."Room" (
    "id" text NOT NULL,
    "masterId" text NOT NULL,
    "name" text NOT NULL,
    "maxPlayers" int4 NOT NULL DEFAULT 4,
    "password" text NOT NULL,
    "isActive" bool NOT NULL DEFAULT true,
    "isStarted" bool NOT NULL DEFAULT false,
    "createdAt" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp(3) NOT NULL,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."RoomPlayer";
-- Table Definition
CREATE TABLE "public"."RoomPlayer" (
    "id" text NOT NULL,
    "roomId" text NOT NULL,
    "userId" text NOT NULL,
    "characterId" text NOT NULL,
    "joinedAt" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isOnline" bool NOT NULL DEFAULT true,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."PlayerAchievement";
-- Table Definition
CREATE TABLE "public"."PlayerAchievement" (
    "id" text NOT NULL,
    "achievementId" text NOT NULL,
    "userId" text NOT NULL,
    "grantedById" text NOT NULL,
    "grantedAt" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "characterId" text,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."Achievement";
-- Table Definition
CREATE TABLE "public"."Achievement" (
    "id" text NOT NULL,
    "name" text NOT NULL,
    "description" text NOT NULL,
    "icon" text NOT NULL,
    "xpReward" int4 NOT NULL DEFAULT 0,
    "createdAt" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "key" text NOT NULL,
    "category" text NOT NULL,
    "rarity" text NOT NULL,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."ClassFeature";
-- Table Definition
CREATE TABLE "public"."ClassFeature" (
    "id" text NOT NULL,
    "classId" text NOT NULL,
    "name" text NOT NULL,
    "nameRu" text NOT NULL,
    "level" int4 NOT NULL,
    "createdAt" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" jsonb,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."SubclassFeature";
-- Table Definition
CREATE TABLE "public"."SubclassFeature" (
    "id" text NOT NULL,
    "subclassId" text NOT NULL,
    "name" text NOT NULL,
    "nameRu" text NOT NULL,
    "level" int4 NOT NULL,
    "createdAt" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" jsonb,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."Spell";
-- Table Definition
CREATE TABLE "public"."Spell" (
    "id" text NOT NULL,
    "externalId" text NOT NULL,
    "name" text NOT NULL,
    "nameRu" text NOT NULL,
    "level" int4 NOT NULL,
    "school" text NOT NULL,
    "castingTime" text NOT NULL,
    "range" text NOT NULL,
    "components" text NOT NULL,
    "duration" text NOT NULL,
    "description" jsonb NOT NULL,
    "classes" _text,
    "source" text NOT NULL DEFAULT 'phb2024'::text,
    "createdAt" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp(3) NOT NULL,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."CharacterClass";
-- Table Definition
CREATE TABLE "public"."CharacterClass" (
    "id" text NOT NULL,
    "externalId" text NOT NULL,
    "name" text NOT NULL,
    "nameRu" text NOT NULL,
    "hitDie" int4 NOT NULL,
    "skillCount" int4 NOT NULL,
    "subclassLevel" int4 NOT NULL,
    "source" text NOT NULL,
    "createdAt" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp(3) NOT NULL,
    "spellcasting" jsonb,
    "primaryAbility" _text,
    "savingThrows" _text,
    "armorProficiencies" _text,
    "weaponProficiencies" _text,
    "skillChoices" _text,
    "startingGold" int4 NOT NULL DEFAULT 0,
    "classTable" jsonb,
    "gallery" _text,
    "image" text,
    "multiclassing" jsonb,
    "description" jsonb,
    "startingEquipment" jsonb,
    PRIMARY KEY ("id")
);

-- Column Comment
COMMENT ON COLUMN "public"."CharacterClass"."startingEquipment" IS 'Rich equipment data from PHB 2024 in JSON format';

DROP TABLE IF EXISTS "public"."Equipment";
-- Table Definition
CREATE TABLE "public"."Equipment" (
    "id" text NOT NULL,
    "externalId" text NOT NULL,
    "name" text NOT NULL,
    "nameRu" text NOT NULL,
    "category" text NOT NULL,
    "cost" jsonb NOT NULL,
    "weight" float8,
    "source" text NOT NULL,
    "description" jsonb,
    "damage" jsonb,
    "armorClass" int4,
    "armorType" text,
    "maxDexBonus" int4,
    "properties" _text DEFAULT ARRAY[]::text[],
    "createdAt" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp(3) NOT NULL,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."ClassEquipment";
-- Table Definition
CREATE TABLE "public"."ClassEquipment" (
    "id" text NOT NULL,
    "classId" text NOT NULL,
    "quantity" int4 NOT NULL DEFAULT 1,
    "choiceGroup" int4,
    "isChoice" bool NOT NULL DEFAULT false,
    "itemId" text NOT NULL,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."Subclass";
-- Table Definition
CREATE TABLE "public"."Subclass" (
    "id" text NOT NULL,
    "classId" text NOT NULL,
    "externalId" text NOT NULL,
    "name" text NOT NULL,
    "nameRu" text NOT NULL,
    "source" text NOT NULL DEFAULT 'phb2024'::text,
    "createdAt" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "classTable" jsonb,
    "description" jsonb,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."BackgroundEquipment";
-- Table Definition
CREATE TABLE "public"."BackgroundEquipment" (
    "id" text NOT NULL,
    "backgroundId" text NOT NULL,
    "quantity" int4 NOT NULL DEFAULT 1,
    "itemId" text NOT NULL,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."Background";
-- Table Definition
CREATE TABLE "public"."Background" (
    "id" text NOT NULL,
    "externalId" text NOT NULL,
    "name" text NOT NULL,
    "nameRu" text NOT NULL,
    "description" text NOT NULL,
    "skillProficiencies" _text,
    "toolProficiencies" _text,
    "languages" int4 NOT NULL,
    "startingGold" int4 NOT NULL,
    "originFeat" text NOT NULL,
    "abilityScoreIncrease" jsonb NOT NULL,
    "source" text NOT NULL,
    "createdAt" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp(3) NOT NULL,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."Race";
-- Table Definition
CREATE TABLE "public"."Race" (
    "id" text NOT NULL,
    "externalId" text NOT NULL,
    "name" text NOT NULL,
    "nameRu" text NOT NULL,
    "description" text NOT NULL,
    "speed" int4 NOT NULL,
    "size" text NOT NULL,
    "source" text NOT NULL,
    "createdAt" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp(3) NOT NULL,
    "abilityIncreases" jsonb,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."RaceTrait";
-- Table Definition
CREATE TABLE "public"."RaceTrait" (
    "id" text NOT NULL,
    "raceId" text NOT NULL,
    "name" text NOT NULL,
    "nameRu" text NOT NULL,
    "description" text NOT NULL,
    "createdAt" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);
ALTER TABLE "public"."Character" ADD FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;


-- Indices
CREATE INDEX "Character_userId_idx" ON public."Character" USING btree ("userId");
ALTER TABLE "public"."Room" ADD FOREIGN KEY ("masterId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;


-- Indices
CREATE INDEX "Room_masterId_idx" ON public."Room" USING btree ("masterId");
CREATE INDEX "Room_isActive_idx" ON public."Room" USING btree ("isActive");
ALTER TABLE "public"."RoomPlayer" ADD FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."RoomPlayer" ADD FOREIGN KEY ("roomId") REFERENCES "public"."Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."RoomPlayer" ADD FOREIGN KEY ("characterId") REFERENCES "public"."Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;


-- Indices
CREATE INDEX "RoomPlayer_roomId_idx" ON public."RoomPlayer" USING btree ("roomId");
CREATE INDEX "RoomPlayer_userId_idx" ON public."RoomPlayer" USING btree ("userId");
CREATE INDEX "RoomPlayer_characterId_idx" ON public."RoomPlayer" USING btree ("characterId");
CREATE UNIQUE INDEX "RoomPlayer_roomId_userId_key" ON public."RoomPlayer" USING btree ("roomId", "userId");
ALTER TABLE "public"."PlayerAchievement" ADD FOREIGN KEY ("grantedById") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."PlayerAchievement" ADD FOREIGN KEY ("characterId") REFERENCES "public"."Character"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "public"."PlayerAchievement" ADD FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."PlayerAchievement" ADD FOREIGN KEY ("achievementId") REFERENCES "public"."Achievement"("id") ON DELETE CASCADE ON UPDATE CASCADE;


-- Indices
CREATE INDEX "PlayerAchievement_characterId_idx" ON public."PlayerAchievement" USING btree ("characterId");
CREATE INDEX "PlayerAchievement_userId_idx" ON public."PlayerAchievement" USING btree ("userId");
CREATE INDEX "PlayerAchievement_achievementId_idx" ON public."PlayerAchievement" USING btree ("achievementId");


-- Indices
CREATE UNIQUE INDEX "Achievement_key_key" ON public."Achievement" USING btree (key);
ALTER TABLE "public"."ClassFeature" ADD FOREIGN KEY ("classId") REFERENCES "public"."CharacterClass"("id") ON DELETE CASCADE ON UPDATE CASCADE;


-- Indices
CREATE INDEX "ClassFeature_classId_idx" ON public."ClassFeature" USING btree ("classId");
ALTER TABLE "public"."SubclassFeature" ADD FOREIGN KEY ("subclassId") REFERENCES "public"."Subclass"("id") ON DELETE CASCADE ON UPDATE CASCADE;


-- Indices
CREATE INDEX "SubclassFeature_subclassId_idx" ON public."SubclassFeature" USING btree ("subclassId");


-- Indices
CREATE UNIQUE INDEX "Spell_externalId_key" ON public."Spell" USING btree ("externalId");
CREATE INDEX "Spell_externalId_idx" ON public."Spell" USING btree ("externalId");
CREATE INDEX "Spell_level_idx" ON public."Spell" USING btree (level);
CREATE INDEX "Spell_source_idx" ON public."Spell" USING btree (source);


-- Indices
CREATE UNIQUE INDEX "CharacterClass_externalId_key" ON public."CharacterClass" USING btree ("externalId");
CREATE INDEX "CharacterClass_externalId_idx" ON public."CharacterClass" USING btree ("externalId");
CREATE INDEX "CharacterClass_source_idx" ON public."CharacterClass" USING btree (source);


-- Indices
CREATE INDEX "Equipment_externalId_idx" ON public."Equipment" USING btree ("externalId");
CREATE INDEX "Equipment_category_idx" ON public."Equipment" USING btree (category);
CREATE INDEX "Equipment_source_idx" ON public."Equipment" USING btree (source);
CREATE UNIQUE INDEX "Equipment_externalId_key" ON public."Equipment" USING btree ("externalId");
ALTER TABLE "public"."ClassEquipment" ADD FOREIGN KEY ("itemId") REFERENCES "public"."Equipment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."ClassEquipment" ADD FOREIGN KEY ("classId") REFERENCES "public"."CharacterClass"("id") ON DELETE CASCADE ON UPDATE CASCADE;


-- Indices
CREATE INDEX "ClassEquipment_classId_idx" ON public."ClassEquipment" USING btree ("classId");
CREATE INDEX "ClassEquipment_itemId_idx" ON public."ClassEquipment" USING btree ("itemId");
ALTER TABLE "public"."Subclass" ADD FOREIGN KEY ("classId") REFERENCES "public"."CharacterClass"("id") ON DELETE CASCADE ON UPDATE CASCADE;


-- Indices
CREATE INDEX "Subclass_classId_idx" ON public."Subclass" USING btree ("classId");
CREATE INDEX "Subclass_externalId_idx" ON public."Subclass" USING btree ("externalId");
ALTER TABLE "public"."BackgroundEquipment" ADD FOREIGN KEY ("itemId") REFERENCES "public"."Equipment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."BackgroundEquipment" ADD FOREIGN KEY ("backgroundId") REFERENCES "public"."Background"("id") ON DELETE CASCADE ON UPDATE CASCADE;


-- Indices
CREATE INDEX "BackgroundEquipment_backgroundId_idx" ON public."BackgroundEquipment" USING btree ("backgroundId");
CREATE INDEX "BackgroundEquipment_itemId_idx" ON public."BackgroundEquipment" USING btree ("itemId");


-- Indices
CREATE UNIQUE INDEX "Background_externalId_key" ON public."Background" USING btree ("externalId");
CREATE INDEX "Background_externalId_idx" ON public."Background" USING btree ("externalId");
CREATE INDEX "Background_source_idx" ON public."Background" USING btree (source);


-- Indices
CREATE UNIQUE INDEX "Race_externalId_key" ON public."Race" USING btree ("externalId");
CREATE INDEX "Race_source_idx" ON public."Race" USING btree (source);
ALTER TABLE "public"."RaceTrait" ADD FOREIGN KEY ("raceId") REFERENCES "public"."Race"("id") ON DELETE CASCADE ON UPDATE CASCADE;


-- Indices
CREATE INDEX "RaceTrait_raceId_idx" ON public."RaceTrait" USING btree ("raceId");

-- CreateTable
CREATE TABLE "GlossaryTerm" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "nameRu" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "description" JSONB NOT NULL,
    "source" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GlossaryTerm_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "GlossaryTerm_category_idx" ON "GlossaryTerm"("category");

-- CreateIndex
CREATE INDEX "GlossaryTerm_name_idx" ON "GlossaryTerm"("name");

-- CreateIndex
CREATE INDEX "GlossaryTerm_nameRu_idx" ON "GlossaryTerm"("nameRu");
