"use client";

import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { Tag } from "@/components/ui/Tag";
import { useI18n } from "@/context/I18nProvider";
import { PencilIcon } from "@/Icons/PencilIcon";
import { SaveIcon } from "@/Icons/SaveIcon";
import { roleById } from "@/types/role";
import { useRoles } from "../hooks/useRoles";
import type { RoleScreenProps } from "../interfaces/RolesProps";
import RoleHistoryCard from "./RoleHistoryCard";
import RoleMembersCard from "./RoleMembersCard";
import RolePermissionsCard from "./RolePermissionsCard";

export default function RoleDetailScreen({ roleId }: RoleScreenProps) {
  const { t } = useI18n();

  /**
   * --------------------------------------------------
   *  Reducers
   * --------------------------------------------------
   */
  const { roles } = useRoles();

  /**
   * --------------------------------------------------
   *  Variables
   * --------------------------------------------------
   */
  const role = roles.find((entry) => entry.id === roleId);
  const { name, tone } = roleById(roleId);

  /**
   * --------------------------------------------------
   *  Conditions
   * --------------------------------------------------
   */
  if (!role) return null;

  return (
    <div className="flex flex-col gap-4">
      <div>
        <Breadcrumbs
          items={[
            { labelKey: "Roles & permissions", href: "/settings/roles-permissions" },
            { label: name },
          ]}
        />
        <div className="flex flex-wrap items-end justify-between gap-4 pt-1">
          <div className="min-w-0">
            <div className="flex items-center gap-3">
              <Tag tone={tone} size="md">
                {name}
              </Tag>
              <span className="text-[13px] text-muted">
                {t("{{count}} users · system role", { count: role.userCount })}
              </span>
            </div>
            <p className="max-w-[700px] pt-2 text-sm leading-5 text-ink">{role.description}</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button onClick={() => console.log("Edit")}>
              <PencilIcon className="size-4" />
              {t("Edit")}
            </Button>
            {/* {role.editable && (
              <Button variant="primary" onClick={() => console.log("Save changes")}>
                <SaveIcon className="size-4" />
                {t("Save changes")}
              </Button>
            )} */}
          </div>
        </div>
      </div>

      <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_340px]">
        <RolePermissionsCard role={role} />
        <div className="flex flex-col gap-4">
          <RoleMembersCard role={role} />
          <RoleHistoryCard role={role} />
        </div>
      </div>
    </div>
  );
}
