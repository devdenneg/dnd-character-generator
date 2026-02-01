// TanStack Query hooks for D&D 5e API

import { useQuery } from "@tanstack/react-query";
import { dnd5eApi } from "./dnd5e";

// Query keys
export const queryKeys = {
  races: ["races"] as const,
  race: (index: string) => ["race", index] as const,
  traits: ["traits"] as const,
  trait: (index: string) => ["trait", index] as const,
  classes: ["classes"] as const,
  class: (index: string) => ["class", index] as const,
  classLevels: (index: string) => ["class", index, "levels"] as const,
  classLevel: (classIndex: string, level: number) =>
    ["class", classIndex, "level", level] as const,
  classFeatures: (index: string) => ["class", index, "features"] as const,
  classSpells: (index: string) => ["class", index, "spells"] as const,
  backgrounds: ["backgrounds"] as const,
  background: (index: string) => ["background", index] as const,
  equipment: ["equipment"] as const,
  equipmentItem: (index: string) => ["equipment", index] as const,
  spells: ["spells"] as const,
  spell: (index: string) => ["spell", index] as const,
  spellsByClass: (classIndex: string) =>
    ["spells", "class", classIndex] as const,
  abilityScores: ["ability-scores"] as const,
  abilityScore: (index: string) => ["ability-score", index] as const,
  skills: ["skills"] as const,
  skill: (index: string) => ["skill", index] as const,
  features: ["features"] as const,
  feature: (index: string) => ["feature", index] as const,
};

// Races
export function useRaces() {
  return useQuery({
    queryKey: queryKeys.races,
    queryFn: dnd5eApi.getRaces,
    staleTime: Infinity, // Data doesn't change
  });
}

export function useRace(index: string) {
  return useQuery({
    queryKey: queryKeys.race(index),
    queryFn: () => dnd5eApi.getRace(index),
    enabled: !!index,
    staleTime: Infinity,
  });
}

export function useTrait(index: string) {
  return useQuery({
    queryKey: queryKeys.trait(index),
    queryFn: () => dnd5eApi.getTrait(index),
    enabled: !!index,
    staleTime: Infinity,
  });
}

// Classes
export function useClasses() {
  return useQuery({
    queryKey: queryKeys.classes,
    queryFn: dnd5eApi.getClasses,
    staleTime: Infinity,
  });
}

export function useClass(index: string) {
  return useQuery({
    queryKey: queryKeys.class(index),
    queryFn: () => dnd5eApi.getClass(index),
    enabled: !!index,
    staleTime: Infinity,
  });
}

export function useClassLevels(index: string) {
  return useQuery({
    queryKey: queryKeys.classLevels(index),
    queryFn: () => dnd5eApi.getClassLevels(index),
    enabled: !!index,
    staleTime: Infinity,
  });
}

export function useClassLevel(classIndex: string, level: number) {
  return useQuery({
    queryKey: queryKeys.classLevel(classIndex, level),
    queryFn: () => dnd5eApi.getClassLevel(classIndex, level),
    enabled: !!classIndex && level > 0,
    staleTime: Infinity,
  });
}

export function useClassSpells(index: string) {
  return useQuery({
    queryKey: queryKeys.classSpells(index),
    queryFn: () => dnd5eApi.getClassSpells(index),
    enabled: !!index,
    staleTime: Infinity,
  });
}

// Backgrounds
export function useBackgrounds() {
  return useQuery({
    queryKey: queryKeys.backgrounds,
    queryFn: dnd5eApi.getBackgrounds,
    staleTime: Infinity,
  });
}

export function useBackground(index: string) {
  return useQuery({
    queryKey: queryKeys.background(index),
    queryFn: () => dnd5eApi.getBackground(index),
    enabled: !!index,
    staleTime: Infinity,
  });
}

// Equipment
export function useEquipmentList() {
  return useQuery({
    queryKey: queryKeys.equipment,
    queryFn: dnd5eApi.getEquipment,
    staleTime: Infinity,
  });
}

export function useEquipment(index: string) {
  return useQuery({
    queryKey: queryKeys.equipmentItem(index),
    queryFn: () => dnd5eApi.getEquipmentItem(index),
    enabled: !!index,
    staleTime: Infinity,
  });
}

// Spells
export function useSpells() {
  return useQuery({
    queryKey: queryKeys.spells,
    queryFn: dnd5eApi.getSpells,
    staleTime: Infinity,
  });
}

export function useSpell(index: string) {
  return useQuery({
    queryKey: queryKeys.spell(index),
    queryFn: () => dnd5eApi.getSpell(index),
    enabled: !!index,
    staleTime: Infinity,
  });
}

export function useSpellsByClass(classIndex: string) {
  return useQuery({
    queryKey: queryKeys.spellsByClass(classIndex),
    queryFn: () => dnd5eApi.getSpellsByClass(classIndex),
    enabled: !!classIndex,
    staleTime: Infinity,
  });
}

// Ability Scores
export function useAbilityScores() {
  return useQuery({
    queryKey: queryKeys.abilityScores,
    queryFn: dnd5eApi.getAbilityScores,
    staleTime: Infinity,
  });
}

export function useAbilityScore(index: string) {
  return useQuery({
    queryKey: queryKeys.abilityScore(index),
    queryFn: () => dnd5eApi.getAbilityScore(index),
    enabled: !!index,
    staleTime: Infinity,
  });
}

// Skills
export function useSkills() {
  return useQuery({
    queryKey: queryKeys.skills,
    queryFn: dnd5eApi.getSkills,
    staleTime: Infinity,
  });
}

export function useSkill(index: string) {
  return useQuery({
    queryKey: queryKeys.skill(index),
    queryFn: () => dnd5eApi.getSkill(index),
    enabled: !!index,
    staleTime: Infinity,
  });
}

// Features
export function useFeatures() {
  return useQuery({
    queryKey: queryKeys.features,
    queryFn: dnd5eApi.getFeatures,
    staleTime: Infinity,
  });
}

export function useFeature(index: string) {
  return useQuery({
    queryKey: queryKeys.feature(index),
    queryFn: () => dnd5eApi.getFeature(index),
    enabled: !!index,
    staleTime: Infinity,
  });
}
