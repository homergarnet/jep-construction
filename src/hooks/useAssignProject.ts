import { assignProjectApi } from "@/api/assignProjectApi";
import useAssignProjectContext from "@/store/assignProject/useAssignProjectContext";
import type {
  AssignProjectResponse,
  CNamePNameResponse,
  CreateUpdateAssignProjectRequest,
  GetAssignProjectByIdParams,
  GetAssignProjectParams,
} from "@/types/assignProject";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCreateAssignProject = () => {
  const queryClient = useQueryClient();
  const zPage = useAssignProjectContext((state) => state.zPage);
  const zPageSize = useAssignProjectContext((state) => state.zPageSize);
  const zStatusFilter = useAssignProjectContext((state) => state.zStatusFilter);

  return useMutation({
    mutationFn: (payload: CreateUpdateAssignProjectRequest) =>
      assignProjectApi.createAssignProject(payload),
    onSuccess: (res) => {
      // pass it in zustand store if we want dynamic
      queryClient.invalidateQueries({
        queryKey: [
          "assignProjects",
          { keyword: zStatusFilter, page: zPage, pageSize: zPageSize },
        ],
      });
    },
    onError: (error: Error) => {
      //   showToast(error.message, "error");
    },
  });
};

export const useGetAssProjectList = (params: GetAssignProjectParams) => {
  return useQuery<AssignProjectResponse>({
    queryKey: ["assignProjects", params],
    queryFn: () => assignProjectApi.getAssignProjectList(params),
  });
};

export const useGetCNamePNameList = (params: GetAssignProjectParams) => {
  return useQuery<CNamePNameResponse>({
    queryKey: ["cNamePNameList", params],
    queryFn: () => assignProjectApi.getCNamePNameList(params),
  });
};

export const useGetAssignProjectById = (
  params: GetAssignProjectByIdParams,
  enabled = true
) => {
  return useQuery<AssignProjectResponse>({
    queryKey: ["assignProjects", params.id],
    queryFn: () => assignProjectApi.getAssignProjectById(params),
    enabled: !!params.id && enabled,
  });
};

export const useUpdateAssignProject = () => {
  const queryClient = useQueryClient();
  const zPage = useAssignProjectContext((state) => state.zPage);
  const zPageSize = useAssignProjectContext((state) => state.zPageSize);
  const zStatusFilter = useAssignProjectContext((state) => state.zStatusFilter);

  return useMutation({
    mutationFn: (payload: CreateUpdateAssignProjectRequest) =>
      assignProjectApi.updateAssignProject(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          "assignProjects",
          { keyword: zStatusFilter, page: zPage, pageSize: zPageSize },
        ],
      });
    },
    onError: (error: Error) => {
      // showToast(error.message, "error");
    },
  });
};

export const useRemoveAssignProject = () => {
  const queryClient = useQueryClient();
  const zPage = useAssignProjectContext((state) => state.zPage);
  const zPageSize = useAssignProjectContext((state) => state.zPageSize);
  const zStatusFilter = useAssignProjectContext((state) => state.zStatusFilter);

  return useMutation({
    mutationFn: (id: number) => assignProjectApi.removeAssignProject(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          "assignProjects",
          { keyword: zStatusFilter, page: zPage, pageSize: zPageSize },
        ],
      });
    },
    onError: (error: Error) => {
      // showToast(error.message, "error");
    },
  });
};
