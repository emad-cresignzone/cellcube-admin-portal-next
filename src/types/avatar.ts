/**
 * Avatar colour vocabulary.
 *
 * Lives in `types/` rather than next to the component so data and feature
 * modules can reference it without importing from `components/`.
 */
export const avatarTones = ["blue", "red", "purple", "teal", "neutral"] as const;

export type AvatarTone = (typeof avatarTones)[number];
