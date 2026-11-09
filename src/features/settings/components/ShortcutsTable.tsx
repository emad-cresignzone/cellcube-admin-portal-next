"use client";

import { useMemo } from "react";
import GeneralTable from "@/packages/generalTable/components/GeneralTable";
import type { GeneralTableColumn } from "@/packages/generalTable/interfaces/GeneralTableProps";
import { useI18n } from "@/context/I18nProvider";
import { shortcuts } from "../constants/shortcuts";
import type { Shortcut } from "../interfaces/SettingsProps";

export default function ShortcutsTable() {
  const { t } = useI18n();

  /**
   * --------------------------------------------------
   *  Variables
   * --------------------------------------------------
   */
  const columns: GeneralTableColumn<Shortcut>[] = useMemo(
    () => [
      {
        key: "action",
        label: t("Action"),
        sortable: true,
        value: (row) => t(row.actionKey),
        render: (row) => t(row.actionKey),
      },
      {
        key: "keys",
        label: t("Shortcut"),
        width: "220px",
        align: "end",
        sortable: true,
        // Sort by the literal key sequence, not the "then" separators.
        value: (row) => row.keys.filter((key) => key !== "then").join(" "),
        render: (row) => (
          <span className="inline-flex items-center gap-1.5">
            {row.keys.map((key, index) =>
              key === "then" ? (
                <span key={`then-${index}`} className="text-xs text-muted">
                  {t("then")}
                </span>
              ) : (
                <kbd
                  key={key}
                  className="inline-flex h-[26px] items-center rounded-[4px] border border-outline bg-chip px-2 font-mono text-xs font-semibold text-ink-secondary"
                >
                  {key}
                </kbd>
              ),
            )}
          </span>
        ),
      },
    ],
    [t],
  );

  return (
    <GeneralTable
      data={shortcuts}
      columns={columns}
      getRowId={(row) => row.id}
      emptyText={t("No shortcuts configured.")}
    />
  );
}
