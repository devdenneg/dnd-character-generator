import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { achievementsApi } from "../api/achievements";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Trophy, Award } from "lucide-react";
import { AchievementGrantModal } from "./AchievementGrantModal";

interface RoomPlayersProgressTabProps {
  roomId: string;
}

export function RoomPlayersProgressTab({ roomId }: RoomPlayersProgressTabProps) {
  const [selectedPlayer, setSelectedPlayer] = useState<{
    userId: string;
    userName: string;
  } | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["room-players-progress", roomId],
    queryFn: () => achievementsApi.getRoomPlayersProgress(roomId),
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="p-4 animate-pulse">
            <div className="h-6 bg-muted rounded w-1/3 mb-2" />
            <div className="h-4 bg-muted rounded w-2/3" />
          </Card>
        ))}
      </div>
    );
  }

  if (!data || data.players.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <Trophy className="w-12 h-12 mx-auto mb-4 opacity-50" />
        <p>В комнате пока нет игроков</p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Trophy className="w-5 h-5" />
            Прогресс игроков
          </h2>
          <Badge variant="outline">{data.players.length} игроков</Badge>
        </div>

        {data.players.map((player) => (
          <Card key={player.roomPlayerId} className="p-4">
            <div className="space-y-3">
              {/* Заголовок с именем и кнопкой */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg">
                    {player.user.name || player.user.email}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {player.character.name}
                  </p>
                </div>
                <Button
                  size="sm"
                  onClick={() =>
                    setSelectedPlayer({
                      userId: player.user.id,
                      userName: player.user.name || player.user.email,
                    })
                  }
                  className="flex items-center gap-2"
                >
                  <Award className="w-4 h-4" />
                  Выдать ачивку
                </Button>
              </div>

              {/* Уровень и опыт */}
              <div className="bg-primary/5 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-primary">
                      Уровень {player.progress.currentLevel}
                    </span>
                    <Badge className="bg-primary">
                      {player.progress.experience} XP
                    </Badge>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {player.progress.experienceToNextLevel} XP до следующего уровня
                  </span>
                </div>
                <Progress value={player.progress.progressPercent} className="h-2" />
              </div>

              {/* Достижения */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium">Достижения</h4>
                  <Badge variant="outline" className="text-xs">
                    {player.progress.totalAchievements} получено
                  </Badge>
                </div>

                {player.achievements.length > 0 ? (
                  <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                    {player.achievements.slice(0, 12).map((achievement) => (
                      <div
                        key={achievement.id}
                        className="p-2 rounded-lg bg-card border border-border text-center"
                        title={`${achievement.name}\n${achievement.description}\n+${achievement.experience} XP`}
                      >
                        <span className="text-2xl">{achievement.icon}</span>
                      </div>
                    ))}
                    {player.achievements.length > 12 && (
                      <div className="p-2 rounded-lg bg-muted text-center flex items-center justify-center">
                        <span className="text-xs text-muted-foreground">
                          +{player.achievements.length - 12}
                        </span>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-2">
                    Пока нет достижений
                  </p>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Модальное окно выдачи достижения */}
      {selectedPlayer && (
        <AchievementGrantModal
          isOpen={!!selectedPlayer}
          onClose={() => setSelectedPlayer(null)}
          userId={selectedPlayer.userId}
          userName={selectedPlayer.userName}
          roomId={roomId}
        />
      )}
    </>
  );
}
