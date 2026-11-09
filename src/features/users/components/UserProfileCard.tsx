"use client";

import { useEffect, useMemo } from "react";
import { Form, Formik } from "formik";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CardBody } from "@/components/ui/CardBody";
import { CardHeader } from "@/components/ui/CardHeader";
import { useI18n } from "@/context/I18nProvider";
import { SaveIcon } from "@/Icons/SaveIcon";
import InputField from "@/packages/inputField/components/InputField";
import { roleVocabulary } from "@/types/role";
import { departments, userGroups } from "../constants/userVocabulary";
import { useUserDetail } from "../hooks/useUserDetail";
import { useUsers } from "../hooks/useUsers";
import type {
  UserProfileFormValues,
  UserTabProps,
} from "../interfaces/UsersProps";
import { managerOptions, toProfileFormValues } from "../utils/userDetail";
import { userProfileSchema } from "../validations/userProfileSchema";

/**
 * The profile form.
 *
 * Read-only until the header's Edit profile button opens the edit session.
 * Formik holds the draft, the slice holds the saved record: Cancel resets one
 * to the other, Save writes the draft across, and `enableReinitialize` brings
 * the form back in line with what was saved.
 */
export default function UserProfileCard({ userId }: UserTabProps) {
  const { t } = useI18n();

  /**
   * --------------------------------------------------
   *  Reducers
   * --------------------------------------------------
   */
  const { user, editingSection, cancelEdit, saveProfile } =
    useUserDetail(userId);
  const { users } = useUsers();

  /**
   * --------------------------------------------------
   *  Variables
   * --------------------------------------------------
   */
  const editing = editingSection === "profile";
  const schema = useMemo(() => userProfileSchema(t), [t]);
  const initialValues = useMemo(
    () => (user ? toProfileFormValues(user) : null),
    [user],
  );
  const managers = useMemo(() => managerOptions(users), [users]);
  const roleOptions = roleVocabulary.map((role) => ({
    value: role.id,
    label: role.name,
  }));

  /**
   * --------------------------------------------------
   *  Mutations
   * --------------------------------------------------
   */
  // Leaving the tab ends the session, so a draft cannot outlive its form.
  useEffect(
    () => () => {
      cancelEdit();
    },
    [cancelEdit],
  );

  /**
   * --------------------------------------------------
   *  Conditions
   * --------------------------------------------------
   */
  if (!initialValues) return null;

  return (
    <Formik<UserProfileFormValues>
      initialValues={initialValues}
      enableReinitialize
      validationSchema={schema}
      onSubmit={(values) => {
        saveProfile({
          ...values,
          name: values.name.trim(),
          email: values.email.trim(),
          phone: values.phone.trim(),
        });
      }}
    >
      {({ resetForm }) => (
        <Form noValidate>
          <Card>
            <CardHeader titleKey="Profile" />
            <CardBody>
              <div className="grid gap-3 md:grid-cols-2">
                <InputField
                  name="name"
                  label={t("Full name")}
                  disabled={!editing}
                />
                <InputField
                  name="email"
                  type="email"
                  label={t("Email")}
                  disabled={!editing}
                />
                <InputField
                  name="roleIds"
                  type="multiselect"
                  label={t("Roles")}
                  options={roleOptions}
                  disabled={!editing}
                />
                <InputField
                  name="group"
                  type="select"
                  label={t("Group")}
                  options={[...userGroups]}
                  allowEmpty={false}
                  disabled={!editing}
                />
                <InputField
                  name="phone"
                  type="tel"
                  label={t("Phone")}
                  disabled={!editing}
                />
                <InputField
                  name="managerId"
                  type="select"
                  label={t("Manager")}
                  options={managers}
                  allowEmpty={false}
                  disabled={!editing}
                />
              </div>

              {editing && (
                <div className="mt-4 flex items-center justify-end gap-2.5 border-t border-border pt-4">
                  <Button
                    variant="ghost"
                    onClick={() => {
                      resetForm();
                      cancelEdit();
                    }}
                  >
                    {t("Cancel")}
                  </Button>
                  <Button type="submit" variant="primary">
                    <SaveIcon className="size-4" />
                    {t("Save changes")}
                  </Button>
                </div>
              )}
            </CardBody>
          </Card>
        </Form>
      )}
    </Formik>
  );
}
