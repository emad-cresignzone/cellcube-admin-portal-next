"use client";

import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store/store";
import type { UserEditSection, UserProfileFormValues } from "../interfaces/UsersProps";
import {
  beginUserEdit,
  endUserEdit,
  saveUserPermissions,
  saveUserProfile,
} from "../store/slices/usersSlice";

/** One user, and the edit session every tab of that user shares. */
export function useUserDetail(userId: string) {
  /**
   * --------------------------------------------------
   *  Reducers
   * --------------------------------------------------
   */
  const dispatch = useDispatch<AppDispatch>();
  const { items, edit } = useSelector((state: RootState) => state.usersReducer);

  /**
   * --------------------------------------------------
   *  Variables
   * --------------------------------------------------
   */
  const user = useMemo(() => items.find((entry) => entry.id === userId), [items, userId]);
  const editingSection: UserEditSection | null = edit?.userId === userId ? edit.section : null;

  /**
   * --------------------------------------------------
   *  Methods
   * --------------------------------------------------
   */
  const beginEdit = useCallback(
    (section: UserEditSection) => dispatch(beginUserEdit({ userId, section })),
    [dispatch, userId],
  );

  const cancelEdit = useCallback(() => dispatch(endUserEdit()), [dispatch]);

  const saveProfile = useCallback(
    (values: UserProfileFormValues) => dispatch(saveUserProfile({ id: userId, values })),
    [dispatch, userId],
  );

  const savePermissions = useCallback(
    (granted: string[]) => dispatch(saveUserPermissions({ id: userId, granted })),
    [dispatch, userId],
  );

  return { user, editingSection, beginEdit, cancelEdit, saveProfile, savePermissions };
}
