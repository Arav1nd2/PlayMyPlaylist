import {
  CLIENT_CONNECT_EVENT,
  DISCONNECT_EVENT,
  JOIN_ROOM_EVENT,
  NEW_USER_JOINED_ROOM_EVENT,
} from "@pmp/constants";
import React, { createContext, useContext, useEffect, useReducer } from "react";
import io from "socket.io-client";

const SocketContext = createContext();

const socket = io("http://localhost:3000");
export const SocketProvider = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, {
    status: false,
    socket: null,
    joinedRoom: false,
  });
  useEffect(() => {
    fetch("http://localhost:3000/api/ping").then(() => {
      socket.on(CLIENT_CONNECT_EVENT, () => {
        dispatch({ type: "connect" });
      });
      socket.on(DISCONNECT_EVENT, () => {
        dispatch({ type: "disconnect" });
      });
      socket.on(NEW_USER_JOINED_ROOM_EVENT, (obj) => {
        console.log("New user also joined", obj);
      });
    });
    return () => {
      socket.off(CLIENT_CONNECT_EVENT);
      socket.off(DISCONNECT_EVENT);
      socket.off(NEW_USER_JOINED_ROOM_EVENT);
    };
  }, []);
  const closeConnection = () => {
    return socket.close();
  };
  return (
    <SocketContext.Provider value={{ state, closeConnection, dispatch }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContext);
};

const gameReducer = (state, action) => {
  switch (action.type) {
    case "connect":
      return { ...state, socket: socket, status: true };
    case "disconnect":
      return { ...state, socket: null, status: false };
    case "join-room":
      socket.emit(JOIN_ROOM_EVENT, "Hello!");
      return { ...state, joinedRoom: true };
    default:
      return state;
  }
};
