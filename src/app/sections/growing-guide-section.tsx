'use client';

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BookOpen, Droplets, ThermometerSun, Timer, Sprout, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function GrowingGuideSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const germinationSteps = [
    {
      icon: Droplets,
      title: "PAPEL HÚMEDO",
      description: "Colocar semillas en papel húmedo con agua destilada",
      time: "Día 1",
      color: "blue"
    },
    {
      icon: ThermometerSun,
      title: "LUGAR OSCURO",
      description: "Recipiente cerrado en temperatura constante",
      time: "1-7 días",
      color: "emerald"
    },
    {
      icon: Timer,
      title: "MONITOREO",
      description: "Verificar humedad y germinación diariamente",
      time: "Diario",
      color: "purple"
    },
    {
      icon: Sprout,
      title: "TRASPLANTE",
      description: "Mover al sustrato cuando aparezca la raíz",
      time: "Al germinar",
      color: "lime"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setActiveStep((prev) => (prev + 1) % germinationSteps.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isVisible, germinationSteps.length]);

  return (
    <section
      id="growing-guide"
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
    >

      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-32 right-20 w-56 h-56 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-16 w-48 h-48 bg-gradient-to-l from-emerald-500/10 to-lime-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-yellow-500/10 rounded-lg rotate-45 blur-2xl animate-bounce" />
      </div>

      {/* Code-like background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500/20 to-lime-500/20 backdrop-blur-sm border border-emerald-500/30 text-emerald-400 px-6 py-3 rounded-xl text-sm font-mono uppercase tracking-wider mb-8">
              <BookOpen className="w-5 h-5" />
              <span>Guía de Germinación</span>
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">
              MÉTODO
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-lime-400 to-emerald-400">
                RECOMENDADO
              </span>
            </h2>

            <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
              Sigue nuestro método probado de germinación paso a paso para obtener
              los mejores resultados con tus semillas ChexSeeds.
            </p>
          </div>
        </div>

        {/* Steps Grid */}
        <div className={`grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16 transition-all duration-1000 delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {germinationSteps.map((step, index) => {
            const IconComponent = step.icon;
            const isActive = index === activeStep;
            const colorClasses = {
              blue: "from-blue-500/20 to-cyan-500/20 border-blue-500/30 text-blue-400",
              emerald: "from-emerald-500/20 to-lime-500/20 border-emerald-500/30 text-emerald-400",
              purple: "from-purple-500/20 to-pink-500/20 border-purple-500/30 text-purple-400",
              lime: "from-lime-500/20 to-green-500/20 border-lime-500/30 text-lime-400"
            };

            return (
              <div key={index} className="group relative">
                <div className={`absolute -inset-1 bg-gradient-to-r ${colorClasses[step.color as keyof typeof colorClasses].split(' ')[0]} ${colorClasses[step.color as keyof typeof colorClasses].split(' ')[1]} rounded-3xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-500 ${isActive ? 'animate-pulse' : ''}`} />

                <div className={`relative bg-black/80 backdrop-blur-xl border ${colorClasses[step.color as keyof typeof colorClasses].split(' ')[2]} rounded-3xl p-8 group-hover:border-opacity-50 transition-all duration-500 h-full ${isActive ? 'scale-105' : ''}`}>
                  <div className={`w-16 h-16 bg-gradient-to-r ${colorClasses[step.color as keyof typeof colorClasses].split(' ')[0]} ${colorClasses[step.color as keyof typeof colorClasses].split(' ')[1]} rounded-2xl flex items-center justify-center mx-auto mb-6 border ${colorClasses[step.color as keyof typeof colorClasses].split(' ')[2]}`}>
                    <IconComponent className={`w-8 h-8 ${colorClasses[step.color as keyof typeof colorClasses].split(' ')[3]}`} />
                  </div>

                  <div className="text-center">
                    <div className={`text-xs font-mono ${colorClasses[step.color as keyof typeof colorClasses].split(' ')[3]} mb-2 opacity-80`}>
                      PASO {index + 1} • {step.time}
                    </div>
                    <h3 className="text-lg font-bold text-white mb-3">
                      {step.title}
                    </h3>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to action */}
        <div className={`text-center transition-all duration-1000 delay-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="bg-black/40 backdrop-blur-xl border border-emerald-500/30 rounded-3xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              ¿Listo para comenzar?
            </h3>
            <p className="text-gray-300 mb-8 text-lg">
              Accede a nuestra guía completa con instrucciones detalladas, tips profesionales
              y todo lo que necesitas para una germinación exitosa.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/growing-guide">
                <Button className="group bg-gradient-to-r from-emerald-500 to-lime-500 hover:from-emerald-600 hover:to-lime-600 text-black font-bold px-8 py-4 text-lg rounded-2xl shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 hover:scale-105">
                  <BookOpen className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                  Ver Guía Completa
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>

              <a
                href="/guia_esp.pdf"
                download
                className="inline-flex items-center justify-center gap-2 bg-black/60 backdrop-blur-sm border border-gray-500/30 hover:border-gray-400/50 text-white font-medium px-8 py-4 text-lg rounded-2xl transition-all duration-300 hover:scale-105"
              >
                <Timer className="w-5 h-5" />
                Descargar PDF
              </a>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}