import { employeeListApi } from "@/api/employeeListApi";
import { messageApi } from "@/api/messageApi";
import useEmployeeListContext from "@/store/employee/employeeList/employeeListContext";
import useMessageContext from "@/store/message/messageContext";
import type {
  CreateUpdateEmployeeRequest,
  EmployeeListResponse,
  GetEmployeeByIdParams,
  GetEmployeeListParams,
  UserListDto,
} from "@/types/employeelist";
import type {
  ConvoRowResponse,
  CreateUpdateMessageRequest,
  GetConvoRowParams,
  GetMessageParams,
  GetMessageUserParams,
  MessageResponse,
} from "@/types/messages";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCreateMessage = () => {
  const queryClient = useQueryClient();
  const zMessagePage = useMessageContext((state) => state.zMessagePage);
  const zMessagePageSize = useMessageContext((state) => state.zMessagePageSize);
  const zMessageFilter = useMessageContext((state) => state.zMessageFilter);
  const zConvoUserId = useMessageContext((state) => state.zConvoUserId);

  return useMutation({
    mutationFn: (payload: CreateUpdateMessageRequest) =>
      messageApi.createMessage(payload),
    onSuccess: (res) => {
      // pass it in zustand store if we want dynamic
      queryClient.invalidateQueries({
        queryKey: [
          "messages",
          {
            keyword: zMessageFilter,
            convoUserId: zConvoUserId,
            page: zMessagePage,
            pageSize: zMessagePageSize,
          },
        ],
      });

      queryClient.invalidateQueries({
        queryKey: ["convos"], // <-- your conversation query key here
      });
    },
    onError: (error: Error) => {
      //   showToast(error.message, "error");
    },
  });
};

export const useGetMessageList = (params: GetMessageParams) => {
  return useQuery<MessageResponse>({
    queryKey: ["messages", params],
    queryFn: () => messageApi.getMessageList(params),
  });
};

export const useGetConvoRowList = (params: GetConvoRowParams) => {
  return useQuery<ConvoRowResponse>({
    queryKey: ["convos", params],
    queryFn: () => messageApi.getConvoRowList(params),
  });
};

export const useGetMessageUserList = (params: GetMessageUserParams) => {
  return useQuery<EmployeeListResponse>({
    queryKey: ["messageUsers", params],
    queryFn: () => messageApi.getMessageUserList(params),
  });
};

export const useSetReadById = () => {
  const queryClient = useQueryClient();
  const zPage = useMessageContext((state) => state.zPage);
  const zPageSize = useMessageContext((state) => state.zPageSize);

  return useMutation({
    mutationFn: (senderId: number) => messageApi.setReadById(senderId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["convos", { page: zPage, pageSize: zPageSize }],
      });
    },
    onError: (error: Error) => {
      // showToast(error.message, "error");
    },
  });
};
