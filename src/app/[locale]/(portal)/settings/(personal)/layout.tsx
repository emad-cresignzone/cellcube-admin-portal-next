import type { ReactNode } from "react";
import SettingsHeader from "@/features/settings/components/SettingsHeader";
import SettingsNav from "@/features/settings/components/SettingsNav";

/**
 * The personal settings frame.
 *
 * A route group, not a layout on `/settings`: the administrators and roles
 * modules also live under that path, and their designs have no side nav.
 *
 * `min-w-0` on both the row and the content column keeps a wide table
 * scrolling inside itself instead of stretching the page.
 */
export default function PersonalSettingsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-w-0 flex-col gap-4">
      <SettingsHeader />

      <div className="flex min-w-0 flex-col items-stretch gap-4 lg:flex-row lg:items-start">
        <SettingsNav />
        <div className="flex min-w-0 flex-1 flex-col gap-4">{children}</div>
      </div>
    </div>
  );
}
