import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const adminCookieName = "rpm_admin_session";
const maxAgeSeconds = 60 * 60 * 24 * 14;

function getSecret() {
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || process.env.ADMIN_TOKEN || "";
}

export function isAdminConfigured() {
  return Boolean(process.env.ADMIN_PASSWORD || process.env.ADMIN_TOKEN);
}

function sign(value: string) {
  return createHmac("sha256", getSecret()).update(value).digest("base64url");
}

function safeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  return leftBuffer.length === rightBuffer.length && timingSafeEqual(leftBuffer, rightBuffer);
}

export function verifyAdminPassword(password: string) {
  const configuredPassword = process.env.ADMIN_PASSWORD || process.env.ADMIN_TOKEN || "";

  return Boolean(configuredPassword) && safeEqual(password, configuredPassword);
}

export function createAdminSessionToken() {
  const issuedAt = String(Date.now());
  return issuedAt + "." + sign(issuedAt);
}

export function verifyAdminSessionToken(token: string | undefined) {
  if (!token || !getSecret()) {
    return false;
  }

  const [issuedAt, signature] = token.split(".");
  if (!issuedAt || !signature || sign(issuedAt) !== signature) {
    return false;
  }

  const ageSeconds = (Date.now() - Number(issuedAt)) / 1000;
  return Number.isFinite(ageSeconds) && ageSeconds >= 0 && ageSeconds <= maxAgeSeconds;
}

export async function requireAdmin() {
  const cookieStore = await cookies();
  return verifyAdminSessionToken(cookieStore.get(adminCookieName)?.value);
}

export function getAdminCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    maxAge: maxAgeSeconds,
    path: "/",
  };
}
