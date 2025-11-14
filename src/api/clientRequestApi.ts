import type {
  ClientRequestResponse,
  CreateCRReplyRequest,
  CreateUpdateClientReqRequest,
  GetClientRequestByIdParams,
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

  getClientRequestById: async (
    params: GetClientRequestByIdParams
  ): Promise<ClientRequestResponse> => {
    const { data } = await apiConfig.get("/ClientRequest/get-client-request-by-id", {
      params,
    });

    // const result = {
    //   id: data.UserList[0].Id,
    //   email: data.UserList[0].Email,
    //   firstname: data.UserList[0].Firstname,
    //   lastname: data.UserList[0].Lastname,
    //   mobileNumber: data.UserList[0].MobileNumber,
    //   position: data.UserList[0].Position,
    //   salary: data.UserList[0].Salary,
    //   status: data.UserList[0].Status,
    //   address: data.UserList[0].Address,
    //   dateOfBirth: data.UserList[0].DateOfBirth.split("T")[0],
    // } as ClientListFormValues;

    // useClientListContext.getState().zSetClientListAEData(result);
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
