// src/store.ts
import type { AssignProjectFormValues } from "@/pages/admin/employee/schema/assignProjectFormSchema";
import type { UserListDto } from "@/types/clientlist";

import create from "zustand";
const initialData: AssignProjectFormValues = {
  id: undefined,
  userId: 0,
  projectId: 0,
  employeeNumber: "",
  employeeFullname: "",
  clientName: "",
  projectName: "",
  startDate: new Date(),
  endDate: new Date(),
};

//for definining of types

interface AssignProjectFormState {
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
  zAssignProjectId: number;
  zSetAssignProjectId: (zAssignProjectId: number) => void;
  zUserId: number;
  zSetUserId: (zUserId: number) => void;
  zProjectId: number;
  zSetProjectId: (zProjectId: number) => void;
  zEmpList: UserListDto[];
  zSetEmpList: (zEmpList: UserListDto[]) => void;
  // for updating and creating employeeList data
  zAssProjectAEData: AssignProjectFormValues;
  zSetAssProjectAEData: (data: AssignProjectFormValues) => void;
  clearAssProjectAEData: () => Promise<void>;
}

//for inialization
// Create the Zustand store with type annotations
const useAssignProjectContext = create<AssignProjectFormState>((set) => ({
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
  zAssignProjectId: 0,
  zSetAssignProjectId: (zAssignProjectId: number) => set({ zAssignProjectId }),
  zUserId: 0,
  zSetUserId: (zUserId: number) => set({ zUserId }),
  zProjectId: 0,
  zSetProjectId: (zProjectId: number) => set({ zProjectId }),
  zEmpList: [],
  zSetEmpList: (zEmpList: UserListDto[]) => set({ zEmpList }),
  zAssProjectAEData: initialData,
  zSetAssProjectAEData: (data) => set({ zAssProjectAEData: data }),
  clearAssProjectAEData: async () => {
    set({ zAssProjectAEData: initialData });
  },
}));

export default useAssignProjectContext;
