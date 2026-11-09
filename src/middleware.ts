import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales } from "@/lib/i18n/config";

/**
 * Locale-first routing.
 *
 * A path that already names a locale is left alone — `/de/…`, `/en/…` and
 * `/ar/…` all resolve, and switching language is an explicit navigation to the
 * prefixed path.
 *
 * A path that names none lands on German, always. It used to negotiate: the
 * remembered cookie first, then `Accept-Language`. Both could answer "en" —
 * an English-preferring browser, or one earlier visit to an `/en/…` link — and
 * the product's own default was then never what the reader saw at `/`. There
 * is nothing to negotiate: German is the default locale, and the URL is the
 * only thing that may say otherwise.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );

  if (hasLocale) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Everything except Next internals, the API surface and static assets.
  matcher: ["/((?!_next|api|favicon.ico|.*\\.[\\w]+$).*)"],
};
