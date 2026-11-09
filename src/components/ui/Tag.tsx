import clsx from "clsx";
import { tagStyles } from "../constants/badgeStyles";
import type { TagProps } from "../interfaces/UiProps";

/** The square tag — a role's colour-coded name, in tables and on headers. */
export function Tag({ tone, size = "sm", children }: TagProps) {
  return (
    <span
      className={clsx(
        "inline-flex shrink-0 items-center whitespace-nowrap rounded-[2px] font-semibold",
        size === "sm"
          ? "h-[22px] px-2 text-[11px]"
          : "h-7 px-[11px] text-[13px]",
        tagStyles[tone],
      )}
    >
      {children}
    </span>
  );
}
