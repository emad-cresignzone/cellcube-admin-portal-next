"use client";

import { useMemo } from "react";
import Avatar from "@/components/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CardBody } from "@/components/ui/CardBody";
import { CardHeader } from "@/components/ui/CardHeader";
import { useI18n } from "@/context/I18nProvider";
import { userStatusBadge } from "@/features/users/constants/userVocabulary";
import { UserPlusIcon } from "@/Icons/UserPlusIcon";
import { useUsers } from "@/features/users/hooks/useUsers";
import { initialsOf } from "@/utils/initials";
import type { RoleCardProps } from "../interfaces/RolesProps";

export default function RoleMembersCard({ role }: RoleCardProps) {
  const { t } = useI18n();

  /**
   * --------------------------------------------------
   *  Reducers
   * --------------------------------------------------
   */
  const { users } = useUsers();

  /**
   * --------------------------------------------------
   *  Variables
   * --------------------------------------------------
   */
  const members = useMemo(
    () => users.filter((user) => user.roleIds.includes(role.id)),
    [users, role.id],
  );

  return (
    <Card>
      <CardHeader titleKey="{{count}} users assigned" titleParams={{ count: members.length }} />
      <CardBody>
        <ul className="flex flex-col gap-1.5">
          {members.map((user) => {
            const badge = userStatusBadge[user.status];
            return (
              <li key={user.id} className="flex items-center gap-2 text-[13px] leading-[22px] text-ink">
                <Avatar initials={initialsOf(user.name)} tone={user.avatarTone} />
                <span className="min-w-0 flex-1 truncate">{user.name}</span>
                <Badge tone={badge.tone} dot>
                  {t(badge.labelKey)}
                </Badge>
              </li>
            );
          })}
        </ul>
        <div className="mt-3 border-t border-divider pt-3">
          <Button variant="ghost" size="sm" onClick={() => console.log("Assign more users")}>
            <UserPlusIcon className="size-3.5" />
            {t("Assign more users")}
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}
