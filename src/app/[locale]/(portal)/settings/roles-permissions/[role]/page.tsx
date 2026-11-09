import { notFound } from "next/navigation";
import RoleDetailScreen from "@/features/roles/components/RoleDetailScreen";
import { fetchRoles, getRole } from "@/features/roles/models/roles";

export async function generateStaticParams() {
  const roles = await fetchRoles();
  return roles.map((role) => ({ role: role.id }));
}

export default async function RolePage({ params }: { params: Promise<{ role: string }> }) {
  const { role: roleId } = await params;
  const role = await getRole(roleId);
  if (!role) notFound();

  return <RoleDetailScreen roleId={role.id} />;
}
