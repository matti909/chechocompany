"use client";

import { useState } from "react";
import { Footer } from "../components/footer";
import {
  Send,
  Mail,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
  Instagram,
  ArrowUpRight,
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ background: "#050a05", minHeight: "100vh" }}>
      <style>{`
        .ct-display { font-family: 'Syne', sans-serif; }
        .ct-mono   { font-family: 'Space Mono', monospace; }

        .ct-input {
          width: 100%;
          background: transparent;
          border: 1px solid rgba(255,255,255,0.1);
          color: #fff;
          padding: 12px 14px;
          font-family: 'Space Mono', monospace;
          font-size: 12px;
          letter-spacing: 0.05em;
          outline: none;
          transition: border-color 0.2s;
        }
        .ct-input::placeholder { color: rgba(255,255,255,0.2); }
        .ct-input:focus { border-color: #39FF14; }

        .ct-btn {
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          font-weight: 700;
          cursor: pointer;
          border: none;
          clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px));
          transition: opacity 0.2s;
        }
        .ct-btn:disabled { opacity: 0.5; cursor: not-allowed; }

        .ct-info-card {
          border-top: 1px solid rgba(255,255,255,0.08);
          border-left: 1px solid rgba(255,255,255,0.08);
          border-right: 1px solid rgba(255,255,255,0.08);
        }
        .ct-info-card:last-child {
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 pt-32 pb-24">

        {/* Page header */}
        <div className="mb-16 border-b border-white/[0.06] pb-10">
          <p className="ct-mono text-[10px] text-[#39FF14]/70 tracking-[0.4em] uppercase mb-4">
            — Contacto
          </p>
          <h1 className="ct-display font-black text-white leading-none"
              style={{ fontSize: "clamp(48px, 8vw, 96px)" }}>
            HABLEMOS.
          </h1>
          <p className="ct-mono text-[13px] text-white/40 mt-4 max-w-lg leading-relaxed">
            Consultas sobre genéticas, asesoría personalizada, soporte técnico o consultas comerciales.
          </p>
        </div>

        {submitStatus === "success" ? (
          /* ── Success state ── */
          <div className="py-20 text-center">
            <div
              className="inline-flex items-center justify-center w-20 h-20 mb-8"
              style={{
                clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
                background: "rgba(57,255,20,0.08)",
                border: "1px solid rgba(57,255,20,0.3)",
              }}
            >
              <CheckCircle className="w-8 h-8" style={{ color: "#39FF14" }} />
            </div>
            <h2 className="ct-display font-black text-white text-[40px] leading-none mb-3">
              MENSAJE ENVIADO
            </h2>
            <p className="ct-mono text-[12px] text-white/40 tracking-wider mb-10">
              Te respondemos en menos de 24 horas
            </p>
            <button
              onClick={() => setSubmitStatus("idle")}
              className="ct-btn"
              style={{
                background: "#39FF14",
                color: "#050a05",
                padding: "14px 32px",
              }}
            >
              Enviar otro mensaje
            </button>
          </div>
        ) : (
          /* ── Main grid ── */
          <div className="grid lg:grid-cols-[1fr_360px] gap-12 items-start">

            {/* ── Form ── */}
            <div>
              <p className="ct-mono text-[10px] text-white/30 tracking-[0.3em] uppercase mb-6">
                01 — Formulario
              </p>

              <form onSubmit={handleSubmit} className="space-y-0">
                {/* Name + Email row */}
                <div className="grid sm:grid-cols-2 border-t border-l border-white/[0.08]">
                  <div className="border-b border-r border-white/[0.08] p-5">
                    <label className="ct-mono text-[9px] text-white/30 tracking-[0.3em] uppercase block mb-3">
                      Nombre
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Tu nombre completo"
                      className="ct-input"
                    />
                  </div>
                  <div className="border-b border-r border-white/[0.08] p-5">
                    <label className="ct-mono text-[9px] text-white/30 tracking-[0.3em] uppercase block mb-3">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="tu@email.com"
                      className="ct-input"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div className="border-b border-l border-r border-white/[0.08] p-5">
                  <label className="ct-mono text-[9px] text-white/30 tracking-[0.3em] uppercase block mb-3">
                    Asunto
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    placeholder="¿De qué querés hablar?"
                    className="ct-input"
                  />
                </div>

                {/* Message */}
                <div className="border-b border-l border-r border-white/[0.08] p-5">
                  <label className="ct-mono text-[9px] text-white/30 tracking-[0.3em] uppercase block mb-3">
                    Mensaje
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={7}
                    placeholder="Contanos más detalles sobre tu consulta..."
                    className="ct-input resize-none"
                  />
                </div>

                {/* Error message */}
                {submitStatus === "error" && (
                  <div className="border-b border-l border-r border-red-500/20 bg-red-500/5 p-4 flex items-center gap-2">
                    <AlertCircle className="w-3.5 h-3.5 text-red-400/70 flex-shrink-0" />
                    <span className="ct-mono text-[11px] text-red-400/70 tracking-wide">
                      Error al enviar el mensaje. Por favor intentá nuevamente.
                    </span>
                  </div>
                )}

                {/* Submit */}
                <div className="pt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="ct-btn flex items-center gap-3"
                    style={{
                      background: "#39FF14",
                      color: "#050a05",
                      padding: "16px 36px",
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <div
                          className="w-3.5 h-3.5 border-2 rounded-full animate-spin"
                          style={{ borderColor: "rgba(5,10,5,0.3)", borderTopColor: "#050a05" }}
                        />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        Enviar mensaje
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* ── Info sidebar ── */}
            <div>
              <p className="ct-mono text-[10px] text-white/30 tracking-[0.3em] uppercase mb-6">
                02 — Datos de contacto
              </p>

              <div className="border border-white/[0.08]">
                {/* Email */}
                <div className="ct-info-card p-6">
                  <div className="flex items-start gap-4">
                    <div
                      className="flex-shrink-0 w-9 h-9 flex items-center justify-center"
                      style={{
                        clipPath: "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))",
                        background: "rgba(57,255,20,0.08)",
                      }}
                    >
                      <Mail className="w-4 h-4" style={{ color: "#39FF14" }} />
                    </div>
                    <div>
                      <p className="ct-mono text-[9px] text-white/30 tracking-[0.3em] uppercase mb-1">
                        Email
                      </p>
                      <p className="ct-mono text-[13px] text-white font-bold">
                        contacto@chexseeds.com
                      </p>
                      <p className="ct-mono text-[10px] text-white/30 mt-1">
                        Consultas y soporte técnico
                      </p>
                    </div>
                  </div>
                </div>

                {/* Instagram */}
                <div className="ct-info-card p-6">
                  <div className="flex items-start gap-4">
                    <div
                      className="flex-shrink-0 w-9 h-9 flex items-center justify-center"
                      style={{
                        clipPath: "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))",
                        background: "rgba(255,255,255,0.04)",
                      }}
                    >
                      <Instagram className="w-4 h-4 text-white/60" />
                    </div>
                    <div>
                      <p className="ct-mono text-[9px] text-white/30 tracking-[0.3em] uppercase mb-1">
                        Instagram
                      </p>
                      <a
                        href="https://www.instagram.com/chexseeds.grow/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ct-mono text-[13px] text-white font-bold flex items-center gap-1.5 hover:text-[#39FF14] transition-colors"
                      >
                        @chexseeds.grow
                        <ArrowUpRight className="w-3 h-3" />
                      </a>
                      <p className="ct-mono text-[10px] text-white/30 mt-1">
                        Novedades y comunidad
                      </p>
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div className="ct-info-card p-6">
                  <div className="flex items-start gap-4">
                    <div
                      className="flex-shrink-0 w-9 h-9 flex items-center justify-center"
                      style={{
                        clipPath: "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))",
                        background: "rgba(57,255,20,0.08)",
                      }}
                    >
                      <MapPin className="w-4 h-4" style={{ color: "#39FF14" }} />
                    </div>
                    <div>
                      <p className="ct-mono text-[9px] text-white/30 tracking-[0.3em] uppercase mb-1">
                        Ubicación
                      </p>
                      <p className="ct-mono text-[13px] text-white font-bold">
                        Ciudad de Córdoba
                      </p>
                      <p className="ct-mono text-[10px] text-white/30 mt-1">
                        Enviamos a toda Argentina
                      </p>
                    </div>
                  </div>
                </div>

                {/* Response time */}
                <div className="ct-info-card p-6">
                  <div className="flex items-start gap-4">
                    <div
                      className="flex-shrink-0 w-9 h-9 flex items-center justify-center"
                      style={{
                        clipPath: "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))",
                        background: "rgba(57,255,20,0.08)",
                      }}
                    >
                      <Clock className="w-4 h-4" style={{ color: "#39FF14" }} />
                    </div>
                    <div>
                      <p className="ct-mono text-[9px] text-white/30 tracking-[0.3em] uppercase mb-1">
                        Tiempo de respuesta
                      </p>
                      <p className="ct-mono text-[13px] text-white font-bold">
                        Menos de 24 horas
                      </p>
                      <p className="ct-mono text-[10px] text-white/30 mt-1">
                        Soporte especializado garantizado
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Why contact us */}
              <div className="mt-6 border border-white/[0.08] p-6">
                <p className="ct-mono text-[9px] text-white/30 tracking-[0.3em] uppercase mb-5">
                  ¿Por qué contactarnos?
                </p>
                <div className="space-y-4">
                  {[
                    { label: "Asesoría personalizada", desc: "Recomendaciones para tu cultivo" },
                    { label: "Soporte técnico", desc: "Germinación y cultivo" },
                    { label: "Consultas comerciales", desc: "Mayoristas bienvenidos" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start gap-3">
                      <span className="ct-mono text-[10px] text-[#39FF14]/60 mt-0.5">→</span>
                      <div>
                        <p className="ct-mono text-[12px] text-white font-bold">{item.label}</p>
                        <p className="ct-mono text-[10px] text-white/30 mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
