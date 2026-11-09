"use client";

import { useMemo } from "react";
import { Card } from "@/components/ui/Card";
import { CardHeader } from "@/components/ui/CardHeader";
import { useI18n } from "@/context/I18nProvider";
import GeneralTable from "@/packages/generalTable/components/GeneralTable";
import type { GeneralTableColumn } from "@/packages/generalTable/interfaces/GeneralTableProps";
import { useUserDetail } from "../hooks/useUserDetail";
import type { UserActivity } from "../interfaces/UserApi";
import type { UserTabProps } from "../interfaces/UsersProps";

export default function UserActivityCard({ userId }: UserTabProps) {
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
  const mono = "font-mono text-[11px] text-ink";

  const columns: GeneralTableColumn<UserActivity>[] = useMemo(
    () => [
      {
        key: "time",
        label: t("Time"),
        width: "19%",
        render: (row) => <span className="font-mono text-[11px] text-muted">{row.time}</span>,
      },
      {
        key: "action",
        label: t("Action"),
        width: "37%",
        render: (row) => <span className={mono}>{row.action}</span>,
      },
      {
        key: "target",
        label: t("Target"),
        width: "24%",
        render: (row) => <span className={mono}>{row.target}</span>,
      },
      {
        key: "ip",
        label: t("IP"),
        render: (row) => (
          <span className="font-mono text-[11px] text-muted">{row.ip || "—"}</span>
        ),
      },
    ],
    [t],
  );

  /**
   * --------------------------------------------------
   *  Conditions
   * --------------------------------------------------
   */
  if (!user) return null;

  return (
    <Card>
      <CardHeader titleKey="Recent activity" subtitle={user.activitySummary} />
      <GeneralTable
        data={user.activity}
        columns={columns}
        getRowId={(row) => row.id}
        paginated={false}
        minWidth="640px"
        className="rounded-none border-0"
      />
    </Card>
  );
}
