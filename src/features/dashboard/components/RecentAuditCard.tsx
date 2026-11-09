"use client";

import { useMemo } from "react";
import Link from "@/components/i18n/Link";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { CardHeader } from "@/components/ui/CardHeader";
import { buttonStyles } from "@/components/utils/buttonStyles";
import { useI18n } from "@/context/I18nProvider";
import { auditSeverityBadge } from "@/features/audit/constants/auditVocabulary";
import type { AuditEvent } from "@/features/audit/interfaces/AuditApi";
import { ArrowRightIcon } from "@/Icons/ArrowRightIcon";
import GeneralTable from "@/packages/generalTable/components/GeneralTable";
import type { GeneralTableColumn } from "@/packages/generalTable/interfaces/GeneralTableProps";
import { useDashboard } from "../hooks/useDashboard";

export default function RecentAuditCard() {
  const { t } = useI18n();

  /**
   * --------------------------------------------------
   *  Reducers
   * --------------------------------------------------
   */
  const { recentEvents } = useDashboard();

  /**
   * --------------------------------------------------
   *  Variables
   * --------------------------------------------------
   */
  const columns: GeneralTableColumn<AuditEvent>[] = useMemo(
    () => [
      {
        key: "time",
        label: t("Time"),
        width: "15%",
        render: (row) => <span className="font-mono text-[11px] text-muted">{row.time}</span>,
      },
      {
        key: "actor",
        label: t("Actor"),
        width: "16%",
        render: (row) => <span className="font-semibold">{row.actor}</span>,
      },
      {
        key: "action",
        label: t("Action"),
        width: "32%",
        render: (row) => <span className="font-mono text-xs">{row.action}</span>,
      },
      {
        key: "target",
        label: t("Target"),
        width: "20%",
        render: (row) => <span className="font-mono text-xs">{row.target}</span>,
      },
      {
        key: "severity",
        label: t("Severity"),
        render: (row) => {
          const badge = auditSeverityBadge[row.severity];
          return (
            <Badge tone={badge.tone} dot>
              {t(badge.labelKey)}
            </Badge>
          );
        },
      },
    ],
    [t],
  );

  return (
    <Card>
      <CardHeader
        titleKey="Recent audit events"
        subtitleKey="Last 8 events · cross-system"
        action={
          <Link href="/audit" className={buttonStyles({ variant: "ghost", size: "sm" })}>
            <ArrowRightIcon className="size-4 rtl:rotate-180" />
            {t("View all")}
          </Link>
        }
      />
      <GeneralTable
        data={recentEvents}
        columns={columns}
        getRowId={(row) => row.id}
        paginated={false}
        minWidth="720px"
        className="rounded-none border-0"
      />
    </Card>
  );
}
