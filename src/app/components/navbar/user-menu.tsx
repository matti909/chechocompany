"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { User, UserCircle, Settings, LogOut } from "lucide-react";
import { useAuthStore } from "@/store/auth-store";
import { signOut } from "@/lib/auth-client";

interface UserMenuProps {
  onLoginClick: () => void;
}

export function UserMenu({ onLoginClick }: UserMenuProps) {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const { session, clearSession } = useAuthStore();

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
    };

    if (isUserMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isUserMenuOpen]);

  const handleLogout = async () => {
    try {
      await signOut();
      clearSession();
      setIsUserMenuOpen(false);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  // User logged in
  if (session) {
    return (
      <div ref={userMenuRef} className="relative">
        <div
          className="relative group cursor-pointer"
          onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
          onMouseEnter={(e) => {
            gsap.to(e.currentTarget, {
              scale: 1.1,
              duration: 0.3,
              ease: "power2.out",
            });
          }}
          onMouseLeave={(e) => {
            gsap.to(e.currentTarget, {
              scale: 1,
              duration: 0.3,
              ease: "power2.out",
            });
          }}
        >
          <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative p-2 rounded-full bg-gradient-to-r from-emerald-500/20 to-lime-500/20 border-2 border-emerald-400/60 group-hover:border-emerald-400 transition-colors duration-300">
            <UserCircle className="w-5 h-5 text-emerald-400" />
          </div>
        </div>

        {/* User Dropdown Menu */}
        {isUserMenuOpen && (
          <div className="absolute right-0 mt-3 w-64 bg-black/95 backdrop-blur-xl border border-emerald-500/30 rounded-2xl shadow-2xl shadow-emerald-500/20 overflow-hidden z-50">
            {/* User Info */}
            <div className="px-4 py-4 border-b border-emerald-500/20 bg-gradient-to-r from-emerald-500/10 to-lime-500/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-emerald-500 to-lime-500 flex items-center justify-center">
                  <span className="text-black font-bold text-lg">
                    {session.user.email?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold truncate">
                    {session.user.name || session.user.email?.split("@")[0]}
                  </p>
                  <p className="text-gray-400 text-sm truncate">
                    {session.user.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="py-2">
              <button
                className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-emerald-500/10 transition-colors"
                onClick={() => {
                  setIsUserMenuOpen(false);
                  // TODO: Navigate to settings
                }}
              >
                <Settings className="w-5 h-5 text-emerald-400" />
                <span className="font-medium">Configuración</span>
              </button>

              <button
                className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                onClick={handleLogout}
              >
                <LogOut className="w-5 h-5 text-red-400" />
                <span className="font-medium">Cerrar Sesión</span>
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // User not logged in
  return (
    <div
      className="relative group cursor-pointer"
      onClick={onLoginClick}
      onMouseEnter={(e) => {
        gsap.to(e.currentTarget, {
          scale: 1.1,
          duration: 0.3,
          ease: "power2.out",
        });
      }}
      onMouseLeave={(e) => {
        gsap.to(e.currentTarget, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      }}
    >
      <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative p-2 rounded-full bg-black/40 border border-emerald-500/30 group-hover:border-emerald-400/60 transition-colors duration-300">
        <User className="w-5 h-5 text-emerald-400" />
      </div>
    </div>
  );
}
