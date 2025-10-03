import type {
  CreateUpdateClientRequest,
  ClientListResponse,
  GetClientByIdParams,
  GetClientListParams,
} from "@/types/clientlist";
import apiConfig from "./apiConfig";
import type { ClientListFormValues } from "@/pages/admin/schema/clientListFormSchema";
import useClientListContext from "@/store/client/clientListContext";

export const clientListApi = {
  createClientRequest: async (
    payload: CreateUpdateClientRequest
  ): Promise<ClientListResponse> => {
    const { data } = await apiConfig.post<ClientListResponse>(
      "/EmployeeList/create-employee",
      payload
    );

    if (!data.IsSuccess) {
      throw new Error(data.ApiMessage);
    }

    // Return the full response, not just ApiMessage
    return data;
  },

  getClientList: async (
    params: GetClientListParams
  ): Promise<ClientListResponse> => {
    const { data } = await apiConfig.get("/EmployeeList/get-employee-list", {
      params,
    });

    if (!data.IsSuccess) {
      throw new Error(data.ApiMessage);
    }

    return data;
  },

  getClientById: async (
    params: GetClientByIdParams
  ): Promise<ClientListResponse> => {
    const { data } = await apiConfig.get("/EmployeeList/get-employee-by-id", {
      params,
    });

    const result = {
      id: data.UserList[0].Id,
      email: data.UserList[0].Email,
      firstname: data.UserList[0].Firstname,
      lastname: data.UserList[0].Lastname,
      mobileNumber: data.UserList[0].MobileNumber,
      position: data.UserList[0].Position,
      salary: data.UserList[0].Salary,
      status: data.UserList[0].Status,
      address: data.UserList[0].Address,
      dateOfBirth: data.UserList[0].DateOfBirth.split("T")[0],
    } as ClientListFormValues;

    useClientListContext.getState().zSetClientListAEData(result);
    if (!data.IsSuccess) {
      throw new Error(data.ApiMessage);
    }

    return data;
  },

  updateClient: async (
    payload: CreateUpdateClientRequest
  ): Promise<ClientListResponse> => {
    const { data } = await apiConfig.put<ClientListResponse>(
      "/EmployeeList/update-employee",
      payload
    );

    if (!data.IsSuccess) {
      throw new Error(data.ApiMessage);
    }
    return data;
  },

  removeClient: async (id: number): Promise<ClientListResponse> => {
    const { data } = await apiConfig.put<ClientListResponse>(
      `/EmployeeList/soft-delete-employee-by-id/${id}`
    );

    if (!data.IsSuccess) {
      throw new Error(data.ApiMessage);
    }
    return data;
  },
};
