"use client";

import { useEffect, useRef } from "react";
import Link from "@/components/i18n/Link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useI18n } from "@/context/I18nProvider";
import { splitLocale } from "@/lib/i18n/routing";
import { settingsNavItems } from "../constants/settingsNav";

/**
 * The Settings side navigation.
 *
 * A column beside the content from `lg` up, and a single scrollable row of the
 * same entries below it — seven stacked rows pushed the panel itself off a
 * phone screen. It sticks to the top on desktop so it stays reachable inside
 * the long module screens (Administrators, Configuration) that now live here.
 */
export default function SettingsNav() {
  const pathname = usePathname();
  const { t } = useI18n();

  // Hrefs are locale-free, so match against the stripped path.

  /**
   * --------------------------------------------------
   *  Variables
   * --------------------------------------------------
   */
  const { path } = splitLocale(pathname ?? "/");
  const listRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLAnchorElement>(null);

  /**
   * --------------------------------------------------
   *  Mutations
   * --------------------------------------------------
   */
  // On the phone row the active entry can start off-screen — landing on
  // Configuration showed a strip that began at Profile. Scrolled with the
  // row's own `scrollTo` rather than `scrollIntoView`, which would drag the
  // page with it, and skipped entirely on the desktop column, which does not
  // scroll at all.
  useEffect(() => {
    const list = listRef.current;
    const link = activeRef.current;
    if (!list || !link || list.scrollWidth <= list.clientWidth) return;
    list.scrollTo({ left: Math.max(0, link.offsetLeft - 12) });
  }, [path]);

  return (
    <nav
      aria-label={t("Settings sections")}
      className={clsx(
        "w-full shrink-0 rounded-[4px] border border-border bg-surface p-1.5",
        "lg:sticky lg:top-[68px] lg:w-[228px] lg:p-2",
      )}
    >
      {/* One row that scrolls on a phone, one column on a desktop. */}
      <div
        ref={listRef}
        className="flex gap-1 overflow-x-auto lg:flex-col lg:gap-0.5 lg:overflow-x-visible"
      >
        {settingsNavItems.map(({ labelKey, href, icon: Icon }) => {
          const active = path === href || path.startsWith(`${href}/`);
          return (
            <Link
              key={href}
              ref={active ? activeRef : undefined}
              href={href}
              aria-current={active ? "page" : undefined}
              className={clsx(
                "flex shrink-0 items-center gap-2 rounded-[2px] px-2.5 py-2 text-[13px] lg:gap-2.5",
                active ? "bg-brand-100 font-semibold text-brand-950" : "text-ink hover:bg-chip",
              )}
            >
              <Icon
                className={clsx("size-4 shrink-0", active ? "text-brand-600" : "text-muted")}
                strokeWidth={1.75}
              />
              {/* Never wrapped: on the phone row the label is the whole target,
                  and on the column it truncates rather than reflowing. */}
              <span className="whitespace-nowrap lg:truncate">{t(labelKey)}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
