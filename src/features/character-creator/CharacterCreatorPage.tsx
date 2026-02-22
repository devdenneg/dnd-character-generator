import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  getSpellLimits,
  parseClassStartingEquipment,
  selectedEquipmentCostCopper,
} from "./utils/characterDerivations";

export function CharacterCreatorPage() {
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState<string>("");
  const step = useCreatorStore((state) => state.step);
  const state = useCreatorStore();

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
  const spellPool = availableSpells.filter((spell) => spell.level > 0);
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
        return Object.values(state.abilityScores).every((value) => value >= 1);
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
