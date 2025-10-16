'use client';

import { useState, useEffect, useRef } from 'react';
import { Navbar } from '../components/navbar';
import { Footer } from '../components/footer';
import { Button } from '@/components/ui/button';
import {
  Database,
  Zap,
  Search,
  SortDesc,
  ChevronDown,
  TrendingUp
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

// Mock data for genetics - you can replace this with real data later
const geneticsData = [
  {
    id: 'epilepsia',
    name: 'EPILEPSIA',
    subtitle: 'Big Bud x Skunk #1',
    genotype: '70% Indica - 30% Sativa',
    thc: '18-20%',
    cbd: '0.7%',
    flowering: '9-10 semanas',
    flavor: 'Flores dulces',
    production: '500-600g/m² - 600-1000g/planta',
    medicalUse: ['Anti-insomnio', 'Analgésico para dolores de cabeza', 'Ayuda con problemas digestivos'],
    color: 'pink',
    price: '$21.000',
    difficulty: 'Fácil',
    environment: 'Interior/Exterior',
    image: '/sems/indu.jpeg'
  },
  {
    id: 'bipolaridad-maniaca',
    name: 'BIPOLARIDAD MANÍACA',
    subtitle: 'GG#4 x Santabilbo',
    genotype: '60% Sativa - 40% Indica',
    thc: '25%',
    cbd: 'Medio',
    flowering: '8-10 semanas',
    flavor: 'Dulce, frutal terroso',
    production: '550-650g/m² - 800-1000g/planta',
    medicalUse: ['Estabilizador de ánimo', 'Anti-estrés', 'Estimula creatividad', 'Efecto cerebral eufórico'],
    color: 'orange',
    price: '$21.000',
    difficulty: 'Fácil',
    environment: 'Interior/Exterior',
    image: '/sems/bipolaridad.jpg'
  },
  {
    id: 'esquizofrenia',
    name: 'ESQUIZOFRENIA',
    subtitle: 'Ultra Rápida',
    genotype: '70% Indica - 30% Sativa',
    thc: '21%',
    cbd: '1.2%',
    flowering: '6-7 semanas',
    flavor: 'Dulce, uva, vainilla',
    production: '500g/m² - 600g/planta',
    medicalUse: ['Anti-ansiedad potente', 'Reduce nerviosismo', 'Efecto analgésico'],
    color: 'emerald',
    price: '$21.000',
    difficulty: 'Fácil',
    environment: 'Interior',
    image: '/sems/cali.jpeg'
  },
  {
    id: 'pack-mix',
    name: 'PACK MIX',
    subtitle: 'Las 3 Genéticas',
    genotype: 'Variedad Completa',
    thc: '18-25%',
    cbd: 'Variado',
    flowering: '6-10 semanas',
    flavor: 'Mix de sabores',
    production: 'Alta producción garantizada',
    medicalUse: ['Variedad de efectos terapéuticos', 'Para todos los usos medicinales', 'Opciones completas'],
    color: 'purple',
    price: '$21.000',
    difficulty: 'Fácil',
    environment: 'Interior/Exterior',
    image: '/sems/cana.png'
  }
];

const colorSchemes = {
  pink: {
    gradient: 'from-pink-500/20 via-purple-500/20 to-pink-500/20',
    border: 'border-pink-500/30 group-hover:border-pink-400/50',
    bg: 'from-pink-500/20 to-purple-500/20',
    borderColor: 'border-pink-500/30',
    text: 'text-pink-400',
    button: 'from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600'
  },
  emerald: {
    gradient: 'from-emerald-500/20 via-lime-500/20 to-emerald-500/20',
    border: 'border-emerald-500/30 group-hover:border-emerald-400/50',
    bg: 'from-emerald-500/20 to-lime-500/20',
    borderColor: 'border-emerald-500/30',
    text: 'text-emerald-400',
    button: 'from-emerald-500 to-lime-500 hover:from-emerald-600 hover:to-lime-600'
  },
  blue: {
    gradient: 'from-blue-500/20 via-purple-500/20 to-blue-500/20',
    border: 'border-blue-500/30 group-hover:border-blue-400/50',
    bg: 'from-blue-500/20 to-purple-500/20',
    borderColor: 'border-blue-500/30',
    text: 'text-blue-400',
    button: 'from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600'
  },
  orange: {
    gradient: 'from-orange-500/20 via-yellow-500/20 to-orange-500/20',
    border: 'border-orange-500/30 group-hover:border-orange-400/50',
    bg: 'from-orange-500/20 to-yellow-500/20',
    borderColor: 'border-orange-500/30',
    text: 'text-orange-400',
    button: 'from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600'
  },
  purple: {
    gradient: 'from-purple-500/20 via-violet-500/20 to-purple-500/20',
    border: 'border-purple-500/30 group-hover:border-purple-400/50',
    bg: 'from-purple-500/20 to-violet-500/20',
    borderColor: 'border-purple-500/30',
    text: 'text-purple-400',
    button: 'from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600'
  },
  cyan: {
    gradient: 'from-cyan-500/20 via-blue-500/20 to-cyan-500/20',
    border: 'border-cyan-500/30 group-hover:border-cyan-400/50',
    bg: 'from-cyan-500/20 to-blue-500/20',
    borderColor: 'border-cyan-500/30',
    text: 'text-cyan-400',
    button: 'from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600'
  }
};

export default function GeneticsPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [filteredGenetics, setFilteredGenetics] = useState(geneticsData);
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
    let filtered = geneticsData;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.subtitle.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (filterBy !== 'all') {
      filtered = filtered.filter(item => {
        switch (filterBy) {
          case 'indica':
            return item.genotype.includes('Indica');
          case 'sativa':
            return item.genotype.includes('Sativa');
          case 'hybrid':
            return item.genotype.includes('50%');
          case 'medical':
            return item.medicalUse && item.medicalUse.length > 0;
          default:
            return true;
        }
      });
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return parseInt(a.price.replace(/[^0-9]/g, '')) - parseInt(b.price.replace(/[^0-9]/g, ''));
        case 'thc':
          return parseFloat(b.thc.replace('%', '')) - parseFloat(a.thc.replace('%', ''));
        case 'flowering':
          return parseInt(a.flowering.replace(/[^0-9]/g, '')) - parseInt(b.flowering.replace(/[^0-9]/g, ''));
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredGenetics(filtered);
  }, [searchTerm, sortBy, filterBy]);

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

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
              Explora nuestra colección completa de semillas feminizadas fotoperiódicas.
              Cada genética está cuidadosamente desarrollada para ofrecer la máxima calidad,
              potencia y rendimiento en tu cultivo.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-400 mb-2">{geneticsData.length}+</div>
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
                <option value="medical">Uso Medicinal</option>
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
                    {genetic.image && (
                      <div className="relative w-full h-48 overflow-hidden">
                        <Image
                          src={genetic.image}
                          alt={genetic.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                        {/* Price Badge */}
                        <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-sm border border-emerald-500/30 rounded-xl px-3 py-1.5">
                          <div className={`text-xl font-bold ${colors.text}`}>{genetic.price}</div>
                          <div className="text-[10px] text-gray-400 text-center">Pack x6</div>
                        </div>
                      </div>
                    )}

                    <div className="p-5 flex-1 flex flex-col">
                      <h3 className="text-xl font-bold text-white mb-1">
                        {genetic.name}
                      </h3>
                      <h4 className={`text-sm font-medium ${colors.text} mb-4`}>
                        {genetic.subtitle}
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
                        <span className="text-white font-medium">{genetic.genotype.split('-')[0].trim()}</span>
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
                      <Link href={`/genetics/${genetic.id}`} className="block">
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
              <Database className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-400 mb-2">No se encontraron genéticas</h3>
              <p className="text-gray-500">Intenta ajustar tus filtros de búsqueda</p>
            </div>
          )}
        </div>
      </section>

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