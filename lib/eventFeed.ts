export async function readPermittedEventFeed(config: { url?: string; permissionConfirmed?: boolean; allowedHosts: string[] }, fetcher: typeof fetch = fetch) {
  const feed = config.url;
  if (!feed) return [];
  // Opt-in only after the owner has confirmed commercial republication permission.
  if (!config.permissionConfirmed) throw new Error("Разрешение на импорт источника не подтверждено");
  const url = new URL(feed);
  const hosts = config.allowedHosts;
  if (url.protocol !== "https:" || url.username || url.password || url.port || !hosts.includes(url.hostname)
    || !/^[a-z0-9.-]+\.[a-z]{2,}$/i.test(url.hostname) || /(^|\.)(localhost|local|internal)$/i.test(url.hostname)) throw new Error("Источник не разрешён");
  const response = await fetcher(url, {
    signal: AbortSignal.timeout(15_000), cache: "no-store", redirect: "error",
    headers: { Accept: "application/json", "User-Agent": "RentPlaceMD-Events/1.0 (+https://rentplace.md)" },
  });
  if (!response.ok) throw new Error(`Источник вернул HTTP ${response.status}`);
  if (!response.headers.get("content-type")?.includes("application/json")) throw new Error("Ожидается разрешённый JSON-фид, HTML-парсинг отключён");
  if (!response.body) throw new Error("Пустой ответ источника");
  const reader = response.body.getReader();
  let length = 0;
  const chunks: Uint8Array[] = [];
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    length += value.length;
    if (length > 2_000_000) { await reader.cancel(); throw new Error("Фид больше 2 MB"); }
    chunks.push(value);
  }
  const data: unknown = JSON.parse(Buffer.concat(chunks).toString("utf8"));
  if (!Array.isArray(data) || data.length > 500) throw new Error("Ожидается массив до 500 событий");
  return data as unknown[];
}
