
export const ABILITY_TRANSLATIONS: Record<string, string> = {
  "strength": "Сила",
  "dexterity": "Ловкость",
  "constitution": "Телосложение",
  "intelligence": "Интеллект",
  "wisdom": "Мудрость",
  "charisma": "Харизма"
};

export const SKILL_TRANSLATIONS: Record<string, string> = {
  "acrobatics": "Акробатика",
  "animal_handling": "Уход за животными",
  "arcana": "Магия",
  "athletics": "Атлетика",
  "deception": "Обман",
  "history": "История",
  "insight": "Проницательность",
  "intimidation": "Запугивание",
  "investigation": "Расследование",
  "medicine": "Медицина",
  "nature": "Природа",
  "perception": "Восприятие",
  "performance": "Выступление",
  "persuasion": "Убеждение",
  "religion": "Религия",
  "sleight_of_hand": "Ловкость рук",
  "stealth": "Скрытность",
  "survival": "Выживание"
};

export function translateAbility(ability: string): string {
  return ABILITY_TRANSLATIONS[ability.toLowerCase()] || ability;
}

export function translateSkill(skill: string): string {
  return SKILL_TRANSLATIONS[skill.toLowerCase()] || skill;
}

export function translateSavingThrows(saves: string[]): string {
  return saves.map(translateAbility).join(", ");
}
