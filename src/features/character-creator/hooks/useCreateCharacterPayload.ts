import { useMemo } from "react";
import { useCreatorStore } from "../store/creatorStore";
import type {
  BackgroundOption,
  ClassOption,
  EquipmentOption,
  RaceOption,
} from "../types";
import {
  applyGoldToWallet,
  buildDerivedEquipment,
  buildDerivedSkills,
  hasClassGoldAlternative,
  mapEquipmentNames,
  parseClassStartingEquipment,
} from "../utils/characterDerivations";

interface BuildPayloadInput {
  races: RaceOption[];
  backgrounds: BackgroundOption[];
  classes: ClassOption[];
  equipmentOptions: EquipmentOption[];
}

export function useCreateCharacterPayload({
  races,
  backgrounds,
  classes,
  equipmentOptions,
}: BuildPayloadInput) {
  const state = useCreatorStore();

  return useMemo(() => {
    const race = races.find((item) => item.id === state.raceId) ?? null;
    const background =
      backgrounds.find((item) => item.id === state.backgroundId) ?? null;
    const characterClass = classes.find((item) => item.id === state.classId) ?? null;

    const mergedSkills = buildDerivedSkills({
      classSkills: state.skills,
      backgroundSkills: background?.skillProficiencies ?? [],
      featSkills: state.featSkills,
      replacementSkills: state.replacementSkills,
    }).map((item) => item.id);

    const backgroundEquipment =
      background?.equipment?.map((item) => ({
        id: item.id || item.externalId,
        quantity: item.quantity ?? 1,
      })) ?? [];

    const classEquipment = parseClassStartingEquipment(
      characterClass,
      true,
      state.classEquipmentChoiceIndexes,
      state.useClassGoldAlternative
    );

    const wallet = state.useClassGoldAlternative && hasClassGoldAlternative(characterClass)
      ? applyGoldToWallet(state.wallet, characterClass?.startingGold ?? 0)
      : state.wallet;

    const mergedEquipment = buildDerivedEquipment({
      includeBackgroundEquipment: state.includeBackgroundEquipment,
      backgroundEquipment,
      includeClassEquipment: state.includeClassEquipment,
      classEquipment,
      customEquipment: state.equipment,
    });

    const readableEquipment = mapEquipmentNames(mergedEquipment, equipmentOptions).map((item) => ({
      id: item.id,
      name: item.name,
      quantity: item.quantity,
      sources: item.sources,
    }));

    return {
      name: state.details.name.trim(),
      raceId: state.raceId,
      classId: state.classId,
      subclassId: state.subclassId,
      backgroundId: state.backgroundId,
      raceSnapshot: race,
      classSnapshot: characterClass,
      backgroundSnapshot: background,
      abilityScores: state.abilityScores,
      abilityScoreMethod: state.abilityMethod,
      abilityScoreIncreases: state.abilityIncreases,
      skillProficiencies: mergedSkills,
      toolProficiencies: background?.toolProficiencies ?? [],
      languages: [],
      equipment: mergedEquipment.map((item) => ({ id: item.id, quantity: item.quantity })),
      wallet,
      cantripsKnown: state.cantrips,
      spellsKnown: state.spells,
      spellsPrepared: [],
      details: {
        alignment: state.details.alignment,
        personalityTraits: state.details.personalityTraits,
        ideals: state.details.ideals,
        bonds: state.details.bonds,
        flaws: state.details.flaws,
        backstory: state.details.backstory,
        age: state.details.age,
        height: state.details.height,
        weight: state.details.weight,
        eyes: state.details.eyes,
        skin: state.details.skin,
        hair: state.details.hair,
      },
      level: state.level,
      experience: 0,
      isPublic: state.isPublic,
      // Extra explanation block to keep source tracking in stored JSON
      creationBreakdown: {
        skills: buildDerivedSkills({
          classSkills: state.skills,
          backgroundSkills: background?.skillProficiencies ?? [],
          featSkills: state.featSkills,
          replacementSkills: state.replacementSkills,
        }),
        equipment: readableEquipment,
        classEquipmentMode:
          state.useClassGoldAlternative && hasClassGoldAlternative(characterClass)
            ? "gold-alternative"
            : "standard-equipment",
      },
    };
  }, [state, races, backgrounds, classes, equipmentOptions]);
}
