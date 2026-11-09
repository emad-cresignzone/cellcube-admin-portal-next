import type { PreferenceRowProps } from "../interfaces/SettingsProps";

/** Label on the left, control on the right — the settings panel row rhythm. */
export default function PreferenceRow({ label, description, control }: PreferenceRowProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-divider py-3 last:border-b-0">
      <div className="min-w-0">
        <p className="text-[13px] font-medium text-ink">{label}</p>
        {description && <p className="pt-0.5 text-xs text-muted">{description}</p>}
      </div>
      {control}
    </div>
  );
}
