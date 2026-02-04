import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Plus,
  Users,
  Lock,
  Trash2,
  Edit,
  Power,
  PowerOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { roomsApi } from "@/api/client";
import { useAuth } from "@/contexts/AuthContext";
import { useAuthModal } from "@/contexts/AuthModalContext";
import { getErrorMessage } from "@/utils/errorHandling";

interface Room {
  id: string;
  name: string;
  maxPlayers: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  master: {
    id: string;
    name: string | null;
  };
}

export function MyRoomsPage() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { openLogin, openRegister } = useAuthModal();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isAuthenticated && user?.role === "master") {
      loadRooms();
    }
  }, [isAuthenticated, user]);

  const loadRooms = async () => {
    try {
      setIsLoading(true);
      const response = await roomsApi.list();
      setRooms(response.data);
    } catch (err: unknown) {
      setError(getErrorMessage(err, "Не удалось загрузить комнаты"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (roomId: string) => {
    if (!confirm("Вы уверены, что хотите удалить эту комнату?")) {
      return;
    }

    try {
      await roomsApi.delete(roomId);
      setRooms(rooms.filter((r) => r.id !== roomId));
    } catch (err: unknown) {
      alert(getErrorMessage(err, "Не удалось удалить комнату"));
    }
  };

  const handleToggleActive = async (roomId: string, isActive: boolean) => {
    try {
      await roomsApi.update(roomId, { isActive: !isActive });
      setRooms(
        rooms.map((r) => (r.id === roomId ? { ...r, isActive: !isActive } : r))
      );
    } catch (err: unknown) {
      alert(getErrorMessage(err, "Не удалось изменить статус комнаты"));
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="max-w-md w-full mx-auto px-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Требуется авторизация
            </h2>
            <p className="text-muted-foreground mb-6">
              Войдите в аккаунт для управления комнатами
            </p>
            <div className="flex gap-3 justify-center">
              <Button onClick={openLogin}>Войти</Button>
              <Button variant="outline" onClick={openRegister}>
                Регистрация
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (user?.role !== "master") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="max-w-md w-full mx-auto px-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Доступ запрещен
            </h2>
            <p className="text-muted-foreground mb-6">
              Только мастера могут управлять комнатами
            </p>
            <Button onClick={() => navigate("/")}>На главную</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Background */}
      <div className="app-background" />
      <div className="ambient-glow ambient-glow-1" />
      <div className="ambient-glow ambient-glow-2" />

      <div className="relative z-10 flex flex-col flex-1">
        {/* Header */}
        <header className="border-b border-border/50 bg-card/80 backdrop-blur-xl">
          <div className="max-w-5xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => navigate("/")}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <ArrowLeft className="w-5 h-5" />
                </Button>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">
                    Мои комнаты
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Управление игровыми комнатами
                  </p>
                </div>
              </div>
              <Button
                onClick={() => navigate("/create-room")}
                className="bg-gradient-to-r from-primary to-accent hover:opacity-90"
              >
                <Plus className="w-4 h-4 mr-2" />
                Создать комнату
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-5xl mx-auto px-4 py-8 flex-1 w-full">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
              <p className="text-muted-foreground mt-4">Загрузка комнат...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-destructive mb-4">{error}</p>
              <Button onClick={loadRooms}>Попробовать снова</Button>
            </div>
          ) : rooms.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                <Users className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Нет комнат
              </h3>
              <p className="text-muted-foreground mb-6">
                Создайте свою первую игровую комнату
              </p>
              <Button
                onClick={() => navigate("/create-room")}
                className="bg-gradient-to-r from-primary to-accent hover:opacity-90"
              >
                <Plus className="w-4 h-4 mr-2" />
                Создать комнату
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {rooms.map((room) => (
                <div
                  key={room.id}
                  className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-2xl p-6 hover:border-primary/50 transition-all"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold text-foreground">
                          {room.name}
                        </h3>
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            room.isActive
                              ? "bg-emerald-500/20 text-emerald-500"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {room.isActive ? "Активна" : "Неактивна"}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          Макс. игроков: {room.maxPlayers}
                        </span>
                        <span className="flex items-center gap-1">
                          <Lock className="w-4 h-4" />
                          Защищена паролем
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Создана:{" "}
                        {new Date(room.createdAt).toLocaleDateString("ru-RU")}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => navigate(`/room/${room.id}`)}
                        title="Открыть комнату"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          handleToggleActive(room.id, room.isActive)
                        }
                        title={
                          room.isActive ? "Деактивировать" : "Активировать"
                        }
                      >
                        {room.isActive ? (
                          <PowerOff className="w-4 h-4" />
                        ) : (
                          <Power className="w-4 h-4" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(room.id)}
                        className="text-destructive hover:text-destructive"
                        title="Удалить"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="border-t border-border/50 bg-card/40 backdrop-blur-sm mt-auto">
          <div className="max-w-5xl mx-auto px-4 py-6">
            <p className="text-sm text-muted-foreground text-center">
              D&D Generator — Инструменты для мастеров и игроков
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
