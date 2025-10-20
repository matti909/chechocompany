"use client";

import { Button } from "@/components/ui/button";
import { Menu, X, Zap } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { NavLogo } from "./navbar/nav-logo";
import { NavLinks } from "./navbar/nav-links";
import { UserMenu } from "./navbar/user-menu";
import { CartButton } from "./navbar/cart-button";
import { MobileMenu } from "./navbar/mobile-menu";
import { useModalStore } from "@/store/modal-store";

export function Navbar() {
  const [, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const openLoginModal = useModalStore((state) => state.openLoginModal);
  const navbarRef = useRef<HTMLDivElement>(null);
  const cartRef = useRef<HTMLDivElement>(null);

  // Scroll effect for navbar background
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 20;
      setIsScrolled(scrolled);

      if (navbarRef.current) {
        gsap.to(navbarRef.current, {
          duration: 0.3,
          backgroundColor: scrolled ? "rgba(0, 0, 0, 0.95)" : "rgba(0, 0, 0, 0.1)",
          backdropFilter: scrolled ? "blur(20px)" : "blur(0px)",
          borderColor: scrolled ? "rgba(16, 185, 129, 0.3)" : "transparent",
          boxShadow: scrolled
            ? "0 0 40px rgba(16, 185, 129, 0.15), 0 0 80px rgba(16, 185, 129, 0.08)"
            : "none",
          ease: "power2.out",
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cart initial animation
  useEffect(() => {
    if (cartRef.current) {
      gsap.fromTo(cartRef.current,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 1, ease: "power3.out", delay: 0.5 }
      );
    }
  }, []);

  return (
    <nav
      ref={navbarRef}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent"
      style={{ background: "rgba(0, 0, 0, 0.1)" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <NavLogo />

          {/* Desktop Navigation Links */}
          <NavLinks />

          {/* Mobile Menu Toggle Button */}
          <button
            className="lg:hidden relative p-2 rounded-full bg-black/40 border border-emerald-500/30 hover:border-emerald-400/60 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-emerald-400" />
            ) : (
              <Menu className="w-6 h-6 text-emerald-400" />
            )}
          </button>

          {/* Desktop: User Menu, Cart & CTA */}
          <div ref={cartRef} className="hidden lg:flex items-center space-x-6">

            {/* User Menu (Login/Profile) */}
            <UserMenu onLoginClick={openLoginModal} />

            {/* Cart Button */}
            <CartButton />

            {/* CTA Button */}
            <Button
              className="relative group bg-gradient-to-r from-emerald-500 to-lime-500 hover:from-emerald-400 hover:to-lime-400 text-black font-bold px-6 py-2 border-none transition-all duration-300"
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget, {
                  scale: 1.05,
                  duration: 0.3,
                  ease: "power2.out"
                });
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, {
                  scale: 1,
                  duration: 0.3,
                  ease: "power2.out"
                });
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-lime-500 rounded-md blur-md opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative flex items-center gap-2">
                <Zap className="w-4 h-4" />
                COMPRAR
              </span>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onLoginClick={openLoginModal}
      />
    </nav>
  );
}
