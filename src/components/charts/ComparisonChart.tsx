'use client';

import { useState, useEffect } from 'react';

interface ComparisonDataPoint {
  name: string;
  values: {
    label: string;
    value: number;
    maxValue?: number;
  }[];
  color: 'pink' | 'emerald' | 'blue' | 'purple' | 'orange';
}

interface ComparisonChartProps {
  data: ComparisonDataPoint[];
  animated?: boolean;
  showValues?: boolean;
}

const colorClasses = {
  pink: 'from-pink-500 to-purple-500',
  emerald: 'from-emerald-500 to-lime-500',
  blue: 'from-blue-500 to-cyan-500',
  purple: 'from-purple-500 to-violet-500',
  orange: 'from-orange-500 to-amber-500'
};

const colorHex = {
  pink: '#ec4899',
  emerald: '#10b981',
  blue: '#3b82f6',
  purple: '#8b5cf6',
  orange: '#f59e0b'
};

export function ComparisonChart({
  data,
  animated = true,
  showValues = true
}: ComparisonChartProps) {
  const [animatedValues, setAnimatedValues] = useState(
    data.map(strain => strain.values.map(() => 0))
  );

  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => {
        setAnimatedValues(
          data.map(strain =>
            strain.values.map(value => (value.value / (value.maxValue || 100)) * 100)
          )
        );
      }, 200);
      return () => clearTimeout(timer);
    } else {
      setAnimatedValues(
        data.map(strain =>
          strain.values.map(value => (value.value / (value.maxValue || 100)) * 100)
        )
      );
    }
  }, [data, animated]);

  if (data.length === 0) return null;

  const categories = data[0].values.map(v => v.label);

  return (
    <div className="space-y-6">
      {categories.map((category, categoryIndex) => (
        <div key={category} className="space-y-3">
          <h4 className="text-sm font-medium text-gray-300">{category}</h4>

          <div className="space-y-2">
            {data.map((strain, strainIndex) => {
              const value = strain.values[categoryIndex];
              const animatedValue = animatedValues[strainIndex]?.[categoryIndex] || 0;

              return (
                <div key={strain.name} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: colorHex[strain.color] }}
                      />
                      <span className="text-sm text-gray-400">{strain.name}</span>
                    </div>
                    {showValues && (
                      <span className="text-sm font-medium text-white">
                        {value.value}{value.maxValue === 100 ? '%' : ''}
                      </span>
                    )}
                  </div>

                  <div className="relative">
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${colorClasses[strain.color]} rounded-full transition-all duration-1000 ease-out`}
                        style={{ width: `${animatedValue}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}