'use client';

import Link from "next/link";
import { Droplets, ThermometerSun, Timer, Sprout } from "lucide-react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const steps = [
  {
    icon: Droplets,
    title: "PAPEL\nHÚMEDO",
    description: "Colocar las semillas entre papel húmedo con agua destilada a temperatura ambiente.",
    time: "Día 1",
    num: "01",
  },
  {
    icon: ThermometerSun,
    title: "LUGAR\nOSCURO",
    description: "Mantener en un lugar oscuro con temperatura constante entre 21-26°C.",
    time: "1–7 días",
    num: "02",
  },
  {
    icon: Timer,
    title: "MONITOREO\nDIARIO",
    description: "Verificar la humedad del papel y el estado de la germinación cada 24 horas.",
    time: "Diario",
    num: "03",
  },
  {
    icon: Sprout,
    title: "TRASPLANTE\nAL SUSTRATO",
    description: "Mover al sustrato definitivo en cuanto la radícula supere el centímetro.",
    time: "Al germinar",
    num: "04",
  },
];

export function GrowingGuideSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef  = useRef<HTMLDivElement>(null);
  const stepsRef   = useRef<HTMLDivElement>(null);
  const lineRef    = useRef<HTMLDivElement>(null);
  const ctaRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        const tl = gsap.timeline();
        tl
          .fromTo(headerRef.current,
            { opacity: 0, y: 24 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power4.out" }
          )
          .fromTo(lineRef.current,
            { scaleX: 0, transformOrigin: "left center" },
            { scaleX: 1, duration: 1, ease: "power3.inOut" },
            "-=0.3"
          )
          .fromTo(Array.from(stepsRef.current?.children ?? []),
            { opacity: 0, y: 28 },
            { opacity: 1, y: 0, duration: 0.55, stagger: 0.1, ease: "power3.out" },
            "-=0.7"
          )
          .fromTo(ctaRef.current,
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" },
            "-=0.2"
          );
      },
      { threshold: 0.08 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Space+Mono:wght@400;700&display=swap');
        .gg-display { font-family: 'Syne', sans-serif; }
        .gg-mono    { font-family: 'Space Mono', monospace; }

        .gg-step:hover .gg-icon-wrap {
          background: rgba(57,255,20,0.15);
          border-color: rgba(57,255,20,0.5);
        }
        .gg-step:hover .gg-step-num {
          color: rgba(57,255,20,0.12);
        }
        .gg-step:hover .gg-title {
          color: #39FF14;
        }

        .gg-cta-btn {
          clip-path: polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px));
          transition: opacity 0.25s ease, transform 0.25s ease;
        }
        .gg-cta-btn:hover { opacity: 0.9; transform: scale(1.02); }
        .gg-cta-btn:active { transform: scale(0.98); }

        @media (max-width: 1024px) {
          .gg-connector { display: none; }
        }
      `}</style>

      <section
        ref={sectionRef}
        id="growing-guide"
        className="relative bg-[#060d06] overflow-hidden"
      >
        {/* Topographic background pattern */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cpath d='M0 100 Q50 60 100 100 Q150 140 200 100' stroke='%2339FF14' stroke-width='0.8' fill='none' opacity='0.4'/%3E%3Cpath d='M0 120 Q50 80 100 120 Q150 160 200 120' stroke='%2339FF14' stroke-width='0.8' fill='none' opacity='0.4'/%3E%3Cpath d='M0 80 Q50 40 100 80 Q150 120 200 80' stroke='%2339FF14' stroke-width='0.8' fill='none' opacity='0.4'/%3E%3Cpath d='M0 140 Q50 100 100 140 Q150 180 200 140' stroke='%2339FF14' stroke-width='0.8' fill='none' opacity='0.4'/%3E%3Cpath d='M0 60 Q50 20 100 60 Q150 100 200 60' stroke='%2339FF14' stroke-width='0.8' fill='none' opacity='0.4'/%3E%3C/svg%3E")`,
            backgroundSize: "200px 200px",
            opacity: 0.04,
          }}
        />

        {/* Large watermark */}
        <div
          aria-hidden
          className="absolute bottom-0 right-0 pointer-events-none select-none overflow-hidden"
        >
          <span
            className="gg-display font-black text-[#39FF14] leading-none"
            style={{
              fontSize: "clamp(120px, 22vw, 300px)",
              opacity: 0.025,
              display: "block",
              transform: "translate(8%, 12%)",
              letterSpacing: "-0.04em",
            }}
          >
            GROW
          </span>
        </div>

        <div className="border-t border-white/[0.08]" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">

          {/* ── Header ── */}
          <div ref={headerRef} className="py-16 lg:py-20 border-b border-white/[0.08]">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <div>
                <span className="gg-mono text-[10px] text-[#39FF14]/50 tracking-[0.35em] uppercase block mb-5">
                  — Guía de Germinación
                </span>
                <h2
                  className="gg-display font-black leading-[0.88] tracking-tight text-white"
                  style={{ fontSize: "clamp(36px, 5.5vw, 68px)" }}
                >
                  Método
                  <br />
                  <span style={{ color: "#39FF14" }}>Recomendado.</span>
                </h2>
              </div>

              <p className="gg-mono text-[#7a9a7a] text-sm leading-relaxed max-w-sm lg:text-right">
                Nuestro protocolo probado de germinación paso a paso para obtener los mejores resultados con cada semilla.
              </p>
            </div>
          </div>

          {/* ── Steps ── */}
          <div className="py-14">

            {/* Connector line (desktop) */}
            <div className="hidden lg:block relative mb-0 px-8">
              <div className="h-px w-full bg-white/[0.06]">
                <div
                  ref={lineRef}
                  className="h-full"
                  style={{ background: "linear-gradient(90deg, #39FF14 0%, rgba(57,255,20,0.3) 100%)" }}
                />
              </div>
            </div>

            <div
              ref={stepsRef}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0"
            >
              {steps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <div
                    key={i}
                    className="gg-step group relative py-10 px-8 border-b border-white/[0.08] lg:border-b-0 lg:border-r border-white/[0.08] last:border-r-0 cursor-default transition-colors duration-300 hover:bg-[#39FF14]/[0.02]"
                  >
                    {/* Large background number */}
                    <span
                      aria-hidden
                      className="gg-step-num gg-display absolute top-6 right-6 font-black leading-none select-none transition-colors duration-300"
                      style={{ fontSize: "72px", color: "rgba(57,255,20,0.04)" }}
                    >
                      {step.num}
                    </span>

                    {/* Step index label */}
                    <div className="flex items-center gap-3 mb-6">
                      <span className="gg-mono text-[10px] text-[#39FF14]/40 tracking-[0.3em] uppercase">
                        Paso {step.num}
                      </span>
                      <span
                        className="gg-mono text-[10px] px-2 py-0.5 tracking-widest"
                        style={{
                          color: "rgba(57,255,20,0.6)",
                          border: "1px solid rgba(57,255,20,0.2)",
                          background: "rgba(57,255,20,0.05)",
                        }}
                      >
                        {step.time}
                      </span>
                    </div>

                    {/* Icon */}
                    <div
                      className="gg-icon-wrap w-11 h-11 flex items-center justify-center mb-6 transition-all duration-300"
                      style={{
                        border: "1px solid rgba(57,255,20,0.2)",
                        background: "rgba(57,255,20,0.06)",
                      }}
                    >
                      <Icon className="w-5 h-5" style={{ color: "#39FF14" }} />
                    </div>

                    {/* Title */}
                    <h3
                      className="gg-display gg-title font-black text-white leading-tight mb-3 transition-colors duration-300"
                      style={{ fontSize: "clamp(15px, 1.4vw, 18px)", whiteSpace: "pre-line" }}
                    >
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="gg-mono text-[#7a9a7a] text-xs leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── CTA ── */}
          <div ref={ctaRef} className="border-t border-white/[0.08] py-12 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="gg-display font-bold text-white text-lg">
                ¿Querés la guía completa?
              </p>
              <p className="gg-mono text-[#3a5a3a] text-xs mt-1 tracking-wide">
                Técnicas avanzadas, nutrición y control de plagas
              </p>
            </div>

            <Link href="/guia">
              <button
                className="gg-display gg-cta-btn font-bold text-black text-xs tracking-[0.25em] uppercase px-8 py-4 whitespace-nowrap"
                style={{ background: "#39FF14" }}
              >
                Guía Completa
              </button>
            </Link>
          </div>

        </div>
      </section>
    </>
  );
}
