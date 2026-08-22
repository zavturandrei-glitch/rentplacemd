CREATE TABLE IF NOT EXISTS city_videos (
  id text PRIMARY KEY,
  slug text,
  event_date date NOT NULL,
  platform text NOT NULL,
  category text,
  source_name text,
  video_url text NOT NULL,
  embed_url text,
  thumbnail_url text,
  thumbnail_status text NOT NULL DEFAULT 'not_required',
  thumbnail_error text,
  title jsonb NOT NULL,
  description jsonb NOT NULL,
  related_url text,
  featured boolean NOT NULL DEFAULT false,
  published boolean NOT NULL DEFAULT false,
  display_order integer NOT NULL DEFAULT 100,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT city_videos_thumbnail_status_check
    CHECK (thumbnail_status IN ('not_required', 'manual', 'stored', 'failed'))
);

ALTER TABLE city_videos ADD COLUMN IF NOT EXISTS category text;
ALTER TABLE city_videos ADD COLUMN IF NOT EXISTS source_name text;
ALTER TABLE city_videos ADD COLUMN IF NOT EXISTS slug text;
ALTER TABLE city_videos ADD COLUMN IF NOT EXISTS embed_url text;
ALTER TABLE city_videos ADD COLUMN IF NOT EXISTS thumbnail_status text NOT NULL DEFAULT 'not_required';
ALTER TABLE city_videos ADD COLUMN IF NOT EXISTS thumbnail_error text;

CREATE UNIQUE INDEX IF NOT EXISTS city_videos_slug_unique
  ON city_videos (slug) WHERE slug IS NOT NULL;

CREATE TABLE IF NOT EXISTS city_video_thumbnails (
  video_id text PRIMARY KEY REFERENCES city_videos(id) ON DELETE CASCADE,
  content_type text NOT NULL,
  image_data bytea NOT NULL,
  size_bytes integer NOT NULL CHECK (size_bytes > 0 AND size_bytes <= 5000000),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

UPDATE city_videos
SET thumbnail_status = CASE
  WHEN platform <> 'tiktok' THEN 'not_required'
  WHEN thumbnail_url IS NULL OR btrim(thumbnail_url) = '' THEN 'failed'
  WHEN thumbnail_url LIKE '/api/video-thumbnails/%' THEN 'stored'
  WHEN thumbnail_url ~* '(tiktokcdn|muscdn|byteoversea|ibytedtos)' THEN 'failed'
  ELSE 'manual'
END,
thumbnail_error = CASE
  WHEN platform = 'tiktok' AND (thumbnail_url IS NULL OR btrim(thumbnail_url) = '')
    THEN 'Thumbnail не получен'
  WHEN platform = 'tiktok' AND thumbnail_url ~* '(tiktokcdn|muscdn|byteoversea|ibytedtos)'
    THEN 'Временная TikTok CDN-ссылка требует переноса в постоянное хранилище'
  ELSE NULL
END;
