"use client";

import { ChevronDown } from "lucide-react";

/** The signed-in administrator. The design shows no menu, so the button only logs. */
export default function UserMenu() {
  return (
    <button
      type="button"
      onClick={() => console.log("T. Rojas")}
      className="flex h-8 items-center gap-2 rounded-[2px] pe-2 ps-1 hover:bg-white/10"
    >
      <span className="flex size-6 items-center justify-center rounded-full bg-danger-solid text-[11px] font-semibold text-white">
        TR
      </span>
      <span className="hidden text-xs text-white sm:inline">T. Rojas</span>
      <ChevronDown className="size-3.5 text-white" strokeWidth={1.5} />
    </button>
  );
}
