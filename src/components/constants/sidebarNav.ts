import { HomeIcon } from "@/Icons/HomeIcon";
import { KeyIcon } from "@/Icons/KeyIcon";
import { ShieldIcon } from "@/Icons/ShieldIcon";
import { SunIcon } from "@/Icons/SunIcon";
import { UsersIcon } from "@/Icons/UsersIcon";
import type { SidebarSection } from "../interfaces/LayoutsProps";

/**
 * The rail. Counts are the design's literal figures: the rail is chrome and
 * cannot read a feature's slice.
 *
 * User management owns the personal `/settings/*` sections too — they have no
 * rail entry of their own, and something has to stay lit on them.
 */
export const sidebarSections: SidebarSection[] = [
  {
    headingKey: "Overview",
    items: [
      {
        labelKey: "Dashboard",
        href: "/",
        icon: HomeIcon,
        filledWhenActive: true,
      },
    ],
  },
  {
    headingKey: "Identity",
    items: [
      {
        labelKey: "User management",
        href: "/settings/administrators",
        icon: UsersIcon,
        count: 12,
        matches: [
          "/settings/administrators",
          "/settings/profile",
          "/settings/display",
          "/settings/shortcuts",
          "/settings/integrations",
          "/settings/configuration",
        ],
      },
      {
        labelKey: "Roles & permissions",
        href: "/settings/roles-permissions",
        icon: KeyIcon,
        count: 4,
      },
    ],
  },
  {
    headingKey: "Trust",
    items: [
      {
        labelKey: "Audit & compliance",
        href: "/audit",
        icon: ShieldIcon,
        count: 3,
        countTone: "danger",
      },
      {
        labelKey: "System settings",
        href: "/system-settings/security",
        icon: SunIcon,
        matches: ["/system-settings"],
      },
    ],
  },
];
