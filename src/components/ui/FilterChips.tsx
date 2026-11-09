"use client";

import clsx from "clsx";
import type { FilterChipsProps } from "../interfaces/UiProps";

export default function FilterChips({
  chips,
  value,
  onChange,
}: FilterChipsProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {chips.map((chip) => {
        const active = chip.id === value;
        return (
          <button
            key={chip.id}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(chip.id)}
            className={clsx(
              "flex h-[26px] items-center gap-1.5 rounded-full border px-[11px] text-xs transition-colors",
              active
                ? "border-brand-600 bg-brand-100 font-semibold text-brand-950"
                : "border-border bg-surface text-ink hover:bg-chip",
            )}
          >
            {chip.label}
            {chip.count !== undefined && <span className="opacity-70">{chip.count}</span>}
          </button>
        );
      })}
    </div>
  );
}
