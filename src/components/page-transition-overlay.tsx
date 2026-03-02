"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useTransitionStore } from "@/store/transition-store";

export function PageTransitionOverlay() {
  const { rect, image, phase, reset } = useTransitionStore();
  const overlayRef = useRef<HTMLDivElement>(null);

  // Expand from card rect → full viewport
  useEffect(() => {
    if (phase !== "expanding" || !rect || !overlayRef.current) return;

    const el = overlayRef.current;

    gsap.set(el, {
      x: rect.left,
      y: rect.top,
      width: rect.width,
      height: rect.height,
      opacity: 1,
      borderRadius: 0,
    });

    gsap.to(el, {
      x: 0,
      y: 0,
      width: "100vw",
      height: "100vh",
      duration: 0.55,
      ease: "power3.inOut",
    });
  }, [phase, rect]);

  // Fade out when detail page has mounted
  useEffect(() => {
    if (phase !== "arrived" || !overlayRef.current) return;

    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.45,
      ease: "power2.out",
      onComplete: reset,
    });
  }, [phase, reset]);

  if (phase === "idle" || !rect || !image) return null;

  return (
    <div
      ref={overlayRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 9998,
        opacity: 0,
        overflow: "hidden",
        pointerEvents: "none",
        willChange: "transform, width, height, opacity",
      }}
    >
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        <Image
          src={image}
          alt=""
          fill
          className="object-cover object-top"
          priority
        />
        {/* Same gradient overlay as the detail hero */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(5,10,5,1) 0%, rgba(5,10,5,0.55) 50%, rgba(5,10,5,0.1) 100%)",
          }}
        />
      </div>
    </div>
  );
}
