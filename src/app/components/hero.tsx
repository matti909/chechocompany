"use client";

import { ArrowRight, Truck, ShieldCheck, Headphones } from "lucide-react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import Image from "next/image";

const badges = [
  { icon: Truck,        label: "Envío Discreto" },
  { icon: ShieldCheck,  label: "Calidad Garantizada" },
  { icon: Headphones,   label: "Soporte 24/7" },
];

export function Hero() {
  const titleRef  = useRef<HTMLHeadingElement>(null);
  const descRef   = useRef<HTMLDivElement>(null);
  const ctaRef    = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(titleRef.current,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      )
      .fromTo(descRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
        "-=0.5"
      )
      .fromTo(ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        "-=0.4"
      )
      .fromTo(badgesRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        "-=0.3"
      );
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">

      {/* Imagen de fondo */}
      <Image
        src="/hero-background.jpg"
        alt="Campo de cannabis Chex Seeds"
        fill
        priority
        className="object-cover object-center"
        quality={90}
      />

      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-black/65" />

      {/* Contenido */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 sm:px-8 text-center py-32">

        <h1
          ref={titleRef}
          className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight mb-6"
        >
          <span className="text-[#39FF14]">LA GENÉTICA PREMIUM</span>
          <br />
          <span className="text-white">QUE BUSCABAS</span>
        </h1>

        <div ref={descRef} className="mb-8">
          <p className="text-gray-300 text-lg lg:text-xl font-light leading-relaxed">
            Semillas premium argentinas que redefinen los estándares de calidad.
          </p>
          <p className="text-[#39FF14] text-lg lg:text-xl font-light mt-1">
            Cultivando el futuro, semilla por semilla.
          </p>
        </div>

        <div ref={ctaRef} className="mb-14">
          <Link href="/genetics">
            <button className="group inline-flex items-center justify-center gap-2 border-2 border-[#39FF14] text-[#39FF14] hover:bg-[#39FF14] hover:text-black font-bold text-lg px-10 py-4 rounded-full transition-all duration-300 hover:scale-105 cursor-pointer">
              Explorar Genéticas
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </div>

        {/* Badges */}
        <div
          ref={badgesRef}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12"
        >
          {badges.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 text-gray-300">
              <Icon className="w-5 h-5 text-[#39FF14]" />
              <span className="text-sm font-medium">{label}</span>
            </div>
          ))}
        </div>

        {/* Tagline */}
        <p className="mt-10 text-gray-500 text-xs tracking-widest uppercase">
          Premium Quality · Argentine Genetics · Est. 2014
        </p>

      </div>
    </section>
  );
}
