'use client';

import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight, Scale, Leaf, Zap, ArrowLeft, FileText } from "lucide-react";
import Link from "next/link";

interface NewsItem {
  id: string | number;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  icon: any;
  color: string;
  isExternal?: boolean;
  sourceUrl?: string;
  tags?: string[];
}

export default function NoticiasPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNews = async () => {
      try {
        // Only use scraped data - no static news

        // Load scraped news if available
        let scrapedNews = null;
        let scrapedInase = null;
        let scrapedNormativa = null;
        try {
          scrapedNews = require('../../data/noticias-reprocann.json');
        } catch (error) {
          console.log('No se encontraron datos scrapeados de REPROCANN');
        }

        try {
          scrapedInase = require('../../data/noticias-inase.json');
        } catch (error) {
          console.log('No se encontraron datos scrapeados de INASE');
        }

        try {
          scrapedNormativa = require('../../data/noticias-normativa.json');
        } catch (error) {
          console.log('No se encontraron datos scrapeados de Normativa');
        }

        // Create scraped news items
        const scrapedNewsItem = scrapedNews ? {
          id: 'scraped-reprocann',
          title: 'Registro REPROCANN',
          excerpt: 'El Programa procura mejorar el acceso a quienes tienen indicación médica basada en la evidencia científica disponible, a un producto como especialidad medicinal o cultivo controlado de cannabis.',
          date: '29 enero 2025',
          category: 'Regulación',
          icon: Scale,
          color: "purple",
          isExternal: true,
          sourceUrl: 'https://www.argentina.gob.ar/salud/cannabis-medicinal/reprocann',
          tags: ['REPROCANN', 'Cannabis Medicinal', 'Argentina', 'Regulación', 'Salud Pública']
        } : null;

        const scrapedInaseItem = scrapedInase ? {
          id: 'scraped-inase',
          title: 'Certificación de Semillas - INASE',
          excerpt: 'El Instituto Nacional de Semillas regula la fiscalización para asegurar la pureza varietal y calidad de las semillas utilizadas en la agricultura argentina.',
          date: '29 enero 2025',
          category: 'Certificación',
          icon: Leaf,
          color: "emerald",
          isExternal: true,
          sourceUrl: 'https://www.argentina.gob.ar/inase/certificacionsemillas',
          tags: ['INASE', 'Certificación Semillas', 'Argentina', 'Agricultura']
        } : null;

        const scrapedNormativaItem = scrapedNormativa ? {
          id: 'scraped-normativa',
          title: 'Decreto 883/2020 - Cannabis Medicinal',
          excerpt: 'El Decreto 883/2020 establece el marco normativo para la regulación del cannabis medicinal en Argentina, definiendo los procedimientos, requisitos y autoridades competentes.',
          date: '01 diciembre 2020',
          category: 'Normativa',
          icon: FileText,
          color: "blue",
          isExternal: true,
          sourceUrl: 'https://www.argentina.gob.ar/normativa/nacional/decreto-883-2020-344131/texto',
          tags: ['Decreto 883/2020', 'Cannabis Medicinal', 'Argentina', 'Normativa']
        } : null;

        // Only show scraped items
        const allNews = [scrapedNewsItem, scrapedInaseItem, scrapedNormativaItem].filter(Boolean);
        setNews(allNews);
      } catch (error) {
        console.error('Error loading news:', error);
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Cargando noticias...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-emerald-500/10 to-lime-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-32 right-20 w-96 h-96 bg-gradient-to-l from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-16">
          {/* Back button */}
          <div className="mb-8">
            <Link href="/">
              <Button
                variant="ghost"
                className="text-gray-400 hover:text-white hover:bg-white/10 p-0 h-auto"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver al Inicio
              </Button>
            </Link>
          </div>

          {/* Page Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">
              TODAS LAS
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-lime-400 to-emerald-400">
                NOTICIAS
              </span>
            </h1>

            <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
              Mantente al día con las últimas novedades, lanzamientos de genéticas,
              regulaciones y consejos de cultivo.
            </p>
          </div>
        </div>
      </div>

      {/* News Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-32">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((article) => {
            const IconComponent = article.icon;
            const colorClasses = {
              emerald: "from-emerald-500/20 to-lime-500/20 border-emerald-500/30 group-hover:border-emerald-400/50",
              blue: "from-blue-500/20 to-cyan-500/20 border-blue-500/30 group-hover:border-blue-400/50",
              purple: "from-purple-500/20 to-pink-500/20 border-purple-500/30 group-hover:border-purple-400/50"
            };

            const iconColors = {
              emerald: "text-emerald-400",
              blue: "text-blue-400",
              purple: "text-purple-400"
            };

            const badgeColors = {
              emerald: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
              blue: "bg-blue-500/20 text-blue-400 border-blue-500/30",
              purple: "bg-purple-500/20 text-purple-400 border-purple-500/30"
            };

            return (
              <article key={article.id} className="group relative">
                <div className={`absolute -inset-1 bg-gradient-to-r ${colorClasses[article.color as keyof typeof colorClasses]} rounded-3xl blur-xl opacity-30 group-hover:opacity-60 transition-opacity duration-500`} />

                <div className={`relative bg-black/80 backdrop-blur-xl border ${colorClasses[article.color as keyof typeof colorClasses]} rounded-3xl overflow-hidden transition-all duration-500 h-full group-hover:scale-105`}>
                  {/* Image placeholder */}
                  <div className="relative h-48 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-black/60" />
                    <IconComponent className={`w-16 h-16 ${iconColors[article.color as keyof typeof iconColors]} relative z-10`} />

                    {/* Category badge */}
                    <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider border ${badgeColors[article.color as keyof typeof badgeColors]}`}>
                      {article.category}
                    </div>

                    {/* External indicator */}
                    {article.isExternal && (
                      <div className="absolute top-4 right-4 w-3 h-3 bg-purple-400 rounded-full animate-pulse" />
                    )}
                  </div>

                  <div className="p-6">
                    {/* Date */}
                    <div className="flex items-center gap-2 text-gray-400 text-sm mb-3">
                      <Calendar className="w-4 h-4" />
                      <time>{article.date}</time>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors duration-300 leading-tight">
                      {article.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-gray-300 text-sm leading-relaxed mb-4">
                      {article.excerpt}
                    </p>

                    {/* Tags for external articles */}
                    {article.isExternal && article.tags && (
                      <div className="flex flex-wrap gap-2 mb-6">
                        {article.tags.slice(0, 3).map((tag, index) => (
                          <span
                            key={index}
                            className={`px-2 py-1 text-xs font-mono uppercase tracking-wider rounded-full ${badgeColors[article.color as keyof typeof badgeColors]}`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Read more link */}
                    <div className="flex items-center justify-between">
                      {article.isExternal ? (
                        <Link href={`/noticias/${article.id}`}>
                          <Button
                            variant="ghost"
                            size="sm"
                            className={`text-${article.color}-400 hover:text-${article.color}-300 hover:bg-${article.color}-500/10 p-0 h-auto font-medium`}
                          >
                            Leer artículo completo
                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                          </Button>
                        </Link>
                      ) : (
                        <Button
                          variant="ghost"
                          size="sm"
                          className={`text-${article.color}-400 hover:text-${article.color}-300 hover:bg-${article.color}-500/10 p-0 h-auto font-medium`}
                        >
                          Leer más
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Newsletter CTA */}
        <div className="text-center mt-20">
          <div className="max-w-2xl mx-auto mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              ¿Quieres recibir nuestras noticias directamente?
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Suscríbete a nuestro newsletter y nunca te pierdas las últimas actualizaciones
              sobre genéticas, regulaciones y consejos de cultivo.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Tu email"
              className="flex-1 px-4 py-3 bg-black/60 border border-emerald-500/30 rounded-xl text-white placeholder-gray-400 focus:border-emerald-400 focus:outline-none transition-colors"
            />
            <Button className="bg-gradient-to-r from-emerald-500 to-lime-500 hover:from-emerald-600 hover:to-lime-600 text-black font-bold px-8 py-3 transition-all duration-300 hover:scale-105 whitespace-nowrap">
              Suscribirme
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}