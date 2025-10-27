export interface GetProjectManagementParams {
  keyword?: string;
  userId?: number;
  page: number;
  pageSize: number;
}

export interface GetProjectManagementByIdParams {
  id: number;
}

export interface CreateUpdateProjectManagementRequest {
  Id?: number;
  UserId: number;
  ProjectName: string;
  StartDate: Date;
  EndDate: Date;
  // Budget: number;
  Location: string;
  Description: string;
  // CompletionStatus: number;
}

export interface ProjectManagementDto {
  Id: number;
  ProjectId: number;
  ReviewId: number;
  ProjectName: string;
  ClientName: string;
  StartDate: string;
  EndDate: string;
  Budget: number;
  Location: string;
  Description: string;
  CompletionStatus: number;
}

export interface ProjectManagementResponse {
  ProjectManagementList: ProjectManagementDto[]; // Not used for login, but API sends it
  TotalRecords: number; // Same
  IsSuccess: boolean;
  ApiMessage: string; // This is actually the JWT token
}
