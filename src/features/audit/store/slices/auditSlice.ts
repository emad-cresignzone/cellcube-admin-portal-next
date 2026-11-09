import { createSlice } from "@reduxjs/toolkit";
import { applySetInitialList } from "@/utils/listReducers";
import type { AuditEvent } from "../../interfaces/AuditApi";
import { initialAuditState } from "../initials/audit";

const auditSlice = createSlice({
  name: "audit",
  initialState: initialAuditState,
  reducers: {
    setInitialAudit: applySetInitialList<AuditEvent>,
  },
});

export const { setInitialAudit } = auditSlice.actions;
export default auditSlice.reducer;
