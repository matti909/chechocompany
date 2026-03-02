'use client';

import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { RadarChart } from "@/components/charts";
import useCartStore from "@/store/cart-store";
import { useSession } from "@/lib/auth-client";
import { gsap } from "gsap";
import { useTransitionStore } from "@/store/transition-store";

export interface GeneticsData {
  name: string;
  subtitle: string;
  description: string;
  genetics: string;
  composition: string;
  thc: string;
  cbd: string;
  floweringIndoor: string;
  difficulty: string;
  smell: string;
  flavor: string;
  harvestTime: string;
  medicalUse: string[];
  flavorProfile: string[];
  effectsData: {
    cerebral: number;
    body: number;
    euphoric: number;
    relaxing: number;
    creative: number;
  };
  flavorsData: {
    sweet: number;
    fruity: number;
    earthy: number;
    spicy: number;
    floral: number;
  };
  prices: {
    pack6: number;
    pack12: number;
    pack25: number;
    pack50: number;
    pack100: number;
  };
  color: string;
  icon: React.ComponentType<{ className?: string }> | null;
  image?: string;
  awards?: string[];
  features?: string[];
}

interface GeneticsClientProps {
  genetics: GeneticsData;
}

function buildBulkPricing(prices: GeneticsData['prices']) {
  return [
    { quantity: 6,   price: prices.pack6 },
    { quantity: 12,  price: prices.pack12 },
    { quantity: 25,  price: prices.pack25 },
    { quantity: 50,  price: prices.pack50 },
    { quantity: 100, price: prices.pack100 },
  ];
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

const colorAccents: Record<string, string> = {
  pink:    '#f472b6',
  emerald: '#34d399',
  blue:    '#fb923c',
  orange:  '#fb923c',
  purple:  '#c084fc',
  cyan:    '#22d3ee',
};

export function GeneticsClient({ genetics }: GeneticsClientProps) {
  const bulkPricing = buildBulkPricing(genetics.prices);
  const [selectedQuantity, setSelectedQuantity] = useState(bulkPricing[0]);
  const router = useRouter();
  const { addItem } = useCartStore();
  const { data: session } = useSession();
  const infoRef = useRef<HTMLDivElement>(null);
  const imageColRef = useRef<HTMLDivElement>(null);

  const accent     = colorAccents[genetics.color] ?? '#39FF14';
  const type       = getType(genetics.composition);
  const typeAccent = TYPE_ACCENTS[type];

  const { rect: cardRect, reset } = useTransitionStore();

  // FLIP: animate hero image column from card rect → natural position
  useLayoutEffect(() => {
    const el = imageColRef.current;
    if (!el || !cardRect) return;

    const colRect = el.getBoundingClientRect();
    const scaleX = cardRect.width / colRect.width;
    const scaleY = cardRect.height / colRect.height;
    const dx = (cardRect.left + cardRect.width / 2) - (colRect.left + colRect.width / 2);
    const dy = (cardRect.top + cardRect.height / 2) - (colRect.top + colRect.height / 2);

    gsap.set(el, { x: dx, y: dy, scaleX, scaleY, transformOrigin: "center center", zIndex: 2 });
    gsap.to(el, {
      x: 0,
      y: 0,
      scaleX: 1,
      scaleY: 1,
      duration: 0.6,
      ease: "power3.inOut",
      onComplete: () => {
        gsap.set(el, { clearProps: "all" });
        reset();
      },
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (infoRef.current) {
      gsap.fromTo(
        Array.from(infoRef.current.children),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.65, stagger: 0.09, ease: 'power3.out', delay: 0.15 }
      );
    }
  }, []);

  const handleAddToCart = () => {
    addItem({
      id: genetics.name.toLowerCase().replace(/\s+/g, '-'),
      name: genetics.name,
      subtitle: genetics.subtitle,
      price: selectedQuantity.price,
      originalPrice: `$${selectedQuantity.price.toLocaleString('es-AR')}`,
      color: genetics.color,
      thc: genetics.thc,
      flowering: genetics.floweringIndoor,
      genotype: genetics.composition,
      image: genetics.image,
    });
    toast.success("Agregado al carrito", { duration: 2000 });
  };

  const handleBuyNow = () => {
    if (!session) {
      toast.error("Debes iniciar sesión", {
        description: "Por favor inicia sesión para realizar tu compra",
        duration: 4000,
      });
      return;
    }
    handleAddToCart();
    router.push('/cart');
  };

  const effectsData = [
    { label: 'Cerebral',  value: genetics.effectsData.cerebral,  maxValue: 100 },
    { label: 'Corporal',  value: genetics.effectsData.body,       maxValue: 100 },
    { label: 'Eufórico',  value: genetics.effectsData.euphoric,   maxValue: 100 },
    { label: 'Relajante', value: genetics.effectsData.relaxing,   maxValue: 100 },
    { label: 'Creativo',  value: genetics.effectsData.creative,   maxValue: 100 },
  ];

  const flavorsData = [
    { label: 'Dulce',   value: genetics.flavorsData.sweet,  maxValue: 100 },
    { label: 'Frutal',  value: genetics.flavorsData.fruity, maxValue: 100 },
    { label: 'Terroso', value: genetics.flavorsData.earthy, maxValue: 100 },
    { label: 'Picante', value: genetics.flavorsData.spicy,  maxValue: 100 },
    { label: 'Floral',  value: genetics.flavorsData.floral, maxValue: 100 },
  ];

  const specs = [
    { label: 'Genética',     value: genetics.genetics },
    { label: 'Composición',  value: genetics.composition },
    { label: 'THC',          value: genetics.thc },
    { label: 'CBD',          value: genetics.cbd },
    { label: 'Floración',    value: genetics.floweringIndoor },
    { label: 'Dificultad',   value: genetics.difficulty },
    { label: 'Aroma',        value: genetics.smell },
    { label: 'Cosecha',      value: genetics.harvestTime },
    { label: 'Sabor',        value: genetics.flavor },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Space+Mono:wght@400;700&display=swap');
        .gd-display { font-family: 'Syne', sans-serif; }
        .gd-mono    { font-family: 'Space Mono', monospace; }

        .gd-pack-btn {
          clip-path: polygon(0 0, calc(100% - 7px) 0, 100% 7px, 100% 100%, 7px 100%, 0 calc(100% - 7px));
          transition: background 0.18s ease, color 0.18s ease, border-color 0.18s ease;
        }
        .gd-pack-btn:hover:not(.gd-pack-active) {
          color: rgba(255,255,255,0.7) !important;
          border-color: rgba(255,255,255,0.2) !important;
        }
        .gd-cta {
          clip-path: polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px));
          transition: opacity 0.22s ease, transform 0.22s ease;
        }
        .gd-cta:hover  { opacity: 0.88; transform: scale(1.02); }
        .gd-cta:active { transform: scale(0.98); }
        .gd-sec {
          clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%);
          transition: opacity 0.2s ease;
        }
        .gd-sec:hover { opacity: 0.7; }
        .gd-type {
          clip-path: polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 0 100%);
        }
        .gd-thc {
          clip-path: polygon(0 0, calc(100% - 7px) 0, 100% 7px, 100% 100%, 0 100%);
        }
        .gd-tag {
          clip-path: polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 0 100%);
        }
        .gd-nav-cta {
          clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px));
          transition: opacity 0.2s ease;
        }
        .gd-nav-cta:hover { opacity: 0.88; }
      `}</style>

      <div className="w-full min-h-screen bg-[#050a05]">

        {/* ── STICKY SUBHEADER ── */}
        <div className="sticky top-[80px] z-30 border-b border-white/[0.08] bg-[#050a05]/95 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between gap-4 py-3">

              {/* Breadcrumb */}
              <div className="flex items-center gap-2.5">
                <Link
                  href="/genetics"
                  className="gd-mono text-[10px] text-[#3a5a3a] hover:text-[#7a9a7a] tracking-widest uppercase transition-colors flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3 h-3" />
                  Genéticas
                </Link>
                <span className="text-white/10 gd-mono text-[10px]">/</span>
                <span className="gd-mono text-[10px] text-[#39FF14]/40 tracking-widest uppercase truncate max-w-[160px]">
                  {genetics.name}
                </span>
              </div>

              {/* Sticky price + buy */}
              <div className="flex items-center gap-4">
                <div className="text-right hidden sm:block">
                  <div className="gd-mono text-[9px] text-[#3a5a3a] tracking-widest">
                    Pack x{selectedQuantity.quantity}
                  </div>
                  <div className="gd-display font-black text-white text-base leading-none">
                    ${selectedQuantity.price.toLocaleString('es-AR')}
                  </div>
                </div>
                <button
                  onClick={handleBuyNow}
                  className="gd-nav-cta gd-display font-bold text-black text-[10px] tracking-[0.2em] uppercase px-5 py-2.5"
                  style={{ background: '#39FF14' }}
                >
                  Comprar
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── HERO ── */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-[440px_1fr] border-b border-white/[0.08]">

            {/* Image column */}
            <div
              ref={imageColRef}
              className="relative lg:border-r border-white/[0.08] overflow-hidden"
              style={{ minHeight: '520px' }}
            >
              {genetics.image ? (
                <>
                  <Image
                    src={genetics.image}
                    alt={genetics.name}
                    fill
                    className="object-cover object-top"
                    priority
                  />
                  {/* soft bottom fade */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050a05] via-[#050a05]/20 to-transparent" />

                  {/* Badges top-left */}
                  <div className="absolute top-5 left-5 flex flex-col gap-2">
                    <span
                      className="gd-type gd-mono text-[9px] font-bold px-3 py-1.5 tracking-widest uppercase"
                      style={{
                        color: typeAccent,
                        background: `${typeAccent}15`,
                        border: `1px solid ${typeAccent}30`,
                      }}
                    >
                      {type}
                    </span>
                  </div>

                  {/* THC badge top-right */}
                  <div
                    className="gd-thc absolute top-5 right-5 gd-mono text-[9px] font-bold px-3 py-1.5 tracking-wider text-black"
                    style={{ background: '#39FF14' }}
                  >
                    THC {genetics.thc}
                  </div>

                  {/* Specimen marker bottom */}
                  <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                    <span className="gd-mono text-white/15 text-[8px] tracking-[0.3em] uppercase">
                      Chex Seeds Co. — ARG
                    </span>
                    <span className="gd-mono text-white/15 text-[8px] tracking-widest">
                      SPEC-01
                    </span>
                  </div>
                </>
              ) : (
                <div className="absolute inset-0 bg-[#0a0f0a] flex items-center justify-center">
                  <span
                    className="gd-display font-black text-white/[0.04]"
                    style={{ fontSize: '120px' }}
                  >
                    {genetics.name[0]}
                  </span>
                </div>
              )}
            </div>

            {/* Info column */}
            <div ref={infoRef} className="py-10 px-6 lg:px-12 flex flex-col gap-7">

              {/* Label */}
              <div className="flex items-center gap-3">
                <div className="h-px w-6" style={{ background: '#39FF14' }} />
                <span className="gd-mono text-[10px] text-[#39FF14]/50 tracking-[0.35em] uppercase">
                  Colección Premium 2025
                </span>
              </div>

              {/* Title */}
              <div>
                <h1
                  className="gd-display font-black leading-[0.88] tracking-tight text-white uppercase mb-2.5"
                  style={{ fontSize: 'clamp(32px, 4vw, 58px)' }}
                >
                  {genetics.name}
                </h1>
                <p className="gd-mono text-[11px]" style={{ color: accent }}>
                  {genetics.genetics}
                </p>
              </div>

              {/* Key stats — border grid */}
              <div className="grid grid-cols-3 border-t border-l border-white/[0.06]">
                {[
                  { label: 'Composición', value: genetics.composition },
                  { label: 'Floración',   value: genetics.floweringIndoor },
                  { label: 'Dificultad',  value: genetics.difficulty },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="p-4 border-b border-r border-white/[0.06]"
                  >
                    <div className="gd-mono text-[9px] text-[#3a5a3a] tracking-[0.25em] uppercase mb-1.5">
                      {stat.label}
                    </div>
                    <div className="gd-display font-bold text-white text-[11px] leading-tight">
                      {stat.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Pack selector */}
              <div>
                <div className="gd-mono text-[9px] text-[#3a5a3a] tracking-[0.25em] uppercase mb-3">
                  Seleccioná tu pack
                </div>
                <div className="flex flex-wrap gap-2">
                  {bulkPricing.map((option) => {
                    const isActive = selectedQuantity.quantity === option.quantity;
                    return (
                      <button
                        key={option.quantity}
                        onClick={() => setSelectedQuantity(option)}
                        className={`gd-pack-btn gd-mono text-[10px] font-bold tracking-[0.15em] uppercase px-4 py-2.5 ${isActive ? 'gd-pack-active' : ''}`}
                        style={{
                          background: isActive ? '#39FF14' : 'transparent',
                          color:      isActive ? '#000' : 'rgba(255,255,255,0.35)',
                          border:     isActive ? 'none' : '1px solid rgba(255,255,255,0.07)',
                        }}
                      >
                        x{option.quantity}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Price + CTAs */}
              <div>
                <div className="h-px w-full mb-6" style={{ background: `${accent}18` }} />

                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5">
                  {/* Price */}
                  <div>
                    <div className="gd-mono text-[9px] text-[#3a5a3a] tracking-widest mb-1.5">
                      Pack x{selectedQuantity.quantity} — precio total
                    </div>
                    <div
                      className="gd-display font-black leading-none text-white"
                      style={{ fontSize: 'clamp(30px, 3.5vw, 44px)' }}
                    >
                      ${selectedQuantity.price.toLocaleString('es-AR')}
                    </div>
                    <div className="gd-mono text-[9px] text-[#2a4a2a] tracking-wide mt-1.5">
                      + envío a cargo del comprador
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={handleBuyNow}
                      className="gd-cta gd-display font-bold text-black text-[11px] tracking-[0.25em] uppercase px-7 py-4 flex items-center justify-center gap-2"
                      style={{ background: '#39FF14' }}
                    >
                      <ShoppingBag className="w-4 h-4" />
                      Comprar Ahora
                    </button>
                    <button
                      onClick={handleAddToCart}
                      className="gd-sec gd-mono text-[9px] tracking-widest uppercase px-5 py-3 text-center"
                      style={{
                        color:  accent,
                        border: `1px solid ${accent}30`,
                        background: `${accent}08`,
                      }}
                    >
                      Agregar al carrito
                    </button>
                  </div>
                </div>
              </div>

              {/* Regulares notice */}
              <p className="gd-mono text-[9px] text-[#2a4a2a] tracking-wide">
                Semillas regulares — 90% de probabilidad de feminización
              </p>
            </div>
          </div>
        </div>

        {/* ── BODY ── */}
        <div className="max-w-7xl mx-auto px-6">

          {/* Description */}
          <div className="border-b border-white/[0.08] py-12">
            <div className="grid lg:grid-cols-[180px_1fr] gap-6 lg:gap-12">
              <div className="flex items-center gap-2.5">
                <div className="h-px w-4" style={{ background: `${accent}60` }} />
                <span className="gd-mono text-[9px] tracking-[0.3em] uppercase" style={{ color: `${accent}60` }}>
                  Descripción
                </span>
              </div>
              <p className="gd-mono text-[#7a9a7a] text-[13px] leading-relaxed">
                {genetics.description}
              </p>
            </div>
          </div>

          {/* Technical specs */}
          <div className="border-b border-white/[0.08] py-12">
            <div className="grid lg:grid-cols-[180px_1fr] gap-6 lg:gap-12">
              <div className="flex items-start gap-2.5 pt-1">
                <div className="h-px w-4 mt-1.5" style={{ background: `${accent}60` }} />
                <span className="gd-mono text-[9px] tracking-[0.3em] uppercase leading-relaxed" style={{ color: `${accent}60` }}>
                  Especif&shy;icaciones
                </span>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-white/[0.06]">
                {specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="p-5 border-b border-r border-white/[0.06]"
                  >
                    <div className="gd-mono text-[9px] text-[#3a5a3a] tracking-[0.25em] uppercase mb-1.5">
                      {spec.label}
                    </div>
                    <div className="gd-display font-bold text-white text-[12px] leading-snug">
                      {spec.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Charts: Effects + Flavors */}
          <div className="border-b border-white/[0.08] py-12">
            <div className="grid lg:grid-cols-2 gap-0">

              {/* Effects */}
              <div className="pr-0 lg:pr-10 pb-10 lg:pb-0 border-b lg:border-b-0 lg:border-r border-white/[0.08]">
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-px w-5" style={{ background: accent }} />
                  <span className="gd-mono text-[9px] tracking-[0.3em] uppercase" style={{ color: `${accent}70` }}>
                    Perfil de Efectos
                  </span>
                </div>
                <div className="flex justify-center">
                  <RadarChart
                    data={effectsData}
                    size={260}
                    color={genetics.color as 'pink' | 'emerald' | 'blue' | 'purple' | 'orange'}
                    showLabels={true}
                  />
                </div>
              </div>

              {/* Flavors */}
              <div className="pl-0 lg:pl-10 pt-10 lg:pt-0">
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-px w-5" style={{ background: '#c084fc' }} />
                  <span className="gd-mono text-[9px] text-[#c084fc]/70 tracking-[0.3em] uppercase">
                    Perfil de Sabores
                  </span>
                </div>
                <div className="flex justify-center">
                  <RadarChart
                    data={flavorsData}
                    size={260}
                    color="purple"
                    showLabels={true}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Medical uses */}
          {genetics.medicalUse?.length > 0 && (
            <div className="border-b border-white/[0.08] py-12">
              <div className="grid lg:grid-cols-[180px_1fr] gap-6 lg:gap-12">
                <div className="flex items-start gap-2.5 pt-1">
                  <div className="h-px w-4 mt-1.5" style={{ background: `${accent}60` }} />
                  <span className="gd-mono text-[9px] tracking-[0.3em] uppercase leading-relaxed" style={{ color: `${accent}60` }}>
                    Usos Medicinales
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {genetics.medicalUse.map((use) => (
                    <span
                      key={use}
                      className="gd-tag gd-mono text-[10px] tracking-wider px-4 py-2"
                      style={{
                        color:      accent,
                        border:     `1px solid ${accent}28`,
                        background: `${accent}07`,
                      }}
                    >
                      {use}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Flavor profile */}
          {genetics.flavorProfile?.length > 0 && (
            <div className="border-b border-white/[0.08] py-12">
              <div className="grid lg:grid-cols-[180px_1fr] gap-6 lg:gap-12">
                <div className="flex items-center gap-2.5">
                  <div className="h-px w-4" style={{ background: `${accent}60` }} />
                  <span className="gd-mono text-[9px] tracking-[0.3em] uppercase" style={{ color: `${accent}60` }}>
                    Sabores
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {genetics.flavorProfile.map((flavor) => (
                    <span
                      key={flavor}
                      className="gd-tag gd-mono text-[10px] tracking-wider px-4 py-2"
                      style={{
                        color:      'rgba(255,255,255,0.35)',
                        border:     '1px solid rgba(255,255,255,0.07)',
                        background: 'transparent',
                      }}
                    >
                      {flavor}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Features */}
          {genetics.features && genetics.features.length > 0 && (
            <div className="border-b border-white/[0.08] py-12">
              <div className="grid lg:grid-cols-[180px_1fr] gap-6 lg:gap-12">
                <div className="flex items-center gap-2.5">
                  <div className="h-px w-4" style={{ background: `${accent}60` }} />
                  <span className="gd-mono text-[9px] tracking-[0.3em] uppercase" style={{ color: `${accent}60` }}>
                    Características
                  </span>
                </div>
                <div className="space-y-3">
                  {genetics.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3">
                      <div className="w-px h-4 flex-shrink-0" style={{ background: `${accent}50` }} />
                      <span className="gd-mono text-[#7a9a7a] text-[12px] tracking-wide">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Bottom CTA */}
          <div className="py-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <div className="gd-mono text-[9px] text-[#3a5a3a] tracking-widest mb-1.5">
                Pack x{selectedQuantity.quantity} seleccionado
              </div>
              <div
                className="gd-display font-black text-white leading-none"
                style={{ fontSize: 'clamp(26px, 3.5vw, 40px)' }}
              >
                ${selectedQuantity.price.toLocaleString('es-AR')}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Link
                href="/genetics"
                className="gd-mono text-[10px] text-[#3a5a3a] hover:text-[#7a9a7a] tracking-widest uppercase transition-colors flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3 h-3" />
                Catálogo
              </Link>
              <button
                onClick={handleBuyNow}
                className="gd-cta gd-display font-bold text-black text-[11px] tracking-[0.25em] uppercase px-8 py-4 flex items-center gap-2"
                style={{ background: '#39FF14' }}
              >
                <ShoppingBag className="w-4 h-4" />
                Comprar Ahora
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
