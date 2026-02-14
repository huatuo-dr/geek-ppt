import { create } from "zustand";

export type ExportStatus = "idle" | "exporting" | "success" | "error";

export interface ExportState {
  status: ExportStatus;
  message: string;

  // --- Actions ---
  setExportStatus: (status: ExportStatus, message?: string) => void;
}

export const useExportStore = create<ExportState>((set) => ({
  status: "idle",
  message: "",

  setExportStatus: (status, message = "") => set({ status, message }),
}));
