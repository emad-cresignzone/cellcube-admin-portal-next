"use client";

import { useMemo } from "react";
import { Check, X } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import FilterChips from "@/components/ui/FilterChips";
import PageHeader from "@/components/ui/PageHeader";
import { useI18n } from "@/context/I18nProvider";
import { ExternalLinkIcon } from "@/Icons/ExternalLinkIcon";
import { FilterIcon } from "@/Icons/FilterIcon";
import GeneralTable from "@/packages/generalTable/components/GeneralTable";
import type { GeneralTableColumn } from "@/packages/generalTable/interfaces/GeneralTableProps";
import { auditSeverityBadge } from "../constants/auditVocabulary";
import { useAuditEvents } from "../hooks/useAuditEvents";
import type { AuditEvent } from "../interfaces/AuditApi";
import { auditChips } from "../utils/auditChips";

export default function AuditScreen() {
  const { t } = useI18n();

  /**
   * --------------------------------------------------
   *  Reducers
   * --------------------------------------------------
   */
  const { events } = useAuditEvents();

  /**
   * --------------------------------------------------
   *  Variables
   * --------------------------------------------------
   */
  const chips = useMemo(() => auditChips(events, t), [events, t]);

  const columns: GeneralTableColumn<AuditEvent>[] = useMemo(
    () => [
      {
        key: "time",
        label: t("Time"),
        render: (row) => <span className="font-mono text-[11px] text-muted">{row.time}</span>,
      },
      {
        key: "actor",
        label: t("Actor"),
        render: (row) => <span className="font-semibold">{row.actor}</span>,
      },
      {
        key: "action",
        label: t("Action"),
        render: (row) => <span className="font-mono text-xs">{row.action}</span>,
      },
      {
        key: "target",
        label: t("Target"),
        render: (row) => <span className="font-mono text-xs">{row.target}</span>,
      },
      {
        key: "outcome",
        label: t("Outcome"),
        render: (row) =>
          row.outcome === "ok" ? (
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#107C10]">
              <Check className="size-3" strokeWidth={2.5} />
              {t("ok")}
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-danger">
              <X className="size-3" strokeWidth={2.5} />
              {t("deny")}
            </span>
          ),
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
      {
        key: "ip",
        label: t("IP"),
        render: (row) => (
          <span className="font-mono text-[11px] text-muted">{row.ip || "—"}</span>
        ),
      },
      {
        key: "detail",
        label: t("Detail"),
        render: (row) => <span className="text-xs text-ink-secondary">{row.detail}</span>,
      },
    ],
    [t],
  );

  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        titleKey="Audit & compliance"
        subtitleKey="All logins, permission changes, exports, system changes, failed actions · {{months}}-month retention"
        subtitleParams={{ months: 24 }}
        actions={
          <>
            <Button onClick={() => console.log("Filters")}>
              <FilterIcon className="size-4" />
              {t("Filters")}
            </Button>
            <Button onClick={() => console.log("Export CSV")}>
              <ExternalLinkIcon className="size-4" />
              {t("Export CSV")}
            </Button>
          </>
        }
      />

      <FilterChips
        chips={chips}
        value="all"
        onChange={(id) => console.log(chips.find((chip) => chip.id === id)?.label)}
      />

      <GeneralTable
        data={events}
        columns={columns}
        getRowId={(row) => row.id}
        paginated={false}
        minWidth="1100px"
      />
    </div>
  );
}
