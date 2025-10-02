// src/store.ts
import type { ProfileFormValues } from "@/pages/schema/profileFormSchema";
import create from "zustand";
//   id: data.ProfileList[0].Id,
//   profileImage: data.ProfileList[0].ProfileImage,
//   firstname: data.ProfileList[0].Firstname,
//   lastname: data.ProfileList[0].Lastname,
//   address: data.ProfileList[0].Address,
//   mobileNumber: data.ProfileList[0].MobileNumber,
//   dateOfBirth: data.ProfileList[0].DateOfBirth,
//   position: data.ProfileList[0].Position,
const initialData: ProfileFormValues = {
  id: undefined,
  firstname: "",
  lastname: "",
  address: "",
  mobileNumber: "",
  dateOfBirth: new Date(),
  position: "",
};

//for definining of types

interface ProfileFormState {
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
  zProfileImageStr: string;
  zSetProfileImageStr: (zProfileImageStr: string) => void;
  // NEW: standalone profileImage state
  zProfileImage: File | null;
  zSetProfileImage: (file: File | null) => void;
  // for updating and creating profile data
  zProfileAEData: ProfileFormValues;
  zSetProfileAEData: (data: ProfileFormValues) => void;
}

//for inialization
// Create the Zustand store with type annotations
const useProfileContext = create<ProfileFormState>((set) => ({
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
  zProfileImageStr: "",
  zSetProfileImageStr: (zProfileImageStr: string) => set({ zProfileImageStr }),
  zProfileImage: null,
  zSetProfileImage: (file) => set({ zProfileImage: file }),
  zProfileAEData: initialData,
  zSetProfileAEData: (data) => set({ zProfileAEData: data }),
}));

export default useProfileContext;
