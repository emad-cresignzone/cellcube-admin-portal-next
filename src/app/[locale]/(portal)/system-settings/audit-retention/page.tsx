import SettingsSections from "@/features/systemSettings/components/SettingsSections";

const sectionIds = ["audit-retention"] as const;

export default function AuditRetentionPage() {
  return <SettingsSections sectionIds={sectionIds} />;
}
