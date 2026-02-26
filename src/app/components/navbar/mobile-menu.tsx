"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingBag, User, LogOut, ArrowUpRight } from "lucide-react";
import { toast } from "sonner";
import { gsap } from "gsap";
import { useAuthStore } from "@/store/auth-store";
import { signOut } from "@/lib/auth-client";
import useCartStore from "@/store/cart-store";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginClick: () => void;
}

const NAV_ITEMS = [
  { name: "Tienda",   href: "/" },
  { name: "Semillas", href: "/genetics" },
  { name: "Guía",     href: "/growing-guide" },
  { name: "Contacto", href: "/contacto" },
  { name: "Blog",     href: "/cultivation-guide" },
];

export function MobileMenu({ isOpen, onClose, onLoginClick }: MobileMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const { session, clearSession } = useAuthStore();
  const { totalItems } = useCartStore();
  const router = useRouter();

  useEffect(() => {
    if (isOpen && menuRef.current) {
      // Container slides in
      gsap.fromTo(
        menuRef.current,
        { opacity: 0, y: -12 },
        { opacity: 1, y: 0, duration: 0.3, ease: "power3.out" }
      );
      // Items stagger in
      const items = menuRef.current.querySelectorAll(".mm-item");
      gsap.fromTo(
        items,
        { opacity: 0, x: -14 },
        { opacity: 1, x: 0, duration: 0.35, stagger: 0.055, ease: "power3.out", delay: 0.08 }
      );
    }
  }, [isOpen]);

  const handleLogout = async () => {
    try {
      await signOut();
      clearSession();
      onClose();
    } catch {
      // silent
    }
  };

  const handleCartClick = () => {
    if (!session) {
      toast.error("Debes iniciar sesión", {
        description: "Por favor inicia sesión para acceder al carrito",
        duration: 4000,
      });
      onClose();
      return;
    }
    onClose();
    router.push("/cart");
  };

  if (!isOpen) return null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Space+Mono:wght@400;700&display=swap');
        .mm-display { font-family: 'Syne', sans-serif; }
        .mm-mono    { font-family: 'Space Mono', monospace; }
        .mm-btn-primary {
          clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px));
          transition: opacity 0.2s ease;
        }
        .mm-btn-primary:hover { opacity: 0.85; }
        .mm-btn-ghost {
          clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px));
          transition: background 0.2s ease;
        }
        .mm-btn-ghost:hover { background: rgba(255,255,255,0.05) !important; }
        .mm-btn-danger {
          clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px));
          transition: background 0.2s ease;
        }
        .mm-btn-danger:hover { background: rgba(239,68,68,0.08) !important; }
      `}</style>

      <div
        ref={menuRef}
        className="lg:hidden absolute top-full left-0 right-0 z-40 border-b border-white/[0.08]"
        style={{ background: "rgba(5,10,5,0.98)", backdropFilter: "blur(20px)" }}
      >
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-6">

          {/* Nav links */}
          <nav className="flex flex-col">
            {NAV_ITEMS.map((item) => (
              <Link key={item.name} href={item.href}>
                <div
                  className="mm-item flex items-center justify-between py-3.5 border-b border-white/[0.05] last:border-b-0 group"
                  onClick={onClose}
                >
                  <span className="mm-mono text-[13px] font-bold text-white/80 tracking-[0.15em] uppercase group-hover:text-white transition-colors duration-150">
                    {item.name}
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-white/20 group-hover:text-[#39FF14] transition-colors duration-150" />
                </div>
              </Link>
            ))}
          </nav>

          {/* User section */}
          <div className="mm-item flex flex-col gap-3 border-t border-white/[0.08] pt-5">
            {session ? (
              <>
                {/* User info */}
                <div
                  className="flex items-center gap-3 p-4 border border-white/[0.06]"
                  style={{ clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%)" }}
                >
                  <div
                    className="w-9 h-9 flex items-center justify-center flex-shrink-0"
                    style={{
                      background: "rgba(57,255,20,0.12)",
                      border: "1px solid rgba(57,255,20,0.2)",
                      clipPath: "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))",
                    }}
                  >
                    <span className="mm-display font-black text-[#39FF14] text-sm">
                      {session.user.email?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="mm-display font-bold text-white text-sm truncate">
                      {session.user.name || session.user.email?.split("@")[0]}
                    </p>
                    <p className="mm-mono text-[10px] text-[#3a5a3a] truncate tracking-wide">
                      {session.user.email}
                    </p>
                  </div>
                </div>

                {/* Actions row */}
                <div className="flex gap-2">
                  <button
                    onClick={handleLogout}
                    className="mm-btn-danger mm-mono flex-1 flex items-center justify-center gap-2 py-3 text-[11px] font-bold tracking-[0.15em] uppercase text-red-400/80"
                    style={{ border: "1px solid rgba(239,68,68,0.15)", background: "transparent" }}
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    Salir
                  </button>
                  <button
                    onClick={handleCartClick}
                    className="mm-btn-primary mm-display flex-[2] flex items-center justify-center gap-2 py-3 text-[12px] font-black tracking-[0.15em] uppercase text-black relative"
                    style={{ background: "#39FF14" }}
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Carrito
                    {totalItems > 0 && (
                      <span
                        className="mm-mono text-[9px] font-bold text-black bg-black/20 px-1.5 py-0.5"
                        style={{ clipPath: "polygon(0 0, calc(100% - 4px) 0, 100% 4px, 100% 100%, 0 100%)" }}
                      >
                        {totalItems}
                      </span>
                    )}
                  </button>
                </div>
              </>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={() => { onLoginClick(); onClose(); }}
                  className="mm-btn-ghost mm-mono flex-1 flex items-center justify-center gap-2 py-3 text-[11px] font-bold tracking-[0.15em] uppercase text-white/70"
                  style={{ border: "1px solid rgba(255,255,255,0.1)", background: "transparent" }}
                >
                  <User className="w-3.5 h-3.5" />
                  Iniciar sesión
                </button>
                <button
                  onClick={handleCartClick}
                  className="mm-btn-primary mm-display flex-1 flex items-center justify-center gap-2 py-3 text-[12px] font-black tracking-[0.15em] uppercase text-black"
                  style={{ background: "#39FF14" }}
                >
                  <ShoppingBag className="w-4 h-4" />
                  Carrito
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </>
  );
}
