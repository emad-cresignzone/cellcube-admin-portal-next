import { ListState } from "@/types/list";

/**
 * Reducer bodies shared by every read-only list slice.
 *
 * They mutate the Immer draft in place, so a slice wires one up directly:
 * `reducers: { setInitialBatteries: applySetInitialList }`.
 */

/**
 * --------------------------------------------------
 *  Functions
 * --------------------------------------------------
 */

/** Replaces the rows. This is the seam a real API — or a thunk — writes to. */
export function applySetInitialList<T>(
  state: ListState<T>,
  { payload }: { payload: T[] },
): void {
  state.items = payload as ListState<T>["items"];
  state.loading = "succeeded";
  state.error = null;
}
