"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createPaymentPreference } from "@/lib/mercadopago";
import { Footer } from "../../components/footer";
import useCartStore from "@/store/cart-store";
import { useAuthStore } from "@/store/auth-store";
import { toast } from "sonner";
import {
  ArrowLeft, ArrowRight, User, Mail, Phone, MapPin,
  FileText, CheckCircle, Shield, Truck, Package,
  ShoppingBag, AlertCircle, Clock,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const colorAccents: Record<string, string> = {
  pink:    '#f472b6',
  emerald: '#34d399',
  blue:    '#fb923c',
  orange:  '#fb923c',
  purple:  '#c084fc',
  cyan:    '#22d3ee',
};

export default function CheckoutPage() {
  const router = useRouter();
  const {
    items, totalItems, totalPrice,
    checkout, setCheckoutStep, updateCustomerInfo,
    setSubmitting, completeOrder, resetCheckout,
  } = useCartStore();

  const { session } = useAuthStore();
  const [isClient, setIsClient] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  useEffect(() => { setIsClient(true); resetCheckout(); }, [resetCheckout]);
  useEffect(() => {
    if (isClient && items.length === 0 && !checkout.orderPlaced) router.push("/cart");
  }, [items.length, isClient, router, checkout.orderPlaced]);

  const subtotal   = totalPrice;
  const shipping   = subtotal > 100000 ? 0 : 8000;
  const finalTotal = subtotal + shipping;

  const validateStep1 = () => {
    const errors: Record<string, string> = {};
    const { customerInfo } = checkout;
    if (!customerInfo.fullName.trim())  errors.fullName   = "Requerido";
    if (!customerInfo.email.trim())     errors.email      = "Requerido";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerInfo.email))
                                        errors.email      = "Email inválido";
    if (!customerInfo.phone.trim())     errors.phone      = "Requerido";
    if (!customerInfo.address.trim())   errors.address    = "Requerido";
    if (!customerInfo.city.trim())      errors.city       = "Requerido";
    if (!customerInfo.postalCode.trim()) errors.postalCode = "Requerido";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep1()) setCheckoutStep(2);
  };

  const handleFinalSubmit = async () => {
    setSubmitting(true);
    try {
      const orderNumber = `CHX-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

      toast.loading("Guardando pedido...", { id: "order-processing" });

      // 1. Guardar orden en DB con status pending_payment
      const orderResponse = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerInfo: checkout.customerInfo,
          items,
          subtotal,
          shipping,
          total: finalTotal,
          orderNumber,
          userId: session?.user?.id || null,
          status: "pending_payment",
        }),
      });
      if (!orderResponse.ok) {
        const err = await orderResponse.json();
        throw new Error(err.error || "Error al guardar el pedido");
      }

      toast.loading("Redirigiendo a MercadoPago...", { id: "order-processing" });

      // 2. Crear preferencia de pago en MP y obtener URL
      const paymentUrl = await createPaymentPreference({
        orderNumber,
        customerData: checkout.customerInfo,
        cartItems: items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        })),
        cartTotal: finalTotal,
      });

      if (!paymentUrl) throw new Error("No se pudo obtener la URL de pago");

      // 3. Redirigir a MercadoPago (no limpiar carrito aún — lo hace /checkout/success)
      window.location.href = paymentUrl;

    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Error al procesar el pedido",
        { id: "order-processing" }
      );
      setSubmitting(false);
    }
  };

  if (!isClient) return null;

  /* ── SUCCESS STATE ── */
  if (checkout.orderPlaced) {
    return (
      <>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Space+Mono:wght@400;700&display=swap');
          .ck-display { font-family: 'Syne', sans-serif; }
          .ck-mono    { font-family: 'Space Mono', monospace; }
          .ck-cta {
            clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px));
            transition: opacity 0.2s ease;
          }
          .ck-cta:hover { opacity: 0.85; }
        `}</style>
        <div className="min-h-screen bg-[#050a05]">
          <div className="max-w-4xl mx-auto px-6 pt-32 pb-20">

            <div className="flex items-center gap-3 mb-12">
              <div className="h-px w-6" style={{ background: '#39FF14' }} />
              <span className="ck-mono text-[10px] text-[#39FF14]/50 tracking-[0.35em] uppercase">
                Pedido confirmado
              </span>
            </div>

            <h1 className="ck-display font-black text-white leading-[0.88] tracking-tight mb-4"
                style={{ fontSize: 'clamp(40px, 6vw, 72px)' }}>
              ¡Pedido<br />
              <span style={{ color: '#39FF14' }}>Confirmado!</span>
            </h1>

            <p className="ck-mono text-[#7a9a7a] text-sm leading-relaxed mb-12 max-w-lg">
              Tu pedido fue procesado exitosamente. Recibirás un email de confirmación con todos los detalles y el seguimiento del envío.
            </p>

            <div className="grid md:grid-cols-3 gap-4 mb-12">
              {[
                { icon: Package, label: 'Preparación', detail: '1–2 días hábiles' },
                { icon: Truck,   label: 'Envío',       detail: '3–5 días hábiles' },
                { icon: Shield,  label: 'Garantía',    detail: '98% germinación'  },
              ].map(({ icon: Icon, label, detail }) => (
                <div key={label}
                     className="border border-white/[0.06] p-6"
                     style={{ clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%)' }}>
                  <Icon className="w-5 h-5 mb-3" style={{ color: '#39FF14' }} />
                  <div className="ck-display font-bold text-white text-sm mb-1">{label}</div>
                  <div className="ck-mono text-[10px] text-[#3a5a3a] tracking-wide">{detail}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/genetics">
                <button className="ck-cta ck-display font-black text-black text-[11px] tracking-[0.2em] uppercase px-8 py-4"
                        style={{ background: '#39FF14' }}>
                  Seguir comprando
                </button>
              </Link>
              <Link href="/contacto">
                <button className="ck-cta ck-mono font-bold text-white/60 text-[10px] tracking-widest uppercase px-8 py-4"
                        style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
                  Contactar soporte
                </button>
              </Link>
            </div>
          </div>
          <Footer />
        </div>
      </>
    );
  }

  const inputClass = "w-full px-4 py-3 text-[12px] text-white ck-input";
  const labelClass = "ck-mono text-[9px] tracking-[0.25em] uppercase mb-2 flex items-center gap-2";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Space+Mono:wght@400;700&display=swap');
        .ck-display { font-family: 'Syne', sans-serif; }
        .ck-mono    { font-family: 'Space Mono', monospace; }
        .ck-cta {
          clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px));
          transition: opacity 0.2s ease, transform 0.2s ease;
        }
        .ck-cta:hover  { opacity: 0.88; transform: scale(1.015); }
        .ck-cta:active { transform: scale(0.98); }
        .ck-btn-ghost {
          clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px));
          transition: background 0.2s ease;
        }
        .ck-btn-ghost:hover { background: rgba(255,255,255,0.04) !important; }
        .ck-input {
          background: transparent;
          border: 1px solid rgba(255,255,255,0.08);
          outline: none;
          font-family: 'Space Mono', monospace;
          transition: border-color 0.2s ease;
          clip-path: polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 0 100%);
        }
        .ck-input:focus { border-color: rgba(57,255,20,0.4); }
        .ck-input::placeholder { color: rgba(255,255,255,0.18); }
      `}</style>

      <div className="min-h-screen bg-[#050a05]">

        {/* ── HEADER ── */}
        <div className="border-b border-white/[0.08] pt-28 pb-10">
          <div className="max-w-7xl mx-auto px-6">
            <Link href="/cart"
                  className="ck-mono text-[10px] text-[#3a5a3a] hover:text-[#7a9a7a] tracking-widest uppercase transition-colors flex items-center gap-1.5 w-fit mb-8">
              <ArrowLeft className="w-3 h-3" />
              Volver al carrito
            </Link>

            <div className="flex items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-px w-6" style={{ background: '#39FF14' }} />
                  <span className="ck-mono text-[10px] text-[#39FF14]/50 tracking-[0.35em] uppercase">
                    Finalizar compra
                  </span>
                </div>
                <h1 className="ck-display font-black text-white leading-none tracking-tight"
                    style={{ fontSize: 'clamp(30px, 4.5vw, 56px)' }}>
                  Checkout
                </h1>
              </div>

              {/* Step indicator */}
              <div className="flex items-center gap-3 pb-1">
                {[
                  { n: 1, label: 'Datos' },
                  { n: 2, label: 'Confirmar' },
                ].map(({ n, label }, i) => (
                  <div key={n} className="flex items-center gap-3">
                    {i > 0 && <div className="w-8 h-px bg-white/[0.06]" />}
                    <div className="flex items-center gap-2">
                      <span
                        className="ck-display font-black text-[11px] w-6 h-6 flex items-center justify-center"
                        style={{
                          background: checkout.step === n ? '#39FF14' : 'transparent',
                          color: checkout.step === n ? '#000' : 'rgba(255,255,255,0.2)',
                          border: checkout.step === n ? 'none' : '1px solid rgba(255,255,255,0.08)',
                          clipPath: 'polygon(0 0, calc(100% - 5px) 0, 100% 5px, 100% 100%, 5px 100%, 0 calc(100% - 5px))',
                        }}
                      >
                        {n}
                      </span>
                      <span className={`ck-mono text-[10px] tracking-[0.2em] uppercase hidden sm:block ${checkout.step === n ? 'text-white' : 'text-white/25'}`}>
                        {label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── CHECKOUT CONTENT ── */}
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="grid lg:grid-cols-[1fr_340px] gap-8 items-start">

            {/* ── MAIN AREA ── */}
            <div>
              {checkout.step === 1 ? (

                /* Step 1: Customer info form */
                <form onSubmit={handleStep1Submit}>
                  <div className="border border-white/[0.08]"
                       style={{ clipPath: 'polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 0 100%)' }}>
                    <div className="p-8">
                      <div className="flex items-center gap-3 mb-8">
                        <div className="w-8 h-8 flex items-center justify-center"
                             style={{ background: 'rgba(57,255,20,0.1)', border: '1px solid rgba(57,255,20,0.2)',
                                      clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))' }}>
                          <User className="w-4 h-4" style={{ color: '#39FF14' }} />
                        </div>
                        <div>
                          <div className="ck-display font-bold text-white text-base">Información Personal</div>
                          <div className="ck-mono text-[10px] text-[#3a5a3a] tracking-wide">Completá tus datos para el envío</div>
                        </div>
                      </div>

                      <div className="space-y-5">

                        {/* Full name */}
                        <div>
                          <label className={`${labelClass} text-[#3a5a3a]`}>
                            <User className="w-3 h-3" /> Nombre completo *
                          </label>
                          <input type="text" placeholder="Juan Pérez"
                                 value={checkout.customerInfo.fullName}
                                 onChange={(e) => updateCustomerInfo({ fullName: e.target.value })}
                                 className={inputClass} />
                          {formErrors.fullName && <ErrorMsg msg={formErrors.fullName} />}
                        </div>

                        {/* Email + Phone */}
                        <div className="grid md:grid-cols-2 gap-5">
                          <div>
                            <label className={`${labelClass} text-[#3a5a3a]`}>
                              <Mail className="w-3 h-3" /> Email *
                            </label>
                            <input type="email" placeholder="juan@email.com"
                                   value={checkout.customerInfo.email}
                                   onChange={(e) => updateCustomerInfo({ email: e.target.value })}
                                   className={inputClass} />
                            {formErrors.email && <ErrorMsg msg={formErrors.email} />}
                          </div>
                          <div>
                            <label className={`${labelClass} text-[#3a5a3a]`}>
                              <Phone className="w-3 h-3" /> Teléfono *
                            </label>
                            <input type="tel" placeholder="+54 11 1234-5678"
                                   value={checkout.customerInfo.phone}
                                   onChange={(e) => updateCustomerInfo({ phone: e.target.value })}
                                   className={inputClass} />
                            {formErrors.phone && <ErrorMsg msg={formErrors.phone} />}
                          </div>
                        </div>

                        {/* Address */}
                        <div>
                          <label className={`${labelClass} text-[#3a5a3a]`}>
                            <MapPin className="w-3 h-3" /> Dirección *
                          </label>
                          <input type="text" placeholder="Av. Corrientes 1234"
                                 value={checkout.customerInfo.address}
                                 onChange={(e) => updateCustomerInfo({ address: e.target.value })}
                                 className={inputClass} />
                          {formErrors.address && <ErrorMsg msg={formErrors.address} />}
                        </div>

                        {/* City + Postal */}
                        <div className="grid md:grid-cols-2 gap-5">
                          <div>
                            <label className={`${labelClass} text-[#3a5a3a]`}>Ciudad *</label>
                            <input type="text" placeholder="Buenos Aires"
                                   value={checkout.customerInfo.city}
                                   onChange={(e) => updateCustomerInfo({ city: e.target.value })}
                                   className={inputClass} />
                            {formErrors.city && <ErrorMsg msg={formErrors.city} />}
                          </div>
                          <div>
                            <label className={`${labelClass} text-[#3a5a3a]`}>Código Postal *</label>
                            <input type="text" placeholder="1000"
                                   value={checkout.customerInfo.postalCode}
                                   onChange={(e) => updateCustomerInfo({ postalCode: e.target.value })}
                                   className={inputClass} />
                            {formErrors.postalCode && <ErrorMsg msg={formErrors.postalCode} />}
                          </div>
                        </div>

                        {/* Notes */}
                        <div>
                          <label className={`${labelClass} text-[#3a5a3a]`}>
                            <FileText className="w-3 h-3" /> Notas adicionales
                          </label>
                          <textarea placeholder="Instrucciones especiales..."
                                    rows={3}
                                    value={checkout.customerInfo.notes}
                                    onChange={(e) => updateCustomerInfo({ notes: e.target.value })}
                                    className={`${inputClass} resize-none`} />
                        </div>

                        <button type="submit"
                                className="ck-cta ck-display font-black text-black text-[11px] tracking-[0.2em] uppercase w-full py-4 flex items-center justify-center gap-2"
                                style={{ background: '#39FF14' }}>
                          <ArrowRight className="w-4 h-4" />
                          Continuar al resumen
                        </button>
                      </div>
                    </div>
                  </div>
                </form>

              ) : (

                /* Step 2: Review */
                <div className="space-y-5">

                  {/* Customer info review */}
                  <div className="border border-white/[0.08]"
                       style={{ clipPath: 'polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 0 100%)' }}>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-5">
                        <div className="ck-mono text-[9px] text-[#39FF14]/50 tracking-[0.3em] uppercase">
                          Datos de envío
                        </div>
                        <button
                          onClick={() => setCheckoutStep(1)}
                          className="ck-btn-ghost ck-mono text-[10px] text-white/40 hover:text-white tracking-widest uppercase px-4 py-2 transition-colors"
                          style={{ border: '1px solid rgba(255,255,255,0.06)' }}
                        >
                          Editar
                        </button>
                      </div>

                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-white/[0.06]">
                        {[
                          { label: 'Nombre',    value: checkout.customerInfo.fullName },
                          { label: 'Email',     value: checkout.customerInfo.email },
                          { label: 'Teléfono',  value: checkout.customerInfo.phone },
                          { label: 'Ciudad',    value: checkout.customerInfo.city },
                          { label: 'Dirección', value: `${checkout.customerInfo.address}, CP ${checkout.customerInfo.postalCode}` },
                          ...(checkout.customerInfo.notes ? [{ label: 'Notas', value: checkout.customerInfo.notes }] : []),
                        ].map(({ label, value }) => (
                          <div key={label} className="p-4 border-b border-r border-white/[0.06]">
                            <div className="ck-mono text-[9px] text-[#3a5a3a] tracking-[0.2em] uppercase mb-1">{label}</div>
                            <div className="ck-display font-bold text-white text-[12px]">{value}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Products review */}
                  <div className="border border-white/[0.08]"
                       style={{ clipPath: 'polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 0 100%)' }}>
                    <div className="p-6">
                      <div className="ck-mono text-[9px] text-[#39FF14]/50 tracking-[0.3em] uppercase mb-5">
                        Productos en el pedido
                      </div>
                      <div className="border-t border-white/[0.06]">
                        {items.map((item) => {
                          const accent = colorAccents[item.color] ?? '#39FF14';
                          return (
                            <div key={item.id} className="flex items-center gap-4 py-4 border-b border-white/[0.05] last:border-b-0">
                              <div className="w-12 h-12 flex-shrink-0 overflow-hidden"
                                   style={{ clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 0 100%)' }}>
                                {item.image ? (
                                  <Image src={item.image} alt={item.name} width={48} height={48}
                                         className="object-cover w-full h-full" />
                                ) : (
                                  <div className="w-full h-full bg-white/[0.03] flex items-center justify-center">
                                    <ShoppingBag className="w-5 h-5 text-white/20" />
                                  </div>
                                )}
                              </div>
                              <div className="flex-1">
                                <div className="ck-display font-bold text-white text-sm">{item.name}</div>
                                <div className="ck-mono text-[10px] mt-0.5" style={{ color: accent }}>{item.subtitle}</div>
                              </div>
                              <div className="text-right">
                                <div className="ck-display font-black text-white text-base">
                                  ${(item.price * item.quantity).toLocaleString('es-AR')}
                                </div>
                                <div className="ck-mono text-[10px] text-[#3a5a3a]">
                                  {item.quantity}× ${item.price.toLocaleString('es-AR')}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* ── ORDER SUMMARY SIDEBAR ── */}
            <div className="flex flex-col gap-5 lg:sticky lg:top-[100px]">
              <div className="border border-white/[0.08]"
                   style={{ clipPath: 'polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 0 100%)' }}>
                <div className="p-6">
                  <div className="ck-mono text-[9px] text-[#39FF14]/50 tracking-[0.3em] uppercase mb-5">
                    Resumen — {totalItems} prod.
                  </div>

                  {/* Mini items */}
                  <div className="space-y-3 mb-5">
                    {items.slice(0, 3).map((item) => (
                      <div key={item.id} className="flex items-center gap-3">
                        <div className="w-10 h-10 flex-shrink-0 overflow-hidden"
                             style={{ clipPath: 'polygon(0 0, calc(100% - 5px) 0, 100% 5px, 100% 100%, 0 100%)' }}>
                          {item.image ? (
                            <Image src={item.image} alt={item.name} width={40} height={40}
                                   className="object-cover w-full h-full" />
                          ) : (
                            <div className="w-full h-full bg-white/[0.03]" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="ck-display font-bold text-white text-[11px] truncate">{item.name}</div>
                          <div className="ck-mono text-[9px] text-[#3a5a3a]">×{item.quantity}</div>
                        </div>
                        <div className="ck-mono text-[11px] text-white">${item.price.toLocaleString('es-AR')}</div>
                      </div>
                    ))}
                    {items.length > 3 && (
                      <div className="ck-mono text-[10px] text-[#3a5a3a] text-center">
                        +{items.length - 3} más
                      </div>
                    )}
                  </div>

                  <div className="h-px bg-white/[0.06] mb-4" />

                  <div className="space-y-2.5 mb-5">
                    <div className="flex justify-between">
                      <span className="ck-mono text-[11px] text-[#3a5a3a]">Subtotal</span>
                      <span className="ck-mono text-[11px] text-white">${subtotal.toLocaleString('es-AR')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="ck-mono text-[11px] text-[#3a5a3a]">Envío</span>
                      <span className={`ck-mono text-[11px] ${shipping === 0 ? 'text-[#39FF14]' : 'text-white'}`}>
                        {shipping === 0 ? 'Gratis' : `$${shipping.toLocaleString('es-AR')}`}
                      </span>
                    </div>
                  </div>

                  <div className="h-px bg-white/[0.06] mb-4" />

                  <div className="flex justify-between items-baseline mb-6">
                    <span className="ck-mono text-[10px] text-[#3a5a3a] tracking-widest uppercase">Total</span>
                    <span className="ck-display font-black text-white text-2xl">
                      ${finalTotal.toLocaleString('es-AR')}
                    </span>
                  </div>

                  {checkout.step === 2 && (
                    <button
                      onClick={handleFinalSubmit}
                      disabled={checkout.isSubmitting}
                      className="ck-cta ck-display font-black text-black text-[11px] tracking-[0.2em] uppercase w-full py-4 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{ background: '#39FF14' }}
                    >
                      {checkout.isSubmitting ? (
                        <><Clock className="w-4 h-4 animate-spin" /> Procesando...</>
                      ) : (
                        <><CheckCircle className="w-4 h-4" /> Finalizar compra</>
                      )}
                    </button>
                  )}
                </div>
              </div>

              {/* Trust signals */}
              <div className="space-y-3 px-1">
                {[
                  { icon: Shield,       text: 'Pago 100% seguro' },
                  { icon: Truck,        text: 'Envío discreto y seguro' },
                  { icon: CheckCircle,  text: 'Garantía de germinación 98%' },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2.5">
                    <Icon className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#39FF14' }} />
                    <span className="ck-mono text-[10px] text-[#3a5a3a] tracking-wide">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}

function ErrorMsg({ msg }: { msg: string }) {
  return (
    <div className="flex items-center gap-1.5 mt-1.5" style={{ fontFamily: "'Space Mono', monospace" }}>
      <AlertCircle className="w-3 h-3 text-red-400/70 flex-shrink-0" />
      <span className="text-[10px] text-red-400/70 tracking-wide">{msg}</span>
    </div>
  );
}
