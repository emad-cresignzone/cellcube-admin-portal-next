export interface Pagination<T> {
  /** 1-based, always clamped into [1, pageCount]. */
  currentPage: number;
  pageCount: number;
  elementsPerPage: number;
  totalItems: number;
  /** The slice of `items` belonging to the current page. */
  pageItems: T[];
  onPageChange: (page: number) => void;
  onPerPageChange: (perPage: number) => void;
}
