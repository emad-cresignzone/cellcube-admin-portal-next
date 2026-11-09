"use client";

import { useI18n } from "@/context/I18nProvider";
import type { EmptyStateProps } from "../interfaces/UiProps";

export default function EmptyState({
  icon: Icon,
  title,
  titleKey,
  titleParams,
  description,
  descriptionKey,
  descriptionParams,
  action,
}: EmptyStateProps) {
  const { t } = useI18n();

  /**
   * --------------------------------------------------
   *  Variables
   * --------------------------------------------------
   */
  const heading = titleKey ? t(titleKey, titleParams) : title;
  const body = descriptionKey ? t(descriptionKey, descriptionParams) : description;

  return (
    <div className="flex flex-col items-center gap-2 px-4 py-12 text-center">
      <Icon className="size-7 text-outline" strokeWidth={1.5} />
      <p className="text-sm font-semibold text-ink">{heading}</p>
      {body && <p className="max-w-sm text-xs text-muted">{body}</p>}
      {action && <div className="pt-2">{action}</div>}
    </div>
  );
}
