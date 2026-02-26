'use client';

import { useEffect, useState } from 'react';
import { Footer } from '../components/footer';
import useCartStore from '@/store/cart-store';
import { ShoppingBag, Plus, Minus, Trash2, ArrowLeft, Truck, Shield, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const colorAccents: Record<string, string> = {
  pink:    '#f472b6',
  emerald: '#34d399',
  blue:    '#fb923c',
  orange:  '#fb923c',
  purple:  '#c084fc',
  cyan:    '#22d3ee',
};

export default function CartPage() {
  const { items, totalItems, totalPrice, updateQuantity, removeItem, clearCart } = useCartStore();

  const [isClient,   setIsClient]   = useState(false);
  const [promoCode,  setPromoCode]  = useState('');
  const [discount,   setDiscount]   = useState(0);
  const [promoMsg,   setPromoMsg]   = useState('');

  useEffect(() => { setIsClient(true); }, []);

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === 'chex10') {
      setDiscount(0.1); setPromoMsg('10% de descuento aplicado');
    } else if (promoCode.toLowerCase() === 'primera20') {
      setDiscount(0.2); setPromoMsg('20% de descuento aplicado');
    } else {
      setDiscount(0); setPromoMsg('Código inválido');
    }
  };

  const subtotal       = totalPrice;
  const discountAmount = subtotal * discount;
  const shipping       = subtotal > 100000 ? 0 : 8000;
  const finalTotal     = subtotal - discountAmount + shipping;

  if (!isClient) return null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Space+Mono:wght@400;700&display=swap');
        .ct-display { font-family: 'Syne', sans-serif; }
        .ct-mono    { font-family: 'Space Mono', monospace; }
        .ct-cta {
          clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px));
          transition: opacity 0.2s ease, transform 0.2s ease;
        }
        .ct-cta:hover  { opacity: 0.88; transform: scale(1.015); }
        .ct-cta:active { transform: scale(0.98); }
        .ct-btn {
          clip-path: polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px));
          transition: background 0.18s ease, border-color 0.18s ease;
        }
        .ct-input {
          background: transparent;
          border: 1px solid rgba(255,255,255,0.08);
          color: white;
          outline: none;
          transition: border-color 0.2s ease;
          font-family: 'Space Mono', monospace;
        }
        .ct-input:focus { border-color: rgba(57,255,20,0.4); }
        .ct-input::placeholder { color: rgba(255,255,255,0.2); }
      `}</style>

      <div className="min-h-screen bg-[#050a05]">

        {/* ── PAGE HEADER ── */}
        <div className="border-b border-white/[0.08] pt-28 pb-10">
          <div className="max-w-7xl mx-auto px-6">
            <Link href="/genetics" className="ct-mono text-[10px] text-[#3a5a3a] hover:text-[#7a9a7a] tracking-widest uppercase transition-colors flex items-center gap-1.5 w-fit mb-8">
              <ArrowLeft className="w-3 h-3" />
              Continuar comprando
            </Link>

            <div className="flex items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-px w-6" style={{ background: '#39FF14' }} />
                  <span className="ct-mono text-[10px] text-[#39FF14]/50 tracking-[0.35em] uppercase">
                    Resumen de compra
                  </span>
                </div>
                <h1 className="ct-display font-black text-white leading-none tracking-tight"
                    style={{ fontSize: 'clamp(32px, 5vw, 60px)' }}>
                  Tu Carrito
                </h1>
              </div>

              {totalItems > 0 && (
                <div className="flex items-center gap-4 pb-1">
                  <span className="ct-mono text-[10px] text-[#3a5a3a] tracking-widest">
                    {totalItems} {totalItems === 1 ? 'producto' : 'productos'}
                  </span>
                  <button
                    onClick={clearCart}
                    className="ct-mono text-[10px] text-red-400/60 hover:text-red-400 tracking-widest uppercase transition-colors flex items-center gap-1.5"
                  >
                    <Trash2 className="w-3 h-3" />
                    Vaciar
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── CONTENT ── */}
        <div className="max-w-7xl mx-auto px-6 py-10">
          {items.length === 0 ? (

            /* Empty state */
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div
                className="w-20 h-20 flex items-center justify-center mb-8"
                style={{
                  border: '1px solid rgba(255,255,255,0.06)',
                  clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))',
                }}
              >
                <ShoppingBag className="w-8 h-8 text-white/20" />
              </div>
              <h2 className="ct-display font-black text-white text-2xl mb-3">Carrito vacío</h2>
              <p className="ct-mono text-[#3a5a3a] text-[12px] tracking-wide mb-8 max-w-xs">
                Explorá nuestras genéticas premium y encontrá las semillas perfectas para tu cultivo
              </p>
              <Link href="/genetics">
                <button
                  className="ct-cta ct-display font-black text-black text-[11px] tracking-[0.2em] uppercase px-8 py-4"
                  style={{ background: '#39FF14' }}
                >
                  Explorar Genéticas
                </button>
              </Link>
            </div>

          ) : (

            <div className="grid lg:grid-cols-[1fr_360px] gap-8 items-start">

              {/* ── ITEMS LIST ── */}
              <div className="border-t border-white/[0.08]">
                {items.map((item) => {
                  const accent = colorAccents[item.color] ?? '#39FF14';
                  return (
                    <div key={item.id} className="grid grid-cols-[80px_1fr] gap-5 py-6 border-b border-white/[0.06]">

                      {/* Image */}
                      <div className="w-20 h-20 overflow-hidden flex-shrink-0"
                           style={{ clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%)' }}>
                        {item.image ? (
                          <Image src={item.image} alt={item.name} width={80} height={80}
                                 className="object-cover w-full h-full" />
                        ) : (
                          <div className="w-full h-full bg-white/[0.03] flex items-center justify-center">
                            <ShoppingBag className="w-6 h-6 text-white/20" />
                          </div>
                        )}
                      </div>

                      {/* Info + controls */}
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                        <div>
                          <div className="ct-display font-black text-white text-base leading-tight mb-1">
                            {item.name}
                          </div>
                          <div className="ct-mono text-[10px] mb-2" style={{ color: accent }}>
                            {item.subtitle}
                          </div>
                          <div className="flex gap-4 ct-mono text-[10px] text-[#3a5a3a]">
                            <span>THC {item.thc}</span>
                            <span>{item.genotype}</span>
                          </div>
                        </div>

                        <div className="flex sm:flex-col items-center sm:items-end gap-4 sm:gap-3 flex-shrink-0">
                          {/* Price */}
                          <div className="ct-display font-black text-white text-lg leading-none">
                            ${item.price.toLocaleString('es-AR')}
                          </div>

                          {/* Quantity */}
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="ct-btn w-7 h-7 flex items-center justify-center text-white/50 hover:text-white"
                              style={{ border: '1px solid rgba(255,255,255,0.08)' }}
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="ct-mono text-[12px] text-white w-5 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="ct-btn w-7 h-7 flex items-center justify-center text-white/50 hover:text-white"
                              style={{ border: '1px solid rgba(255,255,255,0.08)' }}
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          {/* Remove */}
                          <button
                            onClick={() => removeItem(item.id)}
                            className="ct-mono text-[9px] text-red-400/40 hover:text-red-400 tracking-widest uppercase transition-colors flex items-center gap-1"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* ── ORDER SUMMARY ── */}
              <div className="flex flex-col gap-5 lg:sticky lg:top-[100px]">

                {/* Totals */}
                <div className="border border-white/[0.08]"
                     style={{ clipPath: 'polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 0 100%)' }}>
                  <div className="p-6">
                    <div className="ct-mono text-[9px] text-[#39FF14]/50 tracking-[0.3em] uppercase mb-5">
                      Resumen del pedido
                    </div>

                    <div className="space-y-3 mb-5">
                      <div className="flex justify-between">
                        <span className="ct-mono text-[11px] text-[#3a5a3a]">
                          Subtotal ({totalItems} prod.)
                        </span>
                        <span className="ct-mono text-[11px] text-white">
                          ${subtotal.toLocaleString('es-AR')}
                        </span>
                      </div>
                      {discount > 0 && (
                        <div className="flex justify-between">
                          <span className="ct-mono text-[11px] text-[#39FF14]/60">
                            Descuento ({(discount * 100).toFixed(0)}%)
                          </span>
                          <span className="ct-mono text-[11px] text-[#39FF14]">
                            −${discountAmount.toLocaleString('es-AR')}
                          </span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="ct-mono text-[11px] text-[#3a5a3a]">Envío</span>
                        <span className={`ct-mono text-[11px] ${shipping === 0 ? 'text-[#39FF14]' : 'text-white'}`}>
                          {shipping === 0 ? 'Gratis' : `$${shipping.toLocaleString('es-AR')}`}
                        </span>
                      </div>
                    </div>

                    <div className="h-px w-full bg-white/[0.06] mb-5" />

                    <div className="flex justify-between items-baseline mb-6">
                      <span className="ct-mono text-[10px] text-[#3a5a3a] tracking-widest uppercase">Total</span>
                      <span className="ct-display font-black text-white text-2xl">
                        ${finalTotal.toLocaleString('es-AR')}
                      </span>
                    </div>

                    <Link href="/cart/checkout">
                      <button
                        className="ct-cta ct-display font-black text-black text-[11px] tracking-[0.2em] uppercase w-full py-4"
                        style={{ background: '#39FF14' }}
                      >
                        Proceder al pago
                      </button>
                    </Link>
                  </div>
                </div>

                {/* Promo code */}
                <div className="border border-white/[0.06] p-5"
                     style={{ clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%)' }}>
                  <div className="ct-mono text-[9px] text-[#3a5a3a] tracking-[0.25em] uppercase mb-3">
                    Código de descuento
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Ej: CHEX10"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="ct-input flex-1 px-3 py-2.5 text-[11px] tracking-wider"
                      style={{ clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 0 100%)' }}
                    />
                    <button
                      onClick={applyPromoCode}
                      className="ct-btn ct-mono text-[10px] font-bold text-black tracking-widest uppercase px-4 py-2.5"
                      style={{ background: '#39FF14', clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))' }}
                    >
                      OK
                    </button>
                  </div>
                  {promoMsg && (
                    <div className={`ct-mono text-[10px] mt-2 tracking-wide ${discount > 0 ? 'text-[#39FF14]' : 'text-red-400/70'}`}>
                      {promoMsg}
                    </div>
                  )}
                </div>

                {/* Benefits */}
                <div className="space-y-3 px-1">
                  {[
                    { icon: Truck,        text: 'Envío gratis en compras +$100.000' },
                    { icon: Shield,       text: 'Garantía de germinación 98%' },
                    { icon: CheckCircle,  text: 'Empaque discreto y seguro' },
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-center gap-2.5">
                      <Icon className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#39FF14' }} />
                      <span className="ct-mono text-[10px] text-[#3a5a3a] tracking-wide">{text}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}
        </div>

        <Footer />
      </div>
    </>
  );
}
