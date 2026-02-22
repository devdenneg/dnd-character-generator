import type {
  ClassOption,
  DerivedEquipmentItem,
  DerivedSkill,
  EquipmentOption,
  EquipmentSelection,
  SkillConflict,
  SpellOption,
} from "../types";

interface EquipmentRef {
  equipmentId: string;
  quantity?: number;
}

interface EquipmentChoiceOption {
  label?: string;
  items?: EquipmentRef[];
}

interface EquipmentChoiceBlock {
  id: string;
  options: EquipmentChoiceOption[];
}

interface ParsedStartingEquipment {
  fixed: EquipmentSelection[];
  choices: EquipmentChoiceBlock[];
  hasGoldAlternative: boolean;
}

function normalizeSkill(skill: string): string {
  return skill.trim().toLowerCase();
}

export function buildDerivedSkills(input: {
  classSkills: string[];
  backgroundSkills: string[];
  featSkills: string[];
  expertiseSkills?: string[];
  replacementSkills?: string[];
}): DerivedSkill[] {
  const map = new Map<string, Set<string>>();

  const add = (skills: string[], source: string) => {
    for (const skill of skills) {
      const key = normalizeSkill(skill);
      if (!key) continue;
      if (!map.has(key)) map.set(key, new Set());
      map.get(key)?.add(source);
    }
  };

  add(input.classSkills, "Класс");
  add(input.backgroundSkills, "Предыстория");
  add(input.featSkills, "Черта");
  add(input.replacementSkills ?? [], "Компенсация дубля");

  const expertiseSet = new Set((input.expertiseSkills ?? []).map((skill) => normalizeSkill(skill)));

  return Array.from(map.entries())
    .map(([id, sources]) => ({
      id,
      sources: Array.from(sources),
      proficiencyMultiplier: expertiseSet.has(id) ? 2 : 1,
    }))
    .sort((a, b) => a.id.localeCompare(b.id));
}

export function getSkillConflictInfo(input: {
  classSkills: string[];
  backgroundSkills: string[];
  featSkills: string[];
}): {
  conflicts: SkillConflict[];
  requiredReplacementCount: number;
  baseSkillSet: Set<string>;
} {
  const map = new Map<string, Set<string>>();

  const add = (skills: string[], source: string) => {
    for (const skill of skills) {
      const key = normalizeSkill(skill);
      if (!key) continue;
      if (!map.has(key)) map.set(key, new Set());
      map.get(key)?.add(source);
    }
  };

  add(input.classSkills, "Класс");
  add(input.backgroundSkills, "Предыстория");
  add(input.featSkills, "Черта");

  const totalSelected =
    input.classSkills.length + input.backgroundSkills.length + input.featSkills.length;
  const uniqueCount = map.size;

  const conflicts = Array.from(map.entries())
    .filter(([, sources]) => sources.size > 1)
    .map(([id, sources]) => ({ id, sources: Array.from(sources) }))
    .sort((a, b) => a.id.localeCompare(b.id));

  return {
    conflicts,
    requiredReplacementCount: Math.max(0, totalSelected - uniqueCount),
    baseSkillSet: new Set(Array.from(map.keys())),
  };
}

function addEquipment(
  map: Map<string, { quantity: number; sources: Set<string> }>,
  id: string,
  qty: number,
  source: string
) {
  if (!id) return;
  const existing = map.get(id);
  if (existing) {
    existing.quantity += qty;
    existing.sources.add(source);
    return;
  }

  map.set(id, { quantity: qty, sources: new Set([source]) });
}

export function parseClassStartingEquipment(
  selectedClass: ClassOption | null,
  includeClassEquipment: boolean,
  selectedChoiceIndexes: Record<string, number> = {},
  useGoldAlternative = false
): EquipmentSelection[] {
  if (!includeClassEquipment || !selectedClass?.startingEquipment) return [];
  if (useGoldAlternative) return [];

  const parsed = parseStartingEquipmentConfig(selectedClass.startingEquipment);
  const result: EquipmentSelection[] = [...parsed.fixed];

  for (const choice of parsed.choices) {
    const selectedIndex = selectedChoiceIndexes[choice.id] ?? 0;
    const option = choice.options[selectedIndex] ?? choice.options[0];
    const items = option?.items ?? [];

    for (const item of items) {
      if (!item.equipmentId) continue;
      result.push({
        id: item.equipmentId,
        quantity: item.quantity ?? 1,
      });
    }
  }

  return result;
}

function asRecord(value: unknown): Record<string, unknown> {
  return typeof value === "object" && value !== null ? (value as Record<string, unknown>) : {};
}

function asEquipmentRef(value: unknown): EquipmentRef | null {
  const row = asRecord(value);
  const equipmentId = row.equipmentId;
  if (typeof equipmentId !== "string" || equipmentId.length === 0) return null;

  const quantity = typeof row.quantity === "number" ? row.quantity : 1;
  return { equipmentId, quantity };
}

function normalizeLegacyStartingEquipment(data: unknown): ParsedStartingEquipment {
  const root = asRecord(data);
  const fixedRaw = Array.isArray(root.fixed) ? root.fixed : [];
  const optionsRaw = Array.isArray(root.options) ? root.options : [];

  const fixed: EquipmentSelection[] = fixedRaw
    .map(asEquipmentRef)
    .filter((item): item is EquipmentRef => Boolean(item))
    .map((item) => ({ id: item.equipmentId, quantity: item.quantity ?? 1 }));

  // Legacy format has no true choice semantics in data, treat "options" as additional fixed items.
  for (const item of optionsRaw.map(asEquipmentRef).filter((row): row is EquipmentRef => Boolean(row))) {
    fixed.push({ id: item.equipmentId, quantity: item.quantity ?? 1 });
  }

  return {
    fixed,
    choices: [],
    hasGoldAlternative: false,
  };
}

export function parseStartingEquipmentConfig(data: unknown): ParsedStartingEquipment {
  if (!Array.isArray(data)) {
    return normalizeLegacyStartingEquipment(data);
  }

  const fixed: EquipmentSelection[] = [];
  const choices: EquipmentChoiceBlock[] = [];
  let hasGoldAlternative = false;
  let choiceIndex = 0;

  for (const rawEntry of data) {
    const entry = asRecord(rawEntry);
    const type = entry.type;

    if (type === "fixed") {
      const itemsRaw = Array.isArray(entry.items) ? entry.items : [];
      for (const row of itemsRaw) {
        const item = asEquipmentRef(row);
        if (!item) continue;
        fixed.push({ id: item.equipmentId, quantity: item.quantity ?? 1 });
      }
      continue;
    }

    if (type === "choice") {
      const optionsRaw = Array.isArray(entry.options) ? entry.options : [];
      const options: EquipmentChoiceOption[] = optionsRaw.reduce<EquipmentChoiceOption[]>(
        (acc, rawOption) => {
          const option = asRecord(rawOption);
          const items = Array.isArray(option.items)
            ? option.items
                .map(asEquipmentRef)
                .filter((item): item is EquipmentRef => Boolean(item))
            : [];
          if (items.length === 0) return acc;

          acc.push({
            label: typeof option.label === "string" ? option.label : undefined,
            items,
          });
          return acc;
        },
        []
      );

      if (options.length > 0) {
        choices.push({
          id: `choice-${choiceIndex}`,
          options,
        });
        choiceIndex += 1;
      }
      continue;
    }

    if (type === "or" && typeof entry.goldAlternative === "number" && entry.goldAlternative > 0) {
      hasGoldAlternative = true;
    }
  }

  return {
    fixed,
    choices,
    hasGoldAlternative,
  };
}

export function extractClassEquipmentChoices(selectedClass: ClassOption | null): EquipmentChoiceBlock[] {
  if (!selectedClass?.startingEquipment) return [];
  return parseStartingEquipmentConfig(selectedClass.startingEquipment).choices;
}

export function hasClassGoldAlternative(selectedClass: ClassOption | null): boolean {
  if (!selectedClass?.startingEquipment) return false;
  return parseStartingEquipmentConfig(selectedClass.startingEquipment).hasGoldAlternative;
}

export function equipmentCostToCopper(value: { quantity?: number; unit?: string } | undefined): number {
  if (!value || typeof value.quantity !== "number") return 0;
  const unit = (value.unit ?? "").toLowerCase();
  const qty = value.quantity;

  if (unit === "cp") return qty;
  if (unit === "sp") return qty * 10;
  if (unit === "ep") return qty * 50;
  if (unit === "gp" || unit === "зм") return qty * 100;
  if (unit === "pp") return qty * 1000;

  return 0;
}

export function selectedEquipmentCostCopper(
  selected: EquipmentSelection[],
  equipment: EquipmentOption[]
): number {
  return selected.reduce((sum, item) => {
    const match = equipment.find(
      (row) => row.id === item.id || row.externalId === item.id
    );
    const unitCost = equipmentCostToCopper(match?.cost);
    return sum + unitCost * item.quantity;
  }, 0);
}

export function formatCopperAsGold(copper: number): string {
  const gp = copper / 100;
  return Number.isInteger(gp) ? `${gp} зм` : `${gp.toFixed(2)} зм`;
}

export function applyGoldToWallet(
  wallet: {
    copper?: number;
    silver?: number;
    electrum?: number;
    gold?: number;
    platinum?: number;
  },
  gold: number
) {
  return {
    copper: wallet.copper ?? 0,
    silver: wallet.silver ?? 0,
    electrum: wallet.electrum ?? 0,
    gold,
    platinum: wallet.platinum ?? 0,
  };
}

export function equipmentOptionLabel(option: EquipmentChoiceOption, equipment: EquipmentOption[]): string {
  if (option.label && option.label.trim().length > 0) return option.label;

  const names = (option.items ?? []).map((item) => {
    const match = equipment.find(
      (eq) => eq.id === item.equipmentId || eq.externalId === item.equipmentId
    );
    const name = match?.nameRu ?? match?.name ?? item.equipmentId;
    return `${name} x${item.quantity ?? 1}`;
  });

  return names.join(", ");
}

export function classEquipmentSummary(selectedClass: ClassOption | null): string {
  if (!selectedClass?.startingEquipment) return "Нет данных";

  const parsed = parseStartingEquipmentConfig(selectedClass.startingEquipment);
  const segments: string[] = [];
  if (parsed.fixed.length > 0) segments.push(`фикс: ${parsed.fixed.length}`);
  if (parsed.choices.length > 0) segments.push(`выборов: ${parsed.choices.length}`);
  if (parsed.hasGoldAlternative) segments.push(`альтернатива: ${selectedClass.startingGold} зм`);

  return segments.length > 0 ? segments.join(" | ") : "Нет данных";
}

export function initializeClassChoiceIndexes(selectedClass: ClassOption | null): Record<string, number> {
  const choices = extractClassEquipmentChoices(selectedClass);
  const result: Record<string, number> = {};
  for (const choice of choices) {
    result[choice.id] = 0;
  }

  return result;
}

export function buildDerivedEquipment(input: {
  includeBackgroundEquipment: boolean;
  backgroundEquipment: EquipmentSelection[];
  includeClassEquipment: boolean;
  classEquipment: EquipmentSelection[];
  customEquipment: EquipmentSelection[];
}): DerivedEquipmentItem[] {
  const map = new Map<string, { quantity: number; sources: Set<string> }>();

  if (input.includeBackgroundEquipment) {
    for (const item of input.backgroundEquipment) {
      addEquipment(map, item.id, item.quantity, "Предыстория");
    }
  }

  if (input.includeClassEquipment) {
    for (const item of input.classEquipment) {
      addEquipment(map, item.id, item.quantity, "Класс");
    }
  }

  for (const item of input.customEquipment) {
    addEquipment(map, item.id, item.quantity, "Выбор игрока");
  }

  return Array.from(map.entries()).map(([id, value]) => ({
    id,
    quantity: value.quantity,
    sources: Array.from(value.sources),
  }));
}

export function mapEquipmentNames(
  items: DerivedEquipmentItem[],
  equipment: EquipmentOption[]
): Array<DerivedEquipmentItem & { name: string }> {
  return items
    .map((item) => {
      const match = equipment.find(
        (eq) => eq.id === item.id || eq.externalId === item.id
      );
      return {
        ...item,
        name: match?.nameRu ?? match?.name ?? item.id,
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function getSpellLimits(selectedClass: ClassOption | null, level = 1) {
  const spellcasting = selectedClass?.spellcasting;
  if (!spellcasting) {
    return { hasSpellcasting: false, cantrips: 0, spells: 0, spellSlots: [] as number[] };
  }

  const index = Math.max(level - 1, 0);
  const cantrips = spellcasting.cantripsKnown?.[index] ?? 0;
  const spells = spellcasting.spellsKnown?.[index] ?? 0;
  const slots = spellcasting.spellSlots?.[index] ?? [];

  return { hasSpellcasting: true, cantrips, spells, spellSlots: slots };
}

export function getMaxSpellLevelFromSlots(slots: number[] | undefined): number {
  if (!slots || slots.length === 0) return 0;

  let maxLevel = 0;
  slots.forEach((count, index) => {
    if (count > 0) {
      maxLevel = index + 1;
    }
  });

  return maxLevel;
}

export function getAvailableSpellsForClass(
  selectedClass: ClassOption | null,
  spells: SpellOption[]
): SpellOption[] {
  if (!selectedClass) return [];

  const classTokens = new Set([
    selectedClass.id.toLowerCase(),
    selectedClass.externalId.toLowerCase(),
    selectedClass.name.toLowerCase(),
    selectedClass.nameRu.toLowerCase(),
  ]);

  return spells.filter((spell) =>
    spell.classes.some((classRef) => classTokens.has(classRef.toLowerCase()))
  );
}
