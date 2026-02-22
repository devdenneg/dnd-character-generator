# План рефакторинга проекта D&D Character Generator

## Цели рефакторинга

1. Удалить статичные файлы D&D данных (классы, расы и т.д.) - теперь данные берутся с БД/бэкенда
2. Удалить seed-* файлы - данные уже загружены в БД
3. Удалить систему создания персонажа - будет переделана с нуля
4. Удалить неиспользуемые файлы и переменные
5. **НЕ трогать MD файлы**

---

## Этап 1: Удаление статичных файлов D&D данных

### 1.1 Frontend - папка src/data/

**Удалить полностью:**

```
src/data/
├── phb2024/
│   ├── index.ts
│   ├── races.ts
│   ├── classes.ts
│   ├── backgrounds.ts
│   ├── spells.ts
│   ├── feats.ts          ⚠️ Требует правки зависимостей
│   └── glossary.ts
├── glossary/
│   └── index.ts
├── translations/
│   └── ru.ts
├── classes.optimized.ts
└── index.ts
```

### 1.2 Файлы требующие правки ПЕРЕД удалением src/data/

| Файл | Что удалить |
|------|-------------|
| `src/components/wizard/BackgroundStep.tsx` | Импорт `getFeatByName` из `@/data/phb2024/feats` |
| `src/utils/pdfGenerator.ts` | Импорт `getFeatByName` из `@/data/phb2024/feats` |

### 1.3 JSON файлы в корне проекта

**Удалить:**

```
/bestiary.json     (~4.1MB) - данные монстров
/feats.json        (~354KB) - данные черт
/glossary.json     (~574KB) - глоссарий
/races.json        (~131KB) - данные рас
```

---

## Этап 2: Удаление seed-* и import-* файлов

### 2.1 Backend seed скрипты

**Удалить все файлы:**

```
backend/
├── seed-races.ts
├── seed-classes.ts
├── seed-classes-new.ts
├── seed-backgrounds.ts
├── seed-spells.ts
├── seed-equip.ts
├── seed-bestiary.ts
├── seed-features-only.ts
├── import-feats.ts
├── import-glossary.ts
├── fix-magic-data.ts
├── generate-classes-csv.ts
└── test-creation-flow.ts
```

### 2.2 Проверить package.json

Файл: `backend/package.json`

Удалить скрипты связанные с seed:
- `"seed:races"`
- `"seed:classes"`
- `"seed:backgrounds"`
- `"seed:spells"`
- `"seed:equip"`
- `"seed:bestiary"`
- и подобные

---

## Этап 3: Удаление системы создания персонажа

### 3.1 Frontend компоненты wizard

**Удалить всю папку:**

```
src/components/wizard/
├── WizardLayout.tsx       - Основной layout визарда
├── RaceStep.tsx           - Шаг выбора расы
├── ClassStep.tsx          - Шаг выбора класса
├── SkillsStep.tsx         - Шаг выбора навыков
├── AbilitiesStep.tsx      - Шаг распределения характеристик
├── BackgroundStep.tsx     - Шаг выбора предыстории
├── AbilityIncreaseStep.tsx - Шаг бонусов характеристик
├── EquipmentStep.tsx      - Шаг выбора снаряжения
├── SpellsStep.tsx         - Шаг выбора заклинаний
├── DetailsStep.tsx        - Шаг ввода деталей персонажа
├── SummaryStep.tsx        - Итоговый обзор
└── index.ts               - Экспорт компонентов
```

### 3.2 Связанные страницы

**Удалить:**

```
src/components/
├── MyCharactersPage.tsx   - Страница списка персонажей
└── CharacterSheet.tsx     - Лист персонажа
```

### 3.3 Store

**Удалить:**

```
src/store/
└── characterStore.ts      - Zustand store для wizard
```

### 3.4 Utils исключительно для wizard

**Удалить:**

```
src/utils/
├── validation.ts          - Валидация шагов wizard
├── calculations.ts        - Расчёты характеристик
├── armorClass.ts          - Расчёт класса брони
└── pdfGenerator.ts        - Генерация PDF персонажа
```

### 3.5 App.tsx - правки

**Удалить импорты:**

```typescript
// Удалить эти импорты
import {
  AbilitiesStep,
  AbilityIncreaseStep,
  BackgroundStep,
  ClassStep,
  DetailsStep,
  EquipmentStep,
  RaceStep,
  SkillsStep,
  SpellsStep,
  SummaryStep,
  WizardLayout,
} from "@/components/wizard";

import MyCharactersPage from "@/components/MyCharactersPage";
import CharacterSheet from "@/components/CharacterSheet";
```

**Удалить routes:**

```typescript
// Удалить эти маршруты
<Route path="/character" element={<ProtectedRoute><CharacterWizardPage /></ProtectedRoute>} />
<Route path="/my-characters" element={<ProtectedRoute><MyCharactersPage /></ProtectedRoute>} />
```

### 3.6 Backend - character endpoints

**Удалить файлы:**

```
backend/src/
├── controllers/characterController.ts
├── services/characterService.ts
├── routes/characters.ts
└── schemas/character.schema.ts
```

**Удалить из backend/src/app.ts:**

```typescript
// Удалить импорт и использование
import characterRoutes from './routes/characters';
app.use('/api/characters', characterRoutes);
```

### 3.7 API frontend

**Файл: `src/api/dnd5e.ts`**

Удалить функции:
- `createCharacter()`
- `getCharacters()`
- `getCharacter()`
- `updateCharacter()`
- `deleteCharacter()`

### 3.8 Prisma schema

**Файл: `backend/prisma/schema.prisma`**

Удалить модель:

```prisma
model Character {
  id              String   @id @default(uuid())
  userId          String
  user            User     @relation(fields: [userId], references: [id])
  name            String
  race            String
  class           String
  level           Int      @default(1)
  data            Json
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}
```

И связь в модели User:
```prisma
characters      Character[]
```

### 3.9 Contexts

**Файл: `src/contexts/AuthContext.tsx`**

Удалить использование `characterStore` если есть.

---

## Этап 4: Удаление неиспользуемых файлов

### 4.1 Utils - не используются

**Удалить:**

```
src/utils/
├── classMapper.ts         - Не используется в проекте
└── classTranslations.ts   - Не используется в проекте
```

### 4.2 Проверить constants

**Файл: `src/constants/menuItems.ts`**

Удалить пункты меню ведущие на:
- `/character`
- `/my-characters`

### 4.3 Проверить types

**После удаления wizard проверить использование:**

```
src/types/
├── character.ts      - Может частично использоваться справочниками
├── classes.ts        - Проверить использование
├── spellcasting.ts   - Проверить использование
└── equipment.ts      - Проверить использование
```

---

## Этап 5: Финальная проверка

### 5.1 Команды для проверки

```bash
# Frontend
cd /Users/negodyaev-dn/Documents/Generator
npm run lint
npm run build

# Backend
cd /Users/negodyaev-dn/Documents/Generator/backend
npm run build
```

### 5.2 Checklist

- [ ] TypeScript компиляция без ошибок
- [ ] ESLint без ошибок
- [ ] Frontend билдится успешно
- [ ] Backend билдится успешно
- [ ] Навигация работает (нет битых ссылок)
- [ ] Справочники работают (ClassesPage, RacesPage и т.д.)

---

## Порядок выполнения

| # | Действие | Риск | Зависимости |
|---|----------|------|-------------|
| 1 | Удалить seed-* и import-* файлы в backend/ | Низкий | Нет |
| 2 | Почистить scripts в backend/package.json | Низкий | После #1 |
| 3 | Удалить JSON файлы в корне проекта | Низкий | Нет |
| 4 | Почистить зависимости от src/data/ | Средний | Перед #5 |
| 5 | Удалить src/data/ папку | Средний | После #4 |
| 6 | Удалить backend character endpoints | Высокий | Нет |
| 7 | Удалить wizard компоненты | Высокий | Нет |
| 8 | Удалить characterStore | Высокий | После #7 |
| 9 | Удалить utils для wizard | Средний | После #7, #8 |
| 10 | Почистить App.tsx (импорты и routes) | Средний | После #7 |
| 11 | Удалить MyCharactersPage и CharacterSheet | Средний | После #8 |
| 12 | Удалить неиспользуемые utils | Низкий | Нет |
| 13 | Почистить constants/menuItems.ts | Низкий | После #10 |
| 14 | Обновить Prisma schema | Высокий | После #6 |
| 15 | Финальная проверка сборки | — | После всего |

---

## Что НЕ удалять

### MD файлы
- Все `*.md` файлы остаются

### Справочные страницы
```
src/components/
├── ClassesPage.tsx
├── RacesPage.tsx
├── BackgroundsPage.tsx
├── SpellsPage.tsx
├── EquipmentPage.tsx
├── FeatsPage.tsx
├── GlossaryPage.tsx
└── BestiaryPage.tsx
```

### Backend API для справочников
```
backend/src/
├── controllers/
│   ├── classController.ts
│   ├── raceController.ts
│   ├── backgroundController.ts
│   ├── spellController.ts
│   ├── equipmentController.ts
│   ├── featController.ts
│   ├── glossaryController.ts
│   └── monsterController.ts
├── services/ (аналогичные сервисы)
└── routes/ (аналогичные routes)
```

### Prisma модели справочников
```prisma
model Race { ... }
model RaceTrait { ... }
model CharacterClass { ... }
model ClassFeature { ... }
model Subclass { ... }
model SubclassFeature { ... }
model Background { ... }
model Equipment { ... }
model Spell { ... }
model Feat { ... }
model GlossaryTerm { ... }
model Monster { ... }
```

---

## Сводка файлов для удаления

### Всего файлов для удаления: ~45

| Категория | Количество файлов |
|-----------|-------------------|
| src/data/ | 10 файлов |
| JSON в корне | 4 файла |
| backend seed-* | 13 файлов |
| wizard компоненты | 12 файлов |
| character backend | 4 файла |
| utils | 6 файлов |
| store | 1 файл |
| pages | 2 файла |

---

*Дата создания: 2026-02-22*
