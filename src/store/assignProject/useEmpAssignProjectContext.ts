import create from "zustand";

//for definining of types

interface AssignProjectFormState {
  zPage: number;
  zSetPage: (zPage: number) => void;
  zPageSize: number;
  zSetPageSize: (zPageSize: number) => void;
  zStatusFilter: string;
  zSetStatusFilter: (zStatusFilter: string) => void;
}

//for inialization
// Create the Zustand store with type annotations
const useEmpAssignProjectContext = create<AssignProjectFormState>((set) => ({
  zPage: 1,
  zSetPage: (zPage: number) => set({ zPage }),
  zPageSize: 3,
  zSetPageSize: (zPageSize: number) => set({ zPageSize }),
  zStatusFilter: "not/a",
  zSetStatusFilter: (zStatusFilter: string) => set({ zStatusFilter }),
}));

export default useEmpAssignProjectContext;
