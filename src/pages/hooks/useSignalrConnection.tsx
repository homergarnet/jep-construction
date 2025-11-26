import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import * as signalR from "@microsoft/signalr";
import { useQueryClient } from "@tanstack/react-query";
import useMessageContext from "@/store/message/messageContext";
import { getJwtUserId } from "@/utils/getJwtRoleId";
import type { MessageDto } from "@/types/messages";

let connection: signalR.HubConnection | null = null;

export const useSignalRConnection = (roomId: string) => {
  const zSetIsSignalReceive = useMessageContext((state) => state.zSetIsSignalReceive);
  const zSetSignalrValues = useMessageContext((state) => state.zSetSignalrValues);

  useEffect(() => {
    if (connection) return; // prevent duplicates

    connection = new signalR.HubConnectionBuilder()
      .withUrl(import.meta.env.VITE_APP_HUB_CONNECTION_ENDPOINT, {
        accessTokenFactory: () => localStorage.getItem("authToken") || "",
      })
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Information)
      .build();

    connection
      .start()
      .then(async () => {
        console.log("SignalR connected");

        await connection!.invoke("InitializeMessageRoom", roomId);

        connection!.on(
          "ReceiveMessage",
          (
            roomId: string,
            messageId: number,
            userId: number,
            senderId: number,
            receiverId: number,
            message: string,
            profileImage: string,
            dateTimeNow: string
          ) => {
            const currentUserId = getJwtUserId();

            if (currentUserId !== receiverId) return;

            const dto = {
              Id: messageId,
              UserId: userId,
              SenderId: senderId,
              ReceiverId: receiverId,
              Message: message,
              ProfileImage: profileImage,
              IsEnabled: true,
              DateTimeCreated: dateTimeNow,
            };

            zSetSignalrValues(dto);
            zSetIsSignalReceive(true);
          }
        );
      })
      .catch(console.error);

    return () => {
      // only stop if leaving app (optional)
    };
  }, []);
};