import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Users,
  Lock,
  Hash,
  Copy,
  CheckCircle,
  Link as LinkIcon,
  Shield,
  Circle,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { roomsApi } from "@/api/client";
import { useAuth } from "@/contexts/AuthContext";
import { useSocket } from "@/contexts/SocketContext";

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
    email: string;
  };
}

interface RoomPlayer {
  id: string;
  userId: string;
  isOnline: boolean;
  joinedAt: string;
  user: {
    id: string;
    name: string | null;
    email: string;
  };
}

export function RoomDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { socket, isConnected } = useSocket();
  const [room, setRoom] = useState<Room | null>(null);
  const [players, setPlayers] = useState<RoomPlayer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (id) {
      loadRoom();
    }
  }, [id]);

  // WebSocket: присоединиться к комнате и слушать обновления
  useEffect(() => {
    if (!socket || !isConnected || !id) return;

    console.log("🔌 Подключаемся к комнате через WebSocket:", id);

    // Присоединяемся к комнате
    socket.emit("join-room", id);

    // Слушаем обновления списка игроков
    socket.on(
      "room-players-updated",
      (data: { roomId: string; players: RoomPlayer[] }) => {
        if (data.roomId === id) {
          console.log("👥 Обновлён список игроков:", data.players);
          setPlayers(data.players);
        }
      },
    );

    // При размонтировании компонента
    return () => {
      console.log("👋 Покидаем комнату:", id);
      socket.emit("leave-room", id);
      socket.off("room-players-updated");
    };
  }, [socket, isConnected, id]);

  const loadRoom = async () => {
    try {
      setIsLoading(true);
      const response = await roomsApi.get(id!);
      setRoom(response.data);
    } catch (err: any) {
      setError(err.response?.data?.error || "Не удалось загрузить комнату");
    } finally {
      setIsLoading(false);
    }
  };

  const generateInviteCode = () => {
    // Generate invite link with room ID
    const baseUrl =
      window.location.origin + window.location.pathname.split("#")[0];
    return `${baseUrl}#/join-room/${id}`;
  };

  const handleCopyInviteLink = async () => {
    const inviteLink = generateInviteCode();
    try {
      await navigator.clipboard.writeText(inviteLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      alert("Не удалось скопировать ссылку");
    }
  };

  const handleCopyRoomId = async () => {
    try {
      await navigator.clipboard.writeText(id!);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      alert("Не удалось скопировать ID");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-muted-foreground mt-4">Загрузка...</p>
        </div>
      </div>
    );
  }

  if (error || !room) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-destructive mb-4">
            {error || "Комната не найдена"}
          </p>
          <Button onClick={() => navigate("/my-rooms")}>К моим комнатам</Button>
        </div>
      </div>
    );
  }

  const isMaster = user?.id === room.master.id;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Background */}
      <div className="app-background" />
      <div className="ambient-glow ambient-glow-1" />
      <div className="ambient-glow ambient-glow-2" />

      <div className="relative z-10 flex flex-col flex-1">
        {/* Header */}
        <header className="border-b border-border/50 bg-card/80 backdrop-blur-xl">
          <div className="max-w-4xl mx-auto px-4 py-6">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate(isMaster ? "/my-rooms" : "/")}
                className="text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-foreground">
                  {room.name}
                </h1>
                <p className="text-sm text-muted-foreground">
                  Мастер: {room.master.name || room.master.email}
                </p>
              </div>
              <span
                className={`px-3 py-1.5 text-sm rounded-full ${
                  room.isActive
                    ? "bg-emerald-500/20 text-emerald-500"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {room.isActive ? "Активна" : "Неактивна"}
              </span>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-4 py-8 flex-1 w-full">
          {/* Room Info */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Игроки</h3>
                  <p className="text-sm text-muted-foreground">
                    Максимум игроков
                  </p>
                </div>
              </div>
              <p className="text-3xl font-bold text-foreground">
                {room.maxPlayers}
              </p>
            </div>

            <div className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Защита</h3>
                  <p className="text-sm text-muted-foreground">
                    Требуется пароль
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-muted-foreground" />
                <span className="text-muted-foreground">•••••••••</span>
              </div>
            </div>
          </div>

          {/* Invite Section */}
          {isMaster && (
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/30 rounded-2xl p-6 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <LinkIcon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">
                    Пригласить игроков
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Отправьте эту ссылку вашим игрокам
                  </p>
                </div>
              </div>

              {/* Invite Link */}
              <div className="space-y-3">
                <div className="flex gap-2">
                  <Input
                    value={generateInviteCode()}
                    readOnly
                    className="bg-card/60 backdrop-blur-sm border-border/50 font-mono text-sm"
                  />
                  <Button
                    onClick={handleCopyInviteLink}
                    className="bg-primary hover:bg-primary/90"
                  >
                    {copied ? (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Скопировано
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-2" />
                        Копировать
                      </>
                    )}
                  </Button>
                </div>

                {/* Room ID */}
                <div>
                  <p className="text-xs text-muted-foreground mb-2">
                    Или отправьте ID комнаты:
                  </p>
                  <div className="flex gap-2">
                    <Input
                      value={id!}
                      readOnly
                      className="bg-card/60 backdrop-blur-sm border-border/50 font-mono text-sm"
                    />
                    <Button
                      variant="outline"
                      onClick={handleCopyRoomId}
                      size="sm"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Players List */}
          <div className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-2xl p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">
                    Игроки в комнате
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {players.length} / {room.maxPlayers}
                    {isConnected ? " • Онлайн" : " • Оффлайн"}
                  </p>
                </div>
              </div>
            </div>

            {players.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Users className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>Пока никто не присоединился к комнате</p>
              </div>
            ) : (
              <div className="space-y-2">
                {players.map((player) => (
                  <div
                    key={player.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border/30"
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                          <User className="w-5 h-5 text-primary" />
                        </div>
                        <Circle
                          className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 ${
                            player.isOnline
                              ? "fill-emerald-500 text-emerald-500"
                              : "fill-muted text-muted"
                          }`}
                        />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">
                          {player.user.name || player.user.email}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {player.isOnline ? "Онлайн" : "Оффлайн"}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      Присоединился{" "}
                      {new Date(player.joinedAt).toLocaleDateString("ru-RU", {
                        day: "numeric",
                        month: "short",
                      })}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Info Cards */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-card/40 backdrop-blur-sm border border-border/50 rounded-xl p-4">
              <h4 className="font-semibold text-foreground mb-2 text-sm">
                Как пригласить игроков
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>1. Скопируйте ссылку приглашения</li>
                <li>2. Отправьте игрокам (Discord, WhatsApp и т.д.)</li>
                <li>3. Игроки перейдут по ссылке и введут пароль</li>
              </ul>
            </div>

            <div className="bg-card/40 backdrop-blur-sm border border-border/50 rounded-xl p-4">
              <h4 className="font-semibold text-foreground mb-2 text-sm">
                Управление комнатой
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Деактивируйте комнату, чтобы скрыть её</li>
                <li>• Измените настройки в любое время</li>
                <li>• Удалите комнату, когда игра закончится</li>
              </ul>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-border/50 bg-card/40 backdrop-blur-sm mt-auto">
          <div className="max-w-4xl mx-auto px-4 py-6">
            <p className="text-sm text-muted-foreground text-center">
              D&D Generator — Инструменты для мастеров и игроков
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
