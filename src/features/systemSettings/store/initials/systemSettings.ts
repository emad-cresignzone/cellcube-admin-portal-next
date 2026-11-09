import { createListState } from "@/utils/createListState";
import { integrationsData, settingsSectionsData } from "../../constants/systemSettingsData";

export const initialSettingsSectionsState = createListState(settingsSectionsData);

export const initialIntegrationsState = createListState(integrationsData);
