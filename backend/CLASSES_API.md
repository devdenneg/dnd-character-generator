# Classes API Documentation

## Overview
This document describes the Classes API implementation for managing D&D 5e classes from PHB 2024.

## Database Schema

### CharacterClass Model
- `id`: UUID (primary key)
- `externalId`: String (unique) - ID from frontend (e.g., "barbarian", "wizard")
- `name`: String - English name
- `nameRu`: String - Russian name
- `description`: Text - Class description
- `hitDie`: Int - Hit die value (6, 8, 10, or 12)
- `primaryAbility`: String - JSON array of primary abilities
- `savingThrows`: String - JSON array of saving throw abilities
- `armorProficiencies`: String - JSON array of armor proficiencies
- `weaponProficiencies`: String - JSON array of weapon proficiencies
- `skillChoices`: String - JSON array of skill choices
- `skillCount`: Int - Number of skills to choose
- `subclassLevel`: Int - Level at which subclass is chosen
- `source`: String - "srd" or "phb2024"
- `startingEquipment`: Json - Starting equipment with gold

### ClassFeature Model
- `id`: UUID (primary key)
- `classId`: UUID - Reference to CharacterClass
- `name`: String - English name
- `nameRu`: String - Russian name
- `description`: Text - Feature description
- `level`: Int - Level at which feature is gained

### Subclass Model
- `id`: UUID (primary key)
- `classId`: UUID - Reference to CharacterClass
- `externalId`: String - ID from frontend
- `name`: String - English name
- `nameRu`: String - Russian name
- `description`: Text - Subclass description
- `source`: String - "srd" or "phb2024"

### SubclassFeature Model
- `id`: UUID (primary key)
- `subclassId`: UUID - Reference to Subclass
- `name`: String - English name
- `nameRu`: String - Russian name
- `description`: Text - Feature description
- `level`: Int - Level at which feature is gained

## API Endpoints

### Public Endpoints (No Authentication Required)

#### Get All Classes
```
GET /api/classes?source=phb2024
```

#### Get Class by ID
```
GET /api/classes/:id
```

#### Get Class by External ID
```
GET /api/classes/external/:externalId
```

### Admin Endpoints (Authentication Required)

#### Create Class
```
POST /api/classes
```

Body:
```json
{
  "externalId": "barbarian",
  "name": "Barbarian",
  "nameRu": "Варвар",
  "description": "Барбары — это могучие воины...",
  "hitDie": 12,
  "primaryAbility": ["strength"],
  "savingThrows": ["strength", "constitution"],
  "armorProficiencies": ["Лёгкие доспехи", "Средние доспехи", "Щиты"],
  "weaponProficiencies": ["Простое оружие", "Воинское оружие"],
  "skillChoices": ["animal_handling", "athletics", "intimidation", "nature", "perception", "survival"],
  "skillCount": 2,
  "subclassLevel": 3,
  "source": "phb2024",
  "features": [
    {
      "name": "Rage",
      "nameRu": "Ярость",
      "description": "Вы можете наделить себя первобытной силой...",
      "level": 1
    }
  ],
  "subclasses": [
    {
      "externalId": "path-of-the-berserker",
      "name": "Path of the Berserker",
      "nameRu": "Путь берсерка",
      "description": "Путь берсерка направляет ярость...",
      "features": [
        {
          "name": "Frenzy",
          "nameRu": "Неистовство",
          "description": "Вы можете использовать свою Ярость...",
          "level": 3
        }
      ]
    }
  ],
  "startingEquipment": {
    "equipment": [...],
    "gold": 15
  }
}
```

#### Update Class
```
PUT /api/classes/:id
```

Body (all fields optional):
```json
{
  "name": "Updated Name",
  "description": "Updated description"
}
```

#### Delete Class
```
DELETE /api/classes/:id
```

## Usage Examples

### Using in Frontend (React)

```typescript
import { useBackendClasses, useBackendClass } from '@/api/hooks';
import { classesApi } from '@/api/client';

// Get all classes
const { data, isLoading } = useBackendClasses('phb2024');

// Get single class
const { data: classData } = useBackendClass(classId);

// Create new class
const newClass = await classesApi.create({
  externalId: "paladin",
  name: "Paladin",
  nameRu: "Паладин",
  // ... other fields
});

// Update class
const updatedClass = await classesApi.update(classId, {
  nameRu: "Паладин (обновлённый)",
});

// Delete class
await classesApi.delete(classId);
```

## Seeding Classes

To seed the database with PHB 2024 classes:

```bash
cd backend
npm run seed:classes
```

This will:
1. Delete all existing classes, features, and subclasses
2. Import all classes from `src/data/phb2024/classes.ts`
3. Create proper relationships between classes, features, and subclasses

## CSV Export

To generate a CSV file with class data (for manual import to other systems):

```bash
cd backend
npm run generate:classes:csv
```

This will create `classes.csv` in the backend directory with basic class information.

## Notes

1. **Data Format**: Arrays (abilities, proficiencies, etc.) are stored as JSON strings in the database
2. **Cascading Deletes**: When a class is deleted, all its features and subclasses are also deleted
3. **External ID**: The `externalId` field is used for frontend-backend integration
4. **Source**: Track whether data comes from SRD or PHB 2024 for filtering
