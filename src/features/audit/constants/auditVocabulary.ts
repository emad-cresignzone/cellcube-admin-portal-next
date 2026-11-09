import type { BadgeTone } from "@/components/interfaces/UiProps";
import type { MessageKey } from "@/lib/i18n/interfaces/I18nProps";
import type { AuditSeverity } from "../interfaces/AuditApi";

/** Severity → badge colour and message id. */
export const auditSeverityBadge: Record<AuditSeverity, { tone: BadgeTone; labelKey: MessageKey }> = {
  high: { tone: "danger", labelKey: "High" },
  warn: { tone: "warn", labelKey: "Warn" },
  info: { tone: "brand", labelKey: "Info" },
};
