import type { SettingRow, SettingsSection } from "./SystemSettingsApi";

export interface SettingsSectionsProps {
  sectionIds: readonly string[];
}

export interface SettingsSectionCardProps {
  section: SettingsSection;
}

export interface SettingRowItemProps {
  row: SettingRow;
}
