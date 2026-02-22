# План обновления данных D&D по PHB 2024

## Статус выполнения (2026-02-22)

### Уже реализовано в коде

- [x] Защищенный модуль создания/поддержки персонажей с привязкой к профилю
- [x] Полноценный flow прокачки (`PATCH /api/characters/:id/level-up`) с `levelHistory`
- [x] Поддержка скейла по уровню для заклинаний (cantrips/spells/slots) в создании и прокачке
- [x] Обработка конфликтов навыков (класс/предыстория/черта) с компенсационным выбором
- [x] Шаг снаряжения обновлен под PHB 2024:
  - [x] выборы в стартовом снаряжении класса (`choice`)
  - [x] альтернатива «взять золото вместо набора» (`or`)
  - [x] калькулятор бюджета при покупке за золото

### В процессе (по данным PHB 2024)

- [ ] Полная верификация equipment в БД против финального списка PHB 2024
- [ ] Обновление/перезаполнение 16 backgrounds финальными данными PHB 2024
- [ ] Полный импорт 48 subclasses и их features

## Передача следующему агенту (handoff)

Дата фиксации: **2026-02-22**

### Что уже сделано и проверено

- Прод и локальная БД синхронизированы (локал восстановлен из прод-дампа).
- На проде сделан бэкап перед работами:
  - `backups/pre_phb2024_20260222_172000.sql`
  - `backups/sync_prod_to_local_20260222_172546.sql`
- На локале сделан бэкап перед восстановлением:
  - `/tmp/local_pre_sync_20260222_202841.sql`
- Проверка ссылок `CharacterClass.startingEquipment -> Equipment` на проде:
  - результат: `OK: all class equipment links are valid` (битых `equipmentId` не найдено).

### Текущее состояние данных (прод = локал)

- `CharacterClass`: 12
- `Background`: 16
- `Equipment`: 293
- `Spell`: 429
- `Character`: 1

### Что незавершено

- Скрипт `backend/scripts/seed-phb2024-data.ts` добавлен, но требует адаптации к реальным `externalId` на проде:
  - классы имеют вид `barbarian-phb`, `wizard-phb` и т.д.;
  - многие предметы в `Equipment.externalId` тоже со суффиксом `-phb`.
- Из-за этого первый прогон сидера не обновил классы/подклассы полностью.

### Что делать следующему агенту (по порядку)

1. Доработать `backend/scripts/seed-phb2024-data.ts`:
   - резолв классов по вариантам `barbarian`, `barbarian-phb`, `barbarian-phb2024`;
   - резолв снаряжения по `externalId` с учетом `-phb` и по `name/nameRu`;
   - оставить только `upsert/update`, без `deleteMany` в проде.
2. Прогнать сидер на локале и убедиться, что:
   - `startingEquipment` у 12 классов в формате `fixed/choice/or`;
   - 16 backgrounds заполнены, `originFeat` резолвится в существующие `Feat.id`;
   - 48 subclasses созданы/обновлены.
3. Сделать dry-run аудит (лог) пропусков:
   - отсутствующие `equipment` ссылки;
   - неразрешенные `originFeat`;
   - пропущенные `subclass`/`class`.
4. Только после локальной проверки выполнить на проде:
   - новый бэкап;
   - запуск сидера;
   - повторный аудит и сохранение отчета в файл.
5. Отдельно довести `features` подклассов:
   - сейчас нужны полноценные `SubclassFeature` по уровням из PHB 2024 (не заглушки).

### Ограничения безопасности (обязательно)

- Не выполнять destructive команды для боевой БД:
  - не использовать `deleteMany` для `Character`, `Background`, `CharacterClass`, `Subclass` на проде.
- Любые изменения на проде только после свежего `pg_dump`.
- Все миграции/сиды должны быть идемпотентными (повторный запуск безопасен).

## Обзор задачи

Необходимо обновить базу данных приложения актуальными данными из **Player's Handbook 2024** (PHB 2024):
1. Начальное снаряжение для всех 12 классов
2. Данные по 16 предысториям (backgrounds)
3. Данные по 48 подклассам (4 на каждый класс)

---

## Источники данных

### Официальные источники
- **D&D Beyond** - https://www.dndbeyond.com/sources/dnd/phb-2024
- **Книга игрока 2024** (Player's Handbook 2024) - печатное/цифровое издание

### Справочные ресурсы (для проверки данных)
- https://www.wargamer.com/dnd/2024-backgrounds - полный список backgrounds PHB 2024
- https://www.wargamer.com/dnd/barbarian-5e-class-guide - гайды по классам с equipment
- https://www.wargamer.com/dnd/classes - обзор всех классов
- https://5e.tools/ - SRD данные (для сверки)

### API для получения данных
- **Open5e API** - https://api.open5e.com/ (SRD данные, не PHB 2024)
- Для PHB 2024 данные нужно вводить вручную из официальных источников

---

## Часть 1: Начальное снаряжение классов

### Структура данных в проекте

Файл: `backend/prisma/schema.prisma`
```prisma
model CharacterClass {
  startingEquipment   Json? // Rich equipment data from PHB 2024
  startingGold        Int      @default(0) // Starting gold amount
}
```

Маппер: `src/utils/classMapper.ts`
```typescript
equipment: backendClass.startingEquipment || [],
```

### Формат данных startingEquipment

```json
[
  "Вы начинаете со следующим снаряжением:",
  {
    "type": "list",
    "items": [
      "Секира",
      "4 ручных топора",
      "Набор путешественника",
      "15 зм"
    ]
  },
  "Или вы можете начать с 75 зм и купить снаряжение самостоятельно."
]
```

### Данные по классам PHB 2024

#### Barbarian (Варвар)
| Снаряжение | Альт. золото |
|------------|--------------|
| Greataxe (Секира), 4 Handaxes (4 ручных топора), Explorer's Pack (Набор путешественника), 15 GP | 75 GP |

#### Bard (Бард)
| Снаряжение | Альт. золото |
|------------|--------------|
| Rapier (Рапира), Entertainer's Pack (Набор артиста), Musical Instrument (Музыкальный инструмент), Dagger (Кинжал), 28 GP | 100 GP |

#### Cleric (Жрец)
| Снаряжение | Альт. золото |
|------------|--------------|
| Shield (Щит), Holy Symbol (Священный символ), Chain Mail или Scale Mail + Light Crossbow + 20 bolts, Mace или Warhammer, Priest's Pack (Набор священника) | 110 GP |

#### Druid (Друид)
| Снаряжение | Альт. золото |
|------------|--------------|
| Wooden Shield (Деревянный щит), Quarterstaff (Боевой посох), Leather Armor (Кожаный доспех), Druidic Focus (Друидический фокус), Explorer's Pack (Набор путешественника), 9 GP | 50 GP |

#### Fighter (Воин)
| Снаряжение | Альт. золото |
|------------|--------------|
| Chain Mail (Кольчуга) ИЛИ Leather Armor + Longbow + 20 arrows, Greatsword (Двуручный меч) ИЛИ 2 Martial Weapons, Light Crossbow + 20 bolts ИЛИ 2 Handaxes, Dungeoneer's Pack (Набор исследователя подземелий) | 175 GP |

#### Monk (Монах)
| Снаряжение | Альт. золото |
|------------|--------------|
| 10 Darts (10 дротиков), Dungeoneer's Pack (Набор исследователя подземелий), 11 GP | 50 GP |

#### Paladin (Паладин)
| Снаряжение | Альт. золото |
|------------|--------------|
| Chain Mail (Кольчуга), Shield (Щит), Greatsword (Двуручный меч) ИЛИ 2 Martial Weapons, 5 Javelins (5 метательных копий), Holy Symbol (Священный символ), Priest's Pack (Набор священника) | 150 GP |

#### Ranger (Следопыт)
| Снаряжение | Альт. золото |
|------------|--------------|
| Leather Armor (Кожаный доспех), 2 Shortswords (2 короткий меча), Longbow (Длинный лук) + 20 Arrows (20 стрел), Druidic Focus (Друидический фокус), Explorer's Pack (Набор путешественника) | 150 GP |

#### Rogue (Плут)
| Снаряжение | Альт. золото |
|------------|--------------|
| Rapier (Рапира) ИЛИ Shortsword (Короткий меч), Shortbow (Короткий лук) + 20 Arrows, Leather Armor (Кожаный доспех), 2 Daggers (2 кинжала), Thieves' Tools (Воровские инструменты), Burglar's Pack (Набор взломщика), 18 GP | 110 GP |

#### Sorcerer (Чародей)
| Снаряжение | Альт. золото |
|------------|--------------|
| 2 Daggers (2 кинжала), Arcane Focus (Магический фокус), Dungeoneer's Pack (Набор исследователя подземелий), 28 GP | 50 GP |

#### Warlock (Колдун)
| Снаряжение | Альт. золото |
|------------|--------------|
| Leather Armor (Кожаный доспех), Simple Weapon (Простое оружие), 2 Daggers (2 кинжала), Arcane Focus (Магический фокус), Dungeoneer's Pack (Набор исследователя подземелий), 15 GP | 100 GP |

#### Wizard (Волшебник)
| Снаряжение | Альт. золото |
|------------|--------------|
| Quarterstaff (Боевой посох), Arcane Focus (Магический фокус), Scholar's Pack (Набор учёного), Spellbook (Книга заклинаний), 5 GP | 55 GP |

---

## Часть 2: Предыстории (Backgrounds)

### Структура данных в проекте

Файл: `backend/prisma/schema.prisma`
```prisma
model Background {
  id                   String   @id @default(uuid())
  externalId           String   @unique
  name                 String
  nameRu               String
  description          String   @db.Text
  skillProficiencies   String[]
  toolProficiencies    String[]
  languages            Int
  startingGold         Int
  originFeat           String
  abilityScoreIncrease Json // { options: string[], amount: number[] }
  source               String
  equipment            BackgroundEquipment[]
}
```

Сервис: `backend/src/services/backgroundService.ts`

### Ключевое изменение PHB 2024

В PHB 2024 backgrounds теперь определяют:
- **Ability Score Increases** (раньше это давала раса)
- **Origin Feat** (стартовая черта)
- **Equipment** или 50 GP

### Формат abilityScoreIncrease

```json
{
  "options": ["charisma", "intelligence", "wisdom"],
  "amount": [2, 1]  // +2 к одному, +1 к другому, ИЛИ +1 ко всем трём
}
```

### Данные по backgrounds PHB 2024

#### 1. Acolyte (Прислужник)
| Поле | Значение |
|------|----------|
| Ability Scores | Charisma, Intelligence, Wisdom |
| Origin Feat | Magic Initiate (Cleric) |
| Skills | Insight, Religion |
| Tools | Calligrapher's Supplies |
| Equipment | Prayer book, holy symbol, parchment (5 sheets), robe, calligrapher's supplies, 8 GP |
| Alt Gold | 50 GP |

#### 2. Artisan (Ремесленник)
| Поле | Значение |
|------|----------|
| Ability Scores | Strength, Dexterity, Intelligence |
| Origin Feat | Crafter |
| Skills | Investigation, Persuasion |
| Tools | One Artisan's Tools (выбор) |
| Equipment | Artisan's tools, traveler's clothes, two pouches, 32 GP |
| Alt Gold | 50 GP |

#### 3. Charlatan (Шарлатан)
| Поле | Значение |
|------|----------|
| Ability Scores | Dexterity, Constitution, Charisma |
| Origin Feat | Skilled |
| Skills | Deception, Sleight of Hand |
| Tools | Forgery Kit |
| Equipment | Forgery kit, costume, fine clothes, 15 GP |
| Alt Gold | 50 GP |

#### 4. Criminal (Преступник)
| Поле | Значение |
|------|----------|
| Ability Scores | Dexterity, Constitution, Intelligence |
| Origin Feat | Alert |
| Skills | Sleight of Hand, Stealth |
| Tools | Thieves' Tools |
| Equipment | 2 daggers, thieves' tools, crowbar, two pouches, traveler's clothes, 16 GP |
| Alt Gold | 50 GP |

#### 5. Entertainer (Артист)
| Поле | Значение |
|------|----------|
| Ability Scores | Strength, Dexterity, Charisma |
| Origin Feat | Musician |
| Skills | Acrobatics, Performance |
| Tools | Musical Instrument (выбор) |
| Equipment | 2 costumes, mirror, perfume, traveler's clothes, 11 GP |
| Alt Gold | 50 GP |

#### 6. Farmer (Фермер) ⭐ НОВЫЙ
| Поле | Значение |
|------|----------|
| Ability Scores | Strength, Constitution, Wisdom |
| Origin Feat | Tough |
| Skills | Animal Handling, Nature |
| Tools | Carpenter's Tools |
| Equipment | Sickle, carpenter's tools, healer's kit, iron pot, shovel, traveler's clothes, 30 GP |
| Alt Gold | 50 GP |

#### 7. Guard (Стражник) ⭐ НОВЫЙ
| Поле | Значение |
|------|----------|
| Ability Scores | Strength, Intelligence, Wisdom |
| Origin Feat | Alert |
| Skills | Athletics, Perception |
| Tools | Gaming Set (выбор) |
| Equipment | Spear, light crossbow, 20 bolts, gaming set, hooded lantern, manacles, quiver, traveler's clothes, 12 GP |
| Alt Gold | 50 GP |

#### 8. Guide (Проводник) ⭐ НОВЫЙ
| Поле | Значение |
|------|----------|
| Ability Scores | Dexterity, Constitution, Wisdom |
| Origin Feat | Magic Initiate (Druid) |
| Skills | Stealth, Survival |
| Tools | Cartographer's Tools |
| Equipment | Shortbow, 20 arrows, cartographer's tools, bedroll, quiver, tent, traveler's clothes, 3 GP |
| Alt Gold | 50 GP |

#### 9. Hermit (Отшельник)
| Поле | Значение |
|------|----------|
| Ability Scores | Constitution, Wisdom, Charisma |
| Origin Feat | Healer |
| Skills | Medicine, Religion |
| Tools | Herbalism Kit |
| Equipment | Quarterstaff, herbalism kit, philosophy book, lamp, oil (3 flasks), traveler's clothes, 16 GP |
| Alt Gold | 50 GP |

#### 10. Merchant (Торговец) ⭐ НОВЫЙ
| Поле | Значение |
|------|----------|
| Ability Scores | Constitution, Intelligence, Charisma |
| Origin Feat | Lucky |
| Skills | Animal Handling, Persuasion |
| Tools | Navigator's Tools |
| Equipment | Navigator's tools, two pouches, traveler's clothes, 22 GP |
| Alt Gold | 50 GP |

#### 11. Noble (Благородный)
| Поле | Значение |
|------|----------|
| Ability Scores | Strength, Intelligence, Charisma |
| Origin Feat | Skilled |
| Skills | History, Persuasion |
| Tools | Gaming Set (выбор) |
| Equipment | Gaming set, fine clothes, perfume, 29 GP |
| Alt Gold | 50 GP |

#### 12. Sage (Мудрец)
| Поле | Значение |
|------|----------|
| Ability Scores | Constitution, Intelligence, Wisdom |
| Origin Feat | Magic Initiate (Wizard) |
| Skills | Arcana, History |
| Tools | Calligrapher's Supplies |
| Equipment | Quarterstaff, calligrapher's supplies, history book, parchment (8 sheets), robe, 8 GP |
| Alt Gold | 50 GP |

#### 13. Sailor (Моряк)
| Поле | Значение |
|------|----------|
| Ability Scores | Strength, Dexterity, Wisdom |
| Origin Feat | Tavern Brawler |
| Skills | Acrobatics, Perception |
| Tools | Navigator's Tools |
| Equipment | Dagger, navigator's tools, rope (50 ft), traveler's clothes, 20 GP |
| Alt Gold | 50 GP |

#### 14. Scribe (Писец) ⭐ НОВЫЙ
| Поле | Значение |
|------|----------|
| Ability Scores | Dexterity, Intelligence, Wisdom |
| Origin Feat | Skilled |
| Skills | Investigation, Perception |
| Tools | Calligrapher's Supplies |
| Equipment | Calligrapher's supplies, fine clothes, lamp, oil (3 flasks), parchment (12 sheets), 23 GP |
| Alt Gold | 50 GP |

#### 15. Soldier (Солдат)
| Поле | Значение |
|------|----------|
| Ability Scores | Strength, Dexterity, Constitution |
| Origin Feat | Savage Attacker |
| Skills | Athletics, Intimidation |
| Tools | Gaming Set (выбор) |
| Equipment | Spear, shortbow, 20 arrows, gaming set, healer's kit, quiver, traveler's clothes, 14 GP |
| Alt Gold | 50 GP |

#### 16. Wayfarer (Странник) ⭐ НОВЫЙ
| Поле | Значение |
|------|----------|
| Ability Scores | Dexterity, Wisdom, Charisma |
| Origin Feat | Lucky |
| Skills | Insight, Stealth |
| Tools | Thieves' Tools |
| Equipment | 2 daggers, thieves' tools, gaming set, bedroll, two pouches, traveler's clothes, 16 GP |
| Alt Gold | 50 GP |

---

## Часть 3: Подклассы (Subclasses)

### Структура данных в проекте

Файл: `backend/prisma/schema.prisma`
```prisma
model Subclass {
  id          String   @id @default(uuid())
  classId     String
  externalId  String
  name        String
  nameRu      String
  description Json?
  source      String   @default("phb2024")
  features    SubclassFeature[]
  classTable  Json?
}

model SubclassFeature {
  id          String   @id @default(uuid())
  subclassId  String
  name        String
  nameRu      String
  description Json?
  level       Int
}
```

### Список подклассов PHB 2024 (48 штук)

#### Barbarian (Варвар) - subclassLevel: 3
| ID | Name | NameRu |
|----|------|--------|
| berserker | Path of the Berserker | Путь Берсерка |
| wild-heart | Path of the Wild Heart | Путь Дикого Сердца |
| world-tree | Path of the World Tree ⭐ | Путь Мирового Древа |
| zealot | Path of the Zealot | Путь Фанатика |

#### Bard (Бард) - subclassLevel: 3
| ID | Name | NameRu |
|----|------|--------|
| dance | College of Dance ⭐ | Коллегия Танца |
| glamour | College of Glamour | Коллегия Очарования |
| lore | College of Lore | Коллегия Знаний |
| valor | College of Valor | Коллегия Доблести |

#### Cleric (Жрец) - subclassLevel: 3
| ID | Name | NameRu |
|----|------|--------|
| life | Life Domain | Домен Жизни |
| light | Light Domain | Домен Света |
| trickery | Trickery Domain | Домен Обмана |
| war | War Domain | Домен Войны |

#### Druid (Друид) - subclassLevel: 3
| ID | Name | NameRu |
|----|------|--------|
| land | Circle of the Land | Круг Земли |
| moon | Circle of the Moon | Круг Луны |
| sea | Circle of the Sea ⭐ | Круг Моря |
| stars | Circle of the Stars | Круг Звёзд |

#### Fighter (Воин) - subclassLevel: 3
| ID | Name | NameRu |
|----|------|--------|
| battle-master | Battle Master | Мастер Боевых Искусств |
| champion | Champion | Чемпион |
| eldritch-knight | Eldritch Knight | Мистический Рыцарь |
| psi-warrior | Psi Warrior | Пси-воин |

#### Monk (Монах) - subclassLevel: 3
| ID | Name | NameRu |
|----|------|--------|
| mercy | Warrior of Mercy | Воин Милосердия |
| shadow | Warrior of Shadow | Воин Тени |
| elements | Warrior of the Elements | Воин Стихий |
| open-hand | Warrior of the Open Hand | Воин Открытой Ладони |

#### Paladin (Паладин) - subclassLevel: 3
| ID | Name | NameRu |
|----|------|--------|
| devotion | Oath of Devotion | Клятва Преданности |
| glory | Oath of Glory | Клятва Славы |
| ancients | Oath of the Ancients | Клятва Древних |
| vengeance | Oath of Vengeance | Клятва Мести |

#### Ranger (Следопыт) - subclassLevel: 3
| ID | Name | NameRu |
|----|------|--------|
| beast-master | Beast Master | Повелитель Зверей |
| fey-wanderer | Fey Wanderer | Странник Фей |
| gloom-stalker | Gloom Stalker | Сумеречный Охотник |
| hunter | Hunter | Охотник |

#### Rogue (Плут) - subclassLevel: 3
| ID | Name | NameRu |
|----|------|--------|
| arcane-trickster | Arcane Trickster | Мистический Ловкач |
| assassin | Assassin | Убийца |
| soulknife | Soulknife | Нож Души |
| thief | Thief | Вор |

#### Sorcerer (Чародей) - subclassLevel: 3
| ID | Name | NameRu |
|----|------|--------|
| aberrant | Aberrant Sorcery | Аберрантное Колдовство |
| clockwork | Clockwork Sorcery | Механическое Колдовство |
| draconic | Draconic Sorcery | Драконье Колдовство |
| wild-magic | Wild Magic Sorcery | Дикая Магия |

#### Warlock (Колдун) - subclassLevel: 3
| ID | Name | NameRu |
|----|------|--------|
| archfey | Archfey Patron | Покровитель Архифея |
| celestial | Celestial Patron | Небесный Покровитель |
| fiend | Fiend Patron | Покровитель Исчадие |
| great-old-one | Great Old One Patron | Покровитель Великий Древний |

#### Wizard (Волшебник) - subclassLevel: 3
| ID | Name | NameRu |
|----|------|--------|
| abjurer | Abjurer | Ограждение |
| diviner | Diviner | Прорицание |
| evoker | Evoker | Воплощение |
| illusionist | Illusionist | Иллюзия |

---

## Шаги реализации

### Шаг 1: Проверить наличие Equipment в БД

Убедиться что все предметы снаряжения из списков выше существуют в таблице `Equipment`:
- Все оружие (weapons)
- Все доспехи (armor)
- Все наборы (packs): Explorer's Pack, Dungeoneer's Pack, Priest's Pack, etc.
- Все инструменты (tools): Thieves' Tools, Calligrapher's Supplies, etc.

### Шаг 2: Обновить Starting Equipment классов

1. Создать SQL миграцию или seed-скрипт
2. Обновить поле `startingEquipment` для каждого класса в формате JSON
3. Обновить поле `startingGold` с альтернативной суммой золота

### Шаг 3: Обновить Backgrounds

1. Удалить старые backgrounds (если есть)
2. Создать 16 новых backgrounds с данными из таблиц выше
3. Связать equipment через `BackgroundEquipment`

### Шаг 4: Добавить Subclasses

1. Для каждого класса добавить 4 подкласса
2. Для каждого подкласса добавить features по уровням
3. Данные по features брать из PHB 2024 или D&D Beyond

### Шаг 5: Обновить фронтенд (если нужно)

1. Проверить отображение нового формата `abilityScoreIncrease` для backgrounds
2. Проверить отображение подклассов на странице класса

---

## Пример seed-скрипта

```typescript
// backend/prisma/seed-phb2024.ts

import prisma from '../src/db';

const PHB2024_BACKGROUNDS = [
  {
    id: "acolyte",
    name: "Acolyte",
    nameRu: "Прислужник",
    description: "Вы провели годы в служении храму...",
    skillProficiencies: ["insight", "religion"],
    toolProficiencies: ["calligraphers-supplies"],
    languages: 2,
    startingGold: 8,
    originFeat: "magic-initiate-cleric",
    abilityScoreIncrease: {
      options: ["charisma", "intelligence", "wisdom"],
      amount: [2, 1]
    },
    source: "phb2024"
  },
  // ... остальные backgrounds
];

async function seedBackgrounds() {
  for (const bg of PHB2024_BACKGROUNDS) {
    await prisma.background.upsert({
      where: { externalId: bg.id },
      update: bg,
      create: { externalId: bg.id, ...bg }
    });
  }
}
```

---

## Контрольный список

- [ ] Все предметы equipment существуют в БД
- [ ] Starting equipment обновлен для 12 классов
- [ ] StartingGold обновлен для 12 классов
- [ ] 16 backgrounds созданы/обновлены
- [ ] Equipment связан с backgrounds
- [ ] Origin feats существуют в таблице Feat
- [ ] 48 subclasses добавлены (4 на класс)
- [ ] Features добавлены для каждого subclass
- [ ] Фронтенд корректно отображает данные

---

## Примечания

- ⭐ = Новый контент в PHB 2024 (не было в PHB 2014)
- Все русские названия должны соответствовать официальному переводу
- При добавлении features подклассов использовать формат JSON для description (поддержка таблиц, списков и т.д.)

---

## Часть 4: Улучшения для гибкости и удобства

### 4.1. Система выбора снаряжения

**Проблема**: Сейчас снаряжение показывается как статичный список. В PHB 2024 многие классы имеют варианты выбора (например, "Greatsword ИЛИ 2 Martial Weapons").

**Решение**: Интерактивный выбор снаряжения при создании персонажа.

```typescript
// Новый формат startingEquipment
interface EquipmentChoice {
  type: "fixed" | "choice" | "or";
  items?: EquipmentItem[];
  options?: EquipmentOption[];
  goldAlternative?: number;
}

interface EquipmentOption {
  label: string;
  items: EquipmentItem[];
}

// Пример для Fighter
const fighterEquipment: EquipmentChoice[] = [
  {
    type: "choice",
    options: [
      { label: "Тяжёлая броня", items: [{ id: "chain-mail", quantity: 1 }] },
      { label: "Лёгкая броня + Дальний бой", items: [
        { id: "leather-armor", quantity: 1 },
        { id: "longbow", quantity: 1 },
        { id: "arrows", quantity: 20 }
      ]}
    ]
  },
  {
    type: "choice",
    options: [
      { label: "Двуручный меч", items: [{ id: "greatsword", quantity: 1 }] },
      { label: "Два боевых оружия", items: [{ id: "martial-weapon-choice", quantity: 2 }] }
    ]
  },
  { type: "fixed", items: [{ id: "dungeoneers-pack", quantity: 1 }] },
  { type: "or", goldAlternative: 175 }
];
```

**UI**: Компонент EquipmentSelector с radio buttons для выбора вариантов.

---

### 4.2. Конструктор своей предыстории (Custom Background)

**Правило PHB 2024**: Игроки могут создавать свои предыстории, выбирая:
- 2 навыка из любых
- 1 инструмент или язык
- 1 Origin Feat
- Распределение +2/+1 или +1/+1/+1 по характеристикам

**Реализация**:

```typescript
// backend/prisma/schema.prisma
model Background {
  // ... существующие поля
  isCustom Boolean @default(false)
}

// Новая модель для кастомных предысторий пользователя
model UserBackground {
  id                   String   @id @default(uuid())
  userId               String
  name                 String
  skillProficiencies   String[]
  toolProficiency      String?
  extraLanguage        Boolean  @default(false)
  originFeatId         String
  abilityScoreChoice   String   // "2-1" или "1-1-1"
  abilityScores        String[] // выбранные характеристики
  createdAt            DateTime @default(now())
}
```

**UI**: Страница /backgrounds/custom с пошаговым мастером создания.

---

### 4.3. Сравнение подклассов

**Функционал**: Возможность сравнить 2-4 подкласса одного класса side-by-side.

**Реализация**:
- Страница /classes/{classId}/compare?subclasses=berserker,zealot
- Таблица с features по уровням
- Подсветка уникальных способностей
- Фильтрация по уровню

```typescript
// src/components/SubclassComparison.tsx
interface SubclassComparisonProps {
  classId: string;
  subclassIds: string[];
}

// Компонент показывает:
// - Описание каждого подкласса
// - Таблицу features по уровням
// - Визуальное сравнение сильных/слабых сторон
```

---

### 4.4. Поиск и фильтрация снаряжения

**Проблема**: Большой список снаряжения сложно просматривать.

**Решение**: Расширенная система фильтров и поиска.

```typescript
// GET /api/equipment?search=меч&category=weapon&minCost=10&maxCost=100

interface EquipmentFilters {
  search?: string;
  category?: "weapon" | "armor" | "tool" | "pack" | "adventuring";
  subcategory?: string; // "simple-melee", "martial-ranged", etc.
  minCost?: number;
  maxCost?: number;
  hasProperty?: string[]; // ["finesse", "thrown"]
  sortBy?: "name" | "cost" | "weight";
}
```

**UI**:
- Боковая панель с фильтрами
- Поиск с автодополнением
- Теги для быстрого выбора категорий
- Сортировка по имени/цене/весу

---

### 4.5. Калькулятор стоимости снаряжения

**Функционал**: В режиме "начать с золотом" показывать:
- Текущий бюджет
- Стоимость выбранных предметов
- Остаток
- Предупреждение о превышении бюджета

```typescript
// src/hooks/useEquipmentBudget.ts
interface EquipmentBudget {
  total: number;
  spent: number;
  remaining: number;
  selectedItems: EquipmentSelection[];
  addItem: (item: EquipmentItem) => void;
  removeItem: (itemId: string) => void;
  canAfford: (item: EquipmentItem) => boolean;
}
```

---

### 4.6. Мультиклассирование и снаряжение

**Правило**: При мультиклассировании персонаж не получает стартовое снаряжение нового класса.

**Реализация**:
- Флаг `isMulticlass` в процессе создания
- Если true, пропускать шаг выбора снаряжения для дополнительных классов
- Показывать только требования для мультиклассирования

```typescript
// Новое поле в CharacterClass
multiclassRequirements: {
  abilities: { [key: string]: number }; // { "strength": 13, "charisma": 13 }
  proficienciesGained: string[];
}
```

---

### 4.7. Экспорт персонажа в PDF

**Функционал**: Генерация PDF листа персонажа с:
- Всем выбранным снаряжением
- Информацией о предыстории
- Способностями подкласса
- Характеристиками

**Реализация**:
- Библиотека: `@react-pdf/renderer` или `jspdf`
- Шаблон официального листа D&D
- Возможность выбора языка (EN/RU)

```typescript
// src/services/pdfExport.ts
interface PDFExportOptions {
  language: "en" | "ru";
  includeSpells: boolean;
  includeEquipmentDescriptions: boolean;
  template: "official" | "compact" | "detailed";
}
```

---

### 4.8. Избранное и история

**Функционал**:
- Сохранение любимых классов/подклассов/backgrounds
- История просмотренных
- Быстрый доступ к часто используемым

```typescript
// backend/prisma/schema.prisma
model UserFavorite {
  id        String   @id @default(uuid())
  userId    String
  type      String   // "class" | "subclass" | "background" | "race"
  targetId  String
  createdAt DateTime @default(now())

  user User @relation(fields: [userId], references: [id])

  @@unique([userId, type, targetId])
}

model UserHistory {
  id        String   @id @default(uuid())
  userId    String
  type      String
  targetId  String
  viewedAt  DateTime @default(now())

  user User @relation(fields: [userId], references: [id])

  @@index([userId, viewedAt])
}
```

---

### 4.9. Рекомендации по классу/подклассу

**Функционал**: На основе выбранной расы и предыстории показывать рекомендованные классы/подклассы.

**Логика**:
- Если background даёт +2 CHA → рекомендовать Bard, Sorcerer, Warlock, Paladin
- Если раса даёт бонус к скорости → рекомендовать Monk, Rogue
- Если background "Soldier" → рекомендовать Fighter, Paladin

```typescript
// src/services/recommendations.ts
interface Recommendation {
  classId: string;
  subclassIds: string[];
  reason: string;
  matchScore: number; // 0-100
}

function getClassRecommendations(
  race: Race,
  background: Background,
  abilityScores: AbilityScores
): Recommendation[];
```

---

### 4.10. Пресеты персонажей

**Функционал**: Готовые комбинации раса + класс + предыстория для быстрого старта.

**Примеры**:
- "Эльф-волшебник" (High Elf + Wizard + Sage)
- "Дварф-паладин" (Mountain Dwarf + Paladin + Soldier)
- "Человек-плут" (Human + Rogue + Criminal)

```typescript
// backend/prisma/schema.prisma
model CharacterPreset {
  id            String   @id @default(uuid())
  name          String
  nameRu        String
  raceId        String
  classId       String
  subclassId    String?
  backgroundId  String
  description   String
  suggestedAbilities Json // { strength: 14, dexterity: 10, ... }
  isOfficial    Boolean @default(false)
  createdAt     DateTime @default(now())
}
```

---

### 4.11. Tooltips и справочник

**Проблема**: Новички не понимают термины (AC, HP, saving throw).

**Решение**: Интерактивные tooltips со справочной информацией.

```typescript
// Использование GlossaryTerm из schema
// Компонент автоматически подсвечивает термины

// src/components/GlossaryTooltip.tsx
interface GlossaryTooltipProps {
  text: string; // Текст с терминами
  highlightTerms: boolean;
}

// Парсит текст, находит термины из GlossaryTerm,
// оборачивает их в <Tooltip>
```

---

### 4.12. Оффлайн режим (PWA)

**Функционал**: Возможность просматривать данные без интернета.

**Реализация**:
- Service Worker для кеширования
- IndexedDB для локального хранения данных
- Синхронизация при восстановлении связи

```typescript
// public/sw.js
const CACHE_NAME = 'dnd-generator-v1';
const STATIC_ASSETS = [
  '/',
  '/classes',
  '/backgrounds',
  '/api/classes',
  '/api/backgrounds',
  // ...
];
```

---

### 4.13. Локализация

**Текущее состояние**: Частичная локализация (name/nameRu).

**Улучшение**: Полная поддержка i18n для всего интерфейса.

```typescript
// src/i18n/locales/ru.json
{
  "creator": {
    "steps": {
      "origin": "Происхождение",
      "class": "Класс",
      "abilities": "Характеристики",
      "equipment": "Снаряжение",
      "spells": "Заклинания",
      "details": "Детали",
      "review": "Обзор"
    },
    "equipment": {
      "startWithGold": "Начать с золотом",
      "useStartingEquipment": "Использовать начальное снаряжение",
      "remaining": "Осталось: {amount} зм"
    }
  }
}
```

---

### 4.14. Адаптивность мобильных устройств

**Улучшения для мобильных**:
- Сворачиваемые секции
- Swipe-навигация между шагами создания
- Оптимизированные таблицы (горизонтальный скролл)
- Нижняя панель навигации

---

### 4.15. Тёмная тема

**Реализация**:
- CSS переменные для цветов
- Toggle в настройках
- Автоопределение системной темы
- Сохранение выбора в localStorage

```css
:root {
  --bg-primary: #ffffff;
  --text-primary: #1a1a1a;
  --accent: #c9a227;
}

[data-theme="dark"] {
  --bg-primary: #1a1a1a;
  --text-primary: #e0e0e0;
  --accent: #d4af37;
}
```

---

## Приоритеты реализации

### Высокий приоритет (критично для MVP)
1. ✅ Обновление starting equipment классов
2. ✅ Обновление backgrounds
3. ✅ Добавление subclasses
4. Система выбора снаряжения (4.1)
5. Калькулятор стоимости (4.5)

### Средний приоритет (улучшение UX)
6. Конструктор своей предыстории (4.2)
7. Сравнение подклассов (4.3)
8. Поиск и фильтрация (4.4)
9. Tooltips и справочник (4.11)
10. Мобильная адаптивность (4.14)

### Низкий приоритет (nice-to-have)
11. Экспорт в PDF (4.7)
12. Избранное и история (4.8)
13. Рекомендации (4.9)
14. Пресеты (4.10)
15. PWA/Оффлайн (4.12)
16. Локализация (4.13)
17. Тёмная тема (4.15)
