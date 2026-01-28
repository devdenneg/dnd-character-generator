import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { io, Socket } from "socket.io-client";
import { useAuth } from "./AuthContext";

interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
});

export const useSocket = () => useContext(SocketContext);

interface SocketProviderProps {
  children: ReactNode;
}

export function SocketProvider({ children }: SocketProviderProps) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      if (socket) {
        socket.disconnect();
        setSocket(null);
        setIsConnected(false);
      }
      return;
    }

    // Получаем токен из localStorage
    const token = localStorage.getItem("auth_token");
    if (!token) {
      return;
    }

    const newSocket = io(
      import.meta.env.VITE_API_URL?.replace("/api", "") ||
        "http://localhost:3001",
      {
        auth: {
          token,
        },
      },
    );

    newSocket.on("connect", () => {
      console.log("🔌 WebSocket connected");
      setIsConnected(true);
    });

    newSocket.on("disconnect", () => {
      console.log("❌ WebSocket disconnected");
      setIsConnected(false);
    });

    newSocket.on("error", (error) => {
      console.error("WebSocket error:", error);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [isAuthenticated]);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
}
