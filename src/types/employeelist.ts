export interface GetEmployeeListParams {
  keyword?: string;
  accountType?: string;
  page: number;
  pageSize: number;
}

export interface GetEmployeeByIdParams {
  id: number;
}

export interface CreateUpdateEmployeeRequest {
  Id?: number;
  Email: string;
  Firstname: string;
  Lastname: string;
  MobileNumber: string;
  Position: string;
  Salary: number;
  Status: string;
  Address: string;
  Gender: string;
  Department: string;
  HourlyRate: number;
  EmergencyContactName: string;
  EmergencyRelationship: string;
  EmergencyContactNo: string;
  UserType: string;
  DateOfBirth: Date;
}

export interface UserListDto {
  Id: number;
  Email: string;
  EmployeeNumber: string;
  Firstname: string;
  Lastname: string;
  MobileNumber: string;
  Position: string;
  Salary: number;
  Status: string;
  Address: string;
  DateOfBirth: string;
  UserType: string;
  ProfileImage: string;
  IsEnabled: boolean;
  DateTimeCreated: Date;
  DateTimeUpdated: Date;
}

export interface EmployeeListResponse {
  UserList: UserListDto[]; // Not used for login, but API sends it
  TotalRecords: number; // Same
  IsSuccess: boolean;
  ApiMessage: string; // This is actually the JWT token
}
