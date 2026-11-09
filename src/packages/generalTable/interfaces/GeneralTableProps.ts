import type { ReactNode } from "react";

export interface GeneralTableColumn<T> {
  key: string;
  label: ReactNode;
  sortable?: boolean;
  align?: "start" | "end";
  /** Fixed column width, e.g. "90px" or "20%". */
  width?: string;
  /** Raw value used for sorting and as the default cell text. */
  value?: (item: T) => string | number | null | undefined;
  /** Custom cell renderer (overrides `value` for display). */
  render?: (item: T) => ReactNode;
  headerClassName?: string;
  cellClassName?: string;
}

export interface GeneralTableAction<T> {
  icon: ReactNode;
  title: string;
  onClick: (item: T) => void;
  /** e.g. "hover:bg-danger hover:text-white" */
  hoverClassName?: string;
  hidden?: (item: T) => boolean;
}

export interface GeneralTableBulkContext {
  ids: string[];
  clear: () => void;
}

/**
 * Server-driven pagination: `data` already holds exactly one fetched page and
 * page changes are delegated to the caller. Replaces the internal client-side
 * slicing while keeping the table's own pagination bar as the single control.
 */
export interface GeneralTableServerPagination {
  currentPage: number;
  pageCount: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  /** Current server page size — shows the per-page selector when set. */
  perPage?: number;
  /** Asks the caller to refetch at the new size (from page 1). */
  onPerPageChange?: (perPage: number) => void;
}

export interface GeneralTableProps<T> {
  data: T[];
  columns: GeneralTableColumn<T>[];
  getRowId: (item: T) => string;
  onRowClick?: (item: T) => void;
  actions?: GeneralTableAction<T>[];
  emptyText?: string;
  emptySub?: string;
  initialSort?: { key: string; dir: "asc" | "desc" };
  className?: string;

  /** Paginates internally. Defaults to true. */
  paginated?: boolean;
  initialPerPage?: number;
  /** Hands the pagination bar over to a server-fetched page set. */
  serverPagination?: GeneralTableServerPagination;
  /** Shows a loading row when empty and dims stale rows while refetching. */
  loading?: boolean;

  /** Leading checkbox column. Selection state is owned by the table. */
  selectable?: boolean;
  /** Rendered in a bar above the table while at least one row is selected. */
  renderBulkActions?: (context: GeneralTableBulkContext) => ReactNode;

  /** Horizontal scroll threshold. Defaults to 860px. */
  minWidth?: string;
}
