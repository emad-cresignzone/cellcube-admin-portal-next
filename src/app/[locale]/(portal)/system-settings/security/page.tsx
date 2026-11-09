import SettingsSections from "@/features/systemSettings/components/SettingsSections";

const sectionIds = ["password-policy", "account-lockout"] as const;

export default function SecurityPage() {
  return <SettingsSections sectionIds={sectionIds} />;
}
