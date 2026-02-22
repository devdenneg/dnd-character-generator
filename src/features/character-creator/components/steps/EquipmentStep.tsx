import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useMemo, useState } from "react";
import { useCreatorStore } from "../../store/creatorStore";
import type { BackgroundOption, ClassOption, EquipmentOption } from "../../types";
import {
  classEquipmentSummary,
  equipmentOptionLabel,
  extractClassEquipmentChoices,
  formatCopperAsGold,
  hasClassGoldAlternative,
  selectedEquipmentCostCopper,
} from "../../utils/characterDerivations";
import { StepHeader } from "../shared/StepHeader";

interface EquipmentStepProps {
  selectedClass: ClassOption | null;
  selectedBackground: BackgroundOption | null;
  equipment: EquipmentOption[];
}

export function EquipmentStep({
  selectedClass,
  selectedBackground,
  equipment,
}: EquipmentStepProps) {
  const [search, setSearch] = useState("");
  const includeBackgroundEquipment = useCreatorStore((state) => state.includeBackgroundEquipment);
  const includeClassEquipment = useCreatorStore((state) => state.includeClassEquipment);
  const useClassGoldAlternative = useCreatorStore((state) => state.useClassGoldAlternative);
  const classEquipmentChoiceIndexes = useCreatorStore(
    (state) => state.classEquipmentChoiceIndexes
  );
  const setIncludeBackgroundEquipment = useCreatorStore(
    (state) => state.setIncludeBackgroundEquipment
  );
  const setIncludeClassEquipment = useCreatorStore((state) => state.setIncludeClassEquipment);
  const setUseClassGoldAlternative = useCreatorStore((state) => state.setUseClassGoldAlternative);
  const setClassEquipmentChoice = useCreatorStore((state) => state.setClassEquipmentChoice);
  const setClassEquipmentChoiceIndexes = useCreatorStore(
    (state) => state.setClassEquipmentChoiceIndexes
  );
  const wallet = useCreatorStore((state) => state.wallet);
  const setWallet = useCreatorStore((state) => state.setWallet);
  const selected = useCreatorStore((state) => state.equipment);
  const setEquipment = useCreatorStore((state) => state.setEquipment);

  const backgroundEquipment =
    selectedBackground?.equipment?.map((item) => ({
      id: item.id || item.externalId,
      quantity: item.quantity ?? 1,
      name: item.nameRu || item.name,
    })) ?? [];

  const classChoices = useMemo(
    () => extractClassEquipmentChoices(selectedClass),
    [selectedClass]
  );
  const classSummary = useMemo(
    () => classEquipmentSummary(selectedClass),
    [selectedClass]
  );
  const canUseGoldAlternative = useMemo(
    () => hasClassGoldAlternative(selectedClass),
    [selectedClass]
  );

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return equipment.slice(0, 60);

    return equipment
      .filter(
        (item) =>
          item.nameRu.toLowerCase().includes(query) ||
          item.name.toLowerCase().includes(query)
      )
      .slice(0, 60);
  }, [equipment, search]);

  const getQuantity = (id: string) => selected.find((item) => item.id === id)?.quantity ?? 0;

  const setQuantity = (id: string, quantity: number) => {
    const safe = Math.max(0, Math.min(99, quantity));
    const rest = selected.filter((item) => item.id !== id);
    if (safe === 0) {
      setEquipment(rest);
      return;
    }

    setEquipment([...rest, { id, quantity: safe }]);
  };

  const selectedCostCopper = useMemo(
    () => selectedEquipmentCostCopper(selected, equipment),
    [selected, equipment]
  );
  const classGoldBudgetCopper = Math.max(0, (selectedClass?.startingGold ?? 0) * 100);
  const remainingCopper = classGoldBudgetCopper - selectedCostCopper;

  const onToggleGoldAlternative = (checked: boolean) => {
    setUseClassGoldAlternative(checked);

    if (checked) {
      setIncludeClassEquipment(false);
      setWallet({ ...wallet, gold: selectedClass?.startingGold ?? 0 });
      return;
    }

    setIncludeClassEquipment(true);
  };

  useEffect(() => {
    const next: Record<string, number> = {};
    for (const block of classChoices) {
      next[block.id] = classEquipmentChoiceIndexes[block.id] ?? 0;
    }
    setClassEquipmentChoiceIndexes(next);
  // Reset only when class changes to keep selections consistent with available choice blocks.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedClass?.id]);

  return (
    <div className="space-y-6">
      <StepHeader
        title="Снаряжение"
        description="Укажите, откуда взято снаряжение, и добавьте ручной выбор"
      />

      <div className="grid gap-3 md:grid-cols-2">
        <label className="flex items-center gap-2 rounded-lg border border-border/50 p-3">
          <input
            type="checkbox"
            checked={includeBackgroundEquipment}
            onChange={(event) => setIncludeBackgroundEquipment(event.target.checked)}
          />
          <div>
            <p className="font-medium">Снаряжение из предыстории</p>
            <p className="text-xs text-muted-foreground">
              {backgroundEquipment.length > 0
                ? backgroundEquipment.map((item) => `${item.name} x${item.quantity}`).join(", ")
                : "Нет данных"}
            </p>
          </div>
        </label>

        <label className="flex items-center gap-2 rounded-lg border border-border/50 p-3">
          <input
            type="checkbox"
            checked={includeClassEquipment}
            onChange={(event) => setIncludeClassEquipment(event.target.checked)}
            disabled={useClassGoldAlternative}
          />
          <div>
            <p className="font-medium">Стартовое снаряжение класса</p>
            <p className="text-xs text-muted-foreground">{classSummary}</p>
          </div>
        </label>
      </div>

      {canUseGoldAlternative ? (
        <label className="flex items-center gap-2 rounded-lg border border-border/50 p-3">
          <input
            type="checkbox"
            checked={useClassGoldAlternative}
            onChange={(event) => onToggleGoldAlternative(event.target.checked)}
          />
          <div>
            <p className="font-medium">Взять золото вместо стартового набора</p>
            <p className="text-xs text-muted-foreground">
              Бюджет класса: {selectedClass?.startingGold ?? 0} gp
            </p>
          </div>
        </label>
      ) : null}

      {includeClassEquipment && !useClassGoldAlternative && classChoices.length > 0 ? (
        <div className="space-y-3 rounded-lg border border-border/50 p-3">
          <p className="text-sm font-medium">Выборы стартового снаряжения класса</p>
          {classChoices.map((block) => {
            const selectedIndex = classEquipmentChoiceIndexes[block.id] ?? 0;
            return (
              <div key={block.id} className="space-y-2">
                <Label>Опция {block.id.replace("choice-", "")}</Label>
                <select
                  value={String(selectedIndex)}
                  onChange={(event) =>
                    setClassEquipmentChoice(block.id, Number(event.target.value) || 0)
                  }
                  className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                >
                  {block.options.map((option, index) => (
                    <option key={`${block.id}-${index}`} value={String(index)}>
                      {equipmentOptionLabel(option, equipment)}
                    </option>
                  ))}
                </select>
              </div>
            );
          })}
        </div>
      ) : null}

      <div className="space-y-2">
        <Label>Добавить вручную</Label>
        <Input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Поиск снаряжения"
        />
        <div className="max-h-80 overflow-auto rounded-lg border border-border/60 bg-card/40">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-[1fr_auto] items-center gap-3 border-b border-border/30 px-3 py-2 last:border-0"
            >
              <div>
                <p className="text-sm font-medium">{item.nameRu}</p>
                <p className="text-xs text-muted-foreground">{item.category}</p>
              </div>
              <Input
                type="number"
                min={0}
                max={99}
                value={String(getQuantity(item.id))}
                onChange={(event) => setQuantity(item.id, Number(event.target.value) || 0)}
                className="w-20"
              />
            </div>
          ))}
        </div>
      </div>

      {useClassGoldAlternative ? (
        <div className="rounded-lg border border-border/60 p-3 text-sm space-y-1">
          <p>
            Потрачено: <span className="font-medium">{formatCopperAsGold(selectedCostCopper)}</span>
          </p>
          <p>
            Остаток:{" "}
            <span className={remainingCopper < 0 ? "font-medium text-destructive" : "font-medium"}>
              {formatCopperAsGold(remainingCopper)}
            </span>
          </p>
          {remainingCopper < 0 ? (
            <p className="text-xs text-destructive">
              Превышен бюджет стартового золота класса.
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
