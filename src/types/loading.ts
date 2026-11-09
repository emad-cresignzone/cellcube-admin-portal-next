/**
 * Async status used by every feature slice.
 *
 * The portal has no backend yet, so seeded slices start at `"succeeded"` and
 * never pass through `"pending"`. The union is still the contract every
 * reducer speaks, so swapping a seed for a real thunk needs no state change.
 */
export type LoadingStatus = "idle" | "pending" | "succeeded" | "failed";
