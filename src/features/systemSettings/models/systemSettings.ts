import { integrationsData, settingsSectionsData } from "../constants/systemSettingsData";
import type { Integration, SettingsSection } from "../interfaces/SystemSettingsApi";

/**
 * --------------------------------------------------
 *  Functions
 * --------------------------------------------------
 */
export const fetchSettingsSections = async (): Promise<SettingsSection[]> => settingsSectionsData;

export const fetchIntegrations = async (): Promise<Integration[]> => integrationsData;
