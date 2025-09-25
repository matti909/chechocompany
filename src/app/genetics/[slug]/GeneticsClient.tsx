'use client';

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ArrowLeft, ShoppingBag, Award, Sparkles, Star, Leaf, FlaskConical } from "lucide-react";
import Link from "next/link";
import { GeneticsProfileChart } from "@/components/charts";

export interface GeneticsData {
  name: string;
  subtitle: string;
  description: string;
  genetics: string;
  composition: string;
  thc: string;
  cbd: string;
  floweringIndoor: string;
  difficulty: string;
  smell: string;
  flavor: string;
  harvestTime: string;
  medicalUse: string[];
  flavorProfile: string[];
  effectsData: {
    cerebral: number;
    body: number;
    euphoric: number;
    relaxing: number;
    creative: number;
  };
  flavorsData: {
    sweet: number;
    fruity: number;
    earthy: number;
    spicy: number;
    floral: number;
  };
  color: string;
  icon: React.ComponentType<{ className?: string }> | null;
  [key: string]: unknown;
  awards?: string[];
  features?: string[];
}

interface GeneticsClientProps {
  genetics: GeneticsData;
}

export function GeneticsClient({ genetics }: GeneticsClientProps) {
  // Use default icon based on genetics name or color
  const getDefaultIcon = () => {
    if (genetics.name === 'EPILEPSIA') return Sparkles;
    if (genetics.name === 'ESQUIZOFRENIA') return FlaskConical;
    return Award;
  };

  const IconComponent = genetics.icon || getDefaultIcon();
  const colorClasses = {
    pink: {
      gradient: "from-pink-500/20 via-purple-500/20 to-pink-500/20",
      border: "border-pink-500/30",
      accent: "text-pink-400",
      bg: "bg-pink-500/20",
      button: "from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
    },
    emerald: {
      gradient: "from-emerald-500/20 via-lime-500/20 to-emerald-500/20",
      border: "border-emerald-500/30",
      accent: "text-emerald-400",
      bg: "bg-emerald-500/20",
      button: "from-emerald-500 to-lime-500 hover:from-emerald-600 hover:to-lime-600"
    },
    blue: {
      gradient: "from-blue-500/20 via-purple-500/20 to-blue-500/20",
      border: "border-blue-500/30",
      accent: "text-blue-400",
      bg: "bg-blue-500/20",
      button: "from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
    }
  };

  const colors = colorClasses[genetics.color as keyof typeof colorClasses];

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className={`absolute top-20 left-10 w-40 h-40 bg-gradient-to-r ${colors.gradient} rounded-full blur-3xl animate-pulse`} />
          <div className={`absolute bottom-32 right-16 w-60 h-60 bg-gradient-to-l ${colors.gradient} rounded-full blur-3xl animate-pulse delay-1000`} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          {/* Back Button */}
          <Link href="/#genetics" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8">
            <ArrowLeft className="w-5 h-5" />
            Volver a Genéticas
          </Link>

          {/* Title Section */}
          <div className="flex items-start gap-8 mb-12">
            <div className={`w-24 h-24 ${colors.bg} rounded-3xl flex items-center justify-center border ${colors.border}`}>
              <IconComponent className={`w-12 h-12 ${colors.accent}`} />
            </div>

            <div className="flex-1">
              <h1 className="text-5xl md:text-7xl font-black text-white mb-4">
                {genetics.name}
              </h1>
              <p className={`text-2xl ${colors.accent} font-light mb-6`}>
                {genetics.subtitle}
              </p>
              <p className="text-lg text-gray-300 max-w-3xl leading-relaxed">
                {genetics.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid lg:grid-cols-2 gap-12">

          {/* Left Column - Charts & Technical Data */}
          <div className="space-y-8">

            {/* Technical Specifications Card */}
            <Card className={`bg-black/80 backdrop-blur-xl border ${colors.border} p-8`}>
              <h2 className={`text-2xl font-bold ${colors.accent} mb-6 flex items-center gap-3`}>
                <FlaskConical className="w-6 h-6" />
                Especificaciones Técnicas
              </h2>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <span className="text-gray-400 text-sm block">Genética</span>
                    <span className="text-white font-medium">{genetics.genetics}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 text-sm block">Composición</span>
                    <span className="text-white font-medium">{genetics.composition}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 text-sm block">THC</span>
                    <Badge className={`${colors.bg} ${colors.accent} border-0`}>
                      {genetics.thc}
                    </Badge>
                  </div>
                  <div>
                    <span className="text-gray-400 text-sm block">CBD</span>
                    <span className="text-white font-medium">{genetics.cbd}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <span className="text-gray-400 text-sm block">Floración Interior</span>
                    <span className="text-white font-medium">{genetics.floweringIndoor}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 text-sm block">Dificultad</span>
                    <Badge className="bg-green-500/20 text-green-400 border-0">
                      {genetics.difficulty}
                    </Badge>
                  </div>
                  <div>
                    <span className="text-gray-400 text-sm block">Olor</span>
                    <span className="text-white font-medium">{genetics.smell}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 text-sm block">Cosecha Exterior</span>
                    <span className="text-white font-medium">{genetics.harvestTime}</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Enhanced Genetics Profile Chart */}
            <GeneticsProfileChart
              genetics={{
                name: genetics.name,
                thc: parseInt(genetics.thc.replace('%', '').split('-')[0]),
                cbd: genetics.cbd === 'Desconocido' ? 0 : parseFloat(genetics.cbd.replace('%', '')),
                flowering: parseInt(genetics.floweringIndoor.replace(/[^\d]/g, '')),
                production: 85, // Relative production score
                effects: genetics.effectsData,
                flavors: genetics.flavorsData,
                color: genetics.color as 'pink' | 'emerald' | 'blue' | 'purple' | 'orange'
              }}
              variant="compact"
            />
          </div>

          {/* Right Column - Additional Info */}
          <div className="space-y-8">

            {/* Flavor Profile */}
            <Card className={`bg-black/80 backdrop-blur-xl border ${colors.border} p-8`}>
              <h3 className={`text-xl font-bold ${colors.accent} mb-6 flex items-center gap-3`}>
                <Leaf className="w-5 h-5" />
                Perfil de Sabor & Aroma
              </h3>

              <div className="space-y-4">
                <p className="text-gray-300 leading-relaxed">
                  {genetics.flavor}
                </p>

                <div className="flex flex-wrap gap-2">
                  {genetics.flavorProfile?.map((flavor: string) => (
                    <Badge key={flavor} className={`${colors.bg} ${colors.accent} border-0 px-3 py-1`}>
                      {flavor}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>

            {/* Medical Uses */}
            <Card className={`bg-black/80 backdrop-blur-xl border ${colors.border} p-8`}>
              <h3 className={`text-xl font-bold ${colors.accent} mb-6 flex items-center gap-3`}>
                <Award className="w-5 h-5" />
                Uso Medicinal
              </h3>

              <div className="space-y-3">
                {genetics.medicalUse?.map((use: string) => (
                  <div key={use} className="flex items-center gap-3">
                    <div className={`w-2 h-2 ${colors.bg} rounded-full`} />
                    <span className="text-gray-300">{use}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Awards or Features */}
            {genetics.awards ? (
              <Card className={`bg-black/80 backdrop-blur-xl border ${colors.border} p-8`}>
                <h3 className={`text-xl font-bold ${colors.accent} mb-6 flex items-center gap-3`}>
                  <Star className="w-5 h-5" />
                  Premios y Reconocimientos
                </h3>

                <div className="space-y-3">
                  {genetics.awards?.map((award: string) => (
                    <div key={award} className="flex items-center gap-3">
                      <Star className="w-4 h-4 text-yellow-400" />
                      <span className="text-gray-300">{award}</span>
                    </div>
                  ))}
                </div>
              </Card>
            ) : (
              <Card className={`bg-black/80 backdrop-blur-xl border ${colors.border} p-8`}>
                <h3 className={`text-xl font-bold ${colors.accent} mb-6 flex items-center gap-3`}>
                  <Sparkles className="w-5 h-5" />
                  Características Especiales
                </h3>

                <div className="space-y-3">
                  {genetics.features?.map((feature: string) => (
                    <div key={feature} className="flex items-center gap-3">
                      <div className={`w-2 h-2 ${colors.bg} rounded-full`} />
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* CTA Button */}
            <Card className={`bg-gradient-to-r ${colors.gradient} border ${colors.border} p-8 text-center`}>
              <h3 className="text-2xl font-bold text-white mb-4">
                ¿Interesado en esta genética?
              </h3>
              <p className="text-gray-200 mb-6">
                Contactanos para más información sobre disponibilidad y precios
              </p>
              <Button className={`bg-gradient-to-r ${colors.button} text-white font-bold px-8 py-3 hover:scale-105 transition-all duration-300`}>
                <ShoppingBag className="w-5 h-5 mr-2" />
                Consultar Disponibilidad
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}