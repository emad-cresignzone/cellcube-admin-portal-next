"use client";

import { useMemo, useState } from "react";
import { Ellipsis } from "lucide-react";
import Avatar from "@/components/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import FilterChips from "@/components/ui/FilterChips";
import PageHeader from "@/components/ui/PageHeader";
import { Tag } from "@/components/ui/Tag";
import { useI18n } from "@/context/I18nProvider";
import { useLocaleRouter } from "@/hooks/useLocaleRouter";
import { AlertTriangleIcon } from "@/Icons/AlertTriangleIcon";
import { ArrowUpToLineIcon } from "@/Icons/ArrowUpToLineIcon";
import { ExternalLinkIcon } from "@/Icons/ExternalLinkIcon";
import { ShieldCheckIcon } from "@/Icons/ShieldCheckIcon";
import { UserPlusIcon } from "@/Icons/UserPlusIcon";
import GeneralTable from "@/packages/generalTable/components/GeneralTable";
import type { GeneralTableColumn } from "@/packages/generalTable/interfaces/GeneralTableProps";
import { roleById } from "@/types/role";
import { initialsOf } from "@/utils/initials";
import { twoFactorLabels, userStatusBadge } from "../constants/userVocabulary";
import { useUsers } from "../hooks/useUsers";
import type { User } from "../interfaces/UserApi";
import { filterUsers, userChips } from "../utils/userChips";

export default function UsersScreen() {
  const { t } = useI18n();
  const router = useLocaleRouter();

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
  const [chipId, setChipId] = useState("all");
  const chips = useMemo(() => userChips(users, t), [users, t]);
  const visibleUsers = useMemo(() => filterUsers(users, chipId), [users, chipId]);

  const columns: GeneralTableColumn<User>[] = useMemo(
    () => [
      {
        key: "user",
        label: t("User"),
        render: (row) => (
          <span className="flex items-center gap-2.5">
            <Avatar initials={initialsOf(row.name)} tone={row.avatarTone} size={28} textSize={11} />
            <span>
              <span className="block font-semibold leading-5">{row.name}</span>
              <span className="block text-[11px] leading-5 text-muted">{row.id}</span>
            </span>
          </span>
        ),
      },
      { key: "email", label: t("Email"), value: (row) => row.email },
      {
        key: "role",
        label: t("Role"),
        render: (row) => (
          <span className="flex flex-wrap gap-1">
            {row.roleIds.map((id) => {
              const role = roleById(id);
              return (
                <Tag key={id} tone={role.tone}>
                  {role.name}
                </Tag>
              );
            })}
          </span>
        ),
      },
      {
        key: "twoFactor",
        label: t("2FA"),
        render: (row) =>
          row.twoFactor === "enabled" ? (
            <span className="inline-flex items-center gap-1.5 text-xs text-ink">
              <ShieldCheckIcon className="size-3.5 text-success" />
              {t(twoFactorLabels.enabled)}
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-xs text-warn-deep">
              <AlertTriangleIcon className="size-3.5 text-warn" />
              {t(twoFactorLabels.required)}
            </span>
          ),
      },
      {
        key: "status",
        label: t("Status"),
        render: (row) => {
          const badge = userStatusBadge[row.status];
          return (
            <Badge tone={badge.tone} dot>
              {t(badge.labelKey)}
            </Badge>
          );
        },
      },
      {
        key: "lastSignIn",
        label: t("Last sign-in"),
        render: (row) => (
          <span className="font-mono text-[11px] text-muted">{row.lastSignIn || "—"}</span>
        ),
      },
      {
        key: "ip",
        label: t("IP"),
        render: (row) => (
          <span className="font-mono text-[11px] text-muted">{row.lastIp || "—"}</span>
        ),
      },
      {
        key: "more",
        label: "",
        width: "56px",
        render: () => (
          <button
            type="button"
            aria-label={t("More actions")}
            onClick={(event) => {
              event.stopPropagation();
              console.log("More Actions");
            }}
            className="grid size-6 place-items-center rounded-[4px] text-ink-secondary hover:bg-chip"
          >
            <Ellipsis className="size-4" strokeWidth={1.5} />
          </button>
        ),
      },
    ],
    [t],
  );

  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        titleKey="User management"
        subtitleKey="All users with access to CellCube · {{count}} total"
        subtitleParams={{ count: users.length }}
        actions={
          <>
            <Button onClick={() => console.log("Export")}>
              <ExternalLinkIcon className="size-4" />
              {t("Export")}
            </Button>
            <Button onClick={() => console.log("Bulk import")}>
              <ArrowUpToLineIcon className="size-4" />
              {t("Bulk import")}
            </Button>
            <Button variant="primary" onClick={() => console.log("Invite user")}>
              <UserPlusIcon className="size-4" />
              {t("Invite user")}
            </Button>
          </>
        }
      />

      <FilterChips chips={chips} value={chipId} onChange={setChipId} />

      <GeneralTable
        data={visibleUsers}
        columns={columns}
        getRowId={(row) => row.id}
        onRowClick={(row) => router.push(`/settings/administrators/${row.id}/profile`)}
        paginated={false}
        minWidth="1160px"
      />
    </div>
  );
}
