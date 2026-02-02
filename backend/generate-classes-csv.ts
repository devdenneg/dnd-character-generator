import { phb2024Classes } from "../src/data/phb2024/classes";
import fs from "fs";
import path from "path";

// CSV header
const csvHeader = [
  "externalId",
  "name",
  "nameRu",
  "description",
  "hitDie",
  "primaryAbility",
  "savingThrows",
  "armorProficiencies",
  "weaponProficiencies",
  "skillChoices",
  "skillCount",
  "subclassLevel",
  "source",
];

// Convert array to string for CSV
function arrayToString(arr: any[]): string {
  return arr.join(" | ");
}

// Generate CSV content
const csvContent = [
  csvHeader.join(","),
  ...phb2024Classes.map((cls) => [
    cls.id,
    cls.name,
    cls.nameRu,
    `"${cls.description.replace(/"/g, '""')}"`,
    cls.hitDie,
    `"${arrayToString(cls.primaryAbility)}"`,
    `"${arrayToString(cls.savingThrows)}"`,
    `"${arrayToString(cls.armorProficiencies)}"`,
    `"${arrayToString(cls.weaponProficiencies)}"`,
    `"${arrayToString(cls.skillChoices)}"`,
    cls.skillCount,
    cls.subclassLevel,
    cls.source,
  ].join(",")),
].join("\n");

// Write to file
const outputPath = path.join(__dirname, "classes.csv");
fs.writeFileSync(outputPath, csvContent, "utf-8");

console.log(`CSV file generated: ${outputPath}`);
console.log(`Total classes: ${phb2024Classes.length}`);
