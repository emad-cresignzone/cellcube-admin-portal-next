import { redirect } from "next/navigation";

/** A user has no page of their own — the first tab is the landing view. */
export default async function UserIndexPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  redirect(`/${locale}/settings/administrators/${id}/profile`);
}
