import SettingsSections from "@/features/systemSettings/components/SettingsSections";

const sectionIds = ["authentication"] as const;

export default function AuthenticationPage() {
  return <SettingsSections sectionIds={sectionIds} />;
}
