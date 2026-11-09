"use client";

import { usePathname } from "next/navigation";
import Avatar from "@/components/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useI18n } from "@/context/I18nProvider";
import { KeyIcon } from "@/Icons/KeyIcon";
import { LockIcon } from "@/Icons/LockIcon";
import { PencilIcon } from "@/Icons/PencilIcon";
import { splitLocale } from "@/lib/i18n/routing";
import { initialsOf } from "@/utils/initials";
import { userStatusBadge } from "../constants/userVocabulary";
import { useUserDetail } from "../hooks/useUserDetail";
import type { UserTabProps } from "../interfaces/UsersProps";
import { editableSectionOf } from "../utils/userDetail";

/** Identity and account actions, above every tab of a user. */
export default function UserHeader({ userId }: UserTabProps) {
  const { t } = useI18n();
  const pathname = usePathname();

  /**
   * --------------------------------------------------
   *  Reducers
   * --------------------------------------------------
   */
  const { user, editingSection, beginEdit } = useUserDetail(userId);

  /**
   * --------------------------------------------------
   *  Variables
   * --------------------------------------------------
   */
  const section = editableSectionOf(splitLocale(pathname ?? "/").path);

  /**
   * --------------------------------------------------
   *  Methods
   * --------------------------------------------------
   */
  // Activity and Security hold nothing editable, and the brief defines no
  // edit behaviour for them, so the button only logs there.
  const onEdit = () => {
    if (section) beginEdit(section);
    else console.log("Edit profile");
  };

  /**
   * --------------------------------------------------
   *  Conditions
   * --------------------------------------------------
   */
  if (!user) return null;

  /**
   * --------------------------------------------------
   *  Render
   * --------------------------------------------------
   */
  const badge = userStatusBadge[user.status];

  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div className="flex min-w-0 items-center gap-4">
        <Avatar initials={initialsOf(user.name)} tone={user.avatarTone} size={36} textSize={13} />
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-xl font-semibold leading-7 text-ink">{user.name}</h1>
            <Badge tone={badge.tone} dot>
              {t(badge.labelKey)}
            </Badge>
          </div>
          <p className="pt-0.5 text-[13px] leading-5 text-muted">
            {user.email} · {user.id}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {!editingSection && (
          <Button onClick={onEdit}>
            <PencilIcon className="size-4" />
            {t("Edit profile")}
          </Button>
        )}
        <Button onClick={() => console.log("Reset password")}>
          <KeyIcon className="size-4" />
          {t("Reset password")}
        </Button>
        <Button variant="danger" onClick={() => console.log("Lock account")}>
          <LockIcon className="size-4" />
          {t("Lock account")}
        </Button>
      </div>
    </div>
  );
}
