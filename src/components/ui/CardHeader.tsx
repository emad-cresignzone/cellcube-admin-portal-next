"use client";

import { useI18n } from "@/context/I18nProvider";
import type { CardHeaderProps } from "../interfaces/UiProps";

export function CardHeader({
  title,
  titleKey,
  titleParams,
  subtitle,
  subtitleKey,
  subtitleParams,
  action,
}: CardHeaderProps) {
  const { t } = useI18n();

  /**
   * --------------------------------------------------
   *  Variables
   * --------------------------------------------------
   */
  const heading = titleKey ? t(titleKey, titleParams) : title;
  const sub = subtitleKey ? t(subtitleKey, subtitleParams) : subtitle;

  return (
    <header className="flex items-center justify-between gap-4 border-b border-divider px-4 pb-[13px] pt-3">
      <div className="min-w-0">
        <h2 className="text-sm font-semibold text-ink">{heading}</h2>
        {sub && <p className="truncate text-xs text-muted">{sub}</p>}
      </div>
      {action}
    </header>
  );
}
