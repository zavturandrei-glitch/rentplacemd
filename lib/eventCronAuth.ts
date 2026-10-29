import { timingSafeEqual } from "node:crypto";

export function validCronAuthorization(authorization: string | null, secret: string | undefined) {
  if (!secret || secret.length < 32) return false;
  const actual = Buffer.from(authorization ?? "");
  const expected = Buffer.from(`Bearer ${secret}`);
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}
