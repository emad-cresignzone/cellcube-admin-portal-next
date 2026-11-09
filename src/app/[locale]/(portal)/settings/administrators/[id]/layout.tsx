import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import UserDetailLayout from "@/features/users/components/UserDetailLayout";
import { fetchUsers, getUser } from "@/features/users/models/users";

export async function generateStaticParams() {
  const users = await fetchUsers();
  return users.map((user) => ({ id: user.id }));
}

export default async function UserLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!(await getUser(id))) notFound();

  return <UserDetailLayout userId={id}>{children}</UserDetailLayout>;
}
