import type { Translate } from "@/types/i18n";
import type { FilterChip } from "@/components/interfaces/UiProps";
import type { AuditEvent } from "../interfaces/AuditApi";

/**
 * --------------------------------------------------
 *  Functions
 * --------------------------------------------------
 */

/** The audit chip strip, counted from the rows it would filter. */
export function auditChips(events: AuditEvent[], t: Translate): FilterChip[] {
  const count = (test: (event: AuditEvent) => boolean) => events.filter(test).length;

  return [
    { id: "all", label: t("All"), count: events.length },
    { id: "high", label: t("High severity"), count: count((event) => event.severity === "high") },
    {
      id: "authentication",
      label: t("Authentication"),
      count: count((event) => event.category === "authentication"),
    },
    {
      id: "permissions",
      label: t("Permissions"),
      count: count((event) => event.category === "permissions"),
    },
    { id: "denied", label: t("Denied"), count: count((event) => event.outcome === "deny") },
  ];
}
