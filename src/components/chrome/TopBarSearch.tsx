"use client";

import { useState } from "react";
import { useI18n } from "@/context/I18nProvider";
import { SearchIcon } from "@/Icons/SearchIcon";

/** The top bar search box — a plain input until search has a backend. */
export default function TopBarSearch() {
  const { t } = useI18n();

  /**
   * --------------------------------------------------
   *  Variables
   * --------------------------------------------------
   */
  const [query, setQuery] = useState("");

  return (
    <div className="relative hidden h-7 min-w-px max-w-[520px] flex-1 md:block">
      <SearchIcon className="pointer-events-none absolute start-2 top-[7px] size-3.5 text-white/55" />
      <input
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") console.log("Search");
        }}
        aria-label={t("Search users, roles, audit events… (Ctrl K)")}
        placeholder={t("Search users, roles, audit events… (Ctrl K)")}
        className="size-full rounded-[2px] border border-transparent bg-white/8 pe-[11px] ps-[31px] text-[13px] text-white outline-none placeholder:text-white/55 focus:border-white/30"
      />
    </div>
  );
}
