"use client";

import { useRouter } from "next/navigation";
import { ShoppingCart } from "lucide-react";
import { gsap } from "gsap";
import { toast } from "sonner";
import useCartStore from "@/store/cart-store";
import { useSession } from "@/lib/auth-client";

export function CartButton() {
  const { totalItems } = useCartStore();
  const { data: session } = useSession();
  const router = useRouter();

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
    <div
      onClick={handleCartClick}
      className="relative group cursor-pointer"
      onMouseEnter={(e) => {
        const badge = e.currentTarget.querySelector('.cart-badge');
        gsap.to(e.currentTarget, {
          scale: 1.1,
          duration: 0.3,
          ease: "power2.out"
        });
        if (badge) {
          gsap.to(badge, {
            scale: 1.2,
            duration: 0.2,
            ease: "back.out(1.7)"
          });
        }
      }}
      onMouseLeave={(e) => {
        const badge = e.currentTarget.querySelector('.cart-badge');
        gsap.to(e.currentTarget, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        });
        if (badge) {
          gsap.to(badge, {
            scale: 1,
            duration: 0.2,
            ease: "power2.out"
          });
        }
      }}
    >
      <div className="absolute inset-0 bg-lime-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative p-2 rounded-full bg-black/40 border border-lime-500/30 group-hover:border-lime-400/60 transition-colors duration-300">
        <ShoppingCart className="w-5 h-5 text-lime-400" />
        {totalItems > 0 && (
          <div className="cart-badge absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-emerald-500 to-lime-500 rounded-full flex items-center justify-center border-2 border-black">
            <span className="text-black text-xs font-bold">{totalItems}</span>
          </div>
        )}
      </div>
    </div>
  );
}
