'use client';

import Link from "next/link";
import { Instagram, Mail, MapPin, Zap, Database, Code2, Shield, TrendingUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";

function MountainIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg" 
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}

export function Footer() {
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <footer 
        ref={footerRef}
        className="relative text-white py-32 overflow-hidden"
      >
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-32 w-64 h-64 bg-gradient-to-r from-emerald-500/10 to-lime-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 left-16 w-48 h-48 bg-gradient-to-l from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-pink-500/10 rounded-lg rotate-45 blur-2xl animate-bounce" />
        </div>

        {/* Circuit pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23ffffff' stroke-width='1'%3E%3Cpath d='M10 10h80v80h-80z'/%3E%3Cpath d='M20 20h60v60h-60z'/%3E%3Cpath d='M30 30h40v40h-40z'/%3E%3Ccircle cx='50' cy='50' r='5'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '100px 100px'
          }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          {/* Main content */}
          <div className={`grid md:grid-cols-4 gap-8 mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            
            {/* Company Info */}
            <div className="space-y-6">
              <div className="group">
                <div className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500/20 to-lime-500/20 backdrop-blur-sm border border-emerald-500/30 text-emerald-400 px-4 py-2 rounded-xl text-sm font-mono uppercase tracking-wider mb-6">
                  <Code2 className="w-4 h-4" />
                  <span>EMPRESA</span>
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                </div>
                
                <p className="text-gray-300 leading-relaxed mb-6 text-sm">
                  Empujando límites culturales desde 1975, buscamos maximizar el crecimiento 
                  de tus plantas con nuestra gama exclusiva de semillas. Nos esforzamos por ofrecer 
                  a los cultivadores caseros la mejor experiencia posible.
                </p>
                
                <div className="space-y-4">
                  <div className="group flex items-center gap-3 p-3 bg-black/40 backdrop-blur-sm border border-emerald-500/30 rounded-xl hover:border-emerald-400/50 transition-all duration-300">
                    <div className="p-2 bg-gradient-to-r from-emerald-500/20 to-lime-500/20 rounded-lg border border-emerald-500/30">
                      <MountainIcon className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div>
                      <div className="text-white font-medium">Chex Seeds</div>
                      <div className="text-gray-400 text-xs font-mono">Green Duo B.V.</div>
                    </div>
                  </div>
                  
                  <div className="group flex items-center gap-3 p-3 bg-black/40 backdrop-blur-sm border border-blue-500/30 rounded-xl hover:border-blue-400/50 transition-all duration-300">
                    <div className="p-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg border border-blue-500/30">
                      <MapPin className="w-4 h-4 text-blue-400" />
                    </div>
                    <div>
                      <div className="text-white font-medium">Buenos Aires</div>
                      <div className="text-gray-400 text-xs font-mono">Argentina</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Shop Links */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-pink-500/20 to-purple-500/20 backdrop-blur-sm border border-pink-500/30 text-pink-400 px-4 py-2 rounded-xl text-sm font-mono uppercase tracking-wider">
                <Database className="w-4 h-4" />
                <span>TIENDA</span>
              </div>
              
              <div className="space-y-2">
                {[
                  "Todos los productos",
                  "Selección especial", 
                  "Feminizadas",
                  "Autoflorecientes",
                  "CBD",
                  "Feminizadas USA",
                  "Regulares"
                ].map((item, index) => (
                  <Link 
                    key={index}
                    href="#" 
                    className="block p-2 rounded-lg text-gray-300 hover:text-pink-400 hover:bg-pink-500/10 transition-all duration-300 text-sm"
                  >
                    <span className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-pink-400 rounded-full opacity-60" />
                      {item}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Navigation Links */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-sm border border-blue-500/30 text-blue-400 px-4 py-2 rounded-xl text-sm font-mono uppercase tracking-wider">
                <TrendingUp className="w-4 h-4" />
                <span>NAVEGACIÓN</span>
              </div>
              
              <div className="space-y-2">
                {[
                  "Acerca de nosotros",
                  "B2B",
                  "Cómo cultivar",
                  "FAQ Cultivo",
                  "FAQ Servicio", 
                  "Contacto",
                  "Blog"
                ].map((item, index) => (
                  <Link 
                    key={index}
                    href="#" 
                    className="block p-2 rounded-lg text-gray-300 hover:text-blue-400 hover:bg-blue-500/10 transition-all duration-300 text-sm"
                  >
                    <span className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-blue-400 rounded-full opacity-60" />
                      {item}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Newsletter & Social */}
            <div className="space-y-6">
              {/* Newsletter */}
              <div className="relative group">
                {/* Holographic border effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 via-emerald-500/20 to-blue-500/20 rounded-3xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                
                <div className="relative bg-black/80 backdrop-blur-xl border border-emerald-500/30 rounded-3xl p-6 group-hover:border-emerald-400/50 transition-all duration-500">
                  {/* Tech logo */}
                  <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-lime-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <div className="text-black font-bold text-xs text-center leading-tight">
                      CHEX<br/>SEEDS
                    </div>
                  </div>
                  
                  <div className="text-center mb-4">
                    <h4 className="text-emerald-400 font-bold text-lg font-mono mb-1">15% DESCUENTO</h4>
                    <h5 className="text-gray-300 font-medium text-sm">EN TU PRIMERA COMPRA</h5>
                  </div>
                  
                  <div className="space-y-3">
                    <input 
                      type="text" 
                      placeholder="Nombre" 
                      className="w-full px-4 py-3 bg-black/60 border border-emerald-500/30 rounded-xl text-sm text-white placeholder-gray-400 focus:border-emerald-400 focus:outline-none transition-colors"
                    />
                    <input 
                      type="email" 
                      placeholder="Email" 
                      className="w-full px-4 py-3 bg-black/60 border border-emerald-500/30 rounded-xl text-sm text-white placeholder-gray-400 focus:border-emerald-400 focus:outline-none transition-colors"
                    />
                    <button className="w-full bg-gradient-to-r from-emerald-500 to-lime-500 hover:from-emerald-600 hover:to-lime-600 text-black font-bold py-3 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-emerald-500/25">
                      <span className="flex items-center justify-center gap-2">
                        <Mail className="w-4 h-4" />
                        REGISTRARSE
                      </span>
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Social */}
              <div className="text-center">
                <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-purple-500/30 text-purple-400 px-4 py-2 rounded-xl text-sm font-mono uppercase tracking-wider mb-4">
                  <Shield className="w-4 h-4" />
                  <span>CONTACTO</span>
                </div>
                
                <Link 
                  href="#" 
                  className="inline-flex items-center gap-2 p-3 bg-black/40 backdrop-blur-sm border border-purple-500/30 rounded-xl hover:border-purple-400/50 transition-all duration-300 hover:scale-110 group"
                >
                  <Instagram className="w-5 h-5 text-purple-400 group-hover:text-purple-300" />
                  <span className="text-gray-300 text-sm font-medium">Instagram</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom section */}
          <div className={`border-t border-gradient-to-r from-emerald-500/20 via-blue-500/20 to-purple-500/20 pt-8 transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}>
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <Zap className="w-4 h-4 text-emerald-400" />
                <span>Todos los derechos reservados © 2025</span>
              </div>
              
              <div className="flex items-center gap-6 text-sm">
                <span className="text-gray-500 font-mono">Realized with TMM</span>
                <div className="w-px h-4 bg-gray-700" />
                <Link href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">Política de privacidad</Link>
                <Link href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Cookies</Link>
                <Link href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Términos y condiciones</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Animated particles */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-emerald-400 rounded-full animate-ping" />
          <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-blue-400 rounded-full animate-ping delay-1000" />
          <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-purple-400 rounded-full animate-ping delay-2000" />
        </div>
      </footer>
  );
}