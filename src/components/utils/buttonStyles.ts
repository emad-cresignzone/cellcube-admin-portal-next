import clsx from "clsx";
import { sizes, variants } from "../constants/buttonStyles";
import type { ButtonCommonProps } from "../interfaces/UiProps";

/** Resolves the shared button chrome for a variant/size pair. */
export function buttonStyles({
  variant = "secondary",
  size = "md",
  className,
}: Omit<ButtonCommonProps, "children">): string {
  return clsx(
    // The label cannot wrap, so a tight button would otherwise take its width
    // out of the icon, down to nothing.
    "inline-flex items-center justify-center whitespace-nowrap transition-colors disabled:cursor-not-allowed disabled:opacity-50 [&>svg]:shrink-0",
    variants[variant],
    sizes[size],
    className,
  );
}
