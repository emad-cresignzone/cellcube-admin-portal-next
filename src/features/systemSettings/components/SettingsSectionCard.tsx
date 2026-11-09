"use client";

import { Card } from "@/components/ui/Card";
import { CardBody } from "@/components/ui/CardBody";
import { CardHeader } from "@/components/ui/CardHeader";
import type { SettingsSectionCardProps } from "../interfaces/SystemSettingsProps";
import SettingRowItem from "./SettingRowItem";

export default function SettingsSectionCard({ section }: SettingsSectionCardProps) {
  return (
    <Card>
      <CardHeader titleKey={section.titleKey} subtitleKey={section.subtitleKey} />
      <CardBody>
        {section.rows.map((row) => (
          <SettingRowItem key={row.id} row={row} />
        ))}
      </CardBody>
    </Card>
  );
}
