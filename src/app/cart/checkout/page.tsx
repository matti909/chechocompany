"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "../../components/navbar";
import { Footer } from "../../components/footer";
import { Button } from "@/components/ui/button";
import useCartStore from "@/store/cart-store";
import { useAuthStore } from "@/store/auth-store";
import { toast } from "sonner";
import {
  CreditCard,
  ArrowLeft,
  ArrowRight,
  User,
  Mail,
  Phone,
  MapPin,
  FileText,
  CheckCircle,
  Shield,
  Truck,
  Package,
  ShoppingBag,
  AlertCircle,
  Clock,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const colorSchemes = {
  pink: "from-pink-500 to-purple-500",
  emerald: "from-emerald-500 to-lime-500",
  blue: "from-blue-500 to-purple-500",
  orange: "from-orange-500 to-yellow-500",
  purple: "from-purple-500 to-violet-500",
  cyan: "from-cyan-500 to-blue-500",
};

export default function CheckoutPage() {
  const router = useRouter();
  const {
    items,
    totalItems,
    totalPrice,
    checkout,
    setCheckoutStep,
    updateCustomerInfo,
    setSubmitting,
    completeOrder,
    resetCheckout,
  } = useCartStore();

  const { session } = useAuthStore();
  const [isClient, setIsClient] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setIsClient(true);
    // Reset checkout when component mounts
    resetCheckout();
  }, [resetCheckout]);

  useEffect(() => {
    // Redirect to cart if no items
    if (isClient && items.length === 0 && !checkout.orderPlaced) {
      router.push("/cart");
    }
  }, [items.length, isClient, router, checkout.orderPlaced]);

  const validateStep1 = () => {
    const errors: Record<string, string> = {};
    const { customerInfo } = checkout;

    if (!customerInfo.fullName.trim()) {
      errors.fullName = "El nombre completo es requerido";
    }

    if (!customerInfo.email.trim()) {
      errors.email = "El email es requerido";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerInfo.email)) {
      errors.email = "Formato de email inválido";
    }

    if (!customerInfo.phone.trim()) {
      errors.phone = "El teléfono es requerido";
    }

    if (!customerInfo.address.trim()) {
      errors.address = "La dirección es requerida";
    }

    if (!customerInfo.city.trim()) {
      errors.city = "La ciudad es requerida";
    }

    if (!customerInfo.postalCode.trim()) {
      errors.postalCode = "El código postal es requerido";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep1()) {
      setCheckoutStep(2);
    }
  };

  const handleFinalSubmit = async () => {
    setSubmitting(true);

    try {
      // Generate order number
      const orderNumber = `CHX-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

      // Prepare order data
      const orderData = {
        customerInfo: checkout.customerInfo,
        items: items,
        subtotal: subtotal,
        shipping: shipping,
        total: finalTotal,
        orderNumber: orderNumber,
        userId: session?.user?.id || null,
      };

      // Show loading toast
      toast.loading("Procesando tu pedido...", { id: "order-processing" });

      // 1. Save order to database
      const orderResponse = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!orderResponse.ok) {
        const errorData = await orderResponse.json();
        throw new Error(errorData.error || "Error al guardar el pedido");
      }

      await orderResponse.json();
      toast.success("Pedido guardado exitosamente!", {
        id: "order-processing",
      });

      // 2. Send confirmation email
      toast.loading("Enviando email de confirmación...", {
        id: "email-sending",
      });
      const emailResponse = await fetch("/api/order-confirmation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!emailResponse.ok) {
        toast.error("No se pudo enviar el email de confirmación", {
          id: "email-sending",
        });
      } else {
        toast.success("Email de confirmación enviado!", {
          id: "email-sending",
        });
      }

      // 3. Send WhatsApp notification
      toast.loading("Enviando notificación de WhatsApp...", {
        id: "whatsapp-sending",
      });
      const whatsappResponse = await fetch("/api/notify-whatsapp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!whatsappResponse.ok) {
        toast.error("No se pudo enviar la notificación de WhatsApp", {
          id: "whatsapp-sending",
        });
      } else {
        toast.success("Notificación de WhatsApp enviada!", {
          id: "whatsapp-sending",
        });
      }

      // 4. Show final success message
      toast.success(`¡Pedido completado! Número: ${orderNumber}`, {
        duration: 5000,
        description: "Recibirás un email con los detalles del envío",
      });

      completeOrder();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Error al procesar el pedido",
        {
          id: "order-processing",
        },
      );
      setSubmitting(false);
    }
  };

  const subtotal = totalPrice;
  const shipping = subtotal > 100000 ? 0 : 8000;
  const finalTotal = subtotal + shipping;

  if (!isClient) {
    return null;
  }
  if (checkout.orderPlaced) {
    return (
      <div className="min-h-screen bg-black">
        <Navbar />

        <section className="relative py-32 overflow-hidden">
          {/* Background Effects */}
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-emerald-400/20 to-lime-400/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-16 w-48 h-48 bg-gradient-to-l from-blue-400/15 to-purple-400/15 rounded-full blur-3xl animate-pulse delay-1000" />

          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
            <div className="relative mx-auto w-32 h-32 mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/30 to-lime-500/30 rounded-full blur-xl animate-pulse" />
              <div className="relative w-32 h-32 bg-black/60 border border-emerald-500/30 rounded-full flex items-center justify-center">
                <CheckCircle className="w-16 h-16 text-emerald-400" />
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-emerald-300 to-lime-300 leading-none tracking-tight mb-6">
              ¡PEDIDO
              <br />
              <span className="text-3xl md:text-4xl text-emerald-400 font-light tracking-wide">
                confirmado!
              </span>
            </h1>

            <p className="text-xl text-gray-300 leading-relaxed mb-8 max-w-2xl mx-auto">
              Tu pedido ha sido procesado exitosamente. Recibirás un email de
              confirmación con todos los detalles y el seguimiento del envío.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="bg-black/60 border border-emerald-500/30 rounded-2xl p-6">
                <Package className="w-8 h-8 text-emerald-400 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">
                  Preparación
                </h3>
                <p className="text-gray-400 text-sm">1-2 días hábiles</p>
              </div>
              <div className="bg-black/60 border border-emerald-500/30 rounded-2xl p-6">
                <Truck className="w-8 h-8 text-lime-400 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">Envío</h3>
                <p className="text-gray-400 text-sm">3-5 días hábiles</p>
              </div>
              <div className="bg-black/60 border border-emerald-500/30 rounded-2xl p-6">
                <Shield className="w-8 h-8 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">Garantía</h3>
                <p className="text-gray-400 text-sm">98% germinación</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/genetics">
                <Button className="bg-gradient-to-r from-emerald-500 to-lime-500 hover:from-emerald-600 hover:to-lime-600 text-black font-bold px-8 py-4 text-lg transition-all duration-300 hover:scale-105">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Seguir Comprando
                </Button>
              </Link>

              <Link href="/contacto">
                <Button
                  variant="outline"
                  className="border-2 border-emerald-400 text-emerald-400 hover:bg-emerald-400/10 font-bold px-8 py-4 text-lg transition-all duration-300"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Contactar Soporte
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-24 pb-12 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-emerald-400/20 to-lime-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-16 w-48 h-48 bg-gradient-to-l from-blue-400/15 to-purple-400/15 rounded-full blur-3xl animate-pulse delay-1000" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-8">
            <Link href="/cart">
              <Button
                variant="outline"
                className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver al Carrito
              </Button>
            </Link>
          </div>

          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-lime-500 text-black px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider shadow-lg backdrop-blur-sm mb-6">
              <CreditCard className="w-4 h-4" />
              <span>CHECKOUT</span>
              <div className="w-2 h-2 bg-black rounded-full animate-pulse" />
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-emerald-300 to-lime-300 leading-none tracking-tight">
              FINALIZAR
              <br />
              <span className="text-3xl md:text-4xl lg:text-5xl text-emerald-400 font-light tracking-wide">
                compra
              </span>
            </h1>

            {/* Step Indicator */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <div
                className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                  checkout.step === 1
                    ? "bg-emerald-500/20 border border-emerald-500/40"
                    : "bg-gray-800/50"
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    checkout.step === 1 ? "bg-emerald-400" : "bg-gray-400"
                  }`}
                />
                <span
                  className={`text-sm font-medium ${
                    checkout.step === 1 ? "text-emerald-400" : "text-gray-400"
                  }`}
                >
                  Información Personal
                </span>
              </div>

              <div className="w-8 h-px bg-gray-600" />

              <div
                className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                  checkout.step === 2
                    ? "bg-emerald-500/20 border border-emerald-500/40"
                    : "bg-gray-800/50"
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    checkout.step === 2 ? "bg-emerald-400" : "bg-gray-400"
                  }`}
                />
                <span
                  className={`text-sm font-medium ${
                    checkout.step === 2 ? "text-emerald-400" : "text-gray-400"
                  }`}
                >
                  Confirmar Pedido
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Checkout Content */}
      <section className="relative pb-20">
        <div className="max-w-6xl mx-auto px-6">
          {checkout.step === 1 ? (
            // Step 1: Customer Information
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Form */}
              <div className="lg:col-span-2">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/30 via-lime-500/30 to-emerald-500/30 rounded-3xl blur-xl opacity-60" />
                  <div className="relative bg-black/90 backdrop-blur-xl border border-emerald-500/30 rounded-3xl p-8">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-lime-500 rounded-xl flex items-center justify-center">
                        <User className="w-6 h-6 text-black" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-white">
                          Información Personal
                        </h2>
                        <p className="text-gray-400">
                          Completa tus datos para el envío
                        </p>
                      </div>
                    </div>

                    <form onSubmit={handleStep1Submit} className="space-y-6">
                      {/* Full Name */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-emerald-400 font-mono uppercase tracking-wider flex items-center gap-2">
                          <User className="w-4 h-4" />
                          Nombre Completo *
                        </label>
                        <input
                          type="text"
                          value={checkout.customerInfo.fullName}
                          onChange={(e) =>
                            updateCustomerInfo({ fullName: e.target.value })
                          }
                          placeholder="Juan Pérez"
                          className="w-full px-4 py-3 bg-black/60 border border-emerald-500/30 rounded-xl text-white placeholder-gray-400 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200"
                        />
                        {formErrors.fullName && (
                          <div className="flex items-center gap-2 text-red-400 text-sm">
                            <AlertCircle className="w-4 h-4" />
                            <span>{formErrors.fullName}</span>
                          </div>
                        )}
                      </div>

                      {/* Email and Phone */}
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-emerald-400 font-mono uppercase tracking-wider flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            Email *
                          </label>
                          <input
                            type="email"
                            value={checkout.customerInfo.email}
                            onChange={(e) =>
                              updateCustomerInfo({ email: e.target.value })
                            }
                            placeholder="juan@email.com"
                            className="w-full px-4 py-3 bg-black/60 border border-emerald-500/30 rounded-xl text-white placeholder-gray-400 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200"
                          />
                          {formErrors.email && (
                            <div className="flex items-center gap-2 text-red-400 text-sm">
                              <AlertCircle className="w-4 h-4" />
                              <span>{formErrors.email}</span>
                            </div>
                          )}
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium text-emerald-400 font-mono uppercase tracking-wider flex items-center gap-2">
                            <Phone className="w-4 h-4" />
                            Teléfono *
                          </label>
                          <input
                            type="tel"
                            value={checkout.customerInfo.phone}
                            onChange={(e) =>
                              updateCustomerInfo({ phone: e.target.value })
                            }
                            placeholder="+54 11 1234-5678"
                            className="w-full px-4 py-3 bg-black/60 border border-emerald-500/30 rounded-xl text-white placeholder-gray-400 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200"
                          />
                          {formErrors.phone && (
                            <div className="flex items-center gap-2 text-red-400 text-sm">
                              <AlertCircle className="w-4 h-4" />
                              <span>{formErrors.phone}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Address */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-emerald-400 font-mono uppercase tracking-wider flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          Dirección *
                        </label>
                        <input
                          type="text"
                          value={checkout.customerInfo.address}
                          onChange={(e) =>
                            updateCustomerInfo({ address: e.target.value })
                          }
                          placeholder="Av. Corrientes 1234"
                          className="w-full px-4 py-3 bg-black/60 border border-emerald-500/30 rounded-xl text-white placeholder-gray-400 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200"
                        />
                        {formErrors.address && (
                          <div className="flex items-center gap-2 text-red-400 text-sm">
                            <AlertCircle className="w-4 h-4" />
                            <span>{formErrors.address}</span>
                          </div>
                        )}
                      </div>

                      {/* City and Postal Code */}
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-emerald-400 font-mono uppercase tracking-wider">
                            Ciudad *
                          </label>
                          <input
                            type="text"
                            value={checkout.customerInfo.city}
                            onChange={(e) =>
                              updateCustomerInfo({ city: e.target.value })
                            }
                            placeholder="Buenos Aires"
                            className="w-full px-4 py-3 bg-black/60 border border-emerald-500/30 rounded-xl text-white placeholder-gray-400 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200"
                          />
                          {formErrors.city && (
                            <div className="flex items-center gap-2 text-red-400 text-sm">
                              <AlertCircle className="w-4 h-4" />
                              <span>{formErrors.city}</span>
                            </div>
                          )}
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium text-emerald-400 font-mono uppercase tracking-wider">
                            Código Postal *
                          </label>
                          <input
                            type="text"
                            value={checkout.customerInfo.postalCode}
                            onChange={(e) =>
                              updateCustomerInfo({ postalCode: e.target.value })
                            }
                            placeholder="1000"
                            className="w-full px-4 py-3 bg-black/60 border border-emerald-500/30 rounded-xl text-white placeholder-gray-400 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200"
                          />
                          {formErrors.postalCode && (
                            <div className="flex items-center gap-2 text-red-400 text-sm">
                              <AlertCircle className="w-4 h-4" />
                              <span>{formErrors.postalCode}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Notes */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-emerald-400 font-mono uppercase tracking-wider flex items-center gap-2">
                          <FileText className="w-4 h-4" />
                          Notas adicionales (opcional)
                        </label>
                        <textarea
                          value={checkout.customerInfo.notes}
                          onChange={(e) =>
                            updateCustomerInfo({ notes: e.target.value })
                          }
                          placeholder="Instrucciones especiales para el envío..."
                          rows={3}
                          className="w-full px-4 py-3 bg-black/60 border border-emerald-500/30 rounded-xl text-white placeholder-gray-400 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200 resize-none"
                        />
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-emerald-500 to-lime-500 hover:from-emerald-600 hover:to-lime-600 text-black font-bold py-4 text-lg transition-all duration-300 hover:scale-105"
                      >
                        <ArrowRight className="w-5 h-5 mr-2" />
                        Continuar al Resumen
                      </Button>
                    </form>
                  </div>
                </div>
              </div>

              {/* Order Summary Sidebar */}
              <div className="space-y-6">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-2xl blur-lg opacity-60" />
                  <div className="relative bg-black/90 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-6">
                    <h3 className="text-xl font-bold text-white mb-6">
                      Resumen del Pedido
                    </h3>

                    <div className="space-y-4 mb-6">
                      {items.slice(0, 3).map((item) => (
                        <div key={item.id} className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg overflow-hidden border-2 border-emerald-500/30">
                            {item.image ? (
                              <Image
                                src={item.image}
                                alt={item.name}
                                width={48}
                                height={48}
                                className="object-cover w-full h-full"
                              />
                            ) : (
                              <div
                                className={`w-full h-full bg-gradient-to-r ${colorSchemes[item.color as keyof typeof colorSchemes]}/20 flex items-center justify-center`}
                              >
                                <ShoppingBag className="w-6 h-6 text-emerald-400" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="text-white font-medium text-sm">
                              {item.name}
                            </div>
                            <div className="text-gray-400 text-xs">
                              {item.quantity}x ${item.price.toLocaleString()}
                            </div>
                          </div>
                        </div>
                      ))}
                      {items.length > 3 && (
                        <div className="text-center text-gray-400 text-sm">
                          +{items.length - 3} productos más
                        </div>
                      )}
                    </div>

                    <div className="space-y-2 pt-4 border-t border-emerald-500/30">
                      <div className="flex justify-between text-gray-400">
                        <span>Subtotal ({totalItems} productos)</span>
                        <span className="text-white">
                          ${subtotal.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between text-gray-400">
                        <span>Envío</span>
                        <span
                          className={
                            shipping === 0 ? "text-emerald-400" : "text-white"
                          }
                        >
                          {shipping === 0
                            ? "Gratis"
                            : `$${shipping.toLocaleString()}`}
                        </span>
                      </div>
                      <div className="flex justify-between text-xl font-bold pt-2 border-t border-emerald-500/30">
                        <span className="text-white">Total</span>
                        <span className="text-emerald-400">
                          ${finalTotal.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Step 2: Order Review
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Order Details */}
              <div className="lg:col-span-2 space-y-8">
                {/* Customer Info Review */}
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/30 via-lime-500/30 to-emerald-500/30 rounded-3xl blur-xl opacity-60" />
                  <div className="relative bg-black/90 backdrop-blur-xl border border-emerald-500/30 rounded-3xl p-8">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-lime-500 rounded-xl flex items-center justify-center">
                          <User className="w-6 h-6 text-black" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white">
                            Información de Envío
                          </h3>
                          <p className="text-gray-400">Revisa tus datos</p>
                        </div>
                      </div>
                      <Button
                        onClick={() => setCheckoutStep(1)}
                        variant="outline"
                        size="sm"
                        className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10"
                      >
                        Editar
                      </Button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 text-sm">
                      <div>
                        <div className="text-gray-400 mb-1">Nombre</div>
                        <div className="text-white font-medium">
                          {checkout.customerInfo.fullName}
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-400 mb-1">Email</div>
                        <div className="text-white font-medium">
                          {checkout.customerInfo.email}
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-400 mb-1">Teléfono</div>
                        <div className="text-white font-medium">
                          {checkout.customerInfo.phone}
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-400 mb-1">Ciudad</div>
                        <div className="text-white font-medium">
                          {checkout.customerInfo.city}
                        </div>
                      </div>
                      <div className="md:col-span-2">
                        <div className="text-gray-400 mb-1">Dirección</div>
                        <div className="text-white font-medium">
                          {checkout.customerInfo.address}, CP:{" "}
                          {checkout.customerInfo.postalCode}
                        </div>
                      </div>
                      {checkout.customerInfo.notes && (
                        <div className="md:col-span-2">
                          <div className="text-gray-400 mb-1">Notas</div>
                          <div className="text-white font-medium">
                            {checkout.customerInfo.notes}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Products Review */}
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-3xl blur-xl opacity-60" />
                  <div className="relative bg-black/90 backdrop-blur-xl border border-blue-500/30 rounded-3xl p-8">
                    <h3 className="text-xl font-bold text-white mb-6">
                      Productos en tu Pedido
                    </h3>

                    <div className="space-y-6">
                      {items.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center gap-6 p-4 bg-black/40 rounded-2xl border border-emerald-500/20"
                        >
                          <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-emerald-500/30">
                            {item.image ? (
                              <Image
                                src={item.image}
                                alt={item.name}
                                width={64}
                                height={64}
                                className="object-cover w-full h-full"
                              />
                            ) : (
                              <div
                                className={`w-full h-full bg-gradient-to-r ${colorSchemes[item.color as keyof typeof colorSchemes]}/20 flex items-center justify-center`}
                              >
                                <ShoppingBag className="w-8 h-8 text-emerald-400" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1">
                            <h4 className="text-lg font-bold text-white">
                              {item.name}
                            </h4>
                            <p className="text-emerald-400 mb-2">
                              {item.subtitle}
                            </p>
                            <div className="grid grid-cols-2 gap-4 text-sm text-gray-400">
                              <div>
                                THC:{" "}
                                <span className="text-white">{item.thc}</span>
                              </div>
                              <div>
                                Genotipo:{" "}
                                <span className="text-white">
                                  {item.genotype}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-emerald-400">
                              ${item.price.toLocaleString()}
                            </div>
                            <div className="text-sm text-gray-400">
                              Cantidad: {item.quantity}
                            </div>
                            <div className="text-sm text-white font-medium">
                              Total: $
                              {(item.price * item.quantity).toLocaleString()}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Final Summary and Submit */}
              <div className="space-y-6">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/50 via-lime-500/50 to-emerald-500/50 rounded-3xl blur-xl opacity-60" />
                  <div className="relative bg-black/90 backdrop-blur-xl border border-emerald-500/30 rounded-3xl p-8">
                    <h3 className="text-2xl font-bold text-white mb-6">
                      Total del Pedido
                    </h3>

                    <div className="space-y-4 mb-8">
                      <div className="flex justify-between text-gray-400">
                        <span>Subtotal ({totalItems} productos)</span>
                        <span className="text-white">
                          ${subtotal.toLocaleString()}
                        </span>
                      </div>

                      <div className="flex justify-between text-gray-400">
                        <span>Envío</span>
                        <span
                          className={
                            shipping === 0 ? "text-emerald-400" : "text-white"
                          }
                        >
                          {shipping === 0
                            ? "Gratis"
                            : `$${shipping.toLocaleString()}`}
                        </span>
                      </div>

                      <div className="border-t border-emerald-500/30 pt-4">
                        <div className="flex justify-between text-2xl font-bold">
                          <span className="text-white">Total Final</span>
                          <span className="text-emerald-400">
                            ${finalTotal.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    <Button
                      onClick={handleFinalSubmit}
                      disabled={checkout.isSubmitting}
                      className="w-full bg-gradient-to-r from-emerald-500 to-lime-500 hover:from-emerald-600 hover:to-lime-600 text-black font-bold py-4 text-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      {checkout.isSubmitting ? (
                        <>
                          <Clock className="w-5 h-5 mr-2 animate-spin" />
                          Procesando Pedido...
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-5 h-5 mr-2" />
                          Finalizar Compra
                        </>
                      )}
                    </Button>

                    <div className="text-center text-sm text-gray-400 mt-4">
                      Al finalizar aceptas nuestros términos y condiciones
                    </div>
                  </div>
                </div>

                {/* Security Info */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-emerald-400">
                    <Shield className="w-5 h-5" />
                    <span className="text-white text-sm">Pago 100% seguro</span>
                  </div>
                  <div className="flex items-center gap-3 text-emerald-400">
                    <Truck className="w-5 h-5" />
                    <span className="text-white text-sm">
                      Envío discreto y seguro
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-emerald-400">
                    <CheckCircle className="w-5 h-5" />
                    <span className="text-white text-sm">
                      Garantía de germinación
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

