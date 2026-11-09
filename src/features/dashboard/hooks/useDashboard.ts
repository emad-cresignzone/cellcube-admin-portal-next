"use client";

import { useSelector } from "react-redux";
import { useAuditEvents } from "@/features/audit/hooks/useAuditEvents";
import { useIntegrations } from "@/features/systemSettings/hooks/useIntegrations";
import type { RootState } from "@/store/store";
import { LISTED_INTEGRATIONS, RECENT_EVENTS } from "../constants/dashboardData";

/** The overview's read surface — its own figures plus the head of two feeds. */
export function useDashboard() {
  /**
   * --------------------------------------------------
   *  Reducers
   * --------------------------------------------------
   */
  const { items: kpis } = useSelector((state: RootState) => state.dashboardReducer);
  const { events } = useAuditEvents();
  const { integrations } = useIntegrations();

  return {
    kpis,
    recentEvents: events.slice(0, RECENT_EVENTS),
    integrations: integrations.slice(0, LISTED_INTEGRATIONS),
  };
}
