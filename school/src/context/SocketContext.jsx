import React, { createContext, useState, useEffect, useContext } from 'react';
import io from 'socket.io-client';
import { useAuth } from './AuthContext';

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const { user, token } = useAuth();

  useEffect(() => {
    if (token && !socket) {
      const newSocket = io(process.env.REACT_APP_API_URL, {
        auth: { token },
        transports: ['websocket']
      });
      
      setSocket(newSocket);
      
      return () => {
        newSocket.disconnect();
      };
    }
  }, [token]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};