import { homeApi } from "@/api/homeApi";
import type { CreateUpdateHomeRequest } from "@/types/home";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateHome = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateUpdateHomeRequest) =>
      homeApi.createEmployee(payload),
    onSuccess: (res) => {
      // pass it in zustand store if we want dynamic
      //   queryClient.invalidateQueries({
      //     queryKey: [
      //       "employees",
      //       { keyword: zStatusFilter, page: zPage, pageSize: zPageSize },
      //     ],
      //   });
    },
    onError: (error: Error) => {
      //   showToast(error.message, "error");
    },
  });
};
