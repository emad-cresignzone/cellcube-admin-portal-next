import type { TagTone } from "@/types/tag";

/** Badge tone → chip background and text classes. */
export const badgeTones = {
  neutral: "bg-chip text-ink-secondary",
  off: "bg-divider text-ink-secondary",
  brand: "bg-brand-50 text-brand-950",
  danger: "bg-danger-bg text-danger-deep",
  warn: "bg-warn-bg text-warn-deep",
  success: "bg-success-bg text-success-deep",
  purple: "bg-purple-bg text-purple",
} as const;

/** Badge tone → status dot colour, for the badges that carry one. */
export const badgeDots: Record<keyof typeof badgeTones, string> = {
  neutral: "bg-faint",
  off: "bg-faint",
  brand: "bg-brand-600",
  danger: "bg-danger",
  warn: "bg-warn",
  success: "bg-success",
  purple: "bg-purple",
};

/** Tag tone → square tag background and text classes. */
export const tagStyles: Record<TagTone, string> = {
  plum: "bg-plum text-plum-ink",
  teal: "bg-teal-bg text-teal-deep",
  warn: "bg-warn-bg text-warn-deep",
  neutral: "bg-divider text-ink-secondary",
};
