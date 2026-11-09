import type { MessageKey, TranslateParams } from "@/lib/i18n/interfaces/I18nProps";

/**
 * The translate function every component gets from `useI18n()`.
 *
 * Aliased here so validation schemas and other non-component code can accept
 * it without importing the provider. The key is the English sentence the
 * message files are keyed by, so an unknown one is a compile error.
 */
export type Translate = (key: MessageKey, params?: TranslateParams) => string;
