"use client";

import type { SegmentedControlProps } from "../interfaces/SettingsProps";

/**
 * Radio-backed segmented control. Controlled so it can be bound to a form
 * value; the (visually hidden) input still carries the checked state used for
 * styling and keyboard interaction.
 */
export default function SegmentedControl({
  name,
  legend,
  options,
  value,
  onChange,
}: SegmentedControlProps) {
  return (
    <fieldset className="flex items-center rounded-[4px] border border-outline bg-chip p-[3px]">
      <legend className="sr-only">{legend}</legend>
      {options.map((option) => (
        <label key={option.value} className="cursor-pointer">
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={() => onChange(option.value)}
            className="peer sr-only"
          />
          <span className="flex h-7 items-center rounded-[3px] px-3 text-[13px] text-ink-secondary peer-checked:bg-surface peer-checked:font-semibold peer-checked:text-ink peer-focus-visible:ring-1 peer-focus-visible:ring-brand-600">
            {option.label}
          </span>
        </label>
      ))}
    </fieldset>
  );
}
