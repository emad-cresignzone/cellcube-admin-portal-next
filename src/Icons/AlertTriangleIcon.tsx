import type { SVGProps } from "react";

// The mark takes the card colour for the same reason as `ShieldCheckIcon`: the
// triangle turns light in dark mode, where white would not show on it.
export const AlertTriangleIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden {...props}>
    <path d="M7.00039 2.09998L12.6004 11.9H1.40039L7.00039 2.09998Z" fill="currentColor" />
    <path
      d="M7 5.59998V8.39998M7 9.79998V10.15"
      className="stroke-surface"
      strokeWidth="1.12"
      strokeLinecap="round"
    />
  </svg>
);
