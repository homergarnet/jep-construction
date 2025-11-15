export interface GetClientListParams {
  keyword?: string;
  accountType?: string;
  page: number;
  pageSize: number;
}

export interface GetClientByIdParams {
  id: number;
}

export interface Client {
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

export interface CreateUpdateClientRequest {
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
  Status: string;
  Address: string;
  DateOfBirth: string;
  UserType: string;
  ProfileImage: string;
  IsEnabled: boolean;
  DateTimeCreated: Date;
  DateTimeUpdated: Date;
}

export interface ClientListResponse {
  UserList: UserListDto[]; // Not used for login, but API sends it
  TotalRecords: number; // Same
  IsSuccess: boolean;
  ApiMessage: string; // This is actually the JWT token
}
