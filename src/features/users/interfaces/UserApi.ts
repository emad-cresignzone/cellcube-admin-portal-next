import type { AvatarTone } from "@/types/avatar";
import type { RoleId } from "@/types/role";

export type UserStatus = "active" | "invited" | "locked" | "suspended";

export type TwoFactorState = "enabled" | "required";

export interface UserPermission {
  key: string;
  granted: boolean;
}

export interface UserActivity {
  id: string;
  time: string;
  action: string;
  target: string;
  /** Empty for activity the system recorded itself. */
  ip: string;
}

export interface UserSecurity {
  twoFactorDetail: string;
  sessionsDetail: string;
  passwordDetail: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  roleIds: RoleId[];
  twoFactor: TwoFactorState;
  status: UserStatus;
  /** Empty until the first sign-in. */
  lastSignIn: string;
  lastIp: string;
  avatarTone: AvatarTone;
  phone: string;
  department: string;
  group: string;
  managerId: string;
  provisioned: string;
  customers: string[];
  permissions: UserPermission[];
  activitySummary: string;
  activity: UserActivity[];
  security: UserSecurity;
}
