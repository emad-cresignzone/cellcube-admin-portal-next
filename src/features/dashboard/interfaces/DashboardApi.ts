import type { MessageKey } from "@/lib/i18n/interfaces/I18nProps";

export type DashboardKpiId = "users" | "two-factor" | "failed-logins" | "audit-retention";

export interface DashboardKpi {
  id: DashboardKpiId;
  labelKey: MessageKey;
  value: string;
  hint: string;
  /** The one figure that needs attention paints the whole card. */
  alert?: boolean;
}
