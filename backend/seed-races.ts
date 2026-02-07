// Seed script for races from races.json
import * as fs from 'fs';
import * as path from 'path';
import { seedRaces } from "./src/services/raceService";

async function main() {
  try {
    console.log("Starting to seed races from races.json...");

    // The script is run from backend directory, races.json is in the root
    const rootDir = path.join(__dirname, "..");
    const racesPath = path.join(rootDir, "races.json");

    if (!fs.existsSync(racesPath)) {
      console.error(`File not found: ${racesPath}`);
      process.exit(1);
    }

    const racesDataRaw = fs.readFileSync(racesPath, "utf8");
    const racesJson = JSON.parse(racesDataRaw);

    const mappedRaces = racesJson.map((r: any) => ({
      externalId: r.url,
      name: r.name.eng || r.name.rus || r.url,
      nameRu: r.name.rus || r.name.eng || r.url,
      description: r.description,
      speed: r.properties.speed,
      size: r.properties.size,
      source: r.source,
      image: r.image,
      gallery: r.gallery || [],
      hasLineages: r.hasLineages || false,
      lastUsername: r.lastUsername || "",
      properties: r.properties,
      traits: (r.features || []).map((f: any) => ({
        externalId: f.url,
        name: f.name.eng || f.name.rus || f.url,
        nameRu: f.name.rus || f.name.eng || f.url,
        description: f.description,
      })),
    }));


    const seededRaces = await seedRaces(mappedRaces);

    console.log(`Successfully seeded ${seededRaces.length} races:`);
    seededRaces.forEach((race) => {
      console.log(`  - ${race.name} (${race.nameRu})`);
    });

    console.log("\nDone!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding races:", error);
    process.exit(1);
  }
}

main();
