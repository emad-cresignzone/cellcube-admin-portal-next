import type { ComponentType, SVGProps } from "react";
import { HistoryIcon } from "@/Icons/HistoryIcon";
import { LockIcon } from "@/Icons/LockIcon";
import { ShieldCheckIcon } from "@/Icons/ShieldCheckIcon";
import { UsersIcon } from "@/Icons/UsersIcon";
import type { DashboardKpiId } from "../interfaces/DashboardApi";

/** Kept apart from the seed: a component reference cannot live in the store. */
export const kpiIcons: Record<DashboardKpiId, ComponentType<SVGProps<SVGSVGElement>>> = {
  users: UsersIcon,
  "two-factor": ShieldCheckIcon,
  "failed-logins": LockIcon,
  "audit-retention": HistoryIcon,
};
