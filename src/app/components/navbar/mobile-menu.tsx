"use client";

import { useRef } from "react";
import Link from "next/link";
import { ShoppingCart, User, Settings, LogOut } from "lucide-react";
import { useAuthStore } from "@/store/auth-store";
import { signOut } from "@/lib/auth-client";
import useCartStore from "@/store/cart-store";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginClick: () => void;
}

const NAV_ITEMS = [
  { name: "TIENDA", href: "/" },
  { name: "SEMILLAS", href: "/genetics" },
  { name: "GUÍA", href: "/growing-guide" },
  { name: "CONTACTO", href: "/contacto" },
  { name: "BLOG", href: "/cultivation-guide" },
];

export function MobileMenu({ isOpen, onClose, onLoginClick }: MobileMenuProps) {
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const { session, clearSession } = useAuthStore();
  const { totalItems } = useCartStore();

  const handleLogout = async () => {
    try {
      await signOut();
      clearSession();
      onClose();
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      ref={mobileMenuRef}
      className="lg:hidden absolute top-20 left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-emerald-500/30 z-40"
    >
      <div className="max-w-7xl mx-auto px-6 py-6 space-y-4">
        {/* Navigation Links */}
        <div className="space-y-2">
          {NAV_ITEMS.map((item) => (
            <Link key={item.name} href={item.href}>
              <div
                className="block px-4 py-3 text-white hover:text-emerald-400 hover:bg-emerald-500/10 rounded-lg transition-all font-bold"
                onClick={onClose}
              >
                {item.name}
              </div>
            </Link>
          ))}
        </div>

        {/* User Actions */}
        <div className="pt-4 border-t border-emerald-500/20 space-y-3">
          {session ? (
            <>
              {/* User Info Card */}
              <div className="px-4 py-3 bg-gradient-to-r from-emerald-500/10 to-lime-500/10 border border-emerald-500/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-emerald-500 to-lime-500 flex items-center justify-center">
                    <span className="text-black font-bold text-lg">
                      {session.user.email?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-semibold truncate">
                      {session.user.name || session.user.email?.split('@')[0]}
                    </p>
                    <p className="text-gray-400 text-sm truncate">
                      {session.user.email}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    onClose();
                    // TODO: Navigate to settings
                  }}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-black/40 border border-emerald-500/30 rounded-lg text-emerald-400 font-bold hover:border-emerald-400/60 transition-colors"
                >
                  <Settings className="w-5 h-5" />
                  AJUSTES
                </button>
                <button
                  onClick={() => {
                    handleLogout();
                    onClose();
                  }}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-black/40 border border-red-500/30 rounded-lg text-red-400 font-bold hover:border-red-400/60 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  SALIR
                </button>
              </div>
            </>
          ) : (
            <button
              onClick={() => {
                onLoginClick();
                onClose();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-black/40 border border-emerald-500/30 rounded-lg text-emerald-400 font-bold hover:border-emerald-400/60 transition-colors"
            >
              <User className="w-5 h-5" />
              INICIAR SESIÓN
            </button>
          )}

          {/* Cart Button */}
          <Link href="/cart" className="block">
            <div
              className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-emerald-500 to-lime-500 rounded-lg text-black font-bold relative"
              onClick={onClose}
            >
              <ShoppingCart className="w-5 h-5" />
              CARRITO
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 w-6 h-6 bg-black text-emerald-400 rounded-full flex items-center justify-center text-xs font-bold border-2 border-emerald-400">
                  {totalItems}
                </span>
              )}
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
