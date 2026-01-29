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
  showAchievementNotification: (achievement: any, character: any) => void;
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
  const [achievementNotification, setAchievementNotification] = useState<any>(null);
  const { isAuthenticated } = useAuth();

  const showAchievementNotification = (achievement: any, character: any) => {
    setAchievementNotification({ achievement, character });
    setTimeout(() => setAchievementNotification(null), 5000);
  };

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

      // Запрашиваем разрешение на уведомления
      if ("Notification" in window && Notification.permission === "default") {
        Notification.requestPermission();
      }
    });

    newSocket.on("disconnect", () => {
      console.log("❌ WebSocket disconnected");
      setIsConnected(false);
    });

    newSocket.on("error", (error) => {
      console.error("WebSocket error:", error);
    });

    // Обработка получения ачивки
    newSocket.on("achievement-granted", (data: { achievement: any; character: any; grantedAt: string }) => {
      console.log("🏆 Achievement granted:", data);
      showAchievementNotification(data.achievement, data.character);

      // Также показываем browser notification если разрешено
      if ("Notification" in window && Notification.permission === "granted") {
        new Notification(`🏆 Новое достижение!`, {
          body: `Персонаж ${data.character?.name || ''} получил achievement: ${data.achievement.name}`,
          icon: "/logo.png",
        });
      }
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [isAuthenticated]);

  return (
    <SocketContext.Provider value={{ socket, isConnected, showAchievementNotification }}>
      {achievementNotification && (
        <div className="fixed top-4 right-4 z-50 max-w-sm animate-fade-in-up">
          <div className="bg-gradient-to-br from-amber-500/20 to-orange-500/20 backdrop-blur-xl border border-amber-500/50 rounded-2xl p-4 shadow-2xl">
            <div className="flex items-start gap-3">
              <div className="text-4xl">{achievementNotification.achievement.icon}</div>
              <div className="flex-1">
                <h3 className="font-bold text-foreground text-sm mb-1">
                  {achievementNotification.achievement.name}
                </h3>
                <p className="text-xs text-muted-foreground mb-2">
                  {achievementNotification.achievement.description}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">Персонаж:</span>
                  <span className="text-xs font-medium text-foreground">
                    {achievementNotification.character?.name || 'Не указан'}
                  </span>
                </div>
                {achievementNotification.achievement.xpReward > 0 && (
                  <div className="mt-2 inline-flex items-center px-2 py-1 rounded-full bg-amber-500/30 border border-amber-500/50">
                    <span className="text-xs font-semibold text-amber-500">
                      +{achievementNotification.achievement.xpReward} XP
                    </span>
                  </div>
                )}
              </div>
              <button
                onClick={() => setAchievementNotification(null)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}
      {children}
    </SocketContext.Provider>
  );
}
