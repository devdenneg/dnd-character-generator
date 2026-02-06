import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

async function main() {
  const filePath = path.join(__dirname, '../feats.json');
  console.log(`Reading feats from ${filePath}...`);

  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    process.exit(1);
  }

  const rawData = fs.readFileSync(filePath, 'utf-8');
  const feats = JSON.parse(rawData);

  console.log(`Found ${feats.length} feats. Importing...`);

  for (let i = 0; i < feats.length; i++) {
    const feat = feats[i];

    await prisma.feat.upsert({
      where: { id: feat.id },
      update: {
        name: feat.name,
        nameRu: feat.nameRu,
        category: feat.category,
        prerequisite: feat.prerequisite,
        description: feat.description,
        source: feat.source,
      },
      create: {
        id: feat.id,
        name: feat.name,
        nameRu: feat.nameRu,
        category: feat.category,
        prerequisite: feat.prerequisite,
        description: feat.description,
        source: feat.source,
      },
    });

    if ((i + 1) % 50 === 0) {
      console.log(`Processed ${i + 1} feats...`);
    }
  }

  console.log(`✅ Successfully imported ${feats.length} feats.`);
}

main()
  .catch((e) => {
    console.error('Error importing feats:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
