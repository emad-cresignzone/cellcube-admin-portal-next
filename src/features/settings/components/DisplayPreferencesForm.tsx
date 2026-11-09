"use client";

import { useMemo } from "react";
import { Form, Formik } from "formik";
import { Card } from "@/components/ui/Card";
import { CardBody } from "@/components/ui/CardBody";
import { CardHeader } from "@/components/ui/CardHeader";
import { Button } from "@/components/ui/Button";
import InputField from "@/packages/inputField/components/InputField";
import { useI18n } from "@/context/I18nProvider";
import { useTheme } from "@/context/ThemeProvider";
import PreferenceRow from "@/features/settings/components/PreferenceRow";
import SegmentedField from "@/features/settings/components/SegmentedField";
import type { DisplayValues, SegmentedOption } from "../interfaces/SettingsProps";
import {
  defaultDisplayValues,
  densityValues,
  landingValues,
  themeValues,
} from "../constants/preferenceForms";
import { displaySchema } from "../validations/settingsSchema";
import { densityLabels, landingLabels, themeLabels } from "../constants/settingsMessages";

export default function DisplayPreferencesForm() {
  const { t } = useI18n();
  const { setTheme } = useTheme();

  /**
   * --------------------------------------------------
   *  Variables
   * --------------------------------------------------
   */
  const schema = useMemo(
    () => displaySchema(t),
    [t],
  );

  const themeOptions: SegmentedOption[] = themeValues.map((value) => ({
    value,
    label: t(themeLabels[value]),
  }));
  const densityOptions: SegmentedOption[] = densityValues.map((value) => ({
    value,
    label: t(densityLabels[value]),
  }));

  return (
    <Formik<DisplayValues>
      initialValues={defaultDisplayValues}
      validationSchema={schema}
      onSubmit={(values, helpers) => {
        // Theme is the one preference the prototype can honour immediately.
        const resolved =
          values.theme === "system"
            ? window.matchMedia("(prefers-color-scheme: dark)").matches
              ? "dark"
              : "light"
            : values.theme;
        setTheme(resolved === "dark" ? "dark" : "light");
        helpers.resetForm({ values });
      }}
    >
      <Form>
        <Card>
          <CardHeader title={t("Display & density")} />
          <CardBody className="py-0">
            <PreferenceRow
              label={t("Theme")}
              control={
                <SegmentedField
                  name="theme"
                  legend={t("Theme")}
                  options={themeOptions}
                />
              }
            />

            <PreferenceRow
              label={t("Table density")}
              control={
                <SegmentedField
                  name="density"
                  legend={t("Table density")}
                  options={densityOptions}
                />
              }
            />

          </CardBody>
          <CardBody className="flex flex-wrap items-end justify-between gap-3 border-t border-divider">
            <InputField
              name="landingScreen"
              type="select"
              label={t("Default landing screen")}
              required
              allowEmpty={false}
              containerClassName="w-[200px]"
              options={landingValues.map((value) => ({
                value,
                label: t(landingLabels[value]),
              }))}
            />
            <Button type="submit" variant="primary" size="sm">
              {t("Save changes")}
            </Button>
          </CardBody>
        </Card>
      </Form>
    </Formik>
  );
}

