export interface GetEmployeeListParams {
  keyword?: string;
  page: number;
  pageSize: number;
}

export interface GetEmployeeByIdParams {
  id: number;
}

export interface Employee {
  id: number;
  employeeNumber: string;
  email: string;
  firstname: string;
  lastname: string;
  mobileNumber: string;
  position: string;
  salary: number;
  status: string;
  address: string;
  dateOfBirth: string;
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
