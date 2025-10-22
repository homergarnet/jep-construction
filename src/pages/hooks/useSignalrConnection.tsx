import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import * as signalR from "@microsoft/signalr";
import { useQueryClient } from "@tanstack/react-query";
import useMessageContext from "@/store/message/messageContext";
import { getJwtUserId } from "@/utils/getJwtRoleId";
import type { MessageDto } from "@/types/messages";

export const useSignalRConnection = () => {

  const HubConnection = import.meta.env.VITE_APP_HUB_CONNECTION_ENDPOINT;
  const MessageRoomId = import.meta.env.VITE_APP_MESSAGE_ROOM_ID;
  // const { zSetAutomationMessage } = useHomeContext();
  const location = useLocation();

  const zSetIsSignalReceive = useMessageContext((state) => state.zSetIsSignalReceive);
  const zSetSignalrValues = useMessageContext((state) => state.zSetSignalrValues);
  const [connection, setConnection] = useState<signalR.HubConnection | null>(
    null
  );

  useEffect(() => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl(HubConnection, {
        accessTokenFactory: () => localStorage.getItem("authToken") || "",
        withCredentials: false,
      })
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Information)
      .build();

    setConnection(newConnection);

    newConnection
      .start()
      .then(() => {
        console.log("Connected to SignalR!");

        newConnection
          .invoke("InitializeMessageRoom", MessageRoomId)
          .then(() => console.log("Joined the room."))
          .catch(console.error);

        newConnection.on(
          "ReceiveMessage",
          (roomId: string, messageId: number, userId: number, senderId: number, receiverId: number, message: string, profileImage: string, dateTimeNow: string) => {
            const currentUserId = getJwtUserId() ?? 0;

            console.log(`Received in ${roomId}:${messageId} ${userId} ${senderId} ${currentUserId} ${receiverId} ${message} ${profileImage} ${dateTimeNow}`);
            if (currentUserId === receiverId) {
              console.log("nag trigger")
              let values: MessageDto = {
                Id: messageId,
                UserId: userId,
                SenderId: userId,
                ReceiverId: receiverId,
                Message: message,
                ProfileImage: profileImage,
                IsEnabled: true,
                DateTimeCreated: dateTimeNow
              }
              zSetSignalrValues(values)
              zSetIsSignalReceive(true)
            }

            // zSetAutomationMessage(message);
          }
        );
      })
      .catch((err) => console.error("Connection failed:", err));

    return () => {
      // Cleanup SignalR connection on route change or component unmount
      newConnection
        .stop()
        .then(() => console.log("SignalR connection closed."))
        .catch(console.error);
    };
  }, [location.pathname]); // Re-run on route change
};