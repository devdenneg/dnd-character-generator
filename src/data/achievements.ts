// D&D Achievements System

export interface Achievement {
  id: string;
  name: string;
  description: string;
  category: AchievementCategory;
  experience: number;
  icon: string;
}

export type AchievementCategory =
  | "combat"
  | "exploration"
  | "social"
  | "magic"
  | "survival"
  | "roleplay"
  | "puzzle"
  | "milestone"
  | "special";

export const ACHIEVEMENTS: Achievement[] = [
  // === БОЕВЫЕ ДОСТИЖЕНИЯ (Combat) === 15-100 XP
  {
    id: "first_blood",
    name: "Первая кровь",
    description: "Убейте своего первого противника",
    category: "combat",
    experience: 15,
    icon: "⚔️",
  },
  {
    id: "crit_master",
    name: "Мастер критов",
    description: "Нанесите критический удар",
    category: "combat",
    experience: 25,
    icon: "💥",
  },
  {
    id: "dragon_slayer",
    name: "Драконобой",
    description: "Победите дракона",
    category: "combat",
    experience: 100,
    icon: "🐉",
  },
  {
    id: "undead_hunter",
    name: "Охотник на нежить",
    description: "Уничтожьте 10 существ нежити",
    category: "combat",
    experience: 50,
    icon: "🧟",
  },
  {
    id: "giant_killer",
    name: "Гигантоубийца",
    description: "Победите великана",
    category: "combat",
    experience: 75,
    icon: "🗿",
  },
  {
    id: "demon_slayer",
    name: "Убийца демонов",
    description: "Изгоните или убейте демона",
    category: "combat",
    experience: 80,
    icon: "👹",
  },
  {
    id: "beast_master",
    name: "Укротитель зверей",
    description: "Победите 5 диких зверей",
    category: "combat",
    experience: 30,
    icon: "🦁",
  },
  {
    id: "tactical_genius",
    name: "Тактический гений",
    description: "Победите врага без получения урона",
    category: "combat",
    experience: 50,
    icon: "🧠",
  },
  {
    id: "last_stand",
    name: "Последний рубеж",
    description: "Выживите в бою с 1 HP",
    category: "combat",
    experience: 40,
    icon: "🛡️",
  },
  {
    id: "group_fighter",
    name: "Командный боец",
    description: "Победите врага вместе с 3+ союзниками",
    category: "combat",
    experience: 35,
    icon: "👥",
  },
  {
    id: "boss_killer",
    name: "Убийца боссов",
    description: "Победите мощного босса",
    category: "combat",
    experience: 90,
    icon: "👑",
  },
  {
    id: "elemental_master",
    name: "Повелитель стихий",
    description: "Победите элементаля",
    category: "combat",
    experience: 60,
    icon: "🌪️",
  },

  // === ИССЛЕДОВАНИЕ (Exploration) === 10-80 XP
  {
    id: "first_steps",
    name: "Первые шаги",
    description: "Завершите первую локацию",
    category: "exploration",
    experience: 10,
    icon: "👣",
  },
  {
    id: "dungeon_crawler",
    name: "Исследователь подземелий",
    description: "Исследуйте первое подземелье",
    category: "exploration",
    experience: 40,
    icon: "🏰",
  },
  {
    id: "treasure_hunter",
    name: "Охотник за сокровищами",
    description: "Найдите тайник с сокровищами",
    category: "exploration",
    experience: 30,
    icon: "💎",
  },
  {
    id: "trap_finder",
    name: "Искатель ловушек",
    description: "Обнаружьте и обезвредьте ловушку",
    category: "exploration",
    experience: 25,
    icon: "🔍",
  },
  {
    id: "secret_finder",
    name: "Искатель секретов",
    description: "Найдите тайную комнату или проход",
    category: "exploration",
    experience: 35,
    icon: "🚪",
  },
  {
    id: "cartographer",
    name: "Картограф",
    description: "Исследуйте 5 различных локаций",
    category: "exploration",
    experience: 45,
    icon: "🗺️",
  },
  {
    id: "mountain_climber",
    name: "Покоритель вершин",
    description: "Заберитесь на высокую гору",
    category: "exploration",
    experience: 30,
    icon: "⛰️",
  },
  {
    id: "deep_diver",
    name: "Глубоководный исследователь",
    description: "Исследуйте подводную локацию",
    category: "exploration",
    experience: 40,
    icon: "🌊",
  },
  {
    id: "ruins_explorer",
    name: "Исследователь руин",
    description: "Исследуйте древние руины",
    category: "exploration",
    experience: 35,
    icon: "🏛️",
  },
  {
    id: "cave_explorer",
    name: "Спелеолог",
    description: "Исследуйте пещеру полностью",
    category: "exploration",
    experience: 25,
    icon: "🕳️",
  },
  {
    id: "forest_wanderer",
    name: "Лесной странник",
    description: "Пройдите через дремучий лес",
    category: "exploration",
    experience: 20,
    icon: "🌲",
  },
  {
    id: "desert_survivor",
    name: "Выживший в пустыне",
    description: "Пересеките пустыню",
    category: "exploration",
    experience: 30,
    icon: "🏜️",
  },

  // === СОЦИАЛЬНЫЕ (Social) === 15-70 XP
  {
    id: "smooth_talker",
    name: "Сладкоречивый",
    description: "Успешно убедите NPC в переговорах",
    category: "social",
    experience: 20,
    icon: "💬",
  },
  {
    id: "peacemaker",
    name: "Миротворец",
    description: "Разрешите конфликт без боя",
    category: "social",
    experience: 40,
    icon: "🕊️",
  },
  {
    id: "information_broker",
    name: "Информационный брокер",
    description: "Получите важную информацию у NPC",
    category: "social",
    experience: 25,
    icon: "📜",
  },
  {
    id: "intimidator",
    name: "Запугиватель",
    description: "Успешно запугайте противника",
    category: "social",
    experience: 30,
    icon: "😠",
  },
  {
    id: "charmer",
    name: "Очарователь",
    description: "Очаруйте NPC своей харизмой",
    category: "social",
    experience: 25,
    icon: "😍",
  },
  {
    id: "alliance_maker",
    name: "Создатель альянсов",
    description: "Заключите союз с фракцией",
    category: "social",
    experience: 50,
    icon: "🤝",
  },
  {
    id: "liar",
    name: "Мастер обмана",
    description: "Успешно обманите важного NPC",
    category: "social",
    experience: 35,
    icon: "🎭",
  },
  {
    id: "merchant",
    name: "Торговец",
    description: "Заключите выгодную сделку",
    category: "social",
    experience: 20,
    icon: "💰",
  },
  {
    id: "celebrity",
    name: "Знаменитость",
    description: "Станьте известным в городе",
    category: "social",
    experience: 60,
    icon: "⭐",
  },
  {
    id: "noble_friend",
    name: "Друг знати",
    description: "Получите расположение дворянина",
    category: "social",
    experience: 45,
    icon: "👑",
  },

  // === МАГИЯ (Magic) === 20-100 XP
  {
    id: "first_spell",
    name: "Первое заклинание",
    description: "Сотворите своё первое заклинание",
    category: "magic",
    experience: 20,
    icon: "✨",
  },
  {
    id: "spell_master",
    name: "Мастер заклинаний",
    description: "Выучите 10 заклинаний",
    category: "magic",
    experience: 50,
    icon: "📚",
  },
  {
    id: "ritual_caster",
    name: "Ритуальный заклинатель",
    description: "Проведите магический ритуал",
    category: "magic",
    experience: 40,
    icon: "🔮",
  },
  {
    id: "counter_spell",
    name: "Контрзаклинатель",
    description: "Успешно контрите вражеское заклинание",
    category: "magic",
    experience: 45,
    icon: "🚫",
  },
  {
    id: "scroll_user",
    name: "Использователь свитков",
    description: "Используйте магический свиток",
    category: "magic",
    experience: 25,
    icon: "📜",
  },
  {
    id: "potion_brewer",
    name: "Зельевар",
    description: "Создайте магическое зелье",
    category: "magic",
    experience: 35,
    icon: "🧪",
  },
  {
    id: "summoner",
    name: "Призыватель",
    description: "Призовите существо",
    category: "magic",
    experience: 50,
    icon: "👻",
  },
  {
    id: "enchanter",
    name: "Зачаровыватель",
    description: "Зачаруйте предмет",
    category: "magic",
    experience: 60,
    icon: "💫",
  },
  {
    id: "teleporter",
    name: "Телепортатор",
    description: "Используйте телепортацию",
    category: "magic",
    experience: 55,
    icon: "🌀",
  },
  {
    id: "necromancer",
    name: "Некромант",
    description: "Оживите мёртвое существо",
    category: "magic",
    experience: 70,
    icon: "💀",
  },
  {
    id: "elemental_caller",
    name: "Призыватель стихий",
    description: "Призовите элементаля",
    category: "magic",
    experience: 65,
    icon: "🔥",
  },
  {
    id: "true_polymorph",
    name: "Истинное превращение",
    description: "Используйте высокоуровневую трансмутацию",
    category: "magic",
    experience: 90,
    icon: "🦋",
  },

  // === ВЫЖИВАНИЕ (Survival) === 15-50 XP
  {
    id: "survivor",
    name: "Выживальщик",
    description: "Переживите экстремальные условия",
    category: "survival",
    experience: 30,
    icon: "🏕️",
  },
  {
    id: "healer",
    name: "Целитель",
    description: "Исцелите союзника",
    category: "survival",
    experience: 20,
    icon: "🩹",
  },
  {
    id: "hunter",
    name: "Охотник",
    description: "Добудьте пищу охотой",
    category: "survival",
    experience: 25,
    icon: "🏹",
  },
  {
    id: "herbalist",
    name: "Травник",
    description: "Соберите лечебные травы",
    category: "survival",
    experience: 20,
    icon: "🌿",
  },
  {
    id: "fire_maker",
    name: "Разжигатель костров",
    description: "Разведите костёр в дикой природе",
    category: "survival",
    experience: 15,
    icon: "🔥",
  },
  {
    id: "tracker",
    name: "Следопыт",
    description: "Успешно выследите цель",
    category: "survival",
    experience: 30,
    icon: "👁️",
  },
  {
    id: "shelter_builder",
    name: "Строитель укрытий",
    description: "Постройте временное убежище",
    category: "survival",
    experience: 20,
    icon: "⛺",
  },
  {
    id: "weather_reader",
    name: "Предсказатель погоды",
    description: "Правильно предскажите погоду",
    category: "survival",
    experience: 15,
    icon: "⛈️",
  },
  {
    id: "poison_resist",
    name: "Устойчивость к яду",
    description: "Выживите после отравления",
    category: "survival",
    experience: 35,
    icon: "☠️",
  },
  {
    id: "long_rest",
    name: "Хороший отдых",
    description: "Завершите длительный отдых без прерываний",
    category: "survival",
    experience: 15,
    icon: "😴",
  },

  // === ОТЫГРЫШ (Roleplay) === 25-80 XP
  {
    id: "character_moment",
    name: "Момент персонажа",
    description: "Отыграйте важный момент из предыстории",
    category: "roleplay",
    experience: 40,
    icon: "🎬",
  },
  {
    id: "emotional_scene",
    name: "Эмоциональная сцена",
    description: "Отыграйте эмоциональную сцену",
    category: "roleplay",
    experience: 35,
    icon: "😢",
  },
  {
    id: "comic_relief",
    name: "Комическое облегчение",
    description: "Рассмешите всю группу",
    category: "roleplay",
    experience: 25,
    icon: "😂",
  },
  {
    id: "character_development",
    name: "Развитие персонажа",
    description: "Измените мировоззрение персонажа",
    category: "roleplay",
    experience: 60,
    icon: "🎭",
  },
  {
    id: "dramatic_entrance",
    name: "Драматичный вход",
    description: "Появитесь эффектно в важный момент",
    category: "roleplay",
    experience: 30,
    icon: "🚪",
  },
  {
    id: "sacrifice",
    name: "Жертва",
    description: "Пожертвуйте чем-то важным ради группы",
    category: "roleplay",
    experience: 50,
    icon: "💔",
  },
  {
    id: "backstory_reveal",
    name: "Раскрытие прошлого",
    description: "Раскройте секрет из своего прошлого",
    category: "roleplay",
    experience: 45,
    icon: "📖",
  },
  {
    id: "npc_interaction",
    name: "Взаимодействие с NPC",
    description: "Создайте запоминающуюся сцену с NPC",
    category: "roleplay",
    experience: 35,
    icon: "🗣️",
  },
  {
    id: "character_flaw",
    name: "Следование недостаткам",
    description: "Отыграйте недостаток персонажа",
    category: "roleplay",
    experience: 30,
    icon: "🎪",
  },
  {
    id: "heroic_speech",
    name: "Героическая речь",
    description: "Произнесите вдохновляющую речь",
    category: "roleplay",
    experience: 40,
    icon: "📢",
  },

  // === ГОЛОВОЛОМКИ (Puzzle) === 30-70 XP
  {
    id: "puzzle_solver",
    name: "Решатель головоломок",
    description: "Решите первую головоломку",
    category: "puzzle",
    experience: 30,
    icon: "🧩",
  },
  {
    id: "riddle_master",
    name: "Мастер загадок",
    description: "Отгадайте сложную загадку",
    category: "puzzle",
    experience: 35,
    icon: "❓",
  },
  {
    id: "code_breaker",
    name: "Взломщик кодов",
    description: "Расшифруйте закодированное сообщение",
    category: "puzzle",
    experience: 40,
    icon: "🔐",
  },
  {
    id: "ancient_lore",
    name: "Знаток древних знаний",
    description: "Используйте знания истории для решения загадки",
    category: "puzzle",
    experience: 45,
    icon: "📚",
  },
  {
    id: "pattern_recognition",
    name: "Распознаватель узоров",
    description: "Найдите скрытый паттерн",
    category: "puzzle",
    experience: 35,
    icon: "🔢",
  },
  {
    id: "lock_picker",
    name: "Взломщик замков",
    description: "Вскройте сложный замок",
    category: "puzzle",
    experience: 30,
    icon: "🔓",
  },
  {
    id: "mechanic",
    name: "Механик",
    description: "Решите механическую головоломку",
    category: "puzzle",
    experience: 40,
    icon: "⚙️",
  },
  {
    id: "memory_master",
    name: "Мастер памяти",
    description: "Запомните сложную последовательность",
    category: "puzzle",
    experience: 35,
    icon: "🧠",
  },

  // === ВЕХИ (Milestone) === 50-150 XP
  {
    id: "level_up_5",
    name: "Опытный искатель приключений",
    description: "Достигните 5 уровня",
    category: "milestone",
    experience: 50,
    icon: "⬆️",
  },
  {
    id: "level_up_10",
    name: "Герой",
    description: "Достигните 10 уровня",
    category: "milestone",
    experience: 100,
    icon: "🌟",
  },
  {
    id: "level_up_15",
    name: "Легенда",
    description: "Достигните 15 уровня",
    category: "milestone",
    experience: 150,
    icon: "👑",
  },
  {
    id: "first_adventure",
    name: "Первое приключение",
    description: "Завершите первое приключение",
    category: "milestone",
    experience: 60,
    icon: "🗺️",
  },
  {
    id: "campaign_complete",
    name: "Завершённая кампания",
    description: "Завершите полную кампанию",
    category: "milestone",
    experience: 150,
    icon: "🏆",
  },
  {
    id: "death_save",
    name: "На краю смерти",
    description: "Выживите после броска спасения от смерти",
    category: "milestone",
    experience: 50,
    icon: "💀",
  },
  {
    id: "resurrection",
    name: "Воскрешение",
    description: "Вернитесь из мёртвых",
    category: "milestone",
    experience: 75,
    icon: "⚰️",
  },

  // === ОСОБЫЕ (Special) === 40-120 XP
  {
    id: "lucky_strike",
    name: "Удачливый удар",
    description: "Выбросьте естественную 20 в критический момент",
    category: "special",
    experience: 40,
    icon: "🎲",
  },
  {
    id: "natural_one",
    name: "Эпический провал",
    description: "Выбросьте естественную 1 (и выживите)",
    category: "special",
    experience: 20,
    icon: "💩",
  },
  {
    id: "clutch_moment",
    name: "Решающий момент",
    description: "Спасите группу в критической ситуации",
    category: "special",
    experience: 80,
    icon: "⚡",
  },
  {
    id: "item_creator",
    name: "Создатель предметов",
    description: "Создайте магический предмет",
    category: "special",
    experience: 70,
    icon: "🔨",
  },
  {
    id: "legendary_item",
    name: "Обладатель легенды",
    description: "Получите легендарный предмет",
    category: "special",
    experience: 100,
    icon: "⚔️",
  },
  {
    id: "artifact_wielder",
    name: "Носитель артефакта",
    description: "Получите артефакт",
    category: "special",
    experience: 120,
    icon: "💠",
  },
  {
    id: "plane_traveler",
    name: "Путешественник между планами",
    description: "Путешествуйте на другой план существования",
    category: "special",
    experience: 90,
    icon: "🌌",
  },
  {
    id: "divine_intervention",
    name: "Божественное вмешательство",
    description: "Получите помощь от божества",
    category: "special",
    experience: 100,
    icon: "✝️",
  },
  {
    id: "party_leader",
    name: "Лидер группы",
    description: "Возглавьте группу в важном решении",
    category: "special",
    experience: 60,
    icon: "👨‍✈️",
  },
  {
    id: "world_saver",
    name: "Спаситель мира",
    description: "Спасите мир от катастрофы",
    category: "special",
    experience: 150,
    icon: "🌍",
  },
];

// Система расчёта уровня по опыту
export function calculateLevel(experience: number): number {
  // Формула: level = floor(sqrt(experience / 100)) + 1
  // Это даёт прогрессивный рост требований к опыту
  return Math.floor(Math.sqrt(experience / 100)) + 1;
}

// Опыт необходимый для достижения уровня
export function experienceForLevel(level: number): number {
  // Обратная формула: exp = (level - 1)^2 * 100
  return Math.pow(level - 1, 2) * 100;
}

// Прогресс до следующего уровня (0-100%)
export function progressToNextLevel(experience: number): number {
  const currentLevel = calculateLevel(experience);
  const currentLevelExp = experienceForLevel(currentLevel);
  const nextLevelExp = experienceForLevel(currentLevel + 1);

  const progress =
    ((experience - currentLevelExp) / (nextLevelExp - currentLevelExp)) * 100;
  return Math.min(100, Math.max(0, progress));
}

// Опыт до следующего уровня
export function experienceToNextLevel(experience: number): number {
  const currentLevel = calculateLevel(experience);
  const nextLevelExp = experienceForLevel(currentLevel + 1);
  return nextLevelExp - experience;
}

// Категории достижений с переводами
export const ACHIEVEMENT_CATEGORIES: Record<AchievementCategory, string> = {
  combat: "⚔️ Боевые",
  exploration: "🗺️ Исследование",
  social: "💬 Социальные",
  magic: "✨ Магические",
  survival: "🏕️ Выживание",
  roleplay: "🎭 Отыгрыш",
  puzzle: "🧩 Головоломки",
  milestone: "🏆 Вехи",
  special: "⭐ Особые",
};
