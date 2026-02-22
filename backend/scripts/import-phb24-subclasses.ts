import fs from "node:fs/promises";
import path from "node:path";
import https from "node:https";
import prisma from "../src/db";

type Json = Record<string, unknown>;

interface FiveEFeature {
  name: string;
  level?: number;
  className?: string;
  subclassShortName?: string;
  source?: string;
  entries?: unknown[];
}

interface FiveESubclass {
  name: string;
  shortName?: string;
  source: string;
  subclassFeatures: string[];
  className?: string;
  classSource?: string;
  entries?: unknown[];
}

interface FiveEClassFile {
  subclass?: FiveESubclass[];
  subclassFeature?: FiveEFeature[];
}

const CLASS_FILES: Record<string, string> = {
  barbarian: "class-barbarian.json",
  bard: "class-bard.json",
  cleric: "class-cleric.json",
  druid: "class-druid.json",
  fighter: "class-fighter.json",
  monk: "class-monk.json",
  paladin: "class-paladin.json",
  ranger: "class-ranger.json",
  rogue: "class-rogue.json",
  sorcerer: "class-sorcerer.json",
  warlock: "class-warlock.json",
  wizard: "class-wizard.json",
};

const SUBCLASS_NAME_BY_EXTERNAL_ID: Record<string, string> = {
  berserker: "Path of the Berserker",
  "wild-heart": "Path of the Wild Heart",
  "world-tree": "Path of the World Tree",
  zealot: "Path of the Zealot",
  dance: "College of Dance",
  glamour: "College of Glamour",
  lore: "College of Lore",
  valor: "College of Valor",
  life: "Life Domain",
  light: "Light Domain",
  trickery: "Trickery Domain",
  war: "War Domain",
  land: "Circle of the Land",
  moon: "Circle of the Moon",
  sea: "Circle of the Sea",
  stars: "Circle of the Stars",
  "battle-master": "Battle Master",
  champion: "Champion",
  "eldritch-knight": "Eldritch Knight",
  "psi-warrior": "Psi Warrior",
  mercy: "Warrior of Mercy",
  shadow: "Warrior of Shadow",
  elements: "Warrior of the Elements",
  "open-hand": "Warrior of the Open Hand",
  devotion: "Oath of Devotion",
  glory: "Oath of Glory",
  ancients: "Oath of the Ancients",
  vengeance: "Oath of Vengeance",
  "beast-master": "Beast Master",
  "fey-wanderer": "Fey Wanderer",
  "gloom-stalker": "Gloom Stalker",
  hunter: "Hunter",
  "arcane-trickster": "Arcane Trickster",
  assassin: "Assassin",
  soulknife: "Soulknife",
  thief: "Thief",
  aberrant: "Aberrant Sorcery",
  clockwork: "Clockwork Sorcery",
  draconic: "Draconic Sorcery",
  "wild-magic": "Wild Magic Sorcery",
  archfey: "Archfey Patron",
  celestial: "Celestial Patron",
  fiend: "Fiend Patron",
  "great-old-one": "Great Old One Patron",
  abjurer: "Abjurer",
  diviner: "Diviner",
  evoker: "Evoker",
  illusionist: "Illusionist",
};

const CACHE_DIR = path.resolve(__dirname, "../tmp/5etools-class-data");
const BASE_URL =
  "https://raw.githubusercontent.com/5etools-mirror-3/5etools-src/main/data/class";

function slug(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function httpGet(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    https
      .get(
        url,
        {
          headers: { "User-Agent": "dnd-generator-subclass-importer" },
        },
        (res) => {
          if (!res.statusCode || res.statusCode >= 400) {
            reject(new Error(`HTTP ${res.statusCode} for ${url}`));
            return;
          }
          const chunks: Buffer[] = [];
          res.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
          res.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
        }
      )
      .on("error", reject);
  });
}

async function loadClassFile(fileName: string): Promise<FiveEClassFile> {
  const fromCache = path.join(CACHE_DIR, fileName);
  try {
    const raw = await fs.readFile(fromCache, "utf8");
    return JSON.parse(raw) as FiveEClassFile;
  } catch {
    const remote = `${BASE_URL}/${fileName}`;
    const raw = await httpGet(remote);
    await fs.mkdir(CACHE_DIR, { recursive: true });
    await fs.writeFile(fromCache, raw, "utf8");
    return JSON.parse(raw) as FiveEClassFile;
  }
}

function normalizeLine(text: string): string {
  return text.replace(/\s+/g, " ").trim();
}

function entryToTextLines(value: unknown): string[] {
  if (typeof value === "string") {
    const cleaned = normalizeLine(value);
    return cleaned ? [cleaned] : [];
  }
  if (Array.isArray(value)) {
    return value.flatMap((item) => entryToTextLines(item));
  }
  if (!value || typeof value !== "object") {
    return [];
  }

  const node = value as Json;
  const out: string[] = [];

  if (typeof node.name === "string") {
    out.push(normalizeLine(`{@b ${node.name}}`));
  }

  if (Array.isArray(node.entries)) {
    out.push(...entryToTextLines(node.entries));
  }

  if (Array.isArray(node.items)) {
    out.push(...entryToTextLines(node.items));
  }

  if (typeof node.entry === "string") {
    out.push(...entryToTextLines(node.entry));
  }

  if (Array.isArray(node.rows)) {
    for (const row of node.rows) {
      if (Array.isArray(row)) {
        out.push(normalizeLine(row.map((cell) => String(cell)).join(" | ")));
      } else {
        out.push(...entryToTextLines(row));
      }
    }
  }

  return out.filter(Boolean);
}

function findSubclass(
  items: FiveESubclass[],
  className: string,
  targetName: string
): FiveESubclass | null {
  const exact = items.find(
    (item) =>
      item.source === "XPHB" &&
      item.className === className &&
      item.name.toLowerCase() === targetName.toLowerCase()
  );
  if (exact) return exact;

  const targetSlug = slug(targetName);
  return (
    items.find((item) => {
      if (item.source !== "XPHB" || item.className !== className) return false;
      const candidates = [item.name, item.shortName ?? ""].map((part) => slug(part));
      return candidates.includes(targetSlug);
    }) ?? null
  );
}

function buildSubclassDescription(subclassRu: string, lines: string[]): string[] {
  const head = `{@i ${subclassRu}} — подкласс PHB 2024.`;
  const body = lines.filter(Boolean).slice(0, 6);
  return [head, ...body];
}

async function main() {
  const dbSubclasses = await prisma.subclass.findMany({
    where: { source: "phb2024" },
    include: {
      class: {
        select: { externalId: true, name: true },
      },
    },
    orderBy: [{ class: { name: "asc" } }, { name: "asc" }],
  });

  const classDataMap = new Map<string, FiveEClassFile>();
  for (const [classExternalId, fileName] of Object.entries(CLASS_FILES)) {
    classDataMap.set(classExternalId, await loadClassFile(fileName));
  }

  const missing: string[] = [];
  let updated = 0;

  for (const dbSubclass of dbSubclasses) {
    const classExternalId = dbSubclass.class.externalId.replace(/-phb(?:2024)?$/i, "");
    const classData = classDataMap.get(classExternalId);
    if (!classData) {
      missing.push(`${dbSubclass.name}: class file not found`);
      continue;
    }

    const subclassList = classData.subclass ?? [];
    const featureList = classData.subclassFeature ?? [];
    const expectedName =
      SUBCLASS_NAME_BY_EXTERNAL_ID[dbSubclass.externalId] ?? dbSubclass.name;
    const sourceSubclass = findSubclass(
      subclassList,
      dbSubclass.class.name,
      expectedName
    );

    if (!sourceSubclass) {
      missing.push(`${dbSubclass.class.externalId}/${dbSubclass.externalId}: no XPHB match`);
      continue;
    }

    const subclassDescription = buildSubclassDescription(
      dbSubclass.nameRu,
      entryToTextLines(sourceSubclass.entries ?? [])
    );

    await prisma.subclass.update({
      where: { id: dbSubclass.id },
      data: { description: subclassDescription as unknown as object },
    });

    await prisma.subclassFeature.deleteMany({ where: { subclassId: dbSubclass.id } });

    const refs = sourceSubclass.subclassFeatures ?? [];
    for (const ref of refs) {
      const [featureName, className, classSource, subclassShortName, source, levelRaw] =
        ref.split("|");
      const level = Number(levelRaw);
      const feature = featureList.find(
        (item) =>
          item.name === featureName &&
          item.className === className &&
          item.subclassShortName === subclassShortName &&
          item.source === source
      );

      const lines = entryToTextLines(feature?.entries ?? []);
      const description = [...lines];

      await prisma.subclassFeature.create({
        data: {
          subclassId: dbSubclass.id,
          level: Number.isFinite(level) ? level : 3,
          name: featureName,
          nameRu: featureName,
          description: description as unknown as object,
        },
      });
    }

    updated += 1;
  }

  console.log(`[PHB24] Updated subclasses: ${updated}/${dbSubclasses.length}`);
  if (missing.length > 0) {
    console.log("[PHB24] Missing mappings:");
    for (const row of missing) console.log(` - ${row}`);
  }
}

main()
  .catch((error) => {
    console.error("[PHB24] import failed", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
