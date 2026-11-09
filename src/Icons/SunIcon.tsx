import type { SVGProps } from "react";

export const SunIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden {...props}>
    <path
      d="M12 10C12 11.1046 11.1046 12 10 12C8.89543 12 8 11.1046 8 10C8 8.89543 8.89543 8 10 8C11.1046 8 12 8.89543 12 10Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path
      d="M10 2.5V4.1M10 15.9V17.5M3.5 10H2M18 10H16.5M5.4 5.4L4.3 4.3M15.7 15.7L14.6 14.6M5.4 14.6L4.3 15.7M15.7 4.3L14.6 5.4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </svg>
);
