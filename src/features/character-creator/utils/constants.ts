import type { AbilityKey, AbilityScores, CreatorStep } from "../types";

export const CREATOR_STEPS: Array<{ key: CreatorStep; title: string; description: string }> = [
  { key: "origin", title: "Происхождение", description: "Раса и предыстория" },
  { key: "class", title: "Класс", description: "Класс, навыки и источники" },
  { key: "abilities", title: "Характеристики", description: "База и модификаторы" },
  { key: "equipment", title: "Снаряжение", description: "Стартовый инвентарь" },
  { key: "spells", title: "Заклинания", description: "Кантрипы и заклинания" },
  { key: "details", title: "Детали", description: "Имя и история" },
  { key: "review", title: "Лист", description: "Полная карточка персонажа" },
];

export const ABILITY_LABELS: Record<AbilityKey, string> = {
  strength: "Сила",
  dexterity: "Ловкость",
  constitution: "Телосложение",
  intelligence: "Интеллект",
  wisdom: "Мудрость",
  charisma: "Харизма",
};

export const ABILITY_ORDER: AbilityKey[] = [
  "strength",
  "dexterity",
  "constitution",
  "intelligence",
  "wisdom",
  "charisma",
];

export const STANDARD_ARRAY = [15, 14, 13, 12, 10, 8];

export const EMPTY_ABILITY_SCORES: AbilityScores = {
  strength: 10,
  dexterity: 10,
  constitution: 10,
  intelligence: 10,
  wisdom: 10,
  charisma: 10,
};

export const ALL_SKILLS = [
  "acrobatics",
  "animal_handling",
  "arcana",
  "athletics",
  "deception",
  "history",
  "insight",
  "intimidation",
  "investigation",
  "medicine",
  "nature",
  "perception",
  "performance",
  "persuasion",
  "religion",
  "sleight_of_hand",
  "stealth",
  "survival",
];

export const SKILL_TO_ABILITY: Record<string, AbilityKey> = {
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
