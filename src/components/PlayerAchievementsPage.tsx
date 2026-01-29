import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Trophy, ArrowLeft, Star, Award } from "lucide-react";
import { PlayerAchievement } from "../types/achievement";
import { achievementApi } from "../api/achievement";
import { Button } from "../components/ui/button";

export const PlayerAchievementsPage: React.FC = () => {
  const navigate = useNavigate();
  const [playerAchievements, setPlayerAchievements] = useState<PlayerAchievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("🏆 Loading player achievements...");
        setLoading(true);
        const achievements = await achievementApi.getPlayerAchievements();
        console.log("✅ Player achievements loaded:", achievements);
        setPlayerAchievements(achievements);
      } catch (err) {
        console.error("❌ Failed to load achievements:", err);
        setError("Не удалось загрузить достижения");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Группируем достижения по персонажам
  const achievementsByCharacter = playerAchievements.reduce((acc, pa) => {
    const characterId = pa.characterId || 'none';
    const characterName = pa.character?.name || 'Без персонажа';

    if (!acc[characterId]) {
      acc[characterId] = {
        characterId,
        characterName,
        achievements: [],
        totalXP: 0
      };
    }

    acc[characterId].achievements.push(pa);
    acc[characterId].totalXP += pa.achievement.xpReward || 0;

    return acc;
  }, {} as Record<string, {
    characterId: string;
    characterName: string;
    achievements: typeof playerAchievements;
    totalXP: number;
  }>);

  // Сортируем персонажей: сначала те, у кого больше всего XP
  const sortedCharacters = Object.values(achievementsByCharacter).sort((a, b) => b.totalXP - a.totalXP);

  // Статистика
  const totalAchievements = playerAchievements.length;
  const totalXP = playerAchievements.reduce((sum, pa) => sum + (pa.achievement.xpReward || 0), 0);
  const uniqueCharacters = sortedCharacters.length;

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
                Мои достижения
              </h1>
              <p className="text-sm text-muted-foreground">
                Ваши награды и accomplishment
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-amber-500/20 to-orange-500/20 backdrop-blur-sm border border-amber-500/50 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-amber-500/30 flex items-center justify-center">
                <Trophy className="w-5 h-5 text-amber-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{totalAchievements}</p>
                <p className="text-xs text-muted-foreground">Всего ачивок</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-sm border border-blue-500/50 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-blue-500/30 flex items-center justify-center">
                <Star className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{totalXP}</p>
                <p className="text-xs text-muted-foreground">Накоплено XP</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-purple-500/50 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-purple-500/30 flex items-center justify-center">
                <Award className="w-5 h-5 text-purple-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{uniqueCharacters}</p>
                <p className="text-xs text-muted-foreground">Персонажей</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 backdrop-blur-sm border border-emerald-500/50 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/30 flex items-center justify-center">
                <Award className="w-5 h-5 text-emerald-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{uniqueCharacters}</p>
                <p className="text-xs text-muted-foreground">Персонажей</p>
              </div>
            </div>
          </div>
        </div>

        {/* Achievements List */}
        {playerAchievements.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground bg-card/40 backdrop-blur-sm border border-border/50 rounded-2xl">
            <Trophy className="w-20 h-20 mx-auto mb-4 opacity-30" />
            <h2 className="text-xl font-semibold text-foreground mb-2">Пока нет достижений</h2>
            <p className="text-sm">
              Выполняйте задания и получайте награды от мастера игры!
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-foreground">
              Достижения по персонажам
            </h2>

            {sortedCharacters.map((characterData) => (
              <div key={characterData.characterId} className="space-y-4">
                {/* Заголовок персонажа */}
                <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 backdrop-blur-sm border border-amber-500/30 rounded-2xl p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/30 to-orange-500/30 flex items-center justify-center">
                        <Award className="w-6 h-6 text-amber-500" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-foreground">
                          {characterData.characterName}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {characterData.achievements.length} достижени{characterData.achievements.length > 1 ? (characterData.achievements.length < 5 ? 'я' : 'й') : 'е'}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-amber-500">{characterData.totalXP}</p>
                      <p className="text-xs text-muted-foreground">накоплено XP</p>
                    </div>
                  </div>
                </div>

                {/* Список достижений персонажа */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {characterData.achievements.map((playerAchievement) => (
                    <div
                      key={playerAchievement.id}
                      className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-2xl p-6 hover:border-amber-500/50 transition-all"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex items-center justify-center text-4xl">{playerAchievement.achievement.icon}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold text-foreground">
                                {playerAchievement.achievement.name}
                              </h3>
                              <p className="text-sm text-muted-foreground mt-1">
                                {playerAchievement.achievement.description}
                              </p>
                            </div>
                            {playerAchievement.achievement.xpReward > 0 && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-500/20 text-amber-500 border border-amber-500/30 flex-shrink-0">
                                +{playerAchievement.achievement.xpReward} XP
                              </span>
                            )}
                          </div>

                          <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/30">
                            <span className="text-xs text-muted-foreground">
                              Получено: {new Date(playerAchievement.grantedAt).toLocaleDateString("ru-RU", {
                                day: "numeric",
                                month: "long",
                                year: "numeric"
                              })}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
