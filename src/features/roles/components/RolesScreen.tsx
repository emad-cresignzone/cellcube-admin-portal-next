"use client";

import { Button } from "@/components/ui/Button";
import PageHeader from "@/components/ui/PageHeader";
import { useI18n } from "@/context/I18nProvider";
import { ExternalLinkIcon } from "@/Icons/ExternalLinkIcon";
import { PlusIcon } from "@/Icons/PlusIcon";
import { useRoles } from "../hooks/useRoles";
import RoleCard from "./RoleCard";

export default function RolesScreen() {
  const { t } = useI18n();

  /**
   * --------------------------------------------------
   *  Reducers
   * --------------------------------------------------
   */
  const { roles } = useRoles();

  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        titleKey="Roles & permissions"
        subtitleKey="{{count}} predefined roles · custom roles allowed by policy"
        subtitleParams={{ count: roles.length }}
        actions={
          <>
            <Button onClick={() => console.log("Export matrix")}>
              <ExternalLinkIcon className="size-4" />
              {t("Export matrix")}
            </Button>
            <Button variant="primary" onClick={() => console.log("New role")}>
              <PlusIcon className="size-4" />
              {t("New role")}
            </Button>
          </>
        }
      />

      <div className="grid gap-4 lg:grid-cols-2">
        {roles.map((role) => (
          <RoleCard key={role.id} role={role} />
        ))}
      </div>
    </div>
  );
}
