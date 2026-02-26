"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { gsap } from "gsap";

const LINKS = [
  { name: "Tienda",    href: "/" },
  { name: "Semillas",  href: "/genetics" },
  { name: "Guía",      href: "/growing-guide" },
  { name: "Contacto",  href: "/contacto" },
  { name: "Blog",      href: "/cultivation-guide" },
];

export function NavLinks() {
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (linksRef.current) {
      gsap.fromTo(
        linksRef.current.children,
        { opacity: 0, y: -16 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: "power3.out", delay: 0.3 }
      );
    }
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');
        .nl-link {
          font-family: 'Space Mono', monospace;
          position: relative;
        }
        .nl-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1px;
          background: #39FF14;
          transition: width 0.25s ease;
        }
        .nl-link:hover::after { width: 100%; }
        .nl-link:hover { color: rgba(255,255,255,0.9); }
      `}</style>

      <div ref={linksRef} className="hidden lg:flex items-center gap-8">
        {LINKS.map((item) => (
          <Link key={item.name} href={item.href}>
            <span
              className="nl-link text-[13px] font-bold text-white/80 tracking-[0.15em] uppercase transition-colors duration-200"
            >
              {item.name}
            </span>
          </Link>
        ))}
      </div>
    </>
  );
}
