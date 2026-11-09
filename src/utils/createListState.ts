import { ListState } from "@/types/list";

/**
 * Builds the initial state for a read-only list slice.
 *
 * `loading` starts at `"succeeded"` because the rows are already in memory —
 * that is what keeps the first paint identical to the pre-Redux portal. Point
 * this at `[]` / `"idle"` on the day a real endpoint exists and the components
 * stay untouched.
 */
export function createListState<T>(items: T[]): ListState<T> {
  return { items, loading: "succeeded", error: null };
}
