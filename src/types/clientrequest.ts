export interface GetClientRequestParams {
  keyword?: string;
  page: number;
  pageSize: number;
}

export interface GetClientRequestByIdParams {
  id: number;
}

export interface CreateUpdateClientReqRequest {
  Id?: number;
  ProjectName: string;
  Name: string;
  Email: string;
  MobileNumber: string;
  Message: string;
}

export interface CreateCRReplyRequest {
  Id: number;
  To: string;
  Subject: string;
  Body: string;
}

export interface ClientRequestDto {
  Id: number;
  ProjectName: string;
  Name: string;
  Email: string;
  MobileNumber: string;
  Message: string;
  HasReply: boolean;
  DateTimeCreated: string;
}

export interface ClientRequestResponse {
  ClientRequestList: ClientRequestDto[]; // Not used for login, but API sends it
  TotalRecords: number; // Same
  IsSuccess: boolean;
  ApiMessage: string; // This is actually the JWT token
}
