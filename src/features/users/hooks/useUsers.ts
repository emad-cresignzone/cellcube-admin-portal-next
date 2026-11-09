"use client";

import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";

/** The user list's read surface. */
export function useUsers() {
  /**
   * --------------------------------------------------
   *  Reducers
   * --------------------------------------------------
   */
  const { items: users, loading, error } = useSelector((state: RootState) => state.usersReducer);

  return { users, loading, error };
}
