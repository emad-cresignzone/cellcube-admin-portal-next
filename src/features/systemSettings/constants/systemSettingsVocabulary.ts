import type { BadgeTone, Tab } from "@/components/interfaces/UiProps";
import type { MessageKey } from "@/lib/i18n/interfaces/I18nProps";
import type { IntegrationStatus } from "../interfaces/SystemSettingsApi";

/** Integration status → badge colour and message id. */
export const integrationStatusBadge: Record<
  IntegrationStatus,
  { tone: BadgeTone; labelKey: MessageKey }
> = {
  healthy: { tone: "success", labelKey: "Healthy" },
  warn: { tone: "warn", labelKey: "Warn" },
  off: { tone: "off", labelKey: "Off" },
};

export const systemSettingsTabs: Tab[] = [
  { labelKey: "Security", href: "/system-settings/security" },
  { labelKey: "Authentication", href: "/system-settings/authentication" },
  { labelKey: "Sessions", href: "/system-settings/sessions" },
  { labelKey: "Audit retention", href: "/system-settings/audit-retention" },
  { labelKey: "Integrations", href: "/system-settings/integrations" },
  { labelKey: "Branding", href: "/system-settings/branding" },
];
