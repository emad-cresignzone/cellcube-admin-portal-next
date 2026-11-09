import { auditData } from "../constants/auditData";
import type { AuditEvent } from "../interfaces/AuditApi";

/**
 * --------------------------------------------------
 *  Functions
 * --------------------------------------------------
 */
export const fetchAuditEvents = async (): Promise<AuditEvent[]> => auditData;
