const { PrismaClient } = require("@prisma/client");
const { PrismaNeon } = require("@prisma/adapter-neon");
const { neonConfig } = require("@neondatabase/serverless");
const ws = require("ws");
require("dotenv").config({ path: ".env.local" });

async function checkDatabase() {
  neonConfig.webSocketConstructor = ws;
  const connectionString = process.env.DATABASE_URL;
  const adapter = new PrismaNeon({ connectionString });
  const prisma = new PrismaClient({ adapter });

  try {
    console.log("🔍 Checking database tables...");

    // Проверяем таблицу Achievement
    try {
      const achievementCount = await prisma.achievement.count();
      console.log(`✅ Achievement table exists (${achievementCount} records)`);
    } catch (e) {
      console.log("❌ Achievement table does NOT exist");
      console.error(e.message);
    }

    // Проверяем таблицу PlayerAchievement
    try {
      const playerAchievementCount = await prisma.playerAchievement.count();
      console.log(
        `✅ PlayerAchievement table exists (${playerAchievementCount} records)`,
      );
    } catch (e) {
      console.log("❌ PlayerAchievement table does NOT exist");
      console.error(e.message);
    }

    // Проверяем другие таблицы
    const userCount = await prisma.user.count();
    const roomCount = await prisma.room.count();
    const characterCount = await prisma.character.count();

    console.log(`\n📊 Database stats:`);
    console.log(`   Users: ${userCount}`);
    console.log(`   Rooms: ${roomCount}`);
    console.log(`   Characters: ${characterCount}`);
  } catch (error) {
    console.error("❌ Database check error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

checkDatabase();
