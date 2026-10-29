# Подготовка Vercel Preview — 29 октября 2026

> Обновление: владелец добавил Preview EVENTS_DATABASE_URL, наличие и приоритет подтверждены новой выгрузкой. Добавлен обязательный read-only Branch ID guard при запуске Preview. Актуальные результаты и действия: [готовность защищённого Preview](events-preview-startup-readiness.md). Ниже сохранена инструкция предыдущего этапа; повторно создавать уже существующую переменную не требуется. Deployment по-прежнему не выполнялся.

**Статус: deployment запрещён до подтверждения удалённой конфигурации и отдельного разрешения владельца.**

## Проверено в Vercel

Preview-переменные получены CLI 65.7.0 в новый приватный временный файл. Все сообщения CLI подавлены; файл удалён после проверки. Локальный `.env.events.preview.local` не перезаписывался. Production-переменные не запрашивались и не менялись. Remote env не изменялись.

Выбранная календарём переменная — `NEON_DATABASE_URL`. Она и остальные четыре доступных строки подключения скрыты при выгрузке как `[SENSITIVE]`. Поэтому **не установлено**, ведёт ли текущая Vercel Preview-конфигурация в main или preview. Совпадение названия переменной и наличие локально проверенного файла этого не доказывают. Отчёт: `events-vercel-preview-check.json`.

## Реальный порядок выбора

1. `EVENTS_DATABASE_URL`.
2. `NEON_DATABASE_URL`.
3. `NEON_POSTGRES_URL`.
4. `NEON_DATABASE_URL_UNPOOLED`.
5. `NEON_POSTGRES_URL_NON_POOLING`.

`DATABASE_URL`/`POSTGRES_URL` используются календарём только при явном `EVENTS_ALLOW_SHARED_DATABASE=true`; в выгрузке этот флаг отсутствует. `NEON_PG*`, отдельные пользователь/пароль/host, `NEON_PROJECT_ID`, `NEON_POSTGRES_PRISMA_URL` и `NEON_POSTGRES_URL_NO_SSL` календарь не собирает в строку подключения и не использует.

Квартиры/занятость и видео выбирают свои `AVAILABILITY_DATABASE_URL`/`CITY_VIDEOS_DATABASE_URL`, затем существующие `DATABASE_URL`/`POSTGRES_URL`. Переход на Neon возможен только при `LEGACY_USE_NEON_DATABASE=true`; в выгрузке этот флаг отсутствует. `EVENTS_DATABASE_URL` они не используют. Подтверждено кодом и регрессионными тестами; текущие функции квартир не проверялись записью в их удалённую базу.

## Безопасное переключение только календаря

Не нужно менять управляемые интеграцией `NEON_*` и общую `DATABASE_URL` ради календаря.

1. В Neon Console открыть нужный проект → Branches → **preview**. Сверить ID **br-wild-band-b9c3gc4d**, выбрать существующую базу и роль, получить pooled PostgreSQL connection string. Не брать соединение main. Уже проверенный локальный файл относится к этой ветке.
2. В Vercel открыть существующий проект **rentplacemd** → Settings → Environment Variables → Add Environment Variable.
3. Создать **EVENTS_DATABASE_URL**, вставить строку соединения из Neon. Выбрать **только Preview**. Production и Development не выбирать. Оставить значение секретным/Sensitive; не делать его публичным и не применять префикс NEXT_PUBLIC_. Не передавать URL в команде терминала или чат.
4. Проверить, что для предполагаемой Git-ветки нет отдельного `EVENTS_DATABASE_URL`, переопределяющего общую Preview-запись. Если такие настройки существуют, сверить их в кабинете и привести к той же preview-ветке. Проверка общей выгрузки не подтверждает отдельные Git-ветки или динамические подстановки интеграции.
5. Только в Preview установить обычные несекретные флаги `EVENTS_ALLOW_SHARED_DATABASE=false` и `LEGACY_USE_NEON_DATABASE=false`. Не менять `DATABASE_URL`, `POSTGRES_URL`, `AVAILABILITY_DATABASE_URL`, `CITY_VIDEOS_DATABASE_URL`, а также Production-настройки.
6. Если в Preview уже есть `EVENTS_MIGRATION_DATABASE_URL`, она тоже должна относиться к той же ветке либо не использоваться до проверки. Для deployment миграции не нужны и не запускаются. Различные оставшиеся NEON-соединения не следует использовать для будущей миграции без отдельной проверки.
7. В кабинете проверить Preview deployment protection (Vercel Authentication) и правильную команду/проект. Автоматическое создание Neon-веток интеграцией не считать доказательством подключения к фиксированной разрешённой ветке.

При Sensitive-значениях CLI не может независимо прочитать URL. Не отключать защиту ради проверки. Владельцу нужно подтвердить, что в поле **Preview EVENTS_DATABASE_URL** вставлена именно строка из проверенной ветки, включая отсутствие Git-specific overrides. Если этого подтвердить нельзя, deployment не выполнять. Самостоятельное создание override по этим шагам — требуемое действие владельца, в текущем проходе оно не выполнялось.

## Повторные проверки без публикации

```powershell
powershell -NoProfile -File scripts/inspect-vercel-preview.ps1
node scripts/run-events-preview.mjs check --expected-branch-id=br-wild-band-b9c3gc4d
node --test tests/eventDatabase.test.mjs tests/previewEventsEnv.test.mjs
npm run lint
```

Первая команда проверяет удалённые Preview-переменные. При Sensitive продолжит сообщать `remote-connection-unverifiable`; это не подтверждение ветки и не разрешение deployment. Вторая проверяет только локальную уже подтверждённую ветку, а не Vercel. Если выбранная удалённая строка доступна CLI, инспектор делает только SELECT и сравнивает SQL Branch ID. При несовпадении или ошибке запрещает продолжение.

## Deployment после отдельного разрешения

Команда подготовлена, **не выполнена**. Запускать только после проверки scope, подтверждения override владельцем и отдельного разрешения на Preview deployment:

```powershell
npx --yes vercel@65.7.0 deploy --environment=preview --project=rentplacemd --yes
```

Если проект принадлежит определённой команде, добавить `--scope` с её подтверждённым slug. Не добавлять `--prod`, `--prebuilt`, `--env`, `--build-env`, `--verify` и не выполнять git push. Обычная удалённая сборка нужна, чтобы локальная `.next` с иными переменными не стала артефактом deployment. `.vercelignore` исключает `.env*`, `.git/`, `.vercel/` и локальные служебные каталоги. Миграций в build-скрипте нет.

После разрешённого deployment: открыть защищённый Preview, проверить пять языков `/events`, октябрь/ноябрь/декабрь/январь, sitemap и canonical. Авторизованную проверку состояния базы выполнить через `/api/admin/events/health`; текущий endpoint подтверждает схему, но не возвращает Branch ID. Проверка на Preview с тестовыми изменениями — отдельный разрешённый этап. Пока никаких удалённых записей календаря не делать. Cron в Preview не считать действующим Production-расписанием; секрет Production не копировать. Подтверждённого разрешённого источника событий по-прежнему нет — режим ручного импорта.

## Изменения именно этого этапа

- `scripts/inspect-vercel-preview.ps1` — приватная временная выгрузка только Preview, подавление CLI-вывода, проверка ACL, очистка файла.
- `scripts/inspect-vercel-preview-env.mjs` — анализ приоритетов/флагов, безопасный отчёт, SELECT-проверка Branch ID при доступности значения; никаких env-мутаций или deployment.
- `docs/events-vercel-preview-check.json` — результат фактической инспекции.
- Этот документ и ссылка на актуальный статус в старом runbook.

Код приложения, DATABASE_URL, Vercel-переменные, SQL-схема и данные этим этапом не изменены. Git push, dry-run deployment, Preview и Production deployment не выполнялись.

Официальная документация: [environment variables](https://vercel.com/docs/environment-variables), [секретные переменные](https://vercel.com/docs/environment-variables/sensitive-environment-variables), [vercel deploy](https://vercel.com/docs/cli/deploy).
