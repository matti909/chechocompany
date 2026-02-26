'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ArrowUpRight } from 'lucide-react';

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

const TYPE_ACCENTS: Record<string, string> = {
  SATIVA:  '#fbbf24',
  INDICA:  '#a78bfa',
  HÍBRIDO: '#34d399',
};

const FILTERS = [
  { key: 'all',    label: 'Todo' },
  { key: 'sativa', label: 'Sativa' },
  { key: 'indica', label: 'Indica' },
  { key: 'hybrid', label: 'Híbrido' },
];

const colorAccents: Record<string, string> = {
  pink:    '#f472b6',
  emerald: '#34d399',
  blue:    '#fb923c',
  orange:  '#fb923c',
  purple:  '#c084fc',
  cyan:    '#22d3ee',
};

export function GeneticsClient({ genetics }: { genetics: Genetic[] }) {
  const [filterBy, setFilterBy] = useState('all');
  const [filtered, setFiltered] = useState(genetics);
  const heroRef  = useRef<HTMLDivElement>(null);
  const gridRef  = useRef<HTMLDivElement>(null);

  // Hero entrance
  useEffect(() => {
    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out', delay: 0.1 }
      );
    }
  }, []);

  // Filter + grid animation
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
        Array.from(gridRef.current.children),
        { opacity: 0, y: 24, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.55, stagger: 0.07, ease: 'power3.out' }
      );
    }
  }, [filterBy, genetics]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Space+Mono:wght@400;700&display=swap');
        .gc-display { font-family: 'Syne', sans-serif; }
        .gc-mono    { font-family: 'Space Mono', monospace; }

        .gc-filter-btn {
          clip-path: polygon(0 0, calc(100% - 7px) 0, 100% 7px, 100% 100%, 7px 100%, 0 calc(100% - 7px));
          transition: background 0.2s ease, color 0.2s ease;
        }
        .gc-card {
          transition: transform 0.4s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s ease;
        }
        .gc-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 24px 48px rgba(0,0,0,0.5);
        }
        .gc-card:hover .gc-tint { opacity: 1 !important; }
        .gc-card:hover .gc-arrow { transform: translate(2px,-2px); opacity: 1 !important; }
        .gc-card:hover .gc-title { color: #39FF14; }
        .gc-arrow { transition: transform 0.3s ease, opacity 0.3s ease; }
        .gc-title { transition: color 0.3s ease; }
        .gc-thc {
          clip-path: polygon(0 0, calc(100% - 7px) 0, 100% 7px, 100% 100%, 0 100%);
        }
        .gc-type {
          clip-path: polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 0 100%);
        }
      `}</style>

      <div className="w-full min-h-screen bg-[#050a05]">

        {/* ── HERO ── */}
        <section className="relative w-full overflow-hidden" style={{ minHeight: '52vh' }}>
          <div className="absolute inset-0">
            <Image
              src="/sems/indu.jpeg"
              alt="Genética premium"
              fill
              className="object-cover object-center"
              priority
            />
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to top, rgba(5,10,5,1) 0%, rgba(5,10,5,0.7) 50%, rgba(5,10,5,0.2) 100%)',
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to right, rgba(5,10,5,0.6) 0%, transparent 70%)',
              }}
            />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col justify-end h-full" style={{ minHeight: '52vh', paddingBottom: '4rem', paddingTop: '8rem' }}>
            <div ref={heroRef} className="max-w-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-6" style={{ background: '#39FF14' }} />
                <span className="gc-mono text-[10px] text-[#39FF14]/50 tracking-[0.35em] uppercase">
                  Colección Premium 2025
                </span>
              </div>

              <h1
                className="gc-display font-black leading-[0.88] tracking-tight text-white mb-5"
                style={{ fontSize: 'clamp(42px, 6.5vw, 80px)' }}
              >
                Genéticas
                <br />
                <span style={{ color: '#39FF14' }}>de Élite.</span>
              </h1>

              <p className="gc-mono text-[#7a9a7a] text-sm leading-relaxed max-w-md">
                Semillas fotoperiódicas argentinas desarrolladas con precisión científica para el cultivador exigente.
              </p>
            </div>
          </div>
        </section>

        {/* ── FILTER BAR ── */}
        <div className="border-y border-white/[0.08] sticky top-[80px] z-30 bg-[#050a05]/95 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between gap-4 py-3">

              {/* Filters */}
              <div className="flex items-center gap-1.5">
                {FILTERS.map(f => {
                  const active = filterBy === f.key;
                  return (
                    <button
                      key={f.key}
                      onClick={() => setFilterBy(f.key)}
                      className="gc-filter-btn gc-mono text-[10px] font-bold tracking-[0.2em] uppercase px-4 py-2"
                      style={{
                        background: active ? '#39FF14' : 'transparent',
                        color: active ? '#000' : 'rgba(255,255,255,0.35)',
                        border: active ? 'none' : '1px solid rgba(255,255,255,0.08)',
                      }}
                    >
                      {f.label}
                    </button>
                  );
                })}
              </div>

              {/* Count */}
              <span className="gc-mono text-[10px] text-[#3a5a3a] tracking-widest">
                {filtered.length} {filtered.length === 1 ? 'variedad' : 'variedades'}
              </span>
            </div>
          </div>
        </div>

        {/* ── GRID ── */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          {filtered.length === 0 ? (
            <div className="py-32 text-center">
              <p className="gc-mono text-[#3a5a3a] text-xs tracking-widest uppercase">
                — Sin resultados para ese filtro
              </p>
            </div>
          ) : (
            <div
              ref={gridRef}
              className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5"
            >
              {filtered.map((genetic, i) => {
                const type        = getType(genetic.composition);
                const typeAccent  = TYPE_ACCENTS[type];
                const accent      = colorAccents[genetic.color] ?? '#39FF14';
                const isBestSeller = !!genetic.specialFeature;

                return (
                  <Link
                    key={genetic.id}
                    href={`/genetics/${genetic.slug}`}
                    className="gc-card block bg-[#0a0f0a]"
                  >
                    {/* Image */}
                    <div className="relative overflow-hidden" style={{ aspectRatio: '3/4' }}>
                      <Image
                        src={genetic.image}
                        alt={genetic.title}
                        fill
                        className="object-cover object-top"
                      />

                      {/* Color tint on hover */}
                      <div
                        className="gc-tint absolute inset-0 transition-opacity duration-500"
                        style={{ background: `${accent}20`, opacity: 0 }}
                      />

                      {/* Bottom gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f0a] via-transparent to-transparent" />

                      {/* Top badges */}
                      <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                        {isBestSeller && (
                          <span
                            className="gc-mono text-[9px] font-bold px-2.5 py-1 tracking-widest uppercase text-black"
                            style={{ background: '#39FF14', clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 0 100%)' }}
                          >
                            Best Seller
                          </span>
                        )}
                        <span
                          className="gc-type gc-mono text-[9px] font-bold px-2.5 py-1 tracking-widest uppercase"
                          style={{
                            color: typeAccent,
                            background: `${typeAccent}18`,
                            border: `1px solid ${typeAccent}35`,
                          }}
                        >
                          {type}
                        </span>
                      </div>

                      {/* THC badge */}
                      <div
                        className="gc-thc absolute top-3 right-3 gc-mono text-[9px] font-bold px-2.5 py-1 tracking-wider text-black"
                        style={{ background: '#39FF14' }}
                      >
                        THC {genetic.thc}
                      </div>

                      {/* Collector number */}
                      <div className="absolute bottom-3 right-3 gc-mono text-white/20 text-[9px] tracking-widest">
                        {String(i + 1).padStart(2, '0')}
                      </div>
                    </div>

                    {/* Info panel */}
                    <div
                      className="p-4 border-t"
                      style={{ borderColor: `${accent}20` }}
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="gc-title gc-display font-black text-white text-sm leading-tight uppercase tracking-tight">
                          {genetic.title}
                        </h3>
                        <ArrowUpRight
                          className="gc-arrow w-3.5 h-3.5 flex-shrink-0 mt-0.5"
                          style={{ color: accent, opacity: 0.4 }}
                        />
                      </div>

                      <p className="gc-mono text-[10px] mb-3 truncate" style={{ color: accent }}>
                        {genetic.genetics}
                      </p>

                      <div className="h-px w-full mb-3" style={{ background: `${accent}18` }} />

                      <div className="flex items-end justify-between">
                        <div>
                          <div className="gc-display font-black text-white text-base leading-none">
                            ${genetic.prices.pack6.toLocaleString('es-AR')}
                          </div>
                          <div className="gc-mono text-[9px] text-[#3a5a3a] mt-1 tracking-wider">
                            Pack x6
                          </div>
                        </div>
                        <div
                          className="gc-mono text-[9px] px-2.5 py-1.5 tracking-widest uppercase"
                          style={{
                            color: accent,
                            border: `1px solid ${accent}35`,
                            background: `${accent}0d`,
                            clipPath: 'polygon(0 0, calc(100% - 5px) 0, 100% 5px, 100% 100%, 0 100%)',
                          }}
                        >
                          Ver
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </>
  );
}
