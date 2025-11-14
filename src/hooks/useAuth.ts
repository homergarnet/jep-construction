import { authApi } from "@/api/authApi";
import type { LoginPayload, RegisterPayload } from "@/types/auth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useLogin = () => {
  const queryClient = useQueryClient();


  return useMutation({
    mutationFn: (payload: LoginPayload) => authApi.login(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth", "profile"] });
    },
  });
};

// export const useRegister = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: (payload: RegisterPayload) => authApi.register(payload),
//     onSuccess: (data) => {
//       localStorage.setItem("token", data.token);
//       queryClient.invalidateQueries({ queryKey: ["auth", "profile"] });
//     },
//   });
// };

export const useProfile = () => {
  return useQuery({
    queryKey: ["auth", "profile"],
    queryFn: authApi.getProfile,
    retry: false,
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      queryClient.clear();
    },
  });
};
