export const useSignalRConnection = () => {
  const HubConnection = process.env.REACT_APP_SIGNALR_API_ENDPOINT as string;
  const HomeRoomId = process.env.REACT_APP_HOME_ROOM_ID as string;
  const { zSetAutomationMessage } = useHomeContext();
  const location = useLocation();
  const [connection, setConnection] = useState<signalR.HubConnection | null>(
    null
  );

  useEffect(() => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl(HubConnection, {
        accessTokenFactory: () => localStorage.getItem("accessToken") || "",
        withCredentials: true,
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
          .invoke("InitializeHomeRoom", HomeRoomId)
          .then(() => console.log("Joined the room."))
          .catch(console.error);

        newConnection.on(
          "ReceiveTotalSkuProcess",
          (roomId: string, message: string) => {
            console.log(`Received in ${roomId}: ${message}`);
            zSetAutomationMessage(message);
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