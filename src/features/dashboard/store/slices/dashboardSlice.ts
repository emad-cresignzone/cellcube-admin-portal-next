import { createSlice } from "@reduxjs/toolkit";
import { applySetInitialList } from "@/utils/listReducers";
import type { DashboardKpi } from "../../interfaces/DashboardApi";
import { initialDashboardState } from "../initials/dashboard";

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: initialDashboardState,
  reducers: {
    setInitialDashboard: applySetInitialList<DashboardKpi>,
  },
});

export const { setInitialDashboard } = dashboardSlice.actions;
export default dashboardSlice.reducer;
