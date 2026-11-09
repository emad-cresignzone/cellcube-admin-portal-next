"use client";

import { useMemo, useState } from "react";
import type { Pagination } from "./interfaces/HooksProps";

/**
 * Client-side pagination over an in-memory list.
 *
 * The page is derived-and-clamped rather than stored blindly, so shrinking the
 * list (e.g. by filtering) can never leave the table showing an empty page.
 */
export function usePagination<T>(
  items: T[],
  initialPerPage = 10,
): Pagination<T> {
  /**
   * --------------------------------------------------
   *  Variables
   * --------------------------------------------------
   */
  const [requestedPage, setRequestedPage] = useState(1);
  const [elementsPerPage, setElementsPerPage] = useState(initialPerPage);

  const totalItems = items.length;
  const pageCount = Math.max(1, Math.ceil(totalItems / elementsPerPage));
  const currentPage = Math.min(Math.max(requestedPage, 1), pageCount);

  const pageItems = useMemo(() => {
    const start = (currentPage - 1) * elementsPerPage;
    return items.slice(start, start + elementsPerPage);
  }, [items, currentPage, elementsPerPage]);

  return {
    currentPage,
    pageCount,
    elementsPerPage,
    totalItems,
    pageItems,
    onPageChange: setRequestedPage,
    onPerPageChange: (perPage) => {
      setElementsPerPage(perPage);
      setRequestedPage(1);
    },
  };
}
