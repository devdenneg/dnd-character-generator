// Constants for Classes management

import type { ElementType } from "react";
import {
  Shield,
  Zap,
  Crown,
  Flame,
  Mountain,
  Scroll,
} from "lucide-react";

export const CLASS_ICONS: Record<string, ElementType> = {
  barbarian: Flame,
  bard: Crown,
  cleric: Shield,
  druid: Mountain,
  fighter: Shield,
  monk: Zap,
  paladin: Crown,
  ranger: Mountain,
  rogue: Zap,
  sorcerer: Flame,
  warlock: Flame,
  wizard: Scroll,
};

export const HIT_DIE_OPTIONS = [
  { value: "6", label: "d6" },
  { value: "8", label: "d8" },
  { value: "10", label: "d10" },
  { value: "12", label: "d12" },
];

export const ABILITY_OPTIONS = [
  { value: "strength", label: "Strength (Сила)" },
  { value: "dexterity", label: "Dexterity (Ловкость)" },
  { value: "constitution", label: "Constitution (Телосложение)" },
  { value: "intelligence", label: "Intelligence (Интеллект)" },
  { value: "wisdom", label: "Wisdom (Мудрость)" },
  { value: "charisma", label: "Charisma (Харизма)" },
];

export const ARMOR_PROFICIENCY_OPTIONS = [
  { value: "Лёгкие доспехи", label: "Лёгкие доспехи" },
  { value: "Средние доспехи", label: "Средние доспехи" },
  { value: "Тяжёлые доспехи", label: "Тяжёлые доспехи" },
  { value: "Щиты", label: "Щиты" },
];

export const WEAPON_PROFICIENCY_OPTIONS = [
  { value: "Простое оружие", label: "Простое оружие" },
  { value: "Воинское оружие", label: "Воинское оружие" },
];

export const SKILL_OPTIONS = [
  { value: "acrobatics", label: "Акробатика (Acrobatics)" },
  { value: "animal_handling", label: "Уход за животными (Animal Handling)" },
  { value: "arcana", label: "Магия (Arcana)" },
  { value: "athletics", label: "Атлетика (Athletics)" },
  { value: "deception", label: "Обман (Deception)" },
  { value: "history", label: "История (History)" },
  { value: "insight", label: "Проницательность (Insight)" },
  { value: "intimidation", label: "Запугивание (Intimidation)" },
  { value: "investigation", label: "Расследование (Investigation)" },
  { value: "medicine", label: "Медицина (Medicine)" },
  { value: "nature", label: "Природа (Nature)" },
  { value: "perception", label: "Восприятие (Perception)" },
  { value: "performance", label: "Исполнение (Performance)" },
  { value: "persuasion", label: "Убеждение (Persuasion)" },
  { value: "religion", label: "Религия (Religion)" },
  { value: "sleight_of_hand", label: "Ловкость рук (Sleight of Hand)" },
  { value: "stealth", label: "Скрытность (Stealth)" },
  { value: "survival", label: "Выживание (Survival)" },
];

export const SOURCE_OPTIONS = [
  { value: "srd", label: "SRD" },
  { value: "phb2024", label: "PHB 2024" },
];

export const EQUIPMENT_CATEGORY_OPTIONS = [
  { value: "weapon", label: "Оружие" },
  { value: "armor", label: "Доспехи" },
  { value: "gear", label: "Снаряжение" },
  { value: "tool", label: "Инструменты" },
  { value: "pack", label: "Набор" },
];

export const ARMOR_TYPE_OPTIONS = [
  { value: "light", label: "Лёгкие" },
  { value: "medium", label: "Средние" },
  { value: "heavy", label: "Тяжёлые" },
  { value: "shield", label: "Щит" },
];

export const DAMAGE_TYPE_OPTIONS = [
  { value: "bludgeoning", label: "Дробящий" },
  { value: "piercing", label: "Колющий" },
  { value: "slashing", label: "Рубящий" },
  { value: "acid", label: "Кислота" },
  { value: "cold", label: "Холод" },
  { value: "fire", label: "Огонь" },
  { value: "force", label: "Силовое поле" },
  { value: "lightning", label: "Электричество" },
  { value: "necrotic", label: "Некротический" },
  { value: "poison", label: "Яд" },
  { value: "psychic", label: "Психический" },
  { value: "radiant", label: "Излучение" },
  { value: "thunder", label: "Звук" },
];
