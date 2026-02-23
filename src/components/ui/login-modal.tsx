"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { signIn } from "@/lib/auth-client";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 min-h-screen"
      onClick={handleOverlayClick}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md animate-in fade-in duration-300" />

      {/* Modal */}
      <div className="relative w-full max-w-sm animate-in zoom-in-95 fade-in duration-300 my-auto">
        {/* Gradient border */}
        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/50 via-lime-500/50 to-emerald-500/50 rounded-3xl blur-xl opacity-60" />

        <div className="relative bg-black/90 backdrop-blur-xl border border-emerald-500/30 rounded-3xl overflow-hidden">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="relative px-8 pt-12 pb-8 text-center">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-gradient-to-b from-emerald-500/20 to-transparent rounded-full blur-2xl" />

            <div className="relative z-10">
              <h2 className="text-3xl font-black text-white mb-3">
                BIENVENIDO
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-lime-400 to-emerald-400">
                  DE VUELTA
                </span>
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed">
                Ingresá con tu cuenta de Google para continuar.
              </p>
            </div>
          </div>

          {/* Google Button */}
          <div className="px-8 pb-10">
            <button
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-100 disabled:opacity-60 disabled:cursor-not-allowed text-black font-semibold py-4 px-6 rounded-xl transition-all duration-300 hover:scale-[1.02] group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <svg className="w-5 h-5 relative z-10 shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="relative z-10">
                {isLoading ? "Redirigiendo..." : "Continuar con Google"}
              </span>
            </button>
          </div>

          {/* Bottom decoration */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-lime-500 to-emerald-500 opacity-60" />
        </div>
      </div>
    </div>
  );
}
