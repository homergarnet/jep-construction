import type { ClientRequestResponse } from "@/types/clientrequest";
import type { CreateUpdateHomeRequest } from "@/types/home";
import apiConfig from "./apiConfig";

export const homeApi = {
  createEmployee: async (
    payload: CreateUpdateHomeRequest
  ): Promise<ClientRequestResponse> => {
    const { data } = await apiConfig.post<ClientRequestResponse>(
      "/ClientRequest/create-client-request",
      payload
    );

    if (!data.IsSuccess) {
      throw new Error(data.ApiMessage);
    }

    // Return the full response, not just ApiMessage
    return data;
  },
};
