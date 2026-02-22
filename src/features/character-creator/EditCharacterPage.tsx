import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useBackendSpellsByClass } from "@/api/hooks";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useSetCharacterPrivacyMutation,
  useUpdateCharacterMutation,
} from "./api/mutations";
import { useCharacterByIdQuery } from "./api/queries";
import { getMaxSpellLevelFromSlots } from "./utils/characterDerivations";

interface EditableDetails {
  alignment: string;
  personalityTraits: string;
  ideals: string;
  bonds: string;
  flaws: string;
  backstory: string;
  age: string;
  height: string;
  weight: string;
  eyes: string;
  skin: string;
  hair: string;
}

const initialDetails: EditableDetails = {
  alignment: "",
  personalityTraits: "",
  ideals: "",
  bonds: "",
  flaws: "",
  backstory: "",
  age: "",
  height: "",
  weight: "",
  eyes: "",
  skin: "",
  hair: "",
};

interface SpellEntry {
  id: string;
  nameRu?: string;
  name?: string;
  level: number;
}

interface CharacterSpellcasting {
  cantripsKnown?: number[];
  spellsKnown?: number[];
  spellSlots?: number[][];
}

interface CharacterData {
  classId?: string;
  classSnapshot?: {
    spellcasting?: CharacterSpellcasting;
  };
  details?: Partial<EditableDetails>;
  cantripsKnown?: string[];
  spellsKnown?: string[];
}

function asArray<T>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : [];
}

function progressionValue(values: number[] | undefined, level: number): number {
  if (!values) return 0;
  return values[level - 1] ?? 0;
}

export function EditCharacterPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError } = useCharacterByIdQuery(id ?? "", Boolean(id));
  const updateMutation = useUpdateCharacterMutation();
  const privacyMutation = useSetCharacterPrivacyMutation();

  const [name, setName] = useState("");
  const [details, setDetails] = useState<EditableDetails>(initialDetails);
  const [isPublic, setIsPublic] = useState(false);
  const [level, setLevel] = useState(1);
  const [cantripsKnown, setCantripsKnown] = useState<string[]>([]);
  const [spellsKnown, setSpellsKnown] = useState<string[]>([]);
  const [spellSearch, setSpellSearch] = useState("");
  const [saveError, setSaveError] = useState("");

  const character = data?.data?.character;
  const rawData = (character?.data ?? {}) as CharacterData;
  const classId = rawData.classId ?? "";
  const spellsQuery = useBackendSpellsByClass(classId);
  const allClassSpells = useMemo(
    () =>
      asArray<SpellEntry>(
        (spellsQuery.data as { data?: { spells?: SpellEntry[] } } | undefined)?.data?.spells
      ),
    [spellsQuery.data]
  );
  const spellcasting = rawData.classSnapshot?.spellcasting;
  const cantripLimit = progressionValue(spellcasting?.cantripsKnown, level);
  const spellLimit = progressionValue(spellcasting?.spellsKnown, level);
  const maxSpellLevel = getMaxSpellLevelFromSlots(spellcasting?.spellSlots?.[Math.max(level - 1, 0)]);

  const availableCantrips = useMemo(
    () => allClassSpells.filter((spell) => spell.level === 0),
    [allClassSpells]
  );
  const availableLeveledSpells = useMemo(
    () =>
      allClassSpells.filter(
        (spell) => spell.level > 0 && spell.level <= maxSpellLevel
      ),
    [allClassSpells, maxSpellLevel]
  );
  const filteredCantrips = useMemo(() => {
    const query = spellSearch.trim().toLowerCase();
    if (!query) return availableCantrips;
    return availableCantrips.filter((spell) =>
      (spell.nameRu ?? spell.name ?? "").toLowerCase().includes(query)
    );
  }, [availableCantrips, spellSearch]);
  const filteredLeveledSpells = useMemo(() => {
    const query = spellSearch.trim().toLowerCase();
    if (!query) return availableLeveledSpells;
    return availableLeveledSpells.filter((spell) =>
      (spell.nameRu ?? spell.name ?? "").toLowerCase().includes(query)
    );
  }, [availableLeveledSpells, spellSearch]);

  useEffect(() => {
    if (!character) return;

    setName(character.name);
    setIsPublic(character.isPublic);
    setLevel(Math.max(1, Math.min(20, character.level ?? 1)));

    const raw = character.data as unknown as CharacterData;
    setDetails({ ...initialDetails, ...(raw.details ?? {}) });
    setCantripsKnown(asArray<string>(raw.cantripsKnown));
    setSpellsKnown(asArray<string>(raw.spellsKnown));
  }, [character]);

  useEffect(() => {
    const cantripIds = new Set(availableCantrips.map((spell) => spell.id));
    const nextCantrips = cantripsKnown.filter((id) => cantripIds.has(id)).slice(0, cantripLimit);
    if (nextCantrips.length !== cantripsKnown.length) {
      setCantripsKnown(nextCantrips);
    }
  }, [availableCantrips, cantripLimit, cantripsKnown]);

  useEffect(() => {
    const spellIds = new Set(availableLeveledSpells.map((spell) => spell.id));
    const nextSpells = spellsKnown.filter((id) => spellIds.has(id)).slice(0, spellLimit);
    if (nextSpells.length !== spellsKnown.length) {
      setSpellsKnown(nextSpells);
    }
  }, [availableLeveledSpells, spellLimit, spellsKnown]);

  const toggleSpellSelection = (
    spellId: string,
    selected: string[],
    setSelected: (value: string[]) => void,
    limit: number
  ) => {
    if (selected.includes(spellId)) {
      setSelected(selected.filter((id) => id !== spellId));
      return;
    }
    if (limit <= 0 || selected.length >= limit) return;
    setSelected([...selected, spellId]);
  };

  const isDirty = useMemo(() => {
    if (!character) return false;

    const raw = character.data as unknown as CharacterData;
    const sourceDetails = { ...initialDetails, ...(raw.details ?? {}) };
    const sourceCantrips = asArray<string>(raw.cantripsKnown);
    const sourceSpells = asArray<string>(raw.spellsKnown);

    return (
      name !== character.name ||
      isPublic !== character.isPublic ||
      level !== (character.level ?? 1) ||
      JSON.stringify(details) !== JSON.stringify(sourceDetails) ||
      JSON.stringify(cantripsKnown) !== JSON.stringify(sourceCantrips) ||
      JSON.stringify(spellsKnown) !== JSON.stringify(sourceSpells)
    );
  }, [cantripsKnown, character, details, isPublic, level, name, spellsKnown]);

  const canSave = useMemo(() => {
    if (name.trim().length === 0) return false;
    if (cantripLimit > 0 && cantripsKnown.length > cantripLimit) return false;
    if (spellLimit > 0 && spellsKnown.length > spellLimit) return false;
    return true;
  }, [cantripLimit, cantripsKnown.length, name, spellLimit, spellsKnown.length]);

  const onSave = async () => {
    if (!id || !character) return;
    setSaveError("");

    try {
      await updateMutation.mutateAsync({
        id,
        payload: {
          name,
          details,
          level,
          cantripsKnown,
          spellsKnown,
        },
      });

      if (isPublic !== character.isPublic) {
        await privacyMutation.mutateAsync({ id, isPublic });
      }

      navigate("/my-characters");
    } catch (error) {
      setSaveError(error instanceof Error ? error.message : "Не удалось сохранить персонажа");
    }
  };

  if (isLoading) {
    return <div className="container mx-auto p-6">Загрузка персонажа...</div>;
  }

  if (isError || !character) {
    return (
      <div className="container mx-auto p-6 text-destructive">
        Не удалось загрузить персонажа.
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl p-6 space-y-6">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-3xl font-display font-bold">Редактирование персонажа</h1>
        <Button variant="outline" onClick={() => navigate("/my-characters")}>
          Назад
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2 md:col-span-2">
          <Label>Имя</Label>
          <Input value={name} onChange={(event) => setName(event.target.value)} />
        </div>

        <div className="space-y-2">
          <Label>Мировоззрение</Label>
          <Input
            value={details.alignment}
            onChange={(event) =>
              setDetails((prev) => ({ ...prev, alignment: event.target.value }))
            }
          />
        </div>

        <div className="space-y-2">
          <Label>Уровень</Label>
          <Input
            type="number"
            min={1}
            max={20}
            value={String(level)}
            onChange={(event) => setLevel(Math.max(1, Math.min(20, Number(event.target.value) || 1)))}
          />
        </div>

        <label className="flex items-end gap-2 pb-2 text-sm">
          <input
            type="checkbox"
            checked={isPublic}
            onChange={(event) => setIsPublic(event.target.checked)}
          />
          Публичный доступ по short-link
        </label>

        <div className="space-y-2 md:col-span-2">
          <Label>Черты характера</Label>
          <Textarea
            value={details.personalityTraits}
            onChange={(event) =>
              setDetails((prev) => ({ ...prev, personalityTraits: event.target.value }))
            }
            rows={3}
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label>Предыстория</Label>
          <Textarea
            value={details.backstory}
            onChange={(event) =>
              setDetails((prev) => ({ ...prev, backstory: event.target.value }))
            }
            rows={7}
          />
        </div>
      </div>

      {spellcasting ? (
        <div className="rounded-lg border border-border/60 p-4 space-y-4">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold">Магия по уровню</h2>
            <p className="text-sm text-muted-foreground">
              Лимиты на уровне {level}: кантрипы {cantripLimit || "-"}, заклинания {spellLimit || "-"}, макс. круг {maxSpellLevel || "-"}.
            </p>
          </div>

          <Input
            value={spellSearch}
            onChange={(event) => setSpellSearch(event.target.value)}
            placeholder="Поиск по названию заклинания"
          />

          <div className="space-y-2">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-medium">Кантрипы ({cantripsKnown.length}/{cantripLimit})</p>
              <span className="text-xs text-muted-foreground">
                Осталось: {Math.max(cantripLimit - cantripsKnown.length, 0)}
              </span>
            </div>
            {cantripLimit > 0 && cantripsKnown.length >= cantripLimit ? (
              <p className="text-xs text-muted-foreground">
                Лимит кантрипов достигнут.
              </p>
            ) : null}
            <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
              {filteredCantrips.map((spell) => (
                <label key={spell.id} className="flex items-center gap-2 rounded border border-border/40 p-2 text-sm">
                  <input
                    type="checkbox"
                    checked={cantripsKnown.includes(spell.id)}
                    onChange={() =>
                      toggleSpellSelection(spell.id, cantripsKnown, setCantripsKnown, cantripLimit)
                    }
                  />
                  {spell.nameRu ?? spell.name}
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-medium">Заклинания ({spellsKnown.length}/{spellLimit})</p>
              <span className="text-xs text-muted-foreground">
                Осталось: {Math.max(spellLimit - spellsKnown.length, 0)}
              </span>
            </div>
            {spellLimit > 0 && spellsKnown.length >= spellLimit ? (
              <p className="text-xs text-muted-foreground">
                Лимит заклинаний достигнут.
              </p>
            ) : null}
            <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
              {filteredLeveledSpells.map((spell) => (
                <label key={spell.id} className="flex items-center gap-2 rounded border border-border/40 p-2 text-sm">
                  <input
                    type="checkbox"
                    checked={spellsKnown.includes(spell.id)}
                    onChange={() =>
                      toggleSpellSelection(spell.id, spellsKnown, setSpellsKnown, spellLimit)
                    }
                  />
                  <span>
                    {spell.nameRu ?? spell.name} (ур. {spell.level})
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      {saveError ? <p className="text-sm text-destructive">{saveError}</p> : null}

      <div className="flex justify-end">
        <Button onClick={onSave} disabled={!isDirty || !canSave || updateMutation.isPending}>
          {updateMutation.isPending ? "Сохранение..." : "Сохранить"}
        </Button>
      </div>
    </div>
  );
}
