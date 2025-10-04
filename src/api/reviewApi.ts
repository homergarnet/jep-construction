import type {
  CreateUpdateReviewRequest,
  GetReviewByIdParams,
  GetReviewParams,
  ReviewResponse,
} from "@/types/review";
import apiConfig from "./apiConfig";
import type { ReviewFormValues } from "@/pages/schema/reviewFormSchema";
import useReviewContext from "@/store/review/reviewContext";

export const reviewApi = {
  createReview: async (
    payload: CreateUpdateReviewRequest
  ): Promise<ReviewResponse> => {
    const { data } = await apiConfig.post<ReviewResponse>(
      "/Review/create-review",
      payload
    );

    if (!data.IsSuccess) {
      throw new Error(data.ApiMessage);
    }

    // Return the full response, not just ApiMessage
    return data;
  },

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
    if (Array.isArray(data.ReviewList) && data.ReviewList.length > 0) {
      useReviewContext.getState().zSetIsCreateReview(false);
    }
    // projectManagementId: z.number(),
    // rate: z.number(),
    // reviewDescription: z.string().min(1, "Review description is required"),
    const result = {
      id: data.ReviewList[0].Id,
      rate: data.ReviewList[0].Rate,
      reviewDescription: data.ReviewList[0].ReviewDescription,
    } as ReviewFormValues;
    console.log("data: ", data);
    useReviewContext.getState().zSetReviewAEData(result);
    if (!data.IsSuccess) {
      throw new Error(data.ApiMessage);
    }

    return data;
  },

  updateReview: async (
    payload: CreateUpdateReviewRequest
  ): Promise<ReviewResponse> => {
    const { data } = await apiConfig.put<ReviewResponse>(
      "/Review/update-review",
      payload
    );

    if (!data.IsSuccess) {
      throw new Error(data.ApiMessage);
    }
    return data;
  },

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
