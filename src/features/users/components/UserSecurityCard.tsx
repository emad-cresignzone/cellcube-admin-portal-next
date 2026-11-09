"use client";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CardHeader } from "@/components/ui/CardHeader";
import { useI18n } from "@/context/I18nProvider";
import { KeyIcon } from "@/Icons/KeyIcon";
import { LockIcon } from "@/Icons/LockIcon";
import { twoFactorLabels } from "../constants/userVocabulary";
import { useUserDetail } from "../hooks/useUserDetail";
import type { UserTabProps } from "../interfaces/UsersProps";

export default function UserSecurityCard({ userId }: UserTabProps) {
  const { t } = useI18n();

  /**
   * --------------------------------------------------
   *  Reducers
   * --------------------------------------------------
   */
  const { user } = useUserDetail(userId);

  /**
   * --------------------------------------------------
   *  Variables
   * --------------------------------------------------
   */
  const row = "flex flex-wrap items-center justify-between gap-3 border-b border-divider py-3 last:border-b-0";
  const title = "text-[13px] font-semibold leading-5 text-ink";
  const detail = "text-xs leading-5 text-muted";

  /**
   * --------------------------------------------------
   *  Conditions
   * --------------------------------------------------
   */
  if (!user) return null;

  return (
    <Card>
      <CardHeader titleKey="Security" />
      <div className="px-4">
        <div className={row}>
          <div>
            <p className={title}>{t("Two-factor authentication")}</p>
            <p className={detail}>{user.security.twoFactorDetail}</p>
          </div>
          <Badge tone={user.twoFactor === "enabled" ? "success" : "warn"} dot>
            {t(twoFactorLabels[user.twoFactor])}
          </Badge>
        </div>
        <div className={row}>
          <div>
            <p className={title}>{t("Active sessions")}</p>
            <p className={detail}>{user.security.sessionsDetail}</p>
          </div>
          <Button variant="danger" size="sm" onClick={() => console.log("Revoke all")}>
            <LockIcon className="size-3.5" />
            {t("Revoke all")}
          </Button>
        </div>
        <div className={row}>
          <div>
            <p className={title}>{t("Password")}</p>
            <p className={detail}>{user.security.passwordDetail}</p>
          </div>
          <Button size="sm" onClick={() => console.log("Reset")}>
            <KeyIcon className="size-3.5" />
            {t("Reset")}
          </Button>
        </div>
      </div>
    </Card>
  );
}
