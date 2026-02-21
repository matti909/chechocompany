import { genetics } from '#site/content';
import { Footer } from '../components/footer';
import { Database, Zap, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { GeneticsClient } from './genetics-client';

export default function GeneticsPage() {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-r from-emerald-500/10 to-lime-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-32 right-16 w-60 h-60 bg-gradient-to-l from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-pink-500/10 rounded-lg rotate-45 blur-2xl animate-bounce" />
        </div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)`,
            backgroundSize: '50px 50px'
          }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            {/* Badge */}
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-lime-500 text-black px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider shadow-lg backdrop-blur-sm mb-8">
              <Database className="w-4 h-4" />
              <span>CATÁLOGO COMPLETO</span>
              <div className="w-2 h-2 bg-black rounded-full animate-pulse" />
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-emerald-300 to-lime-300 leading-none tracking-tight mb-6">
              GENÉTICAS
              <br />
              <span className="text-3xl md:text-4xl lg:text-5xl text-emerald-400 font-light tracking-wide">
                premium
              </span>
            </h1>

            <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto font-light mb-8">
              Explora nuestra colección completa de semillas regulares fotoperiódicas.
              Cada genética está cuidadosamente desarrollada para ofrecer la máxima calidad,
              potencia y rendimiento en tu cultivo.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-400 mb-2">{genetics.length}+</div>
                <div className="text-sm text-gray-400 font-mono uppercase">Variedades</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-lime-400 mb-2">98%</div>
                <div className="text-sm text-gray-400 font-mono uppercase">Germinación</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-2">24/7</div>
                <div className="text-sm text-gray-400 font-mono uppercase">Soporte</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Genetics Grid - Client Component */}
      <GeneticsClient genetics={genetics} />

      {/* CTA Section */}
      <section className="relative py-20 border-t border-emerald-500/20">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-emerald-400/20 to-lime-400/20 rounded-full blur-3xl animate-pulse" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              ¿Necesitas
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-lime-400 to-emerald-400">
                Asesoría Personalizada?
              </span>
            </h2>

            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              Nuestro equipo de expertos te ayudará a elegir la genética perfecta
              para tu espacio, experiencia y objetivos de cultivo.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/contacto">
                <Button className="bg-gradient-to-r from-emerald-500 to-lime-500 hover:from-emerald-600 hover:to-lime-600 text-black font-bold px-8 py-4 text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-emerald-500/25">
                  <Zap className="w-5 h-5 mr-2" />
                  Contactar Experto
                </Button>
              </Link>

              <Link href="/growing-guide">
                <Button
                  variant="outline"
                  className="border-2 border-emerald-400 text-emerald-400 hover:bg-emerald-400/10 font-bold px-8 py-4 text-lg transition-all duration-300"
                >
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Guía de Cultivo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
