"use client";

import { PanelLeft } from "lucide-react";
import { useSidebar } from "@/context/SidebarProvider";
import { useI18n } from "@/context/I18nProvider";

/** Opens and closes the sidebar. Lives in the top bar so it stays reachable
 *  when the sidebar itself is off screen. */
export default function SidebarToggle() {
  const { open, toggleOpen } = useSidebar();
  const { t } = useI18n();

  /**
   * --------------------------------------------------
   *  Variables
   * --------------------------------------------------
   */
  const label = open ? t("Close sidebar") : t("Open sidebar");

  return (
    <button
      type="button"
      onClick={toggleOpen}
      aria-label={label}
      aria-expanded={open}
      aria-controls="portal-sidebar"
      title={label}
      className="flex size-8 shrink-0 items-center justify-center rounded-[2px] text-white/85 hover:bg-white/10"
    >
      <PanelLeft className="size-[18px] rtl:rotate-180" />
    </button>
  );
}
