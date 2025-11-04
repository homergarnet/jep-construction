import type {
  AssignProjectResponse,
  CNamePNameResponse,
  CreateUpdateAssignProjectRequest,
  GetAssignProjectByIdParams,
  GetAssignProjectParams,
} from "@/types/assignProject";
import apiConfig from "./apiConfig";
import type { AssignProjectFormValues } from "@/pages/admin/employee/schema/assignProjectFormSchema";
import useAssignProjectContext from "@/store/assignProject/useAssignProjectContext";

export const assignProjectApi = {
  createAssignProject: async (
    payload: CreateUpdateAssignProjectRequest
  ): Promise<AssignProjectResponse> => {
    const { data } = await apiConfig.post<AssignProjectResponse>(
      "/AssignProject/create-assign-project",
      payload
    );

    if (!data.IsSuccess) {
      throw new Error(data.ApiMessage);
    }

    // Return the full response, not just ApiMessage
    return data;
  },

  getAssignProjectList: async (
    params: GetAssignProjectParams
  ): Promise<AssignProjectResponse> => {
    const { data } = await apiConfig.get(
      "/AssignProject/get-assign-project-list",
      {
        params,
      }
    );

    if (!data.IsSuccess) {
      throw new Error(data.ApiMessage);
    }

    return data;
  },

  getCNamePNameList: async (
    params: GetAssignProjectParams
  ): Promise<CNamePNameResponse> => {
    const { data } = await apiConfig.get(
      "/AssignProject/get-cname-pname-list",
      {
        params,
      }
    );

    if (!data.IsSuccess) {
      throw new Error(data.ApiMessage);
    }

    return data;
  },

  getAssignProjectById: async (
    params: GetAssignProjectByIdParams
  ): Promise<AssignProjectResponse> => {
    const { data } = await apiConfig.get(
      "/AssignProject/get-assign-project-by-id",
      {
        params,
      }
    );

    const result = {
      id: data.AssignProjectList[0].Id,
      userId: data.AssignProjectList[0].UserId,
      projectId: data.AssignProjectList[0].ProjectId,
      employeeNumber: data.AssignProjectList[0].EmployeeNumber,
      employeeFullname: data.AssignProjectList[0].EmployeeName,
      clientName: data.AssignProjectList[0].ClientName,
      projectName: data.AssignProjectList[0].ProjectName,
      startDate: data.AssignProjectList[0].StartDate.split("T")[0],
      endDate: data.AssignProjectList[0].EndDate.split("T")[0],
    } as AssignProjectFormValues;

    useAssignProjectContext.getState().zSetAssProjectAEData(result);
    if (!data.IsSuccess) {
      throw new Error(data.ApiMessage);
    }

    return data;
  },

  updateAssignProject: async (
    payload: CreateUpdateAssignProjectRequest
  ): Promise<AssignProjectResponse> => {
    const { data } = await apiConfig.put<AssignProjectResponse>(
      "/AssignProject/update-assign-project",
      payload
    );

    if (!data.IsSuccess) {
      throw new Error(data.ApiMessage);
    }
    return data;
  },

  removeAssignProject: async (id: number): Promise<AssignProjectResponse> => {
    const { data } = await apiConfig.put<AssignProjectResponse>(
      `/AssignProject/soft-delete-assign-project-by-id/${id}`
    );

    if (!data.IsSuccess) {
      throw new Error(data.ApiMessage);
    }
    return data;
  },
};
