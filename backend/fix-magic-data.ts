
import { PrismaClient } from '@prisma/client';
import { phb2024Classes } from '../src/data/phb2024/classes.js';

const prisma = new PrismaClient();

async function main() {
  console.log('🔄 Updating spellcasting data for classes...');

  for (const cls of phb2024Classes) {
    const externalId = `${cls.id}-phb`;
    console.log(`Checking ${cls.name} (${externalId})...`);

    // Find existing class
    const existingClass = await prisma.characterClass.findUnique({
      where: { externalId }
    });

    if (!existingClass) {
        console.log(`⚠️  Class ${externalId} not found in DB. Skipping.`);
        continue;
    }

    // Get spellcasting data from phb2024Classes
    const spellcasting = cls.spellcasting || null;

    if (spellcasting) {
        console.log(`   -> Has spellcasting (${spellcasting.ability})`);

        // Update ONLY spellcasting, preserve everything else including startingEquipment
        await prisma.characterClass.update({
            where: { id: existingClass.id },
            data: {
                spellcasting: spellcasting as any
            }
        });
        console.log(`   ✅ Updated spellcasting data.`);
    } else {
        console.log(`   -> No spellcasting data (not a caster class).`);
    }
  }

  console.log('🏁 Spellcasting update completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
