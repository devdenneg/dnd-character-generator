import prisma from "../src/db";

type EquipmentRef = {
  ref: string;
  qty?: number;
};

type ClassEquipmentBlock =
  | { type: "fixed"; items: EquipmentRef[]; gold?: number }
  | { type: "choice"; options: Array<{ label: string; items: EquipmentRef[]; gold?: number }> }
  | { type: "or"; goldAlternative: number };

type ClassEquipmentBlockResolved =
  | { type: "fixed"; items: Array<{ equipmentId: string; quantity: number }>; gold?: number }
  | { type: "choice"; options: Array<{ label: string; items: Array<{ equipmentId: string; quantity: number }>; gold?: number }> }
  | { type: "or"; goldAlternative: number };

type ClassSeed = {
  classExternalId: string;
  startingGold: number;
  startingEquipment: ClassEquipmentBlock[];
};

type BackgroundSeed = {
  externalId: string;
  name: string;
  nameRu: string;
  description: string;
  skillProficiencies: string[];
  toolProficiencies: string[];
  languages: number;
  startingGold: number;
  originFeat: string;
  abilityScoreIncrease: {
    options: string[];
    amount: number[];
  };
  equipment: EquipmentRef[];
};

type SubclassSeed = {
  classExternalId: string;
  externalId: string;
  name: string;
  nameRu: string;
};

const EQUIPMENT_ALIASES: Record<string, string[]> = {
  "4-handaxes": ["handaxe"],
  "10-darts": ["dart"],
  "20-arrows": ["arrow", "arrows"],
  "20-bolts": ["crossbow-bolt", "bolt", "bolts"],
  "2-daggers": ["dagger"],
  "2-shortswords": ["shortsword"],
  "5-javelins": ["javelin"],
  "2-pouches": ["pouch"],
  "traveler-clothes": ["travelers-clothes", "traveller-clothes", "clothes-traveler-s"],
  "calligraphers-supplies": ["calligrapher-supplies", "calligrapher-s-supplies"],
  "thieves-tools": ["thieves-tool"],
  "forgery-kit": ["forger-kit"],
  "gamingset": ["gaming-set"],
  "hooded-lantern": ["lantern-hooded"],
  "oils": ["oil-flask", "oil"],
  "parchment-5": ["parchment"],
  "parchment-8": ["parchment"],
  "parchment-12": ["parchment"],
  "musical-instrument": ["instrument"],
  "simple-weapon": ["club", "quarterstaff", "mace"],
  "explorers-pack": ["explorer-s-pack"],
  "entertainers-pack": ["entertainer-s-pack"],
  "priests-pack": ["priest-s-pack"],
  "dungeoneers-pack": ["dungeoneer-s-pack"],
  "burglars-pack": ["burglar-s-pack"],
  "scholars-pack": ["scholar-s-pack"],
  "fine-clothes": ["clothes-fine"],
  "healers-kit": ["healer-s-kit"],
  "navigators-tools": ["navigator-s-tools"],
  "cartographers-tools": ["cartographer-s-tools"],
  "carpenters-tools": ["carpenter-s-tools"],
  "artisans-tools": ["smith-s-tools"],
  "prayer-book": ["book"],
  "iron-pot": ["pot-iron"],
};

const ORIGIN_FEAT_CANDIDATES: Record<string, string[]> = {
  "Magic Initiate (Cleric)": ["magic-initiate-cleric", "magic-initiate"],
  Crafter: ["crafter"],
  Skilled: ["skilled"],
  Alert: ["alert"],
  Musician: ["musician"],
  Tough: ["tough"],
  "Magic Initiate (Druid)": ["magic-initiate-druid", "magic-initiate"],
  Healer: ["healer"],
  Lucky: ["lucky"],
  "Magic Initiate (Wizard)": ["magic-initiate-wizard", "magic-initiate"],
  "Tavern Brawler": ["tavern-brawler"],
  "Savage Attacker": ["savage-attacker"],
};

const CLASS_SEEDS: ClassSeed[] = [
  {
    classExternalId: "barbarian",
    startingGold: 75,
    startingEquipment: [
      { type: "fixed", items: [{ ref: "greataxe" }, { ref: "4-handaxes", qty: 4 }, { ref: "explorers-pack" }], gold: 15 },
      { type: "or", goldAlternative: 75 },
    ],
  },
  {
    classExternalId: "bard",
    startingGold: 100,
    startingEquipment: [
      { type: "fixed", items: [{ ref: "rapier" }, { ref: "entertainers-pack" }, { ref: "musical-instrument" }, { ref: "dagger" }], gold: 28 },
      { type: "or", goldAlternative: 100 },
    ],
  },
  {
    classExternalId: "cleric",
    startingGold: 110,
    startingEquipment: [
      { type: "fixed", items: [{ ref: "shield" }, { ref: "holy-symbol" }, { ref: "priests-pack" }] },
      {
        type: "choice",
        options: [
          { label: "Chain Mail", items: [{ ref: "chain-mail" }] },
          { label: "Scale Mail + Light Crossbow + 20 bolts", items: [{ ref: "scale-mail" }, { ref: "light-crossbow" }, { ref: "20-bolts", qty: 20 }] },
        ],
      },
      {
        type: "choice",
        options: [
          { label: "Mace", items: [{ ref: "mace" }] },
          { label: "Warhammer", items: [{ ref: "warhammer" }] },
        ],
      },
      { type: "or", goldAlternative: 110 },
    ],
  },
  {
    classExternalId: "druid",
    startingGold: 50,
    startingEquipment: [
      { type: "fixed", items: [{ ref: "shield" }, { ref: "quarterstaff" }, { ref: "leather-armor" }, { ref: "druidic-focus" }, { ref: "explorers-pack" }], gold: 9 },
      { type: "or", goldAlternative: 50 },
    ],
  },
  {
    classExternalId: "fighter",
    startingGold: 175,
    startingEquipment: [
      {
        type: "choice",
        options: [
          { label: "Chain Mail", items: [{ ref: "chain-mail" }] },
          { label: "Leather Armor + Longbow + 20 Arrows", items: [{ ref: "leather-armor" }, { ref: "longbow" }, { ref: "20-arrows", qty: 20 }] },
        ],
      },
      {
        type: "choice",
        options: [
          { label: "Greatsword", items: [{ ref: "greatsword" }] },
          { label: "Longsword + Battleaxe", items: [{ ref: "longsword" }, { ref: "battleaxe" }] },
        ],
      },
      {
        type: "choice",
        options: [
          { label: "Light Crossbow + 20 Bolts", items: [{ ref: "light-crossbow" }, { ref: "20-bolts", qty: 20 }] },
          { label: "2 Handaxes", items: [{ ref: "handaxe", qty: 2 }] },
        ],
      },
      { type: "fixed", items: [{ ref: "dungeoneers-pack" }] },
      { type: "or", goldAlternative: 175 },
    ],
  },
  {
    classExternalId: "monk",
    startingGold: 50,
    startingEquipment: [
      { type: "fixed", items: [{ ref: "10-darts", qty: 10 }, { ref: "dungeoneers-pack" }], gold: 11 },
      { type: "or", goldAlternative: 50 },
    ],
  },
  {
    classExternalId: "paladin",
    startingGold: 150,
    startingEquipment: [
      { type: "fixed", items: [{ ref: "chain-mail" }, { ref: "shield" }, { ref: "5-javelins", qty: 5 }, { ref: "holy-symbol" }, { ref: "priests-pack" }] },
      {
        type: "choice",
        options: [
          { label: "Greatsword", items: [{ ref: "greatsword" }] },
          { label: "Longsword + Warhammer", items: [{ ref: "longsword" }, { ref: "warhammer" }] },
        ],
      },
      { type: "or", goldAlternative: 150 },
    ],
  },
  {
    classExternalId: "ranger",
    startingGold: 150,
    startingEquipment: [
      { type: "fixed", items: [{ ref: "leather-armor" }, { ref: "shortsword", qty: 2 }, { ref: "longbow" }, { ref: "20-arrows", qty: 20 }, { ref: "druidic-focus" }, { ref: "explorers-pack" }] },
      { type: "or", goldAlternative: 150 },
    ],
  },
  {
    classExternalId: "rogue",
    startingGold: 110,
    startingEquipment: [
      {
        type: "choice",
        options: [
          { label: "Rapier", items: [{ ref: "rapier" }] },
          { label: "Shortsword", items: [{ ref: "shortsword" }] },
        ],
      },
      { type: "fixed", items: [{ ref: "shortbow" }, { ref: "20-arrows", qty: 20 }, { ref: "leather-armor" }, { ref: "2-daggers", qty: 2 }, { ref: "thieves-tools" }, { ref: "burglars-pack" }], gold: 18 },
      { type: "or", goldAlternative: 110 },
    ],
  },
  {
    classExternalId: "sorcerer",
    startingGold: 50,
    startingEquipment: [
      { type: "fixed", items: [{ ref: "2-daggers", qty: 2 }, { ref: "arcane-focus" }, { ref: "dungeoneers-pack" }], gold: 28 },
      { type: "or", goldAlternative: 50 },
    ],
  },
  {
    classExternalId: "warlock",
    startingGold: 100,
    startingEquipment: [
      { type: "fixed", items: [{ ref: "leather-armor" }, { ref: "simple-weapon" }, { ref: "2-daggers", qty: 2 }, { ref: "arcane-focus" }, { ref: "dungeoneers-pack" }], gold: 15 },
      { type: "or", goldAlternative: 100 },
    ],
  },
  {
    classExternalId: "wizard",
    startingGold: 55,
    startingEquipment: [
      { type: "fixed", items: [{ ref: "quarterstaff" }, { ref: "arcane-focus" }, { ref: "scholars-pack" }, { ref: "spellbook" }] },
      { type: "or", goldAlternative: 55 },
    ],
  },
];

const BACKGROUND_SEEDS: BackgroundSeed[] = [
  {
    externalId: "acolyte",
    name: "Acolyte",
    nameRu: "Прислужник",
    description: "Вы провели годы в служении храму и изучении религиозных традиций.",
    skillProficiencies: ["insight", "religion"],
    toolProficiencies: ["calligraphers-supplies"],
    languages: 0,
    startingGold: 50,
    originFeat: "Magic Initiate (Cleric)",
    abilityScoreIncrease: { options: ["charisma", "intelligence", "wisdom"], amount: [2, 1] },
    equipment: [
      { ref: "prayer-book" },
      { ref: "holy-symbol" },
      { ref: "parchment-5", qty: 5 },
      { ref: "robe" },
      { ref: "calligraphers-supplies" },
    ],
  },
  {
    externalId: "artisan",
    name: "Artisan",
    nameRu: "Ремесленник",
    description: "Вы освоили ремесло и умеете создавать полезные и красивые вещи.",
    skillProficiencies: ["investigation", "persuasion"],
    toolProficiencies: ["artisans-tools"],
    languages: 0,
    startingGold: 50,
    originFeat: "Crafter",
    abilityScoreIncrease: { options: ["strength", "dexterity", "intelligence"], amount: [2, 1] },
    equipment: [{ ref: "artisans-tools" }, { ref: "traveler-clothes" }, { ref: "2-pouches", qty: 2 }],
  },
  {
    externalId: "charlatan",
    name: "Charlatan",
    nameRu: "Шарлатан",
    description: "Вы привыкли обманывать и выдавать себя за кого-то другого.",
    skillProficiencies: ["deception", "sleight-of-hand"],
    toolProficiencies: ["forgery-kit"],
    languages: 0,
    startingGold: 50,
    originFeat: "Skilled",
    abilityScoreIncrease: { options: ["dexterity", "constitution", "charisma"], amount: [2, 1] },
    equipment: [{ ref: "forgery-kit" }, { ref: "costume" }, { ref: "fine-clothes" }],
  },
  {
    externalId: "criminal",
    name: "Criminal",
    nameRu: "Преступник",
    description: "Вы знакомы с теневой стороной общества и уличными правилами.",
    skillProficiencies: ["sleight-of-hand", "stealth"],
    toolProficiencies: ["thieves-tools"],
    languages: 0,
    startingGold: 50,
    originFeat: "Alert",
    abilityScoreIncrease: { options: ["dexterity", "constitution", "intelligence"], amount: [2, 1] },
    equipment: [{ ref: "2-daggers", qty: 2 }, { ref: "thieves-tools" }, { ref: "crowbar" }, { ref: "2-pouches", qty: 2 }, { ref: "traveler-clothes" }],
  },
  {
    externalId: "entertainer",
    name: "Entertainer",
    nameRu: "Артист",
    description: "Вы выступаете перед публикой и умеете привлекать внимание.",
    skillProficiencies: ["acrobatics", "performance"],
    toolProficiencies: ["musical-instrument"],
    languages: 0,
    startingGold: 50,
    originFeat: "Musician",
    abilityScoreIncrease: { options: ["strength", "dexterity", "charisma"], amount: [2, 1] },
    equipment: [{ ref: "costume", qty: 2 }, { ref: "mirror" }, { ref: "perfume" }, { ref: "traveler-clothes" }],
  },
  {
    externalId: "farmer",
    name: "Farmer",
    nameRu: "Фермер",
    description: "Вы выросли на земле и знаете тяжёлый труд и заботу о живом.",
    skillProficiencies: ["animal-handling", "nature"],
    toolProficiencies: ["carpenters-tools"],
    languages: 0,
    startingGold: 50,
    originFeat: "Tough",
    abilityScoreIncrease: { options: ["strength", "constitution", "wisdom"], amount: [2, 1] },
    equipment: [{ ref: "sickle" }, { ref: "carpenters-tools" }, { ref: "healers-kit" }, { ref: "iron-pot" }, { ref: "shovel" }, { ref: "traveler-clothes" }],
  },
  {
    externalId: "guard",
    name: "Guard",
    nameRu: "Стражник",
    description: "Вы следили за порядком, патрулировали и пресекали преступления.",
    skillProficiencies: ["athletics", "perception"],
    toolProficiencies: ["gamingset"],
    languages: 0,
    startingGold: 50,
    originFeat: "Alert",
    abilityScoreIncrease: { options: ["strength", "intelligence", "wisdom"], amount: [2, 1] },
    equipment: [{ ref: "spear" }, { ref: "light-crossbow" }, { ref: "20-bolts", qty: 20 }, { ref: "gamingset" }, { ref: "hooded-lantern" }, { ref: "manacles" }, { ref: "quiver" }, { ref: "traveler-clothes" }],
  },
  {
    externalId: "guide",
    name: "Guide",
    nameRu: "Проводник",
    description: "Вы ведёте людей по дикой местности и знаете безопасные тропы.",
    skillProficiencies: ["stealth", "survival"],
    toolProficiencies: ["cartographers-tools"],
    languages: 0,
    startingGold: 50,
    originFeat: "Magic Initiate (Druid)",
    abilityScoreIncrease: { options: ["dexterity", "constitution", "wisdom"], amount: [2, 1] },
    equipment: [{ ref: "shortbow" }, { ref: "20-arrows", qty: 20 }, { ref: "cartographers-tools" }, { ref: "bedroll" }, { ref: "quiver" }, { ref: "tent" }, { ref: "traveler-clothes" }],
  },
  {
    externalId: "hermit",
    name: "Hermit",
    nameRu: "Отшельник",
    description: "Вы долго жили в уединении, посвятив время созерцанию и знаниям.",
    skillProficiencies: ["medicine", "religion"],
    toolProficiencies: ["herbalism-kit"],
    languages: 0,
    startingGold: 50,
    originFeat: "Healer",
    abilityScoreIncrease: { options: ["constitution", "wisdom", "charisma"], amount: [2, 1] },
    equipment: [{ ref: "quarterstaff" }, { ref: "herbalism-kit" }, { ref: "book" }, { ref: "lamp" }, { ref: "oils", qty: 3 }, { ref: "traveler-clothes" }],
  },
  {
    externalId: "merchant",
    name: "Merchant",
    nameRu: "Торговец",
    description: "Вы умеете вести сделки, считать прибыль и выстраивать связи.",
    skillProficiencies: ["animal-handling", "persuasion"],
    toolProficiencies: ["navigators-tools"],
    languages: 0,
    startingGold: 50,
    originFeat: "Lucky",
    abilityScoreIncrease: { options: ["constitution", "intelligence", "charisma"], amount: [2, 1] },
    equipment: [{ ref: "navigators-tools" }, { ref: "2-pouches", qty: 2 }, { ref: "traveler-clothes" }],
  },
  {
    externalId: "noble",
    name: "Noble",
    nameRu: "Благородный",
    description: "Вы происходите из знати и привыкли к привилегиям и этикету.",
    skillProficiencies: ["history", "persuasion"],
    toolProficiencies: ["gamingset"],
    languages: 0,
    startingGold: 50,
    originFeat: "Skilled",
    abilityScoreIncrease: { options: ["strength", "intelligence", "charisma"], amount: [2, 1] },
    equipment: [{ ref: "gamingset" }, { ref: "fine-clothes" }, { ref: "perfume" }],
  },
  {
    externalId: "sage",
    name: "Sage",
    nameRu: "Мудрец",
    description: "Вы посвятили себя исследованиям, чтению и накоплению знаний.",
    skillProficiencies: ["arcana", "history"],
    toolProficiencies: ["calligraphers-supplies"],
    languages: 0,
    startingGold: 50,
    originFeat: "Magic Initiate (Wizard)",
    abilityScoreIncrease: { options: ["constitution", "intelligence", "wisdom"], amount: [2, 1] },
    equipment: [{ ref: "quarterstaff" }, { ref: "calligraphers-supplies" }, { ref: "book" }, { ref: "parchment-8", qty: 8 }, { ref: "robe" }],
  },
  {
    externalId: "sailor",
    name: "Sailor",
    nameRu: "Моряк",
    description: "Вы знаете морские традиции, ветра и работу на судне.",
    skillProficiencies: ["acrobatics", "perception"],
    toolProficiencies: ["navigators-tools"],
    languages: 0,
    startingGold: 50,
    originFeat: "Tavern Brawler",
    abilityScoreIncrease: { options: ["strength", "dexterity", "wisdom"], amount: [2, 1] },
    equipment: [{ ref: "dagger" }, { ref: "navigators-tools" }, { ref: "rope" }, { ref: "traveler-clothes" }],
  },
  {
    externalId: "scribe",
    name: "Scribe",
    nameRu: "Писец",
    description: "Вы обучены письму, копированию документов и работе с архивами.",
    skillProficiencies: ["investigation", "perception"],
    toolProficiencies: ["calligraphers-supplies"],
    languages: 0,
    startingGold: 50,
    originFeat: "Skilled",
    abilityScoreIncrease: { options: ["dexterity", "intelligence", "wisdom"], amount: [2, 1] },
    equipment: [{ ref: "calligraphers-supplies" }, { ref: "fine-clothes" }, { ref: "lamp" }, { ref: "oils", qty: 3 }, { ref: "parchment-12", qty: 12 }],
  },
  {
    externalId: "soldier",
    name: "Soldier",
    nameRu: "Солдат",
    description: "Вы служили в армии, знакомы с дисциплиной и строевой жизнью.",
    skillProficiencies: ["athletics", "intimidation"],
    toolProficiencies: ["gamingset"],
    languages: 0,
    startingGold: 50,
    originFeat: "Savage Attacker",
    abilityScoreIncrease: { options: ["strength", "dexterity", "constitution"], amount: [2, 1] },
    equipment: [{ ref: "spear" }, { ref: "shortbow" }, { ref: "20-arrows", qty: 20 }, { ref: "gamingset" }, { ref: "healers-kit" }, { ref: "quiver" }, { ref: "traveler-clothes" }],
  },
  {
    externalId: "wayfarer",
    name: "Wayfarer",
    nameRu: "Странник",
    description: "Вы много странствовали и умеете выживать в дороге.",
    skillProficiencies: ["insight", "stealth"],
    toolProficiencies: ["thieves-tools"],
    languages: 0,
    startingGold: 50,
    originFeat: "Lucky",
    abilityScoreIncrease: { options: ["dexterity", "wisdom", "charisma"], amount: [2, 1] },
    equipment: [{ ref: "2-daggers", qty: 2 }, { ref: "thieves-tools" }, { ref: "gamingset" }, { ref: "bedroll" }, { ref: "2-pouches", qty: 2 }, { ref: "traveler-clothes" }],
  },
];

const SUBCLASSES: SubclassSeed[] = [
  { classExternalId: "barbarian", externalId: "berserker", name: "Path of the Berserker", nameRu: "Путь Берсерка" },
  { classExternalId: "barbarian", externalId: "wild-heart", name: "Path of the Wild Heart", nameRu: "Путь Дикого Сердца" },
  { classExternalId: "barbarian", externalId: "world-tree", name: "Path of the World Tree", nameRu: "Путь Мирового Древа" },
  { classExternalId: "barbarian", externalId: "zealot", name: "Path of the Zealot", nameRu: "Путь Фанатика" },

  { classExternalId: "bard", externalId: "dance", name: "College of Dance", nameRu: "Коллегия Танца" },
  { classExternalId: "bard", externalId: "glamour", name: "College of Glamour", nameRu: "Коллегия Очарования" },
  { classExternalId: "bard", externalId: "lore", name: "College of Lore", nameRu: "Коллегия Знаний" },
  { classExternalId: "bard", externalId: "valor", name: "College of Valor", nameRu: "Коллегия Доблести" },

  { classExternalId: "cleric", externalId: "life", name: "Life Domain", nameRu: "Домен Жизни" },
  { classExternalId: "cleric", externalId: "light", name: "Light Domain", nameRu: "Домен Света" },
  { classExternalId: "cleric", externalId: "trickery", name: "Trickery Domain", nameRu: "Домен Обмана" },
  { classExternalId: "cleric", externalId: "war", name: "War Domain", nameRu: "Домен Войны" },

  { classExternalId: "druid", externalId: "land", name: "Circle of the Land", nameRu: "Круг Земли" },
  { classExternalId: "druid", externalId: "moon", name: "Circle of the Moon", nameRu: "Круг Луны" },
  { classExternalId: "druid", externalId: "sea", name: "Circle of the Sea", nameRu: "Круг Моря" },
  { classExternalId: "druid", externalId: "stars", name: "Circle of the Stars", nameRu: "Круг Звёзд" },

  { classExternalId: "fighter", externalId: "battle-master", name: "Battle Master", nameRu: "Мастер Боевых Искусств" },
  { classExternalId: "fighter", externalId: "champion", name: "Champion", nameRu: "Чемпион" },
  { classExternalId: "fighter", externalId: "eldritch-knight", name: "Eldritch Knight", nameRu: "Мистический Рыцарь" },
  { classExternalId: "fighter", externalId: "psi-warrior", name: "Psi Warrior", nameRu: "Пси-воин" },

  { classExternalId: "monk", externalId: "mercy", name: "Warrior of Mercy", nameRu: "Воин Милосердия" },
  { classExternalId: "monk", externalId: "shadow", name: "Warrior of Shadow", nameRu: "Воин Тени" },
  { classExternalId: "monk", externalId: "elements", name: "Warrior of the Elements", nameRu: "Воин Стихий" },
  { classExternalId: "monk", externalId: "open-hand", name: "Warrior of the Open Hand", nameRu: "Воин Открытой Ладони" },

  { classExternalId: "paladin", externalId: "devotion", name: "Oath of Devotion", nameRu: "Клятва Преданности" },
  { classExternalId: "paladin", externalId: "glory", name: "Oath of Glory", nameRu: "Клятва Славы" },
  { classExternalId: "paladin", externalId: "ancients", name: "Oath of the Ancients", nameRu: "Клятва Древних" },
  { classExternalId: "paladin", externalId: "vengeance", name: "Oath of Vengeance", nameRu: "Клятва Мести" },

  { classExternalId: "ranger", externalId: "beast-master", name: "Beast Master", nameRu: "Повелитель Зверей" },
  { classExternalId: "ranger", externalId: "fey-wanderer", name: "Fey Wanderer", nameRu: "Странник Фей" },
  { classExternalId: "ranger", externalId: "gloom-stalker", name: "Gloom Stalker", nameRu: "Сумеречный Охотник" },
  { classExternalId: "ranger", externalId: "hunter", name: "Hunter", nameRu: "Охотник" },

  { classExternalId: "rogue", externalId: "arcane-trickster", name: "Arcane Trickster", nameRu: "Мистический Ловкач" },
  { classExternalId: "rogue", externalId: "assassin", name: "Assassin", nameRu: "Убийца" },
  { classExternalId: "rogue", externalId: "soulknife", name: "Soulknife", nameRu: "Нож Души" },
  { classExternalId: "rogue", externalId: "thief", name: "Thief", nameRu: "Вор" },

  { classExternalId: "sorcerer", externalId: "aberrant", name: "Aberrant Sorcery", nameRu: "Аберрантное Колдовство" },
  { classExternalId: "sorcerer", externalId: "clockwork", name: "Clockwork Sorcery", nameRu: "Механическое Колдовство" },
  { classExternalId: "sorcerer", externalId: "draconic", name: "Draconic Sorcery", nameRu: "Драконье Колдовство" },
  { classExternalId: "sorcerer", externalId: "wild-magic", name: "Wild Magic Sorcery", nameRu: "Дикая Магия" },

  { classExternalId: "warlock", externalId: "archfey", name: "Archfey Patron", nameRu: "Покровитель Архифея" },
  { classExternalId: "warlock", externalId: "celestial", name: "Celestial Patron", nameRu: "Небесный Покровитель" },
  { classExternalId: "warlock", externalId: "fiend", name: "Fiend Patron", nameRu: "Покровитель Исчадие" },
  { classExternalId: "warlock", externalId: "great-old-one", name: "Great Old One Patron", nameRu: "Покровитель Великий Древний" },

  { classExternalId: "wizard", externalId: "abjurer", name: "Abjurer", nameRu: "Ограждение" },
  { classExternalId: "wizard", externalId: "diviner", name: "Diviner", nameRu: "Прорицание" },
  { classExternalId: "wizard", externalId: "evoker", name: "Evoker", nameRu: "Воплощение" },
  { classExternalId: "wizard", externalId: "illusionist", name: "Illusionist", nameRu: "Иллюзия" },
];

function normalize(value: string): string {
  return value.trim().toLowerCase().replace(/[_\s]+/g, "-");
}

function unique(values: string[]): string[] {
  return Array.from(new Set(values.filter(Boolean)));
}

function classExternalIdCandidates(raw: string): string[] {
  const base = normalize(raw);
  return unique([base, `${base}-phb`, `${base}-phb2024`]);
}

function equipmentExternalIdCandidates(raw: string): string[] {
  const base = normalize(raw);
  const withoutNumericSuffix = base.replace(/-\d+$/, "");
  return unique([
    base,
    withoutNumericSuffix,
    `${base}-phb`,
    `${withoutNumericSuffix}-phb`,
    `${base}-phb2024`,
    `${withoutNumericSuffix}-phb2024`,
  ]);
}

async function resolveClass(raw: string): Promise<{ id: string; externalId: string; subclassLevel: number } | null> {
  const byExternalId = await prisma.characterClass.findFirst({
    where: {
      externalId: {
        in: classExternalIdCandidates(raw),
      },
    },
    select: { id: true, externalId: true, subclassLevel: true },
  });
  if (byExternalId) return byExternalId;

  const byName = await prisma.characterClass.findFirst({
    where: {
      OR: [
        { name: { contains: raw, mode: "insensitive" } },
        { nameRu: { contains: raw, mode: "insensitive" } },
      ],
    },
    select: { id: true, externalId: true, subclassLevel: true },
  });
  if (byName) return byName;

  return null;
}

async function resolveEquipmentId(ref: string): Promise<string | null> {
  const rawCandidates = unique([ref, ...(EQUIPMENT_ALIASES[ref] ?? [])].map(normalize));
  const externalIdCandidates = unique(rawCandidates.flatMap((candidate) => equipmentExternalIdCandidates(candidate)));

  for (const candidate of externalIdCandidates) {
    const exact = await prisma.equipment.findFirst({
      where: {
        externalId: candidate,
      },
      select: { id: true },
    });
    if (exact?.id) return exact.id;
  }

  for (const candidate of rawCandidates) {
    const byName = await prisma.equipment.findFirst({
      where: {
        OR: [
          { name: { contains: candidate.replace(/-/g, " "), mode: "insensitive" } },
          { nameRu: { contains: candidate.replace(/-/g, " "), mode: "insensitive" } },
        ],
      },
      select: { id: true },
    });
    if (byName?.id) return byName.id;
  }

  return null;
}

async function resolveOriginFeatId(raw: string): Promise<string> {
  const candidates = [raw, ...(ORIGIN_FEAT_CANDIDATES[raw] ?? [])];

  for (const candidate of candidates) {
    const byId = await prisma.feat.findFirst({
      where: { id: normalize(candidate) },
      select: { id: true },
    });
    if (byId?.id) return byId.id;
  }

  for (const candidate of candidates) {
    const byName = await prisma.feat.findFirst({
      where: {
        OR: [
          { name: { contains: candidate, mode: "insensitive" } },
          { nameRu: { contains: candidate, mode: "insensitive" } },
        ],
      },
      select: { id: true },
    });
    if (byName?.id) return byName.id;
  }

  return normalize(raw);
}

async function updateClassStartingEquipment() {
  const missingClasses: string[] = [];
  const missingEquipment: string[] = [];

  for (const seed of CLASS_SEEDS) {
    const cls = await resolveClass(seed.classExternalId);

    if (!cls) {
      missingClasses.push(seed.classExternalId);
      continue;
    }

    const converted: ClassEquipmentBlockResolved[] = [];

    for (const block of seed.startingEquipment) {
      if (block.type === "or") {
        converted.push(block);
        continue;
      }

      if (block.type === "fixed") {
        const items = [] as Array<{ equipmentId: string; quantity: number }>;
        for (const item of block.items) {
          const equipmentId = await resolveEquipmentId(item.ref);
          if (!equipmentId) {
            missingEquipment.push(`class:${seed.classExternalId}:${item.ref}`);
            continue;
          }
          items.push({ equipmentId, quantity: item.qty ?? 1 });
        }
        converted.push({ type: "fixed", items, ...(typeof block.gold === "number" ? { gold: block.gold } : {}) });
        continue;
      }

      const options = [] as Array<{ label: string; items: Array<{ equipmentId: string; quantity: number }> }>;
      for (const option of block.options) {
        const items = [] as Array<{ equipmentId: string; quantity: number }>;
        for (const item of option.items) {
          const equipmentId = await resolveEquipmentId(item.ref);
          if (!equipmentId) {
            missingEquipment.push(`class:${seed.classExternalId}:${item.ref}`);
            continue;
          }
          items.push({ equipmentId, quantity: item.qty ?? 1 });
        }
        if (items.length > 0) {
          options.push({
            label: option.label,
            items,
            ...(typeof option.gold === "number" ? { gold: option.gold } : {}),
          });
        }
      }
      converted.push({ type: "choice", options });
    }

    await prisma.characterClass.update({
      where: { id: cls.id },
      data: {
        startingGold: seed.startingGold,
        startingEquipment: converted as unknown as object,
        source: "phb2024",
      },
    });
  }

  return { missingClasses, missingEquipment };
}

async function upsertBackgrounds() {
  const missingEquipment: string[] = [];
  const resolvedFeats = new Map<string, string>();

  for (const bg of BACKGROUND_SEEDS) {
    const equipmentRows: Array<{ itemId: string; quantity: number }> = [];

    for (const item of bg.equipment) {
      const eqId = await resolveEquipmentId(item.ref);
      if (!eqId) {
        missingEquipment.push(`background:${bg.externalId}:${item.ref}`);
        continue;
      }
      equipmentRows.push({ itemId: eqId, quantity: item.qty ?? 1 });
    }

    const featId = await resolveOriginFeatId(bg.originFeat);
    resolvedFeats.set(bg.externalId, featId);

    const existing = await prisma.background.findUnique({
      where: { externalId: bg.externalId },
      select: { id: true },
    });

    const id = existing?.id
      ? (
          await prisma.background.update({
            where: { id: existing.id },
            data: {
              name: bg.name,
              nameRu: bg.nameRu,
              description: bg.description,
              skillProficiencies: bg.skillProficiencies,
              toolProficiencies: bg.toolProficiencies,
              languages: bg.languages,
              startingGold: bg.startingGold,
              originFeat: featId,
              abilityScoreIncrease: bg.abilityScoreIncrease as unknown as object,
              source: "phb2024",
            },
            select: { id: true },
          })
        ).id
      : (
          await prisma.background.create({
            data: {
              externalId: bg.externalId,
              name: bg.name,
              nameRu: bg.nameRu,
              description: bg.description,
              skillProficiencies: bg.skillProficiencies,
              toolProficiencies: bg.toolProficiencies,
              languages: bg.languages,
              startingGold: bg.startingGold,
              originFeat: featId,
              abilityScoreIncrease: bg.abilityScoreIncrease as unknown as object,
              source: "phb2024",
            },
            select: { id: true },
          })
        ).id;

    await prisma.backgroundEquipment.deleteMany({ where: { backgroundId: id } });

    if (equipmentRows.length > 0) {
      await prisma.backgroundEquipment.createMany({
        data: equipmentRows.map((row) => ({
          backgroundId: id,
          itemId: row.itemId,
          quantity: row.quantity,
        })),
      });
    }
  }

  return { missingEquipment, resolvedFeats };
}

async function upsertSubclasses() {
  const missingClasses: string[] = [];

  for (const spec of SUBCLASSES) {
    const parent = await resolveClass(spec.classExternalId);

    if (!parent) {
      missingClasses.push(spec.classExternalId);
      continue;
    }

    const existing = await prisma.subclass.findFirst({
      where: {
        classId: parent.id,
        externalId: spec.externalId,
      },
      select: { id: true },
    });

    const subclassId = existing?.id
      ? (
          await prisma.subclass.update({
            where: { id: existing.id },
            data: {
              name: spec.name,
              nameRu: spec.nameRu,
              description: [
                `PHB 2024 subclass: ${spec.name}.`,
                "Описание и точные особенности должны быть заполнены из официального источника.",
              ],
              source: "phb2024",
            },
            select: { id: true },
          })
        ).id
      : (
          await prisma.subclass.create({
            data: {
              classId: parent.id,
              externalId: spec.externalId,
              name: spec.name,
              nameRu: spec.nameRu,
              description: [
                `PHB 2024 subclass: ${spec.name}.`,
                "Описание и точные особенности должны быть заполнены из официального источника.",
              ],
              source: "phb2024",
            },
            select: { id: true },
          })
        ).id;

    await prisma.subclassFeature.deleteMany({ where: { subclassId } });

    await prisma.subclassFeature.create({
      data: {
        subclassId,
        level: parent.subclassLevel,
        name: "Core Subclass Feature",
        nameRu: "Базовая особенность подкласса",
        description: [
          "Заполнить точную особенность по PHB 2024.",
          `Подкласс: ${spec.nameRu}.`,
        ],
      },
    });
  }

  return { missingClasses };
}

async function main() {
  console.log("[PHB2024] Start seeding...");

  const classes = await updateClassStartingEquipment();
  console.log(`[PHB2024] Classes updated: ${CLASS_SEEDS.length - classes.missingClasses.length}/${CLASS_SEEDS.length}`);

  const backgrounds = await upsertBackgrounds();
  console.log(`[PHB2024] Backgrounds upserted: ${BACKGROUND_SEEDS.length}`);

  const subclasses = await upsertSubclasses();
  console.log(`[PHB2024] Subclasses upserted: ${SUBCLASSES.length - subclasses.missingClasses.length}/${SUBCLASSES.length}`);

  if (classes.missingClasses.length > 0) {
    console.log("[PHB2024] Missing classes:", classes.missingClasses.join(", "));
  }
  if (subclasses.missingClasses.length > 0) {
    console.log("[PHB2024] Missing classes for subclasses:", subclasses.missingClasses.join(", "));
  }

  const allMissingEquipment = [...classes.missingEquipment, ...backgrounds.missingEquipment];
  if (allMissingEquipment.length > 0) {
    console.log("[PHB2024] Missing equipment references:");
    for (const line of allMissingEquipment) {
      console.log(` - ${line}`);
    }
  }

  console.log("[PHB2024] Origin feats resolved:");
  for (const [backgroundId, featId] of backgrounds.resolvedFeats.entries()) {
    console.log(` - ${backgroundId}: ${featId}`);
  }

  console.log("[PHB2024] Done");
}

main()
  .catch((error) => {
    console.error("[PHB2024] Failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
