// src/store.ts
import create from "zustand";

//for definining of types
interface EmployeeListFormState {
  zIsOpenDialog: boolean;
  zSetIsOpenDialog: (zIsOpenDialog: boolean) => void;
  zDialogTitle: string;
  zSetDialogTitle: (zDialogTitle: string) => void;
  zIsOpenDialog2: boolean;
  zSetIsOpenDialog2: (zIsOpenDialog: boolean) => void;
  zPage: number;
  zSetPage: (zPage: number) => void;
  zPageSize: number;
  zSetPageSize: (zPageSize: number) => void;
  zStatusFilter: string;
  zSetStatusFilter: (zStatusFilter: string) => void;
  zCRId: number;
  zSetCRId: (zCRId: number) => void;
  zCREmail: string;
  zSetCREmail: (zCREmail: string) => void;
}

//for inialization
// Create the Zustand store with type annotations
const useClientRequestContext = create<EmployeeListFormState>((set) => ({
  zIsOpenDialog: false,
  zSetIsOpenDialog: (zIsOpenDialog: boolean) => set({ zIsOpenDialog }),
  zDialogTitle: "",
  zSetDialogTitle: (zDialogTitle: string) => set({ zDialogTitle }),
  zIsOpenDialog2: false,
  zSetIsOpenDialog2: (zIsOpenDialog2: boolean) => set({ zIsOpenDialog2 }),
  zPage: 1,
  zSetPage: (zPage: number) => set({ zPage }),
  zPageSize: 3,
  zSetPageSize: (zPageSize: number) => set({ zPageSize }),
  zStatusFilter: "not/a",
  zSetStatusFilter: (zStatusFilter: string) => set({ zStatusFilter }),
  zCRId: 0,
  zSetCRId: (zCRId: number) => set({ zCRId }),
  zCREmail: "",
  zSetCREmail: (zCREmail: string) => set({ zCREmail }),
}));

export default useClientRequestContext;
