import { NextRequest } from "next/server";
import {
  adminCookieName,
  createAdminSessionToken,
  getAdminCookieOptions,
  isAdminConfigured,
  requireAdmin,
  verifyAdminPassword,
} from "@/lib/adminAuth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json({ authenticated: await requireAdmin(), configured: isAdminConfigured() });
}

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => null)) as { password?: string } | null;

  if (!isAdminConfigured()) {
    return Response.json({ error: "ADMIN_PASSWORD не задан. Добавьте пароль в переменные окружения." }, { status: 503 });
  }

  if (!body?.password || !verifyAdminPassword(body.password)) {
    return Response.json({ error: "Неверный пароль." }, { status: 401 });
  }

  const response = Response.json({ authenticated: true });
  response.headers.append(
    "Set-Cookie",
    adminCookieName + "=" + createAdminSessionToken() + "; Path=/; Max-Age=" + getAdminCookieOptions().maxAge + "; HttpOnly; SameSite=Lax" + (process.env.NODE_ENV === "production" ? "; Secure" : ""),
  );

  return response;
}

export async function DELETE() {
  const response = Response.json({ authenticated: false });
  response.headers.append("Set-Cookie", adminCookieName + "=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax");
  return response;
}
