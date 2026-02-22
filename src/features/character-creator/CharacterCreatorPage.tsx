import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CreatorLayout } from "./components/CreatorLayout";
import { CreatorNavigation } from "./components/CreatorNavigation";
import { AbilitiesStep } from "./components/steps/AbilitiesStep";
import { ClassStep } from "./components/steps/ClassStep";
import { DetailsStep } from "./components/steps/DetailsStep";
import { EquipmentStep } from "./components/steps/EquipmentStep";
import { OriginStep } from "./components/steps/OriginStep";
import { ReviewStep } from "./components/steps/ReviewStep";
import { SpellsStep } from "./components/steps/SpellsStep";
import { useCreateCharacterMutation } from "./api/mutations";
import { useCreateCharacterPayload } from "./hooks/useCreateCharacterPayload";
import { useCreatorReferenceData } from "./hooks/useCreatorReferenceData";
import { useCreatorStore } from "./store/creatorStore";
import {
  buildDerivedEquipment,
  getSkillConflictInfo,
  getAvailableSpellsForClass,
  getMaxSpellLevelFromSlots,
  getSpellLimits,
  parseClassStartingEquipment,
  selectedEquipmentCostCopper,
} from "./utils/characterDerivations";
import { isValidPointBuy, isValidStandardArray } from "./utils/calculations";

export function CharacterCreatorPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [submitError, setSubmitError] = useState<string>("");
  const step = useCreatorStore((state) => state.step);
  const setStep = useCreatorStore((state) => state.setStep);
  const state = useCreatorStore();
  const requestedStep = searchParams.get("step");

  useEffect(() => {
    if (!requestedStep) return;
    const allowed = new Set([
      "origin",
      "class",
      "abilities",
      "equipment",
      "spells",
      "details",
      "review",
    ]);
    if (allowed.has(requestedStep) && requestedStep !== step) {
      setStep(requestedStep as typeof step);
    }
  }, [requestedStep, setStep, step]);

  const { races, backgrounds, classes, equipment, spells, isLoading, isError } =
    useCreatorReferenceData();

  const selectedBackground =
    backgrounds.find((item) => item.id === state.backgroundId) ?? null;
  const selectedClass = classes.find((item) => item.id === state.classId) ?? null;
  const backgroundSkills = selectedBackground?.skillProficiencies ?? [];

  const payload = useCreateCharacterPayload({
    races,
    backgrounds,
    classes,
    equipmentOptions: equipment,
  });

  const createMutation = useCreateCharacterMutation();

  const spellLimits = getSpellLimits(selectedClass, state.level);
  const availableSpells = getAvailableSpellsForClass(selectedClass, spells);
  const cantripPool = availableSpells.filter((spell) => spell.level === 0);
  const maxSpellLevel = getMaxSpellLevelFromSlots(spellLimits.spellSlots);
  const spellPool = availableSpells.filter(
    (spell) => spell.level > 0 && spell.level <= maxSpellLevel
  );
  const requiredCantrips = Math.min(spellLimits.cantrips, cantripPool.length);
  const requiredSpells = Math.min(spellLimits.spells, spellPool.length);

  const canContinue = useMemo(() => {
    switch (step) {
      case "origin":
        return Boolean(state.raceId && state.backgroundId);
      case "class": {
        if (!state.classId) return false;
        const classData = classes.find((item) => item.id === state.classId);
        if (!classData) return false;
        const subclassLevel = classData.subclassLevel ?? Number.POSITIVE_INFINITY;
        if (state.level >= subclassLevel && !state.subclassId) return false;
        const conflictInfo = getSkillConflictInfo({
          classSkills: state.skills,
          backgroundSkills,
          featSkills: state.featSkills,
        });
        return (
          state.skills.length === classData.skillCount &&
          state.replacementSkills.length === conflictInfo.requiredReplacementCount
        );
      }
      case "abilities":
        {
          const allPositive = Object.values(state.abilityScores).every((value) => value >= 1);
          if (!allPositive) return false;

          const selectedBackground = backgrounds.find((item) => item.id === state.backgroundId) ?? null;
          const allowed = new Set(selectedBackground?.abilityScoreIncrease.options ?? []);
          const expectedBonus = (selectedBackground?.abilityScoreIncrease.amount ?? []).reduce((sum, value) => sum + value, 0);
          const actualBonus = Object.entries(state.abilityIncreases).reduce((sum, [key, value]) => {
            if (!value) return sum;
            if (allowed.size > 0 && !allowed.has(key)) return Number.POSITIVE_INFINITY;
            return sum + value;
          }, 0);
          if (actualBonus !== expectedBonus) return false;

          const picked = Object.values(state.abilityIncreases)
            .map((value) => value ?? 0)
            .filter((value) => value > 0);
          if (picked.some((value) => value > 2)) return false;
          if (expectedBonus === 3) {
            const sorted = [...picked].sort((a, b) => a - b);
            const isTwoPlusOne =
              sorted.length === 2 && sorted[0] === 1 && sorted[1] === 2;
            const isOneOneOne =
              sorted.length === 3 && sorted.every((value) => value === 1);
            if (!isTwoPlusOne && !isOneOneOne) return false;
          }

          if (state.abilityMethod === "standard") return isValidStandardArray(state.abilityScores);
          if (state.abilityMethod === "pointbuy") return isValidPointBuy(state.abilityScores);
          return true;
        }
      case "equipment": {
        const backgroundEquipment =
          selectedBackground?.equipment?.map((item) => ({
            id: item.id || item.externalId,
            quantity: item.quantity ?? 1,
          })) ?? [];

        const resolvedClassEquipment = parseClassStartingEquipment(
          selectedClass,
          true,
          state.classEquipmentChoiceIndexes,
          state.useClassGoldAlternative
        );

        const derived = buildDerivedEquipment({
          includeBackgroundEquipment: state.includeBackgroundEquipment,
          backgroundEquipment,
          includeClassEquipment: state.includeClassEquipment,
          classEquipment: resolvedClassEquipment,
          customEquipment: state.equipment,
        });

        if (state.useClassGoldAlternative) {
          const totalCostCopper = selectedEquipmentCostCopper(state.equipment, equipment);
          const budgetCopper = Math.max(0, (selectedClass?.startingGold ?? 0) * 100);
          return totalCostCopper <= budgetCopper;
        }

        return derived.length > 0;
      }
      case "spells":
        if (!spellLimits.hasSpellcasting) return true;
        {
          const cantripIds = new Set(cantripPool.map((spell) => spell.id));
          const spellIds = new Set(spellPool.map((spell) => spell.id));
          const hasInvalidCantrip = state.cantrips.some((id) => !cantripIds.has(id));
          const hasInvalidSpell = state.spells.some((id) => !spellIds.has(id));
          if (hasInvalidCantrip || hasInvalidSpell) return false;
        }
        return (
          state.cantrips.length === requiredCantrips &&
          state.spells.length === requiredSpells
        );
      case "details":
        return state.details.name.trim().length > 0;
      case "review":
        return Boolean(payload.name && payload.raceId && payload.classId && payload.backgroundId);
      default:
        return false;
    }
  }, [
    step,
    state,
    classes,
    payload,
    selectedBackground,
    selectedClass,
    backgroundSkills,
    spellLimits,
    requiredCantrips,
    requiredSpells,
  ]);

  const handleSubmit = async () => {
    setSubmitError("");
    try {
      await createMutation.mutateAsync(payload);
      state.reset();
      navigate("/my-characters");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Не удалось создать персонажа";
      setSubmitError(message);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto max-w-4xl p-6">Загрузка справочников...</div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto max-w-4xl p-6 space-y-4">
        <p className="text-destructive">Ошибка загрузки справочников.</p>
        <Button onClick={() => window.location.reload()}>Обновить страницу</Button>
      </div>
    );
  }

  return (
    <CreatorLayout>
      {step === "origin" && (
        <OriginStep races={races} backgrounds={backgrounds} />
      )}
      {step === "class" && (
        <ClassStep classes={classes} selectedBackground={selectedBackground} />
      )}
      {step === "abilities" && <AbilitiesStep backgrounds={backgrounds} />}
      {step === "equipment" && (
        <EquipmentStep
          selectedClass={selectedClass}
          selectedBackground={selectedBackground}
          equipment={equipment}
        />
      )}
      {step === "spells" && (
        <SpellsStep selectedClass={selectedClass} spells={spells} />
      )}
      {step === "details" && <DetailsStep />}
      {step === "review" && (
        <ReviewStep
          races={races}
          backgrounds={backgrounds}
          classes={classes}
          equipment={equipment}
          spells={spells}
        />
      )}

      {step === "spells" && spellLimits.hasSpellcasting ? (
        <p className="text-xs text-muted-foreground">
          Доступно: кантрипов {cantripPool.length}, заклинаний {spellPool.length}. Требуется выбрать {requiredCantrips} / {requiredSpells}.
        </p>
      ) : null}

      {submitError ? <p className="text-sm text-destructive">{submitError}</p> : null}

      <CreatorNavigation
        canContinue={canContinue}
        isSubmitting={createMutation.isPending}
        onSubmit={handleSubmit}
      />
    </CreatorLayout>
  );
}
