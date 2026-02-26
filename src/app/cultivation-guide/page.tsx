"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Sprout, Sun, Droplets, Scissors, Package,
  ArrowLeft, ArrowRight, TreePine, Lightbulb,
  CheckCircle, AlertTriangle,
} from "lucide-react";
import { Footer } from "../components/footer";

const steps = [
  {
    id: 1,
    tag: "Inicio",
    title: "Seleccionar Semillas",
    subtitle: "Escogé las variedades ideales",
    icon: Sprout,
    description:
      "La variedad es impresionante. Sativa, índica, ruderalis, innumerables híbridas… todas disponibles. Considerá tus preferencias personales y circunstancias de cultivo.",
    details: [
      "¿Qué cepas disfrutaste más en el pasado?",
      "¿Cultivo en espacio limitado o jardín amplio?",
      "Variedades autoflorecientes vs fotoperiódicas",
      "Adaptación al clima local",
    ],
    tip: "Empezá con variedades autoflorecientes si sos principiante. Son más tolerantes y no dependen del fotoperiodo para florecer.",
  },
  {
    id: 2,
    tag: "Preparación",
    title: "Fundamentos Básicos",
    subtitle: "Requisitos esenciales del cannabis",
    icon: Sun,
    description:
      "Para desarrollarse a pleno potencial, el cannabis exige una serie de requisitos fundamentales que debés dominar antes de dar el primer paso.",
    details: [
      "Luz: Más de 12h diarias para vegetación",
      "Medio de cultivo: Sustrato orgánico o sistemas hidropónicos",
      "Aire: Ventilación constante y movimiento",
      "Agua: pH controlado y calidad garantizada",
      "Temperatura: 27 °C ideal durante el día",
      "Fertilizantes: Nutrición balanceada por fase",
      "Humedad: Control ambiental preciso",
    ],
  },
  {
    id: 3,
    tag: "Setup",
    title: "Iluminación Interior",
    subtitle: "Sistemas de luz para indoor",
    icon: Lightbulb,
    description:
      "Con la legalización llegó una explosión de alternativas de luces para cultivo interior. Tu presupuesto será el factor decisivo al elegir.",
    details: [
      "CFL: Económicas para principiantes",
      "LED: Eficiencia energética superior",
      "HPS/MH: Sistemas tradicionales potentes",
      "Armarios de cultivo completos",
      "Control de temperatura por calor generado",
    ],
  },
  {
    id: 4,
    tag: "3–7 días",
    title: "Germinación",
    subtitle: "Inicio del ciclo de vida",
    icon: Droplets,
    description:
      "Las semillas viables contienen toda la información genética necesaria. Solo necesitan agua, temperatura correcta y buena ubicación para despertar.",
    details: [
      "Método papel absorbente húmedo",
      "Plantado directo en sustrato",
      "Jiffys y cubos de lana de roca",
      "Germinación en agua",
      "Uso de semilleros controlados",
    ],
  },
  {
    id: 5,
    tag: "2–8 semanas",
    title: "Crecimiento Vegetativo",
    subtitle: "Desarrollo de la estructura",
    icon: TreePine,
    description:
      "Cuando las hojas reciben luz, la fotosíntesis arranca en serio. La fase vegetativa habrá empezado y las plantas crecerán rápidamente.",
    details: [
      "Interior: 18h luz, 6h oscuridad",
      "Exterior: Crecimiento hasta 3–4 metros",
      "Técnicas LST y ScroG",
      "Podas apicales y de volumen",
      "Control de ambiente constante",
    ],
  },
  {
    id: 6,
    tag: "6–12 semanas",
    title: "Floración",
    subtitle: "Formación de cogollos",
    icon: Package,
    description:
      "La floración llenará los siguientes meses con fragancias. Las flores se formarán adoptando estructuras características de cada variedad.",
    details: [
      "Fotoperiodo 12/12 horas luz/oscuridad",
      "Diferenciación y formación de flores",
      "Desarrollo de tricomas y resina",
      "Maduración de pistilos",
      "Control de humedad crítico",
    ],
  },
  {
    id: 7,
    tag: "2–4 semanas",
    title: "Cosecha y Curado",
    subtitle: "Recolección y procesado",
    icon: Scissors,
    description:
      "Durante las últimas semanas abandoná los fertilizantes y lavá las raíces. Esto asegura sabor puro libre de regustos químicos.",
    details: [
      "Lavado de raíces 2 semanas antes",
      "Reconocer tricomas maduros (20–30% ámbar)",
      "Técnicas de cosecha y manicurado",
      "Secado lento en lugar fresco y oscuro",
      "Curado en frascos herméticos mínimo 6 semanas",
    ],
    warning: "Para máximo THC: 20–30% de tricomas ámbar. Para efecto balanceado: 60–80% tricomas maduros. Secado mínimo 2 semanas, curado mínimo 6.",
  },
];

export default function CultivationGuidePage() {
  const [activeId, setActiveId] = useState(1);
  const active = steps.find((s) => s.id === activeId)!;
  const Icon = active.icon;
  const progress = Math.round((activeId / steps.length) * 100);

  return (
    <div style={{ background: "#050a05", minHeight: "100vh" }}>
      <style>{`
        .cg-display { font-family: 'Syne', sans-serif; }
        .cg-mono    { font-family: 'Space Mono', monospace; }

        .cg-step-btn {
          all: unset;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
          padding: 14px 16px;
          border-top: 1px solid rgba(255,255,255,0.06);
          transition: background 0.15s;
        }
        .cg-step-btn:last-child { border-bottom: 1px solid rgba(255,255,255,0.06); }
        .cg-step-btn:hover { background: rgba(255,255,255,0.02); }
        .cg-step-btn.active { background: rgba(57,255,20,0.05); }

        .cg-num {
          font-family: 'Space Mono', monospace;
          font-size: 10px;
          font-weight: 700;
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          clip-path: polygon(0 0, calc(100% - 5px) 0, 100% 5px, 100% 100%, 5px 100%, 0 calc(100% - 5px));
        }

        .cg-nav-btn {
          font-family: 'Space Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          font-weight: 700;
          cursor: pointer;
          border: none;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          clip-path: polygon(0 0, calc(100% - 9px) 0, 100% 9px, 100% 100%, 9px 100%, 0 calc(100% - 9px));
          transition: opacity 0.2s;
        }
        .cg-nav-btn:hover { opacity: 0.8; }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 pt-32 pb-24">

        {/* Header */}
        <div className="mb-12 border-b border-white/[0.06] pb-10">
          <Link
            href="/"
            className="cg-mono inline-flex items-center gap-2 text-white/30 hover:text-white/70 transition-colors text-[11px] tracking-widest uppercase mb-8"
          >
            <ArrowLeft className="w-3 h-3" />
            Inicio
          </Link>

          <p className="cg-mono text-[10px] text-[#39FF14]/70 tracking-[0.4em] uppercase mb-4">
            — Guía de cultivo
          </p>
          <h1 className="cg-display font-black text-white leading-none"
              style={{ fontSize: "clamp(44px, 7vw, 88px)" }}>
            GUÍA COMPLETA<br />DE CULTIVO.
          </h1>
          <p className="cg-mono text-[13px] text-white/40 mt-5 max-w-2xl leading-relaxed">
            Como la propia jardinería, el cultivo de cannabis es una habilidad desarrollada a lo largo del tiempo.
            Es fácil aprender, pero dominarlo lleva toda una vida de cultivador.
          </p>
        </div>

        {/* Progress bar */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-2">
            <span className="cg-mono text-[10px] text-white/30 tracking-widest uppercase">
              Paso {activeId} / {steps.length}
            </span>
            <span className="cg-mono text-[10px] tracking-widest" style={{ color: "#39FF14" }}>
              {progress}%
            </span>
          </div>
          <div className="h-px w-full bg-white/[0.06]">
            <div
              className="h-px transition-all duration-500"
              style={{ width: `${progress}%`, background: "#39FF14" }}
            />
          </div>
        </div>

        {/* Body: steps list + content */}
        <div className="grid lg:grid-cols-[280px_1fr] gap-0 border border-white/[0.08]">

          {/* Steps sidebar */}
          <div className="border-r border-white/[0.08]">
            {steps.map((step) => {
              const StepIcon = step.icon;
              const isActive = step.id === activeId;
              return (
                <button
                  key={step.id}
                  onClick={() => setActiveId(step.id)}
                  className={`cg-step-btn ${isActive ? "active" : ""}`}
                >
                  <span
                    className="cg-num"
                    style={{
                      background: isActive ? "#39FF14" : "rgba(255,255,255,0.05)",
                      color: isActive ? "#050a05" : "rgba(255,255,255,0.3)",
                    }}
                  >
                    {step.id < 10 ? `0${step.id}` : step.id}
                  </span>
                  <StepIcon
                    className="w-3.5 h-3.5 flex-shrink-0"
                    style={{ color: isActive ? "#39FF14" : "rgba(255,255,255,0.25)" }}
                  />
                  <div className="min-w-0">
                    <p
                      className="cg-mono text-[11px] font-bold truncate"
                      style={{ color: isActive ? "#fff" : "rgba(255,255,255,0.4)" }}
                    >
                      {step.title}
                    </p>
                    <p className="cg-mono text-[9px] tracking-widest uppercase"
                       style={{ color: isActive ? "rgba(57,255,20,0.7)" : "rgba(255,255,255,0.2)" }}>
                      {step.tag}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Content area */}
          <div className="p-8 lg:p-10">

            {/* Step header */}
            <div className="flex items-start gap-5 mb-8 pb-8 border-b border-white/[0.06]">
              <div
                className="flex-shrink-0 w-12 h-12 flex items-center justify-center"
                style={{
                  clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))",
                  background: "rgba(57,255,20,0.08)",
                  border: "1px solid rgba(57,255,20,0.2)",
                }}
              >
                <Icon className="w-5 h-5" style={{ color: "#39FF14" }} />
              </div>
              <div>
                <p className="cg-mono text-[9px] text-[#39FF14]/60 tracking-[0.3em] uppercase mb-1">
                  {active.tag}
                </p>
                <h2 className="cg-display font-black text-white text-[28px] leading-tight">
                  {active.title}
                </h2>
                <p className="cg-mono text-[11px] text-white/40 mt-1">{active.subtitle}</p>
              </div>
            </div>

            {/* Description + details */}
            <div className="grid lg:grid-cols-2 gap-8 mb-8">
              <div>
                <p className="cg-mono text-[9px] text-white/25 tracking-[0.3em] uppercase mb-4">
                  Descripción
                </p>
                <p className="cg-mono text-[13px] text-white/70 leading-relaxed">
                  {active.description}
                </p>
              </div>

              <div>
                <p className="cg-mono text-[9px] text-white/25 tracking-[0.3em] uppercase mb-4">
                  Puntos clave
                </p>
                <div className="space-y-3">
                  {active.details.map((detail, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="cg-mono text-[10px] mt-0.5 flex-shrink-0"
                            style={{ color: "#39FF14" }}>→</span>
                      <p className="cg-mono text-[12px] text-white/60 leading-snug">{detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Tip / Warning boxes */}
            {active.tip && (
              <div
                className="flex items-start gap-4 p-5 mb-8"
                style={{
                  clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))",
                  background: "rgba(57,255,20,0.05)",
                  border: "1px solid rgba(57,255,20,0.15)",
                }}
              >
                <Lightbulb className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "#39FF14" }} />
                <div>
                  <p className="cg-mono text-[9px] text-[#39FF14]/60 tracking-widest uppercase mb-1.5">
                    Tip profesional
                  </p>
                  <p className="cg-mono text-[12px] text-white/60 leading-relaxed">{active.tip}</p>
                </div>
              </div>
            )}

            {active.warning && (
              <div
                className="flex items-start gap-4 p-5 mb-8"
                style={{
                  clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))",
                  background: "rgba(255,80,80,0.04)",
                  border: "1px solid rgba(255,80,80,0.15)",
                }}
              >
                <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5 text-red-400/70" />
                <div>
                  <p className="cg-mono text-[9px] text-red-400/50 tracking-widest uppercase mb-1.5">
                    Importante en la cosecha
                  </p>
                  <p className="cg-mono text-[12px] text-white/60 leading-relaxed">{active.warning}</p>
                </div>
              </div>
            )}

            {/* Completion banner */}
            {activeId === steps.length && (
              <div
                className="p-6 mb-8"
                style={{
                  clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
                  background: "rgba(57,255,20,0.06)",
                  border: "1px solid rgba(57,255,20,0.2)",
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <CheckCircle className="w-5 h-5" style={{ color: "#39FF14" }} />
                  <p className="cg-display font-black text-white text-[20px]">
                    ¡Guía completada!
                  </p>
                </div>
                <p className="cg-mono text-[12px] text-white/50 mb-5 leading-relaxed">
                  Revisaste todos los pasos fundamentales. La práctica hace al maestro — empezá tu primer cultivo con confianza.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link href="/genetics">
                    <button
                      className="cg-nav-btn"
                      style={{ background: "#39FF14", color: "#050a05" }}
                    >
                      Ver nuestras genéticas
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </Link>
                  <Link href="/contacto">
                    <button
                      className="cg-nav-btn"
                      style={{
                        background: "transparent",
                        color: "rgba(255,255,255,0.5)",
                        border: "1px solid rgba(255,255,255,0.1)",
                      }}
                    >
                      Consultar asesor
                    </button>
                  </Link>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between pt-6 border-t border-white/[0.06]">
              <div>
                {activeId > 1 && (
                  <button
                    className="cg-nav-btn"
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
              </div>
              <div>
                {activeId < steps.length && (
                  <button
                    className="cg-nav-btn"
                    style={{ background: "#39FF14", color: "#050a05" }}
                    onClick={() => setActiveId(activeId + 1)}
                  >
                    Siguiente
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
