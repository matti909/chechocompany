'use client';

import Link from "next/link";
import { Droplets, ThermometerSun, Timer, Sprout, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const steps = [
  {
    icon: Droplets,
    title: "PAPEL HÚMEDO",
    description: "Colocar las semillas en papel húmedo con agua destilada.",
    time: "Día 1",
  },
  {
    icon: ThermometerSun,
    title: "LUGAR OSCURO",
    description: "Mantener en temperatura constante.",
    time: "1-7 días",
  },
  {
    icon: Timer,
    title: "MONITOREO",
    description: "Verificar humedad y germinación diariamente.",
    time: "Diario",
  },
  {
    icon: Sprout,
    title: "TRASPLANTE",
    description: "Mover al sustrato cuando aparezca la raíz.",
    time: "Al germinar",
  },
];

export function GrowingGuideSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="growing-guide"
      ref={sectionRef}
      className="relative py-28 overflow-hidden bg-[#060d06]"
    >
      {/* Patrón topográfico */}
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cpath d='M0 100 Q50 60 100 100 Q150 140 200 100' stroke='%2339FF14' stroke-width='1' fill='none'/%3E%3Cpath d='M0 120 Q50 80 100 120 Q150 160 200 120' stroke='%2339FF14' stroke-width='1' fill='none'/%3E%3Cpath d='M0 80 Q50 40 100 80 Q150 120 200 80' stroke='%2339FF14' stroke-width='1' fill='none'/%3E%3Cpath d='M0 140 Q50 100 100 140 Q150 180 200 140' stroke='%2339FF14' stroke-width='1' fill='none'/%3E%3Cpath d='M0 60 Q50 20 100 60 Q150 100 200 60' stroke='%2339FF14' stroke-width='1' fill='none'/%3E%3Cpath d='M0 160 Q50 120 100 160 Q150 200 200 160' stroke='%2339FF14' stroke-width='1' fill='none'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="inline-flex items-center gap-2 border border-[#39FF14]/40 text-[#39FF14] px-5 py-2 rounded-full text-sm font-medium mb-8">
            GUÍA DE GERMINACIÓN
            <span className="text-xs bg-[#39FF14]/20 px-1.5 py-0.5 rounded-full">+</span>
          </div>

          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight mb-6">
            <span className="text-[#39FF14]">MÉTODO</span>
            <br />
            <span className="text-white">RECOMENDADO</span>
          </h2>

          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Sigue nuestro método probado de germinación paso a paso para obtener
            los mejores resultados con tus semillas ChexSeeds.
          </p>
        </div>

        {/* Cards */}
        <div
          className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12 transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={i}
                className="relative bg-[#0e1f0e]/80 border border-[#39FF14]/20 rounded-2xl p-6 hover:border-[#39FF14]/50 transition-all duration-300 group"
              >
                {/* Número */}
                <div className="flex items-center justify-between mb-5">
                  <span className="text-xs text-[#39FF14]/60 font-mono uppercase tracking-widest">
                    PASO {i + 1} · {step.time}
                  </span>
                  <span className="text-3xl font-black text-[#39FF14]/10 group-hover:text-[#39FF14]/20 transition-colors">
                    {i + 1}
                  </span>
                </div>

                {/* Ícono */}
                <div className="w-12 h-12 rounded-xl bg-[#39FF14]/10 border border-[#39FF14]/20 flex items-center justify-center mb-5 group-hover:bg-[#39FF14]/20 transition-colors">
                  <Icon className="w-6 h-6 text-[#39FF14]" />
                </div>

                <h3 className="text-white font-bold text-base mb-2 tracking-wide">
                  {step.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div
          className={`text-center transition-all duration-700 delay-400 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <Link href="/guia">
            <button className="group inline-flex items-center gap-2 border border-[#39FF14] text-[#39FF14] hover:bg-[#39FF14] hover:text-black font-bold px-10 py-4 rounded-full transition-all duration-300 hover:scale-105 cursor-pointer">
              GUÍA COMPLETA
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </div>

      </div>
    </section>
  );
}
