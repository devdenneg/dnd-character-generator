import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  AbilityKey,
  AbilityMethod,
  AbilityScores,
  CharacterDetails,
  CreatorStep,
  EquipmentSelection,
  Wallet,
} from "../types";
import { CREATOR_STEPS, EMPTY_ABILITY_SCORES } from "../utils/constants";

interface CreatorState {
  step: CreatorStep;
  raceId: string | null;
  backgroundId: string | null;
  classId: string | null;
  subclassId: string | null;
  abilityMethod: AbilityMethod;
  abilityScores: AbilityScores;
  abilityIncreases: Partial<AbilityScores>;
  skills: string[];
  featSkills: string[];
  expertiseSkills: string[];
  replacementSkills: string[];
  level: number;
  includeBackgroundEquipment: boolean;
  includeClassEquipment: boolean;
  useClassGoldAlternative: boolean;
  classEquipmentChoiceIndexes: Record<string, number>;
  equipment: EquipmentSelection[];
  wallet: Wallet;
  cantrips: string[];
  spells: string[];
  isPublic: boolean;
  details: CharacterDetails;
  setStep: (step: CreatorStep) => void;
  nextStep: () => void;
  prevStep: () => void;
  setRace: (id: string | null) => void;
  setBackground: (id: string | null) => void;
  setClass: (id: string | null) => void;
  setSubclass: (id: string | null) => void;
  setAbilityMethod: (method: AbilityMethod) => void;
  setAbilityScore: (ability: AbilityKey, value: number) => void;
  setAbilityIncrease: (ability: AbilityKey, value: number) => void;
  toggleSkill: (skill: string) => void;
  toggleFeatSkill: (skill: string) => void;
  toggleExpertiseSkill: (skill: string) => void;
  toggleReplacementSkill: (skill: string) => void;
  setReplacementSkills: (skills: string[]) => void;
  setLevel: (level: number) => void;
  setWallet: (wallet: Wallet) => void;
  setIncludeBackgroundEquipment: (value: boolean) => void;
  setIncludeClassEquipment: (value: boolean) => void;
  setUseClassGoldAlternative: (value: boolean) => void;
  setClassEquipmentChoice: (choiceId: string, optionIndex: number) => void;
  setClassEquipmentChoiceIndexes: (indexes: Record<string, number>) => void;
  setEquipment: (equipment: EquipmentSelection[]) => void;
  toggleCantrip: (spellId: string) => void;
  toggleSpell: (spellId: string) => void;
  setCantrips: (spellIds: string[]) => void;
  setSpells: (spellIds: string[]) => void;
  setDetails: (details: Partial<CharacterDetails>) => void;
  setPublic: (isPublic: boolean) => void;
  reset: () => void;
}

const initialDetails: CharacterDetails = {
  name: "",
  alignment: "",
  personalityTraits: "",
  ideals: "",
  bonds: "",
  flaws: "",
  backstory: "",
  age: "",
  height: "",
  weight: "",
  eyes: "",
  skin: "",
  hair: "",
};

const initialWallet: Wallet = {
  copper: 0,
  silver: 0,
  electrum: 0,
  gold: 0,
  platinum: 0,
};

const firstStep = CREATOR_STEPS[0].key;

export const useCreatorStore = create<CreatorState>()(
  persist(
    (set, get) => ({
      step: firstStep,
      raceId: null,
      backgroundId: null,
      classId: null,
      subclassId: null,
      abilityMethod: "standard",
      abilityScores: EMPTY_ABILITY_SCORES,
      abilityIncreases: {},
      skills: [],
      featSkills: [],
      expertiseSkills: [],
      replacementSkills: [],
      level: 1,
      includeBackgroundEquipment: true,
      includeClassEquipment: true,
      useClassGoldAlternative: false,
      classEquipmentChoiceIndexes: {},
      equipment: [],
      wallet: initialWallet,
      cantrips: [],
      spells: [],
      isPublic: false,
      details: initialDetails,
      setStep: (step) => set({ step }),
      nextStep: () => {
        const current = get().step;
        const currentIndex = CREATOR_STEPS.findIndex((item) => item.key === current);
        const next = CREATOR_STEPS[currentIndex + 1];
        if (next) set({ step: next.key });
      },
      prevStep: () => {
        const current = get().step;
        const currentIndex = CREATOR_STEPS.findIndex((item) => item.key === current);
        const prev = CREATOR_STEPS[currentIndex - 1];
        if (prev) set({ step: prev.key });
      },
      setRace: (raceId) => set({ raceId }),
      setBackground: (backgroundId) => set({ backgroundId }),
      setClass: (classId) =>
        set({
          classId,
          subclassId: null,
          skills: [],
          featSkills: [],
          expertiseSkills: [],
          replacementSkills: [],
          cantrips: [],
          spells: [],
          includeClassEquipment: true,
          useClassGoldAlternative: false,
          classEquipmentChoiceIndexes: {},
        }),
      setSubclass: (subclassId) => set({ subclassId }),
      setAbilityMethod: (abilityMethod) => set({ abilityMethod }),
      setAbilityScore: (ability, value) =>
        set((state) => ({
          abilityScores: {
            ...state.abilityScores,
            [ability]: value,
          },
        })),
      setAbilityIncrease: (ability, value) =>
        set((state) => ({
          abilityIncreases: {
            ...state.abilityIncreases,
            [ability]: value,
          },
        })),
      toggleSkill: (skill) =>
        set((state) => ({
          skills: state.skills.includes(skill)
            ? state.skills.filter((item) => item !== skill)
            : [...state.skills, skill],
        })),
      toggleFeatSkill: (skill) =>
        set((state) => ({
          featSkills: state.featSkills.includes(skill)
            ? state.featSkills.filter((item) => item !== skill)
            : [...state.featSkills, skill],
        })),
      toggleExpertiseSkill: (skill) =>
        set((state) => {
          const normalized = skill.trim().toLowerCase();
          const merged = Array.from(new Set([...state.skills, ...state.featSkills, ...state.replacementSkills]));
          if (!merged.includes(normalized)) {
            return state;
          }
          return {
            expertiseSkills: state.expertiseSkills.includes(normalized)
              ? state.expertiseSkills.filter((item) => item !== normalized)
              : [...state.expertiseSkills, normalized],
          };
        }),
      toggleReplacementSkill: (skill) =>
        set((state) => ({
          replacementSkills: state.replacementSkills.includes(skill)
            ? state.replacementSkills.filter((item) => item !== skill)
            : [...state.replacementSkills, skill],
        })),
      setReplacementSkills: (replacementSkills) => set({ replacementSkills }),
      setLevel: (level) => set({ level: Math.max(1, Math.min(20, level)) }),
      setWallet: (wallet) => set({ wallet }),
      setIncludeBackgroundEquipment: (includeBackgroundEquipment) => set({ includeBackgroundEquipment }),
      setIncludeClassEquipment: (includeClassEquipment) => set({ includeClassEquipment }),
      setUseClassGoldAlternative: (useClassGoldAlternative) => set({ useClassGoldAlternative }),
      setClassEquipmentChoice: (choiceId, optionIndex) =>
        set((state) => ({
          classEquipmentChoiceIndexes: {
            ...state.classEquipmentChoiceIndexes,
            [choiceId]: Math.max(0, optionIndex),
          },
        })),
      setClassEquipmentChoiceIndexes: (classEquipmentChoiceIndexes) => set({ classEquipmentChoiceIndexes }),
      setEquipment: (equipment) => set({ equipment }),
      toggleCantrip: (spellId) =>
        set((state) => ({
          cantrips: state.cantrips.includes(spellId)
            ? state.cantrips.filter((item) => item !== spellId)
            : [...state.cantrips, spellId],
        })),
      toggleSpell: (spellId) =>
        set((state) => ({
          spells: state.spells.includes(spellId)
            ? state.spells.filter((item) => item !== spellId)
            : [...state.spells, spellId],
        })),
      setCantrips: (cantrips) => set({ cantrips: Array.from(new Set(cantrips)) }),
      setSpells: (spells) => set({ spells: Array.from(new Set(spells)) }),
      setDetails: (details) =>
        set((state) => ({ details: { ...state.details, ...details } })),
      setPublic: (isPublic) => set({ isPublic }),
      reset: () =>
        set({
          step: firstStep,
          raceId: null,
          backgroundId: null,
          classId: null,
          subclassId: null,
          abilityMethod: "standard",
          abilityScores: EMPTY_ABILITY_SCORES,
          abilityIncreases: {},
          skills: [],
          featSkills: [],
          expertiseSkills: [],
          replacementSkills: [],
          level: 1,
          includeBackgroundEquipment: true,
          includeClassEquipment: true,
          useClassGoldAlternative: false,
          classEquipmentChoiceIndexes: {},
          equipment: [],
          wallet: initialWallet,
          cantrips: [],
          spells: [],
          isPublic: false,
          details: initialDetails,
        }),
    }),
    {
      name: "character-creator-store-v2",
      partialize: (state) => ({
        step: state.step,
        raceId: state.raceId,
        backgroundId: state.backgroundId,
        classId: state.classId,
        subclassId: state.subclassId,
        abilityMethod: state.abilityMethod,
        abilityScores: state.abilityScores,
        abilityIncreases: state.abilityIncreases,
        skills: state.skills,
        featSkills: state.featSkills,
        expertiseSkills: state.expertiseSkills,
        replacementSkills: state.replacementSkills,
        level: state.level,
        includeBackgroundEquipment: state.includeBackgroundEquipment,
        includeClassEquipment: state.includeClassEquipment,
        useClassGoldAlternative: state.useClassGoldAlternative,
        classEquipmentChoiceIndexes: state.classEquipmentChoiceIndexes,
        equipment: state.equipment,
        wallet: state.wallet,
        cantrips: state.cantrips,
        spells: state.spells,
        isPublic: state.isPublic,
        details: state.details,
      }),
    }
  )
);
