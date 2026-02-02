# Классы (Classes) - Миграция и Сидирование

## Обзор

Этот документ описывает процесс миграции базы данных для добавления таблиц классов и сидирования данных классов из PHB 2024.

## Структура базы данных

Добавлены следующие модели в Prisma schema:

1. **CharacterClass** - Основная таблица классов
2. **ClassFeature** - Черты классов (связана с CharacterClass)
3. **Subclass** - Подклассы (связана с CharacterClass)
4. **SubclassFeature** - Черты подклассов (связана с Subclass)

## Применение миграции

### Локальная разработка

```bash
cd backend
npx prisma migrate dev --name add_classes_table
```

### Продакшен (Neon Database)

```bash
cd backend
npx prisma migrate deploy
```

После применения миграции выполните:

```bash
npx prisma generate
```

## Сидирование классов

### Сидирование всех классов из PHB 2024

```bash
cd backend
npm run seed:classes
```

Эта команда:
1. Удалит все существующие классы, черты и подклассы
2. Импортирует классы из `src/data/phb2024/classes.ts`
3. Создаст правильные связи между классами, чертами и подклассами

Ожидаемый вывод:
```
Starting to seed PHB 2024 classes...
Successfully seeded 12 classes:
  - Barbarian (Варвар)
    Features: 12
    Subclasses: 4
  - Bard (Бард)
    Features: 20
    Subclasses: 4
  - Cleric (Жрец)
    Features: 22
    Subclasses: 8
  - Druid (Друид)
    Features: 20
    Subclasses: 4
  - Fighter (Воин)
    Features: 20
    Subclasses: 4
  - Monk (Монах)
    Features: 20
    Subclasses: 4
  - Paladin (Паладин)
    Features: 20
    Subclasses: 4
  - Ranger (Следопыт)
    Features: 18
    Subclasses: 4
  - Rogue (Плут)
    Features: 22
    Subclasses: 4
  - Sorcerer (Чародей)
    Features: 19
    Subclasses: 4
  - Warlock (Колдун)
    Features: 12
    Subclasses: 4
  - Wizard (Волшебник)
    Features: 23
    Subclasses: 8

Done!
```

## Экспорт в CSV

Для генерации CSV файла с данными классов (для ручного импорта в другие системы):

```bash
cd backend
npm run generate:classes:csv
```

Эта команда создаст файл `classes.csv` в директории backend с основной информацией о классах.

### Формат CSV

Файл содержит следующие столбцы:
- externalId - Уникальный идентификатор
- name - Английское название
- nameRu - Русское название
- description - Описание
- hitDie - Кость хитов
- primaryAbility - Первичные характеристики (разделены " | ")
- savingThrows - Спасброски (разделены " | ")
- armorProficiencies - Владение доспехами (разделены " | ")
- weaponProficiencies - Владение оружием (разделены " | ")
- skillChoices - Навыки на выбор (разделены " | ")
- skillCount - Количество навыков
- subclassLevel - Уровень получения подкласса
- source - Источник данных (srd или phb2024)

**Примечание**: Включены только основные поля класса. Черты и подклассы не включены в CSV из-за их сложной вложенной структуры. Для полной миграции используйте скрипт сидирования.

## API Эндпоинты

После миграции и сидирования будут доступны следующие эндпоинты:

### Публичные (без аутентификации)

```
GET /api/classes                    - Получить все классы
GET /api/classes?source=phb2024    - Получить классы по источнику
GET /api/classes/:id                - Получить класс по ID
GET /api/classes/external/:externalId - Получить класс по внешнему ID
```

### Административные (требуют аутентификацию)

```
POST   /api/classes      - Создать новый класс
PUT    /api/classes/:id  - Обновить класс
DELETE /api/classes/:id  - Удалить класс
```

## Использование во Frontend

### Получение списка классов

```typescript
import { useBackendClasses } from '@/api/hooks';

const { data, isLoading, error } = useBackendClasses('phb2024');
```

### Получение одного класса

```typescript
import { useBackendClass } from '@/api/hooks';

const { data: classData } = useBackendClass(classId);
```

### Создание/обновление/удаление (для мастеров)

```typescript
import { classesApi } from '@/api/client';

// Создать
await classesApi.create(newClassData);

// Обновить
await classesApi.update(classId, updatedData);

// Удалить
await classesApi.delete(classId);
```

## Проверка работоспособности

### 1. Проверка базы данных

```bash
cd backend
npx prisma studio
```

Откроется Prisma Studio в браузере, где можно просмотреть все таблицы классов.

### 2. Проверка API

Запустите backend:
```bash
npm run dev
```

Проверьте эндпоинт:
```bash
curl http://localhost:3001/api/classes
```

Ожидаемый ответ:
```json
{
  "success": true,
  "data": {
    "classes": [
      {
        "id": "...",
        "externalId": "barbarian",
        "name": "Barbarian",
        "nameRu": "Варвар",
        ...
      }
    ]
  }
}
```

### 3. Проверка Frontend

1. Перейдите на главную страницу приложения
2. Нажмите на кнопку "Классы PHB 2024"
3. Убедитесь, что:
   - Список классов загружается
   - При клике на класс открываются детали
   - Для мастеров доступны кнопки редактирования и создания

## Данные

Данные классов взяты из файла:
```
src/data/phb2024/classes.ts
```

Этот файл содержит 12 классов из Player's Handbook 2024:
- Barbarian (Варвар)
- Bard (Бард)
- Cleric (Жрец)
- Druid (Друид)
- Fighter (Воин)
- Monk (Монах)
- Paladin (Паладин)
- Ranger (Следопыт)
- Rogue (Плут)
- Sorcerer (Чародей)
- Warlock (Колдун)
- Wizard (Волшебник)

Каждый класс включает:
- Описание
- Кость хитов
- Первичные характеристики
- Владение доспехами и оружием
- Навыки на выбор
- Черты класса (по уровням)
- Подклассы с чертами

## Решение проблем

### Миграция не применяется

Если миграция не применяется, убедитесь, что:
1. Переменная окружения `DATABASE_URL` установлена корректно
2. База данных доступна
3. У вас есть необходимые права на создание таблиц

### Сидирование не работает

Если сидирование не работает:
1. Проверьте, что миграция применена
2. Убедитесь, что файл `src/data/phb2024/classes.ts` существует
3. Проверьте логи на наличие ошибок

### API не работает

Если API не работает:
1. Проверьте, что backend запущен
2. Убедитесь, что CORS настроен корректно
3. Проверьте, что роут `/api/classes` добавлен в `src/app.ts`

## Дополнительная информация

- Документация API: `backend/CLASSES_API.md`
- Schema Prisma: `backend/prisma/schema.prisma`
- Данные классов: `src/data/phb2024/classes.ts`
- Фронтенд компонент: `src/components/ClassesPage.tsx`
