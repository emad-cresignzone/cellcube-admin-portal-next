"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/context/ThemeProvider";
import { useI18n } from "@/context/I18nProvider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useI18n();

  /**
   * --------------------------------------------------
   *  Variables
   * --------------------------------------------------
   */
  const dark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={t("Toggle theme")}
      title={dark ? t("Light mode") : t("Dark mode")}
      aria-pressed={dark}
      className="flex size-8 items-center justify-center rounded-[2px] text-white/85 hover:bg-white/10"
    >
      {dark ? <Sun className="size-[18px]" /> : <Moon className="size-[18px]" />}
    </button>
  );
}
