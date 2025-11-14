export interface CreateUpdateHomeRequest {
  Id?: number;
  ProjectName?: string;
  Name: string;
  Email: string;
  MobileNumber: string;
  Message: string;
}

export interface ClientRequestDto {
  Id: number;
  ProjectName: string;
  Name: string;
  Email: string;
  MobileNumber: string;
  DateTimeCreated: string;
}

export interface ClientRequestResponse {
  ClientRequestList: ClientRequestDto[]; // Not used for login, but API sends it
  TotalRecords: number; // Same
  IsSuccess: boolean;
  ApiMessage: string; // This is actually the JWT token
}
