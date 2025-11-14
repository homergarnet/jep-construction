// src/store.ts
import type { EmpAttendanceFormValues } from "@/pages/admin/employee/schema/empAttendanceFormSchema";
import create from "zustand";

const initialData: EmpAttendanceFormValues = {
  id: undefined,
  timeInOut: new Date().toISOString(), // ISO string matches z.string().datetime()
  timeInOutType: "",
};

//for definining of types

interface EmpAttendanceFormState {
  zIsOpenDialog: boolean;
  zSetIsOpenDialog: (zIsOpenDialog: boolean) => void;
  zDialogTitle: string;
  zSetDialogTitle: (zDialogTitle: string) => void;
  zIsOpenDialog2: boolean;
  zSetIsOpenDialog2: (zIsOpenDialog2: boolean) => void;
  zPage: number;
  zSetPage: (zPage: number) => void;
  zPageSize: number;
  zSetPageSize: (zPageSize: number) => void;
  zStatusFilter: string;
  zSetStatusFilter: (zStatusFilter: string) => void;
  zEaId: number;
  zSetEaId: (zEaId: number) => void;
  // for updating and creating employeeList data
  zEmpAttendanceAEData: EmpAttendanceFormValues;
  zSetEmpAttendanceAEData: (data: EmpAttendanceFormValues) => void;
}

//for inialization
// Create the Zustand store with type annotations
const useEmpAttendanceContext = create<EmpAttendanceFormState>((set) => ({
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
  zEaId: 3,
  zSetEaId: (zEaId: number) => set({ zEaId }),
  zEmpAttendanceAEData: initialData,
  zSetEmpAttendanceAEData: (data) => set({ zEmpAttendanceAEData: data }),
}));

export default useEmpAttendanceContext;
