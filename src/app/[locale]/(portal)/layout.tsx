"use client";

import clsx from "clsx";
import TopBar from "@/components/layouts/TopBar";
import Sidebar from "@/components/layouts/Sidebar";
import { useSidebar } from "@/context/SidebarProvider";

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  const { collapsed, open } = useSidebar();

  return (
    <>
      <TopBar />
      <Sidebar />
      <main
        className={clsx(
          "mt-12 max-w-[1480px] px-3 pb-8 pt-5 transition-[margin] duration-200 sm:px-6",
          "ms-0",
          open && (collapsed ? "lg:ms-14" : "lg:ms-60"),
        )}
      >
        {children}
      </main>
    </>
  );
}
