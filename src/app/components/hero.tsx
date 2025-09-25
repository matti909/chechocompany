import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronRight, Star, Award, Leaf, Zap, TrendingUp } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Floating geometric shapes */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-emerald-400/20 to-lime-400/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-16 w-48 h-48 bg-gradient-to-l from-green-400/15 to-yellow-400/15 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute top-1/3 right-1/4 w-20 h-20 bg-emerald-300/30 rounded-lg rotate-45 blur-xl animate-bounce" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Section - Content */}
          <div className="space-y-10">
            {/* Brand Badge */}
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-lime-500 text-black px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider shadow-lg backdrop-blur-sm">
              <div className="w-2 h-2 bg-black rounded-full animate-pulse" />
              <span>CHEX SEEDS</span>
              <div className="w-2 h-2 bg-black rounded-full animate-pulse delay-500" />
            </div>
            
            {/* Main Title */}
            <div className="space-y-6">
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-emerald-300 to-lime-300 leading-none tracking-tight">
                CANNABIS
                <br />
                <span className="text-4xl md:text-5xl lg:text-6xl text-emerald-400 font-light tracking-wide">
                  del futuro
                </span>
              </h1>
              
              <div className="flex items-center gap-4 text-emerald-400 font-mono text-lg">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-emerald-400 rounded-full animate-ping" />
                  <span>LIVE</span>
                </div>
                <span className="text-gray-500">|</span>
                <span className="text-gray-300">Genética Premium de Argentina</span>
              </div>

              <p className="text-xl text-gray-300 leading-relaxed max-w-xl font-light">
                Revolucionamos el cultivo casero con tecnología de vanguardia, 
                genética superior y soporte integral para cultivadores de toda América.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6">
              <Button 
                size="lg" 
                className="group bg-gradient-to-r from-emerald-500 to-lime-500 hover:from-emerald-600 hover:to-lime-600 text-black font-bold px-10 py-6 text-lg rounded-2xl shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 hover:scale-105 transform"
              >
                <Zap className="h-6 w-6 mr-2 group-hover:rotate-12 transition-transform" />
                Explorar Colección
                <ChevronRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="group border-2 border-emerald-400 text-emerald-400 hover:bg-emerald-400/10 font-bold px-10 py-6 text-lg rounded-2xl backdrop-blur-sm hover:border-lime-400 hover:text-lime-400 transition-all duration-300"
              >
                <TrendingUp className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                Guía Avanzada
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-12">
              <div className="group text-center cursor-pointer">
                <div className="flex items-center justify-center mb-3">
                  <div className="relative">
                    <Star className="w-8 h-8 text-yellow-400 fill-current group-hover:scale-125 transition-transform" />
                    <div className="absolute -inset-2 bg-yellow-400/20 rounded-full blur-md group-hover:blur-lg transition-all" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-white group-hover:text-yellow-400 transition-colors">98%</p>
                <p className="text-sm text-gray-400 font-mono">GERMINACIÓN</p>
              </div>
              
              <div className="group text-center cursor-pointer">
                <div className="flex items-center justify-center mb-3">
                  <div className="relative">
                    <Award className="w-8 h-8 text-emerald-400 group-hover:scale-125 transition-transform" />
                    <div className="absolute -inset-2 bg-emerald-400/20 rounded-full blur-md group-hover:blur-lg transition-all" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors">50+</p>
                <p className="text-sm text-gray-400 font-mono">VARIEDADES</p>
              </div>
              
              <div className="group text-center cursor-pointer">
                <div className="flex items-center justify-center mb-3">
                  <div className="relative">
                    <Leaf className="w-8 h-8 text-lime-400 group-hover:scale-125 transition-transform" />
                    <div className="absolute -inset-2 bg-lime-400/20 rounded-full blur-md group-hover:blur-lg transition-all" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-white group-hover:text-lime-400 transition-colors">24/7</p>
                <p className="text-sm text-gray-400 font-mono">SOPORTE</p>
              </div>
            </div>
          </div>

          {/* Right Section - Image with Holographic Effect */}
          <div className="relative lg:ml-10">
            {/* Main Image Container */}
            <div className="relative group">
              {/* Holographic border effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500 via-lime-500 to-emerald-500 rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-1000 animate-pulse" />
              
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-emerald-500/25 backdrop-blur-sm border border-emerald-500/30">
                <Image
                  alt="Cannabis premium de alta tecnología - Epilepsia Strain"
                  className="w-full h-[700px] object-cover group-hover:scale-105 transition-transform duration-700"
                  height="700"
                  src="/epilepsia.jpg"
                  width="600"
                  priority
                />
                
                {/* Gradient overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-emerald-500/10" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500/5 to-transparent" />
                
                {/* Floating Tech Card */}
                <div className="absolute top-8 right-8 bg-black/80 backdrop-blur-md rounded-2xl p-4 border border-emerald-500/50 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse" />
                    <span className="text-emerald-400 font-mono text-sm font-bold">TECH ENABLED</span>
                  </div>
                </div>

                {/* Bottom Floating Card */}
                <div className="absolute bottom-8 left-8 right-8 bg-black/90 backdrop-blur-md rounded-2xl p-6 border border-lime-500/30 shadow-2xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-lime-500 rounded-xl flex items-center justify-center">
                        <Zap className="w-6 h-6 text-black" />
                      </div>
                      <div>
                        <h3 className="font-bold text-white">Asesoría AI-Powered</h3>
                        <p className="text-sm text-gray-400">Soporte inteligente 24/7</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-emerald-400 font-mono text-xl font-bold">100%</p>
                      <p className="text-gray-400 text-xs">ÉXITO</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating geometric decorations */}
            <div className="absolute -top-8 -left-8 w-16 h-16 bg-emerald-400/20 rounded-lg rotate-45 animate-spin-slow blur-sm" />
            <div className="absolute -bottom-12 -right-12 w-24 h-24 bg-lime-400/20 rounded-full animate-pulse blur-md" />
          </div>
        </div>
      </div>

      {/* Animated particles overlay */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-emerald-400 rounded-full animate-ping" />
        <div className="absolute top-3/4 left-3/4 w-1 h-1 bg-lime-400 rounded-full animate-ping delay-1000" />
        <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-yellow-400 rounded-full animate-ping delay-500" />
      </div>
    </section>
  );
}