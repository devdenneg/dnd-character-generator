export interface Achievement {
  id: string;
  key: string;
  name: string;
  description: string;
  icon: AchievementIcon;
  category: string;
  xpReward: number;
  rarity: string;
  createdAt: string;
  totalGiven: number;
}

export interface PlayerAchievement {
  id: string;
  achievementId: string;
  userId: string;
  characterId: string | null;
  grantedById: string;
  grantedAt: string;
  achievement: Achievement;
  character: {
    id: string;
    name: string;
  } | null;
}

export const ACHIEVEMENT_ICONS = [
  "🏆",
  "⭐",
  "🏅",
  "🌟",
  "🎯",
  "💎",
  "🔥",
  "⚡",
  "👑",
  "🛡️"
] as const;

export type AchievementIcon = typeof ACHIEVEMENT_ICONS[number];