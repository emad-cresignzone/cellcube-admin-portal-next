"use client";

import { createContext, useCallback, useContext, useMemo, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { localeDirection } from "@/lib/i18n/config";
import { splitLocale, withLocale } from "@/lib/i18n/routing";
import { translate } from "@/lib/i18n";
import type { Locale, Messages } from "@/lib/i18n/interfaces/I18nProps";
import type { I18nContextValue } from "./interfaces/ContextProps";

const I18nContext = createContext<I18nContextValue | null>(null);

export default function I18nProvider({
  locale,
  messages,
  children,
}: {
  locale: Locale;
  messages: Messages;
  children: ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const value = useMemo<I18nContextValue>(
    () => ({
      locale,
      dir: localeDirection(locale),
      t: (key, params) => translate(messages, key, params),
      href: (path) => withLocale(path, locale),
      setLocale: (next) => {
        const { path } = splitLocale(pathname ?? "/");
        router.push(withLocale(path, next));
      },
    }),
    [locale, messages, pathname, router],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {

  /**
   * --------------------------------------------------
   *  Reducers
   * --------------------------------------------------
   */
  const context = useContext(I18nContext);

  /**
   * --------------------------------------------------
   *  Conditions
   * --------------------------------------------------
   */
  if (!context) throw new Error("useI18n must be used inside <I18nProvider>");
  return context;
}

/** Convenience hook for components that only need the translate function. */
export function useTranslate() {
  const { t } = useI18n();
  return useCallback(t, [t]);
}
