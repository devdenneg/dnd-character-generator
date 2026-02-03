План рефакторинга D&D Character Generator

Цели рефакторинга

1. Типизация - убрать все any, создать строгие интерфейсы
2. Разбивка компонентов - разделить большие файлы (1900+ строк) на маленькие модули
3. Бизнес-логика - вынести расчеты и валидацию в отдельные утилиты
4. UI библиотека - заменить Tailwind на Mantine с сохранением дизайна  


Приоритеты (по порядку выполнения)

Фаза 1: Типизация (Критично)

1.1 Создать централизованные типы

Файлы для создания:

- /src/types/api.ts - типы API ответов
- /src/types/equipment.ts - типы снаряжения
- /src/types/spellcasting.ts - типы заклинаний  


Что сделать:  
 // src/types/api.ts  
 export interface CharacterData {  
 race: Race | null;  
 class: CharacterClass | null;  
 subclass: Subclass | null;  
 background: Background | null;  
 abilityScores: AbilityScores;  
 abilityScoreMethod: "standard" | "pointbuy" | "roll";  
 abilityScoreIncreases: Partial<AbilityScores>;  
 skillProficiencies: string[];  
 expertiseSkills: string[];  
 toolProficiencies: string[];  
 languages: string[];  
 equipment: Equipment[];  
 wallet: Wallet;  
 cantripsKnown: Spell[];  
 spellsKnown: Spell[];  
 spellsPrepared: Spell[];  
 alignment: string;  
 personalityTraits: string;  
 ideals: string;  
 bonds: string;  
 flaws: string;  
 backstory: string;  
 appearance: string;  
 age: string;  
 height: string;  
 weight: string;  
 eyes: string;  
 skin: string;  
 hair: string;  
 }

export interface ApiResponse<T> {  
 success: boolean;  
 data: T;  
 error?: string;  
 message?: string;  
 }

export interface CharacterResponse {  
 character: {  
 id: string;  
 name: string;  
 data: CharacterData;  
 userId: string;  
 createdAt: string;  
 updatedAt: string;  
 };  
 }

export interface CharactersListResponse {  
 characters: Array<{  
 id: string;  
 name: string;  
 data: CharacterData;  
 userId: string;  
 createdAt: string;  
 updatedAt: string;  
 }>;  
 }

1.2 Заменить все any типы

Frontend (27 мест):

- src/api/client.ts - заменить data: any на CharacterData
- src/components/MyCharactersPage.tsx:23 - data: CharacterData
- src/components/JoinRoomPage.tsx:24 - data: CharacterData
- src/components/MasterRoomView.tsx:21,111 - data: CharacterData, типизировать функции
- src/contexts/SocketContext.tsx:14,32,35,84 - создать типы для достижений
- Все catch (err: any) → catch (err: unknown)  


Backend (20 мест):

- backend/src/services/characterService.ts:5,10 - data: CharacterData
- backend/src/controllers/characterController.ts:15,20 - создать Zod схемы
- backend/src/services/classService.ts:49,50,261 - типизировать equipment и spellcasting
- backend/src/controllers/roomController.ts - использовать AuthenticatedRequest вместо (req as any)
  1.3 Создать Zod схемы для валидации  


Файл: backend/src/schemas/character.schema.ts  
 import { z } from 'zod';

export const abilityScoresSchema = z.object({  
 strength: z.number().min(1).max(30),  
 dexterity: z.number().min(1).max(30),  
 constitution: z.number().min(1).max(30),  
 intelligence: z.number().min(1).max(30),  
 wisdom: z.number().min(1).max(30),  
 charisma: z.number().min(1).max(30),  
 });

export const equipmentSchema = z.object({  
 id: z.string(),  
 name: z.string(),  
 nameRu: z.string(),  
 category: z.enum(['weapon', 'armor', 'gear', 'tool', 'pack']),  
 cost: z.object({  
 quantity: z.number(),  
 unit: z.string(),  
 }),  
 weight: z.number(),  
 // ... остальные поля  
 });

export const characterDataSchema = z.object({  
 race: z.any().nullable(), // TODO: создать схему для Race  
 class: z.any().nullable(),  
 // ... все поля CharacterData  
 });

---

Фаза 2: Бизнес-логика (Критично)

2.1 Создать утилиты для расчетов

Файл: src/utils/calculations.ts  
 export const calculateModifier = (score: number): number =>  
 Math.floor((score - 10) / 2);

export const calculateProficiencyBonus = (level: number): number =>  
 Math.ceil(level / 4) + 1;

export const calculateHitPoints = (  
 level: number,  
 hitDie: number,  
 conModifier: number  
 ): number => {  
 const firstLevelHP = hitDie + conModifier;  
 const additionalLevels = level - 1;  
 const avgHitDieRoll = Math.floor(hitDie / 2) + 1;  
 return firstLevelHP + (additionalLevels \* (avgHitDieRoll + conModifier));  
 };

export const formatModifier = (mod: number): string =>  
 mod >= 0 ? `+${mod}` : `${mod}`;

Файл: src/utils/armorClass.ts  
 export const calculateArmorClass = (  
 baseAC: number,  
 dexModifier: number,  
 armor: Equipment | null,  
 hasShield: boolean  
 ): number => {  
 let ac = baseAC;

    if (armor?.armorClass) {
      if (armor.armorType === 'light') {
        ac = armor.armorClass + dexModifier;
      } else if (armor.armorType === 'medium') {
        ac = armor.armorClass + Math.min(dexModifier, armor.maxDexBonus || 2);
      } else if (armor.armorType === 'heavy') {
        ac = armor.armorClass;
      }
    } else {
      ac = 10 + dexModifier;
    }

    if (hasShield) ac += 2;

    return ac;

};

2.2 Создать модуль валидации

Файл: src/utils/validation.ts  
 export const validateRaceSelection = (race: Race | null): boolean =>  
 race !== null;

export const validateClassSelection = (cls: CharacterClass | null): boolean =>  
 cls !== null;

export const validateSkillSelection = (  
 selectedSkills: string[],  
 requiredCount: number,  
 backgroundSkills: string[]  
 ): boolean => {  
 const classSkills = selectedSkills.filter(s => !backgroundSkills.includes(s));  
 return classSkills.length >= requiredCount;  
 };

export const validateAbilityScores = (  
 scores: AbilityScores,  
 method: "standard" | "pointbuy" | "roll"  
 ): boolean => {  
 if (method === "standard") {  
 const standardArray = [15, 14, 13, 12, 10, 8];  
 const sortedScores = Object.values(scores).sort((a, b) => b - a);  
 return sortedScores.every((score, idx) => score === standardArray[idx]);  
 }  
 return true;  
 };

2.3 Создать константы

Файл: src/constants/dnd.ts  
 export const SKILL_ABILITY_MAP: Record<string, AbilityName> = {  
 acrobatics: "dexterity",  
 animal_handling: "wisdom",  
 arcana: "intelligence",  
 athletics: "strength",  
 deception: "charisma",  
 history: "intelligence",  
 insight: "wisdom",  
 intimidation: "charisma",  
 investigation: "intelligence",  
 medicine: "wisdom",  
 nature: "intelligence",  
 perception: "wisdom",  
 performance: "charisma",  
 persuasion: "charisma",  
 religion: "intelligence",  
 sleight_of_hand: "dexterity",  
 stealth: "dexterity",  
 survival: "wisdom",  
 };

export const STANDARD_ARRAY = [15, 14, 13, 12, 10, 8];

// Переместить из characterStore.ts  
 export const FULL_CASTER_SPELL_SLOTS: SpellSlots[] = [ /* ... */ ];  
 export const HALF_CASTER_SPELL_SLOTS: SpellSlots[] = [ /* ... */ ];  
 export const WARLOCK_SPELL_SLOTS = [ /* ... */ ];

2.4 Рефакторить store

Файл: src/store/characterStore.ts

- Убрать дублированные функции (использовать из utils)
- Упростить canProceed() - использовать функции валидации
- Вынести константы в constants/dnd.ts
- Упростить getStats() - использовать утилиты расчетов  


---

Фаза 3: Разбивка компонентов (Критично)

3.1 Разбить ClassesPage.tsx (1921 строка)

Создать компоненты:  
 src/components/classes/  
 ├── ClassesPage.tsx (главный компонент, ~200 строк)  
 ├── ClassCard.tsx (карточка класса)  
 ├── ClassModal.tsx (модальное окно)  
 ├── forms/  
 │ ├── ClassFormBasic.tsx (основная информация)  
 │ ├── ClassFormStats.tsx (характеристики)  
 │ ├── ClassFormFeatures.tsx (способности)  
 │ ├── ClassFormEquipment.tsx (снаряжение)  
 │ └── ClassFormSpellcasting.tsx (заклинания)  
 ├── EquipmentEditor.tsx (редактор предметов)  
 └── MultiSelect.tsx (мультиселект)

3.2 Разбить CharacterSheet.tsx (1549 строк)

Создать компоненты:  
 src/components/character-sheet/  
 ├── CharacterSheet.tsx (главный, ~150 строк)  
 ├── CharacterHeader.tsx (имя, раса, класс)  
 ├── sections/  
 │ ├── AbilityScoresSection.tsx  
 │ ├── SkillsSection.tsx  
 │ ├── WeaponsSection.tsx  
 │ ├── SpellsSection.tsx  
 │ ├── EquipmentSection.tsx  
 │ └── FeaturesSection.tsx  
 └── CollapsibleSection.tsx (переиспользуемый)

3.3 Разбить MasterRoomView.tsx (1262 строки)

Создать компоненты:  
 src/components/room/master/  
 ├── MasterRoomView.tsx (главный, ~200 строк)  
 ├── PlayerTabs.tsx (табы игроков)  
 ├── OverallView.tsx (общий обзор)  
 ├── tables/  
 │ ├── CharacterStatsTable.tsx  
 │ ├── EquipmentRegistry.tsx  
 │ └── SpellsRegistry.tsx  
 ├── PlayerDetailView.tsx (детали игрока)  
 └── PlayerCharacterCard.tsx (карточка персонажа)

3.4 Разбить остальные большие компоненты

BackgroundsPage.tsx (840 строк):  
 src/components/backgrounds/  
 ├── BackgroundsPage.tsx (~150 строк)  
 ├── BackgroundCard.tsx  
 ├── BackgroundModal.tsx  
 └── BackgroundForm.tsx

RacesPage.tsx (737 строк):  
 src/components/races/  
 ├── RacesPage.tsx (~150 строк)  
 ├── RaceCard.tsx  
 ├── RaceModal.tsx  
 └── RaceForm.tsx

---

Фаза 4: Замена Tailwind на Mantine (Критично)

4.1 Установить Mantine

npm install @mantine/core @mantine/hooks @mantine/form @mantine/notifications  
 npm uninstall tailwindcss @tailwindcss/vite tailwind-merge

4.2 Настроить Mantine theme

Файл: src/theme/mantine-theme.ts  
 import { MantineThemeOverride } from '@mantine/core';

export const mantineTheme: MantineThemeOverride = {  
 colorScheme: 'dark',  
 colors: {  
 dark: [
 '#e8eaed', // foreground
 '#c4c9d4', // secondary-foreground
 '#8b93a7', // muted-foreground
 '#2a3142', // border
 '#1e2330', // muted / secondary
 '#1a1f2a', // card-elevated
 '#141820', // card
 '#0c0f14', // background
 '#0a0d11',
 '#080a0d',
 ],  
 primary: [
 '#eef2ff',
 '#e0e7ff',
 '#c7d2fe',
 '#a5b4fc',
 '#818cf8',
 '#6366f1', // primary
 '#4f46e5',
 '#4338ca',
 '#3730a3',
 '#312e81',
 ],  
 accent: [
 '#f5f3ff',
 '#ede9fe',
 '#ddd6fe',
 '#c4b5fd',
 '#a78bfa',
 '#8b5cf6', // accent
 '#7c3aed',
 '#6d28d9',
 '#5b21b6',
 '#4c1d95',
 ],  
 },  
 primaryColor: 'primary',  
 defaultRadius: 'md',  
 fontFamily: '"Plus Jakarta Sans", system-ui, -apple-system, sans-serif',  
 headings: {  
 fontFamily: '"Space Grotesk", sans-serif',  
 fontWeight: '600',  
 },  
 components: {  
 Button: {  
 defaultProps: {  
 radius: 'md',  
 },  
 styles: (theme) => ({  
 root: {  
 fontWeight: 500,  
 transition: 'all 0.2s ease',  
 '&:hover': {  
 transform: 'translateY(-1px)',  
 },  
 },  
 }),  
 },  
 Card: {  
 defaultProps: {  
 radius: 'xl',  
 withBorder: true,  
 },  
 styles: (theme) => ({  
 root: {  
 backgroundColor: 'rgba(20, 24, 32, 0.8)',  
 backdropFilter: 'blur(12px)',  
 borderColor: theme.colors.dark[3],  
 transition: 'all 0.2s ease',  
 '&:hover': {  
 borderColor: theme.colors.dark[4],  
 backgroundColor: 'rgba(26, 31, 42, 0.9)',  
 },  
 },  
 }),  
 },  
 Input: {  
 styles: (theme) => ({  
 input: {  
 backgroundColor: theme.colors.dark[4],  
 borderColor: theme.colors.dark[3],  
 '&:focus': {  
 borderColor: theme.colors.primary[5],  
 boxShadow: `0 0 0 3px rgba(99, 102, 241, 0.15)`,  
 },  
 },  
 }),  
 },  
 },  
 };

4.3 Обновить main.tsx

import { MantineProvider } from '@mantine/core';  
 import { Notifications } from '@mantine/notifications';  
 import { mantineTheme } from './theme/mantine-theme';  
 import '@mantine/core/styles.css';  
 import '@mantine/notifications/styles.css';

ReactDOM.createRoot(document.getElementById('root')!).render(  
 <React.StrictMode>  
 <MantineProvider theme={mantineTheme}>  
 <Notifications position="top-right" />  
 <QueryClientProvider client={queryClient}>  
 <AuthProvider>  
 <SocketProvider>  
 <TelegramProvider>  
 <App />  
 </TelegramProvider>  
 </SocketProvider>  
 </AuthProvider>  
 </QueryClientProvider>  
 </MantineProvider>  
 </React.StrictMode>  
 );

4.4 Создать маппинг компонентов

Tailwind → Mantine:

- <Button> → <Button> (Mantine)
- <Input> → <TextInput> / <Textarea>
- <Select> → <Select> (Mantine)
- <Card> → <Card> (Mantine)
- <Tabs> → <Tabs> (Mantine)
- Custom UI компоненты → Mantine компоненты
  4.5 Сохранить дизайн  


Стратегия:

1. Использовать кастомную тему Mantine с цветами из index.css
2. Сохранить градиенты через sx prop
3. Сохранить backdrop-blur через CSS-in-JS
4. Сохранить анимации через @keyframes в отдельном CSS файле  


Пример миграции:  
 // Было (Tailwind):

  <div className="bg-card/80 backdrop-blur-sm border border-border rounded-xl p-6 hover:bg-card-elevated            
  transition-all">                                                                                                  
                                                                                                                    
  // Стало (Mantine):                                                                                               
  <Card                                                                                                             
    sx={(theme) => ({                                                                                               
      backgroundColor: 'rgba(20, 24, 32, 0.8)',                                                                     
      backdropFilter: 'blur(12px)',                                                                                 
      '&:hover': {                                                                                                  
        backgroundColor: 'rgba(26, 31, 42, 0.9)',                                                                   
      },                                                                                                            
    })}                                                                                                             
    p="xl"                                                                                                          
  >                                                                                                                 
                                                                                                                    
  4.6 Обновить компоненты UI                                                                                        
                                                                                                                    
  Удалить: src/components/ui/ (все Tailwind компоненты)                                                             
                                                                                                                    
  Создать: src/components/common/ (обертки над Mantine)                                                             
  src/components/common/                                                                                            
  ├── GradientButton.tsx (кнопка с градиентом)                                                                      
  ├── GlassCard.tsx (карточка с blur)                                                                               
  ├── IconBadge.tsx (бейдж с иконкой)                                                                               
  └── CollapsibleSection.tsx (секция с collapse)                                                                    
                                                                                                                    
  ---                                                                                                               
  Порядок выполнения (пошагово)                                                                                     
                                                                                                                    
  Этап 1: Типизация (1-2 дня)                                                                                       
                                                                                                                    
  1. Создать src/types/api.ts, equipment.ts, spellcasting.ts                                                        
  2. Создать backend/src/schemas/character.schema.ts                                                                
  3. Заменить все data: any на CharacterData (frontend)                                                             
  4. Заменить все data: any на CharacterData (backend)                                                              
  5. Заменить catch (err: any) на catch (err: unknown)                                                              
  6. Обновить Zod схемы в контроллерах                                                                              
  7. Исправить (req as any).userId на AuthenticatedRequest                                                          
                                                                                                                    
  Этап 2: Бизнес-логика (1-2 дня)                                                                                   
                                                                                                                    
  1. Создать src/utils/calculations.ts                                                                              
  2. Создать src/utils/armorClass.ts                                                                                
  3. Создать src/utils/validation.ts                                                                                
  4. Создать src/constants/dnd.ts                                                                                   
  5. Рефакторить characterStore.ts - использовать утилиты                                                           
  6. Удалить дублированные функции из компонентов                                                                   
  7. Обновить импорты во всех компонентах                                                                           
                                                                                                                    
  Этап 3: Установка Mantine (0.5 дня)                                                                               
                                                                                                                    
  1. Установить пакеты Mantine                                                                                      
  2. Создать src/theme/mantine-theme.ts                                                                             
  3. Обновить main.tsx                                                                                              
  4. Создать src/components/common/ с обертками                                                                     
  5. Удалить Tailwind из package.json                                                                               
                                                                                                                    
  Этап 4: Разбивка компонентов + миграция на Mantine (3-5 дней)                                                     
                                                                                                                    
  Порядок (от самых больших):                                                                                       
                                                                                                                    
  1. ClassesPage.tsx (1921 строка)                                                                                  
    - Создать структуру папок src/components/classes/                                                               
    - Разбить на 9 компонентов                                                                                      
    - Заменить Tailwind на Mantine                                                                                  
    - Использовать утилиты из utils/                                                                                
  2. CharacterSheet.tsx (1549 строк)                                                                                
    - Создать src/components/character-sheet/                                                                       
    - Разбить на 8 компонентов                                                                                      
    - Мигрировать на Mantine                                                                                        
    - Использовать calculations.ts                                                                                  
  3. MasterRoomView.tsx (1262 строки)                                                                               
    - Создать src/components/room/master/                                                                           
    - Разбить на 7 компонентов                                                                                      
    - Мигрировать на Mantine                                                                                        
  4. BackgroundsPage.tsx (840 строк)                                                                                
    - Создать src/components/backgrounds/                                                                           
    - Разбить на 4 компонента                                                                                       
    - Мигрировать на Mantine                                                                                        
  5. RacesPage.tsx (737 строк)                                                                                      
    - Создать src/components/races/                                                                                 
    - Разбить на 4 компонента                                                                                       
    - Мигрировать на Mantine                                                                                        
  6. Остальные компоненты (wizard steps, auth, rooms)                                                               
    - Мигрировать на Mantine по одному                                                                              
    - Использовать общие компоненты из common/                                                                      
                                                                                                                    
  Этап 5: Финальная очистка (0.5 дня)                                                                               
                                                                                                                    
  1. Удалить src/components/ui/                                                                                     
  2. Удалить неиспользуемые Tailwind классы из index.css                                                            
  3. Обновить vite.config.ts (убрать Tailwind plugin)                                                               
  4. Проверить все импорты                                                                                          
  5. Запустить линтер                                                                                               
                                                                                                                    
  ---                                                                                                               
  Критические файлы для изменения                                                                                   
                                                                                                                    
  Frontend                                                                                                          
                                                                                                                    
  - src/types/ - новые типы                                                                                         
  - src/utils/ - новые утилиты                                                                                      
  - src/constants/ - новые константы                                                                                
  - src/store/characterStore.ts - рефакторинг                                                                       
  - src/components/ClassesPage.tsx - разбить                                                                        
  - src/components/CharacterSheet.tsx - разбить                                                                     
  - src/components/MasterRoomView.tsx - разбить                                                                     
  - src/components/BackgroundsPage.tsx - разбить                                                                    
  - src/components/RacesPage.tsx - разбить                                                                          
  - src/main.tsx - добавить Mantine                                                                                 
  - src/index.css - убрать Tailwind, оставить кастомные стили                                                       
  - package.json - обновить зависимости                                                                             
  - vite.config.ts - убрать Tailwind plugin                                                                         
                                                                                                                    
  Backend                                                                                                           
                                                                                                                    
  - backend/src/types/ - новые типы                                                                                 
  - backend/src/schemas/ - Zod схемы                                                                                
  - backend/src/services/characterService.ts - типизация                                                            
  - backend/src/services/classService.ts - типизация                                                                
  - backend/src/controllers/characterController.ts - Zod схемы                                                      
  - backend/src/controllers/classController.ts - типизация                                                          
  - backend/src/controllers/roomController.ts - AuthenticatedRequest                                                
  - backend/src/controllers/authController.ts - AuthenticatedRequest                                                
                                                                                                                    
  ---                                                                                                               
  Проверка после рефакторинга                                                                                       
                                                                                                                    
  1. TypeScript компиляция                                                                                          
                                                                                                                    
  # Frontend                                                                                                        
  npm run build                                                                                                     
                                                                                                                    
  # Backend                                                                                                         
  cd backend && npm run build                                                                                       
                                                                                                                    
  2. Функциональное тестирование                                                                                    
                                                                                                                    
  - Создание персонажа (все 10 шагов)                                                                               
  - Сохранение персонажа                                                                                            
  - Просмотр CharacterSheet                                                                                         
  - Создание комнаты (мастер)                                                                                       
  - Присоединение к комнате (игрок)                                                                                 
  - Выдача достижений                                                                                               
  - Просмотр справочников (расы, классы, предыстории)                                                               
                                                                                                                    
  3. Визуальная проверка                                                                                            
                                                                                                                    
  - Все компоненты выглядят как раньше                                                                              
  - Градиенты сохранены                                                                                             
  - Backdrop blur работает                                                                                          
  - Анимации работают                                                                                               
  - Адаптивность на мобильных                                                                                       
                                                                                                                    
  4. Производительность                                                                                             
                                                                                                                    
  - Bundle size не увеличился значительно                                                                           
  - Нет утечек памяти                                                                                               
  - Плавная работа UI                                                                                               
                                                                                                                    
  ---                                                                                                               
  Риски и митигация                                                                                                 
                                                                                                                    
  Риск 1: Потеря дизайна при миграции на Mantine                                                                    
                                                                                                                    
  Митигация: Создать кастомную тему с точными цветами, использовать sx prop для сложных стилей                      
                                                                                                                    
  Риск 2: Сломанная функциональность после разбивки                                                                 
                                                                                                                    
  Митигация: Тестировать каждый компонент после разбивки, не менять логику                                          
                                                                                                                    
  Риск 3: Увеличение bundle size                                                                                    
                                                                                                                    
  Митигация: Использовать tree-shaking Mantine, импортировать только нужные компоненты                              
                                                                                                                    
  Риск 4: Конфликты типов                                                                                           
                                                                                                                    
  Митигация: Постепенная миграция, использование unknown вместо any как промежуточный шаг                           
                                                                                                                    
  ---                                                                                                               
  Оценка объема работ                                                                                               
                                                                                                                    
  - Типизация: ~200-300 строк кода, 27 файлов                                                                       
  - Бизнес-логика: ~500-700 строк новых утилит, рефакторинг store                                                   
  - Разбивка компонентов: ~6000 строк кода (5 больших компонентов)                                                  
  - Миграция на Mantine: ~40 компонентов для обновления                                                             
                                                                                                                    
  Итого: ~7000-8000 строк кода для изменения/создания
