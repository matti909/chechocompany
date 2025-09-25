'use client';

import { CircularChart } from './CircularChart';
import { ProgressChart } from './ProgressChart';
import { RadarChart } from './RadarChart';
import { Card } from '@/components/ui/card';

interface GeneticsData {
  name: string;
  thc: number;
  cbd: number;
  flowering: number; // in days
  production: number; // relative scale
  effects: {
    cerebral: number;
    body: number;
    euphoric: number;
    relaxing: number;
    creative: number;
  };
  flavors: {
    sweet: number;
    fruity: number;
    earthy: number;
    spicy: number;
    floral: number;
  };
  color?: 'pink' | 'emerald' | 'blue' | 'purple' | 'orange';
}

interface GeneticsProfileChartProps {
  genetics: GeneticsData;
  showComparison?: boolean;
  variant?: 'full' | 'compact' | 'minimal';
}

export function GeneticsProfileChart({
  genetics,
  variant = 'full'
}: GeneticsProfileChartProps) {
  const effectsData = Object.entries(genetics.effects).map(([key, value]) => ({
    label: key.charAt(0).toUpperCase() + key.slice(1),
    value,
    maxValue: 100
  }));

  const flavorsData = Object.entries(genetics.flavors).map(([key, value]) => ({
    label: key.charAt(0).toUpperCase() + key.slice(1),
    value,
    maxValue: 100
  }));

  if (variant === 'minimal') {
    return (
      <div className="grid grid-cols-2 gap-4">
        <CircularChart
          value={genetics.thc}
          label="THC"
          unit="%"
          color={genetics.color || 'emerald'}
          size={100}
        />
        <CircularChart
          value={genetics.cbd}
          label="CBD"
          unit="%"
          color="blue"
          size={100}
        />
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className="space-y-6">
        {/* Cannabinoids */}
        <div className="grid grid-cols-2 gap-6">
          <CircularChart
            value={genetics.thc}
            label="THC Level"
            unit="%"
            color={genetics.color || 'emerald'}
            size={120}
          />
          <CircularChart
            value={genetics.cbd}
            label="CBD Level"
            unit="%"
            color="blue"
            size={120}
          />
        </div>

        {/* Key metrics */}
        <div className="space-y-3">
          <ProgressChart
            label="Flowering Time (Days)"
            value={genetics.flowering}
            maxValue={100}
            unit=" días"
            color={genetics.color || 'emerald'}
            showPercentage={true}
          />
          <ProgressChart
            label="Production Level"
            value={genetics.production}
            maxValue={100}
            unit="%"
            color="orange"
          />
        </div>
      </div>
    );
  }

  // Full variant
  return (
    <div className="grid lg:grid-cols-2 gap-8">

      {/* Left Column - Cannabinoids & Metrics */}
      <div className="space-y-8">

        {/* Cannabinoid Levels */}
        <Card className="bg-black/40 backdrop-blur-xl border-gray-800 p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Niveles de Cannabinoides</h3>
          <div className="grid grid-cols-2 gap-6">
            <CircularChart
              value={genetics.thc}
              label="THC"
              unit="%"
              color={genetics.color || 'emerald'}
              size={120}
            />
            <CircularChart
              value={genetics.cbd}
              label="CBD"
              unit="%"
              color="blue"
              size={120}
            />
          </div>
        </Card>

        {/* Production Metrics */}
        <Card className="bg-black/40 backdrop-blur-xl border-gray-800 p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Métricas de Cultivo</h3>
          <div className="space-y-4">
            <ProgressChart
              label="Tiempo de Floración"
              value={genetics.flowering}
              maxValue={100}
              unit=" días"
              color={genetics.color || 'emerald'}
            />
            <ProgressChart
              label="Nivel de Producción"
              value={genetics.production}
              maxValue={100}
              unit="%"
              color="orange"
            />
            <ProgressChart
              label="Facilidad de Cultivo"
              value={85} // Assuming easy cultivation
              maxValue={100}
              unit="%"
              color="blue"
            />
          </div>
        </Card>
      </div>

      {/* Right Column - Effects & Flavors */}
      <div className="space-y-8">

        {/* Effects Profile */}
        <Card className="bg-black/40 backdrop-blur-xl border-gray-800 p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Perfil de Efectos</h3>
          <div className="flex justify-center">
            <RadarChart
              data={effectsData}
              size={240}
              color={genetics.color || 'emerald'}
              showLabels={true}
            />
          </div>
        </Card>

        {/* Flavor Profile */}
        <Card className="bg-black/40 backdrop-blur-xl border-gray-800 p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Perfil de Sabores</h3>
          <div className="flex justify-center">
            <RadarChart
              data={flavorsData}
              size={240}
              color="purple"
              showLabels={true}
            />
          </div>
        </Card>
      </div>
    </div>
  );
}