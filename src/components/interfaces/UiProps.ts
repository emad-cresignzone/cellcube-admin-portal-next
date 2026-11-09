import type { ComponentProps, ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import type { TranslateParams } from "@/lib/i18n/interfaces/I18nProps";
import type { badgeTones } from "@/components/constants/badgeStyles";
import type { TagTone } from "@/types/tag";
import type { MessageKey } from "@/lib/i18n/interfaces/I18nProps";

/*  --------------------------------------------------  Badge  */

export type BadgeTone = keyof typeof badgeTones;

export interface BadgeProps {
  tone?: BadgeTone;
  /** Leading status dot. */
  dot?: boolean;
  children: ReactNode;
  className?: string;
}

export interface TagProps {
  tone: TagTone;
  size?: "sm" | "md";
  children: ReactNode;
}

/*  --------------------------------------------------  Button  */

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

export type ButtonSize = "sm" | "md";

export interface ButtonCommonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  className?: string;
}

export type ButtonProps = ButtonCommonProps & {
  /** Shows a spinner and disables the button while a request is in flight. */
  loading?: boolean;
} & Omit<ComponentProps<"button">, "className" | "children">;

/*  --------------------------------------------------  Card  */

export interface CardProps {
  children: ReactNode;
  className?: string;
}

export interface CardHeaderProps {
  title?: ReactNode;
  /** Dictionary key — wins over `title`. Use `title` only for domain data. */
  titleKey?: MessageKey;
  titleParams?: TranslateParams;
  subtitle?: ReactNode;
  subtitleKey?: MessageKey;
  subtitleParams?: TranslateParams;
  action?: ReactNode;
}

/*  --------------------------------------------------  Chrome  */

export interface EmptyStateProps {
  icon: LucideIcon;
  title?: string;
  titleKey?: MessageKey;
  titleParams?: TranslateParams;
  description?: string;
  descriptionKey?: MessageKey;
  descriptionParams?: TranslateParams;
  action?: ReactNode;
}

export interface FilterChip {
  id: string;
  label: string;
  count?: number;
}

export interface FilterChipsProps {
  chips: FilterChip[];
  value: string;
  onChange: (id: string) => void;
}

export interface Crumb {
  /** Literal label — use for domain data (ticket ids, customer names). */
  label?: string;
  /** Dictionary key — use for UI chrome. Wins over `label`. */
  labelKey?: MessageKey;
  labelParams?: TranslateParams;
  href?: string;
}

export interface BreadcrumbsProps {
  items: Crumb[];
}

export interface PageHeaderProps {
  title?: ReactNode;
  titleKey?: MessageKey;
  titleParams?: TranslateParams;
  subtitle?: ReactNode;
  subtitleKey?: MessageKey;
  subtitleParams?: TranslateParams;
  actions?: ReactNode;
}

export interface Tab {
  /** Dictionary key — tab labels are always UI chrome. */
  labelKey: MessageKey;
  href: string;
  count?: number;
}

export interface TabsProps {
  tabs: Tab[];
}
