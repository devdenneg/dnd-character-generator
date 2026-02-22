# API & Database Documentation

D&D Character Generator - Full Backend Documentation

---

## Table of Contents

1. [Database Schema](#database-schema)
2. [API Endpoints](#api-endpoints)
3. [Authentication](#authentication)
4. [Error Handling](#error-handling)

---

## Database Schema

### Overview

Database: **PostgreSQL**
ORM: **Prisma**
Location: `backend/prisma/schema.prisma`

### Entity Relationship Diagram

```
User ─────────────────┬──────────────────┬──────────────────┐
  │                   │                  │                  │
  │ characters        │ roomsMastered    │ roomsJoined      │ achievements
  ▼                   ▼                  ▼                  ▼
Character           Room ◄────────── RoomPlayer      PlayerAchievement
  │                   │                  │                  │
  │ achievements      │ players          │                  │
  ▼                   ▼                  │                  │
PlayerAchievement ◄──────────────────────┘                  │
  │                                                         │
  │ achievement                                             │
  ▼                                                         │
Achievement ◄───────────────────────────────────────────────┘

Race ──────────► RaceTrait

CharacterClass ─┬──────────► ClassFeature
                │
                └──────────► Subclass ──────────► SubclassFeature

Background ─────► BackgroundEquipment ◄───────── Equipment

Spell (standalone)
Feat (standalone)
GlossaryTerm (standalone)
Monster (standalone)
```

---

### Models

#### User

| Field | Type | Description |
|-------|------|-------------|
| `id` | String (UUID) | Primary key |
| `email` | String | Unique email |
| `password` | String | Hashed password |
| `name` | String? | Display name |
| `role` | String | "player" or "master" |
| `createdAt` | DateTime | Creation timestamp |
| `updatedAt` | DateTime | Last update timestamp |

**Relations:**
- `characters` - Character[]
- `roomsMastered` - Room[]
- `roomsJoined` - RoomPlayer[]
- `achievements` - PlayerAchievement[]
- `achievementsGranted` - PlayerAchievement[]

---

#### Character

| Field | Type | Description |
|-------|------|-------------|
| `id` | String (UUID) | Primary key |
| `userId` | String | Foreign key to User |
| `name` | String | Character name |
| `data` | Json | Full character data blob |
| `createdAt` | DateTime | Creation timestamp |
| `updatedAt` | DateTime | Last update timestamp |

**Relations:**
- `user` - User
- `achievements` - PlayerAchievement[]
- `roomsJoined` - RoomPlayer[]

**Indexes:** `userId`

---

#### Race

| Field | Type | Description |
|-------|------|-------------|
| `id` | String (UUID) | Primary key |
| `externalId` | String | Unique external ID (e.g., "elf", "dwarf") |
| `name` | String | English name |
| `nameRu` | String | Russian name |
| `description` | Json | Rich text description |
| `speed` | String | Movement speed (e.g., "30 feet") |
| `size` | String | Size category |
| `abilityIncreases` | Json? | Ability score bonuses |
| `source` | Json | Source book info |
| `image` | String? | Main image URL |
| `gallery` | String[] | Additional images |
| `hasLineages` | Boolean | Has lineage variants |
| `lastUsername` | String? | Last editor |
| `properties` | Json? | Additional properties |
| `createdAt` | DateTime | Creation timestamp |
| `updatedAt` | DateTime | Last update timestamp |

**Relations:**
- `traits` - RaceTrait[]

---

#### RaceTrait

| Field | Type | Description |
|-------|------|-------------|
| `id` | String (UUID) | Primary key |
| `raceId` | String | Foreign key to Race |
| `externalId` | String? | External ID |
| `name` | String | English name |
| `nameRu` | String | Russian name |
| `description` | Json | Rich text description |
| `createdAt` | DateTime | Creation timestamp |

**Relations:**
- `race` - Race (onDelete: Cascade)

**Indexes:** `raceId`

---

#### CharacterClass

| Field | Type | Description |
|-------|------|-------------|
| `id` | String (UUID) | Primary key |
| `externalId` | String | Unique external ID (e.g., "wizard", "fighter") |
| `name` | String | English name |
| `nameRu` | String | Russian name |
| `description` | Json? | Rich text description |
| `image` | String? | Main image URL |
| `gallery` | String[] | Additional images |
| `hitDie` | Int | Hit die (e.g., 8, 10, 12) |
| `primaryAbility` | String[] | Primary abilities |
| `savingThrows` | String[] | Proficient saving throws |
| `armorProficiencies` | String[] | Armor proficiencies |
| `weaponProficiencies` | String[] | Weapon proficiencies |
| `skillChoices` | String[] | Available skill choices |
| `skillCount` | Int | Number of skills to choose |
| `subclassLevel` | Int | Level when subclass is chosen |
| `source` | String | "srd" or "phb2024" |
| `spellcasting` | Json? | Spellcasting data |
| `classTable` | Json? | Level progression table |
| `multiclassing` | Json? | Multiclassing rules |
| `startingGold` | Int | Starting gold amount |
| `startingEquipment` | Json? | Starting equipment options |
| `createdAt` | DateTime | Creation timestamp |
| `updatedAt` | DateTime | Last update timestamp |

**Relations:**
- `features` - ClassFeature[]
- `subclasses` - Subclass[]

**Indexes:** `externalId`, `source`

---

#### ClassFeature

| Field | Type | Description |
|-------|------|-------------|
| `id` | String (UUID) | Primary key |
| `classId` | String | Foreign key to CharacterClass |
| `name` | String | English name |
| `nameRu` | String | Russian name |
| `description` | Json? | Rich text description |
| `level` | Int | Level when acquired |
| `createdAt` | DateTime | Creation timestamp |

**Relations:**
- `class` - CharacterClass (onDelete: Cascade)

**Indexes:** `classId`

---

#### Subclass

| Field | Type | Description |
|-------|------|-------------|
| `id` | String (UUID) | Primary key |
| `classId` | String | Foreign key to CharacterClass |
| `externalId` | String | External ID |
| `name` | String | English name |
| `nameRu` | String | Russian name |
| `description` | Json? | Rich text description |
| `source` | String | Source book |
| `classTable` | Json? | Subclass-specific table |
| `createdAt` | DateTime | Creation timestamp |

**Relations:**
- `class` - CharacterClass (onDelete: Cascade)
- `features` - SubclassFeature[]

**Indexes:** `classId`, `externalId`

---

#### SubclassFeature

| Field | Type | Description |
|-------|------|-------------|
| `id` | String (UUID) | Primary key |
| `subclassId` | String | Foreign key to Subclass |
| `name` | String | English name |
| `nameRu` | String | Russian name |
| `description` | Json? | Rich text description |
| `level` | Int | Level when acquired |
| `createdAt` | DateTime | Creation timestamp |

**Relations:**
- `subclass` - Subclass (onDelete: Cascade)

**Indexes:** `subclassId`

---

#### Background

| Field | Type | Description |
|-------|------|-------------|
| `id` | String (UUID) | Primary key |
| `externalId` | String | Unique external ID |
| `name` | String | English name |
| `nameRu` | String | Russian name |
| `description` | String (Text) | Description |
| `skillProficiencies` | String[] | Skill proficiencies |
| `toolProficiencies` | String[] | Tool proficiencies |
| `languages` | Int | Number of additional languages |
| `startingGold` | Int | Starting gold |
| `originFeat` | String | Origin feat name |
| `abilityScoreIncrease` | Json | ASI options |
| `source` | String | Source book |
| `createdAt` | DateTime | Creation timestamp |
| `updatedAt` | DateTime | Last update timestamp |

**Relations:**
- `equipment` - BackgroundEquipment[]

**Indexes:** `externalId`, `source`

---

#### Equipment

| Field | Type | Description |
|-------|------|-------------|
| `id` | String (UUID) | Primary key |
| `externalId` | String | Unique external ID |
| `name` | String | English name |
| `nameRu` | String | Russian name |
| `category` | String | Equipment category |
| `cost` | Json | { quantity, unit } |
| `weight` | Float? | Weight in pounds |
| `source` | String | Source book |
| `description` | Json? | Description |
| `damage` | Json? | { dice, type } for weapons |
| `armorClass` | Int? | AC for armor |
| `armorType` | String? | Armor type |
| `maxDexBonus` | Int? | Max DEX bonus for armor |
| `properties` | String[] | Item properties |
| `createdAt` | DateTime | Creation timestamp |
| `updatedAt` | DateTime | Last update timestamp |

**Relations:**
- `backgroundEquipment` - BackgroundEquipment[]

---

#### BackgroundEquipment

| Field | Type | Description |
|-------|------|-------------|
| `id` | String (UUID) | Primary key |
| `backgroundId` | String | Foreign key to Background |
| `itemId` | String | Foreign key to Equipment |
| `quantity` | Int | Item quantity |

**Relations:**
- `background` - Background (onDelete: Cascade)
- `equipment` - Equipment (onDelete: Cascade)

**Indexes:** `backgroundId`, `itemId`

---

#### Spell

| Field | Type | Description |
|-------|------|-------------|
| `id` | String (UUID) | Primary key |
| `externalId` | String | Unique external ID |
| `name` | String | English name |
| `nameRu` | String | Russian name |
| `level` | Int | 0 for cantrips, 1-9 for spells |
| `school` | String | School of magic |
| `castingTime` | String | Casting time |
| `range` | String | Spell range |
| `components` | String | V, S, M components |
| `duration` | String | Spell duration |
| `description` | Json | Rich text description |
| `classes` | String[] | Class IDs that can use spell |
| `source` | String | Source book |
| `createdAt` | DateTime | Creation timestamp |
| `updatedAt` | DateTime | Last update timestamp |

**Indexes:** `externalId`, `level`, `source`

---

#### Feat

| Field | Type | Description |
|-------|------|-------------|
| `id` | String | Primary key |
| `name` | String | English name |
| `nameRu` | String | Russian name |
| `category` | String | Feat category |
| `prerequisite` | String? | Prerequisites |
| `description` | Json | Rich text description |
| `source` | String | Source book |
| `createdAt` | DateTime | Creation timestamp |
| `updatedAt` | DateTime | Last update timestamp |

**Indexes:** `category`, `name`, `nameRu`

---

#### GlossaryTerm

| Field | Type | Description |
|-------|------|-------------|
| `id` | String | Primary key |
| `name` | String | English name |
| `nameRu` | String | Russian name |
| `category` | String | Term category |
| `description` | Json | Rich text description |
| `source` | String | Source book |
| `createdAt` | DateTime | Creation timestamp |
| `updatedAt` | DateTime | Last update timestamp |

**Indexes:** `category`, `name`, `nameRu`

---

#### Monster

| Field | Type | Description |
|-------|------|-------------|
| `id` | String (UUID) | Primary key |
| `externalId` | String | Unique external ID |
| `name` | String | English name |
| `nameRu` | String | Russian name |
| `size` | String | Size category |
| `type` | String | Creature type |
| `alignment` | String | Alignment |
| `ac` | Json | Armor class data |
| `hp` | Json | Hit points data |
| `speed` | String | Movement speeds |
| `str` | Int | Strength score |
| `dex` | Int | Dexterity score |
| `con` | Int | Constitution score |
| `int` | Int | Intelligence score |
| `wis` | Int | Wisdom score |
| `cha` | Int | Charisma score |
| `saves` | Json? | Saving throw bonuses |
| `skills` | Json? | Skill bonuses |
| `vulnerabilities` | String? | Damage vulnerabilities |
| `resistances` | String? | Damage resistances |
| `immunities` | String? | Damage immunities |
| `senses` | String? | Special senses |
| `languages` | String? | Languages |
| `cr` | String | Challenge rating |
| `traits` | Json? | Special traits |
| `actions` | Json? | Actions |
| `reactions` | Json? | Reactions |
| `legendary` | Json? | Legendary actions |
| `description` | Json? | Description |
| `source` | String | Source book |
| `imageUrl` | String? | Image URL |
| `createdAt` | DateTime | Creation timestamp |
| `updatedAt` | DateTime | Last update timestamp |

**Indexes:** `externalId`, `name`, `nameRu`, `type`, `cr`

---

#### Achievement

| Field | Type | Description |
|-------|------|-------------|
| `id` | String (UUID) | Primary key |
| `key` | String | Unique achievement key |
| `name` | String | Display name |
| `description` | String | Description |
| `icon` | String | Icon identifier |
| `category` | String | Category |
| `rarity` | String | Rarity level |
| `xpReward` | Int | XP reward |
| `createdAt` | DateTime | Creation timestamp |

**Relations:**
- `playerAchievements` - PlayerAchievement[]

---

#### PlayerAchievement

| Field | Type | Description |
|-------|------|-------------|
| `id` | String (UUID) | Primary key |
| `achievementId` | String | Foreign key to Achievement |
| `userId` | String | Foreign key to User |
| `characterId` | String? | Foreign key to Character |
| `grantedById` | String | Foreign key to User (granter) |
| `grantedAt` | DateTime | Grant timestamp |

**Relations:**
- `achievement` - Achievement (onDelete: Cascade)
- `user` - User (onDelete: Cascade)
- `character` - Character? (onDelete: SetNull)
- `grantedBy` - User (onDelete: Cascade)

**Indexes:** `achievementId`, `userId`, `characterId`

---

#### Room

| Field | Type | Description |
|-------|------|-------------|
| `id` | String (UUID) | Primary key |
| `masterId` | String | Foreign key to User |
| `name` | String | Room name |
| `maxPlayers` | Int | Maximum players (default: 4) |
| `password` | String | Room password |
| `isActive` | Boolean | Is room active |
| `isStarted` | Boolean | Has game started |
| `createdAt` | DateTime | Creation timestamp |
| `updatedAt` | DateTime | Last update timestamp |

**Relations:**
- `master` - User (onDelete: Cascade)
- `players` - RoomPlayer[]

---

#### RoomPlayer

| Field | Type | Description |
|-------|------|-------------|
| `id` | String (UUID) | Primary key |
| `roomId` | String | Foreign key to Room |
| `userId` | String | Foreign key to User |
| `characterId` | String | Foreign key to Character |
| `joinedAt` | DateTime | Join timestamp |
| `isOnline` | Boolean | Online status |

**Relations:**
- `room` - Room (onDelete: Cascade)
- `user` - User (onDelete: Cascade)
- `character` - Character (onDelete: Cascade)

**Constraints:** Unique(roomId, userId)

**Indexes:** `roomId`, `userId`, `characterId`

---

## API Endpoints

### Base URL

```
/api
```

### Health Check

```
GET /api/health
```

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2026-02-22T12:00:00.000Z"
}
```

---

### Authentication (`/api/auth`)

#### Register

```
POST /api/auth/register
```

**Rate Limited:** Yes (authLimiter)

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "name": "John Doe"
}
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "player"
  },
  "token": "jwt_token"
}
```

---

#### Login

```
POST /api/auth/login
```

**Rate Limited:** Yes (authLimiter)

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "success": true,
  "user": { ... },
  "token": "jwt_token"
}
```

---

#### Telegram Auth

```
POST /api/auth/telegram-auth
```

**Rate Limited:** Yes (authLimiter)

**Request Body:** Telegram auth data

---

#### Logout

```
POST /api/auth/logout
```

**Auth Required:** Yes

**Response:**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

#### Get Current User

```
GET /api/auth/me
```

**Auth Required:** Yes

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "player"
  }
}
```

---

### Characters (`/api/characters`)

**All routes require authentication.**

#### Create Character

```
POST /api/characters
```

**Request Body:**
```json
{
  "name": "Gandalf",
  "data": {
    "race": { ... },
    "class": { ... },
    "abilities": { ... },
    "equipment": [ ... ],
    "spells": [ ... ]
  }
}
```

---

#### List User Characters

```
GET /api/characters
```

**Response:**
```json
{
  "success": true,
  "characters": [
    {
      "id": "uuid",
      "name": "Gandalf",
      "data": { ... },
      "createdAt": "...",
      "updatedAt": "..."
    }
  ]
}
```

---

#### Get Character by ID

```
GET /api/characters/:id
```

---

#### Update Character

```
PUT /api/characters/:id
```

---

#### Delete Character

```
DELETE /api/characters/:id
```

---

### Races (`/api/races`)

#### List All Races

```
GET /api/races
```

**Auth Required:** No

**Response:**
```json
{
  "success": true,
  "races": [
    {
      "id": "uuid",
      "externalId": "elf",
      "name": "Elf",
      "nameRu": "Эльф",
      "description": [ ... ],
      "speed": "30 feet",
      "size": "Medium",
      "traits": [ ... ]
    }
  ]
}
```

---

#### List Races Metadata (Lightweight)

```
GET /api/races/meta
```

**Auth Required:** No

Returns only basic info (id, name, nameRu) without descriptions and traits.

---

#### Get Race by ID

```
GET /api/races/:id
```

---

#### Get Race by External ID

```
GET /api/races/external/:externalId
```

---

#### Create Race (Admin)

```
POST /api/races
```

**Auth Required:** Yes

---

#### Update Race (Admin)

```
PUT /api/races/:id
```

**Auth Required:** Yes

---

#### Delete Race (Admin)

```
DELETE /api/races/:id
```

**Auth Required:** Yes

---

### Classes (`/api/classes`)

#### List All Classes

```
GET /api/classes
```

**Auth Required:** No

**Response:**
```json
{
  "success": true,
  "classes": [
    {
      "id": "uuid",
      "externalId": "wizard",
      "name": "Wizard",
      "nameRu": "Волшебник",
      "hitDie": 6,
      "primaryAbility": ["Intelligence"],
      "savingThrows": ["Intelligence", "Wisdom"],
      "features": [ ... ],
      "subclasses": [ ... ],
      "spellcasting": { ... }
    }
  ]
}
```

---

#### List Classes Metadata

```
GET /api/classes/meta
```

---

#### Get Class by ID

```
GET /api/classes/:id
```

---

#### Get Class by External ID

```
GET /api/classes/external/:externalId
```

---

#### Create/Update/Delete Class (Admin)

```
POST /api/classes
PUT /api/classes/:id
DELETE /api/classes/:id
```

**Auth Required:** Yes

---

### Backgrounds (`/api/backgrounds`)

#### List All Backgrounds

```
GET /api/backgrounds
```

---

#### List Backgrounds Metadata

```
GET /api/backgrounds/meta
```

---

#### Get Background by ID

```
GET /api/backgrounds/:id
```

---

#### Get Background by External ID

```
GET /api/backgrounds/external/:externalId
```

---

#### Create/Update/Delete Background (Admin)

```
POST /api/backgrounds
PUT /api/backgrounds/:id
DELETE /api/backgrounds/:id
```

**Auth Required:** Yes

---

### Spells (`/api/spells`)

#### List All Spells

```
GET /api/spells
```

**Query Parameters:**
- `level` - Filter by spell level (0-9)
- `school` - Filter by school
- `class` - Filter by class

---

#### List Spells Metadata

```
GET /api/spells/meta
```

---

#### Get Spells by Class

```
GET /api/spells/class/:classId
```

---

#### Get Spell by ID

```
GET /api/spells/:id
```

---

#### Get Spell by External ID

```
GET /api/spells/external/:externalId
```

---

#### Create/Update/Delete Spell (Admin)

```
POST /api/spells
PUT /api/spells/:id
DELETE /api/spells/:id
```

**Auth Required:** Yes

---

### Equipment (`/api/equipment`)

#### List All Equipment

```
GET /api/equipment
```

**Query Parameters:**
- `category` - Filter by category

---

#### List Equipment Metadata

```
GET /api/equipment/meta
```

---

#### Get Equipment by ID

```
GET /api/equipment/:id
```

---

#### Get Equipment by External ID

```
GET /api/equipment/external/:externalId
```

---

#### Create/Update/Delete Equipment (Admin)

```
POST /api/equipment
PUT /api/equipment/:id
DELETE /api/equipment/:id
```

**Auth Required:** Yes

---

### Feats (`/api/feats`)

#### List All Feats

```
GET /api/feats
```

**Query Parameters:**
- `category` - Filter by category

---

#### List Feats Metadata

```
GET /api/feats/meta
```

---

#### Get Feat by ID

```
GET /api/feats/:id
```

---

#### Get Feat by External ID

```
GET /api/feats/external/:externalId
```

---

### Glossary (`/api/glossary`)

#### List All Terms

```
GET /api/glossary
```

---

#### List Terms Metadata

```
GET /api/glossary/meta
```

---

#### Get Categories

```
GET /api/glossary/categories
```

---

#### Get Term by ID

```
GET /api/glossary/:id
```

---

### Bestiary / Monsters (`/api/bestiary`)

#### List Monsters Metadata

```
GET /api/bestiary/meta
```

---

#### Search Monsters

```
GET /api/bestiary/search
```

**Query Parameters:**
- `q` - Search query
- `type` - Filter by creature type
- `cr` - Filter by challenge rating

---

#### Get Monster by ID

```
GET /api/bestiary/:id
```

---

### Rooms (`/api/rooms`)

#### List Active Rooms (Public)

```
GET /api/rooms/active
```

---

#### Verify Room Password (Public)

```
POST /api/rooms/:id/verify
```

**Request Body:**
```json
{
  "password": "room_password"
}
```

---

#### Create Room

```
POST /api/rooms
```

**Auth Required:** Yes

**Request Body:**
```json
{
  "name": "Adventure Party",
  "maxPlayers": 4,
  "password": "secret"
}
```

---

#### List User Rooms

```
GET /api/rooms
```

**Auth Required:** Yes

---

#### Get Room by ID

```
GET /api/rooms/:id
```

**Auth Required:** Yes

---

#### Get Room Players

```
GET /api/rooms/:id/players
```

**Auth Required:** Yes

---

#### Update Room

```
PUT /api/rooms/:id
```

**Auth Required:** Yes

---

#### Delete Room

```
DELETE /api/rooms/:id
```

**Auth Required:** Yes

---

#### Join Room

```
POST /api/rooms/:id/join
```

**Auth Required:** Yes

**Request Body:**
```json
{
  "password": "room_password",
  "characterId": "character_uuid"
}
```

---

#### Start Game

```
POST /api/rooms/:id/start
```

**Auth Required:** Yes (Master only)

---

### Achievements (`/api/achievements`)

**All routes require authentication.**

#### Create Achievement

```
POST /api/achievements/rooms/:roomId
```

**Request Body:**
```json
{
  "key": "first_blood",
  "name": "First Blood",
  "description": "Deal the first damage in combat",
  "icon": "sword",
  "category": "combat",
  "rarity": "common",
  "xpReward": 50
}
```

---

#### Get Room Achievements

```
GET /api/achievements/rooms/:roomId
```

---

#### Grant Achievement

```
POST /api/achievements/rooms/:roomId/grant
```

**Request Body:**
```json
{
  "achievementId": "achievement_uuid",
  "userId": "user_uuid",
  "characterId": "character_uuid"
}
```

---

#### Get Player Achievements

```
GET /api/achievements/me/achievements
```

---

#### Get Room Player Achievements

```
GET /api/achievements/rooms/:roomId/player-achievements
```

---

### Search (`/api/search`)

#### Global Search

```
GET /api/search
```

**Query Parameters:**
- `q` - Search query (required)
- `type` - Filter by type (races, classes, spells, etc.)

---

#### Get Random Content

```
GET /api/search/random
```

Returns random D&D content for homepage.

---

### Upload (`/api/upload`)

**All routes require authentication.**

#### List Files

```
GET /api/upload
```

---

#### Upload File

```
POST /api/upload
```

**Content-Type:** multipart/form-data

**Form Data:**
- `file` - File to upload

---

#### Delete File

```
DELETE /api/upload/:filename
```

---

## Authentication

### JWT Token

All protected routes require a JWT token in the Authorization header:

```
Authorization: Bearer <jwt_token>
```

### Token Structure

```json
{
  "userId": "uuid",
  "email": "user@example.com",
  "role": "player",
  "iat": 1234567890,
  "exp": 1234567890
}
```

---

## Error Handling

### Error Response Format

```json
{
  "success": false,
  "error": "Error message"
}
```

### HTTP Status Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 429 | Too Many Requests (Rate Limited) |
| 500 | Internal Server Error |

---

## Security Features

### Rate Limiting

- **General:** Applied to all `/api` routes
- **Auth:** Stricter limits for `/api/auth` routes

### Request Validation

- Payload size limits
- Content-Type validation
- Input sanitization
- NoSQL injection protection
- HTTP Parameter Pollution protection

### CORS

- Strict origin validation in production
- Credentials support enabled

### Headers

- Helmet.js security headers
- Content Security Policy
- XSS Protection

---

## Static Files

Uploaded files are served from:

```
/uploads/<filename>
```

---

*Generated: 2026-02-22*
