// src/store.ts

import type { ClientListFormValues } from "@/pages/admin/schema/clientListFormSchema";
import create from "zustand";
const initialData: ClientListFormValues = {
  id: undefined,
  email: "",
  firstname: "",
  lastname: "",
  mobileNumber: "",
  status: "",
  address: "",
  dateOfBirth: new Date(),
};

//for definining of types

interface ClientListFormState {
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
  zClientId: number;
  zSetClientId: (zClientId: number) => void;
  // for updating and creating employeeList data
  zClientListAEData: ClientListFormValues;
  zSetClientListAEData: (data: ClientListFormValues) => void;
}

//for inialization
// Create the Zustand store with type annotations
const useClientListContext = create<ClientListFormState>((set) => ({
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
  zClientId: 0,
  zSetClientId: (zClientId: number) => set({ zClientId }),
  zClientListAEData: initialData,
  zSetClientListAEData: (data) => set({ zClientListAEData: data }),
}));

export default useClientListContext;
