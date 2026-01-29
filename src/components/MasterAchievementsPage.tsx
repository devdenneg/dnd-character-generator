import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Trophy, User, CheckCircle } from "lucide-react";
import { Achievement, PlayerAchievement, ACHIEVEMENT_ICONS } from "../types/achievement";
import { achievementApi } from "../api/achievement";
import { roomsApi } from "../api/client";
import { AchievementCard } from "../components/AchievementCard";
import { PlayerAchievementCard } from "../components/PlayerAchievementCard";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";

interface RoomPlayer {
  id: string;
  userId: string;
  characterId: string;
  isOnline: boolean;
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

export const MasterAchievementsPage: React.FC = () => {
  const navigate = useNavigate();
  const { roomId } = useParams<{ roomId: string }>();
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [playerAchievements, setPlayerAchievements] = useState<PlayerAchievement[]>([]);
  const [players, setPlayers] = useState<RoomPlayer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Форма создания ачивки
  const [newAchievement, setNewAchievement] = useState({
    name: "",
    description: "",
    icon: ACHIEVEMENT_ICONS[0],
    xpReward: 0
  });

  // Выдача ачивки
  const [grantAchievement, setGrantAchievement] = useState({
    achievementId: "",
    characterId: ""
  });

  // Состояние для переключения между вкладками
  const [activeTab, setActiveTab] = useState<'achievements' | 'grants'>('achievements');

  useEffect(() => {
    if (!roomId) {
      setError("Room ID is required");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        console.log("🏆 Loading achievements for room:", roomId);
        setLoading(true);

        // Загружаем параллельно
        const [roomAchievements, roomPlayerAchievements, playersData] = await Promise.all([
          achievementApi.getRoomAchievements(roomId),
          achievementApi.getRoomPlayerAchievements(roomId),
          roomsApi.getPlayers(roomId)
        ]);

        console.log("✅ Data loaded:", { roomAchievements, roomPlayerAchievements, playersData });
        setAchievements(roomAchievements);
        setPlayerAchievements(roomPlayerAchievements.data || []);
        setPlayers(playersData.data || []);
      } catch (err) {
        console.error("❌ Failed to load achievements:", err);
        setError("Failed to load achievements");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [roomId]);

  const handleCreateAchievement = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!roomId) {
      setError("Room ID is required");
      return;
    }

    try {
      const created = await achievementApi.createAchievement(roomId, newAchievement);
      setAchievements([...achievements, created]);
      setNewAchievement({
        name: "",
        description: "",
        icon: ACHIEVEMENT_ICONS[0],
        xpReward: 0
      });
      setSuccessMessage("Achievement created successfully!");
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      setError("Failed to create achievement");
      console.error(err);
    }
  };

  const handleGrantAchievement = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!roomId) {
      setError("Room ID is required");
      return;
    }

    if (!grantAchievement.achievementId || !grantAchievement.characterId) {
      setError("Пожалуйста, выберите ачивку и персонажа");
      return;
    }

    // Находим игрока по characterId
    const selectedPlayer = players.find(p => p.characterId === grantAchievement.characterId);
    if (!selectedPlayer) {
      setError("Игрок не найден");
      return;
    }

    try {
      const granted = await achievementApi.grantAchievement(roomId, {
        achievementId: grantAchievement.achievementId,
        userId: selectedPlayer.userId,
        characterId: grantAchievement.characterId,
        grantedById: "" // Будет заполнен на бэкенде из токена
      });
      setPlayerAchievements([granted, ...playerAchievements]);

      // Очищаем форму
      setGrantAchievement({
        achievementId: "",
        characterId: ""
      });
      setSuccessMessage("Ачивка успешно выдана!");
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err: any) {
      setError(err.response?.data?.error || "Не удалось выдать ачивку");
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-muted-foreground mt-4">Загрузка...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <Trophy className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <p className="text-destructive mb-4">{error}</p>
          <Button onClick={() => navigate(-1)}>Назад</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="app-background" />
      <div className="ambient-glow ambient-glow-1" />
      <div className="ambient-glow ambient-glow-2" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <Trophy className="w-6 h-6 text-amber-500" />
                Управление ачивками
              </h1>
              <p className="text-sm text-muted-foreground">
                Создавайте и выдавайте достижения игрокам
              </p>
            </div>
          </div>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 p-4 bg-emerald-500/20 border border-emerald-500/50 rounded-xl flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
            <span className="text-emerald-500 font-medium">{successMessage}</span>
          </div>
        )}

        {/* Tabs */}
        <div className="border-b border-border/50 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'achievements'
                  ? 'border-amber-500 text-amber-500'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
              onClick={() => setActiveTab('achievements')}
            >
              Ачивки комнаты
            </button>
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'grants'
                  ? 'border-amber-500 text-amber-500'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
              onClick={() => setActiveTab('grants')}
            >
              Выданные ачивки
            </button>
          </nav>
        </div>

        {activeTab === 'achievements' ? (
          <div className="space-y-6">
            {/* Форма создания ачивки */}
            <div className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-2xl p-6">
              <h2 className="text-xl font-semibold mb-4">Создать новую ачивку</h2>
              <form onSubmit={handleCreateAchievement} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Название</label>
                  <Input
                    value={newAchievement.name}
                    onChange={(e) => setNewAchievement({...newAchievement, name: e.target.value})}
                    placeholder="Название ачивки"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Описание</label>
                  <Textarea
                    value={newAchievement.description}
                    onChange={(e) => setNewAchievement({...newAchievement, description: e.target.value})}
                    placeholder="Описание ачивки"
                    rows={3}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Иконка</label>
                    <div className="grid grid-cols-5 gap-2">
                      {ACHIEVEMENT_ICONS.map((icon) => (
                        <button
                          key={icon}
                          type="button"
                          onClick={() => setNewAchievement({...newAchievement, icon})}
                          className={`p-3 rounded-lg border-2 transition-all ${
                            newAchievement.icon === icon
                              ? 'border-amber-500 bg-amber-500/20'
                              : 'border-border/50 hover:border-amber-500/50'
                          }`}
                        >
                          <span className="text-2xl">{icon}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Награда XP</label>
                    <Input
                      type="number"
                      value={newAchievement.xpReward}
                      onChange={(e) => setNewAchievement({...newAchievement, xpReward: parseInt(e.target.value) || 0})}
                      min="0"
                      placeholder="0"
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full md:w-auto bg-gradient-to-r from-amber-500 to-orange-500 hover:opacity-90">
                  <Trophy className="w-4 h-4 mr-2" />
                  Создать ачивку
                </Button>
              </form>
            </div>

            {/* Список ачивок */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Ачивки комнаты ({achievements.length})</h2>
              {achievements.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground bg-card/40 backdrop-blur-sm border border-border/50 rounded-2xl">
                  <Trophy className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Пока нет созданных ачивок</p>
                  <p className="text-sm mt-2">Создайте первую ачивку, чтобы награждать игроков</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {achievements.map((achievement) => (
                    <AchievementCard key={achievement.id} achievement={achievement} />
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Форма выдачи ачивки */}
            <div className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-2xl p-6">
              <h2 className="text-xl font-semibold mb-4">Выдать ачивку игроку</h2>
              <form onSubmit={handleGrantAchievement} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Выберите ачивку</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-48 overflow-y-auto p-2 border border-border/50 rounded-xl">
                    {achievements.length === 0 ? (
                      <p className="text-sm text-muted-foreground col-span-full text-center py-4">
                        Нет доступных ачивок
                      </p>
                    ) : (
                      achievements.map((achievement) => (
                        <button
                          key={achievement.id}
                          type="button"
                          onClick={() => setGrantAchievement({...grantAchievement, achievementId: achievement.id})}
                          className={`p-3 rounded-lg border-2 transition-all text-left ${
                            grantAchievement.achievementId === achievement.id
                              ? 'border-amber-500 bg-amber-500/20'
                              : 'border-border/50 hover:border-amber-500/50'
                          }`}
                        >
                          <span className="text-2xl block mb-1">{achievement.icon}</span>
                          <span className="text-sm font-medium block truncate">{achievement.name}</span>
                        </button>
                      ))
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Выберите персонажа</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-48 overflow-y-auto p-2 border border-border/50 rounded-xl">
                    {players.length === 0 ? (
                      <p className="text-sm text-muted-foreground col-span-full text-center py-4">
                        Нет игроков в комнате
                      </p>
                    ) : (
                      players.map((player) => (
                        <button
                          key={player.id}
                          type="button"
                          onClick={() => setGrantAchievement({...grantAchievement, characterId: player.characterId})}
                          className={`p-4 rounded-lg border-2 transition-all text-left ${
                            grantAchievement.characterId === player.characterId
                              ? 'border-amber-500 bg-amber-500/20'
                              : 'border-border/50 hover:border-amber-500/50'
                          }`}
                        >
                          <div className="space-y-3">
                            {/* Персонаж */}
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4 text-primary flex-shrink-0" />
                              <span className="text-sm font-semibold text-foreground">
                                {player.character.name}
                              </span>
                            </div>

                            {/* Разделитель */}
                            <div className="h-px bg-border/30"></div>

                            {/* Игрок */}
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-muted-foreground">Игрок:</span>
                              <span className="text-xs text-foreground">
                                {player.user.name || player.user.email}
                              </span>
                            </div>
                          </div>
                        </button>
                      ))
                    )}
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full md:w-auto bg-gradient-to-r from-amber-500 to-orange-500 hover:opacity-90"
                  disabled={!grantAchievement.achievementId || !grantAchievement.characterId}
                >
                  <Trophy className="w-4 h-4 mr-2" />
                  Выдать ачивку
                </Button>
              </form>
            </div>

            {/* Список выданных ачивок */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Выданные ачивки ({playerAchievements.length})</h2>
              {playerAchievements.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground bg-card/40 backdrop-blur-sm border border-border/50 rounded-2xl">
                  <Trophy className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Пока нет выданных ачивок</p>
                  <p className="text-sm mt-2">Выдайте первую ачивку игроку</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {playerAchievements.map((playerAchievement) => (
                    <PlayerAchievementCard key={playerAchievement.id} playerAchievement={playerAchievement} />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
