import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import type { MessageKey } from "@/lib/i18n/interfaces/I18nProps";

/** One choice of a segmented control. */
export interface SegmentedOption {
  value: string;
  label: string;
}

export interface SegmentedControlProps {
  name: string;
  legend: string;
  options: SegmentedOption[];
  value: string;
  onChange: (value: string) => void;
}

/** Formik-bound wrapper around a segmented control. */
export interface SegmentedFieldProps {
  name: string;
  legend: string;
  options: SegmentedOption[];
}

export interface PreferenceRowProps {
  label: ReactNode;
  description?: ReactNode;
  control: ReactNode;
}

export interface DisplayValues {
  theme: string;
  density: string;
  landingScreen: string;
}

export interface SettingsNavItem {
  labelKey: MessageKey;
  href: string;
  icon: LucideIcon;
}

export interface Shortcut {
  id: string;
  actionKey: MessageKey;
  keys: string[];
}
