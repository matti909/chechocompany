"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle, Package, Truck, Shield, ArrowRight } from "lucide-react";
import useCartStore from "@/store/cart-store";
import { Footer } from "@/app/components/footer";

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("external_reference");
  const paymentId = searchParams.get("payment_id");

  const { clearCart, resetCheckout } = useCartStore();

  // Limpiar carrito una sola vez al llegar acá
  useEffect(() => {
    clearCart();
    resetCheckout();
  }, [clearCart, resetCheckout]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Space+Mono:wght@400;700&display=swap');
        .sc-display { font-family: 'Syne', sans-serif; }
        .sc-mono    { font-family: 'Space Mono', monospace; }
        .sc-cta {
          clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px));
          transition: opacity 0.2s ease;
        }
        .sc-cta:hover { opacity: 0.85; }
        .sc-card {
          clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%);
        }
      `}</style>

      <div className="min-h-screen bg-[#050a05]">
        <div className="max-w-3xl mx-auto px-6 pt-32 pb-20">

          {/* Label */}
          <div className="flex items-center gap-3 mb-10">
            <div className="h-px w-6" style={{ background: "#39FF14" }} />
            <span className="sc-mono text-[10px] text-[#39FF14]/50 tracking-[0.35em] uppercase">
              Pago confirmado
            </span>
          </div>

          {/* Icon + Title */}
          <div className="flex items-start gap-6 mb-8">
            <div
              className="sc-card flex-shrink-0 w-14 h-14 flex items-center justify-center"
              style={{ background: "rgba(57,255,20,0.1)", border: "1px solid rgba(57,255,20,0.2)" }}
            >
              <CheckCircle className="w-6 h-6" style={{ color: "#39FF14" }} />
            </div>
            <div>
              <h1
                className="sc-display font-black text-white leading-[0.9] tracking-tight mb-2"
                style={{ fontSize: "clamp(36px, 5.5vw, 64px)" }}
              >
                ¡Pago<br />
                <span style={{ color: "#39FF14" }}>Aprobado!</span>
              </h1>
              <p className="sc-mono text-[#7a9a7a] text-[13px] leading-relaxed">
                Tu pedido fue procesado exitosamente. Te enviamos un email con todos los detalles.
              </p>
            </div>
          </div>

          {/* Order info */}
          {orderNumber && (
            <div
              className="border border-white/[0.06] mb-8"
              style={{ clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%)" }}
            >
              <div className="grid sm:grid-cols-2 border-t border-l border-white/[0.06]">
                <div className="p-5 border-b border-r border-white/[0.06]">
                  <div className="sc-mono text-[9px] text-[#3a5a3a] tracking-[0.25em] uppercase mb-1.5">
                    Nº de pedido
                  </div>
                  <div className="sc-display font-bold text-white text-sm">{orderNumber}</div>
                </div>
                {paymentId && (
                  <div className="p-5 border-b border-r border-white/[0.06]">
                    <div className="sc-mono text-[9px] text-[#3a5a3a] tracking-[0.25em] uppercase mb-1.5">
                      ID de pago
                    </div>
                    <div className="sc-mono text-[#39FF14]/60 text-[11px]">{paymentId}</div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Timeline */}
          <div className="grid sm:grid-cols-3 gap-4 mb-10">
            {[
              { icon: Package, label: "Preparación", detail: "1–2 días hábiles" },
              { icon: Truck,   label: "Envío",       detail: "3–5 días hábiles" },
              { icon: Shield,  label: "Garantía",    detail: "98% germinación"  },
            ].map(({ icon: Icon, label, detail }) => (
              <div
                key={label}
                className="sc-card border border-white/[0.06] p-5"
              >
                <Icon className="w-4 h-4 mb-3" style={{ color: "#39FF14" }} />
                <div className="sc-display font-bold text-white text-sm mb-1">{label}</div>
                <div className="sc-mono text-[10px] text-[#3a5a3a] tracking-wide">{detail}</div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/genetics">
              <button
                className="sc-cta sc-display font-black text-black text-[11px] tracking-[0.2em] uppercase px-8 py-4 flex items-center gap-2"
                style={{ background: "#39FF14" }}
              >
                Seguir comprando
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
            <Link href="/contacto">
              <button
                className="sc-cta sc-mono text-white/50 text-[10px] tracking-widest uppercase px-8 py-4"
                style={{ border: "1px solid rgba(255,255,255,0.08)" }}
              >
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
