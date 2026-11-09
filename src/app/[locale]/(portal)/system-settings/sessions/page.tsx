import SettingsSections from "@/features/systemSettings/components/SettingsSections";

const sectionIds = ["sessions"] as const;

export default function SessionsPage() {
  return <SettingsSections sectionIds={sectionIds} />;
}
