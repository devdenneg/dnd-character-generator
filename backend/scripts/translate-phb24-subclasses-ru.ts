import https from "node:https";
import prisma from "../src/db";

type Json = unknown[] | Record<string, unknown> | string | number | boolean | null;

const CACHE = new Map<string, string>();

function hasLatin(text: string): boolean {
  return /[A-Za-z]/.test(text);
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function escapeQuery(text: string): string {
  return encodeURIComponent(text);
}

function httpGet(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    https
      .get(
        url,
        {
          headers: {
            "User-Agent": "dnd-generator-subclass-ru-translator",
          },
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

function fixCommonRuPhrases(text: string): string {
  return text
    .replace(/\bPHB\s*2024\b/gi, "Книги игрока 2024")
    .replace(/\bMaterial components?\b/gi, "материальных компонентов")
    .replace(/\bMaterial\b/gi, "материального")
    .replace(/\bSteady Aim\b/g, "Твердой наводки")
    .replace(/\bPrimal Companion\b/g, "Первобытного спутника")
    .replace(/\bInvoke Duplicity\b/g, "Призыва Двойника")
    .replace(/\bDC\b/g, "СЛ")
    .replace(/\bd(\d+)\b/g, "к$1")
    .replace(/([А-Яа-яЁё])(\{@)/g, "$1 $2")
    .replace(/(\})([А-Яа-яЁё])/g, "$1 $2")
    .replace(/\s{2,}/g, " ")
    .trim();
}

async function translateEnToRu(text: string): Promise<string> {
  const source = text.trim();
  if (!source) return source;
  if (!hasLatin(source)) return source;
  if (CACHE.has(source)) return CACHE.get(source) as string;

  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=ru&dt=t&q=${escapeQuery(
    source
  )}`;
  const raw = await httpGet(url);
  const parsed = JSON.parse(raw) as Json;
  const root = Array.isArray(parsed) ? parsed : [];
  const rows = Array.isArray(root[0]) ? (root[0] as unknown[]) : [];
  const translated = rows
    .map((row) =>
      Array.isArray(row) && typeof row[0] === "string" ? (row[0] as string) : ""
    )
    .join("")
    .trim();

  const result = fixCommonRuPhrases(translated || source);
  CACHE.set(source, result);
  await delay(60);
  return result;
}

async function translateTagLabel(tagBody: string): Promise<string> {
  const parts = tagBody.split("|");
  if (parts.length === 0) return tagBody;
  const label = parts[0]?.trim() ?? "";
  if (!label) return tagBody;
  const nextLabel = await translateEnToRu(label);
  parts[0] = nextLabel;
  return parts.join("|");
}

async function translateLineKeepTags(line: string): Promise<string> {
  const tagRegex = /\{@([A-Za-z0-9]+)\s([^}]+)\}/g;
  const tags: string[] = [];
  let rebuilt = "";
  let cursor = 0;

  for (const match of line.matchAll(tagRegex)) {
    const full = match[0];
    const type = match[1];
    const body = match[2];
    const start = match.index ?? 0;

    rebuilt += line.slice(cursor, start);
    const translatedBody = await translateTagLabel(body);
    const nextTag = `{@${type} ${translatedBody}}`;
    tags.push(nextTag);
    rebuilt += `__TAG_${tags.length - 1}__`;
    cursor = start + full.length;
  }
  rebuilt += line.slice(cursor);

  const parts = rebuilt.split(/(__TAG_\d+__)/g);
  const translatedParts: string[] = [];
  for (const part of parts) {
    if (!part) continue;
    if (/^__TAG_\d+__$/.test(part)) {
      translatedParts.push(part);
      continue;
    }
    translatedParts.push(await translateEnToRu(part));
  }

  let restored = translatedParts.join("");
  tags.forEach((tag, index) => {
    restored = restored.replace(`__TAG_${index}__`, tag);
  });
  return fixCommonRuPhrases(restored);
}

async function translateLines(lines: unknown): Promise<unknown> {
  if (!Array.isArray(lines)) return lines;
  const out: unknown[] = [];
  for (const line of lines) {
    if (typeof line !== "string") {
      out.push(line);
      continue;
    }
    const translated = line.includes("{@")
      ? await translateLineKeepTags(line)
      : await translateEnToRu(line);
    out.push(translated);
  }
  return out;
}

async function main() {
  const subclasses = await prisma.subclass.findMany({
    where: { source: "phb2024" },
    include: { features: true },
  });

  let updatedSubclass = 0;
  let updatedFeatures = 0;

  for (const subclass of subclasses) {
    const nextNameRu = await translateEnToRu(subclass.nameRu || subclass.name);
    const nextDescription = await translateLines(subclass.description as unknown);

    await prisma.subclass.update({
      where: { id: subclass.id },
      data: {
        nameRu: nextNameRu,
        description: nextDescription as object,
      },
    });
    updatedSubclass += 1;

    for (const feature of subclass.features) {
      const nextFeatureNameRu = await translateEnToRu(feature.nameRu || feature.name);
      const nextFeatureDescription = await translateLines(feature.description as unknown);
      await prisma.subclassFeature.update({
        where: { id: feature.id },
        data: {
          nameRu: nextFeatureNameRu,
          description: nextFeatureDescription as object,
        },
      });
      updatedFeatures += 1;
    }
  }

  console.log(`[PHB24 RU] subclasses updated: ${updatedSubclass}`);
  console.log(`[PHB24 RU] subclass features updated: ${updatedFeatures}`);
  console.log(`[PHB24 RU] cache size: ${CACHE.size}`);
}

main()
  .catch((error) => {
    console.error("[PHB24 RU] failed", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
