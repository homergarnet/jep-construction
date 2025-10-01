export interface GetEmpAttendanceListParams {
  keyword?: string;
  page: number;
  pageSize: number;
}

export interface GetEmpAttendanceByIdParams {
  id: number;
}

export interface AttendanceListDto {
  Id: number;
  EmployeeNumber: string;
  EmployeeName: string;
  Location: string;
  TimeInOut: string;
  TimeInOutType: string;
  TimeInOutImage: string;
  DateTimeCreated: Date;
  DateTimeUpdated: Date;
}

export interface CreateUpdateEmpAttendanceRequest {
  Id?: number;
  TimeInOut: string;
  TimeInOutType: string;
}

export interface EmpAttendanceListResponse {
  AttendanceList: AttendanceListDto[]; // Not used for login, but API sends it
  TotalRecords: number; // Same
  IsSuccess: boolean;
  ApiMessage: string; // This is actually the JWT token
}
