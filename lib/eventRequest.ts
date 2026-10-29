/** Check the browser origin against the public host, not Next's internal hostname. */
export function isEventAdminSameOrigin(request: Request, trustedVercelProxy = process.env.VERCEL === "1") {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  try {
    const requestUrl = new URL(request.url);
    const host = request.headers.get("host") || requestUrl.host;
    const forwarded = trustedVercelProxy ? request.headers.get("x-forwarded-proto") : null;
    const protocol = forwarded === "https" ? "https:" : forwarded === "http" ? "http:" : requestUrl.protocol;
    return origin === new URL(`${protocol}//${host}`).origin;
  } catch { return false; }
}
