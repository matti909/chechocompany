"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { gsap } from "gsap";

export function NavLogo() {
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logoRef.current) {
      gsap.fromTo(logoRef.current,
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 1, ease: "power3.out" }
      );
    }
  }, []);

  return (
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
  );
}
