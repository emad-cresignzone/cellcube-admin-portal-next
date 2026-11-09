"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CardBody } from "@/components/ui/CardBody";
import { CardHeader } from "@/components/ui/CardHeader";
import { useI18n } from "@/context/I18nProvider";
import { CheckIcon } from "@/Icons/CheckIcon";
import { SaveIcon } from "@/Icons/SaveIcon";
import InputField from "@/packages/inputField/components/InputField";
import { useUserDetail } from "../hooks/useUserDetail";
import type { UserTabProps } from "../interfaces/UsersProps";
import { roleNames } from "../utils/userDetail";

/**
 * The permission list.
 *
 * Shows the granted permissions as checks; in the edit session each of the
 * user's permissions turns into a checkbox in the same place. The draft stays
 * `null` until something is toggled, so an untouched session reads straight
 * from the saved record.
 */
export default function UserPermissionsCard({ userId }: UserTabProps) {
  const { t } = useI18n();

  /**
   * --------------------------------------------------
   *  Reducers
   * --------------------------------------------------
   */
  const { user, editingSection, cancelEdit, savePermissions } = useUserDetail(userId);

  /**
   * --------------------------------------------------
   *  Variables
   * --------------------------------------------------
   */
  const [draft, setDraft] = useState<string[] | null>(null);

  const editing = editingSection === "permissions";
  const saved = user?.permissions.filter((permission) => permission.granted) ?? [];
  const checked = draft ?? saved.map((permission) => permission.key);
  const listed = editing ? (user?.permissions ?? []) : saved;

  /**
   * --------------------------------------------------
   *  Methods
   * --------------------------------------------------
   */
  const toggle = (key: string) =>
    setDraft(checked.includes(key) ? checked.filter((entry) => entry !== key) : [...checked, key]);

  const cancel = () => {
    setDraft(null);
    cancelEdit();
  };

  const save = () => {
    savePermissions(checked);
    setDraft(null);
  };

  /**
   * --------------------------------------------------
   *  Mutations
   * --------------------------------------------------
   */
  // Leaving the tab ends the session, so a draft cannot outlive its list.
  useEffect(
    () => () => {
      cancelEdit();
    },
    [cancelEdit],
  );

  /**
   * --------------------------------------------------
   *  Conditions
   * --------------------------------------------------
   */
  if (!user) return null;

  return (
    <Card>
      <CardHeader
        titleKey="Permissions inherited from role"
        subtitleKey="Role: {{roles}}"
        subtitleParams={{ roles: roleNames(user) }}
      />
      <CardBody>
        <ul className="grid md:grid-cols-2">
          {listed.map((permission) => (
            <li key={permission.key} className="flex h-[34px] items-center">
              {editing ? (
                <InputField
                  name={`permission-${permission.key}`}
                  type="checkbox"
                  label={permission.key}
                  value={checked.includes(permission.key)}
                  onChange={() => toggle(permission.key)}
                  containerClassName="[&_input]:mt-0 [&_label]:items-center [&_span]:font-mono [&_span]:text-xs"
                />
              ) : (
                <span className="flex items-center gap-2.5 font-mono text-xs text-ink">
                  <CheckIcon className="size-3.5 shrink-0 text-success" />
                  {permission.key}
                </span>
              )}
            </li>
          ))}
        </ul>

        {editing && (
          <div className="mt-4 flex items-center justify-end gap-2.5 border-t border-border pt-4">
            <Button variant="ghost" onClick={cancel}>
              {t("Cancel")}
            </Button>
            <Button variant="primary" onClick={save}>
              <SaveIcon className="size-4" />
              {t("Save changes")}
            </Button>
          </div>
        )}
      </CardBody>
    </Card>
  );
}
