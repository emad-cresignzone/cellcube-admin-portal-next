"use client";

import { useMemo } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";

/** The named settings sections, in the order the page asked for them. */
export function useSettingsSections(sectionIds: readonly string[]) {
  /**
   * --------------------------------------------------
   *  Reducers
   * --------------------------------------------------
   */
  const { items, loading, error } = useSelector(
    (state: RootState) => state.settingsSectionsReducer,
  );

  /**
   * --------------------------------------------------
   *  Variables
   * --------------------------------------------------
   */
  const sections = useMemo(
    () => items.filter((section) => sectionIds.includes(section.id)),
    [items, sectionIds],
  );

  return { sections, loading, error };
}
