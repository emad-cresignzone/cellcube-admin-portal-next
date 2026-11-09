"use client";

import { Card } from "@/components/ui/Card";
import { CardBody } from "@/components/ui/CardBody";
import { CardHeader } from "@/components/ui/CardHeader";
import type { RoleCardProps } from "../interfaces/RolesProps";

export default function RoleHistoryCard({ role }: RoleCardProps) {
  return (
    <Card>
      <CardHeader titleKey="Change history" />
      <CardBody>
        <ul className="flex flex-col gap-2.5">
          {role.history.map((entry) => (
            <li key={entry.id} className="text-xs leading-5">
              <p className="font-semibold text-ink">{entry.change}</p>
              <p className="text-muted">{entry.meta}</p>
            </li>
          ))}
        </ul>
      </CardBody>
    </Card>
  );
}
