"use client";

import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";

interface GeneticsProps {
  genetics: Array<{
    id: string;
    title: string;
    slug: string;
    genetics: string;
    composition: string;
    thc: string;
    image: string;
    color: string;
    prices: {
      pack6: number;
      pack12: number;
      pack25: number;
      pack50: number;
      pack100: number;
    };
  }>;
}

const colorTints: Record<string, string> = {
  pink:    "rgba(236,72,153,0.25)",
  emerald: "rgba(16,185,129,0.22)",
  blue:    "rgba(251,146,60,0.22)",
  orange:  "rgba(251,146,60,0.25)",
  purple:  "rgba(168,85,247,0.22)",
  cyan:    "rgba(6,182,212,0.22)",
};

const colorAccents: Record<string, string> = {
  pink:    "#f472b6",
  emerald: "#34d399",
  blue:    "#fb923c",
  orange:  "#fb923c",
  purple:  "#c084fc",
  cyan:    "#22d3ee",
};

export function GeneticsSection({ genetics }: GeneticsProps) {
  const sectionRef  = useRef<HTMLElement>(null);
  const headerRef   = useRef<HTMLDivElement>(null);
  const cardsRef    = useRef<HTMLDivElement>(null);
  const ctaRef      = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        const tl = gsap.timeline();
        tl
          .fromTo(headerRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.9, ease: "power4.out" }
          )
          .fromTo(Array.from(cardsRef.current?.children ?? []),
            { opacity: 0, y: 50, scale: 0.97 },
            { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.12, ease: "power3.out" },
            "-=0.4"
          )
          .fromTo(ctaRef.current,
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
            "-=0.3"
          );
      },
      { threshold: 0.08 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const displayGenetics = genetics.slice(0, 3);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Space+Mono:wght@400;700&display=swap');
        .gs-display { font-family: 'Syne', sans-serif; }
        .gs-mono    { font-family: 'Space Mono', monospace; }

        .gs-card {
          transition: transform 0.45s cubic-bezier(0.22,1,0.36,1),
                      box-shadow 0.45s cubic-bezier(0.22,1,0.36,1);
        }
        .gs-card:hover {
          transform: translateY(-10px) scale(1.015);
          box-shadow: 0 32px 64px rgba(0,0,0,0.6);
        }
        .gs-card:hover .gs-tint {
          opacity: 1 !important;
        }
        .gs-card:hover .gs-arrow {
          transform: translate(2px, -2px);
        }
        .gs-arrow {
          transition: transform 0.3s ease;
        }
        .gs-thc {
          clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%);
        }
        .gs-cta-btn {
          clip-path: polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px));
          transition: opacity 0.25s ease, transform 0.25s ease;
        }
        .gs-cta-btn:hover { opacity: 0.9; transform: scale(1.02); }
        .gs-cta-btn:active { transform: scale(0.98); }
      `}</style>

      <section
        ref={sectionRef}
        id="genetics"
        className="relative bg-[#050a05] overflow-hidden"
      >
        {/* Top border from previous section */}
        <div className="border-t border-white/[0.08]" />

        <div className="max-w-7xl mx-auto px-6">

          {/* ── Header ── */}
          <div ref={headerRef} className="py-16 lg:py-20 border-b border-white/[0.08]">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">

              <div>
                <span className="gs-mono text-[10px] text-[#39FF14]/50 tracking-[0.35em] uppercase block mb-5">
                  — Colección Premium 2025
                </span>
                <h2
                  className="gs-display font-black leading-[0.88] tracking-tight text-white"
                  style={{ fontSize: "clamp(36px, 5.5vw, 68px)" }}
                >
                  Genéticas
                  <br />
                  <span style={{ color: "#39FF14" }}>de Élite.</span>
                </h2>
              </div>

              <p className="text-[#7a9a7a] text-sm leading-relaxed max-w-sm lg:text-right gs-mono">
                Desarrolladas con precisión científica para cultivadores que buscan lo mejor del mercado argentino.
              </p>
            </div>
          </div>

          {/* ── Cards grid ── */}
          <div
            ref={cardsRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 py-12"
          >
            {displayGenetics.map((genetic, i) => {
              const tint   = colorTints[genetic.color]   ?? "rgba(57,255,20,0.18)";
              const accent = colorAccents[genetic.color] ?? "#39FF14";

              return (
                <Link
                  key={genetic.id}
                  href={`/genetics/${genetic.slug}`}
                  className="block group"
                  style={{ marginTop: i === 1 ? "-20px" : "0" }}
                >
                  <div className="gs-card relative overflow-hidden rounded-none" style={{ background: "#0a0f0a" }}>

                    {/* Illustration */}
                    <div className="relative" style={{ aspectRatio: "3/4" }}>
                      <Image
                        src={genetic.image}
                        alt={genetic.title}
                        fill
                        className="object-cover object-top"
                      />

                      {/* Color tint overlay */}
                      <div
                        className="gs-tint absolute inset-0 transition-opacity duration-500"
                        style={{ background: tint, opacity: 0 }}
                      />

                      {/* Bottom gradient for readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f0a] via-[#0a0f0a]/10 to-transparent" />

                      {/* THC badge */}
                      <div
                        className="gs-thc absolute top-4 right-4 bg-[#39FF14] text-black gs-mono text-[10px] font-bold px-3 py-1.5 tracking-wider"
                      >
                        THC {genetic.thc}
                      </div>

                      {/* Collector number */}
                      <div className="absolute top-4 left-4 gs-mono text-white/20 text-[10px] tracking-widest">
                        {String(i + 1).padStart(2, "0")} / 03
                      </div>
                    </div>

                    {/* Info panel */}
                    <div className="p-5 border-t" style={{ borderColor: `${accent}22` }}>
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div>
                          <h3 className="gs-display font-black text-white leading-tight text-base uppercase tracking-tight">
                            {genetic.title}
                          </h3>
                          <p className="gs-mono mt-1 text-[11px]" style={{ color: accent }}>
                            {genetic.genetics}
                          </p>
                          <p className="gs-mono text-[10px] text-[#3a5a3a] mt-0.5">
                            {genetic.composition}
                          </p>
                        </div>
                        <ArrowUpRight
                          className="gs-arrow w-4 h-4 flex-shrink-0 mt-1"
                          style={{ color: accent }}
                        />
                      </div>

                      {/* Divider */}
                      <div className="h-px w-full mb-3" style={{ background: `${accent}20` }} />

                      <div className="flex items-end justify-between">
                        <div>
                          <div className="gs-display font-black text-white text-xl leading-none">
                            ${genetic.prices.pack6.toLocaleString("es-AR")}
                          </div>
                          <div className="gs-mono text-[10px] text-[#3a5a3a] mt-1 tracking-wider">
                            Pack x6 semillas
                          </div>
                        </div>
                        <div
                          className="gs-mono text-[10px] px-3 py-1.5 font-bold tracking-widest uppercase"
                          style={{
                            color: accent,
                            border: `1px solid ${accent}40`,
                            background: `${accent}0d`,
                          }}
                        >
                          Ver más
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* ── CTA ── */}
          <div ref={ctaRef} className="border-t border-white/[0.08] py-12 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="gs-display font-bold text-white text-lg">
                ¿Querés ver toda la colección?
              </p>
              <p className="gs-mono text-[#3a5a3a] text-xs mt-1 tracking-wide">
                4 genéticas disponibles — envío discreto a todo el país
              </p>
            </div>

            <Link href="/genetics">
              <button
                className="gs-display gs-cta-btn font-bold text-black text-xs tracking-[0.25em] uppercase px-8 py-4 whitespace-nowrap"
                style={{ background: "#39FF14" }}
              >
                Ver Catálogo Completo
              </button>
            </Link>
          </div>

        </div>
      </section>
    </>
  );
}
