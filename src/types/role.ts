import type { TagTone } from "./tag";

/**
 * The predefined roles.
 *
 * Lives in `types/` because both sides need it: a user names its roles, and a
 * role lists its users. Keeping the vocabulary here is what stops those two
 * features importing each other.
 */
export const roleVocabulary = [
  { id: "administrator", name: "Administrator", tone: "plum" },
  { id: "service", name: "Service", tone: "teal" },
  { id: "partner", name: "Partner", tone: "warn" },
  { id: "read-only", name: "Read-only", tone: "neutral" },
] as const satisfies readonly { id: string; name: string; tone: TagTone }[];

export type RoleId = (typeof roleVocabulary)[number]["id"];

export const roleById = (id: RoleId) => roleVocabulary.find((role) => role.id === id)!;
