// Equipment and Spellcasting types for backend

export interface StartingEquipment {
  equipment: EquipmentItem[];
  gold: number;
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
}

export interface SpellcastingConfig {
  ability: string;
  cantripsKnown: number[];
  spellsKnown?: number[];
  spellSlots: number[][];
}
