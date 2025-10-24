"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Award,
  Clock,
  Database,
  Sparkles,
  Star,
  Zap,
  ShoppingBag,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function GeneticsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="genetics"
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-r from-emerald-500/10 to-lime-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-32 right-16 w-60 h-60 bg-gradient-to-l from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-pink-500/10 rounded-lg rotate-45 blur-2xl animate-bounce" />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500/20 to-lime-500/20 backdrop-blur-sm border border-emerald-500/30 text-emerald-400 px-6 py-3 rounded-xl text-sm font-mono uppercase tracking-wider mb-8">
            <Database className="w-5 h-5" />
            <span>Nuestras Genéticas</span>
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">
            GENÉTICAS
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-lime-400 to-emerald-400">
              PREMIUM
            </span>
          </h2>

          <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
            Desarrollamos y producimos semillas Regulares, diseñadas para
            entregar las más fuertes y rápidas del mercado con trazabilidad
            real.
          </p>
        </div>

        <div
          className={`grid md:grid-cols-3 gap-8 mb-16 transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Epilepsia Card */}
          <div className="group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

            <div className="relative bg-black/80 backdrop-blur-xl border border-pink-500/30 rounded-3xl overflow-hidden group-hover:border-pink-400/50 transition-all duration-500 h-full flex flex-col">
              {/* Product Image */}
              <div className="relative w-full h-48 overflow-hidden">
                <Image
                  src="/Epilesia-20251004T225525Z-1-001/Epilepsiafrente.jpg"
                  alt="EPILEPSIA"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              </div>

              <div className="p-8 flex-1 flex flex-col">
                <h3 className="text-2xl font-bold text-white mb-2 text-center">
                  EPILEPSIA
                </h3>
                <h4 className="text-lg font-medium text-pink-400 mb-4 text-center">
                  Big Bud x Skunk #1
                </h4>

                <div className="space-y-2 mb-6 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Genotipo:</span>
                    <span className="text-white">70% Indica - 30% Sativa</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">THC:</span>
                    <span className="text-white">18-20%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">CBD:</span>
                    <span className="text-white">0.7%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Floración:</span>
                    <span className="text-white">9-10 semanas</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Sabor:</span>
                    <span className="text-white">Flores dulces</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Producción:</span>
                    <span className="text-white">
                      500-600g/m² - 600-1000g/planta
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="w-4 h-4 text-pink-400" />
                    <span className="text-xs text-gray-300">Uso Medicinal</span>
                  </div>
                  <div className="text-xs text-gray-400 space-y-1">
                    <div>• Anti-insomnio</div>
                    <div>• Analgésico para dolores de cabeza</div>
                    <div>• Ayuda con problemas digestivos</div>
                  </div>
                </div>

                <Link href="/genetics/epilepsia" className="w-full mt-auto">
                  <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold transition-all duration-300 hover:scale-105">
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    Ver detalles
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Esquizofrenia Card */}
          <div className="group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 via-lime-500/20 to-emerald-500/20 rounded-3xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

            <div className="relative bg-black/80 backdrop-blur-xl border border-emerald-500/30 rounded-3xl overflow-hidden group-hover:border-emerald-400/50 transition-all duration-500 h-full flex flex-col">
              {/* Product Image */}
              <div className="relative w-full h-48 overflow-hidden">
                <Image
                  src="/Esquizofrenia-20251004T225522Z-1-001/Frente esq_.jpg"
                  alt="ESQUIZOFRENIA"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              </div>

              <div className="p-8 flex-1 flex flex-col">
                <h3 className="text-2xl font-bold text-white mb-2 text-center">
                  ESQUIZOFRENIA
                </h3>
                <h4 className="text-lg font-medium text-emerald-400 mb-4 text-center">
                  Ultra Rápida
                </h4>

                <div className="space-y-2 mb-6 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Genotipo:</span>
                    <span className="text-white">70% Indica - 30% Sativa</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">THC:</span>
                    <span className="text-white">21%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Floración:</span>
                    <span className="text-white">45 días interior</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Olor:</span>
                    <span className="text-white">Bajo - Discreto</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Sabor:</span>
                    <span className="text-white">Dulce, uva, vainilla</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Producción:</span>
                    <span className="text-white">500g/m² - 600g/planta</span>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs text-gray-300">Uso Medicinal</span>
                  </div>
                  <div className="text-xs text-gray-400 space-y-1">
                    <div>• Anti-ansiedad potente</div>
                    <div>• Reduce nerviosismo</div>
                    <div>• Efecto analgésico</div>
                  </div>
                </div>

                <Link href="/genetics/esquizofrenia" className="w-full mt-auto">
                  <Button className="w-full bg-gradient-to-r from-emerald-500 to-lime-500 hover:from-emerald-600 hover:to-lime-600 text-black font-bold transition-all duration-300 hover:scale-105">
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    Ver detalles
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Marmalate Early Version Card */}
          <div className="group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 rounded-3xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

            <div className="relative bg-black/80 backdrop-blur-xl border border-blue-500/30 rounded-3xl overflow-hidden group-hover:border-blue-400/50 transition-all duration-500 h-full flex flex-col">
              {/* Product Image */}
              <div className="relative w-full h-48 overflow-hidden">
                <Image
                  src="/sems/bipolaridad.jpg"
                  alt="MARMALATE"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              </div>

              <div className="p-8 flex-1 flex flex-col">
                <h3 className="text-2xl font-bold text-white mb-2 text-center">
                  MARMALATE
                </h3>
                <h4 className="text-lg font-medium text-blue-400 mb-4 text-center">
                  Early Version
                </h4>

                <div className="space-y-2 mb-6 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Genotipo:</span>
                    <span className="text-white">30% Sativa - 70% Indica</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">THC:</span>
                    <span className="text-white">21%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Floración:</span>
                    <span className="text-white">45 días interior</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Dificultad:</span>
                    <span className="text-white">Fácil</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Sabor:</span>
                    <span className="text-white">Dulce afrutado</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Producción:</span>
                    <span className="text-white">500g/m² - 900g/planta</span>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span className="text-xs text-gray-300">Premios</span>
                  </div>
                  <div className="text-xs text-gray-400 space-y-1">
                    <div>• 1° Premio Outdoor Copa MF 2013</div>
                    <div>• 2° Indoor Copa Txapelketa 2013</div>
                    <div>• Especial para clonar</div>
                  </div>
                </div>

                <Link href="/genetics/marmalate" className="w-full mt-auto">
                  <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold transition-all duration-300 hover:scale-105">
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    Ver detalles
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div
          className={`text-center transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <Button className="bg-gradient-to-r from-emerald-500 to-lime-500 hover:from-emerald-600 hover:to-lime-600 text-black font-bold px-8 py-3 text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-emerald-500/25">
            <Database className="w-5 h-5 mr-2" />
            Ver Catálogo Completo
          </Button>
        </div>
      </div>
    </section>
  );
}
