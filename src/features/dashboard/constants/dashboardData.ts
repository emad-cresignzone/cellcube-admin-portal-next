import type { DashboardKpi } from "../interfaces/DashboardApi";

export const dashboardKpisData: DashboardKpi[] = [
  {
    id: "users",
    labelKey: "Users · active",
    value: "12",
    hint: "of 12 provisioned",
  },
  {
    id: "two-factor",
    labelKey: "2FA coverage",
    value: "83 %",
    hint: "2 users without 2FA",
  },
  {
    id: "failed-logins",
    labelKey: "Failed logins",
    value: "5",
    hint: "last 24 h · 1 lock",
    alert: true,
  },
  {
    id: "audit-retention",
    labelKey: "Audit retention",
    value: "2 y",
    hint: "14 / 90 d to next archive",
  },
];

export const RECENT_EVENTS = 6;
export const LISTED_INTEGRATIONS = 5;
