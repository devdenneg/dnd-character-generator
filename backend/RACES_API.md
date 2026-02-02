# Races API Documentation

## Overview
This API provides endpoints for managing D&D 5e (2024) race data stored in the database.

## Base URL
`/api/races`

## Authentication
- **Read operations** (GET): No authentication required (public endpoints)
- **Write operations** (POST, PUT, DELETE): Authentication required (admin endpoints)

## Endpoints

### GET /api/races
Get all races. Optionally filter by source.

**Query Parameters:**
- `source` (optional): Filter by source ("srd" or "phb2024")

**Response:**
```json
{
  "success": true,
  "data": {
    "races": [
      {
        "id": "uuid",
        "externalId": "aasimar",
        "name": "Aasimar",
        "nameRu": "Аасимар",
        "description": "...",
        "speed": 30,
        "size": "Medium",
        "source": "phb2024",
        "createdAt": "2025-02-02T...",
        "updatedAt": "2025-02-02T...",
        "traits": [
          {
            "id": "uuid",
            "raceId": "uuid",
            "name": "Celestial Resistance",
            "nameRu": "Небесная стойкость",
            "description": "Вы обладаете сопротивлением к некротическому урону и урону излучением.",
            "createdAt": "2025-02-02T..."
          }
        ]
      }
    ]
  }
}
```

### GET /api/races/:id
Get a specific race by database ID.

**Response:** Same as above but with a single race object.

### GET /api/races/external/:externalId
Get a specific race by external ID (e.g., "aasimar", "dragonborn").

**Response:** Same as above but with a single race object.

### POST /api/races
Create a new race (requires authentication).

**Request Body:**
```json
{
  "externalId": "aasimar",
  "name": "Aasimar",
  "nameRu": "Аасимар",
  "description": "Race description...",
  "speed": 30,
  "size": "Medium",
  "source": "phb2024",
  "traits": [
    {
      "name": "Celestial Resistance",
      "nameRu": "Небесная стойкость",
      "description": "Trait description..."
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "race": { /* race object */ }
  }
}
```

### PUT /api/races/:id
Update a race (requires authentication).

**Request Body:** All fields are optional.
```json
{
  "name": "Updated Name",
  "description": "Updated description...",
  "traits": [ /* new array of traits */ ]
}
```

**Response:** Same as POST response.

### DELETE /api/races/:id
Delete a race (requires authentication).

**Response:**
```json
{
  "success": true,
  "message": "Race deleted successfully"
}
```

## Seeding the Database

To seed the database with PHB 2024 races data:

```bash
cd backend
npm run seed:races
```

This will:
1. Delete all existing races and traits
2. Create 10 PHB 2024 races with their traits

## Available Races

After seeding, the following races will be available:

1. Aasimar (Аасимар)
2. Dragonborn (Драконорождённый)
3. Dwarf (Дварф)
4. Elf (Эльф)
5. Gnome (Гном)
6. Goliath (Голиаф)
7. Halfling (Полурослик)
8. Human (Человек)
9. Orc (Орк)
10. Tiefling (Тифлинг)

## Frontend Usage

```typescript
import { useBackendRaces, useBackendRaceByExternalId } from '@/api/hooks';

// Get all races
const { data, isLoading } = useBackendRaces('phb2024');

// Get specific race by external ID
const { data: race } = useBackendRaceByExternalId('dragonborn');
```

## Migration

To apply the database migration (create tables):

```bash
cd backend
npm run migration:apply
```

Or if running locally with Prisma:

```bash
npx prisma migrate dev --name add_races_table
```

## Database Schema

### Race Table
- `id`: UUID (primary key)
- `externalId`: String (unique) - ID used in frontend
- `name`: String - English name
- `nameRu`: String - Russian name
- `description`: String - Description
- `speed`: Integer - Speed in feet
- `size`: String - "Small", "Medium", or "Large"
- `source`: String - "srd" or "phb2024"
- `createdAt`: DateTime
- `updatedAt`: DateTime

### RaceTrait Table
- `id`: UUID (primary key)
- `raceId`: UUID (foreign key to Race)
- `name`: String - English trait name
- `nameRu`: String - Russian trait name
- `description`: String - Trait description
- `createdAt`: DateTime

## Notes

- The `externalId` field matches the IDs used in the frontend data files (`src/data/phb2024/races.ts`)
- All race traits are deleted and recreated when a race is updated with new traits
- Cascade delete is enabled: deleting a race will delete all associated traits
- Indexes are created on `externalId` and `source` for faster queries
