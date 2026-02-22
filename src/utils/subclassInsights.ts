function asArray<T>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : [];
}

export function extractPlainText(value: unknown): string {
  if (typeof value === "string") {
    return value
      .replace(/\{@[^ ]+\s([^}|]+)(?:\|[^}]*)?\}/g, "$1")
      .replace(/\s+/g, " ")
      .trim();
  }

  if (Array.isArray(value)) {
    return value.map((item) => extractPlainText(item)).filter(Boolean).join(" ").trim();
  }

  if (!value || typeof value !== "object") return "";

  const node = value as Record<string, unknown>;
  const chunks: string[] = [];
  if (typeof node.text === "string") chunks.push(extractPlainText(node.text));
  if (Array.isArray(node.entries)) chunks.push(extractPlainText(node.entries));
  if (Array.isArray(node.items)) chunks.push(extractPlainText(node.items));
  if (typeof node.entry === "string") chunks.push(extractPlainText(node.entry));
  if (typeof node.name === "string") chunks.push(extractPlainText(node.name));

  return chunks.filter(Boolean).join(" ").trim();
}

const IMPACT_RULES: Array<{ label: string; patterns: RegExp[] }> = [
  {
    label: "Заклинания",
    patterns: [/\bspell\b/i, /\bcantrip\b/i, /заклинан/i, /фокус/i, /яче[йк]к/i],
  },
  {
    label: "Навыки и владения",
    patterns: [/\bskill\b/i, /\bproficien/i, /навык/i, /владен/i, /expertise/i, /эксперт/i],
  },
  {
    label: "Хиты и выживаемость",
    patterns: [/\bhit point/i, /\btemporary hit/i, /хит/i, /хп/i, /сопротивлен/i, /immunity/i, /resistance/i],
  },
  {
    label: "Класс брони и защита",
    patterns: [/\barmor class\b/i, /\bac\b/i, /класс брони/i, /\bshield\b/i, /щит/i, /доспех/i],
  },
  {
    label: "Спасброски",
    patterns: [/\bsaving throw/i, /спасброс/i],
  },
  {
    label: "Атаки и урон",
    patterns: [/\battack\b/i, /\bdamage\b/i, /атак/i, /урон/i, /\bweapon\b/i, /оруж/i],
  },
  {
    label: "Мобильность",
    patterns: [/\bspeed\b/i, /скорост/i, /движен/i, /\bteleport/i, /телепорт/i],
  },
  {
    label: "Ресурсы класса",
    patterns: [/\brace\b/i, /\bki\b/i, /\bsorcery point/i, /\bchannel divinity/i, /ярост/i, /ки/i],
  },
];

export function detectSubclassImpacts(description: unknown): string[] {
  const text = extractPlainText(description).toLowerCase();
  if (!text) return [];

  return IMPACT_RULES.filter((rule) => rule.patterns.some((pattern) => pattern.test(text))).map(
    (rule) => rule.label
  );
}

export function describeFeatureInfluence(features: Array<{ description?: unknown }>): string[] {
  const all = new Set<string>();
  for (const feature of features) {
    for (const tag of detectSubclassImpacts(feature.description)) {
      all.add(tag);
    }
  }
  return Array.from(all);
}

export function firstDescriptionLine(description: unknown, max = 220): string {
  const lines = asArray<unknown>(description)
    .map((line) => extractPlainText(line))
    .filter(Boolean);
  const first = lines[0] ?? "";
  if (!first) return "";
  return first.length > max ? `${first.slice(0, max)}...` : first;
}

