import { dashboardKpisData } from "../constants/dashboardData";
import type { DashboardKpi } from "../interfaces/DashboardApi";

/**
 * --------------------------------------------------
 *  Functions
 * --------------------------------------------------
 */
export const fetchDashboardKpis = async (): Promise<DashboardKpi[]> => dashboardKpisData;
