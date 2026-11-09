export interface SystemPaginationProps {
  /** 1-based index of the page currently in view. */
  currentPage: number;
  /** Total number of pages available. */
  pageCount: number;
  /** Total number of records across all pages. */
  totalItems: number;
  onPageChange: (page: number) => void;
  /** Omit together with `elementsPerPage` to hide the page-size selector. */
  onPerPageChange?: (perPage: number) => void;
  elementsPerPage?: number;
}
