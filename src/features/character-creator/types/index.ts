export type AbilityKey =
  | "strength"
  | "dexterity"
  | "constitution"
  | "intelligence"
  | "wisdom"
  | "charisma";

export type AbilityMethod = "standard" | "pointbuy" | "roll";

export interface AbilityScores {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}

export interface Wallet {
  copper: number;
  silver: number;
  electrum: number;
  gold: number;
  platinum: number;
}

export interface CharacterDetails {
  name: string;
  alignment: string;
  personalityTraits: string;
  ideals: string;
  bonds: string;
  flaws: string;
  backstory: string;
  age: string;
  height: string;
  weight: string;
  eyes: string;
  skin: string;
  hair: string;
}

export interface EquipmentSelection {
  id: string;
  quantity: number;
}

export type CreatorStep =
  | "origin"
  | "class"
  | "abilities"
  | "equipment"
  | "spells"
  | "details"
  | "review";

export interface RaceOption {
  id: string;
  externalId: string;
  name: string;
  nameRu: string;
  speed: string;
  size: string;
}

export interface BackgroundEquipmentItem {
  id: string;
  externalId: string;
  name: string;
  nameRu: string;
  quantity?: number;
  category?: string;
}

export interface BackgroundOption {
  id: string;
  externalId: string;
  name: string;
  nameRu: string;
  skillProficiencies: string[];
  toolProficiencies?: string[];
  languages?: number;
  equipment?: BackgroundEquipmentItem[];
  originFeat: string;
  abilityScoreIncrease: {
    options: string[];
    amount: number[];
  };
}

export interface SpellcastingConfig {
  ability?: string;
  cantripsKnown?: number[];
  spellsKnown?: number[];
  spellSlots?: number[][];
}

export interface ClassOption {
  id: string;
  externalId: string;
  name: string;
  nameRu: string;
  hitDie?: number;
  primaryAbility?: string[];
  savingThrows?: string[];
  skillChoices: string[];
  skillCount: number;
  startingGold: number;
  startingEquipment?: unknown;
  spellcasting?: SpellcastingConfig;
}

export interface SpellOption {
  id: string;
  externalId: string;
  name: string;
  nameRu: string;
  level: number;
  classes: string[];
}

export interface EquipmentOption {
  id: string;
  externalId: string;
  name: string;
  nameRu: string;
  category: string;
  weight?: number;
  cost: {
    quantity: number;
    unit: string;
  };
  damage?: {
    dice: string;
    type: string;
  };
  armorClass?: number;
  armorType?: string;
  maxDexBonus?: number;
  properties?: string[];
}

export interface DerivedSkill {
  id: string;
  sources: string[];
}

export interface SkillConflict {
  id: string;
  sources: string[];
}

export interface DerivedEquipmentItem {
  id: string;
  quantity: number;
  sources: string[];
}
