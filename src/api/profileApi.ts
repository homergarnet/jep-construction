import type {
  CreateUpdateProfileRequest,
  GetProfileByIdParams,
  ProfileResponse,
} from "@/types/profile";
import apiConfig from "./apiConfig";
import type { ProfileFormValues } from "@/pages/schema/profileFormSchema";
import useProfileContext from "@/store/profile/profileContext";
import { getJwtUserId } from "@/utils/getJwtRoleId";

export const profileApi = {
  getProfileById: async (
    params: GetProfileByIdParams
  ): Promise<ProfileResponse> => {
    const { data } = await apiConfig.get("/Profile/get-profile-by-id", {
      params,
    });

    const result = {
      id: data.ProfileList[0].Id,
      firstname: data.ProfileList[0].Firstname,
      lastname: data.ProfileList[0].Lastname,
      address: data.ProfileList[0].Address,
      mobileNumber: data.ProfileList[0].MobileNumber,
      dateOfBirth: data.ProfileList[0].DateOfBirth.split("T")[0],
      position: data.ProfileList[0].Position,
    } as ProfileFormValues;
    useProfileContext
      .getState()
      .zSetProfileImageStr(data.ProfileList[0].ProfileImage ?? "");
    useProfileContext.getState().zSetProfileAEData(result);
    if (!data.IsSuccess) {
      throw new Error(data.ApiMessage);
    }

    return data;
  },

  updateProfile: async (
    payload: CreateUpdateProfileRequest,
    profileImage: File | null
  ): Promise<ProfileResponse> => {
    const userId = getJwtUserId() ?? 0;
    const formData = new FormData();
    formData.append("Id", userId.toString());
    formData.append("Firstname", payload.Firstname);
    formData.append("Lastname", payload.Lastname);
    formData.append("Address", payload.Address);
    formData.append("MobileNumber", payload.MobileNumber);
    formData.append("DateOfBirth", payload.DateOfBirth.toISOString());
    formData.append("Position", payload.Position);

    if (profileImage) {
      formData.append("ProfileImage", profileImage); // ✅ real file
    }

    const { data } = await apiConfig.put<ProfileResponse>(
      "/Profile/update-profile",
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    if (!data.IsSuccess) throw new Error(data.ApiMessage);
    return data;
  },
};
