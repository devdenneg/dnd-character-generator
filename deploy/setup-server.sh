#!/bin/bash
# Скрипт автоматической настройки сервера на Beget VPS
# Запустите на свежей Ubuntu 22.04 от root

set -e  # Остановка при ошибке

echo "🚀 Начинаю настройку сервера для D&D Generator..."

# Цвета для вывода
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Функция для вывода сообщений
log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Проверка что запущено от root
if [ "$EUID" -ne 0 ]; then 
    log_error "Запустите скрипт от root: sudo bash setup-server.sh"
    exit 1
fi

# 1. Обновление системы
log_info "Обновление системы..."
apt update && apt upgrade -y

# 2. Установка Node.js 20.x
log_info "Установка Node.js 20.x..."
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# 3. Установка PostgreSQL 14
log_info "Установка PostgreSQL 14..."
apt install -y postgresql postgresql-contrib

# 4. Установка Nginx
log_info "Установка Nginx..."
apt install -y nginx

# 5. Установка PM2
log_info "Установка PM2..."
npm install -g pm2

# 6. Установка Git
log_info "Установка Git..."
apt install -y git

# 7. Настройка PostgreSQL
log_info "Настройка PostgreSQL..."
sudo -u postgres psql << EOF
CREATE DATABASE dnd_generator;
CREATE USER dnduser WITH PASSWORD 'Change_This_Password_123!';
GRANT ALL PRIVILEGES ON DATABASE dnd_generator TO dnduser;
ALTER DATABASE dnd_generator OWNER TO dnduser;
\q
EOF

# 8. Настройка firewall
log_info "Настройка firewall..."
ufw --force enable
ufw allow 22/tcp
ufw allow 80/tcp
ufw allow 443/tcp

# 9. Создание директории проекта
log_info "Создание директории проекта..."
mkdir -p /var/www

log_info "✅ Базовая настройка сервера завершена!"
echo ""
log_warn "Следующие шаги:"
echo "1. Измените пароль PostgreSQL в /var/www/dnd-character-generator/backend/.env"
echo "2. Клонируйте проект: cd /var/www && git clone https://github.com/devdenneg/dnd-character-generator.git"
echo "3. Следуйте инструкциям в DEPLOY_BEGET.md"
echo ""
log_info "Проверка установленных версий:"
echo "Node.js: $(node --version)"
echo "npm: $(npm --version)"
echo "PostgreSQL: $(psql --version | head -n1)"
echo "Nginx: $(nginx -v 2>&1)"
echo "PM2: $(pm2 --version)"
