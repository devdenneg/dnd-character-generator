// Seed script for Equipment data

import { seedEquipment } from "./src/services/equipmentService";
import * as fs from "fs";
import * as path from "path";

// Load equipment data from JSON file
const equipmentDataPath = path.join(__dirname, "equipment_items.json");
const equipmentData = JSON.parse(fs.readFileSync(equipmentDataPath, "utf-8"));

// Main seeding function
async function main() {
  try {
    console.log("Starting to seed equipment...");
    console.log(`Loaded ${equipmentData.length} equipment items from JSON`);

    const seededEquipment = await seedEquipment(equipmentData);

    console.log(`Successfully seeded ${seededEquipment.length} equipment items:`);

    // Group by category for better output
    const byCategory = seededEquipment.reduce((acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    }, {} as Record<string, any[]>);

    Object.entries(byCategory).forEach(([category, items]) => {
      console.log(`\n${category}: ${items.length} items`);
    });

    console.log("\nDone!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding equipment:", error);
    process.exit(1);
  }
}

// Run the seed
main();
