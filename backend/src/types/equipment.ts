// Equipment and Spellcasting types for backend

export interface StartingEquipment {
  equipment: EquipmentItem[];
  gold: number;
  // Index signature for Prisma JSON compatibility
  [key: string]: any;
}

export interface EquipmentItem {
  externalId: string;
  name: string;
  nameRu: string;
  category: 'weapon' | 'armor' | 'gear' | 'tool' | 'pack';
  cost: {
    quantity: number;
    unit: string;
  };
  weight?: number;
  source: string;
  damage?: {
    dice: string;
    type: string;
  };
  armorClass?: number;
  armorType?: 'light' | 'medium' | 'heavy' | 'shield';
  maxDexBonus?: number;
  properties?: string[];
  // Index signature for Prisma JSON compatibility
  [key: string]: any;
}

export interface SpellcastingConfig {
  ability: string;
  cantripsKnown: number[];
  spellsKnown?: number[];
  spellSlots: number[][];
  // Index signature for Prisma JSON compatibility
  [key: string]: any;
}
