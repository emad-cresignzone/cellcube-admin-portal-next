"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, Loader2, X } from "lucide-react";
import clsx from "clsx";
import { useI18n } from "@/context/I18nProvider";
import type { MultiSelectControlProps } from "../../interfaces/InputFieldProps";

/** Controlled, string-keyed checkbox dropdown with removable chips. */
export default function MultiSelectControl({
  id,
  options,
  value,
  onChange,
  placeholder,
  invalid = false,
  disabled = false,
  describedBy,
  maxItems,
  loading = false,
}: MultiSelectControlProps) {
  const { t } = useI18n();
  const containerRef = useRef<HTMLDivElement>(null);

  /**
   * --------------------------------------------------
   *  Variables
   * --------------------------------------------------
   */
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

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

  /**
   * --------------------------------------------------
   *  Methods
   * --------------------------------------------------
   */
  const toggle = (entry: string) => {
    if (value.includes(entry)) {
      onChange(value.filter((current) => current !== entry));
      return;
    }
    if (maxItems !== undefined && value.length >= maxItems) return;
    onChange([...value, entry]);
  };

  const selected = options.filter((option) => value.includes(option.value));
  const visible = query
    ? options.filter((option) =>
        option.label.toLowerCase().includes(query.toLowerCase()),
      )
    : options;

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        id={id}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
        onClick={() => setOpen((current) => !current)}
        className={clsx(
          "flex min-h-8 w-full items-center gap-2 rounded-[4px] border border-b-2 bg-surface px-[11px] py-0.5 text-start text-sm outline-none focus:ring-1 disabled:cursor-not-allowed disabled:border-outline disabled:bg-chip",
          invalid
            ? "border-danger focus:border-danger focus:ring-danger"
            : "border-muted focus:border-brand-600 focus:ring-brand-600",
        )}
      >
        <span className="flex min-h-6 flex-1 flex-wrap items-center gap-1">
          {selected.length === 0 && (
            <span className="text-faint">{placeholder ?? t("Select…")}</span>
          )}
          {selected.map((option) => (
            <span
              key={option.value}
              className="inline-flex items-center gap-1 rounded-full bg-brand-100 py-0.5 pe-1 ps-2 text-[11px] font-medium text-brand-950"
            >
              {option.label}
              {!disabled && (
                <span
                  role="button"
                  tabIndex={-1}
                  aria-label={t("Remove {{label}}", { label: option.label })}
                  onClick={(event) => {
                    event.stopPropagation();
                    toggle(option.value);
                  }}
                  className="grid size-4 place-items-center rounded-full hover:bg-brand-300"
                >
                  <X className="size-3" />
                </span>
              )}
            </span>
          ))}
        </span>
        <ChevronDown className="size-4 shrink-0 text-muted" />
      </button>

      {open && !disabled && (
        <div className="absolute z-30 mt-1 w-full overflow-hidden rounded-[4px] border border-border bg-surface shadow-lg">
          {options.length > 8 && (
            <div className="border-b border-divider p-2">
              <input
                type="text"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={t("Search")}
                className="w-full rounded-[4px] border border-outline bg-surface px-2 py-1 text-[13px] text-ink outline-none focus:border-brand-600"
              />
            </div>
          )}

          <ul
            role="listbox"
            aria-multiselectable
            aria-busy={loading || undefined}
            className="max-h-56 overflow-y-auto py-1"
          >
            {loading && (
              <li
                role="status"
                className="flex items-center gap-2 px-3 py-2 text-[13px] text-muted"
              >
                <Loader2 className="size-3.5 animate-spin" strokeWidth={2} />
                {t("Loading…")}
              </li>
            )}
            {!loading && visible.length === 0 && (
              <li className="px-3 py-2 text-[13px] text-muted">
                {t("No options available.")}
              </li>
            )}
            {(loading ? [] : visible).map((option) => {
              const checked = value.includes(option.value);
              return (
                <li key={option.value}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={checked}
                    onClick={() => toggle(option.value)}
                    className="flex w-full items-center gap-2 px-3 py-1.5 text-start text-[13px] text-ink hover:bg-chip"
                  >
                    <span
                      className={clsx(
                        "grid size-4 shrink-0 place-items-center rounded-[2px] border",
                        checked
                          ? "border-brand-600 bg-brand-600 text-white"
                          : "border-outline",
                      )}
                    >
                      {checked && <Check className="size-3" strokeWidth={3} />}
                    </span>
                    <span className="min-w-0 flex-1">
                      {option.label}
                      {option.hint && (
                        <span className="ps-1.5 text-[11px] text-muted">
                          {option.hint}
                        </span>
                      )}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
