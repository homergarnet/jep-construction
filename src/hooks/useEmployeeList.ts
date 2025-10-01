import { employeeListApi } from "@/api/employeeListApi";
import useEmployeeListContext from "@/store/employee/employeeList/employeeListContext";
import type {
  CreateUpdateEmployeeRequest,
  EmployeeListResponse,
  GetEmployeeByIdParams,
  GetEmployeeListParams,
  UserListDto,
} from "@/types/employeelist";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCreateEmployee = () => {
  const queryClient = useQueryClient();
  const zPage = useEmployeeListContext((state) => state.zPage);
  const zPageSize = useEmployeeListContext((state) => state.zPageSize);
  const zStatusFilter = useEmployeeListContext((state) => state.zStatusFilter);

  return useMutation({
    mutationFn: (payload: CreateUpdateEmployeeRequest) =>
      employeeListApi.createEmployee(payload),
    onSuccess: (res) => {
      // pass it in zustand store if we want dynamic
      queryClient.invalidateQueries({
        queryKey: [
          "employees",
          { keyword: zStatusFilter, page: zPage, pageSize: zPageSize },
        ],
      });
    },
    onError: (error: Error) => {
      //   showToast(error.message, "error");
    },
  });
};

export const useGetEmployeeList = (params: GetEmployeeListParams) => {
  return useQuery<EmployeeListResponse>({
    queryKey: ["employees", params],
    queryFn: () => employeeListApi.getEmployeeList(params),
  });
};

export const useGetEmployeeById = (
  params: GetEmployeeByIdParams,
  enabled = true
) => {
  return useQuery<EmployeeListResponse>({
    queryKey: ["employee", params.id],
    queryFn: () => employeeListApi.getEmployeeById(params),
    enabled: !!params.id && enabled,
  });
};

export const useUpdateEmployee = () => {
  const queryClient = useQueryClient();
  const zPage = useEmployeeListContext((state) => state.zPage);
  const zPageSize = useEmployeeListContext((state) => state.zPageSize);
  const zStatusFilter = useEmployeeListContext((state) => state.zStatusFilter);

  return useMutation({
    mutationFn: (payload: CreateUpdateEmployeeRequest) =>
      employeeListApi.updateEmployee(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          "employees",
          { keyword: zStatusFilter, page: zPage, pageSize: zPageSize },
        ],
      });
    },
    onError: (error: Error) => {
      // showToast(error.message, "error");
    },
  });
};

export const useRemoveEmployee = () => {
  const queryClient = useQueryClient();
  const zPage = useEmployeeListContext((state) => state.zPage);
  const zPageSize = useEmployeeListContext((state) => state.zPageSize);
  const zStatusFilter = useEmployeeListContext((state) => state.zStatusFilter);

  return useMutation({
    mutationFn: (id: number) => employeeListApi.removeEmployee(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          "employees",
          { keyword: zStatusFilter, page: zPage, pageSize: zPageSize },
        ],
      });
    },
    onError: (error: Error) => {
      // showToast(error.message, "error");
    },
  });
};
