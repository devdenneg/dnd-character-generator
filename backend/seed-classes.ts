// Seed script for PHB 2024 Classes data

import { seedClasses } from "./src/services/classService";
import { phb2024Classes } from "../src/data/phb2024/classes";

// Convert frontend CharacterClass to backend format
const classesData = phb2024Classes.map((cls) => ({
  externalId: cls.id,
  name: cls.name,
  nameRu: cls.nameRu,
  description: cls.description,
  hitDie: cls.hitDie,
  primaryAbility: cls.primaryAbility,
  savingThrows: cls.savingThrows,
  armorProficiencies: cls.armorProficiencies,
  weaponProficiencies: cls.weaponProficiencies,
  skillChoices: cls.skillChoices,
  skillCount: cls.skillCount,
  subclassLevel: cls.subclassLevel,
  source: cls.source,
  features: cls.features.map((f) => ({
    name: f.name,
    nameRu: f.nameRu,
    description: f.description,
    level: f.level,
  })),
  subclasses: cls.subclasses.map((s) => ({
    externalId: s.id,
    name: s.name,
    nameRu: s.nameRu,
    description: s.description,
    source: cls.source,
    features: s.features.map((f) => ({
      name: f.name,
      nameRu: f.nameRu,
      description: f.description,
      level: f.level,
    })),
  })),
  startingEquipment: cls.startingEquipment,
}));

// Main seeding function
async function main() {
  try {
    console.log("Starting to seed PHB 2024 classes...");

    const seededClasses = await seedClasses(classesData);

    console.log(`Successfully seeded ${seededClasses.length} classes:`);
    seededClasses.forEach((cls) => {
      console.log(`  - ${cls.name} (${cls.nameRu})`);
      console.log(`    Features: ${cls.features.length}`);
      console.log(`    Subclasses: ${cls.subclasses.length}`);
    });

    console.log("\nDone!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding classes:", error);
    process.exit(1);
  }
}

// Run seed
main();
