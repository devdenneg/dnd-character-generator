#!/bin/bash

# Параметры подключения к Beget VPS
BEGET_IP="155.212.209.24"
BEGET_USER="root"
DB_PASSWORD="DnDSecure2026Pass"

echo "🚀 Deploying to Beget VPS ($BEGET_IP)..."
echo ""
echo "Выполните следующие команды на сервере:"
echo "---------------------------------------------"

ssh ${BEGET_USER}@${BEGET_IP} << 'ENDSSH'
cd /var/www/dnd-character-generator

echo "📥 Pulling latest changes..."
git pull origin main

echo ""
echo "🔧 Updating Backend..."
cd backend
npm install
npx prisma generate
npm run build

echo ""
echo "📊 Applying achievement migrations..."
# Проверяем наличие таблиц Achievement
sudo -u postgres psql -d dnd_generator -c "\dt Achievement" 2>/dev/null || {
  echo "Creating Achievement table..."
  sudo -u postgres psql -d dnd_generator -f prisma/migrations/2025-01-29_add_achievements_tables.sql
}

# Проверяем наличие поля characterId в PlayerAchievement
sudo -u postgres psql -d dnd_generator -c "\d PlayerAchievement" | grep characterId || {
  echo "Adding characterId to PlayerAchievement..."
  sudo -u postgres psql -d dnd_generator -f prisma/migrations/2025-01-29_add_character_to_player_achievement/migration.sql
}

echo ""
echo "🎨 Updating Frontend..."
cd ..
npm install
npm run build

echo ""
echo "♻️ Restarting services..."
pm2 restart dnd-backend
systemctl reload nginx

echo ""
echo "✅ Deployment completed!"
echo ""
echo "📊 Checking status..."
pm2 status
sudo -u postgres psql -d dnd_generator -c "SELECT COUNT(*) as achievements FROM \"Achievement\";"

ENDSSH

echo ""
echo "✅ Done! Check logs with: ssh ${BEGET_USER}@${BEGET_IP} 'pm2 logs dnd-backend'"
