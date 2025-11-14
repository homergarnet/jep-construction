import type {
  CreateUpdateEmployeeRequest,
  EmployeeListResponse,
  GetEmployeeByIdParams,
  GetEmployeeListParams,
} from "@/types/employeelist";
import apiConfig from "./apiConfig";
import useEmployeeListContext from "@/store/employee/employeeList/employeeListContext";
import type { EmployeeListFormValues } from "@/pages/admin/employee/schema/employeeListFormSchema";

export const employeeListApi = {
  createEmployee: async (
    payload: CreateUpdateEmployeeRequest
  ): Promise<EmployeeListResponse> => {
    const { data } = await apiConfig.post<EmployeeListResponse>(
      "/EmployeeList/create-employee",
      payload
    );

    if (!data.IsSuccess) {
      throw new Error(data.ApiMessage);
    }

    // Return the full response, not just ApiMessage
    return data;
  },

  getEmployeeList: async (
    params: GetEmployeeListParams
  ): Promise<EmployeeListResponse> => {
    const { data } = await apiConfig.get("/EmployeeList/get-employee-list", {
      params,
    });

    if (!data.IsSuccess) {
      throw new Error(data.ApiMessage);
    }

    return data;
  },

  getEmployeeById: async (
    params: GetEmployeeByIdParams
  ): Promise<EmployeeListResponse> => {
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
      gender: data.UserList[0].Gender,
      department: data.UserList[0].Department,
      hourlyRate: data.UserList[0].HourlyRate,
      emergencyContactName: data.UserList[0].EmergencyContactName,
      emergencyRelationship: data.UserList[0].EmergencyRelationship,
      emergencyContactNo: data.UserList[0].EmergencyContactNo,
      dateOfBirth: data.UserList[0].DateOfBirth.split("T")[0],
    } as EmployeeListFormValues;

    useEmployeeListContext.getState().zSetEmpListAEData(result);
    if (!data.IsSuccess) {
      throw new Error(data.ApiMessage);
    }

    return data;
  },

  updateEmployee: async (
    payload: CreateUpdateEmployeeRequest
  ): Promise<EmployeeListResponse> => {
    const { data } = await apiConfig.put<EmployeeListResponse>(
      "/EmployeeList/update-employee",
      payload
    );

    if (!data.IsSuccess) {
      throw new Error(data.ApiMessage);
    }
    return data;
  },

  removeEmployee: async (id: number): Promise<EmployeeListResponse> => {
    const { data } = await apiConfig.put<EmployeeListResponse>(
      `/EmployeeList/soft-delete-employee-by-id/${id}`
    );

    if (!data.IsSuccess) {
      throw new Error(data.ApiMessage);
    }
    return data;
  },
};
