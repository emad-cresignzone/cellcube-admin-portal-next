"use client";

import { Button } from "@/components/ui/Button";
import PageHeader from "@/components/ui/PageHeader";
import { useI18n } from "@/context/I18nProvider";
import { HistoryIcon } from "@/Icons/HistoryIcon";
import { SaveIcon } from "@/Icons/SaveIcon";

export default function SystemSettingsHeader() {
  const { t } = useI18n();

  return (
    <PageHeader
      titleKey="System settings"
      subtitleKey="Security rules, password policy, sessions, integrations, audit retention, branding"
      actions={
        <>
          <Button onClick={() => console.log("Change history")}>
            <HistoryIcon className="size-4" />
            {t("Change history")}
          </Button>
          <Button variant="primary" onClick={() => console.log("Save changes")}>
            <SaveIcon className="size-4" />
            {t("Save changes")}
          </Button>
        </>
      }
    />
  );
}
