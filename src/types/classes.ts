// Types for Classes management

import type { AbilityName } from './character';

export interface ClassFeature {
  id: string;
  name: string;
  nameRu: string;
  description: string;
  level: number;
}

export interface SubclassFeature {
  id: string;
  name: string;
  nameRu: string;
  description: string;
  level: number;
}

export interface Subclass {
  id: string;
  externalId: string;
  name: string;
  nameRu: string;
  description: string;
  source: string;
  features: SubclassFeature[];
}

export interface EquipmentItemBase {
  externalId: string;
  name: string;
  nameRu: string;
  category: "weapon" | "armor" | "gear" | "tool" | "pack";
  cost: { quantity: number; unit: string };
  weight?: number;
  source: string;
}

export interface WeaponItem extends EquipmentItemBase {
  category: "weapon";
  damage: { dice: string; type: string };
  properties?: string[];
}

export interface ArmorItem extends EquipmentItemBase {
  category: "armor";
  armorClass: number;
  armorType: "light" | "medium" | "heavy" | "shield";
  maxDexBonus?: number;
}

export interface GearItem extends EquipmentItemBase {
  category: "gear" | "tool" | "pack";
}

export type EquipmentItem = WeaponItem | ArmorItem | GearItem;

export interface StartingEquipment {
  equipment: EquipmentItem[];
  gold: number;
}

export interface Spellcasting {
  ability: AbilityName;
  cantripsKnown: number[];
  spellsKnown?: number[];
  spellSlots: number[][];
}

export interface CharacterClass {
  id: string;
  externalId: string;
  name: string;
  nameRu: string;
  description: string;
  hitDie: number;
  primaryAbility: string[];
  savingThrows: string[];
  armorProficiencies: string[];
  weaponProficiencies: string[];
  skillChoices: string[];
  skillCount: number;
  subclassLevel: number;
  source: string;
  features: ClassFeature[];
  subclasses: Subclass[];
  startingEquipment?: StartingEquipment;
  spellcasting?: Spellcasting;
}

export interface ClassFormData {
  externalId: string;
  name: string;
  nameRu: string;
  description: string;
  hitDie: number;
  primaryAbility: string[];
  savingThrows: string[];
  armorProficiencies: string[];
  weaponProficiencies: string[];
  skillChoices: string[];
  skillCount: number;
  subclassLevel: number;
  source: string;
  features: ClassFeature[];
  subclasses: Subclass[];
  startingEquipment?: StartingEquipment;
  spellcasting?: Spellcasting;
}
