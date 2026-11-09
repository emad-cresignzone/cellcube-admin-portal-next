export type AuditSeverity = "high" | "warn" | "info";

export type AuditOutcome = "ok" | "deny";

export type AuditCategory = "authentication" | "permissions" | "system";

export interface AuditEvent {
  id: string;
  time: string;
  actor: string;
  action: string;
  target: string;
  outcome: AuditOutcome;
  severity: AuditSeverity;
  category: AuditCategory;
  /** Empty for events the system raised itself. */
  ip: string;
  detail: string;
}
