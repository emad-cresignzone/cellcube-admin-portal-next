import { Loader2 } from "lucide-react";
import type {
  ButtonProps,
} from "../interfaces/UiProps";
import { buttonStyles } from "../utils/buttonStyles";

export function Button({
  variant,
  size,
  className,
  children,
  loading = false,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled || loading}
      className={buttonStyles({ variant, size, className })}
      {...props}
    >
      {loading && <Loader2 className="size-3.5 animate-spin" strokeWidth={2} />}
      {children}
    </button>
  );
}

