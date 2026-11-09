import * as Yup from "yup";
import { densityValues, landingValues, themeValues } from "../constants/preferenceForms";
import type { Translate } from "@/types/i18n";

/** Schema of the display preferences form. */
export const displaySchema = (t: Translate) =>
  Yup.object({
    theme: Yup.string()
      .required(t("The {{field}} field is required.", { field: t("Theme") }))
      .oneOf([...themeValues], t("The selected {{field}} is invalid.", { field: t("Theme") })),
    density: Yup.string()
      .required(t("The {{field}} field is required.", { field: t("Table density") }))
      .oneOf([...densityValues], t("The selected {{field}} is invalid.", { field: t("Table density") })),
    landingScreen: Yup.string()
      .required(t("The {{field}} field is required.", { field: t("Default landing screen") }))
      .oneOf(
        [...landingValues],
        t("The selected {{field}} is invalid.", { field: t("Default landing screen") }),
      ),
  });
