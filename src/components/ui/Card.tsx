import clsx from "clsx";
import type { CardProps } from "../interfaces/UiProps";

export function Card({ children, className }: CardProps) {
  return (
    <section className={clsx("rounded-[4px] border border-border bg-surface", className)}>
      {children}
    </section>
  );
}
