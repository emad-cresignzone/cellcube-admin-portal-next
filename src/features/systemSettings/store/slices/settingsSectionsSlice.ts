import { createSlice } from "@reduxjs/toolkit";
import { applySetInitialList } from "@/utils/listReducers";
import type { SettingsSection } from "../../interfaces/SystemSettingsApi";
import { initialSettingsSectionsState } from "../initials/systemSettings";

const settingsSectionsSlice = createSlice({
  name: "settingsSections",
  initialState: initialSettingsSectionsState,
  reducers: {
    setInitialSettingsSections: applySetInitialList<SettingsSection>,
  },
});

export const { setInitialSettingsSections } = settingsSectionsSlice.actions;
export default settingsSectionsSlice.reducer;
