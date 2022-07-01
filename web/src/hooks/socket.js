import React, { createContext, useEffect, useState } from "react";
import io from "socket.io-client";

const SocketContext = createContext();
const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    const connection = io("http://localhost:3000");
    setSocket(connection);
    return () => {
      connection.close();
    };
  }, []);
  const closeConnection = () => {
    return socket.close();
  };
  return (
    <SocketContext.Provider value={{ socket, closeConnection }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
