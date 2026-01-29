const { Pool } = require("pg");
const fs = require("fs");
const path = require("path");
require("dotenv").config({ path: ".env.local" });

async function applyMigrations() {
  const pool = new Pool({
    connectionString: process.env.DIRECT_URL || process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });

  try {
    console.log("🔗 Connecting to database...");

    // Проверяем существование таблиц Achievement и PlayerAchievement
    const checkTables = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name IN ('Achievement', 'PlayerAchievement')
    `);

    console.log(
      "📊 Existing tables:",
      checkTables.rows.map((r) => r.table_name),
    );

    if (checkTables.rows.length === 0) {
      console.log("📝 Applying achievements migration...");
      const migrationSql = fs.readFileSync(
        path.join(
          __dirname,
          "prisma/migrations/2025-01-29_add_achievements_tables.sql",
        ),
        "utf8",
      );
      await pool.query(migrationSql);
      console.log("✅ Achievements tables created");
    }

    // Проверяем наличие characterId в PlayerAchievement
    const checkColumn = await pool.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'PlayerAchievement' 
      AND column_name = 'characterId'
    `);

    if (checkColumn.rows.length === 0) {
      console.log("📝 Adding characterId to PlayerAchievement...");
      const migrationSql = fs.readFileSync(
        path.join(
          __dirname,
          "prisma/migrations/2025-01-29_add_character_to_player_achievement/migration.sql",
        ),
        "utf8",
      );
      await pool.query(migrationSql);
      console.log("✅ characterId column added");
    }

    // Проверяем индексы
    const checkIndexes = await pool.query(`
      SELECT indexname 
      FROM pg_indexes 
      WHERE tablename = 'PlayerAchievement'
    `);

    console.log(
      "📊 Indexes:",
      checkIndexes.rows.map((r) => r.indexname),
    );

    if (
      !checkIndexes.rows.find(
        (r) => r.indexname === "PlayerAchievement_userId_idx",
      )
    ) {
      console.log("📝 Adding userId index...");
      await pool.query(
        'CREATE INDEX "PlayerAchievement_userId_idx" ON "PlayerAchievement"("userId")',
      );
      console.log("✅ userId index added");
    }

    console.log("✅ All migrations applied successfully!");
  } catch (error) {
    console.error("❌ Migration error:", error);
    throw error;
  } finally {
    await pool.end();
  }
}

applyMigrations().catch(console.error);
