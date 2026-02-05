# Production Migration Guide - Adding startingEquipment Field

## Overview
This migration adds the `startingEquipment` JSON field to the `CharacterClass` table to support rich equipment data from PHB 2024.

## What Changes
- **Schema**: Adds `startingEquipment JSONB` column to `CharacterClass` table
- **Data**: Re-seeds all class data with new equipment information
- **Impact**: Only affects class data; all other data (users, characters, equipment, spells, backgrounds, races) remains unchanged

## Migration Files
1. `prisma/migrations/2026-02-05_add_starting_equipment_to_classes/migration.sql` - Schema change
2. `seed-classes-new.ts` - Updated to populate startingEquipment field

## Automatic Deployment (via GitHub Actions)
The migration will be applied automatically when you push to `main`:

1. Push changes to `main` branch
2. GitHub Actions workflow will:
   - Pull latest code
   - Install dependencies
   - Generate Prisma Client
   - Apply `prisma db push` (updates schema)
   - Apply all SQL migrations in `prisma/migrations/`
   - Build and restart backend
   - Build frontend

## Manual Deployment (if needed)
If you need to apply the migration manually on the production server:

```bash
# SSH into production server
ssh your-user@your-server

# Navigate to project directory
cd /var/www/dnd-character-generator/backend

# Pull latest changes
git pull origin main

# Install dependencies
npm ci

# Generate Prisma Client
npx prisma generate

# Apply migration
sudo -u postgres psql -d dnd_generator -f prisma/migrations/2026-02-05_add_starting_equipment_to_classes/migration.sql

# Re-seed classes
npx tsx seed-classes-new.ts

# Rebuild and restart
npm run build
pm2 restart dnd-backend
```

## Verification
After deployment, verify the migration:

```bash
# Check database stats
npx tsx db-stats.ts

# Should show:
# characterClass: 15
# equipment: 293
# ... (other tables unchanged)
```

## Rollback (if needed)
If something goes wrong, you can rollback the schema change:

```sql
ALTER TABLE "CharacterClass" DROP COLUMN "startingEquipment";
```

Then re-seed classes with the old script (though this is not recommended).

## Notes
- ✅ Migration is **non-destructive** - only adds a new column
- ✅ Existing data is **preserved**
- ✅ Frontend is **backward compatible** - works with or without the new field
- ⚠️ Class data will be **re-seeded** with new equipment information
