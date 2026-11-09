import type { MessageKey } from "@/messages/en";
import type { locales } from "../config";

export type Locale = (typeof locales)[number];

/**
 * The message contract.
 *
 * English is the source, so every key it defines must exist in `de` and `ar`
 * as well — `src/messages/<locale>/index.ts` types itself against
 * `MessageKey`, and the typecheck fails when one is missing.
 */
export type Messages = Record<MessageKey, string>;

/** Every id the app may translate — the English sentences in `src/messages/en`. */
export type { MessageKey };

export type TranslateParams = Record<string, string | number>;
