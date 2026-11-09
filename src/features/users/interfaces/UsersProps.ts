import type { ReactNode } from "react";
import type { RoleId } from "@/types/role";
import type { User } from "./UserApi";

/** The two tabs whose content the Edit profile button can switch to editing. */
export type UserEditSection = "profile" | "permissions";

export interface UserProfileFormValues {
  name: string;
  email: string;
  roleIds: RoleId[];
  department: string;
  phone: string;
  managerId: string;
  group: string;
}

export interface UserTabProps {
  userId: string;
}

export interface UserDetailLayoutProps {
  userId: string;
  /** The personal profile page shows the same frame, without the admin tabs. */
  withTabs?: boolean;
  children: ReactNode;
}

export interface UserCardProps {
  user: User;
}
