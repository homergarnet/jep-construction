import { empAttendanceListApi } from "@/api/empAttendanceListApi";
import useEmpAttendanceContext from "@/store/employee/empAttendance/empAttendanceContext";
import type {
  CreateUpdateEmpAttendanceRequest,
  EmpAttendanceListResponse,
  GetEmpAttendanceByIdParams,
  GetEmpAttendanceListParams,
} from "@/types/empAttendance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetEmpAttendanceList = (params: GetEmpAttendanceListParams) => {
  return useQuery<EmpAttendanceListResponse>({
    queryKey: ["empattendances", params],
    queryFn: () => empAttendanceListApi.getEmpAttendanceList(params),
  });
};

export const useGetEmpAttendanceById = (
  params: GetEmpAttendanceByIdParams,
  enabled = true
) => {
  return useQuery<EmpAttendanceListResponse>({
    queryKey: ["empattendance", params.id],
    queryFn: () => empAttendanceListApi.getEmpAttendanceById(params),
    enabled: !!params.id && enabled,
  });
};

export const useUpdateEmpAttendance = () => {
  const queryClient = useQueryClient();
  const zPage = useEmpAttendanceContext((state) => state.zPage);
  const zPageSize = useEmpAttendanceContext((state) => state.zPageSize);
  const zStatusFilter = useEmpAttendanceContext((state) => state.zStatusFilter);

  return useMutation({
    mutationFn: (payload: CreateUpdateEmpAttendanceRequest) =>
      empAttendanceListApi.updateEmpAttendance(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          "empattendances",
          { keyword: zStatusFilter, page: zPage, pageSize: zPageSize },
        ],
      });
    },
    onError: (error: Error) => {
      // showToast(error.message, "error");
    },
  });
};

export const useRemoveEmpAttendance = () => {
  const queryClient = useQueryClient();
  const zPage = useEmpAttendanceContext((state) => state.zPage);
  const zPageSize = useEmpAttendanceContext((state) => state.zPageSize);
  const zStatusFilter = useEmpAttendanceContext((state) => state.zStatusFilter);

  return useMutation({
    mutationFn: (id: number) => empAttendanceListApi.removeEmpAttendance(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          "empattendances",
          { keyword: zStatusFilter, page: zPage, pageSize: zPageSize },
        ],
      });
    },
    onError: (error: Error) => {
      // showToast(error.message, "error");
    },
  });
};
