import { redirect } from "next/navigation";

/** System settings has no content of its own — the first tab is the landing view. */
export default async function SystemSettingsIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  redirect(`/${locale}/system-settings/security`);
}
