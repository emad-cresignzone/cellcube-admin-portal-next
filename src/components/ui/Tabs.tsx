"use client";

import { useEffect, useRef } from "react";
import Link from "@/components/i18n/Link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useI18n } from "@/context/I18nProvider";
import { splitLocale } from "@/lib/i18n/routing";
import type { TabsProps } from "../interfaces/UiProps";

/** Route-driven tab strip used on every detail page. */
export default function Tabs({ tabs }: TabsProps) {
  const pathname = usePathname();
  const { t } = useI18n();

  // Compare against the locale-free path — hrefs are stored without a locale.

  /**
   * --------------------------------------------------
   *  Variables
   * --------------------------------------------------
   */
  const { path } = splitLocale(pathname ?? "/");

  /**
   * The tab the current route belongs to — the longest href the path sits
   * under, so a child route (a ticket's single service under Service history)
   * keeps its parent tab lit, while every exact match still wins over the
   * Overview tab that all the others are nested below.
   */
  const stripRef = useRef<HTMLElement>(null);
  const activeRef = useRef<HTMLAnchorElement>(null);

  const activeHref = tabs
    .filter((tab) => path === tab.href || path.startsWith(`${tab.href}/`))
    .reduce<string | null>(
      (longest, tab) => (longest === null || tab.href.length > longest.length ? tab.href : longest),
      null,
    );

  /**
   * --------------------------------------------------
   *  Mutations
   * --------------------------------------------------
   */
  // The strip scrolls sideways on a narrow screen, and the active tab is
  // frequently not the first — Configuration's Groups tab sat past the right
  // edge on a phone, with nothing to say the section was even open. Scrolled
  // with the strip's own `scrollTo`, so the page itself never moves.
  useEffect(() => {
    const strip = stripRef.current;
    const tab = activeRef.current;
    if (!strip || !tab || strip.scrollWidth <= strip.clientWidth) return;
    strip.scrollTo({ left: Math.max(0, tab.offsetLeft - 12) });
  }, [activeHref]);

  return (
    <nav
      ref={stripRef}
      // The divider is an inset shadow, not a border: tabs paint over it for
      // the active underline without a -mb-px overhang, which inside the
      // overflow-x container produced 1px of vertical scroll.
      className="flex overflow-x-auto shadow-[inset_0_-1px_0_0_var(--color-border)]"
      aria-label={t("Sections")}
    >
      {tabs.map((tab) => {
        const active = tab.href === activeHref;
        return (
          <Link
            key={tab.href}
            ref={active ? activeRef : undefined}
            href={tab.href}
            aria-current={active ? "page" : undefined}
            className={clsx(
              "flex shrink-0 cursor-pointer items-center gap-1.5 border-b-2 px-3.5 py-2.5 text-[13px] leading-5 transition-colors",
              active
                ? "border-brand-600 font-semibold text-brand-700"
                : "border-transparent font-medium text-ink-secondary hover:text-ink",
            )}
          >
            {t(tab.labelKey)}
            {tab.count !== undefined && (
              <span className="rounded-full bg-chip px-1.5 text-[11px] font-semibold text-ink-secondary">
                {tab.count}
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}
