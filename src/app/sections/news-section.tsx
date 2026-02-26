'use client';

import { useEffect, useRef, useState } from 'react';
import { Calendar, ArrowUpRight, ExternalLink, Scale, Leaf, FileText } from "lucide-react";
import Link from "next/link";

interface ScrapedContent {
  contenido?: string;
  [key: string]: unknown;
}

interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  accent: string;
  isExternal: boolean;
  sourceUrl: string;
  tags: string[];
}

export function NewsSection() {
  const [scrapedNews,      setScrapedNews]      = useState<ScrapedContent | null>(null);
  const [scrapedInase,     setScrapedInase]     = useState<ScrapedContent | null>(null);
  const [scrapedNormativa, setScrapedNormativa] = useState<ScrapedContent | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef  = useRef<HTMLDivElement>(null);
  const listRef    = useRef<HTMLDivElement>(null);
  const ctaRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadData = async () => {
      try { const r = await import('../../data/noticias-reprocann.json'); setScrapedNews(r.default); } catch {}
      try { const r = await import('../../data/noticias-inase.json');     setScrapedInase(r.default); } catch {}
      try { const r = await import('../../data/noticias-normativa.json'); setScrapedNormativa(r.default); } catch {}
    };
    loadData();
  }, []);

  useEffect(() => {
    let gsapInstance: typeof import('gsap')['gsap'] | null = null;

    const init = async () => {
      const { gsap } = await import('gsap');
      gsapInstance = gsap;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          const tl = gsap.timeline();
          tl
            .fromTo(headerRef.current,
              { opacity: 0, y: 24 },
              { opacity: 1, y: 0, duration: 0.8, ease: "power4.out" }
            )
            .fromTo(Array.from(listRef.current?.children ?? []),
              { opacity: 0, x: -20 },
              { opacity: 1, x: 0, duration: 0.55, stagger: 0.1, ease: "power3.out" },
              "-=0.4"
            )
            .fromTo(ctaRef.current,
              { opacity: 0, y: 16 },
              { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" },
              "-=0.2"
            );
        },
        { threshold: 0.08 }
      );

      if (sectionRef.current) observer.observe(sectionRef.current);
      return () => observer.disconnect();
    };

    init();
  }, []);

  const allItems: NewsItem[] = [
    scrapedNews ? {
      id: 'scraped-reprocann',
      title: 'Registro REPROCANN',
      excerpt: 'El Programa procura mejorar el acceso a quienes tienen indicación médica basada en la evidencia científica disponible, a un producto como especialidad medicinal o cultivo controlado.',
      date: '29 Ene 2025',
      category: 'Regulación',
      icon: Scale,
      accent: '#c084fc',
      isExternal: true,
      sourceUrl: 'https://www.argentina.gob.ar/salud/cannabis-medicinal/reprocann',
      tags: ['REPROCANN', 'Cannabis Medicinal', 'Argentina'],
    } : null,
    scrapedInase ? {
      id: 'scraped-inase',
      title: 'Certificación de Semillas — INASE',
      excerpt: 'El Instituto Nacional de Semillas regula la fiscalización para asegurar la pureza varietal y calidad de las semillas utilizadas en la agricultura argentina.',
      date: '29 Ene 2025',
      category: 'Certificación',
      icon: Leaf,
      accent: '#34d399',
      isExternal: true,
      sourceUrl: 'https://www.argentina.gob.ar/inase/certificacionsemillas',
      tags: ['INASE', 'Certificación', 'Agricultura'],
    } : null,
    scrapedNormativa ? {
      id: 'scraped-normativa',
      title: 'Decreto 883/2020 — Cannabis Medicinal',
      excerpt: 'El Decreto 883/2020 establece el marco normativo para la regulación del cannabis medicinal en Argentina, definiendo procedimientos, requisitos y autoridades competentes.',
      date: '01 Dic 2020',
      category: 'Normativa',
      icon: FileText,
      accent: '#fb923c',
      isExternal: true,
      sourceUrl: 'https://www.argentina.gob.ar/normativa/nacional/decreto-883-2020-344131/texto',
      tags: ['Decreto 883/2020', 'Normativa', 'Argentina'],
    } : null,
  ].filter((i): i is NewsItem => i !== null);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Space+Mono:wght@400;700&display=swap');
        .ns-display { font-family: 'Syne', sans-serif; }
        .ns-mono    { font-family: 'Space Mono', monospace; }

        .ns-row {
          transition: background 0.3s ease;
        }
        .ns-row:hover {
          background: rgba(57,255,20,0.02);
        }
        .ns-row:hover .ns-arrow {
          transform: translate(3px,-3px);
          opacity: 1;
        }
        .ns-row:hover .ns-title {
          color: #39FF14;
        }
        .ns-arrow {
          transition: transform 0.3s ease, opacity 0.3s ease;
          opacity: 0.4;
        }
        .ns-title {
          transition: color 0.3s ease;
        }
        .ns-cta-btn {
          clip-path: polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px));
          transition: opacity 0.25s ease, transform 0.25s ease;
        }
        .ns-cta-btn:hover { opacity: 0.9; transform: scale(1.02); }
        .ns-input {
          clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%);
        }
      `}</style>

      <section
        ref={sectionRef}
        id="noticias"
        className="relative bg-[#050a05] overflow-hidden"
      >
        <div className="border-t border-white/[0.08]" />

        <div className="max-w-7xl mx-auto px-6">

          {/* ── Header ── */}
          <div ref={headerRef} className="py-16 lg:py-20 border-b border-white/[0.08]">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <div>
                <span className="ns-mono text-[10px] text-[#39FF14]/50 tracking-[0.35em] uppercase block mb-5">
                  — Últimas Noticias
                </span>
                <h2
                  className="ns-display font-black leading-[0.88] tracking-tight text-white"
                  style={{ fontSize: "clamp(36px, 5.5vw, 68px)" }}
                >
                  Mantente
                  <br />
                  <span style={{ color: "#39FF14" }}>Actualizado.</span>
                </h2>
              </div>
              <p className="ns-mono text-[#7a9a7a] text-sm leading-relaxed max-w-sm lg:text-right">
                Normativas, regulaciones y novedades del mundo del cannabis medicinal en Argentina.
              </p>
            </div>
          </div>

          {/* ── Article list ── */}
          <div ref={listRef}>
            {allItems.length === 0 ? (
              <div className="py-20 text-center border-b border-white/[0.08]">
                <p className="ns-mono text-[#3a5a3a] text-xs tracking-widest uppercase">
                  — Próximamente
                </p>
              </div>
            ) : (
              allItems.map((article, i) => {
                const Icon = article.icon;
                return (
                  <Link
                    key={article.id}
                    href={`/noticias/${article.id}`}
                    className="ns-row block border-b border-white/[0.08]"
                  >
                    <div className="py-8 grid grid-cols-1 lg:grid-cols-[160px_120px_1fr_48px] gap-4 lg:gap-8 items-start">

                      {/* Date */}
                      <div className="flex lg:flex-col gap-3 items-center lg:items-start">
                        <Calendar className="w-3.5 h-3.5 text-[#39FF14]/30 lg:hidden" />
                        <span className="ns-mono text-[#3a5a3a] text-[11px] tracking-wide">
                          {article.date}
                        </span>
                      </div>

                      {/* Category */}
                      <div>
                        <span
                          className="ns-mono text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1.5"
                          style={{
                            color: article.accent,
                            border: `1px solid ${article.accent}35`,
                            background: `${article.accent}0d`,
                            clipPath: "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 0 100%)",
                          }}
                        >
                          {article.category}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <Icon
                            className="w-4 h-4 flex-shrink-0 mt-1"
                            style={{ color: article.accent }}
                          />
                          <h3 className="ns-title ns-display font-bold text-white text-lg leading-snug">
                            {article.title}
                          </h3>
                        </div>

                        <p className="ns-mono text-[#7a9a7a] text-xs leading-relaxed max-w-2xl">
                          {article.excerpt}
                        </p>

                        {/* Tags + external link */}
                        <div className="flex flex-wrap items-center gap-2 pt-1">
                          {article.tags.map((tag, j) => (
                            <span
                              key={j}
                              className="ns-mono text-[9px] text-[#2a4a2a] tracking-widest uppercase px-2 py-0.5 border border-white/[0.06]"
                            >
                              {tag}
                            </span>
                          ))}
                          <a
                            href={article.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1 ml-2 text-[#39FF14]/30 hover:text-[#39FF14]/70 transition-colors"
                          >
                            <ExternalLink className="w-3 h-3" />
                            <span className="ns-mono text-[9px] tracking-widest">Fuente oficial</span>
                          </a>
                        </div>
                      </div>

                      {/* Arrow */}
                      <div className="hidden lg:flex items-start justify-end pt-1">
                        <ArrowUpRight
                          className="ns-arrow w-5 h-5 text-white"
                        />
                      </div>
                    </div>
                  </Link>
                );
              })
            )}
          </div>

          {/* ── Newsletter + CTA ── */}
          <div ref={ctaRef} className="py-12 border-b border-white/[0.08]">
            <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-16">

              <div className="flex-shrink-0">
                <p className="ns-display font-bold text-white text-lg">
                  Newsletter
                </p>
                <p className="ns-mono text-[#3a5a3a] text-xs mt-1 tracking-wide">
                  Novedades directamente a tu inbox
                </p>
              </div>

              <form
                className="flex flex-col sm:flex-row gap-3 flex-1 max-w-xl"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="email"
                  placeholder="tu@email.com"
                  className="ns-input ns-mono flex-1 bg-white/[0.03] border border-white/[0.08] text-white placeholder-[#2a4a2a] text-xs tracking-wide px-4 py-3 focus:outline-none focus:border-[#39FF14]/30 transition-colors"
                />
                <button
                  type="submit"
                  className="ns-display ns-cta-btn font-bold text-black text-xs tracking-[0.25em] uppercase px-7 py-3 whitespace-nowrap"
                  style={{ background: "#39FF14" }}
                >
                  Suscribirme
                </button>
              </form>

              <div className="flex-shrink-0">
                <Link href="/noticias">
                  <button
                    className="ns-mono text-[#39FF14]/50 text-[11px] tracking-[0.25em] uppercase hover:text-[#39FF14] transition-colors flex items-center gap-2"
                  >
                    Ver todas
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </Link>
              </div>

            </div>
          </div>

        </div>
      </section>
    </>
  );
}
