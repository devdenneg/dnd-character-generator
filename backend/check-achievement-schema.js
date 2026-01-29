const { neonConfig } = require("@neondatabase/serverless");
const ws = require("ws");
const { Pool } = require("@neondatabase/serverless");
require("dotenv").config({ path: ".env.local" });

async function checkSchema() {
  neonConfig.webSocketConstructor = ws;
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });

  try {
    console.log("🔍 Checking Achievement table schema...\n");

    const result = await pool.query(`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns
      WHERE table_name = 'Achievement'
      ORDER BY ordinal_position;
    `);

    console.log("📊 Achievement columns:");
    result.rows.forEach((col) => {
      console.log(
        `   ${col.column_name}: ${col.data_type} ${col.is_nullable === "YES" ? "(nullable)" : ""}`,
      );
    });
  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    await pool.end();
  }
}

checkSchema();
