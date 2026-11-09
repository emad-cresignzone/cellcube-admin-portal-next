import { Keyboard, MonitorCog, Plug, ShieldCheck, SlidersHorizontal, User, UserCog } from "lucide-react";
import type { SettingsNavItem } from "../interfaces/SettingsProps";

export const settingsNavItems: SettingsNavItem[] = [
  { labelKey: "Profile", href: "/settings/profile", icon: User },
  { labelKey: "Display & density", href: "/settings/display", icon: MonitorCog },
  { labelKey: "Keyboard shortcuts", href: "/settings/shortcuts", icon: Keyboard },
  { labelKey: "Integrations", href: "/settings/integrations", icon: Plug },
  { labelKey: "Administrators", href: "/settings/administrators", icon: UserCog },
  { labelKey: "Roles & permissions", href: "/settings/roles-permissions", icon: ShieldCheck },
  { labelKey: "Configuration", href: "/settings/configuration", icon: SlidersHorizontal },
];
