// src/store.ts
import type { EmployeeListFormValues } from "@/pages/admin/employee/schema/employeeListFormSchema";
import create from "zustand";
const initialData: EmployeeListFormValues = {
  id: undefined,
  email: "",
  firstname: "",
  lastname: "",
  mobileNumber: "",
  position: "",
  salary: 0,
  status: "",
  address: "",
  dateOfBirth: new Date(),
};

//for definining of types

interface EmployeeListFormState {
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
  // for updating and creating employeeList data
  zEmpListAEData: EmployeeListFormValues;
  zSetEmpListAEData: (data: EmployeeListFormValues) => void;
}

//for inialization
// Create the Zustand store with type annotations
const useEmployeeListContext = create<EmployeeListFormState>((set) => ({
  zIsOpenDialog: false,
  zSetIsOpenDialog: (zIsOpenDialog: boolean) => set({ zIsOpenDialog }),
  zDialogTitle: "",
  zSetDialogTitle: (zDialogTitle: string) => set({ zDialogTitle }),
  zPage: 1,
  zSetPage: (zPage: number) => set({ zPage }),
  zPageSize: 3,
  zSetPageSize: (zPageSize: number) => set({ zPageSize }),
  zStatusFilter: "not/a",
  zSetStatusFilter: (zStatusFilter: string) => set({ zStatusFilter }),
  zEmpListAEData: initialData,
  zSetEmpListAEData: (data) => set({ zEmpListAEData: data }),
}));

export default useEmployeeListContext;
