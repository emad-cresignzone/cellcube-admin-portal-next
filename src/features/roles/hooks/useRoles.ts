"use client";

import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";

/** The roles screens' read surface. */
export function useRoles() {
  /**
   * --------------------------------------------------
   *  Reducers
   * --------------------------------------------------
   */
  const { items: roles, loading, error } = useSelector((state: RootState) => state.rolesReducer);

  return { roles, loading, error };
}
