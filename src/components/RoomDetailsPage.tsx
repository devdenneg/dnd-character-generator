import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Users,
  Lock,
  Copy,
  CheckCircle,
  Link as LinkIcon,
  Shield,
  Circle,
  User,
  UserPlus,
  Trophy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { roomsApi } from "@/api/client";
import { useAuth } from "@/contexts/AuthContext";
import { useSocket } from "@/contexts/SocketContext";
import { MasterRoomView } from "@/components/MasterRoomView";

interface Room {
  id: string;
  name: string;
  maxPlayers: number;
  isActive: boolean;
  isStarted: boolean;
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
  characterId: string;
  isOnline: boolean;
  joinedAt: string;
  user: {
    id: string;
    name: string | null;
    email: string;
  };
  character: {
    id: string;
    name: string;
    data: any;
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
  const [showInviteModal, setShowInviteModal] = useState(false);

  const isMaster = user?.id === room?.master.id;

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
      const [roomResponse, playersResponse] = await Promise.all([
        roomsApi.get(id!),
        roomsApi.getPlayers(id!),
      ]);
      console.log("🏠 Room response:", roomResponse);
      console.log("👥 Players response:", playersResponse);
      setRoom(roomResponse.data);
      // The API returns { success: true, data: [...] }
      setPlayers(playersResponse.data || []);
    } catch (err: any) {
      console.error("Load room error:", err);
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

  return (
    <div className="min-h-screen">
      {/* Background */}
      <div className="app-background" />
      <div className="ambient-glow ambient-glow-1" />
      <div className="ambient-glow ambient-glow-2" />

      <div className="relative z-10">
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
        <main className="max-w-4xl mx-auto px-4 py-4 md:py-8 w-full">
          {/* Room Info */}
          <div className="grid grid-cols-2 md:grid-cols-2 gap-3 md:gap-6 mb-4 md:mb-8">
            <div className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-xl md:rounded-2xl p-4 md:p-6">
              <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Users className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-foreground text-sm md:text-base truncate">Игроки</h3>
                  <p className="text-xs md:text-sm text-muted-foreground truncate">
                    Максимум
                  </p>
                </div>
              </div>
              <p className="text-2xl md:text-3xl font-bold text-foreground">
                {room.maxPlayers}
              </p>
            </div>

            <div className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-xl md:rounded-2xl p-4 md:p-6">
              <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-4 h-4 md:w-5 md:h-5 text-amber-500" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-foreground text-sm md:text-base truncate">Защита</h3>
                  <p className="text-xs md:text-sm text-muted-foreground truncate">
                    Пароль
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 md:w-5 md:h-5 text-muted-foreground" />
                <span className="text-muted-foreground text-sm md:text-base">•••••••••</span>
              </div>
            </div>
          </div>

          {/* Invite & Achievements Buttons */}
          {isMaster && !room.isStarted && (
            <div className="flex flex-col sm:flex-row gap-3 mb-4 md:mb-6">
              <Button
                onClick={() => setShowInviteModal(true)}
                className="gap-2 bg-gradient-to-r from-primary to-accent hover:opacity-90 flex-1 sm:flex-none"
                size="lg"
              >
                <UserPlus className="w-4 h-4 md:w-5 md:h-5" />
                Пригласить игроков
              </Button>
              <Button
                onClick={() => navigate(`/room/${id}/achievements`)}
                variant="outline"
                className="gap-2 border-amber-500/50 hover:bg-amber-500/10 flex-1 sm:flex-none"
                size="lg"
              >
                <Trophy className="w-4 h-4 md:w-5 md:h-5 text-amber-500" />
                Управление ачивками
              </Button>
            </div>
          )}

          {/* Player Achievements Button */}
          {!isMaster && (
            <div className="mb-4 md:mb-6">
              <Button
                onClick={() => navigate("/achievements")}
                variant="outline"
                className="gap-2 border-amber-500/50 hover:bg-amber-500/10 w-full md:w-auto"
                size="lg"
              >
                <Trophy className="w-4 h-4 md:w-5 md:h-5 text-amber-500" />
                Мои достижения
              </Button>
            </div>
          )}

          {/* Invite Modal */}
          <Modal
            isOpen={showInviteModal}
            onClose={() => {
              setShowInviteModal(false);
              setCopied(false);
            }}
            title="Пригласить игроков"
          >
            <div className="space-y-6">
              <p className="text-sm text-muted-foreground">
                Отправьте эту ссылку вашим игрокам для присоединения к комнате
              </p>

              {/* Invite Link */}
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Ссылка-приглашение:
                  </label>
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
                </div>

                {/* Room ID */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Или отправьте ID комнаты:
                  </label>
                  <div className="flex gap-2">
                    <Input
                      value={id!}
                      readOnly
                      className="bg-card/60 backdrop-blur-sm border-border/50 font-mono text-sm"
                    />
                    <Button
                      variant="outline"
                      onClick={handleCopyRoomId}
                    >
                      {copied ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Instructions */}
              <div className="bg-muted/30 rounded-xl p-4">
                <h4 className="font-semibold text-foreground mb-2 text-sm flex items-center gap-2">
                  <LinkIcon className="w-4 h-4" />
                  Как пригласить игроков:
                </h4>
                <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                  <li>Скопируйте ссылку приглашения</li>
                  <li>Отправьте игрокам (Discord, WhatsApp, Telegram и т.д.)</li>
                  <li>Игроки перейдут по ссылке и выберут персонажа</li>
                  <li>Введут пароль комнаты: <span className="font-mono text-foreground">•••••••••</span></li>
                </ol>
              </div>
            </div>
          </Modal>

          {/* Master View or Player List */}
          {isMaster ? (
            <MasterRoomView
              players={players}
            />
          ) : (
            <div className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-xl md:rounded-2xl p-4 md:p-6 mb-4 md:mb-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 md:gap-3 min-w-0">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Users className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-foreground text-sm md:text-base truncate">
                      Игроки в комнате
                    </h3>
                    <p className="text-xs md:text-sm text-muted-foreground truncate">
                      {players.length} / {room.maxPlayers}
                      {isConnected ? " • Онлайн" : " • Оффлайн"}
                    </p>
                  </div>
                </div>
              </div>

              {players.length === 0 ? (
                <div className="text-center py-6 md:py-8 text-muted-foreground">
                  <Users className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-2 opacity-50" />
                  <p className="text-sm md:text-base">Пока никто не присоединился к комнате</p>
                </div>
              ) : (
                <div className="space-y-2 md:space-y-3">
                  {players.map((player) => (
                    <div
                      key={player.id}
                      className="p-3 md:p-4 rounded-lg md:rounded-xl bg-gradient-to-br from-muted/30 to-muted/50 border border-border/30 hover:border-primary/30 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2 md:mb-3">
                        <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-1">
                          <div className="relative flex-shrink-0">
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                              <User className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                            </div>
                            <Circle
                              className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 md:w-3.5 md:h-3.5 ${
                                player.isOnline
                                  ? "fill-emerald-500 text-emerald-500"
                                  : "fill-muted text-muted"
                              }`}
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="font-semibold text-foreground text-sm md:text-base truncate">
                              {player.user.name || player.user.email}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {player.isOnline ? "🟢 Онлайн" : "⚪ Оффлайн"}
                            </p>
                          </div>
                        </div>
                        <span className="text-[10px] md:text-xs text-muted-foreground flex-shrink-0 ml-2">
                          {new Date(player.joinedAt).toLocaleDateString(
                            "ru-RU",
                            {
                              day: "numeric",
                              month: "short",
                            },
                          )}
                        </span>
                      </div>

                      {player.character && (
                        <div className="pl-15 border-t border-border/30 pt-3">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                              <span className="text-lg">⚔️</span>
                            </div>
                            <div>
                              <p className="font-semibold text-foreground text-sm">
                                {player.character.name}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {player.character.data.race?.name}{" "}
                                {player.character.data.class?.name}
                                {player.character.data.level &&
                                  ` • Уровень ${player.character.data.level}`}
                              </p>
                            </div>
                          </div>

                          {/* Character stats preview for master */}
                          {player.character.data.abilities && (
                            <div className="grid grid-cols-6 gap-2 mt-3">
                              {[
                                "strength",
                                "dexterity",
                                "constitution",
                                "intelligence",
                                "wisdom",
                                "charisma",
                              ].map((ability) => {
                                const value =
                                  player.character.data.abilities[ability];
                                const modifier = Math.floor((value - 10) / 2);
                                return (
                                  <div
                                    key={ability}
                                    className="text-center p-2 rounded-lg bg-background/50"
                                  >
                                    <p className="text-[10px] text-muted-foreground uppercase mb-1">
                                      {ability.substring(0, 3)}
                                    </p>
                                    <p className="text-xs font-bold text-foreground">
                                      {modifier >= 0 ? "+" : ""}
                                      {modifier}
                                    </p>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

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
        <footer className="border-t border-border/50 bg-card/40 backdrop-blur-sm mt-8">
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
