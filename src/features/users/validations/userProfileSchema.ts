import * as Yup from "yup";
import type { Translate } from "@/types/i18n";

/** Schema of the user profile form. */
export const userProfileSchema = (t: Translate) =>
  Yup.object({
    name: Yup.string()
      .trim()
      .required(t("The {{field}} field is required.", { field: t("Full name") })),
    email: Yup.string()
      .trim()
      .required(t("The {{field}} field is required.", { field: t("Email") }))
      .email(t("The {{field}} must be a valid email address.", { field: t("Email") })),
    roleIds: Yup.array().min(1, t("Select at least one role.")),
    phone: Yup.string()
      .trim()
      .required(t("The {{field}} field is required.", { field: t("Phone") })),
    managerId: Yup.string().required(
      t("The {{field}} field is required.", { field: t("Manager") }),
    ),
    group: Yup.string().required(t("The {{field}} field is required.", { field: t("Group") })),
  });
