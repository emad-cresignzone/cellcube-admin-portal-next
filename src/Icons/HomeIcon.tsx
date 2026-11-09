import type { SVGProps } from "react";

// Stroked as well as filled: the rail passes `fill="none"` while inactive, and
// this shape has no other outline to fall back on.
export const HomeIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden {...props}>
    <path
      d="M9.4 2.7C9.5731 2.57018 9.78363 2.5 10 2.5C10.2164 2.5 10.4269 2.57018 10.6 2.7L17.6 8.4C17.7242 8.49315 17.825 8.61393 17.8944 8.75279C17.9639 8.89164 18 9.04475 18 9.2V17C18 17.2652 17.8946 17.5196 17.7071 17.7071C17.5196 17.8946 17.2652 18 17 18H13.5V13C13.5 12.7348 13.3946 12.4804 13.2071 12.2929C13.0196 12.1054 12.7652 12 12.5 12H8.5C8.23478 12 7.98043 12.1054 7.79289 12.2929C7.60536 12.4804 7.5 12.7348 7.5 13V18H4C3.73478 18 3.48043 17.8946 3.29289 17.7071C3.10536 17.5196 3 17.2652 3 17V9.2C3 8.9 3.1 8.6 3.4 8.4L9.4 2.7Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </svg>
);
