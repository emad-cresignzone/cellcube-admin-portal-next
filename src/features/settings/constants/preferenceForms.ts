import type { DisplayValues } from "../interfaces/SettingsProps";

export const themeValues = ["light", "dark", "system"] as const;

export const densityValues = ["compact", "cosy", "comfortable"] as const;

export const landingValues = ["dashboard", "users", "roles", "audit", "settings"] as const;

export const defaultDisplayValues: DisplayValues = {
  theme: "system",
  density: "cosy",
  landingScreen: "dashboard",
};
