import {
  useBackendBackgroundsMeta,
  useBackendClassesMeta,
  useBackendEquipmentMeta,
  useBackendRacesMeta,
  useBackendSpellsMeta,
} from "@/api/hooks";
import type {
  BackgroundOption,
  ClassOption,
  EquipmentOption,
  RaceOption,
  SpellOption,
} from "../types";

interface Envelope<T> {
  success?: boolean;
  data?: T;
}

function asArray<T>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : [];
}

export function useCreatorReferenceData() {
  const racesQuery = useBackendRacesMeta();
  const backgroundsQuery = useBackendBackgroundsMeta();
  const classesQuery = useBackendClassesMeta();
  const equipmentQuery = useBackendEquipmentMeta();
  const spellsQuery = useBackendSpellsMeta();

  const racesEnvelope = racesQuery.data as Envelope<{ races?: RaceOption[] }> | undefined;
  const backgroundsEnvelope =
    backgroundsQuery.data as Envelope<{ backgrounds?: BackgroundOption[] }> | undefined;
  const classesEnvelope =
    classesQuery.data as Envelope<{ classes?: ClassOption[] }> | undefined;
  const equipmentEnvelope =
    equipmentQuery.data as Envelope<{ equipment?: EquipmentOption[] }> | undefined;
  const spellsEnvelope =
    spellsQuery.data as Envelope<{ spells?: SpellOption[] }> | undefined;

  return {
    races: asArray<RaceOption>(racesEnvelope?.data?.races),
    backgrounds: asArray<BackgroundOption>(backgroundsEnvelope?.data?.backgrounds),
    classes: asArray<ClassOption>(classesEnvelope?.data?.classes),
    equipment: asArray<EquipmentOption>(equipmentEnvelope?.data?.equipment),
    spells: asArray<SpellOption>(spellsEnvelope?.data?.spells),
    isLoading:
      racesQuery.isLoading ||
      backgroundsQuery.isLoading ||
      classesQuery.isLoading ||
      equipmentQuery.isLoading ||
      spellsQuery.isLoading,
    isError:
      racesQuery.isError ||
      backgroundsQuery.isError ||
      classesQuery.isError ||
      equipmentQuery.isError ||
      spellsQuery.isError,
  };
}
