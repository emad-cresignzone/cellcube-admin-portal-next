import type { Shortcut } from "../interfaces/SettingsProps";

export const shortcuts: Shortcut[] = [
  { id: "command-bar", actionKey: "Open command bar", keys: ["Ctrl", "K"] },
  { id: "go-dashboard", actionKey: "Go to dashboard", keys: ["G", "then", "D"] },
];
