'use client';

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ArrowLeft, ShoppingBag, Award, Star, Leaf, FlaskConical, Package, Clock, TrendingUp, Sparkles, ShoppingCart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
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
  image?: string;
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
      bg: "bg-gradient-to-r from-pink-500/20 to-purple-500/20",
      accent: "text-pink-400",
      button: "from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
    },
    emerald: {
      gradient: "from-emerald-500/20 via-lime-500/20 to-emerald-500/20",
      border: "border-emerald-500/30",
      bg: "bg-gradient-to-r from-emerald-500/20 to-lime-500/20",
      accent: "text-emerald-400",
      button: "from-emerald-500 to-lime-500 hover:from-emerald-600 hover:to-lime-600"
    },
    blue: {
      gradient: "from-blue-500/20 via-purple-500/20 to-blue-500/20",
      border: "border-blue-500/30",
      bg: "bg-gradient-to-r from-blue-500/20 to-purple-500/20",
      accent: "text-blue-400",
      button: "from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
    }
  };

  const colors = colorClasses[genetics.color as keyof typeof colorClasses];

  return (
    <div className="min-h-screen bg-black">
      {/* Sticky Header with Price */}
      <div className="sticky top-0 z-50 bg-black/95 backdrop-blur-xl border-b border-emerald-500/30">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/genetics" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Volver</span>
            </Link>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-sm text-gray-400">Desde</div>
                <div className={`text-2xl font-bold ${colors.accent}`}>$35.000</div>
              </div>
              <Button className={`bg-gradient-to-r ${colors.button} text-black font-bold hover:scale-105 transition-all`}>
                <ShoppingCart className="w-5 h-5 mr-2" />
                Comprar
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative py-12 overflow-hidden">
        <div className="absolute inset-0">
          <div className={`absolute top-20 left-10 w-40 h-40 bg-gradient-to-r ${colors.gradient} rounded-full blur-3xl animate-pulse`} />
          <div className={`absolute bottom-32 right-16 w-60 h-60 bg-gradient-to-l ${colors.gradient} rounded-full blur-3xl animate-pulse delay-1000`} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Product Image */}
            {genetics.image && (
              <div className="relative">
                {/* Offer Badge */}
                <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-emerald-500 to-lime-500 text-black px-4 py-2 rounded-full text-sm font-bold">
                  Oferta 75% OFF
                </div>

                <div className="relative w-full h-[500px] rounded-3xl overflow-hidden group border-2 border-emerald-500/30">
                  <Image
                    src={genetics.image}
                    alt={genetics.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    priority
                  />
                </div>
              </div>
            )}

            {/* Product Info */}
            <div className="flex flex-col justify-center">
              <h1 className="text-5xl md:text-6xl font-black text-white mb-4">
                {genetics.name}
              </h1>

              {/* Badges Row */}
              <div className="flex flex-wrap gap-2 mb-6">
                <Badge className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1">
                  AUTOFLORECIENTE
                </Badge>
                <Badge className="bg-pink-500/20 text-pink-400 border border-pink-500/30 px-3 py-1">
                  {genetics.subtitle}
                </Badge>
                <Badge className="bg-black text-white border border-white/30 px-3 py-1 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  THC Alto
                </Badge>
              </div>

              {/* Key Info Box */}
              <Card className={`bg-gradient-to-r ${colors.gradient} border-2 ${colors.border} p-6 mb-6`}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-300 mb-1">Variedad</div>
                    <div className="text-white font-bold">{genetics.composition}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-300 mb-1 flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      Floración
                    </div>
                    <div className="text-white font-bold">{genetics.floweringIndoor}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-300 mb-1">Producción</div>
                    <div className="text-emerald-400 font-bold">ALTA</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-300 mb-1">Pack</div>
                    <div className="text-white font-bold">x3 + 1 Gratis!</div>
                  </div>
                </div>
              </Card>

              {/* Description */}
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-white mb-3">
                  Pensando en una {genetics.name}?
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  {genetics.description}
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className={`bg-gradient-to-r ${colors.button} text-black font-bold px-8 py-6 text-lg hover:scale-105 transition-all flex-1`}>
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  Comprar Ahora
                </Button>
                <Button variant="outline" className="border-2 border-emerald-500 text-emerald-400 hover:bg-emerald-500/10 px-8 py-6 text-lg flex-1">
                  Agregar al Carrito
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-8">

          {/* Left Column - Technical Specs */}
          <div className="lg:col-span-2 space-y-8">

            {/* Technical Specifications */}
            <Card className={`bg-black/80 backdrop-blur-xl border ${colors.border} p-8`}>
              <h2 className={`text-2xl font-bold ${colors.accent} mb-6 flex items-center gap-3`}>
                <FlaskConical className="w-6 h-6" />
                Especificaciones Técnicas
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <div className="text-sm text-gray-400">Genética</div>
                  <div className="text-white font-medium">{genetics.genetics}</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-gray-400">Composición</div>
                  <div className="text-white font-medium">{genetics.composition}</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-gray-400">THC</div>
                  <Badge className={`${colors.bg} ${colors.accent} border-0 w-fit`}>
                    {genetics.thc}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-gray-400">CBD</div>
                  <div className="text-white font-medium">{genetics.cbd}</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-gray-400">Floración</div>
                  <div className="text-white font-medium">{genetics.floweringIndoor}</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-gray-400">Dificultad</div>
                  <Badge className="bg-green-500/20 text-green-400 border-0 w-fit">
                    {genetics.difficulty}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-gray-400">Olor</div>
                  <div className="text-white font-medium">{genetics.smell}</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-gray-400">Cosecha</div>
                  <div className="text-white font-medium">{genetics.harvestTime}</div>
                </div>
              </div>
            </Card>

            {/* Charts */}
            <GeneticsProfileChart
              genetics={{
                name: genetics.name,
                thc: parseInt(genetics.thc.replace('%', '').split('-')[0]),
                cbd: genetics.cbd === 'Desconocido' ? 0 : parseFloat(genetics.cbd.replace('%', '')),
                flowering: parseInt(genetics.floweringIndoor.replace(/[^\d]/g, '')),
                production: 85,
                effects: genetics.effectsData,
                flavors: genetics.flavorsData,
                color: genetics.color as 'pink' | 'emerald' | 'blue' | 'purple' | 'orange'
              }}
              variant="compact"
            />

            {/* Medical Uses */}
            <Card className={`bg-black/80 backdrop-blur-xl border ${colors.border} p-8`}>
              <h3 className={`text-2xl font-bold ${colors.accent} mb-6 flex items-center gap-3`}>
                <Award className="w-6 h-6" />
                Beneficios Medicinales
              </h3>

              <div className="grid sm:grid-cols-2 gap-4">
                {genetics.medicalUse?.map((use: string) => (
                  <div key={use} className="flex items-center gap-3 bg-white/5 p-3 rounded-lg">
                    <div className={`w-2 h-2 ${colors.bg} rounded-full flex-shrink-0`} />
                    <span className="text-gray-300">{use}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Flavor Profile */}
            <Card className={`bg-black/80 backdrop-blur-xl border ${colors.border} p-8`}>
              <h3 className={`text-2xl font-bold ${colors.accent} mb-6 flex items-center gap-3`}>
                <Leaf className="w-6 h-6" />
                Perfil de Sabor & Aroma
              </h3>

              <p className="text-gray-300 leading-relaxed mb-4">
                {genetics.flavor}
              </p>

              <div className="flex flex-wrap gap-2">
                {genetics.flavorProfile?.map((flavor: string) => (
                  <Badge key={flavor} className={`${colors.bg} ${colors.accent} border-0 px-4 py-2`}>
                    {flavor}
                  </Badge>
                ))}
              </div>
            </Card>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">

            {/* Price Card */}
            <Card className={`bg-gradient-to-br ${colors.gradient} border-2 ${colors.border} p-6 sticky top-24`}>
              <div className="text-center mb-6">
                <div className="text-sm text-gray-300 mb-2">Precio Especial</div>
                <div className={`text-4xl font-black ${colors.accent} mb-2`}>$35.000</div>
                <div className="text-sm text-gray-400 line-through">$140.000</div>
              </div>

              <div className="space-y-4">
                <Button className={`w-full bg-gradient-to-r ${colors.button} text-black font-bold py-4 text-lg hover:scale-105 transition-all`}>
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Comprar Ahora
                </Button>

                <Button variant="outline" className="w-full border-2 border-white/30 text-white hover:bg-white/10 py-4">
                  Agregar al Carrito
                </Button>
              </div>

              <div className="mt-6 pt-6 border-t border-white/20 space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <Package className="w-4 h-4 text-emerald-400" />
                  <span>Envío gratis en compras +$100K</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  <span>98% de germinación garantizada</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span>Genética premiada</span>
                </div>
              </div>
            </Card>

            {/* Awards */}
            {genetics.awards && (
              <Card className={`bg-black/80 backdrop-blur-xl border ${colors.border} p-6`}>
                <h3 className={`text-lg font-bold ${colors.accent} mb-4 flex items-center gap-2`}>
                  <Star className="w-5 h-5" />
                  Premios
                </h3>

                <div className="space-y-2">
                  {genetics.awards?.map((award: string) => (
                    <div key={award} className="flex items-start gap-2 text-sm">
                      <Star className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">{award}</span>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Features */}
            {genetics.features && (
              <Card className={`bg-black/80 backdrop-blur-xl border ${colors.border} p-6`}>
                <h3 className={`text-lg font-bold ${colors.accent} mb-4 flex items-center gap-2`}>
                  <Sparkles className="w-5 h-5" />
                  Características
                </h3>

                <div className="space-y-2">
                  {genetics.features?.map((feature: string) => (
                    <div key={feature} className="flex items-start gap-2 text-sm">
                      <div className={`w-1.5 h-1.5 ${colors.bg} rounded-full flex-shrink-0 mt-1.5`} />
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
