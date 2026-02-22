import { useBackendSpell } from "@/api/hooks";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SlideOverDrawer } from "@/components/ui/slide-over-drawer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { parseEquipmentDescription } from "@/utils/descriptionParser";
import { BookOpen, Loader2, Search, Sparkles } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { ClassOption, SpellOption } from "../../types";
import { useCreatorStore } from "../../store/creatorStore";
import {
  getAvailableSpellsForClass,
  getMaxSpellLevelFromSlots,
  getSpellLimits,
} from "../../utils/characterDerivations";
import { StepHeader } from "../shared/StepHeader";

interface SpellsStepProps {
  selectedClass: ClassOption | null;
  spells: SpellOption[];
}

export function SpellsStep({ selectedClass, spells }: SpellsStepProps) {
  const level = useCreatorStore((state) => state.level);
  const cantrips = useCreatorStore((state) => state.cantrips);
  const knownSpells = useCreatorStore((state) => state.spells);
  const toggleCantrip = useCreatorStore((state) => state.toggleCantrip);
  const toggleSpell = useCreatorStore((state) => state.toggleSpell);
  const setCantrips = useCreatorStore((state) => state.setCantrips);
  const setSpells = useCreatorStore((state) => state.setSpells);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpellId, setSelectedSpellId] = useState<string | null>(null);
  const [onlyKnown, setOnlyKnown] = useState(false);
  const [activeTab, setActiveTab] = useState("cantrips");

  const limits = getSpellLimits(selectedClass, level);
  const available = getAvailableSpellsForClass(selectedClass, spells);
  const availableCantrips = available.filter((spell) => spell.level === 0);
  const maxSpellLevel = getMaxSpellLevelFromSlots(limits.spellSlots);
  const availableLevelSpells = available.filter(
    (spell) => spell.level > 0 && spell.level <= maxSpellLevel
  );
  const requiredCantrips = Math.min(limits.cantrips, availableCantrips.length);
  const requiredSpells = Math.min(limits.spells, availableLevelSpells.length);

  const { data: selectedSpellResponse, isLoading: isLoadingSelectedSpell } = useBackendSpell(
    selectedSpellId || ""
  );
  const selectedSpell = selectedSpellResponse?.data?.spell ?? null;

  useEffect(() => {
    const cantripIds = new Set(availableCantrips.map((spell) => spell.id));
    const spellIds = new Set(availableLevelSpells.map((spell) => spell.id));

    const nextCantrips = cantrips
      .filter((id) => cantripIds.has(id))
      .slice(0, requiredCantrips);
    const nextSpells = knownSpells
      .filter((id) => spellIds.has(id))
      .slice(0, requiredSpells);

    if (nextCantrips.length !== cantrips.length) {
      setCantrips(nextCantrips);
    }
    if (nextSpells.length !== knownSpells.length) {
      setSpells(nextSpells);
    }
  }, [
    availableCantrips,
    availableLevelSpells,
    cantrips,
    knownSpells,
    requiredCantrips,
    requiredSpells,
    setCantrips,
    setSpells,
  ]);

  const canToggleCantrip = (id: string) => {
    if (cantrips.includes(id)) return true;
    return cantrips.length < requiredCantrips;
  };

  const canToggleSpell = (id: string) => {
    if (knownSpells.includes(id)) return true;
    return knownSpells.length < requiredSpells;
  };

  const filteredCantrips = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return availableCantrips.filter((spell) => {
      if (onlyKnown && !cantrips.includes(spell.id)) return false;
      if (!query) return true;
      return (
        spell.nameRu.toLowerCase().includes(query) ||
        spell.name.toLowerCase().includes(query)
      );
    });
  }, [availableCantrips, onlyKnown, cantrips, searchQuery]);

  const filteredSpellsByLevel = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const grouped = new Map<number, SpellOption[]>();

    for (const spell of availableLevelSpells) {
      if (onlyKnown && !knownSpells.includes(spell.id)) continue;
      if (
        query &&
        !spell.nameRu.toLowerCase().includes(query) &&
        !spell.name.toLowerCase().includes(query)
      ) {
        continue;
      }
      const bucket = grouped.get(spell.level) ?? [];
      bucket.push(spell);
      grouped.set(spell.level, bucket);
    }

    return Array.from(grouped.entries())
      .sort((a, b) => a[0] - b[0])
      .map(([spellLevel, rows]) => ({
        spellLevel,
        spells: rows.sort((a, b) => (a.nameRu || a.name).localeCompare(b.nameRu || b.name)),
      }));
  }, [availableLevelSpells, onlyKnown, knownSpells, searchQuery]);

  const availableTabValues = useMemo(
    () => ["cantrips", ...filteredSpellsByLevel.map((group) => `level-${group.spellLevel}`)],
    [filteredSpellsByLevel]
  );

  useEffect(() => {
    if (!availableTabValues.includes(activeTab)) {
      setActiveTab("cantrips");
    }
  }, [activeTab, availableTabValues]);

  if (!limits.hasSpellcasting) {
    return (
      <div className="space-y-4">
        <StepHeader
          title="Заклинания"
          description="На этом уровне для выбранного класса заклинания не требуются"
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <StepHeader
        title="Заклинания"
        description={`Настройка магии на ${level} уровне по данным класса`}
      />

      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-lg border border-border/60 p-3">
          <p className="text-xs text-muted-foreground">Фокусы (заговоры)</p>
          <p className="text-lg font-semibold">
            {cantrips.length}/{requiredCantrips}
          </p>
        </div>
        <div className="rounded-lg border border-border/60 p-3">
          <p className="text-xs text-muted-foreground">Заклинания (известные)</p>
          <p className="text-lg font-semibold">
            {knownSpells.length}/{requiredSpells}
          </p>
        </div>
        <div className="rounded-lg border border-border/60 p-3">
          <p className="text-xs text-muted-foreground">Ячейки</p>
          <p className="text-sm font-medium">
            {limits.spellSlots.length > 0
              ? limits.spellSlots.map((count, idx) => `${idx + 1} ур.: ${count}`).join(", ")
              : "Нет"}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Макс. круг: {maxSpellLevel || "-"}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3 md:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Поиск заклинаний по названию"
            className="pl-9"
          />
        </div>
        <button
          type="button"
          onClick={() => setOnlyKnown((prev) => !prev)}
          className={`rounded-md border px-3 py-2 text-sm ${
            onlyKnown ? "border-primary bg-primary/10 text-primary" : "border-border/60 hover:bg-muted/40"
          }`}
        >
          Только выбранные
        </button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-3">
        <TabsList className="h-auto w-full justify-start overflow-x-auto whitespace-nowrap">
          <TabsTrigger value="cantrips">
            Фокусы (заговоры) {filteredCantrips.length > 0 ? `(${filteredCantrips.length})` : ""}
          </TabsTrigger>
          {filteredSpellsByLevel.map((group) => (
            <TabsTrigger key={`tab-${group.spellLevel}`} value={`level-${group.spellLevel}`}>
              {group.spellLevel} ур. ({group.spells.length})
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="cantrips" className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <Label>
              Фокусы (заговоры) ({cantrips.length}/{requiredCantrips})
            </Label>
            <span className="text-xs text-muted-foreground">
              Осталось: {Math.max(requiredCantrips - cantrips.length, 0)}
            </span>
          </div>
          {cantrips.length >= requiredCantrips && requiredCantrips > 0 ? (
            <p className="text-xs text-muted-foreground">
              Лимит фокусов достигнут. Снимите один выбор, чтобы выбрать другой.
            </p>
          ) : null}
          <div className="grid gap-2 md:grid-cols-2">
            {filteredCantrips.map((spell) => (
              <div
                key={spell.id}
                className={`rounded-lg border p-3 ${
                  cantrips.includes(spell.id)
                    ? "border-primary bg-primary/10"
                    : "border-border/50"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedSpellId(spell.id)}
                    className="text-left text-sm font-medium text-primary hover:underline"
                  >
                    {spell.nameRu || spell.name}
                  </button>
                  <button
                    type="button"
                    onClick={() => canToggleCantrip(spell.id) && toggleCantrip(spell.id)}
                    disabled={!canToggleCantrip(spell.id)}
                    className={`rounded-md px-2 py-1 text-xs ${
                      cantrips.includes(spell.id)
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground hover:bg-muted/80"
                    } disabled:opacity-50`}
                  >
                    {cantrips.includes(spell.id) ? "Выбрано" : "Выбрать"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        {filteredSpellsByLevel.map((group) => (
          <TabsContent
            key={`panel-${group.spellLevel}`}
            value={`level-${group.spellLevel}`}
            className="space-y-3"
          >
            <div className="flex items-center justify-between gap-3">
              <Label>
                {group.spellLevel} уровень ({group.spells.length})
              </Label>
              <span className="text-xs text-muted-foreground">
                Выбрано всего: {knownSpells.length}/{requiredSpells}
              </span>
            </div>
            <div className="grid gap-2 md:grid-cols-2">
              {group.spells.map((spell) => (
                <div
                  key={spell.id}
                  className={`rounded-lg border p-3 ${
                    knownSpells.includes(spell.id)
                      ? "border-primary bg-primary/10"
                      : "border-border/50"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedSpellId(spell.id)}
                      className="text-left text-sm font-medium text-primary hover:underline"
                    >
                      {spell.nameRu || spell.name}
                    </button>
                    <button
                      type="button"
                      onClick={() => canToggleSpell(spell.id) && toggleSpell(spell.id)}
                      disabled={!canToggleSpell(spell.id)}
                      className={`rounded-md px-2 py-1 text-xs ${
                        knownSpells.includes(spell.id)
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-foreground hover:bg-muted/80"
                      } disabled:opacity-50`}
                    >
                      {knownSpells.includes(spell.id) ? "Выбрано" : "Выбрать"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {knownSpells.length >= requiredSpells && requiredSpells > 0 ? (
        <p className="text-xs text-muted-foreground">
          Лимит известных заклинаний достигнут. Снимите один выбор, чтобы выбрать другой.
        </p>
      ) : null}

      <SlideOverDrawer
        isOpen={Boolean(selectedSpellId)}
        onClose={() => setSelectedSpellId(null)}
        title={
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <span>{selectedSpell?.nameRu || selectedSpell?.name || "Заклинание"}</span>
          </div>
        }
      >
        {isLoadingSelectedSpell ? (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            Загрузка описания...
          </div>
        ) : !selectedSpell ? (
          <p className="text-sm text-muted-foreground">Описание заклинания не найдено.</p>
        ) : (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="rounded bg-primary/10 px-2 py-1 text-primary">
                {selectedSpell.level === 0 ? "Кантрип" : `${selectedSpell.level} ур.`}
              </span>
              <span className="rounded bg-muted px-2 py-1 text-muted-foreground">
                {selectedSpell.school}
              </span>
              <span className="rounded bg-muted px-2 py-1 text-muted-foreground">
                {selectedSpell.castingTime}
              </span>
              <span className="rounded bg-muted px-2 py-1 text-muted-foreground">
                {selectedSpell.range}
              </span>
            </div>

            <div className="grid gap-2 text-xs text-muted-foreground">
              <p>Компоненты: {selectedSpell.components}</p>
              <p>Длительность: {selectedSpell.duration}</p>
              <p>Источник: {selectedSpell.source}</p>
            </div>

            <div className="rounded-lg border border-border/60 p-3">
              <p className="mb-2 flex items-center gap-2 text-sm font-medium">
                <BookOpen className="h-4 w-4" />
                Описание
              </p>
              <div className="prose prose-sm max-w-none dark:prose-invert">
                {parseEquipmentDescription(
                  Array.isArray(selectedSpell.description)
                    ? selectedSpell.description
                    : [selectedSpell.description]
                )}
              </div>
            </div>
          </div>
        )}
      </SlideOverDrawer>
    </div>
  );
}
