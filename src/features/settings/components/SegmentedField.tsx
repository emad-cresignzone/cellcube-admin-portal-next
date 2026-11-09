"use client";

import { useField } from "formik";
import SegmentedControl from "@/features/settings/components/SegmentedControl";
import type { SegmentedFieldProps } from "../interfaces/SettingsProps";

/** Formik binding for the segmented control. */
export default function SegmentedField({ name, legend, options }: SegmentedFieldProps) {
  const [field, , helpers] = useField<string>(name);

  return (
    <SegmentedControl
      name={name}
      legend={legend}
      options={options}
      value={field.value}
      onChange={(value) => {
        void helpers.setValue(value);
        void helpers.setTouched(true);
      }}
    />
  );
}
