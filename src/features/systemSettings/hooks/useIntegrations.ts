"use client";

import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";

/** The integrations read surface, shared with the dashboard. */
export function useIntegrations() {
  /**
   * --------------------------------------------------
   *  Reducers
   * --------------------------------------------------
   */
  const { items: integrations, loading, error } = useSelector(
    (state: RootState) => state.integrationsReducer,
  );

  return { integrations, loading, error };
}
