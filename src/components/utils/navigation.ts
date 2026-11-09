/** True when the path sits at, or below, any of the given section prefixes. */
export function isActive(path: string, prefixes: readonly string[]): boolean {
  return prefixes.some((prefix) => path === prefix || path.startsWith(`${prefix}/`));
}
