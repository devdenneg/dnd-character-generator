// Backend types matching frontend CharacterData structure

export interface CharacterData {
  // Core Choices
  race: any | null; // TODO: Create proper Race type
  class: any | null; // TODO: Create proper CharacterClass type
  subclass: any | null;
  background: any | null;

  // Ability Scores
  abilityScores: {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
  };
  abilityScoreMethod: "standard" | "pointbuy" | "roll";
  abilityScoreIncreases: Partial<{
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
  }>;

  // Skills & Proficiencies
  skillProficiencies: string[];
  expertiseSkills: string[];
  toolProficiencies: string[];
  languages: string[];

  // Equipment
  equipment: any[]; // TODO: Create proper Equipment type
  wallet: {
    copper: number;
    silver: number;
    electrum: number;
    gold: number;
    platinum: number;
  };

  // Spells
  cantripsKnown: any[];
  spellsKnown: any[];
  spellsPrepared: any[];

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

  // Index signature for Prisma JSON compatibility
  [key: string]: any;
}

export interface CreateCharacterInput {
  name: string;
  data: CharacterData;
}

export interface UpdateCharacterInput {
  name?: string;
  data?: CharacterData;
}
