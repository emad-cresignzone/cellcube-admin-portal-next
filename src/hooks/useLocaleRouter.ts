"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { useI18n } from "@/context/I18nProvider";

/**
 * next/navigation's router, with locale-prefixed paths — the programmatic
 * counterpart to the locale-aware <Link>.
 */
export function useLocaleRouter() {
  const router = useRouter();
  const { href } = useI18n();

  return useMemo(
    () => ({
      ...router,
      push: (path: string) => router.push(href(path)),
      replace: (path: string) => router.replace(href(path)),
      back: () => router.back(),
    }),
    [router, href],
  );
}
