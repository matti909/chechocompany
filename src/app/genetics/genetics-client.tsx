'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import {
  Search,
  SortDesc,
  ChevronDown,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

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

const colorSchemes = {
  pink: {
    gradient: 'from-pink-500/20 via-purple-500/20 to-pink-500/20',
    border: 'border-pink-500/30 group-hover:border-pink-400/50',
    text: 'text-pink-400',
    button: 'from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600'
  },
  emerald: {
    gradient: 'from-emerald-500/20 via-lime-500/20 to-emerald-500/20',
    border: 'border-emerald-500/30 group-hover:border-emerald-400/50',
    text: 'text-emerald-400',
    button: 'from-emerald-500 to-lime-500 hover:from-emerald-600 hover:to-lime-600'
  },
  blue: {
    gradient: 'from-blue-500/20 via-purple-500/20 to-blue-500/20',
    border: 'border-blue-500/30 group-hover:border-blue-400/50',
    text: 'text-blue-400',
    button: 'from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600'
  },
  orange: {
    gradient: 'from-orange-500/20 via-yellow-500/20 to-orange-500/20',
    border: 'border-orange-500/30 group-hover:border-orange-400/50',
    text: 'text-orange-400',
    button: 'from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600'
  },
  purple: {
    gradient: 'from-purple-500/20 via-violet-500/20 to-purple-500/20',
    border: 'border-purple-500/30 group-hover:border-purple-400/50',
    text: 'text-purple-400',
    button: 'from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600'
  },
  cyan: {
    gradient: 'from-cyan-500/20 via-blue-500/20 to-cyan-500/20',
    border: 'border-cyan-500/30 group-hover:border-cyan-400/50',
    text: 'text-cyan-400',
    button: 'from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600'
  }
};

export function GeneticsClient({ genetics }: { genetics: Genetic[] }) {
  const [isVisible, setIsVisible] = useState(false);
  const [filteredGenetics, setFilteredGenetics] = useState(genetics);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [filterBy, setFilterBy] = useState('all');
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let filtered = genetics;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.genetics.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (filterBy !== 'all') {
      filtered = filtered.filter(item => {
        switch (filterBy) {
          case 'indica':
            return item.composition.includes('Indica');
          case 'sativa':
            return item.composition.includes('Sativa');
          case 'hybrid':
            return item.composition.includes('50%');
          default:
            return true;
        }
      });
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.prices.pack6 - b.prices.pack6;
        case 'thc':
          return parseFloat(b.thc.replace('%', '')) - parseFloat(a.thc.replace('%', ''));
        case 'flowering':
          return parseInt(a.flowering.replace(/[^0-9]/g, '')) - parseInt(b.flowering.replace(/[^0-9]/g, ''));
        default:
          return a.title.localeCompare(b.title);
      }
    });

    setFilteredGenetics(filtered);
  }, [searchTerm, sortBy, filterBy, genetics]);

  return (
    <>
      {/* Filters and Search */}
      <section className="relative py-8 border-y border-emerald-500/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar genéticas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-black/60 border border-emerald-500/30 rounded-xl text-white placeholder-gray-400 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200"
              />
            </div>

            {/* Filter */}
            <div className="relative">
              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
                className="w-full appearance-none px-4 py-3 bg-black/60 border border-emerald-500/30 rounded-xl text-white focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200"
              >
                <option value="all">Todas las genéticas</option>
                <option value="indica">Indica Dominante</option>
                <option value="sativa">Sativa Dominante</option>
                <option value="hybrid">Híbridas 50/50</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>

            {/* Sort */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full appearance-none px-4 py-3 bg-black/60 border border-emerald-500/30 rounded-xl text-white focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200"
              >
                <option value="name">Ordenar por Nombre</option>
                <option value="price">Ordenar por Precio</option>
                <option value="thc">Ordenar por THC</option>
                <option value="flowering">Ordenar por Floración</option>
              </select>
              <SortDesc className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* Genetics Grid */}
      <section ref={sectionRef} className="relative py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            {filteredGenetics.map((genetic) => {
              const colors = colorSchemes[genetic.color as keyof typeof colorSchemes];

              return (
                <div key={genetic.id} className="group relative">
                  <div className={`absolute -inset-1 bg-gradient-to-r ${colors.gradient} rounded-3xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-500`} />

                  <div className={`relative bg-black/80 backdrop-blur-xl border ${colors.border} rounded-3xl overflow-hidden transition-all duration-500 h-full flex flex-col`}>
                    {/* Product Image */}
                    <div className="relative w-full h-48 overflow-hidden">
                      <Image
                        src={genetic.image}
                        alt={genetic.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                      {/* Price Badge */}
                      <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-sm border border-emerald-500/30 rounded-xl px-3 py-1.5">
                        <div className={`text-xl font-bold ${colors.text}`}>${genetic.prices.pack6.toLocaleString()}</div>
                        <div className="text-[10px] text-gray-400 text-center">Pack x6</div>
                      </div>
                    </div>

                    <div className="p-5 flex-1 flex flex-col">
                      <h3 className="text-xl font-bold text-white mb-1">
                        {genetic.title}
                      </h3>
                      <h4 className={`text-sm font-medium ${colors.text} mb-4`}>
                        {genetic.genetics}
                      </h4>

                      {/* Minimal Specs */}
                      <div className="space-y-1.5 mb-4 text-xs">
                        <div className="flex justify-between">
                          <span className="text-gray-400">THC:</span>
                          <span className="text-white font-medium">{genetic.thc}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Floración:</span>
                          <span className="text-white font-medium">{genetic.flowering}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Tipo:</span>
                          <span className="text-white font-medium">{genetic.composition.split('-')[0].trim()}</span>
                        </div>
                      </div>

                      {/* Seed Type Notice */}
                      <div className="p-2 bg-blue-500/10 border border-blue-500/30 rounded-lg mb-3">
                        <p className="text-xs text-blue-200 text-center">
                          <span className="font-semibold">Regulares</span> - 90% femeninas
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="space-y-2">
                        <Link href={`/genetics/${genetic.slug}`} className="block">
                          <Button className={`w-full bg-gradient-to-r ${colors.button} text-white font-bold transition-all duration-300 hover:scale-105`}>
                            Ver detalles
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredGenetics.length === 0 && (
            <div className="text-center py-20">
              <div className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-400 mb-2">No se encontraron genéticas</h3>
              <p className="text-gray-500">Intenta ajustar tus filtros de búsqueda</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
