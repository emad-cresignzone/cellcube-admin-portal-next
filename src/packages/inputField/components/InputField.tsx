"use client";

import { useFormikContext } from "formik";
import clsx from "clsx";
import { Loader2 } from "lucide-react";
import { useI18n } from "@/context/I18nProvider";
import MultiSelectControl from "./fields/MultiSelectControl";
import type {
  InputFieldProps,
  InputOption,
  InputValue,
} from "../interfaces/InputFieldProps";
import { base, errRing, okRing } from "../constants/inputConstants";

const normalize = (options: (string | InputOption)[] = []): InputOption[] =>
  options.map((option) => (typeof option === "string" ? { value: option, label: option } : option));

/**
 * The single, project-wide input component.
 *
 * Works inside a Formik `<Form>` (bind by `name`) or standalone (pass `value` +
 * `onChange`). Styling uses the app's semantic theme tokens, so every field
 * follows light/dark mode and mirrors correctly in RTL.
 *
 * Types: text / email / tel / url / number / date / password / search /
 * textarea / select / checkbox / toggle / multiselect.
 */
export function InputField({
  name,
  label,
  type = "text",
  placeholder,
  options,
  required,
  disabled,
  rows = 4,
  className,
  containerClassName,
  allowEmpty,
  hint,
  value,
  onChange,
  error,
  autoFocus,
  onKeyDown,
  leadingIcon,
  min,
  max,
  step,
  maxLength,
  hideLabel,
  maxItems,
  loading,
}: InputFieldProps) {
  const { t } = useI18n();
  // useFormikContext returns undefined outside a <Formik> provider — safe to call.
  const formik = useFormikContext<Record<string, unknown>>();
  const standalone = onChange !== undefined;

  const fieldProps = !standalone && formik ? formik.getFieldProps(name) : undefined;
  const fieldMeta = !standalone && formik ? formik.getFieldMeta(name) : undefined;

  const rawValue = standalone ? value : fieldProps?.value;
  const invalid = standalone ? Boolean(error) : Boolean(fieldMeta?.touched && fieldMeta?.error);
  const message = standalone ? error : (fieldMeta?.error as string | undefined);
  const errorId = `${name}-error`;
  const onBlur = standalone ? undefined : fieldProps?.onBlur;

  const setValue = (next: unknown) => {
    if (standalone) onChange?.(next as InputValue);
    else formik?.setFieldValue(name, next);
  };

  const touch = () => {
    if (!standalone) formik?.setFieldTouched(name, true, false);
  };

  const control = clsx(base, invalid ? errRing : okRing, leadingIcon && "ps-9", className);
  const describedBy = invalid && message ? errorId : undefined;

  const feedback = (
    <>
      {invalid && message ? (
        <p id={errorId} role="alert" className="pt-1 text-[11px] font-medium text-danger">
          {message}
        </p>
      ) : (
        hint && <p className="pt-1 text-[11px] text-muted">{hint}</p>
      )}
    </>
  );

  // ── Checkbox and toggle carry their own inline layout ──
  if (type === "checkbox" || type === "toggle") {
    const checked = Boolean(rawValue);
    return (
      <div className={clsx("text-[13px]", containerClassName)}>
        <label className="flex items-start gap-2.5 text-ink">
          <input
            type="checkbox"
            id={name}
            name={name}
            checked={checked}
            disabled={disabled}
            aria-invalid={invalid || undefined}
            aria-describedby={describedBy}
            onChange={(event) => setValue(event.target.checked)}
            onBlur={onBlur}
            className={clsx(
              "mt-0.5 shrink-0 accent-brand-600",
              type === "toggle" ? "size-4" : "size-4",
            )}
          />
          <span>
            {placeholder || label}
            {required && <span className="ps-0.5 text-danger">*</span>}
          </span>
        </label>
        {feedback}
      </div>
    );
  }

  const renderControl = () => {
    if (type === "multiselect") {
      return (
        <MultiSelectControl
          id={name}
          options={normalize(options)}
          value={Array.isArray(rawValue) ? (rawValue as string[]) : []}
          onChange={(next) => {
            setValue(next);
            touch();
          }}
          placeholder={placeholder}
          invalid={invalid}
          disabled={disabled}
          describedBy={describedBy}
          maxItems={maxItems}
          loading={loading}
        />
      );
    }

    if (type === "select") {
      const list = normalize(options);
      const current = String(rawValue ?? "");
      // Keep an unknown stored value visible rather than silently blanking it.
      const withCurrent =
        current && !list.some((option) => option.value === current)
          ? [{ value: current, label: current }, ...list]
          : list;

      // While the options load, the list holds one "Loading…" entry — never
      // an empty list. Once loaded, a select that was told about loading says
      // so when the request brought nothing back.
      const noOptions = loading === false && !list.some((option) => option.value !== "");

      return (
        <div className="relative">
          <select
            id={name}
            name={name}
            value={loading ? "" : current}
            disabled={disabled}
            aria-busy={loading || undefined}
            aria-invalid={invalid || undefined}
            aria-describedby={describedBy}
            onChange={(event) => setValue(event.target.value)}
            onBlur={onBlur}
            className={control}
          >
            {loading ? (
              <option value="" disabled>
                {t("Loading…")}
              </option>
            ) : (
              <>
                {(allowEmpty ?? !required) && <option value="">—</option>}
                {withCurrent.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
                {noOptions && <option disabled>{t("No options available.")}</option>}
              </>
            )}
          </select>
          {loading && (
            <Loader2
              aria-hidden
              className="pointer-events-none absolute end-7 top-1/2 size-3.5 -translate-y-1/2 animate-spin text-muted"
              strokeWidth={2}
            />
          )}
        </div>
      );
    }

    if (type === "textarea") {
      return (
        <textarea
          id={name}
          name={name}
          value={String(rawValue ?? "")}
          rows={rows}
          maxLength={maxLength}
          placeholder={placeholder}
          disabled={disabled}
          aria-invalid={invalid || undefined}
          aria-describedby={describedBy}
          onChange={(event) => setValue(event.target.value)}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          className={clsx(control, "resize-y")}
        />
      );
    }

    return (
      <input
        id={name}
        name={name}
        type={type}
        value={String(rawValue ?? "")}
        min={min}
        max={max}
        step={step}
        maxLength={maxLength}
        autoFocus={autoFocus}
        placeholder={placeholder}
        disabled={disabled}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
        onChange={(event) =>
          setValue(
            type === "number"
              ? event.target.value === ""
                ? ""
                : Number(event.target.value)
              : event.target.value,
          )
        }
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        className={control}
      />
    );
  };

  return (
    <div className={clsx("flex flex-col", containerClassName)}>
      {label && !hideLabel && (
        <label htmlFor={name} className="pb-1 text-xs font-medium leading-5 text-ink-secondary">
          {label}
          {required && <span className="ps-0.5 text-danger">*</span>}
        </label>
      )}
      {leadingIcon ? (
        <div className="relative">
          <span className="pointer-events-none absolute inset-y-0 start-2.5 grid place-items-center text-faint">
            {leadingIcon}
          </span>
          {renderControl()}
        </div>
      ) : (
        renderControl()
      )}
      {feedback}
    </div>
  );
}

export default InputField;
