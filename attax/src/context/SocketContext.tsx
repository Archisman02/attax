import React, { createContext, useContext, useEffect, useRef } from "react";
import io, { Socket } from "socket.io-client";

type SocketContextType = {
  socket: Socket | null;
};

const SocketContext = createContext<SocketContextType>({ socket: null });

export const useSocket = () => useContext(SocketContext);

type Props = {
  children: React.ReactNode;
};

export const SocketProvider: React.FC<Props> = ({ children }) => {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const socket: Socket = io("http://localhost:4000");
    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("Connected:", socket.id);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket: socketRef.current }}>
      {children}
    </SocketContext.Provider>
  );
};
