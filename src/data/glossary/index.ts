// Глоссарий D&D 5e (2024)

// Оружие
export const weapons = {
  simple: {
    melee: [
      {
        name: "Булава",
        nameEn: "Club",
        damage: "1к4",
        damageType: "дробящий",
        weight: 2,
        cost: "1 сс",
        properties: ["Лёгкое"],
      },
      {
        name: "Кинжал",
        nameEn: "Dagger",
        damage: "1к4",
        damageType: "колющий",
        weight: 1,
        cost: "2 зм",
        properties: ["Лёгкое", "Метательное (20/60)", "Фехтовальное"],
      },
      {
        name: "Боевой посох",
        nameEn: "Quarterstaff",
        damage: "1к6",
        damageType: "дробящий",
        weight: 4,
        cost: "2 сс",
        properties: ["Универсальное (1к8)"],
      },
      {
        name: "Серп",
        nameEn: "Sickle",
        damage: "1к4",
        damageType: "рубящий",
        weight: 2,
        cost: "1 зм",
        properties: ["Лёгкое"],
      },
      {
        name: "Копьё",
        nameEn: "Spear",
        damage: "1к6",
        damageType: "колющий",
        weight: 3,
        cost: "1 зм",
        properties: ["Метательное (20/60)", "Универсальное (1к8)"],
      },
      {
        name: "Лёгкий молот",
        nameEn: "Light Hammer",
        damage: "1к4",
        damageType: "дробящий",
        weight: 2,
        cost: "2 зм",
        properties: ["Лёгкое", "Метательное (20/60)"],
      },
      {
        name: "Дубинка",
        nameEn: "Greatclub",
        damage: "1к8",
        damageType: "дробящий",
        weight: 10,
        cost: "2 сс",
        properties: ["Двуручное"],
      },
      {
        name: "Ручной топор",
        nameEn: "Handaxe",
        damage: "1к6",
        damageType: "рубящий",
        weight: 2,
        cost: "5 зм",
        properties: ["Лёгкое", "Метательное (20/60)"],
      },
      {
        name: "Метательное копьё",
        nameEn: "Javelin",
        damage: "1к6",
        damageType: "колющий",
        weight: 2,
        cost: "5 сс",
        properties: ["Метательное (30/120)"],
      },
      {
        name: "Палица",
        nameEn: "Mace",
        damage: "1к6",
        damageType: "дробящий",
        weight: 4,
        cost: "5 зм",
        properties: [],
      },
    ],
    ranged: [
      {
        name: "Лёгкий арбалет",
        nameEn: "Light Crossbow",
        damage: "1к8",
        damageType: "колющий",
        weight: 5,
        cost: "25 зм",
        properties: ["Боеприпас (80/320)", "Перезарядка", "Двуручное"],
      },
      {
        name: "Дротик",
        nameEn: "Dart",
        damage: "1к4",
        damageType: "колющий",
        weight: 0.25,
        cost: "5 мс",
        properties: ["Метательное (20/60)", "Фехтовальное"],
      },
      {
        name: "Короткий лук",
        nameEn: "Shortbow",
        damage: "1к6",
        damageType: "колющий",
        weight: 2,
        cost: "25 зм",
        properties: ["Боеприпас (80/320)", "Двуручное"],
      },
      {
        name: "Праща",
        nameEn: "Sling",
        damage: "1к4",
        damageType: "дробящий",
        weight: 0,
        cost: "1 сс",
        properties: ["Боеприпас (30/120)"],
      },
    ],
  },
  martial: {
    melee: [
      {
        name: "Боевой топор",
        nameEn: "Battleaxe",
        damage: "1к8",
        damageType: "рубящий",
        weight: 4,
        cost: "10 зм",
        properties: ["Универсальное (1к10)"],
      },
      {
        name: "Длинный меч",
        nameEn: "Longsword",
        damage: "1к8",
        damageType: "рубящий",
        weight: 3,
        cost: "15 зм",
        properties: ["Универсальное (1к10)"],
      },
      {
        name: "Рапира",
        nameEn: "Rapier",
        damage: "1к8",
        damageType: "колющий",
        weight: 2,
        cost: "25 зм",
        properties: ["Фехтовальное"],
      },
      {
        name: "Короткий меч",
        nameEn: "Shortsword",
        damage: "1к6",
        damageType: "колющий",
        weight: 2,
        cost: "10 зм",
        properties: ["Лёгкое", "Фехтовальное"],
      },
      {
        name: "Двуручный меч",
        nameEn: "Greatsword",
        damage: "2к6",
        damageType: "рубящий",
        weight: 6,
        cost: "50 зм",
        properties: ["Тяжёлое", "Двуручное"],
      },
      {
        name: "Секира",
        nameEn: "Greataxe",
        damage: "1к12",
        damageType: "рубящий",
        weight: 7,
        cost: "30 зм",
        properties: ["Тяжёлое", "Двуручное"],
      },
      {
        name: "Молот",
        nameEn: "Warhammer",
        damage: "1к8",
        damageType: "дробящий",
        weight: 2,
        cost: "15 зм",
        properties: ["Универсальное (1к10)"],
      },
      {
        name: "Моргенштерн",
        nameEn: "Morningstar",
        damage: "1к8",
        damageType: "колющий",
        weight: 4,
        cost: "15 зм",
        properties: [],
      },
      {
        name: "Глефа",
        nameEn: "Glaive",
        damage: "1к10",
        damageType: "рубящий",
        weight: 6,
        cost: "20 зм",
        properties: ["Тяжёлое", "Двуручное", "Досягаемость"],
      },
      {
        name: "Алебарда",
        nameEn: "Halberd",
        damage: "1к10",
        damageType: "рубящий",
        weight: 6,
        cost: "20 зм",
        properties: ["Тяжёлое", "Двуручное", "Досягаемость"],
      },
    ],
    ranged: [
      {
        name: "Длинный лук",
        nameEn: "Longbow",
        damage: "1к8",
        damageType: "колющий",
        weight: 2,
        cost: "50 зм",
        properties: ["Боеприпас (150/600)", "Тяжёлое", "Двуручное"],
      },
      {
        name: "Тяжёлый арбалет",
        nameEn: "Heavy Crossbow",
        damage: "1к10",
        damageType: "колющий",
        weight: 18,
        cost: "50 зм",
        properties: [
          "Боеприпас (100/400)",
          "Тяжёлое",
          "Перезарядка",
          "Двуручное",
        ],
      },
      {
        name: "Ручной арбалет",
        nameEn: "Hand Crossbow",
        damage: "1к6",
        damageType: "колющий",
        weight: 3,
        cost: "75 зм",
        properties: ["Боеприпас (30/120)", "Лёгкое", "Перезарядка"],
      },
    ],
  },
};

// Доспехи
export const armor = {
  light: [
    {
      name: "Стёганый",
      nameEn: "Padded",
      ac: 11,
      maxDex: null,
      stealthDisadvantage: true,
      weight: 8,
      cost: "5 зм",
    },
    {
      name: "Кожаный",
      nameEn: "Leather",
      ac: 11,
      maxDex: null,
      stealthDisadvantage: false,
      weight: 10,
      cost: "10 зм",
    },
    {
      name: "Проклёпанный кожаный",
      nameEn: "Studded Leather",
      ac: 12,
      maxDex: null,
      stealthDisadvantage: false,
      weight: 13,
      cost: "45 зм",
    },
  ],
  medium: [
    {
      name: "Шкурный",
      nameEn: "Hide",
      ac: 12,
      maxDex: 2,
      stealthDisadvantage: false,
      weight: 12,
      cost: "10 зм",
    },
    {
      name: "Кольчужная рубаха",
      nameEn: "Chain Shirt",
      ac: 13,
      maxDex: 2,
      stealthDisadvantage: false,
      weight: 20,
      cost: "50 зм",
    },
    {
      name: "Чешуйчатый",
      nameEn: "Scale Mail",
      ac: 14,
      maxDex: 2,
      stealthDisadvantage: true,
      weight: 45,
      cost: "50 зм",
    },
    {
      name: "Кираса",
      nameEn: "Breastplate",
      ac: 14,
      maxDex: 2,
      stealthDisadvantage: false,
      weight: 20,
      cost: "400 зм",
    },
    {
      name: "Полулаты",
      nameEn: "Half Plate",
      ac: 15,
      maxDex: 2,
      stealthDisadvantage: true,
      weight: 40,
      cost: "750 зм",
    },
  ],
  heavy: [
    {
      name: "Кольчатый",
      nameEn: "Ring Mail",
      ac: 14,
      maxDex: 0,
      stealthDisadvantage: true,
      weight: 40,
      cost: "30 зм",
      strRequired: 0,
    },
    {
      name: "Кольчуга",
      nameEn: "Chain Mail",
      ac: 16,
      maxDex: 0,
      stealthDisadvantage: true,
      weight: 55,
      cost: "75 зм",
      strRequired: 13,
    },
    {
      name: "Наборный",
      nameEn: "Splint",
      ac: 17,
      maxDex: 0,
      stealthDisadvantage: true,
      weight: 60,
      cost: "200 зм",
      strRequired: 15,
    },
    {
      name: "Латный",
      nameEn: "Plate",
      ac: 18,
      maxDex: 0,
      stealthDisadvantage: true,
      weight: 65,
      cost: "1500 зм",
      strRequired: 15,
    },
  ],
  shield: { name: "Щит", nameEn: "Shield", ac: 2, weight: 6, cost: "10 зм" },
};

// Состояния
export const conditions = [
  {
    name: "Бессознательный",
    nameEn: "Unconscious",
    description:
      "Существо лежит ничком, не может перемещаться и говорить, не осознаёт своё окружение. Роняет всё, что держало. Автоматически проваливает спасброски Силы и Ловкости. Все атаки по нему совершаются с преимуществом. Атака ближнего боя с расстояния 5 футов — автокрит.",
  },
  {
    name: "Глухой",
    nameEn: "Deafened",
    description:
      "Существо не слышит и автоматически проваливает все проверки характеристик, требующие слуха.",
  },
  {
    name: "Замедленный",
    nameEn: "Slowed",
    description:
      "Скорость существа уменьшена вдвое. Оно получает штраф −2 к КД и спасброскам Ловкости. Не может совершать реакции. В свой ход может использовать либо действие, либо бонусное действие, но не оба.",
  },
  {
    name: "Испуганный",
    nameEn: "Frightened",
    description:
      "Существо совершает с помехой проверки характеристик и броски атаки, пока источник страха находится в поле его зрения. Существо не может добровольно приближаться к источнику своего страха.",
  },
  {
    name: "Истощение",
    nameEn: "Exhaustion",
    description:
      "Уровни истощения накапливаются. 1: помеха проверкам. 2: скорость вдвое. 3: помеха атакам и спасброскам. 4: максимум хитов вдвое. 5: скорость 0. 6: смерть.",
  },
  {
    name: "Невидимый",
    nameEn: "Invisible",
    description:
      "Существо невозможно увидеть без магии или особого чувства. Считается сильно заслонённым. Местоположение можно определить по шуму. Атаки по невидимому — с помехой. Атаки невидимого — с преимуществом.",
  },
  {
    name: "Недееспособный",
    nameEn: "Incapacitated",
    description: "Существо не может совершать действия и реакции.",
  },
  {
    name: "Окаменевший",
    nameEn: "Petrified",
    description:
      "Существо превращено в камень. Вес увеличен в 10 раз. Не стареет. Недееспособно, не осознаёт окружение. Проваливает спасброски Силы и Ловкости. Сопротивление всем видам урона. Иммунитет к яду и болезням.",
  },
  {
    name: "Ослеплённый",
    nameEn: "Blinded",
    description:
      "Существо не видит и автоматически проваливает все проверки характеристик, требующие зрения. Атаки по нему — с преимуществом, его атаки — с помехой.",
  },
  {
    name: "Отравленный",
    nameEn: "Poisoned",
    description:
      "Существо совершает с помехой броски атаки и проверки характеристик.",
  },
  {
    name: "Очарованный",
    nameEn: "Charmed",
    description:
      "Существо не может атаковать очаровавшего или делать его целью вредоносных способностей или магических эффектов. Очаровавший совершает с преимуществом проверки для социального взаимодействия с существом.",
  },
  {
    name: "Парализованный",
    nameEn: "Paralyzed",
    description:
      "Существо недееспособно и не может двигаться или говорить. Автоматически проваливает спасброски Силы и Ловкости. Атаки по нему — с преимуществом. Ближняя атака с 5 футов — автокрит.",
  },
  {
    name: "Опутанный",
    nameEn: "Restrained",
    description:
      "Скорость становится 0. Атаки по нему — с преимуществом. Его атаки и спасброски Ловкости — с помехой.",
  },
  {
    name: "Ошеломлённый",
    nameEn: "Stunned",
    description:
      "Существо недееспособно, не может двигаться и может говорить только запинаясь. Проваливает спасброски Силы и Ловкости. Атаки по нему — с преимуществом.",
  },
  {
    name: "Схваченный",
    nameEn: "Grappled",
    description:
      "Скорость становится 0. Состояние заканчивается, если схвативший становится недееспособным или если что-то выводит существо из досягаемости схватившего.",
  },
  {
    name: "Лежащий ничком",
    nameEn: "Prone",
    description:
      "Может только ползти. Помеха на броски атаки. Атака по нему с преимуществом, если атакующий в пределах 5 футов, иначе — с помехой. Встать стоит половину скорости.",
  },
];

// Часто задаваемые вопросы
export const faq = [
  {
    question: "Как рассчитать модификатор характеристики?",
    answer:
      "Модификатор = (Значение характеристики - 10) / 2, округляя вниз. Например: Сила 15 → модификатор +2. Сила 8 → модификатор -1.",
  },
  {
    question: "Как рассчитать Класс Доспеха (КД)?",
    answer:
      "Без доспехов: 10 + модификатор Ловкости. С доспехами: базовый КД доспеха + модификатор Ловкости (с ограничениями для средних/тяжёлых). Щит: +2 к КД.",
  },
  {
    question: "Как работает бонус мастерства?",
    answer:
      "Бонус мастерства добавляется к: броскам атаки оружием, которым вы владеете; броскам атаки заклинаниями; проверкам навыков, которыми вы владеете; спасброскам, которыми вы владеете; сложности спасброска заклинаний. Бонус зависит от уровня: 1-4 уровень: +2, 5-8: +3, 9-12: +4, 13-16: +5, 17-20: +6.",
  },
  {
    question: "Как работают спасброски?",
    answer:
      "Спасбросок = к20 + модификатор характеристики + бонус мастерства (если владеете). Сложность (DC) устанавливается эффектом. Если результат >= DC — успех.",
  },
  {
    question: "Как работает преимущество и помеха?",
    answer:
      "Преимущество: бросаете 2к20 и берёте лучший результат. Помеха: бросаете 2к20 и берёте худший. Если есть и преимущество, и помеха — они отменяют друг друга, бросаете 1к20.",
  },
  {
    question: "Как работают хиты и смерть?",
    answer:
      "При 0 хитов вы падаете без сознания и делаете спасброски от смерти. В начале каждого хода бросаете к20: 10+ = успех, 9- = провал. 3 успеха = стабилизация. 3 провала = смерть. Натуральная 20 = 1 хит и сознание. Натуральная 1 = 2 провала.",
  },
  {
    question: "Как работает короткий и длинный отдых?",
    answer:
      "Короткий отдых: минимум 1 час. Можно тратить Кости Хитов для восстановления. Длинный отдых: минимум 8 часов. Восстанавливаете все хиты и половину Костей Хитов.",
  },
  {
    question: "Как работает концентрация на заклинании?",
    answer:
      "Вы можете концентрироваться только на одном заклинании. При получении урона — спасбросок Телосложения (DC = 10 или половина урона, что больше). Провал = потеря концентрации. Накладывание другого заклинания с концентрацией прерывает текущее.",
  },
];

// Типы существ
export const creatureTypes = [
  {
    name: "Аберрация",
    nameEn: "Aberration",
    description:
      "Чуждые существа из далёких измерений, такие как бехолдеры и иллитиды.",
  },
  {
    name: "Зверь",
    nameEn: "Beast",
    description: "Обычные животные, от волков до гигантских орлов.",
  },
  {
    name: "Великан",
    nameEn: "Giant",
    description: "Огромные гуманоиды с древней историей.",
  },
  {
    name: "Гуманоид",
    nameEn: "Humanoid",
    description: "Разумные двуногие существа: люди, эльфы, орки и другие.",
  },
  {
    name: "Дракон",
    nameEn: "Dragon",
    description: "Крылатые рептилии великой силы и магии.",
  },
  {
    name: "Исчадие",
    nameEn: "Fiend",
    description: "Злые существа из Нижних Планов: демоны и дьяволы.",
  },
  {
    name: "Конструкт",
    nameEn: "Construct",
    description: "Искусственные существа: големы и живые доспехи.",
  },
  {
    name: "Монстр",
    nameEn: "Monstrosity",
    description: "Неестественные существа, порождённые магией или проклятием.",
  },
  {
    name: "Небожитель",
    nameEn: "Celestial",
    description: "Добрые существа из Верхних Планов: ангелы и единороги.",
  },
  {
    name: "Нежить",
    nameEn: "Undead",
    description: "Мёртвые, оживлённые магией: зомби, скелеты, личи.",
  },
  {
    name: "Растение",
    nameEn: "Plant",
    description: "Ожившие растительные существа.",
  },
  {
    name: "Слизь",
    nameEn: "Ooze",
    description: "Аморфные существа без твёрдой формы.",
  },
  {
    name: "Фея",
    nameEn: "Fey",
    description: "Магические существа, связанные с природой и Страной Фей.",
  },
  {
    name: "Элементаль",
    nameEn: "Elemental",
    description: "Воплощения стихий: огня, воды, воздуха и земли.",
  },
];
