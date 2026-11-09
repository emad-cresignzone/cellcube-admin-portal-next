"use client";

import Link from "@/components/i18n/Link";
import { useI18n } from "@/context/I18nProvider";
import type { BreadcrumbsProps } from "../interfaces/UiProps";

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const { t } = useI18n();

  return (
    <nav aria-label={t("Breadcrumb")} className="flex items-center gap-1.5 text-xs leading-5">
      {items.map((crumb, index) => {
        const label = crumb.labelKey ? t(crumb.labelKey, crumb.labelParams) : crumb.label;
        return (
          <span key={`${label}-${index}`} className="flex items-center gap-1.5">
            {index > 0 && <span className="text-faint">/</span>}
            {crumb.href ? (
              <Link href={crumb.href} className="text-muted hover:text-brand-600 hover:underline">
                {label}
              </Link>
            ) : (
              <span className="font-semibold text-ink">{label}</span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
