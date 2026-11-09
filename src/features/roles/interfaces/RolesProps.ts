import type { Role } from "./RoleApi";

export interface RoleScreenProps {
  roleId: Role["id"];
}

export interface RoleCardProps {
  role: Role;
}
