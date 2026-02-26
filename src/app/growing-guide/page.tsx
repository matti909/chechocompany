"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Droplets, ThermometerSun, Timer, Sprout, Eye,
  ArrowLeft, ArrowRight, AlertTriangle, CheckCircle, Download,
} from "lucide-react";
import { Footer } from "../components/footer";

const steps = [
  {
    id: 1,
    tag: "Día 1",
    title: "Preparación",
    subtitle: "Papel húmedo con agua destilada",
    icon: Droplets,
    description:
      "Colocá las semillas sobre una base de papel de celulosa (papel de cocina) humedecido con agua destilada a temperatura ambiente, dentro de un recipiente tipo tupper.",
  },
  {
    id: 2,
    tag: "Inmediato",
    title: "Cobertura",
    subtitle: "Cubrir y cerrar el recipiente",
    icon: ThermometerSun,
    description:
      "Cubrí las semillas con otra capa de papel húmedo y cerrá el recipiente. El papel debe estar húmedo, pero sin encharcarse — el exceso de agua es el error más común.",
  },
  {
    id: 3,
    tag: "1–7 días",
    title: "Incubación",
    subtitle: "Lugar oscuro y temperatura constante",
    icon: Timer,
    description:
      "Colocá el recipiente en un lugar oscuro con temperatura constante entre 20–25 °C. Las semillas no deben estar sometidas a cambios bruscos de temperatura ni luz directa.",
  },
  {
    id: 4,
    tag: "Diario",
    title: "Monitoreo",
    subtitle: "Verificación y aireado diario",
    icon: Eye,
    description:
      "Abrí el recipiente un par de minutos cada día para airear y revisar si ya germinaron. Si el papel se secó, humedecelo un poco más con agua destilada.",
  },
  {
    id: 5,
    tag: "Al germinar",
    title: "Trasplante",
    subtitle: "Mover al sustrato definitivo",
    icon: Sprout,
    description:
      "En cuanto las semillas muestren la raíz blanca (radícula), pasalas al sustrato con mucho cuidado. Este proceso puede tomar de uno a siete días según la variedad.",
  },
];

const warnings = [
  { type: "error", text: "NO germinar directamente en el suelo." },
  { type: "error", text: "NO dejar las semillas sumergidas en agua." },
  { type: "ok",    text: "Cuando tengan 3 pisos de hojas podés pasarlas al exterior." },
];

export default function GrowingGuidePage() {
  const [activeId, setActiveId] = useState(1);
  const active = steps.find((s) => s.id === activeId)!;
  const Icon = active.icon;

  return (
    <div style={{ background: "#050a05", minHeight: "100vh" }}>
      <style>{`
        .gg-display { font-family: 'Syne', sans-serif; }
        .gg-mono    { font-family: 'Space Mono', monospace; }

        .gg-btn {
          font-family: 'Space Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          font-weight: 700;
          cursor: pointer;
          border: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          clip-path: polygon(0 0, calc(100% - 9px) 0, 100% 9px, 100% 100%, 9px 100%, 0 calc(100% - 9px));
          transition: opacity 0.2s;
          text-decoration: none;
        }
        .gg-btn:hover { opacity: 0.8; }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 pt-32 pb-24">

        {/* Header */}
        <div className="mb-14 border-b border-white/[0.06] pb-10">
          <Link
            href="/"
            className="gg-mono inline-flex items-center gap-2 text-white/30 hover:text-white/70 transition-colors text-[11px] tracking-widest uppercase mb-8"
          >
            <ArrowLeft className="w-3 h-3" />
            Inicio
          </Link>

          <p className="gg-mono text-[10px] text-[#39FF14]/70 tracking-[0.4em] uppercase mb-4">
            — Método de germinación
          </p>
          <h1 className="gg-display font-black text-white leading-none"
              style={{ fontSize: "clamp(44px, 7vw, 88px)" }}>
            GUÍA DE<br />GERMINACIÓN.
          </h1>
          <p className="gg-mono text-[13px] text-white/40 mt-5 max-w-xl leading-relaxed">
            Método probado paso a paso para lograr una germinación exitosa con tus semillas Chex Seeds.
          </p>
        </div>

        {/* Step timeline (horizontal) */}
        <div className="mb-10 overflow-x-auto">
          <div className="flex min-w-max border border-white/[0.08]">
            {steps.map((step, i) => {
              const StepIcon = step.icon;
              const isActive = step.id === activeId;
              const isDone = step.id < activeId;
              return (
                <button
                  key={step.id}
                  onClick={() => setActiveId(step.id)}
                  className="flex-1 text-left transition-colors"
                  style={{
                    background: isActive ? "rgba(57,255,20,0.06)" : "transparent",
                    borderRight: i < steps.length - 1 ? "1px solid rgba(255,255,255,0.08)" : "none",
                    padding: "20px 22px",
                    cursor: "pointer",
                  }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className="gg-mono text-[9px] font-bold w-6 h-6 flex items-center justify-center flex-shrink-0"
                      style={{
                        clipPath: "polygon(0 0, calc(100% - 4px) 0, 100% 4px, 100% 100%, 4px 100%, 0 calc(100% - 4px))",
                        background: isActive ? "#39FF14" : isDone ? "rgba(57,255,20,0.2)" : "rgba(255,255,255,0.05)",
                        color: isActive ? "#050a05" : isDone ? "#39FF14" : "rgba(255,255,255,0.3)",
                      }}
                    >
                      {isDone ? "✓" : step.id}
                    </span>
                    <StepIcon
                      className="w-3.5 h-3.5"
                      style={{ color: isActive ? "#39FF14" : "rgba(255,255,255,0.2)" }}
                    />
                  </div>
                  <p
                    className="gg-mono text-[11px] font-bold leading-tight"
                    style={{ color: isActive ? "#fff" : "rgba(255,255,255,0.35)" }}
                  >
                    {step.title}
                  </p>
                  <p
                    className="gg-mono text-[9px] tracking-widest uppercase mt-1"
                    style={{ color: isActive ? "rgba(57,255,20,0.7)" : "rgba(255,255,255,0.18)" }}
                  >
                    {step.tag}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active step content */}
        <div className="grid lg:grid-cols-[1fr_320px] gap-0 border border-white/[0.08] mb-10">

          {/* Description */}
          <div className="p-8 lg:p-10 border-r border-white/[0.08]">
            <div className="flex items-start gap-5 mb-6">
              <div
                className="flex-shrink-0 w-14 h-14 flex items-center justify-center"
                style={{
                  clipPath: "polygon(0 0, calc(100% - 9px) 0, 100% 9px, 100% 100%, 9px 100%, 0 calc(100% - 9px))",
                  background: "rgba(57,255,20,0.08)",
                  border: "1px solid rgba(57,255,20,0.2)",
                }}
              >
                <Icon className="w-6 h-6" style={{ color: "#39FF14" }} />
              </div>
              <div>
                <p className="gg-mono text-[9px] text-[#39FF14]/60 tracking-[0.3em] uppercase mb-1">
                  {active.tag}
                </p>
                <h2 className="gg-display font-black text-white text-[26px] leading-tight">
                  {active.title}
                </h2>
                <p className="gg-mono text-[11px] text-white/35 mt-1">{active.subtitle}</p>
              </div>
            </div>

            <p className="gg-mono text-[13px] text-white/65 leading-relaxed mb-8">
              {active.description}
            </p>

            {/* Nav buttons */}
            <div className="flex items-center gap-3">
              {activeId > 1 && (
                <button
                  className="gg-btn"
                  style={{
                    background: "transparent",
                    color: "rgba(255,255,255,0.4)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                  onClick={() => setActiveId(activeId - 1)}
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Anterior
                </button>
              )}
              {activeId < steps.length && (
                <button
                  className="gg-btn"
                  style={{ background: "#39FF14", color: "#050a05" }}
                  onClick={() => setActiveId(activeId + 1)}
                >
                  Siguiente
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
              {activeId === steps.length && (
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" style={{ color: "#39FF14" }} />
                  <span className="gg-mono text-[11px] text-[#39FF14]/70 tracking-wider">
                    Proceso completado
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Progress sidebar */}
          <div className="p-8">
            <p className="gg-mono text-[9px] text-white/25 tracking-[0.3em] uppercase mb-6">
              Progreso
            </p>
            <div className="space-y-0">
              {steps.map((step) => {
                const StepIcon = step.icon;
                const isActive = step.id === activeId;
                const isDone = step.id < activeId;
                return (
                  <button
                    key={step.id}
                    onClick={() => setActiveId(step.id)}
                    className="w-full flex items-center gap-3 py-3 text-left transition-colors"
                    style={{
                      borderBottom: "1px solid rgba(255,255,255,0.05)",
                      cursor: "pointer",
                      background: "transparent",
                    }}
                  >
                    <StepIcon
                      className="w-3.5 h-3.5 flex-shrink-0"
                      style={{
                        color: isActive ? "#39FF14" : isDone ? "rgba(57,255,20,0.4)" : "rgba(255,255,255,0.15)",
                      }}
                    />
                    <span
                      className="gg-mono text-[11px] font-bold"
                      style={{
                        color: isActive ? "#fff" : isDone ? "rgba(57,255,20,0.5)" : "rgba(255,255,255,0.25)",
                      }}
                    >
                      {step.title}
                    </span>
                    {isDone && (
                      <CheckCircle className="w-3 h-3 ml-auto flex-shrink-0" style={{ color: "rgba(57,255,20,0.4)" }} />
                    )}
                    {isActive && (
                      <span
                        className="ml-auto w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: "#39FF14" }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Paso counter */}
            <div className="mt-6 pt-6 border-t border-white/[0.06]">
              <div
                className="h-px w-full mb-2"
                style={{ background: "rgba(255,255,255,0.06)" }}
              >
                <div
                  className="h-px transition-all duration-500"
                  style={{
                    width: `${(activeId / steps.length) * 100}%`,
                    background: "#39FF14",
                  }}
                />
              </div>
              <div className="flex justify-between">
                <span className="gg-mono text-[10px] text-white/25">
                  Paso {activeId}/{steps.length}
                </span>
                <span className="gg-mono text-[10px]" style={{ color: "#39FF14" }}>
                  {Math.round((activeId / steps.length) * 100)}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Warnings */}
        <div className="border border-white/[0.08] mb-10">
          <div className="border-b border-white/[0.08] px-8 py-4 flex items-center gap-3">
            <AlertTriangle className="w-4 h-4 text-red-400/70" />
            <p className="gg-mono text-[10px] text-white/40 tracking-[0.3em] uppercase">
              Importante
            </p>
          </div>
          {warnings.map((w, i) => (
            <div
              key={i}
              className="flex items-start gap-4 px-8 py-5"
              style={{
                borderBottom: i < warnings.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
              }}
            >
              <span
                className="gg-mono text-[11px] font-bold flex-shrink-0"
                style={{ color: w.type === "error" ? "#ef4444" : "#39FF14" }}
              >
                {w.type === "error" ? "✕" : "→"}
              </span>
              <p
                className="gg-mono text-[12px] leading-relaxed"
                style={{ color: w.type === "error" ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.55)" }}
              >
                {w.text}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div
          className="p-8 lg:p-10"
          style={{
            clipPath: "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))",
            background: "rgba(57,255,20,0.04)",
            border: "1px solid rgba(57,255,20,0.12)",
          }}
        >
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div>
              <p className="gg-mono text-[9px] text-[#39FF14]/50 tracking-[0.3em] uppercase mb-2">
                ¡Éxito garantizado!
              </p>
              <h3 className="gg-display font-black text-white text-[24px] leading-tight mb-2">
                Seguí el método y lográ<br />una germinación exitosa.
              </h3>
              <p className="gg-mono text-[11px] text-white/35">
                La paciencia y el cuidado son la clave del éxito.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 flex-shrink-0">
              <Link href="/genetics" className="gg-btn" style={{ background: "#39FF14", color: "#050a05" }}>
                Ver genéticas
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <a
                href="/guia_esp.pdf"
                download
                className="gg-btn"
                style={{
                  background: "transparent",
                  color: "rgba(255,255,255,0.45)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <Download className="w-3.5 h-3.5" />
                Descargar PDF
              </a>
            </div>
          </div>
        </div>

      </div>

      <Footer />
    </div>
  );
}
