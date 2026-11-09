import type { Locale } from "./interfaces/I18nProps";

export const locales = ["de", "en", "ar"] as const;

/** German is the product's primary market. */
export const defaultLocale: Locale = "de";

/**
 * The locales the language menu offers.
 *
 * Arabic is deliberately absent: its catalogue, its RTL handling and its
 * `/ar` routes all stay — they are still typed, still built and still
 * reachable — but the product does not offer the language yet, so the picker
 * does not advertise it. Add "ar" back here to ship it; nothing else changes.
 */
export const selectableLocales: readonly Locale[] = ["de", "en"];

export const localeNames: Record<Locale, string> = {
  de: "Deutsch",
  en: "English",
  ar: "العربية",
};

const rtlLocales: readonly Locale[] = ["ar"];

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (locales as readonly string[]).includes(value);
}

export function localeDirection(locale: Locale): "ltr" | "rtl" {
  return rtlLocales.includes(locale) ? "rtl" : "ltr";
}
