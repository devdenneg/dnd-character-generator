# 🚀 Деплой на Beget VPS

## Шаг 1: Заказ и настройка VPS

1. **Зарегистрируйтесь на [beget.com](https://beget.com/ru/vps)**
2. **Закажите VPS:**
   - Минимум: 1 CPU, 1 GB RAM, 20 GB SSD (810₽/мес)
   - Операционная система: **Ubuntu 22.04 LTS**
3. **Получите доступы:**
   - IP-адрес сервера
   - Root пароль (придет на email)

## Шаг 2: Подключение к серверу

```bash
# Подключитесь по SSH (замените YOUR_IP на ваш IP)
ssh root@YOUR_IP
```

## Шаг 3: Установка необходимого ПО

Скопируйте и выполните этот скрипт на сервере:

```bash
# Обновление системы
apt update && apt upgrade -y

# Установка Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# Установка PostgreSQL 14
apt install -y postgresql postgresql-contrib

# Установка Nginx
apt install -y nginx

# Установка PM2 (менеджер процессов)
npm install -g pm2

# Установка Git
apt install -y git

# Проверка установки
node --version  # должно быть v20.x
npm --version
psql --version
nginx -v
```

## Шаг 4: Настройка PostgreSQL

```bash
# Переключитесь на пользователя postgres
sudo -u postgres psql

# В консоли PostgreSQL выполните:
CREATE DATABASE dnd_generator;
CREATE USER dnduser WITH PASSWORD 'your_secure_password_here';
GRANT ALL PRIVILEGES ON DATABASE dnd_generator TO dnduser;
\q

# Разрешите внешние подключения (если нужно)
echo "host all all 0.0.0.0/0 md5" >> /etc/postgresql/14/main/pg_hba.conf
systemctl restart postgresql
```

## Шаг 5: Клонирование проекта

```bash
# Создайте директорию для проекта
mkdir -p /var/www
cd /var/www

# Клонируйте репозиторий
git clone https://github.com/devdenneg/dnd-character-generator.git
cd dnd-character-generator
```

## Шаг 6: Настройка Backend

```bash
cd /var/www/dnd-character-generator/backend

# Создайте .env файл
cat > .env << 'EOF'
NODE_ENV=production
PORT=3001

# PostgreSQL
DATABASE_URL="postgresql://dnduser:your_secure_password_here@localhost:5432/dnd_generator?schema=public"
DIRECT_URL="postgresql://dnduser:your_secure_password_here@localhost:5432/dnd_generator?schema=public"

# JWT Secret (сгенерируйте случайную строку)
JWT_SECRET="your_super_secret_jwt_key_change_this_to_random_string"
JWT_EXPIRES_IN=7d
EOF

# Установите зависимости
npm install

# Выполните миграции базы данных
npx prisma generate
npx prisma db push

# Примените SQL миграции
psql -U dnduser -d dnd_generator -f backend/prisma/migrations/2025-01-28_add_character_to_room_player.sql
psql -U dnduser -d dnd_generator -f backend/prisma/migrations/2025-01-28_add_is_started_field.sql

# Соберите проект
npm run build
```

## Шаг 7: Настройка Frontend

```bash
cd /var/www/dnd-character-generator

# Создайте .env.production (укажите IP вашего VPS)
cat > .env.production << 'EOF'
VITE_API_URL=http://YOUR_VPS_IP:3001/api
VITE_SOCKET_URL=http://YOUR_VPS_IP:3001
EOF

# Установите зависимости и соберите
npm install
npm run build
```

## Шаг 8: Настройка PM2

```bash
cd /var/www/dnd-character-generator/backend

# Запустите backend через PM2
pm2 start npm --name "dnd-backend" -- start

# Добавьте PM2 в автозагрузку
pm2 startup
pm2 save

# Проверьте статус
pm2 status
pm2 logs dnd-backend
```

## Шаг 9: Настройка Nginx

```bash
# Создайте конфигурацию Nginx
cat > /etc/nginx/sites-available/dnd-generator << 'EOF'
server {
    listen 80;
    server_name YOUR_VPS_IP;

    # Frontend
    location / {
        root /var/www/dnd-character-generator/dist;
        try_files $uri $uri/ /index.html;
        
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
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_cache_bypass $http_upgrade;
    }

    # Socket.IO
    location /socket.io/ {
        proxy_pass http://localhost:3001/socket.io/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    # Увеличение лимитов
    client_max_body_size 10M;
}
EOF

# Активируйте конфигурацию
ln -s /etc/nginx/sites-available/dnd-generator /etc/nginx/sites-enabled/
rm /etc/nginx/sites-enabled/default

# Проверьте конфигурацию
nginx -t

# Перезапустите Nginx
systemctl restart nginx
```

## Шаг 10: Настройка Firewall

```bash
# Разрешите необходимые порты
ufw allow 22/tcp     # SSH
ufw allow 80/tcp     # HTTP
ufw allow 443/tcp    # HTTPS (для будущего SSL)
ufw enable
```

## Шаг 11: Проверка работы

Откройте в браузере: `http://YOUR_VPS_IP`

Проверьте:
- ✅ Фронтенд загружается
- ✅ Регистрация работает
- ✅ Создание персонажа работает
- ✅ Комнаты создаются

## 🔄 Обновление проекта

Создайте скрипт для быстрого обновления:

```bash
cat > /var/www/update.sh << 'EOF'
#!/bin/bash
cd /var/www/dnd-character-generator

# Остановка backend
pm2 stop dnd-backend

# Обновление кода
git pull origin main

# Backend
cd backend
npm install
npm run build

# Frontend
cd ..
npm install
npm run build

# Перезапуск
pm2 restart dnd-backend
systemctl reload nginx

echo "✅ Обновление завершено!"
EOF

chmod +x /var/www/update.sh

# Для обновления просто запустите:
# /var/www/update.sh
```

## 📊 Мониторинг

```bash
# Логи backend
pm2 logs dnd-backend

# Логи Nginx
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log

# Статус базы данных
sudo -u postgres psql -d dnd_generator -c "SELECT count(*) FROM \"User\";"
```

## 🔒 Безопасность (рекомендуется)

1. **Смените root пароль:**
   ```bash
   passwd
   ```

2. **Создайте нового пользователя:**
   ```bash
   adduser deploy
   usermod -aG sudo deploy
   ```

3. **Настройте SSH ключи** вместо паролей

4. **Установите SSL сертификат** (Let's Encrypt - бесплатно)

## 🆘 Решение проблем

### Backend не запускается
```bash
pm2 logs dnd-backend --lines 50
```

### База данных не подключается
```bash
sudo -u postgres psql -d dnd_generator
\dt  # список таблиц
```

### Nginx не работает
```bash
nginx -t
systemctl status nginx
```

### Порт занят
```bash
lsof -i :3001
kill -9 PID
```

## 💰 Стоимость

- VPS Beget: **810₽/месяц** (1 CPU, 1 GB RAM)
- База данных PostgreSQL: **включена**
- Nginx: **бесплатно**
- PM2: **бесплатно**

**Итого: 810₽/месяц** 🎉
