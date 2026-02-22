# План удаления функционала редактирования справочных данных

## Цель

Удалить возможность редактирования справочных данных (снаряжение, заклинания, предыстории, классы, расы) из пользовательского интерфейса. Это необходимо для:
1. Упрощения кодовой базы
2. Подготовки к созданию отдельной админ-панели
3. Разделения ролей: пользователи только читают, администраторы управляют через отдельную панель

---

## Затронутые файлы

### Frontend (src/)

#### 1. EquipmentPage.tsx
**Путь:** `src/components/EquipmentPage.tsx`
**Строк кода на удаление:** ~400

**Удалить:**
- Импорты: `Pencil`, `Plus`, `Save`, `Trash2` из lucide-react (строки 20-22, 27)
- Импорт `useMutation` из @tanstack/react-query (строка 16)
- Интерфейс `EquipmentFormData` (строки 52-66)
- State: `editingEquipment`, `isCreateModalOpen`, `isEditModalOpen` (строки 288-298)
- Mutations: `createEquipmentMutation`, `updateEquipmentMutation`, `deleteEquipmentMutation` (строки 301-331)
- Функции: `resetCreateForm`, `handleCreateEquipment`, `handleEditEquipment`, `handleSaveEquipment` (строки 333-388)
- Константа `canEdit` (строка 389)
- Кнопка "Создать" в header (строки 563-572)
- Кнопки Edit/Delete в SlideOverDrawer actions (строки 788-816)
- Весь Create/Edit Modal (строки 976-1369)

---

#### 2. SpellsPage.tsx
**Путь:** `src/components/SpellsPage.tsx`
**Строк кода на удаление:** ~300

**Удалить:**
- Импорты: `Pencil`, `Plus`, `Save`, `Trash2` (строки 17-18, 21, 27)
- Импорт `useMutation` (строка 16)
- Интерфейс `SpellFormData` (строки 51-64)
- State: `editingSpell`, `isCreateModalOpen`, `isEditModalOpen` (строки 288-303)
- Mutations: `createSpellMutation`, `updateSpellMutation`, `deleteSpellMutation` (строки 306-336)
- Функции: `resetCreateForm`, `handleCreateSpell`, `handleEditSpell`, `handleSaveSpell`, `handleToggleClass` (строки 338-421)
- Константа `canEdit` (строка 447)
- Кнопка "Создать" в header (строки 597-602)
- Кнопки Edit/Delete в SlideOverDrawer actions (строки 793-820)
- Весь Create/Edit Modal (строки 922-1210)

---

#### 3. BackgroundsPage.tsx
**Путь:** `src/components/BackgroundsPage.tsx`
**Строк кода на удаление:** ~500

**Удалить:**
- Импорты: `Pencil`, `Plus`, `Save`, `Trash2` (строки 16-17, 19, 23)
- Импорт `useMutation` (строка 11)
- Интерфейс `EquipmentWithQuantity`, `BackgroundFormData` (строки 62-83)
- State: `editingBackground`, `isCreateModalOpen`, `isEditModalOpen`, `selectedEquipmentId`, `newTool`, `equipmentSearchQuery`, `equipmentCategoryFilter` (строки 202-225)
- Hook `useBackendEquipmentMeta` - убрать условную загрузку для модалки (строка 228)
- Mutations: `createBackgroundMutation`, `updateBackgroundMutation`, `deleteBackgroundMutation` (строки 232-262)
- Функции: все handle* для редактирования (строки 264-416)
- Константа `canEdit` (строка 418)
- Кнопка "Создать" в header (строки 492-500)
- Кнопки Edit/Delete в SlideOverDrawer actions (строки 591-624)
- Весь Create/Edit Modal (строки 771-1265)

---

#### 4. API Client
**Путь:** `src/api/client.ts`

**Удалить методы:**

```typescript
// racesApi (строки 229-247)
- create
- update
- delete

// classesApi (строки 275-365)
- create
- update
- delete

// backgroundsApi (строки 393-441)
- create
- update
- delete

// spellsApi (строки 477-519)
- create
- update
- delete

// equipmentApi (строки 547-603)
- create
- update
- delete
```

---

### Backend (backend/src/)

#### 1. Routes - Удалить/закомментировать эндпоинты

**equipment.ts** (`backend/src/routes/equipment.ts`)
```typescript
// Удалить:
router.post("/", ...)      // Создание
router.put("/:id", ...)    // Обновление
router.delete("/:id", ...) // Удаление
```

**spells.ts** (`backend/src/routes/spells.ts`)
```typescript
// Удалить:
router.post("/", ...)
router.put("/:id", ...)
router.delete("/:id", ...)
```

**backgrounds.ts** (`backend/src/routes/backgrounds.ts`)
```typescript
// Удалить:
router.post("/", ...)
router.put("/:id", ...)
router.delete("/:id", ...)
```

**classes.ts** (`backend/src/routes/classes.ts`)
```typescript
// Удалить:
router.post("/", ...)
router.put("/:id", ...)
router.delete("/:id", ...)
```

**races.ts** (`backend/src/routes/races.ts`)
```typescript
// Удалить:
router.post("/", ...)
router.put("/:id", ...)
router.delete("/:id", ...)
```

---

#### 2. Services - Оставить, но пометить как internal

Сервисы (`*Service.ts`) содержат методы create/update/delete, которые используются для seed-скриптов и будут нужны для админ-панели. **НЕ УДАЛЯТЬ**, только убрать публичный доступ через роуты.

---

## Порядок выполнения

### Этап 1: Frontend - Удаление UI редактирования

1. **EquipmentPage.tsx**
   - [ ] Удалить импорты Pencil, Plus, Save, Trash2, useMutation
   - [ ] Удалить EquipmentFormData интерфейс
   - [ ] Удалить state для editing/modals
   - [ ] Удалить mutations
   - [ ] Удалить handle* функции для редактирования
   - [ ] Удалить canEdit константу
   - [ ] Удалить кнопку "Создать" из header
   - [ ] Удалить Edit/Delete кнопки из drawer actions
   - [ ] Удалить Create/Edit Modal целиком

2. **SpellsPage.tsx**
   - [ ] Аналогичные действия

3. **BackgroundsPage.tsx**
   - [ ] Аналогичные действия
   - [ ] Убрать условную загрузку equipment для модалки

### Этап 2: Frontend - Удаление API методов

4. **src/api/client.ts**
   - [ ] Удалить create/update/delete из racesApi
   - [ ] Удалить create/update/delete из classesApi
   - [ ] Удалить create/update/delete из backgroundsApi
   - [ ] Удалить create/update/delete из spellsApi
   - [ ] Удалить create/update/delete из equipmentApi

### Этап 3: Backend - Удаление роутов

5. **backend/src/routes/equipment.ts**
   - [ ] Удалить POST /
   - [ ] Удалить PUT /:id
   - [ ] Удалить DELETE /:id

6. **backend/src/routes/spells.ts**
   - [ ] Удалить POST /
   - [ ] Удалить PUT /:id
   - [ ] Удалить DELETE /:id

7. **backend/src/routes/backgrounds.ts**
   - [ ] Удалить POST /
   - [ ] Удалить PUT /:id
   - [ ] Удалить DELETE /:id

8. **backend/src/routes/classes.ts**
   - [ ] Удалить POST /
   - [ ] Удалить PUT /:id
   - [ ] Удалить DELETE /:id

9. **backend/src/routes/races.ts**
   - [ ] Удалить POST /
   - [ ] Удалить PUT /:id
   - [ ] Удалить DELETE /:id

### Этап 4: Проверка и очистка

10. **Проверить типы**
    - [ ] Удалить неиспользуемые типы из `src/types/api.ts` если есть
    - [ ] Проверить что нет ошибок TypeScript

11. **Тестирование**
    - [ ] Проверить что страницы открываются
    - [ ] Проверить что поиск и фильтрация работают
    - [ ] Проверить что детали открываются в drawer

---

## Что НЕ удалять

1. **Backend Services** - методы create/update/delete в сервисах нужны для:
   - Seed-скриптов
   - Будущей админ-панели
   - Миграций данных

2. **Upload функционал** - загрузка файлов остаётся, это отдельная функция

3. **Characters CRUD** - редактирование персонажей пользователями остаётся

4. **Rooms CRUD** - управление комнатами остаётся

---

## Оценка объёма работ

| Файл | Строк к удалению | Сложность |
|------|------------------|-----------|
| EquipmentPage.tsx | ~400 | Средняя |
| SpellsPage.tsx | ~300 | Средняя |
| BackgroundsPage.tsx | ~500 | Средняя |
| api/client.ts | ~150 | Низкая |
| Backend routes (5 файлов) | ~100 | Низкая |
| **Итого** | ~1450 | |

---

## После удаления

### Структура справочных страниц (чистая версия)

```
EquipmentPage
├── Header (только заголовок + счётчик)
├── Search + Sort
├── Filters (category, cost, properties)
├── Grid (карточки снаряжения)
└── SlideOverDrawer (только просмотр, без кнопок редактирования)

SpellsPage
├── Header (только заголовок + счётчик)
├── Search + Sort
├── Filters (class, school)
├── Level Tabs
├── Grid (карточки заклинаний)
└── SlideOverDrawer (только просмотр)

BackgroundsPage
├── Header (только заголовок + счётчик)
├── Search + Sort
├── Grid (карточки предысторий)
└── SlideOverDrawer (только просмотр)
```

---

## Подготовка к админ-панели

После удаления редактирования из основного приложения, следующий этап - создание отдельной админ-панели:

1. Отдельный route `/admin` с проверкой роли
2. Или отдельное приложение на поддомене `admin.dndgenerator.fun`
3. Восстановление CRUD эндпоинтов только для админов
4. Добавление аудит-логирования изменений
5. Bulk-операции (импорт/экспорт JSON)
