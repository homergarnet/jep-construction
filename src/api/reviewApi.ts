import type {
  GetReviewByIdParams,
  GetReviewParams,
  ReviewResponse,
} from "@/types/review";
import apiConfig from "./apiConfig";
import type { ReviewFormValues } from "@/pages/schema/reviewFormSchema";
import useReviewContext from "@/store/review/reviewContext";

export const reviewApi = {
  getReviewList: async (params: GetReviewParams): Promise<ReviewResponse> => {
    const { data } = await apiConfig.get("/Review/get-review-list", {
      params,
    });

    if (!data.IsSuccess) {
      throw new Error(data.ApiMessage);
    }

    return data;
  },

  getReviewById: async (
    params: GetReviewByIdParams
  ): Promise<ReviewResponse> => {
    const { data } = await apiConfig.get("/Review/get-review-by-id", {
      params,
    });
    // projectManagementId: z.number(),
    // rate: z.number(),
    // reviewDescription: z.string().min(1, "Review description is required"),
    const result = {
      id: data.ReviewList[0].Id,
      rate: data.ReviewList[0].Rate,
      reviewDescription: data.ReviewList[0].reviewDescription,
    } as ReviewFormValues;

    useReviewContext.getState().zSetReviewAEData(result);
    if (!data.IsSuccess) {
      throw new Error(data.ApiMessage);
    }

    return data;
  },

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
