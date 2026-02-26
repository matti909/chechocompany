"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { gsap } from "gsap";

export function NavLogo() {
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logoRef.current) {
      gsap.fromTo(
        logoRef.current,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.9, ease: "power3.out" }
      );
    }
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&display=swap');
        .nl-logo { font-family: 'Syne', sans-serif; }
      `}</style>

      <Link href="/">
        <div
          ref={logoRef}
          className="nl-logo font-black leading-none tracking-tight select-none cursor-pointer"
          style={{ fontSize: "20px", letterSpacing: "-0.02em" }}
        >
          <span className="text-white">chex </span>
          <span style={{ color: "#39FF14" }}>seeds</span>
        </div>
      </Link>
    </>
  );
}
