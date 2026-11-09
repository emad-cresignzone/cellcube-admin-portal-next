import type { Role, RoleChange } from "../interfaces/RoleApi";

const history: RoleChange[] = [
  { id: "battery-write", change: "+ battery.write", meta: "by t.rojas · 14:32:08 today" },
  { id: "audit-export", change: "− audit.export", meta: "by k.park · 7 May 2026" },
  { id: "reports-export", change: "+ reports.export", meta: "by t.rojas · 22 Apr 2026" },
];

export const rolesData: Role[] = [
  {
    id: "administrator",
    description:
      "Full access to all areas, including user management, security policies and audit retention.",
    userCount: 2,
    previewGrants: ["users.read", "users.write", "users.lock", "roles.read", "roles.write"],
    hiddenGrantCount: 9,
    grantCount: 14,
    editable: false,
    groups: [
      { domain: "Users", grants: ["read", "write", "lock"] },
      { domain: "Roles", grants: ["read", "write"] },
      { domain: "Audit", grants: ["read", "export"] },
      { domain: "Settings", grants: ["read", "write"] },
      { domain: "Integrations", grants: ["write"] },
      { domain: "Tickets", grants: ["*"] },
      { domain: "Batteries", grants: ["*"] },
      { domain: "Customers", grants: ["*"] },
      { domain: "Wiki", grants: ["*"] },
    ],
    history,
  },
  {
    id: "service",
    description:
      "Default role for service technicians and managers. Operate tickets, batteries and customers; read-only on admin areas.",
    userCount: 6,
    previewGrants: [
      "tickets.read",
      "tickets.write",
      "tickets.assign",
      "batteries.read",
      "batteries.write",
    ],
    hiddenGrantCount: 6,
    grantCount: 11,
    editable: true,
    groups: [
      { domain: "Tickets", grants: ["read", "write", "assign"] },
      { domain: "Batteries", grants: ["read", "write"] },
      { domain: "Customers", grants: ["read", "write"] },
      { domain: "Wiki", grants: ["read", "write"] },
      { domain: "Reports", grants: ["read", "export"] },
    ],
    history,
  },
  {
    id: "partner",
    description:
      "Customer-side users with scoped access to their own batteries, tickets and reports.",
    userCount: 3,
    previewGrants: [
      "tickets.read.own",
      "tickets.write.own",
      "batteries.read.own",
      "reports.read.own",
      "wiki.read",
    ],
    hiddenGrantCount: 0,
    grantCount: 5,
    editable: true,
    groups: [
      { domain: "Tickets", grants: ["read", "write"] },
      { domain: "Batteries", grants: ["read"] },
      { domain: "Reports", grants: ["read"] },
      { domain: "Wiki", grants: ["read"] },
    ],
    history,
  },
  {
    id: "read-only",
    description:
      "Auditor / compliance users with read-only access to operational data and audit logs.",
    userCount: 2,
    previewGrants: ["tickets.read", "batteries.read", "customers.read", "audit.read", "wiki.read"],
    hiddenGrantCount: 1,
    grantCount: 6,
    editable: true,
    groups: [
      { domain: "Tickets", grants: ["read"] },
      { domain: "Batteries", grants: ["read"] },
      { domain: "Customers", grants: ["read"] },
      { domain: "Audit", grants: ["read"] },
      { domain: "Wiki", grants: ["read"] },
      { domain: "Reports", grants: ["read"] },
    ],
    history,
  },
];
