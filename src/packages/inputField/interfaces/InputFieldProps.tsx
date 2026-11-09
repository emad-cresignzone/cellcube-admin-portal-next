import type { KeyboardEvent, ReactNode } from "react";

export type InputFieldType =
  | "text"
  | "email"
  | "tel"
  | "url"
  | "number"
  | "date"
  | "password"
  | "search"
  | "textarea"
  | "select"
  | "checkbox"
  | "toggle"
  | "multiselect";

export type InputValue = string | number | boolean;

export interface InputOption {
  value: string;
  label: string;
  /** Secondary text shown next to the label in multi-selects. */
  hint?: string;
}

export interface InputFieldProps {
  /** Formik field name (also used as the control id) */
  name: string;
  label?: string;
  type?: InputFieldType;
  placeholder?: string;
  /** Options for `select` / `multiselect` — strings or {value,label} objects */
  options?: (string | InputOption)[];
  required?: boolean;
  disabled?: boolean;
  /** Rows for `textarea` */
  rows?: number;
  /** Extra classes on the control */
  className?: string;
  /** Extra classes on the outer wrapper */
  containerClassName?: string;
  /** Show a leading empty "—" option on selects (defaults to true when not required) */
  allowEmpty?: boolean;
  /** Helper text under the control, replaced by the error message when invalid */
  hint?: string;

  // ── Standalone (non-Formik) mode — pass value + onChange ──
  value?: InputValue;
  onChange?: (value: InputValue) => void;
  /** Standalone error message */
  error?: string;

  // ── Extras ──
  autoFocus?: boolean;
  onKeyDown?: (e: KeyboardEvent) => void;
  leadingIcon?: ReactNode;
  min?: number | string;
  max?: number | string;
  step?: number;
  maxLength?: number;
  hideLabel?: boolean;
  /** `multiselect` cap */
  maxItems?: number;
  /**
   * `select` / `multiselect` — the options are being fetched. The list shows a
   * loading row instead of options or "no options"; once it turns false, an
   * empty list says "No options available.". Leave it undefined for a select
   * whose options are not loaded from anywhere.
   */
  loading?: boolean;
}

export interface MultiSelectControlProps {
  id?: string;
  options: InputOption[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  invalid?: boolean;
  disabled?: boolean;
  describedBy?: string;
  maxItems?: number;
  /** The options are being fetched — the list shows a loading row instead. */
  loading?: boolean;
}
