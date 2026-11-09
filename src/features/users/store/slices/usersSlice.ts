import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { applySetInitialList } from "@/utils/listReducers";
import type { User } from "../../interfaces/UserApi";
import type { UserProfileFormValues } from "../../interfaces/UsersProps";
import { initialUsersState } from "../initials/users";
import type { UserEditSession } from "../interfaces/users";

/**
 * Saves stay in this slice on purpose: the portal has no backend, so a saved
 * profile lives for the session. A thunk slots in front of these reducers on
 * the day it does.
 */
const usersSlice = createSlice({
  name: "users",
  initialState: initialUsersState,
  reducers: {
    setInitialUsers: applySetInitialList<User>,
    beginUserEdit: (state, action: PayloadAction<UserEditSession>) => {
      state.edit = action.payload;
    },
    endUserEdit: (state) => {
      state.edit = null;
    },
    saveUserProfile: (
      state,
      action: PayloadAction<{ id: string; values: UserProfileFormValues }>,
    ) => {
      const user = state.items.find((entry) => entry.id === action.payload.id);
      if (user) Object.assign(user, action.payload.values);
      state.edit = null;
    },
    saveUserPermissions: (state, action: PayloadAction<{ id: string; granted: string[] }>) => {
      const user = state.items.find((entry) => entry.id === action.payload.id);
      if (user) {
        user.permissions = user.permissions.map((permission) => ({
          ...permission,
          granted: action.payload.granted.includes(permission.key),
        }));
      }
      state.edit = null;
    },
  },
});

export const {
  setInitialUsers,
  beginUserEdit,
  endUserEdit,
  saveUserProfile,
  saveUserPermissions,
} = usersSlice.actions;
export default usersSlice.reducer;
