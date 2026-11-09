"use client";

import { useEffect } from "react";
import Link from "@/components/i18n/Link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { useI18n } from "@/context/I18nProvider";
import { useSidebar } from "@/context/SidebarProvider";
import { splitLocale } from "@/lib/i18n/routing";
import { sidebarSections } from "../constants/sidebarNav";
import { isActive } from "../utils/navigation";

/**
 * The route the overlay was last dismissed for.
 *
 * Kept outside the component: a locale switch remounts the tree without
 * changing the path, and the rail must not close just because the language
 * changed. Only a real navigation dismisses it.
 */
let lastDismissedPath: string | null = null;

export default function Sidebar() {
  const pathname = usePathname();
  const { collapsed, toggleMode, open, isDesktop, dismissOverlay } =
    useSidebar();
  const { t } = useI18n();

  /**
   * --------------------------------------------------
   *  Variables
   * --------------------------------------------------
   */
  const { path } = splitLocale(pathname ?? "/");

  /**
   * --------------------------------------------------
   *  Mutations
   * --------------------------------------------------
   */
  // As an overlay the rail covers the page, so following a link has to close
  // it — on desktop it is a column and stays put.
  useEffect(() => {
    if (isDesktop) {
      lastDismissedPath = null;
      return;
    }
    if (lastDismissedPath === path) return;
    lastDismissedPath = path;
    dismissOverlay();
  }, [path, isDesktop, dismissOverlay]);

  return (
    <>
      {open && !isDesktop && (
        <button
          type="button"
          aria-label={t("Close sidebar")}
          onClick={dismissOverlay}
          className="fixed inset-0 top-12 z-20 cursor-default bg-brand-950/30 lg:hidden"
        />
      )}

      <nav
        id="portal-sidebar"
        aria-label={t("Main navigation")}
        // Kept mounted while closed so the slide-out animates; hidden from
        // assistive tech and taken out of the tab order.
        aria-hidden={!open}
        inert={!open || undefined}
        className={clsx(
          "fixed bottom-0 start-0 top-12 z-30 flex flex-col gap-0.5 overflow-y-auto overflow-x-hidden border-e border-border bg-surface py-3 transition-[width,transform] duration-200",
          collapsed ? "w-14 px-2" : "w-60 pe-[9px] ps-2",
          !open && "-translate-x-full rtl:translate-x-full",
        )}
      >
        {sidebarSections.map((section) => (
          <div key={section.headingKey} className="contents">
            {collapsed ? (
              <div className="mx-auto my-2 h-px w-6 bg-divider" aria-hidden />
            ) : (
              <p className="px-3 pb-1.5 pt-3.5 text-[10px] font-semibold uppercase leading-5 tracking-[0.6px] text-muted">
                {t(section.headingKey)}
              </p>
            )}

            {section.items.map(
              ({
                labelKey,
                href,
                icon: Icon,
                filledWhenActive,
                count,
                countTone,
                matches,
              }) => {
                const active = isActive(path, matches ?? [href]);
                const label = t(labelKey);
                return (
                  <Link
                    key={labelKey}
                    href={href}
                    aria-current={active ? "page" : undefined}
                    title={collapsed ? label : undefined}
                    className={clsx(
                      "relative flex items-center rounded-[2px] py-[7px] text-[13px] leading-5",
                      collapsed ? "justify-center px-0" : "gap-2.5 px-2.5",
                      active
                        ? "bg-brand-100 font-semibold text-brand-950"
                        : "text-ink hover:bg-chip",
                    )}
                  >
                    {active && (
                      <span className="absolute start-0 top-1.5 h-[22px] w-[3px] rounded-e-[2px] bg-brand-600" />
                    )}
                    <Icon
                      className="size-5 shrink-0"
                      strokeWidth={1.5}
                      fill={
                        active && filledWhenActive ? "currentColor" : "none"
                      }
                    />
                    {!collapsed && <span className="truncate">{label}</span>}
                    {!collapsed && count !== undefined && (
                      <span
                        className={clsx(
                          "ms-auto flex h-[18px] min-w-5 items-center justify-center rounded-full px-1.5 text-[11px] font-semibold",
                          countTone === "danger"
                            ? "bg-danger-bg text-danger-deep"
                            : "bg-chip text-ink-secondary",
                        )}
                      >
                        {count}
                      </span>
                    )}
                  </Link>
                );
              },
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={toggleMode}
          aria-label={collapsed ? t("Expand sidebar") : t("Collapse sidebar")}
          title={collapsed ? t("Expand sidebar") : t("Collapse sidebar")}
          className={clsx(
            "mt-auto flex items-center rounded-[2px] py-[7px] text-[13px] text-muted hover:bg-chip hover:text-ink",
            collapsed ? "justify-center px-0" : "gap-2.5 px-2.5",
          )}
        >
          {collapsed ? (
            <PanelLeftOpen
              className="size-5 shrink-0 rtl:rotate-180"
              strokeWidth={1.75}
            />
          ) : (
            <PanelLeftClose
              className="size-5 shrink-0 rtl:rotate-180"
              strokeWidth={1.75}
            />
          )}
          {!collapsed && <span>{t("Collapse sidebar")}</span>}
        </button>
      </nav>
    </>
  );
}
