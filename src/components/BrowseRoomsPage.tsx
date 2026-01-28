import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Users,
  Shield,
  Lock,
  Loader2,
  AlertCircle,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { roomsApi } from "@/api/client";
import { useAuth } from "@/contexts/AuthContext";

interface Room {
  id: string;
  name: string;
  maxPlayers: number;
  createdAt: string;
  master: {
    id: string;
    name: string | null;
  };
}

export function BrowseRoomsPage() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [filteredRooms, setFilteredRooms] = useState<Room[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      loadRooms();
    } else if (!authLoading && !isAuthenticated) {
      setIsLoading(false);
    }
  }, [authLoading, isAuthenticated]);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredRooms(rooms);
    } else {
      const query = searchQuery.toLowerCase();
      setFilteredRooms(
        rooms.filter(
          (room) =>
            room.name.toLowerCase().includes(query) ||
            room.master.name?.toLowerCase().includes(query),
        ),
      );
    }
  }, [searchQuery, rooms]);

  const loadRooms = async () => {
    try {
      setIsLoading(true);
      setError("");
      const response = await roomsApi.listActive();
      if (response.success) {
        setRooms(response.data);
        setFilteredRooms(response.data);
      }
    } catch (err: any) {
      setError(err.response?.data?.error || "Не удалось загрузить комнаты");
    } finally {
      setIsLoading(false);
    }
  };

  // Loading auth state
  if (authLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="app-background" />
        <div className="ambient-glow ambient-glow-1" />
        <div className="ambient-glow ambient-glow-2" />

        <div className="relative z-10 flex items-center justify-center flex-1">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
            <p className="text-muted-foreground">Загрузка...</p>
          </div>
        </div>
      </div>
    );
  }

  // Not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="app-background" />
        <div className="ambient-glow ambient-glow-1" />
        <div className="ambient-glow ambient-glow-2" />

        <div className="relative z-10 flex flex-col flex-1">
          <header className="border-b border-border/50 bg-card/80 backdrop-blur-xl">
            <div className="max-w-5xl mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1
                    className="text-2xl font-bold text-gradient"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Активные комнаты
                  </h1>
                </div>
                <Button
                  variant="outline"
                  onClick={() => navigate("/")}
                  className="gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  На главную
                </Button>
              </div>
            </div>
          </header>

          <main className="flex-1 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/20 flex items-center justify-center">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Войдите в аккаунт</h2>
              <p className="text-muted-foreground mb-6">
                Чтобы присоединиться к комнате, необходимо войти в аккаунт
              </p>
              <div className="flex gap-3 justify-center">
                <Button onClick={() => navigate("/login")}>Войти</Button>
                <Button variant="outline" onClick={() => navigate("/register")}>
                  Регистрация
                </Button>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="app-background" />
      <div className="ambient-glow ambient-glow-1" />
      <div className="ambient-glow ambient-glow-2" />

      <div className="relative z-10 flex flex-col flex-1">
        <header className="border-b border-border/50 bg-card/80 backdrop-blur-xl">
          <div className="max-w-5xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1
                  className="text-2xl font-bold text-gradient"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Активные комнаты
                </h1>
                <p className="text-sm text-muted-foreground">
                  {filteredRooms.length > 0
                    ? `Найдено комнат: ${filteredRooms.length}`
                    : "Нет активных комнат"}
                </p>
              </div>
              <Button
                variant="outline"
                onClick={() => navigate("/")}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                На главную
              </Button>
            </div>

            {/* Search */}
            {rooms.length > 0 && (
              <div className="mt-4 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Поиск по названию или мастеру..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-card/60 backdrop-blur-sm border-border/50"
                />
              </div>
            )}
          </div>
        </header>

        <main className="flex-1 max-w-5xl mx-auto px-4 py-6 w-full">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : error ? (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex items-center gap-3 text-red-400">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              {error}
            </div>
          ) : filteredRooms.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-muted/50 flex items-center justify-center">
                <Users className="w-10 h-10 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-semibold mb-2">
                {searchQuery ? "Ничего не найдено" : "Нет активных комнат"}
              </h2>
              <p className="text-muted-foreground mb-6">
                {searchQuery
                  ? "Попробуйте изменить запрос поиска"
                  : "Пока никто не создал комнату для игры"}
              </p>
              {searchQuery && (
                <Button variant="outline" onClick={() => setSearchQuery("")}>
                  Сбросить поиск
                </Button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredRooms.map((room) => (
                <div
                  key={room.id}
                  className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-2xl p-6 hover:border-primary/50 transition-all"
                >
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground truncate">
                        {room.name}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                        <Shield className="w-3 h-3" />
                        <span className="truncate">
                          {room.master.name || "Мастер"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm mb-4">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Users className="w-4 h-4" />
                      <span>Макс: {room.maxPlayers}</span>
                    </div>
                    <div className="flex items-center gap-1 text-amber-500">
                      <Lock className="w-4 h-4" />
                      <span className="text-xs">Защищено</span>
                    </div>
                  </div>

                  <Button
                    onClick={() => navigate(`/join-room/${room.id}`)}
                    className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90"
                  >
                    Присоединиться
                  </Button>
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
