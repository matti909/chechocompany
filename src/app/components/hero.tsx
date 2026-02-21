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
    <section className="relative min-h-screen flex items-center overflow-hidden bg-black">
      {/* Subtle green ambient glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-900/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-emerald-950/30 rounded-full blur-[100px]" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left column - Text */}
          <div className="space-y-8">
            <h1
              ref={titleRef}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight"
            >
              Desbloquea el
              <br />
              Potencial de
              <br />
              tu Jardín
            </h1>

            <div ref={descriptionRef} className="flex items-stretch gap-4">
              <div className="w-1 bg-emerald-500 rounded-full shrink-0" />
              <p className="text-gray-400 text-base sm:text-lg leading-relaxed max-w-md">
                Semillas Chex: Calidad superior, rendimiento garantizado y una
                tradición de excelencia en cada grano.
              </p>
            </div>

            <div ref={ctaRef} className="flex flex-wrap items-center gap-4 pt-2">
              <Link href="/genetics">
                <button className="group flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/25 cursor-pointer">
                  Ver Catálogo
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <Link href="#semillas">
                <button className="border border-emerald-500 text-emerald-400 hover:bg-emerald-500/10 font-semibold px-8 py-4 rounded-full transition-all duration-300 cursor-pointer">
                  Nuestras Semillas
                </button>
              </Link>
            </div>
          </div>

          {/* Right column - Image */}
          <div ref={imageRef} className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-lg aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl shadow-black/50">
              <Image
                src="/hero-background.jpg"
                alt="Semillas premium Chex Seeds"
                fill
                priority
                className="object-cover"
                quality={90}
              />
            </div>
            {/* Decorative border offset */}
            <div className="absolute -bottom-3 -right-3 w-full max-w-lg aspect-[4/3] rounded-2xl border border-emerald-500/20 -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
