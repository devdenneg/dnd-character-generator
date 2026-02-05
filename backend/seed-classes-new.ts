
import { PrismaClient } from '@prisma/client';
import { optimizedClasses } from '../src/data/classes.optimized.js';

const prisma = new PrismaClient();

// Mappings
const ABILITY_MAP: Record<string, string> = {
  "Сила": "strength",
  "Ловкость": "dexterity",
  "Телосложение": "constitution",
  "Интеллект": "intelligence",
  "Мудрость": "wisdom",
  "Харизма": "charisma"
};

const SKILL_MAP: Record<string, string> = {
  "Акробатика": "acrobatics",
  "Уход за животными": "animal_handling",
  "Магия": "arcana",
  "Атлетика": "athletics",
  "Обман": "deception",
  "История": "history",
  "Проницательность": "insight",
  "Запугивание": "intimidation",
  "Расследование": "investigation",
  "Медицина": "medicine",
  "Природа": "nature",
  "Восприятие": "perception",
  "Выступление": "performance",
  "Убеждение": "persuasion",
  "Религия": "religion",
  "Ловкость рук": "sleight_of_hand",
  "Скрытность": "stealth",
  "Выживание": "survival"
};

async function main() {
  console.log('🌱 Starting database seed (Base Classes - ALL FIELDS)...');

  const baseClasses = optimizedClasses;
  console.log('🧹 Cleaning old data...');
  await prisma.subclassFeature.deleteMany({});
  await prisma.subclass.deleteMany({});
  await prisma.classFeature.deleteMany({});
  await prisma.characterClass.deleteMany({});

  console.log('✅ Old data cleared.');

  // Filter base classes (already filtered in the .ts file, but keeping for safety)
  const classes = baseClasses.filter((item: any) =>
    item.source?.group?.label !== 'Subclass' &&
    !item.class &&
    !item.parentClass
  );

  console.log(`Found ${classes.length} base classes to seed.`);

  // 4. Process and Insert
  for (const cls of classes) {
    if (!cls.name?.eng) {
        console.warn('Skipping class without English name:', cls.url);
        continue;
    }

    console.log(`Processing ${cls.name.eng} (${cls.url})...`);

    // Parse Primary Characteristics
    const primaryabilitiesStr = cls.primaryCharacteristics || "";
    const primaryAbility = primaryabilitiesStr.split(',').map((s: string) => {
        const key = s.trim();
        return ABILITY_MAP[key] || key.toLowerCase();
    }).filter(Boolean);

    // Parse Saving Throws
    const savesStr = cls.savingThrows || "";
    const savingThrows = savesStr.split(',').map((s: string) => {
        const key = s.trim();
        return ABILITY_MAP[key] || key.toLowerCase();
    }).filter(Boolean);

    // Parse Proficiencies
    const armorProfs = cls.proficiency?.armor ? [cls.proficiency.armor] : [];
    const weaponProfs = cls.proficiency?.weapon ? [cls.proficiency.weapon] : [];

    // Skill Choices
    let skillChoices: string[] = [];
    if (cls.proficiency?.skill) {
        Object.keys(SKILL_MAP).forEach(ruSkill => {
            if (cls.proficiency.skill.includes(ruSkill)) {
                skillChoices.push(SKILL_MAP[ruSkill]);
            }
        });
    }

    // Features mapping - include both base features and scaling entries
    const classFeatures: any[] = [];

    (cls.features || []).forEach((feat: any) => {
        // Add the base feature
        classFeatures.push({
            name: feat.name || "Unknown Feature",
            nameRu: feat.name || "Неизвестное умение",
            description: feat.description || [],
            level: feat.level || 1
        });

        // Add scaling entries as separate features
        if (feat.scaling && Array.isArray(feat.scaling)) {
            feat.scaling.forEach((scalingEntry: any) => {
                classFeatures.push({
                    name: scalingEntry.name || feat.name || "Unknown Feature",
                    nameRu: scalingEntry.name || feat.name || "Неизвестное умение",
                    description: scalingEntry.description || [],
                    level: scalingEntry.level || 1
                });
            });
        }
    });


    // Extract starting gold if possible
    let startingGold = 0;
    if (cls.startingGold) {
        startingGold = parseInt(cls.startingGold) || 0;
    }

    // Extract skill count from proficiency.skill string (e.g., "Выберите любые 3 навыка" -> 3)
    let skillCount = 2; // default
    if (cls.proficiency?.skill) {
        const skillMatch = cls.proficiency.skill.match(/(\d+)/);
        if (skillMatch) {
            skillCount = parseInt(skillMatch[1]);
        }
    }

    // Extract subclass level from features or use default
    let subclassLevel = 3; // default for most classes
    // Try to find subclass feature level
    const subclassFeature = cls.features?.find((f: any) =>
        f.name?.toLowerCase().includes('подкласс') ||
        f.name?.toLowerCase().includes('subclass') ||
        f.key?.includes('subclass')
    );
    if (subclassFeature?.level) {
        subclassLevel = subclassFeature.level;
    }

    // Create the record
    await prisma.characterClass.create({
      data: {
        externalId: cls.url,
        name: cls.name.eng,
        nameRu: cls.name.rus,
        description: cls.description || [], // Now Json
        image: cls.image || null,
        gallery: cls.gallery || [],
        hitDie: typeof cls.hitDice === 'object' ? cls.hitDice.maxValue : parseInt(cls.hitDice) || 8,
        primaryAbility,
        savingThrows,
        armorProficiencies: armorProfs,
        weaponProficiencies: weaponProfs,
        skillChoices,
        skillCount,
        subclassLevel,
        source: "phb2024",
        spellcasting: cls.spellcasting || null,
        classTable: cls.table || null, // Full table data
        multiclassing: cls.multiclassing || null,
        startingGold,
        startingEquipment: cls.equipment || null,
        features: {
            create: classFeatures
        }
      }
    });
  }

  console.log('🚀 Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
