'use client';

import Link from "next/link";
import { Instagram, Mail, ArrowUp } from "lucide-react";

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
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-black text-white py-16 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Main content */}
        <div className="grid md:grid-cols-3 gap-12 mb-12">

          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-lime-500 rounded-lg flex items-center justify-center">
                <MountainIcon className="w-6 h-6 text-black" />
              </div>
              <div>
                <div className="text-xl font-bold">Chex Seeds</div>
                <div className="text-gray-400 text-sm">Genéticas Premium</div>
              </div>
            </div>

            <p className="text-gray-300 text-sm leading-relaxed">
              Empujando límites culturales desde 2014. Ofrecemos genéticas premium
              para cultivadores que buscan la máxima calidad.
            </p>

            <div className="text-gray-400 text-sm">
              Buenos Aires, Argentina
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-emerald-400 font-semibold">Enlaces</h4>
            <div className="space-y-2 text-sm">
              <Link href="/genetics" className="block text-gray-300 hover:text-emerald-400 transition-colors">
                Genéticas
              </Link>
              <Link href="/cart" className="block text-gray-300 hover:text-emerald-400 transition-colors">
                Carrito
              </Link>
              <Link href="/contacto" className="block text-gray-300 hover:text-emerald-400 transition-colors">
                Contacto
              </Link>
              <Link href="/#noticias" className="block text-gray-300 hover:text-emerald-400 transition-colors">
                Noticias
              </Link>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="text-emerald-400 font-semibold">Newsletter</h4>
            <p className="text-gray-300 text-sm">
              Recibe novedades y ofertas exclusivas
            </p>

            <div className="space-y-3">
              <input
                type="email"
                placeholder="Tu email"
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-sm text-white placeholder-gray-400 focus:border-emerald-400 focus:outline-none transition-colors"
              />
              <button className="w-full bg-gradient-to-r from-emerald-500 to-lime-500 hover:from-emerald-600 hover:to-lime-600 text-black font-semibold py-2 rounded-lg transition-all duration-300 text-sm">
                <span className="flex items-center justify-center gap-2">
                  <Mail className="w-4 h-4" />
                  Suscribirse
                </span>
              </button>
            </div>

            {/* Social */}
            <Link
              href="#"
              className="inline-flex items-center gap-2 text-gray-300 hover:text-purple-400 transition-colors text-sm"
            >
              <Instagram className="w-4 h-4" />
              Instagram
            </Link>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <div>
              © 2025 Chex Seeds. Todos los derechos reservados.
            </div>

            <div className="flex items-center gap-4">
              <Link href="#" className="hover:text-emerald-400 transition-colors">
                Privacidad
              </Link>
              <Link href="#" className="hover:text-emerald-400 transition-colors">
                Términos
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Back to top button */}
      <button
        onClick={scrollToTop}
        className="absolute bottom-4 right-4 md:bottom-8 md:right-8 bg-gradient-to-r from-emerald-500 to-lime-500 hover:from-emerald-400 hover:to-lime-400 text-black p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 group z-10"
        aria-label="Volver arriba"
      >
        <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
      </button>
    </footer>
  );
}