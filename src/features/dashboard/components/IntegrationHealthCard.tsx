"use client";

import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { CardBody } from "@/components/ui/CardBody";
import { CardHeader } from "@/components/ui/CardHeader";
import { useI18n } from "@/context/I18nProvider";
import { integrationStatusBadge } from "@/features/systemSettings/constants/systemSettingsVocabulary";
import { useDashboard } from "../hooks/useDashboard";

export default function IntegrationHealthCard() {
  const { t } = useI18n();

  /**
   * --------------------------------------------------
   *  Reducers
   * --------------------------------------------------
   */
  const { integrations } = useDashboard();

  return (
    <Card>
      <CardHeader titleKey="Integrations" subtitleKey="6 active · 1 warning" />
      <CardBody className="flex flex-col gap-2">
        {integrations.map((integration) => {
          const badge = integrationStatusBadge[integration.status];
          return (
            <div key={integration.id} className="flex items-center justify-between gap-3 py-1">
              <div className="min-w-0">
                <p className="text-[13px] font-semibold leading-5 text-ink">{integration.name}</p>
                <p className="text-[11px] leading-5 text-muted">{integration.type}</p>
              </div>
              <Badge tone={badge.tone} dot>
                {t(badge.labelKey)}
              </Badge>
            </div>
          );
        })}
      </CardBody>
    </Card>
  );
}
