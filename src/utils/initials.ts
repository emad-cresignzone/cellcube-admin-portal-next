/**
 * The portal's one way of turning a person's (or group's) name into avatar
 * initials.
 *
 * Every avatar in the app — assignees, comment authors, pinboard authors,
 * reporters — reads from here, so a two-word name always renders the same two
 * letters wherever it appears.
 */

/**
 * --------------------------------------------------
 *  Functions
 * --------------------------------------------------
 */

/**
 * Two upper-case letters for a name: the first letter of the first and last
 * word, or the first two characters of a single word. An empty name has no
 * initials — callers decide what to render instead ("—", a placeholder icon).
 */
export function initialsOf(name: string | null | undefined): string {
  const parts = (name ?? "").trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "";
  const letters =
    parts.length > 1
      ? `${parts[0][0]}${parts[parts.length - 1][0]}`
      : parts[0].slice(0, 2);
  return letters.toUpperCase();
}
