import { Achievement } from "../types/achievement";

interface AchievementCardProps {
  achievement: Achievement;
  onClick?: () => void;
}

export const AchievementCard: React.FC<AchievementCardProps> = ({ achievement, onClick }) => {
  return (
    <div
      className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow cursor-pointer border border-gray-200"
      onClick={onClick}
    >
      <div className="flex items-start space-x-3">
        <div className="text-3xl">{achievement.icon}</div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 truncate">{achievement.name}</h3>
          <p className="text-sm text-gray-500 mt-1">{achievement.description}</p>
          <div className="mt-2 flex items-center justify-between">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {achievement.xpReward > 0 ? `${achievement.xpReward} XP` : 'No XP'}
            </span>
            <span className="text-xs text-gray-500">
              Given {achievement.totalGiven} times
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};