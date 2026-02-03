// Equipment Types for D&D Character Generator

/**
 * Base equipment item properties
 */
export interface EquipmentItemBase {
  id?: string;
  externalId: string;
  name: string;
  nameRu: string;
  category: "weapon" | "armor" | "gear" | "tool" | "pack";
  cost: {
    quantity: number;
    unit: string;
  };
  weight?: number;
  source: string;
}

/**
 * Weapon item with combat properties
 */
export interface WeaponItem extends EquipmentItemBase {
  category: "weapon";
  damage: {
    dice: string;
    type: string;
  };
  properties?: string[];
}

/**
 * Armor item with AC properties
 */
export interface ArmorItem extends EquipmentItemBase {
  category: "armor";
  armorClass: number;
  armorType: "light" | "medium" | "heavy" | "shield";
  maxDexBonus?: number;
}

/**
 * Gear, tools, and packs
 */
export interface GearItem extends EquipmentItemBase {
  category: "gear" | "tool" | "pack";
}

/**
 * Union type for all equipment items
 */
export type EquipmentItem = WeaponItem | ArmorItem | GearItem;

/**
 * Starting equipment for a class
 */
export interface StartingEquipment {
  equipment: EquipmentItem[];
  gold: number;
}

/**
 * Type guards for equipment
 */
export function isWeapon(item: EquipmentItem): item is WeaponItem {
  return item.category === "weapon";
}

export function isArmor(item: EquipmentItem): item is ArmorItem {
  return item.category === "armor";
}

export function isGear(item: EquipmentItem): item is GearItem {
  return (
    item.category === "gear" ||
    item.category === "tool" ||
    item.category === "pack"
  );
}
