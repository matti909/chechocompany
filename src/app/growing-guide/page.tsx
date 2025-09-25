'use client';

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  ArrowLeft,
  Droplets,
  ThermometerSun,
  Timer,
  Sprout,
  AlertTriangle,
  CheckCircle,
  Eye,
  Download
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function GrowingGuidePage() {
  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    {
      id: 1,
      title: "Preparación",
      subtitle: "Papel húmedo con agua destilada",
      icon: Droplets,
      color: "blue",
      time: "Día 1",
      description: "Ponemos las semillas en una base de papel de celulosa (papel de cocina) humedecido con agua destilada a temperatura ambiente dentro de un recipiente tipo tupper."
    },
    {
      id: 2,
      title: "Cobertura",
      subtitle: "Cubrir y cerrar recipiente",
      icon: ThermometerSun,
      color: "emerald",
      time: "Inmediato",
      description: "A continuación, las cubrimos con otra capa de papel húmedo y cerramos el recipiente. El papel debe estar húmedo, pero no encharcado."
    },
    {
      id: 3,
      title: "Incubación",
      subtitle: "Lugar oscuro y temperatura constante",
      icon: Timer,
      color: "purple",
      time: "1-7 días",
      description: "Colocamos el recipiente en un lugar oscuro con una temperatura constante. Es importante que las semillas no estén sometidas a cambios de temperatura."
    },
    {
      id: 4,
      title: "Monitoreo",
      subtitle: "Verificación diaria",
      icon: Eye,
      color: "orange",
      time: "Diario",
      description: "Abrimos el recipiente un par de minutos al día para airear y comprobar si han germinado. Si se ha secado el papel lo humedecemos un poco más."
    },
    {
      id: 5,
      title: "Trasplante",
      subtitle: "Mover al sustrato",
      icon: Sprout,
      color: "lime",
      time: "Al germinar",
      description: "Tan pronto hayan germinado las pasamos al sustrato (pueden tardar de uno a siete días)."
    }
  ];

  const colorClasses = {
    blue: {
      bg: "from-blue-500/20 to-cyan-500/20",
      border: "border-blue-500/30",
      text: "text-blue-400",
      accent: "bg-blue-500/20"
    },
    emerald: {
      bg: "from-emerald-500/20 to-lime-500/20",
      border: "border-emerald-500/30",
      text: "text-emerald-400",
      accent: "bg-emerald-500/20"
    },
    purple: {
      bg: "from-purple-500/20 to-pink-500/20",
      border: "border-purple-500/30",
      text: "text-purple-400",
      accent: "bg-purple-500/20"
    },
    orange: {
      bg: "from-orange-500/20 to-amber-500/20",
      border: "border-orange-500/30",
      text: "text-orange-400",
      accent: "bg-orange-500/20"
    },
    lime: {
      bg: "from-lime-500/20 to-green-500/20",
      border: "border-lime-500/30",
      text: "text-lime-400",
      accent: "bg-lime-500/20"
    }
  };

  const activeStepData = steps.find(step => step.id === activeStep) || steps[0];
  const colors = colorClasses[activeStepData.color as keyof typeof colorClasses];

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-r from-emerald-500/10 to-lime-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-32 right-16 w-60 h-60 bg-gradient-to-l from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          {/* Back Button */}
          <Link href="/#growing-guide" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8">
            <ArrowLeft className="w-5 h-5" />
            Volver a Inicio
          </Link>

          {/* Title Section */}
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-black text-white mb-4">
              MÉTODO DE
            </h1>
            <h2 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-lime-400 to-emerald-400 mb-6">
              GERMINACIÓN
            </h2>
            <p className="text-2xl text-emerald-400 font-light mb-6">
              RECOMENDADO
            </p>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Sigue este método paso a paso para lograr una germinación exitosa de tus semillas ChexSeeds.
              Un proceso probado que garantiza los mejores resultados.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 pb-20">

        {/* Steps Navigation */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">Selecciona un paso:</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {steps.map((step) => {
              const StepIcon = step.icon;
              const stepColors = colorClasses[step.color as keyof typeof colorClasses];
              const isActive = activeStep === step.id;

              return (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(step.id)}
                  className={`relative group p-4 rounded-2xl border transition-all duration-300 ${
                    isActive
                      ? `bg-gradient-to-r ${stepColors.bg} ${stepColors.border} scale-105`
                      : 'bg-black/40 border-gray-700 hover:border-gray-500'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl ${isActive ? stepColors.accent : 'bg-gray-800'}`}>
                      <StepIcon className={`w-5 h-5 ${
                        isActive ? stepColors.text : 'text-gray-400'
                      }`} />
                    </div>
                    <div className="text-left">
                      <div className={`text-sm font-bold ${
                        isActive ? 'text-white' : 'text-gray-400'
                      }`}>
                        Paso {step.id}
                      </div>
                      <div className={`text-xs ${
                        isActive ? stepColors.text : 'text-gray-500'
                      }`}>
                        {step.title}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Step Details */}
        <Card className={`bg-black/80 backdrop-blur-xl border ${colors.border} p-8 mb-12`}>
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Step Info */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-16 h-16 bg-gradient-to-r ${colors.bg} rounded-2xl flex items-center justify-center border ${colors.border}`}>
                  <activeStepData.icon className={`w-8 h-8 ${colors.text}`} />
                </div>
                <div>
                  <Badge className={`${colors.accent} ${colors.text} border-0 mb-2`}>
                    {activeStepData.time}
                  </Badge>
                  <h3 className="text-3xl font-bold text-white">
                    {activeStepData.title}
                  </h3>
                  <p className={`text-lg ${colors.text}`}>
                    {activeStepData.subtitle}
                  </p>
                </div>
              </div>

              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                {activeStepData.description}
              </p>

              {/* Navigation Buttons */}
              <div className="flex gap-4">
                {activeStep > 1 && (
                  <Button
                    onClick={() => setActiveStep(activeStep - 1)}
                    variant="outline"
                    className="border-gray-600 text-gray-300 hover:bg-gray-800"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Anterior
                  </Button>
                )}
                {activeStep < steps.length && (
                  <Button
                    onClick={() => setActiveStep(activeStep + 1)}
                    className={`bg-gradient-to-r ${colors.bg} ${colors.text} border-0 hover:scale-105 transition-transform`}
                  >
                    Siguiente
                    <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                  </Button>
                )}
              </div>
            </div>

            {/* Visual Placeholder */}
            <div className="relative">
              <div className={`aspect-square bg-gradient-to-br ${colors.bg} rounded-3xl border ${colors.border} flex items-center justify-center`}>
                <div className="text-center">
                  <activeStepData.icon className={`w-24 h-24 ${colors.text} mx-auto mb-4 opacity-60`} />
                  <p className="text-white font-medium">
                    Paso {activeStepData.id}: {activeStepData.title}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Important Tips */}
        <Card className="bg-black/80 backdrop-blur-xl border border-red-500/30 p-8 mb-12">
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-8 h-8 text-red-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                ¡IMPORTANTE!
              </h3>
              <div className="space-y-3 text-gray-300">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0" />
                  <p><strong className="text-white">NO</strong> germinar directamente en el suelo.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0" />
                  <p><strong className="text-white">NO</strong> dejar las semillas sumergidas en agua.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0" />
                  <p>Cuando las semillas tengan <strong className="text-white">3 pisos de hojas</strong> podemos pasarlas al exterior.</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Summary Card */}
        <Card className="bg-black/80 backdrop-blur-xl border border-emerald-500/30 p-8 text-center">
          <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto mb-6" />
          <h3 className="text-3xl font-bold text-white mb-4">
            ¡Éxito Garantizado!
          </h3>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Siguiendo este método paso a paso, obtendrás una germinación exitosa de tus semillas ChexSeeds.
            La paciencia y el cuidado son clave para el éxito.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/#genetics">
              <Button className="bg-gradient-to-r from-emerald-500 to-lime-500 hover:from-emerald-600 hover:to-lime-600 text-black font-bold px-8 py-4 text-lg rounded-2xl hover:scale-105 transition-transform">
                Ver Nuestras Genéticas
              </Button>
            </Link>

            <a
              href="/guia_esp.pdf"
              download
              className="inline-flex items-center justify-center gap-2 bg-black/60 backdrop-blur-sm border border-gray-500/30 hover:border-gray-400/50 text-white font-medium px-8 py-4 text-lg rounded-2xl transition-all duration-300 hover:scale-105"
            >
              <Download className="w-5 h-5" />
              Descargar PDF
            </a>
          </div>
        </Card>
      </div>
    </div>
  );
}