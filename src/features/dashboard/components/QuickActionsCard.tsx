"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CardBody } from "@/components/ui/CardBody";
import { CardHeader } from "@/components/ui/CardHeader";
import { useI18n } from "@/context/I18nProvider";
import { ExternalLinkIcon } from "@/Icons/ExternalLinkIcon";
import { KeyIcon } from "@/Icons/KeyIcon";
import { ShieldIcon } from "@/Icons/ShieldIcon";
import { UserPlusIcon } from "@/Icons/UserPlusIcon";

export default function QuickActionsCard() {
  const { t } = useI18n();

  return (
    <Card>
      <CardHeader titleKey="Quick admin actions" />
      {/* Always two columns, as designed. The card narrows with the window, so
          the labels may run out of room: they give up the unused end padding
          first, then truncate — hence the `title`. */}
      <CardBody className="grid gap-2 sm:grid-cols-2">
        <Button className="justify-start pe-1" title={t("Invite user")} onClick={() => console.log("Invite user")}>
          <UserPlusIcon className="size-4" />
          <span className="truncate">{t("Invite user")}</span>
        </Button>
        <Button className="justify-start pe-1" title={t("New role")} onClick={() => console.log("New role")}>
          <KeyIcon className="size-4" />
          <span className="truncate">{t("New role")}</span>
        </Button>
        <Button
          className="justify-start pe-1"
          title={t("Run access review")}
          onClick={() => console.log("Run access review")}
        >
          <ShieldIcon className="size-4" />
          <span className="truncate">{t("Run access review")}</span>
        </Button>
        <Button className="justify-start pe-1" title={t("Export audit")} onClick={() => console.log("Export audit")}>
          <ExternalLinkIcon className="size-4" />
          <span className="truncate">{t("Export audit")}</span>
        </Button>
      </CardBody>
    </Card>
  );
}
