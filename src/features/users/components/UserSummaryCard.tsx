"use client";

import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { CardBody } from "@/components/ui/CardBody";
import { CardHeader } from "@/components/ui/CardHeader";
import { Tag } from "@/components/ui/Tag";
import { useI18n } from "@/context/I18nProvider";
import { roleById } from "@/types/role";
import { twoFactorLabels, userStatusBadge } from "../constants/userVocabulary";
import type { UserCardProps } from "../interfaces/UsersProps";

export default function UserSummaryCard({ user }: UserCardProps) {
  const { t } = useI18n();

  /**
   * --------------------------------------------------
   *  Variables
   * --------------------------------------------------
   */
  const badge = userStatusBadge[user.status];
  const label = "text-[13px] leading-5 text-muted";
  const mono = "font-mono text-[11px] leading-5 text-ink";

  return (
    <Card>
      <CardHeader titleKey="Summary" />
      <CardBody>
        <dl className="flex flex-col gap-2">
          <div className="flex items-center justify-between gap-3">
            <dt className={label}>{t("Role")}</dt>
            <dd className="flex flex-wrap justify-end gap-1">
              {user.roleIds.map((id) => {
                const role = roleById(id);
                return (
                  <Tag key={id} tone={role.tone}>
                    {role.name}
                  </Tag>
                );
              })}
            </dd>
          </div>
          <div className="flex items-center justify-between gap-3">
            <dt className={label}>{t("Status")}</dt>
            <dd>
              <Badge tone={badge.tone} dot>
                {t(badge.labelKey)}
              </Badge>
            </dd>
          </div>
          <div className="flex items-center justify-between gap-3">
            <dt className={label}>{t("2FA")}</dt>
            <dd className="text-[13px] leading-5 text-ink">{t(twoFactorLabels[user.twoFactor])}</dd>
          </div>
          <div className="flex items-center justify-between gap-3">
            <dt className={label}>{t("Last sign-in")}</dt>
            <dd className={mono}>{user.lastSignIn || "—"}</dd>
          </div>
          <div className="flex items-center justify-between gap-3">
            <dt className={label}>{t("Last IP")}</dt>
            <dd className={mono}>{user.lastIp || "—"}</dd>
          </div>
          <div className="flex items-center justify-between gap-3">
            <dt className={label}>{t("Provisioned")}</dt>
            <dd className={mono}>{user.provisioned}</dd>
          </div>
        </dl>
      </CardBody>
    </Card>
  );
}
