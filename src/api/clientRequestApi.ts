import type {
  ClientRequestResponse,
  CreateCRReplyRequest,
  CreateUpdateClientReqRequest,
  GetClientRequestParams,
} from "@/types/clientrequest";
import apiConfig from "./apiConfig";
import type { GetClientListParams } from "@/types/clientlist";

export const clientRequestApi = {
  getClientRequestList: async (
    params: GetClientRequestParams
  ): Promise<ClientRequestResponse> => {
    const { data } = await apiConfig.get(
      "/ClientRequest/get-client-request-list",
      {
        params,
      }
    );

    if (!data.IsSuccess) {
      throw new Error(data.ApiMessage);
    }

    return data;
  },

  removeClientRequest: async (id: number): Promise<ClientRequestResponse> => {
    const { data } = await apiConfig.put<ClientRequestResponse>(
      `/ClientRequest/soft-delete-client-request-by-id/${id}`
    );

    if (!data.IsSuccess) {
      throw new Error(data.ApiMessage);
    }
    return data;
  },

  createCRReply: async (
    payload: CreateCRReplyRequest
  ): Promise<ClientRequestResponse> => {
    const { data } = await apiConfig.post<ClientRequestResponse>(
      "/ClientRequest/send-email",
      payload
    );

    if (!data.IsSuccess) {
      throw new Error(data.ApiMessage);
    }

    // Return the full response, not just ApiMessage
    return data;
  },
};
