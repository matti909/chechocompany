"use client";

import { useRef, useEffect, useState } from "react";
import { LogOut, Settings, ChevronDown } from "lucide-react";
import { useAuthStore } from "@/store/auth-store";
import { signOut } from "@/lib/auth-client";

interface UserMenuProps {
  onLoginClick: () => void;
}

export function UserMenu({ onLoginClick }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { session, clearSession } = useAuthStore();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleLogout = async () => {
    try {
      await signOut();
      clearSession();
      setIsOpen(false);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  /* ── Logged in ── */
  if (session) {
    const initial = session.user.email?.charAt(0).toUpperCase() ?? "U";
    const name = session.user.name || session.user.email?.split("@")[0];

    return (
      <div ref={menuRef} className="relative">
        {/* Trigger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 group"
          style={{ background: "none", border: "none", cursor: "pointer" }}
        >
          {/* Avatar */}
          <div
            className="w-7 h-7 flex items-center justify-center flex-shrink-0 transition-all duration-200"
            style={{
              clipPath: "polygon(0 0, calc(100% - 5px) 0, 100% 5px, 100% 100%, 5px 100%, 0 calc(100% - 5px))",
              background: "#39FF14",
              outline: isOpen ? "2px solid #39FF14" : "2px solid transparent",
              outlineOffset: "2px",
            }}
          >
            <span
              className="font-bold leading-none"
              style={{ fontFamily: "'Syne', sans-serif", fontSize: "11px", color: "#050a05" }}
            >
              {initial}
            </span>
          </div>
          <ChevronDown
            className="w-3 h-3 transition-transform duration-200"
            style={{
              color: "rgba(255,255,255,0.4)",
              transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            }}
          />
        </button>

        {/* Dropdown */}
        {isOpen && (
          <div
            className="absolute right-0 mt-3 w-56 z-50 overflow-hidden"
            style={{
              background: "rgba(5,10,5,0.98)",
              border: "1px solid rgba(255,255,255,0.08)",
              clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))",
            }}
          >
            {/* User info */}
            <div
              className="px-4 py-4"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
            >
              <p
                className="font-bold text-white truncate"
                style={{ fontFamily: "'Syne', sans-serif", fontSize: "13px" }}
              >
                {name}
              </p>
              <p
                className="truncate mt-0.5"
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "10px",
                  color: "rgba(255,255,255,0.3)",
                }}
              >
                {session.user.email}
              </p>
            </div>

            {/* Items */}
            <div className="py-1">
              <button
                className="w-full flex items-center gap-3 px-4 py-3 transition-colors duration-150 hover:bg-white/[0.03]"
                onClick={() => setIsOpen(false)}
                style={{ background: "none", border: "none", cursor: "pointer" }}
              >
                <Settings className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "rgba(255,255,255,0.3)" }} />
                <span
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "11px",
                    color: "rgba(255,255,255,0.5)",
                    letterSpacing: "0.05em",
                  }}
                >
                  Configuración
                </span>
              </button>

              <button
                className="w-full flex items-center gap-3 px-4 py-3 transition-colors duration-150 hover:bg-red-500/[0.05]"
                onClick={handleLogout}
                style={{ background: "none", border: "none", cursor: "pointer" }}
              >
                <LogOut className="w-3.5 h-3.5 flex-shrink-0 text-red-400/60" />
                <span
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "11px",
                    color: "rgba(239,68,68,0.6)",
                    letterSpacing: "0.05em",
                  }}
                >
                  Cerrar sesión
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  /* ── Not logged in — login button ── */
  return (
    <button
      onClick={onLoginClick}
      className="group"
      style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
    >
      <div
        className="flex items-center gap-2 px-4 py-2 transition-all duration-200"
        style={{
          clipPath: "polygon(0 0, calc(100% - 7px) 0, 100% 7px, 100% 100%, 7px 100%, 0 calc(100% - 7px))",
          border: "1px solid rgba(255,255,255,0.15)",
          background: "transparent",
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLElement).style.border = "2px solid #39FF14";
          const span = e.currentTarget.querySelector("span");
          if (span) span.style.color = "#39FF14";
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLElement).style.border = "1px solid rgba(255,255,255,0.15)";
          const span = e.currentTarget.querySelector("span");
          if (span) span.style.color = "rgba(255,255,255,0.5)";
        }}
      >
        <span
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "10px",
            fontWeight: 700,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.5)",
            transition: "color 0.2s",
          }}
        >
          Login
        </span>
      </div>
    </button>
  );
}
