// src/store.ts
import type { InventoryFormValues } from "@/pages/schema/inventoryFormSchema";
import create from "zustand";
const initialData: InventoryFormValues = {
  id: undefined,
  userId: 0,
  itemName: "",
  category: "",
  quantity: 0,
  unitOfMeasure: "",
  description: "",
};

//for definining of types

interface InventoryFormState {
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
  // for updating and creating inventory data
  zInventoryAEData: InventoryFormValues;
  zSetInventoryAEData: (data: InventoryFormValues) => void;
}

//for inialization
// Create the Zustand store with type annotations
const useInventoryContext = create<InventoryFormState>((set) => ({
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
  zInventoryAEData: initialData,
  zSetInventoryAEData: (data) => set({ zInventoryAEData: data }),
}));

export default useInventoryContext;
