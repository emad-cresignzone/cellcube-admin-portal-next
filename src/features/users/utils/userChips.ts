import type { FilterChip } from "@/components/interfaces/UiProps";
import type { MessageKey } from "@/lib/i18n/interfaces/I18nProps";
import type { Translate } from "@/types/i18n";
import type { User } from "../interfaces/UserApi";

/** One definition per chip, so a chip's count and its rows can never disagree. */
const userFilters: { id: string; labelKey: MessageKey; matches: (user: User) => boolean }[] = [
  { id: "all", labelKey: "All", matches: () => true },
  { id: "active", labelKey: "Active", matches: (user) => user.status === "active" },
  { id: "invited", labelKey: "Invited", matches: (user) => user.status === "invited" },
  {
    id: "locked",
    labelKey: "Locked / suspended",
    matches: (user) => user.status === "locked" || user.status === "suspended",
  },
  { id: "without-2fa", labelKey: "Without 2FA", matches: (user) => user.twoFactor === "required" },
];

/**
 * --------------------------------------------------
 *  Functions
 * --------------------------------------------------
 */

/** The list chip strip, counted from the rows each chip selects. */
export function userChips(users: User[], t: Translate): FilterChip[] {
  return userFilters.map(({ id, labelKey, matches }) => ({
    id,
    label: t(labelKey),
    count: users.filter(matches).length,
  }));
}

/** The rows a chip selects — an unknown id leaves the list whole. */
export function filterUsers(users: User[], chipId: string): User[] {
  const filter = userFilters.find((entry) => entry.id === chipId);
  return filter ? users.filter(filter.matches) : users;
}
