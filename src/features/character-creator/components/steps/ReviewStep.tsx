import type {
  BackgroundOption,
  ClassOption,
  EquipmentOption,
  RaceOption,
  SpellOption,
} from "../../types";
import { useCreatorStore } from "../../store/creatorStore";
import { applyIncreases, abilityModifier } from "../../utils/calculations";
import { ABILITY_LABELS, ABILITY_ORDER } from "../../utils/constants";
import {
  buildDerivedEquipment,
  buildDerivedSkills,
  getAvailableSpellsForClass,
  getSpellLimits,
  mapEquipmentNames,
  parseClassStartingEquipment,
} from "../../utils/characterDerivations";
import { CharacterSheetPreview } from "../shared/CharacterSheetPreview";
import { StepHeader } from "../shared/StepHeader";

interface ReviewStepProps {
  races: RaceOption[];
  backgrounds: BackgroundOption[];
  classes: ClassOption[];
  equipment: EquipmentOption[];
  spells: SpellOption[];
}

export function ReviewStep({
  races,
  backgrounds,
  classes,
  equipment,
  spells,
}: ReviewStepProps) {
  const state = useCreatorStore();

  const race = races.find((item) => item.id === state.raceId) ?? null;
  const background = backgrounds.find((item) => item.id === state.backgroundId) ?? null;
  const characterClass = classes.find((item) => item.id === state.classId) ?? null;

  const finalScores = applyIncreases(state.abilityScores, state.abilityIncreases);

  const derivedSkills = buildDerivedSkills({
    classSkills: state.skills,
    backgroundSkills: background?.skillProficiencies ?? [],
    featSkills: state.featSkills,
    replacementSkills: state.replacementSkills,
  });

  const backgroundEquipment =
    background?.equipment?.map((item) => ({
      id: item.id || item.externalId,
      quantity: item.quantity ?? 1,
    })) ?? [];

  const resolvedClassEquipment = parseClassStartingEquipment(
    characterClass,
    true,
    state.classEquipmentChoiceIndexes,
    state.useClassGoldAlternative
  );

  const mergedEquipment = buildDerivedEquipment({
    includeBackgroundEquipment: state.includeBackgroundEquipment,
    backgroundEquipment,
    includeClassEquipment: state.includeClassEquipment,
    classEquipment: resolvedClassEquipment,
    customEquipment: state.equipment,
  });

  const derivedEquipment = mapEquipmentNames(mergedEquipment, equipment);

  const availableSpells = getAvailableSpellsForClass(characterClass, spells);
  const spellLimits = getSpellLimits(characterClass, state.level);
  const cantripNames = state.cantrips
    .map((id) => availableSpells.find((spell) => spell.id === id)?.nameRu ?? id)
    .sort((a, b) => a.localeCompare(b));
  const spellNames = state.spells
    .map((id) => availableSpells.find((spell) => spell.id === id)?.nameRu ?? id)
    .sort((a, b) => a.localeCompare(b));

  return (
    <div className="space-y-6">
      <StepHeader
        title="Карточка персонажа"
        description="Итоговый лист с объяснением источников"
      />

      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-lg border border-border/60 p-4">
          <p className="text-sm text-muted-foreground">Имя</p>
          <p className="font-semibold text-lg">{state.details.name || "—"}</p>
          <p className="text-xs text-muted-foreground mt-1">Уровень {state.level}</p>
        </div>
        <div className="rounded-lg border border-border/60 p-4">
          <p className="text-sm text-muted-foreground">Происхождение</p>
          <p className="font-semibold">{race?.nameRu ?? "—"}</p>
          <p className="text-xs text-muted-foreground">{background?.nameRu ?? "—"}</p>
        </div>
        <div className="rounded-lg border border-border/60 p-4 md:col-span-2">
          <p className="text-sm text-muted-foreground">Класс</p>
          <p className="font-semibold">{characterClass?.nameRu ?? "—"}</p>
        </div>
      </div>

      <CharacterSheetPreview
        level={state.level}
        classData={characterClass}
        abilityScores={finalScores}
        skills={derivedSkills}
        equipment={mergedEquipment.map((item) => ({
          id: item.id,
          quantity: item.quantity,
        }))}
        equipmentCatalog={equipment}
      />

      <div className="rounded-lg border border-border/60 p-4">
        <p className="mb-3 font-medium">Характеристики и модификаторы</p>
        <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
          {ABILITY_ORDER.map((ability) => {
            const base = state.abilityScores[ability];
            const bonus = state.abilityIncreases[ability] ?? 0;
            const total = finalScores[ability];
            const mod = abilityModifier(total);
            return (
              <div key={ability} className="rounded border border-border/40 p-3 text-sm">
                <p className="font-medium">{ABILITY_LABELS[ability]}</p>
                <p className="text-muted-foreground text-xs">База {base} + бонусы {bonus}</p>
                <p className="font-semibold text-lg">{total}</p>
                <p className="text-xs text-muted-foreground">Модификатор {mod >= 0 ? "+" : ""}{mod}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="rounded-lg border border-border/60 p-4 space-y-3">
        <p className="font-medium">Навыки и источники</p>
        {derivedSkills.length === 0 ? (
          <p className="text-sm text-muted-foreground">Навыки не выбраны.</p>
        ) : (
          <div className="grid gap-2 md:grid-cols-2">
            {derivedSkills.map((skill) => (
              <div key={skill.id} className="rounded border border-border/40 p-2 text-sm">
                <p className="font-medium">{skill.id}</p>
                <p className="text-xs text-muted-foreground">{skill.sources.join(" + ")}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="rounded-lg border border-border/60 p-4 space-y-3">
        <p className="font-medium">Снаряжение и источники</p>
        {derivedEquipment.length === 0 ? (
          <p className="text-sm text-muted-foreground">Снаряжение не выбрано.</p>
        ) : (
          <div className="grid gap-2">
            {derivedEquipment.map((item) => (
              <div key={item.id} className="rounded border border-border/40 p-2 text-sm">
                <p className="font-medium">{item.name} x{item.quantity}</p>
                <p className="text-xs text-muted-foreground">Источник: {item.sources.join(" + ")}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="rounded-lg border border-border/60 p-4 space-y-3">
        <p className="font-medium">Заклинания</p>
        {!characterClass?.spellcasting ? (
          <p className="text-sm text-muted-foreground">Класс не использует заклинания на старте.</p>
        ) : (
          <>
            <div>
              <p className="text-sm font-medium">Кантрипы</p>
              <p className="text-sm text-muted-foreground">
                {cantripNames.length > 0 ? cantripNames.join(", ") : "Не выбраны"}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium">Заклинания</p>
              <p className="text-sm text-muted-foreground">
                {spellNames.length > 0 ? spellNames.join(", ") : "Не выбраны"}
              </p>
            </div>
            {spellLimits.spellSlots && spellLimits.spellSlots.length > 0 ? (
              <div>
                <p className="text-sm font-medium">Ячейки заклинаний</p>
                <p className="text-sm text-muted-foreground">
                  {spellLimits.spellSlots
                    .map((count, idx) => `L${idx + 1}: ${count}`)
                    .join(", ")}
                </p>
              </div>
            ) : null}
          </>
        )}
      </div>

      <label className="flex items-center gap-3 rounded-lg border border-border/60 p-4">
        <input
          type="checkbox"
          checked={state.isPublic}
          onChange={(event) => state.setPublic(event.target.checked)}
        />
        <div>
          <p className="font-medium">Публичный профиль</p>
          <p className="text-sm text-muted-foreground">
            Если включено, персонаж доступен по short-link.
          </p>
        </div>
      </label>
    </div>
  );
}
