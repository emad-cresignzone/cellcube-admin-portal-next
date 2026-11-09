"use client";

import { Button } from "@/components/ui/Button";
import { useI18n } from "@/context/I18nProvider";
import type { SettingRowItemProps } from "../interfaces/SystemSettingsProps";

/** Name on the left, value and its Change action on the right. */
export default function SettingRowItem({ row }: SettingRowItemProps) {
  const { t } = useI18n();

  return (
    <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1 border-b border-divider py-2.5">
      <div className="min-w-0">
        <p className="text-[13px] font-semibold leading-5 text-ink">{row.label}</p>
        {row.hint && <p className="pt-0.5 text-[11px] leading-5 text-muted">{row.hint}</p>}
      </div>
      <div className="flex items-center gap-2.5">
        <span className="text-[13px] leading-5 text-ink">{row.value}</span>
        <Button variant="ghost" size="sm" onClick={() => console.log(`Change ${row.label}`)}>
          {t("Change")}
        </Button>
      </div>
    </div>
  );
}
