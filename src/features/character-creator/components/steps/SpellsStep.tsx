import { Label } from "@/components/ui/label";
import type { ClassOption, SpellOption } from "../../types";
import { useCreatorStore } from "../../store/creatorStore";
import {
  getAvailableSpellsForClass,
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

  const limits = getSpellLimits(selectedClass, level);
  const available = getAvailableSpellsForClass(selectedClass, spells);
  const availableCantrips = available.filter((spell) => spell.level === 0);
  const availableLevelSpells = available.filter((spell) => spell.level > 0);
  const requiredCantrips = Math.min(limits.cantrips, availableCantrips.length);
  const requiredSpells = Math.min(limits.spells, availableLevelSpells.length);

  const canToggleCantrip = (id: string) => {
    if (cantrips.includes(id)) return true;
    return cantrips.length < requiredCantrips;
  };

  const canToggleSpell = (id: string) => {
    if (knownSpells.includes(id)) return true;
    return knownSpells.length < requiredSpells;
  };

  if (!limits.hasSpellcasting) {
    return (
      <div className="space-y-4">
        <StepHeader
          title="Заклинания"
          description="Для этого класса заклинания на 1 уровне не требуются"
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <StepHeader
        title="Заклинания"
        description={`Выберите заклинания для уровня ${level}`}
      />

      <div className="space-y-2">
        <Label>
          Кантрипы ({cantrips.length}/{requiredCantrips})
        </Label>
        <div className="grid gap-2 md:grid-cols-2">
          {availableCantrips.map((spell) => (
            <button
              key={spell.id}
              onClick={() => canToggleCantrip(spell.id) && toggleCantrip(spell.id)}
              disabled={!canToggleCantrip(spell.id)}
              className={`rounded-lg border px-3 py-2 text-left text-sm ${
                cantrips.includes(spell.id)
                  ? "border-primary bg-primary/10"
                  : "border-border/50 hover:bg-muted/40"
              } disabled:opacity-50`}
            >
              {spell.nameRu}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label>
          Заклинания ({knownSpells.length}/{requiredSpells})
        </Label>
        <div className="grid gap-2 md:grid-cols-2">
          {availableLevelSpells.map((spell) => (
            <button
              key={spell.id}
              onClick={() => canToggleSpell(spell.id) && toggleSpell(spell.id)}
              disabled={!canToggleSpell(spell.id)}
              className={`rounded-lg border px-3 py-2 text-left text-sm ${
                knownSpells.includes(spell.id)
                  ? "border-primary bg-primary/10"
                  : "border-border/50 hover:bg-muted/40"
              } disabled:opacity-50`}
            >
              {spell.nameRu}
            </button>
          ))}
        </div>
      </div>

      {limits.spellSlots.length > 0 ? (
        <p className="text-xs text-muted-foreground">
          Ячейки заклинаний:{" "}
          {limits.spellSlots.map((count, idx) => `L${idx + 1}: ${count}`).join(", ")}
        </p>
      ) : null}
    </div>
  );
}
