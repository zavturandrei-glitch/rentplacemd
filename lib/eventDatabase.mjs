/**
 * Select an events connection without modifying the environment.
 * @param {Record<string, string | undefined>} env
 * @param {{migration?: boolean}} [options]
 */
export function resolveEventDatabase(env, options = {}) {
  const names = options.migration
    ? ["EVENTS_MIGRATION_DATABASE_URL", "EVENTS_DATABASE_URL", "NEON_DATABASE_URL_UNPOOLED", "NEON_POSTGRES_URL_NON_POOLING", "NEON_DATABASE_URL", "NEON_POSTGRES_URL"]
    : ["EVENTS_DATABASE_URL", "NEON_DATABASE_URL", "NEON_POSTGRES_URL", "NEON_DATABASE_URL_UNPOOLED", "NEON_POSTGRES_URL_NON_POOLING"];
  if (env.EVENTS_ALLOW_SHARED_DATABASE === "true") names.push("DATABASE_URL", "POSTGRES_URL");
  const variable = names.find(name => env[name]?.trim());
  if (!variable) return null;
  const value = env[variable].trim();
  let url;
  try { url = new URL(value); } catch { throw new Error(`Некорректная настройка ${variable}; значение скрыто`); }
  if (!["postgres:", "postgresql:"].includes(url.protocol) || !url.hostname || !url.pathname || url.pathname === "/") throw new Error(`Некорректная настройка ${variable}; значение скрыто`);
  return { variable, url: value };
}
