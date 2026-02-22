"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingBag, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";

export function GeneticsSection() {
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

  const genetics = [
    {
      id: 1,
      name: "Purple Haze",
      strain: "Sativa Dominante",
      image: "/sems/indu.jpeg",
      badge: "Bestseller",
      price: "$15.000"
    },
    {
      id: 2,
      name: "Northern Lights",
      strain: "Indica Pura",
      image: "/sems/sati.jpeg",
      badge: "New",
      price: "$18.000"
    },
    {
      id: 3,
      name: "Green Dream",
      strain: "Híbrida",
      image: "/sems/cali.jpeg",
      badge: null,
      price: "$16.000"
    },
    {
      id: 4,
      name: "Gold Rush",
      strain: "Sativa",
      image: "/sems/algo.jpeg",
      badge: "Premium",
      price: "$20.000"
    },
    {
      id: 5,
      name: "Purple Passion",
      strain: "Indica",
      image: "/sems/bipolaridad.jpg",
      badge: null,
      price: "$17.000"
    },
    {
      id: 6,
      name: "Crystal Clear",
      strain: "Híbrida",
      image: "/sems/cana.png",
      badge: "Limited",
      price: "$22.000"
    },
    {
      id: 7,
      name: "Ocean Breeze",
      strain: "Sativa",
      image: "/sems/indu.jpeg",
      badge: null,
      price: "$16.000"
    },
    {
      id: 8,
      name: "Forest Mist",
      strain: "Indica",
      image: "/sems/sati.jpeg",
      badge: "Exclusive",
      price: "$19.000"
    }
  ];

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
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-16"
        >
          {genetics.map((genetic) => (
            <Link
              key={genetic.id}
              href="/genetics"
              className="group relative block"
            >
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-emerald-950/20 border border-emerald-500/10 group-hover:border-emerald-500/30 transition-all duration-500">
                {/* Image */}
                <Image
                  src={genetic.image}
                  alt={genetic.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

                {/* Badge */}
                {genetic.badge && (
                  <div className="absolute top-3 right-3 bg-emerald-500 text-black text-xs font-bold px-3 py-1 rounded-full">
                    {genetic.badge}
                  </div>
                )}

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="flex items-end justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-bold text-lg truncate">
                        {genetic.name}
                      </h3>
                      <p className="text-emerald-400 text-sm">
                        {genetic.strain}
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <div className="text-white font-bold text-lg">
                        {genetic.price}
                      </div>
                    </div>
                  </div>

                  {/* Hover Button */}
                  <div className="mt-3 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium">
                      <ShoppingBag className="w-4 h-4" />
                      <span>Ver detalles</span>
                      <ArrowRight className="w-4 h-4" />
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
