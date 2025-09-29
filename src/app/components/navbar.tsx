"use client";

import { Button } from "@/components/ui/button";
import { LoginModal } from "@/components/ui/login-modal";
import {
  ShoppingCart,
  User,
  ChevronDown,
  Zap,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import useCartStore from "@/store/cart-store";

export function Navbar() {
  const [, setIsScrolled] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const navbarRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const cartRef = useRef<HTMLDivElement>(null);

  const { totalItems } = useCartStore();

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

  useEffect(() => {
    // Initial animations
    if (logoRef.current) {
      gsap.fromTo(logoRef.current,
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 1, ease: "power3.out" }
      );
    }

    if (linksRef.current) {
      gsap.fromTo(linksRef.current.children,
        { opacity: 0, y: -20 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          stagger: 0.1, 
          ease: "power3.out",
          delay: 0.3
        }
      );
    }

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
      style={{
        background: "rgba(0, 0, 0, 0.1)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo con glow effect */}
          <Link href="/">
            <div
              ref={logoRef}
              className="flex items-center space-x-3 group cursor-pointer"
              onMouseEnter={() => {
                if (logoRef.current) {
                  gsap.to(logoRef.current, {
                    scale: 1.05,
                    duration: 0.3,
                    ease: "power2.out"
                  });
                }
              }}
              onMouseLeave={() => {
                if (logoRef.current) {
                  gsap.to(logoRef.current, {
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out"
                  });
                }
              }}
            >
                <div>
                <div className="font-black text-2xl text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-lime-400 leading-none">
                  CHEX SEEDS
                </div>
              </div>
            </div>
          </Link>

          {/* Navigation Links con glow */}
          <div ref={linksRef} className="hidden lg:flex items-center space-x-8">
            {[
              { name: "TIENDA", hasDropdown: true, href: "/" },
              { name: "SEMILLAS", hasDropdown: false, href: "/genetics" },
              { name: "GUÍA", hasDropdown: false, href: "/growing-guide" },
              { name: "CONTACTO", hasDropdown: false, href: "/contacto" },
              { name: "BLOG", hasDropdown: false, href: "/cultivation-guide" },
            ].map((item) => (
              <Link key={item.name} href={item.href}>
                <div
                  className="relative group cursor-pointer"
                  onMouseEnter={(e) => {
                    gsap.to(e.currentTarget.querySelector('.glow-effect'), {
                      opacity: 1,
                      scale: 1.1,
                      duration: 0.3,
                      ease: "power2.out"
                    });
                  }}
                  onMouseLeave={(e) => {
                    gsap.to(e.currentTarget.querySelector('.glow-effect'), {
                      opacity: 0,
                      scale: 1,
                      duration: 0.3,
                      ease: "power2.out"
                    });
                  }}
                >
                  <div className="glow-effect absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-lime-400/20 rounded-lg blur-sm opacity-0 transition-all duration-300" />
                  <div className="relative flex items-center space-x-1 px-4 py-2">
                    <span className="font-bold text-white hover:text-emerald-400 transition-colors duration-300 tracking-wide">
                      {item.name}
                    </span>
                    {item.hasDropdown && (
                      <ChevronDown className="w-4 h-4 text-emerald-400 group-hover:rotate-180 transition-transform duration-300" />
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Cart & User con glow */}
          <div ref={cartRef} className="flex items-center space-x-6">
            
            {/* User Icon */}
            <div
              className="relative group cursor-pointer"
              onClick={() => setIsLoginModalOpen(true)}
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget, {
                  scale: 1.1,
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
              <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative p-2 rounded-full bg-black/40 border border-emerald-500/30 group-hover:border-emerald-400/60 transition-colors duration-300">
                <User className="w-5 h-5 text-emerald-400" />
              </div>
            </div>

            {/* Cart con glow y badge animado */}
            <Link href="/cart">
              <div
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
            </Link>

            {/* CTA Button con super glow */}
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

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </nav>
  );
}
