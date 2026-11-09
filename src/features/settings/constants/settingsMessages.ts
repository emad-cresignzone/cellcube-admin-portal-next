import type { MessageKey } from "@/lib/i18n/interfaces/I18nProps";
import type { densityValues, landingValues, themeValues } from "./preferenceForms";

/**
 * Preference value → message id.
 *
 * Messages are keyed by their English sentence, so these vocabularies name
 * their id explicitly instead of building one from the value.
 */
export const themeLabels: Record<(typeof themeValues)[number], MessageKey> = {
  light: "Light",
  dark: "Dark",
  system: "System",
};

export const densityLabels: Record<(typeof densityValues)[number], MessageKey> = {
  compact: "Compact",
  cosy: "Default",
  comfortable: "Comfortable",
};

export const landingLabels: Record<(typeof landingValues)[number], MessageKey> = {
  dashboard: "Dashboard",
  users: "User management",
  roles: "Roles & permissions",
  audit: "Audit & compliance",
  settings: "System settings",
};
