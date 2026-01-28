#!/bin/bash
# Скрипт быстрого обновления приложения на сервере
# Использование: bash update.sh

set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

# Проверка что скрипт запущен из корня проекта
if [ ! -f "package.json" ]; then
    echo "Запустите скрипт из корня проекта!"
    exit 1
fi

PROJECT_DIR=$(pwd)
BACKEND_DIR="$PROJECT_DIR/backend"

log_info "🔄 Начинаю обновление D&D Generator..."

# 1. Остановка backend
log_info "Остановка backend..."
pm2 stop dnd-backend || true

# 2. Получение обновлений
log_info "Получение обновлений из Git..."
git pull origin main

# 3. Backend
log_info "Обновление Backend..."
cd "$BACKEND_DIR"

# Установка зависимостей
npm ci --production=false

# Prisma
npx prisma generate
npx prisma db push --accept-data-loss

# Применение новых миграций
if [ -d "prisma/migrations" ]; then
    for migration in prisma/migrations/*.sql; do
        if [ -f "$migration" ]; then
            log_info "Применяю миграцию: $(basename $migration)"
            sudo -u postgres psql -d dnd_generator -f "$migration" 2>/dev/null || log_warn "Миграция уже применена"
        fi
    done
fi

# Сборка
npm run build

# 4. Frontend
log_info "Обновление Frontend..."
cd "$PROJECT_DIR"

# Получение IP сервера для .env.production
SERVER_IP=$(curl -s ifconfig.me)
cat > .env.production << EOF
VITE_API_URL=http://$SERVER_IP:3001/api
VITE_SOCKET_URL=http://$SERVER_IP:3001
EOF

npm ci
npm run build

# 5. Перезапуск сервисов
log_info "Перезапуск Backend..."
pm2 restart dnd-backend

log_info "Перезагрузка Nginx..."
sudo systemctl reload nginx

# 6. Очистка
log_info "Очистка старых логов PM2..."
pm2 flush

log_info "✅ Обновление завершено!"
echo ""
log_info "Статус сервисов:"
pm2 status
echo ""
log_info "Последние 20 строк логов:"
pm2 logs dnd-backend --lines 20 --nostream
