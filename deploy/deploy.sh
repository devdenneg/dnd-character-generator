#!/bin/bash
# Скрипт деплоя D&D Generator на сервер
# Запустите на сервере после клонирования проекта

set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Проверка что скрипт запущен из корня проекта
if [ ! -f "package.json" ]; then
    log_error "Запустите скрипт из корня проекта!"
    exit 1
fi

PROJECT_DIR=$(pwd)
BACKEND_DIR="$PROJECT_DIR/backend"

log_info "🚀 Начинаю деплой D&D Generator..."

# 1. Получение IP адреса сервера
SERVER_IP=$(curl -s ifconfig.me)
log_info "IP сервера: $SERVER_IP"

# 2. Настройка Backend
log_info "Настройка Backend..."
cd "$BACKEND_DIR"

# Проверка .env
if [ ! -f ".env" ]; then
    log_warn "Файл .env не найден. Создаю из примера..."
    
    # Генерация случайного JWT секрета
    JWT_SECRET=$(openssl rand -hex 32)
    
    cat > .env << EOF
NODE_ENV=production
PORT=3001

# PostgreSQL
DATABASE_URL="postgresql://dnduser:Change_This_Password_123!@localhost:5432/dnd_generator?schema=public"
DIRECT_URL="postgresql://dnduser:Change_This_Password_123!@localhost:5432/dnd_generator?schema=public"

# JWT Secret
JWT_SECRET="$JWT_SECRET"
JWT_EXPIRES_IN=7d
EOF
    
    log_warn "⚠️  ВАЖНО: Измените пароль PostgreSQL в .env!"
fi

# Установка зависимостей
log_info "Установка зависимостей Backend..."
npm ci --production=false

# Prisma
log_info "Генерация Prisma Client..."
npx prisma generate

log_info "Применение схемы базы данных..."
npx prisma db push --accept-data-loss

# Применение миграций (если есть)
if [ -d "prisma/migrations" ]; then
    log_info "Применение SQL миграций..."
    for migration in prisma/migrations/*.sql; do
        if [ -f "$migration" ]; then
            log_info "Применяю миграцию: $(basename $migration)"
            sudo -u postgres psql -d dnd_generator -f "$migration" || log_warn "Миграция уже применена или ошибка"
        fi
    done
fi

# Сборка
log_info "Сборка Backend..."
npm run build

# 3. Настройка Frontend
log_info "Настройка Frontend..."
cd "$PROJECT_DIR"

# Создание .env.production
cat > .env.production << EOF
VITE_API_URL=http://$SERVER_IP:3001/api
VITE_SOCKET_URL=http://$SERVER_IP:3001
EOF

log_info "Установка зависимостей Frontend..."
npm ci

log_info "Сборка Frontend..."
npm run build

# 4. Настройка PM2
log_info "Настройка PM2..."
cd "$BACKEND_DIR"

# Остановка если уже запущен
pm2 stop dnd-backend 2>/dev/null || true
pm2 delete dnd-backend 2>/dev/null || true

# Запуск
pm2 start npm --name "dnd-backend" -- start
pm2 save

log_info "Настройка автозапуска PM2..."
pm2 startup | grep "sudo" | bash || true

# 5. Настройка Nginx
log_info "Настройка Nginx..."

NGINX_CONF="/etc/nginx/sites-available/dnd-generator"
sudo bash -c "cat > $NGINX_CONF" << EOF
server {
    listen 80;
    server_name $SERVER_IP;

    # Увеличение лимитов
    client_max_body_size 10M;

    # Frontend
    location / {
        root $PROJECT_DIR/dist;
        try_files \$uri \$uri/ /index.html;
        
        # Кэширование статики
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }

    # Backend API
    location /api/ {
        proxy_pass http://localhost:3001/api/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_cache_bypass \$http_upgrade;
    }

    # Socket.IO
    location /socket.io/ {
        proxy_pass http://localhost:3001/socket.io/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
    }

    # Gzip сжатие
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
EOF

# Активация конфигурации
sudo ln -sf $NGINX_CONF /etc/nginx/sites-enabled/dnd-generator
sudo rm -f /etc/nginx/sites-enabled/default

# Проверка конфигурации
log_info "Проверка конфигурации Nginx..."
sudo nginx -t

# Перезапуск Nginx
log_info "Перезапуск Nginx..."
sudo systemctl restart nginx

# 6. Финальная проверка
log_info "Проверка статуса сервисов..."
echo ""
echo "PM2 статус:"
pm2 status

echo ""
echo "Nginx статус:"
sudo systemctl status nginx --no-pager | head -n 5

echo ""
log_info "✅ Деплой завершен успешно!"
echo ""
log_info "🌐 Ваше приложение доступно по адресу: http://$SERVER_IP"
echo ""
log_warn "Следующие шаги:"
echo "1. Проверьте работу приложения в браузере"
echo "2. Измените пароль PostgreSQL в $BACKEND_DIR/.env"
echo "3. Настройте домен (опционально)"
echo "4. Установите SSL сертификат (опционально)"
echo ""
log_info "Полезные команды:"
echo "  pm2 logs dnd-backend          - логи backend"
echo "  pm2 restart dnd-backend       - перезапуск backend"
echo "  sudo systemctl status nginx   - статус nginx"
echo "  /var/www/update.sh           - обновление проекта"
