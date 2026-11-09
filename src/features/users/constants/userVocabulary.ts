import type { BadgeTone } from "@/components/interfaces/UiProps";
import type { MessageKey } from "@/lib/i18n/interfaces/I18nProps";
import type { TwoFactorState, UserStatus } from "../interfaces/UserApi";

/** Status → badge colour and message id. */
export const userStatusBadge: Record<UserStatus, { tone: BadgeTone; labelKey: MessageKey }> = {
  active: { tone: "success", labelKey: "Active" },
  invited: { tone: "brand", labelKey: "Invited" },
  locked: { tone: "danger", labelKey: "Locked" },
  suspended: { tone: "warn", labelKey: "Suspended" },
};

export const twoFactorLabels: Record<TwoFactorState, MessageKey> = {
  enabled: "Enabled",
  required: "Required",
};

export const departments = [
  "Operations · DACH",
  "Operations · Nordics",
  "Field Service",
  "Customer Success",
  "Compliance",
  "IT & Security",
] as const;

export const userGroups = [
  "Service Team DACH",
  "Service Team Nordics",
  "Partner Access",
  "Audit Board",
  "Platform Admins",
] as const;
