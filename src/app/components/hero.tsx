"use client";

import { ArrowRight } from "lucide-react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import Image from "next/image";

export function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    )
      .fromTo(
        descriptionRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.5"
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.4"
      )
      .fromTo(
        imageRef.current,
        { opacity: 0, x: 60, scale: 0.95 },
        { opacity: 1, x: 0, scale: 1, duration: 1, ease: "power2.out" },
        "-=1.2"
      );
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#050505]">
      {/* Radial gradient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(57,255,20,0.08),transparent_40%)]" />

      {/* Decorative blurred orbs */}
      <div className="absolute top-1/4 left-10 w-64 h-64 bg-[#39FF14]/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#39FF14]/5 rounded-full blur-[120px]" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left column - Text */}
          <div className="flex flex-col space-y-8 max-w-2xl">
            <h1
              ref={titleRef}
              className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.1] tracking-tight"
            >
              Desbloquea el
              <br />
              Potencial de
              <br />
              tu Jardín
            </h1>

            <div ref={descriptionRef}>
              <p className="text-[#9ca3af] text-lg lg:text-xl font-light leading-relaxed max-w-lg border-l-2 border-[#4ade80] pl-6">
                Semillas Chex: Calidad superior, rendimiento garantizado y una
                tradición de excelencia en cada grano.
              </p>
            </div>

            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/genetics">
                <button className="group inline-flex items-center justify-center gap-2 bg-[#4ade80] hover:bg-[#3ce277] text-black font-bold text-lg px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-green-500/20 cursor-pointer">
                  Ver Catálogo
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <Link href="#semillas">
                <button className="inline-flex items-center justify-center bg-transparent border border-[#4ade80] text-[#4ade80] hover:bg-[#4ade80]/10 font-bold text-lg px-8 py-4 rounded-full transition-all duration-300 cursor-pointer">
                  Nuestras Semillas
                </button>
              </Link>
            </div>
          </div>

          {/* Right column - Image */}
          <div
            ref={imageRef}
            className="relative w-full flex justify-center lg:justify-end items-center"
          >
            <div className="relative w-full max-w-lg aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl hover:scale-105 transition-transform duration-500">
              <Image
                src="/hero-background.png"
                alt="Semillas premium Chex Seeds germinando"
                fill
                priority
                className="object-cover"
                quality={90}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
