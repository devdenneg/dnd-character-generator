# 📦 Скрипты для деплоя на Beget VPS

Эта директория содержит скрипты для автоматизации деплоя D&D Generator на Beget VPS.

## 🚀 Быстрый старт

### 1. Подготовка сервера

После заказа VPS на Beget, подключитесь по SSH и выполните:

```bash
# Скачайте и запустите скрипт настройки
curl -o setup.sh https://raw.githubusercontent.com/devdenneg/dnd-character-generator/main/deploy/setup-server.sh
chmod +x setup.sh
sudo bash setup.sh
```

### 2. Клонирование и деплой проекта

```bash
# Клонируйте проект
cd /var/www
git clone https://github.com/devdenneg/dnd-character-generator.git
cd dnd-character-generator

# Запустите деплой
chmod +x deploy/deploy.sh
bash deploy/deploy.sh
```

### 3. Настройка после деплоя

1. **Измените пароль базы данных:**
   ```bash
   nano /var/www/dnd-character-generator/backend/.env
   # Измените пароль в DATABASE_URL и DIRECT_URL
   ```

2. **Перезапустите backend:**
   ```bash
   pm2 restart dnd-backend
   ```

3. **Откройте в браузере:**
   ```
   http://ВАШ_IP_АДРЕС
   ```

## 🔄 Обновление приложения

Для обновления приложения до последней версии:

```bash
cd /var/www/dnd-character-generator
bash deploy/update.sh
```

Или создайте глобальный скрипт:

```bash
# Создайте алиас для быстрого обновления
echo 'alias dnd-update="cd /var/www/dnd-character-generator && bash deploy/update.sh"' >> ~/.bashrc
source ~/.bashrc

# Теперь для обновления просто выполните:
dnd-update
```

## 📋 Скрипты

- **setup-server.sh** - Установка всего необходимого ПО на чистый Ubuntu
- **deploy.sh** - Первичный деплой приложения
- **update.sh** - Быстрое обновление до последней версии

## 🛠️ Полезные команды

### PM2 (управление backend)
```bash
pm2 status                  # Статус всех процессов
pm2 logs dnd-backend       # Просмотр логов
pm2 restart dnd-backend    # Перезапуск
pm2 stop dnd-backend       # Остановка
pm2 monit                  # Мониторинг в реальном времени
```

### Nginx
```bash
sudo systemctl status nginx   # Статус
sudo systemctl restart nginx  # Перезапуск
sudo nginx -t                 # Проверка конфигурации
sudo tail -f /var/log/nginx/error.log  # Логи ошибок
```

### PostgreSQL
```bash
sudo -u postgres psql -d dnd_generator  # Подключение к БД
sudo systemctl status postgresql        # Статус
```

### Мониторинг
```bash
htop              # Мониторинг ресурсов
df -h             # Свободное место на диске
free -h           # Использование памяти
```

## 🔒 Безопасность

После деплоя рекомендуется:

1. **Смените root пароль:**
   ```bash
   passwd
   ```

2. **Создайте отдельного пользователя:**
   ```bash
   adduser deploy
   usermod -aG sudo deploy
   ```

3. **Настройте SSH-ключи** вместо паролей

4. **Установите Fail2Ban:**
   ```bash
   apt install fail2ban
   systemctl enable fail2ban
   ```

5. **Настройте автообновления:**
   ```bash
   apt install unattended-upgrades
   dpkg-reconfigure -plow unattended-upgrades
   ```

## 🌐 Настройка домена (опционально)

Если у вас есть домен, настройте его:

1. **Добавьте A-запись** в DNS вашего домена:
   ```
   @ -> ВАШ_IP_АДРЕС
   www -> ВАШ_IP_АДРЕС
   ```

2. **Обновите конфигурацию Nginx:**
   ```bash
   sudo nano /etc/nginx/sites-available/dnd-generator
   # Измените server_name на ваш домен
   server_name example.com www.example.com;
   ```

3. **Установите SSL сертификат:**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d example.com -d www.example.com
   ```

4. **Обновите .env.production:**
   ```bash
   cd /var/www/dnd-character-generator
   nano .env.production
   # Измените URL на https://example.com
   ```

5. **Пересоберите frontend и перезапустите:**
   ```bash
   npm run build
   pm2 restart dnd-backend
   sudo systemctl reload nginx
   ```

## 📊 Мониторинг и логи

### Просмотр логов backend
```bash
# В реальном времени
pm2 logs dnd-backend

# Последние 100 строк
pm2 logs dnd-backend --lines 100

# Только ошибки
pm2 logs dnd-backend --err
```

### Логи Nginx
```bash
# Логи доступа
sudo tail -f /var/log/nginx/access.log

# Логи ошибок
sudo tail -f /var/log/nginx/error.log
```

### Логи PostgreSQL
```bash
sudo tail -f /var/log/postgresql/postgresql-14-main.log
```

## 🆘 Решение проблем

### Backend не запускается
```bash
# Проверьте логи
pm2 logs dnd-backend --lines 50

# Проверьте порт
lsof -i :3001

# Проверьте .env файл
cat /var/www/dnd-character-generator/backend/.env
```

### База данных не подключается
```bash
# Проверьте что PostgreSQL запущен
sudo systemctl status postgresql

# Попробуйте подключиться вручную
sudo -u postgres psql -d dnd_generator

# Проверьте пароль в .env
```

### Nginx показывает 502 Bad Gateway
```bash
# Проверьте что backend запущен
pm2 status

# Проверьте логи Nginx
sudo tail -f /var/log/nginx/error.log

# Перезапустите сервисы
pm2 restart dnd-backend
sudo systemctl restart nginx
```

### Не хватает места на диске
```bash
# Проверьте использование
df -h

# Очистите логи PM2
pm2 flush

# Очистите старые логи системы
sudo journalctl --vacuum-time=7d

# Очистите кэш npm
npm cache clean --force
```

## 💾 Резервное копирование

Создайте скрипт для бэкапа базы данных:

```bash
cat > /var/www/backup.sh << 'EOF'
#!/bin/bash
BACKUP_DIR="/var/backups/dnd-generator"
DATE=$(date +%Y%m%d_%H%M%S)
mkdir -p $BACKUP_DIR

# Бэкап базы данных
sudo -u postgres pg_dump dnd_generator > $BACKUP_DIR/db_$DATE.sql

# Удаление старых бэкапов (старше 7 дней)
find $BACKUP_DIR -name "db_*.sql" -mtime +7 -delete

echo "Бэкап создан: $BACKUP_DIR/db_$DATE.sql"
EOF

chmod +x /var/www/backup.sh

# Добавьте в cron для автоматического бэкапа
crontab -e
# Добавьте строку (бэкап каждый день в 3:00):
# 0 3 * * * /var/www/backup.sh
```

## 📞 Поддержка

Если у вас возникли проблемы:

1. Проверьте логи (см. раздел "Мониторинг и логи")
2. Прочитайте раздел "Решение проблем"
3. Проверьте [Issues на GitHub](https://github.com/devdenneg/dnd-character-generator/issues)
4. Создайте новый Issue с описанием проблемы и логами
