# RentPlaceMD

Next.js сайт RentPlaceMD для квартир посуточно в Кишинёве.

## Development

```bash
npm install
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000).

## Admin Calendar Storage

Админка календаря находится на `/admin/availability`.

Для доступа администратора в Vercel добавьте:

- `ADMIN_PASSWORD` - пароль входа в админку.
- `ADMIN_SESSION_SECRET` - длинная случайная строка для cookie-сессии.

### Вариант 1: Neon PostgreSQL (рекомендуется)

1. Создайте бесплатный проект на Neon.
2. Скопируйте connection string вида `postgresql://...`.
3. В Vercel добавьте переменную:
   - `DATABASE_URL` = Neon connection string.
4. Сделайте redeploy.

Таблица создаётся автоматически при первом обращении к календарю:

```sql
CREATE TABLE IF NOT EXISTS availability_booked_dates (
  apartment_id text NOT NULL,
  booked_date date NOT NULL,
  source text NOT NULL DEFAULT 'manual',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (apartment_id, booked_date)
);
```

### Вариант 2: Supabase

1. Создайте бесплатный проект Supabase.
2. В SQL Editor выполните:

```sql
CREATE TABLE IF NOT EXISTS availability_booked_dates (
  apartment_id text NOT NULL,
  booked_date date NOT NULL,
  source text NOT NULL DEFAULT 'manual',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (apartment_id, booked_date)
);
```

3. В Vercel добавьте:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
4. Сделайте redeploy.

Если одновременно задан `DATABASE_URL` и Supabase-переменные, сайт использует Neon/PostgreSQL.

Локально, если база не настроена, календарь сохраняет даты в `data/availability.json`.

## Deploy

После изменения переменных окружения в Vercel обязательно сделайте redeploy.
