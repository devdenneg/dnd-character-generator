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
import {
  calculateModifier,
  calculateProficiencyBonus,
  calculateHitPoints,
  calculateSpellSaveDC,
  calculateSpellAttackBonus,
  calculateInitiative,
  calculatePassivePerception,
} from "@/utils/calculations";
import {
  calculateArmorClass,
  getEquippedArmor,
  hasShieldEquipped,
} from "@/utils/armorClass";
import {
  validateRaceSelection,
  validateClassSelection,
  validateSkillSelection,
  validateAbilityScores,
} from "@/utils/validation";
import {
  FULL_CASTER_SPELL_SLOTS,
  HALF_CASTER_SPELL_SLOTS,
  WARLOCK_SPELL_SLOTS,
  CANTRIPS_KNOWN,
  SPELLS_KNOWN,
} from "@/constants/dnd";

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
  setWallet: (wallet: Wallet) => void;
  addSpell: (spell: Spell, type: "cantrip" | "known" | "prepared") => void;
  removeSpell: (
    spellId: string,
    type: "cantrip" | "known" | "prepared"
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
        return validateRaceSelection(character.race);
      case "class":
        return validateClassSelection(character.class);
      case "skills":
        // Проверяем, что выбрано нужное количество навыков от класса
        if (!character.class) return false;
        const backgroundSkills = character.background?.skillProficiencies || [];
        return validateSkillSelection(
          character.skillProficiencies,
          character.class.skillCount,
          backgroundSkills
        );
      case "abilities":
        // Проверяем, что все значения из стандартного набора распределены
        return validateAbilityScores(
          character.abilityScores,
          character.abilityScoreMethod
        );
      case "background":
        return character.background !== null;
      case "abilityIncrease":
        // Проверяем, что выбраны бонусы (+2 и +1 ИЛИ три раза +1)
        const increases = character.abilityScoreIncreases;
        const plus2Count = Object.values(increases).filter(
          (v) => v === 2
        ).length;
        const plus1Count = Object.values(increases).filter(
          (v) => v === 1
        ).length;
        // Стратегия +2/+1 или +1/+1/+1
        return (
          (plus2Count === 1 && plus1Count === 1) ||
          (plus2Count === 0 && plus1Count === 3)
        );
      case "equipment":
        // Снаряжение автоматически предоставляется, проверка не требуется
        return true;
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
      const currentSkills = state.character.skillProficiencies || [];
      const oldBackgroundSkills =
        state.character.background?.skillProficiencies || [];

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
          (s) => s !== skill
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

  setWallet: (wallet) =>
    set((state) => ({
      character: { ...state.character, wallet },
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

    // Calculate armor class using utility
    const equippedArmor = getEquippedArmor(character.equipment);
    const hasShield = hasShieldEquipped(character.equipment);
    const armorClass = calculateArmorClass(
      10,
      dexMod,
      equippedArmor,
      hasShield
    );

    // Calculate hit points using utility
    const hitDie = character.class?.hitDie || 8;
    const hitPointMaximum = calculateHitPoints(character.level, hitDie, conMod);

    // Speed from race
    const speed = character.race?.speed || 30;

    // Passive perception using utility
    const isProficientPerception =
      character.skillProficiencies.includes("perception");
    const passivePerception = calculatePassivePerception(
      wisMod,
      proficiencyBonus,
      isProficientPerception
    );

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
      const isProficient =
        character.skillProficiencies?.includes(skill) || false;
      const hasExpertise = character.expertiseSkills?.includes(skill) || false;
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
      const spellSaveDC = calculateSpellSaveDC(proficiencyBonus, spellMod);
      const spellAttackBonus = calculateSpellAttackBonus(
        proficiencyBonus,
        spellMod
      );

      spellcasting = {
        ability: spellAbility,
        abilityModifier: spellMod,
        spellSaveDC,
        spellAttackBonus,
        spellSlots: character.class.spellcasting.spellSlots ?? [[0]],
        cantripsKnown: character.class.spellcasting.cantripsKnown[0] ?? 0,
        spellsKnown: character.class.spellcasting.spellsKnown?.[0] ?? 0,
      };
    }

    // Кошелёк
    const wallet: Wallet = { ...character.wallet };

    return {
      proficiencyBonus,
      armorClass,
      initiative: calculateInitiative(dexMod),
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
    // Проверяем что data не null/undefined
    if (!data) {
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
  },
}));
