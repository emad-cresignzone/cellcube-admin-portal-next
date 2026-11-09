"use client";

import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { CardBody } from "@/components/ui/CardBody";
import { CardHeader } from "@/components/ui/CardHeader";
import type { UserCardProps } from "../interfaces/UsersProps";

export default function CustomerAccessCard({ user }: UserCardProps) {
  return (
    <Card>
      <CardHeader titleKey="Customer access" subtitleKey="Sites this user can see" />
      <CardBody className="flex flex-wrap gap-1.5">
        {user.customers.map((customer) => (
          <Badge key={customer} tone="brand">
            {customer}
          </Badge>
        ))}
      </CardBody>
    </Card>
  );
}
