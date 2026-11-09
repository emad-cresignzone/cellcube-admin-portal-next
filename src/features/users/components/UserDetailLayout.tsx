"use client";

import { useMemo } from "react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Tabs from "@/components/ui/Tabs";
import { useUserDetail } from "../hooks/useUserDetail";
import type { UserDetailLayoutProps } from "../interfaces/UsersProps";
import { userTabs } from "../utils/userDetail";
import CustomerAccessCard from "./CustomerAccessCard";
import UserHeader from "./UserHeader";
import UserSummaryCard from "./UserSummaryCard";

/** The frame every tab of a user shares: header, tabs and the side cards. */
export default function UserDetailLayout({
  userId,
  withTabs = true,
  children,
}: UserDetailLayoutProps) {
  /**
   * --------------------------------------------------
   *  Reducers
   * --------------------------------------------------
   */
  const { user } = useUserDetail(userId);

  /**
   * --------------------------------------------------
   *  Variables
   * --------------------------------------------------
   */
  const tabs = useMemo(() => userTabs(userId), [userId]);

  /**
   * --------------------------------------------------
   *  Conditions
   * --------------------------------------------------
   */
  if (!user) return null;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        {withTabs && (
          <Breadcrumbs
            items={[
              { labelKey: "User management", href: "/settings/administrators" },
              { label: user.name },
            ]}
          />
        )}
        <UserHeader userId={userId} />
      </div>

      {withTabs && <Tabs tabs={tabs} />}

      <div className="grid items-start gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="min-w-0">{children}</div>
        <div className="flex flex-col gap-4">
          <UserSummaryCard user={user} />
          <CustomerAccessCard user={user} />
        </div>
      </div>
    </div>
  );
}
