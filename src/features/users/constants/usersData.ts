import type { User, UserActivity, UserPermission, UserSecurity } from "../interfaces/UserApi";

/** The signed-in administrator — the top bar shows the same person. */
export const CURRENT_USER_ID = "u-004";

const granted = (keys: string[]): UserPermission[] => keys.map((key) => ({ key, granted: true }));

const servicePermissions = granted([
  "tickets.read",
  "tickets.write",
  "tickets.assign",
  "batteries.read",
  "batteries.write",
  "customers.read",
  "customers.write",
  "wiki.read",
  "wiki.write",
  "reports.read",
  "reports.export",
]);

const partnerPermissions = granted([
  "tickets.read.own",
  "tickets.write.own",
  "batteries.read.own",
  "reports.read.own",
  "wiki.read",
]);

const readOnlyPermissions = granted([
  "tickets.read",
  "batteries.read",
  "customers.read",
  "audit.read",
  "wiki.read",
  "reports.read",
]);

const administratorPermissions = granted([
  "users.read",
  "users.write",
  "users.lock",
  "roles.read",
  "roles.write",
  "audit.read",
  "audit.export",
  "settings.read",
  "settings.write",
  "integrations.write",
  "tickets.*",
  "batteries.*",
  "customers.*",
  "wiki.*",
]);

const activity: UserActivity[] = [
  { id: "act-1", time: "14:32:08", action: "role.permission.add", target: "service", ip: "10.4.11.4" },
  { id: "act-2", time: "14:29:14", action: "auth.session.expire", target: "m.schreiber", ip: "" },
  { id: "act-3", time: "14:18:02", action: "alert.sla.escalate", target: "TCK-4821", ip: "" },
];

const activitySummary = "Last 30 days · 12 events";

const enrolled: UserSecurity = {
  twoFactorDetail: "TOTP enrolled",
  sessionsDetail: "2 devices · last activity 2026-05-13 14:08",
  passwordDetail: "Last changed 32 days ago · policy compliant",
};

const notEnrolled: UserSecurity = { ...enrolled, twoFactorDetail: "Not enrolled" };

const internalCustomers = ["Stadtwerke Frankfurt", "Energie Süd GmbH", "NordWind Energy"];

export const usersData: User[] = [
  { id: "u-001", name: "Mira Schreiber", email: "m.schreiber@cellcube.io", roleIds: ["service"], twoFactor: "enabled", status: "active", lastSignIn: "2026-05-13 14:08", lastIp: "10.4.12.18", avatarTone: "red", phone: "+49 30 555 0184", department: "Operations · DACH", group: "Service Team DACH", managerId: "u-004", provisioned: "2025-09-14", customers: internalCustomers, permissions: servicePermissions, activitySummary, activity, security: enrolled },
  { id: "u-002", name: "Jonas Becker", email: "j.becker@cellcube.io", roleIds: ["service"], twoFactor: "enabled", status: "active", lastSignIn: "2026-05-13 12:51", lastIp: "10.4.12.91", avatarTone: "purple", phone: "+49 30 555 0121", department: "Operations · DACH", group: "Service Team DACH", managerId: "u-004", provisioned: "2025-10-02", customers: internalCustomers, permissions: servicePermissions, activitySummary, activity, security: enrolled },
  { id: "u-003", name: "Anna Kowalski", email: "a.kowalski@cellcube.io", roleIds: ["service"], twoFactor: "required", status: "active", lastSignIn: "2026-05-13 09:32", lastIp: "10.4.12.42", avatarTone: "neutral", phone: "+49 30 555 0147", department: "Field Service", group: "Service Team DACH", managerId: "u-004", provisioned: "2025-11-20", customers: internalCustomers, permissions: servicePermissions, activitySummary, activity, security: notEnrolled },
  { id: "u-004", name: "Tomás Rojas", email: "t.rojas@cellcube.io", roleIds: ["administrator"], twoFactor: "enabled", status: "active", lastSignIn: "2026-05-13 13:11", lastIp: "10.4.11.4", avatarTone: "blue", phone: "+49 30 555 0102", department: "IT & Security", group: "Platform Admins", managerId: "u-010", provisioned: "2025-03-03", customers: internalCustomers, permissions: administratorPermissions, activitySummary, activity, security: enrolled },
  { id: "u-005", name: "Dorit Voss", email: "d.voss@cellcube.io", roleIds: ["service"], twoFactor: "enabled", status: "active", lastSignIn: "2026-05-13 08:09", lastIp: "10.4.12.66", avatarTone: "teal", phone: "+49 30 555 0163", department: "Customer Success", group: "Service Team DACH", managerId: "u-004", provisioned: "2025-12-01", customers: internalCustomers, permissions: servicePermissions, activitySummary, activity, security: enrolled },
  { id: "u-006", name: "Heike Müller", email: "h.mueller@sw-frankfurt.de", roleIds: ["partner"], twoFactor: "enabled", status: "active", lastSignIn: "2026-05-12 16:22", lastIp: "85.214.10.9", avatarTone: "red", phone: "+49 69 555 0190", department: "Customer Success", group: "Partner Access", managerId: "u-004", provisioned: "2026-01-12", customers: ["Stadtwerke Frankfurt"], permissions: partnerPermissions, activitySummary, activity, security: enrolled },
  { id: "u-007", name: "Vlad Petrov", email: "v.petrov@es-gmbh.de", roleIds: ["read-only"], twoFactor: "required", status: "active", lastSignIn: "2026-05-11 11:48", lastIp: "194.55.2.81", avatarTone: "purple", phone: "+49 89 555 0133", department: "Compliance", group: "Audit Board", managerId: "u-010", provisioned: "2026-02-04", customers: ["Energie Süd GmbH"], permissions: readOnlyPermissions, activitySummary, activity, security: notEnrolled },
  { id: "u-008", name: "Sara Lindqvist", email: "s.lindqvist@nw-energy.se", roleIds: ["partner"], twoFactor: "required", status: "invited", lastSignIn: "", lastIp: "", avatarTone: "neutral", phone: "+46 8 555 0118", department: "Customer Success", group: "Partner Access", managerId: "u-004", provisioned: "2026-05-02", customers: ["NordWind Energy"], permissions: partnerPermissions, activitySummary, activity: [], security: notEnrolled },
  { id: "u-009", name: "Onur Yilmaz", email: "o.yilmaz@vetraz.fr", roleIds: ["partner"], twoFactor: "enabled", status: "locked", lastSignIn: "2026-05-08 09:11", lastIp: "212.51.18.4", avatarTone: "blue", phone: "+33 1 55 50 01 72", department: "Customer Success", group: "Partner Access", managerId: "u-004", provisioned: "2026-01-28", customers: ["Energie Süd GmbH"], permissions: partnerPermissions, activitySummary, activity, security: enrolled },
  { id: "u-010", name: "Kim Park", email: "k.park@cellcube.io", roleIds: ["administrator"], twoFactor: "enabled", status: "suspended", lastSignIn: "2026-05-09 17:51", lastIp: "10.4.11.7", avatarTone: "neutral", phone: "+49 30 555 0109", department: "IT & Security", group: "Platform Admins", managerId: "u-004", provisioned: "2025-03-03", customers: internalCustomers, permissions: administratorPermissions, activitySummary, activity, security: enrolled },
  { id: "u-011", name: "Lars Friedrich", email: "l.friedrich@cellcube.io", roleIds: ["service"], twoFactor: "enabled", status: "active", lastSignIn: "2026-05-13 07:48", lastIp: "10.4.12.55", avatarTone: "blue", phone: "+49 30 555 0155", department: "Operations · Nordics", group: "Service Team Nordics", managerId: "u-004", provisioned: "2026-01-05", customers: internalCustomers, permissions: servicePermissions, activitySummary, activity, security: enrolled },
  { id: "u-012", name: "Aiko Tanaka", email: "a.tanaka@cellcube.io", roleIds: ["read-only"], twoFactor: "enabled", status: "active", lastSignIn: "2026-05-13 06:33", lastIp: "10.4.13.11", avatarTone: "teal", phone: "+49 30 555 0177", department: "Compliance", group: "Audit Board", managerId: "u-010", provisioned: "2026-02-18", customers: internalCustomers, permissions: readOnlyPermissions, activitySummary, activity, security: enrolled },
];
