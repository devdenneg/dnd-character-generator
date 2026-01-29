import { create } from "zustand";
import type {
  AbilityScores,
  AbilityName,
  Race,
  CharacterClass,
  Subclass,
  Background,
  Equipment,
  Spell,
  Character,
  CharacterStats,
  Wallet,
  SpellSlots,
} from "@/types/character";

// Таблица ячеек заклинаний PHB 2024 (полные заклинатели: Жрец, Друид, Волшебник, Бард, Чародей)
const FULL_CASTER_SPELL_SLOTS: SpellSlots[] = [
  {
    level1: 2,
    level2: 0,
    level3: 0,
    level4: 0,
    level5: 0,
    level6: 0,
    level7: 0,
    level8: 0,
    level9: 0,
  }, // 1
  {
    level1: 3,
    level2: 0,
    level3: 0,
    level4: 0,
    level5: 0,
    level6: 0,
    level7: 0,
    level8: 0,
    level9: 0,
  }, // 2
  {
    level1: 4,
    level2: 2,
    level3: 0,
    level4: 0,
    level5: 0,
    level6: 0,
    level7: 0,
    level8: 0,
    level9: 0,
  }, // 3
  {
    level1: 4,
    level2: 3,
    level3: 0,
    level4: 0,
    level5: 0,
    level6: 0,
    level7: 0,
    level8: 0,
    level9: 0,
  }, // 4
  {
    level1: 4,
    level2: 3,
    level3: 2,
    level4: 0,
    level5: 0,
    level6: 0,
    level7: 0,
    level8: 0,
    level9: 0,
  }, // 5
  {
    level1: 4,
    level2: 3,
    level3: 3,
    level4: 0,
    level5: 0,
    level6: 0,
    level7: 0,
    level8: 0,
    level9: 0,
  }, // 6
  {
    level1: 4,
    level2: 3,
    level3: 3,
    level4: 1,
    level5: 0,
    level6: 0,
    level7: 0,
    level8: 0,
    level9: 0,
  }, // 7
  {
    level1: 4,
    level2: 3,
    level3: 3,
    level4: 2,
    level5: 0,
    level6: 0,
    level7: 0,
    level8: 0,
    level9: 0,
  }, // 8
  {
    level1: 4,
    level2: 3,
    level3: 3,
    level4: 3,
    level5: 1,
    level6: 0,
    level7: 0,
    level8: 0,
    level9: 0,
  }, // 9
  {
    level1: 4,
    level2: 3,
    level3: 3,
    level4: 3,
    level5: 2,
    level6: 0,
    level7: 0,
    level8: 0,
    level9: 0,
  }, // 10
  {
    level1: 4,
    level2: 3,
    level3: 3,
    level4: 3,
    level5: 2,
    level6: 1,
    level7: 0,
    level8: 0,
    level9: 0,
  }, // 11
  {
    level1: 4,
    level2: 3,
    level3: 3,
    level4: 3,
    level5: 2,
    level6: 1,
    level7: 0,
    level8: 0,
    level9: 0,
  }, // 12
  {
    level1: 4,
    level2: 3,
    level3: 3,
    level4: 3,
    level5: 2,
    level6: 1,
    level7: 1,
    level8: 0,
    level9: 0,
  }, // 13
  {
    level1: 4,
    level2: 3,
    level3: 3,
    level4: 3,
    level5: 2,
    level6: 1,
    level7: 1,
    level8: 0,
    level9: 0,
  }, // 14
  {
    level1: 4,
    level2: 3,
    level3: 3,
    level4: 3,
    level5: 2,
    level6: 1,
    level7: 1,
    level8: 1,
    level9: 0,
  }, // 15
  {
    level1: 4,
    level2: 3,
    level3: 3,
    level4: 3,
    level5: 2,
    level6: 1,
    level7: 1,
    level8: 1,
    level9: 0,
  }, // 16
  {
    level1: 4,
    level2: 3,
    level3: 3,
    level4: 3,
    level5: 2,
    level6: 1,
    level7: 1,
    level8: 1,
    level9: 1,
  }, // 17
  {
    level1: 4,
    level2: 3,
    level3: 3,
    level4: 3,
    level5: 3,
    level6: 1,
    level7: 1,
    level8: 1,
    level9: 1,
  }, // 18
  {
    level1: 4,
    level2: 3,
    level3: 3,
    level4: 3,
    level5: 3,
    level6: 2,
    level7: 1,
    level8: 1,
    level9: 1,
  }, // 19
  {
    level1: 4,
    level2: 3,
    level3: 3,
    level4: 3,
    level5: 3,
    level6: 2,
    level7: 2,
    level8: 1,
    level9: 1,
  }, // 20
];

// Таблица ячеек для полузаклинателей (Паладин, Следопыт)
const HALF_CASTER_SPELL_SLOTS: SpellSlots[] = [
  {
    level1: 0,
    level2: 0,
    level3: 0,
    level4: 0,
    level5: 0,
    level6: 0,
    level7: 0,
    level8: 0,
    level9: 0,
  }, // 1
  {
    level1: 2,
    level2: 0,
    level3: 0,
    level4: 0,
    level5: 0,
    level6: 0,
    level7: 0,
    level8: 0,
    level9: 0,
  }, // 2
  {
    level1: 3,
    level2: 0,
    level3: 0,
    level4: 0,
    level5: 0,
    level6: 0,
    level7: 0,
    level8: 0,
    level9: 0,
  }, // 3
  {
    level1: 3,
    level2: 0,
    level3: 0,
    level4: 0,
    level5: 0,
    level6: 0,
    level7: 0,
    level8: 0,
    level9: 0,
  }, // 4
  {
    level1: 4,
    level2: 2,
    level3: 0,
    level4: 0,
    level5: 0,
    level6: 0,
    level7: 0,
    level8: 0,
    level9: 0,
  }, // 5
  {
    level1: 4,
    level2: 2,
    level3: 0,
    level4: 0,
    level5: 0,
    level6: 0,
    level7: 0,
    level8: 0,
    level9: 0,
  }, // 6
  {
    level1: 4,
    level2: 3,
    level3: 0,
    level4: 0,
    level5: 0,
    level6: 0,
    level7: 0,
    level8: 0,
    level9: 0,
  }, // 7
  {
    level1: 4,
    level2: 3,
    level3: 0,
    level4: 0,
    level5: 0,
    level6: 0,
    level7: 0,
    level8: 0,
    level9: 0,
  }, // 8
  {
    level1: 4,
    level2: 3,
    level3: 2,
    level4: 0,
    level5: 0,
    level6: 0,
    level7: 0,
    level8: 0,
    level9: 0,
  }, // 9
  {
    level1: 4,
    level2: 3,
    level3: 2,
    level4: 0,
    level5: 0,
    level6: 0,
    level7: 0,
    level8: 0,
    level9: 0,
  }, // 10
  {
    level1: 4,
    level2: 3,
    level3: 3,
    level4: 0,
    level5: 0,
    level6: 0,
    level7: 0,
    level8: 0,
    level9: 0,
  }, // 11
  {
    level1: 4,
    level2: 3,
    level3: 3,
    level4: 0,
    level5: 0,
    level6: 0,
    level7: 0,
    level8: 0,
    level9: 0,
  }, // 12
  {
    level1: 4,
    level2: 3,
    level3: 3,
    level4: 1,
    level5: 0,
    level6: 0,
    level7: 0,
    level8: 0,
    level9: 0,
  }, // 13
  {
    level1: 4,
    level2: 3,
    level3: 3,
    level4: 1,
    level5: 0,
    level6: 0,
    level7: 0,
    level8: 0,
    level9: 0,
  }, // 14
  {
    level1: 4,
    level2: 3,
    level3: 3,
    level4: 2,
    level5: 0,
    level6: 0,
    level7: 0,
    level8: 0,
    level9: 0,
  }, // 15
  {
    level1: 4,
    level2: 3,
    level3: 3,
    level4: 2,
    level5: 0,
    level6: 0,
    level7: 0,
    level8: 0,
    level9: 0,
  }, // 16
  {
    level1: 4,
    level2: 3,
    level3: 3,
    level4: 3,
    level5: 1,
    level6: 0,
    level7: 0,
    level8: 0,
    level9: 0,
  }, // 17
  {
    level1: 4,
    level2: 3,
    level3: 3,
    level4: 3,
    level5: 1,
    level6: 0,
    level7: 0,
    level8: 0,
    level9: 0,
  }, // 18
  {
    level1: 4,
    level2: 3,
    level3: 3,
    level4: 3,
    level5: 2,
    level6: 0,
    level7: 0,
    level8: 0,
    level9: 0,
  }, // 19
  {
    level1: 4,
    level2: 3,
    level3: 3,
    level4: 3,
    level5: 2,
    level6: 0,
    level7: 0,
    level8: 0,
    level9: 0,
  }, // 20
];

// Пакт-магия Колдуна (особая механика)
const WARLOCK_SPELL_SLOTS: { slots: number; level: number }[] = [
  { slots: 1, level: 1 }, // 1
  { slots: 2, level: 1 }, // 2
  { slots: 2, level: 2 }, // 3
  { slots: 2, level: 2 }, // 4
  { slots: 2, level: 3 }, // 5
  { slots: 2, level: 3 }, // 6
  { slots: 2, level: 4 }, // 7
  { slots: 2, level: 4 }, // 8
  { slots: 2, level: 5 }, // 9
  { slots: 2, level: 5 }, // 10
  { slots: 3, level: 5 }, // 11
  { slots: 3, level: 5 }, // 12
  { slots: 3, level: 5 }, // 13
  { slots: 3, level: 5 }, // 14
  { slots: 3, level: 5 }, // 15
  { slots: 3, level: 5 }, // 16
  { slots: 4, level: 5 }, // 17
  { slots: 4, level: 5 }, // 18
  { slots: 4, level: 5 }, // 19
  { slots: 4, level: 5 }, // 20
];

// Известные заговоры по уровням
const CANTRIPS_KNOWN: Record<string, number[]> = {
  bard: [2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
  cleric: [3, 3, 3, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
  druid: [2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
  sorcerer: [4, 4, 4, 5, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
  warlock: [2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
  wizard: [3, 3, 3, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
};

// Известные заклинания (для классов, которые знают фиксированное число)
const SPELLS_KNOWN: Record<string, number[]> = {
  bard: [
    4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 15, 15, 16, 18, 19, 19, 20, 22, 22, 22,
  ],
  ranger: [0, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11],
  sorcerer: [
    2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 12, 13, 13, 14, 14, 15, 15, 15, 15,
  ],
  warlock: [
    2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15,
  ],
};

// Начальное золото по предыстории (PHB 2024)
const BACKGROUND_STARTING_GOLD: Record<string, number> = {
  acolyte: 15,
  artisan: 25,
  charlatan: 15,
  criminal: 15,
  entertainer: 11,
  farmer: 15,
  guard: 12,
  guide: 2,
  hermit: 16,
  merchant: 22,
  noble: 29,
  sage: 8,
  sailor: 10,
  scribe: 23,
  soldier: 14,
  wayfarer: 16,
};

const initialWallet: Wallet = {
  copper: 0,
  silver: 0,
  electrum: 0,
  gold: 0,
  platinum: 0,
};

// Wizard step type
export type WizardStep =
  | "race"
  | "class"
  | "skills"
  | "abilities"
  | "background"
  | "abilityIncrease"
  | "equipment"
  | "spells"
  | "details"
  | "summary";

const WIZARD_STEPS: WizardStep[] = [
  "race",
  "class",
  "skills",
  "abilities",
  "background",
  "abilityIncrease",
  "equipment",
  "spells",
  "details",
  "summary",
];

// Initial ability scores
const initialAbilityScores: AbilityScores = {
  strength: 10,
  dexterity: 10,
  constitution: 10,
  intelligence: 10,
  wisdom: 10,
  charisma: 10,
};

// Initial character state
const initialCharacter: Character = {
  name: "",
  level: 1,
  experience: 0,
  race: null,
  class: null,
  subclass: null,
  background: null,
  abilityScores: { ...initialAbilityScores },
  abilityScoreMethod: "standard",
  abilityScoreIncreases: {},
  skillProficiencies: [],
  expertiseSkills: [],
  toolProficiencies: [],
  languages: ["Common"],
  equipment: [],
  wallet: { ...initialWallet },
  cantripsKnown: [],
  spellsKnown: [],
  spellsPrepared: [],
  alignment: "",
  personalityTraits: "",
  ideals: "",
  bonds: "",
  flaws: "",
  backstory: "",
  appearance: "",
  age: "",
  height: "",
  weight: "",
  eyes: "",
  skin: "",
  hair: "",
};

interface CharacterState {
  // Character data
  character: Character;

  // Wizard state
  currentStep: WizardStep;
  completedSteps: WizardStep[];
  loadedCharacterId: string | null;

  // Actions - Navigation
  setStep: (step: WizardStep) => void;
  nextStep: () => void;
  previousStep: () => void;
  canProceed: () => boolean;

  // Actions - Character Updates
  setRace: (race: Race | null) => void;
  setClass: (characterClass: CharacterClass | null) => void;
  setSubclass: (subclass: Subclass | null) => void;
  setBackground: (background: Background | null) => void;
  setAbilityScores: (scores: AbilityScores) => void;
  setAbilityScore: (ability: AbilityName, value: number) => void;
  setAbilityScoreMethod: (method: "standard" | "pointbuy" | "roll") => void;
  setAbilityScoreIncreases: (increases: Partial<AbilityScores>) => void;
  addSkillProficiency: (skill: string) => void;
  removeSkillProficiency: (skill: string) => void;
  setSkillProficiencies: (skills: string[]) => void;
  addEquipment: (item: Equipment) => void;
  removeEquipment: (itemId: string) => void;
  setEquipment: (items: Equipment[]) => void;
  addSpell: (spell: Spell, type: "cantrip" | "known" | "prepared") => void;
  removeSpell: (
    spellId: string,
    type: "cantrip" | "known" | "prepared",
  ) => void;
  setCharacterDetails: (details: Partial<Character>) => void;
  setName: (name: string) => void;
  setLevel: (level: number) => void;

  // Actions - Computed
  getStats: () => CharacterStats;
  getAbilityModifier: (ability: AbilityName) => number;
  getTotalAbilityScore: (ability: AbilityName) => number;

  // Actions - Reset
  resetCharacter: () => void;
  resetStep: (step: WizardStep) => void;

  // Actions - Save/Load
  getCharacterData: () => Character;
  loadCharacter: (data: Character, characterId?: string) => void;
}

// Calculate ability modifier
function calculateModifier(score: number): number {
  return Math.floor((score - 10) / 2);
}

// Calculate proficiency bonus by level
function calculateProficiencyBonus(level: number): number {
  return Math.ceil(level / 4) + 1;
}

export const useCharacterStore = create<CharacterState>((set, get) => ({
  character: { ...initialCharacter },
  currentStep: "race",
  completedSteps: [],
  loadedCharacterId: null,

  // Navigation
  setStep: (step) => set({ currentStep: step }),

  nextStep: () => {
    const { currentStep, completedSteps, character } = get();
    const currentIndex = WIZARD_STEPS.indexOf(currentStep);

    if (currentIndex < WIZARD_STEPS.length - 1) {
      const newCompletedSteps = completedSteps.includes(currentStep)
        ? completedSteps
        : [...completedSteps, currentStep];

      let nextIndex = currentIndex + 1;

      // Пропускаем шаг заклинаний если класс не заклинатель
      const isSpellcaster = character.class?.spellcasting !== undefined;
      if (WIZARD_STEPS[nextIndex] === "spells" && !isSpellcaster) {
        nextIndex++;
      }

      set({
        currentStep: WIZARD_STEPS[nextIndex],
        completedSteps: newCompletedSteps,
      });
    }
  },

  previousStep: () => {
    const { currentStep, character } = get();
    const currentIndex = WIZARD_STEPS.indexOf(currentStep);

    if (currentIndex > 0) {
      let prevIndex = currentIndex - 1;

      // Пропускаем шаг заклинаний если класс не заклинатель
      const isSpellcaster = character.class?.spellcasting !== undefined;
      if (WIZARD_STEPS[prevIndex] === "spells" && !isSpellcaster) {
        prevIndex--;
      }

      set({ currentStep: WIZARD_STEPS[prevIndex] });
    }
  },

  canProceed: () => {
    const { currentStep, character } = get();

    switch (currentStep) {
      case "race":
        return character.race !== null;
      case "class":
        return character.class !== null;
      case "skills":
        // Проверяем, что выбрано нужное количество навыков от класса
        if (!character.class) return false;
        const backgroundSkills = character.background?.skillProficiencies || [];
        const classSkillCount = character.skillProficiencies.filter(
          (s) => !backgroundSkills.includes(s),
        ).length;
        return classSkillCount >= character.class.skillCount;
      case "abilities":
        // Проверяем, что все значения из стандартного набора распределены
        const scores = Object.values(character.abilityScores);
        const standardArray = [15, 14, 13, 12, 10, 8];
        const sortedScores = [...scores].sort((a, b) => b - a);
        const sortedStandard = [...standardArray].sort((a, b) => b - a);
        // Проверяем, что распределены именно значения из стандартного набора
        return sortedScores.every(
          (score, idx) => score === sortedStandard[idx],
        );
      case "background":
        return character.background !== null;
      case "abilityIncrease":
        // Проверяем, что выбраны бонусы (+2 и +1 ИЛИ три раза +1)
        const increases = character.abilityScoreIncreases;
        const plus2Count = Object.values(increases).filter(
          (v) => v === 2,
        ).length;
        const plus1Count = Object.values(increases).filter(
          (v) => v === 1,
        ).length;
        // Стратегия +2/+1 или +1/+1/+1
        return (
          (plus2Count === 1 && plus1Count === 1) ||
          (plus2Count === 0 && plus1Count === 3)
        );
      case "equipment":
        // Проверяем обязательное снаряжение
        const hasGearPack = character.equipment.some(
          (e) => e.category === "gear",
        );
        const weaponCount = character.equipment.filter(
          (e) => e.category === "weapon",
        ).length;
        const armorCount = character.equipment.filter(
          (e) => e.category === "armor" && e.id !== "shield",
        ).length;

        // Проверка оружия: если класс владеет оружием, нужно минимум 1
        const hasWeaponProf =
          (character.class?.weaponProficiencies || []).length > 0;
        const needsWeapon = hasWeaponProf && weaponCount === 0;

        // Проверка доспеха: если класс владеет доспехами (кроме варвара/монаха), нужен доспех или щит
        const hasArmorProf =
          (character.class?.armorProficiencies || []).length > 0;
        const isBarbarianOrMonk =
          character.class?.id === "barbarian" || character.class?.id === "monk";
        const hasAnyArmor =
          armorCount > 0 || character.equipment.some((e) => e.id === "shield");
        const needsArmor = hasArmorProf && !isBarbarianOrMonk && !hasAnyArmor;

        return hasGearPack && !needsWeapon && !needsArmor;
      case "spells":
        return true; // Spells are optional (non-casters can skip)
      case "details":
        return character.name.trim().length > 0;
      case "summary":
        return true;
      default:
        return false;
    }
  },

  // Character Updates
  setRace: (race) =>
    set((state) => ({
      character: { ...state.character, race },
    })),

  setClass: (characterClass) =>
    set((state) => ({
      character: {
        ...state.character,
        class: characterClass,
        subclass: null, // Reset subclass when class changes
      },
    })),

  setSubclass: (subclass) =>
    set((state) => ({
      character: { ...state.character, subclass },
    })),

  setBackground: (background) =>
    set((state) => {
      const currentSkills = state.character.skillProficiencies;
      const oldBackgroundSkills = state.character.background?.skillProficiencies || [];
      
      // Удаляем навыки старой предыстории
      const skillsWithoutOldBackground = currentSkills.filter(
        (skill) => !oldBackgroundSkills.includes(skill)
      );
      
      // Добавляем навыки новой предыстории
      const newBackgroundSkills = background?.skillProficiencies || [];
      const updatedSkills = [
        ...skillsWithoutOldBackground,
        ...newBackgroundSkills,
      ];
      
      return {
        character: {
          ...state.character,
          background,
          skillProficiencies: updatedSkills,
        },
      };
    }),

  setAbilityScores: (abilityScores) =>
    set((state) => ({
      character: { ...state.character, abilityScores },
    })),

  setAbilityScore: (ability, value) =>
    set((state) => ({
      character: {
        ...state.character,
        abilityScores: {
          ...state.character.abilityScores,
          [ability]: value,
        },
      },
    })),

  setAbilityScoreMethod: (abilityScoreMethod) =>
    set((state) => ({
      character: { ...state.character, abilityScoreMethod },
    })),

  setAbilityScoreIncreases: (abilityScoreIncreases) =>
    set((state) => ({
      character: { ...state.character, abilityScoreIncreases },
    })),

  addSkillProficiency: (skill) =>
    set((state) => ({
      character: {
        ...state.character,
        skillProficiencies: state.character.skillProficiencies.includes(skill)
          ? state.character.skillProficiencies
          : [...state.character.skillProficiencies, skill],
      },
    })),

  removeSkillProficiency: (skill) =>
    set((state) => ({
      character: {
        ...state.character,
        skillProficiencies: state.character.skillProficiencies.filter(
          (s) => s !== skill,
        ),
      },
    })),

  setSkillProficiencies: (skillProficiencies) =>
    set((state) => ({
      character: { ...state.character, skillProficiencies },
    })),

  addEquipment: (item) =>
    set((state) => ({
      character: {
        ...state.character,
        equipment: [...state.character.equipment, item],
      },
    })),

  removeEquipment: (itemId) =>
    set((state) => ({
      character: {
        ...state.character,
        equipment: state.character.equipment.filter((e) => e.id !== itemId),
      },
    })),

  setEquipment: (equipment) =>
    set((state) => ({
      character: { ...state.character, equipment },
    })),

  addSpell: (spell, type) =>
    set((state) => {
      const key =
        type === "cantrip"
          ? "cantripsKnown"
          : type === "known"
            ? "spellsKnown"
            : "spellsPrepared";
      return {
        character: {
          ...state.character,
          [key]: [...state.character[key], spell],
        },
      };
    }),

  removeSpell: (spellId, type) =>
    set((state) => {
      const key =
        type === "cantrip"
          ? "cantripsKnown"
          : type === "known"
            ? "spellsKnown"
            : "spellsPrepared";
      return {
        character: {
          ...state.character,
          [key]: state.character[key].filter((s) => s.id !== spellId),
        },
      };
    }),

  setCharacterDetails: (details) =>
    set((state) => ({
      character: { ...state.character, ...details },
    })),

  setName: (name) =>
    set((state) => ({
      character: { ...state.character, name },
    })),

  setLevel: (level) =>
    set((state) => ({
      character: {
        ...state.character,
        level: Math.max(1, Math.min(20, level)),
      },
    })),

  // Computed
  getAbilityModifier: (ability) => {
    const totalScore = get().getTotalAbilityScore(ability);
    return calculateModifier(totalScore);
  },

  getTotalAbilityScore: (ability) => {
    const { character } = get();
    const baseScore = character.abilityScores[ability];
    const increase = character.abilityScoreIncreases[ability] || 0;
    return baseScore + increase;
  },

  getStats: () => {
    const { character } = get();
    const getModifier = get().getAbilityModifier;

    const proficiencyBonus = calculateProficiencyBonus(character.level);
    const dexMod = getModifier("dexterity");
    const conMod = getModifier("constitution");
    const wisMod = getModifier("wisdom");

    // Calculate armor class (base 10 + DEX modifier)
    const armorClass = 10 + dexMod;

    // Calculate hit points (hit die + CON modifier at level 1)
    const hitDie = character.class?.hitDie || 8;
    const hitPointMaximum =
      hitDie +
      conMod +
      (character.level - 1) * (Math.floor(hitDie / 2) + 1 + conMod);

    // Speed from race
    const speed = character.race?.speed || 30;

    // Passive perception
    const passivePerception =
      10 +
      wisMod +
      (character.skillProficiencies.includes("perception")
        ? proficiencyBonus
        : 0);

    // Ability modifiers
    const abilityModifiers: AbilityScores = {
      strength: getModifier("strength"),
      dexterity: dexMod,
      constitution: conMod,
      intelligence: getModifier("intelligence"),
      wisdom: wisMod,
      charisma: getModifier("charisma"),
    };

    // Saving throws
    const savingThrowProficiencies = character.class?.savingThrows || [];
    const savingThrows: Record<AbilityName, number> = {
      strength:
        abilityModifiers.strength +
        (savingThrowProficiencies.includes("strength") ? proficiencyBonus : 0),
      dexterity:
        abilityModifiers.dexterity +
        (savingThrowProficiencies.includes("dexterity") ? proficiencyBonus : 0),
      constitution:
        abilityModifiers.constitution +
        (savingThrowProficiencies.includes("constitution")
          ? proficiencyBonus
          : 0),
      intelligence:
        abilityModifiers.intelligence +
        (savingThrowProficiencies.includes("intelligence")
          ? proficiencyBonus
          : 0),
      wisdom:
        abilityModifiers.wisdom +
        (savingThrowProficiencies.includes("wisdom") ? proficiencyBonus : 0),
      charisma:
        abilityModifiers.charisma +
        (savingThrowProficiencies.includes("charisma") ? proficiencyBonus : 0),
    };

    // Skills (simplified - would need full skill list)
    const skills: Record<string, number> = {};
    const skillAbilityMap: Record<string, AbilityName> = {
      acrobatics: "dexterity",
      animal_handling: "wisdom",
      arcana: "intelligence",
      athletics: "strength",
      deception: "charisma",
      history: "intelligence",
      insight: "wisdom",
      intimidation: "charisma",
      investigation: "intelligence",
      medicine: "wisdom",
      nature: "intelligence",
      perception: "wisdom",
      performance: "charisma",
      persuasion: "charisma",
      religion: "intelligence",
      sleight_of_hand: "dexterity",
      stealth: "dexterity",
      survival: "wisdom",
    };

    for (const [skill, ability] of Object.entries(skillAbilityMap)) {
      const isProficient = character.skillProficiencies.includes(skill);
      const hasExpertise = character.expertiseSkills.includes(skill);
      const profBonus = isProficient
        ? hasExpertise
          ? proficiencyBonus * 2
          : proficiencyBonus
        : 0;
      skills[skill] = abilityModifiers[ability] + profBonus;
    }

    // Магические характеристики (PHB 2024)
    let spellcasting = null;

    if (character.class?.spellcasting) {
      const spellAbility = character.class.spellcasting.ability;
      const spellMod = abilityModifiers[spellAbility];
      const spellSaveDC = 8 + proficiencyBonus + spellMod;
      const spellAttackBonus = proficiencyBonus + spellMod;

      // Определяем ячейки заклинаний
      let spellSlots: SpellSlots = {
        level1: 0,
        level2: 0,
        level3: 0,
        level4: 0,
        level5: 0,
        level6: 0,
        level7: 0,
        level8: 0,
        level9: 0,
      };

      const classId = character.class.id;
      const level = character.level;

      // Полные заклинатели
      if (["bard", "cleric", "druid", "sorcerer", "wizard"].includes(classId)) {
        spellSlots = FULL_CASTER_SPELL_SLOTS[level - 1];
      }
      // Полузаклинатели
      else if (["paladin", "ranger"].includes(classId)) {
        spellSlots = HALF_CASTER_SPELL_SLOTS[level - 1];
      }
      // Колдун (особая механика)
      else if (classId === "warlock") {
        const warlockData = WARLOCK_SPELL_SLOTS[level - 1];
        // У колдуна все ячейки одного уровня
        const key = `level${warlockData.level}` as keyof SpellSlots;
        spellSlots = { ...spellSlots, [key]: warlockData.slots };
      }

      // Количество известных заговоров
      const cantripsKnownCount = CANTRIPS_KNOWN[classId]?.[level - 1] || 0;

      // Количество известных заклинаний
      let spellsKnownCount = 0;
      if (SPELLS_KNOWN[classId]) {
        spellsKnownCount = SPELLS_KNOWN[classId][level - 1];
      } else if (["cleric", "druid", "paladin"].includes(classId)) {
        // Для подготавливающих классов: модификатор + уровень (минимум 1)
        spellsKnownCount = Math.max(1, spellMod + level);
      } else if (classId === "wizard") {
        // Волшебник: 6 + 2 за уровень в книге, готовит INT + уровень
        spellsKnownCount = Math.max(1, spellMod + level);
      }

      spellcasting = {
        ability: spellAbility,
        abilityModifier: spellMod,
        spellSaveDC,
        spellAttackBonus,
        spellSlots,
        cantripsKnown: cantripsKnownCount,
        spellsKnown: spellsKnownCount,
      };
    }

    // Кошелёк с учётом предыстории
    const wallet: Wallet = { ...character.wallet };
    if (
      character.background &&
      wallet.gold === 0 &&
      wallet.silver === 0 &&
      wallet.copper === 0
    ) {
      wallet.gold = BACKGROUND_STARTING_GOLD[character.background.id] || 15;
    }

    return {
      proficiencyBonus,
      armorClass,
      initiative: dexMod,
      speed,
      hitPointMaximum,
      hitDice: `${character.level}d${hitDie}`,
      passivePerception,
      abilityModifiers,
      savingThrows,
      skills,
      spellcasting,
      wallet,
    };
  },

  // Reset
  resetCharacter: () =>
    set({
      character: { ...initialCharacter },
      currentStep: "race",
      completedSteps: [],
      loadedCharacterId: null,
    }),

  resetStep: (step) => {
    const state = get();

    switch (step) {
      case "race":
        set({ character: { ...state.character, race: null } });
        break;
      case "class":
        set({ character: { ...state.character, class: null, subclass: null } });
        break;
      case "abilities":
        set({
          character: {
            ...state.character,
            abilityScores: { ...initialAbilityScores },
            abilityScoreIncreases: {},
          },
        });
        break;
      case "background":
        set({ character: { ...state.character, background: null } });
        break;
      case "equipment":
        set({
          character: {
            ...state.character,
            equipment: [],
            wallet: { ...initialWallet },
          },
        });
        break;
      case "details":
        set({
          character: {
            ...state.character,
            name: "",
            alignment: "",
            personalityTraits: "",
            ideals: "",
            bonds: "",
            flaws: "",
            backstory: "",
            appearance: "",
          },
        });
        break;
    }
  },

  // Save/Load
  getCharacterData: () => {
    return get().character;
  },

  loadCharacter: (data: Character, characterId?: string) => {
    console.log("loadCharacter called with:", data);
    console.log("Race data:", data?.race);
    console.log("Class data:", data?.class);
    console.log("Background data:", data?.background);
    console.log("Data keys:", Object.keys(data || {}));

    // Проверяем что data не null/undefined
    if (!data) {
      console.error("loadCharacter: data is null or undefined");
      return;
    }

    set({
      character: { ...data },
      currentStep: "summary",
      loadedCharacterId: characterId || null,
      completedSteps: [
        "race",
        "class",
        "skills",
        "abilities",
        "background",
        "abilityIncrease",
        "equipment",
        "spells",
        "details",
      ],
    });

    // Проверяем что сохранилось
    const newState = get();
    console.log("After set - character.race:", newState.character.race);
    console.log("After set - character.class:", newState.character.class);
  },
}));
