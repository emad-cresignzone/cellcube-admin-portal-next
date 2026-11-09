"use client";

import Link from "@/components/i18n/Link";
import { Tag } from "@/components/ui/Tag";
import { useI18n } from "@/context/I18nProvider";
import { ChevronRightIcon } from "@/Icons/ChevronRightIcon";
import { roleById } from "@/types/role";
import type { RoleCardProps } from "../interfaces/RolesProps";

/** One role on the overview — the whole card opens the role. */
export default function RoleCard({ role }: RoleCardProps) {
  const { t } = useI18n();

  /**
   * --------------------------------------------------
   *  Variables
   * --------------------------------------------------
   */
  const { name, tone } = roleById(role.id);

  return (
    <Link
      href={`/settings/roles-permissions/${role.id}`}
      className="flex flex-col rounded-[4px] border border-border bg-surface p-4 transition-colors hover:border-outline"
    >
      <div className="flex items-center gap-2.5">
        <Tag tone={tone}>{name}</Tag>
        <span className="text-xs text-muted">{t("{{count}} users", { count: role.userCount })}</span>
        <ChevronRightIcon className="ms-auto size-4 text-muted rtl:rotate-180" />
      </div>

      <p className="pt-3 text-[13px] leading-[18px] text-ink">{role.description}</p>

      <div className="mt-3 flex flex-wrap items-center gap-1 border-t border-divider pt-3">
        {role.previewGrants.map((grant) => (
          <code key={grant} className="rounded-[2px] bg-chip px-1.5 py-1 font-mono text-[10px] text-ink-secondary">
            {grant}
          </code>
        ))}
        {role.hiddenGrantCount > 0 && (
          <span className="ps-0.5 text-[11px] text-muted">
            {t("+ {{count}} more", { count: role.hiddenGrantCount })}
          </span>
        )}
      </div>
    </Link>
  );
}
