// src/store.ts

import type { ReviewFormValues } from "@/pages/schema/reviewFormSchema";
import create from "zustand";

const initialData: ReviewFormValues = {
  id: undefined,
  rate: 0,
  reviewDescription: "",
};

//for definining of types
interface ReviewFormState {
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
  zIsCreateReview: boolean;
  zSetIsCreateReview: (zIsCreateReview: boolean) => void;
  // for updating and creating review data
  zReviewAEData: ReviewFormValues;
  zSetReviewAEData: (data: ReviewFormValues) => void;
  clearReviewAEData: () => Promise<void>;
}

//for inialization
// Create the Zustand store with type annotations
const useReviewContext = create<ReviewFormState>((set) => ({
  zIsOpenDialog: false,
  zSetIsOpenDialog: (zIsOpenDialog: boolean) => set({ zIsOpenDialog }),
  zDialogTitle: "",
  zSetDialogTitle: (zDialogTitle: string) => set({ zDialogTitle }),
  zPage: 1,
  zSetPage: (zPage: number) => set({ zPage }),
  zPageSize: 3,
  zSetPageSize: (zPageSize: number) => set({ zPageSize }),
  zStatusFilter: "",
  zSetStatusFilter: (zStatusFilter: string) => set({ zStatusFilter }),
  zIsCreateReview: true,
  zSetIsCreateReview: (zIsCreateReview: boolean) => set({ zIsCreateReview }),
  zReviewAEData: initialData,
  zSetReviewAEData: (data) => set({ zReviewAEData: data }),
  clearReviewAEData: async () => {
    set({ zReviewAEData: initialData });
  },
}));

export default useReviewContext;
