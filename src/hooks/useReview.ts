import { reviewApi } from "@/api/reviewApi";
import useReviewContext from "@/store/review/reviewContext";
import type { GetReviewParams, ReviewResponse } from "@/types/review";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetReviewList = (params: GetReviewParams) => {
  return useQuery<ReviewResponse>({
    queryKey: ["reviews", params],
    queryFn: () => reviewApi.getReviewList(params),
  });
};

export const useRemoveReview = () => {
  const queryClient = useQueryClient();
  const zPage = useReviewContext((state) => state.zPage);
  const zPageSize = useReviewContext((state) => state.zPageSize);
  const zStatusFilter = useReviewContext((state) => state.zStatusFilter);

  return useMutation({
    mutationFn: (id: number) => reviewApi.removeReview(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          "review",
          { keyword: zStatusFilter, page: zPage, pageSize: zPageSize },
        ],
      });
    },
    onError: (error: Error) => {
      // showToast(error.message, "error");
    },
  });
};
