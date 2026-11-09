import type { ButtonSize, ButtonVariant } from "../interfaces/UiProps";

export const variants: Record<ButtonVariant, string> = {
  primary: "bg-brand-600 text-white hover:bg-brand-hover",
  secondary: "border border-outline bg-surface text-ink hover:bg-chip",
  ghost: "text-ink-secondary hover:bg-chip",
  danger: "bg-danger-solid text-white hover:bg-danger-solid-hover",
};

export const sizes: Record<ButtonSize, string> = {
  sm: "h-6 gap-1.5 rounded-[4px] px-[9px] text-xs font-semibold",
  md: "h-8 gap-1.5 rounded-[4px] px-[13px] text-sm font-semibold",
};
