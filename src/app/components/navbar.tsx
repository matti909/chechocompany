"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import Link from "next/link";
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
  const cartRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 20;
      setIsScrolled(scrolled);
      if (navbarRef.current) {
        gsap.to(navbarRef.current, {
          duration: 0.3,
          backgroundColor: scrolled ? "rgba(5,10,5,0.97)" : "rgba(5,10,5,0.1)",
          backdropFilter: scrolled ? "blur(20px)" : "blur(0px)",
          borderColor: scrolled ? "rgba(255,255,255,0.08)" : "transparent",
          ease: "power2.out",
        });
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (cartRef.current) {
      gsap.fromTo(
        cartRef.current,
        { opacity: 0, x: 40 },
        { opacity: 1, x: 0, duration: 0.9, ease: "power3.out", delay: 0.5 }
      );
    }
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@800&display=swap');
        .nb-cta {
          font-family: 'Syne', sans-serif;
          clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px));
          transition: opacity 0.2s ease;
        }
        .nb-cta:hover { opacity: 0.85; }
      `}</style>

      <nav
        ref={navbarRef}
        className="fixed top-0 left-0 right-0 z-50 border-b border-transparent"
        style={{ background: "rgba(5,10,5,0.1)" }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">

            <NavLogo />
            <NavLinks />

            {/* Mobile toggle — animated hamburger */}
            <button
              className="lg:hidden flex flex-col items-center justify-center w-10 h-10 gap-[6px]"
              style={{
                border: "1px solid rgba(255,255,255,0.1)",
                background: isMobileMenuOpen ? "rgba(57,255,20,0.06)" : "transparent",
                clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))",
                transition: "background 0.25s ease",
              }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Menú"
            >
              <span
                className="block w-5 bg-white"
                style={{
                  height: "1.5px",
                  transition: "transform 0.3s ease",
                  transform: isMobileMenuOpen ? "translateY(7.5px) rotate(45deg)" : "none",
                }}
              />
              <span
                className="block w-5 bg-white"
                style={{
                  height: "1.5px",
                  transition: "opacity 0.2s ease, transform 0.2s ease",
                  opacity: isMobileMenuOpen ? 0 : 1,
                  transform: isMobileMenuOpen ? "scaleX(0)" : "none",
                }}
              />
              <span
                className="block w-5 bg-white"
                style={{
                  height: "1.5px",
                  transition: "transform 0.3s ease",
                  transform: isMobileMenuOpen ? "translateY(-7.5px) rotate(-45deg)" : "none",
                }}
              />
            </button>

            {/* Desktop right side */}
            <div ref={cartRef} className="hidden lg:flex items-center gap-5">
              <UserMenu onLoginClick={openLoginModal} />
              <CartButton />
              <Link href="/genetics">
                <button
                  className="nb-cta font-black text-black text-[11px] tracking-[0.2em] uppercase px-6 py-2.5"
                  style={{ background: "#39FF14" }}
                >
                  Comprar
                </button>
              </Link>
            </div>
          </div>
        </div>

        <MobileMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          onLoginClick={openLoginModal}
        />
      </nav>
    </>
  );
}
