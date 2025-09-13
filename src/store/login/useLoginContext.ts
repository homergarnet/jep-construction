// src/store.ts
import create from "zustand";

import { isAuthenticated } from "../../utils/tokenhelpers";

//for definining of types

interface LoginFormState {

}

//for inialization
// Create the Zustand store with type annotations
const useLoginContext = create<LoginFormState>((set) => ({

}));

export default useLoginContext;
