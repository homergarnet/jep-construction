import type { AuthResponse, LoginPayload, RegisterPayload } from "@/types/auth";
import apiConfig from "./apiConfig";

export const authApi = {

  login: async (payload: LoginPayload): Promise<string> => {
    const { data } = await apiConfig.post<AuthResponse>("/Auth/login", payload);

    if (!data.IsSuccess) {
      throw new Error("Login failed");
    }

    // Return only the token
    return data.ApiMessage;
  },

  getProfile: async () => {
    const { data } = await apiConfig.get("/Auth/profile");
    return data; // adjust based on your API shape
  },

  logout: async () => {
    await apiConfig.post("/Auth/logout");
    localStorage.removeItem("token");
  },
};
