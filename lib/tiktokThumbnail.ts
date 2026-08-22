export const TIKTOK_THUMBNAIL_MAX_BYTES = 5_000_000;
export const TIKTOK_THUMBNAIL_ATTEMPTS = 3;

const imageTypes = new Map([
  ["image/jpeg", "jpg"],
  ["image/png", "png"],
  ["image/webp", "webp"],
  ["image/avif", "avif"],
]);

type FetchLike = typeof fetch;

export type StoredThumbnail = {
  bytes: Uint8Array;
  contentType: string;
  extension: string;
  embedUrl?: string;
};

type TikTokOEmbed = {
  thumbnail_url?: unknown;
  embed_product_id?: unknown;
  html?: unknown;
};

export type TikTokThumbnailOptions = {
  fetchImpl?: FetchLike;
  attempts?: number;
  timeoutMs?: number;
  maxBytes?: number;
  retryDelaysMs?: readonly number[];
  sleep?: (milliseconds: number) => Promise<void>;
};

export class TikTokThumbnailError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "TikTokThumbnailError";
  }
}

function asHttpsUrl(value: unknown) {
  try {
    const url = new URL(String(value ?? ""));
    return url.protocol === "https:" ? url.toString() : null;
  } catch {
    return null;
  }
}

function delay(milliseconds: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, milliseconds));
}

function errorMessage(error: unknown) {
  if (error instanceof DOMException && error.name === "TimeoutError") return "timeout";
  if (error instanceof Error) return error.message;
  return "неизвестная ошибка";
}

async function readLimitedBody(response: Response, maxBytes: number) {
  const declaredSize = Number(response.headers.get("content-length") ?? "0");
  if (Number.isFinite(declaredSize) && declaredSize > maxBytes) {
    throw new TikTokThumbnailError(`файл превышает ${Math.floor(maxBytes / 1_000_000)} МБ`);
  }

  if (!response.body) {
    const bytes = new Uint8Array(await response.arrayBuffer());
    if (bytes.byteLength > maxBytes) {
      throw new TikTokThumbnailError(`файл превышает ${Math.floor(maxBytes / 1_000_000)} МБ`);
    }
    return bytes;
  }

  const reader = response.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > maxBytes) {
        await reader.cancel();
        throw new TikTokThumbnailError(`файл превышает ${Math.floor(maxBytes / 1_000_000)} МБ`);
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }

  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return bytes;
}

function embedUrlFromOEmbed(payload: TikTokOEmbed) {
  const productId = String(payload.embed_product_id ?? "").match(/^\d+$/)?.[0]
    ?? String(payload.html ?? "").match(/data-video-id=["'](\d+)["']/)?.[1];
  return productId ? `https://www.tiktok.com/player/v1/${productId}` : null;
}

async function requestOEmbed(videoUrl: string, fetchImpl: FetchLike, timeoutMs: number) {
  const userAgent = "RentPlaceMD/1.0 (+https://rentplace.md)";
  const response = await fetchImpl(
    `https://www.tiktok.com/oembed?url=${encodeURIComponent(videoUrl)}`,
    {
      headers: { Accept: "application/json", "User-Agent": userAgent },
      cache: "no-store",
      signal: AbortSignal.timeout(timeoutMs),
    },
  );
  if (!response.ok) throw new TikTokThumbnailError(`TikTok oEmbed: HTTP ${response.status}`);
  try {
    return { payload: (await response.json()) as TikTokOEmbed, userAgent };
  } catch {
    throw new TikTokThumbnailError("TikTok oEmbed вернул некорректный JSON");
  }
}

async function requestThumbnailOnce(
  videoUrl: string,
  fetchImpl: FetchLike,
  timeoutMs: number,
  maxBytes: number,
): Promise<StoredThumbnail> {
  const { payload, userAgent } = await requestOEmbed(videoUrl, fetchImpl, timeoutMs);
  const thumbnailUrl = asHttpsUrl(payload.thumbnail_url);
  if (!thumbnailUrl) throw new TikTokThumbnailError("thumbnail URL отсутствует");

  const image = await downloadImageOnce(thumbnailUrl, fetchImpl, timeoutMs, maxBytes, userAgent);
  return { ...image, embedUrl: embedUrlFromOEmbed(payload) ?? undefined };
}

async function downloadImageOnce(
  thumbnailUrl: string,
  fetchImpl: FetchLike,
  timeoutMs: number,
  maxBytes: number,
  userAgent = "RentPlaceMD/1.0 (+https://rentplace.md)",
) {
  const image = await fetchImpl(thumbnailUrl, {
    headers: {
      Accept: "image/avif,image/webp,image/png,image/jpeg",
      Referer: "https://www.tiktok.com/",
      "User-Agent": userAgent,
    },
    cache: "no-store",
    signal: AbortSignal.timeout(timeoutMs),
  });
  if (!image.ok) throw new TikTokThumbnailError(`TikTok CDN: HTTP ${image.status}`);

  const contentType = (image.headers.get("content-type") ?? "").split(";", 1)[0].trim().toLowerCase();
  const extension = imageTypes.get(contentType);
  if (!extension) {
    throw new TikTokThumbnailError("ответ TikTok CDN не является поддерживаемым изображением");
  }
  const bytes = await readLimitedBody(image, maxBytes);
  if (bytes.byteLength === 0) throw new TikTokThumbnailError("TikTok CDN вернул пустой файл");
  return { bytes, contentType, extension };
}

async function withRetries<T>(
  operation: () => Promise<T>,
  options: TikTokThumbnailOptions,
) {
  const attempts = options.attempts ?? TIKTOK_THUMBNAIL_ATTEMPTS;
  const retryDelaysMs = options.retryDelaysMs ?? [350, 900];
  const sleep = options.sleep ?? delay;
  let lastError = "неизвестная ошибка";
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    try {
      return await operation();
    } catch (error) {
      lastError = errorMessage(error);
      if (attempt < attempts - 1) {
        await sleep(retryDelaysMs[Math.min(attempt, retryDelaysMs.length - 1)] ?? 900);
      }
    }
  }
  throw new TikTokThumbnailError(`Thumbnail не получен после ${attempts} попыток: ${lastError}`);
}

export async function downloadTikTokThumbnail(
  videoUrl: string,
  options: TikTokThumbnailOptions = {},
): Promise<StoredThumbnail> {
  const fetchImpl = options.fetchImpl ?? fetch;
  const timeoutMs = options.timeoutMs ?? 7_000;
  const maxBytes = options.maxBytes ?? TIKTOK_THUMBNAIL_MAX_BYTES;
  return withRetries(() => requestThumbnailOnce(videoUrl, fetchImpl, timeoutMs, maxBytes), options);
}

export async function downloadTikTokThumbnailUrl(
  thumbnailUrl: string,
  options: TikTokThumbnailOptions = {},
): Promise<StoredThumbnail> {
  const normalizedUrl = asHttpsUrl(thumbnailUrl);
  if (!normalizedUrl) throw new TikTokThumbnailError("Ручной thumbnail URL должен использовать HTTPS");
  const fetchImpl = options.fetchImpl ?? fetch;
  const timeoutMs = options.timeoutMs ?? 7_000;
  const maxBytes = options.maxBytes ?? TIKTOK_THUMBNAIL_MAX_BYTES;
  return withRetries(() => downloadImageOnce(normalizedUrl, fetchImpl, timeoutMs, maxBytes), options);
}

export async function resolveTikTokEmbedUrl(
  videoUrl: string,
  options: TikTokThumbnailOptions = {},
) {
  const directId = (() => {
    try {
      return new URL(videoUrl).pathname.match(/\/video\/(\d+)/)?.[1] ?? null;
    } catch {
      return null;
    }
  })();
  if (directId) return `https://www.tiktok.com/player/v1/${directId}`;

  const fetchImpl = options.fetchImpl ?? fetch;
  const timeoutMs = options.timeoutMs ?? 7_000;
  return withRetries(async () => {
    const { payload } = await requestOEmbed(videoUrl, fetchImpl, timeoutMs);
    const embedUrl = embedUrlFromOEmbed(payload);
    if (!embedUrl) throw new TikTokThumbnailError("TikTok oEmbed не вернул ID плеера");
    return embedUrl;
  }, options);
}
