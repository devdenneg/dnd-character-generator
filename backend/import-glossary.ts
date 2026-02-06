
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

async function main() {
  const glossaryPath = path.join(__dirname, '../glossary.json');
  console.log(`Reading glossary from ${glossaryPath}...`);

  const rawData = fs.readFileSync(glossaryPath, 'utf-8');
  const glossaryData = JSON.parse(rawData);

  console.log(`Found ${glossaryData.length} terms. Importing...`);

  let count = 0;
  for (const term of glossaryData) {
    // Basic validation
    if (!term.id) {
        console.warn('Skipping term without ID:', term);
        continue;
    }

    try {
        await prisma.glossaryTerm.upsert({
            where: { id: term.id },
            update: {
                name: term.name,
                nameRu: term.nameRu,
                category: term.category,
                description: term.description,
                source: term.source || 'Unknown',
            },
            create: {
                id: term.id,
                name: term.name,
                nameRu: term.nameRu,
                category: term.category,
                description: term.description,
                source: term.source || 'Unknown',
            }
        });
        count++;
        if (count % 50 === 0) {
            console.log(`Processed ${count} terms...`);
        }
    } catch (e) {
        console.error(`Error importing term ${term.id}:`, e);
    }
  }

  console.log(`✅ Successfully imported ${count} glossary terms.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
