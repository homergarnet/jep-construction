import { clientRequestApi } from "@/api/clientRequestApi";
import useClientRequestContext from "@/store/clientRequest/clientRequestContext";
import type {
  ClientRequestResponse,
  GetClientRequestParams,
} from "@/types/clientrequest";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetClientRequestList = (params: GetClientRequestParams) => {
  return useQuery<ClientRequestResponse>({
    queryKey: ["clientrequests", params],
    queryFn: () => clientRequestApi.getClientRequestList(params),
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
