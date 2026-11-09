import UserActivityCard from "@/features/users/components/UserActivityCard";

export default async function UserActivityPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <UserActivityCard userId={id} />;
}
