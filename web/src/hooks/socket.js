import React, { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [connectionStatus, setConnectionStatus] = useState("CONNECTING");
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    try {
      const connection = io("http://localhost:3000");
      setSocket(connection);
      setConnectionStatus("CONNECTED");
    } catch (err) {
      console.log(err);
      setConnectionStatus("FAILED");
    }
  }, []);
  const closeConnection = () => {
    return socket.close();
  };
  return (
    <SocketContext.Provider
      value={{ socket, closeConnection, status: connectionStatus }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContext);
};
