import { inventoryApi } from "@/api/inventoryApi";
import useInventoryContext from "@/store/inventory/inventoryContext";
import type {
  CreateUpdateInventoryRequest,
  GetInventoryByIdParams,
  GetInventoryParams,
  InventoryResponse,
} from "@/types/inventory";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCreateInventory = () => {
  const queryClient = useQueryClient();
  const zPage = useInventoryContext((state) => state.zPage);
  const zPageSize = useInventoryContext((state) => state.zPageSize);
  const zStatusFilter = useInventoryContext((state) => state.zStatusFilter);

  return useMutation({
    mutationFn: (payload: CreateUpdateInventoryRequest) =>
      inventoryApi.createInventory(payload),
    onSuccess: (res) => {
      // pass it in zustand store if we want dynamic
      queryClient.invalidateQueries({
        queryKey: [
          "inventories",
          { keyword: zStatusFilter, page: zPage, pageSize: zPageSize },
        ],
      });
    },
    onError: (error: Error) => {
      //   showToast(error.message, "error");
    },
  });
};

export const useGetInventoryList = (params: GetInventoryParams) => {
  return useQuery<InventoryResponse>({
    queryKey: ["inventories", params],
    queryFn: () => inventoryApi.getInventoryList(params),
  });
};

export const useGetInventoryById = (
  params: GetInventoryByIdParams,
  enabled = true
) => {
  return useQuery<InventoryResponse>({
    queryKey: ["inventory", params.id],
    queryFn: () => inventoryApi.getInventoryById(params),
    enabled: !!params.id && enabled,
  });
};

export const useUpdateInventory = () => {
  const queryClient = useQueryClient();
  const zPage = useInventoryContext((state) => state.zPage);
  const zPageSize = useInventoryContext((state) => state.zPageSize);
  const zStatusFilter = useInventoryContext((state) => state.zStatusFilter);

  return useMutation({
    mutationFn: (payload: CreateUpdateInventoryRequest) =>
      inventoryApi.updateInventory(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          "inventories",
          { keyword: zStatusFilter, page: zPage, pageSize: zPageSize },
        ],
      });
    },
    onError: (error: Error) => {
      // showToast(error.message, "error");
    },
  });
};

export const useRemoveInventory = () => {
  const queryClient = useQueryClient();
  const zPage = useInventoryContext((state) => state.zPage);
  const zPageSize = useInventoryContext((state) => state.zPageSize);
  const zStatusFilter = useInventoryContext((state) => state.zStatusFilter);

  return useMutation({
    mutationFn: (id: number) => inventoryApi.removeInventory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          "inventories",
          { keyword: zStatusFilter, page: zPage, pageSize: zPageSize },
        ],
      });
    },
    onError: (error: Error) => {
      // showToast(error.message, "error");
    },
  });
};
