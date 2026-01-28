#!/usr/bin/env node
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Получаем имя миграции из аргументов
const migrationName = process.argv[2];

if (!migrationName) {
  console.error('❌ Укажите имя миграции: npm run migration:generate <name>');
  console.error('   Пример: npm run migration:generate add_rooms_feature');
  process.exit(1);
}

const migrationsDir = path.join(__dirname, '../prisma/migrations');
const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('T')[0];
const migrationFileName = `${timestamp}_${migrationName}.sql`;
const migrationPath = path.join(migrationsDir, migrationFileName);

console.log('🔄 Генерирую SQL миграцию из Prisma схемы...\n');

try {
  // Создаём папку migrations если её нет
  if (!fs.existsSync(migrationsDir)) {
    fs.mkdirSync(migrationsDir, { recursive: true });
  }

  // Генерируем полную миграцию (все таблицы)
  console.log('📝 Генерирую полную миграцию...');
  const fullMigrationPath = path.join(migrationsDir, 'full_schema.sql');
  execSync(
    `npx prisma migrate diff --from-empty --to-schema-datamodel prisma/schema.prisma --script > ${fullMigrationPath}`,
    { cwd: path.join(__dirname, '..'), stdio: 'inherit' }
  );

  console.log(`✅ Полная миграция сохранена: prisma/migrations/full_schema.sql`);
  console.log('');
  console.log('📋 ВАЖНО:');
  console.log('   1. Откройте файл full_schema.sql');
  console.log('   2. Скопируйте ТОЛЬКО новые таблицы/изменения');
  console.log(`   3. Создайте файл ${migrationFileName} с нужными изменениями`);
  console.log('   4. Примените миграцию на проде через Neon Dashboard или Render Shell');
  console.log('');
  console.log('🔗 Neon Dashboard: https://console.neon.tech');
  console.log('🔗 Render Dashboard: https://dashboard.render.com');

} catch (error) {
  console.error('❌ Ошибка при генерации миграции:', error.message);
  process.exit(1);
}
