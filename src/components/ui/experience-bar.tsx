import React from 'react';
import { cn } from '@/lib/utils';

interface ExperienceBarProps {
  currentExperience: number;
  level: number;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  showPercentage?: boolean;
}

export function ExperienceBar({
  currentExperience,
  level,
  className,
  size = 'md',
  showLabel = true,
  showPercentage = true
}: ExperienceBarProps) {
  const levelService = (await import('@/services/levelService')).LevelService;
  const progress = levelService.calculateLevelUpProgress(currentExperience, level);
  const nextLevelExp = levelService.getExperienceForNextLevel(level);

  const sizeClasses = {
    sm: 'h-2 text-xs',
    md: 'h-3 text-sm',
    lg: 'h-4 text-base'
  };

  const labelClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  return (
    <div className={cn('w-full', className)}>
      {showLabel && (
        <div className={cn('flex justify-between items-center mb-1', labelClasses[size])}>
          <span className="font-medium">Уровень {level}</span>
          {showPercentage && (
            <span>{Math.round(progress)}%</span>
          )}
        </div>
      )}

      <div className={cn('w-full bg-gray-200 rounded-full overflow-hidden', sizeClasses[size])}>
        <div
          className={cn(
            'h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-500 ease-out',
            'rounded-full relative overflow-hidden'
          )}
          style={{ width: `${progress}%` }}
        >
          <div className="absolute inset-0 bg-white opacity-20 animate-pulse" />
        </div>
      </div>

      {level < 20 && (
        <div className={cn('flex justify-between text-xs text-gray-600 mt-1', labelClasses[size])}>
          <span>{currentExperience.toLocaleString()} опыта</span>
          <span>{nextLevelExp.toLocaleString()} до след. уровня</span>
        </div>
      )}
    </div>
  );
}