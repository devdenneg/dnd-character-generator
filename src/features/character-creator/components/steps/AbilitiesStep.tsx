import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMemo } from "react";
import { StepHeader } from "../shared/StepHeader";
import { useCreatorStore } from "../../store/creatorStore";
import type { AbilityKey, BackgroundOption } from "../../types";
import { ABILITY_LABELS, ABILITY_ORDER } from "../../utils/constants";
import { abilityModifier, isValidPointBuy, isValidStandardArray, totalPointBuyCost } from "../../utils/calculations";

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
  const expectedIncreaseTotal = useMemo(
    () => (selectedBackground?.abilityScoreIncrease.amount ?? []).reduce((sum, value) => sum + value, 0),
    [selectedBackground?.abilityScoreIncrease.amount]
  );
  const actualIncreaseTotal = useMemo(
    () => Object.values(abilityIncreases).reduce((sum, value) => sum + (value ?? 0), 0),
    [abilityIncreases]
  );
  const pointBuyTotal = useMemo(() => totalPointBuyCost(abilityScores), [abilityScores]);
  const pointBuyValid = useMemo(() => isValidPointBuy(abilityScores), [abilityScores]);
  const standardArrayValid = useMemo(() => isValidStandardArray(abilityScores), [abilityScores]);
  const nonZeroIncreases = useMemo(
    () => Object.values(abilityIncreases).filter((value) => (value ?? 0) > 0),
    [abilityIncreases]
  );
  const isPlusTwoPlusOne = useMemo(() => {
    if (nonZeroIncreases.length !== 2) return false;
    const sorted = [...nonZeroIncreases].sort((a, b) => a - b);
    return sorted[0] === 1 && sorted[1] === 2;
  }, [nonZeroIncreases]);
  const isPlusOneThreeTimes = useMemo(
    () => nonZeroIncreases.length === 3 && nonZeroIncreases.every((value) => value === 1),
    [nonZeroIncreases]
  );
  const supportsThreeOnes = expectedIncreaseTotal === 3 && increaseOptions.length >= 3;

  const handleScoreChange = (ability: AbilityKey, rawValue: string) => {
    const parsed = Number.parseInt(rawValue, 10);
    const value = Number.isFinite(parsed) ? Math.max(1, Math.min(20, parsed)) : 10;
    setAbilityScore(ability, value);
  };

  const handleIncreaseChange = (ability: AbilityKey, rawValue: string) => {
    const parsed = Number.parseInt(rawValue, 10);
    const value = Number.isFinite(parsed) ? Math.max(0, Math.min(2, parsed)) : 0;
    setAbilityIncrease(ability, value);
  };

  const applyIncreasePreset = (mode: "2+1" | "1+1+1") => {
    ABILITY_ORDER.forEach((ability) => setAbilityIncrease(ability, 0));

    if (mode === "2+1") {
      const primary = increaseOptions[0] as AbilityKey | undefined;
      const secondary = increaseOptions[1] as AbilityKey | undefined;
      if (primary) setAbilityIncrease(primary, 2);
      if (secondary) setAbilityIncrease(secondary, 1);
      return;
    }

    increaseOptions.slice(0, 3).forEach((ability) => {
      setAbilityIncrease(ability as AbilityKey, 1);
    });
  };

  const handleStandardArrayPick = (ability: AbilityKey, value: number) => {
    const current = abilityScores[ability];
    if (current === value) return;

    const conflictingAbility = ABILITY_ORDER.find(
      (abilityKey) => abilityKey !== ability && abilityScores[abilityKey] === value
    );

    setAbilityScore(ability, value);
    if (conflictingAbility) {
      setAbilityScore(conflictingAbility, current);
    }
  };

  return (
    <div className="space-y-6">
      <StepHeader
        title="Характеристики"
        description="Базовые значения и бонусы предыстории"
      />

      <div className="flex flex-wrap gap-2">
        {[
          { key: "standard", label: "Стандартный набор" },
          { key: "pointbuy", label: "Покупка очков" },
          { key: "roll", label: "Броски" },
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

      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-lg border border-border/60 p-3 text-sm">
          <p className="font-medium mb-1">Проверка метода</p>
          {abilityMethod === "standard" ? (
            <p className={standardArrayValid ? "text-emerald-700" : "text-amber-700"}>
              {standardArrayValid
                ? "Набор соответствует стандартному массиву (15, 14, 13, 12, 10, 8)."
                : "Нужно использовать ровно числа 15, 14, 13, 12, 10, 8 без повторов."}
            </p>
          ) : abilityMethod === "pointbuy" ? (
            <p className={pointBuyValid ? "text-emerald-700" : "text-amber-700"}>
              Покупка очков: {pointBuyTotal}/27
            </p>
          ) : (
            <p className="text-muted-foreground">
              Броски: введите значения вручную по вашему протоколу бросков.
            </p>
          )}
          <p className="mt-2 text-xs text-muted-foreground">
            В PHB2024 экспертиза (x2 мастерства) влияет на навыки, а не на базовые характеристики.
          </p>
        </div>

        <div className="rounded-lg border border-border/60 p-3 text-sm">
          <p className="font-medium mb-1">Бонусы предыстории</p>
          <p
            className={
              actualIncreaseTotal === expectedIncreaseTotal
                ? "text-emerald-700"
                : "text-amber-700"
            }
          >
            Распределено бонусов: {actualIncreaseTotal}/{expectedIncreaseTotal}
          </p>
          {expectedIncreaseTotal === 3 ? (
            <p className="mt-1 text-xs text-muted-foreground">
              Допустимо: +2/+1{supportsThreeOnes ? " или +1/+1/+1" : ""}.
            </p>
          ) : null}
          <div className="mt-2 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => applyIncreasePreset("2+1")}
              className={`rounded-md border px-2 py-1 text-xs ${
                isPlusTwoPlusOne
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border/60 hover:bg-muted/40"
              }`}
            >
              Пресет +2/+1
            </button>
            {supportsThreeOnes ? (
              <button
                type="button"
                onClick={() => applyIncreasePreset("1+1+1")}
                className={`rounded-md border px-2 py-1 text-xs ${
                  isPlusOneThreeTimes
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border/60 hover:bg-muted/40"
                }`}
              >
                Пресет +1/+1/+1
              </button>
            ) : null}
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            Разрешённые характеристики:{" "}
            {increaseOptions.length > 0
              ? increaseOptions.map((key) => ABILITY_LABELS[key as AbilityKey] ?? key).join(", ")
              : "нет данных"}
          </p>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {ABILITY_ORDER.map((ability) => {
          const base = abilityScores[ability];
          const increase = abilityIncreases[ability] ?? 0;
          const total = base + increase;
          return (
            <div key={ability} className="rounded-lg border border-border/60 p-3 space-y-2">
              <Label>{ABILITY_LABELS[ability]}</Label>
              {abilityMethod === "standard" ? (
                <div className="space-y-2">
                  <div className="grid grid-cols-3 gap-2">
                    {[15, 14, 13, 12, 10, 8].map((value) => {
                      const usedBy = ABILITY_ORDER.find(
                        (abilityKey) => abilityScores[abilityKey] === value
                      );
                      const selected = base === value;
                      const occupiedByAnother = usedBy && usedBy !== ability;

                      return (
                        <button
                          key={`${ability}-${value}`}
                          type="button"
                          onClick={() => handleStandardArrayPick(ability, value)}
                          className={`rounded-md border px-2 py-1 text-sm transition ${
                            selected
                              ? "border-primary bg-primary/15 text-primary font-semibold"
                              : "border-border/60 hover:bg-muted/40"
                          }`}
                          title={
                            occupiedByAnother
                              ? `Сейчас стоит у: ${ABILITY_LABELS[usedBy as AbilityKey]}`
                              : "Назначить значение"
                          }
                        >
                          {value}
                        </button>
                      );
                    })}
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    Клик по значению переносит его на эту характеристику. Повторы невозможны.
                  </p>
                </div>
              ) : (
                <Input
                  type="number"
                  value={String(base)}
                  onChange={(event) => handleScoreChange(ability, event.target.value)}
                />
              )}
              <Input
                type="number"
                value={String(increase)}
                onChange={(event) => handleIncreaseChange(ability, event.target.value)}
                disabled={!increaseOptions.includes(ability)}
              />
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
