// src/store.ts
import type { ProjectManagementFormValues } from "@/pages/admin/schema/projectManagementFormSchema";
import create from "zustand";
const initialData: ProjectManagementFormValues = {
  id: undefined,
  userId: 0,
  projectName: "",
  startDate: new Date(),
  endDate: new Date(),
  budget: 0,
  location: "",
  description: "",
  completionStatus: 0,
};

//for definining of types

interface ProjectManagementFormState {
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
  // for updating and creating projectManagement data
  zProjectManagementAEData: ProjectManagementFormValues;
  zSetprojectManagementAEData: (data: ProjectManagementFormValues) => void;
}

//for inialization
// Create the Zustand store with type annotations
const useProjectManagementContext = create<ProjectManagementFormState>(
  (set) => ({
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
    zProjectManagementAEData: initialData,
    zSetprojectManagementAEData: (data) =>
      set({ zProjectManagementAEData: data }),
  })
);

export default useProjectManagementContext;
