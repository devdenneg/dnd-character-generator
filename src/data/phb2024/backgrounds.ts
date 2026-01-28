// PHB 2024 Backgrounds Data - Полные переводы

import type { Background } from "@/types/character";

export const phb2024Backgrounds: Background[] = [
  {
    id: "acolyte",
    name: "Acolyte",
    nameRu: "Прислужник",
    description:
      "Вы посвятили себя служению в храме, расположенном в городе или укрытом в священной роще. Там вы совершали священные обряды в честь бога или пантеона богов. Вы служили под руководством жреца и изучали религиозные знания.",
    skillProficiencies: ["insight", "religion"],
    toolProficiencies: ["Набор каллиграфа"],
    languages: 2,
    equipment: [
      "Священный символ",
      "Молитвенник",
      "Набор каллиграфа",
      "Одежда путешественника",
      "15 зм",
    ],
    originFeat: "Посвящённый в магию (Жрец)",
    abilityScoreIncrease: {
      options: ["intelligence", "wisdom", "charisma"],
      amount: [2, 1, 0],
    },
    source: "phb2024",
  },
  {
    id: "artisan",
    name: "Artisan",
    nameRu: "Ремесленник",
    description:
      "Вы начинали с мытья полов и протирания столов в мастерской ремесленника за гроши. Постепенно вы освоили ремесло и стали мастером своего дела, способным создавать качественные изделия.",
    skillProficiencies: ["investigation", "persuasion"],
    toolProficiencies: ["Инструменты ремесленника (на выбор)"],
    languages: 1,
    equipment: ["Инструменты ремесленника", "Одежда путешественника", "25 зм"],
    originFeat: "Мастер",
    abilityScoreIncrease: {
      options: ["strength", "dexterity", "intelligence"],
      amount: [2, 1, 0],
    },
    source: "phb2024",
  },
  {
    id: "charlatan",
    name: "Charlatan",
    nameRu: "Шарлатан",
    description:
      "Когда-то вы были успешным мошенником. С помощью тщательно продуманных личин вы обманывали других, выдавая себя за того, кем не являетесь. Ваши уловки принесли вам богатство, но и немало врагов.",
    skillProficiencies: ["deception", "sleight_of_hand"],
    toolProficiencies: ["Набор для подделок"],
    languages: 1,
    equipment: ["Набор для подделок", "Костюм", "Красивая одежда", "15 зм"],
    originFeat: "Умелец",
    abilityScoreIncrease: {
      options: ["dexterity", "constitution", "charisma"],
      amount: [2, 1, 0],
    },
    source: "phb2024",
  },
  {
    id: "criminal",
    name: "Criminal",
    nameRu: "Преступник",
    description:
      "Вы зарабатывали на жизнь в тёмных переулках, срезая кошельки или грабя лавки. Возможно, вы были членом преступной гильдии или действовали в одиночку. Закон — не для вас.",
    skillProficiencies: ["sleight_of_hand", "stealth"],
    toolProficiencies: ["Воровские инструменты"],
    languages: 1,
    equipment: [
      "Воровские инструменты",
      "Ломик",
      "Тёмная одежда с капюшоном",
      "15 зм",
    ],
    originFeat: "Бдительность",
    abilityScoreIncrease: {
      options: ["dexterity", "constitution", "intelligence"],
      amount: [2, 1, 0],
    },
    source: "phb2024",
  },
  {
    id: "entertainer",
    name: "Entertainer",
    nameRu: "Артист",
    description:
      "Большую часть юности вы провели, следуя за менестрелями, актёрами или другими артистами. Вы научились приковывать внимание публики и дарить людям радость своим искусством.",
    skillProficiencies: ["acrobatics", "performance"],
    toolProficiencies: ["Музыкальный инструмент (на выбор)"],
    languages: 1,
    equipment: ["Музыкальный инструмент", "Костюм", "Зеркало", "Духи", "11 зм"],
    originFeat: "Музыкант",
    abilityScoreIncrease: {
      options: ["strength", "dexterity", "charisma"],
      amount: [2, 1, 0],
    },
    source: "phb2024",
  },
  {
    id: "farmer",
    name: "Farmer",
    nameRu: "Фермер",
    description:
      "Вы выросли, работая на земле, ухаживая за урожаем или животными. Тяжёлый труд закалил ваше тело и дух. Вы знаете цену честному труду и простым радостям жизни.",
    skillProficiencies: ["animal_handling", "nature"],
    toolProficiencies: ["Инструменты плотника"],
    languages: 1,
    equipment: [
      "Инструменты плотника",
      "Лопата",
      "Железный котелок",
      "Одежда путешественника",
      "15 зм",
    ],
    originFeat: "Крепкий",
    abilityScoreIncrease: {
      options: ["strength", "constitution", "wisdom"],
      amount: [2, 1, 0],
    },
    source: "phb2024",
  },
  {
    id: "guard",
    name: "Guard",
    nameRu: "Стражник",
    description:
      "Вы обучались нести караул и защищать поселение от угроз. Возможно, вы были городским стражником, охранником каравана или дозорным на стене. Бдительность — ваш главный навык.",
    skillProficiencies: ["athletics", "perception"],
    toolProficiencies: ["Игровой набор (на выбор)"],
    languages: 1,
    equipment: [
      "Копьё",
      "Лёгкий арбалет",
      "20 болтов",
      "Игровой набор",
      "Форменная одежда",
      "12 зм",
    ],
    originFeat: "Бдительность",
    abilityScoreIncrease: {
      options: ["strength", "intelligence", "wisdom"],
      amount: [2, 1, 0],
    },
    source: "phb2024",
  },
  {
    id: "guide",
    name: "Guide",
    nameRu: "Проводник",
    description:
      "Вы выросли в дикой местности, научившись ориентироваться и выживать вдали от цивилизации. Вы знаете тайные тропы и можете провести путников через самые опасные земли.",
    skillProficiencies: ["stealth", "survival"],
    toolProficiencies: ["Инструменты картографа"],
    languages: 1,
    equipment: [
      "Инструменты картографа",
      "Спальник",
      "Палатка",
      "Одежда путешественника",
      "2 зм",
    ],
    originFeat: "Посвящённый в магию (Друид)",
    abilityScoreIncrease: {
      options: ["dexterity", "constitution", "wisdom"],
      amount: [2, 1, 0],
    },
    source: "phb2024",
  },
  {
    id: "hermit",
    name: "Hermit",
    nameRu: "Отшельник",
    description:
      "Какое-то время вы жили в уединении, вдали от общества. Возможно, вы искали духовное просветление, скрывались от преследователей или просто искали покоя. Одиночество научило вас многому.",
    skillProficiencies: ["medicine", "religion"],
    toolProficiencies: ["Набор травника"],
    languages: 1,
    equipment: [
      "Набор травника",
      "Спальник",
      "Лампа",
      "Масло (3 фляги)",
      "Одежда путешественника",
      "16 зм",
    ],
    originFeat: "Целитель",
    abilityScoreIncrease: {
      options: ["constitution", "wisdom", "charisma"],
      amount: [2, 1, 0],
    },
    source: "phb2024",
  },
  {
    id: "merchant",
    name: "Merchant",
    nameRu: "Торговец",
    description:
      "Вы зарабатывали на жизнь куплей-продажей товаров. Вы знаете, как заключить выгодную сделку, и умеете находить общий язык с самыми разными людьми. Торговые пути — ваша стихия.",
    skillProficiencies: ["animal_handling", "persuasion"],
    toolProficiencies: ["Инструменты навигатора"],
    languages: 1,
    equipment: [
      "Инструменты навигатора",
      "Мул",
      "Повозка",
      "Одежда путешественника",
      "22 зм",
    ],
    originFeat: "Везунчик",
    abilityScoreIncrease: {
      options: ["constitution", "intelligence", "charisma"],
      amount: [2, 1, 0],
    },
    source: "phb2024",
  },
  {
    id: "noble",
    name: "Noble",
    nameRu: "Благородный",
    description:
      "Вы выросли в семье, принадлежащей к социальной элите. Вас окружали богатство и привилегии, и вы научились вести себя среди высшего общества. Титул обязывает, но и даёт возможности.",
    skillProficiencies: ["history", "persuasion"],
    toolProficiencies: ["Игровой набор (на выбор)"],
    languages: 1,
    equipment: [
      "Игровой набор",
      "Красивая одежда",
      "Духи",
      "Перстень с печатью",
      "29 зм",
    ],
    originFeat: "Умелец",
    abilityScoreIncrease: {
      options: ["strength", "intelligence", "charisma"],
      amount: [2, 1, 0],
    },
    source: "phb2024",
  },
  {
    id: "sage",
    name: "Sage",
    nameRu: "Мудрец",
    description:
      "Вы провели годы становления, путешествуя между поместьями и монастырями, изучая всё, что могли. Знания — ваше величайшее сокровище, и вы стремитесь узнать тайны мироздания.",
    skillProficiencies: ["arcana", "history"],
    toolProficiencies: ["Набор каллиграфа"],
    languages: 2,
    equipment: [
      "Набор каллиграфа",
      "Книга",
      "Пергамент (10 листов)",
      "Набор учёного",
      "Мантия",
      "8 зм",
    ],
    originFeat: "Посвящённый в магию (Волшебник)",
    abilityScoreIncrease: {
      options: ["constitution", "intelligence", "wisdom"],
      amount: [2, 1, 0],
    },
    source: "phb2024",
  },
  {
    id: "sailor",
    name: "Sailor",
    nameRu: "Моряк",
    description:
      "Вы провели ранние годы моряком, бороздя моря. Вы научились справляться со штормами и управлять кораблём. Солёный ветер и бескрайний горизонт — вот ваша стихия.",
    skillProficiencies: ["acrobatics", "perception"],
    toolProficiencies: ["Инструменты навигатора"],
    languages: 1,
    equipment: [
      "Инструменты навигатора",
      "Верёвка (50 футов)",
      "Одежда путешественника",
      "10 зм",
    ],
    originFeat: "Драчун",
    abilityScoreIncrease: {
      options: ["strength", "dexterity", "wisdom"],
      amount: [2, 1, 0],
    },
    source: "phb2024",
  },
  {
    id: "scribe",
    name: "Scribe",
    nameRu: "Писарь",
    description:
      "Вы провели годы становления писарем, переписывая документы. Ваш острый глаз и внимание к деталям позволяют вам замечать то, что другие упускают.",
    skillProficiencies: ["investigation", "perception"],
    toolProficiencies: ["Набор каллиграфа"],
    languages: 2,
    equipment: [
      "Набор каллиграфа",
      "Красивая одежда",
      "Лампа",
      "Масло (3 фляги)",
      "Пергамент (12 листов)",
      "23 зм",
    ],
    originFeat: "Умелец",
    abilityScoreIncrease: {
      options: ["dexterity", "intelligence", "wisdom"],
      amount: [2, 1, 0],
    },
    source: "phb2024",
  },
  {
    id: "soldier",
    name: "Soldier",
    nameRu: "Солдат",
    description:
      "Вы начали военную подготовку, как только достигли зрелости, и годами совершенствовали своё мастерство. Война — ваше ремесло, и вы знаете цену дисциплине и товариществу.",
    skillProficiencies: ["athletics", "intimidation"],
    toolProficiencies: ["Игровой набор (на выбор)"],
    languages: 1,
    equipment: [
      "Копьё",
      "Короткий лук",
      "20 стрел",
      "Игровой набор",
      "Форменная одежда",
      "14 зм",
    ],
    originFeat: "Дикий боец",
    abilityScoreIncrease: {
      options: ["strength", "dexterity", "constitution"],
      amount: [2, 1, 0],
    },
    source: "phb2024",
  },
  {
    id: "wayfarer",
    name: "Wayfarer",
    nameRu: "Странник",
    description:
      "Вы выросли на улицах, выживая благодаря смекалке и проворству. Жизнь научила вас быть хитрым и осторожным. Вы знаете, как затеряться в толпе и найти путь в любом городе.",
    skillProficiencies: ["insight", "stealth"],
    toolProficiencies: ["Воровские инструменты"],
    languages: 1,
    equipment: [
      "Воровские инструменты",
      "Игровой набор",
      "Спальник",
      "Одежда путешественника",
      "16 зм",
    ],
    originFeat: "Везунчик",
    abilityScoreIncrease: {
      options: ["dexterity", "wisdom", "charisma"],
      amount: [2, 1, 0],
    },
    source: "phb2024",
  },
];

export function getBackgroundById(id: string): Background | undefined {
  return phb2024Backgrounds.find((bg) => bg.id === id);
}

export function getAllBackgrounds(): Background[] {
  return phb2024Backgrounds;
}
