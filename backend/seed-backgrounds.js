const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

// Импорт данных backgrounds из фронтенда
const backgroundsPath = path.join(__dirname, '../../src/data/phb2024/backgrounds.ts');
const backgroundsData = require(backgroundsPath);

const prisma = new PrismaClient();

async function seedBackgrounds() {
  console.log('🎨 Starting backgrounds seeding...');

  try {
    // Получаем все backgrounds из базы
    const existingBackgrounds = await prisma.background.findMany();
    const existingKeys = new Set(existingBackgrounds.map(bg => bg.key));

    // Фильтруем только новые
    const newBackgrounds = backgroundsData.phb2024Backgrounds.filter(bg => !existingKeys.has(bg.id));

    if (newBackgrounds.length === 0) {
      console.log('✅ All backgrounds already seeded');
      return;
    }

    console.log(`📝 Found ${newBackgrounds.length} new backgrounds to seed`);

    // Создаем новые backgrounds
    for (const bg of newBackgrounds) {
      await prisma.background.create({
        data: {
          id: bg.id,
          key: bg.id,
          name: bg.name,
          nameRu: bg.nameRu,
          description: bg.description,
          skillProficiencies: JSON.stringify(bg.skillProficiencies),
          toolProficiencies: JSON.stringify(bg.toolProficiencies),
          languages: bg.languages,
          equipment: JSON.stringify(bg.equipment),
          originFeat: bg.originFeat,
          abilityScoreIncrease: bg.abilityScoreIncrease, // Объект, а не JSON.stringify
          source: bg.source,
        },
      });
      console.log(`  ✅ Created: ${bg.nameRu}`);
    }

    console.log(`✅ Successfully seeded ${newBackgrounds.length} backgrounds`);
  } catch (error) {
    console.error('❌ Error seeding backgrounds:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

seedBackgrounds()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
