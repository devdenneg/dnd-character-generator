# Настройка локальной PostgreSQL БД

## Быстрый старт

### 1. Запуск PostgreSQL в Docker

```bash
cd backend
docker-compose up -d
```

Это запустит PostgreSQL контейнер со следующими параметрами:
- **Хост**: localhost
- **Порт**: 5432
- **База данных**: dnd_generator
- **Пользователь**: postgres
- **Пароль**: postgres

### 2. Проверка подключения

```bash
docker-compose ps
```

Должен показать запущенный контейнер `dnd_postgres`.

### 3. Применить миграции Prisma

```bash
npm run prisma:generate
npx prisma migrate deploy
```

### 4. Импорт данных с прода

Вы можете импортировать данные с продакшн базы:

```bash
# Создать дамп с прода
pg_dump -h 155.212.209.24 -U dnduser -d dnd_generator -F c -f prod_dump.backup

# Восстановить в локальную БД
pg_restore -h localhost -U postgres -d dnd_generator -c prod_dump.backup
```

Или через SQL:

```bash
# Экспорт с прода
pg_dump -h 155.212.209.24 -U dnduser -d dnd_generator > prod_dump.sql

# Импорт в локальную БД
psql -h localhost -U postgres -d dnd_generator < prod_dump.sql
```

### 5. Запуск приложения

```bash
npm run dev
```

## Управление БД

### Остановить БД

```bash
docker-compose stop
```

### Запустить снова

```bash
docker-compose start
```

### Полностью удалить (включая данные)

```bash
docker-compose down -v
```

### Подключиться к БД через psql

```bash
docker exec -it dnd_postgres psql -U postgres -d dnd_generator
```

### Открыть Prisma Studio

```bash
npm run prisma:studio
```

## Что было изменено

1. ✅ Удалены зависимости NeonDB из `package.json`:
   - `@neondatabase/serverless`
   - `@prisma/adapter-neon`

2. ✅ Упрощен `src/db.ts` - убрана логика для Neon адаптера

3. ✅ Обновлен `.env` для локального подключения

4. ✅ Удален `directUrl` из `schema.prisma` (нужен только для NeonDB)

5. ✅ Создан `docker-compose.yml` для быстрого запуска PostgreSQL

## Переменные окружения

В `.env` настроено локальное подключение:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/dnd_generator"
```

Для подключения к проду просто замените на:

```env
DATABASE_URL="postgresql://dnduser:DnDSecure2026Pass@155.212.209.24:5432/dnd_generator?sslmode=disable"
```
