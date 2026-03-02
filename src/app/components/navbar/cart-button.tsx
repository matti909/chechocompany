"use client";

import { useRouter } from "next/navigation";
import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import useCartStore from "@/store/cart-store";
import { useSession } from "@/lib/auth-client";
import { useModalStore } from "@/store/modal-store";

export function CartButton() {
  const { totalItems } = useCartStore();
  const { data: session } = useSession();
  const router = useRouter();
  const openLoginModal = useModalStore((state) => state.openLoginModal);

  const handleCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!session) {
      toast.error("Debes iniciar sesión", {
        description: "Por favor inicia sesión para acceder al carrito de compras",
        duration: 4000,
      });
      openLoginModal();
      return;
    }
    router.push("/cart");
  };

  return (
    <div
      onClick={handleCartClick}
      className="relative cursor-pointer group"
      title="Carrito"
    >
      <div
        className="flex items-center justify-center w-9 h-9 transition-all duration-200"
        style={{
          clipPath: "polygon(0 0, calc(100% - 7px) 0, 100% 7px, 100% 100%, 7px 100%, 0 calc(100% - 7px))",
          border: "1px solid rgba(255,255,255,0.15)",
          background: "transparent",
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLElement).style.border = "2px solid #39FF14";
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLElement).style.border = "1px solid rgba(255,255,255,0.15)";
        }}
      >
        <ShoppingCart
          className="w-4 h-4 transition-colors duration-200 group-hover:text-[#39FF14]"
          style={{ color: "rgba(255,255,255,0.7)" }}
        />
      </div>

      {totalItems > 0 && (
        <div
          className="absolute -top-1.5 -right-1.5 min-w-[16px] h-4 flex items-center justify-center px-1"
          style={{
            clipPath: "polygon(0 0, calc(100% - 3px) 0, 100% 3px, 100% 100%, 3px 100%, 0 calc(100% - 3px))",
            background: "#39FF14",
          }}
        >
          <span
            className="font-bold leading-none"
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "9px",
              color: "#050a05",
            }}
          >
            {totalItems}
          </span>
        </div>
      )}
    </div>
  );
}
