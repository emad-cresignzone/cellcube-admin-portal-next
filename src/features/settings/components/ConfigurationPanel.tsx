"use client";

import { SlidersHorizontal } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { CardHeader } from "@/components/ui/CardHeader";
import EmptyState from "@/components/ui/EmptyState";

/** No configuration section has been designed for the admin portal yet. */
export default function ConfigurationPanel() {
  return (
    <Card>
      <CardHeader titleKey="Configuration" />
      <EmptyState
        icon={SlidersHorizontal}
        titleKey="Configuration"
        descriptionKey="No configuration sections are available yet."
      />
    </Card>
  );
}
