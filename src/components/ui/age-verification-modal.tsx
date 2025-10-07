"use client";

import { useEffect, useState } from "react";
import { Button } from "./button";
import { AlertCircle, Leaf } from "lucide-react";

export function AgeVerificationModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    // Check if user has already verified age
    const hasVerified = localStorage.getItem("age-verified");
    if (!hasVerified) {
      setIsOpen(true);
    }
  }, []);

  const handleConfirmAge = () => {
    localStorage.setItem("age-verified", "true");
    setIsOpen(false);
  };

  const handleDenyAge = () => {
    setShowWarning(true);
    setTimeout(() => {
      window.location.href = "https://www.google.com";
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg">
      {/* Modal */}
      <div className="relative w-full max-w-lg animate-in zoom-in-95 fade-in duration-300">
        {/* Gradient border effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/50 via-lime-500/50 to-emerald-500/50 rounded-3xl blur-xl opacity-60" />

        <div className="relative bg-black border-2 border-emerald-500/30 rounded-3xl overflow-hidden p-8">
          {/* Header */}
          <div className="text-center mb-8">
            {/* Icon */}
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-emerald-500/20 to-lime-500/20 rounded-full mb-6">
              <Leaf className="w-10 h-10 text-emerald-400" />
            </div>

            <h2 className="text-3xl font-black text-white mb-4">
              VERIFICACIÓN
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-lime-400 to-emerald-400">
                DE EDAD
              </span>
            </h2>

            <p className="text-gray-300 text-lg leading-relaxed mb-2">
              Este sitio contiene información sobre cannabis
            </p>
            <p className="text-gray-400 text-sm">
              Debes ser mayor de 18 años para continuar
            </p>
          </div>

          {/* Warning Message */}
          {showWarning && (
            <div className="mb-6 p-4 bg-red-500/10 border-2 border-red-500/30 rounded-xl animate-in fade-in duration-300">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-red-400 font-bold mb-1">
                    Acceso Denegado
                  </p>
                  <p className="text-red-300 text-sm">
                    Debes ser mayor de 18 años para acceder a este sitio.
                    Serás redirigido...
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="space-y-4">
            <Button
              onClick={handleConfirmAge}
              disabled={showWarning}
              className="w-full bg-gradient-to-r from-emerald-500 to-lime-500 hover:from-emerald-600 hover:to-lime-600 text-black font-bold py-5 px-6 rounded-xl text-lg transition-all duration-300 hover:scale-[1.02] group relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative z-10">✓ Soy mayor de 18 años</span>
            </Button>

            <Button
              onClick={handleDenyAge}
              disabled={showWarning}
              variant="outline"
              className="w-full border-2 border-red-500/50 text-red-400 hover:bg-red-500/10 hover:border-red-400 font-bold py-5 px-6 rounded-xl text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ✗ No soy mayor de 18 años
            </Button>
          </div>

          {/* Footer */}
          <div className="mt-6 pt-6 border-t border-emerald-500/20">
            <p className="text-xs text-gray-500 text-center">
              Al continuar, confirmas que tienes la edad legal requerida en tu
              jurisdicción para acceder a contenido relacionado con cannabis.
            </p>
          </div>

          {/* Bottom decoration */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-lime-500 to-emerald-500 opacity-60" />
        </div>
      </div>
    </div>
  );
}
