"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingBag, ArrowRight } from "lucide-react";
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

export function GeneticsSection({ genetics }: GeneticsProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);

          // Animate cards with GSAP
          if (cardsRef.current) {
            gsap.fromTo(
              cardsRef.current.children,
              { opacity: 0, y: 40, scale: 0.95 },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.6,
                stagger: 0.1,
                ease: "power3.out"
              }
            );
          }
        }
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Show only first 3 genetics on homepage
  const displayGenetics = genetics.slice(0, 3);

  return (
    <section
      id="genetics"
      ref={sectionRef}
      className="relative py-32 overflow-hidden bg-black"
    >
      {/* Background texture */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div
          className={`text-center mb-20 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <span className="inline-flex items-center rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-400 backdrop-blur-xl mb-6">
            Colección Premium 2024
          </span>

          <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-6">
            Cultivating
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-lime-400">
              Excellence
            </span>
          </h2>

          <p className="text-xl text-gray-400 leading-relaxed max-w-3xl mx-auto">
            Genéticas desarrolladas con precisión científica para cultivadores que buscan lo mejor.
          </p>
        </div>

        {/* Genetics Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16"
        >
          {displayGenetics.map((genetic) => (
            <Link
              key={genetic.id}
              href={`/genetics/${genetic.slug}`}
              className="group relative block"
            >
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-emerald-950/20 border border-emerald-500/10 group-hover:border-emerald-500/30 transition-all duration-500">
                {/* Image */}
                <Image
                  src={genetic.image}
                  alt={genetic.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

                {/* Badge - THC Level */}
                <div className="absolute top-4 right-4 bg-emerald-500 text-black text-xs font-bold px-3 py-1.5 rounded-full">
                  THC {genetic.thc}
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-white font-bold text-2xl mb-1">
                        {genetic.title}
                      </h3>
                      <p className="text-emerald-400 text-sm font-medium">
                        {genetic.genetics}
                      </p>
                      <p className="text-gray-400 text-xs mt-1">
                        {genetic.composition}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-white font-bold text-xl">
                          ${genetic.prices.pack6.toLocaleString()}
                        </div>
                        <div className="text-gray-400 text-xs">Pack x6 semillas</div>
                      </div>
                    </div>

                    {/* Hover Button */}
                    <div className="opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium bg-emerald-500/10 backdrop-blur-sm border border-emerald-500/30 rounded-full px-4 py-2">
                        <ShoppingBag className="w-4 h-4" />
                        <span>Ver detalles</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div
          className={`text-center transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <Link href="/genetics">
            <Button className="bg-gradient-to-r from-emerald-500 to-lime-500 hover:from-emerald-400 hover:to-lime-400 text-black font-bold px-8 py-6 text-lg rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-emerald-500/25">
              Ver Catálogo Completo
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
