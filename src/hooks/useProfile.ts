import { profileApi } from "@/api/profileApi";
import useProfileContext from "@/store/profile/profileContext";
import type {
  CreateUpdateProfileRequest,
  GetProfileByIdParams,
  ProfileResponse,
} from "@/types/profile";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetProfileById = (
  params: GetProfileByIdParams,
  enabled = true
) => {
  return useQuery<ProfileResponse>({
    queryKey: ["profile", params.id],
    queryFn: () => profileApi.getProfileById(params),
    enabled: !!params.id && enabled,
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const zPage = useProfileContext((state) => state.zPage);
  const zPageSize = useProfileContext((state) => state.zPageSize);
  const zStatusFilter = useProfileContext((state) => state.zStatusFilter);
  const zProfileImage = useProfileContext((state) => state.zProfileImage);
  return useMutation({
    mutationFn: (payload: CreateUpdateProfileRequest) =>
      profileApi.updateProfile(payload, zProfileImage),
    onSuccess: () => {
      //   queryClient.invalidateQueries({
      //     queryKey: [
      //       "profiles",
      //       { keyword: zStatusFilter, page: zPage, pageSize: zPageSize },
      //     ],
      //   });
    },
    onError: (error: Error) => {
      // showToast(error.message, "error");
    },
  });
};
