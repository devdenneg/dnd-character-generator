
import { PrismaClient } from '@prisma/client';
import { optimizedClasses } from '../src/data/classes.optimized.js';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting surgical feature repair...');

  for (const cls of optimizedClasses) {
    if (!cls.url) continue;

    const dbClass = await prisma.characterClass.findUnique({
      where: { externalId: cls.url }
    });

    if (!dbClass) {
      console.warn(`⚠️  Class ${cls.url} not found in DB. Skipping.`);
      continue;
    }

    console.log(`✅ Updating features for ${cls.name?.rus || cls.url}...`);

    // Map features using the improved logic (English from key, Russian from name)
    const classFeatures: any[] = [];
    (cls.features || []).forEach((feat: any) => {
        const englishName = feat.key
            ? feat.key.split('-').map((s: string) => s.charAt(0).toUpperCase() + s.slice(1)).join(' ')
            : "Unknown Feature";

        classFeatures.push({
            name: englishName,
            nameRu: feat.name || "Неизвестное умение",
            description: feat.description || [],
            level: feat.level || 1
        });

        if (feat.scaling && Array.isArray(feat.scaling)) {
            feat.scaling.forEach((scalingEntry: any) => {
                const scalingName = scalingEntry.name || feat.name || "Unknown Feature";
                classFeatures.push({
                    name: englishName + " (Scaling)",
                    nameRu: scalingName,
                    description: scalingEntry.description || [],
                    level: scalingEntry.level || 1
                });
            });
        }
    });

    // Surgical update: delete old features and create new ones in a transaction
    await prisma.$transaction([
      prisma.classFeature.deleteMany({
        where: { classId: dbClass.id }
      }),
      prisma.characterClass.update({
        where: { id: dbClass.id },
        data: {
          features: {
            create: classFeatures
          }
        }
      })
    ]);
  }

  console.log('🚀 Feature repair completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
