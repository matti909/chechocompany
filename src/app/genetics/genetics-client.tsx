'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';
import { SlidersHorizontal, ChevronDown } from 'lucide-react';

interface Genetic {
  id: string;
  title: string;
  slug: string;
  genetics: string;
  composition: string;
  thc: string;
  cbd?: string;
  flowering: string;
  difficulty: string;
  effectType: string;
  flavor: string;
  specialFeature?: string;
  image: string;
  color: string;
  prices: {
    pack6: number;
    pack12: number;
    pack25: number;
    pack50: number;
    pack100: number;
  };
}

function getType(composition: string): 'SATIVA' | 'INDICA' | 'HÍBRIDO' {
  const lower = composition.toLowerCase();
  const sativaMatch = lower.match(/(\d+)%\s*sativa/);
  const indicaMatch = lower.match(/(\d+)%\s*indica/);
  const sativa = sativaMatch ? parseInt(sativaMatch[1]) : 0;
  const indica = indicaMatch ? parseInt(indicaMatch[1]) : 0;
  if (sativa > indica) return 'SATIVA';
  if (indica > sativa) return 'INDICA';
  return 'HÍBRIDO';
}

const TYPE_STYLES = {
  SATIVA:  'bg-amber-500/20 text-amber-300 border border-amber-500/40',
  INDICA:  'bg-purple-500/20 text-purple-300 border border-purple-500/40',
  HÍBRIDO: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40',
};

const FILTERS = [
  { key: 'all',    label: 'Todo' },
  { key: 'sativa', label: 'Sativa' },
  { key: 'indica', label: 'Indica' },
  { key: 'hybrid', label: 'Híbrido' },
];

export function GeneticsClient({ genetics }: { genetics: Genetic[] }) {
  const [filterBy, setFilterBy]         = useState('all');
  const [filtered, setFiltered]         = useState(genetics);
  const gridRef                         = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const result = filterBy === 'all'
      ? genetics
      : genetics.filter(g => {
          const t = getType(g.composition);
          if (filterBy === 'sativa') return t === 'SATIVA';
          if (filterBy === 'indica') return t === 'INDICA';
          if (filterBy === 'hybrid') return t === 'HÍBRIDO';
          return true;
        });

    setFiltered(result);

    if (gridRef.current) {
      gsap.fromTo(
        gridRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.07, ease: 'power3.out' }
      );
    }
  }, [filterBy, genetics]);

  return (
    <div className="w-full min-h-screen bg-[#080f08]">

      {/* ── HERO ── */}
      <section className="relative w-full min-h-[58vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/sems/indu.jpeg"
            alt="Cannabis plant"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#080f08]/30 via-[#080f08]/55 to-[#080f08]" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-16 pt-36">
          <span className="inline-flex items-center rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-1.5 text-xs font-medium text-emerald-400 mb-5 backdrop-blur-sm">
            Colección Premium 2025
          </span>

          <h1 className="text-7xl md:text-9xl font-black tracking-tighter leading-none text-white mb-5">
            Genéticas
            <br />
            <span className="text-emerald-400">de Élite.</span>
          </h1>

          <p className="text-lg text-gray-400 max-w-xl leading-relaxed">
            Semillas argentinas desarrolladas con precisión científica
            para el cultivador exigente.
          </p>
        </div>
      </section>

      {/* ── CATÁLOGO ── */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">

          {/* Barra de filtros */}
          <div className="flex items-center justify-between mb-10 gap-4 flex-wrap">
            {/* Izquierda: filtros */}
            <div className="flex items-center gap-2 flex-wrap">
              <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 text-white/60 hover:border-white/25 hover:text-white/80 transition-all text-sm font-medium">
                <SlidersHorizontal className="w-4 h-4" />
                Filtros
              </button>

              <div className="w-px h-6 bg-white/10 mx-1" />

              {FILTERS.map(f => (
                <button
                  key={f.key}
                  onClick={() => setFilterBy(f.key)}
                  className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                    filterBy === f.key
                      ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/30'
                      : 'text-white/50 hover:text-white'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Derecha: ordenar */}
            <button className="flex items-center gap-2 text-sm select-none">
              <span className="text-white/30 uppercase tracking-widest text-xs font-medium">
                Ordenar por
              </span>
              <span className="text-white font-semibold">Destacados</span>
              <ChevronDown className="w-4 h-4 text-white/40" />
            </button>
          </div>

          {/* Grid de cards */}
          {filtered.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-gray-500 text-lg">
                No se encontraron genéticas con ese filtro.
              </p>
            </div>
          ) : (
            <div
              ref={gridRef}
              className="flex flex-wrap justify-center gap-6"
            >
              {filtered.map((genetic) => {
                const type        = getType(genetic.composition);
                const isBestSeller = !!genetic.specialFeature;

                return (
                  <Link
                    key={genetic.id}
                    href={`/genetics/${genetic.slug}`}
                    className="group block w-[calc(50%-12px)] sm:w-[220px] lg:w-[240px] shrink-0"
                  >
                    {/* Imagen */}
                    <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-[#0d1a0d] mb-3">
                      <Image
                        src={genetic.image}
                        alt={genetic.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-600"
                      />
                      {/* Gradiente sutil en la base */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                        {isBestSeller && (
                          <span className="bg-emerald-500 text-black text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wide shadow-lg shadow-emerald-500/40">
                            Best Seller
                          </span>
                        )}
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide backdrop-blur-sm ${TYPE_STYLES[type]}`}>
                          {type}
                        </span>
                      </div>
                    </div>

                    {/* Info */}
                    <div>
                      <h3 className="text-white font-bold text-[15px] leading-snug mb-0.5 group-hover:text-emerald-400 transition-colors duration-200">
                        {genetic.title}
                      </h3>
                      <p className="text-gray-500 text-sm mb-1.5 truncate">
                        {genetic.effectType} • {genetic.flavor}
                      </p>
                      <p className="text-emerald-400 font-bold text-base">
                        ${genetic.prices.pack6.toLocaleString('es-AR')}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
