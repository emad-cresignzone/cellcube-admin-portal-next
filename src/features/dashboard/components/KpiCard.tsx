"use client";

import clsx from "clsx";
import { useI18n } from "@/context/I18nProvider";
import { kpiIcons } from "../constants/kpiIcons";
import type { KpiCardProps } from "../interfaces/DashboardProps";

export default function KpiCard({ kpi }: KpiCardProps) {
  const { t } = useI18n();

  /**
   * --------------------------------------------------
   *  Variables
   * --------------------------------------------------
   */
  const Icon = kpiIcons[kpi.id];

  return (
    <section
      className={clsx(
        "rounded-[4px] border p-4",
        kpi.alert ? "border-danger-line bg-danger-bg" : "border-border bg-surface",
      )}
    >
      <div className="flex items-center justify-between">
        <h2
          className={clsx(
            "text-[11px] font-semibold uppercase leading-5 tracking-[0.6px]",
            kpi.alert ? "text-danger-deep" : "text-muted",
          )}
        >
          {t(kpi.labelKey)}
        </h2>
        <Icon className="size-4 text-ink" />
      </div>
      <p
        className={clsx(
          "pt-2 text-[32px] font-semibold leading-10",
          kpi.alert ? "text-danger-deep" : "text-ink",
        )}
      >
        {kpi.value}
      </p>
      <p className="pt-0.5 text-xs leading-5 text-muted">{kpi.hint}</p>
    </section>
  );
}
