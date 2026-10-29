export type EventSourceConfiguration = {
  name: string;
  url: string;
  permissionUrl: string;
  kind: "json" | "rss" | "ics";
  enabled: boolean;
  permissionConfirmed: boolean;
};

function publicHttps(value: unknown) {
  const url = new URL(String(value));
  if (url.protocol !== "https:" || url.username || url.password || url.port || url.search || url.hash
    || !/^[a-z0-9.-]+\.[a-z]{2,}$/i.test(url.hostname) || /(^|\.)(localhost|local|internal)$/i.test(url.hostname)) throw new Error("Нужна публичная HTTPS-ссылка без секретов и параметров");
  return url.href;
}

export function validateEventSource(value: unknown): EventSourceConfiguration {
  if (!value || typeof value !== "object") throw new Error("Не заполнен источник");
  const input = value as Record<string, unknown>;
  if (!String(input.name ?? "").trim() || String(input.name).length > 200 || !["json", "rss", "ics"].includes(String(input.kind))) throw new Error("Проверьте название и формат источника");
  const enabled = input.enabled === true;
  const permissionConfirmed = input.permissionConfirmed === true;
  if (enabled && (!permissionConfirmed || input.kind !== "json" || !input.permissionUrl)) throw new Error("Для включения нужны разрешение и реализованный JSON-адаптер");
  return {
    name: String(input.name).trim(), url: publicHttps(input.url),
    permissionUrl: input.permissionUrl ? publicHttps(input.permissionUrl) : "",
    kind: input.kind as EventSourceConfiguration["kind"], enabled, permissionConfirmed,
  };
}

export function resolveEventFeed(source: EventSourceConfiguration | undefined, env: Record<string, string | undefined>) {
  if (source) {
    if (!source.enabled) return { allowedHosts: [] as string[] };
    const checked = validateEventSource(source);
    return { url: checked.url, permissionConfirmed: checked.permissionConfirmed, allowedHosts: [new URL(checked.url).hostname] };
  }
  return { url: env.EVENTS_FEED_URL || undefined, permissionConfirmed: env.EVENTS_FEED_PERMISSION_CONFIRMED === "true", allowedHosts: (env.EVENTS_FEED_ALLOWED_HOSTS ?? "").split(",").map(host => host.trim()) };
}
