import clsx from "clsx";
import type { CardProps } from "../interfaces/UiProps";

export function CardBody({ children, className }: CardProps) {
  return <div className={clsx("px-4 py-3.5", className)}>{children}</div>;
}
