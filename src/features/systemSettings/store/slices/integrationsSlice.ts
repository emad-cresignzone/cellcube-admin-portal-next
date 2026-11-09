import { createSlice } from "@reduxjs/toolkit";
import { applySetInitialList } from "@/utils/listReducers";
import type { Integration } from "../../interfaces/SystemSettingsApi";
import { initialIntegrationsState } from "../initials/systemSettings";

const integrationsSlice = createSlice({
  name: "integrations",
  initialState: initialIntegrationsState,
  reducers: {
    setInitialIntegrations: applySetInitialList<Integration>,
  },
});

export const { setInitialIntegrations } = integrationsSlice.actions;
export default integrationsSlice.reducer;
