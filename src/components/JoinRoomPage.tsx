import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Lock, Users, Shield, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { roomsApi, charactersApi } from "@/api/client";
import { useAuth } from "@/contexts/AuthContext";
import { useAuthModal } from "@/contexts/AuthModalContext";
import type { CharacterEntity, RoomEntity } from "@/types/api";
import { getErrorMessage } from "@/utils/errorHandling";

interface RoomWithMaster extends RoomEntity {
  master: {
    id: string;
    name: string | null;
    email: string;
  };
}

export function JoinRoomPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { openLogin, openRegister } = useAuthModal();
  const [room, setRoom] = useState<RoomWithMaster | null>(null);
  const [characters, setCharacters] = useState<CharacterEntity[]>([]);
  const [selectedCharacterId, setSelectedCharacterId] = useState<string>("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isJoining, setIsJoining] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    if (id) {
      loadData();
    }
  }, [id, isAuthenticated]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const [roomResponse, charactersResponse] = await Promise.all([
        roomsApi.get(id!),
        charactersApi.list(),
      ]);

      // roomsApi.get returns { success: true, data: roomData }
      // charactersApi.list returns { success: true, data: { characters: [...] } }
      setRoom(roomResponse.data);
      const charactersData = charactersResponse.data?.characters || [];
      setCharacters(charactersData);

      // Auto-select first character if available
      if (charactersData.length > 0) {
        setSelectedCharacterId(charactersData[0].id);
      }
    } catch (err: unknown) {
      console.error("Error loading data:", err);
      setError(getErrorMessage(err, "Не удалось загрузить данные"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedCharacterId) {
      setError("Выберите персонажа");
      return;
    }

    if (!password.trim()) {
      setError("Введите пароль");
      return;
    }

    try {
      setIsJoining(true);
      setError("");

      await roomsApi.join(id!, password, selectedCharacterId);

      // Navigate to room details
      navigate(`/room/${id}`);
    } catch (err: unknown) {
      setError(getErrorMessage(err, "Не удалось присоединиться к комнате"));
    } finally {
      setIsJoining(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="app-background" />
        <div className="ambient-glow ambient-glow-1" />
        <div className="ambient-glow ambient-glow-2" />

        <div className="relative z-10 max-w-md w-full mx-auto px-4">
          <div className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Требуется авторизация
            </h2>
            <p className="text-muted-foreground mb-6">
              Войдите в аккаунт, чтобы присоединиться к комнате
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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="app-background" />
        <div className="ambient-glow ambient-glow-1" />
        <div className="ambient-glow ambient-glow-2" />

        <div className="relative z-10 text-center">
          <div className="inline-block w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-muted-foreground mt-4">Загрузка...</p>
        </div>
      </div>
    );
  }

  if (!room) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="app-background" />
        <div className="ambient-glow ambient-glow-1" />
        <div className="ambient-glow ambient-glow-2" />

        <div className="relative z-10 text-center">
          <p className="text-destructive mb-4">
            {error || "Комната не найдена"}
          </p>
          <Button onClick={() => navigate("/")}>На главную</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Background */}
      <div className="app-background" />
      <div className="ambient-glow ambient-glow-1" />
      <div className="ambient-glow ambient-glow-2" />

      <div className="relative z-10 flex flex-col flex-1">
        {/* Header */}
        <header className="border-b border-border/50 bg-card/80 backdrop-blur-xl">
          <div className="max-w-2xl mx-auto px-4 py-6">
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
                  Присоединиться к комнате
                </h1>
                <p className="text-sm text-muted-foreground">
                  Введите пароль для входа
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-2xl mx-auto px-4 py-8 flex-1 w-full">
          {/* Room Info */}
          <div className="bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/30 rounded-2xl p-6 mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              {room.name}
            </h2>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Мастер</p>
                  <p className="font-semibold text-foreground">
                    {room.master.name || room.master.email}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
                  <Users className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Макс. игроков</p>
                  <p className="font-semibold text-foreground">
                    {room.maxPlayers}
                  </p>
                </div>
              </div>
            </div>

            <span
              className={`inline-block px-3 py-1.5 text-sm rounded-full ${
                room.isActive
                  ? "bg-emerald-500/20 text-emerald-500"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {room.isActive ? "Активна" : "Неактивна"}
            </span>
          </div>

          {/* Character Selection & Password Form */}
          <div className="space-y-6">
            {/* Character Selection */}
            {characters.length === 0 ? (
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-6">
                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 text-amber-500 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">
                      Нет персонажей
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Создайте персонажа, чтобы присоединиться к игре
                    </p>
                    <Button
                      onClick={() => navigate("/my-characters")}
                      variant="outline"
                    >
                      Создать персонажа
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">
                      Выберите персонажа
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Выберите персонажа для игры
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  {characters.map((char) => (
                    <button
                      key={char.id}
                      onClick={() => setSelectedCharacterId(char.id)}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                        selectedCharacterId === char.id
                          ? "border-primary bg-primary/10"
                          : "border-border/50 bg-background/50 hover:border-primary/50"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-foreground">
                            {char.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {char.data.race?.nameRu} {char.data.class?.nameRu}
                            {char.data.level && ` • Уровень ${char.data.level}`}
                          </p>
                        </div>
                        {selectedCharacterId === char.id && (
                          <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                            <svg
                              className="w-3 h-3 text-primary-foreground"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={3}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Password Form */}
            <div className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Lock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">
                    Защищённая комната
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Для входа требуется пароль
                  </p>
                </div>
              </div>

              <form onSubmit={handleJoin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Пароль
                  </label>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Введите пароль комнаты"
                    className="bg-background/50"
                    disabled={characters.length === 0}
                  />
                </div>

                {error && (
                  <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-3">
                    <p className="text-sm text-destructive">{error}</p>
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90"
                  disabled={
                    isJoining ||
                    !room.isActive ||
                    characters.length === 0 ||
                    !selectedCharacterId
                  }
                >
                  {isJoining
                    ? "Присоединяюсь..."
                    : room.isActive
                    ? "Присоединиться"
                    : "Комната неактивна"}
                </Button>
              </form>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-border/50 bg-card/40 backdrop-blur-sm mt-auto">
          <div className="max-w-2xl mx-auto px-4 py-6">
            <p className="text-sm text-muted-foreground text-center">
              D&D Generator — Инструменты для мастеров и игроков
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
