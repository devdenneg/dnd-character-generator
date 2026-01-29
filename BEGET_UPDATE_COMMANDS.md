# Команды для обновления на Beget VPS

## Шаг 1: Подключитесь к серверу

В вашем терминале выполните:

```bash
ssh root@155.212.209.24
```

Пароль: `dftTjv&Y5t1U`

## Шаг 2: Скопируйте и выполните эти команды на сервере

```bash
cd /var/www/dnd-character-generator

echo "📥 Pulling latest changes..."
git pull origin main

echo "🔧 Updating Backend..."
cd backend
npm install
npx prisma generate
npm run build

echo "📊 Applying achievement migrations..."
sudo -u postgres psql -d dnd_generator -f prisma/migrations/2025-01-29_add_achievements_tables.sql 2>/dev/null || echo "Achievement tables already exist"
sudo -u postgres psql -d dnd_generator -f prisma/migrations/2025-01-29_add_character_to_player_achievement/migration.sql 2>/dev/null || echo "characterId already exists"

echo "🎨 Updating Frontend..."
cd ..
npm install
npm run build

echo "♻️ Restarting services..."
pm2 restart dnd-backend
systemctl reload nginx

echo "✅ Deployment completed!"
pm2 status
```

## Шаг 3: Проверка

После выполнения проверьте:

```bash
# Статус backend
pm2 logs dnd-backend --lines 20

# Проверка таблиц achievements
sudo -u postgres psql -d dnd_generator -c "SELECT COUNT(*) FROM \"Achievement\";"
sudo -u postgres psql -d dnd_generator -c "\d PlayerAchievement"
```

Готово! Ачивки должны работать на https://devdenneg.github.io
