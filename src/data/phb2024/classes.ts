// PHB 2024 Classes Data - Полные переводы

import type { CharacterClass, AbilityName } from "@/types/character";

export const phb2024Classes: CharacterClass[] = [
  {
    id: "barbarian",
    name: "Barbarian",
    nameRu: "Варвар",
    description:
      "Свирепый воин, способный впадать в боевую ярость. Варвары черпают силу из первобытной ярости, позволяющей им превозмогать раны и сокрушать врагов.",
    hitDie: 12,
    primaryAbility: ["strength"],
    savingThrows: ["strength", "constitution"],
    armorProficiencies: ["Лёгкие доспехи", "Средние доспехи", "Щиты"],
    weaponProficiencies: ["Простое оружие", "Воинское оружие"],
    skillChoices: [
      "animal_handling",
      "athletics",
      "intimidation",
      "nature",
      "perception",
      "survival",
    ],
    skillCount: 2,
    features: [
      {
        name: "Rage",
        nameRu: "Ярость",
        description:
          "В бою вы сражаетесь с первобытной яростью. Бонусным действием вы входите в ярость, получая сопротивление дробящему, колющему и рубящему урону, бонус к урону и преимущество на проверки Силы.",
        level: 1,
      },
      {
        name: "Unarmored Defense",
        nameRu: "Защита без доспехов",
        description:
          "Пока вы не носите доспехи, ваш КД = 10 + модификатор Ловкости + модификатор Телосложения. Вы можете использовать щит.",
        level: 1,
      },
      {
        name: "Danger Sense",
        nameRu: "Чувство опасности",
        description:
          "Вы совершаете с преимуществом спасброски Ловкости против эффектов, которые вы можете видеть (ловушки, заклинания).",
        level: 2,
      },
      {
        name: "Reckless Attack",
        nameRu: "Безрассудная атака",
        description:
          "Вы можете атаковать безрассудно, получая преимущество на все рукопашные атаки Силы в этом ходу, но атаки по вам тоже совершаются с преимуществом.",
        level: 2,
      },
      {
        name: "Primal Path",
        nameRu: "Путь дикости",
        description:
          "Выберите свой подкласс варвара: Путь берсерка, Путь дикого сердца, Путь мирового древа или Путь фанатика.",
        level: 3,
      },
      {
        name: "Extra Attack",
        nameRu: "Дополнительная атака",
        description: "Вы можете атаковать дважды, совершая действие Атака.",
        level: 5,
      },
    ],
    subclasses: [
      {
        id: "berserker",
        name: "Path of the Berserker",
        nameRu: "Путь берсерка",
        description:
          "Для некоторых варваров ярость — это средство достижения цели, а целью является насилие.",
        features: [
          {
            name: "Frenzy",
            nameRu: "Исступление",
            description:
              "Войдя в ярость, вы можете впасть в исступление. В исступлении вы можете совершить одну атаку оружием ближнего боя бонусным действием.",
            level: 3,
          },
        ],
      },
      {
        id: "wild-heart",
        name: "Path of the Wild Heart",
        nameRu: "Путь дикого сердца",
        description: "Ваша ярость связывает вас с первобытной силой зверей.",
        features: [
          {
            name: "Animal Speaker",
            nameRu: "Говорящий со зверями",
            description:
              "Вы можете неограниченно накладывать заклинание Разговор с животными.",
            level: 3,
          },
        ],
      },
      {
        id: "world-tree",
        name: "Path of the World Tree",
        nameRu: "Путь мирового древа",
        description: "Ваша ярость черпает магию из Мирового Древа.",
        features: [
          {
            name: "Vitality of the Tree",
            nameRu: "Жизненная сила древа",
            description:
              "Когда вы входите в ярость, вы получаете временные хиты, равные вашему уровню варвара.",
            level: 3,
          },
        ],
      },
      {
        id: "zealot",
        name: "Path of the Zealot",
        nameRu: "Путь фанатика",
        description:
          "Некоторые божества вдохновляют своих последователей впадать в яростное боевое безумие.",
        features: [
          {
            name: "Divine Fury",
            nameRu: "Божественная ярость",
            description:
              "В ярости первый удар каждого хода наносит дополнительный 1к6 урона излучением или некротикой.",
            level: 3,
          },
        ],
      },
    ],
    subclassLevel: 3,
    source: "phb2024",
  },
  {
    id: "bard",
    name: "Bard",
    nameRu: "Бард",
    description:
      "Вдохновляющий маг, чья сила отражается в музыке творения. Барды ткут магию из слов и музыки, вдохновляя союзников и деморализуя врагов.",
    hitDie: 8,
    primaryAbility: ["charisma"],
    savingThrows: ["dexterity", "charisma"],
    armorProficiencies: ["Лёгкие доспехи"],
    weaponProficiencies: [
      "Простое оружие",
      "Ручной арбалет",
      "Длинный меч",
      "Рапира",
      "Короткий меч",
    ],
    skillChoices: [
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
    ],
    skillCount: 3,
    features: [
      {
        name: "Spellcasting",
        nameRu: "Использование заклинаний",
        description:
          "Вы научились изменять реальность в соответствии с вашими желаниями через музыку и речь. Харизма — базовая характеристика.",
        level: 1,
      },
      {
        name: "Bardic Inspiration",
        nameRu: "Бардовское вдохновение",
        description:
          "Бонусным действием вы даёте одному существу в пределах 60 футов кость вдохновения (к6). В течение 10 минут существо может бросить эту кость и добавить результат к одной проверке, атаке или спасброску.",
        level: 1,
      },
      {
        name: "Jack of All Trades",
        nameRu: "Мастер на все руки",
        description:
          "Вы добавляете половину бонуса мастерства ко всем проверкам характеристик, которыми вы не владеете.",
        level: 2,
      },
      {
        name: "Song of Rest",
        nameRu: "Песнь отдыха",
        description:
          "Во время Короткого отдыха вы можете исполнить успокаивающую музыку. Союзники, потратившие Кости Хитов, восстанавливают дополнительно 1к6 хитов.",
        level: 2,
      },
      {
        name: "Bard College",
        nameRu: "Коллегия бардов",
        description:
          "Выберите подкласс: Коллегия танца, Коллегия очарования, Коллегия знаний или Коллегия доблести.",
        level: 3,
      },
      {
        name: "Expertise",
        nameRu: "Компетентность",
        description:
          "Выберите два навыка. Ваш бонус мастерства удваивается для этих навыков.",
        level: 3,
      },
    ],
    spellcasting: {
      ability: "charisma" as AbilityName,
      cantripsKnown: [
        2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
      ],
      spellsKnown: [
        4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 15, 15, 16, 18, 19, 19, 20, 22, 22,
        22,
      ],
      spellSlots: [
        [2],
        [3],
        [4, 2],
        [4, 3],
        [4, 3, 2],
        [4, 3, 3],
        [4, 3, 3, 1],
        [4, 3, 3, 2],
        [4, 3, 3, 3, 1],
        [4, 3, 3, 3, 2],
        [4, 3, 3, 3, 2, 1],
        [4, 3, 3, 3, 2, 1],
        [4, 3, 3, 3, 2, 1, 1],
        [4, 3, 3, 3, 2, 1, 1],
        [4, 3, 3, 3, 2, 1, 1, 1],
        [4, 3, 3, 3, 2, 1, 1, 1],
        [4, 3, 3, 3, 2, 1, 1, 1, 1],
        [4, 3, 3, 3, 3, 1, 1, 1, 1],
        [4, 3, 3, 3, 3, 2, 1, 1, 1],
        [4, 3, 3, 3, 3, 2, 2, 1, 1],
      ],
    },
    subclasses: [
      {
        id: "dance",
        name: "College of Dance",
        nameRu: "Коллегия танца",
        description:
          "Барды Коллегии танца знают, что музыка и движение неразделимы.",
        features: [
          {
            name: "Dazzling Footwork",
            nameRu: "Ослепительная работа ног",
            description:
              "Вы можете использовать Ловкость вместо Силы для атак без оружия. Ваша скорость увеличивается на 10 футов.",
            level: 3,
          },
        ],
      },
      {
        id: "glamour",
        name: "College of Glamour",
        nameRu: "Коллегия очарования",
        description: "Барды этой коллегии изучили магию Страны Фей.",
        features: [
          {
            name: "Mantle of Inspiration",
            nameRu: "Мантия вдохновения",
            description:
              "Бонусным действием вы даёте союзникам в пределах 60 футов временные хиты и возможность переместиться.",
            level: 3,
          },
        ],
      },
      {
        id: "lore",
        name: "College of Lore",
        nameRu: "Коллегия знаний",
        description:
          "Барды Коллегии знаний знают кое-что обо всём, собирая знания отовсюду.",
        features: [
          {
            name: "Cutting Words",
            nameRu: "Острые слова",
            description:
              "Реакцией вы вычитаете кость вдохновения из атаки, проверки или урона существа.",
            level: 3,
          },
        ],
      },
      {
        id: "valor",
        name: "College of Valor",
        nameRu: "Коллегия доблести",
        description:
          "Барды Коллегии доблести собирают сказания о великих героях.",
        features: [
          {
            name: "Combat Inspiration",
            nameRu: "Боевое вдохновение",
            description:
              "Кость вдохновения можно добавить к урону оружия или КД.",
            level: 3,
          },
        ],
      },
    ],
    subclassLevel: 3,
    source: "phb2024",
  },
  {
    id: "cleric",
    name: "Cleric",
    nameRu: "Жрец",
    description:
      "Священный заклинатель, наделённый божественной магией. Жрецы — посредники между миром смертных и небесами, способные исцелять раны и поражать нечестивых.",
    hitDie: 8,
    primaryAbility: ["wisdom"],
    savingThrows: ["wisdom", "charisma"],
    armorProficiencies: ["Лёгкие доспехи", "Средние доспехи", "Щиты"],
    weaponProficiencies: ["Простое оружие"],
    skillChoices: ["history", "insight", "medicine", "persuasion", "religion"],
    skillCount: 2,
    features: [
      {
        name: "Spellcasting",
        nameRu: "Использование заклинаний",
        description:
          "Как проводник божественной силы, вы можете накладывать заклинания жреца. Мудрость — ваша базовая характеристика.",
        level: 1,
      },
      {
        name: "Divine Domain",
        nameRu: "Божественный домен",
        description:
          "Выберите домен: Жизни, Света, Обмана или Войны. Домен даёт дополнительные заклинания и способности.",
        level: 1,
      },
      {
        name: "Channel Divinity",
        nameRu: "Божественный канал",
        description:
          "Вы получаете способность направлять божественную энергию. Вы восстанавливаете использования после Короткого или Длинного отдыха.",
        level: 2,
      },
      {
        name: "Turn Undead",
        nameRu: "Изгнание нежити",
        description:
          "Действием вы демонстрируете священный символ. Нежить в пределах 30 футов должна преуспеть в спасброске Мудрости или будет изгнана.",
        level: 2,
      },
    ],
    spellcasting: {
      ability: "wisdom" as AbilityName,
      cantripsKnown: [
        3, 3, 3, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
      ],
      spellSlots: [
        [2],
        [3],
        [4, 2],
        [4, 3],
        [4, 3, 2],
        [4, 3, 3],
        [4, 3, 3, 1],
        [4, 3, 3, 2],
        [4, 3, 3, 3, 1],
        [4, 3, 3, 3, 2],
        [4, 3, 3, 3, 2, 1],
        [4, 3, 3, 3, 2, 1],
        [4, 3, 3, 3, 2, 1, 1],
        [4, 3, 3, 3, 2, 1, 1],
        [4, 3, 3, 3, 2, 1, 1, 1],
        [4, 3, 3, 3, 2, 1, 1, 1],
        [4, 3, 3, 3, 2, 1, 1, 1, 1],
        [4, 3, 3, 3, 3, 1, 1, 1, 1],
        [4, 3, 3, 3, 3, 2, 1, 1, 1],
        [4, 3, 3, 3, 3, 2, 2, 1, 1],
      ],
    },
    subclasses: [
      {
        id: "life",
        name: "Life Domain",
        nameRu: "Домен жизни",
        description: "Боги жизни способствуют жизненной силе и здоровью.",
        features: [
          {
            name: "Disciple of Life",
            nameRu: "Ученик жизни",
            description:
              "Заклинания исцеления восстанавливают дополнительные хиты, равные 2 + уровень заклинания.",
            level: 1,
          },
        ],
      },
      {
        id: "light",
        name: "Light Domain",
        nameRu: "Домен света",
        description: "Боги света несут истину, красоту и очищающий огонь.",
        features: [
          {
            name: "Warding Flare",
            nameRu: "Защитная вспышка",
            description:
              "Реакцией вы создаёте вспышку света, дающую помеху на атаку по вам или союзнику.",
            level: 1,
          },
        ],
      },
      {
        id: "trickery",
        name: "Trickery Domain",
        nameRu: "Домен обмана",
        description: "Боги обмана — покровители плутов и мошенников.",
        features: [
          {
            name: "Blessing of the Trickster",
            nameRu: "Благословение обманщика",
            description:
              "Касанием вы даёте существу преимущество на проверки Скрытности на 1 час.",
            level: 1,
          },
        ],
      },
      {
        id: "war",
        name: "War Domain",
        nameRu: "Домен войны",
        description:
          "Война проявляется во множестве форм — от благородного рыцарства до жестокой резни.",
        features: [
          {
            name: "War Priest",
            nameRu: "Жрец войны",
            description:
              "Когда вы совершаете атаку действием, вы можете совершить ещё одну атаку бонусным действием.",
            level: 1,
          },
        ],
      },
    ],
    subclassLevel: 1,
    source: "phb2024",
  },
  {
    id: "druid",
    name: "Druid",
    nameRu: "Друид",
    description:
      "Жрец Старой Веры, владеющий силами природы и принимающий облики зверей. Друиды черпают магию из самой земли, защищая дикую природу.",
    hitDie: 8,
    primaryAbility: ["wisdom"],
    savingThrows: ["intelligence", "wisdom"],
    armorProficiencies: [
      "Лёгкие доспехи",
      "Средние доспехи (не металл)",
      "Щиты (не металл)",
    ],
    weaponProficiencies: ["Простое оружие"],
    skillChoices: [
      "arcana",
      "animal_handling",
      "insight",
      "medicine",
      "nature",
      "perception",
      "religion",
      "survival",
    ],
    skillCount: 2,
    features: [
      {
        name: "Spellcasting",
        nameRu: "Использование заклинаний",
        description:
          "Черпая божественную сущность природы, вы можете накладывать заклинания друида. Мудрость — ваша базовая характеристика.",
        level: 1,
      },
      {
        name: "Druidic",
        nameRu: "Друидический язык",
        description:
          "Вы знаете друидический язык — тайный язык друидов для общения и оставления скрытых сообщений.",
        level: 1,
      },
      {
        name: "Wild Shape",
        nameRu: "Дикий облик",
        description:
          "Бонусным действием вы принимаете облик зверя, которого видели. Вы можете использовать эту способность дважды между отдыхами.",
        level: 2,
      },
      {
        name: "Druid Circle",
        nameRu: "Круг друидов",
        description:
          "Выберите круг: Круг земли, Круг луны, Круг моря или Круг звёзд.",
        level: 3,
      },
    ],
    spellcasting: {
      ability: "wisdom" as AbilityName,
      cantripsKnown: [
        2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
      ],
      spellSlots: [
        [2],
        [3],
        [4, 2],
        [4, 3],
        [4, 3, 2],
        [4, 3, 3],
        [4, 3, 3, 1],
        [4, 3, 3, 2],
        [4, 3, 3, 3, 1],
        [4, 3, 3, 3, 2],
        [4, 3, 3, 3, 2, 1],
        [4, 3, 3, 3, 2, 1],
        [4, 3, 3, 3, 2, 1, 1],
        [4, 3, 3, 3, 2, 1, 1],
        [4, 3, 3, 3, 2, 1, 1, 1],
        [4, 3, 3, 3, 2, 1, 1, 1],
        [4, 3, 3, 3, 2, 1, 1, 1, 1],
        [4, 3, 3, 3, 3, 1, 1, 1, 1],
        [4, 3, 3, 3, 3, 2, 1, 1, 1],
        [4, 3, 3, 3, 3, 2, 2, 1, 1],
      ],
    },
    subclasses: [
      {
        id: "land",
        name: "Circle of the Land",
        nameRu: "Круг земли",
        description: "Друиды Круга земли хранят древние знания и обряды.",
        features: [
          {
            name: "Natural Recovery",
            nameRu: "Природное восстановление",
            description:
              "Во время Короткого отдыха вы восстанавливаете ячейки заклинаний с общим уровнем до половины уровня друида.",
            level: 2,
          },
        ],
      },
      {
        id: "moon",
        name: "Circle of the Moon",
        nameRu: "Круг луны",
        description:
          "Друиды Круга луны — непревзойдённые мастера Дикого облика.",
        features: [
          {
            name: "Combat Wild Shape",
            nameRu: "Боевой дикий облик",
            description:
              "Вы можете использовать Дикий облик бонусным действием и превращаться в более мощных зверей.",
            level: 2,
          },
        ],
      },
      {
        id: "sea",
        name: "Circle of the Sea",
        nameRu: "Круг моря",
        description: "Друиды Круга моря черпают силу из океана.",
        features: [
          {
            name: "Wrath of the Sea",
            nameRu: "Гнев моря",
            description:
              "Бонусным действием вы можете толкать существо или притягивать его к себе волнами.",
            level: 3,
          },
        ],
      },
      {
        id: "stars",
        name: "Circle of Stars",
        nameRu: "Круг звёзд",
        description: "Друиды Круга звёзд читают судьбу в созвездиях.",
        features: [
          {
            name: "Star Map",
            nameRu: "Звёздная карта",
            description:
              "Вы создаёте звёздную карту — магический фокус для заклинаний друида.",
            level: 2,
          },
        ],
      },
    ],
    subclassLevel: 2,
    source: "phb2024",
  },
  {
    id: "fighter",
    name: "Fighter",
    nameRu: "Воин",
    description:
      "Мастер боевых искусств, владеющий различными видами оружия и доспехов. Воины — непревзойдённые бойцы, чья выносливость и мастерство позволяют им сражаться в самых жестоких битвах.",
    hitDie: 10,
    primaryAbility: ["strength", "dexterity"],
    savingThrows: ["strength", "constitution"],
    armorProficiencies: ["Все доспехи", "Щиты"],
    weaponProficiencies: ["Простое оружие", "Воинское оружие"],
    skillChoices: [
      "acrobatics",
      "animal_handling",
      "athletics",
      "history",
      "insight",
      "intimidation",
      "perception",
      "survival",
    ],
    skillCount: 2,
    features: [
      {
        name: "Fighting Style",
        nameRu: "Боевой стиль",
        description:
          "Выберите боевой стиль: Защита (+1 КД в доспехах), Дуэлянт (+2 урона одной рукой), Великое оружие (перебрось 1-2 на урон) и др.",
        level: 1,
      },
      {
        name: "Second Wind",
        nameRu: "Второе дыхание",
        description:
          "Бонусным действием вы восстанавливаете 1к10 + уровень воина хитов. Раз между отдыхами.",
        level: 1,
      },
      {
        name: "Action Surge",
        nameRu: "Всплеск действий",
        description:
          "В свой ход вы можете совершить одно дополнительное действие. Раз между отдыхами.",
        level: 2,
      },
      {
        name: "Martial Archetype",
        nameRu: "Воинский архетип",
        description:
          "Выберите подкласс: Чемпион, Мастер боевых искусств, Мистический рыцарь или Эхо-рыцарь.",
        level: 3,
      },
      {
        name: "Extra Attack",
        nameRu: "Дополнительная атака",
        description:
          "Вы можете атаковать дважды (трижды на 11 уровне, четырежды на 20), совершая действие Атака.",
        level: 5,
      },
    ],
    subclasses: [
      {
        id: "champion",
        name: "Champion",
        nameRu: "Чемпион",
        description: "Чемпион сосредоточен на развитии сырой физической мощи.",
        features: [
          {
            name: "Improved Critical",
            nameRu: "Улучшенный критический удар",
            description: "Ваши атаки оружием являются критическими при 19-20.",
            level: 3,
          },
        ],
      },
      {
        id: "battle-master",
        name: "Battle Master",
        nameRu: "Мастер боевых искусств",
        description:
          "Вы изучили боевые приёмы, дающие тактическое преимущество.",
        features: [
          {
            name: "Combat Superiority",
            nameRu: "Превосходство в бою",
            description:
              "Вы получаете кости превосходства (к8) и изучаете боевые приёмы.",
            level: 3,
          },
        ],
      },
      {
        id: "eldritch-knight",
        name: "Eldritch Knight",
        nameRu: "Мистический рыцарь",
        description: "Вы сочетаете боевую доблесть с магическим талантом.",
        features: [
          {
            name: "Spellcasting",
            nameRu: "Использование заклинаний",
            description:
              "Вы изучаете заклинания школ Ограждения и Воплощения. Интеллект — ваша базовая характеристика.",
            level: 3,
          },
        ],
      },
      {
        id: "psi-warrior",
        name: "Psi Warrior",
        nameRu: "Пси-воин",
        description:
          "Вы пробудили псионические способности, усиливающие боевые навыки.",
        features: [
          {
            name: "Psionic Power",
            nameRu: "Псионическая сила",
            description:
              "Вы получаете кости псионической энергии и можете использовать их для защиты, телекинеза и усиления ударов.",
            level: 3,
          },
        ],
      },
    ],
    subclassLevel: 3,
    source: "phb2024",
  },
  {
    id: "monk",
    name: "Monk",
    nameRu: "Монах",
    description:
      "Мастер боевых искусств, использующий силу тела для достижения физического совершенства. Монахи канализируют ки — мистическую энергию, текущую сквозь всё живое.",
    hitDie: 8,
    primaryAbility: ["dexterity", "wisdom"],
    savingThrows: ["strength", "dexterity"],
    armorProficiencies: [],
    weaponProficiencies: ["Простое оружие", "Короткий меч"],
    skillChoices: [
      "acrobatics",
      "athletics",
      "history",
      "insight",
      "religion",
      "stealth",
    ],
    skillCount: 2,
    features: [
      {
        name: "Martial Arts",
        nameRu: "Боевые искусства",
        description:
          "Вы можете использовать Ловкость для атак и урона безоружными ударами и оружием монаха. Урон безоружных ударов — 1к6.",
        level: 1,
      },
      {
        name: "Unarmored Defense",
        nameRu: "Защита без доспехов",
        description:
          "Пока вы не носите доспехи, ваш КД = 10 + модификатор Ловкости + модификатор Мудрости.",
        level: 1,
      },
      {
        name: "Ki",
        nameRu: "Ки",
        description:
          "Вы получаете очки ки, равные уровню монаха. Вы можете тратить их на Шквал ударов, Стойкость терпения и Шаг ветра.",
        level: 2,
      },
      {
        name: "Unarmored Movement",
        nameRu: "Движение без доспехов",
        description:
          "Ваша скорость увеличивается на 10 футов (больше на высоких уровнях), пока вы не носите доспехи.",
        level: 2,
      },
      {
        name: "Monastic Tradition",
        nameRu: "Монастырская традиция",
        description:
          "Выберите традицию: Путь открытой ладони, Путь тени, Путь четырёх стихий или Путь милосердия.",
        level: 3,
      },
      {
        name: "Deflect Missiles",
        nameRu: "Отражение снарядов",
        description:
          "Реакцией вы можете снизить урон от снаряда на 1к10 + Ловкость + уровень монаха.",
        level: 3,
      },
    ],
    subclasses: [
      {
        id: "open-hand",
        name: "Way of the Open Hand",
        nameRu: "Путь открытой ладони",
        description:
          "Мастера открытой ладони — непревзойдённые мастера рукопашного боя.",
        features: [
          {
            name: "Open Hand Technique",
            nameRu: "Техника открытой ладони",
            description:
              "При использовании Шквала ударов вы можете толкнуть, сбить или лишить реакции цель.",
            level: 3,
          },
        ],
      },
      {
        id: "shadow",
        name: "Way of Shadow",
        nameRu: "Путь тени",
        description:
          "Монахи Пути тени следуют традиции, ценящей скрытность и хитрость.",
        features: [
          {
            name: "Shadow Arts",
            nameRu: "Искусство тени",
            description:
              "Вы можете использовать ки для накладывания заклинаний Тьма, Бесследное передвижение, Малая иллюзия и Тишина.",
            level: 3,
          },
        ],
      },
      {
        id: "elements",
        name: "Way of the Four Elements",
        nameRu: "Путь четырёх стихий",
        description: "Вы научились направлять стихийные силы.",
        features: [
          {
            name: "Elemental Attunement",
            nameRu: "Настройка на стихии",
            description:
              "Вы изучаете дисциплины, позволяющие управлять огнём, водой, землёй и воздухом.",
            level: 3,
          },
        ],
      },
      {
        id: "mercy",
        name: "Way of Mercy",
        nameRu: "Путь милосердия",
        description:
          "Монахи Пути милосердия научились исцелять и причинять вред.",
        features: [
          {
            name: "Hands of Healing",
            nameRu: "Руки целителя",
            description:
              "Когда вы используете Шквал ударов, вы можете заменить один удар исцелением.",
            level: 3,
          },
        ],
      },
    ],
    subclassLevel: 3,
    source: "phb2024",
  },
  {
    id: "paladin",
    name: "Paladin",
    nameRu: "Паладин",
    description:
      "Святой воин, связанный священной клятвой. Паладины — воители веры, черпающие силу из своих обетов служить справедливости и добродетели.",
    hitDie: 10,
    primaryAbility: ["strength", "charisma"],
    savingThrows: ["wisdom", "charisma"],
    armorProficiencies: ["Все доспехи", "Щиты"],
    weaponProficiencies: ["Простое оружие", "Воинское оружие"],
    skillChoices: [
      "athletics",
      "insight",
      "intimidation",
      "medicine",
      "persuasion",
      "religion",
    ],
    skillCount: 2,
    features: [
      {
        name: "Divine Sense",
        nameRu: "Божественное чувство",
        description:
          "Действием вы обнаруживаете небожителей, исчадий и нежить в пределах 60 футов.",
        level: 1,
      },
      {
        name: "Lay on Hands",
        nameRu: "Наложение рук",
        description:
          "У вас есть запас целительной силы. Касанием вы можете восстановить хиты (5 × уровень паладина) или излечить болезнь/яд.",
        level: 1,
      },
      {
        name: "Spellcasting",
        nameRu: "Использование заклинаний",
        description:
          "Вы научились черпать божественную магию через молитву. Харизма — ваша базовая характеристика.",
        level: 2,
      },
      {
        name: "Divine Smite",
        nameRu: "Божественная кара",
        description:
          "При попадании оружием вы можете потратить ячейку заклинания для нанесения дополнительного урона излучением.",
        level: 2,
      },
      {
        name: "Sacred Oath",
        nameRu: "Священная клятва",
        description:
          "Выберите клятву: Клятва преданности, Клятва мести, Клятва древних или Клятва славы.",
        level: 3,
      },
    ],
    spellcasting: {
      ability: "charisma" as AbilityName,
      cantripsKnown: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      ],
      spellSlots: [
        [],
        [2],
        [3],
        [3],
        [4, 2],
        [4, 2],
        [4, 3],
        [4, 3],
        [4, 3, 2],
        [4, 3, 2],
        [4, 3, 3],
        [4, 3, 3],
        [4, 3, 3, 1],
        [4, 3, 3, 1],
        [4, 3, 3, 2],
        [4, 3, 3, 2],
        [4, 3, 3, 3, 1],
        [4, 3, 3, 3, 1],
        [4, 3, 3, 3, 2],
        [4, 3, 3, 3, 2],
      ],
    },
    subclasses: [
      {
        id: "devotion",
        name: "Oath of Devotion",
        nameRu: "Клятва преданности",
        description: "Идеалы справедливости, добродетели и порядка.",
        features: [
          {
            name: "Sacred Weapon",
            nameRu: "Священное оружие",
            description:
              "Действием вы можете наполнить оружие позитивной энергией, добавляя Харизму к атакам.",
            level: 3,
          },
        ],
      },
      {
        id: "vengeance",
        name: "Oath of Vengeance",
        nameRu: "Клятва мести",
        description:
          "Паладин мести полностью посвящает себя наказанию тех, кто совершил ужасные грехи.",
        features: [
          {
            name: "Vow of Enmity",
            nameRu: "Обет вражды",
            description:
              "Бонусным действием вы получаете преимущество на атаки против выбранного существа.",
            level: 3,
          },
        ],
      },
      {
        id: "ancients",
        name: "Oath of the Ancients",
        nameRu: "Клятва древних",
        description: "Паладин древних защищает свет и жизнь в мире.",
        features: [
          {
            name: "Nature's Wrath",
            nameRu: "Гнев природы",
            description:
              "Божественным каналом вы можете опутать врага магическими лианами.",
            level: 3,
          },
        ],
      },
      {
        id: "glory",
        name: "Oath of Glory",
        nameRu: "Клятва славы",
        description: "Паладин славы стремится к величию через подвиги.",
        features: [
          {
            name: "Peerless Athlete",
            nameRu: "Непревзойдённый атлет",
            description:
              "Божественным каналом вы усиливаете атлетические способности.",
            level: 3,
          },
        ],
      },
    ],
    subclassLevel: 3,
    source: "phb2024",
  },
  {
    id: "ranger",
    name: "Ranger",
    nameRu: "Следопыт",
    description:
      "Воин дикой природы, использующий боевое мастерство и магию природы. Следопыты — охотники и разведчики, знающие тайные тропы и повадки зверей.",
    hitDie: 10,
    primaryAbility: ["dexterity", "wisdom"],
    savingThrows: ["strength", "dexterity"],
    armorProficiencies: ["Лёгкие доспехи", "Средние доспехи", "Щиты"],
    weaponProficiencies: ["Простое оружие", "Воинское оружие"],
    skillChoices: [
      "animal_handling",
      "athletics",
      "insight",
      "investigation",
      "nature",
      "perception",
      "stealth",
      "survival",
    ],
    skillCount: 3,
    features: [
      {
        name: "Favored Enemy",
        nameRu: "Избранный враг",
        description:
          "Вы наносите дополнительно 1к8 урона одной цели раз в ход, когда атакуете оружием и попадаете.",
        level: 1,
      },
      {
        name: "Spellcasting",
        nameRu: "Использование заклинаний",
        description:
          "Вы научились использовать магическую суть природы. Мудрость — ваша базовая характеристика.",
        level: 1,
      },
      {
        name: "Deft Explorer",
        nameRu: "Искусный исследователь",
        description:
          "Вы получаете Компетентность в одном навыке. Ваша скорость передвижения увеличивается.",
        level: 1,
      },
      {
        name: "Fighting Style",
        nameRu: "Боевой стиль",
        description:
          "Выберите боевой стиль: Стрельба (+2 к атакам дальнобойным оружием), Защита, Дуэлянт и др.",
        level: 2,
      },
      {
        name: "Ranger Conclave",
        nameRu: "Конклав следопытов",
        description:
          "Выберите подкласс: Охотник, Странник тьмы, Повелитель зверей или Охотник за чудовищами.",
        level: 3,
      },
    ],
    spellcasting: {
      ability: "wisdom" as AbilityName,
      cantripsKnown: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      ],
      spellsKnown: [
        2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 11,
      ],
      spellSlots: [
        [2],
        [2],
        [3],
        [3],
        [4, 2],
        [4, 2],
        [4, 3],
        [4, 3],
        [4, 3, 2],
        [4, 3, 2],
        [4, 3, 3],
        [4, 3, 3],
        [4, 3, 3, 1],
        [4, 3, 3, 1],
        [4, 3, 3, 2],
        [4, 3, 3, 2],
        [4, 3, 3, 3, 1],
        [4, 3, 3, 3, 1],
        [4, 3, 3, 3, 2],
        [4, 3, 3, 3, 2],
      ],
    },
    subclasses: [
      {
        id: "hunter",
        name: "Hunter",
        nameRu: "Охотник",
        description:
          "Охотник специализируется на уничтожении определённых типов врагов.",
        features: [
          {
            name: "Hunter's Prey",
            nameRu: "Добыча охотника",
            description:
              "Выберите особенность: Убийца колоссов, Убийца великанов или Убийца орды.",
            level: 3,
          },
        ],
      },
      {
        id: "gloom-stalker",
        name: "Gloom Stalker",
        nameRu: "Странник тьмы",
        description: "Вы научились охотиться в самых тёмных местах.",
        features: [
          {
            name: "Dread Ambusher",
            nameRu: "Ужасающий охотник",
            description:
              "В первый раунд боя вы получаете бонус к инициативе и дополнительную атаку с дополнительным уроном.",
            level: 3,
          },
        ],
      },
      {
        id: "beast-master",
        name: "Beast Master",
        nameRu: "Повелитель зверей",
        description: "Вы заключаете священную связь со зверем-компаньоном.",
        features: [
          {
            name: "Primal Companion",
            nameRu: "Первобытный компаньон",
            description:
              "Вы получаете зверя-компаньона, который сражается рядом с вами.",
            level: 3,
          },
        ],
      },
      {
        id: "fey-wanderer",
        name: "Fey Wanderer",
        nameRu: "Странник Страны Фей",
        description: "Вы бродили по Стране Фей и получили магические дары.",
        features: [
          {
            name: "Dreadful Strikes",
            nameRu: "Ужасающие удары",
            description:
              "Ваши атаки оружием наносят дополнительный психический урон.",
            level: 3,
          },
        ],
      },
    ],
    subclassLevel: 3,
    source: "phb2024",
  },
  {
    id: "rogue",
    name: "Rogue",
    nameRu: "Плут",
    description:
      "Мошенник, использующий хитрость и скрытность для преодоления препятствий. Плуты полагаются на навыки, ловкость и уязвимые места врагов.",
    hitDie: 8,
    primaryAbility: ["dexterity"],
    savingThrows: ["dexterity", "intelligence"],
    armorProficiencies: ["Лёгкие доспехи"],
    weaponProficiencies: [
      "Простое оружие",
      "Ручной арбалет",
      "Длинный меч",
      "Рапира",
      "Короткий меч",
    ],
    skillChoices: [
      "acrobatics",
      "athletics",
      "deception",
      "insight",
      "intimidation",
      "investigation",
      "perception",
      "performance",
      "persuasion",
      "sleight_of_hand",
      "stealth",
    ],
    skillCount: 4,
    features: [
      {
        name: "Expertise",
        nameRu: "Компетентность",
        description:
          "Выберите два навыка или воровские инструменты. Ваш бонус мастерства удваивается для них.",
        level: 1,
      },
      {
        name: "Sneak Attack",
        nameRu: "Скрытая атака",
        description:
          "Раз в ход вы можете нанести дополнительно 1к6 урона, если атакуете с преимуществом или рядом с целью есть ваш союзник.",
        level: 1,
      },
      {
        name: "Thieves' Cant",
        nameRu: "Воровской жаргон",
        description:
          "Вы знаете тайный язык воров, позволяющий скрывать сообщения в обычной речи.",
        level: 1,
      },
      {
        name: "Cunning Action",
        nameRu: "Хитрое действие",
        description:
          "Бонусным действием вы можете совершить Рывок, Отход или Засаду.",
        level: 2,
      },
      {
        name: "Roguish Archetype",
        nameRu: "Архетип плута",
        description:
          "Выберите архетип: Вор, Убийца, Мистический ловкач или Инквизитор.",
        level: 3,
      },
      {
        name: "Uncanny Dodge",
        nameRu: "Невероятное уклонение",
        description: "Реакцией вы уменьшаете урон от атаки вдвое.",
        level: 5,
      },
    ],
    subclasses: [
      {
        id: "thief",
        name: "Thief",
        nameRu: "Вор",
        description: "Вы оттачиваете навыки в краже и проникновении.",
        features: [
          {
            name: "Fast Hands",
            nameRu: "Быстрые руки",
            description:
              "Бонусным действием вы можете использовать воровские инструменты или совершать Ловкость рук.",
            level: 3,
          },
        ],
      },
      {
        id: "assassin",
        name: "Assassin",
        nameRu: "Убийца",
        description:
          "Вы сосредоточены на смертоносных ударах и искусстве маскировки.",
        features: [
          {
            name: "Assassinate",
            nameRu: "Убийство",
            description:
              "Вы совершаете с преимуществом атаки против существ, которые ещё не действовали. Попадание по застигнутому врасплох — автокрит.",
            level: 3,
          },
        ],
      },
      {
        id: "arcane-trickster",
        name: "Arcane Trickster",
        nameRu: "Мистический ловкач",
        description: "Вы усиливаете воровские навыки магией.",
        features: [
          {
            name: "Spellcasting",
            nameRu: "Использование заклинаний",
            description:
              "Вы изучаете заклинания школ Иллюзии и Очарования. Интеллект — ваша базовая характеристика.",
            level: 3,
          },
        ],
      },
      {
        id: "soulknife",
        name: "Soulknife",
        nameRu: "Клинок души",
        description: "Вы проявили псионические способности.",
        features: [
          {
            name: "Psionic Power",
            nameRu: "Псионическая сила",
            description:
              "Вы получаете кости псионической энергии и можете создавать психические клинки.",
            level: 3,
          },
        ],
      },
    ],
    subclassLevel: 3,
    source: "phb2024",
  },
  {
    id: "sorcerer",
    name: "Sorcerer",
    nameRu: "Чародей",
    description:
      "Заклинатель, черпающий врождённую магию из дара или родословной. Магия чародеев течёт в их крови — буквально или метафорически.",
    hitDie: 6,
    primaryAbility: ["charisma"],
    savingThrows: ["constitution", "charisma"],
    armorProficiencies: [],
    weaponProficiencies: [
      "Кинжалы",
      "Дротики",
      "Пращи",
      "Боевые посохи",
      "Лёгкие арбалеты",
    ],
    skillChoices: [
      "arcana",
      "deception",
      "insight",
      "intimidation",
      "persuasion",
      "religion",
    ],
    skillCount: 2,
    features: [
      {
        name: "Spellcasting",
        nameRu: "Использование заклинаний",
        description:
          "Врождённая магия позволяет вам творить заклинания. Харизма — ваша базовая характеристика.",
        level: 1,
      },
      {
        name: "Sorcerous Origin",
        nameRu: "Происхождение чародея",
        description:
          "Выберите источник магии: Дикая магия, Драконья родословная, Часовая магия или Аберрантный разум.",
        level: 1,
      },
      {
        name: "Font of Magic",
        nameRu: "Источник магии",
        description:
          "Вы получаете очки чародейства (равные уровню). Вы можете превращать их в ячейки заклинаний и наоборот.",
        level: 2,
      },
      {
        name: "Metamagic",
        nameRu: "Метамагия",
        description:
          "Вы изучаете способы изменять заклинания, тратя очки чародейства: Усиленное, Расширенное, Дальнобойное и др.",
        level: 3,
      },
    ],
    spellcasting: {
      ability: "charisma" as AbilityName,
      cantripsKnown: [
        4, 4, 4, 5, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6,
      ],
      spellsKnown: [
        2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 12, 13, 13, 14, 14, 15, 15, 15, 15,
      ],
      spellSlots: [
        [2],
        [3],
        [4, 2],
        [4, 3],
        [4, 3, 2],
        [4, 3, 3],
        [4, 3, 3, 1],
        [4, 3, 3, 2],
        [4, 3, 3, 3, 1],
        [4, 3, 3, 3, 2],
        [4, 3, 3, 3, 2, 1],
        [4, 3, 3, 3, 2, 1],
        [4, 3, 3, 3, 2, 1, 1],
        [4, 3, 3, 3, 2, 1, 1],
        [4, 3, 3, 3, 2, 1, 1, 1],
        [4, 3, 3, 3, 2, 1, 1, 1],
        [4, 3, 3, 3, 2, 1, 1, 1, 1],
        [4, 3, 3, 3, 3, 1, 1, 1, 1],
        [4, 3, 3, 3, 3, 2, 1, 1, 1],
        [4, 3, 3, 3, 3, 2, 2, 1, 1],
      ],
    },
    subclasses: [
      {
        id: "wild-magic",
        name: "Wild Magic",
        nameRu: "Дикая магия",
        description: "Ваша магия происходит из сил дикого хаоса.",
        features: [
          {
            name: "Wild Magic Surge",
            nameRu: "Всплеск дикой магии",
            description:
              "При накладывании заклинания 1+ уровня DM может попросить бросок к20. При 1 бросьте по таблице Всплеска дикой магии.",
            level: 1,
          },
        ],
      },
      {
        id: "draconic",
        name: "Draconic Bloodline",
        nameRu: "Драконья родословная",
        description: "Где-то в вашей родословной есть дракон.",
        features: [
          {
            name: "Dragon Ancestor",
            nameRu: "Предок-дракон",
            description:
              "Выберите тип дракона. Вы получаете сопротивление соответствующему урону.",
            level: 1,
          },
        ],
      },
      {
        id: "clockwork",
        name: "Clockwork Soul",
        nameRu: "Часовая душа",
        description: "Сила космического порядка течёт в вас.",
        features: [
          {
            name: "Restore Balance",
            nameRu: "Восстановление баланса",
            description:
              "Реакцией вы можете отменить преимущество или помеху на любом броске к20 в пределах 60 футов.",
            level: 1,
          },
        ],
      },
      {
        id: "aberrant",
        name: "Aberrant Mind",
        nameRu: "Аберрантный разум",
        description: "Чуждая сила пробудила псионическую силу внутри вас.",
        features: [
          {
            name: "Psionic Spells",
            nameRu: "Псионические заклинания",
            description:
              "Вы изучаете дополнительные заклинания и можете накладывать их без вербальных/соматических компонентов.",
            level: 1,
          },
        ],
      },
    ],
    subclassLevel: 1,
    source: "phb2024",
  },
  {
    id: "warlock",
    name: "Warlock",
    nameRu: "Колдун",
    description:
      "Обладатель магии, дарованной через пакт с потусторонней сущностью. Колдуны получают силу от могущественных покровителей в обмен на услуги.",
    hitDie: 8,
    primaryAbility: ["charisma"],
    savingThrows: ["wisdom", "charisma"],
    armorProficiencies: ["Лёгкие доспехи"],
    weaponProficiencies: ["Простое оружие"],
    skillChoices: [
      "arcana",
      "deception",
      "history",
      "intimidation",
      "investigation",
      "nature",
      "religion",
    ],
    skillCount: 2,
    features: [
      {
        name: "Otherworldly Patron",
        nameRu: "Потусторонний покровитель",
        description:
          "Выберите покровителя: Архифея, Исчадие, Великий Древний или Небожитель. Покровитель даёт особые способности и заклинания.",
        level: 1,
      },
      {
        name: "Pact Magic",
        nameRu: "Магия пакта",
        description:
          "Ваш покровитель дарует магию. Ячейки заклинаний восстанавливаются после Короткого отдыха. Харизма — базовая характеристика.",
        level: 1,
      },
      {
        name: "Eldritch Invocations",
        nameRu: "Таинственные воззвания",
        description:
          "Вы изучаете фрагменты запретного знания, дающие постоянные магические способности.",
        level: 2,
      },
      {
        name: "Pact Boon",
        nameRu: "Дар пакта",
        description:
          "Выберите дар: Пакт цепи (фамильяр), Пакт клинка (оружие), Пакт гримуара (книга теней) или Пакт талисмана.",
        level: 3,
      },
    ],
    spellcasting: {
      ability: "charisma" as AbilityName,
      cantripsKnown: [
        2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
      ],
      spellsKnown: [
        2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15,
      ],
      spellSlots: [
        [1],
        [2],
        [2],
        [2],
        [2],
        [2],
        [2],
        [2],
        [2],
        [2],
        [3],
        [3],
        [3],
        [3],
        [3],
        [3],
        [4],
        [4],
        [4],
        [4],
      ],
    },
    subclasses: [
      {
        id: "archfey",
        name: "Archfey Patron",
        nameRu: "Архифея",
        description: "Ваш покровитель — повелитель Страны Фей.",
        features: [
          {
            name: "Fey Presence",
            nameRu: "Присутствие феи",
            description:
              "Действием вы можете очаровать или испугать существ в 10-футовом кубе.",
            level: 1,
          },
        ],
      },
      {
        id: "fiend",
        name: "Fiend Patron",
        nameRu: "Исчадие",
        description: "Вы заключили сделку с существом из Нижних Планов.",
        features: [
          {
            name: "Dark One's Blessing",
            nameRu: "Благословение тёмного",
            description:
              "Когда вы снижаете враждебное существо до 0 хитов, вы получаете временные хиты.",
            level: 1,
          },
        ],
      },
      {
        id: "great-old-one",
        name: "Great Old One",
        nameRu: "Великий Древний",
        description:
          "Ваш покровитель — мистическая сущность из дальних пределов реальности.",
        features: [
          {
            name: "Awakened Mind",
            nameRu: "Пробуждённый разум",
            description:
              "Вы можете телепатически общаться с существами в пределах 30 футов.",
            level: 1,
          },
        ],
      },
      {
        id: "celestial",
        name: "Celestial Patron",
        nameRu: "Небожитель",
        description: "Ваш покровитель — существо из Верхних Планов.",
        features: [
          {
            name: "Healing Light",
            nameRu: "Исцеляющий свет",
            description:
              "Вы получаете запас костей исцеления (к6), которыми можете лечить существ.",
            level: 1,
          },
        ],
      },
    ],
    subclassLevel: 1,
    source: "phb2024",
  },
  {
    id: "wizard",
    name: "Wizard",
    nameRu: "Волшебник",
    description:
      "Учёный маг, использующий силу, полученную через изучение структуры реальности. Волшебники — мастера арканы, записывающие заклинания в книги и изучающие тайны мироздания.",
    hitDie: 6,
    primaryAbility: ["intelligence"],
    savingThrows: ["intelligence", "wisdom"],
    armorProficiencies: [],
    weaponProficiencies: [
      "Кинжалы",
      "Дротики",
      "Пращи",
      "Боевые посохи",
      "Лёгкие арбалеты",
    ],
    skillChoices: [
      "arcana",
      "history",
      "insight",
      "investigation",
      "medicine",
      "religion",
    ],
    skillCount: 2,
    features: [
      {
        name: "Spellcasting",
        nameRu: "Использование заклинаний",
        description:
          "Как изучающий арканную магию, вы владеете книгой заклинаний. Интеллект — ваша базовая характеристика.",
        level: 1,
      },
      {
        name: "Arcane Recovery",
        nameRu: "Арканное восстановление",
        description:
          "Раз в день во время Короткого отдыха вы можете восстановить ячейки заклинаний с общим уровнем до половины уровня волшебника.",
        level: 1,
      },
      {
        name: "Arcane Tradition",
        nameRu: "Арканная традиция",
        description:
          "Выберите школу магии: Ограждение, Воплощение, Иллюзия или Некромантия. Школа даёт бонусы к соответствующим заклинаниям.",
        level: 2,
      },
    ],
    spellcasting: {
      ability: "intelligence" as AbilityName,
      cantripsKnown: [
        3, 3, 3, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
      ],
      spellSlots: [
        [2],
        [3],
        [4, 2],
        [4, 3],
        [4, 3, 2],
        [4, 3, 3],
        [4, 3, 3, 1],
        [4, 3, 3, 2],
        [4, 3, 3, 3, 1],
        [4, 3, 3, 3, 2],
        [4, 3, 3, 3, 2, 1],
        [4, 3, 3, 3, 2, 1],
        [4, 3, 3, 3, 2, 1, 1],
        [4, 3, 3, 3, 2, 1, 1],
        [4, 3, 3, 3, 2, 1, 1, 1],
        [4, 3, 3, 3, 2, 1, 1, 1],
        [4, 3, 3, 3, 2, 1, 1, 1, 1],
        [4, 3, 3, 3, 3, 1, 1, 1, 1],
        [4, 3, 3, 3, 3, 2, 1, 1, 1],
        [4, 3, 3, 3, 3, 2, 2, 1, 1],
      ],
    },
    subclasses: [
      {
        id: "abjuration",
        name: "School of Abjuration",
        nameRu: "Школа ограждения",
        description: "Вы специализируетесь на защитной магии.",
        features: [
          {
            name: "Arcane Ward",
            nameRu: "Арканный щит",
            description:
              "Когда вы накладываете заклинание ограждения 1+ уровня, вы создаёте магический щит с хитами.",
            level: 2,
          },
        ],
      },
      {
        id: "evocation",
        name: "School of Evocation",
        nameRu: "Школа воплощения",
        description:
          "Вы сосредоточены на заклинаниях, создающих мощные стихийные эффекты.",
        features: [
          {
            name: "Sculpt Spells",
            nameRu: "Скульптурные заклинания",
            description:
              "Вы можете создавать безопасные карманы внутри ваших заклинаний области для союзников.",
            level: 2,
          },
        ],
      },
      {
        id: "illusion",
        name: "School of Illusion",
        nameRu: "Школа иллюзий",
        description: "Вы изучаете магию обмана и теней.",
        features: [
          {
            name: "Improved Minor Illusion",
            nameRu: "Улучшенная малая иллюзия",
            description:
              "Заговор Малая иллюзия может создавать и звук, и образ одновременно.",
            level: 2,
          },
        ],
      },
      {
        id: "necromancy",
        name: "School of Necromancy",
        nameRu: "Школа некромантии",
        description: "Вы изучаете магию жизни и смерти.",
        features: [
          {
            name: "Grim Harvest",
            nameRu: "Мрачная жатва",
            description:
              "Когда вы убиваете существо заклинанием 1+ уровня, вы восстанавливаете хиты.",
            level: 2,
          },
        ],
      },
    ],
    subclassLevel: 2,
    source: "phb2024",
  },
];

export function getClassById(id: string): CharacterClass | undefined {
  return phb2024Classes.find((cls) => cls.id === id);
}

export function getAllClasses(): CharacterClass[] {
  return phb2024Classes;
}
