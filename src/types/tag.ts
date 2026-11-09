/**
 * Square tag colour vocabulary.
 *
 * Lives in `types/` so seed data can name a tone without importing from
 * `components/`.
 */
export const tagTones = ["plum", "teal", "warn", "neutral"] as const;

export type TagTone = (typeof tagTones)[number];
