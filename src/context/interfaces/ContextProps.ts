import type { Locale } from "@/lib/i18n/interfaces/I18nProps";
import type { Translate } from "@/types/i18n";
import type { sidebarModes } from "../SidebarProvider";
import type { themes } from "../ThemeProvider";

/*  --------------------------------------------------  I18n  */

export interface I18nContextValue {
  locale: Locale;
  dir: "ltr" | "rtl";
  t: Translate;
  /** Locale-prefixed href for the current locale. */
  href: (path: string) => string;
  /** Swaps the locale segment of the current URL — client navigation, no reload. */
  setLocale: (locale: Locale) => void;
}

/*  --------------------------------------------------  Sidebar  */

export type SidebarMode = (typeof sidebarModes)[number];

export interface SidebarContextValue {
  /** Width mode while the sidebar is open. */
  mode: SidebarMode;
  collapsed: boolean;
  setMode: (mode: SidebarMode) => void;
  toggleMode: () => void;
  /** Whether the sidebar is on screen at all. */
  open: boolean;
  setOpen: (open: boolean) => void;
  toggleOpen: () => void;
  /** True from the `lg` breakpoint up, where the rail sits beside the page. */
  isDesktop: boolean;
  /** Closes the overlay without touching the stored desktop preference. */
  dismissOverlay: () => void;
}

/*  --------------------------------------------------  Theme  */

export type Theme = (typeof themes)[number];

export interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}
