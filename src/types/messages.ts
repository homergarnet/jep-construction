export interface Conversation {
  id: string;
  title: string;
  lastMessage: string | null;
  unread: number;
  participants: {
    id: string;
    name: string;
    avatar?: string;
    online?: boolean;
  }[];
}

export interface Message {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  text?: string;
  imageUrl?: string;
  fileName?: string;
  fileSize?: string;
  createdAt: string; // ISO
  status?: "sending" | "sent" | "delivered" | "read";
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  online?: boolean;
}

export interface GetMessageParams {
  keyword?: string;
  convoUserId: number;
  page: number;
  pageSize: number;
}

export interface GetConvoRowParams {
  page: number;
  pageSize: number;
}

export interface GetMessageUserParams {
  keyword?: string;
  page: number;
  pageSize: number;
}

export interface CreateUpdateMessageRequest {
  Id?: number;
  UserId: number;
  SenderId: number;
  ReceiverId: number;
  Message: string;
}

export interface MessageDto {
  Id: number;
  UserId: number;
  SenderId: number;
  ReceiverId: number;
  Message: string;
  ProfileImage: string;
  IsEnabled: boolean;
  DateTimeCreated: string;
}

export interface ConvoRowDto {
  ConvoUserId: number;
  ConvoImage: string;
  ConvoName: string;
  UnreadCount: number;
  LastMessage: string;
}

export interface MessageResponse {
  MessageList: MessageDto[]; // Not used for login, but API sends it
  TotalRecords: number; // Same
  IsSuccess: boolean;
  ApiMessage: string; // This is actually the JWT token
}

export interface ConvoRowResponse {
  ConvoList: ConvoRowDto[]; // Not used for login, but API sends it
  TotalRecords: number; // Same
  IsSuccess: boolean;
  ApiMessage: string; // This is actually the JWT token
}
