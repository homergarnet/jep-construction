import type {
  CreateUpdateEmpAttendanceRequest,
  EmpAttendanceListResponse,
  GetEmpAttendanceByIdParams,
  GetEmpAttendanceListParams,
} from "@/types/empAttendance";
import apiConfig from "./apiConfig";
import type { EmpAttendanceFormValues } from "@/pages/admin/employee/schema/empAttendanceFormSchema";
import useEmpAttendanceContext from "@/store/employee/empAttendance/empAttendanceContext";
import type { useRemoveEmpAttendance } from "@/hooks/useEmpAttendance";

export const empAttendanceListApi = {
  getEmpAttendanceList: async (
    params: GetEmpAttendanceListParams
  ): Promise<EmpAttendanceListResponse> => {
    const { data } = await apiConfig.get("/Attendance/get-attendance-list", {
      params,
    });

    if (!data.IsSuccess) {
      throw new Error(data.ApiMessage);
    }

    return data;
  },

  getEmpAttendanceById: async (
    params: GetEmpAttendanceByIdParams
  ): Promise<EmpAttendanceListResponse> => {
    const { data } = await apiConfig.get("/Attendance/get-attendance-by-id", {
      params,
    });
    // id: z.number().optional(),
    // employeeId: z.number(),
    // location: z.string().min(1, "Location is required"),
    // timeInOut: z.string().datetime({ offset: true, message: "Invalid datetime" }),
    const result = {
      id: data.AttendanceList[0].Id,
      timeInOut: data.AttendanceList[0].TimeInOut,
      timeInOutType: data.AttendanceList[0].TimeInOutType,
    } as EmpAttendanceFormValues;

    useEmpAttendanceContext.getState().zSetEmpAttendanceAEData(result);
    if (!data.IsSuccess) {
      throw new Error(data.ApiMessage);
    }

    return data;
  },

  updateEmpAttendance: async (
    payload: CreateUpdateEmpAttendanceRequest
  ): Promise<EmpAttendanceListResponse> => {
    const { data } = await apiConfig.put<EmpAttendanceListResponse>(
      "/Attendance/update-attendance",
      payload
    );

    if (!data.IsSuccess) {
      throw new Error(data.ApiMessage);
    }
    return data;
  },

  removeEmpAttendance: async (
    id: number
  ): Promise<EmpAttendanceListResponse> => {
    const { data } = await apiConfig.put<EmpAttendanceListResponse>(
      `/Attendance/soft-delete-attendance-by-id/${id}`
    );

    if (!data.IsSuccess) {
      throw new Error(data.ApiMessage);
    }
    return data;
  },
};
