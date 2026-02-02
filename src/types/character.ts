// D&D 5e (2024) Character Types

export interface AbilityScores {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}

export type AbilityName = keyof AbilityScores;

export interface Race {
  id: string;
  externalId: string;
  name: string;
  nameRu: string;
  description: string;
  speed: number;
  size: "Small" | "Medium" | "Large";
  traits: RaceTrait[];
  source: "srd" | "phb2024";
}

export interface RaceTrait {
  name: string;
  nameRu: string;
  description: string;
}

export interface ClassFeature {
  name: string;
  nameRu: string;
  description: string;
  level: number;
}

export interface Subclass {
  id: string;
  name: string;
  nameRu: string;
  description: string;
  features: ClassFeature[];
}

export interface CharacterClass {
  id: string;
  externalId: string;
  name: string;
  nameRu: string;
  description: string;
  hitDie: number;
  primaryAbility: AbilityName[];
  savingThrows: AbilityName[];
  armorProficiencies: string[];
  weaponProficiencies: string[];
  skillChoices: string[];
  skillCount: number;
  features: ClassFeature[];
  subclasses: Subclass[];
  subclassLevel: number;
  startingEquipment?: StartingEquipment; // Стартовое снаряжение с золотом
  spellcasting?: {
    ability: AbilityName;
    cantripsKnown: number[];
    spellsKnown?: number[];
    spellSlots: number[][];
  };
  source: "srd" | "phb2024";
}

export interface Background {
  id: string;
  name: string;
  nameRu: string;
  description: string;
  skillProficiencies: string[];
  toolProficiencies: string[];
  languages: number;
  equipment: string[];
  startingGold?: number; // Сумма золотых монет от предыстории
  originFeat?: string;
  abilityScoreIncrease: {
    options: AbilityName[];
    amount: [number, number, number]; // +2, +1, +1 or +1, +1, +1
  };
  source: "srd" | "phb2024";
}

export interface Equipment {
  id: string;
  name: string;
  nameRu: string;
  category: "weapon" | "armor" | "gear" | "tool" | "pack";
  cost: { quantity: number; unit: string };
  weight: number;
  description?: string;
  damage?: { dice: string; type: string };
  armorClass?: number;
  armorType?: "light" | "medium" | "heavy" | "shield"; // Тип доспеха
  maxDexBonus?: number; // Максимальный бонус Ловкости (для средних и тяжёлых доспехов)
  properties?: string[];
  source?: "class" | "background"; // Источник снаряжения
}

// Интерфейс для стартового снаряжения класса
export interface StartingEquipment {
  equipment: Equipment[];
  gold: number;
}

export interface Spell {
  id: string;
  name: string;
  nameRu: string;
  level: number;
  school: string;
  castingTime: string;
  range: string;
  components: string;
  duration: string;
  description: string;
  classes: string[];
}

export interface Character {
  // Basic Info
  name: string;
  level: number;
  experience: number;

  // Core Choices
  race: Race | null;
  class: CharacterClass | null;
  subclass: Subclass | null;
  background: Background | null;

  // Ability Scores
  abilityScores: AbilityScores;
  abilityScoreMethod: "standard" | "pointbuy" | "roll";
  abilityScoreIncreases: Partial<AbilityScores>;

  // Skills & Proficiencies
  skillProficiencies: string[];
  expertiseSkills: string[]; // Навыки с удвоенным бонусом мастерства (от класса, например Плут/Бард)
  toolProficiencies: string[];
  languages: string[];

  // Equipment
  equipment: Equipment[];

  // Кошелёк (PHB 2024)
  wallet: Wallet;

  // Spells (if applicable)
  cantripsKnown: Spell[];
  spellsKnown: Spell[];
  spellsPrepared: Spell[];

  // Character Details
  alignment: string;
  personalityTraits: string;
  ideals: string;
  bonds: string;
  flaws: string;
  backstory: string;
  appearance: string;
  age: string;
  height: string;
  weight: string;
  eyes: string;
  skin: string;
  hair: string;
}

// Кошелёк (PHB 2024)
export interface Wallet {
  copper: number; // Медные монеты (cp)
  silver: number; // Серебряные монеты (sp)
  electrum: number; // Электрумовые монеты (ep)
  gold: number; // Золотые монеты (gp)
  platinum: number; // Платиновые монеты (pp)
}

// Ячейки заклинаний
export interface SpellSlots {
  level1: number;
  level2: number;
  level3: number;
  level4: number;
  level5: number;
  level6: number;
  level7: number;
  level8: number;
  level9: number;
}

// Магические характеристики
export interface SpellcastingStats {
  ability: AbilityName | null; // Базовая характеристика (INT/WIS/CHA)
  abilityModifier: number; // Модификатор характеристики
  spellSaveDC: number; // Сложность спасброска = 8 + мастерство + мод
  spellAttackBonus: number; // Бонус атаки заклинанием = мастерство + мод
  spellSlots: SpellSlots; // Ячейки заклинаний по уровням
  cantripsKnown: number; // Количество известных заговоров
  spellsKnown: number; // Количество известных заклинаний
}

// Computed values
export interface CharacterStats {
  proficiencyBonus: number;
  armorClass: number;
  initiative: number;
  speed: number;
  hitPointMaximum: number;
  hitDice: string;
  passivePerception: number;
  abilityModifiers: AbilityScores;
  savingThrows: Record<AbilityName, number>;
  skills: Record<string, number>;
  spellcasting: SpellcastingStats | null; // Магические характеристики
  wallet: Wallet; // Кошелёк
}

// API Response types
export interface ApiReference {
  index: string;
  name: string;
  url: string;
}

export interface ApiListResponse {
  count: number;
  results: ApiReference[];
}
