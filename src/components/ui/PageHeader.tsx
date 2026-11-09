"use client";

import { useI18n } from "@/context/I18nProvider";
import type { PageHeaderProps } from "../interfaces/UiProps";

export default function PageHeader({
  title,
  titleKey,
  titleParams,
  subtitle,
  subtitleKey,
  subtitleParams,
  actions,
}: PageHeaderProps) {
  const { t } = useI18n();

  /**
   * --------------------------------------------------
   *  Variables
   * --------------------------------------------------
   */
  const heading = titleKey ? t(titleKey, titleParams) : title;
  const sub = subtitleKey ? t(subtitleKey, subtitleParams) : subtitle;

  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div className="min-w-0">
        <h1 className="text-2xl font-semibold leading-8 text-ink">{heading}</h1>
        {sub && <p className="pt-0.5 text-[13px] leading-5 text-muted">{sub}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}
