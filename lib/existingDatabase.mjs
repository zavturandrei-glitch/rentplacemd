/**
 * Keep a newly attached events Neon database out of unrelated application stores.
 * @param {Record<string, string | undefined>} env
 * @param {"availability" | "videos"} scope
 */
export function existingDatabaseUrl(env, scope) {
  const dedicated = scope === "videos" ? env.CITY_VIDEOS_DATABASE_URL : env.AVAILABILITY_DATABASE_URL;
  return dedicated || env.DATABASE_URL || env.POSTGRES_URL
    || (env.LEGACY_USE_NEON_DATABASE === "true" ? env.NEON_DATABASE_URL : "") || "";
}
