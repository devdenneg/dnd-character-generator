import { useBackendClass, useBackendSpellsByClass } from "@/api/hooks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLevelUpCharacterMutation } from "./api/mutations";
import { useCharacterByIdQuery } from "./api/queries";

interface SpellEntry {
  id: string;
  nameRu?: string;
  name?: string;
  level: number;
}

interface BackendClassFeature {
  id: string;
  nameRu?: string;
  name?: string;
  level: number;
}

interface BackendSubclassFeature {
  id: string;
  nameRu?: string;
  name?: string;
  level: number;
}

interface BackendSubclass {
  id: string;
  nameRu?: string;
  name?: string;
  features?: BackendSubclassFeature[];
}

interface BackendClass {
  id: string;
  nameRu?: string;
  name?: string;
  subclassLevel?: number;
  spellcasting?: {
    cantripsKnown?: number[];
    spellsKnown?: number[];
    spellSlots?: number[][];
  };
  features?: BackendClassFeature[];
  subclasses?: BackendSubclass[];
}

interface CharacterData {
  classId?: string;
  subclassId?: string | null;
  cantripsKnown?: string[];
  spellsKnown?: string[];
}

const ASI_LEVELS = new Set([4, 8, 12, 16, 19]);
const ABILITIES = [
  "strength",
  "dexterity",
  "constitution",
  "intelligence",
  "wisdom",
  "charisma",
] as const;

type AbilityKey = (typeof ABILITIES)[number];

function asArray<T>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : [];
}

function progressionValue(values: number[] | undefined, level: number): number {
  if (!values) return 0;
  return values[level - 1] ?? 0;
}

function maxSpellLevelFromSlots(slots: number[] | undefined): number {
  if (!slots) return 0;
  let max = 0;
  slots.forEach((count, index) => {
    if (count > 0) {
      max = index + 1;
    }
  });
  return max;
}

export function LevelUpCharacterPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError } = useCharacterByIdQuery(id ?? "", Boolean(id));
  const character = data?.data?.character;
  const rawData = (character?.data ?? {}) as CharacterData;
  const classId = rawData.classId ?? "";

  const classQuery = useBackendClass(classId);
  const spellsQuery = useBackendSpellsByClass(classId);

  const classData = (classQuery.data as { data?: { class?: BackendClass } } | undefined)?.data?.class;
  const spells = asArray<SpellEntry>(
    (spellsQuery.data as { data?: { spells?: SpellEntry[] } } | undefined)?.data?.spells
  );

  const currentLevel = character?.level ?? 1;
  const nextLevel = Math.min(currentLevel + 1, 20);
  const subclassLevel = classData?.subclassLevel ?? 99;
  const needsSubclassChoice = !rawData.subclassId && nextLevel >= subclassLevel;
  const hasAsiChoice = ASI_LEVELS.has(nextLevel);

  const currentCantrips = useMemo(
    () => asArray<string>(rawData.cantripsKnown),
    [rawData.cantripsKnown]
  );
  const currentSpells = useMemo(
    () => asArray<string>(rawData.spellsKnown),
    [rawData.spellsKnown]
  );

  const cantripLimit = progressionValue(classData?.spellcasting?.cantripsKnown, nextLevel);
  const spellsLimit = progressionValue(classData?.spellcasting?.spellsKnown, nextLevel);
  const availableMaxSpellLevel = maxSpellLevelFromSlots(
    classData?.spellcasting?.spellSlots?.[nextLevel - 1]
  );

  const availableCantrips = useMemo(
    () => spells.filter((spell) => spell.level === 0),
    [spells]
  );
  const availableLeveledSpells = useMemo(
    () => spells.filter((spell) => spell.level > 0 && spell.level <= availableMaxSpellLevel),
    [spells, availableMaxSpellLevel]
  );

  const [hpMethod, setHpMethod] = useState<"roll" | "average">("average");
  const [hpRoll, setHpRoll] = useState<number | undefined>(undefined);
  const [subclassId, setSubclassId] = useState<string>(rawData.subclassId ?? "");
  const [asiType, setAsiType] = useState<"ability" | "feat">("ability");
  const [featId, setFeatId] = useState("");
  const [abilityIncreases, setAbilityIncreases] = useState<Record<AbilityKey, number>>({
    strength: 0,
    dexterity: 0,
    constitution: 0,
    intelligence: 0,
    wisdom: 0,
    charisma: 0,
  });

  const [selectedCantrips, setSelectedCantrips] = useState<string[]>(currentCantrips);
  const [selectedSpells, setSelectedSpells] = useState<string[]>(currentSpells);
  const [errorMessage, setErrorMessage] = useState("");

  const levelUpMutation = useLevelUpCharacterMutation();

  const classFeaturesThisLevel = useMemo(
    () => asArray<BackendClassFeature>(classData?.features).filter((feature) => feature.level === nextLevel),
    [classData?.features, nextLevel]
  );

  const selectedSubclass = useMemo(
    () => asArray<BackendSubclass>(classData?.subclasses).find((subclass) => subclass.id === (subclassId || rawData.subclassId)),
    [classData?.subclasses, subclassId, rawData.subclassId]
  );

  const subclassFeaturesThisLevel = useMemo(
    () => asArray<BackendSubclassFeature>(selectedSubclass?.features).filter((feature) => feature.level === nextLevel),
    [selectedSubclass?.features, nextLevel]
  );

  const asiTotal = useMemo(
    () => Object.values(abilityIncreases).reduce((sum, value) => sum + value, 0),
    [abilityIncreases]
  );

  const canSubmit = useMemo(() => {
    if (!character || !classData) return false;
    if (needsSubclassChoice && !subclassId) return false;

    if (hasAsiChoice) {
      if (asiType === "feat" && !featId.trim()) return false;
      if (asiType === "ability") {
        const values = Object.values(abilityIncreases).filter((value) => value > 0);
        const legalShape =
          (values.length === 1 && values[0] === 2) ||
          (values.length === 2 && values.every((value) => value === 1));
        if (!legalShape || asiTotal !== 2) return false;
      }
    }

    if (cantripLimit > 0 && selectedCantrips.length > cantripLimit) return false;
    if (spellsLimit > 0 && selectedSpells.length > spellsLimit) return false;

    return true;
  }, [
    character,
    classData,
    needsSubclassChoice,
    subclassId,
    hasAsiChoice,
    asiType,
    featId,
    abilityIncreases,
    asiTotal,
    cantripLimit,
    selectedCantrips.length,
    spellsLimit,
    selectedSpells.length,
  ]);

  const toggleSelection = (
    current: string[],
    setCurrent: (value: string[]) => void,
    spellId: string,
    limit: number
  ) => {
    if (current.includes(spellId)) {
      setCurrent(current.filter((idValue) => idValue !== spellId));
      return;
    }

    if (limit > 0 && current.length >= limit) return;
    setCurrent([...current, spellId]);
  };

  const onSubmit = async () => {
    if (!id || !character) return;

    setErrorMessage("");

    const asiPayload = hasAsiChoice
      ? asiType === "feat"
        ? { type: "feat" as const, featId: featId.trim() }
        : {
            type: "ability" as const,
            abilityIncreases: Object.fromEntries(
              Object.entries(abilityIncreases).filter(([, value]) => value > 0)
            ),
          }
      : undefined;

    const cantripAdded = selectedCantrips.filter((spellId) => !currentCantrips.includes(spellId));
    const cantripRemoved = currentCantrips.filter((spellId) => !selectedCantrips.includes(spellId));
    const spellsAdded = selectedSpells.filter((spellId) => !currentSpells.includes(spellId));
    const spellsRemoved = currentSpells.filter((spellId) => !selectedSpells.includes(spellId));

    try {
      await levelUpMutation.mutateAsync({
        id,
        payload: {
          hpMethod,
          hpRoll: hpMethod === "roll" ? hpRoll : undefined,
          asi: asiPayload,
          subclassId: needsSubclassChoice ? subclassId : undefined,
          featureChoices: [],
          cantripChanges: {
            added: cantripAdded,
            removed: cantripRemoved,
          },
          spellChanges: {
            added: spellsAdded,
            removed: spellsRemoved,
          },
          expertiseGained: [],
        },
      });

      navigate("/my-characters");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Не удалось повысить уровень";
      setErrorMessage(message);
    }
  };

  if (isLoading) {
    return <div className="container mx-auto p-6">Загрузка персонажа...</div>;
  }

  if (isError || !character) {
    return <div className="container mx-auto p-6 text-destructive">Не удалось загрузить персонажа.</div>;
  }

  if (currentLevel >= 20) {
    return (
      <div className="container mx-auto max-w-4xl p-6 space-y-4">
        <h1 className="text-3xl font-display font-bold">Прокачка персонажа</h1>
        <p className="text-muted-foreground">{character.name} уже достиг максимального уровня (20).</p>
        <Button variant="outline" onClick={() => navigate("/my-characters")}>Назад</Button>
      </div>
    );
  }

  if (classQuery.isLoading || spellsQuery.isLoading) {
    return <div className="container mx-auto p-6">Загрузка данных класса и заклинаний...</div>;
  }

  if (!classData) {
    return <div className="container mx-auto p-6 text-destructive">Не удалось загрузить данные класса для прокачки.</div>;
  }

  return (
    <div className="container mx-auto max-w-5xl p-6 space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-display font-bold">Прокачка персонажа</h1>
          <p className="text-sm text-muted-foreground">
            {character.name}: {currentLevel} → {nextLevel}
          </p>
        </div>
        <Button variant="outline" onClick={() => navigate("/my-characters")}>Назад</Button>
      </div>

      <div className="rounded-lg border border-border/60 p-4 space-y-3">
        <h2 className="text-lg font-semibold">Что получаете на уровне {nextLevel}</h2>
        {classFeaturesThisLevel.length === 0 && subclassFeaturesThisLevel.length === 0 ? (
          <p className="text-sm text-muted-foreground">Новых автоматических особенностей не найдено.</p>
        ) : (
          <div className="space-y-2">
            {classFeaturesThisLevel.map((feature) => (
              <p key={feature.id} className="text-sm">• {feature.nameRu ?? feature.name}</p>
            ))}
            {subclassFeaturesThisLevel.map((feature) => (
              <p key={feature.id} className="text-sm">• {feature.nameRu ?? feature.name} (подкласс)</p>
            ))}
          </div>
        )}
      </div>

      <div className="rounded-lg border border-border/60 p-4 space-y-4">
        <h2 className="text-lg font-semibold">Хиты</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Метод</Label>
            <select
              value={hpMethod}
              onChange={(event) => setHpMethod(event.target.value as "roll" | "average")}
              className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
            >
              <option value="average">Среднее значение</option>
              <option value="roll">Бросок кости</option>
            </select>
          </div>

          {hpMethod === "roll" ? (
            <div className="space-y-2">
              <Label>Результат броска</Label>
              <Input
                type="number"
                min={1}
                max={20}
                value={hpRoll ?? ""}
                onChange={(event) => setHpRoll(Number(event.target.value) || undefined)}
                placeholder="Например, 6"
              />
            </div>
          ) : null}
        </div>
      </div>

      {needsSubclassChoice ? (
        <div className="rounded-lg border border-border/60 p-4 space-y-2">
          <h2 className="text-lg font-semibold">Выбор подкласса</h2>
          <select
            value={subclassId}
            onChange={(event) => setSubclassId(event.target.value)}
            className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
          >
            <option value="">Выберите подкласс</option>
            {asArray<BackendSubclass>(classData.subclasses).map((subclass) => (
              <option key={subclass.id} value={subclass.id}>
                {subclass.nameRu ?? subclass.name}
              </option>
            ))}
          </select>
        </div>
      ) : null}

      {hasAsiChoice ? (
        <div className="rounded-lg border border-border/60 p-4 space-y-4">
          <h2 className="text-lg font-semibold">ASI / Черта</h2>

          <div className="space-y-2">
            <Label>Тип улучшения</Label>
            <select
              value={asiType}
              onChange={(event) => setAsiType(event.target.value as "ability" | "feat")}
              className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
            >
              <option value="ability">Улучшение характеристик</option>
              <option value="feat">Черта</option>
            </select>
          </div>

          {asiType === "feat" ? (
            <div className="space-y-2">
              <Label>ID черты</Label>
              <Input
                value={featId}
                onChange={(event) => setFeatId(event.target.value)}
                placeholder="Например: alert"
              />
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Выберите +2 к одной характеристике или +1 к двум (сейчас: {asiTotal}/2)
              </p>
              <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                {ABILITIES.map((ability) => (
                  <div key={ability} className="space-y-1">
                    <Label className="capitalize">{ability}</Label>
                    <Input
                      type="number"
                      min={0}
                      max={2}
                      value={String(abilityIncreases[ability])}
                      onChange={(event) =>
                        setAbilityIncreases((prev) => ({
                          ...prev,
                          [ability]: Math.max(0, Math.min(2, Number(event.target.value) || 0)),
                        }))
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : null}

      {classData.spellcasting ? (
        <div className="rounded-lg border border-border/60 p-4 space-y-5">
          <h2 className="text-lg font-semibold">Заклинания</h2>
          <p className="text-sm text-muted-foreground">
            Лимиты на уровне {nextLevel}: кантрипы {cantripLimit || "-"}, заклинания {spellsLimit || "-"}.
          </p>

          {availableCantrips.length > 0 ? (
            <div className="space-y-2">
              <p className="text-sm font-medium">Кантрипы</p>
              <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
                {availableCantrips.map((spell) => (
                  <label key={spell.id} className="flex items-center gap-2 rounded border border-border/40 p-2 text-sm">
                    <input
                      type="checkbox"
                      checked={selectedCantrips.includes(spell.id)}
                      onChange={() =>
                        toggleSelection(selectedCantrips, setSelectedCantrips, spell.id, cantripLimit)
                      }
                    />
                    {spell.nameRu ?? spell.name}
                  </label>
                ))}
              </div>
            </div>
          ) : null}

          {availableLeveledSpells.length > 0 ? (
            <div className="space-y-2">
              <p className="text-sm font-medium">Заклинания ({availableMaxSpellLevel} круг макс.)</p>
              <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
                {availableLeveledSpells.map((spell) => (
                  <label key={spell.id} className="flex items-center gap-2 rounded border border-border/40 p-2 text-sm">
                    <input
                      type="checkbox"
                      checked={selectedSpells.includes(spell.id)}
                      onChange={() =>
                        toggleSelection(selectedSpells, setSelectedSpells, spell.id, spellsLimit)
                      }
                    />
                    {spell.nameRu ?? spell.name} (ур. {spell.level})
                  </label>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      ) : null}

      {errorMessage ? <p className="text-sm text-destructive">{errorMessage}</p> : null}

      <div className="flex justify-end">
        <Button onClick={onSubmit} disabled={!canSubmit || levelUpMutation.isPending}>
          {levelUpMutation.isPending ? "Сохраняю..." : `Повысить до ${nextLevel}`}
        </Button>
      </div>
    </div>
  );
}
