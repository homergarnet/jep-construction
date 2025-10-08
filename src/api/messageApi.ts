import type {
  CreateUpdateEmployeeRequest,
  EmployeeListResponse,
  GetEmployeeByIdParams,
  GetEmployeeListParams,
} from "@/types/employeelist";
import apiConfig from "./apiConfig";
import useEmployeeListContext from "@/store/employee/employeeList/employeeListContext";
import type { EmployeeListFormValues } from "@/pages/admin/employee/schema/employeeListFormSchema";
import type {
  ConvoRowResponse,
  CreateUpdateMessageRequest,
  GetConvoRowParams,
  GetMessageParams,
  GetMessageUserParams,
  MessageResponse,
} from "@/types/messages";

export const messageApi = {
  createMessage: async (
    payload: CreateUpdateMessageRequest
  ): Promise<MessageResponse> => {
    const { data } = await apiConfig.post<MessageResponse>(
      "/Message/create-message",
      payload
    );

    if (!data.IsSuccess) {
      throw new Error(data.ApiMessage);
    }

    // Return the full response, not just ApiMessage
    return data;
  },

  getMessageList: async (
    params: GetMessageParams
  ): Promise<MessageResponse> => {
    const { data } = await apiConfig.get("/Message/get-message-list", {
      params,
    });

    if (!data.IsSuccess) {
      throw new Error(data.ApiMessage);
    }

    return data;
  },

  getConvoRowList: async (
    params: GetConvoRowParams
  ): Promise<ConvoRowResponse> => {
    const { data } = await apiConfig.get("/Message/get-convo-row-list", {
      params,
    });

    if (!data.IsSuccess) {
      throw new Error(data.ApiMessage);
    }

    return data;
  },

  getMessageUserList: async (
    params: GetMessageUserParams
  ): Promise<EmployeeListResponse> => {
    const { data } = await apiConfig.get("/Message/get-message-user-list", {
      params,
    });

    if (!data.IsSuccess) {
      throw new Error(data.ApiMessage);
    }

    return data;
  },

  setReadById: async (
    senderId: number,
    userId: number
  ): Promise<MessageResponse> => {
    const { data } = await apiConfig.put<MessageResponse>(
      `/Message/set-read-by-id/${senderId}/${userId}`
    );

    if (!data.IsSuccess) {
      throw new Error(data.ApiMessage);
    }
    return data;
  },
};
