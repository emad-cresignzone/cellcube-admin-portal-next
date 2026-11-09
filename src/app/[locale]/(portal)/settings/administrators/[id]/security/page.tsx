import UserSecurityCard from "@/features/users/components/UserSecurityCard";

export default async function UserSecurityPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <UserSecurityCard userId={id} />;
}
