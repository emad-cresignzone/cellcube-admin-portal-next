"use client";

import { Card } from "@/components/ui/Card";
import { CardBody } from "@/components/ui/CardBody";
import { CardHeader } from "@/components/ui/CardHeader";
import { CheckIcon } from "@/Icons/CheckIcon";
import type { RoleCardProps } from "../interfaces/RolesProps";

export default function RolePermissionsCard({ role }: RoleCardProps) {
  return (
    <Card>
      <CardHeader
        titleKey="Permissions"
        subtitleKey="{{count}} grants · grouped by domain"
        subtitleParams={{ count: role.grantCount }}
      />
      <CardBody className="flex flex-col gap-3.5">
        {role.groups.map((group) => (
          <div key={group.domain}>
            <h3 className="text-[11px] font-bold uppercase leading-5 tracking-[0.44px] text-muted">
              {group.domain}
            </h3>
            <div className="grid gap-1.5 pt-1.5 sm:grid-cols-2 xl:grid-cols-3">
              {group.grants.map((grant) => (
                <div
                  key={grant}
                  className="flex items-center gap-2.5 rounded-[4px] border border-divider px-[11px] py-[7px]"
                >
                  <CheckIcon className="size-3.5 shrink-0 text-success" />
                  <span className="font-mono text-xs leading-5 text-ink">{grant}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </CardBody>
    </Card>
  );
}
