-- Run once using the Neon SQL editor or npm run db:migrate:events.
CREATE TABLE IF NOT EXISTS rentplace_event_state (
  id integer PRIMARY KEY CHECK (id = 1),
  revision integer NOT NULL DEFAULT 0,
  payload jsonb NOT NULL DEFAULT '{"overrides":{},"queue":[],"rejected":[],"logs":[]}'::jsonb,
  locked_until timestamptz,
  lock_token text
);
INSERT INTO rentplace_event_state (id) VALUES (1) ON CONFLICT DO NOTHING;
CREATE TABLE IF NOT EXISTS rentplace_event_images (
  id text PRIMARY KEY,
  bytes bytea NOT NULL,
  mime text NOT NULL CHECK (mime IN ('image/webp', 'image/avif', 'image/jpeg', 'image/png')),
  source text NOT NULL,
  rights text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
