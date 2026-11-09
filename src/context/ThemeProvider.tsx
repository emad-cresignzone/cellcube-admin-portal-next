"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { readPreference, writePreference } from "@/lib/preferences/storage";
import type { Theme, ThemeContextValue } from "./interfaces/ContextProps";

export const themes = ["light", "dark"] as const;

const STORAGE_KEY = "theme";

const ThemeContext = createContext<ThemeContextValue | null>(null);

/**
 * Applies `data-theme` to <html>. The initial value is written by ThemeScript
 * before paint, so this provider only has to stay in sync afterwards.
 */
export default function ThemeProvider({ children }: { children: ReactNode }) {

  /**
   * --------------------------------------------------
   *  Variables
   * --------------------------------------------------
   */
  const [theme, setThemeState] = useState<Theme>("light");

  /**
   * --------------------------------------------------
   *  Methods
   * --------------------------------------------------
   */
  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
    document.documentElement.dataset.theme = next;
    writePreference(STORAGE_KEY, next);
  }, []);

  const toggleTheme = useCallback(
    () => setTheme(theme === "dark" ? "light" : "dark"),
    [theme, setTheme],
  );

  /**
   * --------------------------------------------------
   *  Mutations
   * --------------------------------------------------
   */
  useEffect(() => {
    const stored = readPreference<Theme>(STORAGE_KEY, themes);
    const initial =
      stored ??
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    setThemeState(initial);
    document.documentElement.dataset.theme = initial;
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {

  /**
   * --------------------------------------------------
   *  Reducers
   * --------------------------------------------------
   */
  const context = useContext(ThemeContext);

  /**
   * --------------------------------------------------
   *  Conditions
   * --------------------------------------------------
   */
  if (!context) throw new Error("useTheme must be used inside <ThemeProvider>");
  return context;
}
