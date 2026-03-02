"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import Image from "next/image";
import { Truck, ShieldCheck, Headphones, ArrowDownRight } from "lucide-react";

const badges = [
  { icon: Truck, label: "Envío Discreto" },
  { icon: ShieldCheck, label: "Calidad Garantizada" },
  { icon: Headphones, label: "Soporte 24/7" },
];

export function Hero() {
  const brandRef = useRef<HTMLDivElement>(null);
  const separatorRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.1 });
    tl.fromTo(
      brandRef.current,
      { opacity: 0, x: -16 },
      { opacity: 1, x: 0, duration: 0.6, ease: "power3.out" },
    )
      .fromTo(
        separatorRef.current,
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, duration: 0.7, ease: "power3.inOut" },
        "-=0.2",
      )
      .fromTo(
        titleRef.current?.children ?? [],
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: "power4.out" },
        "-=0.35",
      )
      .fromTo(
        descRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        "-=0.4",
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
        "-=0.35",
      )
      .fromTo(
        stripRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
        "-=0.2",
      );
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=Space+Mono:wght@400;700&display=swap');
        .hr-display { font-family: 'Syne', sans-serif; }
        .hr-mono    { font-family: 'Space Mono', monospace; }
        .hr-cta {
          clip-path: polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px));
          transition: opacity 0.25s ease, transform 0.25s ease;
        }
        .hr-cta:hover { opacity: 0.88; transform: scale(1.02); }
        .hr-cta:active { transform: scale(0.98); }
      `}</style>

      <section className="relative min-h-screen flex flex-col overflow-hidden bg-[#050a05]">
        {/* Background image */}
        <Image
          src="/hero-background.jpg"
          alt="Genética premium Chex Seeds"
          fill
          priority
          quality={90}
          className="object-cover object-center"
        />

        {/* Gradient: dark at bottom-left, transparent at top-right */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(5,10,5,0.97) 0%, rgba(5,10,5,0.75) 40%, rgba(5,10,5,0.35) 70%, rgba(5,10,5,0.15) 100%)",
          }}
        />
        {/* Extra left darkening for text legibility */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(5,10,5,0.65) 0%, rgba(5,10,5,0.1) 60%, transparent 100%)",
          }}
        />

        {/* Content — bottom anchored */}
        <div className="relative z-10 flex-1 flex flex-col justify-end max-w-7xl mx-auto w-full px-6 pb-0">
          <div className="max-w-3xl pb-12 lg:pb-16">
            {/* Brand identifier */}
            <div ref={brandRef} className="flex items-center gap-3 mb-5">
              <span className="hr-display font-black text-[15px] text-white tracking-[0.08em]">
                chex seeds
              </span>
              <span className="hr-mono text-[11px] text-white/25">·</span>
              <span className="hr-mono text-[10px] text-[#39FF14]/70 tracking-[0.3em] uppercase">
                ARG
              </span>
            </div>

            {/* Separator */}
            <div
              ref={separatorRef}
              className="w-full h-px mb-10"
              style={{
                background:
                  "linear-gradient(to right, rgba(57,255,20,0.45) 0%, rgba(255,255,255,0.1) 45%, transparent 100%)",
              }}
            />

            {/* Title */}
            <h1
              ref={titleRef}
              className="hr-display font-black leading-[0.88] tracking-tight text-white mb-8"
              style={{ fontSize: "clamp(48px, 7.5vw, 96px)" }}
            >
              <span className="block">Genética</span>
              <span className="block" style={{ color: "#39FF14" }}>
                Medicinal.
              </span>
            </h1>

            {/* Description + CTA side by side on desktop */}
            <div className="flex flex-col sm:flex-row sm:items-end gap-8">
              <div ref={descRef} className="flex-1">
                <p className="hr-mono text-[#7a9a7a] text-sm leading-relaxed max-w-sm">
                  Semillas regulares argentinas con 90% de probabilidad de
                  feminización. Las más fuertes y rápidas del mercado.
                </p>
              </div>

              <div ref={ctaRef} className="flex-shrink-0">
                <Link href="/genetics">
                  <button
                    className="hr-display hr-cta font-bold text-black text-xs tracking-[0.25em] uppercase px-8 py-4 whitespace-nowrap"
                    style={{ background: "#39FF14" }}
                  >
                    Explorar Genéticas
                  </button>
                </Link>
              </div>
            </div>

            {/* Scroll hint */}
            <div className="mt-10 flex items-center gap-2 text-white/20">
              <ArrowDownRight className="w-3.5 h-3.5" />
              <span className="hr-mono text-[9px] tracking-[0.3em] uppercase">
                Scroll
              </span>
            </div>
          </div>
        </div>

        {/* Bottom strip — badges */}
        <div
          ref={stripRef}
          className="relative z-10 border-t w-full"
          style={{
            background: "rgba(5,10,5,0.92)",
            borderColor: "rgba(255,255,255,0.08)",
          }}
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col sm:flex-row items-center sm:divide-x divide-white/[0.08]">
              {badges.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2.5 py-4 sm:px-8 first:pl-0 last:pr-0"
                >
                  <Icon
                    className="w-3.5 h-3.5 flex-shrink-0"
                    style={{ color: "#39FF14" }}
                  />
                  <span className="hr-mono text-[11px] text-[#7a9a7a] tracking-wide">
                    {label}
                  </span>
                </div>
              ))}
              <div className="hidden sm:flex items-center gap-2.5 py-4 sm:px-8">
                <span className="hr-mono text-[10px] text-[#3a5a3a] tracking-[0.25em] uppercase">
                  Premium Quality · ARG
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
