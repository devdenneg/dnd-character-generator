#!/bin/bash

# Цвета для вывода
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Обновление DND Generator на Beget VPS${NC}"

# Проверяем, что мы на сервере
if [ ! -d "/var/www/dnd-character-generator" ]; then
    echo -e "${RED}❌ Ошибка: Директория /var/www/dnd-character-generator не найдена${NC}"
    echo "Убедитесь, что проект установлен согласно DEPLOY_BEGET.md"
    exit 1
fi

cd /var/www/dnd-character-generator

echo -e "${YELLOW}📥 Получение последних изменений...${NC}"
git pull origin main

echo -e "${YELLOW}🔧 Обновление Backend...${NC}"
cd backend

# Установка зависимостей
npm install

# Генерация Prisma клиента
echo -e "${YELLOW}📦 Генерация Prisma клиента...${NC}"
npx prisma generate

# Применение миграций для achievements
echo -e "${YELLOW}🗄️ Применение миграций achievements...${NC}"
if [ -f "prisma/migrations/2025-01-29_add_achievements_tables.sql" ]; then
    sudo -u postgres psql -d dnd_generator -f prisma/migrations/2025-01-29_add_achievements_tables.sql 2>/dev/null || echo "Таблицы achievements уже существуют"
fi

if [ -f "prisma/migrations/2025-01-29_add_character_to_player_achievement/migration.sql" ]; then
    sudo -u postgres psql -d dnd_generator -f prisma/migrations/2025-01-29_add_character_to_player_achievement/migration.sql 2>/dev/null || echo "Поле characterId уже существует"
fi

# Сборка backend
echo -e "${YELLOW}🔨 Сборка Backend...${NC}"
npm run build

echo -e "${YELLOW}🎨 Обновление Frontend...${NC}"
cd ..

# Установка зависимостей frontend
npm install

# Сборка frontend
npm run build

echo -e "${YELLOW}♻️ Перезапуск сервисов...${NC}"

# Перезапуск backend через PM2
pm2 restart dnd-backend

# Перезапуск Nginx
systemctl reload nginx

echo -e "${GREEN}✅ Обновление завершено!${NC}"
echo ""
echo "Проверьте статус сервисов:"
echo "  pm2 logs dnd-backend"
echo "  pm2 status"
