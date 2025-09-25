'use client';

import { useState, useEffect } from 'react';

interface ProgressChartProps {
  label: string;
  value: number;
  maxValue?: number;
  unit?: string;
  color?: 'pink' | 'emerald' | 'blue' | 'purple' | 'orange';
  showPercentage?: boolean;
  animated?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const colorClasses = {
  pink: 'from-pink-500 to-purple-500',
  emerald: 'from-emerald-500 to-lime-500',
  blue: 'from-blue-500 to-cyan-500',
  purple: 'from-purple-500 to-violet-500',
  orange: 'from-orange-500 to-amber-500'
};

const sizeClasses = {
  sm: 'h-2',
  md: 'h-3',
  lg: 'h-4'
};

export function ProgressChart({
  label,
  value,
  maxValue = 100,
  unit = '%',
  color = 'emerald',
  showPercentage = true,
  animated = true,
  size = 'md'
}: ProgressChartProps) {
  const [animatedValue, setAnimatedValue] = useState(0);
  const percentage = Math.min((value / maxValue) * 100, 100);

  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => {
        setAnimatedValue(percentage);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setAnimatedValue(percentage);
    }
  }, [percentage, animated]);

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-gray-300 text-sm font-medium">{label}</span>
        {showPercentage && (
          <span className="text-white font-bold text-sm">
            {value}{unit}
          </span>
        )}
      </div>
      <div className={`bg-gray-800 rounded-full overflow-hidden ${sizeClasses[size]}`}>
        <div
          className={`bg-gradient-to-r ${colorClasses[color]} ${sizeClasses[size]} rounded-full transition-all duration-1000 ease-out`}
          style={{ width: `${animatedValue}%` }}
        />
      </div>
    </div>
  );
}