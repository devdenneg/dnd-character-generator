import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StepHeader } from "../shared/StepHeader";
import { useCreatorStore } from "../../store/creatorStore";
import type { AbilityKey, BackgroundOption } from "../../types";
import { ABILITY_LABELS, ABILITY_ORDER, STANDARD_ARRAY } from "../../utils/constants";
import { abilityModifier } from "../../utils/calculations";

interface AbilitiesStepProps {
  backgrounds: BackgroundOption[];
}

export function AbilitiesStep({ backgrounds }: AbilitiesStepProps) {
  const abilityScores = useCreatorStore((state) => state.abilityScores);
  const abilityIncreases = useCreatorStore((state) => state.abilityIncreases);
  const abilityMethod = useCreatorStore((state) => state.abilityMethod);
  const setAbilityMethod = useCreatorStore((state) => state.setAbilityMethod);
  const setAbilityScore = useCreatorStore((state) => state.setAbilityScore);
  const setAbilityIncrease = useCreatorStore((state) => state.setAbilityIncrease);
  const backgroundId = useCreatorStore((state) => state.backgroundId);

  const selectedBackground = backgrounds.find((item) => item.id === backgroundId) ?? null;
  const increaseOptions = selectedBackground?.abilityScoreIncrease.options ?? [];

  const handleScoreChange = (ability: AbilityKey, rawValue: string) => {
    const parsed = Number.parseInt(rawValue, 10);
    const value = Number.isFinite(parsed) ? Math.max(1, Math.min(20, parsed)) : 10;
    setAbilityScore(ability, value);
  };

  const handleIncreaseChange = (ability: AbilityKey, rawValue: string) => {
    const parsed = Number.parseInt(rawValue, 10);
    const value = Number.isFinite(parsed) ? Math.max(0, Math.min(3, parsed)) : 0;
    setAbilityIncrease(ability, value);
  };

  return (
    <div className="space-y-6">
      <StepHeader
        title="Характеристики"
        description="Базовые значения и бонусы предыстории"
      />

      <div className="flex flex-wrap gap-2">
        {[
          { key: "standard", label: "Standard Array" },
          { key: "pointbuy", label: "Point Buy" },
          { key: "roll", label: "Roll" },
        ].map((item) => (
          <button
            key={item.key}
            onClick={() => setAbilityMethod(item.key as typeof abilityMethod)}
            className={`rounded-lg border px-3 py-2 text-sm ${
              abilityMethod === item.key
                ? "border-primary bg-primary/10"
                : "border-border/60 hover:bg-muted/40"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {abilityMethod === "standard" && (
        <p className="text-sm text-muted-foreground">
          Рекомендуемый набор: {STANDARD_ARRAY.join(", ")}
        </p>
      )}

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {ABILITY_ORDER.map((ability) => {
          const base = abilityScores[ability];
          const increase = abilityIncreases[ability] ?? 0;
          const total = base + increase;
          return (
            <div key={ability} className="rounded-lg border border-border/60 p-3 space-y-2">
              <Label>{ABILITY_LABELS[ability]}</Label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  type="number"
                  value={String(base)}
                  onChange={(event) => handleScoreChange(ability, event.target.value)}
                />
                <Input
                  type="number"
                  value={String(increase)}
                  onChange={(event) => handleIncreaseChange(ability, event.target.value)}
                  disabled={!increaseOptions.includes(ability)}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Итого: {total} (модификатор {abilityModifier(total) >= 0 ? "+" : ""}
                {abilityModifier(total)})
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
