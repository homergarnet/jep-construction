export interface GetReviewParams {
  keyword?: string;
  userId?: number;
  page: number;
  pageSize: number;
}

export interface GetReviewByIdParams {
  id: number;
}

export interface CreateUpdateReviewRequest {
  Id?: number;
  UserId: number;
  ProjectManagementId: number;
  Rate: number;
  ReviewDescription: string;
}

export interface ReviewDto {
  Id: number;
  ProjectName: string;
  ClientName: string;
  Email: string;
  MobileNumber: string;
  Rate: number;
  ReviewDescription: string;
  DateTimeCreated: string;
}

export interface ReviewResponse {
  ReviewList: ReviewDto[]; // Not used for login, but API sends it
  TotalRecords: number; // Same
  IsSuccess: boolean;
  ApiMessage: string; // This is actually the JWT token
}
