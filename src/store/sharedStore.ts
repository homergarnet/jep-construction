import create from "zustand";

interface SharedState {
  zError: string;
  zSetError: (zError: string) => void;
  zLoading: boolean;
  zSetLoading: (zLoading: boolean) => void;
  zIsDrawerOpen: boolean;
  zSetIsDrawerOpen: (zIsDrawerOpen: boolean) => void;
  zLocation: string;
  zSetLocation: (zLocation: string) => void;
}

const useSharedStore = create<SharedState>((set) => ({
  zError: "",
  zSetError: (zError) => set({ zError }),
  zLoading: false,
  zSetLoading: (zLoading) => set({ zLoading }),
  zIsDrawerOpen: true,
  zSetIsDrawerOpen: (zIsDrawerOpen) => set({ zIsDrawerOpen }),
  zLocation: "",
  zSetLocation: (zLocation) => set({ zLocation }),
}));

export default useSharedStore;
