"use client";

import clsx from "clsx";
import { useSettingsSections } from "../hooks/useSettingsSections";
import type { SettingsSectionsProps } from "../interfaces/SystemSettingsProps";
import SettingsSectionCard from "./SettingsSectionCard";

/** One tab of System settings: its sections, side by side when there are two. */
export default function SettingsSections({ sectionIds }: SettingsSectionsProps) {
  /**
   * --------------------------------------------------
   *  Reducers
   * --------------------------------------------------
   */
  const { sections } = useSettingsSections(sectionIds);

  return (
    <div className={clsx("grid items-start gap-4", sections.length > 1 && "lg:grid-cols-2")}>
      {sections.map((section) => (
        <SettingsSectionCard key={section.id} section={section} />
      ))}
    </div>
  );
}
