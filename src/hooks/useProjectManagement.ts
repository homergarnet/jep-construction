import { projectManagementApi } from "@/api/projectManagementApi";
import useProjectManagementContext from "@/store/projectManagement/projectManagementContext";
import type {
  CreateUpdateProjectManagementRequest,
  GetProjectManagementByIdParams,
  GetProjectManagementParams,
  ProjectManagementResponse,
} from "@/types/projectmanagement";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCreateProjectManagement = () => {
  const queryClient = useQueryClient();
  const zPage = useProjectManagementContext((state) => state.zPage);
  const zPageSize = useProjectManagementContext((state) => state.zPageSize);
  const zStatusFilter = useProjectManagementContext(
    (state) => state.zStatusFilter
  );

  return useMutation({
    mutationFn: (payload: CreateUpdateProjectManagementRequest) =>
      projectManagementApi.createProjectManagement(payload),
    onSuccess: (res) => {
      // pass it in zustand store if we want dynamic
      queryClient.invalidateQueries({
        queryKey: [
          "projectmanagements",
          { keyword: zStatusFilter, page: zPage, pageSize: zPageSize },
        ],
      });
    },
    onError: (error: Error) => {
      //   showToast(error.message, "error");
    },
  });
};

export const useGetProjectManagementList = (
  params: GetProjectManagementParams
) => {
  return useQuery<ProjectManagementResponse>({
    queryKey: ["projectmanagements", params],
    queryFn: () => projectManagementApi.getProjectManagementList(params),
  });
};

export const useGetProjectManagementById = (
  params: GetProjectManagementByIdParams,
  enabled = true
) => {
  return useQuery<ProjectManagementResponse>({
    queryKey: ["projectmanagement", params.id],
    queryFn: () => projectManagementApi.getProjectManagementById(params),
    enabled: !!params.id && enabled,
  });
};

export const useUpdateProjectManagement = () => {
  const queryClient = useQueryClient();
  const zPage = useProjectManagementContext((state) => state.zPage);
  const zPageSize = useProjectManagementContext((state) => state.zPageSize);
  const zStatusFilter = useProjectManagementContext(
    (state) => state.zStatusFilter
  );

  return useMutation({
    mutationFn: (payload: CreateUpdateProjectManagementRequest) =>
      projectManagementApi.updateProjectManagement(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          "projectmanagements",
          { keyword: zStatusFilter, page: zPage, pageSize: zPageSize },
        ],
      });
    },
    onError: (error: Error) => {
      // showToast(error.message, "error");
    },
  });
};

export const useRemoveProjectManagement = () => {
  const queryClient = useQueryClient();
  const zPage = useProjectManagementContext((state) => state.zPage);
  const zPageSize = useProjectManagementContext((state) => state.zPageSize);
  const zStatusFilter = useProjectManagementContext(
    (state) => state.zStatusFilter
  );

  return useMutation({
    mutationFn: (id: number) =>
      projectManagementApi.removeProjectManagement(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          "projectmanagements",
          { keyword: zStatusFilter, page: zPage, pageSize: zPageSize },
        ],
      });
    },
    onError: (error: Error) => {
      // showToast(error.message, "error");
    },
  });
};
