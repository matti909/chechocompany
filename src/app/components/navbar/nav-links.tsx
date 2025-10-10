"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { gsap } from "gsap";

interface NavLink {
  name: string;
  hasDropdown: boolean;
  href: string;
}

const LINKS: NavLink[] = [
  { name: "TIENDA", hasDropdown: true, href: "/" },
  { name: "SEMILLAS", hasDropdown: false, href: "/genetics" },
  { name: "GUÍA", hasDropdown: false, href: "/growing-guide" },
  { name: "CONTACTO", hasDropdown: false, href: "/contacto" },
  { name: "BLOG", hasDropdown: false, href: "/cultivation-guide" },
];

export function NavLinks() {
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
  }, []);

  return (
    <div ref={linksRef} className="hidden lg:flex items-center space-x-8">
      {LINKS.map((item) => (
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
  );
}
