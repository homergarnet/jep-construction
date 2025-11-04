export interface GetAssignProjectParams {
  keyword?: string;
  accountType?: string;
  userId?: number;
  page: number;
  pageSize: number;
}

export interface GetAssignProjectByIdParams {
  id: number;
}

export interface CreateUpdateAssignProjectRequest {
  Id?: number;
  UserId: number;
  ProjectId: number;
  StartDate: Date;
  EndDate: Date;
}

export interface AssignProjectDto {
  Id: number;
  Email: string;
  EmployeeNumber: string;
  ClientName: string;
  ProjectName: string;
  EmployeeName: string;
  MobileNumber: string;
  ProfileImage: string;
  Position: string;
  Location: string;
  StartDate: string;
  EndDate: string;
  DateTimeCreated: string;
  DateTimeUpdated: string;
}

export interface AssignProjectResponse {
  AssignProjectList: AssignProjectDto[]; // Not used for login, but API sends it
  TotalRecords: number; // Same
  IsSuccess: boolean;
  ApiMessage: string; // This is actually the JWT token
}

export interface CNamePNameDto {
  Id: number;
  UserId: number;
  ClientName: string;
  ProjectName: string;
}

export interface CNamePNameResponse {
  CNamePNameList: CNamePNameDto[]; // Not used for login, but API sends it
  TotalRecords: number; // Same
  IsSuccess: boolean;
  ApiMessage: string; // This is actually the JWT token
}
