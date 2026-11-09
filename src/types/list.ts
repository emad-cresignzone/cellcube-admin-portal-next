import { LoadingStatus } from "./loading";

/**
 * State shape for the read-only catalogues: batteries, pinboard notes, wiki
 * articles, reports, notifications, inventory and people.
 *
 * The portal never mutates these, so the slice carries the rows and the load
 * status and nothing else. When a real API arrives they gain thunks; the
 * shape does not change.
 */
export interface ListState<T> {
  items: T[];
  loading: LoadingStatus;
  error: string | null;
}
