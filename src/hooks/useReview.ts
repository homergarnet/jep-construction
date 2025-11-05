import { reviewApi } from "@/api/reviewApi";
import { ADMIN_TYPE_NUM } from "@/constants/constants";
import useProjectManagementContext from "@/store/projectManagement/projectManagementContext";
import useReviewContext from "@/store/review/reviewContext";
import type {
  CreateUpdateReviewRequest,
  GetReviewByIdParams,
  GetReviewParams,
  ReviewResponse,
  UpdateApproveReviewRequest,
} from "@/types/review";
import { getJwtRoleId, getJwtUserId } from "@/utils/getJwtRoleId";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCreateReview = () => {
  const queryClient = useQueryClient();
  const zPage = useProjectManagementContext((state) => state.zPage);
  const zPageSize = useProjectManagementContext((state) => state.zPageSize);
  const zStatusFilter = useProjectManagementContext(
    (state) => state.zStatusFilter
  );

  return useMutation({
    mutationFn: (payload: CreateUpdateReviewRequest) =>
      reviewApi.createReview(payload),
    onSuccess: (res) => {
      // pass it in zustand store if we want dynamic
      queryClient.invalidateQueries({
        queryKey: [
          "projectmanagements",
          {
            keyword: zStatusFilter,
            userId: getJwtRoleId() === ADMIN_TYPE_NUM ? 0 : getJwtUserId(),
            page: zPage,
            pageSize: zPageSize,
          },
        ],
      });
    },
    onError: (error: Error) => {
      //   showToast(error.message, "error");
    },
  });
};

export const useGetReviewList = (params: GetReviewParams) => {
  params.userId = getJwtRoleId() === ADMIN_TYPE_NUM ? 0 : getJwtUserId();
  return useQuery<ReviewResponse>({
    queryKey: ["reviews", params],
    queryFn: () => reviewApi.getReviewList(params),
  });
};

export const useGetReviewById = (
  params: GetReviewByIdParams,
  enabled = true
) => {
  return useQuery<ReviewResponse>({
    queryKey: ["review", params.id],
    queryFn: () => reviewApi.getReviewById(params),
    enabled: !!params.id && enabled,
  });
};

export const useUpdateReview = () => {
  const queryClient = useQueryClient();
  const zPage = useProjectManagementContext((state) => state.zPage);
  const zPageSize = useProjectManagementContext((state) => state.zPageSize);
  const zStatusFilter = useProjectManagementContext(
    (state) => state.zStatusFilter
  );

  return useMutation({
    mutationFn: (payload: CreateUpdateReviewRequest) =>
      reviewApi.updateReview(payload),
    onSuccess: () => {
      // pass it in zustand store if we want dynamic
      queryClient.invalidateQueries({
        queryKey: [
          "reviews",
          {
            keyword: zStatusFilter,
            userId: getJwtRoleId() === ADMIN_TYPE_NUM ? 0 : getJwtUserId(),
            page: zPage,
            pageSize: zPageSize,
          },
        ],
      });
    },
    onError: (error: Error) => {
      // showToast(error.message, "error");
    },
  });
};

export const useUpdateApproveReview = () => {
  const queryClient = useQueryClient();
  const zPage = useProjectManagementContext((state) => state.zPage);
  const zPageSize = useProjectManagementContext((state) => state.zPageSize);
  const zStatusFilter = useProjectManagementContext(
    (state) => state.zStatusFilter
  );

  return useMutation({
    mutationFn: (payload: UpdateApproveReviewRequest) =>
      reviewApi.updateApproveReview(payload),
    onSuccess: () => {
      // pass it in zustand store if we want dynamic
      queryClient.invalidateQueries({
        queryKey: [
          "reviews",
          {
            keyword: zStatusFilter,
            userId: getJwtRoleId() === ADMIN_TYPE_NUM ? 0 : getJwtUserId(),
            page: zPage,
            pageSize: zPageSize,
          },
        ],
      });
    },
    onError: (error: Error) => {
      // showToast(error.message, "error");
    },
  });
};

export const useRemoveReview = () => {
  const queryClient = useQueryClient();
  const zPage = useProjectManagementContext((state) => state.zPage);
  const zPageSize = useProjectManagementContext((state) => state.zPageSize);
  const zStatusFilter = useProjectManagementContext(
    (state) => state.zStatusFilter
  );

  return useMutation({
    mutationFn: (id: number) => reviewApi.removeReview(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          "review",
          {
            keyword: zStatusFilter,
            userId: getJwtRoleId() === ADMIN_TYPE_NUM ? 0 : getJwtUserId(),
            page: zPage,
            pageSize: zPageSize,
          },
        ],
      });
    },
    onError: (error: Error) => {
      // showToast(error.message, "error");
    },
  });
};
