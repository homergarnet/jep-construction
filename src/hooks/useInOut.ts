import { empAttendanceListApi } from "@/api/empAttendanceListApi";
import type { CreateUpdateInOutRequest } from "@/types/inout";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateInOut = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateUpdateInOutRequest) =>
      empAttendanceListApi.createAttendance(payload),
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
