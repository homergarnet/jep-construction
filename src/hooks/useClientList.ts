import { clientListApi } from "@/api/clientListApi";
import useClientListContext from "@/store/client/clientListContext";
import type {
  ClientListResponse,
  CreateUpdateClientRequest,
  GetClientByIdParams,
  GetClientListParams,
} from "@/types/clientlist";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCreateClient = () => {
  const queryClient = useQueryClient();
  const zPage = useClientListContext((state) => state.zPage);
  const zPageSize = useClientListContext((state) => state.zPageSize);
  const zStatusFilter = useClientListContext((state) => state.zStatusFilter);

  return useMutation({
    mutationFn: (payload: CreateUpdateClientRequest) =>
      clientListApi.createClient(payload),
    onSuccess: (res) => {
      // pass it in zustand store if we want dynamic
      queryClient.invalidateQueries({
        queryKey: [
          "clients",
          { keyword: zStatusFilter, page: zPage, pageSize: zPageSize },
        ],
      });
    },
    onError: (error: Error) => {
      //   showToast(error.message, "error");
    },
  });
};

export const useGetClientList = (params: GetClientListParams) => {
  return useQuery<ClientListResponse>({
    queryKey: ["clients", params],
    queryFn: () => clientListApi.getClientList(params),
  });
};

export const useGetClientById = (
  params: GetClientByIdParams,
  enabled = true
) => {
  return useQuery<ClientListResponse>({
    queryKey: ["client", params.id],
    queryFn: () => clientListApi.getClientById(params),
    enabled: !!params.id && enabled,
  });
};

export const useUpdateClient = () => {
  const queryClient = useQueryClient();
  const zPage = useClientListContext((state) => state.zPage);
  const zPageSize = useClientListContext((state) => state.zPageSize);
  const zStatusFilter = useClientListContext((state) => state.zStatusFilter);

  return useMutation({
    mutationFn: (payload: CreateUpdateClientRequest) =>
      clientListApi.updateClient(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          "clients",
          { keyword: zStatusFilter, page: zPage, pageSize: zPageSize },
        ],
      });
    },
    onError: (error: Error) => {
      // showToast(error.message, "error");
    },
  });
};

export const useRemoveClient = () => {
  const queryClient = useQueryClient();
  const zPage = useClientListContext((state) => state.zPage);
  const zPageSize = useClientListContext((state) => state.zPageSize);
  const zStatusFilter = useClientListContext((state) => state.zStatusFilter);

  return useMutation({
    mutationFn: (id: number) => clientListApi.removeClient(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          "clients",
          { keyword: zStatusFilter, page: zPage, pageSize: zPageSize },
        ],
      });
    },
    onError: (error: Error) => {
      // showToast(error.message, "error");
    },
  });
};
