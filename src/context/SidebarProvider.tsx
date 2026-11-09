"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
  type ReactNode,
} from "react";
import { readPreference, writePreference } from "@/lib/preferences/storage";
import type { SidebarContextValue, SidebarMode } from "./interfaces/ContextProps";

export const sidebarModes = ["full", "icons"] as const;

const MODE_KEY = "sidebar";
const OPEN_KEY = "sidebar-open";
const openValues = ["true", "false"] as const;

/** Below this width the rail is an overlay, not a column beside the page. */
const DESKTOP_QUERY = "(min-width: 1024px)";

/**
 * Resolved state, kept outside React.
 *
 * `app/[locale]/layout.tsx` is the root layout, so switching the locale
 * remounts this provider and its `useState` runs again. Reading the resolved
 * value from here means the remount renders the rail exactly as it was
 * instead of falling back to the server default and correcting itself — which
 * is what made the sidebar flash open on every language change.
 */
let resolved: { open: boolean; desktop: boolean } | null = null;

/** Server default; the client replaces it before paint. */
const SSR_OPEN = true;

const isDesktopNow = () =>
  typeof window === "undefined" || window.matchMedia(DESKTOP_QUERY).matches;

/** A 240px rail beside a 375px screen leaves no page, so mobile starts closed. */
const preferredOpen = (desktop: boolean) =>
  desktop ? readPreference(OPEN_KEY, openValues) !== "false" : false;

/** Mirrors the state onto <html>, where the pre-paint CSS reads it. */
const stamp = (open: boolean) => {
  if (typeof document !== "undefined") {
    document.documentElement.dataset.sidebar = open ? "open" : "closed";
  }
};

// Hydration reads the same markup the server sent; the layout effect that
// follows it must run before the browser paints, hence useLayoutEffect.
const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

const SidebarContext = createContext<SidebarContextValue | null>(null);

export default function SidebarProvider({ children }: { children: ReactNode }) {

  /**
   * --------------------------------------------------
   *  Variables
   * --------------------------------------------------
   */
  const [mode, setModeState] = useState<SidebarMode>("full");
  // First paint of a fresh document matches the server; a remount (locale
  // switch, client navigation) picks the state up where it left off.
  const [open, setOpenState] = useState(() => resolved?.open ?? SSR_OPEN);
  const [isDesktop, setIsDesktop] = useState(() => resolved?.desktop ?? true);

  /**
   * --------------------------------------------------
   *  Methods
   * --------------------------------------------------
   */
  const setMode = useCallback((next: SidebarMode) => {
    setModeState(next);
    writePreference(MODE_KEY, next);
  }, []);

  const applyOpen = useCallback((next: boolean) => {
    resolved = { desktop: resolved?.desktop ?? isDesktopNow(), open: next };
    setOpenState(next);
    stamp(next);
  }, []);

  const setOpen = useCallback(
    (next: boolean) => {
      applyOpen(next);
      writePreference(OPEN_KEY, String(next));
    },
    [applyOpen],
  );

  const toggleMode = useCallback(
    () => setMode(mode === "full" ? "icons" : "full"),
    [mode, setMode],
  );

  const toggleOpen = useCallback(() => setOpen(!open), [open, setOpen]);

  // Closing the overlay (scrim tap, navigation) must not overwrite the
  // desktop preference — it is not a choice the user made about the rail.
  const dismissOverlay = useCallback(() => applyOpen(false), [applyOpen]);

  /**
   * --------------------------------------------------
   *  Mutations
   * --------------------------------------------------
   */
  useEffect(() => {
    const storedMode = readPreference<SidebarMode>(MODE_KEY, sidebarModes);
    if (storedMode) setModeState(storedMode);
  }, []);

  // Resolve once per document, then only follow the breakpoint. On a remount
  // the cached state is authoritative — the locale changed, not the layout.
  useIsomorphicLayoutEffect(() => {
    const query = window.matchMedia(DESKTOP_QUERY);

    if (!resolved) {
      resolved = { desktop: query.matches, open: preferredOpen(query.matches) };
    }
    setIsDesktop(resolved.desktop);
    setOpenState(resolved.open);
    stamp(resolved.open);

    const onChange = (event: MediaQueryListEvent) => {
      resolved = { desktop: event.matches, open: preferredOpen(event.matches) };
      setIsDesktop(resolved.desktop);
      setOpenState(resolved.open);
      stamp(resolved.open);
    };

    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return (
    <SidebarContext.Provider
      value={{
        mode,
        collapsed: mode === "icons",
        setMode,
        toggleMode,
        open,
        setOpen,
        toggleOpen,
        isDesktop,
        dismissOverlay,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar(): SidebarContextValue {

  /**
   * --------------------------------------------------
   *  Reducers
   * --------------------------------------------------
   */
  const context = useContext(SidebarContext);

  /**
   * --------------------------------------------------
   *  Conditions
   * --------------------------------------------------
   */
  if (!context) throw new Error("useSidebar must be used inside <SidebarProvider>");
  return context;
}
