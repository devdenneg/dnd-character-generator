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