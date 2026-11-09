import UserPermissionsCard from "@/features/users/components/UserPermissionsCard";

export default async function UserPermissionsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <UserPermissionsCard userId={id} />;
}
