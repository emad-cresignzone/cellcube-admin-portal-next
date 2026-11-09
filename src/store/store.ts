import { configureStore } from "@reduxjs/toolkit";

import AuditStore from "@/features/audit/store/store";
import DashboardStore from "@/features/dashboard/store/store";
import RolesStore from "@/features/roles/store/store";
import SystemSettingsStore from "@/features/systemSettings/store/store";
import UsersStore from "@/features/users/store/store";

/**
 * Root store.
 *
 * Every feature exports a plain object of reducers and it is spread in here,
 * so a state key is always the reducer variable name — `state.usersReducer`,
 * not `state.users`.
 */
export const store = configureStore({
  reducer: {
    ...AuditStore,
    ...DashboardStore,
    ...RolesStore,
    ...SystemSettingsStore,
    ...UsersStore,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
