// src/store.ts
import type { EmployeeListFormValues } from "@/pages/admin/employee/schema/employeeListFormSchema";
import create from "zustand";

//for definining of types

interface MessageFormState {
  zIsOpenDialog: boolean;
  zSetIsOpenDialog: (zIsOpenDialog: boolean) => void;
  zDialogTitle: string;
  zSetDialogTitle: (zDialogTitle: string) => void;
  zPage: number;
  zSetPage: (zPage: number) => void;
  zPageSize: number;
  zSetPageSize: (zPageSize: number) => void;
  zStatusFilter: string;
  zSetStatusFilter: (zStatusFilter: string) => void;
  zConvoPage: number;
  zSetConvoPage: (zPage: number) => void;
  zConvoPageSize: number;
  zSetConvoPageSize: (zPageSize: number) => void;
  zConvoUserId: number;
  zSetConvoUserId: (zConvoUserId: number) => void;
  zMessagePage: number;
  zSetMessagePage: (zMessagePage: number) => void;
  zMessagePageSize: number;
  zSetMessagePageSize: (zMessagePageSize: number) => void;
  zMessageFilter: string;
  zSetMessageFilter: (zMessageFilter: string) => void;
  zActiveId: string;
  zSetActiveId: (zActiveId: string) => void;
}

//for inialization
// Create the Zustand store with type annotations
const useMessageContext = create<MessageFormState>((set) => ({
  zIsOpenDialog: false,
  zSetIsOpenDialog: (zIsOpenDialog: boolean) => set({ zIsOpenDialog }),
  zDialogTitle: "",
  zSetDialogTitle: (zDialogTitle: string) => set({ zDialogTitle }),
  zPage: 1,
  zSetPage: (zPage: number) => set({ zPage }),
  zPageSize: 10,
  zSetPageSize: (zPageSize: number) => set({ zPageSize }),
  zStatusFilter: "not/a",
  zSetStatusFilter: (zStatusFilter: string) => set({ zStatusFilter }),
  zConvoPage: 1,
  zSetConvoPage: (zConvoPage: number) => set({ zConvoPage }),
  zConvoPageSize: 10,
  zSetConvoPageSize: (zConvoPageSize: number) => set({ zConvoPageSize }),
  zConvoUserId: 0,
  zSetConvoUserId: (zConvoUserId: number) => set({ zConvoUserId }),
  zMessagePage: 1,
  zSetMessagePage: (zMessagePage: number) => set({ zMessagePage }),
  zMessagePageSize: 10,
  zSetMessagePageSize: (zMessagePageSize: number) => set({ zMessagePageSize }),
  zMessageFilter: "not/a",
  zSetMessageFilter: (zMessageFilter: string) => set({ zMessageFilter }),
  zActiveId: "",
  zSetActiveId: (zActiveId: string) => set({ zActiveId }),
}));

export default useMessageContext;
