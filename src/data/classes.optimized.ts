/**
 * Оптимизированные данные классов D&D
 * Автоматически сгенерировано из classes.json
 */

import { DnDClass } from '../types/class.types';

export const optimizedClasses: DnDClass[] = [
  {
    "url": "bard-phb",
    "gallery": [
      "/s3/classes/peterko/1759866241470-bard2.webp",
      "/s3/classes/magistrus/1759905122993-bard2.webp"
    ],
    "image": "/s3/classes/peterko/1759866220676-bard.webp",
    "description": [
      "{@i Вдохновляющий исполнитель музыки, танца и магии}",
      "Вызывая магию через музыку, танцы и стихи, барды являются экспертами в том, чтобы вдохновлять других, успокаивать боль, приводить в уныние врагов и создавать иллюзии. Барды верят, что мультивселенная была создана посредством речи, и что остатки слов творения всё ещё звучат и мерцают на каждом плане существования. Магия бардов пытается обуздать эти слова, которые превосходят любой язык. Что угодно может вдохновить на новую песню или сказание, поэтому барды увлечены практически всем. Они становятся мастерами во многих вещах, включая исполнение музыки, использование магии и сочинение шуток.",
      "Бард проводит своё время в путешествиях, сборе знаний, рассказов и жизни за счёт благодарных зрителей, как и у любого другого артиста. Но глубина знаний и мастерство бардов в магии отличают их от простых любимцев публики.",
      {
        "type": "heading",
        "attrs": {
          "level": "2"
        },
        "content": [
          {
            "type": "text",
            "text": "Становление бардом..."
          }
        ]
      },
      "{@b Как персонаж 1 уровня}",
      {
        "type": "list",
        "attrs": {
          "type": "unordered"
        },
        "content": [
          "Получите особенности в таблице «Особенности барда».",
          "Получите умения барда 1 уровня, которые перечислены в таблице «Умения барда»."
        ]
      },
      "{@b Как мультикласс}",
      {
        "type": "list",
        "attrs": {
          "type": "unordered"
        },
        "content": [
          "Получите следующие особенности из таблицы «Особенности барда»: кость хитов, владение одним навыком по вашему выбору, владение одним музыкальным инструментом по вашему выбору и владение лёгкими доспехами.",
          "Получите умения барда 1 уровня, которые перечислены в таблице «Умения барда». См. правила мультиклассирования в главе 2, чтобы определить доступные ячейки заклинаний."
        ]
      },
      [
        {
          "type": "heading",
          "attrs": {
            "level": "3"
          },
          "content": [
            {
              "type": "text",
              "text": "Репертуар барда"
            }
          ]
        },
        {
          "type": "quote",
          "content": [
            {
              "type": "text",
              "text": "Ваш бард бьёт в барабан, воспевая подвиги древних героев? Играет на лютне, напевая романтические мелодии? Исполняет арии волнующей силы? Декламирует драматические монологи из классических трагедий? Использует ритм народного танца, чтобы координировать движение союзников в битве? Сочиняет озорные частушки?  Когда вы играете за барда, подумайте о стиле художественного исполнения, который вы предпочитаете, настроениях, которые вы можете вызывать, и темах, которыми наполнены ваши собственные творения.  Ваши стихи вдохновлены моментами природной красоты или же задумчивыми размышлениями об утрате? Предпочитаете ли вы возвышенные гимны или шумные песни таверны? Вас тянет к плачу по павшим или празднованиям радости? Вы танцуете весёлые джиги или исполняете сложную и замысловатую хореографию? Сосредотачиваетесь ли вы на одном стиле или разнообразите своё выступление?"
            }
          ]
        }
      ],
      {
        "type": "heading",
        "attrs": {
          "level": "2"
        },
        "content": [
          {
            "type": "text",
            "text": "Список заклинаний барда"
          }
        ]
      },
      "В этом разделе представлен список заклинаний барда. Заклинания отсортированы по уровню и алфавиту, а также указана школа магии каждого заклинания. В столбце «Спец.» (Специальное) обозначения имеют следующий смысл: К — заклинание требует концентрации;  Р — заклинание можно сотворить как ритуал;  М — заклинание требует особый материальный компонент.",
      {
        "type": "table",
        "caption": "Заговоры (заклинания барда 0 уровня)",
        "colLabels": [
          "Заклинание",
          "Школа",
          "Спец."
        ],
        "colStyles": [
          "w-2/5",
          "w-1/3",
          "w-1/4 text-center"
        ],
        "rows": [
          [
            "{@spell Волшебная рука [Mage Hand]|url:mage-hand-phb}",
            "Вызов",
            "—"
          ],
          [
            "{@spell Дружба [Friends]|url:friends-phb}",
            "Очарование",
            "К"
          ],
          [
            "{@spell Защита от оружия [Blade Ward]|url:blade-ward-phb}",
            "Ограждение",
            "К"
          ],
          [
            "{@spell Звёздный огонёк [Starry Wisp]|url:starry-wisp-homebrew}",
            "Воплощение",
            "—"
          ],
          [
            "{@spell Злая насмешка [Vicious Mockery]|url:vicious-mockery-phb}",
            "Очарование",
            "—"
          ],
          [
            "{@spell Малая иллюзия [Minor Illusion]|url:minor-illusion-phb}",
            "Иллюзия",
            "—"
          ],
          [
            "{@spell Меткий удар [True Strike]|url:true-strike-phb}",
            "Прорицание",
            "—"
          ],
          [
            "{@spell Пляшущие огоньки [Dancing Lights]|url:dancing-lights-phb}",
            "Иллюзия",
            "К"
          ],
          [
            "{@spell Починка [Mending]|url:mending-phb}",
            "Преобразование",
            "—"
          ],
          [
            "{@spell Раскат грома [Thunderclap]|url:thunderclap-phb}",
            "Воплощение",
            "—"
          ],
          [
            "{@spell Свет [Light]|url:light-phb}",
            "Воплощение",
            "—"
          ],
          [
            "{@spell Сообщение [Message]|url:message-phb}",
            "Преобразование",
            "—"
          ],
          [
            "{@spell Фокусы [Prestidigitation]|url:prestidigitation-phb}",
            "Преобразование",
            "—"
          ]
        ]
      },
      {
        "type": "table",
        "caption": "Заклинания барда 1 уровня",
        "colLabels": [
          "Заклинание",
          "Школа",
          "Спец."
        ],
        "colStyles": [
          "w-2/5",
          "w-1/3",
          "w-1/4 text-center"
        ],
        "rows": [
          [
            "{@spell Безмолвный образ [Silent Image]|url:silent-image-phb}",
            "Иллюзия",
            "К"
          ],
          [
            "{@spell Волна грома [Thunderwave]|url:thunderwave-phb}",
            "Воплощение",
            "—"
          ],
          [
            "{@spell Героизм [Heroism]|url:heroism-phb}",
            "Очарование",
            "К"
          ],
          [
            "{@spell Диссонирующий шёпот [Dissonant Whispers]|url:dissonant-whispers-phb}",
            "Очарование",
            "—"
          ],
          [
            "{@spell Дружба с животными [Animal Friendship]|url:animal-friendship-phb}",
            "Очарование",
            "—"
          ],
          [
            "{@spell Жуткий смех Таши [Tasha’s Hideous Laughter]|url:tasha-s-hideous-laughter-phb}",
            "Очарование",
            "К"
          ],
          [
            "{@spell Иллюзорные письмена [Illusory Script]|url:illusory-script-phb}",
            "Иллюзия",
            "Р, М"
          ],
          [
            "{@spell Лечащее слово [Healing Word]|url:healing-word-phb}",
            "Ограждение",
            "—"
          ],
          [
            "{@spell Лечение ран [Cure Wounds]|url:cure-wounds-phb}",
            "Ограждение",
            "—"
          ],
          [
            "{@spell Маскировка [Disguise Self]|url:disguise-self-phb}",
            "Иллюзия",
            "—"
          ],
          [
            "{@spell Невидимый слуга [Unseen Servant]|url:unseen-servant-phb}",
            "Вызов",
            "Р"
          ],
          [
            "{@spell Обнаружение магии [Detect Magic]|url:detect-magic-phb}",
            "Прорицание",
            "К, Р"
          ],
          [
            "{@spell Огонь фей [Faerie Fire]|url:faerie-fire-phb}",
            "Воплощение",
            "К"
          ],
          [
            "{@spell Опознание [Identify]|url:identify-phb}",
            "Прорицание",
            "Р, М"
          ],
          [
            "{@spell Очарование личности [Charm Person]|url:charm-person-phb}",
            "Очарование",
            "—"
          ],
          [
            "{@spell Падение пёрышком [Feather Fall]|url:feather-fall-phb}",
            "Преобразование",
            "—"
          ],
          [
            "{@spell Понимание языков [Comprehend Languages]|url:comprehend-languages-phb}",
            "Прорицание",
            "Р"
          ],
          [
            "{@spell Порча [Bane]|url:bane-phb}",
            "Очарование",
            "К"
          ],
          [
            "{@spell Приказ [Command]|url:command-phb}",
            "Очарование",
            "—"
          ],
          [
            "{@spell Разговор с животными [Speak with Animals]|url:speak-with-animals-phb}",
            "Прорицание",
            "К"
          ],
          [
            "{@spell Сверкающие брызги [Color Spray]|url:color-spray-phb}",
            "Иллюзия",
            "—"
          ],
          [
            "{@spell Скороход [Longstrider]|url:longstrider-phb}",
            "Преобразование",
            "—"
          ],
          [
            "{@spell Усыпление [Sleep]|url:sleep-phb}",
            "Очарование",
            "К"
          ]
        ]
      },
      {
        "type": "table",
        "caption": "Заклинания барда 2 уровня",
        "colLabels": [
          "Заклинание",
          "Школа",
          "Спец."
        ],
        "colStyles": [
          "w-2/5",
          "w-1/3",
          "w-1/4 text-center"
        ],
        "rows": [
          [
            "{@spell Видение невидимого [See Invisibility]|url:see-invisibility-phb}",
            "Прорицание",
            "—"
          ],
          [
            "{@spell Внушение [Suggestion]|url:suggestion-phb}",
            "Очарование",
            "К"
          ],
          [
            "{@spell Волшебные уста [Magic Mouth]|url:magic-mouth-phb}",
            "Иллюзия",
            "Р, М"
          ],
          [
            "{@spell Воображаемая сила [Phantasmal Force]|url:phantasmal-force-phb}",
            "Иллюзия",
            "К"
          ],
          [
            "{@spell Дребезги [Shatter]|url:shatter-phb}",
            "Воплощение",
            "—"
          ],
          [
            "{@spell Корона безумия [Crown of Madness]|url:crown-of-madness-phb}",
            "Очарование",
            "К"
          ],
          [
            "{@spell Малое восстановление [Lesser Restoration]|url:lesser-restoration-phb}",
            "Ограждение",
            "—"
          ],
          [
            "{@spell Невидимость [Invisibility]|url:invisibility-phb}",
            "Иллюзия",
            "К"
          ],
          [
            "{@spell Облако кинжалов [Cloud of Daggers]|url:cloud-of-daggers-phb}",
            "Вызов",
            "К"
          ],
          [
            "{@spell Область истины [Zone of Truth]|url:zone-of-truth-phb}",
            "Очарование",
            "—"
          ],
          [
            "{@spell Обнаружение мыслей [Detect Thoughts]|url:detect-thoughts-phb}",
            "Прорицание",
            "К"
          ],
          [
            "{@spell Отражения [Mirror Image]|url:mirror-image-phb}",
            "Иллюзия",
            "—"
          ],
          [
            "{@spell Подмога [Aid]|url:aid-phb}",
            "Ограждение",
            "—"
          ],
          [
            "{@spell Поиск животных или растений [Locate Animals or Plants]|url:locate-animals-or-plants-phb}",
            "Прорицание",
            "Р"
          ],
          [
            "{@spell Поиск объекта [Locate Object]|url:locate-object-phb}",
            "Прорицание",
            "К"
          ],
          [
            "{@spell Почтовое животное [Animal Messenger]|url:animal-messenger-phb}",
            "Очарование",
            "Р"
          ],
          [
            "{@spell Раскалённый металл [Heat Metal]|url:heat-metal-phb}",
            "Преобразование",
            "К"
          ],
          [
            "{@spell Речь златоуста [Enthrall]|url:enthrall-phb}",
            "Очарование",
            "К"
          ],
          [
            "{@spell Глухота/слепота [Blindness/Deafness]|url:blindness-deafness-phb}",
            "Преобразование",
            "—"
          ],
          [
            "{@spell Стук [Knock]|url:knock-phb}",
            "Преобразование",
            "—"
          ],
          [
            "{@spell Тишина [Silence]|url:silence-phb}",
            "Иллюзия",
            "К, Р"
          ],
          [
            "{@spell Увеличение/уменьшение [Enlarge/Reduce]|url:enlarge-reduce-phb}",
            "Преобразование",
            "К"
          ],
          [
            "{@spell Удержание личности [Hold Person]|url:hold-person-phb}",
            "Очарование",
            "К"
          ],
          [
            "{@spell Улучшение характеристики [Enhance Ability]|url:enhance-ability-phb}",
            "Преобразование",
            "К"
          ],
          [
            "{@spell Умиротворение [Calm Emotions]|url:calm-emotions-phb}",
            "Очарование",
            "К"
          ]
        ]
      },
      {
        "type": "table",
        "caption": "Заклинания барда 3 уровня",
        "colLabels": [
          "Заклинание",
          "Школа",
          "Спец."
        ],
        "colStyles": [
          "w-2/5",
          "w-1/3",
          "w-1/4 text-center"
        ],
        "rows": [
          [
            "{@spell Гипнотический узор [Hypnotic Pattern]|url:hypnotic-pattern-phb}",
            "Иллюзия",
            "К"
          ],
          [
            "{@spell Замедление [Slow]|url:slow-phb}",
            "Преобразование",
            "К"
          ],
          [
            "{@spell Зловонное облако [Stinking Cloud]|url:stinking-cloud-phb}",
            "Вызов",
            "К"
          ],
          [
            "{@spell Леомундова хижина [Leomund’s Tiny Hut]|url:leomund-s-tiny-hut-phb}",
            "Воплощение",
            "Р"
          ],
          [
            "{@spell Множественное лечащее слово [Mass Healing Word]|url:mass-healing-word-phb}",
            "Ограждение",
            "—"
          ],
          [
            "{@spell Необнаружимость [Nondetection]|url:nondetection-phb}",
            "Ограждение",
            "М"
          ],
          [
            "{@spell Образ [Major Image]|url:major-image-phb}",
            "Иллюзия",
            "К"
          ],
          [
            "{@spell Охранные руны [Glyph of Warding]|url:glyph-of-warding-phb}",
            "Ограждение",
            "М"
          ],
          [
            "{@spell Подсматривание [Clairvoyance]|url:clairvoyance-phb}",
            "Прорицание",
            "К, М"
          ],
          [
            "{@spell Послание [Sending]|url:sending-phb}",
            "Прорицание",
            "—"
          ],
          [
            "{@spell Притворная смерть [Feign Death]|url:feign-death-phb}",
            "Некромантия",
            "Р"
          ],
          [
            "{@spell Проклятие [Bestow Curse]|url:bestow-curse-phb}",
            "Некромантия",
            "К"
          ],
          [
            "{@spell Разговор с мёртвыми [Speak with Dead]|url:speak-with-dead-phb}",
            "Некромантия",
            "—"
          ],
          [
            "{@spell Разговор с растениями [Speak with Plants]|url:speak-with-plants-phb}",
            "Преобразование",
            "—"
          ],
          [
            "{@spell Рассеивание магии [Dispel Magic]|url:dispel-magic-phb}",
            "Ограждение",
            "—"
          ],
          [
            "{@spell Рост растений [Plant Growth]|url:plant-growth-phb}",
            "Преобразование",
            "—"
          ],
          [
            "{@spell Ужас [Fear]|url:fear-phb}",
            "Иллюзия",
            "К"
          ],
          [
            "{@spell Языки [Tongues]|url:tongues-phb}",
            "Прорицание",
            "—"
          ]
        ]
      },
      {
        "type": "table",
        "caption": "Заклинания барда 4 уровня",
        "colLabels": [
          "Заклинание",
          "Школа",
          "Спец."
        ],
        "colStyles": [
          "w-2/5",
          "w-1/3",
          "w-1/4 text-center"
        ],
        "rows": [
          [
            "{@spell Воображаемый убийца [Phantasmal Killer]|url:phantasmal-killer-phb}",
            "Иллюзия",
            "К"
          ],
          [
            "{@spell Высшая невидимость [Greater Invisibility]|url:greater-invisibility-phb}",
            "Иллюзия",
            "К"
          ],
          [
            "{@spell Источник лунного света [Moonbeam]|url:moonbeam-phb}",
            "Воплощение",
            "К"
          ],
          [
            "{@spell Мираж [Hallucinatory Terrain]|url:hallucinatory-terrain-phb}",
            "Иллюзия",
            "—"
          ],
          [
            "{@spell Очарование монстра [Charm Monster]|url:charm-monster-phb}",
            "Очарование",
            "—"
          ],
          [
            "{@spell Переносящая дверь [Dimension Door]|url:dimension-door-phb}",
            "Вызов",
            "—"
          ],
          [
            "{@spell Поиск существа [Locate Creature]|url:locate-creature-phb}",
            "Прорицание",
            "К"
          ],
          [
            "{@spell Полиморф [Polymorph]|url:polymorph-phb}",
            "Преобразование",
            "К"
          ],
          [
            "{@spell Принуждение [Compulsion]|url:compulsion-phb}",
            "Очарование",
            "К"
          ],
          [
            "{@spell Свобода перемещения [Freedom of Movement]|url:freedom-of-movement-phb}",
            "Ограждение",
            "—"
          ],
          [
            "{@spell Смятение [Confusion]|url:confusion-phb}",
            "Очарование",
            "К"
          ]
        ]
      },
      {
        "type": "table",
        "caption": "Заклинания барда 5 уровня",
        "colLabels": [
          "Заклинание",
          "Школа",
          "Спец."
        ],
        "colStyles": [
          "w-2/5",
          "w-1/3",
          "w-1/4 text-center"
        ],
        "rows": [
          [
            "{@spell Воскрешение [Raise Dead]|url:raise-dead-phb}",
            "Некромантия",
            "М"
          ],
          [
            "{@spell Высшее восстановление [Greater Restoration]|url:greater-restoration-phb}",
            "Ограждение",
            "М"
          ],
          [
            "{@spell Знание легенд [Legend Lore]|url:legend-lore-phb}",
            "Прорицание",
            "М"
          ],
          [
            "{@spell Изменение памяти [Modify Memory]|url:modify-memory-phb}",
            "Очарование",
            "К"
          ],
          [
            "{@spell Величественное присутствие Йоланды [Yolande’s Regal Presence]|url:yolande-s-regal-presence-homebrew}",
            "Очарование",
            "К"
          ],
          [
            "{@spell Круг телепортации [Teleportation Circle]|url:teleportation-circle-phb}",
            "Вызов",
            "М"
          ],
          [
            "{@spell Ментальная связь Рэри [Rary’s Telepathic Bond]|url:rary-s-telepathic-bond-phb}",
            "Прорицание",
            "Р"
          ],
          [
            "{@spell Множественное лечение ран [Mass Cure Wounds]|url:mass-cure-wounds-phb}",
            "Ограждение",
            "—"
          ],
          [
            "{@spell Наблюдение [Scrying]|url:scrying-phb}",
            "Прорицание",
            "К, М"
          ],
          [
            "{@spell Обет [Geas]|url:geas-phb}",
            "Очарование",
            "—"
          ],
          [
            "{@spell Оживление вещей [Animate Objects]|url:animate-objects-phb}",
            "Преобразование",
            "К"
          ],
          [
            "{@spell Планарные узы [Planar Binding]|url:planar-binding-phb}",
            "Ограждение",
            "М"
          ],
          [
            "{@spell Подчинение личности [Dominate Person]|url:dominate-person-phb}",
            "Очарование",
            "К"
          ],
          [
            "{@spell Притворство [Seeming]|url:seeming-phb}",
            "Иллюзия",
            "—"
          ],
          [
            "{@spell Пробуждение разума [Awaken Mind]|url:awaken-mind-homebrew}",
            "Преобразование",
            "М"
          ],
          [
            "{@spell Синаптический разряд [Synaptic Static]|url:synaptic-static-phb}",
            "Очарование",
            "—"
          ],
          [
            "{@spell Сновидение [Dream]|url:dream-phb}",
            "Иллюзия",
            "—"
          ],
          [
            "{@spell Удержание чудовища [Hold Monster]|url:hold-monster-phb}",
            "Очарование",
            "К"
          ],
          [
            "{@spell Фальшивый двойник [Mislead]|url:mislead-phb}",
            "Иллюзия",
            "К"
          ]
        ]
      },
      {
        "type": "table",
        "caption": "Заклинания барда 6 уровня",
        "colLabels": [
          "Заклинание",
          "Школа",
          "Спец."
        ],
        "colStyles": [
          "w-2/5",
          "w-1/3",
          "w-1/4 text-center"
        ],
        "rows": [
          [
            "{@spell Заданная иллюзия [Programmed Illusion]|url:programmed-illusion-phb}",
            "Иллюзия",
            "М"
          ],
          [
            "{@spell Истинное зрение [True Seeing]|url:true-seeing-phb}",
            "Прорицание",
            "М"
          ],
          [
            "{@spell Множественное внушение [Mass Suggestion]|url:mass-suggestion-phb}",
            "Очарование",
            "—"
          ],
          [
            "{@spell Неудержимая пляска Отто [Otto’s Irresistible Dance]|url:otto-s-irresistible-dance-phb}",
            "Очарование",
            "К"
          ],
          [
            "{@spell Пир героев [Heroes’ Feast]|url:heroes-feast-phb}",
            "Вызов",
            "М"
          ],
          [
            "{@spell Поиск пути [Find the Path]|url:find-the-path-phb}",
            "Прорицание",
            "К, М"
          ],
          [
            "{@spell Разящее око [Eyebite]|url:eyebite-phb}",
            "Некромантия",
            "К"
          ],
          [
            "{@spell Стражи [Guards and Wards]|url:guards-and-wards-phb}",
            "Ограждение",
            "М"
          ]
        ]
      },
      {
        "type": "table",
        "caption": "Заклинания барда 7 уровня",
        "colLabels": [
          "Заклинание",
          "Школа",
          "Спец."
        ],
        "colStyles": [
          "w-2/5",
          "w-1/3",
          "w-1/4 text-center"
        ],
        "rows": [
          [
            "{@spell Великолепный особняк Морденкайнена [Mordenkainen’s Magnificent Mansion]|url:mordenkainen-s-magnificent-mansion-phb}",
            "Вызов",
            "М"
          ],
          [
            "{@spell Высшее воскрешение [Resurrection]|url:resurrection-phb}",
            "Некромантия",
            "М"
          ],
          [
            "{@spell Знак [Symbol]|url:symbol-phb}",
            "Ограждение",
            "М"
          ],
          [
            "{@spell Меч Морденкайнена [Mordenkainen’s Sword]|url:mordenkainen-s-sword-phb}",
            "Воплощение",
            "К, М"
          ],
          [
            "{@spell Проекция [Project Image]|url:project-image-phb}",
            "Иллюзия",
            "К, М"
          ],
          [
            "{@spell Радужные брызги [Prismatic Spray]|url:prismatic-spray-phb}",
            "Воплощение",
            "—"
          ],
          [
            "{@spell Регенерация [Regenerate]|url:regenerate-phb}",
            "Преобразование",
            "—"
          ],
          [
            "{@spell Силовая клетка [Forcecage]|url:forcecage-phb}",
            "Воплощение",
            "К, М"
          ],
          [
            "{@spell Слово силы: укрепление [Power Word Fortify]|url:power-word-fortify-homebrew}",
            "Очарование",
            "—"
          ],
          [
            "{@spell Таинственный мираж [Mirage Arcane]|url:mirage-arcane-phb}",
            "Иллюзия",
            "—"
          ],
          [
            "{@spell Телепортация [Teleport]|url:teleport-phb}",
            "Вызов",
            "—"
          ],
          [
            "{@spell Эфирность [Etherealness]|url:etherealness-phb}",
            "Вызов",
            "—"
          ]
        ]
      },
      {
        "type": "table",
        "caption": "Заклинания барда 8 уровня",
        "colLabels": [
          "Заклинание",
          "Школа",
          "Спец."
        ],
        "colStyles": [
          "w-2/5",
          "w-1/3",
          "w-1/4 text-center"
        ],
        "rows": [
          [
            "{@spell Антипатия/симпатия [Antipathy/Sympathy]|url:antipathy-sympathy-phb}",
            "Очарование",
            "—"
          ],
          [
            "{@spell Замешательство [Feeblemind]|url:feeblemind-phb}",
            "Очарование",
            "—"
          ],
          [
            "{@spell Находчивость [Glibness]|url:glibness-phb}",
            "Очарование",
            "—"
          ],
          [
            "{@spell Подчинение чудовища [Dominate Monster]|url:dominate-monster-phb}",
            "Очарование",
            "К"
          ],
          [
            "{@spell Слово силы: ошеломление [Power Word Stun]|url:power-word-stun-phb}",
            "Очарование",
            "—"
          ],
          [
            "{@spell Сокрытие разума [Mind Blank]|url:mind-blank-phb}",
            "Ограждение",
            "—"
          ]
        ]
      },
      {
        "type": "table",
        "caption": "Заклинания барда 9 уровня",
        "colLabels": [
          "Заклинание",
          "Школа",
          "Спец."
        ],
        "colStyles": [
          "w-2/5",
          "w-1/3",
          "w-1/4 text-center"
        ],
        "rows": [
          [
            "{@spell Истинный полиморф [True Polymorph]|url:true-polymorph-phb}",
            "Преобразование",
            "К"
          ],
          [
            "{@spell Предвидение [Foresight]|url:foresight-phb}",
            "Прорицание",
            "—"
          ],
          [
            "{@spell Радужная стена [Prismatic Wall]|url:prismatic-wall-phb}",
            "Ограждение",
            "—"
          ],
          [
            "{@spell Слово силы: исцеление [Power Word Heal]|url:power-word-heal-phb}",
            "Очарование",
            "—"
          ],
          [
            "{@spell Слово силы: смерть [Power Word Kill]|url:power-word-kill-phb}",
            "Очарование",
            "—"
          ]
        ]
      }
    ],
    "updatedAt": "2026-01-09T10:03:42.482343Z",
    "userId": "Magistrus",
    "hitDice": {
      "label": "к8",
      "value": "d8",
      "maxValue": 8,
      "avg": 5
    },
    "primaryCharacteristics": "Харизма",
    "proficiency": {
      "armor": "Легкий доспех",
      "weapon": "Простое дальнобойное, Простое рукопашное",
      "tool": "Выберите 3 музыкальных инструмента",
      "skill": "Выберите любые 3 навыка"
    },
    "equipment": [
      "Выберите А или Б:",
      {
        "type": "list",
        "attrs": {
          "type": "unordered"
        },
        "content": [
          "А) {@item кожаный доспех|url:leather-armor-phb}, 2 {@item кинжала|url:dagger-phb}, {@item музыкальный инструмент|url:musical-instrument-phb} по вашему выбору, {@item набор артиста|url:entertainer-s-pack-phb} и 19 зм.",
          "Б) 75 зм."
        ]
      }
    ],
    "savingThrows": "Ловкость, Харизма",
    "features": [
      {
        "isSubclass": false,
        "key": "ispolzovanie-zaklinanij",
        "level": 1,
        "name": "Использование заклинаний",
        "description": [
          "Вы научились накладывать заклинания с помощью искусства барда. Правила наложения заклинаний см. в главе 7. Ниже подробно описано, как применять эти правила к заклинаниям барда, которые будут перечислены в списке заклинаний барда далее в описании класса.",
          "{@b Заговоры.} Вы знаете 2 заговора по вашему выбору из списка заклинаний барда. Рекомендуются: {@spell Пляшущие огоньки [Dancing Lights]|url:dancing-lights-phb} и {@spell Злая насмешка [Vicious Mockery]|url:vicious-mockery-phb}. Каждый раз, когда вы получаете уровень барда, вы можете заменить 1 из ваших заговоров другим заговором по вашему выбору из списка заклинаний барда. При достижении 4 и 10 уровней барда, вы изучаете дополнительный заговор по вашему выбору из списка заклинаний барда, как показано в столбце «Заговоры» из таблицы «Умения барда».",
          "{@b Ячейки заклинаний.} Таблица «Умения барда» показывает, сколько ячеек заклинаний вы можете использовать для заклинаний 1+ уровня. Вы восстанавливаете все потраченные ячейки, когда заканчиваете {@glossary продолжительный отдых|url:long-rest-phb}.",
          "{@b Подготовленные заклинания 1+ уровня.} Вы подготавливаете список заклинаний 1+ уровня, которые доступны вам для использования с помощью этого умения. Для начала выберите 4 заклинания 1 уровня из списка заклинаний барда. Рекомендуются: {@spell Очарование личности [Charm Person]|url:charm-person-phb}, {@spell Сверкающие брызги [Color Spray]|url:color-spray-phb}, {@spell Диссонирующий шёпот [Dissonant Whispers]|url:dissonant-whispers-phb} и {@spell Лечащее слово [Healing Word]|url:healing-word-phb}.",
          "Количество подготовленных заклинаний в вашем списке увеличивается по мере того, как вы получаете уровни барда, как показано в столбце «Подг. закл.» из таблицы «Умения барда». Каждый раз, когда это число увеличивается, выберите дополнительные заклинания из списка заклинаний барда, чтобы количество заклинаний вашего списка соответствовало значению в таблице «Умения барда». Выбранные заклинания должны быть того уровня, для которого у вас есть ячейка заклинаний. Например, если вы бард 3 уровня, то ваш список подготовленных заклинаний может включать 6 заклинаний барда 1 и 2 уровней в любой комбинации.",
          "Если другое умение барда даёт вам всегда подготовленные заклинания, то эти заклинания не учитываются в количестве заклинаний, которые вы можете подготовить с помощью этого умения, но в остальном они считаются заклинаниями барда для вас.",
          "{@b Изменение подготовленных заклинаний.} Каждый раз, когда вы получаете уровень барда, вы можете изменить 1 заклинание из вашего списка на другое заклинание из списка заклинаний барда, для которого у вас имеется ячейка заклинаний.",
          "{@b Заклинательная характеристика.} Харизма — это ваша заклинательная характеристика для ваших заклинаний барда.",
          "{@b Заклинательная фокусировка.} В качестве заклинательной фокусировки для ваших заклинаний барда вы можете использовать музыкальный инструмент."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "bardovskoe-vdohnovenie",
        "level": 1,
        "name": "Бардовское вдохновение",
        "description": [
          "Вы можете сверхъестественным образом вдохновлять других посредством слов, музыки или танца. Это вдохновение представлено вашей костью бардовского вдохновения, которая равна к6.",
          "{@b Использование вдохновения барда.} {@glossary Бонусным действием|url:bonus-action-phb} вы можете вдохновить другое {@glossary существо|url:creature-phb} в пределах 60 фт. (18 м) от вас, которое может видеть или слышать вас. Это существо получает одну из ваших костей бардовского вдохновения. У существа может быть только одна кость бардовского вдохновения одновременно.",
          "Один раз в течение следующего часа, когда существо проваливает проверку к20, оно может бросить кость бардовского вдохновения и добавить выпавшее число к результату броска к20, потенциально превращая неудачу в успех. Кость бардовского вдохновения расходуется при броске.",
          "{@b Количество использований.} Вы можете передать кость бардовского вдохновения количество раз, равное вашему модификатору Харизмы (минимум 1 раз). Вы восстанавливаете все потраченные использования, когда заканчиваете {@glossary продолжительный отдых|url:long-rest-phb}.",
          "{@b На более высоких уровнях.} Ваша кость бардовского вдохновения изменяется, когда вы достигаете определённых уровней барда, как показано в столбце «КВ» из таблицы «Умения барда». Кость становится к8 на 5-м уровне, к10 на 10-м уровне и к12 на 15-м уровне."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "kompetentnost",
        "level": 2,
        "name": "Компетентность",
        "description": [
          "Вы получаете {@glossary компетентность|url:expertise-phb} в 2 ваших навыках по вашему выбору. Рекомендуются: Выступление и Убеждение, если вы владеете ими. На 9-м уровне барда вы получаете {@glossary компетентность|url:expertise-phb} ещё в 2 ваших навыках по выбору."
        ],
        "additional": "",
        "scaling": [
          {
            "level": 9,
            "name": "Компетентность",
            "description": [
              "На 9-м уровне барда вы получаете {@glossary компетентность|url:expertise-phb} ещё в 2 ваших навыках по выбору. Рекомендуются: Выступление и Убеждение, если вы владеете ими."
            ],
            "additional": "",
            "hideInSubclasses": false
          }
        ],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "master-na-vse-ruki",
        "level": 2,
        "name": "Мастер на все руки",
        "description": [
          "Вы можете добавить половину своего {@glossary бонуса мастерства|url:proficiency-bonus-phb} (округляя вниз) к любой проверке характеристики, в которой у вас нет владения навыком и которая иным образом не использует ваш бонус мастерства. Например, если вы совершаете проверку Силы (Атлетика) и не владеете Атлетикой, то вы можете добавить половину своего бонуса мастерства к проверке."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "podklass-barda",
        "level": 3,
        "name": "Подкласс барда",
        "description": [
          "Вы получаете подкласс} барда по вашему выбору. Коллегия Танца, Коллегия Очарования, Коллегия Знания и Коллегия Доблести подробно описаны после списка {@glossary заклинаний|url:spell-phb} этого класса. Подкласс — это специализация, которая предоставляет вам возможности на определённых уровнях барда. В ходе дальнейшего развития вы получаете умения вашего подкласса, которые соответствуют вашему уровню барда или ниже."
        ],
        "additional": "",
        "scaling": [
          {
            "level": 6,
            "name": "Умение подкласса",
            "description": [
              "Вы получаете умение подкласса."
            ],
            "additional": "",
            "hideInSubclasses": false
          },
          {
            "level": 14,
            "name": "Умение подкласса",
            "description": [
              "Вы получаете умение подкласса."
            ],
            "additional": "",
            "hideInSubclasses": false
          }
        ],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "ulucsenie-harakteristik",
        "level": 4,
        "name": "Улучшение характеристик",
        "description": [
          "Вы получаете черту {@feat Улучшение характеристик|url:ability-score-improvement-phb} (см. главу 5) или другую черту по вашему выбору, требованиям которой вы соответствуете. Вы снова получаете эту способность на уровнях барда 8, 12 и 16."
        ],
        "additional": "",
        "scaling": [
          {
            "level": 8,
            "name": "Улучшение характеристик",
            "description": [
              "Вы получаете черту {@feat Улучшение характеристик|url:ability-score-improvement-phb} (см. главу 5) или другую черту по вашему выбору, требованиям которой вы соответствуете."
            ],
            "additional": "",
            "hideInSubclasses": false
          },
          {
            "level": 12,
            "name": "Улучшение характеристик",
            "description": [
              "Вы получаете черту {@feat Улучшение характеристик|url:ability-score-improvement-phb} (см. главу 5) или другую черту по вашему выбору, требованиям которой вы соответствуете."
            ],
            "additional": "",
            "hideInSubclasses": false
          },
          {
            "level": 16,
            "name": "Улучшение характеристик",
            "description": [
              "Вы получаете черту {@feat Улучшение характеристик|url:ability-score-improvement-phb} (см. главу 5) или другую черту по вашему выбору, требованиям которой вы соответствуете."
            ],
            "additional": "",
            "hideInSubclasses": false
          }
        ],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "istocnik-vdohnovenia",
        "level": 5,
        "name": "Источник вдохновения",
        "description": [
          "Теперь вы восстанавливаете все потраченные использования костей бардовского вдохновения, когда заканчиваете {@glossary короткий отдых|url:short-rest-phb} или {@glossary продолжительный отдых|url:long-rest-phb}. Кроме того, вы можете потратить ячейку {@glossary заклинания|url:spell-phb} (действие не требуется), чтобы восстановить 1 потраченное использование кости бардовского вдохновения."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "kontrocarovanie",
        "level": 7,
        "name": "Контрочарование",
        "description": [
          "Вы можете использовать музыкальные ноты или слова, чтобы прерывать эффекты, влияющие на разум. Если вы или {@glossary существо|url:creature-phb} в радиусе 30 фт. (9 м) от вас проваливает {@glossary спасбросок|url:saving-throw-phb} против эффекта, который накладывает состояние {@glossary очарованный|url:charmed-phb} или {@glossary испуганный|url:frightened-phb}, то вы можете использовать {@glossary реакцию|url:reaction-phb}, чтобы решить, что спасбросок будет переброшен, и новый бросок совершается с {@glossary преимуществом|url:advantage-phb}."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "magiceskie-sekrety",
        "level": 10,
        "name": "Магические секреты",
        "description": [
          "Вы освоили тайны различных магических традиций. Когда вы достигаете нового уровня барда (включая этот уровень) и число подготовленных {@glossary заклинаний|url:spell-phb} в таблице «Умения барда» увеличивается, вы можете выбрать любое из новых подготовленных заклинаний из списков заклинаний барда, жреца, друида и волшебника, и выбранные заклинания будут считаться заклинаниями барда для вас (см. раздел класса для его списка заклинаний). Кроме того, каждый раз, когда вы заменяете заклинание, подготовленное для барда, вы можете заменить его заклинанием из этих списков."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "prevoshodnoe-vdohnovenie",
        "level": 18,
        "name": "Превосходное вдохновение",
        "description": [
          "Когда вы совершаете {@glossary бросок инициативы|url:initiative-phb}, вы восстанавливаете до 2 потраченных костей {@i бардовского вдохновения}, если у вас их меньше."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "epiceskaa-certa",
        "level": 19,
        "name": "Эпическая черта",
        "description": [
          "Вы получаете эпическую черту (см. главу 5) или другую черту по вашему выбору, требованиям которой вы соответствуете. Рекомендуется черта {@feat Дар восстановления чар [Boon of Spell Recall]|url:boon-of-spell-recall-phb}."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "slova-tvorenia",
        "level": 20,
        "name": "Слова творения",
        "description": [
          "Вы освоили два слова творения: слова жизни и смерти. Поэтому у вас всегда подготовлены заклинания {@spell Слово силы: исцеление [Power Word Heal]|url:power-word-heal-phb} и {@spell Слово силы: смерть [Power Word Kill]|url:power-word-kill-phb}. Когда вы накладываете любое из этих заклинаний, вы можете нацелить его на второе {@glossary существо|url:creature-phb}, если оно находится в пределах 10 фт. (3 м) от первой цели."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      }
    ],
    "table": [
      {
        "name": "КВ",
        "scaling": [
          {
            "level": 1,
            "value": "к6"
          },
          {
            "level": 5,
            "value": "к8"
          },
          {
            "level": 10,
            "value": "к10"
          },
          {
            "level": 15,
            "value": "к12"
          }
        ]
      },
      {
        "name": "Заговоры",
        "scaling": [
          {
            "level": 1,
            "value": "2"
          },
          {
            "level": 4,
            "value": "3"
          },
          {
            "level": 10,
            "value": "4"
          }
        ]
      },
      {
        "name": "Подг. закл.",
        "scaling": [
          {
            "level": 1,
            "value": "4"
          },
          {
            "level": 2,
            "value": "5"
          },
          {
            "level": 3,
            "value": "6"
          },
          {
            "level": 4,
            "value": "7"
          },
          {
            "level": 5,
            "value": "9"
          },
          {
            "level": 6,
            "value": "10"
          },
          {
            "level": 7,
            "value": "11"
          },
          {
            "level": 8,
            "value": "12"
          },
          {
            "level": 9,
            "value": "14"
          },
          {
            "level": 10,
            "value": "15"
          },
          {
            "level": 11,
            "value": "16"
          },
          {
            "level": 13,
            "value": "17"
          },
          {
            "level": 15,
            "value": "18"
          },
          {
            "level": 16,
            "value": "18"
          },
          {
            "level": 17,
            "value": "19"
          },
          {
            "level": 18,
            "value": "20"
          },
          {
            "level": 19,
            "value": "21"
          },
          {
            "level": 20,
            "value": "22"
          }
        ]
      }
    ],
    "casterType": "FULL",
    "hasSubclasses": true,
    "name": {
      "rus": "Бард",
      "eng": "Bard"
    },
    "source": {
      "name": {
        "label": "PHB",
        "rus": "Книга игрока",
        "eng": "Player Handbook"
      },
      "group": {
        "label": "Basic",
        "rus": "Официальные источники"
      },
      "page": 48
    }
  },
  {
    "url": "barbarian-phb",
    "gallery": [
      "/s3/classes/peterko/1759866267853-barbarian2.webp"
    ],
    "image": "/s3/classes/peterko/1759866265163-barbarian.webp",
    "description": [
      "{@i Свирепый воитель первобытной ярости}",
      "Варвары — это могучие воины с первобытной силой, которая проявляется в Мультивселенной в виде ярости. Это гораздо больше, чем просто эмоция, и она не ограничивается гневом или злостью. Ярость варвара — это воплощение свирепости хищника, неистовства бури и беспокойства моря.",
      "Некоторые варвары воплощают свою ярость в виде свирепого духа или почитаемого предка. Другие видят в ней связь с болью и муками мира, как безличное сплетение дикой магии или как выражение их собственного глубочайшего «я». Для каждого варвара ярость — это сила, которая подпитывает не только боевую доблесть, но и дарует сверхъестественные рефлексы и обострённые чувства.",
      "Варвары часто выступают в роли защитников и лидеров в своих общинах. Они бросаются навстречу опасности, чтобы это не пришлось делать тем, кто находится под их защитой. Их мужество перед лицом опасности делает варваров идеально подходящими для путешествий.",
      {
        "type": "heading",
        "attrs": {
          "level": "2"
        },
        "content": [
          {
            "type": "text",
            "text": "Становление варваром..."
          }
        ]
      },
      "{@b Как персонаж 1 уровня:}",
      {
        "type": "list",
        "attrs": {
          "type": "unordered"
        },
        "content": [
          "Получите особенности из таблицы «Особенности варвара».",
          "Получите умения варвара 1 уровня, которые перечислены в таблице «Умения варвара»."
        ]
      },
      "{@b Как мультикласс:}",
      {
        "type": "list",
        "attrs": {
          "type": "unordered"
        },
        "content": [
          "Получите следующие особенности из таблицы «Особенности варвара»: кость хитов, владение простым, воинским оружием и щитами.",
          "Получите умения варвара 1 уровня, которые перечислены в таблице «Умения варвара»."
        ]
      }
    ],
    "updatedAt": "2026-01-06T14:37:54.335761Z",
    "userId": "Magistrus",
    "hitDice": {
      "label": "к12",
      "value": "d12",
      "maxValue": 12,
      "avg": 7
    },
    "primaryCharacteristics": "Сила",
    "proficiency": {
      "armor": "Щит, Средний доспех, Легкий доспех",
      "weapon": "Простое дальнобойное, Воинское рукопашное, Простое рукопашное, Воинское дальнобойное",
      "tool": "",
      "skill": "Выберите 2 навыка из следующих: Уход за животными, Атлетика, Природа, Запугивание, Внимательность, Выживание"
    },
    "equipment": [
      "Выберите А или Б:",
      {
        "type": "list",
        "attrs": {
          "type": "unordered"
        },
        "content": [
          "А) {@item секира|url:greataxe-phb}, 4 {@item ручных топора|url:handaxe-phb}, {@item набор путешественника|url:explorer-s-pack-phb} и 15 зм.",
          "Б) 75 зм."
        ]
      }
    ],
    "savingThrows": "Сила, Телосложение",
    "features": [
      {
        "isSubclass": false,
        "key": "zasita-bez-dospehov",
        "level": 1,
        "name": "Защита без доспехов",
        "description": [
          "Пока вы не носите доспехи, ваш базовый класс доспеха равен 10 + ваши модификаторы Ловкости и Телосложения. Вы можете использовать щит и всё равно получать преимущество от этого умения."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "arost",
        "level": 1,
        "name": "Ярость",
        "description": [
          "Вы можете наделить себя первобытной силой под названием ярость — силой с необычайной мощью и {@glossary сопротивлением|url:resistance-phb}. Вы можете войти в состояние Ярости {@glossary бонусным действием|url:bonus-action-phb}, если вы не носите тяжёлый доспех.",
          "Вы можете использовать свою ярость столько раз, сколько указано для вашего уровня варвара в столбце «Ярость» из таблицы «Умения варвара». Вы восстанавливаете 1 потраченное использование, когда заканчиваете {@glossary короткий отдых|url:short-rest-phb}, и вы восстанавливаете все потраченные использования, когда заканчиваете {@glossary продолжительный отдых|url:long-rest-phb}.",
          "Во время ярости вы получаете следующие эффекты:",
          {
            "type": "list",
            "attrs": {
              "type": "unordered"
            },
            "content": [
              "{@b Сопротивление к урону.} У вас есть {@glossary сопротивление|url:resistance-phb} к дробящему, колющему и рубящему урону.",
              "{@b Урон ярости.} Когда вы совершаете {@glossary атаку|url:attack-phb} с использованием Силы (оружием или безоружным ударом) и наносите урон цели, то вы получаете бонус к урону, который увеличивается по мере того, как вы получаете уровни варвара, как указано в столбце «Урон ярости» из таблицы «Умения варвара».",
              "{@b Преимущество силы.} У вас есть {@glossary преимущество|url:advantage-phb} на проверки и {@glossary спасброски|url:saving-throw-phb} Силы.",
              "{@b Без концентрации и заклинаний.} Вы не можете поддерживать концентрацию и не можете накладывать {@glossary заклинания|url:spell-phb}.",
              "{@b Длительность.} Ярость длится до конца вашего следующего хода и заканчивается раньше, если вы надеваете тяжёлый доспех или находитесь в состоянии {@glossary недееспособный|url:incapacitated-phb}. Если ваша ярость всё ещё активна в ваш следующий ход, то вы можете продлить ярость на ещё один раунд, выполнив одно из следующих действий:",
              {
                "type": "list",
                "attrs": {
                  "type": "unordered"
                },
                "content": [
                  "Совершить {@glossary бросок атаки|url:attack-roll-phb} против врага.",
                  "Заставить врага совершить {@glossary спасбросок|url:saving-throw-phb}.",
                  "Использовать {@glossary бонусное действие|url:bonus-action-phb} для продления ярости."
                ]
              }
            ]
          },
          "Каждый раз, когда ярость продлевается, она длится до конца вашего следующего хода. Вы можете поддерживать ярость до 10 минут."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "oruzejnye-priemy",
        "level": 1,
        "name": "Оружейные приёмы",
        "description": [
          "Ваша тренировка с оружием позволяет вам использовать оружейные приёмы 2 типов простого или воинского рукопашного оружия по вашему выбору, например, секир и ручных топоров. Когда вы заканчиваете {@glossary продолжительный отдых|url:long-rest-phb}, вы можете попрактиковать упражнения с оружием и поменять 1 из этих типов оружия.",
          "Когда вы достигаете определённых уровней варвара, вы получаете возможность использовать приёмы большего количества типов оружия, как показано в столбце «Приёмы» из таблицы «Умения варвара»."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "cuvstvo-opasnosti",
        "level": 2,
        "name": "Чувство опасности",
        "description": [
          "Вы получаете сверхъестественную чувствительность и теперь замечаете, если что-то не так. Это даёт вам возможность уклоняться от опасности. У вас есть {@glossary преимущество|url:advantage-phb} в {@glossary спасбросках|url:saving-throw-phb} Ловкости, если у вас нет состояния {@glossary недееспособный|url:incapacitated-phb}."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "bezrassudnaa-ataka",
        "level": 2,
        "name": "Безрассудная атака",
        "description": [
          "Вы можете отбросить все заботы о защите и атаковать с ещё большей свирепостью. Когда вы совершаете первый {@glossary бросок атаки|url:attack-roll-phb} в свой ход, вы можете решить атаковать безрассудно. Это даёт вам {@glossary преимущество|url:advantage-phb} при {@glossary бросках атаки|url:attack-roll-phb} с использованием Силы до начала вашего следующего хода, но {@glossary броски атаки|url:attack-roll-phb} по вам совершаются с {@glossary преимуществом|url:advantage-phb}."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "podklass-varvara",
        "level": 3,
        "name": "Подкласс варвара",
        "description": [
          "Вы получаете подкласс варвара по вашему выбору. Подклассы Пути Берсерка, Пути Дикого сердца, Пути Мирового древа и Пути Фанатика подробно описаны после умений этого класса. Подкласс — это специализация, которая предоставляет вам возможности на определённых уровнях варвара. В ходе дальнейшего развития вы получаете каждые умения вашего подкласса, которые соответствуют вашему уровню варвара или ниже."
        ],
        "additional": "",
        "scaling": [
          {
            "level": 6,
            "name": "Умение подкласса",
            "description": [
              "Вы получаете умения подкласса."
            ],
            "additional": "",
            "hideInSubclasses": false
          },
          {
            "level": 10,
            "name": "Умение подкласса",
            "description": [
              "Вы получаете умения подкласса."
            ],
            "additional": "",
            "hideInSubclasses": false
          },
          {
            "level": 14,
            "name": "Умение подкласса",
            "description": [
              "Вы получаете умения подкласса."
            ],
            "additional": "",
            "hideInSubclasses": false
          }
        ],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "pervobytnoe-znanie",
        "level": 3,
        "name": "Первобытное знание",
        "description": [
          "Вы получаете владение навыком, которым не владеете, по вашему выбору из списка навыков, доступных варварам на 1 уровне.",
          "Кроме того, пока ваша ярость активна, вы можете направлять первобытную мощь, когда пытаетесь выполнить определённые задачи; каждый раз, когда вы совершаете проверку характеристики, используя один из следующих навыков — Акробатика, Запугивание, Внимательность, Скрытность или Выживание — вы можете сделать это проверкой Силы, даже если она обычно использует другую характеристику. Когда вы используете эту способность, ваша Сила представляет собой первобытную мощь, протекающую через вас, усиливая ваши проворство, выдержку и чувства."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "ulucsenie-harakteristik",
        "level": 4,
        "name": "Улучшение характеристик",
        "description": [
          "Вы получаете черту «Улучшение характеристик» (см. главу 5) или другую черту по вашему выбору, требованиям которой вы соответствуете. Вы снова получаете эту способность на уровнях варвара 8, 12 и 16."
        ],
        "additional": "",
        "scaling": [
          {
            "level": 8,
            "name": "Улучшение характеристик",
            "description": [
              "Вы получаете черту «{@feat Улучшение характеристик|url:ability-score-improvement-phb}» (см. главу 5) или другую черту по вашему выбору, требованиям которой вы соответствуете."
            ],
            "additional": "",
            "hideInSubclasses": false
          },
          {
            "level": 12,
            "name": "Улучшение характеристик",
            "description": [
              "Вы получаете черту «{@feat Улучшение характеристик|url:ability-score-improvement-phb}» (см. главу 5) или другую черту по вашему выбору, требованиям которой вы соответствуете."
            ],
            "additional": "",
            "hideInSubclasses": false
          },
          {
            "level": 16,
            "name": "Улучшение характеристик",
            "description": [
              "Вы получаете черту «{@feat Улучшение характеристик|url:ability-score-improvement-phb}» (см. главу 5) или другую черту по вашему выбору, требованиям которой вы соответствуете."
            ],
            "additional": "",
            "hideInSubclasses": false
          }
        ],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "dopolnitelnaa-ataka",
        "level": 5,
        "name": "Дополнительная атака",
        "description": [
          "Вы можете атаковать 2 раза вместо одного, когда вы совершаете {@glossary действие|url:action-phb} {@glossary атака|url:attack-phb} в свой ход."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "bystroe-peredvizenie",
        "level": 5,
        "name": "Быстрое передвижение",
        "description": [
          "Ваша скорость увеличивается на 10 футов, пока вы не носите тяжёлый доспех."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "dikij-instinkt",
        "level": 7,
        "name": "Дикий инстинкт",
        "description": [
          "Ваши инстинкты настолько остры, что у вас есть {@glossary преимущество|url:advantage-phb} на броски инициативы."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "instinktivnyj-brosok",
        "level": 7,
        "name": "Инстинктивный бросок",
        "description": [
          "Частью {@glossary бонусного действия|url:bonus-action-phb}, которое вы совершаете, чтобы войти в ярость, вы можете переместиться на половину своей {@glossary скорости|url:speed-phb}."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "zestokij-udar",
        "level": 9,
        "name": "Жестокий удар",
        "description": [
          "Если вы используете Безрассудную атаку, то вы можете отказаться от любого {@glossary преимущества|url:advantage-phb} в одном {@glossary броске атаки|url:attack-roll-phb} на основе Силы по вашему выбору в ваш ход. Выбранный бросок атаки не должен иметь {@glossary помехи|url:disadvantage-phb}. Если этот бросок атаки попадает, то цель получает дополнительно {@roll 1к10} того же типа урона, и вы можете вызвать один эффект Жестокого удара по вашему выбору.",
          "У вас есть следующие варианты эффектов:",
          {
            "type": "list",
            "attrs": {
              "type": "unordered"
            },
            "content": [
              "{@b Мощный удар.} Вы толкаете цель на 15 футов от себя. Затем вы можете переместиться до половины своей {@glossary скорости|url:speed-phb} к цели, не вызывая {@glossary провоцированных атак|url:opportunity-attack-phb}.",
              "{@b Удар по сухожилию.} {@glossary Скорость|url:speed-phb} цели снижается на 15 футов до начала вашего следующего хода. Цель может быть под эффектом только одного Удара по сухожилию за раз — самого последнего."
            ]
          }
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "nepreklonnaa-arost",
        "level": 11,
        "name": "Непреклонная ярость",
        "description": [
          "Ваша ярость может заставить вас сражаться, несмотря на тяжёлые раны. Если ваши {@glossary хиты|url:hit-points-phb} опустятся до 0, пока ваша ярость активна, и вы не умираете сразу, то вы можете использовать это умение и совершить {@glossary спасбросок|url:saving-throw-phb} Телосложения со {@glossary Сл.|url:difficulty-class-phb} 10.",
          "В случае успеха ваши {@glossary хиты|url:hit-points-phb} вместо этого изменятся на число, равное вашему удвоенному уровню варвара.",
          "Каждый раз, когда вы используете это умение после первого, {@glossary Сл.|url:difficulty-class-phb} увеличивается на 5. Когда вы заканчиваете {@glossary короткий отдых|url:short-rest-phb} или {@glossary продолжительный отдых|url:long-rest-phb}, то {@glossary Сл.|url:difficulty-class-phb} сбрасывается до 10."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "ulucsennyj-zestokij-udar",
        "level": 13,
        "name": "Улучшенный Жестокий удар",
        "description": [
          "Вы отточили новые способы яростной атаки. Следующие эффекты теперь среди ваших вариантов {@link Жестокого удара|url:#zestokij-udar}:",
          {
            "type": "list",
            "attrs": {
              "type": "unordered"
            },
            "content": [
              "{@b Шокирующий удар.} Цель получает {@glossary помеху|url:disadvantage-phb} на следующий {@glossary спасбросок|url:saving-throw-phb}, который она совершает, и она не может совершать {@glossary провоцированные атаки|url:opportunity-attack-phb} до начала вашего следующего хода.",
              "{@b Разрушительный удар.} До начала вашего следующего хода следующий {@glossary бросок атаки|url:attack-roll-phb}, сделанный другим {@glossary существом|url:creature-phb} против цели, получает бонус +5 к броску. {@glossary Бросок атаки|url:attack-roll-phb} может получить только один бонус {@i Разрушительного удара}."
            ]
          }
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "nepreryvnaa-arost",
        "level": 15,
        "name": "Непрерывная ярость",
        "description": [
          "Когда вы бросаете инициативу, вы можете восстановить все потраченные использования ярости. После того как вы восстановите использования ярости таким образом, вы не сможете сделать это снова, пока не закончите {@glossary продолжительный отдых|url:long-rest-phb}.",
          "Кроме того, ваша ярость настолько сильная, что теперь она длится 10 минут, и вам не нужно ничего делать, чтобы продлить её от раунда к раунду.",
          "Ваша ярость заканчивается раньше, если у вас состояние {@glossary бессознательный|url:unconscious-phb} (состояние {@glossary недееспособный|url:incapacitated-phb} с этим умением не заканчивает ярость) или вы надеваете тяжёлый доспех."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "ulucsennyj-zestokij-udar",
        "level": 17,
        "name": "Улучшенный Жестокий удар",
        "description": [
          "Дополнительный урон от {@link Жестокого удара|url:#zestokij-udar} увеличивается до {@roll 2к10}. Кроме того, вы можете использовать два разных эффекта {@link Жестокого удара|url:#zestokij-udar} каждый раз, когда используете умение {@link Жестокий удар|url:#zestokij-udar}."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "neukrotimaa-mos",
        "level": 18,
        "name": "Неукротимая мощь",
        "description": [
          "Если ваш итоговый результат проверки Силы или {@glossary спасброска|url:saving-throw-phb} Силы меньше вашего показателя Силы, то вы можете использовать этот показатель вместо итогового результата."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "epiceskaa-certa",
        "level": 19,
        "name": "Эпическая черта",
        "description": [
          "Вы получаете эпическую черту (см. главу 5) или другую черту по вашему выбору, требованиям которой вы соответствуете. Рекомендуется черта {@feat Дар непреодолимого нападения [Boon of Irresistible Offense]|url:boon-of-irresistible-offense-phb}."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "pervobytnyj-cempion",
        "level": 20,
        "name": "Первобытный чемпион",
        "description": [
          "Вы воплощаете первобытную силу. Ваши показатели Силы и Телосложения увеличиваются на 4, при максимальном значении до 25."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      }
    ],
    "table": [
      {
        "name": "Ярость",
        "scaling": [
          {
            "level": 1,
            "value": "2"
          },
          {
            "level": 3,
            "value": "3"
          },
          {
            "level": 6,
            "value": "4"
          },
          {
            "level": 12,
            "value": "5"
          },
          {
            "level": 17,
            "value": "6"
          }
        ]
      },
      {
        "name": "Урон ярости",
        "scaling": [
          {
            "level": 1,
            "value": "+2"
          },
          {
            "level": 9,
            "value": "+3"
          },
          {
            "level": 16,
            "value": "+4"
          }
        ]
      },
      {
        "name": "Приёмы",
        "scaling": [
          {
            "level": 1,
            "value": "2"
          },
          {
            "level": 4,
            "value": "3"
          },
          {
            "level": 10,
            "value": "4"
          }
        ]
      }
    ],
    "casterType": "NONE",
    "hasSubclasses": true,
    "name": {
      "rus": "Варвар",
      "eng": "Barbarian"
    },
    "source": {
      "name": {
        "label": "PHB",
        "rus": "Книга игрока",
        "eng": "Player Handbook"
      },
      "group": {
        "label": "Basic",
        "rus": "Официальные источники"
      },
      "page": 59
    }
  },
  {
    "url": "fighter-phb",
    "gallery": [
      "/s3/classes/peterko/1759866321768-fighter2.webp",
      "/s3/classes/magistrus/1759905278260-fighter2.webp"
    ],
    "image": "/s3/classes/peterko/1759866317969-fighter.webp",
    "description": [
      "{@i Мастер в использовании любых доспехов и оружия.}",
      "Воины определяют исход сражений. Рыцари-приключенцы, королевские чемпионы, элитные солдаты и закалённые наёмники — как воины, все они непревзойденные мастера обращения с оружием и доспехами. Они хорошо знакомы со смертью, как сея её, так и бросая ей вызов.",
      "Воины владеют различными оружейными приёмами. Хорошо экипированный воин всегда имеет нужный инструмент под рукой для любой боевой ситуации. Точно так же воин искусен в использовании любой формы доспехов. Помимо этого, каждый воин специализируется на определённых стилях боя. Некоторые концентрируются на стрельбе из лука, некоторые — на сражении двумя оружиями одновременно, а некоторые — на усилении своих боевых навыков с помощью {@glossary магии|url:magic-phb}. Это сочетание широких способностей и обширной специализации делает воинов превосходными бойцами.",
      {
        "type": "heading",
        "attrs": {
          "level": "2"
        },
        "content": [
          {
            "type": "text",
            "text": "Становление воином..."
          }
        ]
      },
      "{@b Как персонаж 1 уровня:}",
      {
        "type": "list",
        "attrs": {
          "type": "unordered"
        },
        "content": [
          "Получите особенности из таблицы «Особенности воина».",
          "Получите умения воина 1 уровня, которые перечислены в таблице «Умения воина»."
        ]
      },
      "{@b Как мультикласс:}",
      {
        "type": "list",
        "attrs": {
          "type": "unordered"
        },
        "content": [
          "Получите следующие особенности из таблицы «Особенности воина»: кость {@glossary хитов|url:hit-points-phb}, владение воинским оружием, владение лёгкими, средними доспехами и щитами.",
          "Получите умения воина 1 уровня, которые перечислены в таблице «Умения воина»."
        ]
      }
    ],
    "updatedAt": "2026-01-09T10:03:42.482343Z",
    "userId": "Magistrus",
    "hitDice": {
      "label": "к10",
      "value": "d10",
      "maxValue": 10,
      "avg": 6
    },
    "primaryCharacteristics": "Сила или Ловкость",
    "proficiency": {
      "armor": "Щит, Средний доспех, Тяжелый доспех, Легкий доспех",
      "weapon": "Простое дальнобойное, Воинское рукопашное, Простое рукопашное, Воинское дальнобойное",
      "tool": "",
      "skill": "Выберите 2 навыка из следующих: Акробатика, Атлетика, Внимательность, Выживание, Запугивание, История, Проницательность, Убеждение, Уход за животными"
    },
    "equipment": [
      "Выберите А, Б или В:",
      {
        "type": "list",
        "attrs": {
          "type": "unordered"
        },
        "content": [
          "А) {@item кольчуга|url:chain-mail-phb}, {@item двуручный меч|url:greatsword-phb}, {@item цеп|url:flail-phb}, 8 {@item метательных копий|url:javelin-phb}, {@item набор исследователя подземелий|url:dungeoneer-s-pack-phb} и 4 зм.",
          "Б) {@item проклёпанная кожа|url:studded-leather-armor-phb}, {@item скимитар|url:scimitar-phb}, {@item короткий меч|url:shortsword-phb}, {@item длинный лук|url:longbow-phb}, 20 {@item стрел|url:arrow-phb}, {@item колчан|url:quiver-phb}, {@item набор исследователя подземелий|url:dungeoneer-s-pack-phb} и 11 зм.",
          "В) 155 зм."
        ]
      }
    ],
    "savingThrows": "Сила, Телосложение",
    "features": [
      {
        "isSubclass": false,
        "key": "boevoj-stil",
        "level": 1,
        "name": "Боевой стиль",
        "description": [
          "Вы получаете черту боевого стиля по вашему выбору (см. главу 5). Рекомендуется черта {@feat Защита [Defense]|url:defense-phb}.",
          "Когда вы получаете уровень воина, вы можете заменить выбранную вами черту другой чертой боевого стиля."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "vtoroe-dyhanie",
        "level": 1,
        "name": "Второе дыхание",
        "description": [
          "У вас есть ограниченный запас физической и умственной выносливости, из которого вы можете черпать силы. {@glossary Бонусным действием|url:bonus-action-phb} вы можете использовать его, чтобы восстановить {@glossary хиты|url:hit-points-phb}, равные {@roll 1к10} + ваш уровень воина. Вы можете использовать это умение дважды. Вы восстанавливаете одно израсходованное использование, когда заканчиваете {@glossary короткий отдых|url:short-rest-phb}, и вы восстанавливаете все израсходованные использования, когда заканчиваете {@glossary продолжительный отдых|url:long-rest-phb}.",
          "Когда вы достигаете определённых уровней воина, вы получаете больше использований этого умения, как показано в столбце «Второе дыхание» из таблицы «Умения воина»."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "oruzejnye-priemy",
        "level": 1,
        "name": "Оружейные приёмы",
        "description": [
          "Ваши тренировки с оружием позволяют вам использовать оружейные приёмы 3 типов простого или воинского оружия по вашему выбору. Когда вы заканчиваете {@glossary продолжительный отдых|url:long-rest-phb}, вы можете попрактиковать упражнения с оружием и поменять 1 из этих типов оружия.",
          "Когда вы достигаете определённых уровней воина, вы получаете возможность использовать оружейные приёмы большего количества типов оружия, как показано в столбце «Оружейные приёмы» в таблице «Умения воина»."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "vsplesk-dejstvij",
        "level": 2,
        "name": "Всплеск действий",
        "description": [
          "Вы можете на мгновение преодолеть свои обычные возможности. В свой ход вы можете выполнить одно дополнительное {@glossary действие|url:action-phb}, кроме действия {@glossary магия|url:magic-phb}.",
          "Как только вы используете эту способность, то вы не можете сделать это снова, пока не закончите {@glossary короткий отдых|url:short-rest-phb} или {@glossary продолжительный отдых|url:long-rest-phb}.",
          "Начиная с 17 уровня, вы можете использовать её дважды перед отдыхом, но только 1 раз в ход."
        ],
        "additional": "",
        "scaling": [
          {
            "level": 17,
            "name": "Всплеск действий (2 использования)",
            "description": [
              "Начиная с 17 уровня, вы можете использовать Всплеск действий дважды перед отдыхом, но только 1 раз в ход."
            ],
            "additional": "",
            "hideInSubclasses": false
          }
        ],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "takticeskij-razum",
        "level": 2,
        "name": "Тактический разум",
        "description": [
          "Вы используете тактику на поле боя и за его пределами. Когда вы проваливаете проверку характеристики, вы можете потратить использование своего умения «Второе дыхание», чтобы подтолкнуть себя к успеху. Вместо того чтобы восстанавливать {@glossary хиты|url:hit-points-phb}, вы бросаете {@roll 1к10} и добавляете выпавшее число к проверке характеристики, потенциально превращая её в успех. Если проверка всё ещё провалена, то это использование «Второго дыхания» не тратится."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "podklass-voina",
        "level": 3,
        "name": "Подкласс воина",
        "description": [
          "Вы получаете подкласс воина по вашему выбору. Подклассы Мастер боевых искусств, Чемпион, Мистический рыцарь и Пси-воин подробно описаны после умений этого класса.",
          "Подкласс — это специализация, которая предоставляет вам возможности на определённых уровнях воина. В ходе дальнейшего развития вы получаете каждое умение вашего подкласса, которое соответствует вашему уровню воина или ниже."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "ulucsenie-harakteristik",
        "level": 4,
        "name": "Улучшение характеристик",
        "description": [
          "Вы получаете черту {@feat Улучшение характеристик [Ability Score Improvement]|url:ability-score-improvement-phb} (см. главу 5) или другую черту по вашему выбору, требованиям которой вы соответствуете.",
          "Вы снова получаете эту способность на уровнях воина 6, 8, 12, 14 и 16."
        ],
        "additional": "",
        "scaling": [
          {
            "level": 6,
            "name": "Улучшение характеристик",
            "description": [
              "Вы получаете черту {@feat Улучшение характеристик [Ability Score Improvement]|url:ability-score-improvement-phb} (см. главу 5) или другую черту по вашему выбору, требованиям которой вы соответствуете."
            ],
            "additional": "",
            "hideInSubclasses": false
          },
          {
            "level": 8,
            "name": "Улучшение характеристик",
            "description": [
              "Вы получаете черту {@feat Улучшение характеристик [Ability Score Improvement]|url:ability-score-improvement-phb} (см. главу 5) или другую черту по вашему выбору, требованиям которой вы соответствуете."
            ],
            "additional": "",
            "hideInSubclasses": false
          },
          {
            "level": 12,
            "name": "Улучшение характеристик",
            "description": [
              "Вы получаете черту {@feat Улучшение характеристик [Ability Score Improvement]|url:ability-score-improvement-phb} (см. главу 5) или другую черту по вашему выбору, требованиям которой вы соответствуете."
            ],
            "additional": "",
            "hideInSubclasses": false
          },
          {
            "level": 14,
            "name": "Улучшение характеристик",
            "description": [
              "Вы получаете черту {@feat Улучшение характеристик [Ability Score Improvement]|url:ability-score-improvement-phb} (см. главу 5) или другую черту по вашему выбору, требованиям которой вы соответствуете."
            ],
            "additional": "",
            "hideInSubclasses": false
          },
          {
            "level": 16,
            "name": "Улучшение характеристик",
            "description": [
              "Вы получаете черту {@feat Улучшение характеристик [Ability Score Improvement]|url:ability-score-improvement-phb} (см. главу 5) или другую черту по вашему выбору, требованиям которой вы соответствуете."
            ],
            "additional": "",
            "hideInSubclasses": false
          }
        ],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "dopolnitelnaa-ataka",
        "level": 5,
        "name": "Дополнительная атака",
        "description": [
          "Вы можете атаковать 2 раза вместо одного, когда совершаете {@glossary действие|url:action-phb} {@glossary атака|url:attack-phb} в свой ход."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "takticeskoe-peremesenie",
        "level": 5,
        "name": "Тактическое перемещение",
        "description": [
          "Каждый раз, активируя ваше умение «Второе дыхание» {@glossary бонусным действием|url:bonus-action-phb}, вы можете переместиться до половины своей {@glossary скорости|url:speed-phb}, не вызывая {@glossary провоцированные атаки|url:opportunity-attack-phb}."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "upornyj",
        "level": 9,
        "name": "Упорный",
        "description": [
          "Если вы провалили {@glossary спасбросок|url:saving-throw-phb}, вы можете перебросить его с бонусом, равным вашему уровню воина. Вы должны использовать новый бросок, и вы не сможете использовать это умение снова, пока не закончите {@glossary продолжительный отдых|url:long-rest-phb}. Вы можете использовать это умение дважды перед продолжительным отдыхом, начиная с 13 уровня, и трижды, начиная с 17 уровня."
        ],
        "additional": "",
        "scaling": [
          {
            "level": 13,
            "name": "Упорный (2 использования)",
            "description": [],
            "additional": "",
            "hideInSubclasses": false
          },
          {
            "level": 17,
            "name": "Упорный (3 использования)",
            "description": [],
            "additional": "",
            "hideInSubclasses": false
          }
        ],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "master-taktiki",
        "level": 9,
        "name": "Мастер тактики",
        "description": [
          "Когда вы атакуете оружием с оружейным приёмом, который вы можете использовать, вы можете заменить его на приём толкание, изнурение или замедление для этой атаки."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "dve-dopolnitelnye-ataki",
        "level": 11,
        "name": "Две дополнительные атаки",
        "description": [
          "Вы можете атаковать 3 раза вместо одного, когда совершаете {@glossary действие|url:action-phb} {@glossary атака|url:attack-phb} в свой ход."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "izucennye-ataki",
        "level": 13,
        "name": "Изученные атаки",
        "description": [
          "Вы изучаете своих противников и учитесь на каждой своей атаке. Если вы совершаете {@glossary бросок атаки|url:attack-roll-phb} против {@glossary существа|url:creature-phb} и промахиваетесь, то у вас есть {@glossary преимущество|url:advantage-phb} на ваш следующий бросок атаки против этого существа до конца вашего следующего хода."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "epiceskaa-certa",
        "level": 19,
        "name": "Эпическая черта",
        "description": [
          "Вы получаете эпическую черту (см. главу 5) или другую черту по вашему выбору, требованиям которой вы соответствуете. Рекомендуется черта {@feat Дар боевой доблести [Boon of Combat Prowess]|url:boon-of-combat-prowess-phb}."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "tri-dopolnitelnyh-ataki",
        "level": 20,
        "name": "Три дополнительных атаки",
        "description": [
          "Вы можете атаковать 4 раза вместо одного, когда совершаете {@glossary действие|url:action-phb} {@glossary атака|url:attack-phb} в свой ход."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      }
    ],
    "table": [
      {
        "name": "Второе дыхание",
        "scaling": [
          {
            "level": 1,
            "value": "2"
          },
          {
            "level": 4,
            "value": "3"
          },
          {
            "level": 10,
            "value": "4"
          }
        ]
      },
      {
        "name": "Оружейные приёмы",
        "scaling": [
          {
            "level": 1,
            "value": "3"
          },
          {
            "level": 4,
            "value": "4"
          },
          {
            "level": 10,
            "value": "5"
          },
          {
            "level": 16,
            "value": "6"
          }
        ]
      }
    ],
    "casterType": "NONE",
    "hasSubclasses": true,
    "name": {
      "rus": "Воин",
      "eng": "Fighter"
    },
    "source": {
      "name": {
        "label": "PHB",
        "rus": "Книга игрока",
        "eng": "Player Handbook"
      },
      "group": {
        "label": "Basic",
        "rus": "Официальные источники"
      },
      "page": 67
    }
  },
  {
    "url": "wizard-phb",
    "gallery": [
      "/s3/classes/peterko/1759866350561-wizard2.webp",
      "/s3/classes/magistrus/1759905409171-wizard2.webp",
      "/s3/classes/magistrus/1759905460312-wizard3.webp",
      "/s3/classes/magistrus/1761636672989-wizard4.webp"
    ],
    "image": "/s3/classes/magistrus/1761636662013-wizard.webp",
    "description": [
      "{@i Учёный-маг, использующий арканную силу}",
      "Волшебники посвящают себя тщательному изучению внутреннего устройства магии. Они накладывают заклинания взрывного огня, искрящихся молний, тонкого обмана и поразительных превращений. Их магия способна вызывать чудовищ с других планов бытия, предсказывать будущее или возводить защитные барьеры. Их самые могущественные заклинания могут превращать одно вещество в другое, вызывать метеориты с небес и открывать порталы в другие миры.",
      "Большинство волшебников придерживаются научного подхода к {@glossary магии|url:magic-phb}. Они изучают её теоретические основы, в частности классификацию заклинаний по школам магии. Известные волшебники, такие как Бигби, Таша, Морденкайнен и Йоланда, на основе своих исследований изобрели культовые заклинания, которые теперь используются по всей мультивселенной.",
      "Некоторые волшебники живут спокойной жизнью и выполняют роли мудрецов или лекторов. Другие же предлагают свои услуги в качестве советников, служат в вооружённых силах или занимаются преступной деятельностью и стремятся к власти.",
      "Но соблазн знаний манит даже самых обделённых приключенческим духом волшебников из безопасности их библиотек и лабораторий к заброшенным руинам и потерянным городам. Большинство волшебников считает, что их коллегам из древних цивилизаций были известны секреты магии, утерянные на века. Тем, кто их разгадает, открылся бы путь к магической силе, о которой в нынешнюю эпоху нельзя и мечтать.",
      {
        "type": "quote",
        "attrs": {
          "color": "primary",
          "variant": "outline"
        },
        "content": [
          {
            "type": "text",
            "text": "Заклинания, которые вы добавляете в свою книгу заклинаний, получая уровни, отражают проводимые вами исследования, но во время приключений вы также можете найти другие заклинания и добавить их в книгу. Например, вы можете обнаружить свиток заклинания, содержащий заклинание волшебника, а затем скопировать его в собственную книгу."
          },
          {
            "type": "break"
          },
          {
            "type": "bold",
            "content": [
              {
                "type": "text",
                "text": "Копирование заклинания в книгу."
              }
            ]
          },
          {
            "type": "text",
            "text": " Когда вы находите заклинание волшебника 1-го или более высокого уровня, вы можете добавить его в свою книгу заклинаний, если оно имеет уровень, заклинания которого вы можете подготавливать, и у вас есть время для его копирования."
          },
          {
            "type": "text",
            "text": " За каждый уровень заклинания процесс переписывания занимает 2 часа и стоит 50 зм. Затем вы можете подготавливать это заклинание подобно прочим заклинаниям из вашей книги."
          },
          {
            "type": "break"
          },
          {
            "type": "bold",
            "content": [
              {
                "type": "text",
                "text": "Копирование книги."
              }
            ]
          },
          {
            "type": "text",
            "text": " Вы можете копировать заклинание из своей книги заклинаний в другую. Это делается так же, как и простое копирование заклинаний, но быстрее, так как вы уже знаете, как накладывать это заклинание."
          },
          {
            "type": "text",
            "text": " Вам необходимо потратить только по 10 золотых монет и 1 час за каждый уровень копируемого заклинания."
          },
          {
            "type": "break"
          },
          {
            "type": "text",
            "text": "Если вы потеряли свою книгу заклинаний, то вы можете использовать ту же процедуру для переписывания заклинаний, которые у вас подготовлены, в новую книгу заклинаний. Для заполнения оставшейся части книги заклинаний уже придётся искать новые заклинания. По этой причине многие волшебники держат при себе запасную книгу заклинаний."
          }
        ]
      },
      {
        "type": "heading",
        "attrs": {
          "level": "2"
        },
        "content": [
          {
            "type": "text",
            "text": "Становление волшебником..."
          }
        ]
      },
      "{@b Как персонаж 1 уровня:}",
      {
        "type": "list",
        "attrs": {
          "type": "unordered"
        },
        "content": [
          "Получите особенности из таблицы «Особенности волшебника».",
          "Получите умения волшебника 1 уровня, которые перечислены в таблице «Умения волшебника»."
        ]
      },
      "{@b Как мультикласс:}",
      {
        "type": "list",
        "attrs": {
          "type": "unordered"
        },
        "content": [
          "Получите кость хитов из таблицы «Особенности волшебника».",
          "Получите умения волшебника 1 уровня, которые перечислены в таблице «Умения волшебника». См. правила мультиклассирования в главе 2, чтобы определить доступные ячейки заклинаний."
        ]
      },
      {
        "type": "heading",
        "attrs": {
          "level": "2"
        },
        "content": [
          {
            "type": "text",
            "text": "Список заклинаний волшебника"
          }
        ]
      },
      "В этом разделе представлен список заклинаний волшебника. Заклинания отсортированы по уровню и алфавиту, а также указана школа магии каждого заклинания.{@br}В столбце {@b «Особое»} ({@i Специальное}) обозначения имеют следующий смысл: {@b К} — заклинание требует концентрации; {@b Р} — заклинание можно сотворить как ритуал; {@b М} — заклинание требует особый материальный компонент.",
      {
        "type": "table",
        "caption": "Заклинания волшебника 0 уровня",
        "colLabels": [
          "Заклинание",
          "Школа",
          "Особое"
        ],
        "colStyles": [
          "w-2/5 text-left",
          "w-1/3",
          "w-1/4 text-center"
        ],
        "rows": [
          [
            "{@spell Брызги кислоты [Acid Splash]|url:acid-splash-phb}",
            "Воплощение",
            "—"
          ],
          [
            "{@spell Волшебная рука [Mage Hand]|url:mage-hand-phb}",
            "Вызов",
            "—"
          ],
          [
            "{@spell Дружба [Friends]|url:friends-phb}",
            "Очарование",
            "К"
          ],
          [
            "{@spell Защита от оружия [Blade Ward]|url:blade-ward-phb}",
            "Ограждение",
            "К"
          ],
          [
            "{@spell Леденящее прикосновение [Chill Touch]|url:chill-touch-phb}",
            "Некромантия",
            "—"
          ],
          [
            "{@spell Луч холода [Ray of Frost]|url:ray-of-frost-phb}",
            "Воплощение",
            "—"
          ],
          [
            "{@spell Малая иллюзия [Minor Illusion]|url:minor-illusion-phb}",
            "Иллюзия",
            "—"
          ],
          [
            "{@spell Меткий удар [True Strike]|url:true-strike-phb}",
            "Прорицание",
            "—"
          ],
          [
            "{@spell Огненный снаряд [Fire Bolt]|url:fire-bolt-phb}",
            "Воплощение",
            "—"
          ],
          [
            "{@spell Пляшущие огоньки [Dancing Lights]|url:dancing-lights-phb}",
            "Воплощение",
            "К"
          ],
          [
            "{@spell Погребальный звон [Toll the Dead]|url:toll-the-dead-phb}",
            "Некромантия",
            "—"
          ],
          [
            "{@spell Починка [Mending]|url:mending-phb}",
            "Преобразование",
            "—"
          ],
          [
            "{@spell Раскат грома [Thunderclap]|url:thunderclap-phb}",
            "Воплощение",
            "—"
          ],
          [
            "{@spell Расщепление разума [Mind Split]|url:mind-split-homebrew}",
            "Очарование",
            "—"
          ],
          [
            "{@spell Свет [Light]|url:light-phb}",
            "Воплощение",
            "—"
          ],
          [
            "{@spell Сообщение [Message]|url:message-phb}",
            "Преобразование",
            "—"
          ],
          [
            "{@spell Фокусы [Prestidigitation]|url:prestidigitation-phb}",
            "Преобразование",
            "—"
          ],
          [
            "{@spell Электрошок [Shocking Grasp]|url:shocking-grasp-phb}",
            "Воплощение",
            "—"
          ],
          [
            "{@spell Элементализм [Elementalism]|url:elementalism-homebrew}",
            "Преобразование",
            "—"
          ],
          [
            "{@spell Ядовитые брызги [Poison Spray]|url:poison-spray-phb}",
            "Некромантия",
            "—"
          ]
        ]
      },
      {
        "type": "table",
        "caption": "Заклинания волшебника 1 уровня",
        "colLabels": [
          "Заклинание",
          "Школа",
          "Особое"
        ],
        "colStyles": [
          "w-2/5 text-left",
          "w-1/3",
          "w-1/4 text-center"
        ],
        "rows": [
          [
            "{@spell Безмолвный образ [Silent Image]|url:silent-image-phb}",
            "Иллюзия",
            "К"
          ],
          [
            "{@spell Ведьмин снаряд [Witch Bolt]|url:witch-bolt-phb}",
            "Воплощение",
            "К"
          ],
          [
            "{@spell Волна грома [Thunderwave]|url:thunderwave-phb}",
            "Воплощение",
            "—"
          ],
          [
            "{@spell Волшебная стрела [Magic Missile]|url:magic-missile-phb}",
            "Воплощение",
            "—"
          ],
          [
            "{@spell Доспехи мага [Mage Armor]|url:mage-armor-phb}",
            "Ограждение",
            "—"
          ],
          [
            "{@spell Жуткий смех Таши [Tasha’s Hideous Laughter]|url:hideou-s-laughter-phb}",
            "Очарование",
            "К"
          ],
          [
            "{@spell Защита от зла и добра [Protection from Evil and Good]|url:protection-from-evil-and-good-phb}",
            "Ограждение",
            "К, М"
          ],
          [
            "{@spell Иллюзорные письмена [Illusory Script]|url:illusory-script-phb}",
            "Иллюзия",
            "Р, М"
          ],
          [
            "{@spell Ледяной кинжал [Ice Knife]|url:ice-knife-phb}",
            "Вызов",
            "—"
          ],
          [
            "{@spell Луч болезни [Ray of Sickness]|url:ray-of-sickness-phb}",
            "Некромантия",
            "—"
          ],
          [
            "{@spell Маскировка [Disguise Self]|url:disguise-self-phb}",
            "Иллюзия",
            "—"
          ],
          [
            "{@spell Невидимый слуга [Unseen Servant]|url:unseen-servant-phb}",
            "Вызов",
            "Р"
          ],
          [
            "{@spell Обнаружение магии [Detect Magic]|url:detect-magic-phb}",
            "Прорицание",
            "К, Р"
          ],
          [
            "{@spell Огненные ладони [Burning Hands]|url:burning-hands-phb}",
            "Воплощение",
            "—"
          ],
          [
            "{@spell Опознание [Identify]|url:identify-phb}",
            "Прорицание",
            "Р, М"
          ],
          [
            "{@spell Очарование личности [Charm Person]|url:charm-person-phb}",
            "Очарование",
            "—"
          ],
          [
            "{@spell Падение пёрышком [Feather Fall]|url:feather-fall-phb}",
            "Преобразование",
            "—"
          ],
          [
            "{@spell Поиск фамильяра [Find Familiar]|url:find-familiar-phb}",
            "Вызов",
            "Р, М"
          ],
          [
            "{@spell Понимание языков [Comprehend Languages]|url:comprehend-languages-phb}",
            "Прорицание",
            "Р"
          ],
          [
            "{@spell Поспешное отступление [Expeditious Retreat]|url:expeditious-retreat-phb}",
            "Преобразование",
            "К"
          ],
          [
            "{@spell Прыжок [Jump]|url:jump-phb}",
            "Преобразование",
            "—"
          ],
          [
            "{@spell Псевдожизнь [False Life]|url:false-life-phb}",
            "Некромантия",
            "—"
          ],
          [
            "{@spell Сверкающие брызги [Color Spray]|url:color-spray-phb}",
            "Иллюзия",
            "—"
          ],
          [
            "{@spell Сигнал тревоги [Alarm]|url:alarm-phb}",
            "Ограждение",
            "Р"
          ],
          [
            "{@spell Скольжение [Grease]|url:grease-phb}",
            "Вызов",
            "—"
          ],
          [
            "{@spell Скороход [Longstrider]|url:longstrider-phb}",
            "Преобразование",
            "—"
          ],
          [
            "{@spell Тензеров парящий диск [Tenser’s Floating Disk]|url:tenser-s-floating-disk-phb}",
            "Вызов",
            "Р"
          ],
          [
            "{@spell Туманное облако [Fog Cloud]|url:fog-cloud-phb}",
            "Вызов",
            "К"
          ],
          [
            "{@spell Усыпление [Sleep]|url:sleep-phb}",
            "Очарование",
            "К"
          ],
          [
            "{@spell Цветной шарик [Chromatic Orb]|url:chromatic-orb-phb}",
            "Воплощение",
            "М"
          ],
          [
            "{@spell Щит [Shield]|url:shield-phb}",
            "Ограждение",
            "—"
          ]
        ]
      },
      {
        "type": "table",
        "caption": "Заклинания волшебника 2 уровня",
        "colLabels": [
          "Заклинание",
          "Школа",
          "Особое"
        ],
        "colStyles": [
          "w-2/5 text-left",
          "w-1/3",
          "w-1/4 text-center"
        ],
        "rows": [
          [
            "{@spell Арканная регенерация [Arcane Recovery]|url:arcane-recovery-homebrew}",
            "Ограждение",
            "—"
          ],
          [
            "{@spell Вечный огонь [Continual Flame]|url:continual-flame-phb}",
            "Воплощение",
            "М"
          ],
          [
            "{@spell Видение невидимого [See Invisibility]|url:see-invisibility-phb}",
            "Прорицание",
            "—"
          ],
          [
            "{@spell Внушение [Suggestion]|url:suggestion-phb}",
            "Очарование",
            "К"
          ],
          [
            "{@spell Волшебные уста [Magic Mouth]|url:magic-mouth-phb}",
            "Иллюзия",
            "Р, М"
          ],
          [
            "{@spell Волшебный замок [Arcane Lock]|url:arcane-lock-phb}",
            "Ограждение",
            "М"
          ],
          [
            "{@spell Воображаемая сила [Phantasmal Force]|url:phantasmal-force-phb}",
            "Иллюзия",
            "К"
          ],
          [
            "{@spell Гадание [Augury]|url:augury-phb}",
            "Прорицание",
            "Р, М"
          ],
          [
            "{@spell Глухота/слепота [Blindness/Deafness]|url:blindness-deafness-phb}",
            "Преобразование",
            "—"
          ],
          [
            "{@spell Дребезги [Shatter]|url:shatter-phb}",
            "Воплощение",
            "—"
          ],
          [
            "{@spell Дыхание дракона [Dragon’s Breath]|url:dragon-s-breath-phb}",
            "Преобразование",
            "К"
          ],
          [
            "{@spell Корона безумия [Crown of Madness]|url:crown-of-madness-phb}",
            "Очарование",
            "К"
          ],
          [
            "{@spell Левитация [Levitate]|url:levitate-phb}",
            "Преобразование",
            "К"
          ],
          [
            "{@spell Луч слабости [Ray of Enfeeblement]|url:ray-of-enfeeblement-phb}",
            "Некромантия",
            "К"
          ],
          [
            "{@spell Магическое оружие [Magic Weapon]|url:magic-weapon-phb}",
            "Преобразование",
            "—"
          ],
          [
            "{@spell Мельфова кислотная стрела [Melf’s Acid Arrow]|url:melf-s-acid-arrow-phb}",
            "Воплощение",
            "—"
          ],
          [
            "{@spell Невидимость [Invisibility]|url:invisibility-phb}",
            "Иллюзия",
            "К"
          ],
          [
            "{@spell Нетленные останки [Gentle Repose]|url:gentle-repose-phb}",
            "Некромантия",
            "Р, М"
          ],
          [
            "{@spell Нистулова ложная магия [Nystul’s Magic Aura]|url:nystul-s-magic-aura-phb}",
            "Иллюзия",
            "—"
          ],
          [
            "{@spell Облако кинжалов [Cloud of Daggers]|url:cloud-of-daggers-phb}",
            "Вызов",
            "К"
          ],
          [
            "{@spell Обнаружение мыслей [Detect Thoughts]|url:detect-thoughts-phb}",
            "Прорицание",
            "К"
          ],
          [
            "{@spell Отражения [Mirror Image]|url:mirror-image-phb}",
            "Иллюзия",
            "—"
          ],
          [
            "{@spell Палящий луч [Scorching Ray]|url:scorching-ray-phb}",
            "Воплощение",
            "—"
          ],
          [
            "{@spell Паук [Spider Climb]|url:spider-climb-phb}",
            "Преобразование",
            "К"
          ],
          [
            "{@spell Паутина [Web]|url:web-phb}",
            "Вызов",
            "К"
          ],
          [
            "{@spell Поиск объекта [Locate Object]|url:locate-object-phb}",
            "Прорицание",
            "К"
          ],
          [
            "{@spell Порыв ветра [Gust of Wind]|url:gust-of-wind-phb}",
            "Воплощение",
            "К"
          ],
          [
            "{@spell Пронзание разума [Mind Spike]|url:mind-spike-phb}",
            "Прорицание",
            "К"
          ],
          [
            "{@spell Пылающий шар [Flaming Sphere]|url:flaming-sphere-phb}",
            "Воплощение",
            "К"
          ],
          [
            "{@spell Размытый образ [Blur]|url:blur-phb}",
            "Иллюзия",
            "К"
          ],
          [
            "{@spell Смена обличья [Alter Self]|url:alter-self-phb}",
            "Преобразование",
            "К"
          ],
          [
            "{@spell Стук [Knock]|url:knock-phb}",
            "Преобразование",
            "—"
          ],
          [
            "{@spell Трюк с верёвкой [Rope Trick]|url:rope-trick-phb}",
            "Преобразование",
            "—"
          ],
          [
            "{@spell Туманный шаг [Misty Step]|url:misty-step-phb}",
            "Вызов",
            "—"
          ],
          [
            "{@spell Тьма [Darkness]|url:darkness-phb}",
            "Воплощение",
            "К"
          ],
          [
            "{@spell Тёмное зрение [Darkvision]|url:darkvision-phb}",
            "Преобразование",
            "—"
          ],
          [
            "{@spell Увеличение/уменьшение [Enlarge/Reduce]|url:enlarge-reduce-phb}",
            "Преобразование",
            "К"
          ],
          [
            "{@spell Удержание личности [Hold Person]|url:hold-person-phb}",
            "Очарование",
            "К"
          ],
          [
            "{@spell Улучшение характеристики [Enhance Ability]|url:enhance-ability-phb}",
            "Преобразование",
            "К"
          ]
        ]
      },
      {
        "type": "table",
        "caption": "Заклинания волшебника 3 уровня",
        "colLabels": [
          "Заклинание",
          "Школа",
          "Особое"
        ],
        "colStyles": [
          "w-2/5 text-left",
          "w-1/3",
          "w-1/4 text-center"
        ],
        "rows": [
          [
            "{@spell Образ [Major Image]|url:major-image-phb}",
            "Иллюзия",
            "К"
          ],
          [
            "{@spell Газообразная форма [Gaseous Form]|url:gaseous-form-phb}",
            "Преобразование",
            "К"
          ],
          [
            "{@spell Гипнотический узор [Hypnotic Pattern]|url:hypnotic-pattern-phb}",
            "Иллюзия",
            "К"
          ],
          [
            "{@spell Замедление [Slow]|url:slow-phb}",
            "Преобразование",
            "К"
          ],
          [
            "{@spell Защита от энергии [Protection from Energy]|url:protection-from-energy-phb}",
            "Ограждение",
            "К"
          ],
          [
            "{@spell Зловонное облако [Stinking Cloud]|url:stinking-cloud-phb}",
            "Вызов",
            "К"
          ],
          [
            "{@spell Контрзаклинание [Counterspell]|url:counterspell-phb}",
            "Ограждение",
            "—"
          ],
          [
            "{@spell Леомундова хижина [Leomund’s Tiny Hut]|url:leomund-s-tiny-hut-phb}",
            "Воплощение",
            "Р"
          ],
          [
            "{@spell Магический круг [Magic Circle]|url:magic-circle-phb}",
            "Ограждение",
            "М"
          ],
          [
            "{@spell Мерцание [Blink]|url:blink-phb}",
            "Преобразование",
            "—"
          ],
          [
            "{@spell Метель [Sleet Storm]|url:sleet-storm-phb}",
            "Вызов",
            "К"
          ],
          [
            "{@spell Молния [Lightning Bolt]|url:lightning-bolt-phb}",
            "Воплощение",
            "—"
          ],
          [
            "{@spell Необнаружимость [Nondetection]|url:nondetection-phb}",
            "Ограждение",
            "М"
          ],
          [
            "{@spell Огненный шар [Fireball]|url:fireball-phb}",
            "Воплощение",
            "—"
          ],
          [
            "{@spell Оживление мертвецов [Animate Dead]|url:animate-dead-phb}",
            "Некромантия",
            "—"
          ],
          [
            "{@spell Охранные руны [Glyph of Warding]|url:glyph-of-warding-phb}",
            "Ограждение",
            "М"
          ],
          [
            "{@spell Подводное дыхание [Water Breathing]|url:water-breathing-phb}",
            "Преобразование",
            "Р"
          ],
          [
            "{@spell Подсматривание [Clairvoyance]|url:clairvoyance-phb}",
            "Прорицание",
            "К, М"
          ],
          [
            "{@spell Полёт [Fly]|url:fly-phb}",
            "Преобразование",
            "К"
          ],
          [
            "{@spell Послание [Sending]|url:sending-phb}",
            "Прорицание",
            "—"
          ],
          [
            "{@spell Призрачный скакун [Phantom Steed]|url:phantom-steed-phb}",
            "Иллюзия",
            "Р"
          ],
          [
            "{@spell Призыв духа нежити [Summon Undead]|url:summon-undead-tce}",
            "Некромантия",
            "К, М"
          ],
          [
            "{@spell Призыв духа феи [Summon Fey]|url:summon-fey-tce}",
            "Вызов",
            "К, М"
          ],
          [
            "{@spell Прикосновение вампира [Vampiric Touch]|url:vampiric-touch-phb}",
            "Некромантия",
            "К"
          ],
          [
            "{@spell Притворная смерть [Feign Death]|url:feign-death-phb}",
            "Некромантия",
            "Р"
          ],
          [
            "{@spell Проклятие [Bestow Curse]|url:bestow-curse-phb}",
            "Некромантия",
            "К"
          ],
          [
            "{@spell Разговор с мёртвыми [Speak with Dead]|url:speak-with-dead-phb}",
            "Некромантия",
            "—"
          ],
          [
            "{@spell Рассеивание магии [Dispel Magic]|url:dispel-magic-phb}",
            "Ограждение",
            "—"
          ],
          [
            "{@spell Снятие проклятья [Remove Curse]|url:remove-curse-phb}",
            "Ограждение",
            "—"
          ],
          [
            "{@spell Ужас [Fear]|url:fear-phb}",
            "Иллюзия",
            "К"
          ],
          [
            "{@spell Ускорение [Haste]|url:haste-phb}",
            "Преобразование",
            "К"
          ],
          [
            "{@spell Языки [Tongues]|url:tongues-phb}",
            "Прорицание",
            "—"
          ]
        ]
      },
      {
        "type": "table",
        "caption": "Заклинания волшебника 4 уровня",
        "colLabels": [
          "Заклинание",
          "Школа",
          "Особое"
        ],
        "colStyles": [
          "w-2/5 text-left",
          "w-1/3",
          "w-1/4 text-center"
        ],
        "rows": [
          [
            "{@spell Верный пёс Морденкайнена [Mordenkainen’s Faithful Hound]|url:mordenkainen-s-faithful-hound-phb}",
            "Вызов",
            "—"
          ],
          [
            "{@spell Власть над водами [Control Water]|url:control-water-phb}",
            "Преобразование",
            "К"
          ],
          [
            "{@spell Воображаемый убийца [Phantasmal Killer]|url:phantasmal-killer-phb}",
            "Иллюзия",
            "К"
          ],
          [
            "{@spell Вызов малых элементалей [Conjure Minor Elementals]|url:conjure-minor-elementals-phb}",
            "Вызов",
            "К"
          ],
          [
            "{@spell Высшая невидимость [Greater Invisibility]|url:greater-invisibility-phb}",
            "Иллюзия",
            "К"
          ],
          [
            "{@spell Град [Ice Storm]|url:ice-storm-phb}",
            "Воплощение",
            "—"
          ],
          [
            "{@spell Едкий шар [Vitriolic Sphere]|url:vitriolic-sphere-phb}",
            "Воплощение",
            "—"
          ],
          [
            "{@spell Изгнание [Banishment]|url:banishment-phb}",
            "Ограждение",
            "К"
          ],
          [
            "{@spell Изготовление [Fabricate]|url:fabricate-phb}",
            "Преобразование",
            "—"
          ],
          [
            "{@spell Изменение формы камня [Stone Shape]|url:stone-shape-phb}",
            "Преобразование",
            "—"
          ],
          [
            "{@spell Кабинет Морденкайнена [Mordenkainen’s Private Sanctum]|url:mordenkainen-s-private-sanctum-phb}",
            "Ограждение",
            "—"
          ],
          [
            "{@spell Каменная кожа [Stoneskin]|url:stoneskin-phb}",
            "Преобразование",
            "К, М"
          ],
          [
            "{@spell Леомундов потайной сундук [Leomund’s Secret Chest]|url:leomund-s-secret-chest-phb}",
            "Вызов",
            "М"
          ],
          [
            "{@spell Магический глаз [Arcane Eye]|url:arcane-eye-phb}",
            "Прорицание",
            "К"
          ],
          [
            "{@spell Мираж [Hallucinatory Terrain]|url:hallucinatory-terrain-phb}",
            "Иллюзия",
            "—"
          ],
          [
            "{@spell Огненный щит [Fire Shield]|url:fire-shield-phb}",
            "Воплощение",
            "—"
          ],
          [
            "{@spell Отилюков упругий шар [Otiluke’s Resilient Sphere]|url:otiluke-s-resilient-sphere-phb}",
            "Ограждение",
            "К"
          ],
          [
            "{@spell Очарование монстра [Charm Monster]|url:charm-monster-phb}",
            "Очарование",
            "—"
          ],
          [
            "{@spell Переносящая дверь [Dimension Door]|url:dimension-door-phb}",
            "Вызов",
            "—"
          ],
          [
            "{@spell Поиск существа [Locate Creature]|url:locate-creature-phb}",
            "Прорицание",
            "К"
          ],
          [
            "{@spell Полиморф [Polymorph]|url:polymorph-phb}",
            "Преобразование",
            "К"
          ],
          [
            "{@spell Предсказание [Divination]|url:divination-phb}",
            "Прорицание",
            "Р, М"
          ],
          [
            "{@spell Призыв духа аберрации [Summon Aberration]|url:summon-aberration-tce}",
            "Вызов",
            "К, М"
          ],
          [
            "{@spell Призыв духа конструкта [Summon Construct]|url:summon-construct-tce}",
            "Вызов",
            "К, М"
          ],
          [
            "{@spell Призыв духа элементаля [Summon Elemental]|url:summon-elemental-tce}",
            "Вызов",
            "К, М"
          ],
          [
            "{@spell Смятение [Confusion]|url:confusion-phb}",
            "Очарование",
            "К"
          ],
          [
            "{@spell Стена огня [Wall of Fire]|url:wall-of-fire-phb}",
            "Воплощение",
            "К"
          ],
          [
            "{@spell Усыхание [Blight]|url:blight-phb}",
            "Некромантия",
            "—"
          ],
          [
            "{@spell Эвардовы чёрные щупальца [Evard’s Black Tentacles]|url:evard-s-black-tentacles-phb}",
            "Вызов",
            "К"
          ]
        ]
      },
      {
        "type": "table",
        "caption": "Заклинания волшебника 5 уровня",
        "colLabels": [
          "Заклинание",
          "Школа",
          "Особое"
        ],
        "colStyles": [
          "w-2/5 text-left",
          "w-1/3",
          "w-1/4 text-center"
        ],
        "rows": [
          [
            "{@spell Величественное присутствие Йоланды [Yolande’s Regal Presence]|url:yolande-s-regal-presence-homebrew}",
            "Очарование",
            "К"
          ],
          [
            "{@spell Вызов элементаля [Conjure Elemental]|url:conjure-elemental-phb}",
            "Вызов",
            "К"
          ],
          [
            "{@spell Длань Бигби [Bigby’s Hand]|url:bigby-s-hand-phb}",
            "Воплощение",
            "К"
          ],
          [
            "{@spell Знание легенд [Legend Lore]|url:legend-lore-phb}",
            "Прорицание",
            "М"
          ],
          [
            "{@spell Изменение памяти [Modify Memory]|url:modify-memory-phb}",
            "Очарование",
            "К"
          ],
          [
            "{@spell Конус холода [Cone of Cold]|url:cone-of-cold-phb}",
            "Воплощение",
            "—"
          ],
          [
            "{@spell Круг силы [Circle of Power]|url:circle-of-power-phb}",
            "Ограждение",
            "К"
          ],
          [
            "{@spell Круг телепортации [Teleportation Circle]|url:teleportation-circle-phb}",
            "Вызов",
            "М"
          ],
          [
            "{@spell Ментальная связь Рэри [Rary’s Telepathic Bond]|url:rary-s-telepathic-bond-phb}",
            "Прорицание",
            "Р"
          ],
          [
            "{@spell Наблюдение [Scrying]|url:scrying-phb}",
            "Прорицание",
            "К, М"
          ],
          [
            "{@spell Обет [Geas]|url:geas-phb}",
            "Очарование",
            "—"
          ],
          [
            "{@spell Облако смерти [Cloudkill]|url:cloudkill-phb}",
            "Вызов",
            "К"
          ],
          [
            "{@spell Оживление вещей [Animate Objects]|url:animate-objects-phb}",
            "Преобразование",
            "К"
          ],
          [
            "{@spell Планарные узы [Planar Binding]|url:planar-binding-phb}",
            "Ограждение",
            "М"
          ],
          [
            "{@spell Подчинение личности [Dominate Person]|url:dominate-person-phb}",
            "Очарование",
            "К"
          ],
          [
            "{@spell Призыв духа дракона [Summon Draconic Spirit]|url:summon-draconic-spirit-ftd}",
            "Вызов",
            "К, М"
          ],
          [
            "{@spell Притворство [Seeming]|url:seeming-phb}",
            "Иллюзия",
            "—"
          ],
          [
            "{@spell Связь с иным планом [Contact Other Plane]|url:contact-other-plane-phb}",
            "Прорицание",
            "Р"
          ],
          [
            "{@spell Синаптический разряд [Synaptic Static]|url:synaptic-static-phb}",
            "Очарование",
            "—"
          ],
          [
            "{@spell Сияющий шторм Джалларзи [Jallarzi’s Radiant Storm]|url:jallarzi-s-radiant-storm-homebrew}",
            "Воплощение",
            "К"
          ],
          [
            "{@spell Сновидение [Dream]|url:dream-phb}",
            "Иллюзия",
            "—"
          ],
          [
            "{@spell Создание прохода [Passwall]|url:passwall-phb}",
            "Преобразование",
            "—"
          ],
          [
            "{@spell Сотворение [Creation]|url:creation-phb}",
            "Иллюзия",
            "—"
          ],
          [
            "{@spell Стена камня [Wall of Stone]|url:wall-of-stone-phb}",
            "Воплощение",
            "К"
          ],
          [
            "{@spell Стена силы [Wall of Force]|url:wall-of-force-phb}",
            "Воплощение",
            "К"
          ],
          [
            "{@spell Телекинез [Telekinesis]|url:telekinesis-phb}",
            "Преобразование",
            "К"
          ],
          [
            "{@spell Удар стального ветра [Steel Wind Strike]|url:steel-wind-strike-phb}",
            "Вызов",
            "М"
          ],
          [
            "{@spell Удержание чудовища [Hold Monster]|url:hold-monster-phb}",
            "Очарование",
            "К"
          ],
          [
            "{@spell Фальшивый двойник [Mislead]|url:mislead-phb}",
            "Иллюзия",
            "К"
          ]
        ]
      },
      {
        "type": "table",
        "caption": "Заклинания волшебника 6 уровня",
        "colLabels": [
          "Заклинание",
          "Школа",
          "Особое"
        ],
        "colStyles": [
          "w-2/5 text-left",
          "w-1/3",
          "w-1/4 text-center"
        ],
        "rows": [
          [
            "{@spell Бурлящий котёл Таши [Tasha’s Cauldron of Boiling]|url:tasha-s-cauldron-of-boiling-homebrew}",
            "Вызов",
            "М"
          ],
          [
            "{@spell Волшебный сосуд [Magic Jar]|url:magic-jar-phb}",
            "Некромантия",
            "М"
          ],
          [
            "{@spell Движение почвы [Move Earth]|url:move-earth-phb}",
            "Преобразование",
            "К"
          ],
          [
            "{@spell Дромиджево появление [Drawmij’s Instant Summons]|url:drawmij-s-instant-summons-phb}",
            "Вызов",
            "Р, М"
          ],
          [
            "{@spell Заданная иллюзия [Programmed Illusion]|url:programmed-illusion-phb}",
            "Иллюзия",
            "М"
          ],
          [
            "{@spell Истинное зрение [True Seeing]|url:true-seeing-phb}",
            "Прорицание",
            "М"
          ],
          [
            "{@spell Круг смерти [Circle of Death]|url:circle-of-death-phb}",
            "Некромантия",
            "М"
          ],
          [
            "{@spell Магические врата [Arcane Gate]|url:arcane-gate-phb}",
            "Вызов",
            "К"
          ],
          [
            "{@spell Множественное внушение [Mass Suggestion]|url:mass-suggestion-phb}",
            "Очарование",
            "—"
          ],
          [
            "{@spell Неудержимая пляска Отто [Otto’s Irresistible Dance]|url:otto-s-irresistible-dance-phb}",
            "Очарование",
            "К"
          ],
          [
            "{@spell Окаменение [Flesh to Stone]|url:flesh-to-stone-phb}",
            "Преобразование",
            "К"
          ],
          [
            "{@spell Отилюков ледяной шар [Otiluke’s Freezing Sphere]|url:otiluke-s-freezing-sphere-phb}",
            "Воплощение",
            "—"
          ],
          [
            "{@spell Предосторожность [Contingency]|url:contingency-phb}",
            "Ограждение",
            "М"
          ],
          [
            "{@spell Призыв духа исчадия [Summon Fiend]|url:summon-fiend-tce}",
            "Вызов",
            "К, М"
          ],
          [
            "{@spell Разящее око [Eyebite]|url:eyebite-phb}",
            "Некромантия",
            "К"
          ],
          [
            "{@spell Распад [Disintegrate]|url:disintegrate-phb}",
            "Преобразование",
            "—"
          ],
          [
            "{@spell Солнечный луч [Sunbeam]|url:sunbeam-phb}",
            "Воплощение",
            "К"
          ],
          [
            "{@spell Сотворение нежити [Create Undead]|url:create-undead-phb}",
            "Некромантия",
            "М"
          ],
          [
            "{@spell Стена льда [Wall of Ice]|url:wall-of-ice-phb}",
            "Воплощение",
            "К"
          ],
          [
            "{@spell Стражи [Guards and Wards]|url:guards-and-wards-phb}",
            "Ограждение",
            "М"
          ],
          [
            "{@spell Сфера неуязвимости [Globe of Invulnerability]|url:globe-of-invulnerability-phb}",
            "Ограждение",
            "К"
          ],
          [
            "{@spell Цепная молния [Chain Lightning]|url:chain-lightning-phb}",
            "Воплощение",
            "—"
          ]
        ]
      },
      {
        "type": "table",
        "caption": "Заклинания волшебника 7 уровня",
        "colLabels": [
          "Заклинание",
          "Школа",
          "Особое"
        ],
        "colStyles": [
          "w-2/5 text-left",
          "w-1/3",
          "w-1/4 text-center"
        ],
        "rows": [
          [
            "{@spell Великолепный особняк Морденкайнена [Mordenkainen’s Magnificent Mansion]|url:mordenkainen-s-magnificent-mansion-phb}",
            "Вызов",
            "М"
          ],
          [
            "{@spell Замедленный огненный шар [Delayed Blast Fireball]|url:delayed-blast-fireball-phb}",
            "Воплощение",
            "К"
          ],
          [
            "{@spell Знак [Symbol]|url:symbol-phb}",
            "Ограждение",
            "М"
          ],
          [
            "{@spell Изменение тяготения [Reverse Gravity]|url:reverse-gravity-phb}",
            "Преобразование",
            "К"
          ],
          [
            "{@spell Изоляция [Sequester]|url:sequester-phb}",
            "Преобразование",
            "М"
          ],
          [
            "{@spell Меч Морденкайнена [Mordenkainen’s Sword]|url:mordenkainen-s-sword-phb}",
            "Воплощение",
            "К, М"
          ],
          [
            "{@spell Перст смерти [Finger of Death]|url:finger-of-death-phb}",
            "Некромантия",
            "—"
          ],
          [
            "{@spell Подобие [Simulacrum]|url:simulacrum-phb}",
            "Иллюзия",
            "М"
          ],
          [
            "{@spell Проекция [Project Image]|url:project-image-phb}",
            "Иллюзия",
            "К, М"
          ],
          [
            "{@spell Радужные брызги [Prismatic Spray]|url:prismatic-spray-phb}",
            "Воплощение",
            "—"
          ],
          [
            "{@spell Силовая клетка [Forcecage]|url:forcecage-phb}",
            "Воплощение",
            "К, М"
          ],
          [
            "{@spell Таинственный мираж [Mirage Arcane]|url:mirage-arcane-phb}",
            "Иллюзия",
            "—"
          ],
          [
            "{@spell Телепортация [Teleport]|url:teleport-phb}",
            "Вызов",
            "—"
          ],
          [
            "{@spell Уход в иной план [Plane Shift]|url:plane-shift-phb}",
            "Вызов",
            "М"
          ],
          [
            "{@spell Эфирность [Etherealness]|url:etherealness-phb}",
            "Вызов",
            "—"
          ]
        ]
      },
      {
        "type": "table",
        "caption": "Заклинания волшебника 8 уровня",
        "colLabels": [
          "Заклинание",
          "Школа",
          "Особое"
        ],
        "colStyles": [
          "w-2/5 text-left",
          "w-1/3",
          "w-1/4 text-center"
        ],
        "rows": [
          [
            "{@spell Антипатия/симпатия [Antipathy/Sympathy]|url:antipathy-sympathy-phb}",
            "Очарование",
            "—"
          ],
          [
            "{@spell Власть над погодой [Control Weather]|url:control-weather-phb}",
            "Преобразование",
            "К"
          ],
          [
            "{@spell Воспламеняющаяся туча [Incendiary Cloud]|url:incendiary-cloud-phb}",
            "Вызов",
            "К"
          ],
          [
            "{@spell Двойник [Clone]|url:clone-phb}",
            "Некромантия",
            "М"
          ],
          [
            "{@spell Демиплан [Demiplane]|url:demiplane-phb}",
            "Вызов",
            "—"
          ],
          [
            "{@spell Замешательство [Feeblemind]|url:feeblemind-phb}",
            "Очарование",
            "—"
          ],
          [
            "{@spell Лабиринт [Maze]|url:maze-phb}",
            "Вызов",
            "К"
          ],
          [
            "{@spell Подчинение чудовища [Dominate Monster]|url:dominate-monster-phb}",
            "Очарование",
            "К"
          ],
          [
            "{@spell Поле антимагии [Antimagic Field]|url:antimagic-field-phb}",
            "Ограждение",
            "К"
          ],
          [
            "{@spell Слово силы: ошеломление [Power Word Stun]|url:power-word-stun-phb}",
            "Очарование",
            "—"
          ],
          [
            "{@spell Сокрытие разума [Mind Blank]|url:mind-blank-phb}",
            "Ограждение",
            "—"
          ],
          [
            "{@spell Солнечный ожог [Sunburst]|url:sunburst-phb}",
            "Воплощение",
            "—"
          ],
          [
            "{@spell Телепатия [Telepathy]|url:telepathy-phb}",
            "Прорицание",
            "—"
          ]
        ]
      },
      {
        "type": "table",
        "caption": "Заклинания волшебника 9 уровня",
        "colLabels": [
          "Заклинание",
          "Школа",
          "Особое"
        ],
        "colStyles": [
          "w-2/5 text-left",
          "w-1/3",
          "w-1/4 text-center"
        ],
        "rows": [
          [
            "{@spell Врата [Gate]|url:gate-phb}",
            "Вызов",
            "К, М"
          ],
          [
            "{@spell Желание [Wish]|url:wish-phb}",
            "Вызов",
            "—"
          ],
          [
            "{@spell Жуть [Weird]|url:weird-phb}",
            "Иллюзия",
            "К"
          ],
          [
            "{@spell Заточение [Imprisonment]|url:imprisonment-phb}",
            "Ограждение",
            "М"
          ],
          [
            "{@spell Истинный полиморф [True Polymorph]|url:true-polymorph-phb}",
            "Преобразование",
            "К"
          ],
          [
            "{@spell Метеоритный дождь [Meteor Swarm]|url:meteor-swarm-phb}",
            "Воплощение",
            "—"
          ],
          [
            "{@spell Остановка времени [Time Stop]|url:time-stop-phb}",
            "Преобразование",
            "—"
          ],
          [
            "{@spell Полное превращение [Shapechange]|url:shapechange-phb}",
            "Преобразование",
            "К, М"
          ],
          [
            "{@spell Предвидение [Foresight]|url:foresight-phb}",
            "Прорицание",
            "—"
          ],
          [
            "{@spell Проекция в астрал [Astral Projection]|url:astral-projection-phb}",
            "Некромантия",
            "М"
          ],
          [
            "{@spell Радужная стена [Prismatic Wall]|url:prismatic-wall-phb}",
            "Ограждение",
            "—"
          ],
          [
            "{@spell Слово силы: смерть [Power Word Kill]|url:power-word-kill-phb}",
            "Очарование",
            "—"
          ]
        ]
      }
    ],
    "updatedAt": "2026-01-16T08:04:27.551939Z",
    "userId": "Magistrus",
    "hitDice": {
      "label": "к6",
      "value": "d6",
      "maxValue": 6,
      "avg": 4
    },
    "primaryCharacteristics": "Интеллект",
    "proficiency": {
      "armor": "",
      "weapon": "Простое дальнобойное, Простое рукопашное",
      "tool": "",
      "skill": "Выберите 2 навыка из следующих: Аркана, История, Проницательность, Анализ, Медицина, Природа, Религия"
    },
    "equipment": [
      "Выберите А или Б:",
      {
        "type": "list",
        "attrs": {
          "type": "unordered"
        },
        "content": [
          "А) 2 {@item кинжала|url:dagger-phb}, {@item магическая фокусировка (боевой посох)|url:quarterstaff-phb}, {@item роба|url:robe-phb}, книга заклинаний, {@item набор учёного|url:scholar-s-pack-phb} и 5 зм.",
          "Б) 55 зм."
        ]
      }
    ],
    "savingThrows": "Мудрость, Интеллект",
    "features": [
      {
        "isSubclass": false,
        "key": "ispolzovanie-zaklinanij",
        "level": 1,
        "name": "Использование заклинаний",
        "description": [
          "Как ученик тайной магии вы научились накладывать заклинания. Правила наложения заклинаний описаны в главе 7. Ниже подробно описано, как применять эти правила к заклинаниям волшебника, которые будут перечислены в списке заклинаний волшебника далее в описании класса.",
          "{@b Заговоры.} Вы знаете 3 заговора по вашему выбору из списка заклинаний волшебника. Рекомендуются: {@spell Свет [Light]|url:light-phb}, {@spell Волшебная рука [Mage Hand]|url:mage-hand-phb} и {@spell Луч холода [Ray of Frost]|url:ray-of-frost-phb}. Каждый раз, когда вы заканчиваете {@glossary продолжительный отдых|url:long-rest-phb}, вы можете заменить 1 из ваших заговоров другим заговором по вашему выбору из списка заклинаний волшебника. При достижении 4 и 10 уровней волшебника вы изучаете дополнительный заговор по вашему выбору из списка заклинаний волшебника, как показано в столбце «Заговоры» из таблицы «Умения волшебника».",
          "{@b Книга заклинаний.} Кульминацией вашей магической подготовки стало создание уникального труда: вашей книги заклинаний. Это объект крошечного размера весом 3 фунта, который содержит 100 страниц и может быть прочитан только вами или тем, кто накладывает {@spell Опознание [Identify]|url:identify-phb}. Вы сами определяете внешний вид и материал книги: например, она может быть позолоченным томом или сборником пергамента, скреплённого бечёвкой. Книга содержит известные вам заклинания 1+ уровня. Изначально она содержит 6 заклинаний волшебника 1 уровня по вашему выбору. Рекомендуются: {@spell Обнаружение магии [Detect Magic]|url:detect-magic-phb}, {@spell Падение пёрышком [Feather Fall]|url:feather-fall-phb}, {@spell Доспехи мага [Mage Armor]|url:mage-armor-phb}, {@spell Волшебная стрела [Magic Missile]|url:magic-missile-phb}, {@spell Усыпление [Sleep]|url:sleep-phb} и {@spell Волна грома [Thunderwave]|url:thunderwave-phb}. Каждый раз, когда вы получаете уровень волшебника после 1, добавьте в свою книгу 2 заклинания на ваш выбор из списка заклинаний волшебника. Каждое из этих заклинаний должно быть того уровня, для которого у вас есть ячейка заклинаний, как показано в таблице «Умения волшебника». Заклинания представляют собой результат регулярно проводимых вами магических исследований.",
          "{@b Ячейки заклинаний.} Таблица «Умения волшебника» показывает, сколько ячеек заклинаний вы можете использовать для заклинаний 1+ уровня. Вы восстанавливаете все потраченные ячейки, когда заканчиваете {@glossary продолжительный отдых|url:long-rest-phb}.",
          "{@b Подготовленные заклинания 1+ уровня.} Вы подготавливаете список заклинаний 1+ уровня, которые доступны вам для использования с помощью этого умения. Для начала выберите 4 заклинания из вашей книги заклинаний. Выбранные заклинания должны быть того уровня, для которого у вас есть ячейка заклинаний. Количество подготовленных заклинаний в вашем списке увеличивается по мере того, как вы получаете уровни волшебника, как показано в столбце «Подг. закл.» из таблицы «Умения волшебника». Каждый раз, когда это число увеличивается, выберите дополнительные заклинания из списка заклинаний волшебника, чтобы количество заклинаний вашего списка соответствовало значению в таблице «Умения волшебника». Выбранные заклинания должны быть того уровня, для которого у вас есть ячейка заклинаний. Например, если вы волшебник 3 уровня, то ваш список подготовленных заклинаний может включать 6 заклинаний 1 или 2 уровня, выбранных из вашей книги заклинаний в любой комбинации. Если другое умение волшебника даёт вам всегда подготовленные заклинания, то эти заклинания не учитываются в количестве заклинаний, которые вы можете подготовить с помощью этого умения, но в остальном они считаются заклинаниями волшебника для вас.",
          "{@b Изменение подготовленных заклинаний.} Каждый раз, когда вы заканчиваете {@glossary продолжительный отдых|url:long-rest-phb}, вы можете изменить ваш список подготовленных заклинаний, заменяя любые содержащиеся в нём заклинания теми, что находятся в вашей книге заклинаний.",
          "{@b Заклинательная характеристика.} Интеллект — это ваша заклинательная характеристика для ваших заклинаний волшебника.",
          "{@b Заклинательная фокусировка.} В качестве заклинательной фокусировки для ваших заклинаний волшебника вы можете использовать магическую фокусировку или вашу книгу заклинаний."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "ritualnyj-adept",
        "level": 1,
        "name": "Ритуальный адепт",
        "description": [
          "Вы можете накладывать любое {@glossary заклинание|url:spell-phb} как {@glossary ритуал|url:ritual-phb}, если у этого заклинания есть ключевое слово «ритуал», и оно есть в вашей книге заклинаний. Вам не нужно, чтобы это заклинание было подготовленным, но чтобы наложить его таким образом, вам необходимо читать из книги."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "magiceskoe-vosstanovlenie",
        "level": 1,
        "name": "Магическое восстановление",
        "description": [
          "Вы можете восстанавливать часть вашей магической энергии, изучая свою книгу {@glossary заклинаний|url:spell-phb}. Когда вы заканчиваете {@glossary короткий отдых|url:short-rest-phb}, вы можете восстановить часть использованных ячеек заклинаний. Ячейки заклинаний могут иметь суммарный уровень, который не превышает половину вашего уровня волшебника (округляя в большую сторону), и ни одна из ячеек не может быть шестого уровня или выше. Например, если вы волшебник 4 уровня, то вы можете восстановить ячейки заклинаний с суммой уровней не больше двух, восстанавливая таким образом одну ячейку заклинаний 2 уровня или две ячейки заклинаний 1 уровня.",
          "Использовав это умение, вы не можете использовать его повторно, пока не завершите {@glossary продолжительный отдых|url:long-rest-phb}."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "ucenyj",
        "level": 2,
        "name": "Учёный",
        "description": [
          "Изучая {@glossary магию|url:magic-phb}, вы также специализировались в другой области знаний. Выберите один из следующих навыков, которыми вы владеете: Аркана, История, Анализ, Медицина, Природа или Религия. Вы получаете {@glossary компетентность|url:proficiency-phb} для выбранного навыка."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "podklass-volsebnika",
        "level": 3,
        "name": "Подкласс волшебника",
        "description": [
          "Вы получаете подкласс волшебника по вашему выбору. Подклассы Оградителя, Прорицателя, Воплотителя и Иллюзиониста описаны после списка заклинаний этого класса.",
          "Подкласс — это специализация, которая предоставляет вам возможности на определённых уровнях волшебника. В ходе дальнейшего развития вы получаете каждое умение вашего подкласса, которое соответствует вашему уровню волшебника или ниже."
        ],
        "additional": "",
        "scaling": [
          {
            "level": 6,
            "name": "Умение подкласса",
            "description": [
              "Вы получаете умения подкласса."
            ],
            "additional": "",
            "hideInSubclasses": false
          },
          {
            "level": 10,
            "name": "Умение подкласса",
            "description": [
              "Вы получаете умения подкласса."
            ],
            "additional": "",
            "hideInSubclasses": false
          },
          {
            "level": 14,
            "name": "Умение подкласса",
            "description": [
              "Вы получаете умения подкласса."
            ],
            "additional": "",
            "hideInSubclasses": false
          }
        ],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "ulucsenie-harakteristik",
        "level": 4,
        "name": "Улучшение Характеристик",
        "description": [
          "Вы получаете черту {@feat Улучшение характеристик [Ability Score Improvement]|url:ability-score-improvement-phb} (см. главу 5) или другую черту по вашему выбору, требованиям которой вы соответствуете.",
          "Вы снова получаете эту способность на уровнях волшебника 8, 12 и 16."
        ],
        "additional": "",
        "scaling": [
          {
            "level": 8,
            "name": "Улучшение Характеристик",
            "description": [
              "Вы получаете черту {@feat Улучшение характеристик [Ability Score Improvement]|url:ability-score-improvement-phb} (см. главу 5) или другую черту по вашему выбору, требованиям которой вы соответствуете."
            ],
            "additional": "",
            "hideInSubclasses": false
          },
          {
            "level": 12,
            "name": "Улучшение Характеристик",
            "description": [
              "Вы получаете черту {@feat Улучшение характеристик [Ability Score Improvement]|url:ability-score-improvement-phb} (см. главу 5) или другую черту по вашему выбору, требованиям которой вы соответствуете."
            ],
            "additional": "",
            "hideInSubclasses": false
          },
          {
            "level": 16,
            "name": "Улучшение Характеристик",
            "description": [
              "Вы получаете черту {@feat Улучшение характеристик [Ability Score Improvement]|url:ability-score-improvement-phb} (см. главу 5) или другую черту по вашему выбору, требованиям которой вы соответствуете."
            ],
            "additional": "",
            "hideInSubclasses": false
          }
        ],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "zaucivanie-zaklinanij",
        "level": 5,
        "name": "Заучивание заклинаний",
        "description": [
          "Каждый раз, когда вы заканчиваете {@glossary короткий отдых|url:short-rest-phb}, вы можете просмотреть свою книгу {@glossary заклинаний|url:spell-phb} и заменить одно из заклинаний волшебника 1+ уровня, которое вы подготовили в рамках своей особенности использования заклинаний, на другое заклинание 1+ уровня из вашей книги."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "masterstvo-zaklinatela",
        "level": 18,
        "name": "Мастерство заклинателя",
        "description": [
          "Вы достигли такого мастерства в отношении некоторых {@glossary заклинаний|url:spell-phb}, что можете накладывать их неограниченное количество раз. Выберите одно заклинание волшебника 1 уровня и одно заклинание волшебника 2 уровня из вашей книги заклинаний, время накладывания которых «{@glossary действие|url:action-phb}». Эти заклинания считаются для вас всегда подготовленными, и вы можете накладывать их, не тратя ячеек заклинаний, при условии, что накладываете эти заклинания без повышения их уровня. Чтобы наложить одно из этих заклинаний на более высоком уровне, вам придётся потратить ячейку.",
          "Каждый раз, когда вы заканчиваете {@glossary продолжительный отдых|url:long-rest-phb}, вы можете просмотреть свою книгу заклинаний и заменить одно из выбранных заклинаний на другое соответствующее требованиям заклинание того же уровня из книги."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "epiceskaa-certa",
        "level": 19,
        "name": "Эпическая черта",
        "description": [
          "Вы получаете эпическую черту (см. главу 5) или другую черту по вашему выбору, требованиям которой вы соответствуете. Рекомендуется черта {@feat Дар восстановления чар [Boon of Spell Recall]|url:boon-of-spell-recall-phb}."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "firmennye-zaklinania",
        "level": 20,
        "name": "Фирменные заклинания",
        "description": [
          "Выберите 2 {@glossary заклинания|url:spell-phb} волшебника 3 уровня из своей книги заклинаний в качестве ваших фирменных заклинаний. Эти заклинания считаются для вас всегда подготовленными, и вы можете по одному разу наложить каждое из них 3 уровнем, не тратя ячейку заклинаний.",
          "После этого вы не можете наложить их повторно таким же образом, пока не завершите {@glossary короткий отдых|url:short-rest-phb} или {@glossary продолжительный отдых|url:long-rest-phb}. Чтобы наложить любое из этих заклинаний более высоким уровнем, вы должны будете потратить ячейку заклинаний."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      }
    ],
    "table": [
      {
        "name": "Заговоры",
        "scaling": [
          {
            "level": 1,
            "value": "3"
          },
          {
            "level": 4,
            "value": "4"
          },
          {
            "level": 10,
            "value": "5"
          }
        ]
      },
      {
        "name": "Подг. Закл.",
        "scaling": [
          {
            "level": 1,
            "value": "4"
          },
          {
            "level": 2,
            "value": "5"
          },
          {
            "level": 3,
            "value": "6"
          },
          {
            "level": 4,
            "value": "7"
          },
          {
            "level": 5,
            "value": "9"
          },
          {
            "level": 6,
            "value": "10"
          },
          {
            "level": 7,
            "value": "11"
          },
          {
            "level": 8,
            "value": "12"
          },
          {
            "level": 9,
            "value": "14"
          },
          {
            "level": 10,
            "value": "15"
          },
          {
            "level": 11,
            "value": "16"
          },
          {
            "level": 13,
            "value": "17"
          },
          {
            "level": 14,
            "value": "18"
          },
          {
            "level": 15,
            "value": "19"
          },
          {
            "level": 16,
            "value": "21"
          },
          {
            "level": 17,
            "value": "22"
          },
          {
            "level": 18,
            "value": "23"
          },
          {
            "level": 19,
            "value": "24"
          },
          {
            "level": 20,
            "value": "25"
          }
        ]
      }
    ],
    "casterType": "FULL",
    "hasSubclasses": true,
    "name": {
      "rus": "Волшебник",
      "eng": "Wizard"
    },
    "source": {
      "name": {
        "label": "PHB",
        "rus": "Книга игрока",
        "eng": "Player Handbook"
      },
      "group": {
        "label": "Basic",
        "rus": "Официальные источники"
      },
      "page": 77
    }
  },
  {
    "url": "druid-phb",
    "gallery": [
      "/s3/classes/peterko/1759866395762-druid2.webp",
      "/s3/classes/magistrus/1759904916509-druid2.webp"
    ],
    "image": "/s3/classes/peterko/1759866389572-druid.webp",
    "description": [
      "{@i Служитель природы первородной силы}",
      "Друиды относятся к древним орденам, которые взывают к силам природы. Используя магию животных, растений и четырёх стихий, друиды исцеляют, превращаются в животных и используют разрушительные силы природы.",
      "Почитая природу превыше всего, отдельные друиды получают свою магию от природы, божеств природы или из того и другого, и они обычно объединяются с другими друидами, чтобы совершать обряды, которые отмечают смену времён года и другие естественные циклы.",
      "Друиды обеспокоены хрупким экологическим балансом, который поддерживает жизнь растений и животных, и необходимостью людей жить в гармонии с природой. Друиды часто охраняют священные места или следят за регионами нетронутой природы, но, когда возникает значительная опасность, друиды принимают более активную роль в качестве приключенцев, которые борются с угрозой.",
      {
        "type": "heading",
        "attrs": {
          "level": "2"
        },
        "content": [
          {
            "type": "text",
            "text": "Становление друидом..."
          }
        ]
      },
      "{@b Как персонаж 1 уровня:}",
      {
        "type": "list",
        "attrs": {
          "type": "unordered"
        },
        "content": [
          "Получите особенности из таблицы «Особенности друида».",
          "Получите умения друида 1 уровня, которые перечислены в таблице «Умения друида»."
        ]
      },
      "{@b Как мультикласс:}",
      {
        "type": "list",
        "attrs": {
          "type": "unordered"
        },
        "content": [
          "Получите следующие особенности из таблицы «Особенности друида»: кость хитов, владение лёгкими доспехами и щитами.",
          "Получите умения друида 1 уровня, которые перечислены в таблице «Умения друида». См. правила мультиклассирования в главе 2, чтобы определить доступные ячейки заклинаний."
        ]
      },
      {
        "type": "heading",
        "attrs": {
          "level": "2"
        },
        "content": [
          {
            "type": "text",
            "text": "Список заклинаний друида"
          }
        ]
      },
      "В этом разделе представлен список заклинаний друида. Заклинания организованы по уровню заклинаний, а затем отсортированы по алфавиту, и перечислена школа магии каждого заклинания.{@br}В столбце {@b «Cпец.»} обозначения имеют следующий смысл: {@b К} — заклинание требует концентрации; {@b Р} — заклинание можно сотворить как ритуал; {@b М} — заклинание требует особый материальный компонент.",
      {
        "type": "table",
        "caption": "Заклинания друида 0 уровня",
        "colLabels": [
          "Заклинание",
          "Школа",
          "Спец."
        ],
        "colStyles": [
          "w-2/5 text-left",
          "w-1/3 text-left",
          "w-1/4 text-center"
        ],
        "rows": [
          [
            "{@spell Дубинка [Shillelagh]|url:shillelagh-phb}",
            "Преобразование",
            "—"
          ],
          [
            "{@spell Звёздный огонёк [Star Spark]|url:star-spark-homebrew}",
            "Воплощение",
            "—"
          ],
          [
            "{@spell Искусство друидов [Druidcraft]|url:druidcraft-phb}",
            "Преобразование",
            "—"
          ],
          [
            "{@spell Починка [Mending]|url:mending-phb}",
            "Преобразование",
            "—"
          ],
          [
            "{@spell Раскат грома [Thunderclap]|url:thunderclap-xge}",
            "Воплощение",
            "—"
          ],
          [
            "{@spell Сообщение [Message]|url:message-phb}",
            "Преобразование",
            "—"
          ],
          [
            "{@spell Сопротивление [Resistance]|url:resistance-phb}",
            "Ограждение",
            "К"
          ],
          [
            "{@spell Сотворение пламени [Create Bonfire]|url:create-bonfire-xge}",
            "Вызов",
            "—"
          ],
          [
            "{@spell Терновый кнут [Thorn Whip]|url:thorn-whip-phb}",
            "Преобразование",
            "—"
          ],
          [
            "{@spell Наставление [Guidance]|url:guidance-phb}",
            "Прорицание",
            "К"
          ],
          [
            "{@spell Уход за умирающим [Spare the Dying]|url:spare-the-dying-phb}",
            "Некромантия",
            "—"
          ],
          [
            "{@spell Элементализм [Elementalism]|url:elementalism-homebrew}",
            "Преобразование",
            "—"
          ],
          [
            "{@spell Ядовитые брызги [Poison Spray]|url:poison-spray-phb}",
            "Некромантия",
            "—"
          ]
        ]
      },
      {
        "type": "table",
        "caption": "Заклинания друида 1 уровня",
        "colLabels": [
          "Заклинание",
          "Школа",
          "Спец."
        ],
        "colStyles": [
          "w-2/5 text-left",
          "w-1/3 text-left",
          "w-1/4 text-center"
        ],
        "rows": [
          [
            "{@spell Волна грома [Thunderwave]|url:thunderwave-phb}",
            "Воплощение",
            "—"
          ],
          [
            "{@spell Дружба с животными [Animal Friendship]|url:animal-friendship-phb}",
            "Очарование",
            "—"
          ],
          [
            "{@spell Защита от зла и добра [Protection from Evil and Good]|url:protection-from-evil-and-good-phb}",
            "Ограждение",
            "К, М"
          ],
          [
            "{@spell Ледяной кинжал [Ice Knife]|url:ice-knife-xge}",
            "Вызов",
            "—"
          ],
          [
            "{@spell Лечащее слово [Healing Word]|url:healing-word-phb}",
            "Ограждение",
            "—"
          ],
          [
            "{@spell Лечение ран [Cure Wounds]|url:cure-wounds-phb}",
            "Ограждение",
            "—"
          ],
          [
            "{@spell Обнаружение болезней и яда [Detect Poison and Disease]|url:detect-poison-and-disease-phb}",
            "Прорицание",
            "К, Р"
          ],
          [
            "{@spell Обнаружение магии [Detect Magic]|url:detect-magic-phb}",
            "Прорицание",
            "К, Р"
          ],
          [
            "{@spell Огонь фей [Faerie Fire]|url:faerie-fire-phb}",
            "Воплощение",
            "К"
          ],
          [
            "{@spell Опутывание [Entangle]|url:entangle-phb}",
            "Вызов",
            "К"
          ],
          [
            "{@spell Очарование личности [Charm Person]|url:charm-person-phb}",
            "Очарование",
            "—"
          ],
          [
            "{@spell Очищение пищи и питья [Purify Food and Drink]|url:purify-food-and-drink-phb}",
            "Преобразование",
            "Р"
          ],
          [
            "{@spell Прыжок [Jump]|url:jump-phb}",
            "Преобразование",
            "—"
          ],
          [
            "{@spell Разговор с животными [Speak with Animals]|url:speak-with-animals-phb}",
            "Прорицание",
            "Р"
          ],
          [
            "{@spell Скороход [Longstrider]|url:longstrider-phb}",
            "Преобразование",
            "—"
          ],
          [
            "{@spell Сотворение или уничтожение воды [Create or Destroy Water]|url:create-or-destroy-water-phb}",
            "Преобразование",
            "—"
          ],
          [
            "{@spell Туманное облако [Fog Cloud]|url:fog-cloud-phb}",
            "Вызов",
            "К"
          ],
          [
            "{@spell Чудо-ягоды [Goodberry]|url:goodberry-phb}",
            "Вызов",
            "—"
          ]
        ]
      },
      {
        "type": "table",
        "caption": "Заклинания друида 2 уровня",
        "colLabels": [
          "Заклинание",
          "Школа",
          "Спец."
        ],
        "colStyles": [
          "w-2/5 text-left",
          "w-1/3 text-left",
          "w-1/4 text-center"
        ],
        "rows": [
          [
            "{@spell Бесследное передвижение [Pass without Trace]|url:pass-without-trace-phb}",
            "Ограждение",
            "К"
          ],
          [
            "{@spell Вечный огонь [Continual Flame]|url:continual-flame-phb}",
            "Воплощение",
            "М"
          ],
          [
            "{@spell Гадание [Augury]|url:augury-phb}",
            "Прорицание",
            "Р, М"
          ],
          [
            "{@spell Горящий клинок [Flame Blade]|url:flame-blade-phb}",
            "Воплощение",
            "К"
          ],
          [
            "{@spell Дубовая кожа [Barkskin]|url:barkskin-phb}",
            "Преобразование",
            "—"
          ],
          [
            "{@spell Животные чувства [Beast Sense]|url:beast-sense-phb}",
            "Прорицание",
            "К, Р"
          ],
          [
            "{@spell Защита от яда [Protection from Poison]|url:protection-from-poison-phb}",
            "Ограждение",
            "—"
          ],
          [
            "{@spell Лунный луч [Moonbeam]|url:moonbeam-phb}",
            "Воплощение",
            "К"
          ],
          [
            "{@spell Малое восстановление [Lesser Restoration]|url:lesser-restoration-phb}",
            "Ограждение",
            "—"
          ],
          [
            "{@spell Подмога [Aid]|url:aid-phb}",
            "Ограждение",
            "—"
          ],
          [
            "{@spell Поиск животных или растений [Locate Animals or Plants]|url:locate-animals-or-plants-phb}",
            "Прорицание",
            "Р"
          ],
          [
            "{@spell Поиск ловушек [Find Traps]|url:find-traps-phb}",
            "Прорицание",
            "—"
          ],
          [
            "{@spell Поиск объекта [Locate Object]|url:locate-object-phb}",
            "Прорицание",
            "К"
          ],
          [
            "{@spell Порыв ветра [Gust of Wind]|url:gust-of-wind-phb}",
            "Воплощение",
            "К"
          ],
          [
            "{@spell Почтовое животное [Animal Messenger]|url:animal-messenger-phb}",
            "Очарование",
            "Р"
          ],
          [
            "{@spell Призыв духа зверя [Summon Beast]|url:summon-beast-tce}",
            "Вызов",
            "К, М"
          ],
          [
            "{@spell Пылающий шар [Flaming Sphere]|url:flaming-sphere-phb}",
            "Воплощение",
            "К"
          ],
          [
            "{@spell Раскалённый металл [Heat Metal]|url:heat-metal-phb}",
            "Преобразование",
            "К"
          ],
          [
            "{@spell Тёмное зрение [Darkvision]|url:darkvision-phb}",
            "Преобразование",
            "—"
          ],
          [
            "{@spell Увеличение/уменьшение [Enlarge/Reduce]|url:enlarge-reduce-phb}",
            "Преобразование",
            "К"
          ],
          [
            "{@spell Удержание личности [Hold Person]|url:hold-person-phb}",
            "Очарование",
            "К"
          ],
          [
            "{@spell Улучшение характеристики [Enhance Ability]|url:enhance-ability-phb}",
            "Преобразование",
            "К"
          ],
          [
            "{@spell Шипастая поросль [Spike Growth]|url:spike-growth-phb}",
            "Преобразование",
            "К"
          ]
        ]
      },
      {
        "type": "table",
        "caption": "Заклинания друида 3 уровня",
        "colLabels": [
          "Заклинание",
          "Школа",
          "Спец."
        ],
        "colStyles": [
          "w-2/5 text-left",
          "w-1/3 text-left",
          "w-1/4 text-center"
        ],
        "rows": [
          [
            "{@spell Аура живучести [Aura of Vitality]|url:aura-of-vitality-phb}",
            "Ограждение",
            "К"
          ],
          [
            "{@spell Вызов животных [Conjure Animals]|url:conjure-animals-phb}",
            "Вызов",
            "К"
          ],
          [
            "{@spell Дневной свет [Daylight]|url:daylight-phb}",
            "Воплощение",
            "—"
          ],
          [
            "{@spell Защита от энергии [Protection from Energy]|url:protection-from-energy-phb}",
            "Ограждение",
            "К"
          ],
          [
            "{@spell Метель [Sleet Storm]|url:sleet-storm-phb}",
            "Вызов",
            "К"
          ],
          [
            "{@spell Низшее воскрешение [Revivify]|url:revivify-phb}",
            "Некромантия",
            "М"
          ],
          [
            "{@spell Подводное дыхание [Water Breathing]|url:water-breathing-phb}",
            "Преобразование",
            "Р"
          ],
          [
            "{@spell Призыв духа феи [Summon Fey]|url:summon-fey-tce}",
            "Вызов",
            "К, М"
          ],
          [
            "{@spell Призыв молнии [Call Lightning]|url:call-lightning-phb}",
            "Вызов",
            "К"
          ],
          [
            "{@spell Притворная смерть [Feign Death]|url:feign-death-phb}",
            "Некромантия",
            "Р"
          ],
          [
            "{@spell Разговор с растениями [Speak with Plants]|url:speak-with-plants-phb}",
            "Преобразование",
            "—"
          ],
          [
            "{@spell Рассеивание магии [Dispel Magic]|url:dispel-magic-phb}",
            "Ограждение",
            "—"
          ],
          [
            "{@spell Рост растений [Plant Growth]|url:plant-growth-phb}",
            "Преобразование",
            "—"
          ],
          [
            "{@spell Слияние с камнем [Meld into Stone]|url:meld-into-stone-phb}",
            "Преобразование",
            "Р"
          ],
          [
            "{@spell Стена ветра [Wind Wall]|url:wind-wall-phb}",
            "Воплощение",
            "К"
          ],
          [
            "{@spell Стихийное оружие [Elemental Weapon]|url:elemental-weapon-phb}",
            "Преобразование",
            "К"
          ],
          [
            "{@spell Хождение по воде [Water Walk]|url:water-walk-phb}",
            "Преобразование",
            "Р"
          ]
        ]
      },
      {
        "type": "table",
        "caption": "Заклинания друида 4 уровня",
        "colLabels": [
          "Заклинание",
          "Школа",
          "Спец."
        ],
        "colStyles": [
          "w-2/5 text-left",
          "w-1/3 text-left",
          "w-1/4 text-center"
        ],
        "rows": [
          [
            "{@spell Власть над водами [Control Water]|url:control-water-phb}",
            "Преобразование",
            "К"
          ],
          [
            "{@spell Вызов лесных обитателей [Conjure Woodland Beings]|url:conjure-woodland-beings-phb}",
            "Вызов",
            "К"
          ],
          [
            "{@spell Вызов малых элементалей [Conjure Minor Elementals]|url:conjure-minor-elementals-phb}",
            "Вызов",
            "К"
          ],
          [
            "{@spell Гигантское насекомое [Giant Insect]|url:giant-insect-phb}",
            "Вызов",
            "К"
          ],
          [
            "{@spell Град [Ice Storm]|url:ice-storm-phb}",
            "Воплощение",
            "—"
          ],
          [
            "{@spell Изменение формы камня [Stone Shape]|url:stone-shape-phb}",
            "Преобразование",
            "—"
          ],
          [
            "{@spell Источник лунного света [Moonbeam, 3 ур. вариант]|url:moonbeam-phb}",
            "Воплощение",
            "К"
          ],
          [
            "{@spell Каменная кожа [Stoneskin]|url:stoneskin-phb}",
            "Преобразование",
            "К, М"
          ],
          [
            "{@spell Мираж [Hallucinatory Terrain]|url:hallucinatory-terrain-phb}",
            "Иллюзия",
            "—"
          ],
          [
            "{@spell Огненный щит [Fire Shield]|url:fire-shield-phb}",
            "Воплощение",
            "—"
          ],
          [
            "{@spell Очарование монстра [Charm Monster]|url:charm-monster-xge}",
            "Очарование",
            "—"
          ],
          [
            "{@spell Подчинение зверя [Dominate Beast]|url:dominate-beast-phb}",
            "Очарование",
            "К"
          ],
          [
            "{@spell Поиск существа [Locate Creature]|url:locate-creature-phb}",
            "Прорицание",
            "К"
          ],
          [
            "{@spell Полиморф [Polymorph]|url:polymorph-phb}",
            "Преобразование",
            "К"
          ],
          [
            "{@spell Предсказание [Divination]|url:divination-phb}",
            "Прорицание",
            "Р, М"
          ],
          [
            "{@spell Призыв духа элементаля [Summon Elemental]|url:summon-elemental-tce}",
            "Вызов",
            "К, М"
          ],
          [
            "{@spell Свобода перемещения [Freedom of Movement]|url:freedom-of-movement-phb}",
            "Ограждение",
            "—"
          ],
          [
            "{@spell Смятение [Confusion]|url:confusion-phb}",
            "Очарование",
            "К"
          ],
          [
            "{@spell Стена огня [Wall of Fire]|url:wall-of-fire-phb}",
            "Воплощение",
            "К"
          ],
          [
            "{@spell Усыхание [Blight]|url:blight-phb}",
            "Некромантия",
            "—"
          ],
          [
            "{@spell Цепкая лоза [Grasping Vine]|url:grasping-vine-phb}",
            "Вызов",
            "К"
          ]
        ]
      },
      {
        "type": "table",
        "caption": "Заклинания друида 5 уровня",
        "colLabels": [
          "Заклинание",
          "Школа",
          "Спец."
        ],
        "colStyles": [
          "w-2/5 text-left",
          "w-1/3 text-left",
          "w-1/4 text-center"
        ],
        "rows": [
          [
            "{@spell Вызов элементаля [Conjure Elemental]|url:conjure-elemental-phb}",
            "Вызов",
            "К"
          ],
          [
            "{@spell Высшее восстановление [Greater Restoration]|url:greater-restoration-phb}",
            "Ограждение",
            "М"
          ],
          [
            "{@spell Древесный путь [Tree Stride]|url:tree-stride-phb}",
            "Вызов",
            "К"
          ],
          [
            "{@spell Заражение [Contagion]|url:contagion-phb}",
            "Некромантия",
            "—"
          ],
          [
            "{@spell Конус холода [Cone of Cold]|url:cone-of-cold-phb}",
            "Воплощение",
            "—"
          ],
          [
            "{@spell Множественное лечение ран [Mass Cure Wounds]|url:mass-cure-wounds-phb}",
            "Ограждение",
            "—"
          ],
          [
            "{@spell Наблюдение [Scrying]|url:scrying-phb}",
            "Прорицание",
            "К, М"
          ],
          [
            "{@spell Нашествие насекомых [Insect Plague]|url:insect-plague-phb}",
            "Вызов",
            "К"
          ],
          [
            "{@spell Обет [Geas]|url:geas-phb}",
            "Очарование",
            "—"
          ],
          [
            "{@spell Общение с природой [Commune with Nature]|url:commune-with-nature-phb}",
            "Прорицание",
            "Р"
          ],
          [
            "{@spell Планарные узы [Planar Binding]|url:planar-binding-phb}",
            "Ограждение",
            "М"
          ],
          [
            "{@spell Преграда жизни [Wall of Light]|url:wall-of-light-xge}",
            "Ограждение",
            "К"
          ],
          [
            "{@spell Пробуждение разума [Awaken]|url:awaken-phb}",
            "Преобразование",
            "М"
          ],
          [
            "{@spell Реинкарнация [Reincarnate]|url:reincarnate-phb}",
            "Некромантия",
            "М"
          ],
          [
            "{@spell Стена камня [Wall of Stone]|url:wall-of-stone-phb}",
            "Воплощение",
            "К"
          ]
        ]
      },
      {
        "type": "table",
        "caption": "Заклинания друида 6 уровня",
        "colLabels": [
          "Заклинание",
          "Школа",
          "Спец."
        ],
        "colStyles": [
          "w-2/5 text-left",
          "w-1/3 text-left",
          "w-1/4 text-center"
        ],
        "rows": [
          [
            "{@spell Вызов феи [Conjure Fey]|url:conjure-fey-phb}",
            "Вызов",
            "К"
          ],
          [
            "{@spell Движение почвы [Move Earth]|url:move-earth-phb}",
            "Преобразование",
            "К"
          ],
          [
            "{@spell Исцеление [Heal]|url:heal-phb}",
            "Ограждение",
            "—"
          ],
          [
            "{@spell Окаменение [Flesh to Stone]|url:flesh-to-stone-phb}",
            "Преобразование",
            "К"
          ],
          [
            "{@spell Пир героев [Heroes’ Feast]|url:heroes-feast-phb}",
            "Вызов",
            "М"
          ],
          [
            "{@spell Поиск пути [Find the Path]|url:find-the-path-phb}",
            "Прорицание",
            "К, М"
          ],
          [
            "{@spell Путешествие через растения [Transport via Plants]|url:transport-via-plants-phb}",
            "Вызов",
            "—"
          ],
          [
            "{@spell Солнечный луч [Sunbeam]|url:sunbeam-phb}",
            "Воплощение",
            "К"
          ],
          [
            "{@spell Стена шипов [Wall of Thorns]|url:wall-of-thorns-phb}",
            "Вызов",
            "К"
          ],
          [
            "{@spell Хождение по ветру [Wind Walk]|url:wind-walk-phb}",
            "Преобразование",
            "—"
          ]
        ]
      },
      {
        "type": "table",
        "caption": "Заклинания друида 7 уровня",
        "colLabels": [
          "Заклинание",
          "Школа",
          "Спец."
        ],
        "colStyles": [
          "w-2/5 text-left",
          "w-1/3 text-left",
          "w-1/4 text-center"
        ],
        "rows": [
          [
            "{@spell Изменение тяготения [Reverse Gravity]|url:reverse-gravity-phb}",
            "Преобразование",
            "К"
          ],
          [
            "{@spell Огненная буря [Fire Storm]|url:fire-storm-phb}",
            "Воплощение",
            "—"
          ],
          [
            "{@spell Регенерация [Regenerate]|url:regenerate-phb}",
            "Преобразование",
            "—"
          ],
          [
            "{@spell Знак [Symbol]|url:symbol-phb}",
            "Ограждение",
            "М"
          ],
          [
            "{@spell Таинственный мираж [Mirage Arcane]|url:mirage-arcane-phb}",
            "Иллюзия",
            "—"
          ],
          [
            "{@spell Уход в иной план [Plane Shift]|url:plane-shift-phb}",
            "Вызов",
            "М"
          ]
        ]
      },
      {
        "type": "table",
        "caption": "Заклинания друида 8 уровня",
        "colLabels": [
          "Заклинание",
          "Школа",
          "Спец."
        ],
        "colStyles": [
          "w-2/5 text-left",
          "w-1/3 text-left",
          "w-1/4 text-center"
        ],
        "rows": [
          [
            "{@spell Антипатия/симпатия [Antipathy/Sympathy]|url:antipathy-sympathy-phb}",
            "Очарование",
            "—"
          ],
          [
            "{@spell Власть над погодой [Control Weather]|url:control-weather-phb}",
            "Преобразование",
            "К"
          ],
          [
            "{@spell Воспламеняющаяся туча [Incendiary Cloud]|url:incendiary-cloud-phb}",
            "Вызов",
            "К"
          ],
          [
            "{@spell Замешательство [Feeblemind]|url:feeblemind-phb}",
            "Очарование",
            "—"
          ],
          [
            "{@spell Землетрясение [Earthquake]|url:earthquake-phb}",
            "Преобразование",
            "К"
          ],
          [
            "{@spell Превращение в животных [Animal Shapes]|url:animal-shapes-phb}",
            "Преобразование",
            "—"
          ],
          [
            "{@spell Солнечный ожог [Sunburst]|url:sunburst-phb}",
            "Воплощение",
            "—"
          ],
          [
            "{@spell Цунами [Tsunami]|url:tsunami-phb}",
            "Вызов",
            "К"
          ]
        ]
      },
      {
        "type": "table",
        "caption": "Заклинания друида 9 уровня",
        "colLabels": [
          "Заклинание",
          "Школа",
          "Спец."
        ],
        "colStyles": [
          "w-2/5 text-left",
          "w-1/3 text-left",
          "w-1/4 text-center"
        ],
        "rows": [
          [
            "{@spell Гроза гнева [Storm of Vengeance]|url:storm-of-vengeance-phb}",
            "Вызов",
            "К"
          ],
          [
            "{@spell Истинное воскрешение [True Resurrection]|url:true-resurrection-phb}",
            "Некромантия",
            "М"
          ],
          [
            "{@spell Полное превращение [Shapechange]|url:shapechange-phb}",
            "Преобразование",
            "К, М"
          ],
          [
            "{@spell Предвидение [Foresight]|url:foresight-phb}",
            "Прорицание",
            "—"
          ]
        ]
      }
    ],
    "updatedAt": "2026-01-05T16:05:07.296611Z",
    "userId": "Magistrus",
    "hitDice": {
      "label": "к8",
      "value": "d8",
      "maxValue": 8,
      "avg": 5
    },
    "primaryCharacteristics": "Мудрость",
    "proficiency": {
      "armor": "Щит, Легкий доспех",
      "weapon": "Простое дальнобойное, Простое рукопашное",
      "tool": "Набор травника",
      "skill": "Выберите 2 навыка из следующих: Аркана, Уход за животными, Проницательность, Медицина, Природа, Внимательность, Религия, Выживание"
    },
    "equipment": [
      "Выберите А или Б:",
      {
        "type": "list",
        "attrs": {
          "type": "unordered"
        },
        "content": [
          "А) {@item кожаный доспех|url:leather-armor-phb}, {@item щит|url:shield-phb}, {@item серп|url:sickle-phb}, {@item фокусировка друидов (боевой посох)|url:quarterstaff-phb}, {@item набор путешественника|url:explorer-s-pack-phb}, {@item набор травника|url:herbalism-kit-phb} и 9 зм;",
          "Б) 50 зм."
        ]
      }
    ],
    "savingThrows": "Мудрость, Интеллект",
    "features": [
      {
        "isSubclass": false,
        "key": "ispolzovanie-zaklinanij",
        "level": 1,
        "name": "Использование заклинаний",
        "description": [
          "Вы научились накладывать заклинания, изучая мистические силы природы. Правила наложения заклинаний см. в главе 7. Ниже подробно описано, как применять эти правила к заклинаниям друида, которые будут перечислены в списке заклинаний друида далее в описании класса.",
          "{@b Заговоры.} Вы знаете 2 заговора по вашему выбору из списка заклинаний друида. Рекомендуются: {@spell Искусство друидов [Druidcraft]|url:druidcraft-phb} и {@spell Сотворение пламени [Produce Flame]|url:produce-flame-phb}. Каждый раз, когда вы получаете уровень друида, вы можете заменить 1 из ваших заговоров другим заговором по своему выбору из списка заклинаний друида. При достижении 4 и 10 уровней друида вы изучаете дополнительный заговор по своему выбору, как показано в столбце «Заговоры» из таблицы «Умения друида».",
          "{@b Ячейки заклинаний.} Таблица «Умения друида» показывает, сколько ячеек заклинаний вы можете использовать для заклинаний 1+ уровня. Вы восстанавливаете все потраченные ячейки, когда заканчиваете {@glossary продолжительный отдых|url:long-rest-phb}.",
          "{@b Подготовленные заклинания 1+ уровня.} Вы подготавливаете список заклинаний 1+ уровня, которые доступны вам для использования с помощью этого умения. Для начала выберите 4 заклинания 1 уровня из списка заклинаний друида. Рекомендуются: {@spell Дружба с животными [Animal Friendship]|url:animal-friendship-phb}, {@spell Лечение ран [Cure Wounds]|url:cure-wounds-phb}, {@spell Огонь фей [Faerie Fire]|url:faerie-fire-phb}, {@spell Волна грома [Thunderwave]|url:thunderwave-phb}. Количество подготовленных заклинаний увеличивается по мере того, как вы получаете уровни друида, как показано в столбце «Подг. закл.» из таблицы «Умения друида».",
          "Каждый раз, когда это число увеличивается, выберите дополнительные заклинания из списка заклинаний друида, чтобы количество заклинаний вашего списка соответствовало значению в таблице «Умения друида». Выбранные заклинания должны быть того уровня, для которого у вас есть ячейка заклинаний. Например, если вы друид 3 уровня, то ваш список подготовленных заклинаний может включать 6 заклинаний друида 1 и 2 уровней в любой комбинации.",
          "Если другое умение друида даёт вам всегда подготовленные заклинания, то эти заклинания не учитываются в количестве заклинаний, которые вы можете подготовить с помощью этого умения, но в остальном они считаются заклинаниями друида для вас.",
          "{@b Изменение подготовленных заклинаний.} Каждый раз, когда вы заканчиваете {@glossary продолжительный отдых|url:long-rest-phb}, вы можете изменить ваш список подготовленных заклинаний, заменив любые из них другими заклинаниями друида, для которых у вас имеется ячейка заклинаний.",
          "{@b Заклинательная характеристика.} Мудрость — это ваша заклинательная характеристика для ваших заклинаний друида.",
          "{@b Заклинательная фокусировка.} В качестве заклинательной фокусировки для ваших заклинаний друида вы можете использовать фокусировку друидов."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "druidiceskij-azyk",
        "level": 1,
        "name": "Друидический язык",
        "description": [
          "Вы знаете друидический, тайный язык друидов. Изучая этот древний язык, вы также открыли магию общения с животными; у вас всегда подготовлено заклинание {@spell Разговор с животными [Speak with Animals]|url:speak-with-animals-phb}. Вы можете использовать друидический, чтобы оставлять скрытые сообщения. Вы и другие, кто знает друидический, автоматически замечаете такое сообщение. Другие замечают наличие сообщения с помощью успешной проверки Интеллекта (Анализ) со {@glossary Сл.|url:difficulty-class-phb} 15, но не могут расшифровать его без {@glossary магии|url:magic-phb}."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "pervobytnyj-poradok",
        "level": 1,
        "name": "Первобытный порядок",
        "description": [
          "Вы посвятили себя одной из следующих священных ролей по вашему выбору:",
          {
            "type": "list",
            "attrs": {
              "type": "unordered"
            },
            "content": [
              "{@b Маг.} Вы знаете один дополнительный {@glossary заговор|url:cantrip-phb} из списка {@glossary заклинаний|url:spell-phb} друида. Кроме того, ваша мистическая связь с природой даёт вам бонус к проверкам Интеллекта (Аркана или Природа). Бонус равен вашему модификатору Мудрости (минимум +1).",
              "{@b Хранитель.} Обученный битве, вы получаете {@glossary владение|url:proficiency-phb} воинским оружием и средними доспехами."
            ]
          }
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "dikaa-forma",
        "level": 2,
        "name": "Дикая форма",
        "description": [
          "Сила природы позволяет вам превращаться в {@i зверя}. {@glossary Бонусным действием|url:bonus-action-phb} вы принимаете звериную форму (дикая форма), которую вы изучили для этого умения (см. «Известные формы» ниже). Вы остаётесь в этой форме количество часов, равное половине вашего уровня друида, или пока вы снова не используете Дикую форму, не получите состояние {@glossary недееспособный|url:incapacitated-phb} или не умрёте. Вы также можете выйти из формы раньше {@glossary бонусным действием|url:bonus-action-phb}.",
          "{@b Количество использований.} Вы можете использовать Дикую форму дважды. Вы восстанавливаете одно потраченное использование, когда заканчиваете {@glossary короткий отдых|url:short-rest-phb}, и все потраченные использования, когда заканчиваете {@glossary продолжительный отдых|url:long-rest-phb}. Вы получаете дополнительные использования, когда достигаете определённых уровней друида, как показано в столбце «ДФ» таблицы «Умения друида».",
          "{@b Известные формы.} Вы знаете 4 звериные формы для этого умения, выбранные из статблоков зверей с максимальным {@glossary показателем опасности|url:challenge-rating-phb} 1/4 и без {@glossary скорости полёта|url:fly-speed-phb}. Рекомендуется: крыса, ездовая лошадь, паук и волк. Каждый раз, когда вы заканчиваете {@glossary продолжительный отдых|url:long-rest-phb}, вы можете заменить одну из известных форм другой подходящей формой.",
          "Когда вы достигаете определённых уровней {@glossary друида|url:druid-phb}, количество известных форм и максимальный ПО для этих форм увеличиваются, как показано в таблице «Формы зверей». С 8 уровня вы можете принять форму, обладающую {@glossary скоростью полёта|url:fly-speed-phb}. При выборе известных форм вы можете использовать {@link бестиарий|url:/bestiary} или другой источник с подходящими зверями, если Мастер разрешит.",
          {
            "type": "table",
            "caption": "Формы зверей",
            "colLabels": [
              "Уровень друида",
              "Известно форм",
              "Макс. ПО",
              "Скорость полёта"
            ],
            "colStyles": [
              "w-1/4 text-center",
              "w-1/4 text-center",
              "w-1/4 text-center",
              "w-1/4 text-center"
            ],
            "rows": [
              [
                "2",
                "4",
                "1/4",
                "нет"
              ],
              [
                "4",
                "6",
                "1/2",
                "нет"
              ],
              [
                "8",
                "8",
                "1",
                "да"
              ]
            ]
          },
          "{@b Правила при смене формы.} Находясь в Дикой форме, вы сохраняете свою личность, воспоминания и способность говорить. Применяются следующие правила:",
          {
            "type": "list",
            "attrs": {
              "type": "unordered"
            },
            "content": [
              "{@b Временные хиты.} Когда вы принимаете Дикую форму, вы получаете количество {@glossary временных хитов|url:temporary-hit-points-phb}, равное вашему уровню друида.",
              "{@b Статблок.} Ваш статблок заменяется статблоком зверя, но вы сохраняете свой {@glossary тип существа|url:creature-type-phb}, {@glossary хиты|url:hit-points-phb}, кости хитов, показатели Интеллекта, Мудрости и Харизмы, особенности класса, языки и черты. Вы также сохраняете владение навыками и {@glossary спасбросками|url:saving-throw-phb} и используете свой бонус мастерства в дополнение к полученным владениям зверя. Если модификатор навыка или спасброска зверя выше вашего, используйте наивысший.",
              "{@b Никаких заклинаний.} Вы не можете накладывать {@glossary заклинания|url:spell-phb}, но превращение не нарушает вашу {@glossary концентрацию|url:concentration-phb} и не мешает уже наложенным {@glossary магическим эффектам|url:magical-effect-phb}.",
              "{@b Объекты.} Ваша способность использовать {@glossary предметы|url:object-phb} определяется конечностями формы, а не вашими собственными. Кроме того, вы выбираете, падает ли ваше {@glossary снаряжение|url:equipment-phb} в ваше пространство, сливается с вашей новой формой или остаётся надетым на неё. Надетое снаряжение функционирует как обычно, но Мастер решает, практично ли для новой формы носить его, исходя из размера и формы. Ваше снаряжение не меняет форму и размер, чтобы соответствовать новой форме. Всё, что не может быть надето, падает или сливается с формой. Слитое снаряжение не оказывает эффекта, пока вы находитесь в этой форме."
            ]
          }
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "dikij-kompanon",
        "level": 2,
        "name": "Дикий компаньон",
        "description": [
          "Вы можете призвать духа природы, который принимает форму животного, чтобы помочь вам. Действием {@glossary магия|url:magic-phb} вы можете потратить ячейку {@glossary заклинания|url:spell-phb} или использование {@i Дикой формы}, чтобы наложить заклинание {@spell Поиск фамильяра [Find Familiar]|url:find-familiar-phb} без материальных компонентов.",
          "Когда вы накладываете {@glossary заклинание|url:spell-phb} таким образом, фамильяр имеет тип существа фея и исчезает, когда вы заканчиваете {@glossary продолжительный отдых|url:long-rest-phb}."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "podklass-druida",
        "level": 3,
        "name": "Подкласс друида",
        "description": [
          "Вы получаете подкласс друида по вашему выбору. Подклассы Круг Земли, Круг Луны, Круг Моря и Круг Звёзд подробно изложены после списка {@glossary заклинаний|url:spell-phb} этого класса. Подкласс — это специализация, которая предоставляет вам возможности на определённых уровнях друида. В ходе дальнейшего развития вы получаете все умения вашего подкласса, которые соответствуют вашему уровню друида или ниже."
        ],
        "additional": "",
        "scaling": [
          {
            "level": 6,
            "name": "Умение подкласса",
            "description": [
              "Вы получаете умения подкласса."
            ],
            "additional": "",
            "hideInSubclasses": false
          },
          {
            "level": 10,
            "name": "Умение подкласса",
            "description": [
              "Вы получаете умения подкласса."
            ],
            "additional": "",
            "hideInSubclasses": false
          },
          {
            "level": 14,
            "name": "Умение подкласса",
            "description": [
              "Вы получаете умения подкласса."
            ],
            "additional": "",
            "hideInSubclasses": false
          }
        ],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "ulucsenie-harakteristik",
        "level": 4,
        "name": "Улучшение характеристик",
        "description": [
          "Вы получаете черту {@feat Улучшение характеристик [Ability Score Improvement]|url:ability-score-improvement-phb} (см. главу 5) или другую черту по вашему выбору, требованиям которой вы соответствуете. Вы снова получаете эту способность на уровнях друида 8, 12 и 16."
        ],
        "additional": "",
        "scaling": [
          {
            "level": 8,
            "name": "Улучшение характеристик",
            "description": [
              "Вы получаете черту {@feat Улучшение характеристик [Ability Score Improvement]|url:ability-score-improvement-phb} (см. главу 5) или другую черту по вашему выбору, требованиям которой вы соответствуете."
            ],
            "additional": "",
            "hideInSubclasses": false
          },
          {
            "level": 12,
            "name": "Улучшение характеристик",
            "description": [
              "Вы получаете черту {@feat Улучшение характеристик [Ability Score Improvement]|url:ability-score-improvement-phb} (см. главу 5) или другую черту по вашему выбору, требованиям которой вы соответствуете."
            ],
            "additional": "",
            "hideInSubclasses": false
          },
          {
            "level": 16,
            "name": "Улучшение характеристик",
            "description": [
              "Вы получаете черту {@feat Улучшение характеристик [Ability Score Improvement]|url:ability-score-improvement-phb} (см. главу 5) или другую черту по вашему выбору, требованиям которой вы соответствуете."
            ],
            "additional": "",
            "hideInSubclasses": false
          }
        ],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "vosstanovlenie-dikosti",
        "level": 5,
        "name": "Восстановление дикости",
        "description": [
          "Один раз в ваш ход, если у вас не осталось использований {@i Дикой формы}, вы можете дать себе одно использование, потратив ячейку {@glossary заклинания|url:spell-phb} (действие не требуется).",
          "Кроме того, вы можете потратить одно использование {@i Дикой формы} (действие не требуется), чтобы дать себе ячейку {@glossary заклинания|url:spell-phb} 1 уровня, но вы не сможете сделать это снова, пока не закончите {@glossary продолжительный отдых|url:long-rest-phb}."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "stihijnaa-arost",
        "level": 7,
        "name": "Стихийная ярость",
        "description": [
          "Мощь стихий течёт через вас. Вы получаете один из следующих вариантов по вашему выбору:",
          {
            "type": "list",
            "attrs": {
              "type": "unordered"
            },
            "content": [
              "{@b Мощные заклинания.} Добавьте свой модификатор Мудрости к урону, который вы наносите любым {@glossary заговором|url:cantrip-phb} друида.",
              "{@b Дикий удар.} Один раз в ваш ход, когда вы попадаете по {@glossary существу|url:creature-phb} броском {@glossary атаки|url:attack-phb}, используя оружие или атаку из статблока зверя в {@i Дикой форме}, вы можете заставить цель получить дополнительно {@roll 1к8} урона холодом, огнём, электричеством или звуком (выберите, когда вы наносите удар)."
            ]
          }
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "ulucsennaa-stihijnaa-arost",
        "level": 15,
        "name": "Улучшенная стихийная ярость",
        "description": [
          "Выбранный вами вариант {@i Стихийной ярости} становится мощнее, как описано ниже.",
          {
            "type": "list",
            "attrs": {
              "type": "unordered"
            },
            "content": [
              "{@b Мощные заклинания.} Когда вы применяете {@glossary заговор|url:cantrip-phb} друида с дистанцией 10 фт. или больше, радиус действия {@glossary заклинания|url:spell-phb} увеличивается на 300 фт.",
              "{@b Дикий удар.} Дополнительный урон вашего {@i Дикого удара} увеличивается до {@roll 2к8}."
            ]
          }
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "zaklinania-zvera",
        "level": 18,
        "name": "Заклинания Зверя",
        "description": [
          "Во время использования {@i Дикой формы} вы можете накладывать {@glossary заклинания|url:spell-phb} в форме зверя, за исключением любого {@glossary заклинания|url:spell-phb}, которое имеет материальный компонент со стоимостью или которое потребляет материальный компонент."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "epiceskaa-certa",
        "level": 19,
        "name": "Эпическая черта",
        "description": [
          "Вы получаете эпическую черту (см. главу 5) или другую черту по вашему выбору, требованиям которой вы соответствуете. Рекомендуется черта {@feat Дар пространственного путешествия [Boon of Dimensional Travel]|url:boon-of-dimensional-travel-phb}."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "arhidruid",
        "level": 20,
        "name": "Архидруид",
        "description": [
          "Жизненная сила природы постоянно расцветает внутри вас, предоставляя вам следующие эффекты:",
          {
            "type": "list",
            "attrs": {
              "type": "unordered"
            },
            "content": [
              "{@b Неувядающая Дикая форма.} Каждый раз, когда вы бросаете инициативу и у вас не осталось использований Дикой формы, вы восстанавливаете одно потраченное её использование.",
              "{@b Природный маг.} Вы можете преобразовать использования {@i Дикой формы} в ячейку {@glossary заклинания|url:spell-phb} (действие не требуется). Выберите несколько ваших неизрасходованных использований {@i Дикой формы} и преобразуйте их в одну ячейку {@glossary заклинания|url:spell-phb}, при этом каждое использование добавляет 2 уровня {@glossary заклинания|url:spell-phb}. Например, если вы преобразуете два использования {@i Дикой формы}, вы получите ячейку {@glossary заклинания|url:spell-phb} 4 уровня. После того как вы используете это умение, вы не сможете сделать это снова, пока не закончите {@glossary продолжительный отдых|url:long-rest-phb}.",
              "{@b Долголетие.} Первичная магия, которой вы владеете, замедляет ваше старение. За каждые десять лет, которые проходят, ваше тело стареет только на 1 год."
            ]
          }
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      }
    ],
    "table": [
      {
        "name": "ДФ",
        "scaling": [
          {
            "level": 2,
            "value": "2"
          },
          {
            "level": 6,
            "value": "3"
          },
          {
            "level": 17,
            "value": "4"
          }
        ]
      },
      {
        "name": "Заговоры",
        "scaling": [
          {
            "level": 1,
            "value": "2"
          },
          {
            "level": 4,
            "value": "3"
          },
          {
            "level": 10,
            "value": "4"
          }
        ]
      },
      {
        "name": "Подг. Закл",
        "scaling": [
          {
            "level": 1,
            "value": "4"
          },
          {
            "level": 2,
            "value": "5"
          },
          {
            "level": 3,
            "value": "6"
          },
          {
            "level": 4,
            "value": "7"
          },
          {
            "level": 5,
            "value": "9"
          },
          {
            "level": 6,
            "value": "10"
          },
          {
            "level": 7,
            "value": "11"
          },
          {
            "level": 8,
            "value": "12"
          },
          {
            "level": 9,
            "value": "14"
          },
          {
            "level": 10,
            "value": "15"
          },
          {
            "level": 11,
            "value": "16"
          },
          {
            "level": 13,
            "value": "17"
          },
          {
            "level": 15,
            "value": "18"
          },
          {
            "level": 17,
            "value": "19"
          },
          {
            "level": 18,
            "value": "20"
          },
          {
            "level": 19,
            "value": "21"
          },
          {
            "level": 20,
            "value": "22"
          }
        ]
      }
    ],
    "casterType": "FULL",
    "hasSubclasses": true,
    "name": {
      "rus": "Друид",
      "eng": "Druid"
    },
    "source": {
      "name": {
        "label": "PHB",
        "rus": "Книга игрока",
        "eng": "Player Handbook"
      },
      "group": {
        "label": "Basic",
        "rus": "Официальные источники"
      },
      "page": 89
    }
  },
  {
    "url": "cleric-phb",
    "gallery": [
      "/s3/classes/peterko/1759866419973-cleric2.webp",
      "/s3/classes/magistrus/1759905556381-cleric2.webp"
    ],
    "image": "/s3/classes/peterko/1759866415252-cleric.webp",
    "description": [
      "{@i Священник творит чудо божественной силы}",
      "Жрецы черпают силу из сфер богов и используют её, чтобы творить чудеса. Благословлённый божеством, пантеоном или другой бессмертной сущностью, жрец может обратиться к божественной магии Внешних планов (где обитают боги) и направить её, чтобы поддержать людей и сражаться с врагами.",
      "Поскольку их сила — это божественный дар, то жрецы обычно связывают себя с храмами, посвящёнными божеству или другой бессмертной силе, которая открыла для них магию. Использование божественной магии не зависит от специальной подготовки, однако жрецы могут изучать молитвы и обряды, которые помогают им черпать силу из Внешних планов.",
      "Не каждый член храма или святилища является жрецом. Некоторые священники призваны к простой жизни храмового служения, проявляя свою преданность посредством молитв и ритуалов, а не через магию. Многие смертные утверждают, что говорят от имени богов, но немногие могут управлять силой этих богов так, как это делает жрец.",
      {
        "type": "heading",
        "attrs": {
          "level": "2"
        },
        "content": [
          {
            "type": "text",
            "text": "Становление жрецом..."
          }
        ]
      },
      "{@b Как персонаж 1 уровня:}",
      {
        "type": "list",
        "attrs": {
          "type": "unordered"
        },
        "content": [
          "Получите особенности из таблицы «Особенности жреца».",
          "Получите умения жреца 1 уровня, которые перечислены в таблице «Умения жреца»."
        ]
      },
      "{@b Как мультикласс:}",
      {
        "type": "list",
        "attrs": {
          "type": "unordered"
        },
        "content": [
          "Получите следующие особенности из таблицы «Особенности жреца»: кость {@glossary хитов|url:hit-points-phb}, владение лёгкими, средними доспехами и щитами.",
          "Получите умения жреца 1 уровня, которые перечислены в таблице «Умения жреца». См. правила мультиклассирования в главе 2, чтобы определить доступные ячейки заклинаний."
        ]
      },
      {
        "type": "heading",
        "attrs": {
          "level": "2"
        },
        "content": [
          {
            "type": "text",
            "text": "Список заклинаний жреца"
          }
        ]
      },
      "В этом разделе представлен список заклинаний жреца. Заклинания организованы по уровню заклинаний, а затем отсортированы по алфавиту, и указана школа магии каждого заклинания.{@br}В столбце {@b «Спец.»} ({@i Специальное}) обозначения имеют следующий смысл: {@b К} — заклинание требует концентрации; {@b Р} — заклинание можно сотворить как ритуал; {@b М} — заклинание требует особый материальный компонент.",
      {
        "type": "table",
        "caption": "Заклинания жреца 0 уровня",
        "colLabels": [
          "Заклинание",
          "Школа",
          "Спец."
        ],
        "colStyles": [
          "w-2/5 text-left",
          "w-1/3 text-left",
          "w-1/4 text-center"
        ],
        "rows": [
          [
            "{@spell Наставление [Guidance]|url:guidance-phb}",
            "Прорицание",
            "К"
          ],
          [
            "{@spell Погребальный звон [Toll the Dead]|url:toll-the-dead-phb}",
            "Некромантия",
            "—"
          ],
          [
            "{@spell Починка [Mending]|url:mending-phb}",
            "Преобразование",
            "—"
          ],
          [
            "{@spell Свет [Light]|url:light-phb}",
            "Воплощение",
            "—"
          ],
          [
            "{@spell Священное пламя [Sacred Flame]|url:sacred-flame-phb}",
            "Воплощение",
            "—"
          ],
          [
            "{@spell Слово сияния [Word of Radiance]|url:word-of-radiance-phb}",
            "Воплощение",
            "—"
          ],
          [
            "{@spell Сопротивление [Resistance]|url:resistance-phb}",
            "Ограждение",
            "К"
          ],
          [
            "{@spell Уход за умирающим [Spare the Dying]|url:spare-the-dying-phb}",
            "Некромантия",
            "—"
          ],
          [
            "{@spell Чудотворство [Thaumaturgy]|url:thaumaturgy-phb}",
            "Преобразование",
            "—"
          ]
        ]
      },
      {
        "type": "table",
        "caption": "Заклинания жреца 1 уровня",
        "colLabels": [
          "Заклинание",
          "Школа",
          "Спец."
        ],
        "colStyles": [
          "w-2/5 text-left",
          "w-1/3 text-left",
          "w-1/4 text-center"
        ],
        "rows": [
          [
            "{@spell Благословение [Bless]|url:bless-phb}",
            "Очарование",
            "К, М"
          ],
          [
            "{@spell Защита от зла и добра [Protection from Evil and Good]|url:protection-from-evil-and-good-phb}",
            "Ограждение",
            "К, М"
          ],
          [
            "{@spell Лечащее слово [Healing Word]|url:healing-word-phb}",
            "Ограждение",
            "—"
          ],
          [
            "{@spell Лечение ран [Cure Wounds]|url:cure-wounds-phb}",
            "Ограждение",
            "—"
          ],
          [
            "{@spell Нанесение ран [Inflict Wounds]|url:inflict-wounds-phb}",
            "Некромантия",
            "—"
          ],
          [
            "{@spell Направляющий снаряд [Guiding Bolt]|url:guiding-bolt-phb}",
            "Воплощение",
            "—"
          ],
          [
            "{@spell Обнаружение болезней и яда [Detect Poison and Disease]|url:detect-poison-and-disease-phb}",
            "Прорицание",
            "К, Р"
          ],
          [
            "{@spell Обнаружение добра и зла [Detect Evil and Good]|url:detect-evil-and-good-phb}",
            "Прорицание",
            "К"
          ],
          [
            "{@spell Обнаружение магии [Detect Magic]|url:detect-magic-phb}",
            "Прорицание",
            "К, Р"
          ],
          [
            "{@spell Очищение пищи и питья [Purify Food and Drink]|url:purify-food-and-drink-phb}",
            "Преобразование",
            "Р"
          ],
          [
            "{@spell Порча [Bane]|url:bane-phb}",
            "Очарование",
            "К"
          ],
          [
            "{@spell Приказ [Command]|url:command-phb}",
            "Очарование",
            "—"
          ],
          [
            "{@spell Сотворение или уничтожение воды [Create or Destroy Water]|url:create-or-destroy-water-phb}",
            "Преобразование",
            "—"
          ],
          [
            "{@spell Убежище [Sanctuary]|url:sanctuary-phb}",
            "Ограждение",
            "—"
          ],
          [
            "{@spell Щит веры [Shield of Faith]|url:shield-of-faith-phb}",
            "Ограждение",
            "К"
          ]
        ]
      },
      {
        "type": "table",
        "caption": "Заклинания жреца 2 уровня",
        "colLabels": [
          "Заклинание",
          "Школа",
          "Спец."
        ],
        "colStyles": [
          "w-2/5 text-left",
          "w-1/3 text-left",
          "w-1/4 text-center"
        ],
        "rows": [
          [
            "{@spell Божественное оружие [Spiritual Weapon]|url:spiritual-weapon-phb}",
            "Воплощение",
            "К"
          ],
          [
            "{@spell Вечный огонь [Continual Flame]|url:continual-flame-phb}",
            "Воплощение",
            "М"
          ],
          [
            "{@spell Гадание [Augury]|url:augury-phb}",
            "Прорицание",
            "Р, М"
          ],
          [
            "{@spell Глухота/слепота [Blindness/Deafness]|url:blindness-deafness-phb}",
            "Преобразование",
            "—"
          ],
          [
            "{@spell Защита от яда [Protection from Poison]|url:protection-from-poison-phb}",
            "Ограждение",
            "—"
          ],
          [
            "{@spell Малое восстановление [Lesser Restoration]|url:lesser-restoration-phb}",
            "Ограждение",
            "—"
          ],
          [
            "{@spell Молебен лечения [Prayer of Healing]|url:prayer-of-healing-phb}",
            "Ограждение",
            "—"
          ],
          [
            "{@spell Нетленные останки [Gentle Repose]|url:gentle-repose-phb}",
            "Некромантия",
            "Р, М"
          ],
          [
            "{@spell Область истины [Zone of Truth]|url:zone-of-truth-phb}",
            "Очарование",
            "—"
          ],
          [
            "{@spell Охраняющая связь [Warding Bond]|url:warding-bond-phb}",
            "Ограждение",
            "М"
          ],
          [
            "{@spell Подмога [Aid]|url:aid-phb}",
            "Ограждение",
            "—"
          ],
          [
            "{@spell Поиск ловушек [Find Traps]|url:find-traps-phb}",
            "Прорицание",
            "—"
          ],
          [
            "{@spell Поиск объекта [Locate Object]|url:locate-object-phb}",
            "Прорицание",
            "К"
          ],
          [
            "{@spell Тишина [Silence]|url:silence-phb}",
            "Иллюзия",
            "К, Р"
          ],
          [
            "{@spell Удержание личности [Hold Person]|url:hold-person-phb}",
            "Очарование",
            "К"
          ],
          [
            "{@spell Улучшение характеристики [Enhance Ability]|url:enhance-ability-phb}",
            "Преобразование",
            "К"
          ],
          [
            "{@spell Умиротворение [Calm Emotions]|url:calm-emotions-phb}",
            "Очарование",
            "К"
          ]
        ]
      },
      {
        "type": "table",
        "caption": "Заклинания жреца 3 уровня",
        "colLabels": [
          "Заклинание",
          "Школа",
          "Спец."
        ],
        "colStyles": [
          "w-2/5 text-left",
          "w-1/3 text-left",
          "w-1/4 text-center"
        ],
        "rows": [
          [
            "{@spell Аура живучести [Aura of Vitality]|url:aura-of-vitality-phb}",
            "Ограждение",
            "К"
          ],
          [
            "{@spell Дневной свет [Daylight]|url:daylight-phb}",
            "Воплощение",
            "—"
          ],
          [
            "{@spell Духовные стражи [Spirit Guardians]|url:spirit-guardians-phb}",
            "Вызов",
            "К"
          ],
          [
            "{@spell Защита от энергии [Protection from Energy]|url:protection-from-energy-phb}",
            "Ограждение",
            "К"
          ],
          [
            "{@spell Магический круг [Magic Circle]|url:magic-circle-phb}",
            "Ограждение",
            "М"
          ],
          [
            "{@spell Маяк надежды [Beacon of Hope]|url:beacon-of-hope-phb}",
            "Ограждение",
            "К"
          ],
          [
            "{@spell Множественное лечащее слово [Mass Healing Word]|url:mass-healing-word-phb}",
            "Ограждение",
            "—"
          ],
          [
            "{@spell Низшее воскрешение [Revivify]|url:revivify-phb}",
            "Некромантия",
            "М"
          ],
          [
            "{@spell Оживление мертвецов [Animate Dead]|url:animate-dead-phb}",
            "Некромантия",
            "—"
          ],
          [
            "{@spell Охранные руны [Glyph of Warding]|url:glyph-of-warding-phb}",
            "Ограждение",
            "М"
          ],
          [
            "{@spell Подсматривание [Clairvoyance]|url:clairvoyance-phb}",
            "Прорицание",
            "К, М"
          ],
          [
            "{@spell Послание [Sending]|url:sending-phb}",
            "Прорицание",
            "—"
          ],
          [
            "{@spell Притворная смерть [Feign Death]|url:feign-death-phb}",
            "Некромантия",
            "Р"
          ],
          [
            "{@spell Проклятие [Bestow Curse]|url:bestow-curse-phb}",
            "Некромантия",
            "К"
          ],
          [
            "{@spell Разговор с мёртвыми [Speak with Dead]|url:speak-with-dead-phb}",
            "Некромантия",
            "—"
          ],
          [
            "{@spell Рассеивание магии [Dispel Magic]|url:dispel-magic-phb}",
            "Ограждение",
            "—"
          ],
          [
            "{@spell Слияние с камнем [Meld into Stone]|url:meld-into-stone-phb}",
            "Преобразование",
            "Р"
          ],
          [
            "{@spell Снятие проклятья [Remove Curse]|url:remove-curse-phb}",
            "Ограждение",
            "—"
          ],
          [
            "{@spell Сотворение пищи и воды [Create Food and Water]|url:create-food-and-water-phb}",
            "Вызов",
            "—"
          ],
          [
            "{@spell Хождение по воде [Water Walk]|url:water-walk-phb}",
            "Преобразование",
            "Р"
          ],
          [
            "{@spell Языки [Tongues]|url:tongues-phb}",
            "Прорицание",
            "—"
          ]
        ]
      },
      {
        "type": "table",
        "caption": "Заклинания жреца 4 уровня",
        "colLabels": [
          "Заклинание",
          "Школа",
          "Спец."
        ],
        "colStyles": [
          "w-2/5 text-left",
          "w-1/3 text-left",
          "w-1/4 text-center"
        ],
        "rows": [
          [
            "{@spell Аура жизни [Aura of Life]|url:aura-of-life-phb}",
            "Ограждение",
            "К"
          ],
          [
            "{@spell Аура очищения [Aura of Purity]|url:aura-of-purity-phb}",
            "Ограждение",
            "К"
          ],
          [
            "{@spell Власть над водами [Control Water]|url:control-water-phb}",
            "Преобразование",
            "К"
          ],
          [
            "{@spell Защита от смерти [Death Ward]|url:death-ward-phb}",
            "Ограждение",
            "—"
          ],
          [
            "{@spell Изгнание [Banishment]|url:banishment-phb}",
            "Ограждение",
            "К"
          ],
          [
            "{@spell Изменение формы камня [Stone Shape]|url:stone-shape-phb}",
            "Преобразование",
            "—"
          ],
          [
            "{@spell Поиск существа [Locate Creature]|url:locate-creature-phb}",
            "Прорицание",
            "К"
          ],
          [
            "{@spell Предсказание [Divination]|url:divination-phb}",
            "Прорицание",
            "Р, М"
          ],
          [
            "{@spell Свобода перемещения [Freedom of Movement]|url:freedom-of-movement-phb}",
            "Ограждение",
            "—"
          ],
          [
            "{@spell Страж веры [Guardian of Faith]|url:guardian-of-faith-phb}",
            "Вызов",
            "—"
          ]
        ]
      },
      {
        "type": "table",
        "caption": "Заклинания жреца 5 уровня",
        "colLabels": [
          "Заклинание",
          "Школа",
          "Спец."
        ],
        "colStyles": [
          "w-2/5 text-left",
          "w-1/3 text-left",
          "w-1/4 text-center"
        ],
        "rows": [
          [
            "{@spell Высшее восстановление [Greater Restoration]|url:greater-restoration-phb}",
            "Ограждение",
            "М"
          ],
          [
            "{@spell Заражение [Contagion]|url:contagion-phb}",
            "Некромантия",
            "—"
          ],
          [
            "{@spell Знание легенд [Legend Lore]|url:legend-lore-phb}",
            "Прорицание",
            "М"
          ],
          [
            "{@spell Круг силы [Circle of Power]|url:circle-of-power-phb}",
            "Ограждение",
            "К"
          ],
          [
            "{@spell Множественное лечение ран [Mass Cure Wounds]|url:mass-cure-wounds-phb}",
            "Ограждение",
            "—"
          ],
          [
            "{@spell Наблюдение [Scrying]|url:scrying-phb}",
            "Прорицание",
            "К, М"
          ],
          [
            "{@spell Нашествие насекомых [Insect Plague]|url:insect-plague-phb}",
            "Вызов",
            "К"
          ],
          [
            "{@spell Небесный огонь [Flame Strike]|url:flame-strike-phb}",
            "Воплощение",
            "—"
          ],
          [
            "{@spell Обет [Geas]|url:geas-phb}",
            "Очарование",
            "—"
          ],
          [
            "{@spell Общение [Commune]|url:commune-phb}",
            "Прорицание",
            "Р"
          ],
          [
            "{@spell Планарные узы [Planar Binding]|url:planar-binding-phb}",
            "Ограждение",
            "М"
          ],
          [
            "{@spell Призыв духа небожителя [Summon Celestial]|url:summon-celestial-tce}",
            "Вызов",
            "К, М"
          ],
          [
            "{@spell Рассеивание добра и зла [Dispel Evil and Good]|url:dispel-evil-and-good-phb}",
            "Ограждение",
            "К"
          ],
          [
            "{@spell Святилище [Hallow]|url:hallow-phb}",
            "Ограждение",
            "М"
          ],
          [
            "{@spell Воскрешение [Raise Dead]|url:raise-dead-phb}",
            "Некромантия",
            "М"
          ]
        ]
      },
      {
        "type": "table",
        "caption": "Заклинания жреца 6 уровня",
        "colLabels": [
          "Заклинание",
          "Школа",
          "Спец."
        ],
        "colStyles": [
          "w-2/5 text-left",
          "w-1/3 text-left",
          "w-1/4 text-center"
        ],
        "rows": [
          [
            "{@spell Запрет [Forbiddance]|url:forbiddance-phb}",
            "Ограждение",
            "Р, М"
          ],
          [
            "{@spell Истинное зрение [True Seeing]|url:true-seeing-phb}",
            "Прорицание",
            "М"
          ],
          [
            "{@spell Исцеление [Heal]|url:heal-phb}",
            "Ограждение",
            "—"
          ],
          [
            "{@spell Пир героев [Heroes' Feast]|url:heroes-feast-phb}",
            "Вызов",
            "М"
          ],
          [
            "{@spell Планарный союзник [Planar Ally]|url:planar-ally-phb}",
            "Вызов",
            "—"
          ],
          [
            "{@spell Поиск пути [Find the Path]|url:find-the-path-phb}",
            "Прорицание",
            "К, М"
          ],
          [
            "{@spell Поражение [Harm]|url:harm-phb}",
            "Некромантия",
            "—"
          ],
          [
            "{@spell Слово возврата [Word of Recall]|url:word-of-recall-phb}",
            "Вызов",
            "—"
          ],
          [
            "{@spell Солнечный луч [Sunbeam]|url:sunbeam-phb}",
            "Воплощение",
            "К"
          ],
          [
            "{@spell Сотворение нежити [Create Undead]|url:create-undead-phb}",
            "Некромантия",
            "М"
          ],
          [
            "{@spell Стена клинков [Blade Barrier]|url:blade-barrier-phb}",
            "Воплощение",
            "К"
          ]
        ]
      },
      {
        "type": "table",
        "caption": "Заклинания жреца 7 уровня",
        "colLabels": [
          "Заклинание",
          "Школа",
          "Спец."
        ],
        "colStyles": [
          "w-2/5 text-left",
          "w-1/3 text-left",
          "w-1/4 text-center"
        ],
        "rows": [
          [
            "{@spell Божественное слово [Divine Word]|url:divine-word-phb}",
            "Воплощение",
            "—"
          ],
          [
            "{@spell Вызов небожителя [Conjure Celestial]|url:conjure-celestial-phb}",
            "Вызов",
            "К"
          ],
          [
            "{@spell Высшее воскрешение [Resurrection]|url:resurrection-phb}",
            "Некромантия",
            "М"
          ],
          [
            "{@spell Огненная буря [Fire Storm]|url:fire-storm-phb}",
            "Воплощение",
            "—"
          ],
          [
            "{@spell Регенерация [Regenerate]|url:regenerate-phb}",
            "Преобразование",
            "—"
          ],
          [
            "{@spell Знак [Symbol]|url:symbol-phb}",
            "Ограждение",
            "М"
          ],
          [
            "{@spell Слово силы: укрепление [Power Word Fortify]|url:power-word-fortify-homebrew}",
            "Очарование",
            "—"
          ],
          [
            "{@spell Уход в иной план [Plane Shift]|url:plane-shift-phb}",
            "Вызов",
            "М"
          ],
          [
            "{@spell Эфирность [Etherealness]|url:etherealness-phb}",
            "Вызов",
            "—"
          ]
        ]
      },
      {
        "type": "table",
        "caption": "Заклинания жреца 8 уровня",
        "colLabels": [
          "Заклинание",
          "Школа",
          "Спец."
        ],
        "colStyles": [
          "w-2/5 text-left",
          "w-1/3 text-left",
          "w-1/4 text-center"
        ],
        "rows": [
          [
            "{@spell Аура святости [Holy Aura]|url:holy-aura-phb}",
            "Ограждение",
            "К, М"
          ],
          [
            "{@spell Власть над погодой [Control Weather]|url:control-weather-phb}",
            "Преобразование",
            "К"
          ],
          [
            "{@spell Землетрясение [Earthquake]|url:earthquake-phb}",
            "Преобразование",
            "К"
          ],
          [
            "{@spell Поле антимагии [Antimagic Field]|url:antimagic-field-phb}",
            "Ограждение",
            "К"
          ],
          [
            "{@spell Солнечный ожог [Sunburst]|url:sunburst-phb}",
            "Воплощение",
            "—"
          ]
        ]
      },
      {
        "type": "table",
        "caption": "Заклинания жреца 9 уровня",
        "colLabels": [
          "Заклинание",
          "Школа",
          "Спец."
        ],
        "colStyles": [
          "w-2/5 text-left",
          "w-1/3 text-left",
          "w-1/4 text-center"
        ],
        "rows": [
          [
            "{@spell Врата [Gate]|url:gate-phb}",
            "Вызов",
            "К, М"
          ],
          [
            "{@spell Истинное воскрешение [True Resurrection]|url:true-resurrection-phb}",
            "Некромантия",
            "М"
          ],
          [
            "{@spell Множественное исцеление [Mass Heal]|url:mass-heal-phb}",
            "Ограждение",
            "—"
          ],
          [
            "{@spell Проекция в астрал [Astral Projection]|url:astral-projection-phb}",
            "Некромантия",
            "М"
          ],
          [
            "{@spell Слово силы: исцеление [Power Word Heal]|url:power-word-heal-phb}",
            "Очарование",
            "—"
          ]
        ]
      }
    ],
    "updatedAt": "2026-01-18T13:08:23.511596Z",
    "userId": "Magistrus",
    "hitDice": {
      "label": "к8",
      "value": "d8",
      "maxValue": 8,
      "avg": 5
    },
    "primaryCharacteristics": "Мудрость",
    "proficiency": {
      "armor": "Щит, Средний доспех, Легкий доспех",
      "weapon": "Простое дальнобойное, Простое рукопашное",
      "tool": "",
      "skill": "Выберите 2 навыка из следующих: История, Проницательность, Медицина, Убеждение, Религия"
    },
    "equipment": [
      "Выберите А или Б:",
      {
        "type": "list",
        "attrs": {
          "type": "unordered"
        },
        "content": [
          "А) {@item кольчужная рубаха|url:chain-shirt-phb}, {@item щит|url:shield-phb}, {@item булава|url:mace-phb}, {@item священный символ|url:holy-symbol-phb}, {@item набор священника|url:priest-s-pack-phb} и 7 зм.",
          "Б) 110 зм."
        ]
      }
    ],
    "savingThrows": "Мудрость, Харизма",
    "features": [
      {
        "isSubclass": false,
        "key": "ispolzovanie-zaklinanij",
        "level": 1,
        "name": "Использование заклинаний",
        "description": [
          "Вы научились накладывать заклинания посредством молитвы и медитации. Правила наложения заклинаний см. в главе 7. Ниже подробно описано, как применять эти правила к заклинаниям жреца, которые будут перечислены в списке заклинаний жреца далее в описании класса.",
          "{@b Заговоры.} Вы знаете 3 заговора по вашему выбору из списка заклинаний жреца. Рекомендуются: {@spell Наставление [Guidance]|url:guidance-phb}, {@spell Священное пламя [Sacred Flame]|url:sacred-flame-phb} и {@spell Чудотворство [Thaumaturgy]|url:thaumaturgy-phb}. Каждый раз, когда вы получаете уровень жреца, то вы можете заменить 1 из ваших заговоров другим заговором по своему выбору из списка заклинаний жреца. При достижении 4 и 10 уровней жреца, вы изучаете дополнительный заговор по вашему выбору из списка заклинаний жреца, как показано в столбце «Заговоры» из таблицы «Умения жреца».",
          "{@b Ячейки заклинаний.} Таблица «Умения жреца» показывает, сколько ячеек заклинаний вы можете использовать для заклинаний 1+ уровня. Вы восстанавливаете все потраченные ячейки, когда заканчиваете {@glossary продолжительный отдых|url:long-rest-phb}.",
          "{@b Подготовленные заклинания 1+ уровня.} Вы подготавливаете список заклинаний 1+ уровня, которые доступны вам для использования с помощью этого умения. Для начала выберите 4 заклинания 1 уровня из списка заклинаний жреца. Рекомендуются: {@spell Благословение [Bless]|url:bless-phb}, {@spell Лечащее слово [Healing Word]|url:healing-word-phb}, {@spell Направляющий снаряд [Guiding Bolt]|url:guiding-bolt-phb} и {@spell Щит веры [Shield of Faith]|url:shield-of-faith-phb}.",
          "Количество подготовленных заклинаний в вашем списке увеличивается по мере того, как вы получаете уровни жреца, как показано в столбце «Подг. закл.» из таблицы «Умения жреца». Каждый раз, когда это число увеличивается, выберите дополнительные заклинания из списка заклинаний жреца, чтобы количество заклинаний вашего списка соответствовало значению в таблице «Умения жреца». Выбранные заклинания должны быть того уровня, для которого у вас есть ячейка заклинаний. Например, если вы жрец 3 уровня, то ваш список подготовленных заклинаний может включать 6 заклинаний жреца 1 и 2 уровней в любой комбинации.",
          "Если другое умение жреца даёт вам всегда подготовленные заклинания, то эти заклинания не учитываются в количестве заклинаний, которые вы можете подготовить с помощью этого умения, но в остальном они считаются заклинаниями жреца для вас.",
          "{@b Изменение подготовленных заклинаний.} Каждый раз, когда вы заканчиваете {@glossary продолжительный отдых|url:long-rest-phb}, вы можете изменить ваш список подготовленных заклинаний, заменив любые из них другими заклинаниями жреца, для которых у вас имеется ячейка заклинаний.",
          "{@b Заклинательная характеристика.} Мудрость — это ваша заклинательная характеристика для ваших заклинаний жреца.",
          "{@b Заклинательная фокусировка.} В качестве заклинательной фокусировки для ваших заклинаний жреца вы можете использовать священный символ."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "bozestvennyj-poradok",
        "level": 1,
        "name": "Божественный порядок",
        "description": [
          "Вы посвятили себя одной из следующих священных ролей по вашему выбору:",
          {
            "type": "list",
            "attrs": {
              "type": "unordered"
            },
            "content": [
              "{@b Защитник.} Обученный битве, вы получаете {@glossary владение|url:proficiency-phb} воинским оружием и тяжёлыми доспехами.",
              "{@b Чудотворец.} Вы знаете 1 дополнительный {@glossary заговор|url:cantrip-phb} из списка заклинаний жреца. Кроме того, ваша мистическая связь с божественным даёт вам бонус к проверкам Интеллекта (Аркана или Религия). Бонус равен вашему модификатору Мудрости (минимум +1)."
            ]
          }
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "bozestvennyj-kanal",
        "level": 2,
        "name": "Божественный канал",
        "description": [
          "Вы можете направлять божественную энергию непосредственно из Внешних планов для подпитки {@glossary магических эффектов|url:magical-effect-phb}. Вы начинаете с двумя такими эффектами: Божественная искра и Изгнание нежити, каждый из которых описан ниже. Каждый раз, когда вы используете Божественный канал этого класса, вы выбираете, какой эффект Божественного канала этого класса создать. Вы получаете дополнительные варианты эффектов на более высоких уровнях жреца.",
          "Вы можете использовать Божественный канал этого класса дважды. Вы восстанавливаете одно использование, когда заканчиваете {@glossary короткий отдых|url:short-rest-phb}. Вы восстанавливаете все использования, когда заканчиваете {@glossary продолжительный отдых|url:long-rest-phb}. Вы получаете дополнительные использования, когда достигаете определённых уровней жреца, как показано в столбце «БК» из таблицы «Умения жреца».",
          "Если эффект Божественного канала требует {@glossary спасброска|url:saving-throw-phb}, то {@glossary Сл.|url:difficulty-class-phb} равна вашей {@glossary Сл.|url:difficulty-class-phb} для {@glossary спасбросков|url:saving-throw-phb} против ваших {@glossary заклинаний|url:spell-phb}.",
          "{@b Божественная искра.} {@glossary Действием|url:action-phb} {@glossary магия|url:magic-phb} вы указываете священным символом на другое {@glossary существо|url:creature-phb}, которое вы можете видеть в пределах 30 фт. от себя, и фокусируете на нём божественную энергию. Бросьте {@roll 1к8} и добавьте свой модификатор Мудрости. Вы либо восстанавливаете {@glossary хиты|url:hit-points-phb} существа, равные этому общему количеству, либо заставляете {@glossary существо|url:creature-phb} совершить {@glossary спасбросок|url:saving-throw-phb} Телосложения. {@i Провал:} существо получает урон некротической энергией или излучением (по вашему выбору), равный общему результату броска. {@i Успех:} существо получает половину урона (округляется в меньшую сторону). Вы бросаете дополнительный к8, когда достигаете 7 ({@roll 2к8}), 13 ({@roll 3к8}) и 18 ({@roll 4к8}) уровней жреца.",
          "{@b Изгнание нежити.} {@glossary Действием|url:action-phb} {@glossary магия|url:magic-phb} вы демонстрируете священный символ и изгоняете нежить. Каждая нежить по вашему выбору в пределах 30 фт. от вас должна совершить {@glossary спасбросок|url:saving-throw-phb} Мудрости. {@i Провал:} на 1 минуту существо получает состояния {@glossary испуганный|url:frightened-phb} и {@glossary недееспособный|url:incapacitated-phb}. В течение этого времени каждый свой ход оно пытается отойти от вас как можно дальше. Этот эффект заканчивается на существе раньше, если оно получает какой-либо урон, если у вас появляется состояние {@glossary недееспособный|url:incapacitated-phb} или если вы умираете."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "podklass-zreca",
        "level": 3,
        "name": "Подкласс жреца",
        "description": [
          "Вы получаете подкласс жреца по вашему выбору. Подклассы Домен Жизни, Домен Света, Домен Обмана и Домен Войны подробно изложены после списка {@glossary заклинаний|url:spell-phb} этого класса.",
          "Подкласс — это специализация, которая предоставляет вам возможности на определённых уровнях жреца. В ходе дальнейшего развития вы получаете каждое умение вашего подкласса, которое соответствует вашему уровню жреца или ниже."
        ],
        "additional": "",
        "scaling": [
          {
            "level": 6,
            "name": "Умение подкласса",
            "description": [
              "Вы получаете умения подкласса"
            ],
            "additional": "",
            "hideInSubclasses": false
          },
          {
            "level": 17,
            "name": "Умение подкласса",
            "description": [
              "Вы получаете умения подкласса"
            ],
            "additional": "",
            "hideInSubclasses": false
          }
        ],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "ulucsenie-harakteristik",
        "level": 4,
        "name": "Улучшение характеристик",
        "description": [
          "Вы получаете черту {@feat Улучшение характеристик [Ability Score Improvement]|url:ability-score-improvement-phb}, или другую черту по вашему выбору, требованиям которой вы соответствуете. Вы снова получаете это умение на уровнях жреца 8, 12 и 16."
        ],
        "additional": "",
        "scaling": [
          {
            "level": 8,
            "name": "Улучшение характеристик",
            "description": [
              "Вы получаете черту {@feat Улучшение характеристик|phb}, или другую {@glossary черту|url:feat-phb} по вашему выбору, требованиям которой вы соответствуете."
            ],
            "additional": "",
            "hideInSubclasses": false
          },
          {
            "level": 12,
            "name": "Улучшение характеристик",
            "description": [
              "Вы получаете черту {@feat Улучшение характеристик|phb}, или другую {@glossary черту|url:feat-phb} по вашему выбору, требованиям которой вы соответствуете."
            ],
            "additional": "",
            "hideInSubclasses": false
          },
          {
            "level": 16,
            "name": "Улучшение характеристик",
            "description": [
              "Вы получаете черту {@feat Улучшение характеристик|phb}, или другую {@glossary черту|url:feat-phb} по вашему выбору, требованиям которой вы соответствуете."
            ],
            "additional": "",
            "hideInSubclasses": false
          }
        ],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "ispepelenie-neziti",
        "level": 5,
        "name": "Испепеление нежити",
        "description": [
          "Каждый раз, когда вы используете Изгнание нежити, вы можете бросить количество к8, равное вашему модификатору Мудрости (минимум {@roll 1к8}), и сложить результаты. Каждая нежить, которая провалила свой спасбросок против этого использования Изгнания нежити, получает урон излучением, равный общему результату бросков. Этот урон не прерывает эффект изгнания."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "blagoslovlennye-udary",
        "level": 7,
        "name": "Благословлённые удары",
        "description": [
          "Божественная сила наполняет вас в битве. Вы получаете один из следующих вариантов по вашему выбору. Если вы уже получаете любой из этих вариантов от подкласса жреца из книг до редакции 2024 года, используйте только тот вариант, который выбрали для этого умения.",
          "{@b Божественный удар.} Один раз в каждый из ваших ходов, когда вы попадаете по существу броском атаки с использованием оружия, вы можете нанести цели дополнительно {@roll 1к8} урона некротической энергией или излучением (по вашему выбору).",
          "{@b Мощный заговор.} Добавьте свой модификатор Мудрости к урону, который вы наносите любым заговором жреца."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "bozestvennoe-vmesatelstvo",
        "level": 10,
        "name": "Божественное вмешательство",
        "description": [
          "Вы можете призвать своё божество или пантеон, чтобы они вмешались от вашего имени. Действием {@glossary магия|url:magic-phb} выберите любое заклинание жреца 5 уровня или ниже, которое не требует реакции для сотворения. В рамках этого же действия вы используете это заклинание, не тратя ячейку заклинания и не нуждаясь в материальных компонентах.",
          "Вы не можете использовать это умение снова, пока не закончите {@glossary продолжительный отдых|url:long-rest-phb}."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "ulucsennye-blagoslovlennye-udary",
        "level": 14,
        "name": "Улучшенные Благословлённые удары",
        "description": [
          "Вариант, который вы выбрали для {@i Благословлённых ударов}, становится мощнее:",
          {
            "type": "list",
            "attrs": {
              "type": "unordered"
            },
            "content": [
              "{@b Божественный удар.} Дополнительный урон вашего Божественного удара увеличивается до {@roll 2к8}.",
              "{@b Мощный заговор.} Когда вы накладываете {@glossary заговор|url:cantrip-phb} жреца и наносите им урон {@glossary существу|url:creature-phb}, вы можете даровать жизненную силу себе или другому существу в радиусе 60 фт. от себя, предоставляя количество {@glossary временных хитов|url:temporary-hit-points-phb}, равное вашему удвоенному модификатору Мудрости."
            ]
          }
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "epiceskaa-certa",
        "level": 19,
        "name": "Эпическая черта",
        "description": [
          "Вы получаете эпическую черту (см. главу 5) или другую черту по вашему выбору, требованиям которой вы соответствуете. Рекомендуется {@feat Дар судьбы [Boon of Fate]|url:boon-of-fate-phb}."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "velikoe-bozestvennoe-vmesatelstvo",
        "level": 20,
        "name": "Великое божественное вмешательство",
        "description": [
          "Вы можете призвать ещё более мощное божественное вмешательство. Когда вы используете своё умение Божественное вмешательство, вы можете выбрать заклинание {@spell Желание|wish}. Если вы это совершаете, то вы не можете использовать Божественное вмешательство снова, пока не закончите {@roll 2к4} {@glossary продолжительных отдыха|long-rest-phb}."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      }
    ],
    "table": [
      {
        "name": "БК",
        "scaling": [
          {
            "level": 2,
            "value": "2"
          },
          {
            "level": 6,
            "value": "3"
          },
          {
            "level": 18,
            "value": "4"
          }
        ]
      },
      {
        "name": "Заговоры",
        "scaling": [
          {
            "level": 1,
            "value": "3"
          },
          {
            "level": 4,
            "value": "4"
          },
          {
            "level": 10,
            "value": "5"
          }
        ]
      },
      {
        "name": "Подг. Закл.",
        "scaling": [
          {
            "level": 1,
            "value": "4"
          },
          {
            "level": 2,
            "value": "5"
          },
          {
            "level": 3,
            "value": "6"
          },
          {
            "level": 4,
            "value": "7"
          },
          {
            "level": 5,
            "value": "9"
          },
          {
            "level": 6,
            "value": "10"
          },
          {
            "level": 7,
            "value": "11"
          },
          {
            "level": 8,
            "value": "12"
          },
          {
            "level": 9,
            "value": "14"
          },
          {
            "level": 10,
            "value": "15"
          },
          {
            "level": 11,
            "value": "16"
          },
          {
            "level": 13,
            "value": "17"
          },
          {
            "level": 15,
            "value": "18"
          },
          {
            "level": 17,
            "value": "19"
          },
          {
            "level": 18,
            "value": "20"
          },
          {
            "level": 19,
            "value": "21"
          },
          {
            "level": 20,
            "value": "22"
          }
        ]
      }
    ],
    "casterType": "FULL",
    "hasSubclasses": true,
    "name": {
      "rus": "Жрец",
      "eng": "Cleric"
    },
    "source": {
      "name": {
        "label": "PHB",
        "rus": "Книга игрока",
        "eng": "Player Handbook"
      },
      "group": {
        "label": "Basic",
        "rus": "Официальные источники"
      },
      "page": 100
    }
  },
  {
    "url": "artificer-uaa",
    "gallery": [
      "/s3/classes/peterko/1760540897889-artificer1.webp"
    ],
    "image": "/s3/classes/peterko/1760540894852-artificer.webp",
    "description": [
      "{@b Магический ремесленник и творец чудес}",
      "Мастера созидания, изобретатели используют смекалку и магию, чтобы раскрывать невероятные возможности {@glossary предметов|url:object-phb}. Они воспринимают магию как сложную систему, которую можно расшифровать и использовать в своих {@glossary заклинаниях|url:spell-phb} и изобретениях. Всё, что нужно для игры одним из этих изобретателей, можно найти в следующих разделах.",
      {
        "type": "heading",
        "attrs": {
          "level": "2"
        },
        "content": [
          {
            "type": "text",
            "text": "Становление изобретателем…"
          }
        ]
      },
      "{@b Как персонаж 1 уровня:}",
      {
        "type": "list",
        "attrs": {
          "type": "unordered"
        },
        "content": [
          "Получите особенности из таблицы «Особенности изобретателя».",
          "Получите умения изобретателя 1 уровня, которые перечислены в таблице «Умения изобретателя»."
        ]
      },
      "{@b Как мультикласс:}",
      {
        "type": "list",
        "attrs": {
          "type": "unordered"
        },
        "content": [
          "Получите следующие особенности изобретателя из таблицы «Особенности изобретателя»: кость хитов, владение {@item инструменты ремонтника|url:tinker-s-tools-phb}, владение одним навыком по вашему выбору из списка навыков изобретателя и владение лёгкими и средними доспехами и щитами.",
          "Получите умения изобретателя 1 уровня, которые перечислены в таблице «Умения волшебника». См. правила мультиклассирования в Книге игрока, чтобы определить доступные ячейки заклинаний, добавляя половину уровней изобретателя (округляя вверх)."
        ]
      }
    ],
    "updatedAt": "2026-01-06T10:45:28.250563Z",
    "userId": "Magistrus",
    "hitDice": {
      "label": "к8",
      "value": "d8",
      "maxValue": 8,
      "avg": 5
    },
    "primaryCharacteristics": "Интеллект",
    "proficiency": {
      "armor": "Щит, Средний доспех, Легкий доспех",
      "weapon": "Простое дальнобойное, Простое рукопашное",
      "tool": "Воровские инструменты, Инструменты ремонтника и один тип инструментов ремесленника на ваш выбор",
      "skill": "Выберите 2 навыка из следующих: Аркана, История, Проницательность, Медицина, Природа, Внимательность, Ловкость рук"
    },
    "equipment": [
      "Выберите А или Б:",
      {
        "type": "list",
        "attrs": {
          "type": "ordered"
        },
        "content": [
          "{@b А)} {@item Проклёпанный кожаный доспех|url:studded-leather-armor-phb}, {@item Кинжал|url:dagger-phb}, {@item Воровские инструменты|url:thieves-tools-phb}, {@item Набор исследователя подземелий|url:dungeoneer-s-pack-phb} и 16 зм.",
          "{@b Б)} 150 зм."
        ]
      }
    ],
    "savingThrows": "Интеллект, Телосложение",
    "features": [
      {
        "isSubclass": false,
        "key": "magiceskij-masterovoj",
        "level": 1,
        "name": "Магический мастеровой",
        "description": [
          "Действием {@glossary магия|url:magic-phb} с применением {@item Инструментов ремонтника|url:tinker-s-tools-phb} в {@glossary незанятом пространстве|url:unoccupied-space-phb} в пределах 5 фт. от себя вы можете создать 1 предмет из следующего списка:",
          {
            "type": "table",
            "colLabels": [
              "",
              "",
              ""
            ],
            "colStyles": [
              "w-33 text-left",
              "w-33 text-left",
              "w-33 text-left"
            ],
            "rows": [
              [
                "{@item Мелкие шарики|url:ball-bearings-phb}",
                "{@item Сеть|url:net-phb}",
                "{@item Корзина|url:basket-phb}"
              ],
              [
                "{@item Масло|url:oil-phb}",
                "{@item Спальник|url:bedroll-phb}",
                "{@item Бумага|url:paper-phb}"
              ],
              [
                "{@item Колокольчик|url:bell-phb}",
                "{@item Пергамент|url:parchment-phb}",
                "{@item Одеяло|url:blanket-phb}"
              ],
              [
                "{@item Шест|url:pole-phb}",
                "{@item Блок и лебёдка|url:block-and-tackle-phb}",
                "{@item Сумка|url:pouch-phb}"
              ],
              [
                "{@item Ведро|url:bucket-phb}",
                "{@item Верёвка|url:rope-hempen-50-feet-phb}",
                "{@item Калтропы|url:caltrops-phb}"
              ],
              [
                "{@item Мешок|url:sack-phb}",
                "{@item Свеча|url:candle-phb}",
                "{@item Лопата|url:shovel-phb}"
              ],
              [
                "{@item Лом|url:crowbar-phb}",
                "{@item Бечёвка|url:string-phb}",
                "{@item Фляга|url:waterskin-phb}"
              ],
              [
                "{@item Трутница|url:tinderbox-phb}",
                "{@item Кувшин|url:jug-phb}",
                "{@item Факел|url:torch-phb}"
              ],
              [
                "{@item Лампа|url:lamp-phb}",
                "{@item Флакон|url:vial-phb}",
                ""
              ]
            ]
          },
          "См. правила для этого предмета в Книге игрока.",
          "Предмет исчезает через 1 час.",
          "Вы можете использовать это умение количество раз, равное вашему модификатору Интеллекта (минимум 1), и вы восстанавливаете все потраченные использования после продолжительного отдыха."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "ispolzovanie-zaklinanij",
        "level": 1,
        "name": "Использование заклинаний",
        "description": [
          "Вы научились направлять магическую энергию через {@glossary предметы|url:object-phb}. Правила наложения заклинаний см. в Книге игрока. Ниже подробно описано, как применять эти правила к заклинаниям изобретателя, которые будут перечислены в списке заклинаний изобретателя далее в описании класса.",
          "{@b Необходимые инструменты.} Вы накладываете заклинания изобретателя с помощью инструментов. Вы можете использовать {@item воровские инструменты|url:thieves-tools-phb}, {@item инструменты ремонтника|url:tinker-s-tools-phb} или другие ремесленные инструменты, которыми владеете, в качестве {@glossary заклинательной фокусировки|url:spellcasting-focus-phb}. Вам необходимо держать фокусировку в руке, когда вы накладываете заклинание изобретателя (это значит, что у заклинаний есть материальный компонент).",
          "{@b Заговоры.} Вы знаете 2 заговора по вашему выбору из списка заклинаний изобретателя. Рекомендуются: {@spell Брызги кислоты [Acid Splash]|url:acid-splash-phb} и {@spell Фокусы [Prestidigitation]|url:prestidigitation-phb}. Каждый раз, когда вы завершаете {@glossary продолжительный отдых|url:long-rest-phb}, вы можете заменить 1 из ваших заговоров другим заговором по вашему выбору из списка заклинаний изобретателя. При достижении 10 и 14 уровней изобретателя, вы изучаете дополнительный заговор по вашему выбору из списка заклинаний изобретателя, как показано в столбце «Заговоры» из таблицы «Умения изобретателя».",
          "{@b Ячейки заклинаний.} Таблица «Умения изобретателя» показывает, сколько ячеек заклинаний вы можете использовать для заклинаний 1+ уровня. Вы восстанавливаете все потраченные ячейки, когда заканчиваете {@glossary продолжительный отдых|url:long-rest-phb}.",
          "{@b Подготовленные заклинания 1+ уровня.} Вы подготавливаете список заклинаний 1+ уровня, которые доступны вам для использования с помощью этого умения. Для начала выберите 2 заклинания 1 уровня из списка заклинаний изобретателя. Рекомендуются: {@spell Лечение ран [Cure Wounds]|url:cure-wounds-phb} и {@spell Скольжение [Grease]|url:grease-phb}. Количество подготовленных заклинаний в вашем списке увеличивается по мере того, как вы получаете уровни изобретателя, как показано в столбце «Подг. закл.» из таблицы «Умения изобретателя». Каждый раз, когда это число увеличивается, выберите дополнительные заклинания из списка заклинаний изобретателя, чтобы количество соответствовало значению таблицы. Выбранные заклинания должны быть того уровня, для которого у вас есть ячейка заклинаний. Например, если вы изобретатель 5 уровня, ваш список может включать 6 заклинаний 1 и 2 уровней в любой комбинации.",
          "Если другое умение изобретателя даёт вам всегда подготовленные заклинания, то эти заклинания не учитываются в количестве, которое вы можете подготовить с помощью этого умения, но в остальном они считаются заклинаниями изобретателя для вас.",
          "{@b Изменение подготовленных заклинаний.} Каждый раз, когда вы завершаете {@glossary продолжительный отдых|url:long-rest-phb}, вы можете изменить ваш список подготовленных заклинаний, заменив любые из них другими заклинаниями изобретателя, для которых у вас имеется ячейка заклинаний.",
          "{@b Заклинательная характеристика.} {@glossary Интеллект|url:intelligence-phb} — это ваша заклинательная характеристика для ваших заклинаний изобретателя."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "kopia-magiceskogo-predmeta",
        "level": 2,
        "name": "Копия магического предмета",
        "description": [
          "Вы изучили магические чертежи, которые используете для создания магических предметов.",
          "{@b Известные чертежи.} Когда вы получаете это умение, выберите 4 чертежа из таблицы «Чертежи магических предметов (уровень изобретателя 2+)» (описание предметов можно найти в Руководстве Мастера). Рекомендуются: {@magicItem Сумка хранения [Bag of Holding]|url:bag-of-holding-dmg}, {@magicItem Шапка подводного дыхания [Cap of Water Breathing]|url:cap-of-water-breathing-dmg}, {@magicItem Камни послания [Sending Stones]|url:sending-stones-dmg} и {@magicItem Волшебная палочка боевого мага +1 [Wand of the War Mage +1]|url:wand-of-the-war-mage-1-dmg}. Каждый раз, когда вы получаете новый уровень изобретателя, вы можете заменить 1 из известных вам чертежей на новый, соответствующий вашему уровню. Вы изучаете ещё 1 чертеж на выбор на уровнях изобретателя, указанных в колонке «Чертежи» таблицы «Умения изобретателя». При выборе нового чертежа вы можете взять его из любой таблицы «Чертежи магических предметов», для которых соответствуете требованиям по уровню изобретателя.",
          "{@b Создание предмета.} После {@glossary продолжительного отдыха|url:long-rest-phb} вы можете создать 1 или 2 различных {@glossary магических предмета|url:magic-item-phb}, если у вас есть {@item Инструменты ремонтника|url:tinker-s-tools-phb}. Каждый предмет основан на одном из известных вам чертежей для этого умения. Если созданный предмет требует {@glossary настройки|url:attunement-phb}, вы можете {@glossary настроиться|url:attunement-phb} на него сразу после создания. Если вы решите настроиться позже, используйте обычный процесс настройки. Когда вы достигаете определённых уровней изобретателя, указанных в колонке «Маг. предметы» таблицы «Умения изобретателя», количество создаваемых магических предметов увеличивается. Каждый предмет должен основываться на отдельном известном чертеже. Если вы пытаетесь превысить максимальное количество магических предметов, самый старый исчезает, а новый появляется.",
          "{@b Длительность.} Магический предмет, созданный с помощью этого умения, функционирует как обычный магический предмет, но его магия не является постоянной. Когда вы умираете, предмет исчезает через {@roll 1к4} дня. Если вы заменяете изученный чертёж на новый, все предметы, созданные по заменённому чертежу, мгновенно исчезают. Если созданный предмет является контейнером, например {@magicItem Сумка хранения [Bag of Holding]|url:bag-of-holding-dmg}, его содержимое безопасно появляется в его пространстве и вокруг него.",
          "{@b Заклинательная фокусировка.} Вы можете использовать любую палочку или оружие, созданное с помощью этого умения, как заклинательную фокусировку вместо набора ремесленных инструментов.",
          {
            "type": "table",
            "caption": "Чертежи магических предметов (уровень изобретателя 2+)",
            "colLabels": [
              "Чертёж магического предмета",
              "Настройка"
            ],
            "colStyles": [
              "text-left",
              "text-center w-20"
            ],
            "rows": [
              [
                "{@magicItem Алхимический сосуд [Alchemy Jug]|url:alchemy-jug-dmg}",
                "Нет"
              ],
              [
                "{@magicItem Сумка хранения [Bag of Holding]|url:bag-of-holding-dmg}",
                "Нет"
              ],
              [
                "{@magicItem Шапка подводного дыхания [Cap of Water Breathing]|url:cap-of-water-breathing-dmg}",
                "Нет"
              ],
              [
                "Обычный магический предмет, не являющийся зельем, свитком или проклятым (можно выбрать несколько раз, каждый раз новый предмет)",
                "Вариативно"
              ],
              [
                "{@magicItem Ночные очки [Goggles of Night]|url:goggles-of-night-dmg}",
                "Нет"
              ],
              [
                "{@magicItem  Мультиинструмент [Manifold Tool]|url:manifold-tool-uaeu} (UA)",
                "Да"
              ],
              [
                "magicItem Повторяющийся выстрел [Repeating Shot]|url:repeating-shot-uaa} (UA)",
                "Да"
              ],
              [
                "Возвращающееся оружие (UA)",
                "Нет"
              ],
              [
                "{@magicItem Верёвка лазания [Rope of Climbing]|url:rope-of-climbing-dmg}",
                "Нет"
              ],
              [
                "{@magicItem Камни послания [Sending Stones]|url:sending-stones-dmg}",
                "Нет"
              ],
              [
                "{@magicItem Щит +1 [Shield +1]|url:shield-1-2-or-3-dmg}",
                "Нет"
              ],
              [
                "{@magicItem Волшебная палочка обнаружения магии [Wand of Magic Detection]|url:wand-of-magic-detection-dmg}",
                "Нет"
              ],
              [
                "{@magicItem Волшебная палочка секретов [Wand of Secrets]|url:wand-of-secrets-dmg}",
                "Нет"
              ],
              [
                "{@magicItem Волшебная палочка боевого мага +1 [Wand of the War Mage +1]|url:wand-of-the-war-mage-1-2-or-3-dmg}",
                "Да"
              ],
              [
                "{@magicItem Оружие +1 [Weapon +1]|url:weapon-1-2-or-3-dmg}",
                "Нет"
              ],
              [
                "{@magicItem Обмотки безоружной мощи [Bracers of Unarmed Power]|url:wraps-of-unarmed-power-dmg}",
                "Нет"
              ]
            ]
          },
          {
            "type": "table",
            "caption": "Чертежи магических предметов (уровень изобретателя 6+)",
            "colLabels": [
              "Чертёж магического предмета",
              "Настройка"
            ],
            "colStyles": [
              "text-left",
              "text-center w-20"
            ],
            "rows": [
              [
                "{@magicItem Доспех +1 [Armor +1]|url:armor-1-2-or-3-dmg}",
                "Нет"
              ],
              [
                "{@magicItem Эльфийские сапоги [Boots of Elvenkind]|url:boots-of-elvenkind-dmg}",
                "Нет"
              ],
              [
                "{@magicItem Сапоги извилистого пути [Boots of the Winding Path]|url:boots-of-the-winding-path-uaa} (UA)",
                "Да"
              ],
              [
                "{@magicItem Эльфийский плащ [Cloak of Elvenkind]|url:cloak-of-elvenkind-dmg}",
                "Да"
              ],
              [
                "{@magicItem Плащ ската [Cloak of the Manta Ray]|url:cloak-of-the-manta-ray-dmg}",
                "Нет"
              ],
              [
                "{@magicItem Очки очарования [Eyes of Charming]|url:eyes-of-charming-dmg}",
                "Да"
              ],
              [
                "{@magicItem Очки детального зрения [Eyes of Minute Seeing]|url:eyes-of-minute-seeing-dmg}",
                "Да"
              ],
              [
                "{@magicItem Перчатки воровства [Gloves of Thievery]|url:gloves-of-thievery-dmg}",
                "Нет"
              ],
              [
                "{@magicItem Фонарь обнаружения [Lantern of Revealing]|url:lantern-of-revealing-dmg}",
                "Нет"
              ],
              [
                "{@magicItem Усилитель разума [Mind Sharpener]|url:mind-sharpener-uaa} (UA)",
                "Да"
              ],
              [
                "{@magicItem Ожерелье адаптации [Necklace of Adaptation]|url:necklace-of-adaptation-dmg}",
                "Да"
              ],
              [
                "{@magicItem Свирель ужаса [Pipes of Haunting]|url:pipes-of-haunting-dmg}",
                "Нет"
              ],
              [
                "{@magicItem Излучающее свет оружие [Radiant Weapon]|url:radiant-weapon-uaa} (UA)",
                "Да"
              ],
              [
                "{@magicItem Отталкивающий щит [Repulsion Shield]|url:repulsion-shield-uaa} (UA)",
                "Нет"
              ],
              [
                "{@magicItem Кольцо плавания [Ring of Swimming]|url:ring-of-swimming-dmg}",
                "Нет"
              ],
              [
                "{@magicItem Кольцо хождения по воде [Ring of Water Walking]|url:ring-of-water-walking-dmg}",
                "Нет"
              ],
              [
                "{@magicItem Щит часового [Sentinel Shield]|url:sentinel-shield-dmg}",
                "Нет"
              ],
              [
                "{@magicItem Кольцо восстановления заклинаний [Spell-Refueling Ring]|url:spell-refueling-ring-uaa} (UA)",
                "Да"
              ],
              [
                "{@magicItem Волшебная палочка снарядов [Wand of Magic Missiles]|url:wand-of-magic-missiles-dmg}",
                "Нет"
              ],
              [
                "{@magicItem Волшебная палочка паутины [Wand of Web]|url:wand-of-web-dmg}",
                "Да"
              ],
              [
                "{@magicItem Оружие предупреждения [Weapon of Warning]|url:weapon-of-warning-dmg}",
                "Да"
              ]
            ]
          },
          {
            "type": "table",
            "caption": "Чертежи магических предметов (уровень изобретателя 10+)",
            "colLabels": [
              "Чертёж магического предмета",
              "Настройка"
            ],
            "colStyles": [
              "text-left",
              "text-center w-20"
            ],
            "rows": [
              [
                "{@magicItem Доспех сопротивления [Armor of Resistance]|url:armor-of-resistance-dmg}",
                "Да"
              ],
              [
                "{@magicItem Кинжал яда [Dagger of Venom]|url:dagger-of-venom-dmg}",
                "Нет"
              ],
              [
                "{@magicItem Эльфийская кольчуга [Elven Chain]|url:elven-chain-dmg}",
                "Нет"
              ],
              [
                "{@magicItem Кольцо падения пёрышком [Ring of Feather Falling]|url:ring-of-feather-falling-dmg}",
                "Да"
              ],
              [
                "{@magicItem Кольцо прыжков [Ring of Jumping]|url:ring-of-jumping-dmg}",
                "Да"
              ],
              [
                "{@magicItem Кольцо защиты разума [Ring of Mind Shielding]|url:ring-of-mind-shielding-dmg}",
                "Да"
              ],
              [
                "{@magicItem Щит +2 [Shield +2]|url:shield-1-2-or-3-dmg}",
                "Нет"
              ],
              [
                "Необычные кольцо или чудесный предмет, не являющиеся проклятыми (можно выбрать несколько раз, каждый раз новый предмет)",
                "Вариативно"
              ],
              [
                "{@magicItem Волшебная палочка боевого мага +2 [Wand of the War Mage +2]|url:wand-of-the-war-mage-1-2-or-3-dmg}",
                "Да"
              ],
              [
                "{@magicItem Оружие +2 [Weapon +2]|url:weapon-1-2-or-3-dmg}",
                "Нет"
              ],
              [
                "{@magicItem Обмотки безоружной мощи +2 [Bracers of Unarmed Power +2]|url:wraps-of-unarmed-power-dmg}",
                "Нет"
              ]
            ]
          },
          {
            "type": "table",
            "caption": "Чертежи магических предметов (уровень изобретателя 14+)",
            "colLabels": [
              "Чертёж магического предмета",
              "Настройка"
            ],
            "colStyles": [
              "text-left",
              "text-center w-20"
            ],
            "rows": [
              [
                "{@magicItem Доспех +2 [Armor +2]|url:armor-1-2-or-3-dmg}",
                "Нет"
              ],
              [
                "{@magicItem Ловящий стрелы щит [Arrow Catching Shield]|url:arrow-catching-shield-dmg}",
                "Да"
              ],
              [
                "{@magicItem Язык пламени [Flame Tongue]|url:flame-tongue-dmg}",
                "Да"
              ],
              [
                "Редкие доспехи, кольцо, волшебная палочка, оружие или чудесный предмет, не являющиеся проклятыми (можно выбрать несколько раз, каждый раз новый предмет)",
                "Вариативно"
              ],
              [
                "{@magicItem Кольцо свободных действий [Ring of Free Action]|url:ring-of-free-action-dmg}",
                "Да"
              ],
              [
                "{@magicItem Кольцо защиты [Ring of Protection]|url:ring-of-protection-dmg}",
                "Да"
              ],
              [
                "{@magicItem Кольцо тарана [Ring of the Ram]|url:ring-of-the-ram-dmg}",
                "Да"
              ]
            ]
          }
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "podklass-izobretatela",
        "level": 3,
        "name": "Подкласс изобретателя",
        "description": [
          "Вы получаете подкласс изобретателя по вашему выбору. Подклассы {@i алхимик}, {@i артеллерист}, {@i боевой кузнец} и {@i бронник} подробно изложены после списка заклинаний этого класса. Подкласс — это специализация, которая предоставляет вам возможности на определённых уровнях изобретателя. В ходе дальнейшего развития вы получаете все умения вашего подкласса, которые соответствуют вашему уровню изобретателя или ниже."
        ],
        "additional": "",
        "scaling": [
          {
            "level": 5,
            "name": "Умение подкласса",
            "description": [],
            "additional": "",
            "hideInSubclasses": false
          },
          {
            "level": 9,
            "name": "Умение подкласса",
            "description": [],
            "additional": "",
            "hideInSubclasses": false
          },
          {
            "level": 15,
            "name": "Умение подкласса",
            "description": [],
            "additional": "",
            "hideInSubclasses": false
          }
        ],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "podhodasij-instrument",
        "level": 3,
        "name": "Подходящий инструмент",
        "description": [
          "Список {@glossary предметов|url:object-phb}, которые вы можете создавать с помощью {@i Магического мастерового}, теперь включает {@item Инструменты ремесленника|url:artisan-tools-phb}, описанные в Книге игрока."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "ulucsenie-harakteristik",
        "level": 4,
        "name": "Улучшение характеристик",
        "description": [
          "Вы получаете {@feat Улучшение характеристик [Ability Score Improvement]|url:ability-score-improvement-phb} или другую черту по вашему выбору, требованиям которой вы соответствуете. Вы снова получаете эту способность на уровнях изобретателя 8, 12 и 16."
        ],
        "additional": "",
        "scaling": [
          {
            "level": 8,
            "name": "Улучшение характеристик",
            "description": [
              "Вы получаете {@feat Улучшение характеристик [Ability Score Improvement]|url:ability-score-improvement-phb} или другую черту по вашему выбору, требованиям которой вы соответствуете."
            ],
            "additional": "",
            "hideInSubclasses": false
          },
          {
            "level": 12,
            "name": "Улучшение характеристик",
            "description": [
              "Вы получаете {@feat Улучшение характеристик [Ability Score Improvement]|url:ability-score-improvement-phb} или другую черту по вашему выбору, требованиям которой вы соответствуете."
            ],
            "additional": "",
            "hideInSubclasses": false
          },
          {
            "level": 16,
            "name": "Улучшение характеристик",
            "description": [
              "Вы получаете {@feat Улучшение характеристик [Ability Score Improvement]|url:ability-score-improvement-phb} или другую черту по вашему выбору, требованиям которой вы соответствуете."
            ],
            "additional": "",
            "hideInSubclasses": false
          }
        ],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "masterstvo-magiceskih-predmetov",
        "level": 6,
        "name": "Мастерство магических предметов",
        "description": [
          "Ваше умение {@i Копия магического предмета} улучшается следующим образом:",
          {
            "type": "list",
            "attrs": {
              "type": "unordered"
            },
            "content": [
              "{@b Откачка магии.} {@glossary Бонусным действием|url:bonus-action-phb} вы можете коснуться магического предмета в пределах 5 фт. от вас, который вы создали с помощью умения {@b Копия магического предмета}, и заставить его исчезнуть, преобразуя его магическую энергию в ячейку {@glossary заклинания|url:spell-phb}. Ячейка заклинания будет 1 уровня, если предмет является обычным, или 2 уровня, если предмет является необычным или редким. После использования этого умения вы не можете использовать его снова до завершения {@glossary продолжительного отдыха|url:long-rest-phb}. Любая созданная таким образом ячейка заклинания исчезает при завершении {@glossary продолжительного отдыха|url:long-rest-phb}.",
              "{@b Расширенное копирование.} Когда вы изучаете чертёж для своего умения {@b Копия магического предмета}, вы теперь также можете выбирать из таблицы «Чертежи магических предметов (уровень изобретателя 6+)»."
            ]
          }
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "problesk-genialnosti",
        "level": 7,
        "name": "Проблеск гениальности",
        "description": [
          "Когда вы или {@glossary существо|url:creature-phb}, которое вы видите в пределах 30 фт. от вас, проваливает проверку характеристики или {@glossary спасбросок|url:saving-throw-phb}, вы можете использовать свою {@glossary реакцию|url:reaction-phb}, чтобы добавить бонус к броску, потенциально приводя к успеху. Этот бонус равен вашему модификатору {@glossary Интеллекта|url:intelligence-phb}.",
          "Вы можете использовать эту {@glossary реакцию|url:reaction-phb} количество раз, равное вашему модификатору Интеллекта (минимум 1). Вы восстанавливаете все израсходованные использования после {@glossary продолжительного отдыха|url:long-rest-phb}."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "adept-magiceskih-predmetov",
        "level": 10,
        "name": "Адепт магических предметов",
        "description": [
          "Вы достигли глубокого понимания использования и создания магических предметов, что даёт вам следующие преимущества:",
          "{@b Дополнительная настройка.} Вы можете {@glossary настроиться|url:attunement-phb} на 4 магических предмета одновременно вместо 3.",
          "{@b Расширенное копирование.} Когда вы изучаете чертёж для своего умения {@i Копия магического предмета}, вы теперь также можете выбирать из таблицы «Чертежи магических предметов (уровень изобретателя 10+)»."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "hranasij-zaklinania-predmet",
        "level": 11,
        "name": "Хранящий заклинания предмет",
        "description": [
          "Каждый раз после {@glossary продолжительного отдыха|url:long-rest-phb} вы можете коснуться одного простого оружия или боевого оружия, либо одного предмета, который можно использовать в качестве {@item заклинательной фокусировки|url:spellcasting-focus-phb}, и вложить в него {@glossary заклинание|url:spell-phb}. Вы выбираете {@glossary заклинание|url:spell-phb} изобретателя 1, 2 или 3 уровня, которое имеет время накладывания «1 {@glossary действие|url:action-phb}» (вам не обязательно иметь это заклинание среди подготовленных).",
          "Держа этот предмет, {@glossary существо|url:creature-phb} может {@glossary действием|url:action-phb} воспроизвести эффект {@glossary заклинания|url:spell-phb} из него, используя ваш модификатор заклинательной характеристики. Если для {@glossary заклинания|url:spell-phb} требуется концентрация, существо должно поддерживать её. Заклинание остаётся в предмете до тех пор, пока оно не будет использовано количество раз, равное удвоенному значению вашего модификатора {@glossary Интеллекта|url:intelligence-phb} (минимум 2), или пока вы не используете это умение снова, чтобы вложить {@glossary заклинание|url:spell-phb} в предмет."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "znatok-magiceskih-predmetov",
        "level": 14,
        "name": "Знаток магических предметов",
        "description": [
          "Ваше мастерство в использовании магических предметов усиливается, предоставляя следующие эффекты:",
          "{@b Дополнительная настройка.} Вы можете {@glossary настроиться|url:attunement-phb} на 5 магических предметов одновременно вместо 3.",
          "{@b Расширенное копирование.} Когда вы изучаете чертёж для своего умения {@b Копия магического предмета}, вы теперь также можете выбирать из таблицы «Чертежи магических предметов (уровень изобретателя 14+)». Вы не можете иметь более 3 редких предметов одновременно, созданных с помощью умения {@i Копия магического предмета}."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "master-magiceskih-predmetov",
        "level": 18,
        "name": "Мастер магических предметов",
        "description": [
          "Вы можете {@glossary настроиться|url:attunement-phb} на 6 магических предметов одновременно вместо 3."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "epiceskaa-certa",
        "level": 19,
        "name": "Эпическая черта",
        "description": [
          "Вы получаете эпическую черту  или другую черту по вашему выбору, требованиям которой вы соответствуете. Рекомендуется черта {@feat Дар устойчивости к энергиям [Boon of Energy Resistance]|url:boon-of-energy-resistance-phb}."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "dusa-izobretenia",
        "level": 20,
        "name": "Душа изобретения",
        "description": [
          "Вы развили мистическую связь с вашими магическими предметами из которой можете черпать помощь. Вы получаете следующие эффекты:",
          "{@b Обман смерти.} Если ваши {@glossary хиты|url:hit-points-phb} снижены до 0, но вы не умерли сразу, вы можете уничтожить один {@i необычный} или {@i редкий} магический предмет, созданный с помощью вашей особенности {@i Копия магического предмета}, изменив ваши хиты на 20 вместо 0.",
          "{@b Магическое руководство.} Пока у вас есть {@glossary настройка|url:attunement-phb} хотя бы на 1 магический предмет, вы можете добавить {@roll 1к6} к любой проверке характеристики, которую совершаете. Вы принимаете решение о добавлении кости после броска к20 и можете использовать этот эффект только 1 раз за ход."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      }
    ],
    "table": [
      {
        "name": "Чертежи",
        "scaling": [
          {
            "level": 2,
            "value": "4"
          },
          {
            "level": 6,
            "value": "5"
          },
          {
            "level": 10,
            "value": "6"
          },
          {
            "level": 14,
            "value": "7"
          },
          {
            "level": 18,
            "value": "8"
          }
        ]
      },
      {
        "name": "Маг. предметы",
        "scaling": [
          {
            "level": 2,
            "value": "2"
          },
          {
            "level": 6,
            "value": "3"
          },
          {
            "level": 10,
            "value": "4"
          },
          {
            "level": 14,
            "value": "5"
          },
          {
            "level": 18,
            "value": "6"
          }
        ]
      },
      {
        "name": "Заговоры",
        "scaling": [
          {
            "level": 1,
            "value": "2"
          },
          {
            "level": 10,
            "value": "3"
          },
          {
            "level": 14,
            "value": "4"
          }
        ]
      },
      {
        "name": "Подг. Закл.",
        "scaling": [
          {
            "level": 1,
            "value": "2"
          },
          {
            "level": 2,
            "value": "3"
          },
          {
            "level": 3,
            "value": "4"
          },
          {
            "level": 4,
            "value": "5"
          },
          {
            "level": 5,
            "value": "6"
          },
          {
            "level": 7,
            "value": "7"
          },
          {
            "level": 9,
            "value": "9"
          },
          {
            "level": 11,
            "value": "10"
          },
          {
            "level": 13,
            "value": "11"
          },
          {
            "level": 15,
            "value": "12"
          },
          {
            "level": 17,
            "value": "14"
          },
          {
            "level": 19,
            "value": "15"
          }
        ]
      }
    ],
    "casterType": "HALF",
    "hasSubclasses": true,
    "name": {
      "rus": "Изобретатель",
      "eng": "Artificer"
    },
    "source": {
      "name": {
        "label": "UAA",
        "rus": "Неизведанная Аркана: Изобретатель",
        "eng": "Unearthed Arcana: Artificer"
      },
      "group": {
        "label": "UA",
        "rus": "Тестовый материал"
      },
      "page": 0
    }
  },
  {
    "url": "artificer-efa",
    "gallery": [
      "/s3/classes/magistrus/1764583952152-artificer-2.webp",
      "/s3/classes/magistrus/1764666023328-artificer-n.webp"
    ],
    "image": "/s3/classes/magistrus/1764583732723-artificer-n.webp",
    "description": [
      "{@i Мастер изобретений, магии и ремесла.}",
      "Изобретатели подходят к приключениям с инструментом в одной руке и магией в другой. Они — инженеры, алхимики и чародеи-практики, которые не просто изучают тайны мира, но и создают их собственными руками. Там, где другим требуется заклинание или клинок, изобретатель предлагает устройство, формулу или хитроумный механизм.",
      "Изобретатели черпают силу в сочетании знаний и экспериментов. Они используют магию как технологию, наполняя предметы энергией, усиливая союзников и находя нестандартные решения в бою и за его пределами. Их гибкость и изобретательность делают их ценными участниками любой группы искателей приключений.",
      {
        "type": "heading",
        "attrs": {
          "level": "2"
        },
        "content": [
          {
            "type": "text",
            "text": "Становление изобретателем..."
          }
        ]
      },
      "{@b Как персонаж 1 уровня:}",
      {
        "type": "list",
        "attrs": {
          "type": "unordered"
        },
        "content": [
          "Получите все особенности из таблицы «Особенности Изобретателя».",
          "Получите умения Изобретателя 1-го уровня; они перечислены в таблице «Умения Изобретателя»."
        ]
      },
      "{@b Как мультикласс:}",
      {
        "type": "list",
        "attrs": {
          "type": "unordered"
        },
        "content": [
          "Получите следующие особенности из таблицы «Особенности Изобретателя»: кость хитов, владение Инструментами ремонтника, один навык из списка навыков Изобретателя и владение лёгкими и средними доспехами и щитами.",
          "Получите умения Изобретателя 1-го уровня; они перечислены в таблице «Умения Изобретателя». Ознакомьтесь с правилами мультиклассирования, чтобы определить доступные вам ячейки заклинаний: вы добавляете в уровень заклинателя половину уровней Изобретателя (округляя вверх)."
        ]
      }
    ],
    "updatedAt": "2026-01-05T16:05:07.296611Z",
    "userId": "Magistrus",
    "hitDice": {
      "label": "к8",
      "value": "d8",
      "maxValue": 8,
      "avg": 5
    },
    "primaryCharacteristics": "Интеллект",
    "proficiency": {
      "armor": "Щит, Средний доспех, Легкий доспех",
      "weapon": "Простое дальнобойное, Простое рукопашное",
      "tool": "Воровские инструменты, Инструменты ремонтника и один тип Ремесленных инструментов на ваш выбор",
      "skill": "Выберите 2 навыка из следующих: Аркана, История, Анализ, Медицина, Природа, Внимательность, Ловкость рук"
    },
    "equipment": [
      "Выберите А или Б:",
      {
        "type": "list",
        "attrs": {
          "type": "ordered"
        },
        "content": [
          "{@b А)} {@item Проклёпанный кожаный доспех|url:studded-leather-armor-phb}, {@item Кинжал|url:dagger-phb}, {@item Воровские инструменты|url:thieves-tools-phb}, {@item Набор исследователя подземелий|url:dungeoneer-s-pack-phb} и 16 зм.",
          "{@b Б)} 150 зм."
        ]
      }
    ],
    "savingThrows": "Интеллект, Телосложение",
    "features": [
      {
        "isSubclass": false,
        "key": "ispolzovanie-zaklinanij",
        "level": 1,
        "name": "Использование заклинаний",
        "description": [
          "Вы научились направлять магическую энергию через предметы. Правила наложения заклинаний См. в «Руководстве игрока». Ниже приведено описание того, как вы используете эти правила с заклинаниями изобретателя, которые перечислены в списке заклинаний изобретателя далее в описании класса.",
          "{@b Необходимые инструменты.} Вы накладываете заклинания изобретателя с помощью инструментов. Вы можете использовать {@item Воровские инструменты|url:thieves-tools-phb}, {@item Инструменты ремонтника|url:tinker-s-tools-phb} или другие инструменты ремесленников, которыми вы владеете, в качестве фокусировки заклинаний.  Вам необходимо держать фокусировку в руке при накладывании заклинания изобретателя  (это значит, что у заклинаний есть материальный компонент).",
          "{@b Заговоры.} Вы знаете два заговора изобретателя на ваш выбор. Рекомендуется: {@spell Брызги кислоты [Acid Splash]|url:acid-splash} и {@spell Фокусы [Prestidigitation]|url:prestidigitation}. Каждый раз, когда вы завершаете продолжительный отдых вы можете заменить один из ваших заговоров, полученных с этой особенности, на другой заговор изобретателя по вашему выбору. При достижении 10 и 14 уровней изобретателя, вы изучаете по одному дополнительному заговору изобретателя, как указано в колонке «Заговоры» таблицы Умения изобретателя.",
          "{@b Ячейки заклинаний.} Таблица «Умения изобретателя»  показывает, сколько ячеек заклинаний вы имеете для накладывания заклинаний 1+ уровней. Вы восстанавливаете все потраченные ячейки после окончания продолжительного отдыха.",
          "{@b Подготовленные заклинания 1+ уровней.} Вы подготавливаете список заклинаний 1+ уровней, доступных вам для накладывания с этим умением. Для начала выберите два заклинания изобретателя 1 уровня. Рекомендуются: {@spell Лечение ран [Cure Wounds]|url:cure-wounds-phb} и {@spell Скольжение [Grease]|url:grease-phb}. Количество заклинаний в вашем списке увеличивается с ростом уровня изобретателя, как показано в столбце «Подг. закл.» из таблицы «Умения изобретателя». Каждый раз, когда это число увеличивается, выбирайте дополнительные заклинания изобретателя так, чтобы их общее количество соответствовало значению в таблице. Выбранные заклинания должны быть уровня, для которого у вас есть ячейки. Например, если вы изобретатель 5 уровня, ваш список подготовленных заклинаний может включать шесть заклинаний изобретателя 1 и 2 уровней в любой комбинации.",
          "Если другое умение изобретателя даёт вам всегда подготовленные заклинания, то эти заклинания не учитываются в количестве, которое вы можете подготовить с помощью этого умения, но в остальном они считаются заклинаниями изобретателя для вас.",
          "{@b Изменение подготовленных заклинаний.} Каждый раз, когда вы завершаете продолжительный отдых вы можете изменить список подготовленных заклинаний, заменив любое количество заклинаний в нём на другие заклинания изобретателя, для которых у вас есть ячейки.",
          "{@b Заклинательная характеристика.} Интеллект — это ваша заклинательная характеристика для ваших заклинаний изобретателя"
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "magiceskij-masterovoj",
        "level": 1,
        "name": "Магический мастеровой",
        "description": [
          "Действием {@glossary магия|url:magic-phb} с применением {@item Инструментов ремонтника|url:tinker-s-tools-phb} в {@glossary незанятом пространстве|url:unoccupied-space-phb} в пределах 5 фт. от себя вы можете создать 1 предмет из следующего списка:",
          {
            "type": "table",
            "colLabels": [
              "",
              "",
              ""
            ],
            "colStyles": [
              "w-33 text-left",
              "w-33 text-left",
              "w-33 text-left"
            ],
            "rows": [
              [
                "{@item Мелкие шарики|url:ball-bearings-phb}",
                "{@item Сеть|url:net-phb}",
                "{@item Корзина|url:basket-phb}"
              ],
              [
                "{@item Масло|url:oil-phb}",
                "{@item Спальник|url:bedroll-phb}",
                "{@item Бумага|url:paper-phb}"
              ],
              [
                "{@item Колокольчик|url:bell-phb}",
                "{@item Пергамент|url:parchment-phb}",
                "{@item Одеяло|url:blanket-phb}"
              ],
              [
                "{@item Шест|url:pole-phb}",
                "{@item Блок и лебёдка|url:block-and-tackle-phb}",
                "{@item Сумка|url:pouch-phb}"
              ],
              [
                "{@item Ведро|url:bucket-phb}",
                "{@item Верёвка|url:rope-hempen-50-feet-phb}",
                "{@item Калтропы|url:caltrops-phb}"
              ],
              [
                "{@item Мешок|url:sack-phb}",
                "{@item Свеча|url:candle-phb}",
                "{@item Лопата|url:shovel-phb}"
              ],
              [
                "{@item Лом|url:crowbar-phb}",
                "{@item Бечёвка|url:string-phb}",
                "{@item Фляга|url:waterskin-phb}"
              ],
              [
                "{@item Трутница|url:tinderbox-phb}",
                "{@item Кувшин|url:jug-phb}",
                "{@item Факел|url:torch-phb}"
              ],
              [
                "{@item Лампа|url:lamp-phb}",
                "{@item Флакон|url:vial-phb}",
                ""
              ]
            ]
          },
          "См. правила для этого предмета в Книге игрока.",
          "Предмет исчезает через 1 час.",
          "Вы можете использовать это умение количество раз, равное вашему модификатору Интеллекта (минимум 1), и вы восстанавливаете все потраченные использования после продолжительного отдыха."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "kopia-magiceskogo-predmeta",
        "level": 2,
        "name": "Копия магического предмета",
        "description": [
          "Вы изучили магические чертежи, которые используете для создания магических предметов.",
          "{@b Известные чертежи.} Когда вы получаете это умение, выберите 4 чертежа из таблицы «Чертежи магических предметов (уровень изобретателя 2+)» (описание предметов можно найти в Руководстве Мастера). Рекомендуются: {@magicItem Сумка хранения [Bag of Holding]|url:bag-of-holding-dmg}, {@magicItem Шапка подводного дыхания [Cap of Water Breathing]|url:cap-of-water-breathing-dmg}, {@magicItem Камни послания [Sending Stones]|url:sending-stones-dmg} и {@magicItem Волшебная палочка боевого мага +1 [Wand of the War Mage +1]|url:wand-of-the-war-mage-1-dmg}. Каждый раз, когда вы получаете новый уровень изобретателя, вы можете заменить 1 из известных вам чертежей на новый, соответствующий вашему уровню. Вы изучаете ещё 1 чертеж на выбор на уровнях изобретателя, указанных в колонке «Чертежи» таблицы «Умения изобретателя». При выборе нового чертежа вы можете взять его из любой таблицы «Чертежи магических предметов», для которых соответствуете требованиям по уровню изобретателя.",
          "{@b Создание предмета.} После {@glossary продолжительного отдыха|url:long-rest-phb} вы можете создать 1 или 2 различных {@glossary магических предмета|url:magic-item-phb}, если у вас есть {@item Инструменты ремонтника|url:tinker-s-tools-phb}. Каждый предмет основан на одном из известных вам чертежей для этого умения. Если созданный предмет требует {@glossary настройки|url:attunement-phb}, вы можете {@glossary настроиться|url:attunement-phb} на него сразу после создания. Если вы решите настроиться позже, используйте обычный процесс настройки. Когда вы достигаете определённых уровней изобретателя, указанных в колонке «Маг. предметы» таблицы «Умения изобретателя», количество создаваемых магических предметов увеличивается. Каждый предмет должен основываться на отдельном известном чертеже. Если вы пытаетесь превысить максимальное количество магических предметов, самый старый исчезает, а новый появляется.",
          "{@b Длительность.} Магический предмет, созданный с помощью этого умения, функционирует как обычный магический предмет, но его магия не является постоянной. Когда вы умираете, предмет исчезает через {@roll 1к4} дня. Если вы заменяете изученный чертёж на новый, все предметы, созданные по заменённому чертежу, мгновенно исчезают. Если созданный предмет является контейнером, например {@magicItem Сумка хранения [Bag of Holding]|url:bag-of-holding-dmg}, его содержимое безопасно появляется в его пространстве и вокруг него.",
          "{@b Заклинательная фокусировка.} Вы можете использовать любую палочку или оружие, созданное с помощью этого умения, как заклинательную фокусировку вместо набора ремесленных инструментов.",
          {
            "type": "table",
            "caption": "Чертежи магических предметов (уровень изобретателя 2+)",
            "colLabels": [
              "Чертёж магического предмета",
              "Настройка"
            ],
            "colStyles": [
              "text-left",
              "text-center w-20"
            ],
            "rows": [
              [
                "{@magicItem Алхимический сосуд [Alchemy Jug]|url:alchemy-jug-dmg}",
                "Нет"
              ],
              [
                "{@magicItem Сумка хранения [Bag of Holding]|url:bag-of-holding-dmg}",
                "Нет"
              ],
              [
                "{@magicItem Шапка подводного дыхания [Cap of Water Breathing]|url:cap-of-water-breathing-dmg}",
                "Нет"
              ],
              [
                "Обычный магический предмет, не являющийся зельем, свитком или проклятым (можно выбрать несколько раз, каждый раз новый предмет)",
                "Вариативно"
              ],
              [
                "{@magicItem Ночные очки [Goggles of Night]|url:goggles-of-night-dmg}",
                "Нет"
              ],
              [
                "{@magicItem Мультиинструмент [Manifold Tool]|url:manifold-tool-efa}",
                "Да"
              ],
              [
                "{@magicItem Повторяющийся выстрел [Repeating Shot]|url:repeating-shot-efa}",
                "Да"
              ],
              [
                "{@magicItem Возвращающееся оружие [Returning Weapon]|url:returning-weapon-efa}",
                "Нет"
              ],
              [
                "{@magicItem Верёвка лазания [Rope of Climbing]|url:rope-of-climbing-dmg}",
                "Нет"
              ],
              [
                "{@magicItem Камни послания [Sending Stones]|url:sending-stones-dmg}",
                "Нет"
              ],
              [
                "{@magicItem Щит +1 [Shield +1]|url:shield-1-2-or-3-dmg}",
                "Нет"
              ],
              [
                "{@magicItem Волшебная палочка обнаружения магии [Wand of Magic Detection]|url:wand-of-magic-detection-dmg}",
                "Нет"
              ],
              [
                "{@magicItem Волшебная палочка секретов [Wand of Secrets]|url:wand-of-secrets-dmg}",
                "Нет"
              ],
              [
                "{@magicItem Волшебная палочка боевого мага +1 [Wand of the War Mage +1]|url:wand-of-the-war-mage-1-2-or-3-dmg}",
                "Да"
              ],
              [
                "{@magicItem Оружие +1 [Weapon +1]|url:weapon-1-2-or-3-dmg}",
                "Нет"
              ],
              [
                "{@magicItem Обмотки безоружной мощи [Bracers of Unarmed Power]|url:wraps-of-unarmed-power-dmg}",
                "Нет"
              ]
            ]
          },
          {
            "type": "table",
            "caption": "Чертежи магических предметов (уровень изобретателя 6+)",
            "colLabels": [
              "Чертёж магического предмета",
              "Настройка"
            ],
            "colStyles": [
              "text-left",
              "text-center w-20"
            ],
            "rows": [
              [
                "{@magicItem Доспех +1 [Armor +1]|url:armor-1-2-or-3-dmg}",
                "Нет"
              ],
              [
                "{@magicItem Эльфийские сапоги [Boots of Elvenkind]|url:boots-of-elvenkind-dmg}",
                "Нет"
              ],
              [
                "{@magicItem Сапоги извилистого пути [Boots of the Winding Path]|url:boots-of-the-winding-path-efa}",
                "Да"
              ],
              [
                "{@magicItem Эльфийский плащ [Cloak of Elvenkind]|url:cloak-of-elvenkind-dmg}",
                "Да"
              ],
              [
                "{@magicItem Плащ ската [Cloak of the Manta Ray]|url:cloak-of-the-manta-ray-dmg}",
                "Нет"
              ],
              [
                "{@magicItem Очки очарования [Eyes of Charming]|url:eyes-of-charming-dmg}",
                "Да"
              ],
              [
                "{@magicItem Очки детального зрения [Eyes of Minute Seeing]|url:eyes-of-minute-seeing-dmg}",
                "Нет"
              ],
              [
                "{@magicItem Перчатки воровства [Gloves of Thievery]|url:gloves-of-thievery-dmg}",
                "Нет"
              ],
              [
                "{@magicItem Фонарь обнаружения [Lantern of Revealing]|url:lantern-of-revealing-dmg}",
                "Нет"
              ],
              [
                "{@magicItem Усилитель разума [Mind Sharpener]|url:mind-sharpener-efa}",
                "Да"
              ],
              [
                "{@magicItem Ожерелье адаптации [Necklace of Adaptation]|url:necklace-of-adaptation-dmg}",
                "Да"
              ],
              [
                "{@magicItem Свирель ужаса [Pipes of Haunting]|url:pipes-of-haunting-dmg}",
                "Нет"
              ],
              [
                "{@magicItem Ослепляющее оружие [Dazzling Weapon]|url:dazzling-weapon-efa}",
                "Да"
              ],
              [
                "{@magicItem Отталкивающий щит [Repulsion Shield]|url:repulsion-shield-efa}",
                "Нет"
              ],
              [
                "{@magicItem Кольцо плавания [Ring of Swimming]|url:ring-of-swimming-dmg}",
                "Нет"
              ],
              [
                "{@magicItem Кольцо хождения по воде [Ring of Water Walking]|url:ring-of-water-walking-dmg}",
                "Нет"
              ],
              [
                "{@magicItem Щит часового [Sentinel Shield]|url:sentinel-shield-dmg}",
                "Нет"
              ],
              [
                "{@magicItem Кольцо восстановления заклинаний [Spell-Refueling Ring]|url:spell-refueling-ring-efa}",
                "Да"
              ],
              [
                "{@magicItem Волшебная палочка снарядов [Wand of Magic Missiles]|url:wand-of-magic-missiles-dmg}",
                "Нет"
              ],
              [
                "{@magicItem Волшебная палочка паутины [Wand of Web]|url:wand-of-web-dmg}",
                "Да"
              ],
              [
                "{@magicItem Оружие предупреждения [Weapon of Warning]|url:weapon-of-warning-dmg}",
                "Да"
              ]
            ]
          },
          {
            "type": "table",
            "caption": "Чертежи магических предметов (уровень изобретателя 10+)",
            "colLabels": [
              "Чертёж магического предмета",
              "Настройка"
            ],
            "colStyles": [
              "text-left",
              "text-center w-20"
            ],
            "rows": [
              [
                "{@magicItem Доспех сопротивления [Armor of Resistance]|url:armor-of-resistance-dmg}",
                "Да"
              ],
              [
                "{@magicItem Кинжал яда [Dagger of Venom]|url:dagger-of-venom-dmg}",
                "Нет"
              ],
              [
                "{@magicItem Эльфийская кольчуга [Elven Chain]|url:elven-chain-dmg}",
                "Нет"
              ],
              [
                "{@magicItem Кольцо падения пёрышком [Ring of Feather Falling]|url:ring-of-feather-falling-dmg}",
                "Да"
              ],
              [
                "{@magicItem Кольцо прыжков [Ring of Jumping]|url:ring-of-jumping-dmg}",
                "Да"
              ],
              [
                "{@magicItem Кольцо защиты разума [Ring of Mind Shielding]|url:ring-of-mind-shielding-dmg}",
                "Да"
              ],
              [
                "{@magicItem Щит +2 [Shield +2]|url:shield-1-2-or-3-dmg}",
                "Нет"
              ],
              [
                "Необычный чудесный предмет, не являющийся проклятым (можно выбрать несколько раз, каждый раз новый предмет)",
                "Вариативно"
              ],
              [
                "{@magicItem Волшебная палочка боевого мага +2 [Wand of the War Mage +2]|url:wand-of-the-war-mage-1-2-or-3-dmg}",
                "Да"
              ],
              [
                "{@magicItem Оружие +2 [Weapon +2]|url:weapon-1-2-or-3-dmg}",
                "Нет"
              ],
              [
                "{@magicItem Обмотки безоружной мощи +2 [Bracers of Unarmed Power +2]|url:wraps-of-unarmed-power-dmg}",
                "Нет"
              ]
            ]
          },
          {
            "type": "table",
            "caption": "Чертежи магических предметов (уровень изобретателя 14+)",
            "colLabels": [
              "Чертёж магического предмета",
              "Настройка"
            ],
            "colStyles": [
              "text-left",
              "text-center w-20"
            ],
            "rows": [
              [
                "{@magicItem Доспех +2 [Armor +2]|url:armor-1-2-or-3-dmg}",
                "Нет"
              ],
              [
                "{@magicItem Ловящий стрелы щит [Arrow Catching Shield]|url:arrow-catching-shield-dmg}",
                "Да"
              ],
              [
                "{@magicItem Язык пламени [Flame Tongue]|url:flame-tongue-dmg}",
                "Да"
              ],
              [
                "Редкий чудесный предмет, не являющийся проклятым (можно выбрать несколько раз, каждый раз новый предмет)",
                "Вариативно"
              ],
              [
                "{@magicItem Кольцо свободных действий [Ring of Free Action]|url:ring-of-free-action-dmg}",
                "Да"
              ],
              [
                "{@magicItem Кольцо защиты [Ring of Protection]|url:ring-of-protection-dmg}",
                "Да"
              ],
              [
                "{@magicItem Кольцо тарана [Ring of the Ram]|url:ring-of-the-ram-dmg}",
                "Да"
              ]
            ]
          }
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "podklass-izobretatela",
        "level": 3,
        "name": "Подкласс изобретателя",
        "description": [
          "Вы получаете подкласс изобретателя по вашему выбору. Подклассы {@i алхимик}, {@i артеллерист}, {@i боевой кузнец}, {@i картограф} и {@i бронник} подробно изложены после списка заклинаний этого класса. Подкласс — это специализация, которая предоставляет вам возможности на определённых уровнях изобретателя. В ходе дальнейшего развития вы получаете все умения вашего подкласса, которые соответствуют вашему уровню изобретателя или ниже."
        ],
        "additional": "",
        "scaling": [
          {
            "level": 5,
            "name": "Умение подкласса",
            "description": [],
            "additional": "",
            "hideInSubclasses": false
          },
          {
            "level": 9,
            "name": "Умение подкласса",
            "description": [],
            "additional": "",
            "hideInSubclasses": false
          },
          {
            "level": 15,
            "name": "Умение подкласса",
            "description": [],
            "additional": "",
            "hideInSubclasses": false
          }
        ],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "ulucsenie-harakteristik",
        "level": 4,
        "name": "Улучшение характеристик",
        "description": [
          "Вы получаете {@feat Улучшение характеристик [Ability Score Improvement]|url:ability-score-improvement-phb} или другую черту по вашему выбору, требованиям которой вы соответствуете. Вы снова получаете эту способность на уровнях изобретателя 8, 12 и 16."
        ],
        "additional": "",
        "scaling": [
          {
            "level": 8,
            "name": "Улучшение характеристик",
            "description": [],
            "additional": "",
            "hideInSubclasses": false
          },
          {
            "level": 12,
            "name": "Улучшение характеристик",
            "description": [],
            "additional": "",
            "hideInSubclasses": false
          },
          {
            "level": 16,
            "name": "Улучшение характеристик",
            "description": [],
            "additional": "",
            "hideInSubclasses": false
          }
        ],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "masterstvo-magiceskih-predmetov",
        "level": 6,
        "name": "Мастерство магических предметов",
        "description": [
          "Ваше умение {@i Копия магического предмета} получает следующие дополнительные возможности:",
          {
            "type": "list",
            "attrs": {
              "type": "unordered"
            },
            "content": [
              "{@b Зарядка магического предмета.} {@glossary Бонусным действием|url:bonus-action-phb} вы можете коснуться одного {@glossary магического предмета|url:magic-item-phb} в пределах 5 фт от вас, который вы создали с помощью умения {@i Копия магического предмета} и который использует заряды. Вы тратите ячейку заклинания 1-го или более высокого уровня и восстанавливаете этому предмету количество зарядов, равное уровню потраченной ячейки.",
              "{@b Откачка магии.} {@glossary Бонусным действием|url:bonus-action-phb} вы можете коснуться одного {@glossary магического предмета|url:magic-items-phb} в пределах 5 фт от вас, который вы создали с помощью умения {@i Копия магического предмета}, и заставить его исчезнуть, преобразовав его магическую энергию в ячейку {@glossary заклинания|url:spell-phb}. Эта ячейка 1-го уровня, если предмет обычный, или 2-го уровня, если предмет необычный или редкий. После использования этого умения вы не можете использовать его снова до завершения {@glossary продолжительного отдыха|url:long-rest-phb}. Любая созданная таким образом ячейка заклинания исчезает при завершении {@glossary продолжительного отдыха|url:long-rest-phb}.",
              "{@b Преобразование магического предмета.} Действием {@ магия|url:magic-phb} вы можете коснуться одного {@glossary магического предмета|url:magic-items-phb} в пределах 5 фт от вас, который вы создали с помощью умения {@i Копия магического предмета}, и превратить его в другой магический предмет. Новый предмет должен основываться на известном вам чертеже магического предмета. После использования этого умения вы не можете использовать его снова до завершения {@glossary продолжительного отдыха|url:long-rest-phb}."
            ]
          }
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "problesk-genialnosti",
        "level": 7,
        "name": "Проблеск гениальности",
        "description": [
          "Когда вы или {@glossary существо|url:creature-phb}, которое вы видите в пределах 30 фт от вас, проваливает проверку характеристики или {@glossary спасбросок|url:saving-throw-phb}, вы можете использовать свою {@glossary реакцию|url:reaction-phb}, чтобы добавить бонус к броску, потенциально приводя к успеху. Этот бонус равен вашему модификатору {@glossary Интеллекта|url:intelligence-phb} (минимум +1).",
          "Вы можете использовать эту {@glossary реакцию|url:reaction-phb} количество раз, равное вашему модификатору Интеллекта (минимум 1). Вы восстанавливаете все израсходованные использования после {@glossary продолжительного отдыха|url:long-rest-phb}."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "adept-magiceskih-predmetov",
        "level": 10,
        "name": "Адепт магических предметов",
        "description": [
          "Вы можете {@glossary настроиться|url:attunement-phb} сразу на четыре {@glossary магических предмета|url:magic-items-phb}."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "hranasij-zaklinania-predmet",
        "level": 11,
        "name": "Хранящий заклинания предмет",
        "description": [
          "Каждый раз после {@glossary продолжительного отдыха|url:long-rest-phb} вы можете коснуться одного простого или боевого оружия, либо одного предмета, который можно использовать как {@item заклинательную фокусировку|url:spellcasting-focus-phb}, и вложить в него {@glossary заклинание|url:spell-phb}. Вы выбираете заклинание изобретателя 1, 2 или 3 уровня, которое имеет время накладывания «1 {@glossary действие|url:action-phb}» и не требует расходуемого материального компонента (вам не нужно иметь это заклинание среди подготовленных).",
          "Держа этот предмет, {@glossary существо|url:creature-phb} может действием {@glossary магия|url:magic-phb} воспроизвести эффект вложенного заклинания, используя ваш модификатор заклинательной характеристики. Если для заклинания требуется концентрация, существо должно поддерживать её. После того как существо использует предмет для воспроизведения эффекта заклинания, предмет нельзя использовать таким образом снова до начала следующего хода этого существа.",
          "Заклинание остаётся в предмете до тех пор, пока оно не будет использовано количество раз, равное удвоенному значению вашего модификатора {@glossary Интеллекта|url:intelligence-phb} (минимум 2), или пока вы не используете это умение снова, чтобы вложить новое заклинание в предмет."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "znatok-magiceskih-predmetov",
        "level": 14,
        "name": "Знаток магических предметов",
        "description": [
          "Ваше мастерство в обращении с магическими предметами усиливается, предоставляя следующие эффекты:",
          "{@b Знаток магических предметов.} Вы можете {@glossary настроиться|url:attunement-phb} на 5 {@glossary магических предметов|url:magic-items-phb} одновременно.",
          "{@b Обновлённый гений.} Когда вы завершаете {@glossary короткий отдых|url:short-rest-phb}, вы восстанавливаете 1 израсходованное использование своего умения {@i Проблеск гениальности}."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "master-magiceskih-predmetov",
        "level": 18,
        "name": "Мастер магических предметов",
        "description": [
          "Вы можете {@glossary настроиться|url:attunement-phb} на 6 магических предметов одновременно вместо 3."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "epiceskaa-certa",
        "level": 19,
        "name": "Эпическая черта",
        "description": [
          "Вы получаете эпическую черту  или другую черту по вашему выбору, требованиям которой вы соответствуете. Рекомендуется черта {@feat Дар устойчивости к энергиям [Boon of Energy Resistance]|url:boon-of-energy-resistance-phb}."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "dusa-izobretenia",
        "level": 20,
        "name": "Душа изобретения",
        "description": [
          "Вы развили мистическую связь с вашими магическими предметами, из которой можете черпать помощь. Вы получаете следующие эффекты:",
          "{@b Обман смерти.} Если ваши {@glossary хиты|url:hit-points-phb} снижены до 0, но вы не умерли сразу, вы можете уничтожить любое количество {@i необычных} или {@i редких} магических предметов, созданных с помощью вашей особенности {@i Копия магического предмета}. Если вы так делаете, ваши хиты вместо 0 изменяются на значение, равное 20, умноженному на количество уничтоженных магических предметов.",
          "{@b Магическое руководство.} Когда вы завершаете {@glossary короткий отдых|url:short-rest-phb}, вы восстанавливаете все израсходованные использования вашего умения Проблеск гениальности, если у вас есть хотя бы 1 {@glossary настройка|url:attunement-phb} на магический предмет."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      }
    ],
    "table": [
      {
        "name": "Чертежи",
        "scaling": [
          {
            "level": 2,
            "value": "4"
          },
          {
            "level": 6,
            "value": "5"
          },
          {
            "level": 10,
            "value": "6"
          },
          {
            "level": 14,
            "value": "7"
          },
          {
            "level": 18,
            "value": "8"
          }
        ]
      },
      {
        "name": "Маг. предметы",
        "scaling": [
          {
            "level": 2,
            "value": "2"
          },
          {
            "level": 6,
            "value": "3"
          },
          {
            "level": 10,
            "value": "4"
          },
          {
            "level": 14,
            "value": "5"
          },
          {
            "level": 18,
            "value": "6"
          }
        ]
      },
      {
        "name": "Заговоры",
        "scaling": [
          {
            "level": 1,
            "value": "2"
          },
          {
            "level": 10,
            "value": "3"
          },
          {
            "level": 14,
            "value": "4"
          }
        ]
      },
      {
        "name": "Подг. Закл.",
        "scaling": [
          {
            "level": 1,
            "value": "2"
          },
          {
            "level": 2,
            "value": "3"
          },
          {
            "level": 3,
            "value": "4"
          },
          {
            "level": 4,
            "value": "5"
          },
          {
            "level": 5,
            "value": "6"
          },
          {
            "level": 7,
            "value": "7"
          },
          {
            "level": 9,
            "value": "9"
          },
          {
            "level": 11,
            "value": "10"
          },
          {
            "level": 13,
            "value": "11"
          },
          {
            "level": 15,
            "value": "12"
          },
          {
            "level": 17,
            "value": "14"
          },
          {
            "level": 19,
            "value": "15"
          }
        ]
      }
    ],
    "casterType": "HALF",
    "hasSubclasses": true,
    "name": {
      "rus": "Изобретатель",
      "eng": "Artificer"
    },
    "source": {
      "name": {
        "label": "EFA",
        "rus": "Эберрон: Горнило Изобретателя",
        "eng": "Eberron: Forge of the Artificer Ultimate Bundle"
      },
      "group": {
        "label": "Basic",
        "rus": "Официальные источники"
      },
      "page": 2
    }
  },
  {
    "url": "warlock-phb",
    "gallery": [
      "/s3/classes/peterko/1759866447745-warlock2.webp"
    ],
    "image": "/s3/classes/peterko/1759866442117-warlock.webp",
    "description": [
      "{@i Оккультист, наделённый силой потусторонними пактами}",
      "Колдуны ищут знания, скрытые в недрах Мультивселенной. Они нередко ищут магическую силу, исследуя запретные книги, прибегая к воззваниям, направленным на призыв существ из иных миров, или разыскивая места силы, где можно ощутить их влияние.",
      "В определённый момент каждый колдун заключает обязательный договор с могущественным покровителем. Опираясь на древние знания таких существ, как ангелы, архифеи, демоны, дьяволы, карги и чужеродные сущности Дальнего предела, колдуны по крупицам собирают магические секреты, чтобы укрепить свою собственную силу.",
      "Колдуны используют своих покровителей как источник энергии, как средство для достижения магического могущества. Некоторые колдуны уважают, почитают или даже любят своих покровителей; другие служат им без особого энтузиазма; а третьи стремятся уничтожить своих покровителей, пусть и используя силу, которую получили от них.",
      "После заключения договора жажду знаний и могущества колдуна невозможно утолить простым обучением. Многие колдуны проводят свои дни в поисках могущества и глубоких знаний, которые обычно связаны с какими-то приключениями.",
      {
        "type": "heading",
        "attrs": {
          "level": "2"
        },
        "content": [
          {
            "type": "text",
            "text": "Становление колдуном..."
          }
        ]
      },
      "{@b Как персонаж 1 уровня:}",
      {
        "type": "list",
        "attrs": {
          "type": "unordered"
        },
        "content": [
          "Получите особенности, указанные в таблице «Особенности колдуна».",
          "Получите умения колдуна 1 уровня, перечисленные в таблице «Умения колдуна»."
        ]
      },
      "{@b Как мультикласс:}",
      {
        "type": "list",
        "attrs": {
          "type": "unordered"
        },
        "content": [
          "Получите следующие особенности из таблицы «Особенности колдуна»: кость хитов и владение лёгкими доспехами.",
          "Получите умения колдуна 1 уровня, перечисленные в таблице «Умения колдуна». Чтобы узнать, сколько ячеек заклинаний вам доступно, обратитесь к правилам мультиклассирования в главе 2."
        ]
      },
      {
        "type": "heading",
        "attrs": {
          "level": "2"
        },
        "content": [
          {
            "type": "text",
            "text": "Список заклинаний колдуна"
          }
        ]
      },
      "В этом разделе представлен список заклинаний колдуна. Заклинания упорядочены по уровням, затем расположены в алфавитном порядке, и для каждого заклинания указана школа магии.{@br}В столбце {@b «Особое»} обозначения означают: {@b К} — заклинание требует Концентрации, {@b Р} — заклинание является ритуалом, {@b М} — заклинание требует материальный компонент.",
      {
        "type": "table",
        "caption": "Заклинания колдуна 0 уровня",
        "colLabels": [
          "Заклинание",
          "Школа",
          "Особое"
        ],
        "colStyles": [
          "w-2/5 text-left",
          "w-1/3 text-left",
          "w-1/4 text-center"
        ],
        "rows": [
          [
            "{@spell Волшебная рука [Mage Hand]|url:mage-hand-phb}",
            "Вызов",
            "—"
          ],
          [
            "{@spell Дружба [Friends]|url:friends-phb}",
            "Очарование",
            "К"
          ],
          [
            "{@spell Защита от оружия [Blade Ward]|url:blade-ward-phb}",
            "Ограждение",
            "К"
          ],
          [
            "{@spell Леденящее прикосновение [Chill Touch]|url:chill-touch-phb}",
            "Некромантия",
            "—"
          ],
          [
            "{@spell Малая иллюзия [Minor Illusion]|url:minor-illusion-phb}",
            "Иллюзия",
            "—"
          ],
          [
            "{@spell Меткий удар [True Strike]|url:true-strike-phb}",
            "Прорицание",
            "—"
          ],
          [
            "{@spell Мистический заряд [Eldritch Blast]|url:eldritch-blast-phb}",
            "Воплощение",
            "—"
          ],
          [
            "{@spell Погребальный звон [Toll the Dead]|url:toll-the-dead-phb}",
            "Некромантия",
            "—"
          ],
          [
            "{@spell Раскат грома [Thunderclap]|url:thunderclap-phb}",
            "Воплощение",
            "—"
          ],
          [
            "{@spell Расщепление разума [Mind Sliver]|url:mind-sliver-tce}",
            "Очарование",
            "—"
          ],
          [
            "{@spell Фокусы [Prestidigitation]|url:prestidigitation-phb}",
            "Преобразование",
            "—"
          ],
          [
            "{@spell Ядовитые брызги [Poison Spray]|url:poison-spray-phb}",
            "Некромантия",
            "—"
          ]
        ]
      },
      {
        "type": "table",
        "caption": "Заклинания колдуна 1 уровня",
        "colLabels": [
          "Заклинание",
          "Школа",
          "Особое"
        ],
        "colStyles": [
          "w-2/5 text-left",
          "w-1/3 text-left",
          "w-1/4 text-center"
        ],
        "rows": [
          [
            "{@spell Адское возмездие [Hellish Rebuke]|url:hellish-rebuke-phb}",
            "Воплощение",
            "—"
          ],
          [
            "{@spell Ведьмин снаряд [Witch Bolt]|url:witch-bolt-phb}",
            "Воплощение",
            "К"
          ],
          [
            "{@spell Доспех Агатиса [Armor of Agathys]|url:armor-of-agathys-phb}",
            "Ограждение",
            "—"
          ],
          [
            "{@spell Жуткий смех Таши [Tasha's Hideous Laughter]|url:tashas-hideous-laughter-phb}",
            "Очарование",
            "К"
          ],
          [
            "{@spell Защита от зла и добра [Protection from Evil and Good]|url:protection-from-evil-and-good-phb}",
            "Ограждение",
            "К, М"
          ],
          [
            "{@spell Иллюзорные письмена [Illusory Script]|url:illusory-script-phb}",
            "Иллюзия",
            "Р, М"
          ],
          [
            "{@spell Невидимый слуга [Unseen Servant]|url:unseen-servant-phb}",
            "Вызов",
            "Р"
          ],
          [
            "{@spell Обнаружение магии [Detect Magic]|url:detect-magic-phb}",
            "Прорицание",
            "К, Р"
          ],
          [
            "{@spell Очарование личности [Charm Person]|url:charm-person-phb}",
            "Очарование",
            "—"
          ],
          [
            "{@spell Понимание языков [Comprehend Languages]|url:comprehend-languages-phb}",
            "Прорицание",
            "Р"
          ],
          [
            "{@spell Сглаз [Hex]|url:hex-phb}",
            "Очарование",
            "К"
          ],
          [
            "{@spell Поспешное отступление [Expeditious Retreat]|url:expeditious-retreat-phb}",
            "Преобразование",
            "К"
          ],
          [
            "{@spell Разговор с животными [Speak with Animals]|url:speak-with-animals-phb}",
            "Прорицание",
            "Р"
          ],
          [
            "{@spell Руки Хадара [Arms of Hadar]|url:arms-of-hadar-phb}",
            "Вызов",
            "—"
          ],
          [
            "{@spell Сглаз [Hex]|url:hex-phb}",
            "Очарование",
            "К"
          ]
        ]
      },
      {
        "type": "table",
        "caption": "Заклинания колдуна 2 уровня",
        "colLabels": [
          "Заклинание",
          "Школа",
          "Особое"
        ],
        "colStyles": [
          "w-2/5 text-left",
          "w-1/3 text-left",
          "w-1/4 text-center"
        ],
        "rows": [
          [
            "{@spell Внушение [Suggestion]|url:suggestion-phb}",
            "Очарование",
            "К"
          ],
          [
            "{@spell Корона безумия [Crown of Madness]|url:crown-of-madness-phb}",
            "Очарование",
            "К"
          ],
          [
            "{@spell Луч слабости [Ray of Enfeeblement]|url:ray-of-enfeeblement-phb}",
            "Некромантия",
            "К"
          ],
          [
            "{@spell Невидимость [Invisibility]|url:invisibility-phb}",
            "Иллюзия",
            "К"
          ],
          [
            "{@spell Облако кинжалов [Cloud of Daggers]|url:cloud-of-daggers-phb}",
            "Вызов",
            "К"
          ],
          [
            "{@spell Отражения [Mirror Image]|url:mirror-image-phb}",
            "Иллюзия",
            "—"
          ],
          [
            "{@spell Паук [Spider Climb]|url:spider-climb-phb}",
            "Преобразование",
            "К"
          ],
          [
            "{@spell Пронзание разума [Mind Spike]|url:mind-spike-phb}",
            "Прорицание",
            "К"
          ],
          [
            "{@spell Речь златоуста [Enthrall]|url:enthrall-phb}",
            "Очарование",
            "К"
          ],
          [
            "{@spell Туманный шаг [Misty Step]|url:misty-step-phb}",
            "Вызов",
            "—"
          ],
          [
            "{@spell Тьма [Darkness]|url:darkness-phb}",
            "Вызов",
            "К"
          ],
          [
            "{@spell Удержание личности [Hold Person]|url:hold-person-phb}",
            "Очарование",
            "К"
          ]
        ]
      },
      {
        "type": "table",
        "caption": "Заклинания колдуна 3 уровня",
        "colLabels": [
          "Заклинание",
          "Школа",
          "Особое"
        ],
        "colStyles": [
          "w-2/5 text-left",
          "w-1/3 text-left",
          "w-1/4 text-center"
        ],
        "rows": [
          [
            "{@spell Газообразная форма [Gaseous Form]|url:gaseous-form-phb}",
            "Преобразование",
            "К"
          ],
          [
            "{@spell Гипнотический узор [Hypnotic Pattern]|url:hypnotic-pattern-phb}",
            "Иллюзия",
            "К"
          ],
          [
            "{@spell Голод Хадара [Hunger of Hadar]|url:hunger-of-hadar-phb}",
            "Вызов",
            "К"
          ],
          [
            "{@spell Контрзаклинание [Counterspell]|url:counterspell-phb}",
            "Ограждение",
            "—"
          ],
          [
            "{@spell Магический круг [Magic Circle]|url:magic-circle-phb}",
            "Ограждение",
            "М"
          ],
          [
            "{@spell Образ [Major Image]|url:major-image-phb}",
            "Иллюзия",
            "К"
          ],
          [
            "{@spell Полёт [Fly]|url:fly-phb}",
            "Преобразование",
            "К"
          ],
          [
            "{@spell Призыв духа нежити [Summon Undead]|url:summon-undead-tce}",
            "Некромантия",
            "К, М"
          ],
          [
            "{@spell Призыв духа феи [Summon Fey]|url:summon-fey-tce}",
            "Вызов",
            "К, М"
          ],
          [
            "{@spell Прикосновение вампира [Vampiric Touch]|url:vampiric-touch-phb}",
            "Некромантия",
            "К"
          ],
          [
            "{@spell Рассеивание магии [Dispel Magic]|url:dispel-magic-phb}",
            "Ограждение",
            "—"
          ],
          [
            "{@spell Снятие проклятья [Remove Curse]|url:remove-curse-phb}",
            "Ограждение",
            "—"
          ],
          [
            "{@spell Ужас [Fear]|url:fear-phb}",
            "Иллюзия",
            "К"
          ],
          [
            "{@spell Языки [Tongues]|url:tongues-phb}",
            "Прорицание",
            "—"
          ]
        ]
      },
      {
        "type": "table",
        "caption": "Заклинания колдуна 4 уровня",
        "colLabels": [
          "Заклинание",
          "Школа",
          "Особое"
        ],
        "colStyles": [
          "w-2/5 text-left",
          "w-1/3 text-left",
          "w-1/4 text-center"
        ],
        "rows": [
          [
            "{@spell Изгнание [Banishment]|url:banishment-phb}",
            "Ограждение",
            "К"
          ],
          [
            "{@spell Мираж [Hallucinatory Terrain]|url:hallucinatory-terrain-phb}",
            "Иллюзия",
            "—"
          ],
          [
            "{@spell Очарование монстра [Charm Monster]|url:charm-monster-phb}",
            "Очарование",
            "—"
          ],
          [
            "{@spell Переносящая дверь [Dimension Door]|url:dimension-door-phb}",
            "Вызов",
            "—"
          ],
          [
            "{@spell Призыв духа аберрации [Summon Aberration]|url:summon-aberration-tce}",
            "Вызов",
            "К, М"
          ],
          [
            "{@spell Усыхание [Blight]|url:blight-phb}",
            "Некромантия",
            "—"
          ]
        ]
      },
      {
        "type": "table",
        "caption": "Заклинания колдуна 5 уровня",
        "colLabels": [
          "Заклинание",
          "Школа",
          "Особое"
        ],
        "colStyles": [
          "w-2/5 text-left",
          "w-1/3 text-left",
          "w-1/4 text-center"
        ],
        "rows": [
          [
            "{@spell Круг телепортации [Teleportation Circle]|url:teleportation-circle-phb}",
            "Вызов",
            "М"
          ],
          [
            "{@spell Наблюдение [Scrying]|url:scrying-phb}",
            "Прорицание",
            "К, М"
          ],
          [
            "{@spell Планарные узы [Planar Binding]|url:planar-binding-phb}",
            "Ограждение",
            "М"
          ],
          [
            "{@spell Связь с иным планом [Contact Other Plane]|url:contact-other-plane-phb}",
            "Прорицание",
            "Р"
          ],
          [
            "{@spell Синаптический разряд [Synaptic Static]|url:synaptic-static-phb}",
            "Очарование",
            "—"
          ],
          [
            "{@spell Сияющий шторм Джалларзи [Jallarzi’s Radiant Storm]|url:jallarzi-s-radiant-storm-homebrew}",
            "Воплощение",
            "К"
          ],
          [
            "{@spell Сновидение [Dream]|url:dream-phb}",
            "Иллюзия",
            "—"
          ],
          [
            "{@spell Удержание чудовища [Hold Monster]|url:hold-monster-phb}",
            "Очарование",
            "К"
          ],
          [
            "{@spell Фальшивый двойник [Mislead]|url:mislead-phb}",
            "Иллюзия",
            "К"
          ]
        ]
      },
      {
        "type": "table",
        "caption": "Заклинания колдуна 6 уровня",
        "colLabels": [
          "Заклинание",
          "Школа",
          "Особое"
        ],
        "colStyles": [
          "w-2/5 text-left",
          "w-1/3 text-left",
          "w-1/4 text-center"
        ],
        "rows": [
          [
            "{@spell Бурлящий котёл Таши [Tasha's Cauldron Brew]|url:tashas-cauldron-brew-homebrew}",
            "Вызов",
            "М"
          ],
          [
            "{@spell Истинное зрение [True Seeing]|url:true-seeing-phb}",
            "Прорицание",
            "М"
          ],
          [
            "{@spell Круг смерти [Circle of Death]|url:circle-of-death-phb}",
            "Некромантия",
            "М"
          ],
          [
            "{@spell Магические врата [Arcane Gate]|url:arcane-gate-phb}",
            "Вызов",
            "К"
          ],
          [
            "{@spell Призыв духа исчадия [Summon Fiend]|url:summon-fiend-tce}",
            "Вызов",
            "К, М"
          ],
          [
            "{@spell Разящее око [Eyebite]|url:eyebite-phb}",
            "Некромантия",
            "К"
          ],
          [
            "{@spell Сотворение нежити [Create Undead]|url:create-undead-phb}",
            "Некромантия",
            "М"
          ]
        ]
      },
      {
        "type": "table",
        "caption": "Заклинания колдуна 7 уровня",
        "colLabels": [
          "Заклинание",
          "Школа",
          "Особое"
        ],
        "colStyles": [
          "w-2/5 text-left",
          "w-1/3 text-left",
          "w-1/4 text-center"
        ],
        "rows": [
          [
            "{@spell Перст смерти [Finger of Death]|url:finger-of-death-phb}",
            "Некромантия",
            "—"
          ],
          [
            "{@spell Силовая клетка [Forcecage]|url:forcecage-phb}",
            "Воплощение",
            "К, М"
          ],
          [
            "{@spell Уход в иной план [Plane Shift]|url:plane-shift-phb}",
            "Вызов",
            "М"
          ],
          [
            "{@spell Эфирность [Etherealness]|url:etherealness-phb}",
            "Вызов",
            "—"
          ]
        ]
      },
      {
        "type": "table",
        "caption": "Заклинания колдуна 8 уровня",
        "colLabels": [
          "Заклинание",
          "Школа",
          "Особое"
        ],
        "colStyles": [
          "w-2/5 text-left",
          "w-1/3 text-left",
          "w-1/4 text-center"
        ],
        "rows": [
          [
            "{@spell Демиплан [Demiplane]|url:demiplane-phb}",
            "Вызов",
            "—"
          ],
          [
            "{@spell Замешательство [Feeblemind]|url:feeblemind-phb}",
            "Очарование",
            "—"
          ],
          [
            "{@spell Находчивость [Glibness]|url:glibness-phb}",
            "Очарование",
            "—"
          ],
          [
            "{@spell Подчинение чудовища [Dominate Monster]|url:dominate-monster-phb}",
            "Очарование",
            "К"
          ],
          [
            "{@spell Слово силы: ошеломление [Power Word Stun]|url:power-word-stun-phb}",
            "Очарование",
            "—"
          ]
        ]
      },
      {
        "type": "table",
        "caption": "Заклинания колдуна 9 уровня",
        "colLabels": [
          "Заклинание",
          "Школа",
          "Особое"
        ],
        "colStyles": [
          "w-2/5 text-left",
          "w-1/3 text-left",
          "w-1/4 text-center"
        ],
        "rows": [
          [
            "{@spell Врата [Gate]|url:gate-phb}",
            "Вызов",
            "К, М"
          ],
          [
            "{@spell Жуть [Weird]|url:weird-phb}",
            "Иллюзия",
            "К"
          ],
          [
            "{@spell Заточение [Imprisonment]|url:imprisonment-phb}",
            "Ограждение",
            "М"
          ],
          [
            "{@spell Истинный полиморф [True Polymorph]|url:true-polymorph-phb}",
            "Преобразование",
            "К"
          ],
          [
            "{@spell Предвидение [Foresight]|url:foresight-phb}",
            "Прорицание",
            "—"
          ],
          [
            "{@spell Проекция в астрал [Astral Projection]|url:astral-projection-phb}",
            "Некромантия",
            "М"
          ],
          [
            "{@spell Слово силы: смерть [Power Word Kill]|url:power-word-kill-phb}",
            "Очарование",
            "—"
          ]
        ]
      }
    ],
    "updatedAt": "2026-01-17T15:33:13.257490Z",
    "userId": "Magistrus",
    "hitDice": {
      "label": "к8",
      "value": "d8",
      "maxValue": 8,
      "avg": 5
    },
    "primaryCharacteristics": "Харизма",
    "proficiency": {
      "armor": "Легкий доспех",
      "weapon": "Простое дальнобойное, Простое рукопашное",
      "tool": "",
      "skill": "Выберите 2 навыка из следующих: Аркана, Обман, История, Запугивание, Анализ, Природа, Религия"
    },
    "equipment": [
      "Выберите А или Б:",
      {
        "type": "list",
        "attrs": {
          "type": "unordered"
        },
        "content": [
          "А) {@item кожаный доспех|url:leather-armor-phb}, {@item серп|url:sickle-phb}, 2 {@item кинжала|url:dagger-phb}, {@item магическая фокусировка (сфера)|url:orb-phb}, {@item книга (оккультные знания)|url:book-phb}, {@item набор учёного|url:scholar-s-pack-phb} и 15 зм.",
          "Б) 100 зм."
        ]
      }
    ],
    "savingThrows": "Мудрость, Харизма",
    "features": [
      {
        "isSubclass": false,
        "key": "magia-dogovora",
        "level": 1,
        "name": "Магия договора",
        "description": [
          "В ходе оккультного ритуала вы заключили договор с таинственной сущностью, чтобы обрести магическую силу. Эта сущность — голос из тени, личность которой непостижима, но её дар для вас вполне осязаем: способность накладывать заклинания. Правила наложения заклинаний см. в главе 7. Ниже подробно описано, как применять эти правила к заклинаниям колдуна, которые будут перечислены в списке заклинаний колдуна далее в описании класса.",
          "{@b Заговоры.} Вы знаете 2 заговора по своему выбору из списка заклинаний колдуна. Рекомендуются: {@spell Мистический заряд [Eldritch Blast]|url:eldritch-blast-phb} и {@spell Фокусы [Prestidigitation]|url:prestidigitation-phb}. Каждый раз, когда вы получаете уровень колдуна, вы можете заменить 1 из ваших заговоров другим заговором по вашему выбору из списка заклинаний колдуна. При достижении 4 и 10 уровней колдуна, вы изучаете дополнительный заговор по вашему выбору из списка заклинаний колдуна, как показано в столбце «Заговоры» из таблицы «Умения колдуна».",
          "{@b Ячейки заклинаний.} Таблица «Умения колдуна» показывает, сколько ячеек заклинаний вы можете использовать для заклинаний с 1 по 5 уровень. В таблице также указан уровень этих ячеек, все они одного уровня. Вы восстанавливаете все потраченные ячейки Магии договора, когда завершаете короткий отдых или продолжительный отдых. Например, если вы колдун 5 уровня, то у вас есть 2 ячейки заклинаний 3 уровня. Чтобы наложить заклинание 1 уровня {@spell Ведьмин снаряд [Witch Bolt]|url:witch-bolt-phb}, вы должны потратить 1 из этих ячеек, и заклинание наложится как заклинание 3 уровня.",
          "{@b Подготовленные заклинания 1+ уровня.} Вы подготавливаете список заклинаний 1+ уровня, которые доступны вам для использования с помощью этого умения. Для начала выберите 2 заклинания колдуна 1 уровня. Рекомендуются: {@spell Очарование личности [Charm Person]|url:charm-person-phb} и {@spell Сглаз [Hex]|url:hex-phb}. Количество подготовленных заклинаний в вашем списке увеличивается по мере того, как вы получаете уровни колдуна, как показано в колонке «Подг. закл.» таблицы «Умения колдуна». Каждый раз, когда это число увеличивается, выберите дополнительные заклинания из списка заклинаний колдуна, чтобы количество заклинаний вашего списка соответствовало значению в таблице «Умения колдуна». Выбранные заклинания не должны превышать уровень заклинания, указанный в колонке «Уровень ячейки». Например, когда вы достигаете 6 уровня, то вы изучаете новое заклинание колдуна, которое может быть с 1 по 3 уровень. Если другое умение колдуна даёт вам всегда подготовленные заклинания, то эти заклинания не учитываются в количестве заклинаний, которые вы можете подготовить с помощью этого умения, но в остальном они считаются заклинаниями колдуна для вас.",
          "{@b Изменение подготовленных заклинаний.} Каждый раз, когда вы получаете уровень колдуна, вы можете заменить 1 заклинание из вашего списка другим заклинанием из списка заклинаний колдуна, для которого у вас имеется ячейка заклинаний.",
          "{@b Заклинательная характеристика.} Харизма — это ваша заклинательная характеристика для ваших заклинаний колдуна.",
          "{@b Заклинательная фокусировка.} В качестве заклинательной фокусировки для ваших заклинаний колдуна вы можете использовать магическую фокусировку."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "tainstvennye-vozzvania",
        "level": 1,
        "name": "Таинственные воззвания",
        "description": [
          "Вы обнаружили {@b Таинственные воззвания} — частицы запретных знаний, которые наделяют вас постоянными магическими силами или другими знаниями. Вы можете выбрать 1 воззвание на свой выбор, например {@i «Договор гримуара»}. Воззвания подробно рассмотрены в разделе {@i «Варианты таинственных воззваний»} ниже в описании этого класса.",
          "{@b Необходимые условия.} Если у воззвания есть необходимые условия, вы должны выполнить их, чтобы изучить воззвание. Например, если для получения воззвания требуется быть колдуном 5+ уровня, то вы сможете выбрать это воззвание, как только достигнете 5 уровня колдуна и выше.",
          "{@b Замена и получение воззваний.} Каждый раз, когда вы получаете уровень в классе колдуна, вы можете заменить одно из своих воззваний на другое, для которого вы соответствуете требованиям. Вы не можете заменить воззвание, если оно необходимо для другого воззвания, которое у вас есть. Когда вы достигаете определённых уровней колдуна, вы можете получить дополнительные воззвания по своему выбору, как показано в колонке {@i «Воззвания»} таблицы {@i «Умения колдуна»}.",
          "Вы не можете выбирать одно и то же воззвание более одного раза, если в его описании не указано иного.",
          {
            "type": "heading",
            "attrs": {
              "level": 2
            },
            "content": [
              {
                "type": "text",
                "text": "Варианты таинственных воззваний"
              }
            ]
          },
          {
            "type": "heading",
            "attrs": {
              "level": 3
            },
            "content": [
              {
                "type": "text",
                "text": "Договор гримуара [Pact of the Tome]"
              }
            ]
          },
          "Переплетая теневые нити между собой, в конце короткого или продолжительного отдыха вы создаёте в своей руке книгу. Эта книга теней (её внешний вид определяете вы) содержит тайную магию, доступную только вам, и позволяет вам получить перечисленные ниже эффекты. Книга исчезает, если вы создаёте новую книгу при помощи этого умения или если вы умираете.",
          "{@b Заговоры и ритуалы.} Когда книга появится, выберите 3 заговора и 2 заклинания 1 уровня с меткой «ритуал». Заклинания могут быть из списка заклинаний любого класса, и это должны быть заклинания, которые у вас ещё не подготовлены. Пока книга находится рядом с вами, выбранные заклинания считаются подготовленными и действуют как заклинания колдуна.",
          "{@b Заклинательная фокусировка.} Вы можете использовать книгу в качестве заклинательной фокусировки.",
          {
            "type": "heading",
            "attrs": {
              "level": 3
            },
            "content": [
              {
                "type": "text",
                "text": "Договор клинка [Pact of the Blade]"
              }
            ]
          },
          "Вы можете {@glossary бонусным действием|url:bonus-action-phb} создать оружие договора в своей руке (простое или воинское рукопашное оружие по своему выбору) или создать связь с магическим оружием, которое держите; вы не можете создать связь с магическим оружием, если кто-то другой настроен на него или другой колдун связан с ним. Пока связь не закончится, вы владеете этим оружием и можете использовать его в качестве заклинательной фокусировки.",
          "При атаке этим оружием вы можете использовать свой модификатор Харизмы для {@glossary бросков атаки|url:attack-roll-phb} и урона, а не Силу или Ловкость; также вы можете изменить тип урона, наносимый оружием, на некротическую энергию, психическую энергию или излучение, вместо обычного.",
          "Ваша связь с оружием прерывается, если вы снова используете бонусное действие, применяя это умение, если оружие находится на расстоянии более 5 фт. от вас в течение 1 минуты или более, или если вы умираете. Созданное оружие исчезает, когда связь прекращается.",
          {
            "type": "heading",
            "attrs": {
              "level": 3
            },
            "content": [
              {
                "type": "text",
                "text": "Договор цепи [Pact of the Chain]"
              }
            ]
          },
          "Вы знаете заклинание {@spell Поиск фамильяра [Find Familiar]|url:find-familiar-phb} и можете накладывать его действием {@glossary магия|url:magic-phb}, не расходуя ячейку заклинания.",
          "Когда вы накладываете заклинание, вы можете выбрать одну из обычных форм для вашего фамильяра, либо одну из особых форм: {@bestiary Бес [Imp]|url:imp-mm}, {@bestiary Псевдодракон [Pseudodragon]|url:pseudodragon-mm}, {@bestiary Квазит [Quasit]|url:quasit-mm}, {@bestiary Скелет [Skeleton]|url:skeleton-mm}, {@bestiary Слаад головастик [Slaad Tadpole]|url:slaad-tadpole-mm}, {@bestiary Сфинкс чудес [Wonder Sphinx]|url:sphinx-of-wonder-mm}, {@bestiary Спрайт [Sprite]|url:sprite-mm} или {@bestiary Ядовитая змея [Poisonous Snake]|url:venomous-snake-mm} (блоки статистики см. в приложении Б).",
          "Кроме того, когда вы совершаете {@glossary действие|url:action-phb} {@glossary атака|url:attack-phb}, вы можете вместо одной своей атаки позволить своему фамильяру совершить одну за счёт его {@glossary реакции|url:reaction-phb}.",
          {
            "type": "heading",
            "attrs": {
              "level": 3
            },
            "content": [
              {
                "type": "text",
                "text": "Доспехи теней [Armor of Shadows]"
              }
            ]
          },
          "Вы можете накладывать на себя {@spell Доспехи мага [Mage Armor]|url:mage-armor-phb}, не тратя ячейку заклинания.",
          {
            "type": "heading",
            "attrs": {
              "level": 3
            },
            "content": [
              {
                "type": "text",
                "text": "Мистический разум [Eldritch Mind]"
              }
            ]
          },
          "Вы совершаете с {@glossary преимуществом|url:advantage-phb} спасброски Телосложения для поддержания {@glossary концентрации|url:concentration-phb}.",
          {
            "type": "heading",
            "attrs": {
              "level": 3
            },
            "content": [
              {
                "type": "text",
                "text": "Дьявольский взгляд [Devil’s Sight]"
              }
            ]
          },
          "{@i Требования: уровень колдуна 2+}",
          "Вы можете нормально видеть в {@glossary тусклом свете|url:dim-light-phb} и {@glossary тьме|url:darkness-phb}, как магической, так и немагической, на расстоянии 120 фт.",
          {
            "type": "heading",
            "attrs": {
              "level": 3
            },
            "content": [
              {
                "type": "text",
                "text": "Маска многих лиц [Mask of Many Faces]"
              }
            ]
          },
          "{@i Требования: уровень колдуна 2+}",
          "Вы можете накладывать заклинание {@spell Маскировка [Disguise Self]|url:disguise-self-phb}, не тратя ячейку заклинания.",
          {
            "type": "heading",
            "attrs": {
              "level": 3
            },
            "content": [
              {
                "type": "text",
                "text": "Мощь исчадия [Fiendish Vigor]"
              }
            ]
          },
          "{@i Требования: уровень колдуна 2+}",
          "Вы можете наложить на себя заклинание {@spell Псевдожизнь [False Life]|url:false-life-phb}, не тратя ячейку заклинания. Если вы накладываете заклинание при помощи этого умения, вы не бросаете кости для определения количества {@glossary временных хитов|url:temporary-hit-points-phb}; вы автоматически получаете максимальное значение.",
          {
            "type": "heading",
            "attrs": {
              "level": 3
            },
            "content": [
              {
                "type": "text",
                "text": "Мучительный взрыв [Agonizing Blast]"
              }
            ]
          },
          "{@i Требования: уровень колдуна 2+, заговор колдуна, наносящий урон}",
          "Выберите один из известных вам заговоров колдуна, который наносит урон. Вы можете добавить свой модификатор Харизмы к урону от этого заклинания.",
          "{@b Многократное применение.} Вы можете выбрать это воззвание более 1 раза. Каждый раз выбирайте другой заговор, подходящий по условиям.",
          {
            "type": "heading",
            "attrs": {
              "level": 3
            },
            "content": [
              {
                "type": "text",
                "text": "Мистическое копьё [Eldritch Spear]"
              }
            ]
          },
          "{@i Требования: уровень колдуна 2+, заговор колдуна, наносящий урон}",
          "Выберите один из известных вам заговоров колдуна, который наносит урон и имеет дистанцию 10 фт. или более. Когда вы накладываете это заклинание, его дистанция увеличивается на число футов, равное 30-кратному вашему уровню колдуна.",
          "{@b Многократное применение.} Вы можете выбрать это воззвание более 1 раза. Каждый раз выбирайте другой заговор, подходящий по условиям.",
          {
            "type": "heading",
            "attrs": {
              "level": 3
            },
            "content": [
              {
                "type": "text",
                "text": "Отталкивающий заряд [Repelling Blast]"
              }
            ]
          },
          "{@i Требования: уровень колдуна 2+, заговор колдуна, наносящий урон при {@glossary броске атаки|url:attack-roll-phb}}",
          "Выберите один из известных вам заговоров колдуна, который требует броска атаки. Если вы попадаете этим заклинанием в {@glossary существо|url:creature-phb} большого размера или меньше, вы можете оттолкнуть его от себя на расстояние до 10 фт.",
          "{@b Многократное применение.} Вы можете выбрать это воззвание более 1 раза. Каждый раз выбирайте другой заговор, подходящий по условиям.",
          {
            "type": "heading",
            "attrs": {
              "level": 3
            },
            "content": [
              {
                "type": "text",
                "text": "Потусторонний прыжок [Otherworldly Leap]"
              }
            ]
          },
          "{@i Требования: уровень колдуна 2+}",
          "Вы можете накладывать на себя заклинание заклинание {@spell Прыжок [Jump]|url:jump-phb}, не тратя ячейку заклинания.",
          {
            "type": "heading",
            "attrs": {
              "level": 3
            },
            "content": [
              {
                "type": "text",
                "text": "Туманные видения [Misty Visions]"
              }
            ]
          },
          "{@i Требования: уровень колдуна 2+}",
          "Вы можете накладывать заклинание {@spell Безмолвный образ [Silent Image]|url:silent-image-phb}, не тратя ячейку заклинания.",
          {
            "type": "heading",
            "attrs": {
              "level": 3
            },
            "content": [
              {
                "type": "text",
                "text": "Уроки первородных [Lessons of the First Ones]"
              }
            ]
          },
          "{@i Требования: уровень колдуна 2+}",
          "Вам открылось знание, полученное от древней сущности Мультивселенной, позволяющее вам получить одну черту происхождения по вашему выбору (см. главу 5).",
          "{@b Многократное применение.} Вы можете выбрать это воззвание более 1 раза. Каждый раз выбирайте другую черту происхождения.",
          {
            "type": "heading",
            "attrs": {
              "level": 3
            },
            "content": [
              {
                "type": "text",
                "text": "Взор двух умов [Gaze of Two Minds]"
              }
            ]
          },
          "{@i Требования: уровень колдуна 5+}",
          "Вы можете {@glossary бонусным действием|url:bonus-action-phb} прикоснуться к согласному существу и до конца своего следующего хода воспринимать всё его чувствами. Пока существо находится на том же плане существования, что и вы, вы можете в последующие ходы бонусным действием продлевать эту связь до конца своего следующего хода. Связь прерывается, если вы не поддерживаете её таким образом. При восприятии чувствами другого существа вы получаете все эффекты от его особых чувств и можете накладывать заклинания, как если бы вы находились в своём {@glossary свободном пространстве|url:unoccupied-space-phb} или пространстве этого существа, если вы оба в пределах 60 фт.",
          {
            "type": "heading",
            "attrs": {
              "level": 3
            },
            "content": [
              {
                "type": "text",
                "text": "Восходящий шаг [Ascendant Step]"
              }
            ]
          },
          "{@i Требования: уровень колдуна 5+}",
          "Вы можете накладывать на себя заклинание {@spell Левитация [Levitate]|url:levitate-phb}, не тратя ячейку заклинания.",
          {
            "type": "heading",
            "attrs": {
              "level": 3
            },
            "content": [
              {
                "type": "text",
                "text": "Дар глубин [Gift of the Depths]"
              }
            ]
          },
          "{@i Требования: уровень колдуна 5+}",
          "Вы можете дышать под водой и получаете {@glossary скорость плавания|url:swim-speed-phb}, равную вашей скорости. Вы также можете один раз наложить {@spell Подводное дыхание [Water Breathing]|url:water-breathing-phb}, не расходуя ячейку заклинания. Вы восстанавливаете это умение после {@glossary продолжительного отдыха|url:long-rest-phb}.",
          {
            "type": "heading",
            "attrs": {
              "level": 3
            },
            "content": [
              {
                "type": "text",
                "text": "Дар мастера цепи [Investment of the Chain Master]"
              }
            ]
          },
          "{@i Требования: уровень колдуна 5+, воззвание Договор цепи}",
          "Когда вы накладываете заклинание {@spell Поиск фамильяра [Find Familiar]|url:find-familiar-phb}, вы наделяете призванного фамильяра частичкой своей мистической силы, даруя ему следующие эффекты: фамильяр получает скорость полёта или плавания 40 фт. (на ваш выбор); {@glossary бонусным действием|url:bonus-action-phb} вы можете приказать ему совершить действие атака; каждый раз, когда он наносит дробящий, колющий или рубящий урон, вы можете указать, что вместо этого он наносит урон некротической энергией или излучением; если фамильяр заставляет существо совершить {@glossary спасбросок|url:saving-throw-phb}, его Сл. равна вашей Сл. спасброска заклинаний; когда фамильяр получает урон, вы можете {@glossary реакцией|url:reaction-phb} даровать ему {@glossary сопротивление|url:resistance-phb} к этому урону.",
          {
            "type": "heading",
            "attrs": {
              "level": 3
            },
            "content": [
              {
                "type": "text",
                "text": "Жаждущий клинок [Thirsting Blade]"
              }
            ]
          },
          "{@i Требования: уровень колдуна 5+, воззвание Договор клинка}",
          "Вы получаете умение «Дополнительная атака» для своего оружия договора: вы можете атаковать 2 раза вместо одного, когда совершаете действие атака в свой ход.",
          {
            "type": "heading",
            "attrs": {
              "level": 3
            },
            "content": [
              {
                "type": "text",
                "text": "Мастер бесчисленных обликов [Master of Myriad Forms]"
              }
            ]
          },
          "{@i Требования: уровень колдуна 5+}",
          "Вы можете накладывать заклинание {@spell Смена обличья [Alter Self]|url:alter-self-phb}, не тратя ячейку заклинания.",
          {
            "type": "heading",
            "attrs": {
              "level": 3
            },
            "content": [
              {
                "type": "text",
                "text": "Мистическая кара [Eldritch Smite]"
              }
            ]
          },
          "{@i Требования: уровень колдуна 5+, воззвание Договор клинка}",
          "Один раз в ход, когда вы попадаете по существу своим оружием договора, вы можете потратить ячейку магии договора, чтобы нанести дополнительно {@roll 1к8} урона силовым полем плюс ещё {@roll 1к8} за каждый уровень ячейки, а также наложить на цель состояние {@glossary лежащий ничком|url:prone-phb}, если её размер огромный или меньше.",
          {
            "type": "heading",
            "attrs": {
              "level": 3
            },
            "content": [
              {
                "type": "text",
                "text": "Один среди теней [One with Shadows]"
              }
            ]
          },
          "{@i Требования: уровень колдуна 5+}",
          "Находясь в области {@glossary тусклого света|url:dim-light-phb} или {@glossary тьмы|url:darkness-phb}, вы можете наложить на себя {@spell Невидимость [Invisibility]|url:invisibility-phb}, не тратя ячейку заклинания.",
          {
            "type": "heading",
            "attrs": {
              "level": 3
            },
            "content": [
              {
                "type": "text",
                "text": "Могильный шёпот [Whispers of the Grave]"
              }
            ]
          },
          "{@i Требования: уровень колдуна 7+}",
          "Вы можете накладывать заклинание {@spell Разговор с мёртвыми [Speak with Dead]|url:speak-with-dead-phb}, не тратя ячейку заклинания.",
          {
            "type": "heading",
            "attrs": {
              "level": 3
            },
            "content": [
              {
                "type": "text",
                "text": "Видения далёких королевств [Visions of Distant Realms]"
              }
            ]
          },
          "{@i Требования: уровень колдуна 9+}",
          "Вы можете накладывать заклинание {@spell Магический глаз [Arcane Eye]|url:arcane-eye-phb}, не тратя ячейку заклинания.",
          {
            "type": "heading",
            "attrs": {
              "level": 3
            },
            "content": [
              {
                "type": "text",
                "text": "Дар защитников [Gift of the Protectors]"
              }
            ]
          },
          "{@i Требования: уровень колдуна 9+, воззвание Договор гримуара}",
          "При призыве книги теней в ней появляется новая страница. С вашего разрешения {@glossary существо|url:creature-phb} может {@glossary действием|url:action-phb} написать своё имя на странице; страница может содержать число имён, равное вашему модификатору Харизмы (минимум 1 имя). Когда {@glossary хиты|url:hit-points-phb} любого существа, чьё имя записано на странице, должны опуститься до 0 и при этом оно не умирает сразу, вместо этого его хиты магическим образом опускаются до 1. Если эффект срабатывает, ни одно существо не может получить его снова, пока вы не завершите {@glossary продолжительный отдых|url:long-rest-phb}. Действием {@glossary магия|url:magic-phb} вы можете стереть имя на странице, прикоснувшись к ней.",
          {
            "type": "heading",
            "attrs": {
              "level": 3
            },
            "content": [
              {
                "type": "text",
                "text": "Пьющий жизнь [Lifedrinker]"
              }
            ]
          },
          "{@i Требования: уровень колдуна 9+, воззвание Договор клинка}",
          "Раз в ход, когда вы попадаете по существу своим оружием, вы можете нанести дополнительно {@roll 1к6} урона некротической энергией, психической энергией или излучением (на ваш выбор), а также потратить одну из своих костей {@glossary хитов|url:hit-points-phb}, чтобы бросить её и восстановить количество хитов, равное броску + ваш модификатор Телосложения (минимум 1 хит).",
          {
            "type": "heading",
            "attrs": {
              "level": 3
            },
            "content": [
              {
                "type": "text",
                "text": "Пожирающий клинок [Devouring Blade]"
              }
            ]
          },
          "{@i Требования: уровень колдуна 12+, воззвание Жаждущий клинок}",
          "Дополнительная атака от воззвания «Жаждущий клинок» позволяет совершить две дополнительные атаки вместо одной.",
          {
            "type": "heading",
            "attrs": {
              "level": 3
            },
            "content": [
              {
                "type": "text",
                "text": "Ведьмачий взор [Witch Sight]"
              }
            ]
          },
          "{@i Требования: уровень колдуна 15+}",
          "Вы получаете {@glossary истинное зрение|url:true-sight-phb} с дальностью 30 фт. и можете видеть в области тьмы, как магической, так и немагической."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "magiceskaa-hitrost",
        "level": 2,
        "name": "Магическая хитрость",
        "description": [
          "Вы можете провести эзотерический ритуал, который длится 1 минуту. По его завершении вы восстанавливаете потраченные ячейки {@glossary заклинаний|url:spell-phb} магии договора, но не больше половины от максимального количества (округлите в большую сторону). После использования этого умения вы не сможете использовать его снова, пока не завершите {@glossary продолжительный отдых|url:long-rest-phb}."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "podklass-kolduna",
        "level": 3,
        "name": "Подкласс колдуна",
        "description": [
          "Вы выбираете подкласс колдуна по своему усмотрению. Подклассы {@b Покровитель Архифея}, {@b Покровитель Небожитель}, {@b Покровитель Исчадие} и {@b Покровитель Великий древний} подробно изложены после списка {@glossary заклинаний|url:spell-phb} этого класса. Подкласс — это специализация, которая предоставляет вам возможности на определённых уровнях колдуна. В ходе дальнейшего развития вы получаете все умения вашего подкласса, которые соответствуют вашему уровню колдуна или ниже."
        ],
        "additional": "",
        "scaling": [
          {
            "level": 6,
            "name": "Умения подкласса",
            "description": [
              "Вы получаете умения подкласса."
            ],
            "additional": "",
            "hideInSubclasses": false
          },
          {
            "level": 10,
            "name": "Умения подкласса",
            "description": [
              "Вы получаете умения подкласса."
            ],
            "additional": "",
            "hideInSubclasses": false
          },
          {
            "level": 14,
            "name": "Умения подкласса",
            "description": [
              "Вы получаете умения подкласса."
            ],
            "additional": "",
            "hideInSubclasses": false
          }
        ],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "uvelicenie-harakteristik",
        "level": 4,
        "name": "Увеличение характеристик",
        "description": [
          "Вы получаете черту {@feat Улучшение характеристик [Ability Score Improvement]|url:ability-score-improvement-phb} (см. главу 5) или другую черту по вашему выбору, требованиям которой вы соответствуете. Вы снова получаете эту способность на уровнях колдуна 8, 12 и 16."
        ],
        "additional": "",
        "scaling": [
          {
            "level": 8,
            "name": "Увеличение характеристик",
            "description": [],
            "additional": "",
            "hideInSubclasses": false
          },
          {
            "level": 12,
            "name": "Увеличение характеристик",
            "description": [],
            "additional": "",
            "hideInSubclasses": false
          },
          {
            "level": 16,
            "name": "Увеличение характеристик",
            "description": [],
            "additional": "",
            "hideInSubclasses": false
          }
        ],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "svaz-s-pokrovitelem",
        "level": 9,
        "name": "Связь с покровителем",
        "description": [
          "Раньше, чтобы связаться со своим покровителем, вам приходилось действовать через посредников. Теперь вы можете связываться с ним напрямую: у вас всегда подготовлено заклинание {@spell Связь с иным планом [Contact Other Plane]|url:contact-other-plane-phb}. Благодаря этому умению вы можете наложить заклинание, не расходуя ячейку {@glossary заклинания|url:spell-phb}, чтобы связаться со своим покровителем, и автоматически преуспеваете в {@glossary спасброске|url:saving-throw-phb} от этого заклинания.",
          "После того как вы наложили заклинание при помощи этого умения, вы не сможете сделать это снова, пока не завершите {@glossary продолжительный отдых|url:long-rest-phb}."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "tainstvennyj-arkanum",
        "level": 11,
        "name": "Таинственный арканум",
        "description": [
          "Ваш покровитель дарует вам магический секрет, называемый арканумом. Выберите 1 заклинание 6 уровня из списка {@glossary заклинаний|url:spell-phb} колдуна в качестве арканума.",
          "Вы можете накладывать это заклинание 1 раз, не расходуя ячейку {@glossary заклинания|url:spell-phb}, и перед тем, как наложить его снова, вы должны завершить {@glossary продолжительный отдых|url:long-rest-phb}.",
          "Как указано в таблице «Умения колдуна», вы получаете на свой выбор ещё по одному заклинанию, которое можно наложить таким образом, когда достигаете 13 (заклинание 7 уровня), 15 (заклинание 8 уровня) и 17 (заклинание 9 уровня) уровней колдуна. По завершении продолжительного отдыха вы восстанавливаете все использованные заклинания Таинственного арканума.",
          "Каждый раз, когда вы получаете уровень колдуна, вы можете заменить одно из своих заклинаний арканума другим заклинанием колдуна того же уровня."
        ],
        "additional": "",
        "scaling": [
          {
            "level": 13,
            "name": "Таинственный арканум (7 уровень)",
            "description": [
              "Вы получаете на свой выбор ещё по одному заклинанию, которое можно наложить таким образом."
            ],
            "additional": "",
            "hideInSubclasses": false
          },
          {
            "level": 15,
            "name": "Таинственный арканум (8 уровень)",
            "description": [
              "Вы получаете на свой выбор ещё по одному заклинанию, которое можно наложить таким образом."
            ],
            "additional": "",
            "hideInSubclasses": false
          },
          {
            "level": 17,
            "name": "Таинственный арканум (9 уровень)",
            "description": [
              "Вы получаете на свой выбор ещё по одному заклинанию, которое можно наложить таким образом."
            ],
            "additional": "",
            "hideInSubclasses": false
          }
        ],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "epiceskaa-certa",
        "level": 19,
        "name": "Эпическая черта",
        "description": [
          "Вы получаете эпическую черту (см. главу 5) или другую черту по вашему выбору, требованиям которой вы соответствуете. Рекомендуется черта {@feat Дар судьбы [Boon of Fate]|url:boon-of-fate-phb}."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "tainstvennyj-master",
        "level": 20,
        "name": "Таинственный мастер",
        "description": [
          "Когда вы используете своё умение Магическая хитрость, то вы восстанавливаете все потраченные ячейки заклинаний Магии договора."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      }
    ],
    "table": [
      {
        "name": "Воззвания",
        "scaling": [
          {
            "level": 1,
            "value": "1"
          },
          {
            "level": 2,
            "value": "3"
          },
          {
            "level": 5,
            "value": "5"
          },
          {
            "level": 7,
            "value": "6"
          },
          {
            "level": 9,
            "value": "7"
          },
          {
            "level": 12,
            "value": "8"
          },
          {
            "level": 15,
            "value": "9"
          },
          {
            "level": 18,
            "value": "10"
          }
        ]
      },
      {
        "name": "Заговоры",
        "scaling": [
          {
            "level": 1,
            "value": "2"
          },
          {
            "level": 4,
            "value": "3"
          },
          {
            "level": 10,
            "value": "4"
          }
        ]
      },
      {
        "name": "Подг. закл.",
        "scaling": [
          {
            "level": 1,
            "value": "2"
          },
          {
            "level": 2,
            "value": "3"
          },
          {
            "level": 3,
            "value": "4"
          },
          {
            "level": 4,
            "value": "5"
          },
          {
            "level": 5,
            "value": "6"
          },
          {
            "level": 6,
            "value": "7"
          },
          {
            "level": 7,
            "value": "8"
          },
          {
            "level": 8,
            "value": "9"
          },
          {
            "level": 9,
            "value": "10"
          },
          {
            "level": 11,
            "value": "11"
          },
          {
            "level": 13,
            "value": "12"
          },
          {
            "level": 15,
            "value": "13"
          },
          {
            "level": 17,
            "value": "14"
          },
          {
            "level": 19,
            "value": "15"
          }
        ]
      }
    ],
    "casterType": "PACT",
    "hasSubclasses": true,
    "name": {
      "rus": "Колдун",
      "eng": "Warlock"
    },
    "source": {
      "name": {
        "label": "PHB",
        "rus": "Книга игрока",
        "eng": "Player Handbook"
      },
      "group": {
        "label": "Basic",
        "rus": "Официальные источники"
      },
      "page": 110
    }
  },
  {
    "url": "monk-phb",
    "gallery": [
      "/s3/classes/peterko/1759866482374-monk2.webp"
    ],
    "image": "/s3/classes/peterko/1759866475729-monk.webp",
    "description": [
      "{@i Мастер боевых искусств со сверхъестественным духом}",
      "Монахи практикуют строгую боевую подготовку и ментальную дисциплину, чтобы привести себя в гармонию со вселенной и сосредоточить свой внутренний потенциал силы. Разные монахи по-разному понимают эту силу: как дыхание, энергию, жизненную силу, эссенцию или «я». Независимо от того, используется ли эта сила для демонстрации боевого мастерства или для более утончённого проявления защиты и скорости, она наполняет всё, что делает монах.",
      "Монахи концентрируют свою внутреннюю силу для создания необычных, даже сверхъестественных эффектов. Они проявляют невероятную скорость и силу в своих атаках, с использованием оружия или без него. В руках монаха даже самое простое оружие может стать совершенным орудием боевого мастерства.",
      "Многие монахи считают, что упорядоченная жизнь в условиях аскетического уединения помогает им развить физическую и умственную сосредоточенность, необходимую для овладения своей силой. Другие монахи верят, что погружение в кипучую суматоху жизни помогает укрепить их решимость и дисциплину.",
      "Монахи, как правило, рассматривают приключения как испытания для своего физического и умственного развития. Они движимы желанием осуществить большую миссию, чем просто убивать монстров и грабить сокровища; они стремятся превратиться в живое оружие.",
      {
        "type": "heading",
        "attrs": {
          "level": "2"
        },
        "content": [
          {
            "type": "text",
            "text": "Становление монахом..."
          }
        ]
      },
      "{@b Как персонаж 2 уровня:}",
      {
        "type": "list",
        "attrs": {
          "type": "unordered"
        },
        "content": [
          "Получите особенности из таблицы «Особенности монаха».",
          "Получите умения монаха 1 уровня, которые перечислены в таблице «Умения монаха»."
        ]
      },
      "{@b Как мультикласс:}",
      {
        "type": "list",
        "attrs": {
          "type": "unordered"
        },
        "content": [
          "Получите кость хитов из таблицы «Особенности монаха».",
          "Получите умения монаха 1 уровня, которые перечислены в таблице «Умения монаха»."
        ]
      }
    ],
    "updatedAt": "2026-01-16T14:22:40.722332Z",
    "userId": "Magistrus",
    "hitDice": {
      "label": "к8",
      "value": "d8",
      "maxValue": 8,
      "avg": 5
    },
    "primaryCharacteristics": "Ловкость или Мудрость",
    "proficiency": {
      "armor": "",
      "weapon": "Простое дальнобойное, Простое рукопашное, воинское оружие, обладающее свойством лёгкое",
      "tool": "Выберите инструменты ремесленника или музыкальный инструмент (см. главу 6)",
      "skill": "Выберите 2 навыка из следующих: Акробатика, Атлетика, История, Проницательность, Религия, Скрытность"
    },
    "equipment": [
      "Выберите один из вариантов:",
      {
        "type": "list",
        "attrs": {
          "type": "unordered"
        },
        "content": [
          "А) {@item копьё|url:spear-phb}, 5 {@item кинжалов|url:dagger-phb}, инструменты ремесленника или {@item музыкальный инструмент|url:musical-instrument-phb}, владение которыми вы выбрали ранее, {@item набор путешественника|url:explorer-s-pack-phb} и 11 зм;",
          "Б) 50 зм."
        ]
      }
    ],
    "savingThrows": "Сила, Ловкость",
    "features": [
      {
        "isSubclass": false,
        "key": "boevye-iskusstva",
        "level": 1,
        "name": "Боевые искусства",
        "description": [
          "Благодаря практике в боевых искусствах вы владеете стилями боя, в которых используются безоружные удары и удары монашеским оружием, а именно:",
          {
            "type": "list",
            "attrs": {
              "type": "unordered"
            },
            "content": [
              "Простое рукопашное оружие",
              "Воинское рукопашное оружие со свойством лёгкое"
            ]
          },
          "Вы получаете следующие эффекты, если вы безоружны или используете только монашеское оружие и не носите доспехи или щит:",
          {
            "type": "list",
            "attrs": {
              "type": "unordered"
            },
            "content": [
              "{@b Бонусный безоружный удар.} Вы можете {@glossary бонусным действием|url:bonus-action-phb} совершить {@glossary безоружный удар|url:unarmed-strike-phb}.",
              "{@b Кость боевых искусств.} Вы можете бросить {@roll 1к6} вместо обычного урона от вашего {@glossary безоружного удара|url:unarmed-strike-phb} или от монашеского оружия. Эта кость меняется по мере повышения уровня монаха, как показано в колонке «Боевые искусства» в таблице «Умения монаха».",
              "{@b Ловкие атаки.} Вы можете использовать свой модификатор Ловкости вместо модификатора Силы для {@glossary бросков атаки|url:attack-roll-phb} и урона от {@glossary безоружных ударов|url:unarmed-strike-phb} и монашеского оружия. Кроме того, когда вы используете {@glossary захват|url:grappling-phb} или {@glossary толчок|url:unarmed-strike-phb} при нанесении безоружного удара, вы можете использовать свой модификатор Ловкости вместо модификатора Силы для определения {@glossary Сл.|url:difficulty-class-phb} {@glossary спасброска|url:saving-throw-phb}."
            ]
          }
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "zasita-bez-dospehov",
        "level": 1,
        "name": "Защита без доспехов",
        "description": [
          "Пока вы не носите доспех или щит, ваш базовый {@glossary КД|url:armor-class-phb} равен 10 + ваши модификаторы Ловкости и Мудрости."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "duh-monaha",
        "level": 2,
        "name": "Дух монаха",
        "description": [
          "Ваша сосредоточенность и боевые навыки позволяют вам найти в себе источник необычайной энергии. Эта энергия представлена очками духа. Ваш уровень монаха определяет количество имеющихся у вас очков, как показано в столбце «Очки духа» в таблице «Умения монаха».",
          "Вы можете использовать эти очки, чтобы улучшить или усилить определённые умения монаха. Вы знаете три таких умения: {@b Шквал ударов}, {@b Терпеливая оборона} и {@b Поступь ветра}, каждая из которых описана ниже.",
          "Когда вы расходуете очки духа, они становятся недоступны до тех пор, пока вы не закончите {@glossary короткий отдых|url:short-rest-phb} или {@glossary продолжительный отдых|url:long-rest-phb}, после чего вы восстанавливаете все потраченные очки духа.",
          "Для некоторых умений, использующих очки духа, требуется, чтобы ваша цель совершила {@glossary спасбросок|url:saving-throw-phb}. {@glossary Сл.|url:difficulty-class-phb} спасброска равна 8 + ваш модификатор Мудрости + ваш {@glossary бонус мастерства|url:proficiency-bonus-phb}.",
          "{@b Шквал ударов.} Вы можете потратить 1 очко духа, чтобы {@glossary бонусным действием|url:bonus-action-phb} совершить два {@glossary безоружных удара|url:unarmed-strike-phb}.",
          "{@b Терпеливая оборона.} Вы можете использовать {@glossary действие|url:action-phb} {@glossary отход|url:disengage-phb} {@glossary бонусным действием|url:bonus-action-phb}. Альтернативно, вы можете потратить 1 очко духа, чтобы одновременно использовать {@glossary отход|url:disengage-phb} и {@glossary уклонение|url:dodge-phb} бонусным действием.",
          "{@b Поступь ветра.} Вы можете использовать {@glossary действие|url:action-phb} {@glossary рывок|url:dash-phb} {@glossary бонусным действием|url:bonus-action-phb}. Альтернативно, вы можете потратить 1 очко духа, чтобы одновременно использовать {@glossary отход|url:disengage-phb} и {@glossary рывок|url:dash-phb} бонусным действием, а расстояние вашего прыжка в этот ход удваивается."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "dvizenie-bez-dospehov",
        "level": 2,
        "name": "Движение без доспехов",
        "description": [
          "Ваша {@glossary скорость|url:speed-phb} увеличивается на 10 фт., пока вы без доспехов или щита. Этот бонус увеличивается, когда вы достигаете определённого уровня монаха, как показано в столбце «Движение без доспехов» таблицы «Умения монаха»."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "neobycnyj-metabolizm",
        "level": 2,
        "name": "Необычный метаболизм",
        "description": [
          "Когда вы совершаете {@glossary бросок инициативы|url:initiative-phb}, вы можете восстановить все потраченные очки духа. Когда вы делаете это, бросьте свою Кость боевых искусств и восстановите количество {@glossary хитов|url:hit-points-phb}, равное вашему уровню монаха + выпавшее число. После того как вы воспользуетесь этим умением, вы не сможете использовать его снова, пока не закончите {@glossary продолжительный отдых|url:long-rest-phb}."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "otrazenie-atak",
        "level": 3,
        "name": "Отражение атак",
        "description": [
          "Когда по вам попадает {@glossary атака|url:attack-phb} и вы получаете дробящий, колющий или рубящий урон, вы можете {@glossary реакцией|url:reaction-phb} уменьшить урон, наносимый вам этой атакой. Уменьшение равно {@roll 1к10} + ваш модификатор Ловкости + ваш уровень монаха.",
          "Если вы уменьшаете урон до 0, вы можете потратить 1 очко духа, чтобы перенаправить часть силы атаки. Если вы делаете это, выберите {@glossary существо|url:creature-phb}, которое вы можете видеть в пределах 5 фт. от себя, если атака была {@i рукопашной}, или {@glossary существо|url:creature-phb}, которое вы можете видеть в пределах 60 фт. от себя и которое не находится за {@glossary полным укрытием|url:cover-phb}, если атака была {@i дальнобойной}. Это существо должно совершить {@glossary спасбросок|url:saving-throw-phb} Ловкости. {@i Провал:} цель получает урон, равный двум броскам вашей Кости боевых искусств + ваш модификатор Ловкости. Урон имеет тот же тип, что и атака, вызвавшая эту {@glossary реакцию|url:reaction-phb}."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "podklass-monaha",
        "level": 3,
        "name": "Подкласс монаха",
        "description": [
          "Вы получаете подкласс монаха по вашему выбору. Подклассы Мастер Милосердия, Мастер Тени, Мастер Стихий и Мастер Открытой ладони подробно описаны после умений этого класса. Подкласс — это специализация, которая предоставляет вам дополнительные возможности на определённых уровнях монаха. По мере повышения уровня вы получаете все умения выбранного подкласса, соответствующие вашему уровню монаха или ниже."
        ],
        "additional": "",
        "scaling": [
          {
            "level": 6,
            "name": "Умение подкласса",
            "description": [
              "Вы получаете умения подкласса."
            ],
            "additional": "",
            "hideInSubclasses": false
          },
          {
            "level": 11,
            "name": "Умение подкласса",
            "description": [
              "Вы получаете умения подкласса."
            ],
            "additional": "",
            "hideInSubclasses": false
          },
          {
            "level": 17,
            "name": "Умение подкласса",
            "description": [
              "Вы получаете умения подкласса."
            ],
            "additional": "",
            "hideInSubclasses": false
          }
        ],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "ulucsenie-harakteristik",
        "level": 4,
        "name": "Улучшение характеристик",
        "description": [
          "Вы получаете черту {@feat Улучшение характеристик|url:ability-score-improvement-phb} (см. главу 5) или другую черту по вашему выбору, требованиям которой вы соответствуете. Вы снова получаете эту способность на уровнях монаха 8, 12 и 16."
        ],
        "additional": "",
        "scaling": [
          {
            "level": 8,
            "name": "Улучшение характеристик",
            "description": [
              "Вы получаете черту {@feat Улучшение характеристик|url:ability-score-improvement-phb} (см. главу 5) или другую черту по вашему выбору, требованиям которой вы соответствуете."
            ],
            "additional": "",
            "hideInSubclasses": false
          },
          {
            "level": 12,
            "name": "Улучшение характеристик",
            "description": [
              "Вы получаете черту {@feat Улучшение характеристик|url:ability-score-improvement-phb} (см. главу 5) или другую черту по вашему выбору, требованиям которой вы соответствуете."
            ],
            "additional": "",
            "hideInSubclasses": false
          },
          {
            "level": 16,
            "name": "Улучшение характеристик",
            "description": [
              "Вы получаете черту {@feat Улучшение характеристик|url:ability-score-improvement-phb} (см. главу 5) или другую черту по вашему выбору, требованиям которой вы соответствуете."
            ],
            "additional": "",
            "hideInSubclasses": false
          }
        ],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "medlennoe-padenie",
        "level": 4,
        "name": "Медленное падение",
        "description": [
          "Вы можете {@glossary реакцией|url:reaction-phb} уменьшить любой урон, получаемый вами от {@glossary падения|url:falling-phb}, на величину, равную вашему уровню монаха, умноженному на 5."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "dopolnitelnaa-ataka",
        "level": 5,
        "name": "Дополнительная атака",
        "description": [
          "Вы можете атаковать дважды вместо одного раза, когда совершаете {@glossary действие|url:action-phb} {@glossary атака|url:attack-phb} в свой ход."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "oselomlausij-udar",
        "level": 5,
        "name": "Ошеломляющий удар",
        "description": [
          "Один раз за ход, когда вы попадаете по {@glossary существу|url:creature-phb} монашеским оружием или {@glossary безоружным ударом|url:unarmed-strike-phb}, вы можете потратить 1 очко духа, чтобы нанести {@b Ошеломляющий удар}. Цель должна совершить {@glossary спасбросок|url:saving-throw-phb} Телосложения. При провале цель получает состояние {@glossary ошеломлённый|url:stunned-phb} до начала вашего следующего хода. При успехе скорость цели уменьшается вдвое до начала вашего следующего хода, и следующий {@glossary бросок атаки|url:attack-roll-phb} по цели совершается с {@glossary преимуществом|url:advantage-phb}."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "usilennye-udary",
        "level": 6,
        "name": "Усиленные удары",
        "description": [
          "Каждый раз, когда вы наносите урон {@glossary безоружным ударом|url:unarmed-strike-phb}, вы можете выбрать тип урона: силовое поле или обычный тип урона этой {@glossary атаки|url:attack-phb}."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "uklonenie",
        "level": 7,
        "name": "Уклонение",
        "description": [
          "Когда вы подвергаетесь эффекту, который позволяет вам совершить {@glossary спасбросок|url:saving-throw-phb} Ловкости, чтобы получить только половину урона, вы вместо этого не получаете урона при успешном спасброске и получаете только половину урона при провале.",
          "Вы не получаете эффекта этой способности, если находитесь в состоянии {@glossary недееспособный|url:incapacitated-phb}."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "akrobaticeskoe-dvizenie",
        "level": 9,
        "name": "Акробатическое движение",
        "description": [
          "Пока вы не носите доспех или щит, вы получаете возможность перемещаться по вертикальным поверхностям и по жидкостям во время своего хода, не падая во время движения."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "vyssij-duh",
        "level": 10,
        "name": "Высший дух",
        "description": [
          "Ваши {@i Шквал ударов}, {@i Терпеливая оборона} и {@i Поступь ветра} получают следующие улучшения:",
          {
            "type": "list",
            "attrs": {
              "type": "unordered"
            },
            "content": [
              "{@b Шквал ударов.} Вы можете потратить 1 очко духа, чтобы использовать {@b Шквал ударов} и совершить три {@glossary безоружных удара|url:unarmed-strike-phb} вместо двух.",
              "{@b Терпеливая оборона.} Когда вы тратите очко духа для использования {@b Терпеливой обороны}, вы получаете количество {@glossary временных хитов|url:temporary-hit-points-phb}, равное двум броскам вашей Кости боевых искусств.",
              "{@b Поступь ветра.} Когда вы тратите очко духа для использования {@b Поступи ветра}, вы можете выбрать согласное {@glossary существо|url:creature-phb} в пределах 5 фт. от вас размером большое или меньше. Вы перемещаете это существо вместе с собой до конца вашего хода. Движение существа не провоцирует {@glossary провоцированные атаки|url:opportunity-attack-phb}."
            ]
          }
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "samovosstanovlenie",
        "level": 10,
        "name": "Самовосстановление",
        "description": [
          "С помощью силы воли вы можете снимать с себя одно из следующих состояний в конце каждого своего хода: {@glossary очарованный|url:charmed-phb}, {@glossary испуганный|url:frightened-phb} или {@glossary отравленный|url:poisoned-phb}.",
          "Кроме того, вы не получаете степени {@glossary истощения|url:exhaustion-phb} при отказе от еды и питья."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "otrazenie-energii",
        "level": 13,
        "name": "Отражение энергии",
        "description": [
          "Теперь вы можете использовать свою способность {@b Отражение атак} против атак, которые наносят любой тип урона, а не только дробящий, колющий или рубящий."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "disciplina-vyzivania",
        "level": 14,
        "name": "Дисциплина выживания",
        "description": [
          "Ваша физическая и умственная дисциплина предоставляет вам владение всеми {@glossary спасбросками|url:saving-throw-phb}.",
          "Кроме того, каждый раз, когда вы совершаете {@glossary спасбросок|url:saving-throw-phb} и проваливаете его, вы можете потратить 1 очко духа, чтобы перебросить результат, но вы обязаны использовать новый результат."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "idealnyj-duh",
        "level": 15,
        "name": "Идеальный дух",
        "description": [
          "Когда вы совершаете {@glossary бросок инициативы|url:initiative-phb} и не используете {@b Необычный метаболизм}, вы восстанавливаете потраченные очки духа до 4, если у вас их 3 или меньше."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "prevoshodnaa-zasita",
        "level": 18,
        "name": "Превосходная защита",
        "description": [
          "В начале вашего хода вы можете потратить 3 очка духа, чтобы стать частично невосприимчивым к урону на 1 минуту или до тех пор, пока у вас не появится состояние {@glossary недееспособный|url:incapacitated-phb}.",
          "В течение этого времени вы получаете {@glossary сопротивление|url:resistance-phb} ко всему урону, кроме урона силовым полем."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "epiceskaa-certa",
        "level": 19,
        "name": "Эпическая черта",
        "description": [
          "Вы получаете  эпическую черту (см. главу 5) или другую черту по вашему выбору, требованиям которой вы соответствуете. Рекомендуется черта {@feat Дар непреодолимого нападения [Boon of Irresistible Offense]|url:boon-of-irresistible-offense-phb}."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "telo-i-razum",
        "level": 20,
        "name": "Тело и разум",
        "description": [
          "Вы развили свое тело и разум до новых высот. Ваши показатели Ловкости и Мудрости увеличиваются на 4, с максимумом 25."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      }
    ],
    "table": [
      {
        "name": "Кость боевых искусств",
        "scaling": [
          {
            "level": 1,
            "value": "1к6"
          },
          {
            "level": 5,
            "value": "1к8"
          },
          {
            "level": 11,
            "value": "1к10"
          },
          {
            "level": 17,
            "value": "1к12"
          }
        ]
      },
      {
        "name": "Очки духа",
        "scaling": [
          {
            "level": 2,
            "value": "2"
          },
          {
            "level": 3,
            "value": "3"
          },
          {
            "level": 4,
            "value": "4"
          },
          {
            "level": 5,
            "value": "5"
          },
          {
            "level": 6,
            "value": "6"
          },
          {
            "level": 7,
            "value": "7"
          },
          {
            "level": 8,
            "value": "8"
          },
          {
            "level": 9,
            "value": "9"
          },
          {
            "level": 10,
            "value": "10"
          },
          {
            "level": 11,
            "value": "11"
          },
          {
            "level": 12,
            "value": "12"
          },
          {
            "level": 13,
            "value": "13"
          },
          {
            "level": 14,
            "value": "14"
          },
          {
            "level": 15,
            "value": "15"
          },
          {
            "level": 16,
            "value": "16"
          },
          {
            "level": 17,
            "value": "17"
          },
          {
            "level": 18,
            "value": "18"
          },
          {
            "level": 19,
            "value": "19"
          },
          {
            "level": 20,
            "value": "20"
          }
        ]
      },
      {
        "name": "Движение без доспехов",
        "scaling": [
          {
            "level": 2,
            "value": "+10 фт."
          },
          {
            "level": 6,
            "value": "+15 фт."
          },
          {
            "level": 10,
            "value": "+20 фт."
          },
          {
            "level": 14,
            "value": "+25 фт"
          },
          {
            "level": 18,
            "value": "+30 фт."
          }
        ]
      }
    ],
    "casterType": "NONE",
    "hasSubclasses": true,
    "name": {
      "rus": "Монах",
      "eng": "Monk"
    },
    "source": {
      "name": {
        "label": "PHB",
        "rus": "Книга игрока",
        "eng": "Player Handbook"
      },
      "group": {
        "label": "Basic",
        "rus": "Официальные источники"
      },
      "page": 121
    }
  },
  {
    "url": "paladin-phb",
    "gallery": [
      "/s3/classes/peterko/1759866530768-paladin2.webp"
    ],
    "image": "/s3/classes/peterko/1759866514374-paladin.webp",
    "description": [
      "{@i Преданный священным клятвам воин}",
      "Паладинов объединяет их клятва противостоять силам разрушения. Она обладает великой силой, принесённая или перед алтарём бога, или на священной поляне перед духами природы, или в минуту отчаяния и горя, когда единственными свидетелями стали мертвецы. Это источник могущества, который превращает набожного воина в благословенного героя.",
      "Паладины тренируются годами, чтобы обучиться навыкам боя, осваивая владение различными видами оружия и доспехами. Тем не менее, их воинские навыки вторичны по сравнению с магической силой, которой они обладают: силой исцелять больных и раненых, карать врагов, защищать беспомощных и тех, кто сражается на их стороне.",
      "Практически по определению жизнь паладина полна приключений, ведь каждый паладин находится на передовой всеобъемлющей борьбы против сил разрушения. Воины и так редкость в армиях мира, но ещё меньше тех, кто достоин назвать себя паладином. Услышав зов, эти благословлённые герои оставляют свои прежние занятия, вооружаются и готовят свою магию.",
      {
        "type": "quote",
        "attrs": {
          "color": "primary",
          "variant": "outline"
        },
        "content": [
          {
            "type": "heading",
            "attrs": {
              "level": "4"
            },
            "content": [
              {
                "type": "text",
                "text": "Нарушение клятвы"
              }
            ]
          },
          {
            "type": "text",
            "text": "Паладин стремится придерживаться высочайших стандартов поведения, но даже самые преданные могут ошибаться. Иногда паладин нарушает свою клятву. Паладин, который нарушил клятву, обычно стремится к искуплению, проводя всю ночь в бдении в знак раскаяния или постясь. После обряда прощения паладин начинает с чистого листа."
          },
          {
            "type": "break"
          },
          {
            "type": "text",
            "text": "Если ваш паладин сознательно и без раскаяния нарушает свою клятву, то обсудите это с вашим Мастером. Возможно, вашему паладину стоит выбрать другой подкласс или даже отказаться от этого класса и выбрать другой."
          }
        ]
      },
      {
        "type": "heading",
        "attrs": {
          "level": "2"
        },
        "content": [
          {
            "type": "text",
            "text": "Становление паладином..."
          }
        ]
      },
      "{@b Как персонаж 1 уровня:}",
      {
        "type": "list",
        "attrs": {
          "type": "unordered"
        },
        "content": [
          "Получите особенности из таблицы «Особенности паладина».",
          "Получите умения паладина 1 уровня, которые перечислены в таблице «Умения паладина»."
        ]
      },
      "{@b Как мультикласс:}",
      {
        "type": "list",
        "attrs": {
          "type": "unordered"
        },
        "content": [
          "Получите следующие особенности из таблицы «Особенности паладина»: кость хитов, владение воинским оружием, владение лёгкими и средними доспехами и щитами.",
          "Получите умения паладина 1 уровня, которые перечислены в таблице «Умения паладина». См. правила мультиклассирования в главе 2, чтобы определить доступные ячейки заклинаний."
        ]
      },
      {
        "type": "heading",
        "attrs": {
          "level": "2"
        },
        "content": [
          {
            "type": "text",
            "text": "Список заклинаний паладина"
          }
        ]
      },
      "Этот раздел представляет список заклинаний паладина. Заклинания организованы по уровням и отсортированы в алфавитном порядке, при этом указана школа магии каждого заклинания.{@br}В колонке {@b «Особое»}: {@b К} означает, что заклинание требует Концентрации; {@b Р} — что это Ритуал; {@b М} — что для него требуется Материальный компонент.",
      {
        "type": "table",
        "caption": "Заклинания паладина 1 уровня",
        "colLabels": [
          "Заклинание",
          "Школа",
          "Особое"
        ],
        "colStyles": [
          "w-2/5 text-left",
          "w-1/3 text-left",
          "w-1/4 text-center"
        ],
        "rows": [
          [
            "{@spell Благословение [Bless]|url:bless-phb}",
            "Очарование",
            "К, М"
          ],
          [
            "{@spell Божественная кара [Divine Smite]|url:divine-smite-phb}",
            "Воплощение",
            "—"
          ],
          [
            "{@spell Божественное благоволение [Divine Favor]|url:divine-favor-phb}",
            "Преобразование",
            "—"
          ],
          [
            "{@spell Вызов на дуэль [Compelled Duel]|url:compelled-duel-phb}",
            "Очарование",
            "К"
          ],
          [
            "{@spell Героизм [Heroism]|url:heroism-phb}",
            "Очарование",
            "К"
          ],
          [
            "{@spell Гневная кара [Wrathful Smite]|url:wrathful-smite-phb}",
            "Некромантия",
            "—"
          ],
          [
            "{@spell Громовая кара [Thunderous Smite]|url:thunderous-smite-phb}",
            "Воплощение",
            "—"
          ],
          [
            "{@spell Защита от зла и добра [Protection from Evil and Good]|url:protection-from-evil-and-good-phb}",
            "Ограждение",
            "К, М"
          ],
          [
            "{@spell Лечение ран [Cure Wounds]|url:cure-wounds-phb}",
            "Ограждение",
            "—"
          ],
          [
            "{@spell Обнаружение добра и зла [Detect Evil and Good]|url:detect-evil-and-good-phb}",
            "Прорицание",
            "К"
          ],
          [
            "{@spell Обнаружение магии [Detect Magic]|url:detect-magic-phb}",
            "Прорицание",
            "К, Р"
          ],
          [
            "{@spell Обнаружение болезней и яда [Detect Poison and Disease]|url:detect-poison-and-disease-phb}",
            "Прорицание",
            "К, Р"
          ],
          [
            "{@spell Очищение пищи и питья [Purify Food and Drink]|url:purify-food-and-drink-phb}",
            "Преобразование",
            "Р"
          ],
          [
            "{@spell Палящая кара [Searing Smite]|url:searing-smite-phb}",
            "Воплощение",
            "—"
          ],
          [
            "{@spell Приказ [Command]|url:command-phb}",
            "Очарование",
            "—"
          ],
          [
            "{@spell Щит веры [Shield of Faith]|url:shield-of-faith-phb}",
            "Ограждение",
            "К"
          ]
        ]
      },
      {
        "type": "table",
        "caption": "Заклинания паладина 2 уровня",
        "colLabels": [
          "Заклинание",
          "Школа",
          "Особое"
        ],
        "colStyles": [
          "w-2/5 text-left",
          "w-1/3 text-left",
          "w-1/4 text-center"
        ],
        "rows": [
          [
            "{@spell Защита от яда [Protection from Poison]|url:protection-from-poison-phb}",
            "Ограждение",
            "—"
          ],
          [
            "{@spell Магическое оружие [Magic Weapon]|url:magic-weapon-phb}",
            "Преобразование",
            "—"
          ],
          [
            "{@spell Малое восстановление [Lesser Restoration]|url:lesser-restoration-phb}",
            "Ограждение",
            "—"
          ],
          [
            "{@spell Молебен лечения [Prayer of Healing]|url:prayer-of-healing-phb}",
            "Ограждение",
            "—"
          ],
          [
            "{@spell Нетленные останки [Gentle Repose]|url:gentle-repose-phb}",
            "Некромантия",
            "Р, М"
          ],
          [
            "{@spell Область истины [Zone of Truth]|url:zone-of-truth-phb}",
            "Очарование",
            "—"
          ],
          [
            "{@spell Охраняющая связь [Warding Bond]|url:warding-bond-phb}",
            "Ограждение",
            "М"
          ],
          [
            "{@spell Подмога [Aid]|url:aid-phb}",
            "Ограждение",
            "—"
          ],
          [
            "{@spell Поиск объекта [Locate Object]|url:locate-object-phb}",
            "Прорицание",
            "К"
          ],
          [
            "{@spell Поиск скакуна [Find Steed]|url:find-steed-phb}",
            "Вызов",
            "—"
          ],
          [
            "{@spell Сияющая кара [Branding Smite]|url:branding-smite-phb}",
            "Преобразование",
            "К"
          ]
        ]
      },
      {
        "type": "table",
        "caption": "Заклинания паладина 3 уровня",
        "colLabels": [
          "Заклинание",
          "Школа",
          "Особое"
        ],
        "colStyles": [
          "w-2/5 text-left",
          "w-1/3 text-left",
          "w-1/4 text-center"
        ],
        "rows": [
          [
            "{@spell Аура живучести [Aura of Vitality]|url:aura-of-vitality-phb}",
            "Ограждение",
            "К"
          ],
          [
            "{@spell Ослепляющая кара [Blinding Smite]|url:blinding-smite-phb}",
            "Воплощение",
            "—"
          ],
          [
            "{@spell Сотворение пищи и воды [Create Food and Water]|url:create-food-and-water-phb}",
            "Вызов",
            "—"
          ],
          [
            "{@spell Мантия крестоносца [Crusader's Mantle]|url:crusader-s-mantle-phb}",
            "Преобразование",
            "К"
          ],
          [
            "{@spell Дневной свет [Daylight]|url:daylight-phb}",
            "Воплощение",
            "—"
          ],
          [
            "{@spell Рассеивание магии [Dispel Magic]|url:dispel-magic-phb}",
            "Ограждение",
            "—"
          ],
          [
            "{@spell Стихийное оружие [Elemental Weapon]|url:elemental-weapon-phb}",
            "Преобразование",
            "К"
          ],
          [
            "{@spell Магический круг [Magic Circle]|url:magic-circle-phb}",
            "Ограждение",
            "М"
          ],
          [
            "{@spell Снятие проклятья [Remove Curse]|url:remove-curse-phb}",
            "Ограждение",
            "—"
          ],
          [
            "{@spell Низшее воскрешение [Revivify]|url:revivify-phb}",
            "Некромантия",
            "М"
          ]
        ]
      },
      {
        "type": "table",
        "caption": "Заклинания паладина 4 уровня",
        "colLabels": [
          "Заклинание",
          "Школа",
          "Особое"
        ],
        "colStyles": [
          "w-2/5 text-left",
          "w-1/3 text-left",
          "w-1/4 text-center"
        ],
        "rows": [
          [
            "{@spell Аура жизни [Aura of Life]|url:aura-of-life-phb}",
            "Ограждение",
            "К"
          ],
          [
            "{@spell Аура очищения [Aura of Purity]|url:aura-of-purity-phb}",
            "Ограждение",
            "К"
          ],
          [
            "{@spell Изгнание [Banishment]|url:banishment-phb}",
            "Ограждение",
            "К"
          ],
          [
            "{@spell Защита от смерти [Death Ward]|url:death-ward-phb}",
            "Ограждение",
            "—"
          ],
          [
            "{@spell Поиск существа [Locate Creature]|url:locate-creature-phb}",
            "Прорицание",
            "К"
          ],
          [
            "{@spell Оглушающая кара [Staggering Smite]|url:staggering-smite-phb}",
            "Очарование",
            "—"
          ]
        ]
      },
      {
        "type": "table",
        "caption": "Заклинания паладина 5 уровня",
        "colLabels": [
          "Заклинание",
          "Школа",
          "Особое"
        ],
        "colStyles": [
          "w-2/5 text-left",
          "w-1/3 text-left",
          "w-1/4 text-center"
        ],
        "rows": [
          [
            "{@spell Воскрешение [Raise Dead]|url:raise-dead-phb}",
            "Некромантия",
            "М"
          ],
          [
            "{@spell Высшее восстановление [Greater Restoration]|url:greater-restoration-phb}",
            "Ограждение",
            "М"
          ],
          [
            "{@spell Изгоняющая кара [Banishing Smite]|url:banishing-smite-phb}",
            "Вызов",
            "К"
          ],
          [
            "{@spell Круг силы [Circle of Power]|url:circle-of-power-phb}",
            "Ограждение",
            "К"
          ],
          [
            "{@spell Обет [Geas]|url:geas-phb}",
            "Очарование",
            "—"
          ],
          [
            "{@spell Призыв духа небожителя [Summon Celestial]|url:summon-celestial-phb}",
            "Вызов",
            "К, М"
          ],
          [
            "{@spell Разрушительная волна [Destructive Wave]|url:destructive-wave-phb}",
            "Воплощение",
            "—"
          ],
          [
            "{@spell Рассеивание добра и зла [Dispel Evil and Good]|url:dispel-evil-and-good-phb}",
            "Ограждение",
            "К"
          ]
        ]
      },
      {
        "type": "heading",
        "attrs": {
          "level": "1"
        },
        "content": [
          {
            "type": "text",
            "text": "Список заклинаний следопыта"
          }
        ]
      },
      "В этом разделе представлен список заклинаний следопыта. Заклинания отсортированы по уровню и алфавиту, а также указана школа магии каждого заклинания.{@br}В столбце {@b «Спец.» (Специальное)}: {@b К} означает, что заклинание требует концентрации; {@b Р} — что это ритуал; {@b М} — что требуется материальный компонент.",
      {
        "type": "table",
        "caption": "Заклинания следопыта 1 уровня",
        "colLabels": [
          "Заклинание",
          "Школа",
          "Спец."
        ],
        "colStyles": [
          "w-2/5 text-left",
          "w-1/3 text-left",
          "w-1/4 text-center"
        ],
        "rows": [
          [
            "{@spell Град шипов [Hail of Thorns]|url:hail-of-thorns-phb}",
            "Вызов",
            "—"
          ],
          [
            "{@spell Дружба с животными [Animal Friendship]|url:animal-friendship-phb}",
            "Очарование",
            "—"
          ],
          [
            "{@spell Лечение ран [Cure Wounds]|url:cure-wounds-phb}",
            "Ограждение",
            "—"
          ],
          [
            "{@spell Метка охотника [Hunter's Mark]|url:hunters-mark-phb}",
            "Прорицание",
            "К"
          ],
          [
            "{@spell Обнаружение болезней и яда [Detect Poison and Disease]|url:detect-poison-and-disease-phb}",
            "Прорицание",
            "К, Р"
          ],
          [
            "{@spell Обнаружение магии [Detect Magic]|url:detect-magic-phb}",
            "Прорицание",
            "К, Р"
          ],
          [
            "{@spell Опутывание [Entangle]|url:entangle-phb}",
            "Вызов",
            "К"
          ],
          [
            "{@spell Опутывающий удар [Ensnaring Strike]|url:ensnaring-strike-phb}",
            "Вызов",
            "К"
          ],
          [
            "{@spell Прыжок [Jump]|url:jump-phb}",
            "Преобразование",
            "—"
          ],
          [
            "{@spell Разговор с животными [Speak with Animals]|url:speak-with-animals-phb}",
            "Прорицание",
            "Р"
          ],
          [
            "{@spell Сигнал тревоги [Alarm]|url:alarm-phb}",
            "Ограждение",
            "Р"
          ],
          [
            "{@spell Скороход [Longstrider]|url:longstrider-phb}",
            "Преобразование",
            "—"
          ],
          [
            "{@spell Туманное облако [Fog Cloud]|url:fog-cloud-phb}",
            "Вызов",
            "К"
          ],
          [
            "{@spell Чудо-ягоды [Goodberry]|url:goodberry-phb}",
            "Вызов",
            "—"
          ]
        ]
      },
      {
        "type": "table",
        "caption": "Заклинания следопыта 2 уровня",
        "colLabels": [
          "Заклинание",
          "Школа",
          "Спец."
        ],
        "colStyles": [
          "w-2/5 text-left",
          "w-1/3 text-left",
          "w-1/4 text-center"
        ],
        "rows": [
          [
            "{@spell Бесследное передвижение [Pass without Trace]|url:pass-without-trace-phb}",
            "Ограждение",
            "К"
          ],
          [
            "{@spell Дубовая кожа [Barkskin]|url:barkskin-phb}",
            "Преобразование",
            "—"
          ],
          [
            "{@spell Животные чувства [Beast Sense]|url:beast-sense-phb}",
            "Прорицание",
            "К, Р"
          ],
          [
            "{@spell Завеса стрел [Protection from Arrows]|url:protection-from-arrows-phb}",
            "Преобразование",
            "—"
          ],
          [
            "{@spell Защита от яда [Protection from Poison]|url:protection-from-poison-phb}",
            "Ограждение",
            "—"
          ],
          [
            "{@spell Магическое оружие [Magic Weapon]|url:magic-weapon-phb}",
            "Преобразование",
            "—"
          ],
          [
            "{@spell Малое восстановление [Lesser Restoration]|url:lesser-restoration-phb}",
            "Ограждение",
            "—"
          ],
          [
            "{@spell Подмога [Aid]|url:aid-phb}",
            "Ограждение",
            "—"
          ],
          [
            "{@spell Поиск животных или растений [Locate Animals or Plants]|url:locate-animals-or-plants-phb}",
            "Прорицание",
            "Р"
          ],
          [
            "{@spell Поиск ловушек [Find Traps]|url:find-traps-phb}",
            "Прорицание",
            "—"
          ],
          [
            "{@spell Поиск объекта [Locate Object]|url:locate-object-phb}",
            "Прорицание",
            "К"
          ],
          [
            "{@spell Порыв ветра [Gust of Wind]|url:gust-of-wind-phb}",
            "Воплощение",
            "К"
          ],
          [
            "{@spell Почтовое животное [Animal Messenger]|url:animal-messenger-phb}",
            "Очарование",
            "Р"
          ],
          [
            "{@spell Призыв духа зверя [Summon Beast]|url:summon-beast-tce}",
            "Вызов",
            "К, М"
          ],
          [
            "{@spell Тёмное зрение [Darkvision]|url:darkvision-phb}",
            "Преобразование",
            "—"
          ],
          [
            "{@spell Тишина [Silence]|url:silence-phb}",
            "Иллюзия",
            "К, Р"
          ],
          [
            "{@spell Улучшение характеристики [Enhance Ability]|url:enhance-ability-phb}",
            "Преобразование",
            "К"
          ],
          [
            "{@spell Шипастая поросль [Spike Growth]|url:spike-growth-phb}",
            "Преобразование",
            "К"
          ]
        ]
      },
      {
        "type": "table",
        "caption": "Заклинания следопыта 3 уровня",
        "colLabels": [
          "Заклинание",
          "Школа",
          "Спец."
        ],
        "colStyles": [
          "w-2/5 text-left",
          "w-1/3 text-left",
          "w-1/4 text-center"
        ],
        "rows": [
          [
            "{@spell Низшее воскрешение [Revivify]|url:revivify-phb}",
            "Некромантия",
            "М"
          ],
          [
            "{@spell Вызов животных [Conjure Animals]|url:conjure-animals-phb}",
            "Вызов",
            "К"
          ],
          [
            "{@spell Вызов шквала снарядов [Conjure Barrage]|url:conjure-barrage-phb}",
            "Вызов",
            "—"
          ],
          [
            "{@spell Дневной свет [Daylight]|url:daylight-phb}",
            "Воплощение",
            "—"
          ],
          [
            "{@spell Защита от энергии [Protection from Energy]|url:protection-from-energy-phb}",
            "Ограждение",
            "К"
          ],
          [
            "{@spell Стрела-молния [Lightning Arrow]|url:lightning-arrow-phb}",
            "Преобразование",
            "—"
          ],
          [
            "{@spell Необнаружимость [Nondetection]|url:nondetection-phb}",
            "Ограждение",
            "М"
          ],
          [
            "{@spell Подводное дыхание [Water Breathing]|url:water-breathing-phb}",
            "Преобразование",
            "Р"
          ],
          [
            "{@spell Призыв духа феи [Summon Fey]|url:summon-fey-tce}",
            "Вызов",
            "К, М"
          ],
          [
            "{@spell Разговор с растениями [Speak with Plants]|url:speak-with-plants-phb}",
            "Преобразование",
            "—"
          ],
          [
            "{@spell Рассеивание магии [Dispel Magic]|url:dispel-magic-phb}",
            "Ограждение",
            "—"
          ],
          [
            "{@spell Рост растений [Plant Growth]|url:plant-growth-phb}",
            "Преобразование",
            "—"
          ],
          [
            "{@spell Слияние с камнем [Meld into Stone]|url:meld-into-stone-phb}",
            "Преобразование",
            "Р"
          ],
          [
            "{@spell Стена ветра [Wind Wall]|url:wind-wall-phb}",
            "Воплощение",
            "К"
          ],
          [
            "{@spell Стихийное оружие [Elemental Weapon]|url:elemental-weapon-phb}",
            "Преобразование",
            "К"
          ],
          [
            "{@spell Хождение по воде [Water Walk]|url:water-walk-phb}",
            "Преобразование",
            "Р"
          ]
        ]
      },
      {
        "type": "table",
        "caption": "Заклинания следопыта 4 уровня",
        "colLabels": [
          "Заклинание",
          "Школа",
          "Спец."
        ],
        "colStyles": [
          "w-2/5 text-left",
          "w-1/3 text-left",
          "w-1/4 text-center"
        ],
        "rows": [
          [
            "{@spell Вызов лесных обитателей [Conjure Woodland Beings]|url:conjure-woodland-beings-phb}",
            "Вызов",
            "К"
          ],
          [
            "{@spell Каменная кожа [Stoneskin]|url:stoneskin-phb}",
            "Преобразование",
            "К, М"
          ],
          [
            "{@spell Подчинение зверя [Dominate Beast]|url:dominate-beast-phb}",
            "Очарование",
            "К"
          ],
          [
            "{@spell Поиск существа [Locate Creature]|url:locate-creature-phb}",
            "Прорицание",
            "К"
          ],
          [
            "{@spell Призыв духа элементаля [Summon Elemental]|url:summon-elemental-tce}",
            "Вызов",
            "К, М"
          ],
          [
            "{@spell Свобода перемещения [Freedom of Movement]|url:freedom-of-movement-phb}",
            "Ограждение",
            "—"
          ],
          [
            "{@spell Цепкая лоза [Grasping Vine]|url:grasping-vine-phb}",
            "Вызов",
            "К"
          ]
        ]
      },
      {
        "type": "table",
        "caption": "Заклинания следопыта 5 уровня",
        "colLabels": [
          "Заклинание",
          "Школа",
          "Спец."
        ],
        "colStyles": [
          "w-2/5 text-left",
          "w-1/3 text-left",
          "w-1/4 text-center"
        ],
        "rows": [
          [
            "{@spell Быстрый колчан [Swift Quiver]|url:swift-quiver-phb}",
            "Преобразование",
            "К, М"
          ],
          [
            "{@spell Вызов залпа [Conjure Volley]|url:conjure-volley-phb}",
            "Вызов",
            "—"
          ],
          [
            "{@spell Высшее восстановление [Greater Restoration]|url:greater-restoration-phb}",
            "Ограждение",
            "М"
          ],
          [
            "{@spell Древесный путь [Tree Stride]|url:tree-stride-phb}",
            "Вызов",
            "К"
          ],
          [
            "{@spell Общение с природой [Commune with Nature]|url:commune-with-nature-phb}",
            "Прорицание",
            "Р"
          ],
          [
            "{@spell Удар стального ветра [Steel Wind Strike]|url:steel-wind-strike-phb}",
            "Вызов",
            "М"
          ]
        ]
      }
    ],
    "updatedAt": "2026-01-16T14:25:08.463274Z",
    "userId": "Magistrus",
    "hitDice": {
      "label": "к10",
      "value": "d10",
      "maxValue": 10,
      "avg": 6
    },
    "primaryCharacteristics": "Сила или Харизма",
    "proficiency": {
      "armor": "Щит, Средний доспех, Тяжелый доспех, Легкий доспех",
      "weapon": "Простое дальнобойное, Воинское рукопашное, Воинское дальнобойное, Простое рукопашное",
      "tool": "",
      "skill": "Выберите 2 навыка из следующих: Атлетика, Проницательность, Запугивание, Медицина, Убеждение, Религия"
    },
    "equipment": [
      "Выберите один из вариантов:",
      {
        "type": "list",
        "attrs": {
          "type": "unordered"
        },
        "content": [
          "А) {@item кольчуга|url:chain-mail-phb}, {@item щит|url:shield-phb}, {@item длинный меч|url:longsword-phb}, 6 {@item метательных копий|url:javelin-phb}, {@item священный символ|url:holy-symbol-phb}, {@item набор священника|url:priest-s-pack-phb} и 9 зм;",
          "Б) 150 зм."
        ]
      }
    ],
    "savingThrows": "Мудрость, Харизма",
    "features": [
      {
        "isSubclass": false,
        "key": "vozlozenie-ruk",
        "level": 1,
        "name": "Возложение рук",
        "description": [
          "Ваше благословенное касание может лечить раны. У вас есть запас целительной силы, который восстанавливается после завершения {@glossary продолжительного отдыха|url:long-rest-phb}. При помощи этого запаса вы можете восстанавливать количество {@glossary хитов|url:hit-points-phb}, равное вашему уровню паладина, умноженному на 5.",
          "{@glossary Бонусным действием|url:bonus-action-phb} вы можете коснуться {@glossary существа|url:creature-phb} (включая себя) и направить часть запаса целительной силы на восстановление хитов этому существу, вплоть до максимума оставшихся в запасе очков.",
          "Альтернативно, вы можете потратить 5 хитов из вашего запаса целительной силы, чтобы снять с цели состояние {@glossary отравленный|url:poisoned-phb}; этот альтернативный эффект не восстанавливает хиты существу."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "ispolzovanie-zaklinanij",
        "level": 1,
        "name": "Использование заклинаний",
        "description": [
          "Вы научились накладывать {@glossary заклинания|url:spell-phb} через молитвы и медитацию. Правила наложения заклинаний см. в главе 7. Ниже подробно описано, как применять эти правила к заклинаниям паладина, которые перечислены в списке заклинаний паладина далее в описании класса.",
          "{@b Ячейки заклинаний.} Таблица «Умения паладина» показывает, сколько ячеек заклинаний вы можете использовать для заклинаний 1+ уровня. Вы восстанавливаете все потраченные ячейки, когда заканчиваете {@glossary продолжительный отдых|url:long-rest-phb}.",
          "{@b Подготовленные заклинания 1+ уровня.} Вы подготавливаете список заклинаний 1+ уровня, которые доступны вам для использования с помощью этого умения. Для начала выберите 2 заклинания 1 уровня из списка заклинаний паладина. Рекомендуемые: {@spell Палящее кара [Searing Smite]|url:searing-smite-phb} и {@spell Героизм [Heroism]|url:heroism-phb}.",
          "Количество подготовленных заклинаний в вашем списке увеличивается по мере того, как вы получаете уровни паладина, как указано в столбце «Подг. закл.» таблицы «Умения паладина». Каждый раз, когда это число увеличивается, выберите дополнительные заклинания из списка заклинаний паладина, чтобы общее количество соответствовало значению в таблице. Выбранные заклинания должны быть того уровня, для которого у вас есть ячейка заклинаний.",
          "Например, если вы паладин 5 уровня, то ваш список подготовленных заклинаний может включать 6 заклинаний паладина 1 и 2 уровней в любой комбинации.",
          "Если другое умение паладина даёт вам всегда подготовленные заклинания, то эти заклинания не учитываются в количестве заклинаний, которые вы можете подготовить с помощью этого умения, но в остальном они считаются заклинаниями паладина для вас.",
          "{@b Изменение подготовленных заклинаний.} Каждый раз, когда вы заканчиваете {@glossary продолжительный отдых|url:long-rest-phb}, вы можете заменить одно заклинание из вашего списка на другое заклинание из списка заклинаний паладина, для которого у вас имеется ячейка заклинания.",
          "{@b Заклинательная характеристика.} Харизма является вашей {@glossary заклинательной характеристикой|url:spellcasting-ability-phb} для заклинаний паладина.",
          "{@b Заклинательная фокусировка.} В качестве {@glossary заклинательной фокусировки|url:spellcasting-focus-phb} для ваших заклинаний паладина вы можете использовать {@glossary священный символ|url:holy-symbol-phb}."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "oruzejnye-priemy",
        "level": 1,
        "name": "Оружейные приёмы",
        "description": [
          "Ваша тренировка с оружием позволяет вам использовать оружейные приёмы двух типов оружия, которыми вы {@glossary владеете|url:proficiency-phb}, например, длинного меча и метательных копий.",
          "Каждый раз, когда вы заканчиваете {@glossary продолжительный отдых|url:long-rest-phb}, вы можете поменять выбранные типы оружия. Например, вы можете начать использовать приёмы алебард и цепов."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "boevoj-stil",
        "level": 2,
        "name": "Боевой стиль",
        "description": [
          "Вы получаетечерту боевого стиля по вашему выбору (см. главу 5). Вместо выбора одной из доступных черт вы можете выбрать вариант ниже.",
          "{@b Благословлённый воин.} Вы изучаете два {@glossary заговора|url:cantrip-phb} жреца на свой выбор (см. описание класса жреца для списка заклинаний жреца). Рекомендуемые: {@spell Наставление [Guidance]|url:guidance-phb} и {@spell Священное пламя [Sacred Flame]|url:sacred-flame-phb}. Выбранные заговоры считаются {@glossary заклинаниями|url:spell-phb} паладина для вас, и Харизма является вашей {@glossary заклинательной характеристикой|url:spellcasting-ability-phb} для них. Когда вы получаете уровень паладина, вы можете заменить один из этих заговоров на другой заговор жреца."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "udar-paladina",
        "level": 2,
        "name": "Удар паладина",
        "description": [
          "У вас всегда подготовлено заклинание {@spell Божественная кара [Divine Smite]|url:divine-smite-phb}. Вы можете использовать его без траты ячейки {@glossary заклинаний|url:spell-phb}, но после этого вы должны завершить {@glossary продолжительный отдых|url:long-rest-phb}, прежде чем сможете использовать его таким образом снова."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "bozestvennyj-kanal",
        "level": 3,
        "name": "Божественный канал",
        "description": [
          "Вы можете направлять божественную энергию непосредственно из внешних планов для подпитки магических эффектов. Вы начинаете с одним таким эффектом — {@b Божественное чувство}, описанным ниже. Другие умения паладина дают дополнительные эффекты {@b Божественного канала}. Когда вы используете Божественный канал, вы выбираете, какой эффект создать.",
          "Вы можете использовать {@i Божественный канал} этого класса дважды. Вы восстанавливаете одно использование, когда заканчиваете {@glossary короткий отдых|url:short-rest-phb}, и все использования, когда заканчиваете {@glossary продолжительный отдых|url:long-rest-phb}. Вы получаете дополнительные использования, когда достигаете 11 уровня паладина.",
          "Если эффект Божественного канала требует {@glossary спасбросок|url:saving-throw-phb}, то его {@glossary Сл.|url:difficulty-class-phb} равна Сл. для спасброска против ваших {@glossary заклинаний|url:spell-phb}.",
          "{@b Божественное чувство.} {@glossary Бонусным действием|url:bonus-action-phb} вы можете открыть своё сознание, чтобы обнаружить небожителей, исчадий и нежить. В течение следующих 10 минут или до того, как вы получите состояние {@glossary недееспособный|url:incapacitated-phb}, вы знаете местоположение любого {@glossary существа|url:creature-phb} этих типов в радиусе 60 фт. от вас, а также тип этого существа. В пределах того же радиуса вы также ощущаете присутствие любого места или {@glossary объекта|url:object-phb}, который был освящён или осквернён, как при действии заклинания {@spell Святилище [Hallow]|url:hallow-phb}."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "podklass-paladina",
        "level": 3,
        "name": "Подкласс паладина",
        "description": [
          "Вы получаете подкласс паладина по вашему выбору. Подклассы Клятвы Преданности, Клятвы Славы, Клятвы Древних и Клятвы Мести подробно описаны после списка заклинаний этого класса. Подкласс — это специализация, которая предоставляет вам дополнительные возможности на определённых уровнях паладина. По мере повышения уровня вы получаете все умения выбранного подкласса, соответствующие вашему уровню паладина или ниже."
        ],
        "additional": "",
        "scaling": [
          {
            "level": 7,
            "name": "Умение подкласса",
            "description": [
              "Вы получаете умения подкласса."
            ],
            "additional": "",
            "hideInSubclasses": false
          },
          {
            "level": 15,
            "name": "Умение подкласса",
            "description": [
              "Вы получаете умения подкласса."
            ],
            "additional": "",
            "hideInSubclasses": false
          },
          {
            "level": 20,
            "name": "Умение подкласса",
            "description": [
              "Вы получаете умения подкласса."
            ],
            "additional": "",
            "hideInSubclasses": false
          }
        ],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "ulucsenie-harakteristik",
        "level": 4,
        "name": "Улучшение характеристик",
        "description": [
          "Вы получаете черту {@feat Улучшение характеристик [Ability Score Improvement]|url:ability-score-improvement-phb} (см. главу 5) или другую {@feat черту|url:feats-phb} по вашему выбору, требованиям которой вы соответствуете. Вы снова получаете эту способность на уровнях паладина 8, 12 и 16."
        ],
        "additional": "",
        "scaling": [
          {
            "level": 8,
            "name": "Улучшение характеристик",
            "description": [
              "Вы получаете черту {@feat Улучшение характеристик [Ability Score Improvement]|url:ability-score-improvement-phb} (см. главу 5) или другую {@feat черту|url:feats-phb} по вашему выбору, требованиям которой вы соответствуете."
            ],
            "additional": "",
            "hideInSubclasses": false
          },
          {
            "level": 12,
            "name": "Улучшение характеристик",
            "description": [
              "Вы получаете черту {@feat Улучшение характеристик [Ability Score Improvement]|url:ability-score-improvement-phb} (см. главу 5) или другую {@feat черту|url:feats-phb} по вашему выбору, требованиям которой вы соответствуете."
            ],
            "additional": "",
            "hideInSubclasses": false
          },
          {
            "level": 16,
            "name": "Улучшение характеристик",
            "description": [
              "Вы получаете черту {@feat Улучшение характеристик [Ability Score Improvement]|url:ability-score-improvement-phb} (см. главу 5) или другую {@feat черту|url:feats-phb} по вашему выбору, требованиям которой вы соответствуете."
            ],
            "additional": "",
            "hideInSubclasses": false
          }
        ],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "dopolnitelnaa-ataka",
        "level": 5,
        "name": "Дополнительная атака",
        "description": [
          "Вы можете атаковать дважды вместо одного раза, когда совершаете {@glossary действие|url:action-phb} {@glossary атака|url:attack-phb} в свой ход."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "vernyj-skakun",
        "level": 5,
        "name": "Верный скакун",
        "description": [
          "Вы можете призвать на помощь потустороннего скакуна. У вас всегда подготовлено заклинание {@spell Поиск скакуна [Find Steed]|url:find-steed-phb}.",
          "Вы также можете один раз сотворить это заклинание, не расходуя ячейку {@glossary заклинаний|url:spell-phb}, и снова получить такую возможность после завершения {@glossary продолжительного отдыха|url:long-rest-phb}."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "aura-zasity",
        "level": 6,
        "name": "Аура защиты",
        "description": [
          "Вы излучаете защитную невидимую ауру — {@glossary эманацию|url:emanation-phb} радиусом 10 фт., исходящую от вас. Аура неактивна, если вы находитесь в состоянии {@glossary недееспособный|url:incapacitated-phb}.",
          "Вы и дружественные {@glossary существа|url:creature-phb} в пределах ауры получаете бонус к {@glossary спасброскам|url:saving-throw-phb}, равный вашему модификатору Харизмы (минимальный бонус +1).",
          "Если рядом находится другой паладин, существо может получать пользу только от одной {@b Ауры защиты} за раз; существо само выбирает, от какой ауры получать защиту."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "izgnanie-vragov",
        "level": 9,
        "name": "Изгнание врагов",
        "description": [
          "Действием {@glossary магия|url:magic-phb} вы можете потратить одно использование {@b Божественного канала} паладина, чтобы поразить врагов благоговением. Демонстрируя свой {@glossary священный символ|url:holy-symbol-phb} или оружие, вы выбираете количество {@glossary существ|url:creature-phb}, равное вашему модификатору Харизмы (минимум 1 существо), которых вы видите в пределах 60 фт. от себя. Каждая цель должна преуспеть в {@glossary спасброске|url:saving-throw-phb} Мудрости или получить состояние {@glossary испуганный|url:frightened-phb} на 1 минуту или до получения любого урона. Пока существо находится в состоянии испуганный от этого умения, оно может совершать только одно из следующих в свой ход: {@glossary перемещение|url:movement-phb}, {@glossary действие|url:action-phb} или {@glossary бонусное действие|url:bonus-action-phb}."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "aura-otvagi",
        "level": 10,
        "name": "Аура отваги",
        "description": [
          "Вы и ваши союзники получаете иммунитет к состоянию {@glossary испуганный|url:frightened-phb}, находясь в вашей {@b Ауре защиты}.",
          "Если испуганный союзник входит в вашу {@glossary эманацию|url:emanation-phb}, это состояние не оказывает на него эффекта, пока он находится в пределах эманации."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "siausie-udary",
        "level": 11,
        "name": "Сияющие удары",
        "description": [
          "Ваши удары теперь обладают сверхъестественной силой. Когда вы попадаете по цели {@glossary броском атаки|url:attack-roll-phb} с использованием {@i рукопашного оружия} или {@glossary безоружного удара|url:unarmed-strike-phb}, цель получает дополнительно {@roll 1к8} урона излучением."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "iscelausee-prikosnovenie",
        "level": 14,
        "name": "Исцеляющее прикосновение",
        "description": [
          "Когда вы используете {@i Возложение рук} на {@glossary существе|url:creature-phb}, вы также можете снять одно или несколько из следующих состояний: {@glossary ослеплённый|url:blinded-phb}, {@glossary очарованный|url:charmed-phb}, {@glossary оглохший|url:deafened-phb}, {@glossary испуганный|url:frightened-phb}, {@glossary парализованный|url:paralyzed-phb} или {@glossary ошеломлённый|url:stunned-phb}.",
          "Для каждого состояния, которое вы снимаете, вам нужно потратить 5 хитов из вашего запаса {@i Возложения рук}; это действие не восстанавливает хиты существу."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "rassirenie-aury",
        "level": 18,
        "name": "Расширение ауры",
        "description": [
          "Ваша {@i Аура защиты} теперь представляет собой {@glossary эманацию|url:emanation-phb} радиусом 30 фт."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "epiceskaa-certa",
        "level": 19,
        "name": "Эпическая черта",
        "description": [
          "Вы получаете эпическую черту (см. главу 5) или другую черту по вашему выбору, требованиям которой вы соответствуете. Рекомендуется черта {@feat Дар истинного зрения [Boon of True Sight]|url:boon-of-truesight-phb}."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      }
    ],
    "table": [
      {
        "name": "Бож. канал",
        "scaling": [
          {
            "level": 3,
            "value": "2"
          },
          {
            "level": 11,
            "value": "3"
          }
        ]
      },
      {
        "name": "Подг. закл.",
        "scaling": [
          {
            "level": 1,
            "value": "2"
          },
          {
            "level": 2,
            "value": "3"
          },
          {
            "level": 3,
            "value": "4"
          },
          {
            "level": 4,
            "value": "5"
          },
          {
            "level": 5,
            "value": "6"
          },
          {
            "level": 7,
            "value": "7"
          },
          {
            "level": 9,
            "value": "9"
          },
          {
            "level": 11,
            "value": "10"
          },
          {
            "level": 13,
            "value": "11"
          },
          {
            "level": 15,
            "value": "12"
          },
          {
            "level": 17,
            "value": "14"
          },
          {
            "level": 19,
            "value": "15"
          }
        ]
      }
    ],
    "casterType": "HALF",
    "hasSubclasses": true,
    "name": {
      "rus": "Паладин",
      "eng": "Paladin"
    },
    "source": {
      "name": {
        "label": "PHB",
        "rus": "Книга игрока",
        "eng": "Player Handbook"
      },
      "group": {
        "label": "Basic",
        "rus": "Официальные источники"
      },
      "page": 129
    }
  },
  {
    "url": "rogue-phb",
    "gallery": [
      "/s3/classes/peterko/1759866564472-rogue2.webp",
      "/s3/classes/magistrus/1759906945890-rogue2.webp"
    ],
    "image": "/s3/classes/peterko/1759866557029-rogue.webp",
    "description": [
      "{@i Ловкий эксперт в скрытности и уловках}",
      "Плуты полагаются на хитрость, скрытность и уязвимые места врагов, чтобы взять верх в любой ситуации. Они могут выбраться почти из любой передряги, а некоторые даже обучаются магическим трюкам в дополнение к остальным способностям.",
      "Многие плуты сосредотачиваются на скрытности и обмане, в то время как другие совершенствуют навыки, помогающие им в подземельях, такие как лазание, вскрытие замков, поиск и обезвреживание ловушек.",
      "В бою плуты предпочитают коварную атаку, а не грубую силу. Они скорее совершат один меткий выпад, нежели будут выматывать противника чередой ударов.",
      "Путь некоторых плутов начинался с преступности, в то время как другие боролись с нею, полагаясь на свою хитрость. Как бы плут ни относился к законам, ни одному заурядному преступнику или блюстителю порядка не сравниться с величайшими плутами в искусстве быть незаметными.",
      {
        "type": "heading",
        "attrs": {
          "level": "2"
        },
        "content": [
          {
            "type": "text",
            "text": "Становление плутом…"
          }
        ]
      },
      "{@b Как персонаж 1 уровня:}",
      {
        "type": "list",
        "attrs": {
          "type": "unordered"
        },
        "content": [
          "Получите особенности из таблицы «Особенности плута».",
          "Получите умения плута 1 уровня, которые перечислены в таблице «Умения плута»."
        ]
      },
      "{@b Как мультикласс:}",
      {
        "type": "list",
        "attrs": {
          "type": "unordered"
        },
        "content": [
          "Получите следующие особенности из таблицы «Особенности плута»: кость хитов, владение одним навыком на выбор из списка навыков плута, владение воровскими инструментами и лёгкими доспехами.",
          "Получите умения плута 1 уровня, которые перечислены в таблице «Умения плута»."
        ]
      }
    ],
    "updatedAt": "2026-01-16T10:37:08.174684Z",
    "userId": "Magistrus",
    "hitDice": {
      "label": "к8",
      "value": "d8",
      "maxValue": 8,
      "avg": 5
    },
    "primaryCharacteristics": "Ловкость",
    "proficiency": {
      "armor": "Легкий доспех",
      "weapon": "Простое дальнобойное, Простое рукопашное, воинское оружие со свойством фехтовальное или лёгкое",
      "tool": "Воровские инструменты",
      "skill": "Выберите 4 навыка из следующих: Акробатика, Атлетика, Обман, Проницательность, Запугивание, Анализ, Внимательность, Убеждение, Ловкость рук, Скрытность"
    },
    "equipment": [
      "Выберите А или Б:",
      {
        "type": "list",
        "attrs": {
          "type": "unordered"
        },
        "content": [
          "А) {@item кожаный доспех|url:leather-armor-phb}, 2 {@item кинжала|url:dagger-phb}, {@item короткий меч|url:shortsword-phb}, {@item короткий лук|url:shortbow-phb}, 20 {@item стрел|url:arrow-phb}, {@item колчан|url:quiver-phb}, {@item воровские инструменты|url:thieves-tools-phb}, {@item набор взломщика|url:burglar-s-pack-phb} и 8 зм;",
          "Б) 100 зм."
        ]
      }
    ],
    "savingThrows": "Ловкость, Интеллект",
    "features": [
      {
        "isSubclass": false,
        "key": "kompetentnost",
        "level": 1,
        "name": "Компетентность",
        "description": [
          "Вы получаете {@glossary компетентность|url:expertise-phb} для 2 навыков на выбор из тех, которыми вы владеете. Рекомендуется выбрать Ловкость рук и Скрытность, если вы ими владеете.",
          "На 6 уровне плута вы получаете {@glossary компетентность|url:expertise-phb} для ещё 2 навыков на выбор из тех, которыми вы владеете."
        ],
        "additional": "",
        "scaling": [
          {
            "level": 6,
            "name": "Компетентность",
            "description": [
              "На 6 уровне плута вы получаете {@glossary компетентность|url:expertise-phb} для ещё 2 навыков на выбор из тех, которыми вы владеете."
            ],
            "additional": "",
            "hideInSubclasses": false
          }
        ],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "skrytaa-ataka",
        "level": 1,
        "name": "Скрытая атака",
        "description": [
          "Вы знаете, как ударить противника исподтишка, пока он отвлечён. Один раз в ход вы можете нанести дополнительно {@roll 1к6} урона одному {@glossary существу|url:creature-phb}, по которому вы попали атакой, совершённой с {@glossary преимуществом|url:advantage-phb}. Атака должна использовать дальнобойное оружие или оружие со свойством {@glossary фехтовальное|url:finesse-phb}. Тип дополнительного урона совпадает с типом урона используемого оружия.",
          "Вам не нужно иметь {@glossary преимущество|url:advantage-phb} при {@glossary броске атаки|url:attack-roll-phb}, если в пределах 5 фт. от цели находится по крайней мере один ваш {@glossary союзник|url:ally-phb}. Этот союзник не должен быть в состоянии {@glossary недееспособный|url:incapacitated-phb}, и у вас не должно быть {@glossary помехи|url:disadvantage-phb} для этого броска атаки.",
          "Дополнительный урон увеличивается с получением уровней {@glossary плута|url:rogue-phb}, как показано в столбце «Скрытая атака» из таблицы «Умения плута»."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "vorovskoj-zargon",
        "level": 1,
        "name": "Воровской жаргон",
        "description": [
          "Вы обучились различным языкам в общинах, где промышляли своими плутовскими талантами. Вы знаете воровской жаргон и ещё один язык на выбор из таблиц языков в главе 2."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "oruzejnye-priemy",
        "level": 1,
        "name": "Оружейные приёмы",
        "description": [
          "Ваша тренировка с оружием позволяет вам использовать оружейные приёмы 2 типов оружия из тех, которыми вы владеете. Например, для кинжалов и коротких луков.",
          "Когда вы заканчиваете {@glossary продолжительный отдых|url:long-rest-phb}, вы можете поменять типы оружия. Например, вы можете перейти на использование оружейных приёмов скимитаров и коротких мечей."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "hitroe-dejstvie",
        "level": 2,
        "name": "Хитрое действие",
        "description": [
          "Ваша сообразительность и ловкость позволяют двигаться и действовать быстро.",
          "В свой ход {@glossary бонусным действием|url:bonus-action-phb} вы можете совершить одно из следующих {@glossary действий|url:action-phb}: {@glossary рывок|url:dash-phb}, {@glossary отход|url:disengage-phb} или {@glossary засада|url:hide-phb}."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "podklass-pluta",
        "level": 3,
        "name": "Подкласс плута",
        "description": [
          "Вы получаете подкласс плута по вашему выбору. Подклассы Мистический ловкач, Убийца, Клинок души и Вор подробно изложены после умений этого класса. Подкласс — это специализация, которая предоставляет вам возможности на определённых уровнях плута. В ходе дальнейшего развития вы получаете каждое умение вашего подкласса, которое соответствует вашему уровню плута или ниже."
        ],
        "additional": "",
        "scaling": [
          {
            "level": 9,
            "name": "Умение подкласса",
            "description": [
              "Вы получаете умения подкласса."
            ],
            "additional": "",
            "hideInSubclasses": false
          },
          {
            "level": 13,
            "name": "Умение подкласса",
            "description": [
              "Вы получаете умения подкласса."
            ],
            "additional": "",
            "hideInSubclasses": false
          },
          {
            "level": 17,
            "name": "Умение подкласса",
            "description": [
              "Вы получаете умения подкласса."
            ],
            "additional": "",
            "hideInSubclasses": false
          }
        ],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "tocnoe-pricelivanie",
        "level": 3,
        "name": "Точное прицеливание",
        "description": [
          "{@glossary Бонусным действием|url:bonus-action-phb} вы можете дать себе {@glossary преимущество|url:advantage-phb} на следующий {@glossary бросок атаки|url:attack-roll-phb} в текущий ход. Вы можете использовать это {@glossary бонусное действие|url:bonus-action-phb} только если в этот ход вы не двигались, и после использования этого умения ваша {@glossary скорость|url:speed-phb} становится равна 0 до конца текущего хода."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "ulucsenie-harakteristik",
        "level": 4,
        "name": "Улучшение характеристик",
        "description": [
          "Вы получаете {@feat Улучшение характеристик [Ability Score Improvement]|url:ability-score-improvement-phb} (см. главу 5) или другую черту по вашему выбору, требованиям которой вы соответствуете. Вы снова получаете эту способность на уровнях плута 8, 10, 12 и 16."
        ],
        "additional": "",
        "scaling": [
          {
            "level": 8,
            "name": "Улучшение характеристик",
            "description": [
              "Вы получаете {@feat Улучшение характеристик [Ability Score Improvement]|url:ability-score-improvement-phb} (см. главу 5) или другую черту по вашему выбору, требованиям которой вы соответствуете."
            ],
            "additional": "",
            "hideInSubclasses": false
          },
          {
            "level": 10,
            "name": "Улучшение характеристик",
            "description": [
              "Вы получаете {@feat Улучшение характеристик [Ability Score Improvement]|url:ability-score-improvement-phb} (см. главу 5) или другую {@feat черту|url:feat-phb} по вашему выбору, требованиям которой вы соответствуете."
            ],
            "additional": "",
            "hideInSubclasses": false
          },
          {
            "level": 12,
            "name": "Улучшение характеристик",
            "description": [
              "Вы получаете {@feat Улучшение характеристик [Ability Score Improvement]|url:ability-score-improvement-phb} (см. главу 5) или другую {@feat черту|url:feat-phb} по вашему выбору, требованиям которой вы соответствуете."
            ],
            "additional": "",
            "hideInSubclasses": false
          },
          {
            "level": 16,
            "name": "Улучшение характеристик",
            "description": [
              "Вы получаете черту {@feat Улучшение характеристик [Ability Score Improvement]|url:ability-score-improvement-phb} (см. главу 5) или другую черту по вашему выбору, требованиям которой вы соответствуете."
            ],
            "additional": "",
            "hideInSubclasses": false
          }
        ],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "hitryj-udar",
        "level": 5,
        "name": "Хитрый удар",
        "description": [
          "Вы открываете для себя хитрые способы использования Скрытой атаки. Когда вы наносите урон от Скрытой атаки, вы можете добавить к нему один из следующих эффектов Хитрого удара.",
          "Использование каждого эффекта стоит определённого количества костей — чтобы наложить эффект, вы должны отказаться от указанного количества костей урона, наносимого Скрытой атакой. Вы убираете кость перед броском, и эффект срабатывает сразу после нанесения урона атакой. Например, если вы добавляете эффект Отравить, то для просчёта урона от Скрытой атаки вы бросаете на {@roll 1к6} меньше.",
          "Если эффект Хитрого удара требует совершить {@glossary спасбросок|url:saving-throw-phb}, то его {@glossary Сл.|url:difficulty-class-phb} равна 8 + ваш модификатор Ловкости + ваш бонус мастерства.",
          "{@b Отравить (стоимость: {@roll 1к6}).} Вы наносите усиленный ядом удар, вынуждая цель совершить {@glossary спасбросок|url:saving-throw-phb} Телосложения. Если {@glossary спасбросок|url:saving-throw-phb} провален, цель получает состояние {@glossary отравленный|url:poisoned-phb} на 1 минуту. В конце каждого своего хода отравленная цель повторяет {@glossary спасбросок|url:saving-throw-phb} и в случае успеха эффект заканчивается. Чтобы использовать этот эффект, вы должны иметь при себе набор отравителя.",
          "{@b Повалить (стоимость: {@roll 1к6}).} Если цель является {@glossary существом|url:creature-phb} размера большой или меньше, она должна совершить {@glossary спасбросок|url:saving-throw-phb} Ловкости, получая состояние {@glossary лежащий ничком|url:prone-phb} в случае провала.",
          "{@b Отступить (стоимость: {@roll 1к6}).} Сразу после атаки вы можете переместиться вплоть до половины своей {@glossary скорости|url:speed-phb}, не {@glossary провоцируя атаки|url:opportunity-attack-phb}."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "neveroatnoe-uklonenie",
        "level": 5,
        "name": "Невероятное уклонение",
        "description": [
          "Когда нападающий, которого вы можете видеть, попадает по вам {@glossary атакой|url:attack-phb}, вы можете {@glossary реакцией|url:reaction-phb} уменьшить вдвое урон (округляя в меньшую сторону), наносимый вам этой атакой."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "uvertlivost",
        "level": 7,
        "name": "Увёртливость",
        "description": [
          "Вы можете ловко отскочить в сторону от некоторых угроз. Когда вы попадаете под действие {@glossary магического эффекта|url:magical-effect-phb} или другого источника, который позволяет вам совершить {@glossary спасбросок|url:saving-throw-phb} Ловкости, чтобы получить только половину урона, вы вместо этого не получаете урона вовсе при успешном {@glossary спасброске|url:saving-throw-phb} и только половину урона при провале. Вы не можете использовать это умение, находясь в состоянии {@glossary недееспособный|url:incapacitated-phb}."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "nadeznyj-talant",
        "level": 7,
        "name": "Надежный талант",
        "description": [
          "Каждый раз, когда вы совершаете {@glossary проверку характеристики|url:ability-check-phb}, использующую одно из ваших владений инструментом или навыком, если на к20 выпадает 9 или меньше, вы можете считать, что выпало 10."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "ulucsennyj-hitryj-udar",
        "level": 11,
        "name": "Улучшенный хитрый удар",
        "description": [
          "Вы можете использовать до двух эффектов Хитрого удара при нанесении урона от Скрытой атаки, отказываясь от костей для каждого эффекта."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "kovarnye-udary",
        "level": 14,
        "name": "Коварные удары",
        "description": [
          "Вы отточили новые способы коварного использования вашей {@i Скрытой атаки}. Теперь в число опций вашего {@i Хитрого удара} входят следующие эффекты:",
          "{@b Оглушить (стоимость: {@roll 2к6}).} Цель должна совершить {@glossary спасбросок|url:saving-throw-phb} Телосложения. В случае провала в её следующий ход ей доступно лишь одно из следующего: {@glossary перемещение|url:move-phb}, {@glossary действие|url:action-phb} или {@glossary бонусное действие|url:bonus-action-phb}.",
          "{@b Вырубить (стоимость: {@roll 6к6}).} Цель должна совершить {@glossary спасбросок|url:saving-throw-phb} Телосложения. В случае провала она получает состояние {@glossary без сознания|url:unconscious-phb} на 1 минуту или до тех пор, пока не получит урон. Цель в состоянии {@glossary без сознания|url:unconscious-phb} повторяет {@glossary спасбросок|url:saving-throw-phb} в конце каждого своего хода, избавляясь от эффекта при успехе.",
          "{@b Ослепить (стоимость: {@roll 3к6}).} Цель должна совершить {@glossary спасбросок|url:saving-throw-phb} Ловкости. В случае провала она получает состояние {@glossary ослеплённый|url:blinded-phb} до конца своего следующего хода."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "skolzkij-um",
        "level": 15,
        "name": "Скользкий ум",
        "description": [
          "Ваш хитрый разум чрезвычайно сложно контролировать. Вы получаете {@glossary владение|url:proficiency-phb} {@glossary спасбросками|url:saving-throw-phb} Мудрости и Харизмы."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "neulovimyj",
        "level": 18,
        "name": "Неуловимый",
        "description": [
          "Вы настолько увёртливы, что противнику крайне редко удаётся взять над вами верх. Никакие {@glossary броски атаки|url:attack-roll-phb} по вам не могут получить {@glossary преимущество|url:advantage-phb}, пока вы не находитесь в состоянии {@glossary недееспособный|url:incapacitated-phb}."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "epiceskaa-certa",
        "level": 19,
        "name": "Эпическая черта",
        "description": [
          "Вы получаете эпическую черту (см. главу 5) или другую черту по вашему выбору, требованиям которой вы соответствуете. Рекомендуется черта {@feat Дар духа ночи [Boon of the Night Spirit]|url:boon-of-the-night-spirit-phb}."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "udaca",
        "level": 20,
        "name": "Удача",
        "description": [
          "Вы получаете изумительный дар преуспевать, когда это вам необходимо. Если вы провалили {@glossary тест к20|url:d20-test-phb}, вы можете изменить полученный результат на «20».",
          "Использовав это умение, вы не можете использовать его повторно, пока не завершите {@glossary короткий отдых|url:short-rest-phb} или {@glossary продолжительный отдых|url:long-rest-phb}."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      }
    ],
    "table": [
      {
        "name": "Скрытая атака",
        "scaling": [
          {
            "level": 1,
            "value": "1к6"
          },
          {
            "level": 3,
            "value": "2к6"
          },
          {
            "level": 5,
            "value": "3к6"
          },
          {
            "level": 7,
            "value": "4к6"
          },
          {
            "level": 9,
            "value": "5к6"
          },
          {
            "level": 11,
            "value": "6к6"
          },
          {
            "level": 13,
            "value": "7к6"
          },
          {
            "level": 15,
            "value": "8к6"
          },
          {
            "level": 17,
            "value": "9к6"
          },
          {
            "level": 19,
            "value": "10к6"
          }
        ]
      }
    ],
    "casterType": "NONE",
    "hasSubclasses": true,
    "name": {
      "rus": "Плут",
      "eng": "Rogue"
    },
    "source": {
      "name": {
        "label": "PHB",
        "rus": "Книга игрока",
        "eng": "Player Handbook"
      },
      "group": {
        "label": "Basic",
        "rus": "Официальные источники"
      },
      "page": 137
    }
  },
  {
    "url": "psion-uapu",
    "gallery": [
      "/s3/classes/peterko/1760680785860-dnd-psion-playtest.webp"
    ],
    "image": "/s3/classes/peterko/1760680782276-psion-3.webp",
    "description": [
      "{@i Мастер псионической силы.} Псионики плетут магию и сверхъестественные силы с помощью разума. Они развивают свой интеллект как источник силы, который проявляется в виде заклинаний и становится могущественнее по мере их карьеры приключенца. Всё необходимое для игры этими психоническими силами вы найдёте в следующих разделах.",
      {
        "type": "heading",
        "attrs": {
          "level": "2"
        },
        "content": [
          {
            "type": "text",
            "text": "Становление псиоником..."
          }
        ]
      },
      "{@b Как персонаж 1 уровня}",
      {
        "type": "list",
        "attrs": {
          "type": "unordered"
        },
        "content": [
          "Получите особенности из таблицы «Особенности псионика».",
          "Получите умения псионика 1 уровня, которые перечислены в таблице «Умения псионика»."
        ]
      },
      "{@b Как мультикласс}",
      {
        "type": "list",
        "attrs": {
          "type": "unordered"
        },
        "content": [
          "Получите кость хитов из таблицы «Особенности псионика».",
          "Получите умения псионика 1 уровня, которые перечислены в таблице «Умения псионика».",
          "См. правила мультиклассирования в Книге игрока, чтобы определить доступные ячейки {@glossary заклинаний|url:spell-phb}, добавляя все уровни псионика."
        ]
      }
    ],
    "updatedAt": "2025-12-12T12:42:13.487300Z",
    "userId": "Magistrus",
    "hitDice": {
      "label": "к6",
      "value": "d6",
      "maxValue": 6,
      "avg": 4
    },
    "primaryCharacteristics": "Интеллект",
    "proficiency": {
      "armor": "",
      "weapon": "Простое дальнобойное, Простое рукопашное",
      "tool": "",
      "skill": "Выберите 2 навыка из следующих: Аркана, Проницательность, Запугивание, Анализ, Медицина, Внимательность, Убеждение"
    },
    "equipment": [
      "Выберите один вариант:",
      {
        "type": "list",
        "attrs": {
          "type": "unordered"
        },
        "content": [
          "А) {@item Копьё|url:spear-phb}, 2 {@item Кинжал|url:dagger-phb}, {@item Лёгкий арбалет|url:light-crossbow-phb}, 20 {@item Болт|url:bolt-phb}, {@item Футляр|url:case-crossbow-bolt-phb}, {@item Набор исследователя подземелий|url:dungeoneer-s-pack-phb} и 6 зм.",
          "Б) 50 зм."
        ]
      }
    ],
    "savingThrows": "Мудрость, Интеллект",
    "features": [
      {
        "isSubclass": false,
        "key": "ispolzovanie-zaklinanij",
        "level": 1,
        "name": "Использование заклинаний",
        "description": [
          "Вы научились направлять {@glossary магическую энергию|url:magic-phb} с помощью силы разума. Правила наложения заклинаний см. в Книге игрока. Ниже подробно описано, как применять эти правила к заклинаниям псионика, которые будут перечислены в списке заклинаний псионика далее в описании класса.",
          "{@b Заговоры.} Вы знаете 2 заговора по вашему выбору из списка заклинаний псионика. Рекомендуются: {@spell Малая иллюзия [Minor Illusion]|url:minor-illusion-phb} и {@spell Ментальный бросок [Telekinetic Fling]|url:telekinetic-fling-uapu}.",
          "Каждый раз, когда вы получаете уровень псионика, вы можете заменить 1 из ваших заговоров другим заговором по вашему выбору из списка заклинаний псионика.",
          "При достижении 4 и 10 уровней псионика вы изучаете дополнительный заговор по вашему выбору из списка заклинаний псионика, как показано в столбце «Заг.» из таблицы «Умения псионика».",
          "{@b Ячейки заклинаний.} Таблица «Умения псионика» показывает, сколько ячеек заклинаний вы можете использовать для заклинаний 1+ уровня. Вы восстанавливаете все потраченные ячейки, когда заканчиваете {@glossary продолжительный отдых|url:long-rest-phb}.",
          "{@b Подготовленные заклинания 1+ уровня.} Вы подготавливаете список заклинаний 1+ уровня, которые доступны вам для накладывания с помощью этого умения. Для начала выберите 4 заклинания 1 уровня из списка заклинаний псионика. Рекомендуются: {@spell Очарование личности [Charm Person]|url:charm-person-phb}, {@spell Приказ [Command]|url:command-phb}, {@spell Диссонирующий шёпот [Dissonant Whispers]|url:dissonant-whispers-phb} и {@spell Доспехи мага [Mage Armor]|url:mage-armor-phb}.",
          "Количество подготовленных заклинаний увеличивается по мере того, как вы получаете уровни псионика, как показано в столбце «Подг. закл.» из таблицы «Умения псионика».",
          "Каждый раз, когда это число увеличивается, выберите дополнительные заклинания из списка заклинаний псионика, чтобы количество заклинаний вашего списка соответствовало значению в таблице «Умения псионика». Выбранные заклинания должны быть того уровня, для которого у вас есть ячейка заклинаний.",
          "Например, если вы псионик 3 уровня, то ваш список подготовленных заклинаний может включать 6 заклинаний псионика 1 и 2 уровней в любой комбинации.",
          "Если другое умение псионика даёт вам всегда подготовленные заклинания, то эти заклинания не учитываются в количестве заклинаний, которые вы можете подготовить с помощью этого умения, но в остальном они считаются заклинаниями псионика для вас.",
          "{@b Изменение подготовленных заклинаний.} Каждый раз, когда вы получаете уровень псионика, вы можете изменить одно заклинание в вашем списке подготовленных заклинаний на другое заклинание псионика, для которого у вас имеется ячейка заклинаний.",
          "{@b Заклинательная характеристика.} Интеллект — это ваша заклинательная характеристика для ваших заклинаний псионика.",
          "{@b Псионическое наложение заклинаний.} Когда вы накладываете заклинание псионика, оно не требует вербального или материального компонента, даже если в описании компонентов указаны «В» или «М», за исключением тех материальных компонентов, которые расходуются или имеют указанную стоимость."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "psioniceskaa-sila",
        "level": 1,
        "name": "Псионическая сила",
        "description": [
          "В вас скрыт источник псионической энергии. Эта энергия представлена вашими {@b псионическими костями}. Ваш уровень псионика определяет размер кости и количество псионических костей, как указано в столбце «Псион. кости» таблицы «Умения псионика».",
          "Ваши псионические кости применяются для усиления или активации определённых умений псионика. Вы начинаете с двух таких умений: {@b Телекинетический толчок} и {@b Телепатическая связь}, каждая из которых описана ниже. Некоторые из ваших умений расходуют псионические кости, как указано в описании умения. Вы не можете применять такое умение, если у вас не осталось псионических костей.",
          "Вы восстанавливаете 1 потраченную псионическую кость после короткого отдыха и все после {@glossary продолжительный отдых|url:long-rest-phb}.",
          "Некоторые умения, применяющие псионические кости, требуют, чтобы цель совершила {@glossary спасбросок|url:saving-throw-phb}. Сложность {@glossary спасброска|url:saving-throw-phb} равна {@glossary Сл.|url:difficulty-class-phb} спасброска {@glossary заклинания|url:spell-phb} из умения «{@b Использование заклинаний}» этого класса.",
          "{@b Телекинетический толчок.} {@glossary Бонусным действием|url:bonus-action-phb} вы выбираете одно видимое {@glossary существо|url:creature-phb} с размером большой или меньше в пределах 30 футов, кроме вас. Цель должна преуспеть в {@glossary спасброске|url:saving-throw-phb} Силы или будет оттолкнута или притянута (на ваш выбор) на 5 футов.",
          "Альтернативно вы можете бросить одну псионическую кость при совершении этого {@glossary бонусного действия|url:bonus-action-phb}. В этом случае расстояние изменяется на количество футов, равное 5 × выпавшее число. Кость расходуется только если цель провалит {@glossary спасбросок|url:saving-throw-phb}.",
          "{@b Телепатическая связь.} Вы обладаете {@glossary телепатией|url:telepathy-phb} с радиусом 30 футов. {@glossary Бонусным действием|url:bonus-action-phb} вы можете потратить 1 псионическую кость и бросить её. В течение следующего часа ваша {@glossary телепатия|url:telepathy-phb} увеличивается на количество футов, равное 10 × выпавшее число.",
          "В первый раз, когда вы совершаете это {@glossary бонусное действие|url:bonus-action-phb} после {@glossary продолжительный отдых|url:long-rest-phb}, псионическая кость не расходуется. Все последующие применения этого умения требуют траты кости."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "tonkij-telekinez",
        "level": 1,
        "name": "Тонкий телекинез",
        "description": [
          "Вы знаете заговор {@spell Волшебная рука [Mage Hand]|url:mage-hand-phb}. Вы можете накладывать его без соматических компонентов, и вы можете сделать волшебную руку невидимой при наложении."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "psioniceskaa-disciplina",
        "level": 2,
        "name": "Псионическая дисциплина",
        "description": [
          "Вы изучаете дополнительные {@b псионические дисциплины}, подпитываемые вашими псионическими костями. Вы получаете 2 дисциплины на ваш выбор, такие как {@b Расширенное восприятие} и {@b Шёпот подсознанию}. Дисциплины описаны в разделе «{@b Варианты псионических дисциплин}» позже в описании этого класса.",
          "Вы можете применять только одну дисциплину за ход и только один раз за ход, если не указано иное в описании конкретной дисциплины.",
          "Каждый раз, когда вы получаете уровень псионика, вы можете заменить 1 из своих дисциплин на дисциплину, которую вы не знаете.",
          "Вы получаете один дополнительный вариант на 5, 10, 13 и 17 уровнях псионика.",
          "{@b Варианты псионических дисциплин}",
          "{@b Обратная биосвязь.}{@br}Когда вы накладываете {@glossary заклинание|url:spell-phb} псионика школы некромантии или преобразования, вы можете потратить количество псионических костей, не превышающее ваш модификатор Интеллекта, бросить их и получить количество {@glossary временных хитов|url:temporary-hit-points-phb}, равное сумме бросков + ваш модификатор Интеллекта (минимум 1).",
          "{@b Разрушительные мысли.}{@br}Когда вы накладываете {@glossary заклинание|url:spell-phb} псионика школы вызова или воплощения, которое вынуждает видимое вами {@glossary существо|url:creature-phb} совершить {@glossary спасбросок|url:saving-throw-phb}, вы можете потратить количество псионических костей, не превышающее ваш модификатор Интеллекта, и бросить их. Цель получает урон психической энергией, равный сумме бросков + ваш модификатор Интеллекта (минимум 1), независимо от результата {@glossary спасброска|url:saving-throw-phb}.",
          "{@b Дьявольский язык.}{@br}Когда вы выполняете {@glossary действие|url:action-phb} влияние, вы можете бросить 1 псионическую кость и прибавить результат к проверке характеристики. Если это приводит к успеху в проверке, кость считается потраченной.",
          "{@b Расширенное восприятие.}{@br}Когда вы совершаете {@glossary действие|url:action-phb} поиск, вы можете бросить 1 псионическую кость и прибавить результат к проверке характеристики. Если это приводит к успеху в проверке, кость считается потраченной.",
          "{@b Шёпот подсознанию.}{@br}Когда вы накладываете {@glossary заклинание|url:spell-phb} псионика школы очарования или иллюзии, которое вынуждает {@glossary существо|url:creature-phb} совершить {@glossary спасбросок|url:saving-throw-phb}, вы можете потратить 1 псионическую кость и бросить её. Одна видимая цель {@glossary заклинания|url:spell-phb} вычитает выпавшее число из своего {@glossary спасброска|url:saving-throw-phb} против этого {@glossary заклинания|url:spell-phb}.",
          "{@b Безошибочное прицеливание.}{@br}Когда вы совершаете {@glossary бросок атаки|url:attack-roll-phb} по {@glossary существу|url:creature-phb} и промахиваетесь, вы можете бросить 1 псионическую кость и добавить выпавшее число к броску атаки, что может превратить промах в {@glossary попадание|url:hit-phb}. Если атака попадает, кость считается потраченной.",
          "{@b Псионический ответ.}{@br}Сразу после того, как видимое {@glossary существо|url:creature-phb} попадает по вам с {@glossary броском атаки|url:attack-roll-phb}, вы можете {@glossary реакцией|url:reaction-phb} потратить 1 псионическую кость, бросить её и уменьшить полученный урон на значение, равное удвоенному результату + ваш модификатор Интеллекта. Кроме того, вы можете заставить нападающего совершить {@glossary спасбросок|url:saving-throw-phb} Мудрости. При провале цель получает урон психической энергией, равный количеству сниженного урона.",
          "{@b Псионическое ограждение.}{@br}В начале своего {@glossary хода|url:turn-phb} вы можете потратить 1 псионическую кость. До начала вашего следующего {@glossary хода|url:turn-phb} вы получаете иммунитет к состояниям {@glossary очарованный|url:charmed-phb} и {@glossary испуганный|url:frightened-phb}, а также {@glossary преимущество|url:advantage-phb} на {@glossary спасброски|url:saving-throw-phb} Интеллекта. Если в момент применения этой дисциплины вы очарованы или испуганы, эти состояния прекращаются.",
          "Когда вы применяете {@b Псионическое ограждение}, вы также можете применить другую псионическую дисциплину в этот {@glossary ход|url:turn-phb}.",
          "{@b Укрепляющее предвидение.}{@br}Когда вы накладываете {@glossary заклинание|url:spell-phb} псионика школы ограждения или прорицания, вы можете потратить 1 псионическую кость. Бросьте кость и выберите {@glossary существо|url:creature-phb}, которое вы видите в пределах 60 футов (включая себя). До конца вашего следующего {@glossary хода|url:turn-phb} это {@glossary существо|url:creature-phb} получает бонус к следующему броску к20, равный результату броска.",
          "{@b Наблюдающий разум.}{@br}Когда вы выполняете {@glossary действие|url:action-phb} изучение, вы можете бросить 1 псионическую кость и прибавить результат к проверке характеристики. Если это приводит к успеху в проверке, кость считается потраченной.",
          "{@b Отточенный разум.}{@br}В начале своего {@glossary хода|url:turn-phb} вы можете потратить 1 псионическую кость для усиления своей разрушительной псионики. Бросьте кость и запомните выпавшее число. Вы получаете следующие преимущества на 1 минуту или пока не окажетесь в состоянии {@glossary недееспособный|url:incapacitated-phb}:",
          {
            "type": "list",
            "attrs": {
              "type": "unordered"
            },
            "content": [
              "{@b Пробивание защиты.} Урон от ваших атак оружием, {@glossary заклинаний|url:spell-phb} псионика и умений псионика игнорирует сопротивление к урону психической энергией.",
              "{@b Режим атаки.} Один раз в {@glossary ход|url:turn-phb}, когда вы наносите урон психической энергией одному или нескольким {@glossary существам|url:creature-phb}, вы можете заменить результат одной из костей урона на число, выпавшее при активации этой псионической дисциплины."
            ]
          },
          "Когда вы применяете {@i Отточенный разум}, вы также можете применить другую псионическую дисциплину в этот {@glossary ход|url:turn-phb}."
        ],
        "additional": "",
        "scaling": [
          {
            "level": 5,
            "name": "Псионическая дисциплина",
            "description": [],
            "additional": "",
            "hideInSubclasses": false
          },
          {
            "level": 10,
            "name": "Псионическая дисциплина",
            "description": [],
            "additional": "",
            "hideInSubclasses": false
          },
          {
            "level": 13,
            "name": "Псионическая дисциплина",
            "description": [],
            "additional": "",
            "hideInSubclasses": false
          },
          {
            "level": 17,
            "name": "Псионическая дисциплина",
            "description": [],
            "additional": "",
            "hideInSubclasses": false
          }
        ],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "podklass-psionika",
        "level": 3,
        "name": "Подкласс псионика",
        "description": [
          "Вы получаете подкласс псионика по вашему выбору. Подклассы {@i Метаморф}, {@i Психокинетик} и {@i Телепат} Подкласс — это специализация, которая предоставляет вам возможности на определённых уровнях псионика. В ходе дальнейшего развития вы получаете все умения вашего подкласса, которые соответствуют вашему уровню псионика или ниже."
        ],
        "additional": "",
        "scaling": [
          {
            "level": 6,
            "name": "Умение подкласса",
            "description": [],
            "additional": "",
            "hideInSubclasses": false
          },
          {
            "level": 10,
            "name": "Умение подкласса",
            "description": [],
            "additional": "",
            "hideInSubclasses": false
          },
          {
            "level": 14,
            "name": "Умение подкласса",
            "description": [],
            "additional": "",
            "hideInSubclasses": false
          }
        ],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "ulucsenie-harakteristik",
        "level": 4,
        "name": "Улучшение характеристик",
        "description": [
          "Вы получаете {@feat Улучшение характеристик [Ability Score Improvement]|url:ability-score-improvement-phb} или другую черту по вашему выбору, требованиям которой вы соответствуете. Вы снова получаете это умение на уровнях псионика 8, 12 и 16."
        ],
        "additional": "",
        "scaling": [
          {
            "level": 8,
            "name": "Улучшение характеристик",
            "description": [
              "Вы получаете {@feat Улучшение характеристик [Ability Score Improvement]|url:ability-score-improvement-phb} или другую черту по вашему выбору, требованиям которой вы соответствуете."
            ],
            "additional": "",
            "hideInSubclasses": false
          },
          {
            "level": 12,
            "name": "Улучшение характеристик",
            "description": [
              "Вы получаете {@feat Улучшение характеристик [Ability Score Improvement]|url:ability-score-improvement-phb} или другую черту по вашему выбору, требованиям которой вы соответствуете."
            ],
            "additional": "",
            "hideInSubclasses": false
          },
          {
            "level": 16,
            "name": "Улучшение характеристик",
            "description": [
              "Вы получаете {@feat Улучшение характеристик [Ability Score Improvement]|url:ability-score-improvement-phb} или другую черту по вашему выбору, требованиям которой вы соответствуете."
            ],
            "additional": "",
            "hideInSubclasses": false
          }
        ],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "psioniceskoe-vosstanovlenie",
        "level": 5,
        "name": "Псионическое восстановление",
        "description": [
          "Вы можете сосредоточить разум медитацией в течение 1 минуты. В конце медитации вы восстанавливаете потраченные псионические кости. После применения этого умения вы не можете применять его снова, пока не завершите {@glossary продолжительный отдых|url:long-rest-phb}."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "psioniceskij-vsplesk",
        "level": 7,
        "name": "Псионический всплеск",
        "description": [
          "Кроме того, после того как вы бросили одну или несколько псионических костей, вы можете потратить одну из своих {@glossary костей хитов|url:hit-dice-phb} и считать любые результаты 1, 2 или 3 на этих псионических костях как 4."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "epiceskaa-certa",
        "level": 19,
        "name": "Эпическая черта",
        "description": [
          "Вы получаете эпическую черту или другую черту по вашему выбору, требованиям которой вы соответствуете. Рекомендуется {@feat Дар устойчивости к энергиям [Epic Boon of Energy Resistance]|url:boon-of-energy-resistance-phb}."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "probuzdenie-ziznennoj-sily",
        "level": 20,
        "name": "Пробуждение жизненной силы",
        "description": [
          "Вы сжигаете свою жизненную силу, чтобы достичь высших проявлений псионики. Один раз за {@glossary ход|url:turn-phb}, когда вы бросаете одну или несколько псионических костей для умения псионика или псионической дисциплины, вы можете потратить 1 или 2 своих {@glossary костей хитов|url:hit-point-dice-phb}.",
          "За каждую потраченную {@glossary кость хитов|url:hit-point-dice-phb} бросьте дополнительную псионическую кость и прибавьте выпавшие значения к общему результату. Этот бросок не расходует псионическую кость."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      }
    ],
    "table": [
      {
        "name": "Псион. кости",
        "scaling": [
          {
            "level": 1,
            "value": "4к6"
          },
          {
            "level": 5,
            "value": "6к8"
          },
          {
            "level": 9,
            "value": "8к8"
          },
          {
            "level": 11,
            "value": "8к10"
          },
          {
            "level": 13,
            "value": "10к10"
          },
          {
            "level": 17,
            "value": "12к12"
          }
        ]
      },
      {
        "name": "Заг.",
        "scaling": [
          {
            "level": 1,
            "value": "2"
          },
          {
            "level": 4,
            "value": "3"
          },
          {
            "level": 10,
            "value": "4"
          }
        ]
      },
      {
        "name": "Подг. закл.",
        "scaling": [
          {
            "level": 1,
            "value": "4"
          },
          {
            "level": 2,
            "value": "5"
          },
          {
            "level": 3,
            "value": "6"
          },
          {
            "level": 4,
            "value": "7"
          },
          {
            "level": 5,
            "value": "9"
          },
          {
            "level": 6,
            "value": "10"
          },
          {
            "level": 7,
            "value": "11"
          },
          {
            "level": 8,
            "value": "12"
          },
          {
            "level": 9,
            "value": "14"
          },
          {
            "level": 10,
            "value": "15"
          },
          {
            "level": 11,
            "value": "16"
          },
          {
            "level": 13,
            "value": "17"
          },
          {
            "level": 15,
            "value": "18"
          },
          {
            "level": 17,
            "value": "19"
          },
          {
            "level": 18,
            "value": "20"
          },
          {
            "level": 19,
            "value": "21"
          },
          {
            "level": 20,
            "value": "22"
          }
        ]
      }
    ],
    "casterType": "FULL",
    "hasSubclasses": true,
    "name": {
      "rus": "Псионик",
      "eng": "Psion"
    },
    "source": {
      "name": {
        "label": "UAPU",
        "rus": "Неизведанная Аркана: Обновление псионика",
        "eng": "Unearthed Arcana: Psion Update "
      },
      "group": {
        "label": "UA",
        "rus": "Тестовый материал"
      },
      "page": 2
    }
  },
  {
    "url": "ranger-phb",
    "gallery": [
      "/s3/classes/peterko/1759866595019-ranger2.webp"
    ],
    "image": "/s3/classes/peterko/1759866587318-ranger.webp",
    "description": [
      "{@i Странствующий воин, наделённый первобытной магией}",
      "Вдали от суеты городов, в дебрях беспутных лесов и на просторах необъятных равнин следопыты несут свой вечный дозор. Следопыты учатся выслеживать добычу, подобно хищнику, скрытно передвигаясь по дикой местности и прячась среди зарослей и завалов.",
      "Благодаря своей связи с природой следопыты также могут творить {@glossary заклинания|url:spell-phb}, используя её первобытную мощь. Следопыт оттачивает свои таланты и {@glossary магию|url:magic-phb} со смертельным упорством, стремясь защитить мир от разорения чудовищами и тиранами.",
      {
        "type": "heading",
        "attrs": {
          "level": "2"
        },
        "content": [
          {
            "type": "text",
            "text": "Становление следопытом..."
          }
        ]
      },
      "Как персонаж 1 уровня:",
      {
        "type": "list",
        "attrs": {
          "type": "unordered"
        },
        "content": [
          "Получите особенности из таблицы «Особенности следопыта».",
          "Получите умения следопыта 1 уровня, которые перечислены в таблице «Умения следопыта»."
        ]
      },
      "{@b Как мультикласс:}",
      {
        "type": "list",
        "attrs": {
          "type": "unordered"
        },
        "content": [
          "Получите следующие особенности из таблицы «Особенности следопыта»: кость хитов, {@glossary владение|url:proficiency-phb} воинским оружием, лёгкими и средними доспехами и щитами, а также {@glossary владение|url:proficiency-phb} одним навыком на выбор из списка навыков следопыта.",
          "Получите умения следопыта 1 уровня, которые перечислены в таблице «Умения следопыта». См. правила  мультиклассирования в главе 2, чтобы определить доступные ячейки заклинаний."
        ]
      },
      {
        "type": "heading",
        "attrs": {
          "level": "1"
        },
        "content": [
          {
            "type": "text",
            "text": "Список заклинаний следопыта"
          }
        ]
      },
      "В этом разделе представлен список заклинаний следопыта. Заклинания отсортированы по уровню и алфавиту, а также указана школа магии каждого заклинания.{@br}В столбце {@b «Спец.»}: {@b К} означает, что заклинание требует концентрации; {@b Р} — что это ритуал; {@b М} — что требуется материальный компонент.",
      {
        "type": "table",
        "caption": "Заклинания следопыта 1 уровня",
        "colLabels": [
          "Заклинание",
          "Школа",
          "Спец."
        ],
        "colStyles": [
          "w-2/5 text-left",
          "w-1/3 text-left",
          "w-1/4 text-center"
        ],
        "rows": [
          [
            "{@spell Град шипов [Hail of Thorns]|url:hail-of-thorns-phb}",
            "Вызов",
            "—"
          ],
          [
            "{@spell Дружба с животными [Animal Friendship]|url:animal-friendship-phb}",
            "Очарование",
            "—"
          ],
          [
            "{@spell Лечение ран [Cure Wounds]|url:cure-wounds-phb}",
            "Ограждение",
            "—"
          ],
          [
            "{@spell Метка охотника [Hunter's Mark]|url:hunters-mark-phb}",
            "Прорицание",
            "К"
          ],
          [
            "{@spell Обнаружение болезней и яда [Detect Poison and Disease]|url:detect-poison-and-disease-phb}",
            "Прорицание",
            "К, Р"
          ],
          [
            "{@spell Обнаружение магии [Detect Magic]|url:detect-magic-phb}",
            "Прорицание",
            "К, Р"
          ],
          [
            "{@spell Опутывание [Entangle]|url:entangle-phb}",
            "Вызов",
            "К"
          ],
          [
            "{@spell Опутывающий удар [Ensnaring Strike]|url:ensnaring-strike-phb}",
            "Вызов",
            "К"
          ],
          [
            "{@spell Прыжок [Jump]|url:jump-phb}",
            "Преобразование",
            "—"
          ],
          [
            "{@spell Разговор с животными [Speak with Animals]|url:speak-with-animals-phb}",
            "Прорицание",
            "Р"
          ],
          [
            "{@spell Сигнал тревоги [Alarm]|url:alarm-phb}",
            "Ограждение",
            "Р"
          ],
          [
            "{@spell Скороход [Longstrider]|url:longstrider-phb}",
            "Преобразование",
            "—"
          ],
          [
            "{@spell Туманное облако [Fog Cloud]|url:fog-cloud-phb}",
            "Вызов",
            "К"
          ],
          [
            "{@spell Чудо-ягоды [Goodberry]|url:goodberry-phb}",
            "Вызов",
            "—"
          ]
        ]
      },
      {
        "type": "table",
        "caption": "Заклинания следопыта 2 уровня",
        "colLabels": [
          "Заклинание",
          "Школа",
          "Спец."
        ],
        "colStyles": [
          "w-2/5 text-left",
          "w-1/3 text-left",
          "w-1/4 text-center"
        ],
        "rows": [
          [
            "{@spell Бесследное передвижение [Pass without Trace]|url:pass-without-trace-phb}",
            "Ограждение",
            "К"
          ],
          [
            "{@spell Дубовая кожа [Barkskin]|url:barkskin-phb}",
            "Преобразование",
            "—"
          ],
          [
            "{@spell Животные чувства [Beast Sense]|url:beast-sense-phb}",
            "Прорицание",
            "К, Р"
          ],
          [
            "{@spell Завеса стрел [Cordon of Arrows]|url:cordon-of-arrows-phb}",
            "Преобразование",
            "—"
          ],
          [
            "{@spell Защита от яда [Protection from Poison]|url:protection-from-poison-phb}",
            "Ограждение",
            "—"
          ],
          [
            "{@spell Магическое оружие [Magic Weapon]|url:magic-weapon-phb}",
            "Преобразование",
            "—"
          ],
          [
            "{@spell Малое восстановление [Lesser Restoration]|url:lesser-restoration-phb}",
            "Ограждение",
            "—"
          ],
          [
            "{@spell Подмога [Aid]|url:aid-phb}",
            "Ограждение",
            "—"
          ],
          [
            "{@spell Поиск животных или растений [Locate Animals or Plants]|url:locate-animals-or-plants-phb}",
            "Прорицание",
            "Р"
          ],
          [
            "{@spell Поиск ловушек [Find Traps]|url:find-traps-phb}",
            "Прорицание",
            "—"
          ],
          [
            "{@spell Поиск объекта [Locate Object]|url:locate-object-phb}",
            "Прорицание",
            "К"
          ],
          [
            "{@spell Порыв ветра [Gust of Wind]|url:gust-of-wind-phb}",
            "Воплощение",
            "К"
          ],
          [
            "{@spell Почтовое животное [Animal Messenger]|url:animal-messenger-phb}",
            "Очарование",
            "Р"
          ],
          [
            "{@spell Призыв духа зверя [Summon Beast]|url:summon-beast-tce}",
            "Вызов",
            "К, М"
          ],
          [
            "{@spell Тёмное зрение [Darkvision]|url:darkvision-phb}",
            "Преобразование",
            "—"
          ],
          [
            "{@spell Тишина [Silence]|url:silence-phb}",
            "Иллюзия",
            "К, Р"
          ],
          [
            "{@spell Улучшение характеристики [Enhance Ability]|url:enhance-ability-phb}",
            "Преобразование",
            "К"
          ],
          [
            "{@spell Шипастая поросль [Spike Growth]|url:spike-growth-phb}",
            "Преобразование",
            "К"
          ]
        ]
      },
      {
        "type": "table",
        "caption": "Заклинания следопыта 3 уровня",
        "colLabels": [
          "Заклинание",
          "Школа",
          "Спец."
        ],
        "colStyles": [
          "w-2/5 text-left",
          "w-1/3 text-left",
          "w-1/4 text-center"
        ],
        "rows": [
          [
            "{@spell Низшее воскрешение [Revivify]|url:revivify-phb}",
            "Некромантия",
            "М"
          ],
          [
            "{@spell Вызов животных [Conjure Animals]|url:conjure-animals-phb}",
            "Вызов",
            "К"
          ],
          [
            "{@spell Вызов шквала снарядов [Conjure Barrage]|url:conjure-barrage-phb}",
            "Вызов",
            "—"
          ],
          [
            "{@spell Дневной свет [Daylight]|url:daylight-phb}",
            "Воплощение",
            "—"
          ],
          [
            "{@spell Защита от энергии [Protection from Energy]|url:protection-from-energy-phb}",
            "Ограждение",
            "К"
          ],
          [
            "{@spell Стрела-молния [Lightning Arrow]|url:lightning-arrow-phb}",
            "Преобразование",
            "—"
          ],
          [
            "{@spell Необнаружимость [Nondetection]|url:nondetection-phb}",
            "Ограждение",
            "М"
          ],
          [
            "{@spell Подводное дыхание [Water Breathing]|url:water-breathing-phb}",
            "Преобразование",
            "Р"
          ],
          [
            "{@spell Призыв духа феи [Summon Fey]|url:summon-fey-tce}",
            "Вызов",
            "К, М"
          ],
          [
            "{@spell Разговор с растениями [Speak with Plants]|url:speak-with-plants-phb}",
            "Преобразование",
            "—"
          ],
          [
            "{@spell Рассеивание магии [Dispel Magic]|url:dispel-magic-phb}",
            "Ограждение",
            "—"
          ],
          [
            "{@spell Рост растений [Plant Growth]|url:plant-growth-phb}",
            "Преобразование",
            "—"
          ],
          [
            "{@spell Слияние с камнем [Meld into Stone]|url:meld-into-stone-phb}",
            "Преобразование",
            "Р"
          ],
          [
            "{@spell Стена ветра [Wind Wall]|url:wind-wall-phb}",
            "Воплощение",
            "К"
          ],
          [
            "{@spell Стихийное оружие [Elemental Weapon]|url:elemental-weapon-phb}",
            "Преобразование",
            "К"
          ],
          [
            "{@spell Хождение по воде [Water Walk]|url:water-walk-phb}",
            "Преобразование",
            "Р"
          ]
        ]
      },
      {
        "type": "table",
        "caption": "Заклинания следопыта 4 уровня",
        "colLabels": [
          "Заклинание",
          "Школа",
          "Спец."
        ],
        "colStyles": [
          "w-2/5 text-left",
          "w-1/3 text-left",
          "w-1/4 text-center"
        ],
        "rows": [
          [
            "{@spell Вызов лесных обитателей [Conjure Woodland Beings]|url:conjure-woodland-beings-phb}",
            "Вызов",
            "К"
          ],
          [
            "{@spell Каменная кожа [Stoneskin]|url:stoneskin-phb}",
            "Преобразование",
            "К, М"
          ],
          [
            "{@spell Подчинение зверя [Dominate Beast]|url:dominate-beast-phb}",
            "Очарование",
            "К"
          ],
          [
            "{@spell Поиск существа [Locate Creature]|url:locate-creature-phb}",
            "Прорицание",
            "К"
          ],
          [
            "{@spell Призыв духа элементаля [Summon Elemental]|url:summon-elemental-tce}",
            "Вызов",
            "К, М"
          ],
          [
            "{@spell Свобода перемещения [Freedom of Movement]|url:freedom-of-movement-phb}",
            "Ограждение",
            "—"
          ],
          [
            "{@spell Цепкая лоза [Grasping Vine]|url:grasping-vine-phb}",
            "Вызов",
            "К"
          ]
        ]
      },
      {
        "type": "table",
        "caption": "Заклинания следопыта 5 уровня",
        "colLabels": [
          "Заклинание",
          "Школа",
          "Спец."
        ],
        "colStyles": [
          "w-2/5 text-left",
          "w-1/3 text-left",
          "w-1/4 text-center"
        ],
        "rows": [
          [
            "{@spell Быстрый колчан [Swift Quiver]|url:swift-quiver-phb}",
            "Преобразование",
            "К, М"
          ],
          [
            "{@spell Вызов залпа [Conjure Volley]|url:conjure-volley-phb}",
            "Вызов",
            "—"
          ],
          [
            "{@spell Высшее восстановление [Greater Restoration]|url:greater-restoration-phb}",
            "Ограждение",
            "М"
          ],
          [
            "{@spell Древесный путь [Tree Stride]|url:tree-stride-phb}",
            "Вызов",
            "К"
          ],
          [
            "{@spell Общение с природой [Commune with Nature]|url:commune-with-nature-phb}",
            "Прорицание",
            "Р"
          ],
          [
            "{@spell Удар стального ветра [Steel Wind Strike]|url:steel-wind-strike-phb}",
            "Вызов",
            "М"
          ]
        ]
      }
    ],
    "updatedAt": "2025-12-12T09:37:09.074954Z",
    "userId": "Magistrus",
    "hitDice": {
      "label": "к10",
      "value": "d10",
      "maxValue": 10,
      "avg": 6
    },
    "primaryCharacteristics": "Ловкость или Мудрость",
    "proficiency": {
      "armor": "Щит, Средний доспех, Легкий доспех",
      "weapon": "Простое дальнобойное, Воинское рукопашное, Простое рукопашное, Воинское дальнобойное",
      "tool": "",
      "skill": "Выберите 3 навыка из следующих: Уход за животными, Атлетика, Проницательность, Анализ, Природа, Внимательность, Скрытность, Выживание"
    },
    "equipment": [
      "Выберите А или Б:",
      {
        "type": "list",
        "attrs": {
          "type": "unordered"
        },
        "content": [
          "А) {@item проклёпанная кожа|url:studded-leather-armor-phb}, {@item скимитар|url:scimitar-phb}, {@item короткий меч|url:shortsword-phb}, {@item длинный лук|url:longbow-phb}, 20 {@item стрел|url:arrow-phb}, {@item колчан|url:quiver-phb}, {@item фокусировка друидов (веточка омелы)|url:sprig-of-mistletoe-phb}, {@item набор путешественника|url:explorer-s-pack-phb} и 7 зм;",
          "Б) 150 зм."
        ]
      }
    ],
    "savingThrows": "Сила, Ловкость",
    "features": [
      {
        "isSubclass": false,
        "key": "ispolzovanie-zaklinanij",
        "level": 1,
        "name": "Использование заклинаний",
        "description": [
          "Вы научились использовать магическую сущность природы для наложения заклинаний. Правила наложения заклинаний см. в главе 7. Ниже подробно описано, как применять эти правила к заклинаниям следопыта, которые перечислены в списке заклинаний следопыта далее в описании класса.",
          "{@b Ячейки заклинаний.} Таблица «Умения следопыта» показывает, сколько ячеек заклинаний вы можете использовать для заклинаний 1+ уровня. Вы восстанавливаете все потраченные ячейки заклинаний, когда заканчиваете {@glossary продолжительный отдых|url:long-rest-phb}.",
          "{@b Подготовленные заклинания 1+ уровня.} Вы подготавливаете список заклинаний 1+ уровня, доступных вам для использования с помощью этого умения. Для начала выберите 2 заклинания 1 уровня из списка заклинаний следопыта. Рекомендуются: {@spell Лечение ран [Cure Wounds]|url:cure-wounds-phb} и {@spell Опутывающий удар [Ensnaring Strike]|url:ensnaring-strike-phb}.",
          "Количество подготовленных заклинаний увеличивается по мере того, как вы получаете уровни следопыта, как указано в столбце «Подг. закл.» таблицы «Умения следопыта».",
          "Каждый раз, когда это число увеличивается, выберите дополнительные заклинания из списка следопыта, чтобы общее количество соответствовало таблице. Выбранные заклинания должны быть уровня, для которого у вас есть ячейки заклинаний. Например, если вы следопыт 5 уровня, ваш список подготовленных заклинаний может включать 6 заклинаний следопыта 1 или 2 уровня в любой комбинации.",
          "Если другое умение следопыта предоставляет вам всегда подготовленные заклинания, они не учитываются в количестве, которое вы можете подготовить с помощью этого умения, но считаются заклинаниями следопыта для вас.",
          "{@b Изменение подготовленных заклинаний.} Каждый раз, когда вы заканчиваете {@glossary продолжительный отдых|url:long-rest-phb}, вы можете заменить одно заклинание из вашего списка на другое заклинание из списка следопыта, для которого у вас есть ячейка заклинаний.",
          "{@b Заклинательная характеристика.} Мудрость — это ваша заклинательная характеристика для ваших заклинаний следопыта.",
          "{@b Заклинательная фокусировка.} В качестве {@item заклинательной фокусировки|url:spellcasting-focus-phb} для ваших заклинаний следопыта вы можете использовать {@item фокусировку друидов [Druidic Focus]|url:druidic-focus-phb}."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "izbrannyj-vrag",
        "level": 1,
        "name": "Избранный враг",
        "description": [
          "У вас всегда подготовлено заклинание {@spell Метка охотника [Hunter’s Mark]|url:hunter-s-mark-phb}. Вы можете наложить его дважды без траты {@glossary ячейки заклинания|url:spell-slot-phb} и восстанавливаете все потраченные использования этого умения после завершения {@glossary продолжительного отдыха|url:long-rest-phb}.",
          "Количество раз, которое вы можете сотворить это {@glossary заклинание|url:spell-phb} без траты {@glossary ячейки заклинания|url:spell-slot-phb}, увеличивается при достижении определённых уровней следопыта, как показано в столбце «Избранный враг» таблицы «Умения следопыта»."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "oruzejnye-priemy",
        "level": 1,
        "name": "Оружейные приёмы",
        "description": [
          "Ваша тренировка с оружием позволяет вам использовать {@glossary оружейные приёмы|url:weapon-maneuvers-phb} 2 типов {@glossary оружия|url:weapon-phb} из тех, которыми вы {@glossary владеете|url:proficiency-phb}, по вашему выбору. Например, длинных луков и коротких мечей. Когда вы заканчиваете {@glossary продолжительный отдых|url:long-rest-phb}, вы можете поменять типы оружия. Например, вы можете перейти на использование оружейных приёмов скимитаров и длинных мечей."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "iskusnyj-issledovatel",
        "level": 2,
        "name": "Искусный исследователь",
        "description": [
          "Ваши путешествия наделили вас следующими эффектами:",
          {
            "type": "list",
            "attrs": {
              "type": "unordered"
            },
            "content": [
              "{@b Компетентность.} Выберите одно из ваших {@glossary владений|url:proficiency-phb} навыком, для которого у вас нет {@glossary компетентности|url:expertise-phb}. Вы получаете {@glossary компетентность|url:expertise-phb} для этого навыка.",
              "{@b Языки.} Вы обучаетесь двум языкам на выбор из таблиц языков в главе 2."
            ]
          }
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "boevoj-stil",
        "level": 2,
        "name": "Боевой Стиль",
        "description": [
          "Вы получаете черту боевого стиля по вашему выбору (см. главу 5). Вместо выбора одной из доступных черт, вы можете выбрать следующий вариант:",
          "{@b Воин-друид.} Вы обучаетесь 2 {@glossary заговорам|url:cantrip-phb} {@glossary друида|url:druid-phb} на ваш выбор (список заклинаний друида находится в описании класса {@glossary друид|url:druid-phb}). Рекомендуется выбрать {@spell Наставление [Guidance]|url:guidance-phb} и {@spell Звёздный огонёк [Starry Wisp]|url:starry-wisp-phb}. Выбранные {@glossary заговоры|url:cantrip-phb} считаются для вас {@glossary заклинаниями|url:spell-phb} следопыта, и для их сотворения используется Мудрость. Каждый раз, когда вы получаете уровень следопыта, вы можете заменить один из этих {@glossary заговоров|url:cantrip-phb} другим {@glossary заговором|url:cantrip-phb} {@glossary друида|url:druid-phb}."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "podklass-sledopyta",
        "level": 3,
        "name": "Подкласс следопыта",
        "description": [
          "Вы получаете подкласс следопыта по вашему выбору. Подклассы Повелителя зверей, Фейского странника, Сумрачного охотника и Охотника подробно изложены после списка {@glossary заклинаний|url:spell-phb} этого класса. Подкласс — это специализация, предоставляющая вам возможности на определённых уровнях следопыта. В ходе дальнейшего развития вы получаете каждое умение вашего подкласса, которое соответствует вашему уровню следопыта или ниже."
        ],
        "additional": "",
        "scaling": [
          {
            "level": 7,
            "name": "Умение подкласса",
            "description": [
              "Вы получаете умения подкласса."
            ],
            "additional": "",
            "hideInSubclasses": false
          },
          {
            "level": 11,
            "name": "Умение подкласса",
            "description": [
              "Вы получаете умения подкласса."
            ],
            "additional": "",
            "hideInSubclasses": false
          },
          {
            "level": 15,
            "name": "Умение подкласса",
            "description": [
              "Вы получаете умения подкласса."
            ],
            "additional": "",
            "hideInSubclasses": false
          }
        ],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "ulucsenie-harakteristik",
        "level": 4,
        "name": "Улучшение характеристик",
        "description": [
          "Вы получаете черту {@feat Улучшение характеристик [Ability Score Improvement]|url:ability-score-improvement-phb} (см. главу 5) или другую черту по вашему выбору, требованиям которой вы соответствуете. Вы снова получаете эту способность на уровнях следопыта 8, 12 и 16."
        ],
        "additional": "",
        "scaling": [
          {
            "level": 8,
            "name": "Улучшение характеристик",
            "description": [
              "Вы получаете {@feat Улучшение характеристик [Ability Score Improvement]|url:ability-score-improvement-phb} (см. главу 5) или другую {@feat черту [Feat]|url:feat-phb} по вашему выбору, требованиям которой вы соответствуете."
            ],
            "additional": "",
            "hideInSubclasses": false
          },
          {
            "level": 12,
            "name": "Улучшение характеристик",
            "description": [
              "Вы получаете {@feat Улучшение характеристик [Ability Score Improvement]|url:ability-score-improvement-phb} (см. главу 5) или другую {@feat черту [Feat]|url:feat-phb} по вашему выбору, требованиям которой вы соответствуете."
            ],
            "additional": "",
            "hideInSubclasses": false
          },
          {
            "level": 16,
            "name": "Улучшение характеристик",
            "description": [
              "Вы получаете {@feat Улучшение характеристик [Ability Score Improvement]|url:ability-score-improvement-phb} (см. главу 5) или другую {@feat черту [Feat]|url:feat-phb} по вашему выбору, требованиям которой вы соответствуете."
            ],
            "additional": "",
            "hideInSubclasses": false
          }
        ],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "dopolnitelnaa-ataka",
        "level": 5,
        "name": "Дополнительная атака",
        "description": [
          "Вы можете атаковать 2 раза вместо одного, когда совершаете {@glossary действие атака|url:attack-action-phb} в свой ход."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "skitalec",
        "level": 6,
        "name": "Скиталец",
        "description": [
          "Ваша {@glossary скорость передвижения|url:speed-phb} увеличивается на 10 фт., если вы не носите тяжёлый доспех. Вы также получаете {@glossary скорость лазания|url:climb-speed-phb} и {@glossary скорость плавания|url:swim-speed-phb}, равные вашей {@glossary скорости передвижения|url:speed-phb}."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "kompetentnost",
        "level": 9,
        "name": "Компетентность",
        "description": [
          "Выберите 2 из ваших {@glossary владений|url:proficiency-phb} навыком, для которых у вас нет {@glossary компетентности|url:expertise-phb}. Вы получаете {@glossary компетентность|url:expertise-phb} для этих навыков."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "neutomimyj",
        "level": 10,
        "name": "Неутомимый",
        "description": [
          "Отныне в путешествиях вас поддерживают первобытные силы, предоставляя следующие эффекты:",
          {
            "type": "list",
            "attrs": {
              "type": "unordered"
            },
            "content": [
              "{@b Временные хиты.} Действием {@glossary магии|url:magic-phb} вы можете дать себе количество {@glossary временных хитов|url:temporary-hit-points-phb}, равное {@roll 1к8} + ваш модификатор Мудрости (минимум 1 хит). Вы можете использовать это умение количество раз, равное вашему модификатору Мудрости (минимум 1 раз). Вы восстанавливаете все потраченные использования после окончания {@glossary продолжительного отдыха|url:long-rest-phb}.",
              "{@b Снижение истощения.} После завершения каждого {@glossary короткого отдыха|url:short-rest-phb} ваша степень состояния {@glossary истощённый|url:exhaustion-phb} (при наличии) уменьшается на 1."
            ]
          }
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "besposadnyj-ohotnik",
        "level": 13,
        "name": "Беспощадный охотник",
        "description": [
          "Получение урона не прерывает вашу {@glossary концентрацию|url:concentration-phb} при использовании заклинания {@spell Метка охотника [Hunter’s Mark]|url:hunter-s-mark-phb}."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "prirodnaa-zavesa",
        "level": 14,
        "name": "Природная завеса",
        "description": [
          "Вы обращаетесь к духам природы, чтобы они скрыли вас при помощи {@glossary магии|url:magic-phb}. {@glossary Бонусным действием|url:bonus-action-phb} вы можете дать себе состояние {@glossary невидимый|url:invisible-phb} до конца вашего следующего хода.",
          "Вы можете использовать это умение количество раз, равное вашему модификатору Мудрости (минимум 1 раз). Вы восстанавливаете все потраченные использования после окончания {@glossary продолжительного отдыха|url:long-rest-phb}."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "metkij-ohotnik",
        "level": 17,
        "name": "Меткий охотник",
        "description": [
          "Вы получаете {@glossary преимущество|url:advantage-phb} при {@glossary бросках атаки|url:attack-roll-phb} против {@glossary существа|url:creature-phb}, которое в данный момент отмечено вашей {@spell Метка охотника [Hunter’s Mark]|url:hunter-s-mark-phb}."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "dikie-cuvstva",
        "level": 18,
        "name": "Дикие чувства",
        "description": [
          "Ваша связь с силами природы предоставляет вам {@glossary слепое зрение|url:blindsight-phb} в радиусе 30 фт."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "epiceskaa-certa",
        "level": 19,
        "name": "Эпическая черта",
        "description": [
          "Вы получаете эпическую черту (см. главу 5) или другую черту по вашему выбору, требованиям которой вы соответствуете. Рекомендуется черта {@feat Дар пространственного путешествия [Boon of Dimensional Travel]|url:boon-of-dimensional-travel-phb}."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "ubijca-vragov",
        "level": 20,
        "name": "Убийца врагов",
        "description": [
          "Кость урона, наносимого вашей {@spell Метка охотника [Hunter’s Mark]|url:hunter-s-mark-phb}, становится равна к10 вместо к6."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      }
    ],
    "table": [
      {
        "name": "Избранный враг",
        "scaling": [
          {
            "level": 1,
            "value": "2"
          },
          {
            "level": 5,
            "value": "3"
          },
          {
            "level": 9,
            "value": "4"
          },
          {
            "level": 13,
            "value": "5"
          },
          {
            "level": 18,
            "value": "6"
          }
        ]
      },
      {
        "name": "Подг. закл.",
        "scaling": [
          {
            "level": 1,
            "value": "2"
          },
          {
            "level": 2,
            "value": "3"
          },
          {
            "level": 3,
            "value": "4"
          },
          {
            "level": 4,
            "value": "5"
          },
          {
            "level": 5,
            "value": "6"
          },
          {
            "level": 7,
            "value": "7"
          },
          {
            "level": 9,
            "value": "9"
          },
          {
            "level": 11,
            "value": "10"
          },
          {
            "level": 13,
            "value": "11"
          },
          {
            "level": 15,
            "value": "12"
          },
          {
            "level": 17,
            "value": "14"
          },
          {
            "level": 19,
            "value": "15"
          }
        ]
      }
    ],
    "casterType": "HALF",
    "hasSubclasses": true,
    "name": {
      "rus": "Следопыт",
      "eng": "Ranger"
    },
    "source": {
      "name": {
        "label": "PHB",
        "rus": "Книга игрока",
        "eng": "Player Handbook"
      },
      "group": {
        "label": "Basic",
        "rus": "Официальные источники"
      },
      "page": 146
    }
  },
  {
    "url": "sorcerer-phb",
    "gallery": [
      "/s3/classes/peterko/1759866635063-sorcerer2.webp",
      "/s3/classes/magistrus/1761724509720-sourcer3.webp"
    ],
    "image": "/s3/classes/peterko/1759866622655-sorcerer.webp",
    "description": [
      "{@i Блистательный маг с врождённой магией}",
      "Чародеи управляют врождённой магией, впечатанной в их сущности. Некоторые чародеи не могут назвать источник своей силы, в то время как другие связывают её со странными событиями в их личной или семейной истории. Благословение дракона или дриады при рождении ребёнка, удар молнии с ясного неба, дар божества, воздействие необычной магии другого плана или взгляд в тайны мироздания — всё это может стать причиной дара чародея.",
      "Каков бы ни был источник, результатом является неизгладимый след на чародее — бурлящая магия, которая может передаваться через поколения.",
      "Чародеи не учатся магии; сырая, кипящая сила магии является частью их самих. Основное искусство чародея заключается в том, чтобы научиться управлять и направлять эту врождённую магию, открывая для себя новые, поразительные способы высвобождения своей силы. По мере того как чародеи овладевают своей врождённой магией, они становятся всё более связанными с её источником, развивая уникальные способности, отражающие её происхождение.",
      "Чародеи редки. В некоторых семейных линиях появляется ровно один чародей в каждом поколении, но чаще всего таланты к чародейству возникают случайно. Люди, обладающие этой магической силой, вскоре понимают, что она не хочет оставаться в тени. Магия чародея жаждет, чтобы её применили.",
      {
        "type": "heading",
        "attrs": {
          "level": "2"
        },
        "content": [
          {
            "type": "text",
            "text": "Становление чародеем..."
          }
        ]
      },
      "{@b Как персонаж 1 уровня:}",
      {
        "type": "list",
        "attrs": {
          "type": "unordered"
        },
        "content": [
          "Получите особенности из таблицы «Особенности чародея».",
          "Получите умения чародея 1 уровня, которые перечислены в таблице «Умения чародея»."
        ]
      },
      "{@b Как мультикласс:}",
      {
        "type": "list",
        "attrs": {
          "type": "unordered"
        },
        "content": [
          "Получите кость хитов из таблицы «Особенности чародея».",
          "Получите умения чародея 1 уровня, которые перечислены в таблице «Умения чародея». См. правила мультиклассирования в главе 2, чтобы определить доступные ячейки заклинаний."
        ]
      },
      {
        "type": "heading",
        "attrs": {
          "level": "1"
        },
        "content": [
          {
            "type": "text",
            "text": "Список заклинаний чародея"
          }
        ]
      },
      "В этом разделе представлен список заклинаний чародея. Заклинания упорядочены по уровню заклинаний, расположены в алфавитном порядке, и для каждого заклинания указана школа магии.{@br}В колонке {@b «Особое»}: {@b К} означает, что заклинание требует Концентрации; {@b Р} — что это Ритуал; {@b М} — что для него требуется материальный компонент.",
      {
        "type": "table",
        "caption": "Заклинания 0 уровня",
        "colLabels": [
          "Заклинание",
          "Школа",
          "Особое"
        ],
        "colStyles": [
          "w-2/5 text-left",
          "w-1/3 text-left",
          "w-1/4 text-center"
        ],
        "rows": [
          [
            "{@spell Брызги кислоты [Acid Splash]|url:acid-splash-phb}",
            "Воплощение",
            "—"
          ],
          [
            "{@spell Волшебная рука [Mage Hand]|url:mage-hand-phb}",
            "Вызов",
            "—"
          ],
          [
            "{@spell Дружба [Friends]|url:friends-phb}",
            "Очарование",
            "К"
          ],
          [
            "{@spell Защита от оружия [Blade Ward]|url:blade-ward-phb}",
            "Ограждение",
            "К"
          ],
          [
            "{@spell Леденящее прикосновение [Chill Touch]|url:chill-touch-phb}",
            "Некромантия",
            "—"
          ],
          [
            "{@spell Луч холода [Ray of Frost]|url:ray-of-frost-phb}",
            "Воплощение",
            "—"
          ],
          [
            "{@spell Малая иллюзия [Minor Illusion]|url:minor-illusion-phb}",
            "Иллюзия",
            "—"
          ],
          [
            "{@spell Меткий удар [True Strike]|url:true-strike-phb}",
            "Прорицание",
            "—"
          ],
          [
            "{@spell Огненный снаряд [Fire Bolt]|url:fire-bolt-phb}",
            "Воплощение",
            "—"
          ],
          [
            "{@spell Пляшущие огоньки [Dancing Lights]|url:dancing-lights-phb}",
            "Иллюзия",
            "К"
          ],
          [
            "{@spell Починка [Mending]|url:mending-phb}",
            "Преобразование",
            "—"
          ],
          [
            "{@spell Раскат грома [Thunderclap]|url:thunderclap-phb}",
            "Воплощение",
            "—"
          ],
          [
            "{@spell Расщепление разума [Mind Split]|url:mind-split-phb}",
            "Очарование",
            "—"
          ],
          [
            "{@spell Свет [Light]|url:light-phb}",
            "Воплощение",
            "—"
          ],
          [
            "{@spell Сообщение [Message]|url:message-phb}",
            "Преобразование",
            "—"
          ],
          [
            "{@spell Фокусы [Prestidigitation]|url:prestidigitation-phb}",
            "Преобразование",
            "—"
          ],
          [
            "{@spell Чародейская вспышка [Eldritch Blast]|url:eldritch-blast-phb}",
            "Воплощение",
            "—"
          ],
          [
            "{@spell Электрошок [Shocking Grasp]|url:shocking-grasp-phb}",
            "Воплощение",
            "—"
          ],
          [
            "{@spell Элементализм [Elementalism]|url:elementalism-phb}",
            "Преобразование",
            "—"
          ],
          [
            "{@spell Ядовитые брызги [Poison Spray]|url:poison-spray-phb}",
            "Некромантия",
            "—"
          ]
        ]
      },
      {
        "type": "table",
        "caption": "Заклинания 1 уровня",
        "colLabels": [
          "Заклинание",
          "Школа",
          "Особое"
        ],
        "colStyles": [
          "w-2/5 text-left",
          "w-1/3 text-left",
          "w-1/4 text-center"
        ],
        "rows": [
          [
            "{@spell Безмолвный образ [Silent Image]|url:silent-image-phb}",
            "Иллюзия",
            "К"
          ],
          [
            "{@spell Ведьмин снаряд [Witch Bolt]|url:witch-bolt-phb}",
            "Воплощение",
            "К"
          ],
          [
            "{@spell Волна грома [Thunderwave]|url:thunderwave-phb}",
            "Воплощение",
            "—"
          ],
          [
            "{@spell Волшебная стрела [Magic Missile]|url:magic-missile-phb}",
            "Воплощение",
            "—"
          ],
          [
            "{@spell Доспехи мага [Mage Armor]|url:mage-armor-phb}",
            "Ограждение",
            "—"
          ],
          [
            "{@spell Ледяной кинжал [Ice Knife]|url:ice-knife-phb}",
            "Вызов",
            "—"
          ],
          [
            "{@spell Луч болезни [Ray of Sickness]|url:ray-of-sickness-phb}",
            "Некромантия",
            "—"
          ],
          [
            "{@spell Маскировка [Disguise Self]|url:disguise-self-phb}",
            "Иллюзия",
            "—"
          ],
          [
            "{@spell Обнаружение магии [Detect Magic]|url:detect-magic-phb}",
            "Прорицание",
            "К, Р"
          ],
          [
            "{@spell Огненные ладони [Burning Hands]|url:burning-hands-phb}",
            "Воплощение",
            "—"
          ],
          [
            "{@spell Очарование личности [Charm Person]|url:charm-person-phb}",
            "Очарование",
            "—"
          ],
          [
            "{@spell Падение пёрышком [Feather Fall]|url:feather-fall-phb}",
            "Преобразование",
            "—"
          ],
          [
            "{@spell Понимание языков [Comprehend Languages]|url:comprehend-languages-phb}",
            "Прорицание",
            "Р"
          ],
          [
            "{@spell Поспешное отступление [Expeditious Retreat]|url:expeditious-retreat-phb}",
            "Преобразование",
            "К"
          ],
          [
            "{@spell Прыжок [Jump]|url:jump-phb}",
            "Преобразование",
            "—"
          ],
          [
            "{@spell Псевдожизнь [False Life]|url:false-life-phb}",
            "Некромантия",
            "—"
          ],
          [
            "{@spell Сверкающие брызги [Color Spray]|url:color-spray-phb}",
            "Иллюзия",
            "—"
          ],
          [
            "{@spell Скольжение [Grease]|url:grease-phb}",
            "Вызов",
            "—"
          ],
          [
            "{@spell Туманное облако [Fog Cloud]|url:fog-cloud-phb}",
            "Вызов",
            "К"
          ],
          [
            "{@spell Усыпление [Sleep]|url:sleep-phb}",
            "Очарование",
            "К"
          ],
          [
            "{@spell Цветной шарик [Chromatic Orb]|url:chromatic-orb-phb}",
            "Воплощение",
            "М"
          ],
          [
            "{@spell Щит [Shield]|url:shield-phb}",
            "Ограждение",
            "—"
          ]
        ]
      },
      {
        "type": "table",
        "caption": "Заклинания 2 уровня",
        "colLabels": [
          "Заклинание",
          "Школа",
          "Особое"
        ],
        "colStyles": [
          "w-2/5 text-left",
          "w-1/3 text-left",
          "w-1/4 text-center"
        ],
        "rows": [
          [
            "{@spell Видение невидимого [See Invisibility]|url:see-invisibility-phb}",
            "Прорицание",
            "—"
          ],
          [
            "{@spell Внушение [Suggestion]|url:suggestion-phb}",
            "Очарование",
            "К"
          ],
          [
            "{@spell Воображаемая сила [Phantasmal Force]|url:phantasmal-force-phb}",
            "Иллюзия",
            "К"
          ],
          [
            "{@spell Глухота/слепота [Blindness Deafness]|url:blindness-deafness-phb}",
            "Преобразование",
            "—"
          ],
          [
            "{@spell Горящий клинок [Flame Blade]|url:flame-blade-phb}",
            "Воплощение",
            "К"
          ],
          [
            "{@spell Дребезги [Shatter]|url:shatter-phb}",
            "Воплощение",
            "—"
          ],
          [
            "{@spell Дыхание дракона [Dragon's Breath]|url:dragons-breath-phb}",
            "Преобразование",
            "К"
          ],
          [
            "{@spell Корона безумия [Crown of Madness]|url:crown-of-madness-phb}",
            "Очарование",
            "К"
          ],
          [
            "{@spell Левитация [Levitate]|url:levitate-phb}",
            "Преобразование",
            "К"
          ],
          [
            "{@spell Арканная регенерация [Arcane Recovery]|url:arcane-recovery-phb}",
            "Ограждение",
            "—"
          ],
          [
            "{@spell Магическое оружие [Magic Weapon]|url:magic-weapon-phb}",
            "Преобразование",
            "—"
          ],
          [
            "{@spell Невидимость [Invisibility]|url:invisibility-phb}",
            "Иллюзия",
            "К"
          ],
          [
            "{@spell Облако кинжалов [Cloud of Daggers]|url:cloud-of-daggers-phb}",
            "Вызов",
            "К"
          ],
          [
            "{@spell Обнаружение мыслей [Detect Thoughts]|url:detect-thoughts-phb}",
            "Прорицание",
            "К"
          ],
          [
            "{@spell Стук [Knock]|url:knock-phb}",
            "Преобразование",
            "—"
          ],
          [
            "{@spell Отражения [Mirror Image]|url:mirror-image-phb}",
            "Иллюзия",
            "—"
          ],
          [
            "{@spell Палящий луч [Scorching Ray]|url:scorching-ray-phb}",
            "Воплощение",
            "—"
          ],
          [
            "{@spell Паук [Spider Climb]|url:spider-climb-phb}",
            "Преобразование",
            "К"
          ],
          [
            "{@spell Паутина [Web]|url:web-phb}",
            "Вызов",
            "К"
          ],
          [
            "{@spell Порыв ветра [Gust of Wind]|url:gust-of-wind-phb}",
            "Воплощение",
            "К"
          ],
          [
            "{@spell Пронзание разума [Mind Spike]|url:mind-spike-phb}",
            "Прорицание",
            "К"
          ],
          [
            "{@spell Пылающий шар [Flaming Sphere]|url:flaming-sphere-phb}",
            "Воплощение",
            "К"
          ],
          [
            "{@spell Размытый образ [Blur]|url:blur-phb}",
            "Иллюзия",
            "К"
          ],
          [
            "{@spell Смена обличья [Alter Self]|url:alter-self-phb}",
            "Преобразование",
            "К"
          ],
          [
            "{@spell Тёмное зрение [Darkvision]|url:darkvision-phb}",
            "Преобразование",
            "—"
          ],
          [
            "{@spell Туманный шаг [Misty Step]|url:misty-step-phb}",
            "Вызов",
            "—"
          ],
          [
            "{@spell Тьма [Darkness]|url:darkness-phb}",
            "Воплощение",
            "К"
          ],
          [
            "{@spell Увеличение/уменьшение [Enlarge Reduce]|url:enlarge-reduce-phb}",
            "Преобразование",
            "К"
          ],
          [
            "{@spell Удержание личности [Hold Person]|url:hold-person-phb}",
            "Очарование",
            "К"
          ],
          [
            "{@spell Улучшение характеристики [Enhance Ability]|url:enhance-ability-phb}",
            "Преобразование",
            "К"
          ]
        ]
      },
      {
        "type": "table",
        "caption": "Заклинания 3 уровня",
        "colLabels": [
          "Заклинание",
          "Школа",
          "Особое"
        ],
        "colStyles": [
          "w-2/5 text-left",
          "w-1/3 text-left",
          "w-1/4 text-center"
        ],
        "rows": [
          [
            "{@spell Газообразная форма [Gaseous Form]|url:gaseous-form-phb}",
            "Преобразование",
            "К"
          ],
          [
            "{@spell Гипнотический узор [Hypnotic Pattern]|url:hypnotic-pattern-phb}",
            "Иллюзия",
            "К"
          ],
          [
            "{@spell Дневной свет [Daylight]|url:daylight-phb}",
            "Воплощение",
            "—"
          ],
          [
            "{@spell Замедление [Slow]|url:slow-phb}",
            "Преобразование",
            "К"
          ],
          [
            "{@spell Защита от энергии [Protection from Energy]|url:protection-from-energy-phb}",
            "Ограждение",
            "К"
          ],
          [
            "{@spell Зловонное облако [Stinking Cloud]|url:stinking-cloud-phb}",
            "Вызов",
            "К"
          ],
          [
            "{@spell Контрзаклинание [Counterspell]|url:counterspell-phb}",
            "Ограждение",
            "—"
          ],
          [
            "{@spell Мерцание [Blink]|url:blink-phb}",
            "Преобразование",
            "—"
          ],
          [
            "{@spell Метель [Sleet Storm]|url:sleet-storm-phb}",
            "Вызов",
            "К"
          ],
          [
            "{@spell Молния [Lightning Bolt]|url:lightning-bolt-phb}",
            "Воплощение",
            "—"
          ],
          [
            "{@spell Образ [Major Image]|url:major-image-phb}",
            "Иллюзия",
            "К"
          ],
          [
            "{@spell Огненный шар [Fireball]|url:fireball-phb}",
            "Воплощение",
            "—"
          ],
          [
            "{@spell Подводное дыхание [Water Breathing]|url:water-breathing-phb}",
            "Преобразование",
            "Р"
          ],
          [
            "{@spell Подсматривание [Clairvoyance]|url:clairvoyance-phb}",
            "Прорицание",
            "К, М"
          ],
          [
            "{@spell Полёт [Fly]|url:fly-phb}",
            "Преобразование",
            "К"
          ],
          [
            "{@spell Прикосновение вампира [Vampiric Touch]|url:vampiric-touch-phb}",
            "Некромантия",
            "К"
          ],
          [
            "{@spell Рассеивание магии [Dispel Magic]|url:dispel-magic-phb}",
            "Ограждение",
            "—"
          ],
          [
            "{@spell Ужас [Fear]|url:fear-phb}",
            "Иллюзия",
            "К"
          ],
          [
            "{@spell Ускорение [Haste]|url:haste-phb}",
            "Преобразование",
            "К"
          ],
          [
            "{@spell Хождение по воде [Water Walk]|url:water-walk-phb}",
            "Преобразование",
            "Р"
          ],
          [
            "{@spell Языки [Tongues]|url:tongues-phb}",
            "Прорицание",
            "—"
          ]
        ]
      },
      {
        "type": "table",
        "caption": "Заклинания 4 уровня",
        "colLabels": [
          "Заклинание",
          "Школа",
          "Особое"
        ],
        "colStyles": [
          "w-2/5 text-left",
          "w-1/3 text-left",
          "w-1/4 text-center"
        ],
        "rows": [
          [
            "{@spell Высшая невидимость [Greater Invisibility]|url:greater-invisibility-phb}",
            "Иллюзия",
            "К"
          ],
          [
            "{@spell Град [Ice Storm]|url:ice-storm-phb}",
            "Воплощение",
            "—"
          ],
          [
            "{@spell Едкий шар [Vitriolic Sphere]|url:vitriolic-sphere-phb}",
            "Воплощение",
            "—"
          ],
          [
            "{@spell Изгнание [Banishment]|url:banishment-phb}",
            "Ограждение",
            "К"
          ],
          [
            "{@spell Каменная кожа [Stoneskin]|url:stoneskin-phb}",
            "Преобразование",
            "К, М"
          ],
          [
            "{@spell Огненный щит [Fire Shield]|url:fire-shield-phb}",
            "Воплощение",
            "—"
          ],
          [
            "{@spell Очарование монстра [Charm Monster]|url:charm-monster-phb}",
            "Очарование",
            "—"
          ],
          [
            "{@spell Переносящая дверь [Dimension Door]|url:dimension-door-phb}",
            "Вызов",
            "—"
          ],
          [
            "{@spell Подчинение зверя [Dominate Beast]|url:dominate-beast-phb}",
            "Очарование",
            "К"
          ],
          [
            "{@spell Полиморф [Polymorph]|url:polymorph-phb}",
            "Преобразование",
            "К"
          ],
          [
            "{@spell Смятение [Confusion]|url:confusion-phb}",
            "Очарование",
            "К"
          ],
          [
            "{@spell Стена огня [Wall of Fire]|url:wall-of-fire-phb}",
            "Воплощение",
            "К"
          ],
          [
            "{@spell Усыхание [Blight]|url:blight-phb}",
            "Некромантия",
            "—"
          ]
        ]
      },
      {
        "type": "table",
        "caption": "Заклинания 5 уровня",
        "colLabels": [
          "Заклинание",
          "Школа",
          "Особое"
        ],
        "colStyles": [
          "w-2/5 text-left",
          "w-1/3 text-left",
          "w-1/4 text-center"
        ],
        "rows": [
          [
            "{@spell Длань Бигби [Bigby's Hand]|url:bigbys-hand-phb}",
            "Воплощение",
            "К"
          ],
          [
            "{@spell Конус холода [Cone of Cold]|url:cone-of-cold-phb}",
            "Воплощение",
            "—"
          ],
          [
            "{@spell Круг телепортации [Teleportation Circle]|url:teleportation-circle-phb}",
            "Вызов",
            "М"
          ],
          [
            "{@spell Нашествие насекомых [Insect Plague]|url:insect-plague-phb}",
            "Вызов",
            "К"
          ],
          [
            "{@spell Облако смерти [Cloudkill]|url:cloudkill-phb}",
            "Вызов",
            "К"
          ],
          [
            "{@spell Оживление вещей [Animate Objects]|url:animate-objects-phb}",
            "Преобразование",
            "К"
          ],
          [
            "{@spell Подчинение личности [Dominate Person]|url:dominate-person-phb}",
            "Очарование",
            "К"
          ],
          [
            "{@spell Притворство [Seeming]|url:seeming-phb}",
            "Иллюзия",
            "—"
          ],
          [
            "{@spell Синаптический разряд [Synaptic Static]|url:synaptic-static-phb}",
            "Очарование",
            "—"
          ],
          [
            "{@spell Сотворение [Creation]|url:creation-phb}",
            "Иллюзия",
            "—"
          ],
          [
            "{@spell Стена камня [Wall of Stone]|url:wall-of-stone-phb}",
            "Воплощение",
            "К"
          ],
          [
            "{@spell Телекинез [Telekinesis]|url:telekinesis-phb}",
            "Преобразование",
            "К"
          ],
          [
            "{@spell Удержание чудовища [Hold Monster]|url:hold-monster-phb}",
            "Очарование",
            "К"
          ]
        ]
      },
      {
        "type": "table",
        "caption": "Заклинания 6 уровня",
        "colLabels": [
          "Заклинание",
          "Школа",
          "Особое"
        ],
        "colStyles": [
          "w-2/5 text-left",
          "w-1/3 text-left",
          "w-1/4 text-center"
        ],
        "rows": [
          [
            "{@spell Движение почвы [Move Earth]|url:move-earth-phb}",
            "Преобразование",
            "К"
          ],
          [
            "{@spell Истинное зрение [True Seeing]|url:true-seeing-phb}",
            "Прорицание",
            "М"
          ],
          [
            "{@spell Круг смерти [Circle of Death]|url:circle-of-death-phb}",
            "Некромантия",
            "М"
          ],
          [
            "{@spell Магические врата [Arcane Gate]|url:arcane-gate-phb}",
            "Вызов",
            "К"
          ],
          [
            "{@spell Множественное внушение [Mass Suggestion]|url:mass-suggestion-phb}",
            "Очарование",
            "—"
          ],
          [
            "{@spell Окаменение [Flesh to Stone]|url:flesh-to-stone-phb}",
            "Преобразование",
            "К"
          ],
          [
            "{@spell Отилюков ледяной шар [Otiluke's Freezing Sphere]|url:otilukes-freezing-sphere-phb}",
            "Воплощение",
            "—"
          ],
          [
            "{@spell Цепная молния [Chain Lightning]|url:chain-lightning-phb}",
            "Воплощение",
            "—"
          ],
          [
            "{@spell Разящее око [Eyebite]|url:eyebite-phb}",
            "Некромантия",
            "К"
          ],
          [
            "{@spell Распад [Disintegrate]|url:disintegrate-phb}",
            "Преобразование",
            "—"
          ],
          [
            "{@spell Солнечный луч [Sunbeam]|url:sunbeam-phb}",
            "Воплощение",
            "К"
          ],
          [
            "{@spell Сфера неуязвимости [Globe of Invulnerability]|url:globe-of-invulnerability-phb}",
            "Ограждение",
            "К"
          ]
        ]
      },
      {
        "type": "table",
        "caption": "Заклинания 7 уровня",
        "colLabels": [
          "Заклинание",
          "Школа",
          "Особое"
        ],
        "colStyles": [
          "w-2/5 text-left",
          "w-1/3 text-left",
          "w-1/4 text-center"
        ],
        "rows": [
          [
            "{@spell Замедленный огненный шар [Delayed Blast Fireball]|url:delayed-blast-fireball-phb}",
            "Воплощение",
            "К"
          ],
          [
            "{@spell Изменение тяготения [Reverse Gravity]|url:reverse-gravity-phb}",
            "Преобразование",
            "К"
          ],
          [
            "{@spell Огненная буря [Fire Storm]|url:fire-storm-phb}",
            "Воплощение",
            "—"
          ],
          [
            "{@spell Перст смерти [Finger of Death]|url:finger-of-death-phb}",
            "Некромантия",
            "—"
          ],
          [
            "{@spell Радужные брызги [Prismatic Spray]|url:prismatic-spray-phb}",
            "Воплощение",
            "—"
          ],
          [
            "{@spell Телепортация [Teleport]|url:teleport-phb}",
            "Вызов",
            "—"
          ],
          [
            "{@spell Уход в иной план [Plane Shift]|url:plane-shift-phb}",
            "Вызов",
            "М"
          ],
          [
            "{@spell Эфирность [Etherealness]|url:etherealness-phb}",
            "Вызов",
            "—"
          ]
        ]
      },
      {
        "type": "table",
        "caption": "Заклинания 8 уровня",
        "colLabels": [
          "Заклинание",
          "Школа",
          "Особое"
        ],
        "colStyles": [
          "w-2/5 text-left",
          "w-1/3 text-left",
          "w-1/4 text-center"
        ],
        "rows": [
          [
            "{@spell Воспламеняющаяся туча [Incendiary Cloud]|url:incendiary-cloud-phb}",
            "Вызов",
            "К"
          ],
          [
            "{@spell Демиплан [Demiplane]|url:demiplane-phb}",
            "Вызов",
            "—"
          ],
          [
            "{@spell Землетрясение [Earthquake]|url:earthquake-phb}",
            "Преобразование",
            "К"
          ],
          [
            "{@spell Подчинение чудовища [Dominate Monster]|url:dominate-monster-phb}",
            "Очарование",
            "К"
          ],
          [
            "{@spell Слово силы: ошеломление [Power Word Stun]|url:power-word-stun-phb}",
            "Очарование",
            "—"
          ],
          [
            "{@spell Солнечный ожог [Sunburst]|url:sunburst-phb}",
            "Воплощение",
            "—"
          ]
        ]
      },
      {
        "type": "table",
        "caption": "Заклинания 9 уровня",
        "colLabels": [
          "Заклинание",
          "Школа",
          "Особое"
        ],
        "colStyles": [
          "w-2/5 text-left",
          "w-1/3 text-left",
          "w-1/4 text-center"
        ],
        "rows": [
          [
            "{@spell Врата [Gate]|url:gate-phb}",
            "Вызов",
            "К, М"
          ],
          [
            "{@spell Желание [Wish]|url:wish-phb}",
            "Вызов",
            "—"
          ],
          [
            "{@spell Метеоритный дождь [Meteor Swarm]|url:meteor-swarm-phb}",
            "Воплощение",
            "—"
          ],
          [
            "{@spell Остановка времени [Time Stop]|url:time-stop-phb}",
            "Преобразование",
            "—"
          ],
          [
            "{@spell Слово силы: смерть [Power Word Kill]|url:power-word-kill-phb}",
            "Очарование",
            "—"
          ]
        ]
      }
    ],
    "updatedAt": "2026-01-18T09:10:36.602542Z",
    "userId": "Magistrus",
    "hitDice": {
      "label": "к6",
      "value": "d6",
      "maxValue": 6,
      "avg": 4
    },
    "primaryCharacteristics": "Харизма",
    "proficiency": {
      "armor": "",
      "weapon": "Простое дальнобойное, Простое рукопашное",
      "tool": "",
      "skill": "Выберите 2 навыка из следующих: Аркана, Обман, Проницательность, Запугивание, Убеждение, Религия"
    },
    "equipment": [
      "Выберите один из вариантов:",
      {
        "type": "list",
        "attrs": {
          "type": "unordered"
        },
        "content": [
          "А) {@item копьё|url:spear-phb}, 2 {@item кинжала|url:dagger-phb}, {@item магическая фокусировка (кристалл)|url:crystal-phb}, {@item набор исследователя подземелий|url:dungeoneer-s-pack-phb} и 28 зм;",
          "Б) 50 зм."
        ]
      }
    ],
    "savingThrows": "Телосложение, Харизма",
    "features": [
      {
        "isSubclass": false,
        "key": "ispolzovanie-zaklinanij",
        "level": 1,
        "name": "Использование заклинаний",
        "description": [
          "Вы можете накладывать заклинания, используя свою врождённую магию. Правила наложения заклинаний см. в главе 7. Ниже подробно описано, как применять эти правила к заклинаниям чародея, которые будут перечислены в списке заклинаний чародея далее в описании класса.",
          "{@b Заговоры.} Вы знаете 4 заговора по вашему выбору из списка заклинаний чародея. Рекомендуются: {@spell Свет [Light]|url:light-phb}, {@spell Фокусы [Prestidigitation]|url:prestidigitation-phb}, {@spell Электрошок [Shocking Grasp]|url:shocking-grasp-phb} и {@spell Чародейская вспышка [Sorcerous Burst]|url:sorcerous-burst-phb}. Каждый раз, когда вы получаете уровень чародея, вы можете заменить 1 из ваших заговоров другим заговором по вашему выбору из списка заклинаний чародея. При достижении 4 и 10 уровней чародея вы изучаете дополнительный заговор по вашему выбору из списка заклинаний чародея, как показано в столбце «Заговоры» из таблицы «Умения чародея».",
          "{@b Ячейки заклинаний.} Таблица «Умения чародея» показывает, сколько ячеек заклинаний вы можете использовать для заклинаний 1+ уровня. Вы восстанавливаете все потраченные ячейки, когда заканчиваете {@glossary продолжительный отдых|url:long-rest-phb}.",
          "{@b Подготовленные заклинания 1+ уровня.} Вы подготавливаете список заклинаний 1+ уровня, которые доступны вам для использования с помощью этого умения. Для начала выберите 2 заклинания 1 уровня из списка заклинаний чародея. Рекомендуются: {@spell Огненные ладони [Burning Hands]|url:burning-hands-phb} и {@spell Обнаружение магии [Detect Magic]|url:detect-magic-phb}.",
          "Количество подготовленных заклинаний увеличивается по мере того, как вы получаете уровни чародея, как показано в столбце «Подг. закл.» из таблицы «Умения чародея». Каждый раз, когда это число увеличивается, выберите дополнительные заклинания из списка заклинаний чародея, чтобы их количество соответствовало значению в таблице «Умения чародея». Выбранные заклинания должны быть того уровня, для которых у вас есть ячейки заклинаний. Например, если вы чародей 3 уровня, ваш список подготовленных заклинаний может включать 6 заклинаний чародея 1 и 2 уровней в любой комбинации.",
          "Если другое умение чародея даёт вам всегда подготовленные заклинания, то эти заклинания не учитываются в количестве, которое вы можете подготовить с помощью этого умения, но в остальном они считаются заклинаниями чародея для вас.",
          "{@b Изменение подготовленных заклинаний.} Каждый раз, когда вы получаете уровень чародея, вы можете изменить одно заклинание из вашего списка на другое заклинание из списка заклинаний чародея, для которых у вас имеется ячейка заклинаний.",
          "{@b Заклинательная характеристика.} Харизма — это ваша заклинательная характеристика для ваших заклинаний чародея.",
          "{@b Заклинательная фокусировка.} В качестве заклинательной фокусировки для ваших заклинаний чародея вы можете использовать магическую фокусировку."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "vrozdennoe-carodejstvo",
        "level": 1,
        "name": "Врождённое чародейство",
        "description": [
          "Событие в вашем прошлом оставило неизгладимый след, наполнив вас бурлящей {@glossary магией|url:magic-phb}. {@glossary Бонусным действием|url:bonus-action-phb} вы можете выпустить эту магию на 1 минуту, во время которой вы получаете следующие эффекты:",
          {
            "type": "list",
            "attrs": {
              "type": "unordered"
            },
            "content": [
              "{@glossary Сл.|url:difficulty-class-phb} {@glossary спасбросков|url:saving-throw-phb} ваших {@glossary заклинаний|url:spell-phb} чародея увеличивается на 1.",
              "Вы получаете {@glossary преимущество|url:advantage-phb} на {@glossary броски атаки|url:attack-roll-phb} {@glossary заклинаний|url:spell-phb} чародея, которые вы накладываете."
            ]
          },
          "Вы можете использовать эту способность дважды и восстанавливаете все использованные её применения после {@glossary продолжительного отдыха|url:long-rest-phb}."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "istocnik-magii",
        "level": 2,
        "name": "Источник магии",
        "description": [
          "Вы можете воспользоваться источником магии внутри себя. Этот источник представлен очками чародейства, которые позволяют вам создавать различные магические эффекты.",
          "У вас есть 2 очка чародейства, и вы получаете больше по мере повышения уровня, как указано в колонке «Очки чародейства» таблицы «Умения чародея». Вы не можете иметь больше очков чародейства, чем указано для вашего уровня. Вы восстанавливаете все потраченные очки чародейства после {@glossary продолжительного отдыха|url:long-rest-phb}.",
          "Вы можете использовать свои очки чародейства для активации следующих опций, а также других особенностей, таких как {@class Метамагия|url:metamagic-phb}, которые требуют траты очков.",
          "Преобразование ячеек заклинаний в очки чародейства. Вы можете потратить ячейку заклинания, чтобы получить количество очков чародейства, равное уровню ячейки (действие не требуется).",
          "Создание ячеек заклинаний. {@glossary Бонусным действием|url:bonus-action-phb} вы можете преобразовать неиспользованные очки чародейства в одну ячейку заклинания. Таблица «Создание ячеек заклинаний» показывает стоимость создания ячейки заклинания определённого уровня и минимальный уровень чародея, который вам нужен, чтобы создать ячейку. Вы не можете создать ячейку заклинания выше 5 уровня.",
          "Любая созданная с помощью этой особенности ячейка заклинания исчезает, когда вы завершаете {@glossary продолжительный отдых|url:long-rest-phb}.",
          {
            "type": "table",
            "caption": "Создание ячеек заклинаний",
            "colLabels": [
              "Уровень ячейки заклинания",
              "Стоимость очков чародейства",
              "Минимальный уровень чародея"
            ],
            "colStyles": [
              "text-center",
              "text-center",
              "text-center"
            ],
            "rows": [
              [
                "1",
                "2",
                "2"
              ],
              [
                "2",
                "3",
                "3"
              ],
              [
                "3",
                "5",
                "5"
              ],
              [
                "4",
                "6",
                "7"
              ],
              [
                "5",
                "7",
                "9"
              ]
            ]
          }
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "metamagia",
        "level": 2,
        "name": "Метамагия",
        "description": [
          "Поскольку ваша {@glossary магия|url:magic-phb} исходит изнутри, вы можете изменять свои {@glossary заклинания|url:spell-phb}, чтобы они соответствовали вашим нуждам. Вы получаете 2 варианта {@i Метамагии} на ваш выбор из раздела «Варианты Метамагии», описанного позже в этом классе. Вы используете выбранные варианты для временной модификации {@glossary заклинаний|url:spell-phb}, которые накладываете. Чтобы использовать вариант, вы должны потратить количество очков чародейства, которое он требует.",
          "Вы можете использовать только 1 вариант {@i Метамагии} на {@glossary заклинание|url:spell-phb} при его наложении, если иное не указано в описании варианта.",
          "Каждый раз, когда вы получаете уровень чародея, вы можете заменить 1 из своих вариантов {@i Метамагии} на тот, который вам неизвестен.",
          "Вы получаете ещё 2 варианта на 10 уровне чародея и ещё 2 варианта на 17 уровне чародея.",
          {
            "type": "heading",
            "attrs": {
              "level": 2
            },
            "content": [
              {
                "type": "text",
                "text": "Варианты Метамагии"
              }
            ]
          },
          "Следующие варианты доступны для вашего умения {@b Метамагия}. Эти варианты указаны в алфавитном порядке.",
          {
            "type": "heading",
            "attrs": {
              "level": 3
            },
            "content": [
              {
                "type": "text",
                "text": "Аккуратное заклинание [Careful Spell]"
              }
            ]
          },
          "{@i Стоимость: 1 очко чародейства.}",
          "Когда вы накладываете {@glossary заклинание|url:spell-phb}, которое вынуждает других {@glossary существ|url:creature-phb} совершить {@glossary спасбросок|url:saving-throw-phb}, вы можете защитить некоторых из них от магического воздействия. Для этого потратьте 1 очко чародейства и выберите существ в количестве, равном вашему модификатору Харизмы (минимум 1 существо). Указанные существа автоматически преуспевают в спасброске от данного заклинания и не получают урона вовсе, если бы получали половину урона при успешном спасброске.",
          {
            "type": "heading",
            "attrs": {
              "level": 3
            },
            "content": [
              {
                "type": "text",
                "text": "Далёкое заклинание [Distant Spell]"
              }
            ]
          },
          "{@i Стоимость: 1 очко чародейства.}",
          "При накладывании {@glossary заклинания|url:spell-phb}, дистанция которого 5 фт. и более, вы можете потратить 1 очко чародейства, чтобы удвоить это расстояние. При накладывании {@glossary заклинания|url:spell-phb} с дистанцией «Касание», вы можете потратить 1 очко чародейства, чтобы увеличить это расстояние до 30 фт.",
          {
            "type": "heading",
            "attrs": {
              "level": 3
            },
            "content": [
              {
                "type": "text",
                "text": "Ищущее заклинание [Seeking Spell]"
              }
            ]
          },
          "{@i Стоимость: 1 очко чародейства.}",
          "Если вы совершили {@glossary бросок атаки|url:attack-roll-phb} для {@glossary заклинания|url:spell-phb} и промахнулись, вы можете потратить 1 очко чародейства, чтобы перебросить к20 и должны использовать результат нового броска. Вы можете использовать Ищущее заклинание, даже если уже применили другой вариант {@b Метамагии} во время наложения заклинания.",
          {
            "type": "heading",
            "attrs": {
              "level": 3
            },
            "content": [
              {
                "type": "text",
                "text": "Непреодолимое заклинание [Heightened Spell]"
              }
            ]
          },
          "{@i Стоимость: 2 очка чародейства.}",
          "Когда вы накладываете {@glossary заклинание|url:spell-phb}, которое вынуждает {@glossary существо|url:creature-phb} совершить {@glossary спасбросок|url:saving-throw-phb} для защиты от его эффектов, вы можете потратить 2 очка чародейства, чтобы одна из целей заклинания совершала эти спасброски с {@glossary помехой|url:disadvantage-phb}.",
          {
            "type": "heading",
            "attrs": {
              "level": 3
            },
            "content": [
              {
                "type": "text",
                "text": "Неуловимое заклинание [Subtle Spell]"
              }
            ]
          },
          "{@i Стоимость: 1 очко чародейства.}",
          "Во время наложения {@glossary заклинания|url:spell-phb} вы можете потратить 1 очко чародейства, чтобы сотворить его без вербальных, соматических и материальных компонентов, за исключением материальных компонентов, которые расходуются заклинанием или имеют цену, указанную в описании заклинания.",
          {
            "type": "heading",
            "attrs": {
              "level": 3
            },
            "content": [
              {
                "type": "text",
                "text": "Преобразованное заклинание [Transmuted Spell]"
              }
            ]
          },
          "{@i Стоимость: 1 очко чародейства.}",
          "Когда вы накладываете {@glossary заклинание|url:spell-phb}, которое наносит урон, вы можете потратить 1 очко чародейства, чтобы изменить этот тип урона на кислотный, холодный, огненный, электрический, ядовитый или звуковой.",
          {
            "type": "heading",
            "attrs": {
              "level": 3
            },
            "content": [
              {
                "type": "text",
                "text": "Продлённое заклинание [Extended Spell]"
              }
            ]
          },
          "{@i Стоимость: 1 очко чародейства.}",
          "При накладывании {@glossary заклинания|url:spell-phb} с длительностью 1 минута или более, вы можете потратить 1 очко чародейства, чтобы удвоить это время, вплоть до максимального в 24 часа. Если данное заклинание требует {@glossary концентрации|url:concentration-phb}, вы получаете {@glossary преимущество|url:advantage-phb} на любой {@glossary спасбросок|url:saving-throw-phb}, совершаемый для поддержания концентрации.",
          {
            "type": "heading",
            "attrs": {
              "level": 3
            },
            "content": [
              {
                "type": "text",
                "text": "Удвоенное заклинание [Twinned Spell]"
              }
            ]
          },
          "{@i Стоимость: 1 очко чародейства.}",
          "Когда вы накладываете заклинание, такое как {@spell Очарование личности [Charm Person]|url:charm-person-phb}, которое можно наложить, используя ячейку более высокого уровня для выбора дополнительной цели, вы можете потратить 1 {@i очко чародейства}, чтобы увеличить эффективный уровень этого заклинания на 1.",
          {
            "type": "heading",
            "attrs": {
              "level": 3
            },
            "content": [
              {
                "type": "text",
                "text": "Усиленное заклинание [Empowered Spell]"
              }
            ]
          },
          "{@i Стоимость: 1 очко чародейства.}",
          "При совершении броска урона от {@glossary заклинания|url:spell-phb} вы можете потратить 1 очко чародейства, чтобы перебросить несколько костей урона, вплоть до количества, равного вашему модификатору Харизмы (минимум 1). Вы должны использовать новые значения. Вы можете использовать Усиленное заклинание, даже если уже применили другой вариант {@b Метамагии} во время наложения заклинания.",
          {
            "type": "heading",
            "attrs": {
              "level": 3
            },
            "content": [
              {
                "type": "text",
                "text": "Ускоренное заклинание [Quickened Spell]"
              }
            ]
          },
          "{@i Стоимость: 2 очка чародейства.}",
          "Когда вы накладываете {@glossary заклинание|url:spell-phb} с временем наложения «1 {@glossary действие|url:action-phb}», вы можете потратить 2 очка чародейства, чтобы изменить время наложения на «{@glossary бонусное действие|url:bonus-action-phb}» для этого заклинания. Вы не можете изменять заклинания таким образом, если уже наложили {@glossary заклинание|url:spell-phb} 1+ уровня в текущем ходу, а также не можете накладывать заклинания 1+ уровня в этот ход после такого изменения."
        ],
        "additional": "",
        "scaling": [
          {
            "level": 10,
            "name": "Метамагия",
            "description": [],
            "additional": "",
            "hideInSubclasses": false
          },
          {
            "level": 17,
            "name": "Метамагия",
            "description": [],
            "additional": "",
            "hideInSubclasses": false
          }
        ],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "podklass-carodea",
        "level": 3,
        "name": "Подкласс чародея",
        "description": [
          "Вы получаете подкласс чародея по вашему выбору. Подклассы {@i Аберрантный разум}, {@i чародейство порядка}, {@i Драконье чародейство} и {@i Дикое чародейство} подробно описаны после списка {@glossary заклинаний|url:spell-phb} этого класса. Подкласс — это специализация, которая предоставляет вам возможности на определённых уровнях чародея. В ходе дальнейшего развития вы получаете все умения вашего подкласса, которые соответствуют вашему уровню чародея или ниже."
        ],
        "additional": "",
        "scaling": [
          {
            "level": 6,
            "name": "Умение подкласса",
            "description": [
              "Вы получаете умения подкласса."
            ],
            "additional": "",
            "hideInSubclasses": false
          },
          {
            "level": 14,
            "name": "Умение подкласса",
            "description": [
              "Вы получаете умения подкласса."
            ],
            "additional": "",
            "hideInSubclasses": false
          },
          {
            "level": 18,
            "name": "Умение подкласса",
            "description": [
              "Вы получаете умения подкласса."
            ],
            "additional": "",
            "hideInSubclasses": false
          }
        ],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "ulucsenie-harakteristik",
        "level": 4,
        "name": "Улучшение характеристик",
        "description": [
          "Вы получаете черту {@feat Улучшение характеристик [Ability Score Improvement]|url:ability-score-improvement-phb} (см. главу 5) или другую черту по вашему выбору, требованиям которой вы соответствуете. Вы снова получаете эту черту на уровнях чародея 8, 12 и 16."
        ],
        "additional": "",
        "scaling": [
          {
            "level": 8,
            "name": "Улучшение характеристик",
            "description": [
              "Вы получаете черту {@feat Улучшение характеристик [Ability Score Improvement]|url:ability-score-improvement-phb} (см. главу 5) или другую черту по вашему выбору, требованиям которой вы соответствуете."
            ],
            "additional": "",
            "hideInSubclasses": false
          },
          {
            "level": 12,
            "name": "Улучшение характеристик",
            "description": [
              "Вы получаете черту {@feat Улучшение характеристик [Ability Score Improvement]|url:ability-score-improvement-phb} (см. главу 5) или другую черту по вашему выбору, требованиям которой вы соответствуете."
            ],
            "additional": "",
            "hideInSubclasses": false
          },
          {
            "level": 16,
            "name": "Улучшение характеристик",
            "description": [
              "Вы получаете черту {@feat Улучшение характеристик [Ability Score Improvement]|url:ability-score-improvement-phb} (см. главу 5) или другую чертупо вашему выбору, требованиям которой вы соответствуете."
            ],
            "additional": "",
            "hideInSubclasses": false
          }
        ],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "vosstanovlenie-magii",
        "level": 5,
        "name": "Восстановление магии",
        "description": [
          "Когда вы завершаете {@glossary короткий отдых|url:short-rest-phb}, вы можете восстановить потраченные {@i очки чародейства}, но не больше числа, равного половине вашего уровня чародея (округляя в меньшую сторону). После использования этого умения вы не можете использовать его снова до завершения {@glossary продолжительного отдыха|url:long-rest-phb}."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "voplosennaa-magia",
        "level": 7,
        "name": "Воплощённая магия",
        "description": [
          "Если у вас не осталось использований {@i Врождённого чародейства}, вы можете потратить 2 очка чародейства, чтобы активировать {@b Врождённое чародейство} {@glossary бонусным действием|url:bonus-action-phb}.",
          "Кроме того, пока ваше умение {@i Врождённое чародейство} активно, вы можете применять до 2 вариантов вашей {@i Метамагии} на каждое накладываемое вами {@glossary заклинание|url:spell-phb}."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "epiceskaa-certa",
        "level": 19,
        "name": "Эпическая черта",
        "description": [
          "Вы получаете эпическую черту (см. главу 5) или другую черту по вашему выбору, требованиям которой вы соответствуете. Рекомендуется черта {@feat Дар пространственного путешествия [Boon of Dimensional Travel]|url:boon-of-dimensional-travel-phb}."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      },
      {
        "isSubclass": false,
        "key": "apofeoz-magii",
        "level": 20,
        "name": "Апофеоз магии",
        "description": [
          "Пока ваше умение {@i Врождённое чародейство} активно, вы можете использовать 1 вариант {@i Метамагии} в каждый свой ход без траты очков чародейства."
        ],
        "additional": "",
        "scaling": [],
        "hideInSubclasses": false
      }
    ],
    "table": [
      {
        "name": "Очки чародейства",
        "scaling": [
          {
            "level": 2,
            "value": "2"
          },
          {
            "level": 3,
            "value": "3"
          },
          {
            "level": 4,
            "value": "4"
          },
          {
            "level": 5,
            "value": "5"
          },
          {
            "level": 6,
            "value": "6"
          },
          {
            "level": 7,
            "value": "7"
          },
          {
            "level": 8,
            "value": "8"
          },
          {
            "level": 9,
            "value": "9"
          },
          {
            "level": 10,
            "value": "10"
          },
          {
            "level": 11,
            "value": "11"
          },
          {
            "level": 12,
            "value": "12"
          },
          {
            "level": 13,
            "value": "13"
          },
          {
            "level": 14,
            "value": "14"
          },
          {
            "level": 15,
            "value": "15"
          },
          {
            "level": 16,
            "value": "16"
          },
          {
            "level": 17,
            "value": "17"
          },
          {
            "level": 19,
            "value": "18"
          },
          {
            "level": 19,
            "value": "19"
          },
          {
            "level": 20,
            "value": "20"
          }
        ]
      },
      {
        "name": "Заговоры",
        "scaling": [
          {
            "level": 1,
            "value": "4"
          },
          {
            "level": 4,
            "value": "5"
          },
          {
            "level": 10,
            "value": "6"
          }
        ]
      },
      {
        "name": "Подг. Закл.",
        "scaling": [
          {
            "level": 1,
            "value": "2"
          },
          {
            "level": 2,
            "value": "4"
          },
          {
            "level": 3,
            "value": "6"
          },
          {
            "level": 4,
            "value": "7"
          },
          {
            "level": 5,
            "value": "9"
          },
          {
            "level": 6,
            "value": "10"
          },
          {
            "level": 7,
            "value": "11"
          },
          {
            "level": 8,
            "value": "12"
          },
          {
            "level": 9,
            "value": "14"
          },
          {
            "level": 10,
            "value": "15"
          },
          {
            "level": 11,
            "value": "16"
          },
          {
            "level": 13,
            "value": "17"
          },
          {
            "level": 15,
            "value": "18"
          },
          {
            "level": 17,
            "value": "19"
          },
          {
            "level": 18,
            "value": "20"
          },
          {
            "level": 19,
            "value": "21"
          },
          {
            "level": 20,
            "value": "22"
          }
        ]
      }
    ],
    "casterType": "FULL",
    "hasSubclasses": true,
    "name": {
      "rus": "Чародей",
      "eng": "Sorcerer"
    },
    "source": {
      "name": {
        "label": "PHB",
        "rus": "Книга игрока",
        "eng": "Player Handbook"
      },
      "group": {
        "label": "Basic",
        "rus": "Официальные источники"
      },
      "page": 156
    }
  }
];

export default optimizedClasses;
