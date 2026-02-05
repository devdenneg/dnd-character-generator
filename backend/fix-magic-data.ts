
import { PrismaClient } from '@prisma/client';
import { optimizedClasses } from '../src/data/classes.optimized.js';

const prisma = new PrismaClient();

async function main() {
  console.log('🩹 Starting surgical fix for Spellcasting & Equipment Data...');

  for (const cls of optimizedClasses) {
    if (!cls.url) continue;

    console.log(`Checking ${cls.name.eng} (${cls.url})...`);

    // Find existing class
    const existingClass = await prisma.characterClass.findUnique({
      where: { externalId: cls.url }
    });

    if (!existingClass) {
        console.log(`⚠️ Class ${cls.url} not found in DB. Skipping.`);
        continue;
    }

    // Determine spellcasting data
    let spellcasting = null;

    // Check if class is a caster
    if (cls.casterType && cls.casterType !== 'NONE') {
        const primaryAbilityStr = cls.primaryCharacteristics || "Intelligence";
        const ability = primaryAbilityStr.split(',')[0].trim().toLowerCase();

        spellcasting = {
            casterType: cls.casterType,
            ability: ability || "intelligence",
            cantripsKnown: [], // detailed data might be missing but type is what matters for "Has Magic" flag
            spellsKnown: [],
            spellSlots: []
        };

        // If the source has explicit spellcasting data, use it (though seemingly missing in optimizedClasses root)
        if ((cls as any).spellcasting) {
             spellcasting = (cls as any).spellcasting;
        }

        console.log(`   -> Marking as Caster: ${cls.casterType}`);

        // Update the record
        await prisma.characterClass.update({
            where: { id: existingClass.id },
            data: {
                spellcasting: spellcasting as any,
                // Fix equipment
                startingEquipment: (cls as any).equipment || null
            }
        });
        console.log(`   ✅ Updated spellcasting and equipment data.`);
    } else {
        console.log(`   -> No magic.`);
        // Update equipment for non-casters too
        await prisma.characterClass.update({
            where: { id: existingClass.id },
            data: {
                startingEquipment: (cls as any).equipment || null
            }
        });
        console.log(`   ✅ Updated equipment data.`);
    }
  }

  console.log('🏁 Fix completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
