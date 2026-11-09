import SettingsSections from "@/features/systemSettings/components/SettingsSections";

const sectionIds = ["branding"] as const;

export default function BrandingPage() {
  return <SettingsSections sectionIds={sectionIds} />;
}
