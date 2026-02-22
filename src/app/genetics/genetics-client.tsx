'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';

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

export function GeneticsClient({ genetics }: { genetics: Genetic[] }) {
  const [filterBy, setFilterBy] = useState('all');
  const [filteredGenetics, setFilteredGenetics] = useState(genetics);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let filtered = genetics;

    if (filterBy !== 'all') {
      filtered = genetics.filter(item => {
        switch (filterBy) {
          case 'indica':
            return item.composition.toLowerCase().includes('indica');
          case 'sativa':
            return item.composition.toLowerCase().includes('sativa');
          case 'hybrid':
            return item.composition.includes('50');
          default:
            return true;
        }
      });
    }

    setFilteredGenetics(filtered);

    // Animate grid items
    if (gridRef.current) {
      gsap.fromTo(
        gridRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out"
        }
      );
    }
  }, [filterBy, genetics]);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative w-full min-h-[60vh] flex items-center justify-center overflow-hidden bg-black">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-cover bg-center opacity-40"
            style={{
              backgroundImage: `url('/sems/indu.jpeg')`
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center max-w-4xl px-6 flex flex-col items-center gap-6">
          <span className="inline-flex items-center rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-400 backdrop-blur-xl">
            Nueva Colección 2024
          </span>

          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white">
            Cultivating
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-lime-400">
              Excellence
            </span>
          </h1>

          <p className="text-xl text-gray-300 max-w-2xl leading-relaxed">
            Genéticas premium desarrolladas con precisión científica. Cada cepa representa años de selección y perfección.
          </p>
        </div>
      </section>

      {/* Genetics Grid */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <button
              onClick={() => setFilterBy('all')}
              className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 ${
                filterBy === 'all'
                  ? 'bg-emerald-500 text-black'
                  : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20'
              }`}
            >
              Todas
            </button>
            <button
              onClick={() => setFilterBy('indica')}
              className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 ${
                filterBy === 'indica'
                  ? 'bg-emerald-500 text-black'
                  : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20'
              }`}
            >
              Indica
            </button>
            <button
              onClick={() => setFilterBy('sativa')}
              className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 ${
                filterBy === 'sativa'
                  ? 'bg-emerald-500 text-black'
                  : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20'
              }`}
            >
              Sativa
            </button>
            <button
              onClick={() => setFilterBy('hybrid')}
              className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 ${
                filterBy === 'hybrid'
                  ? 'bg-emerald-500 text-black'
                  : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20'
              }`}
            >
              Híbridas
            </button>
          </div>

          {/* Grid */}
          <div
            ref={gridRef}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
          >
            {filteredGenetics.map((genetic) => (
              <Link
                key={genetic.id}
                href={`/genetics/${genetic.slug}`}
                className="group relative block"
              >
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-emerald-950/20 border border-emerald-500/10 group-hover:border-emerald-500/40 transition-all duration-500">
                  {/* Image */}
                  <Image
                    src={genetic.image}
                    alt={genetic.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-70 group-hover:opacity-85 transition-opacity duration-300" />

                  {/* Content Overlay */}
                  <div className="absolute inset-0 p-4 flex flex-col justify-end">
                    <div className="space-y-1">
                      <h3 className="text-white font-bold text-lg">
                        {genetic.title}
                      </h3>
                      <p className="text-emerald-400 text-sm font-medium">
                        {genetic.genetics}
                      </p>
                      <div className="flex items-center justify-between pt-2">
                        <span className="text-white font-bold text-lg">
                          ${genetic.prices.pack6.toLocaleString()}
                        </span>
                        <span className="text-xs text-gray-400">
                          Pack x6
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* THC Badge */}
                  <div className="absolute top-3 right-3 bg-emerald-500 text-black text-xs font-bold px-2.5 py-1 rounded-full">
                    {genetic.thc}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Load More */}
          {filteredGenetics.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">
                No se encontraron genéticas con ese filtro
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section - Join Inner Circle */}
      <section className="py-24 bg-emerald-950/10 border-y border-emerald-500/20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 mb-6">
            <svg className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>

          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Join the Inner Circle
          </h2>

          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Obtené acceso exclusivo a nuevas genéticas, guías de cultivo premium y ofertas especiales para miembros.
          </p>

          <Button className="bg-gradient-to-r from-emerald-500 to-lime-500 hover:from-emerald-400 hover:to-lime-400 text-black font-bold px-8 py-6 text-lg rounded-full transition-all duration-300 hover:scale-105">
            Unirse Ahora
          </Button>
        </div>
      </section>
    </div>
  );
}
