"use client";

import { Button } from "@/components/ui/Button";
import PageHeader from "@/components/ui/PageHeader";
import { useI18n } from "@/context/I18nProvider";
import { ExternalLinkIcon } from "@/Icons/ExternalLinkIcon";
import { RefreshIcon } from "@/Icons/RefreshIcon";
import { useDashboard } from "../hooks/useDashboard";
import IntegrationHealthCard from "./IntegrationHealthCard";
import KpiCard from "./KpiCard";
import QuickActionsCard from "./QuickActionsCard";
import RecentAuditCard from "./RecentAuditCard";

export default function DashboardScreen() {
  const { t } = useI18n();

  /**
   * --------------------------------------------------
   *  Reducers
   * --------------------------------------------------
   */
  const { kpis } = useDashboard();

  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        titleKey="Security & compliance overview"
        subtitleKey="All systems healthy · {{users}} active users · {{events}} events in the past hour"
        subtitleParams={{ users: 12, events: 9 }}
        actions={
          <>
            <Button onClick={() => console.log("Refresh")}>
              <RefreshIcon className="size-4" />
              {t("Refresh")}
            </Button>
            <Button onClick={() => console.log("Export report")}>
              <ExternalLinkIcon className="size-4" />
              {t("Export report")}
            </Button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((kpi) => (
          <KpiCard key={kpi.id} kpi={kpi} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <RecentAuditCard />
        <div className="flex flex-col gap-4">
          <IntegrationHealthCard />
          <QuickActionsCard />
        </div>
      </div>
    </div>
  );
}
