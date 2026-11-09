import type { SVGProps } from "react";

// The check is cut out of the shield, so it takes the card colour rather than
// `currentColor` — white alone would vanish on the light shield in dark mode.
export const ShieldCheckIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden {...props}>
    <path
      d="M8.00005 2L2.80005 3.6V8C2.80005 11.2 5.20005 13.2 8.00005 14C10.8 13.2 13.2 11.2 13.2 8V3.6L8.00005 2Z"
      fill="currentColor"
    />
    <path
      d="M5.59998 8.00002L7.19998 9.60002L10.4 6.40002"
      className="stroke-surface"
      strokeWidth="1.28"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
