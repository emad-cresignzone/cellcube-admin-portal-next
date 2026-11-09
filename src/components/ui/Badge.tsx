import clsx from "clsx";
import { badgeDots, badgeTones } from "../constants/badgeStyles";
import type { BadgeProps } from "../interfaces/UiProps";

export function Badge({
  tone = "neutral",
  dot = false,
  children,
  className,
}: BadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex h-5 items-center gap-1 rounded-full px-2 text-[10px] font-semibold uppercase tracking-[0.4px]",
        badgeTones[tone],
        className,
      )}
    >
      {dot && (
        <span
          className={clsx("size-1.5 shrink-0 rounded-full", badgeDots[tone])}
        />
      )}
      {children}
    </span>
  );
}
