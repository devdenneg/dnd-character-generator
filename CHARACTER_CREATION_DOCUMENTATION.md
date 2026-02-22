# Character Creation Module Documentation

Дата: 2026-02-22

## 1. Что реализовано

В проекте реализован модуль создания и поддержки персонажей D&D:

- защищенный wizard создания персонажа;
- список персонажей текущего пользователя;
- редактирование персонажа;
- удаление персонажа;
- переключение приватности;
- публичный просмотр по short ID.

## 2. Роуты фронтенда

- `/character` - создание персонажа (только авторизованные).
- `/my-characters` - список персонажей пользователя (только авторизованные).
- `/my-characters/:id/edit` - редактирование персонажа (только авторизованные).
- `/my-characters/:id/level-up` - прокачка персонажа на следующий уровень (только авторизованные).
- `/character/:shortId` - публичный просмотр по short-link (доступ зависит от приватности).

Защита выполнена через компонент:

- `src/features/character-creator/components/RequireAuth.tsx`

Он блокирует доступ анрегу и показывает кнопки входа/регистрации.

## 3. Роуты backend API

Подключение:

- `backend/src/app.ts` -> `app.use("/api/characters", characterRoutes)`

Маршруты:

- `POST /api/characters` - создать
- `GET /api/characters` - список моих
- `GET /api/characters/:id` - получить мой по id
- `PUT /api/characters/:id` - обновить мой
- `PATCH /api/characters/:id/privacy` - изменить приватность
- `PATCH /api/characters/:id/level-up` - повысить уровень персонажа
- `DELETE /api/characters/:id` - удалить мой
- `GET /api/characters/s/:shortId` - публичный/owner доступ по shortId

Файл роутов:

- `backend/src/routes/characters.ts`

## 4. Привязка персонажа к профилю

Привязка выполняется на сервере строго по `req.userId` из JWT.

Критические места:

- `backend/src/controllers/characterController.ts`
  - в `create` берется `const userId = req.userId!`
- `backend/src/services/characterService.ts`
  - в `createCharacter` запись создается с `data: { userId, ... }`
  - во всех owner-операциях используется фильтр `where: { id, userId }` или `where: { userId }`

Это означает, что персонаж сохраняется только за текущим владельцем токена.

## 5. Приватность и short-link

В `data.meta` персонажа хранятся:

- `shortId`
- `isPublic`

Логика доступа по shortId:

- если персонаж публичный -> доступ открыт;
- если приватный -> доступ только владельцу (по токену);
- иначе `403 Character is private`.

## 6. Фронтенд-структура модуля

Корень фичи:

- `src/features/character-creator/`

Слои:

- `api/queries.ts` - query hooks
- `api/mutations.ts` - mutations
- `store/creatorStore.ts` - локальное состояние wizard (Zustand)
- `hooks/useCreatorReferenceData.ts` - загрузка справочников
- `hooks/useCreateCharacterPayload.ts` - построение payload
- `components/` - layout/stepper/navigation/auth guard
- `components/steps/` - шаги wizard

Страницы:

- `CharacterCreatorPage.tsx`
- `MyCharactersPage.tsx`
- `EditCharacterPage.tsx`
- `PublicCharacterPage.tsx`

## 7. Что сейчас редактируется

В UI редактирования (`/my-characters/:id/edit`) можно менять:

- имя;
- публичность;
- блок details (alignment, personalityTraits, backstory и др.).

Запись идёт через:

- `PUT /api/characters/:id`
- `PATCH /api/characters/:id/privacy`

## 8. Ограничения текущей версии

- Wizard пока в сокращенном составе шагов (`origin`, `class`, `abilities`, `details`, `review`).
- Расширенные шаги (`equipment`, `spells` как отдельные полнофункциональные UI-потоки) можно нарастить отдельно.
- Нет отдельного подробного Character Sheet экрана с полной визуализацией всех полей.

## 9. Проверка после изменений

Команды:

```bash
npm run build
cd backend && npm run build
```

Обе сборки проходят успешно в текущем состоянии.

## 10. Улучшения конструктора (D&D 2024 sheet-oriented)

В конструкторе добавлены шаги и логика, чтобы итог ближе к игровой карточке:

- Шаг `Класс и навыки`:
  - навыки класса (с лимитом по `skillCount`),
  - отображение навыков предыстории,
  - дополнительные навыки от черт.

- Шаг `Снаряжение`:
  - переключатели источников: предыстория / класс,
  - ручное добавление инвентаря,
  - итоговое слияние по источникам.

- Шаг `Заклинания`:
  - доступ только если класс имеет spellcasting,
  - кантрипы и заклинания считаются по лимитам класса на 1 уровне,
  - учитывается реальный размер пула доступных заклинаний.

- Финальный шаг `Лист`:
  - характеристики с разбором: база + бонусы,
  - навыки с источниками (класс/предыстория/черта),
  - снаряжение с источниками,
  - выбранные заклинания,
  - переключение публичности.

## 11. Ключевые файлы улучшенного потока

- `src/features/character-creator/components/steps/ClassStep.tsx`
- `src/features/character-creator/components/steps/EquipmentStep.tsx`
- `src/features/character-creator/components/steps/SpellsStep.tsx`
- `src/features/character-creator/components/steps/ReviewStep.tsx`
- `src/features/character-creator/utils/characterDerivations.ts`
- `src/features/character-creator/store/creatorStore.ts`
- `src/features/character-creator/CharacterCreatorPage.tsx`

## 12. Дубли навыков и замена

Добавлена явная обработка конфликта навыков:

- если один и тот же навык приходит из нескольких источников (класс/предыстория/черта),
- UI показывает предупреждение с перечислением конфликтов,
- пользователь обязан выбрать `компенсационные навыки` (replacement skills),
- пока компенсации не выбраны в нужном количестве, шаг класса не считается валидным.

Ключевая логика:

- `src/features/character-creator/utils/characterDerivations.ts` (`getSkillConflictInfo`)
- `src/features/character-creator/components/steps/ClassStep.tsx`
- `src/features/character-creator/CharacterCreatorPage.tsx`

## 13. Скейл по уровню

Добавлена базовая поддержка скейла по уровню прямо в создании:

- в `Details` можно выбрать уровень 1..20,
- лимиты кантрипов/заклинаний и spell slots считаются по данным класса для выбранного уровня,
- эти значения используются в валидации шага `Заклинания` и в финальной карточке.

Ключевая логика:

- `src/features/character-creator/components/steps/DetailsStep.tsx`
- `src/features/character-creator/components/steps/SpellsStep.tsx`
- `src/features/character-creator/components/steps/ReviewStep.tsx`
- `src/features/character-creator/utils/characterDerivations.ts` (`getSpellLimits`)

## 14. Игровая карточка (sheet preview)

В финальном шаге добавлен модульный блок `CharacterSheetPreview`, который считает ключевые боевые/игровые значения:

- Proficiency Bonus (от уровня)
- Armor Class (учет брони, типа брони, щита, DEX)
- Hit Points (оценка по hit die и CON с ростом по уровням)
- Initiative
- Passive Perception
- Saving Throws (с учетом proficiencies класса)
- Skill bonuses (привязка навык -> характеристика + proficiency)
- Actions/Attacks (attack bonus и damage для оружия в инвентаре)
- Spell Save DC и Spell Attack Bonus (если класс-кастер)

Ключевые файлы:

- `src/features/character-creator/components/shared/CharacterSheetPreview.tsx`
- `src/features/character-creator/utils/sheetDerivations.ts`
- `src/features/character-creator/utils/calculations.ts`
- `src/features/character-creator/utils/constants.ts`

## 15. Примечание по скейлу по уровням

Сейчас скейл гарантированно учитывается для:

- proficiency bonus
- hit points (оценка)
- лимитов кантрипов/заклинаний
- spell slots (из `spellcasting.spellSlots`)

## 16. Прокачка персонажа (level up)

Реализован отдельный поток прокачки:

- фронтенд страница: `/my-characters/:id/level-up`
- backend endpoint: `PATCH /api/characters/:id/level-up`

Что делает прокачка:

- повышает уровень строго на `+1` (до 20);
- синхронно обновляет `data.progression.level` и legacy-поле `data.level`;
- может сохранить выбор подкласса (когда уровень достиг `subclassLevel`);
- может применить ASI:
  - `+2` в одну характеристику или
  - `+1` в две характеристики;
- обновляет выбранные кантрипы/заклинания с проверкой лимитов по таблице класса;
- сохраняет запись выбора в `data.levelHistory` (timestamp, HP method, ASI, spell changes и т.д.).

Ключевые файлы:

- `backend/src/schemas/character.schema.ts`
- `backend/src/controllers/characterController.ts`
- `backend/src/services/characterService.ts`
- `backend/src/routes/characters.ts`
- `src/features/character-creator/LevelUpCharacterPage.tsx`
- `src/features/character-creator/api/mutations.ts`
- `src/features/character-creator/MyCharactersPage.tsx`
- `src/App.tsx`

## 17. PHB 2024: гибкое стартовое снаряжение

Улучшен шаг `Снаряжение` под формат PHB 2024:

- поддерживаются блоки выбора стартового снаряжения класса (`choice`);
- поддерживается режим «взять золото вместо стартового набора» (`or`);
- в режиме золота работает калькулятор бюджета (потрачено/остаток);
- выбранный режим сохраняется в payload и влияет на итоговый инвентарь.

Ключевые файлы:

- `src/features/character-creator/components/steps/EquipmentStep.tsx`
- `src/features/character-creator/utils/characterDerivations.ts`
- `src/features/character-creator/store/creatorStore.ts`
- `src/features/character-creator/hooks/useCreateCharacterPayload.ts`
