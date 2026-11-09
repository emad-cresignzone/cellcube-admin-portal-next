/** Namespaced, SSR-safe localStorage access for UI preferences. */

const PREFIX = "cellcube:";

export function readPreference<T extends string>(key: string, allowed: readonly T[]): T | null {
  if (typeof window === "undefined") return null;
  try {
    const value = window.localStorage.getItem(PREFIX + key);
    return allowed.includes(value as T) ? (value as T) : null;
  } catch {
    return null;
  }
}

export function writePreference(key: string, value: string): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(PREFIX + key, value);
  } catch {
    // Private browsing / storage disabled — preferences degrade to session-only.
  }
}
