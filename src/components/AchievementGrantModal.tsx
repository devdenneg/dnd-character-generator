import { useState } from "react";
import { Modal } from "./ui/modal";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { ACHIEVEMENTS, ACHIEVEMENT_CATEGORIES, type AchievementCategory } from "../data/achievements";
import { achievementsApi } from "../api/achievements";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface AchievementGrantModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  userName: string;
  roomId: string;
}

export function AchievementGrantModal({
  isOpen,
  onClose,
  userId,
  userName,
  roomId,
}: AchievementGrantModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<AchievementCategory | "all">("all");
  const queryClient = useQueryClient();

  const grantMutation = useMutation({
    mutationFn: (achievementId: string) =>
      achievementsApi.grant({ userId, achievementId, roomId }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["room-players-progress", roomId] });
      queryClient.invalidateQueries({ queryKey: ["user-progress", userId] });
      
      alert(
        `✅ Достижение выдано!\n\n` +
        `Игрок: ${userName}\n` +
        `Опыт: +${data.experienceGained} XP\n` +
        `${data.levelUp ? `🎉 УРОВЕНЬ ПОВЫШЕН! Новый уровень: ${data.user.level}` : `Текущий уровень: ${data.user.level}`}`
      );
      
      onClose();
    },
    onError: (error: any) => {
      alert(`❌ Ошибка: ${error.response?.data?.error || "Не удалось выдать достижение"}`);
    },
  });

  const filteredAchievements = ACHIEVEMENTS.filter((achievement) => {
    const matchesSearch =
      achievement.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      achievement.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || achievement.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleGrant = (achievementId: string) => {
    if (confirm("Выдать это достижение игроку?")) {
      grantMutation.mutate(achievementId);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Выдать достижение: ${userName}`}>
      <div className="space-y-4">
        {/* Поиск */}
        <Input
          type="text"
          placeholder="🔍 Поиск достижений..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* Фильтр по категориям */}
        <div className="flex flex-wrap gap-2">
          <Badge
            onClick={() => setSelectedCategory("all")}
            className={`cursor-pointer ${
              selectedCategory === "all" ? "bg-primary" : "bg-muted"
            }`}
          >
            Все
          </Badge>
          {Object.entries(ACHIEVEMENT_CATEGORIES).map(([key, label]) => (
            <Badge
              key={key}
              onClick={() => setSelectedCategory(key as AchievementCategory)}
              className={`cursor-pointer ${
                selectedCategory === key ? "bg-primary" : "bg-muted"
              }`}
            >
              {label}
            </Badge>
          ))}
        </div>

        {/* Список достижений */}
        <div className="max-h-96 overflow-y-auto space-y-2">
          {filteredAchievements.map((achievement) => (
            <div
              key={achievement.id}
              className="p-3 rounded-lg border border-border bg-card/50 hover:bg-card transition-colors"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl">{achievement.icon}</span>
                    <h3 className="font-semibold text-sm">{achievement.name}</h3>
                    <Badge className="text-xs bg-primary/20 text-primary">
                      +{achievement.experience} XP
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{achievement.description}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {ACHIEVEMENT_CATEGORIES[achievement.category]}
                  </p>
                </div>
                <Button
                  size="sm"
                  onClick={() => handleGrant(achievement.id)}
                  disabled={grantMutation.isPending}
                  className="shrink-0"
                >
                  Выдать
                </Button>
              </div>
            </div>
          ))}

          {filteredAchievements.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              Достижения не найдены
            </div>
          )}
        </div>

        <div className="text-xs text-muted-foreground text-center">
          Всего достижений: {filteredAchievements.length} из {ACHIEVEMENTS.length}
        </div>
      </div>
    </Modal>
  );
}
