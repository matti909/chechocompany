'use client';

import { useState, useEffect } from 'react';

interface CircularChartProps {
  value: number;
  maxValue?: number;
  size?: number;
  strokeWidth?: number;
  color?: 'pink' | 'emerald' | 'blue' | 'purple' | 'orange';
  label?: string;
  unit?: string;
  showValue?: boolean;
  animated?: boolean;
}

const colorClasses = {
  pink: '#ec4899',
  emerald: '#10b981',
  blue: '#3b82f6',
  purple: '#8b5cf6',
  orange: '#f59e0b'
};

export function CircularChart({
  value,
  maxValue = 100,
  size = 120,
  strokeWidth = 8,
  color = 'emerald',
  label,
  unit = '%',
  showValue = true,
  animated = true
}: CircularChartProps) {
  const [animatedValue, setAnimatedValue] = useState(0);
  const percentage = Math.min((value / maxValue) * 100, 100);

  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (animatedValue / 100) * circumference;

  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => {
        setAnimatedValue(percentage);
      }, 200);
      return () => clearTimeout(timer);
    } else {
      setAnimatedValue(percentage);
    }
  }, [percentage, animated]);

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          className="transform -rotate-90"
        >
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="rgb(31, 41, 55)"
            strokeWidth={strokeWidth}
            fill="transparent"
          />

          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={colorClasses[color]}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-out"
            style={{
              filter: `drop-shadow(0 0 6px ${colorClasses[color]}40)`
            }}
          />
        </svg>

        {/* Center content */}
        {showValue && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-white">
              {Math.round(animatedValue)}
            </span>
            <span className="text-sm text-gray-400">{unit}</span>
          </div>
        )}
      </div>

      {label && (
        <span className="mt-3 text-sm font-medium text-gray-300 text-center">
          {label}
        </span>
      )}
    </div>
  );
}