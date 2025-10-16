"use client";

import { useState } from "react";
import { Navbar } from "../components/navbar";
import { Footer } from "../components/footer";
import { Button } from "@/components/ui/button";
import {
  Send,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  Leaf,
  Zap,
  Instagram,
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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
    <div className="min-h-screen bg-black">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-emerald-400/20 to-lime-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-16 w-48 h-48 bg-gradient-to-l from-green-400/15 to-yellow-400/15 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/3 right-1/4 w-20 h-20 bg-emerald-300/30 rounded-lg rotate-45 blur-xl animate-bounce" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            {/* Badge */}
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-lime-500 text-black px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider shadow-lg backdrop-blur-sm mb-8">
              <MessageSquare className="w-4 h-4" />
              <span>CONTACTO</span>
              <div className="w-2 h-2 bg-black rounded-full animate-pulse" />
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-emerald-300 to-lime-300 leading-none tracking-tight mb-6">
              HABLEMOS
              <br />
              <span className="text-3xl md:text-4xl lg:text-5xl text-emerald-400 font-light tracking-wide">
                del futuro
              </span>
            </h1>

            <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto font-light">
              ¿Tienes preguntas sobre nuestras genéticas? ¿Necesitas asesoría
              personalizada? Nuestro equipo de expertos está aquí para ayudarte
              a alcanzar el máximo potencial en tu cultivo.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Contact Form */}
            <div className="relative">
              {/* Gradient border effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/50 via-lime-500/50 to-emerald-500/50 rounded-3xl blur-xl opacity-60" />

              <div className="relative bg-black/90 backdrop-blur-xl border border-emerald-500/30 rounded-3xl p-8">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-lime-500 rounded-xl flex items-center justify-center">
                    <Send className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      Envíanos un mensaje
                    </h2>
                    <p className="text-gray-400">
                      Te respondemos en menos de 24 horas
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-emerald-400 font-mono uppercase tracking-wider">
                        Nombre
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="Tu nombre completo"
                        className="w-full px-4 py-3 bg-black/60 border border-emerald-500/30 rounded-xl text-white placeholder-gray-400 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-emerald-400 font-mono uppercase tracking-wider">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="tu@email.com"
                        className="w-full px-4 py-3 bg-black/60 border border-emerald-500/30 rounded-xl text-white placeholder-gray-400 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-emerald-400 font-mono uppercase tracking-wider">
                      Asunto
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      placeholder="¿De qué quieres hablar?"
                      className="w-full px-4 py-3 bg-black/60 border border-emerald-500/30 rounded-xl text-white placeholder-gray-400 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-emerald-400 font-mono uppercase tracking-wider">
                      Mensaje
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      placeholder="Cuéntanos más detalles sobre tu consulta..."
                      className="w-full px-4 py-3 bg-black/60 border border-emerald-500/30 rounded-xl text-white placeholder-gray-400 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200 resize-none"
                    />
                  </div>

                  {/* Status Messages */}
                  {submitStatus === "success" && (
                    <div className="flex items-center gap-3 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400">
                      <CheckCircle className="w-5 h-5" />
                      <span>
                        ¡Mensaje enviado exitosamente! Te contactaremos pronto.
                      </span>
                    </div>
                  )}

                  {submitStatus === "error" && (
                    <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400">
                      <AlertCircle className="w-5 h-5" />
                      <span>
                        Error al enviar el mensaje. Por favor intenta
                        nuevamente.
                      </span>
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-emerald-500 to-lime-500 hover:from-emerald-600 hover:to-lime-600 text-black font-bold py-4 px-6 rounded-xl transition-all duration-300 hover:scale-[1.02] group relative overflow-hidden disabled:opacity-50"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                    <div className="flex items-center justify-center gap-3 relative z-10">
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                          <span>Enviando...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          <span>Enviar Mensaje</span>
                        </>
                      )}
                    </div>
                  </Button>
                </form>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Contact Cards */}
              <div className="space-y-6">
                {/* Email Card */}
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/30 to-lime-500/30 rounded-2xl blur-lg opacity-60 group-hover:opacity-80 transition-opacity" />
                  <div className="relative bg-black/90 backdrop-blur-xl border border-emerald-500/30 rounded-2xl p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-lime-500 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Mail className="w-6 h-6 text-black" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white mb-2">
                          Email Corporativo
                        </h3>
                        <p className="text-emerald-400 font-mono text-lg font-semibold">
                          contacto@chexseeds.com
                        </p>
                        <p className="text-gray-400 text-sm mt-2">
                          Para consultas generales y soporte técnico
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Instagram Card */}
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-pink-500/30 to-purple-500/30 rounded-2xl blur-lg opacity-60 group-hover:opacity-80 transition-opacity" />
                  <div className="relative bg-black/90 backdrop-blur-xl border border-pink-500/30 rounded-2xl p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Instagram className="w-6 h-6 text-black" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white mb-2">
                          Síguenos en Instagram
                        </h3>
                        <a
                          href="https://www.instagram.com/chexseeds.grow/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-pink-400 font-mono text-lg font-semibold hover:text-pink-300 transition-colors"
                        >
                          @chexseeds.grow
                        </a>
                        <p className="text-gray-400 text-sm mt-2">
                          Consejos, novedades y comunidad
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Location Card */}
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/30 to-lime-500/30 rounded-2xl blur-lg opacity-60 group-hover:opacity-80 transition-opacity" />
                  <div className="relative bg-black/90 backdrop-blur-xl border border-emerald-500/30 rounded-2xl p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-lime-500 rounded-xl flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-6 h-6 text-black" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white mb-2">
                          Ubicación
                        </h3>
                        <p className="text-emerald-400 font-semibold">
                          Ciudad de Córdoba
                        </p>
                        <p className="text-gray-400 text-sm mt-2">
                          Enviamos a toda Argentina
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Response Time Card */}
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-lime-500/30 to-emerald-500/30 rounded-2xl blur-lg opacity-60 group-hover:opacity-80 transition-opacity" />
                  <div className="relative bg-black/90 backdrop-blur-xl border border-lime-500/30 rounded-2xl p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-lime-500 to-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Clock className="w-6 h-6 text-black" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white mb-2">
                          Tiempo de Respuesta
                        </h3>
                        <p className="text-lime-400 font-semibold">
                          Menos de 24 horas
                        </p>
                        <p className="text-gray-400 text-sm mt-2">
                          Soporte técnico especializado garantizado
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Why Contact Us */}
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/50 via-lime-500/50 to-emerald-500/50 rounded-3xl blur-xl opacity-60" />
                <div className="relative bg-black/90 backdrop-blur-xl border border-emerald-500/30 rounded-3xl p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-lime-500 rounded-xl flex items-center justify-center">
                      <Leaf className="w-6 h-6 text-black" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">
                      ¿Por qué contactarnos?
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Zap className="w-5 h-5 text-emerald-400 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-white font-semibold">
                          Asesoría Personalizada
                        </p>
                        <p className="text-gray-400 text-sm">
                          Recomendaciones específicas para tu cultivo
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Zap className="w-5 h-5 text-lime-400 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-white font-semibold">
                          Soporte Técnico
                        </p>
                        <p className="text-gray-400 text-sm">
                          Resolvemos dudas sobre germinación y cultivo
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Zap className="w-5 h-5 text-emerald-400 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-white font-semibold">
                          Consultas Comerciales
                        </p>
                        <p className="text-gray-400 text-sm">
                          Mayoristas y distribuidores bienvenidos
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Animated particles overlay */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-emerald-400 rounded-full animate-ping" />
          <div className="absolute top-3/4 left-3/4 w-1 h-1 bg-lime-400 rounded-full animate-ping delay-1000" />
          <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-yellow-400 rounded-full animate-ping delay-500" />
        </div>
      </section>

      <Footer />
    </div>
  );
}

