import { clientRequestApi } from "@/api/clientRequestApi";
import useClientRequestContext from "@/store/clientRequest/clientRequestContext";
import type {
  ClientRequestResponse,
  CreateCRReplyRequest,
  GetClientRequestByIdParams,
  GetClientRequestParams,
} from "@/types/clientrequest";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetClientRequestList = (params: GetClientRequestParams) => {
  return useQuery<ClientRequestResponse>({
    queryKey: ["clientrequests", params],
    queryFn: () => clientRequestApi.getClientRequestList(params),
  });
};

export const useGetClientRequestById = (
  params: GetClientRequestByIdParams,
  enabled = true
) => {
  return useQuery<ClientRequestResponse>({
    queryKey: ["clientrequest", params.id],
    queryFn: () => clientRequestApi.getClientRequestById(params),
    enabled: !!params.id && enabled,
  });
};

export const useRemoveClientRequest = () => {
  const queryClient = useQueryClient();
  const zPage = useClientRequestContext((state) => state.zPage);
  const zPageSize = useClientRequestContext((state) => state.zPageSize);
  const zStatusFilter = useClientRequestContext((state) => state.zStatusFilter);

  return useMutation({
    mutationFn: (id: number) => clientRequestApi.removeClientRequest(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          "clientrequests",
          { keyword: zStatusFilter, page: zPage, pageSize: zPageSize },
        ],
      });
    },
    onError: (error: Error) => {
      // showToast(error.message, "error");
    },
  });
};

export const useCreateCRReply = () => {
  const queryClient = useQueryClient();
  const zPage = useClientRequestContext((state) => state.zPage);
  const zPageSize = useClientRequestContext((state) => state.zPageSize);
  const zStatusFilter = useClientRequestContext((state) => state.zStatusFilter);

  return useMutation({
    mutationFn: (payload: CreateCRReplyRequest) =>
      clientRequestApi.createCRReply(payload),
    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: [
          "clientrequests",
          { keyword: zStatusFilter, page: zPage, pageSize: zPageSize },
        ],
      });
    },
    onError: (error: Error) => {
      //   showToast(error.message, "error");
    },
  });
};
