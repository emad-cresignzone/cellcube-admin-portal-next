import { defaultLocale, isLocale } from "./config";
import type { Locale } from "./interfaces/I18nProps";

/** Splits "/de/tickets/new" into its locale and the locale-free path. */
export function splitLocale(pathname: string): { locale: Locale; path: string } {
  const [, maybeLocale, ...rest] = pathname.split("/");
  if (isLocale(maybeLocale)) {
    return { locale: maybeLocale, path: `/${rest.join("/")}`.replace(/\/$/, "") || "/" };
  }
  return { locale: defaultLocale, path: pathname || "/" };
}

/** Prefixes a locale-free path: ("/tickets", "ar") → "/ar/tickets". */
export function withLocale(path: string, locale: Locale): string {
  if (/^([a-z]+:)?\/\//i.test(path) || path.startsWith("#") || path.startsWith("mailto:")) {
    return path;
  }
  const normalized = path.startsWith("/") ? path : `/${path}`;
  const { path: bare } = splitLocale(normalized);
  return bare === "/" ? `/${locale}` : `/${locale}${bare}`;
}
