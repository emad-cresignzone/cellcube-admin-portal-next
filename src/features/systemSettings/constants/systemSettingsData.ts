import type { Integration, SettingsSection } from "../interfaces/SystemSettingsApi";

export const settingsSectionsData: SettingsSection[] = [
  {
    id: "password-policy",
    titleKey: "Password policy",
    rows: [
      { id: "min-length", label: "Minimum length", value: "14 characters", hint: "Last changed today 08:51 by t.rojas" },
      { id: "complexity", label: "Complexity", value: "Upper, lower, digit, symbol" },
      { id: "rotation", label: "Rotation", value: "Every 90 days" },
      { id: "history", label: "History", value: "Last 12 passwords blocked" },
    ],
  },
  {
    id: "account-lockout",
    titleKey: "Account lockout",
    rows: [
      { id: "failed-attempts", label: "Failed attempts before lock", value: "5" },
      { id: "lockout-duration", label: "Lockout duration", value: "30 minutes" },
      { id: "notify-admin", label: "Notify admin on lock", value: "On" },
      { id: "auto-suspend", label: "Auto-suspend after days idle", value: "90" },
    ],
  },
  {
    id: "authentication",
    titleKey: "Authentication",
    rows: [
      { id: "sso", label: "Single sign-on", value: "Okta SAML · enforced for cellcube.io domain" },
      { id: "two-factor", label: "Two-factor authentication", value: "Required for admin · recommended for service" },
      { id: "second-factors", label: "Allowed second factors", value: "TOTP, WebAuthn, security key" },
      { id: "ip-ranges", label: "Allowed IP ranges", value: "10.4.0.0/16 · 85.214.10.0/24" },
    ],
  },
  {
    id: "sessions",
    titleKey: "Sessions",
    rows: [
      { id: "idle-timeout", label: "Idle timeout", value: "8 hours" },
      { id: "absolute-timeout", label: "Absolute timeout", value: "24 hours" },
      { id: "concurrent", label: "Concurrent sessions per user", value: "3" },
      { id: "terminate", label: "Terminate on password change", value: "On" },
    ],
  },
  {
    id: "audit-retention",
    titleKey: "Audit retention",
    subtitleKey: "Storage and forwarding",
    rows: [
      { id: "retention", label: "Retention period", value: "24 months" },
      { id: "cold-storage", label: "Archive cold storage after", value: "90 days" },
      { id: "siem", label: "Forward to SIEM", value: "Splunk · cellcube-prod-siem" },
      { id: "export-format", label: "Export format", value: "CSV · JSON · syslog (RFC 5424)" },
    ],
  },
  {
    id: "branding",
    titleKey: "Branding",
    rows: [
      { id: "display-name", label: "Display name", value: "CellCube" },
      { id: "logo", label: "Login screen logo", value: "cellcube-wordmark.svg · 240×48" },
      { id: "brand-color", label: "Primary brand color", value: "#0F6CBD" },
      { id: "support-email", label: "Support email", value: "support@cellcube.io" },
    ],
  },
];

export const integrationsData: Integration[] = [
  { id: "okta", name: "Okta SSO", type: "Auth · SAML 2.0", status: "healthy", health: "Last heartbeat 2 m ago" },
  { id: "active-directory", name: "Active Directory", type: "Auth · LDAP", status: "healthy", health: "Synced 12 m ago" },
  { id: "jira", name: "Jira Service Desk", type: "Ticket sync", status: "warn", health: "Rate-limited · 3 retries" },
  { id: "datadog", name: "Datadog Logs", type: "Observability", status: "healthy", health: "Streaming" },
  { id: "splunk", name: "SIEM (Splunk)", type: "Audit forwarding", status: "healthy", health: "Tunnel up · 240 MB/d" },
  { id: "slack", name: "Slack", type: "Notifications", status: "off", health: "Disabled" },
];
