'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Instagram, ArrowUpRight, ArrowUp, Mail } from "lucide-react";
import { toast } from "sonner";
import { useAuthStore } from "@/store/auth-store";

const navLinks = [
  { label: "Genéticas",  href: "/genetics" },
  { label: "Guía",       href: "/guia" },
  { label: "Contacto",   href: "/contacto" },
  { label: "Noticias",   href: "/#noticias" },
];

const legalLinks = [
  { label: "Privacidad", href: "#" },
  { label: "Términos",   href: "#" },
];

export function Footer() {
  const router = useRouter();
  const { session } = useAuthStore();

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const handleCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!session) {
      toast.error("Debes iniciar sesión", {
        description: "Por favor inicia sesión para acceder al carrito de compras",
        duration: 4000,
      });
      return;
    }
    router.push("/cart");
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Space+Mono:wght@400;700&display=swap');
        .ft-display { font-family: 'Syne', sans-serif; }
        .ft-mono    { font-family: 'Space Mono', monospace; }
        .ft-link { transition: color 0.2s ease; }
        .ft-link:hover { color: #39FF14; }
        .ft-input {
          clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%);
        }
        .ft-btn {
          clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px));
          transition: opacity 0.2s ease, transform 0.2s ease;
        }
        .ft-btn:hover { opacity: 0.88; transform: scale(1.02); }
        .ft-top-btn {
          clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%);
          transition: background 0.25s ease, transform 0.25s ease;
        }
        .ft-top-btn:hover { background: rgba(57,255,20,0.15) !important; transform: translateY(-2px); }
      `}</style>

      <footer className="bg-[#050a05] text-white border-t border-white/[0.08]">

        {/* ── Top band: brand statement ── */}
        <div className="border-b border-white/[0.08]">
          <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div>
              <div
                className="ft-display font-black leading-none tracking-tight text-white mb-3"
                style={{ fontSize: "clamp(32px, 5vw, 64px)" }}
              >
                Chex{" "}
                <span style={{ color: "#39FF14" }}>Seeds</span>
                <span style={{ color: "rgba(255,255,255,0.15)" }}>.</span>
              </div>
              <p className="ft-mono text-[#3a5a3a] text-xs tracking-wide">
                Empujando límites culturales desde 2014 — Buenos Aires, Argentina
              </p>
            </div>

            {/* Back to top */}
            <button
              onClick={scrollToTop}
              className="ft-top-btn self-start lg:self-end inline-flex items-center gap-2 border border-white/[0.08] px-5 py-3"
              style={{ background: "rgba(255,255,255,0.02)" }}
              aria-label="Volver arriba"
            >
              <ArrowUp className="w-3.5 h-3.5" style={{ color: "#39FF14" }} />
              <span className="ft-mono text-[10px] tracking-[0.25em] uppercase text-[#3a5a3a]">
                Volver arriba
              </span>
            </button>
          </div>
        </div>

        {/* ── Main grid ── */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-b border-white/[0.08]">

            {/* Col 1 — About */}
            <div className="py-12 md:pr-12 md:border-r border-white/[0.08]">
              <span className="ft-mono text-[10px] text-[#39FF14]/40 tracking-[0.3em] uppercase block mb-5">
                Nosotros
              </span>
              <p className="ft-mono text-[#3a5a3a] text-[11px] leading-relaxed mb-6">
                Desarrollamos y producimos semillas fotoperiódicas regulares con 90% de probabilidad de feminización. Cada genética cuenta con trazabilidad real y libre de plagas.
              </p>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="ft-link inline-flex items-center gap-2 text-[#3a5a3a] ft-mono text-[11px] tracking-wide"
              >
                <Instagram className="w-3.5 h-3.5" />
                Instagram
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>

            {/* Col 2 — Links */}
            <div className="py-12 md:px-12 md:border-r border-white/[0.08] border-t md:border-t-0">
              <span className="ft-mono text-[10px] text-[#39FF14]/40 tracking-[0.3em] uppercase block mb-5">
                Navegación
              </span>
              <nav className="space-y-3">
                {navLinks.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="ft-link ft-display font-semibold text-[#7a9a7a] text-sm flex items-center justify-between group"
                  >
                    {l.label}
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "#39FF14" }} />
                  </Link>
                ))}
                <a
                  href="/cart"
                  onClick={handleCartClick}
                  className="ft-link ft-display font-semibold text-[#7a9a7a] text-sm flex items-center justify-between group cursor-pointer"
                >
                  Carrito
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "#39FF14" }} />
                </a>
              </nav>
            </div>

            {/* Col 3 — Newsletter */}
            <div className="py-12 md:pl-12 border-t md:border-t-0">
              <span className="ft-mono text-[10px] text-[#39FF14]/40 tracking-[0.3em] uppercase block mb-5">
                Newsletter
              </span>
              <p className="ft-mono text-[#3a5a3a] text-[11px] leading-relaxed mb-5">
                Novedades, lanzamientos y ofertas exclusivas directamente a tu inbox.
              </p>
              <form
                className="space-y-3"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="email"
                  placeholder="tu@email.com"
                  className="ft-input ft-mono w-full bg-white/[0.03] border border-white/[0.08] text-white placeholder-[#2a4a2a] text-xs tracking-wide px-4 py-3 focus:outline-none focus:border-[#39FF14]/30 transition-colors"
                />
                <button
                  type="submit"
                  className="ft-btn ft-mono font-bold text-black text-[10px] tracking-[0.25em] uppercase px-6 py-3 flex items-center gap-2"
                  style={{ background: "#39FF14" }}
                >
                  <Mail className="w-3.5 h-3.5" />
                  Suscribirse
                </button>
              </form>
            </div>
          </div>

          {/* ── Bottom bar ── */}
          <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="ft-mono text-[#2a4a2a] text-[10px] tracking-wide">
              © 2025 Chex Seeds. Todos los derechos reservados.
            </span>
            <div className="flex items-center gap-6">
              {legalLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="ft-link ft-mono text-[#2a4a2a] text-[10px] tracking-wide"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
