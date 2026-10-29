> Обновление проверки Neon: подключение только на чтение успешно; SQL Branch ID совпадает с подтверждённой владельцем Preview-веткой br-wild-band-b9c3gc4d. Событийные таблицы отсутствуют. Миграция и публикация не выполнялись. Актуальный результат — docs/events-neon-check.json и events-preview-runbook.md.

# RentPlaceMD — готовность изменений к публикации

Дата: 29 октября 2026 года. Публикация не выполнялась. Production-данные и настройки Vercel не изменялись.

## Что завершено

| Область | Подготовлено и проверено |
| --- | --- |
| Neon | Отдельный выбор NEON_* для событий, варианты pooled/unpooled, без перезаписи общей DATABASE_URL. Диагностика CLI и закрытый health endpoint работают только на чтение. |
| Другие базы | Видео и занятость сохраняют общие/явные подключения; новая Neon событий не подхватывается ими автоматически. Совместимость со старой NEON-only конфигурацией требует явного разрешения/отдельной переменной до публикации. |
| Миграция | Две новые таблицы и идемпотентное создание служебной записи в одной транзакции. По умолчанию только план; применение требует явного действия. Не применялась ни на Preview, ни на Production в этой сессии. |
| Календарь | Пять языков, текущий месяц/архив по Europe/Chisinau, неизменные URL, отдельные страницы событий, отмены/переносы, дедупликация, собственные обложки. 42 записи, из них 8 добавлены на предыдущем этапе; в этом проходе новые события не выдумывались и не добавлялись. |
| Импорт | Ручной JSON-пакет до 100 записей, предварительная проверка всего пакета, очередь подтверждения; интерфейс разрешённых источников. Все изменения требуют редактора. |
| Cron | Один запуск ежедневно в 04:00 UTC для Hobby, bearer-защита, блокировка, журнал, дневной ключ. Фид не подключён; режим manual-only не называется автоматическим сбором афиши. |
| SEO | Месяцы/детали в sitemap, корректные canonical/hreflang, правдивая Event разметка, архив. Дополнительно устранена причина дублей метатегов городских видео. |
| Безопасность | Cookie-авторизация админки, проверка Origin/Host/прокси, защита загрузки и read-only диагностики. Секреты не возвращаются API и не включаются в отчёты. |

## Фактические проверки

- Production-сборка `npm run build` — успешно, включая TypeScript.
- `npm test` — 102/102; `npm run lint` — успешно без предупреждений ESLint.
- `npm run test:events-security` — 13/13 реальных HTTP-проверок на отдельном 127.0.0.1-сервере. Временные секреты не печатаются; все подключения БД в дочернем процессе выключены. В том числе верный bearer проходит аутентификацию и получает ожидаемый 503 на недоступной БД, неверный — 401, чужой Origin — 403.
- `test:events-http` — 185 локальных страниц, 511 уникальных статических изображений sitemap, пять языков основных типов страниц, метатеги, JSON-LD, redirects/404 и закрытая админка.
- Production только чтение: 91 канонический URL (в sitemap 455 языковых адресов), robots/sitemap 200, canonical совпадают, по одному H1, JSON-LD без ошибок разбора, 6 hreflang-ссылок. Живые дубли видео зафиксированы в отчёте; исправление пока локальное.
- Проверены смена месяца/года, високосный год, летнее/зимнее время, переносы/отмены, повторы импорта, пропуски переводов, права/формат изображений, отсутствие импорта без разрешения и ограничения миграции.
- `db:check:events`: **соединение не подтверждено**, NEON_* недоступны в локальном процессе. Это ограничение доступа, а не успешный тест БД. Проверка кабинета остановлена инструментом из-за невозможности надёжно определить адрес браузера; настройки не менялись.
- `db:migrate:events`: сформирован только план из 3 операций. Данные не изменялись.
- PageSpeed вернул 429; LCP/INP/CLS и полевые CWV не измерены. Search Console/Bing Webmaster без доступа владельца не проверялись.

## До запуска Production

1. Без передачи секретов в чат синхронизировать подключение **отдельной Preview-ветки** в локальное окружение или запустить read-only проверку в авторизованном окружении. Не затирать существующий .env.local и DATABASE_URL. См. точные команды в events-setup.md.
2. Убедиться, что старые видео и занятость по-прежнему используют их прежнюю базу. Если они раньше использовали только NEON_DATABASE_URL, указать CITY_VIDEOS_DATABASE_URL / AVAILABILITY_DATABASE_URL либо включить совместимость лишь для проверенной старой базы.
3. Просмотреть план миграции, применить только на Preview, проверить health, CRUD, изображения, конфликт двух редакторов, ручной импорт и сохранность после перезапуска. Наличие переменных сразу и в Production, и в Preview не доказывает, что эти окружения используют разные ветки Neon.
4. По отдельному подтверждению владельца — проверочная Preview-публикация. Production-миграция и production-публикация также требуют решения владельца. Автоматического запуска миграций при сборке нет.
5. После разрешённой публикации проверить реальный вызов Cron, повтор в тот же день, журнал и архив. CRON_SECRET задан владельцем только для Production; в Preview отсутствие планировщика и секрета ожидаемо, локальный тест использует другой временный секрет.
6. Получить разрешённый официальный JSON-фид либо продолжать ручной импорт. Для RSS/ICS нужен конкретный подтверждённый адаптер. Автоматический сбор афиши сейчас не заявляется.
7. После публикации повторить production SEO/мобильную приёмку, измерить CWV и проверить индексацию через аккаунты владельца.

Подробности: [настройка](events-setup.md), [аудит](events-seo-audit.md), [production HTTP](production-seo-audit.json), [локальный HTTP](events-http-audit.json).

## Дополнение: получение Preview-подключения

Подготовлены приватная выгрузка Preview через Vercel CLI 65.7.0, фильтрация ненужных секретов и runner с изолированным окружением. .env-файлы и локальная идентификация CLI явно исключены из deployment. Теперь проходят 107 тестов (5 новых проверок безопасности Preview-переменных) и lint. Применения миграций и публикации по-прежнему не было.

Авторизация CLI подтверждена. Preview-строки подключения возвращаются Vercel как [SENSITIVE], поэтому фактическое соединение Neon и календарь с живой базой остаются непроверенными. Подготовлен приватный шаблон для соединения отдельной Preview-ветки из Neon. Точные команды и подтверждения: [events-preview-runbook.md](events-preview-runbook.md).

## Полный список файлов в неопубликованном наборе

Включены предыдущие изменения календаря и инструменты подготовки Preview; реальные env-файлы отсутствуют в списке.

- `.vercelignore`
- `app/admin/events/page.tsx`
- `app/api/admin/events/health/route.ts`
- `app/api/admin/events/images/route.ts`
- `app/api/admin/events/route.ts`
- `app/api/cron/events/route.ts`
- `app/chisinau-videos/[slug]/page.tsx`
- `app/event-images/[id]/route.ts`
- `app/events/[month]/page.tsx`
- `app/events/event/[slug]/page.tsx`
- `app/events/page.tsx`
- `app/sitemap.ts`
- `app/video-sitemap.xml/route.ts`
- `components/AdminEventImports.tsx`
- `components/AdminEventsManager.tsx`
- `components/AdminVideosManager.tsx`
- `components/EventCover.tsx`
- `components/EventMonthPage.tsx`
- `components/EventNotice.tsx`
- `components/EventsCalendar.tsx`
- `components/GuideArticle.tsx`
- `components/useCalendarDate.ts`
- `docs/events-http-audit.json`
- `docs/events-mobile.png`
- `docs/events-preview-runbook.md`
- `docs/events-release-readiness.md`
- `docs/events-seo-audit.md`
- `docs/events-setup.md`
- `docs/production-seo-audit.json`
- `lib/availabilityStore.ts`
- `lib/cityVideoContent.ts`
- `lib/cityVideoIdentity.ts`
- `lib/cityVideoStore.ts`
- `lib/eventCalendar.ts`
- `lib/eventCronAuth.ts`
- `lib/eventDatabase.mjs`
- `lib/eventDates.ts`
- `lib/eventFeed.ts`
- `lib/eventRefresh.ts`
- `lib/eventRequest.ts`
- `lib/eventSource.ts`
- `lib/eventStore.ts`
- `lib/events.ts`
- `lib/eventsWorkflow.ts`
- `lib/existingDatabase.mjs`
- `lib/guide.ts`
- `lib/guideSeo.ts`
- `migrations/20261029_events.sql`
- `package.json`
- `public/events-import-example.json`
- `public/events/categories/business.svg`
- `public/events/categories/city.svg`
- `public/events/categories/concert.svg`
- `public/events/categories/family.svg`
- `public/events/categories/festival.svg`
- `public/events/categories/gastronomy.svg`
- `public/events/categories/other.svg`
- `public/events/categories/rights.json`
- `public/events/categories/sport.svg`
- `public/events/categories/theatre.svg`
- `scripts/audit-events-http.mjs`
- `scripts/audit-public-seo.mjs`
- `scripts/backfill-city-video-thumbnails.mjs`
- `scripts/check-events-db.mjs`
- `scripts/event-db-tools.mjs`
- `scripts/migrate-city-videos.mjs`
- `scripts/migrate-events.mjs`
- `scripts/preview-events-env.mjs`
- `scripts/pull-events-preview.ps1`
- `scripts/run-events-preview.mjs`
- `scripts/save-events-preview-env.mjs`
- `scripts/test-events-security.mjs`
- `tests/cityVideoIdentity.test.mjs`
- `tests/eventDatabase.test.mjs`
- `tests/eventFeed.test.mjs`
- `tests/eventRequest.test.mjs`
- `tests/eventSource.test.mjs`
- `tests/eventsImport.test.mjs`
- `tests/eventsRuntime.test.mjs`
- `tests/eventsSeo.test.mjs`
- `tests/previewEventsEnv.test.mjs`
- `types/neondatabase-serverless.d.ts`
- `vercel.json`

Всего файлов: 83.
