"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Leaf } from "lucide-react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import Image from "next/image";

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hero entrance animation
    const tl = gsap.timeline();

    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 100, scale: 0.8 },
      { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "power3.out" },
    )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.6",
      )
      .fromTo(
        descriptionRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.4",
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.4",
      );

    // Floating particles animation
    if (particlesRef.current) {
      const particles = particlesRef.current.querySelectorAll(".particle");
      particles.forEach((particle, i) => {
        gsap.to(particle, {
          y: -30,
          duration: 2 + i * 0.5,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
          delay: i * 0.3,
        });
      });
    }

    // Continuous title glow animation
    if (titleRef.current) {
      gsap.to(titleRef.current, {
        textShadow:
          "0 0 20px rgba(16, 185, 129, 0.3), 0 0 40px rgba(16, 185, 129, 0.2), 0 0 60px rgba(16, 185, 129, 0.1)",
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    }
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background with image */}
      <div className="absolute inset-0 bg-black">
        <Image
          src="/hero-background.jpg"
          alt="Sierras Chicas de Córdoba, Argentina"
          fill
          priority
          className="object-cover opacity-80"
          quality={100}
        />

        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/20 via-black to-lime-950/20" />

        {/* Geometric pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-64 h-64 border border-emerald-500 rounded-full" />
          <div className="absolute bottom-32 right-32 w-48 h-48 border border-lime-500 rounded-lg rotate-45" />
          <div className="absolute top-1/2 left-1/4 w-32 h-32 border border-emerald-300 rounded-full" />
          <div className="absolute top-1/3 right-1/4 w-24 h-24 border border-lime-300 rounded-lg rotate-12" />
        </div>

        {/* Animated mesh gradient */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-emerald-500/10 to-lime-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-l from-lime-500/8 to-emerald-500/8 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
      </div>

      {/* Floating particles */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none">
        <div className="particle absolute top-1/4 left-1/3 w-2 h-2 bg-emerald-400 rounded-full opacity-60" />
        <div className="particle absolute top-1/3 right-1/3 w-1 h-1 bg-lime-400 rounded-full opacity-40" />
        <div className="particle absolute bottom-1/3 left-1/4 w-3 h-3 bg-emerald-300 rounded-full opacity-30" />
        <div className="particle absolute bottom-1/4 right-1/4 w-1 h-1 bg-lime-300 rounded-full opacity-50" />
        <div className="particle absolute top-1/2 left-1/5 w-2 h-2 bg-emerald-400 rounded-full opacity-40" />
        <div className="particle absolute top-2/3 right-1/5 w-1 h-1 bg-lime-400 rounded-full opacity-60" />
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Main title */}
        <h1
          ref={titleRef}
          className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-lime-400 to-emerald-400 leading-none tracking-tight mb-6"
        >
          CHEX SEEDS
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-lg sm:text-xl md:text-2xl text-gray-300 font-light tracking-widest mb-8 opacity-80"
        >
          by Chex Company
        </p>

        {/* Elegant separator */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="h-px w-20 bg-gradient-to-r from-transparent to-emerald-500" />
          <Leaf className="w-6 h-6 text-emerald-400" />
          <div className="h-px w-20 bg-gradient-to-l from-transparent to-lime-500" />
        </div>

        {/* Description */}
        <p
          ref={descriptionRef}
          className="text-base sm:text-lg md:text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto mb-12 font-light px-4"
        >
          Genéticas premium argentinas que redefinen los estándares de calidad.
          <br />
          <span className="text-emerald-400">
            Cultivando el futuro, semilla por semilla.
          </span>
        </p>

        {/* CTA Section */}
        <div ref={ctaRef} className="space-y-6">
          <Link href="/genetics">
            <Button
              size="lg"
              className="group bg-gradient-to-r from-emerald-500 to-lime-500 hover:from-emerald-400 hover:to-lime-400 text-black font-bold px-12 py-6 text-lg rounded-2xl shadow-2xl hover:shadow-emerald-500/25 transition-all duration-500 hover:scale-105 border-none"
            >
              <span className="flex items-center gap-3">
                Explorar Genéticas
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Button>
          </Link>

          <p className="text-sm text-gray-500 font-mono">
            • Premium Quality • Argentine Genetics • Est. 2014 •
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
          <div className="w-px h-16 bg-gradient-to-b from-emerald-500/50 to-transparent" />
          <div className="w-2 h-2 bg-emerald-400 rounded-full mx-auto animate-bounce" />
        </div>
      </div>

      {/* Ambient light effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-80 h-80 bg-lime-500/5 rounded-full blur-3xl" />
      </div>
    </section>
  );
}

