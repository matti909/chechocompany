"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import { Sparkles, Shield, Clock, GitBranch } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && titleRef.current) {
          const tl = gsap.timeline();

          tl.fromTo(
            titleRef.current,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
          )
          .fromTo(
            descRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
            "-=0.4"
          )
          .fromTo(
            cardsRef.current?.children || [],
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              stagger: 0.1,
              ease: "power2.out"
            },
            "-=0.3"
          )
          .fromTo(
            ctaRef.current,
            { opacity: 0, scale: 0.9 },
            { opacity: 1, scale: 1, duration: 0.4, ease: "back.out" },
            "-=0.2"
          );
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: Sparkles,
      title: "DOS FEMINIZADAS",
      description: "Alta probabilidad de plantas hembras",
      color: "emerald"
    },
    {
      icon: Shield,
      title: "GENÉTICA DE ELITE",
      description: "Resistencia y estabilidad excepcional",
      color: "lime"
    },
    {
      icon: Clock,
      title: "COSECHA RÁPIDA",
      description: "Ciclos de floración optimizados",
      color: "green"
    },
    {
      icon: GitBranch,
      title: "TRAZABILIDAD REAL",
      description: "Transparencia total en origen y evolución",
      color: "teal"
    }
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-32 overflow-hidden bg-black"
      id="about"
    >
      {/* Background glow effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-lime-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-[300px_1fr_300px] gap-8 items-center">
          {/* Left Image */}
          <div className="hidden lg:block">
            <div className="relative h-[500px] rounded-3xl overflow-hidden border border-emerald-500/20">
              <Image
                src="/sems/indu.jpeg"
                alt="Cannabis plant"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Center Content */}
          <div className="text-center space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 px-4 py-2 rounded-full">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-emerald-400 text-sm font-mono uppercase tracking-wider">
                Nuestra Historia
              </span>
            </div>

            {/* Title */}
            <div ref={titleRef}>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight">
                <span className="text-emerald-400">CHEX SEEDS</span>
                <br />
                <span className="text-white">COMPANY</span>
              </h2>
            </div>

            {/* Description */}
            <p
              ref={descRef}
              className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto"
            >
              En <span className="text-emerald-400 font-semibold">ChexSeeds</span> desarrollamos y producimos semillas fotoperiódicas regulares con{" "}
              <span className="text-white font-semibold">90% de probabilidad de feminización</span>, diseñadas para entregar las más fuertes y rápidas del mercado. Cada genética cuenta con{" "}
              <span className="text-white font-semibold">trazabilidad real</span>, lo que asegura transparencia en el origen y evolución. Nuestras semillas están{" "}
              <span className="text-white font-semibold">libres de plagas</span> y{" "}
              <span className="text-white font-semibold">enfermedades</span>, aplicando estándares altos con excelencia y potencia.
            </p>

            {/* Feature Cards */}
            <div
              ref={cardsRef}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8"
            >
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group relative bg-black/60 backdrop-blur-sm border border-emerald-500/20 rounded-2xl p-6 hover:border-emerald-400/50 transition-all duration-300 hover:scale-105"
                >
                  {/* Glow effect on hover */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-lime-500/20 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300" />

                  <div className="relative space-y-3">
                    <div className="flex justify-center">
                      <div className="p-3 bg-emerald-500/10 rounded-xl">
                        <feature.icon className="w-6 h-6 text-emerald-400" />
                      </div>
                    </div>
                    <h3 className="text-white font-bold text-sm uppercase tracking-wide">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 text-xs leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div ref={ctaRef} className="pt-4">
              <Link href="/genetics">
                <Button className="bg-gradient-to-r from-emerald-500 to-lime-500 hover:from-emerald-400 hover:to-lime-400 text-black font-bold px-8 py-6 text-lg rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-emerald-500/25">
                  COMPRAR AHORA
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Image */}
          <div className="hidden lg:block">
            <div className="relative h-[500px] rounded-3xl overflow-hidden border border-emerald-500/20">
              <Image
                src="/sems/sati.jpeg"
                alt="Cannabis seeds"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
