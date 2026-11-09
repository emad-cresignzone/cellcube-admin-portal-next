import type { AuditEvent } from "../interfaces/AuditApi";

export const auditData: AuditEvent[] = [
  { id: "evt-1", time: "14:32:08", actor: "t.rojas", action: "role.permission.add", target: "service", outcome: "ok", severity: "high", category: "permissions", ip: "10.4.11.4", detail: "+ battery.write" },
  { id: "evt-2", time: "14:29:14", actor: "system", action: "auth.session.expire", target: "m.schreiber", outcome: "ok", severity: "info", category: "authentication", ip: "", detail: "8h idle timeout" },
  { id: "evt-3", time: "14:18:02", actor: "system", action: "alert.sla.escalate", target: "TCK-4821", outcome: "ok", severity: "warn", category: "system", ip: "", detail: "auto-escalate" },
  { id: "evt-4", time: "13:50:31", actor: "h.mueller", action: "auth.login.success", target: "h.mueller", outcome: "ok", severity: "info", category: "authentication", ip: "85.214.10.9", detail: "2FA via TOTP" },
  { id: "evt-5", time: "12:11:09", actor: "o.yilmaz", action: "auth.login.failed", target: "o.yilmaz", outcome: "deny", severity: "warn", category: "authentication", ip: "212.51.18.4", detail: "5 attempts · account locked" },
  { id: "evt-6", time: "11:48:51", actor: "v.petrov", action: "report.export", target: "SLA Q2 2026", outcome: "ok", severity: "info", category: "system", ip: "194.55.2.81", detail: "PDF · 14 pages" },
  { id: "evt-7", time: "10:02:00", actor: "t.rojas", action: "user.suspend", target: "k.park", outcome: "ok", severity: "high", category: "system", ip: "10.4.11.4", detail: "off-boarding" },
  { id: "evt-8", time: "09:14:22", actor: "system", action: "integration.heartbeat", target: "okta-saml", outcome: "ok", severity: "info", category: "system", ip: "", detail: "" },
  { id: "evt-9", time: "08:51:09", actor: "t.rojas", action: "settings.update", target: "auth.password.policy", outcome: "ok", severity: "high", category: "system", ip: "10.4.11.4", detail: "min length 12 → 14" },
];
