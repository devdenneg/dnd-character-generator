# ⚡ Быстрый деплой на Beget VPS

## 🎯 Что нужно:

1. **VPS на Beget** (от 810₽/мес)
   - Заказать: https://beget.com/ru/vps
   - ОС: Ubuntu 22.04 LTS
   - Минимум: 1 CPU, 1 GB RAM

2. **Доступ по SSH**
   - IP адрес сервера
   - Root пароль (из email)

---

## 🚀 Деплой за 5 минут:

### Шаг 1: Подключитесь к серверу
```bash
ssh root@YOUR_IP
```

### Шаг 2: Запустите автоматическую установку
```bash
# Скачайте и запустите скрипт
curl -o setup.sh https://raw.githubusercontent.com/devdenneg/dnd-character-generator/main/deploy/setup-server.sh
chmod +x setup.sh
bash setup.sh
```

### Шаг 3: Клонируйте и разверните проект
```bash
cd /var/www
git clone https://github.com/devdenneg/dnd-character-generator.git
cd dnd-character-generator
bash deploy/deploy.sh
```

### Шаг 4: ВАЖНО - Измените пароль БД
```bash
nano /var/www/dnd-character-generator/backend/.env
# Измените пароль в строках DATABASE_URL и DIRECT_URL
# Ctrl+X, Y, Enter для сохранения

pm2 restart dnd-backend
```

### Шаг 5: Готово! 🎉
Откройте в браузере: **http://YOUR_IP**

---

## 🔄 Как обновить приложение:

```bash
cd /var/www/dnd-character-generator
bash deploy/update.sh
```

---

## 🛠️ Полезные команды:

```bash
# Статус backend
pm2 status

# Логи backend
pm2 logs dnd-backend

# Перезапуск
pm2 restart dnd-backend

# Статус Nginx
systemctl status nginx
```

---

## 📚 Подробная документация:

- [Полная инструкция по деплою](DEPLOY_BEGET.md)
- [Скрипты деплоя](deploy/README.md)

---

## 💰 Стоимость:

**810₽/месяц** - всё включено!
- VPS сервер
- Node.js + PostgreSQL
- Nginx
- Безлимитный трафик

---

## 🆘 Проблемы?

1. **Backend не запускается:**
   ```bash
   pm2 logs dnd-backend
   ```

2. **502 Bad Gateway:**
   ```bash
   pm2 restart dnd-backend
   systemctl restart nginx
   ```

3. **Не подключается к БД:**
   - Проверьте пароль в `/var/www/dnd-character-generator/backend/.env`
   - Убедитесь что PostgreSQL запущен: `systemctl status postgresql`

4. **Другие проблемы:**
   - Читайте [DEPLOY_BEGET.md](DEPLOY_BEGET.md)
   - Создайте [Issue на GitHub](https://github.com/devdenneg/dnd-character-generator/issues)
