import type { MessageKey } from "@/lib/i18n/interfaces/I18nProps";

export interface SettingRow {
  id: string;
  label: string;
  value: string;
  hint?: string;
}

export interface SettingsSection {
  id: string;
  titleKey: MessageKey;
  subtitleKey?: MessageKey;
  rows: SettingRow[];
}

export type IntegrationStatus = "healthy" | "warn" | "off";

export interface Integration {
  id: string;
  name: string;
  type: string;
  status: IntegrationStatus;
  health: string;
}
