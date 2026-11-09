import type { Tab } from "@/components/interfaces/UiProps";
import type { InputOption } from "@/packages/inputField/interfaces/InputFieldProps";
import { roleById } from "@/types/role";
import type { User } from "../interfaces/UserApi";
import type { UserEditSection, UserProfileFormValues } from "../interfaces/UsersProps";

/**
 * --------------------------------------------------
 *  Functions
 * --------------------------------------------------
 */

/** "Tomás Rojas" → "T. Rojas" — how the design prints a person in a field. */
export function shortNameOf(name: string): string {
  const parts = name.trim().split(/\s+/);
  return parts.length > 1 ? `${parts[0][0]}. ${parts[parts.length - 1]}` : name;
}

/** Administrators are the only people a user can report to. */
export function managerOptions(users: User[]): InputOption[] {
  return users
    .filter((user) => user.roleIds.includes("administrator"))
    .map((user) => ({ value: user.id, label: shortNameOf(user.name) }));
}

export function roleNames(user: User): string {
  return user.roleIds.map((id) => roleById(id).name).join(", ");
}

export function userTabs(userId: string): Tab[] {
  const base = `/settings/administrators/${userId}`;
  return [
    { labelKey: "Profile", href: `${base}/profile` },
    { labelKey: "Permissions", href: `${base}/permissions` },
    { labelKey: "Activity", href: `${base}/activity` },
    { labelKey: "Security", href: `${base}/security` },
  ];
}

/** Which section the Edit profile button edits on this path, if any. */
export function editableSectionOf(path: string): UserEditSection | null {
  if (path.endsWith("/profile")) return "profile";
  if (path.endsWith("/permissions")) return "permissions";
  return null;
}

export function toProfileFormValues(user: User): UserProfileFormValues {
  const { name, email, roleIds, department, phone, managerId, group } = user;
  return { name, email, roleIds, department, phone, managerId, group };
}
