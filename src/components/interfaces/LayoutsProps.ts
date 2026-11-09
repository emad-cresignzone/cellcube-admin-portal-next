import type { ComponentType, SVGProps } from "react";
import type { MessageKey } from "@/lib/i18n/interfaces/I18nProps";

export interface SidebarItem {
  labelKey: MessageKey;
  href: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  /** The icon fills in, rather than only changing colour, on its own page. */
  filledWhenActive?: boolean;
  count?: number;
  countTone?: "neutral" | "danger";
  /** Section prefixes that light this entry — defaults to `href`. */
  matches?: readonly string[];
}

export interface SidebarSection {
  headingKey: MessageKey;
  items: SidebarItem[];
}
