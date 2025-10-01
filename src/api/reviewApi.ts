import type { GetReviewByIdParams, GetReviewParams, ReviewResponse } from "@/types/review";
import apiConfig from "./apiConfig";


export const reviewApi = {


  getReviewList: async (
    params: GetReviewParams
  ): Promise<ReviewResponse> => {
    const { data } = await apiConfig.get("/Review/get-review-list", {
      params,
    });

    if (!data.IsSuccess) {
      throw new Error(data.ApiMessage);
    }

    return data;
  },

//   getReviewById: async (
//     params: GetReviewByIdParams
//   ): Promise<ReviewResponse> => {
//     const { data } = await apiConfig.get("/Review/get-review-by-id", {
//       params,
//     });

//     const result = {
//       id: data.UserList[0].Id,
//       email: data.UserList[0].Email,
//       firstname: data.UserList[0].Firstname,
//       lastname: data.UserList[0].Lastname,
//       mobileNumber: data.UserList[0].MobileNumber,
//       position: data.UserList[0].Position,
//       salary: data.UserList[0].Salary,
//       status: data.UserList[0].Status,
//       address: data.UserList[0].Address,
//       dateOfBirth: data.UserList[0].DateOfBirth.split("T")[0],
//     } as EmployeeListFormValues;

//     useEmployeeListContext.getState().zSetEmpListAEData(result);
//     if (!data.IsSuccess) {
//       throw new Error(data.ApiMessage);
//     }

//     return data;
//   },

//   updateReview: async (
//     payload: CreateUpdateEmployeeRequest
//   ): Promise<EmployeeListResponse> => {
//     const { data } = await apiConfig.put<EmployeeListResponse>(
//       "/EmployeeList/update-employee",
//       payload
//     );

//     if (!data.IsSuccess) {
//       throw new Error(data.ApiMessage);
//     }
//     return data;
//   },

  removeReview: async (id: number): Promise<ReviewResponse> => {
    const { data } = await apiConfig.put<ReviewResponse>(
      `/Review/soft-delete-review-by-id/${id}`
    );

    if (!data.IsSuccess) {
      throw new Error(data.ApiMessage);
    }
    return data;
  },
};
