# Character Creation System - Full Implementation Plan

D&D 5e PHB 2024 Character Creator

---

## Table of Contents

1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Database Changes](#database-changes)
4. [API Endpoints](#api-endpoints)
5. [Store Design](#store-design)
6. [Creation Steps](#creation-steps)
7. [Component Structure](#component-structure)
8. [Design System](#design-system)
9. [Level Up System](#level-up-system)
10. [Data Flow](#data-flow)

---

## Overview

### Goals

- Clean, modular architecture following React best practices
- All data fetched from backend (no static files)
- Support for character sharing via short unique ID
- Privacy controls (public/private characters)
- Future-proof design for level-up mechanics
- Mobile-first responsive design

### PHB 2024 Character Creation Order

1. **Choose Origin** (Race + Background together)
2. **Choose Class**
3. **Determine Ability Scores**
4. **Apply Ability Score Increases** (from Background)
5. **Choose Skills**
6. **Choose Starting Equipment**
7. **Choose Spells** (if spellcaster)
8. **Character Details**
9. **Review & Create**

---

## Architecture

### Tech Stack

- **Frontend:** React 18 + TypeScript + Vite
- **State Management:** Zustand
- **Data Fetching:** TanStack Query (React Query)
- **Forms:** React Hook Form + Zod
- **Styling:** Tailwind CSS + shadcn/ui
- **Backend:** Express + Prisma + PostgreSQL

### Key Principles

```
1. Single Responsibility - Each component does ONE thing
2. Composition over Inheritance - Small composable pieces
3. Server State vs Client State - React Query for server, Zustand for local
4. Optimistic Updates - Fast UI feedback
5. Progressive Enhancement - Works without JS for basic info
```

### Folder Structure

```
src/
├── features/
│   └── character-creator/
│       ├── api/
│       │   ├── index.ts              # API exports
│       │   ├── queries.ts            # React Query hooks
│       │   └── mutations.ts          # Create/Update mutations
│       │
│       ├── store/
│       │   ├── index.ts              # Store exports
│       │   ├── creatorStore.ts       # Main wizard store
│       │   ├── slices/
│       │   │   ├── originSlice.ts    # Race + Background state
│       │   │   ├── classSlice.ts     # Class state
│       │   │   ├── abilitiesSlice.ts # Ability scores state
│       │   │   ├── skillsSlice.ts    # Skills state
│       │   │   ├── equipmentSlice.ts # Equipment state
│       │   │   ├── spellsSlice.ts    # Spells state
│       │   │   └── detailsSlice.ts   # Character details state
│       │   └── selectors.ts          # Computed values
│       │
│       ├── components/
│       │   ├── CreatorLayout.tsx     # Main layout with stepper
│       │   ├── CreatorStepper.tsx    # Step navigation
│       │   ├── CreatorNavigation.tsx # Next/Back buttons
│       │   │
│       │   ├── steps/
│       │   │   ├── OriginStep/
│       │   │   │   ├── index.tsx
│       │   │   │   ├── RaceSelector.tsx
│       │   │   │   ├── RaceCard.tsx
│       │   │   │   ├── RaceTraitsList.tsx
│       │   │   │   ├── BackgroundSelector.tsx
│       │   │   │   ├── BackgroundCard.tsx
│       │   │   │   └── OriginFeatPreview.tsx
│       │   │   │
│       │   │   ├── ClassStep/
│       │   │   │   ├── index.tsx
│       │   │   │   ├── ClassSelector.tsx
│       │   │   │   ├── ClassCard.tsx
│       │   │   │   ├── ClassFeaturesList.tsx
│       │   │   │   ├── SubclassSelector.tsx
│       │   │   │   └── SpellcastingPreview.tsx
│       │   │   │
│       │   │   ├── AbilitiesStep/
│       │   │   │   ├── index.tsx
│       │   │   │   ├── MethodSelector.tsx
│       │   │   │   ├── StandardArray.tsx
│       │   │   │   ├── PointBuy.tsx
│       │   │   │   ├── DiceRoll.tsx
│       │   │   │   ├── AbilityScoreCard.tsx
│       │   │   │   └── AbilityIncreases.tsx
│       │   │   │
│       │   │   ├── SkillsStep/
│       │   │   │   ├── index.tsx
│       │   │   │   ├── SkillSelector.tsx
│       │   │   │   ├── SkillCard.tsx
│       │   │   │   └── ProficiencySummary.tsx
│       │   │   │
│       │   │   ├── EquipmentStep/
│       │   │   │   ├── index.tsx
│       │   │   │   ├── EquipmentSelector.tsx
│       │   │   │   ├── EquipmentCard.tsx
│       │   │   │   ├── GoldOption.tsx
│       │   │   │   └── InventoryPreview.tsx
│       │   │   │
│       │   │   ├── SpellsStep/
│       │   │   │   ├── index.tsx
│       │   │   │   ├── CantripSelector.tsx
│       │   │   │   ├── SpellSelector.tsx
│       │   │   │   ├── SpellCard.tsx
│       │   │   │   └── SpellSlotInfo.tsx
│       │   │   │
│       │   │   ├── DetailsStep/
│       │   │   │   ├── index.tsx
│       │   │   │   ├── NameInput.tsx
│       │   │   │   ├── AppearanceForm.tsx
│       │   │   │   ├── PersonalityForm.tsx
│       │   │   │   └── BackstoryEditor.tsx
│       │   │   │
│       │   │   └── ReviewStep/
│       │   │       ├── index.tsx
│       │   │       ├── CharacterSummary.tsx
│       │   │       ├── StatBlock.tsx
│       │   │       ├── PrivacySettings.tsx
│       │   │       └── CreateButton.tsx
│       │   │
│       │   └── shared/
│       │       ├── SelectionGrid.tsx
│       │       ├── InfoPanel.tsx
│       │       ├── StepHeader.tsx
│       │       ├── ValidationMessage.tsx
│       │       └── LoadingState.tsx
│       │
│       ├── hooks/
│       │   ├── useCreatorStep.ts
│       │   ├── useValidation.ts
│       │   ├── useCalculations.ts
│       │   └── useCharacterPreview.ts
│       │
│       ├── utils/
│       │   ├── calculations.ts       # Modifiers, HP, AC, etc.
│       │   ├── validation.ts         # Step validation
│       │   ├── shortId.ts            # Generate short IDs
│       │   └── constants.ts          # Static values
│       │
│       ├── types/
│       │   └── index.ts              # Creator-specific types
│       │
│       └── index.tsx                 # Main entry point
```

---

## Database Changes

### New Character Model

```prisma
model Character {
  id          String   @id @default(uuid())

  // Short shareable ID (e.g., "abc123")
  shortId     String   @unique @default(cuid())

  // Owner
  userId      String
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  // Basic Info
  name        String
  level       Int      @default(1)
  experience  Int      @default(0)

  // Privacy
  isPublic    Boolean  @default(false)

  // Core Selections (references to actual entities)
  raceId      String
  classId     String
  subclassId  String?
  backgroundId String

  // Snapshots for offline/historical data
  raceSnapshot      Json    // Race data at creation time
  classSnapshot     Json    // Class data at creation time
  backgroundSnapshot Json   // Background data at creation time

  // Ability Scores
  abilityScores         Json    // { str, dex, con, int, wis, cha }
  abilityScoreMethod    String  // "standard" | "pointbuy" | "roll"
  abilityScoreIncreases Json    // Applied bonuses from background

  // Proficiencies
  skillProficiencies    String[]
  toolProficiencies     String[]
  languages             String[]
  expertiseSkills       String[]  // Skills with expertise

  // Equipment & Gold
  equipment     Json    // Array of equipment with quantities
  wallet        Json    // { cp, sp, ep, gp, pp }

  // Spells (for spellcasters)
  cantripsKnown String[]  // Spell IDs
  spellsKnown   String[]  // Spell IDs
  spellsPrepared String[] // Spell IDs (for prepared casters)

  // Character Details
  alignment         String?
  personalityTraits String?
  ideals            String?
  bonds             String?
  flaws             String?
  backstory         String?   @db.Text

  // Appearance
  age       String?
  height    String?
  weight    String?
  eyes      String?
  skin      String?
  hair      String?
  imageUrl  String?

  // Level History (for tracking progression)
  levelHistory Json?   // Array of level-up choices

  // Metadata
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  // Relations
  achievements PlayerAchievement[]
  roomsJoined  RoomPlayer[]

  @@index([userId])
  @@index([shortId])
  @@index([isPublic])
}
```

### Short ID Generation

```typescript
// utils/shortId.ts
import { customAlphabet } from 'nanoid';

// Alphabet without ambiguous characters (0, O, I, l)
const alphabet = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz';

// Generate 8-character short ID (58^8 = 128+ trillion combinations)
export const generateShortId = customAlphabet(alphabet, 8);

// Examples: "abc123XY", "Kj9mN2pQ"
```

---

## API Endpoints

### Character CRUD

```
POST   /api/characters              # Create character
GET    /api/characters              # List user's characters
GET    /api/characters/:id          # Get by UUID (owner only)
GET    /api/characters/s/:shortId   # Get by short ID (respects privacy)
PUT    /api/characters/:id          # Update character
DELETE /api/characters/:id          # Delete character
PATCH  /api/characters/:id/privacy  # Toggle public/private
PATCH  /api/characters/:id/level-up # Level up character
```

### Request/Response Examples

#### Create Character

```typescript
// POST /api/characters
// Request
{
  "name": "Gandalf",
  "raceId": "uuid-of-human",
  "classId": "uuid-of-wizard",
  "subclassId": null,  // Selected at level 2+
  "backgroundId": "uuid-of-sage",
  "abilityScores": {
    "strength": 8,
    "dexterity": 14,
    "constitution": 13,
    "intelligence": 15,
    "wisdom": 12,
    "charisma": 10
  },
  "abilityScoreMethod": "standard",
  "abilityScoreIncreases": {
    "intelligence": 2,
    "wisdom": 1,
    "charisma": 1
  },
  "skillProficiencies": ["arcana", "history", "investigation", "religion"],
  "toolProficiencies": [],
  "languages": ["Common", "Elvish", "Dwarvish"],
  "equipment": [
    { "id": "quarterstaff", "quantity": 1 },
    { "id": "component-pouch", "quantity": 1 },
    { "id": "scholars-pack", "quantity": 1 }
  ],
  "wallet": { "copper": 0, "silver": 0, "electrum": 0, "gold": 10, "platinum": 0 },
  "cantripsKnown": ["fire-bolt", "light", "mage-hand"],
  "spellsKnown": ["magic-missile", "shield", "detect-magic", "mage-armor", "sleep", "thunderwave"],
  "isPublic": false,
  "alignment": "Neutral Good",
  "personalityTraits": "I use polysyllabic words...",
  "backstory": "Once upon a time..."
}

// Response
{
  "success": true,
  "character": {
    "id": "uuid",
    "shortId": "Kj9mN2pQ",
    "name": "Gandalf",
    "level": 1,
    ...
  }
}
```

#### Get by Short ID (Public)

```typescript
// GET /api/characters/s/Kj9mN2pQ

// If public OR owner
{
  "success": true,
  "character": { ... },
  "isOwner": true
}

// If private and not owner
{
  "success": false,
  "error": "Character is private"
}
```

---

## Store Design

### Main Creator Store

```typescript
// store/creatorStore.ts
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

// Step enum
export type CreatorStep =
  | 'origin'      // Race + Background
  | 'class'       // Class selection
  | 'abilities'   // Ability scores
  | 'skills'      // Skill proficiencies
  | 'equipment'   // Starting equipment
  | 'spells'      // Spells (if applicable)
  | 'details'     // Character details
  | 'review';     // Final review

// Step order for navigation
export const STEP_ORDER: CreatorStep[] = [
  'origin',
  'class',
  'abilities',
  'skills',
  'equipment',
  'spells',
  'details',
  'review'
];

// Ability scores type
interface AbilityScores {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}

// Equipment item with quantity
interface EquipmentSelection {
  id: string;
  quantity: number;
}

// Wallet
interface Wallet {
  copper: number;
  silver: number;
  electrum: number;
  gold: number;
  platinum: number;
}

// Character details
interface CharacterDetails {
  name: string;
  alignment: string;
  personalityTraits: string;
  ideals: string;
  bonds: string;
  flaws: string;
  backstory: string;
  age: string;
  height: string;
  weight: string;
  eyes: string;
  skin: string;
  hair: string;
}

// Main state interface
interface CreatorState {
  // Current step
  currentStep: CreatorStep;

  // Origin (Race + Background)
  selectedRaceId: string | null;
  selectedBackgroundId: string | null;

  // Class
  selectedClassId: string | null;
  selectedSubclassId: string | null;

  // Abilities
  abilityScores: AbilityScores;
  abilityScoreMethod: 'standard' | 'pointbuy' | 'roll';
  abilityScoreIncreases: Partial<AbilityScores>;

  // Skills
  selectedSkills: string[];

  // Equipment
  equipmentSelections: EquipmentSelection[];
  useGoldInstead: boolean;
  wallet: Wallet;

  // Spells
  selectedCantrips: string[];
  selectedSpells: string[];

  // Details
  details: CharacterDetails;

  // Privacy
  isPublic: boolean;

  // Validation state
  stepValidation: Record<CreatorStep, boolean>;

  // Dirty state (for unsaved changes warning)
  isDirty: boolean;
}

// Actions interface
interface CreatorActions {
  // Navigation
  setStep: (step: CreatorStep) => void;
  nextStep: () => void;
  prevStep: () => void;
  canProceed: () => boolean;

  // Origin
  setRace: (raceId: string | null) => void;
  setBackground: (backgroundId: string | null) => void;

  // Class
  setClass: (classId: string | null) => void;
  setSubclass: (subclassId: string | null) => void;

  // Abilities
  setAbilityScores: (scores: AbilityScores) => void;
  setAbilityScoreMethod: (method: 'standard' | 'pointbuy' | 'roll') => void;
  setAbilityIncrease: (ability: keyof AbilityScores, value: number) => void;
  resetAbilityIncreases: () => void;

  // Skills
  toggleSkill: (skillId: string) => void;
  setSkills: (skills: string[]) => void;

  // Equipment
  addEquipment: (item: EquipmentSelection) => void;
  removeEquipment: (itemId: string) => void;
  setUseGoldInstead: (useGold: boolean) => void;
  setWallet: (wallet: Wallet) => void;

  // Spells
  toggleCantrip: (spellId: string) => void;
  toggleSpell: (spellId: string) => void;
  setCantrips: (spellIds: string[]) => void;
  setSpells: (spellIds: string[]) => void;

  // Details
  updateDetails: (details: Partial<CharacterDetails>) => void;

  // Privacy
  setPublic: (isPublic: boolean) => void;

  // Validation
  validateStep: (step: CreatorStep) => boolean;

  // Reset
  reset: () => void;

  // Build final character object
  buildCharacter: () => CreateCharacterRequest;
}

// Initial state
const initialState: CreatorState = {
  currentStep: 'origin',

  selectedRaceId: null,
  selectedBackgroundId: null,

  selectedClassId: null,
  selectedSubclassId: null,

  abilityScores: {
    strength: 10,
    dexterity: 10,
    constitution: 10,
    intelligence: 10,
    wisdom: 10,
    charisma: 10,
  },
  abilityScoreMethod: 'standard',
  abilityScoreIncreases: {},

  selectedSkills: [],

  equipmentSelections: [],
  useGoldInstead: false,
  wallet: { copper: 0, silver: 0, electrum: 0, gold: 0, platinum: 0 },

  selectedCantrips: [],
  selectedSpells: [],

  details: {
    name: '',
    alignment: '',
    personalityTraits: '',
    ideals: '',
    bonds: '',
    flaws: '',
    backstory: '',
    age: '',
    height: '',
    weight: '',
    eyes: '',
    skin: '',
    hair: '',
  },

  isPublic: false,

  stepValidation: {
    origin: false,
    class: false,
    abilities: false,
    skills: false,
    equipment: false,
    spells: true, // Valid by default (not all classes have spells)
    details: false,
    review: false,
  },

  isDirty: false,
};

// Create store
export const useCreatorStore = create<CreatorState & CreatorActions>()(
  devtools(
    persist(
      immer((set, get) => ({
        ...initialState,

        // Navigation
        setStep: (step) => set({ currentStep: step }),

        nextStep: () => {
          const { currentStep } = get();
          const currentIndex = STEP_ORDER.indexOf(currentStep);
          if (currentIndex < STEP_ORDER.length - 1) {
            set({ currentStep: STEP_ORDER[currentIndex + 1] });
          }
        },

        prevStep: () => {
          const { currentStep } = get();
          const currentIndex = STEP_ORDER.indexOf(currentStep);
          if (currentIndex > 0) {
            set({ currentStep: STEP_ORDER[currentIndex - 1] });
          }
        },

        canProceed: () => {
          const { currentStep, stepValidation } = get();
          return stepValidation[currentStep];
        },

        // Origin
        setRace: (raceId) => set((state) => {
          state.selectedRaceId = raceId;
          state.isDirty = true;
        }),

        setBackground: (backgroundId) => set((state) => {
          state.selectedBackgroundId = backgroundId;
          state.abilityScoreIncreases = {}; // Reset increases when background changes
          state.isDirty = true;
        }),

        // Class
        setClass: (classId) => set((state) => {
          state.selectedClassId = classId;
          state.selectedSubclassId = null; // Reset subclass
          state.selectedSkills = []; // Reset skills
          state.selectedCantrips = []; // Reset cantrips
          state.selectedSpells = []; // Reset spells
          state.equipmentSelections = []; // Reset equipment
          state.isDirty = true;
        }),

        setSubclass: (subclassId) => set((state) => {
          state.selectedSubclassId = subclassId;
          state.isDirty = true;
        }),

        // Abilities
        setAbilityScores: (scores) => set((state) => {
          state.abilityScores = scores;
          state.isDirty = true;
        }),

        setAbilityScoreMethod: (method) => set((state) => {
          state.abilityScoreMethod = method;
          state.isDirty = true;
        }),

        setAbilityIncrease: (ability, value) => set((state) => {
          state.abilityScoreIncreases[ability] = value;
          state.isDirty = true;
        }),

        resetAbilityIncreases: () => set((state) => {
          state.abilityScoreIncreases = {};
          state.isDirty = true;
        }),

        // Skills
        toggleSkill: (skillId) => set((state) => {
          const index = state.selectedSkills.indexOf(skillId);
          if (index === -1) {
            state.selectedSkills.push(skillId);
          } else {
            state.selectedSkills.splice(index, 1);
          }
          state.isDirty = true;
        }),

        setSkills: (skills) => set((state) => {
          state.selectedSkills = skills;
          state.isDirty = true;
        }),

        // Equipment
        addEquipment: (item) => set((state) => {
          const existing = state.equipmentSelections.find(e => e.id === item.id);
          if (existing) {
            existing.quantity += item.quantity;
          } else {
            state.equipmentSelections.push(item);
          }
          state.isDirty = true;
        }),

        removeEquipment: (itemId) => set((state) => {
          state.equipmentSelections = state.equipmentSelections.filter(e => e.id !== itemId);
          state.isDirty = true;
        }),

        setUseGoldInstead: (useGold) => set((state) => {
          state.useGoldInstead = useGold;
          state.isDirty = true;
        }),

        setWallet: (wallet) => set((state) => {
          state.wallet = wallet;
          state.isDirty = true;
        }),

        // Spells
        toggleCantrip: (spellId) => set((state) => {
          const index = state.selectedCantrips.indexOf(spellId);
          if (index === -1) {
            state.selectedCantrips.push(spellId);
          } else {
            state.selectedCantrips.splice(index, 1);
          }
          state.isDirty = true;
        }),

        toggleSpell: (spellId) => set((state) => {
          const index = state.selectedSpells.indexOf(spellId);
          if (index === -1) {
            state.selectedSpells.push(spellId);
          } else {
            state.selectedSpells.splice(index, 1);
          }
          state.isDirty = true;
        }),

        setCantrips: (spellIds) => set((state) => {
          state.selectedCantrips = spellIds;
          state.isDirty = true;
        }),

        setSpells: (spellIds) => set((state) => {
          state.selectedSpells = spellIds;
          state.isDirty = true;
        }),

        // Details
        updateDetails: (details) => set((state) => {
          state.details = { ...state.details, ...details };
          state.isDirty = true;
        }),

        // Privacy
        setPublic: (isPublic) => set((state) => {
          state.isPublic = isPublic;
          state.isDirty = true;
        }),

        // Validation
        validateStep: (step) => {
          const state = get();
          let isValid = false;

          switch (step) {
            case 'origin':
              isValid = !!state.selectedRaceId && !!state.selectedBackgroundId;
              break;
            case 'class':
              isValid = !!state.selectedClassId;
              break;
            case 'abilities':
              isValid = Object.values(state.abilityScores).every(v => v >= 3 && v <= 20);
              break;
            case 'skills':
              // Will be validated based on class requirements
              isValid = state.selectedSkills.length > 0;
              break;
            case 'equipment':
              isValid = state.equipmentSelections.length > 0 || state.useGoldInstead;
              break;
            case 'spells':
              // Always valid for non-casters, validated for casters
              isValid = true;
              break;
            case 'details':
              isValid = state.details.name.trim().length >= 2;
              break;
            case 'review':
              isValid = true;
              break;
          }

          set((s) => {
            s.stepValidation[step] = isValid;
          });

          return isValid;
        },

        // Reset
        reset: () => set(initialState),

        // Build character
        buildCharacter: () => {
          const state = get();
          return {
            name: state.details.name,
            raceId: state.selectedRaceId!,
            classId: state.selectedClassId!,
            subclassId: state.selectedSubclassId,
            backgroundId: state.selectedBackgroundId!,
            abilityScores: state.abilityScores,
            abilityScoreMethod: state.abilityScoreMethod,
            abilityScoreIncreases: state.abilityScoreIncreases,
            skillProficiencies: state.selectedSkills,
            equipment: state.equipmentSelections,
            wallet: state.wallet,
            cantripsKnown: state.selectedCantrips,
            spellsKnown: state.selectedSpells,
            isPublic: state.isPublic,
            ...state.details,
          };
        },
      })),
      {
        name: 'character-creator',
        version: 1,
        partialize: (state) => ({
          // Only persist these fields
          selectedRaceId: state.selectedRaceId,
          selectedBackgroundId: state.selectedBackgroundId,
          selectedClassId: state.selectedClassId,
          abilityScores: state.abilityScores,
          abilityScoreMethod: state.abilityScoreMethod,
          selectedSkills: state.selectedSkills,
          details: state.details,
        }),
      }
    ),
    { name: 'CharacterCreator' }
  )
);
```

### Selectors (Computed Values)

```typescript
// store/selectors.ts
import { useCreatorStore } from './creatorStore';
import { useRaceQuery, useClassQuery, useBackgroundQuery } from '../api/queries';

// Get selected race with full data
export function useSelectedRace() {
  const raceId = useCreatorStore((s) => s.selectedRaceId);
  return useRaceQuery(raceId);
}

// Get selected class with full data
export function useSelectedClass() {
  const classId = useCreatorStore((s) => s.selectedClassId);
  return useClassQuery(classId);
}

// Get selected background with full data
export function useSelectedBackground() {
  const backgroundId = useCreatorStore((s) => s.selectedBackgroundId);
  return useBackgroundQuery(backgroundId);
}

// Calculate final ability scores (base + increases)
export function useFinalAbilityScores() {
  const abilityScores = useCreatorStore((s) => s.abilityScores);
  const increases = useCreatorStore((s) => s.abilityScoreIncreases);

  return {
    strength: abilityScores.strength + (increases.strength || 0),
    dexterity: abilityScores.dexterity + (increases.dexterity || 0),
    constitution: abilityScores.constitution + (increases.constitution || 0),
    intelligence: abilityScores.intelligence + (increases.intelligence || 0),
    wisdom: abilityScores.wisdom + (increases.wisdom || 0),
    charisma: abilityScores.charisma + (increases.charisma || 0),
  };
}

// Calculate ability modifiers
export function useAbilityModifiers() {
  const scores = useFinalAbilityScores();

  const calcModifier = (score: number) => Math.floor((score - 10) / 2);

  return {
    strength: calcModifier(scores.strength),
    dexterity: calcModifier(scores.dexterity),
    constitution: calcModifier(scores.constitution),
    intelligence: calcModifier(scores.intelligence),
    wisdom: calcModifier(scores.wisdom),
    charisma: calcModifier(scores.charisma),
  };
}

// Check if class is spellcaster
export function useIsSpellcaster() {
  const { data: characterClass } = useSelectedClass();
  return !!characterClass?.spellcasting;
}

// Get available skill count
export function useAvailableSkillCount() {
  const { data: characterClass } = useSelectedClass();
  const { data: background } = useSelectedBackground();

  const classSkills = characterClass?.skillCount || 0;
  const backgroundSkills = background?.skillProficiencies?.length || 0;

  return { classSkills, backgroundSkills, total: classSkills + backgroundSkills };
}

// Calculate HP
export function useHitPoints() {
  const { data: characterClass } = useSelectedClass();
  const modifiers = useAbilityModifiers();

  if (!characterClass) return 0;

  // Level 1: Max hit die + CON modifier
  return characterClass.hitDie + modifiers.constitution;
}

// Calculate proficiency bonus (always +2 at level 1)
export function useProficiencyBonus() {
  return 2; // Level 1
}
```

---

## Creation Steps

### Step 1: Origin (Race + Background)

**PHB 2024 Rule:** Race and Background are chosen together as your character's "Origin"

#### Race Selection

**Data needed from backend:**
```typescript
interface RaceResponse {
  id: string;
  externalId: string;
  name: string;
  nameRu: string;
  description: Json;
  speed: string;
  size: string;
  traits: RaceTrait[];
  image?: string;
  source: string;
}
```

**What user selects:**
- One race from the list

**What is displayed:**
- Race name (EN/RU)
- Size and Speed
- Racial traits with descriptions
- Image (if available)

#### Background Selection

**Data needed from backend:**
```typescript
interface BackgroundResponse {
  id: string;
  externalId: string;
  name: string;
  nameRu: string;
  description: string;
  skillProficiencies: string[];
  toolProficiencies: string[];
  languages: number;
  startingGold: number;
  originFeat: string;
  abilityScoreIncrease: {
    options: string[];    // e.g., ["strength", "dexterity", "constitution"]
    amount: number[];     // e.g., [2, 1, 1] means pick one for +2, two for +1
  };
  source: string;
}
```

**What user selects:**
- One background from the list

**What is displayed:**
- Background name (EN/RU)
- Skill proficiencies granted
- Tool proficiencies granted
- Languages granted
- Origin Feat name
- Ability Score Increase options

**Validation:**
- Race must be selected
- Background must be selected

---

### Step 2: Class Selection

**Data needed from backend:**
```typescript
interface ClassResponse {
  id: string;
  externalId: string;
  name: string;
  nameRu: string;
  description: Json;
  image?: string;
  hitDie: number;
  primaryAbility: string[];
  savingThrows: string[];
  armorProficiencies: string[];
  weaponProficiencies: string[];
  skillChoices: string[];
  skillCount: number;
  subclassLevel: number;
  spellcasting?: {
    ability: string;
    cantripsKnown: number[];   // By level [0] = level 1
    spellsKnown?: number[];    // By level (for known casters)
    spellSlots: number[][];    // [level][slot_level]
  };
  classTable: Json;            // Full progression table
  startingEquipment: Json;     // Equipment options
  startingGold: number;
  features: ClassFeature[];
  subclasses: Subclass[];
  source: string;
}
```

**What user selects:**
- One class from the list
- Subclass (only if subclassLevel is 1, otherwise skip)

**What is displayed:**
- Class name (EN/RU)
- Hit Die
- Primary Ability
- Saving Throw proficiencies
- Armor proficiencies
- Weapon proficiencies
- Available skills to choose
- Level 1 features
- Spellcasting info (if applicable)
- Subclass options (if choosing at level 1)

**Validation:**
- Class must be selected
- Subclass selected if required at level 1

---

### Step 3: Ability Scores

**Methods available (PHB 2024):**

#### Standard Array
```
[15, 14, 13, 12, 10, 8]
```
User assigns each value to one ability.

#### Point Buy
- Start with 8 in all abilities
- 27 points to spend
- Cost table:

| Score | Point Cost |
|-------|------------|
| 8     | 0          |
| 9     | 1          |
| 10    | 2          |
| 11    | 3          |
| 12    | 4          |
| 13    | 5          |
| 14    | 7          |
| 15    | 9          |

#### Rolling (4d6 drop lowest)
- Roll 4d6, drop lowest die
- Do this 6 times
- Assign results to abilities

**What user selects:**
- Method (standard/pointbuy/roll)
- Assignment of values to abilities

**Validation:**
- All abilities must have valid scores (8-15 for standard/pointbuy)
- Point buy must not exceed 27 points

---

### Step 4: Ability Score Increases (from Background)

**PHB 2024 Rule:** Background provides ability score increases

**Options:**
- +2 to one ability, +1 to two different abilities, OR
- +1 to three different abilities

**What user selects:**
- Which abilities to increase
- How much to increase each

**Validation:**
- Total increases must equal 4 points
- No ability can exceed 20 after increases
- Distribution must match allowed patterns

---

### Step 5: Skills

**What user selects:**
- Skills from class skill list (number = skillCount)
- Background skills are automatic

**Example for Wizard:**
- Background (Sage): Arcana, History (automatic)
- Class: Choose 2 from Arcana, History, Insight, Investigation, Medicine, Religion
- If skill overlaps with background, choose a different one

**What is displayed:**
- All available skills with descriptions
- Which skills are already granted by background
- Skill ability association (e.g., Stealth - DEX)

**Validation:**
- Correct number of skills selected
- No duplicates between class and background choices

---

### Step 6: Starting Equipment

**Options:**

#### Option A: Take Equipment Packages
Class provides equipment choices (e.g., "longsword OR two shortswords")
Background provides specific equipment

#### Option B: Take Starting Gold
Roll or take average gold based on class, buy equipment manually

**Data needed:**
```typescript
interface StartingEquipmentOption {
  choose: number;           // How many to pick
  from: EquipmentChoice[];  // Options
}

interface EquipmentChoice {
  items: { id: string; quantity: number }[];
  description: string;      // e.g., "a longsword" or "two shortswords"
}
```

**What user selects:**
- Equipment package OR gold
- If package: specific choices for each option
- If gold: items from equipment list within budget

**Validation:**
- All required choices made, OR
- Gold amount set if using gold option

---

### Step 7: Spells (Spellcasters Only)

**Skip this step if class has no spellcasting.**

**Data needed:**
```typescript
// From class.spellcasting
{
  ability: "intelligence",
  cantripsKnown: [3, 3, 3, 4, 4, ...],  // Level 1 = 3 cantrips
  spellsKnown: [6, 6, 6, 7, 7, ...],     // Level 1 = 6 spells (prepared)
  spellSlots: [[2, 0, 0, ...], ...]      // Level 1 = 2 first-level slots
}

// Spells from backend
interface SpellResponse {
  id: string;
  externalId: string;
  name: string;
  nameRu: string;
  level: number;        // 0 = cantrip
  school: string;
  castingTime: string;
  range: string;
  components: string;
  duration: string;
  description: Json;
  classes: string[];    // Class IDs that can use this spell
}
```

**What user selects:**
- Cantrips (number based on class)
- Spells (number based on class - prepared or known)

**Classes and their spellcasting type:**

| Class | Type | Level 1 Cantrips | Level 1 Spells |
|-------|------|------------------|----------------|
| Bard | Known | 2 | 4 known |
| Cleric | Prepared | 3 | All 1st-level cleric spells available |
| Druid | Prepared | 2 | All 1st-level druid spells available |
| Paladin | Prepared | 0 | - (starts at level 2) |
| Ranger | Known | 0 | - (starts at level 2) |
| Sorcerer | Known | 4 | 2 known |
| Warlock | Known | 2 | 2 known |
| Wizard | Prepared | 3 | 6 in spellbook, prepare INT mod + level |

**Validation:**
- Correct number of cantrips selected
- Correct number of spells selected
- All spells are from class spell list
- Spell levels are appropriate (only cantrips and 1st level at level 1)

---

### Step 8: Character Details

**What user enters:**

**Required:**
- Name (2-50 characters)

**Optional:**
- Alignment
- Personality Traits
- Ideals
- Bonds
- Flaws
- Backstory
- Appearance (age, height, weight, eyes, skin, hair)
- Character image (upload or URL)

**Validation:**
- Name is required and valid length

---

### Step 9: Review & Create

**What is displayed:**
- Complete character summary
- Stat block preview
- All selections made
- Calculated values (HP, AC, modifiers, etc.)
- Privacy toggle (public/private)

**Actions:**
- Go back to edit any step
- Create character
- Save as draft (future feature)

**On Create:**
1. Validate all steps
2. Build character object
3. Send to API
4. Redirect to character sheet
5. Show share link with short ID

---

## Component Structure

### Component Size Guidelines

```
Target: < 150 lines per component
Max: 200 lines (refactor if larger)

Composition Pattern:
- Container components: Handle data/logic
- Presentational components: Handle UI only
- Hook extraction: Complex logic goes to custom hooks
```

### Example Component Breakdown

#### Bad (Monolithic):
```tsx
// ClassStep.tsx - 500+ lines ❌
function ClassStep() {
  // All data fetching
  // All state management
  // All rendering
  // All event handlers
}
```

#### Good (Composed):
```tsx
// ClassStep/index.tsx - 50 lines ✓
function ClassStep() {
  const { classes, isLoading } = useClassesQuery();
  const selectedClassId = useCreatorStore(s => s.selectedClassId);

  if (isLoading) return <LoadingState />;

  return (
    <StepContainer>
      <StepHeader
        title="Choose Your Class"
        description="Your class determines your capabilities"
      />
      <ClassSelector classes={classes} />
      {selectedClassId && <ClassPreview classId={selectedClassId} />}
    </StepContainer>
  );
}

// ClassSelector.tsx - 80 lines ✓
function ClassSelector({ classes }) {
  return (
    <SelectionGrid>
      {classes.map(c => (
        <ClassCard key={c.id} classData={c} />
      ))}
    </SelectionGrid>
  );
}

// ClassCard.tsx - 60 lines ✓
function ClassCard({ classData }) {
  const setClass = useCreatorStore(s => s.setClass);
  const isSelected = useCreatorStore(s => s.selectedClassId === classData.id);

  return (
    <SelectionCard
      selected={isSelected}
      onClick={() => setClass(classData.id)}
    >
      <CardImage src={classData.image} />
      <CardTitle>{classData.nameRu}</CardTitle>
      <CardSubtitle>d{classData.hitDie}</CardSubtitle>
    </SelectionCard>
  );
}

// ClassPreview.tsx - 100 lines ✓
function ClassPreview({ classId }) {
  const { data: classData } = useClassQuery(classId);

  return (
    <InfoPanel>
      <ClassFeaturesList features={classData.features} level={1} />
      {classData.spellcasting && (
        <SpellcastingPreview spellcasting={classData.spellcasting} />
      )}
    </InfoPanel>
  );
}
```

### Shared Components

```tsx
// SelectionGrid - Responsive grid for cards
<SelectionGrid columns={{ sm: 1, md: 2, lg: 3 }}>
  {children}
</SelectionGrid>

// SelectionCard - Clickable card with selection state
<SelectionCard
  selected={boolean}
  disabled={boolean}
  onClick={handler}
>
  {children}
</SelectionCard>

// InfoPanel - Side panel for details
<InfoPanel title="Details" collapsible>
  {children}
</InfoPanel>

// StepHeader - Consistent step headers
<StepHeader
  title="Step Title"
  description="Step description"
  icon={Icon}
/>

// ValidationMessage - Error/warning messages
<ValidationMessage type="error">
  Select at least one skill
</ValidationMessage>
```

---

## Design System

### Layout

```
┌─────────────────────────────────────────────────────────────┐
│  Header (Logo, User Menu)                                    │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────┐    │
│  │  Stepper (Step indicators)                          │    │
│  └─────────────────────────────────────────────────────┘    │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────────────┐  ┌────────────────────────────┐  │
│  │                      │  │                            │  │
│  │   Selection Area     │  │   Preview/Details Panel    │  │
│  │   (Cards Grid)       │  │   (Sticky on desktop)      │  │
│  │                      │  │                            │  │
│  │                      │  │                            │  │
│  └──────────────────────┘  └────────────────────────────┘  │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  Navigation (Back / Next buttons)                           │
└─────────────────────────────────────────────────────────────┘
```

### Mobile Layout

```
┌─────────────────────┐
│  Header             │
├─────────────────────┤
│  Stepper (compact)  │
├─────────────────────┤
│                     │
│  Selection Area     │
│  (Full width)       │
│                     │
├─────────────────────┤
│  Preview Panel      │
│  (Collapsible)      │
├─────────────────────┤
│  Navigation         │
│  (Fixed bottom)     │
└─────────────────────┘
```

### Color Tokens

```css
/* Selection States */
--selection-default-bg: var(--card);
--selection-default-border: var(--border);
--selection-hover-bg: var(--accent);
--selection-hover-border: var(--accent-foreground);
--selection-selected-bg: var(--primary);
--selection-selected-border: var(--primary);
--selection-disabled-bg: var(--muted);
--selection-disabled-border: var(--muted);

/* Step States */
--step-pending: var(--muted-foreground);
--step-active: var(--primary);
--step-completed: var(--success);
--step-error: var(--destructive);

/* Class Colors (for visual distinction) */
--class-barbarian: #E53935;
--class-bard: #AB47BC;
--class-cleric: #FDD835;
--class-druid: #66BB6A;
--class-fighter: #8D6E63;
--class-monk: #42A5F5;
--class-paladin: #FFCA28;
--class-ranger: #26A69A;
--class-rogue: #424242;
--class-sorcerer: #EF5350;
--class-warlock: #7E57C2;
--class-wizard: #5C6BC0;
```

### Typography

```css
/* Step Titles */
.step-title {
  font-size: 1.5rem;    /* 24px */
  font-weight: 600;
  line-height: 1.2;
}

/* Card Titles */
.card-title {
  font-size: 1.125rem;  /* 18px */
  font-weight: 500;
}

/* Card Subtitles */
.card-subtitle {
  font-size: 0.875rem;  /* 14px */
  color: var(--muted-foreground);
}

/* Description Text */
.description {
  font-size: 0.875rem;
  line-height: 1.5;
}

/* Small Labels */
.label {
  font-size: 0.75rem;   /* 12px */
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
```

### Spacing

```css
/* Base unit: 4px */
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */

/* Card padding */
--card-padding: var(--space-4);

/* Grid gaps */
--grid-gap-sm: var(--space-3);
--grid-gap-md: var(--space-4);
--grid-gap-lg: var(--space-6);

/* Section spacing */
--section-spacing: var(--space-8);
```

### Animations

```css
/* Selection feedback */
.selection-card {
  transition: all 150ms ease;
}

.selection-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.selection-card.selected {
  animation: select-pulse 300ms ease;
}

@keyframes select-pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.02); }
  100% { transform: scale(1); }
}

/* Step transitions */
.step-content {
  animation: fade-in 200ms ease;
}

@keyframes fade-in {
  from { opacity: 0; transform: translateX(10px); }
  to { opacity: 1; transform: translateX(0); }
}
```

### Card Variants

```tsx
// Standard Selection Card
<SelectionCard variant="default" />

// Featured Card (for recommended options)
<SelectionCard variant="featured" />

// Compact Card (for lists)
<SelectionCard variant="compact" />

// Disabled Card
<SelectionCard variant="default" disabled />
```

### Responsive Breakpoints

```css
/* Mobile first */
--breakpoint-sm: 640px;   /* Small tablets */
--breakpoint-md: 768px;   /* Tablets */
--breakpoint-lg: 1024px;  /* Desktop */
--breakpoint-xl: 1280px;  /* Large desktop */
```

---

## Level Up System

### Future-Proof Design

The character model stores `levelHistory` to track all level-up choices:

```typescript
interface LevelUpChoice {
  level: number;
  timestamp: string;

  // What was gained
  hpRoll?: number;            // HP roll result (or avg)
  hpMethod: 'roll' | 'average';

  // Ability Score Improvement (at levels 4, 8, 12, 16, 19)
  asi?: {
    type: 'ability' | 'feat';
    abilityIncreases?: Partial<AbilityScores>;  // +2 to one or +1 to two
    featId?: string;                             // If feat chosen instead
  };

  // Class features that require choices
  featureChoices?: {
    featureId: string;
    choice: string;           // e.g., Fighting Style selection
  }[];

  // Subclass selection (at subclassLevel)
  subclassId?: string;

  // Spells gained/changed
  spellChanges?: {
    added: string[];
    removed: string[];        // For known casters who can swap
  };

  // Cantrips gained
  cantripsAdded?: string[];

  // Expertise (Rogues, Bards)
  expertiseGained?: string[];
}
```

### Level Up API

```
PATCH /api/characters/:id/level-up
```

```typescript
// Request
{
  "hpRoll": 5,
  "hpMethod": "roll",
  "asi": {
    "type": "ability",
    "abilityIncreases": { "dexterity": 2 }
  },
  "spellChanges": {
    "added": ["invisibility"],
    "removed": []
  }
}

// Response
{
  "success": true,
  "character": {
    "level": 2,
    "levelHistory": [...]
  }
}
```

### Level Up Flow (Future Implementation)

1. **Validate eligibility** - Check XP threshold
2. **Calculate HP gain** - Roll or average
3. **Check for ASI** - At levels 4, 8, 12, 16, 19
4. **Check for subclass** - At subclassLevel
5. **New spells** - Based on class progression
6. **New features** - From class/subclass
7. **Save choices** - Store in levelHistory

---

## Data Flow

### Creation Flow

```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│   Browser   │────▶│   Backend    │────▶│  Database   │
└─────────────┘     └──────────────┘     └─────────────┘
      │                    │                    │
      │  1. Fetch races    │                    │
      │───────────────────▶│    Query races     │
      │                    │───────────────────▶│
      │     Races data     │                    │
      │◀───────────────────│◀───────────────────│
      │                    │                    │
      │  2. Select race    │                    │
      │  (store locally)   │                    │
      │                    │                    │
      │  ... more steps    │                    │
      │                    │                    │
      │  N. Create char    │                    │
      │───────────────────▶│  Validate & Save   │
      │                    │───────────────────▶│
      │   Character +      │                    │
      │   shortId          │                    │
      │◀───────────────────│◀───────────────────│
      │                    │                    │
      │  Redirect to       │                    │
      │  /c/shortId        │                    │
```

### Data Caching Strategy

```typescript
// React Query configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,      // 5 minutes
      gcTime: 30 * 60 * 1000,        // 30 minutes
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

// Reference data (rarely changes)
useQuery({
  queryKey: ['races'],
  queryFn: fetchRaces,
  staleTime: Infinity,              // Never refetch automatically
  gcTime: 24 * 60 * 60 * 1000,     // Cache for 24 hours
});

// Character data (user-specific)
useQuery({
  queryKey: ['character', id],
  queryFn: () => fetchCharacter(id),
  staleTime: 0,                     // Always refetch
});
```

### Optimistic Updates

```typescript
// When creating character
const createMutation = useMutation({
  mutationFn: createCharacter,
  onMutate: async (newCharacter) => {
    // Cancel outgoing refetches
    await queryClient.cancelQueries({ queryKey: ['characters'] });

    // Snapshot previous value
    const previousCharacters = queryClient.getQueryData(['characters']);

    // Optimistically update
    queryClient.setQueryData(['characters'], (old) => [
      ...old,
      { ...newCharacter, id: 'temp-id', status: 'creating' }
    ]);

    return { previousCharacters };
  },
  onError: (err, newCharacter, context) => {
    // Rollback on error
    queryClient.setQueryData(['characters'], context.previousCharacters);
  },
  onSettled: () => {
    // Refetch after mutation
    queryClient.invalidateQueries({ queryKey: ['characters'] });
  },
});
```

---

## Implementation Checklist

### Phase 1: Foundation
- [ ] Create folder structure
- [ ] Set up Zustand store with slices
- [ ] Set up React Query hooks
- [ ] Create shared UI components
- [ ] Update Prisma schema
- [ ] Create API endpoints

### Phase 2: Steps Implementation
- [ ] Origin Step (Race + Background)
- [ ] Class Step
- [ ] Abilities Step
- [ ] Skills Step
- [ ] Equipment Step
- [ ] Spells Step
- [ ] Details Step
- [ ] Review Step

### Phase 3: Polish
- [ ] Validation across all steps
- [ ] Error handling
- [ ] Loading states
- [ ] Animations
- [ ] Mobile responsiveness
- [ ] Accessibility (a11y)

### Phase 4: Features
- [ ] Character sharing (short ID)
- [ ] Privacy toggle
- [ ] PDF export
- [ ] Print view

### Phase 5: Level Up (Future)
- [ ] Level up API
- [ ] Level up UI
- [ ] XP tracking
- [ ] Feature choices at higher levels

---

*Generated: 2026-02-22*
