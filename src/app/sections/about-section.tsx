"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import Image from "next/image";
import { Dna, FlaskConical, Leaf, ScanLine } from "lucide-react";

const features = [
  {
    num: "01",
    icon: Dna,
    title: "FEMINIZADAS",
    description: "Alta probabilidad de plantas hembras con genética estabilizada al máximo.",
  },
  {
    num: "02",
    icon: FlaskConical,
    title: "GENÉTICA DE ELITE",
    description: "Resistencia y estabilidad excepcional en cada cepa que producimos.",
  },
  {
    num: "03",
    icon: Leaf,
    title: "COSECHA RÁPIDA",
    description: "Ciclos de floración optimizados para el máximo rendimiento posible.",
  },
  {
    num: "04",
    icon: ScanLine,
    title: "TRAZABILIDAD REAL",
    description: "Transparencia total en el origen y la evolución de cada genética.",
  },
];

const stats = [
  { value: "90%",  label: "Feminización" },
  { value: "3+",   label: "Genéticas Premium" },
  { value: "2014", label: "Establecidos" },
  { value: "100%", label: "Control de Calidad" },
];

export function AboutSection() {
  const sectionRef   = useRef<HTMLElement>(null);
  const headingRef   = useRef<HTMLDivElement>(null);
  const contentRef   = useRef<HTMLDivElement>(null);
  const statsRef     = useRef<HTMLDivElement>(null);
  const featuresRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        const tl = gsap.timeline();
        tl
          .fromTo(headingRef.current,
            { opacity: 0, x: -50 },
            { opacity: 1, x: 0, duration: 1, ease: "power4.out" }
          )
          .fromTo(contentRef.current,
            { opacity: 0, y: 24 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
            "-=0.5"
          )
          .fromTo(Array.from(statsRef.current?.children ?? []),
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.45, stagger: 0.07, ease: "power2.out" },
            "-=0.4"
          )
          .fromTo(Array.from(featuresRef.current?.children ?? []),
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.45, stagger: 0.08, ease: "power2.out" },
            "-=0.2"
          );
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap');
        .ab-display { font-family: 'Syne', sans-serif; }
        .ab-mono    { font-family: 'Space Mono', monospace; }
      `}</style>

      <section
        ref={sectionRef}
        id="about"
        className="relative bg-[#050a05] overflow-hidden"
      >
        {/* Faint background watermark */}
        <div
          aria-hidden
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        >
          <span
            className="ab-display font-black text-white leading-none"
            style={{
              fontSize: "clamp(160px, 30vw, 380px)",
              opacity: 0.018,
              transform: "rotate(-6deg) translateY(8%)",
              letterSpacing: "-0.04em",
            }}
          >
            CHEX
          </span>
        </div>

        {/* ── Top label bar ── */}
        <div className="border-b border-white/[0.08]">
          <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
            <span className="ab-mono text-[10px] text-[#39FF14]/50 tracking-[0.35em] uppercase">
              Nuestra Historia
            </span>
            <span className="ab-mono text-[10px] text-white/15 tracking-[0.25em]">
              EST. 2014 — ARG
            </span>
          </div>
        </div>

        {/* ── Hero grid: heading / copy | image ── */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-[1fr_420px] border-b border-white/[0.08]">

            {/* Left column */}
            <div className="py-16 lg:py-24 lg:pr-16 flex flex-col justify-between gap-12">

              {/* Heading */}
              <div ref={headingRef}>
                <h2
                  className="ab-display font-black leading-[0.88] tracking-tight text-white"
                  style={{ fontSize: "clamp(36px, 5.5vw, 72px)" }}
                >
                  <span style={{ color: "#39FF14" }}>CHEX</span>
                  <br />
                  SEEDS
                  <br />
                  <span style={{ color: "rgba(255,255,255,0.18)" }}>CO.</span>
                </h2>
              </div>

              {/* Copy + CTA */}
              <div ref={contentRef} className="space-y-5 max-w-md">
                <p className="text-[#7a9a7a] text-base leading-relaxed">
                  Desarrollamos y producimos semillas fotoperiódicas regulares con{" "}
                  <span style={{ color: "#39FF14" }} className="font-semibold">
                    90% de probabilidad de feminización
                  </span>
                  , diseñadas para entregar las más fuertes y rápidas del mercado.
                </p>
                <p className="text-[#7a9a7a] text-base leading-relaxed">
                  Cada genética cuenta con{" "}
                  <span className="text-white font-medium">trazabilidad real</span>, garantizando transparencia en
                  el origen y evolución. Semillas{" "}
                  <span className="text-white font-medium">libres de plagas</span> con estándares de excelencia y
                  potencia.
                </p>

                <div className="pt-3">
                  <Link href="/genetics">
                    <button
                      className="ab-display font-bold text-black text-xs tracking-[0.25em] uppercase px-8 py-4 transition-all duration-300 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98]"
                      style={{
                        background: "#39FF14",
                        clipPath:
                          "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))",
                      }}
                    >
                      Comprar Ahora
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Right column — image */}
            <div className="hidden lg:block relative border-l border-white/[0.08] overflow-hidden">
              <Image
                src="/sems/indu.jpeg"
                alt="Genética premium ChexSeeds"
                fill
                className="object-cover object-center transition-transform duration-700 hover:scale-105"
                style={{ filter: "saturate(0.85)" }}
              />
              {/* bottom fade */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050a05] via-transparent to-transparent opacity-70" />

              {/* floating tag */}
              <div
                className="absolute bottom-7 right-7 bg-[#050a05]/90 backdrop-blur-md border border-[#39FF14]/25 px-4 py-3"
                style={{
                  clipPath:
                    "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%)",
                }}
              >
                <div className="ab-mono text-[#39FF14] text-[10px] tracking-[0.3em] uppercase">
                  Genética Premium
                </div>
                <div className="ab-mono text-white/30 text-[9px] mt-0.5 tracking-widest">
                  Chex Seeds Co. — ARG
                </div>
              </div>
            </div>
          </div>

          {/* ── Stats band ── */}
          <div
            ref={statsRef}
            className="grid grid-cols-2 md:grid-cols-4 border-b border-white/[0.08]"
          >
            {stats.map((s, i) => (
              <div
                key={i}
                className={[
                  "group py-8 px-6",
                  i < stats.length - 1 ? "border-r border-white/[0.08]" : "",
                ].join(" ")}
              >
                <div
                  className="ab-display font-black leading-none mb-1.5 transition-colors duration-300 group-hover:text-[#39FF14]"
                  style={{
                    fontSize: "clamp(26px, 3.5vw, 44px)",
                    color: i === 0 ? "#39FF14" : "white",
                  }}
                >
                  {s.value}
                </div>
                <div className="ab-mono text-[#3a5a3a] text-[10px] tracking-[0.25em] uppercase">
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* ── Features grid ── */}
          <div
            ref={featuresRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          >
            {features.map((f, i) => (
              <div
                key={i}
                className={[
                  "group relative py-10 px-6",
                  "border-b border-white/[0.08]",
                  i < features.length - 1 ? "lg:border-r lg:border-white/[0.08]" : "",
                  i % 2 === 0 ? "sm:border-r sm:border-white/[0.08] lg:border-r-0" : "",
                  i < 2 ? "sm:border-b" : "",
                  "hover:bg-white/[0.015] transition-colors duration-300",
                ].join(" ")}
              >
                {/* large bg number */}
                <span
                  aria-hidden
                  className="ab-display absolute top-4 right-5 font-black text-white/[0.04] leading-none select-none"
                  style={{ fontSize: "72px" }}
                >
                  {f.num}
                </span>

                <div className="relative space-y-3">
                  <div className="ab-mono text-[#39FF14]/35 text-[10px] tracking-[0.3em] mb-5">
                    — {f.num}
                  </div>
                  <f.icon
                    className="w-5 h-5 text-[#39FF14]/50 group-hover:text-[#39FF14] transition-colors duration-300"
                  />
                  <h3 className="ab-display font-bold text-white text-[13px] tracking-wider uppercase pt-1">
                    {f.title}
                  </h3>
                  <p className="text-[#3a5a3a] text-xs leading-relaxed">
                    {f.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
