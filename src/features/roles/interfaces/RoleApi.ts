import type { RoleId } from "@/types/role";

export interface RolePermissionGroup {
  domain: string;
  grants: string[];
}

export interface RoleChange {
  id: string;
  change: string;
  meta: string;
}

export interface Role {
  id: RoleId;
  description: string;
  /** The figure the design prints beside the role, not a count of members. */
  userCount: number;
  /** The grants previewed on the overview card; the rest fold into "+ n more". */
  previewGrants: string[];
  hiddenGrantCount: number;
  grantCount: number;
  /** The Administrator role cannot be changed, so it offers no save. */
  editable: boolean;
  groups: RolePermissionGroup[];
  history: RoleChange[];
}
