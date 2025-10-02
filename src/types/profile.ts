export interface GetProfileByIdParams {
  id: number;
}

export interface CreateUpdateProfileRequest {
  Id?: number;
  Firstname: string;
  Lastname: string;
  Address: string;
  MobileNumber: string;
  DateOfBirth: Date;
  Position: string;
}

export interface ProfileDto {
  Id: number;
  ProfileImage: string;
  Firstname: string;
  Lastname: string;
  Address: string;
  MobileNumber: string;
  DateOfBirth: string;
  Position: string;
}

export interface ProfileResponse {
  ProfileList: ProfileDto[]; // Not used for login, but API sends it
  TotalRecords: number; // Same
  IsSuccess: boolean;
  ApiMessage: string; // This is actually the JWT token
}
