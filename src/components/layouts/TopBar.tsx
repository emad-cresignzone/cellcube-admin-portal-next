"use client";

import Link from "@/components/i18n/Link";
import LocaleSwitcher from "@/components/chrome/LocaleSwitcher";
import SidebarToggle from "@/components/chrome/SidebarToggle";
import ThemeToggle from "@/components/chrome/ThemeToggle";
import TopBarSearch from "@/components/chrome/TopBarSearch";
import UserMenu from "@/components/chrome/UserMenu";
import { useI18n } from "@/context/I18nProvider";
import { BellIcon } from "@/Icons/BellIcon";
import { InfoIcon } from "@/Icons/InfoIcon";

export default function TopBar() {
  const { t } = useI18n();

  return (
    <header className="fixed inset-x-0 top-0 z-40 flex h-12 items-center gap-3 border-b border-topbar-border bg-topbar px-3">
      <SidebarToggle />

      {/* Brand */}
      <div className="flex shrink-0 items-center gap-2.5 px-2">
        <Link href="/" className="flex items-center gap-2.5 rounded-[2px]">
          <img src="/brand/cellcube-mark.svg" alt="" width={22} height={22} />
          <span className="text-[15px] font-semibold tracking-[-0.15px] text-white">CellCube</span>
        </Link>
        <span className="ms-2 hidden items-center gap-1.5 border-s border-white/30 ps-[11px] sm:flex">
          <span className="rounded-[2px] bg-danger-solid px-[5px] py-px text-[9px] font-bold leading-4 tracking-[0.36px] text-white">
            ADMIN
          </span>
          <span className="text-[11px] leading-4 text-[#B3B3B3]">{t("Admin Portal")}</span>
        </span>
      </div>

      <TopBarSearch />

      <div className="ms-auto flex shrink-0 items-center gap-1">
        <LocaleSwitcher />
        <ThemeToggle />
        <button
          type="button"
          aria-label={t("Help")}
          onClick={() => console.log("Help")}
          className="hidden size-8 items-center justify-center rounded-[2px] text-white hover:bg-white/10 sm:flex"
        >
          <InfoIcon className="size-[18px]" />
        </button>
        <button
          type="button"
          aria-label={t("Notifications")}
          onClick={() => console.log("Notifications")}
          className="flex size-8 items-center justify-center rounded-[2px] text-white hover:bg-white/10"
        >
          <BellIcon className="size-[18px]" />
        </button>
        <UserMenu />
      </div>
    </header>
  );
}
