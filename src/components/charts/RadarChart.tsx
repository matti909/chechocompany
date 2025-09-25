'use client';

import { useState, useEffect } from 'react';

interface RadarChartDataPoint {
  label: string;
  value: number;
  maxValue?: number;
}

interface RadarChartProps {
  data: RadarChartDataPoint[];
  size?: number;
  color?: 'pink' | 'emerald' | 'blue' | 'purple' | 'orange';
  animated?: boolean;
  showLabels?: boolean;
  strokeWidth?: number;
}

const colorClasses = {
  pink: '#ec4899',
  emerald: '#10b981',
  blue: '#3b82f6',
  purple: '#8b5cf6',
  orange: '#f59e0b'
};

export function RadarChart({
  data,
  size = 200,
  color = 'emerald',
  animated = true,
  showLabels = true,
  strokeWidth = 2
}: RadarChartProps) {
  const [animatedValues, setAnimatedValues] = useState(data.map(() => 0));

  const center = size / 2;
  const radius = size / 2 - 40; // Leave space for labels
  const angleStep = (2 * Math.PI) / data.length;

  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => {
        setAnimatedValues(data.map(d => (d.value / (d.maxValue || 100)) * radius));
      }, 200);
      return () => clearTimeout(timer);
    } else {
      setAnimatedValues(data.map(d => (d.value / (d.maxValue || 100)) * radius));
    }
  }, [data, animated, radius]);

  // Generate points for the radar chart
  const generatePoints = (values: number[]) => {
    return values.map((value, index) => {
      const angle = angleStep * index - Math.PI / 2; // Start from top
      const x = center + Math.cos(angle) * value;
      const y = center + Math.sin(angle) * value;
      return { x, y, angle, value };
    });
  };

  // Generate grid circles
  const gridCircles = [0.2, 0.4, 0.6, 0.8, 1.0].map((ratio, index) => (
    <circle
      key={index}
      cx={center}
      cy={center}
      r={radius * ratio}
      stroke="rgb(75, 85, 99)"
      strokeWidth="1"
      fill="transparent"
      opacity={0.3}
    />
  ));

  // Generate grid lines
  const gridLines = data.map((_, index) => {
    const angle = angleStep * index - Math.PI / 2;
    const x = center + Math.cos(angle) * radius;
    const y = center + Math.sin(angle) * radius;
    return (
      <line
        key={index}
        x1={center}
        y1={center}
        x2={x}
        y2={y}
        stroke="rgb(75, 85, 99)"
        strokeWidth="1"
        opacity={0.3}
      />
    );
  });

  const points = generatePoints(animatedValues);
  const pathData = points.length > 0
    ? `M ${points.map(p => `${p.x},${p.y}`).join(' L ')} Z`
    : '';

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="overflow-visible">
          {/* Grid */}
          <g opacity={0.3}>
            {gridCircles}
            {gridLines}
          </g>

          {/* Data area */}
          <path
            d={pathData}
            fill={colorClasses[color]}
            fillOpacity={0.2}
            stroke={colorClasses[color]}
            strokeWidth={strokeWidth}
            className="transition-all duration-1000 ease-out"
            style={{
              filter: `drop-shadow(0 0 8px ${colorClasses[color]}40)`
            }}
          />

          {/* Data points */}
          {points.map((point, index) => (
            <circle
              key={index}
              cx={point.x}
              cy={point.y}
              r={4}
              fill={colorClasses[color]}
              stroke="white"
              strokeWidth={2}
              className="transition-all duration-1000 ease-out"
            />
          ))}

          {/* Labels */}
          {showLabels && data.map((item, index) => {
            const angle = angleStep * index - Math.PI / 2;
            const labelDistance = radius + 25;
            const x = center + Math.cos(angle) * labelDistance;
            const y = center + Math.sin(angle) * labelDistance;

            return (
              <text
                key={index}
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-xs fill-gray-300 font-medium"
              >
                {item.label}
              </text>
            );
          })}
        </svg>
      </div>
    </div>
  );
}