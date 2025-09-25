'use client';

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  ArrowLeft,
  Sprout,
  Sun,
  Droplets,
  Scissors,
  Package,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  Lightbulb,
  TreePine
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function CultivationGuidePage() {
  const [activeStep, setActiveStep] = useState(1);

  const cultivationSteps = [
    {
      id: 1,
      title: "Seleccionar Semillas",
      subtitle: "Escoge las variedades ideales",
      icon: Sprout,
      color: "emerald",
      time: "Inicio",
      description: "La variedad es impresionante. Sativa, índica, ruderalis, innumerables híbridas... todas disponibles. Considera tus preferencias personales y circunstancias de cultivo.",
      details: [
        "¿Qué cepas has disfrutado más en el pasado?",
        "¿Cultivo en espacio limitado o jardín amplio?",
        "Variedades autoflorecientes vs fotoperiódicas",
        "Adaptación al clima local"
      ]
    },
    {
      id: 2,
      title: "Fundamentos Básicos",
      subtitle: "Requisitos esenciales del cannabis",
      icon: Sun,
      color: "orange",
      time: "Preparación",
      description: "Para desarrollarse a pleno potencial, la marihuana exige una serie de requisitos fundamentales que debes dominar.",
      details: [
        "Luz: Más de 12h diarias para vegetación",
        "Medio de cultivo: Sustrato orgánico o sistemas hidropónicos",
        "Aire: Ventilación constante y movimiento",
        "Agua: pH controlado y calidad",
        "Temperatura: 27°C ideal",
        "Fertilizantes: Nutrición balanceada",
        "Humedad: Control ambiental"
      ]
    },
    {
      id: 3,
      title: "Iluminación Interior",
      subtitle: "Sistemas de luz para indoor",
      icon: Lightbulb,
      color: "yellow",
      time: "Setup",
      description: "Con la legalización ha llegado una explosión de alternativas de luces para cultivo interior. Tu presupuesto será el factor decisivo.",
      details: [
        "CFL: Económicas para principiantes",
        "LED: Eficiencia energética superior",
        "HPS/MH: Sistemas tradicionales potentes",
        "Armarios de cultivo completos",
        "Control de temperatura por calor generado"
      ]
    },
    {
      id: 4,
      title: "Germinación",
      subtitle: "Inicio del ciclo de vida",
      icon: Droplets,
      color: "blue",
      time: "3-7 días",
      description: "Las semillas viables contienen toda la información genética necesaria. Solo necesitan agua, temperatura correcta y buena ubicación.",
      details: [
        "Método papel absorbente húmedo",
        "Plantado directo en sustrato",
        "Jiffys y cubos de lana de roca",
        "Germinación en agua",
        "Uso de semilleros controlados"
      ]
    },
    {
      id: 5,
      title: "Crecimiento Vegetativo",
      subtitle: "Desarrollo de la estructura",
      icon: TreePine,
      color: "green",
      time: "2-8 semanas",
      description: "Cuando las hojas reciben luz, la fotosíntesis arranca en serio. La fase vegetativa habrá empezado y las plantas crecerán rápidamente.",
      details: [
        "Interior: 18h luz, 6h oscuridad",
        "Exterior: Crecimiento hasta 3-4 metros",
        "Técnicas LST y ScroG",
        "Podas apicales y de volumen",
        "Control de ambiente"
      ]
    },
    {
      id: 6,
      title: "Floración",
      subtitle: "Formación de cogollos",
      icon: Package,
      color: "purple",
      time: "6-12 semanas",
      description: "La floración llenará los siguientes meses con fragancias. Las flores se formarán adoptando estructuras características de cada variedad.",
      details: [
        "Fotoperiodo 12/12 horas luz/oscuridad",
        "Diferenciación y formación de flores",
        "Desarrollo de tricomas y resina",
        "Maduración de pistilos",
        "Control de humedad crítico"
      ]
    },
    {
      id: 7,
      title: "Cosecha y Curado",
      subtitle: "Recolección y procesado",
      icon: Scissors,
      color: "red",
      time: "2-4 semanas",
      description: "Durante las últimas semanas abandona los fertilizantes y lava las raíces. Esto asegura sabor puro libre de regustos químicos.",
      details: [
        "Lavado de raíces 2 semanas antes",
        "Reconocer tricomas maduros (20-30% ámbar)",
        "Técnicas de cosecha y manicurado",
        "Secado lento en lugar fresco y oscuro",
        "Curado en frascos herméticos mínimo 6 semanas"
      ]
    }
  ];

  const colorClasses = {
    emerald: {
      bg: "from-emerald-500/20 to-lime-500/20",
      border: "border-emerald-500/30",
      text: "text-emerald-400",
      accent: "bg-emerald-500/20"
    },
    orange: {
      bg: "from-orange-500/20 to-amber-500/20",
      border: "border-orange-500/30",
      text: "text-orange-400",
      accent: "bg-orange-500/20"
    },
    yellow: {
      bg: "from-yellow-500/20 to-amber-500/20",
      border: "border-yellow-500/30",
      text: "text-yellow-400",
      accent: "bg-yellow-500/20"
    },
    blue: {
      bg: "from-blue-500/20 to-cyan-500/20",
      border: "border-blue-500/30",
      text: "text-blue-400",
      accent: "bg-blue-500/20"
    },
    green: {
      bg: "from-green-500/20 to-lime-500/20",
      border: "border-green-500/30",
      text: "text-green-400",
      accent: "bg-green-500/20"
    },
    purple: {
      bg: "from-purple-500/20 to-pink-500/20",
      border: "border-purple-500/30",
      text: "text-purple-400",
      accent: "bg-purple-500/20"
    },
    red: {
      bg: "from-red-500/20 to-rose-500/20",
      border: "border-red-500/30",
      text: "text-red-400",
      accent: "bg-red-500/20"
    }
  };

  const activeStepData = cultivationSteps.find(step => step.id === activeStep) || cultivationSteps[0];
  const colors = colorClasses[activeStepData.color as keyof typeof colorClasses];

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-r from-emerald-500/10 to-lime-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-32 right-16 w-60 h-60 bg-gradient-to-l from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          {/* Back Button */}
          <Link href="/#news" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8">
            <ArrowLeft className="w-5 h-5" />
            Volver a Noticias
          </Link>

          {/* Title Section */}
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-black text-white mb-4">
              GUÍA COMPLETA
            </h1>
            <h2 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-lime-400 to-emerald-400 mb-6">
              DE CULTIVO
            </h2>
            <p className="text-2xl text-emerald-400 font-light mb-6">
              INDOOR 2025
            </p>
            <p className="text-lg text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Como la propia jardinería, el cultivo de marihuana es una habilidad desarrollada a lo largo del tiempo.
              Es fácil aprender, pero dominarlo te llevará toda una vida de cultivador. Esta guía paso a paso
              te dará una base de conocimiento excelente para convertirte en un experto cultivador.
            </p>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <div className="bg-gray-800 rounded-full h-2 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-lime-500 transition-all duration-500 ease-out rounded-full"
            style={{ width: `${(activeStep / cultivationSteps.length) * 100}%` }}
          />
        </div>
        <div className="flex justify-between mt-4 text-sm text-gray-400">
          <span>Paso {activeStep} de {cultivationSteps.length}</span>
          <span>{Math.round((activeStep / cultivationSteps.length) * 100)}% Completado</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 pb-20">

        {/* Steps Navigation */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">Selecciona un paso:</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {cultivationSteps.map((step) => {
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
                  <div className="flex flex-col items-center gap-3">
                    <div className={`p-3 rounded-xl ${isActive ? stepColors.accent : 'bg-gray-800'}`}>
                      <StepIcon className={`w-6 h-6 ${
                        isActive ? stepColors.text : 'text-gray-400'
                      }`} />
                    </div>
                    <div className="text-center">
                      <div className={`text-sm font-bold ${
                        isActive ? 'text-white' : 'text-gray-400'
                      }`}>
                        {step.title}
                      </div>
                      <div className={`text-xs ${
                        isActive ? stepColors.text : 'text-gray-500'
                      }`}>
                        {step.time}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Step Details */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - Step Info */}
          <div>
            <Card className={`bg-black/80 backdrop-blur-xl border ${colors.border} p-8 mb-8`}>
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
                {activeStep < cultivationSteps.length && (
                  <Button
                    onClick={() => setActiveStep(activeStep + 1)}
                    className={`bg-gradient-to-r ${colors.bg} ${colors.text} border-0 hover:scale-105 transition-transform`}
                  >
                    Siguiente
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </div>
            </Card>

            {/* Quick Tips */}
            {activeStep === 1 && (
              <Card className="bg-black/80 backdrop-blur-xl border border-blue-500/30 p-6">
                <div className="flex items-start gap-3">
                  <Lightbulb className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-lg font-bold text-white mb-2">Tip Profesional</h4>
                    <p className="text-gray-300 text-sm">
                      Empieza con variedades autoflorecientes si eres principiante. Son más tolerantes
                      y no dependen del fotoperiodo para florecer.
                    </p>
                  </div>
                </div>
              </Card>
            )}
          </div>

          {/* Right Column - Details */}
          <div>
            <Card className={`bg-black/80 backdrop-blur-xl border ${colors.border} p-8`}>
              <h4 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <CheckCircle className={`w-6 h-6 ${colors.text}`} />
                Puntos Clave
              </h4>

              <div className="space-y-4">
                {activeStepData.details.map((detail, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className={`w-2 h-2 ${colors.accent} rounded-full mt-2 flex-shrink-0`} />
                    <p className="text-gray-300">{detail}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Step Specific Content */}
            {activeStep === 7 && (
              <Card className="bg-black/80 backdrop-blur-xl border border-red-500/30 p-6 mt-6">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-lg font-bold text-white mb-2">¡Importante en la Cosecha!</h4>
                    <div className="space-y-2 text-sm text-gray-300">
                      <p>• Para máximo THC: 20-30% de tricomas ámbar</p>
                      <p>• Para efecto más balanceado: 60-80% tricomas maduros</p>
                      <p>• El secado debe ser lento: mínimo 2 semanas</p>
                      <p>• El curado mejora por meses, mínimo 6 semanas</p>
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>

        {/* Completion Section */}
        {activeStep === cultivationSteps.length && (
          <Card className="bg-black/80 backdrop-blur-xl border border-emerald-500/30 p-8 text-center mt-12">
            <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto mb-6" />
            <h3 className="text-3xl font-bold text-white mb-4">
              ¡Guía Completada!
            </h3>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Has revisado todos los pasos fundamentales para el cultivo de cannabis.
              Recuerda que la práctica hace al maestro. ¡Empieza tu primer cultivo con confianza!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/#genetics">
                <Button className="bg-gradient-to-r from-emerald-500 to-lime-500 hover:from-emerald-600 hover:to-lime-600 text-black font-bold px-8 py-4 text-lg rounded-2xl hover:scale-105 transition-transform">
                  Ver Nuestras Genéticas
                </Button>
              </Link>

              <Link href="/growing-guide">
                <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 px-8 py-4 text-lg rounded-2xl">
                  Guía de Germinación
                </Button>
              </Link>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}