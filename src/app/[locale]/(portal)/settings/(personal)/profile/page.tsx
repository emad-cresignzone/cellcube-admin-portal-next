import UserDetailLayout from "@/features/users/components/UserDetailLayout";
import UserProfileCard from "@/features/users/components/UserProfileCard";
import { CURRENT_USER_ID } from "@/features/users/constants/usersData";

export const metadata = { title: "Profile · CellCube Admin Portal" };

/** The signed-in administrator, in the same profile form every user has. */
export default function ProfilePage() {
  return (
    <UserDetailLayout userId={CURRENT_USER_ID} withTabs={false}>
      <UserProfileCard userId={CURRENT_USER_ID} />
    </UserDetailLayout>
  );
}
