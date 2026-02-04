// TanStack Query hooks for D&D 5e API

import { useQuery } from "@tanstack/react-query";
import { dnd5eApi } from "./dnd5e";
import { racesApi, classesApi, backgroundsApi, spellsApi, equipmentApi } from "./client";

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

// Backend API hooks for custom data (PHB 2024)
export const backendQueryKeys = {
  races: ["backend", "races"] as const,
  racesMeta: ["backend", "races", "meta"] as const,
  racesBySource: (source: string) => ["backend", "races", "source", source] as const,
  race: (id: string) => ["backend", "race", id] as const,
  raceByExternalId: (externalId: string) => ["backend", "race", "external", externalId] as const,
  classes: ["backend", "classes"] as const,
  classesMeta: ["backend", "classes", "meta"] as const,
  classesBySource: (source: string) => ["backend", "classes", "source", source] as const,
  class: (id: string) => ["backend", "class", id] as const,
  classByExternalId: (externalId: string) => ["backend", "class", "external", externalId] as const,
  backgrounds: ["backend", "backgrounds"] as const,
  backgroundsMeta: ["backend", "backgrounds", "meta"] as const,
  backgroundsBySource: (source: string) => ["backend", "backgrounds", "source", source] as const,
  background: (id: string) => ["backend", "background", id] as const,
  backgroundByExternalId: (externalId: string) => ["backend", "background", "external", externalId] as const,
  spells: ["backend", "spells"] as const,
  spellsMeta: ["backend", "spells", "meta"] as const,
  spellsBySource: (source: string) => ["backend", "spells", "source", source] as const,
  spellsByClass: (classId: string, source?: string) =>
    source ? ["backend", "spells", "class", classId, "source", source] as const : ["backend", "spells", "class", classId] as const,
  spell: (id: string) => ["backend", "spell", id] as const,
  spellByExternalId: (externalId: string) => ["backend", "spell", "external", externalId] as const,
  equipment: ["backend", "equipment"] as const,
  equipmentMeta: ["backend", "equipment", "meta"] as const,
  equipmentBySource: (source: string) => ["backend", "equipment", "source", source] as const,
  equipmentItem: (id: string) => ["backend", "equipment", id] as const,
  equipmentByExternalId: (externalId: string) => ["backend", "equipment", "external", externalId] as const,
};

// Races (from backend - PHB 2024 data)
// Получить только мета-данные (без описаний и traits) - для списка
export function useBackendRacesMeta(source?: string) {
  return useQuery({
    queryKey: backendQueryKeys.racesMeta,
    queryFn: () => racesApi.listMeta(source),
    staleTime: 5 * 60 * 1000, // 5 минут
  });
}

// Получить полные данные (с описаниями и traits) - для редактирования
export function useBackendRaces(source?: string) {
  return useQuery({
    queryKey: source ? backendQueryKeys.racesBySource(source) : backendQueryKeys.races,
    queryFn: () => racesApi.list(source),
    staleTime: 0, // Always refetch to get latest data
    refetchOnMount: 'always', // Always fetch on component mount
  });
}

export function useBackendRace(id: string) {
  return useQuery({
    queryKey: backendQueryKeys.race(id),
    queryFn: () => racesApi.get(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 минут
  });
}

export function useBackendRaceByExternalId(externalId: string) {
  return useQuery({
    queryKey: backendQueryKeys.raceByExternalId(externalId),
    queryFn: () => racesApi.getByExternalId(externalId),
    enabled: !!externalId,
    staleTime: 5 * 60 * 1000, // 5 минут
  });
}

// Classes (from backend - PHB 2024 data)
// Получить только мета-данные (без описаний, features и subclasses) - для списка
export function useBackendClassesMeta(source?: string) {
  return useQuery({
    queryKey: backendQueryKeys.classesMeta,
    queryFn: () => classesApi.listMeta(source),
    staleTime: 5 * 60 * 1000, // 5 минут
  });
}

// Получить полные данные (с описаниями, features и subclasses) - для редактирования
export function useBackendClasses(source?: string) {
  return useQuery({
    queryKey: source ? backendQueryKeys.classesBySource(source) : backendQueryKeys.classes,
    queryFn: () => classesApi.list(source),
    staleTime: 0, // Always refetch to get latest data
    refetchOnMount: 'always', // Always fetch on component mount
  });
}

export function useBackendClass(id: string) {
  return useQuery({
    queryKey: backendQueryKeys.class(id),
    queryFn: () => classesApi.get(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 минут
  });
}

export function useBackendClassByExternalId(externalId: string) {
  return useQuery({
    queryKey: backendQueryKeys.classByExternalId(externalId),
    queryFn: () => classesApi.getByExternalId(externalId),
    enabled: !!externalId,
    staleTime: 5 * 60 * 1000, // 5 минут
  });
}

// Backgrounds (from backend - PHB 2024 data)
// Получить только мета-данные (без описаний) - для списка
export function useBackendBackgroundsMeta(source?: string) {
  return useQuery({
    queryKey: backendQueryKeys.backgroundsMeta,
    queryFn: () => backgroundsApi.listMeta(source),
    staleTime: 5 * 60 * 1000, // 5 минут
  });
}

// Получить полные данные (с описаниями) - для редактирования
export function useBackendBackgrounds(source?: string) {
  return useQuery({
    queryKey: source ? backendQueryKeys.backgroundsBySource(source) : backendQueryKeys.backgrounds,
    queryFn: () => backgroundsApi.list(source),
    staleTime: 0, // Always refetch to get latest data
    refetchOnMount: 'always', // Always fetch on component mount
  });
}

export function useBackendBackground(id: string) {
  return useQuery({
    queryKey: backendQueryKeys.background(id),
    queryFn: () => backgroundsApi.get(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 минут
  });
}

export function useBackendBackgroundByExternalId(externalId: string) {
  return useQuery({
    queryKey: backendQueryKeys.backgroundByExternalId(externalId),
    queryFn: () => backgroundsApi.getByExternalId(externalId),
    enabled: !!externalId,
    staleTime: 5 * 60 * 1000, // 5 минут
  });
}

// Spells (from backend - PHB 2024 data)
// Получить только мета-данные (без описаний) - для списка
export function useBackendSpellsMeta(source?: string) {
  return useQuery({
    queryKey: source ? backendQueryKeys.spellsBySource(source) : backendQueryKeys.spells,
    queryFn: () => spellsApi.listMeta(source),
    staleTime: 5 * 60 * 1000, // 5 минут
  });
}

// Получить полные данные (с описаниями) - для редактирования
export function useBackendSpells(source?: string) {
  return useQuery({
    queryKey: source ? backendQueryKeys.spellsBySource(source) : backendQueryKeys.spells,
    queryFn: () => spellsApi.list(source),
    staleTime: 0, // Always refetch to get latest data
    refetchOnMount: 'always', // Always fetch on component mount
  });
}

export function useBackendSpell(id: string) {
  return useQuery({
    queryKey: backendQueryKeys.spell(id),
    queryFn: () => spellsApi.get(id),
    enabled: !!id,
    staleTime: Infinity,
  });
}

export function useBackendSpellByExternalId(externalId: string) {
  return useQuery({
    queryKey: backendQueryKeys.spellByExternalId(externalId),
    queryFn: () => spellsApi.getByExternalId(externalId),
    enabled: !!externalId,
    staleTime: Infinity,
  });
}

// Spells by class (from backend - PHB 2024 data)
export function useBackendSpellsByClass(classId: string, source?: string) {
  return useQuery({
    queryKey: backendQueryKeys.spellsByClass(classId, source),
    queryFn: () => spellsApi.getByClass(classId, source),
    enabled: !!classId,
    staleTime: 0, // Always refetch to get latest data
    refetchOnMount: 'always', // Always fetch on component mount
  });
}

// Equipment (from backend)
// Получить только мета-данные (без описаний) - для списка
export function useBackendEquipmentMeta(source?: string, enabled: boolean = true) {
  return useQuery({
    queryKey: backendQueryKeys.equipmentMeta,
    queryFn: () => equipmentApi.listMeta(source),
    staleTime: 5 * 60 * 1000, // 5 минут
    enabled,
  });
}

// Получить полные данные (с описаниями) - для редактирования
export function useBackendEquipment(source?: string) {
  return useQuery({
    queryKey: source ? backendQueryKeys.equipmentBySource(source) : backendQueryKeys.equipment,
    queryFn: () => equipmentApi.list(source),
    staleTime: 0, // Always refetch to get latest data
    refetchOnMount: 'always', // Always fetch on component mount
  });
}

// Получить конкретный предмет по ID
export function useBackendEquipmentItem(id: string) {
  return useQuery({
    queryKey: backendQueryKeys.equipmentItem(id),
    queryFn: () => equipmentApi.get(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 минут
  });
}

// Получить конкретный предмет по externalId
export function useBackendEquipmentByExternalId(externalId: string) {
  return useQuery({
    queryKey: backendQueryKeys.equipmentByExternalId(externalId),
    queryFn: () => equipmentApi.getByExternalId(externalId),
    enabled: !!externalId,
    staleTime: 5 * 60 * 1000, // 5 минут
  });
}
