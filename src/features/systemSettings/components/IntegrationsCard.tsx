"use client";

import { useMemo } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CardHeader } from "@/components/ui/CardHeader";
import { useI18n } from "@/context/I18nProvider";
import GeneralTable from "@/packages/generalTable/components/GeneralTable";
import type { GeneralTableColumn } from "@/packages/generalTable/interfaces/GeneralTableProps";
import { integrationStatusBadge } from "../constants/systemSettingsVocabulary";
import { useIntegrations } from "../hooks/useIntegrations";
import type { Integration } from "../interfaces/SystemSettingsApi";

export default function IntegrationsCard() {
  const { t } = useI18n();

  /**
   * --------------------------------------------------
   *  Reducers
   * --------------------------------------------------
   */
  const { integrations } = useIntegrations();

  /**
   * --------------------------------------------------
   *  Variables
   * --------------------------------------------------
   */
  const columns: GeneralTableColumn<Integration>[] = useMemo(
    () => [
      {
        key: "name",
        label: t("Integration"),
        render: (row) => <span className="font-semibold">{row.name}</span>,
      },
      { key: "type", label: t("Type"), value: (row) => row.type },
      {
        key: "status",
        label: t("Status"),
        render: (row) => {
          const badge = integrationStatusBadge[row.status];
          return (
            <Badge tone={badge.tone} dot>
              {t(badge.labelKey)}
            </Badge>
          );
        },
      },
      {
        key: "health",
        label: t("Health"),
        render: (row) => <span className="text-xs text-ink-secondary">{row.health}</span>,
      },
      {
        key: "configure",
        label: "",
        render: (row) => (
          <Button variant="ghost" size="sm" onClick={() => console.log(`Configure ${row.name}`)}>
            {t("Configure")}
          </Button>
        ),
      },
    ],
    [t],
  );

  return (
    <Card>
      <CardHeader titleKey="Integrations" />
      <GeneralTable
        data={integrations}
        columns={columns}
        getRowId={(row) => row.id}
        paginated={false}
        className="rounded-none border-0"
      />
    </Card>
  );
}
