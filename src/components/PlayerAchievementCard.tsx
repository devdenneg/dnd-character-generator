import { PlayerAchievement } from "../types/achievement";

interface PlayerAchievementCardProps {
  playerAchievement: PlayerAchievement;
}

export const PlayerAchievementCard: React.FC<PlayerAchievementCardProps> = ({ playerAchievement }) => {
  const achievement = playerAchievement.achievement;

  return (
    <div className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-2xl p-6 hover:border-amber-500/50 transition-all">
      <div className="flex items-start gap-4">
        <div className="flex items-center justify-center text-4xl">{achievement.icon}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-foreground">{achievement.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">{achievement.description}</p>
            </div>
            {achievement.xpReward > 0 && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-500/20 text-amber-500 border border-amber-500/30 flex-shrink-0">
                +{achievement.xpReward} XP
              </span>
            )}
          </div>

          <div className="mt-3 space-y-2 pt-3 border-t border-border/30">
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Персонаж:</span>
              <span className="text-xs font-medium text-foreground">
                {playerAchievement.character ? playerAchievement.character.name : 'Не указан'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                {new Date(playerAchievement.grantedAt).toLocaleDateString("ru-RU", {
                  day: "numeric",
                  month: "short",
                  year: "numeric"
                })}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
