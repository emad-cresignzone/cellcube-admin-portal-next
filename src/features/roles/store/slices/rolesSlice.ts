import { createSlice } from "@reduxjs/toolkit";
import { applySetInitialList } from "@/utils/listReducers";
import type { Role } from "../../interfaces/RoleApi";
import { initialRolesState } from "../initials/roles";

const rolesSlice = createSlice({
  name: "roles",
  initialState: initialRolesState,
  reducers: {
    setInitialRoles: applySetInitialList<Role>,
  },
});

export const { setInitialRoles } = rolesSlice.actions;
export default rolesSlice.reducer;
