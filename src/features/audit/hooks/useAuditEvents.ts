"use client";

import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";

/** The audit log's read surface. */
export function useAuditEvents() {
  /**
   * --------------------------------------------------
   *  Reducers
   * --------------------------------------------------
   */
  const { items: events, loading, error } = useSelector((state: RootState) => state.auditReducer);

  return { events, loading, error };
}
