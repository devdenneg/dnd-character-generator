import { useQuery } from "@tanstack/react-query";
import { achievementsApi } from "../api/achievements";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { ACHIEVEMENT_CATEGORIES, type AchievementCategory } from "../data/achievements";

interface UserProgressCardProps {
  userId: string;
}

export function UserProgressCard({ userId }: UserProgressCardProps) {
  const { data, isLoading } = useQuery({
    queryKey: ["user-progress", userId],
    queryFn: () => achievementsApi.getUserProgress(userId),
  });

  if (isLoading) {
    return (
      <Card className="p-4 animate-pulse">
        <div className="h-6 bg-muted rounded w-1/3 mb-2" />
        <div className="h-4 bg-muted rounded w-2/3" />
      </Card>
    );
  }

  if (!data) return null;

  return (
    <Card className="p-4 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="space-y-4">
        {/* Уровень и опыт */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-primary">
                Уровень {data.progress.currentLevel}
              </span>
              <Badge className="bg-primary">
                {data.progress.experience} XP
              </Badge>
            </div>
            <span className="text-sm text-muted-foreground">
              {data.progress.experienceToNextLevel} XP до {data.progress.currentLevel + 1} уровня
            </span>
          </div>
          <Progress value={data.progress.progressPercent} className="h-3" />
          <p className="text-xs text-muted-foreground mt-1">
            {data.progress.progressPercent.toFixed(1)}% прогресса
          </p>
        </div>

        {/* Достижения */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold">🏆 Достижения</h3>
            <Badge variant="outline">
              {data.progress.totalAchievements} / {data.progress.availableAchievements}
            </Badge>
          </div>

          {data.achievements.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-48 overflow-y-auto">
              {data.achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className="p-2 rounded-lg bg-card border border-border"
                  title={achievement.description || ""}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{achievement.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium truncate">{achievement.name}</p>
                      <p className="text-xs text-muted-foreground">
                        +{achievement.experience} XP
                      </p>
                    </div>
                  </div>
                  {achievement.category && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {ACHIEVEMENT_CATEGORIES[achievement.category as AchievementCategory]}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4">
              Пока нет достижений
            </p>
          )}
        </div>
      </div>
    </Card>
  );
}
