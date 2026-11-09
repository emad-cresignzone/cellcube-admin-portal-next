import ar from "@/messages/ar";
import de from "@/messages/de";
import en from "@/messages/en";
import type { Locale, Messages, TranslateParams } from "./interfaces/I18nProps";

/**
 * The message catalogue.
 *
 * Each locale is assembled from `src/messages/<locale>/<module>.json`, one
 * file per feature, keyed by the English sentence. English is the source: its
 * keys are the ids the app calls `t()` with, and the other locales are typed
 * against them so a missing translation is a compile error.
 */
const catalogue: Record<Locale, Messages> = { de, en, ar };

export function getMessages(locale: Locale): Messages {
  return catalogue[locale];
}

/**
 * Looks a message up and interpolates `{{name}}` slots. Falls back to English
 * and then to the key itself — which is already readable English, so a missing
 * translation degrades to the source sentence rather than blank UI.
 */
export function translate(
  messages: Messages,
  key: string,
  params?: TranslateParams,
): string {
  const resolved = messages[key as keyof Messages] ?? en[key as keyof typeof en] ?? key;
  if (!params) return resolved;

  return resolved.replace(/\{\{(\w+)\}\}/g, (match, name: string) =>
    name in params ? String(params[name]) : match,
  );
}
