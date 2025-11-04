import type {
  CreateUpdateProjectManagementRequest,
  GetProjectIdByCNamePNameParams,
  GetProjectManagementByIdParams,
  GetProjectManagementParams,
  ProjectManagementResponse,
} from "@/types/projectmanagement";
import apiConfig from "./apiConfig";
import type { ProjectManagementFormValues } from "@/pages/admin/schema/projectManagementFormSchema";
import useProjectManagementContext from "@/store/projectManagement/projectManagementContext";
import useAssignProjectContext from "@/store/assignProject/useAssignProjectContext";

export const projectManagementApi = {
  createProjectManagement: async (
    payload: CreateUpdateProjectManagementRequest
  ): Promise<ProjectManagementResponse> => {
    const { data } = await apiConfig.post<ProjectManagementResponse>(
      "/ProjectManagement/create-project-management",
      payload
    );

    if (!data.IsSuccess) {
      throw new Error(data.ApiMessage);
    }

    // Return the full response, not just ApiMessage
    return data;
  },

  getProjectManagementList: async (
    params: GetProjectManagementParams
  ): Promise<ProjectManagementResponse> => {
    const { data } = await apiConfig.get(
      "/ProjectManagement/get-project-management-list",
      {
        params,
      }
    );

    if (!data.IsSuccess) {
      throw new Error(data.ApiMessage);
    }

    return data;
  },

  getProjectManagementById: async (
    params: GetProjectManagementByIdParams
  ): Promise<ProjectManagementResponse> => {
    const { data } = await apiConfig.get(
      "/ProjectManagement/get-project-management-by-id",
      {
        params,
      }
    );

    const result = {
      userId: data.ProjectManagementList[0].UserId,
      projectName: data.ProjectManagementList[0].ProjectName,
      startDate: data.ProjectManagementList[0].StartDate.split("T")[0],
      endDate: data.ProjectManagementList[0].EndDate.split("T")[0],
      budget: data.ProjectManagementList[0].Budget,
      location: data.ProjectManagementList[0].Location,
      description: data.ProjectManagementList[0].Description,
      completionStatus: data.ProjectManagementList[0].CompletionStatus,
    } as ProjectManagementFormValues;
    console.log("result", result);
    useProjectManagementContext.getState().zSetprojectManagementAEData(result);
    if (!data.IsSuccess) {
      throw new Error(data.ApiMessage);
    }

    return data;
  },

  getProjectIdByCNamePName: async (
    params: GetProjectIdByCNamePNameParams
  ): Promise<ProjectManagementResponse> => {
    const { data } = await apiConfig.get(
      "/ProjectManagement/get-project-id-by-cname-pname",
      {
        params,
      }
    );
    // const result = {
    //   userId: data.ProjectManagementList[0].UserId,
    //   projectName: data.ProjectManagementList[0].ProjectName,
    //   startDate: data.ProjectManagementList[0].StartDate.split("T")[0],
    //   endDate: data.ProjectManagementList[0].EndDate.split("T")[0],
    //   budget: data.ProjectManagementList[0].Budget,
    //   location: data.ProjectManagementList[0].Location,
    //   description: data.ProjectManagementList[0].Description,
    //   completionStatus: data.ProjectManagementList[0].CompletionStatus,
    // } as ProjectManagementFormValues;
    // console.log("result", result);
    // useProjectManagementContext.getState().zSetprojectManagementAEData(result);
    useAssignProjectContext
      .getState()
      .zSetProjectId(data.ProjectManagementList[0].Id);
    if (!data.IsSuccess) {
      throw new Error(data.ApiMessage);
    }

    return data;
  },

  updateProjectManagement: async (
    payload: CreateUpdateProjectManagementRequest
  ): Promise<ProjectManagementResponse> => {
    const { data } = await apiConfig.put<ProjectManagementResponse>(
      "/ProjectManagement/update-project-management",
      payload
    );

    if (!data.IsSuccess) {
      throw new Error(data.ApiMessage);
    }
    return data;
  },

  removeProjectManagement: async (
    id: number
  ): Promise<ProjectManagementResponse> => {
    const { data } = await apiConfig.put<ProjectManagementResponse>(
      `/ProjectManagement/soft-delete-project-management-by-id/${id}`
    );

    if (!data.IsSuccess) {
      throw new Error(data.ApiMessage);
    }
    return data;
  },
};
