"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Globe } from "lucide-react";
import clsx from "clsx";
import { useI18n } from "@/context/I18nProvider";
import { localeNames, selectableLocales } from "@/lib/i18n/config";

export default function LocaleSwitcher() {
  const { locale, setLocale, t } = useI18n();

  /**
   * --------------------------------------------------
   *  Variables
   * --------------------------------------------------
   */
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  /**
   * --------------------------------------------------
   *  Mutations
   * --------------------------------------------------
   */
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-label={t("Language")}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex h-8 items-center gap-1.5 rounded-[2px] px-2 text-white/85 hover:bg-white/10"
      >
        <Globe className="size-[18px]" />
        {/* The globe alone on a phone; the code joins it once there is room. */}
        <span className="hidden text-xs font-semibold uppercase sm:inline">{locale}</span>
      </button>

      {open && (
        <ul
          role="menu"
          className="absolute end-0 z-50 mt-1 w-40 rounded-[4px] border border-border bg-surface py-1 shadow-lg"
        >
          {selectableLocales.map((entry) => (
            <li key={entry}>
              <button
                type="button"
                role="menuitemradio"
                aria-checked={entry === locale}
                onClick={() => {
                  setLocale(entry);
                  setOpen(false);
                }}
                className={clsx(
                  "flex w-full items-center gap-2 px-3 py-1.5 text-start text-[13px] hover:bg-chip",
                  entry === locale ? "font-semibold text-brand-700" : "text-ink",
                )}
              >
                <Check
                  className={clsx("size-3.5", entry === locale ? "opacity-100" : "opacity-0")}
                />
                {localeNames[entry]}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
