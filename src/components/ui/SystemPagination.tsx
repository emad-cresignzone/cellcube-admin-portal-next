"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import clsx from "clsx";
import { useI18n } from "@/context/I18nProvider";
import type { SystemPaginationProps } from "@/types/pagination/pagination";
import { PAGE_SIZE_OPTIONS } from "../constants/pagination";

const SystemPagination: React.FC<SystemPaginationProps> = ({
  currentPage,
  pageCount,
  totalItems,
  onPageChange,
  onPerPageChange,
  elementsPerPage,
}) => {
  const { t } = useI18n();

  // ── Page number array with ellipsis ─────────────────────────────────────

  /**
   * --------------------------------------------------
   *  Methods
   * --------------------------------------------------
   */
  const getPageNumbers = (): (number | "...")[] => {
    const pages: (number | "...")[] = [];

    if (pageCount <= 5) {
      for (let i = 1; i <= pageCount; i++) pages.push(i);
      return pages;
    }

    pages.push(1);

    let start = Math.max(2, currentPage - 1);
    let end = Math.min(pageCount - 1, currentPage + 1);

    if (currentPage <= 2) end = 4;
    else if (currentPage >= pageCount - 1) start = pageCount - 3;

    if (start > 2) pages.push("...");
    for (let i = start; i <= end; i++) pages.push(i);
    if (end < pageCount - 1) pages.push("...");

    pages.push(pageCount);
    return pages;
  };

  /**
   * --------------------------------------------------
   *  Variables
   * --------------------------------------------------
   */
  const pageNumbers = getPageNumbers();

  return (
    <div className="flex flex-col items-center justify-between gap-3 border-t border-divider bg-canvas px-4 py-2.5 sm:flex-row">
      {/* Summary */}
      <p className="text-[11px] text-faint">
        {t("Page")}{" "}
        <span className="font-semibold text-ink-secondary">{currentPage}</span>{" "}
        {t("of")}{" "}
        <span className="font-semibold text-ink-secondary">{pageCount}</span>{" "}
        &mdash;{" "}
        <span className="font-semibold text-ink-secondary">{totalItems}</span>{" "}
        {t("total records")}
      </p>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {/* Per-page selector */}
        {elementsPerPage !== undefined && onPerPageChange && (
          <select
            aria-label={t("Records per page")}
            name="per-page"
            value={elementsPerPage}
            onChange={(e) => onPerPageChange(Number(e.target.value))}
            className="h-7 rounded-[4px] border border-outline bg-surface px-2 text-xs text-ink-secondary outline-none hover:bg-chip focus:ring-1 focus:ring-brand-600"
          >
            {PAGE_SIZE_OPTIONS.map((n) => (
              <option key={n} value={n}>
                {t("{{count}} / page", { count: n })}
              </option>
            ))}
          </select>
        )}

        <nav
          className="inline-flex flex-wrap items-center justify-center gap-1"
          aria-label={t("Pagination")}
        >
          {/* Prev */}
          <button
            type="button"
            onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
            aria-label={t("Previous page")}
            className={clsx(
              "inline-flex h-7 items-center gap-1 rounded-[4px] border border-outline bg-surface px-2.5 text-xs font-semibold text-ink-secondary transition-colors",
              currentPage === 1
                ? "cursor-not-allowed opacity-40"
                : "hover:border-brand-600 hover:text-brand-600",
            )}
          >
            <ChevronLeft className="size-3.5 rtl:rotate-180" />
            {t("Prev")}
          </button>

          {/* Page numbers */}
          {pageNumbers.map((p, idx) =>
            p === "..." ? (
              <span key={`ellipsis-${idx}`} className="px-1 text-xs text-faint">
                …
              </span>
            ) : (
              <button
                key={`page-${p}`}
                type="button"
                onClick={() => onPageChange(p as number)}
                aria-label={t("Page {{page}}", { page: p })}
                aria-current={currentPage === p ? "page" : undefined}
                className={clsx(
                  "grid h-7 min-w-7 place-items-center rounded-[4px] px-2 text-xs font-semibold transition-colors",
                  currentPage === p
                    ? "bg-brand-600 text-white"
                    : "border border-outline bg-surface text-ink-secondary hover:border-brand-600 hover:text-brand-600",
                )}
              >
                {p}
              </button>
            ),
          )}

          {/* Next */}
          <button
            type="button"
            onClick={() => onPageChange(Math.min(currentPage + 1, pageCount))}
            disabled={currentPage === pageCount || pageCount === 0}
            aria-label={t("Next page")}
            className={clsx(
              "inline-flex h-7 items-center gap-1 rounded-[4px] border border-outline bg-surface px-2.5 text-xs font-semibold text-ink-secondary transition-colors",
              currentPage === pageCount || pageCount === 0
                ? "cursor-not-allowed opacity-40"
                : "hover:border-brand-600 hover:text-brand-600",
            )}
          >
            {t("Next")}
            <ChevronRight className="size-3.5 rtl:rotate-180" />
          </button>
        </nav>
      </div>
    </div>
  );
};

export default SystemPagination;
