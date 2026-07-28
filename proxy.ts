import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { hasApartmentLocalization } from "@/lib/apartmentLocalization";

const supportedLanguages = new Set(["ru", "ro", "en", "uk", "cs"]);

export function proxy(request: NextRequest) {
  const requestedLanguage = request.nextUrl.searchParams.get("lang")?.toLowerCase();
  const language = requestedLanguage && supportedLanguages.has(requestedLanguage)
    ? requestedLanguage
    : "ru";
  const requestHeaders = new Headers(request.headers);
  const apartmentId = request.nextUrl.pathname.match(/^\/apartment\/[^/]*-(\d+)$/)?.[1];
  const locksContentLanguage = Boolean(
    apartmentId && !hasApartmentLocalization(apartmentId),
  );

  requestHeaders.set("x-rentplace-language", language);
  requestHeaders.set(
    "x-rentplace-content-language",
    locksContentLanguage ? "ru" : language,
  );
  requestHeaders.set(
    "x-rentplace-content-language-locked",
    locksContentLanguage ? "1" : "0",
  );

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: [
    "/((?!api|admin|_next/static|_next/image|favicon.ico|icon.png|apple-icon.png|manifest.webmanifest|robots.txt|sitemap.xml).*)",
  ],
};
