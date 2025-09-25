'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Shield, Zap, Target, Heart, CheckCircle, TrendingUp } from "lucide-react";

export function AboutSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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

  const features = [
    {
      icon: Shield,
      title: "Trazabilidad Real",
      description: "Cada genética cuenta con trazabilidad real, asegurando transparencia en su origen y evolución.",
      color: "emerald"
    },
    {
      icon: Target,
      title: "Adaptabilidad Total",
      description: "Semillas adaptadas para rendir en indoor (tierra e hidroponía) y exterior, resistiendo plagas.",
      color: "blue"
    },
    {
      icon: Zap,
      title: "Las Más Fuertes",
      description: "Diseñadas para entregar las más fuertes y rápidas del mercado con resultados confiables.",
      color: "purple"
    },
    {
      icon: Heart,
      title: "Respaldo Total",
      description: "Ofrecemos respaldo y experiencia de cultivo honesta para acompañar cada etapa del camino.",
      color: "pink"
    }
  ];

  const values = [
    "Seguridad y calidad garantizada",
    "Confianza y comodidad",
    "Variedades accesibles",
    "Mejor precio del mercado",
    "Stock asegurado a largo plazo",
    "Experiencia de cultivo honesta"
  ];

  return (
    <section 
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-16 right-20 w-72 h-72 bg-gradient-to-r from-emerald-500/8 to-lime-500/8 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-16 w-64 h-64 bg-gradient-to-l from-blue-500/8 to-purple-500/8 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/3 left-1/4 w-40 h-40 bg-pink-500/8 rounded-lg rotate-45 blur-2xl animate-bounce" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className={`text-center mb-20 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500/20 to-lime-500/20 backdrop-blur-sm border border-emerald-500/30 text-emerald-400 px-6 py-3 rounded-xl text-sm font-mono uppercase tracking-wider mb-8">
            <Heart className="w-5 h-5" />
            <span>Quiénes Somos</span>
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-8">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-lime-400 to-emerald-400">
              CHEX SEEDS
            </span>
            <br />
            COMPANY
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              En <strong className="text-emerald-400">ChexSeeds</strong> desarrollamos y producimos semillas fotoperiódicas feminizadas, 
              diseñadas para entregar las más fuertes y las más rápidas del mercado. Cada genética cuenta con 
              trazabilidad real, lo que asegura transparencia en su origen y evolución.
            </p>
            
            <p className="text-lg text-gray-400 leading-relaxed">
              Nuestras semillas están adaptadas para rendir en indoor (tierra e hidroponía) y en exterior, 
              resistiendo plagas y respondiendo al clima con estabilidad y potencia.
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className={`grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20 transition-all duration-1000 delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            const colorClasses = {
              emerald: "from-emerald-500/20 to-lime-500/20 border-emerald-500/30 group-hover:border-emerald-400/50",
              blue: "from-blue-500/20 to-cyan-500/20 border-blue-500/30 group-hover:border-blue-400/50",
              purple: "from-purple-500/20 to-pink-500/20 border-purple-500/30 group-hover:border-purple-400/50",
              pink: "from-pink-500/20 to-rose-500/20 border-pink-500/30 group-hover:border-pink-400/50"
            };

            const iconColors = {
              emerald: "text-emerald-400",
              blue: "text-blue-400", 
              purple: "text-purple-400",
              pink: "text-pink-400"
            };

            return (
              <div key={index} className="group relative">
                <div className={`absolute -inset-1 bg-gradient-to-r ${colorClasses[feature.color as keyof typeof colorClasses]} rounded-2xl blur-xl opacity-30 group-hover:opacity-60 transition-opacity duration-500`} />
                
                <div className={`relative bg-black/80 backdrop-blur-xl border ${colorClasses[feature.color as keyof typeof colorClasses]} rounded-2xl p-6 transition-all duration-500 h-full`}>
                  <div className="text-center">
                    <div className={`w-16 h-16 bg-gradient-to-r ${colorClasses[feature.color as keyof typeof colorClasses]} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                      <IconComponent className={`w-8 h-8 ${iconColors[feature.color as keyof typeof iconColors]}`} />
                    </div>
                    
                    <h3 className="text-lg font-bold text-white mb-3">
                      {feature.title}
                    </h3>
                    
                    <p className="text-sm text-gray-300 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Values Section */}
        <div className={`grid lg:grid-cols-2 gap-16 mb-20 transition-all duration-1000 delay-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div>
            <h3 className="text-3xl font-black text-white mb-6">
              Nuestros <span className="text-emerald-400">Valores</span>
            </h3>
            <p className="text-lg text-gray-300 leading-relaxed mb-8">
              Con seguridad, calidad, confianza y comodidad, ofrecemos variedades accesibles, 
              con el mejor precio del mercado y un stock asegurado a largo plazo, para que cada 
              cultivador pueda crecer con resultados confiables y duraderos.
            </p>
            
            <div className="space-y-4">
              {values.map((value, index) => (
                <div key={index} className="flex items-center gap-3 group">
                  <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-gray-300 group-hover:text-white transition-colors duration-300">{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 via-lime-500/20 to-emerald-500/20 rounded-3xl blur-xl opacity-60" />
            
            <div className="relative bg-black/80 backdrop-blur-xl border border-emerald-500/30 rounded-3xl p-8">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-emerald-500/20 to-lime-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/30">
                  <TrendingUp className="w-10 h-10 text-emerald-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Más que Semillas
                </h3>
              </div>
              
              <p className="text-gray-300 text-center leading-relaxed mb-6">
                En ChexSeeds no solo entregamos semillas: ofrecemos respaldo y experiencia 
                de cultivo honesta para acompañar cada etapa del camino cannábico.
              </p>
              
              <div className="flex justify-center">
                <Button className="bg-gradient-to-r from-emerald-500 to-lime-500 hover:from-emerald-600 hover:to-lime-600 text-black font-bold px-6 py-3 transition-all duration-300 hover:scale-105">
                  <Heart className="w-4 h-4 mr-2" />
                  Conoce Nuestro Proceso
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
