"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Clock, Mail, ArrowRight } from "lucide-react";
import { Footer } from "@/app/components/footer";

export default function CheckoutPendingPage() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("external_reference");

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Space+Mono:wght@400;700&display=swap');
        .pd-display { font-family: 'Syne', sans-serif; }
        .pd-mono    { font-family: 'Space Mono', monospace; }
        .pd-cta {
          clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px));
          transition: opacity 0.2s ease;
        }
        .pd-cta:hover { opacity: 0.85; }
        .pd-card {
          clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%);
        }
      `}</style>

      <div className="min-h-screen bg-[#050a05]">
        <div className="max-w-3xl mx-auto px-6 pt-32 pb-20">

          <div className="flex items-center gap-3 mb-10">
            <div className="h-px w-6" style={{ background: "#fbbf24" }} />
            <span className="pd-mono text-[10px] text-yellow-500/50 tracking-[0.35em] uppercase">
              Pago pendiente
            </span>
          </div>

          <div className="flex items-start gap-6 mb-8">
            <div
              className="pd-card flex-shrink-0 w-14 h-14 flex items-center justify-center"
              style={{ background: "rgba(251,191,36,0.08)", border: "1px solid rgba(251,191,36,0.2)" }}
            >
              <Clock className="w-6 h-6 text-yellow-400/70" />
            </div>
            <div>
              <h1
                className="pd-display font-black text-white leading-[0.9] tracking-tight mb-2"
                style={{ fontSize: "clamp(36px, 5.5vw, 64px)" }}
              >
                Pago en<br />
                <span className="text-yellow-400/80">revisión</span>
              </h1>
              <p className="pd-mono text-[#7a9a7a] text-[13px] leading-relaxed max-w-md">
                Tu pago está siendo procesado por MercadoPago. Te notificaremos por email cuando se confirme.
              </p>
            </div>
          </div>

          {orderNumber && (
            <div
              className="pd-card border border-white/[0.06] p-5 mb-8 inline-block"
            >
              <div className="pd-mono text-[9px] text-[#3a5a3a] tracking-[0.25em] uppercase mb-1.5">
                Nº de pedido
              </div>
              <div className="pd-display font-bold text-white text-sm">{orderNumber}</div>
            </div>
          )}

          <div
            className="pd-card border border-yellow-500/10 p-5 mb-10"
            style={{ background: "rgba(251,191,36,0.03)" }}
          >
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-yellow-400/50 flex-shrink-0" />
              <p className="pd-mono text-[11px] text-[#7a9a7a] leading-relaxed">
                Revisá tu email — te avisaremos cuando el pago sea confirmado. Puede demorar hasta 2 días hábiles.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/genetics">
              <button
                className="pd-cta pd-display font-black text-black text-[11px] tracking-[0.2em] uppercase px-8 py-4 flex items-center gap-2"
                style={{ background: "#39FF14" }}
              >
                Ver catálogo
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
            <Link href="/contacto">
              <button
                className="pd-cta pd-mono text-white/50 text-[10px] tracking-widest uppercase px-8 py-4"
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
