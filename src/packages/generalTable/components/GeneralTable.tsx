"use client";

import { useMemo, useState } from "react";
import { ArrowDown, ArrowUp, ChevronsUpDown, Loader2 } from "lucide-react";
import clsx from "clsx";
import { usePagination } from "@/hooks/usePagination";
import { useI18n } from "@/context/I18nProvider";
import SystemPagination from "@/components/ui/SystemPagination";
import type {
  GeneralTableColumn,
  GeneralTableProps,
} from "../interfaces/GeneralTableProps";
import { compareValues } from "../utils/compareValues";

/**
 * The single shared table: sortable headers, optional selection with a bulk
 * action bar, hover-revealed row actions and built-in pagination.
 *
 * Styling uses the app's semantic theme tokens, so it follows light/dark mode,
 * and logical properties, so it mirrors correctly in RTL.
 */
export default function GeneralTable<T>({
  data,
  columns,
  getRowId,
  onRowClick,
  actions = [],
  emptyText,
  emptySub,
  initialSort,
  className,
  paginated = true,
  initialPerPage = 10,
  serverPagination,
  loading = false,
  selectable = false,
  renderBulkActions,
  minWidth = "860px",
}: GeneralTableProps<T>) {
  const { t } = useI18n();
  /**
   * --------------------------------------------------
   *  Variables
   * --------------------------------------------------
   */
  const [sort, setSort] = useState<{ key: string; dir: "asc" | "desc" } | null>(
    initialSort ?? null,
  );
  const [selected, setSelected] = useState<ReadonlySet<string>>(new Set());

  const sorted = useMemo(() => {
    if (!sort) return data;
    const column = columns.find((entry) => entry.key === sort.key);
    if (!column?.value) return data;

    const read = column.value;
    // Copy first: the caller's array must never be mutated.
    return [...data].sort((a, b) => {
      const result = compareValues(read(a), read(b));
      return sort.dir === "asc" ? result : -result;
    });
  }, [data, sort, columns]);

  const pagination = usePagination(sorted, initialPerPage);
  // With server pagination the data is already exactly one page — no slicing.
  const rows = serverPagination ? sorted : paginated ? pagination.pageItems : sorted;

  const pageIds = rows.map(getRowId);
  const allOnPageSelected = pageIds.length > 0 && pageIds.every((id) => selected.has(id));
  const selectedIds = [...selected];
  const hasActions = actions.length > 0;
  const colSpan = columns.length + (hasActions ? 1 : 0) + (selectable ? 1 : 0);
/**
   * --------------------------------------------------
   *  Functions
   * --------------------------------------------------
   */
  const toggleSort = (column: GeneralTableColumn<T>) => {
    if (!column.sortable || !column.value) return;
    setSort((current) =>
      current?.key === column.key
        ? { key: column.key, dir: current.dir === "asc" ? "desc" : "asc" }
        : { key: column.key, dir: "asc" },
    );
  };

  const toggleAllOnPage = () => {
    const next = new Set(selected);
    if (allOnPageSelected) pageIds.forEach((id) => next.delete(id));
    else pageIds.forEach((id) => next.add(id));
    setSelected(next);
  };

  const toggleRow = (id: string) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelected(next);
  };

  return (
    <div
      className={clsx(
        "overflow-hidden rounded-[4px] border border-border bg-surface",
        className,
      )}
    >
      {renderBulkActions && selectedIds.length > 0 && (
        <div className="flex flex-wrap items-center gap-3 border-b border-divider bg-brand-50 px-4 py-2">
          <span className="text-[13px] font-semibold text-brand-950">
            {t("{{count}} selected", { count: selectedIds.length })}
          </span>
          <div className="flex flex-wrap items-center gap-2">
            {renderBulkActions({ ids: selectedIds, clear: () => setSelected(new Set()) })}
          </div>
          <button
            type="button"
            onClick={() => setSelected(new Set())}
            className="ms-auto text-xs font-semibold text-brand-700 hover:underline"
          >
            {t("Clear selection")}
          </button>
        </div>
      )}

      {/* Positioned so an absolutely placed descendant (a column's sr-only
          label, for one) resolves against the scroller instead of the page,
          which otherwise stretches the document to the table's min width. */}
      <div className="relative overflow-x-auto">
        <table className="w-full border-collapse text-start" style={{ minWidth }}>
          <colgroup>
            {selectable && <col style={{ width: 40 }} />}
            {columns.map((column) => (
              <col
                key={column.key}
                style={column.width ? { width: column.width } : undefined}
              />
            ))}
            {hasActions && <col style={{ width: 96 }} />}
          </colgroup>

          <thead className="bg-chip">
            <tr>
              {selectable && (
                <th scope="col" className="border-b border-border px-3 py-2">
                  <input
                    type="checkbox"
                    aria-label={t("Select all rows on this page")}
                    checked={allOnPageSelected}
                    onChange={toggleAllOnPage}
                    className="size-4 accent-brand-600"
                  />
                </th>
              )}

              {columns.map((column) => {
                const active = sort?.key === column.key;
                const canSort = column.sortable && column.value;
                return (
                  <th
                    key={column.key}
                    scope="col"
                    aria-sort={
                      active ? (sort!.dir === "asc" ? "ascending" : "descending") : undefined
                    }
                    className={clsx(
                      "border-b border-border px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.44px] text-muted",
                      column.align === "end" ? "text-end" : "text-start",
                      column.headerClassName,
                    )}
                  >
                    {canSort ? (
                      <button
                        type="button"
                        onClick={() => toggleSort(column)}
                        className={clsx(
                          "inline-flex items-center gap-1 uppercase tracking-[0.44px] transition-colors hover:text-ink",
                          active && "text-ink",
                        )}
                      >
                        {column.label}
                        {active ? (
                          sort!.dir === "asc" ? (
                            <ArrowUp className="size-3" strokeWidth={2.5} />
                          ) : (
                            <ArrowDown className="size-3" strokeWidth={2.5} />
                          )
                        ) : (
                          <ChevronsUpDown className="size-3 text-faint" strokeWidth={2} />
                        )}
                      </button>
                    ) : (
                      column.label
                    )}
                  </th>
                );
              })}

              {hasActions && (
                <th
                  scope="col"
                  className="border-b border-border px-3 py-2 text-end text-[11px] font-semibold uppercase tracking-[0.44px] text-muted"
                >
                  {t("Actions")}
                </th>
              )}
            </tr>
          </thead>

          <tbody className={clsx(loading && rows.length > 0 && "pointer-events-none opacity-60")}>
            {rows.length === 0 && (
              <tr>
                <td colSpan={colSpan} className="px-3 py-12 text-center">
                  {loading ? (
                    <p role="status" className="inline-flex items-center justify-center">
                      <Loader2 className="size-6 animate-spin text-muted" strokeWidth={2} />
                      <span className="sr-only">{t("Loading…")}</span>
                    </p>
                  ) : (
                    <>
                      <p className="text-[13px] font-medium text-ink-secondary">
                        {emptyText ?? t("No records found.")}
                      </p>
                      {emptySub && <p className="pt-1 text-xs text-muted">{emptySub}</p>}
                    </>
                  )}
                </td>
              </tr>
            )}

            {rows.map((item) => {
              const id = getRowId(item);
              return (
                <tr
                  key={id}
                  onClick={onRowClick ? () => onRowClick(item) : undefined}
                  onKeyDown={
                    onRowClick
                      ? (event) => {
                          if (event.target !== event.currentTarget) return;
                          if (event.key !== "Enter" && event.key !== " ") return;
                          event.preventDefault();
                          onRowClick(item);
                        }
                      : undefined
                  }
                  tabIndex={onRowClick ? 0 : undefined}
                  className={clsx(
                    "group border-b border-divider transition-colors last:border-b-0",
                    onRowClick &&
                      "cursor-pointer focus-visible:outline focus-visible:-outline-offset-2 focus-visible:outline-brand-600",
                    selected.has(id) ? "bg-brand-50" : "hover:bg-chip/60",
                  )}
                >
                  {selectable && (
                    <td className="px-3 py-2.5" onClick={(event) => event.stopPropagation()}>
                      <input
                        type="checkbox"
                        aria-label={t("Select row {{id}}", { id })}
                        checked={selected.has(id)}
                        onChange={() => toggleRow(id)}
                        className="size-4 accent-brand-600"
                      />
                    </td>
                  )}

                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className={clsx(
                        "px-3 py-2.5 text-[13px] text-ink",
                        column.align === "end" && "text-end",
                        column.cellClassName,
                      )}
                    >
                      {column.render
                        ? column.render(item)
                        : column.value
                          ? String(column.value(item) ?? "")
                          : null}
                    </td>
                  ))}

                  {hasActions && (
                    <td className="px-3 py-2.5" onClick={(event) => event.stopPropagation()}>
                      <div className="flex justify-end gap-1 opacity-100 transition-opacity duration-150 lg:opacity-0 lg:group-focus-within:opacity-100 lg:group-hover:opacity-100">
                        {actions
                          .filter((action) => !action.hidden?.(item))
                          .map((action, index) => (
                            <button
                              key={index}
                              type="button"
                              title={action.title}
                              aria-label={action.title}
                              onClick={() => action.onClick(item)}
                              className={clsx(
                                "grid size-8 place-items-center rounded-[4px] text-muted transition-colors",
                                action.hoverClassName ?? "hover:bg-chip hover:text-ink",
                              )}
                            >
                              {action.icon}
                            </button>
                          ))}
                      </div>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {serverPagination ? (
        // One pagination bar, backend-driven. The per-page selector appears
        // when the caller can refetch at a different size.
        <SystemPagination
          currentPage={serverPagination.currentPage}
          pageCount={serverPagination.pageCount}
          totalItems={serverPagination.totalItems}
          onPageChange={serverPagination.onPageChange}
          elementsPerPage={serverPagination.perPage}
          onPerPageChange={serverPagination.onPerPageChange}
        />
      ) : (
        paginated && (
          <SystemPagination
            currentPage={pagination.currentPage}
            pageCount={pagination.pageCount}
            totalItems={pagination.totalItems}
            elementsPerPage={pagination.elementsPerPage}
            onPageChange={pagination.onPageChange}
            onPerPageChange={pagination.onPerPageChange}
          />
        )
      )}
    </div>
  );
}
