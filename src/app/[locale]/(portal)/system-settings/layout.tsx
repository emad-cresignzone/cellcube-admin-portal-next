import type { ReactNode } from "react";
import Tabs from "@/components/ui/Tabs";
import SystemSettingsHeader from "@/features/systemSettings/components/SystemSettingsHeader";
import { systemSettingsTabs } from "@/features/systemSettings/constants/systemSettingsVocabulary";

export const metadata = { title: "System settings · CellCube Admin Portal" };

export default function SystemSettingsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-w-0 flex-col gap-4">
      <SystemSettingsHeader />
      <Tabs tabs={systemSettingsTabs} />
      {children}
    </div>
  );
}
