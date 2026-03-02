"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { XCircle, ArrowLeft, RefreshCw } from "lucide-react";
import { Footer } from "@/app/components/footer";

export default function CheckoutFailurePage() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("external_reference");

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Space+Mono:wght@400;700&display=swap');
        .fl-display { font-family: 'Syne', sans-serif; }
        .fl-mono    { font-family: 'Space Mono', monospace; }
        .fl-cta {
          clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px));
          transition: opacity 0.2s ease;
        }
        .fl-cta:hover { opacity: 0.85; }
      `}</style>

      <div className="min-h-screen bg-[#050a05]">
        <div className="max-w-3xl mx-auto px-6 pt-32 pb-20">

          <div className="flex items-center gap-3 mb-10">
            <div className="h-px w-6 bg-red-500/60" />
            <span className="fl-mono text-[10px] text-red-500/50 tracking-[0.35em] uppercase">
              Pago rechazado
            </span>
          </div>

          <div className="flex items-start gap-6 mb-8">
            <div
              className="flex-shrink-0 w-14 h-14 flex items-center justify-center"
              style={{
                background: "rgba(239,68,68,0.08)",
                border: "1px solid rgba(239,68,68,0.2)",
                clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%)",
              }}
            >
              <XCircle className="w-6 h-6 text-red-500/70" />
            </div>
            <div>
              <h1
                className="fl-display font-black text-white leading-[0.9] tracking-tight mb-2"
                style={{ fontSize: "clamp(36px, 5.5vw, 64px)" }}
              >
                Pago no<br />
                <span className="text-red-400/80">procesado</span>
              </h1>
              <p className="fl-mono text-[#7a9a7a] text-[13px] leading-relaxed max-w-md">
                El pago no pudo completarse. Tu carrito sigue guardado. Podés intentar de nuevo con otro método de pago.
              </p>
            </div>
          </div>

          {orderNumber && (
            <div className="fl-mono text-[10px] text-[#3a5a3a] tracking-wide mb-8">
              Referencia: {orderNumber}
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/cart/checkout">
              <button
                className="fl-cta fl-display font-black text-black text-[11px] tracking-[0.2em] uppercase px-8 py-4 flex items-center gap-2"
                style={{ background: "#39FF14" }}
              >
                <RefreshCw className="w-4 h-4" />
                Intentar de nuevo
              </button>
            </Link>
            <Link href="/cart">
              <button
                className="fl-cta fl-mono text-white/50 text-[10px] tracking-widest uppercase px-8 py-4 flex items-center gap-2"
                style={{ border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <ArrowLeft className="w-3 h-3" />
                Volver al carrito
              </button>
            </Link>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}
