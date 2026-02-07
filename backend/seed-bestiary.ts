import { PrismaClient } from "@prisma/client";
import { readFileSync } from "fs";
import { resolve } from "path";

const prisma = new PrismaClient();

// Type definitions for bestiary.json structure
interface BestiaryEntry {
  url: string;
  name: {
    rus: string;
    eng: string;
  };
  header: string; // "Medium undead, neutral evil"
  ac: any;
  hit: any;
  speed: string;
  abilities: {
    str: { value: number; mod: string; sav: string };
    dex: { value: number; mod: string; sav: string };
    con: { value: number; mod: string; sav: string };
    int: { value: number; mod: string; sav: string };
    wis: { value: number; mod: string; sav: string };
    chr: { value: number; mod: string; sav: string };
  };
  senses?: string; // mapped from "sense" in json, but schema has "senses"
  sense?: string;
  languages?: string;
  cr?: string;
  traits?: any[]; // traits in json
  actions?: any[];
  reactions?: any[];
  legendary?: {
    actions: any[];
    count: string;
  };
  description?: string[];
  vulnerability?: string;
  resistance?: string;
  immunity?: string;
  source: {
    name: {
        label: string;
    }
  };
  image?: string;
}

// Function to parse the header string into size, type, alignment
function parseHeader(header: string) {
  // Example: "Средняя нежить, нейтральная злая"
  // Example: "Huge giant, chaotic evil"
  // It seems the JSON has localized keys, but header value is in Russian in the example provided?
  // User provided example: "Средняя нежить, нейтральная злая"
  // Be careful, maybe we want to store it as is or try to split.
  // Let's store raw strings for now or try to split by comma.

  const parts = header.split(",").map(s => s.trim());

  // parts[0] is usually "Size Type" (e.g., "Medium undead")
  // parts[1] is alignment (e.g., "neutral evil")

  const sizeType = parts[0] || "";
  const alignment = parts.slice(1).join(", ") || "unaligned";

  const sizeTypeParts = sizeType.split(" ");
  const size = sizeTypeParts[0]; // "Средняя"
  const type = sizeTypeParts.slice(1).join(" "); // "нежить"

  return { size, type, alignment };
}

async function main() {
  console.log("🌱 Seeding Bestiary...");

  const bestiaryPath = resolve(__dirname, "../bestiary.json");
  const data = JSON.parse(readFileSync(bestiaryPath, "utf-8")) as BestiaryEntry[];

  console.log(`Found ${data.length} entries.`);

  for (const entry of data) {
    // Basic mapping
    const headerInfo = parseHeader(entry.header || "");

    // Safety checks
    if (!entry.url || !entry.name?.rus) {
         console.warn(`Skipping entry without url or name: ${JSON.stringify(entry.name)}`);
         continue;
    }

    try {
      await prisma.monster.upsert({
        where: { externalId: entry.url },
        update: {
            name: entry.name.eng || entry.name.rus, // Fallback to rus if eng missing? or keep consistency? Schema says name and nameRu.
            nameRu: entry.name.rus,
            size: headerInfo.size,
            type: headerInfo.type,
            alignment: headerInfo.alignment, // Should we normalize?
            ac: entry.ac || {},
            hp: entry.hit || {},
            speed: entry.speed || "",
            str: entry.abilities?.str?.value || 10,
            dex: entry.abilities?.dex?.value || 10,
            con: entry.abilities?.con?.value || 10,
            int: entry.abilities?.int?.value || 10,
            wis: entry.abilities?.wis?.value || 10,
            cha: entry.abilities?.chr?.value || 10,
            saves: extractSaves(entry.abilities) as any,
            skills: undefined,
            vulnerabilities: entry.vulnerability || null,
            resistances: entry.resistance || null,
            immunities: entry.immunity || null,
            senses: entry.sense || entry.senses || null,
            languages: entry.languages || null,
            cr: entry.cr || "0",
            traits: (entry.traits || []) as any,
            actions: (entry.actions || []) as any,
            reactions: (entry.reactions || []) as any,
            legendary: (entry.legendary || null) as any,
            description: (entry.description || []) as any,
            source: entry.source?.name?.label || "Unknown",
            imageUrl: entry.image || null,
        },
        create: {
            externalId: entry.url,
            name: entry.name.eng || entry.name.rus,
            nameRu: entry.name.rus,
            size: headerInfo.size,
            type: headerInfo.type,
            alignment: headerInfo.alignment,
            ac: (entry.ac || {}) as any,
            hp: (entry.hit || {}) as any,
            speed: entry.speed || "",
            str: entry.abilities?.str?.value || 10,
            dex: entry.abilities?.dex?.value || 10,
            con: entry.abilities?.con?.value || 10,
            int: entry.abilities?.int?.value || 10,
            wis: entry.abilities?.wis?.value || 10,
            cha: entry.abilities?.chr?.value || 10,
            saves: extractSaves(entry.abilities) as any,
            skills: undefined,
            vulnerabilities: entry.vulnerability || null,
            resistances: entry.resistance || null,
            immunities: entry.immunity || null,
            senses: entry.sense || entry.senses || null,
            languages: entry.languages || null,
            cr: entry.cr || "0",
            traits: (entry.traits || []) as any,
            actions: (entry.actions || []) as any,
            reactions: (entry.reactions || []) as any,
            legendary: (entry.legendary || null) as any,
            description: (entry.description || []) as any,
            source: entry.source?.name?.label || "Unknown",
            imageUrl: entry.image || null,
        },
      });
      process.stdout.write(".");
    } catch (e) {
      console.error(`\nFailed to seed ${entry.url}:`, e);
    }
  }

  console.log("\n✅ Bestiary seeding completed.");
}

function extractSaves(abilities: any) {
    if (!abilities) return null;
    const saves: Record<string, string> = {};
    // Logic: usually 'sav' field exists if proficient? Check json sample.
    // "str": { "value": 16, "mod": "+3", "sav": "+3" } -> invludes sav equal to mod if not proficient? No, usually distinct.
    // In sample: "str": { "sav": "+3", "mod": "+3" }. If they are equal, maybe not proficient? Or maybe proficient?
    // Actually, looking at sample 'avatar-of-death-dmg', all stats 16 (+3), sav +3. Proficiency bonus +0? Unlikely for CR -?
    // Let's just store what's in 'sav' if needed, or simply store the object.
    // For now returning null or simplified object.
    // Let's store the whole abilities object in stats? Schema has str, dex, etc as Int.
    // saves is Json. Let's map { str: "+3", dex: "+3" } etc.

    ['str', 'dex', 'con', 'int', 'wis', 'chr'].forEach(stat => {
        if (abilities[stat]?.sav) {
            saves[stat] = abilities[stat].sav;
        }
    });

    return Object.keys(saves).length > 0 ? saves : null;
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
