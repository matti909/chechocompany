'use client';

import { useEffect, useState } from 'react';
import { Navbar } from '../components/navbar';
import { Footer } from '../components/footer';
import { Button } from '@/components/ui/button';
import useCartStore from '@/store/cart-store';
import {
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  ArrowLeft,
  CreditCard,
  Truck,
  Shield,
  Gift,
  CheckCircle,
  Zap
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const colorSchemes = {
  pink: 'from-pink-500 to-purple-500',
  emerald: 'from-emerald-500 to-lime-500',
  blue: 'from-blue-500 to-purple-500',
  orange: 'from-orange-500 to-yellow-500',
  purple: 'from-purple-500 to-violet-500',
  cyan: 'from-cyan-500 to-blue-500'
};

export default function CartPage() {
  const {
    items,
    totalItems,
    totalPrice,
    updateQuantity,
    removeItem,
    clearCart
  } = useCartStore();

  const [isClient, setIsClient] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === 'chex10') {
      setDiscount(0.1);
    } else if (promoCode.toLowerCase() === 'primera20') {
      setDiscount(0.2);
    } else {
      setDiscount(0);
    }
  };

  const subtotal = totalPrice;
  const discountAmount = subtotal * discount;
  const shipping = subtotal > 100000 ? 0 : 8000; // Free shipping over $100k
  const finalTotal = subtotal - discountAmount + shipping;

  // Prevent hydration errors
  if (!isClient) {
    return null;
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
            <Link href="/genetics">
              <Button variant="outline" className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Continuar Comprando
              </Button>
            </Link>
          </div>

          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-lime-500 text-black px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider shadow-lg backdrop-blur-sm mb-6">
              <ShoppingBag className="w-4 h-4" />
              <span>TU CARRITO</span>
              <div className="w-2 h-2 bg-black rounded-full animate-pulse" />
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-emerald-300 to-lime-300 leading-none tracking-tight">
              CARRITO DE
              <br />
              <span className="text-3xl md:text-4xl lg:text-5xl text-emerald-400 font-light tracking-wide">
                compras
              </span>
            </h1>

            {totalItems > 0 && (
              <p className="text-xl text-gray-300 mt-4">
                {totalItems} {totalItems === 1 ? 'producto' : 'productos'} en tu carrito
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Cart Content */}
      <section className="relative pb-20">
        <div className="max-w-7xl mx-auto px-6">
          {items.length === 0 ? (
            // Empty Cart
            <div className="text-center py-20">
              <div className="relative mx-auto w-32 h-32 mb-8">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-lime-500/20 rounded-full blur-xl" />
                <div className="relative w-32 h-32 bg-black/60 border border-emerald-500/30 rounded-full flex items-center justify-center">
                  <ShoppingBag className="w-16 h-16 text-emerald-400" />
                </div>
              </div>

              <h2 className="text-3xl font-bold text-white mb-4">Tu carrito está vacío</h2>
              <p className="text-gray-400 mb-8 max-w-md mx-auto">
                Explora nuestras genéticas premium y encuentra las semillas perfectas para tu cultivo
              </p>

              <Link href="/genetics">
                <Button className="bg-gradient-to-r from-emerald-500 to-lime-500 hover:from-emerald-600 hover:to-lime-600 text-black font-bold px-8 py-4 text-lg transition-all duration-300 hover:scale-105">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Explorar Genéticas
                </Button>
              </Link>
            </div>
          ) : (
            // Cart with Items
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-white">Productos</h2>
                  <Button
                    onClick={clearCart}
                    variant="outline"
                    className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Vaciar carrito
                  </Button>
                </div>

                {items.map((item) => (
                  <div key={item.id} className="group relative">
                    <div className={`absolute -inset-1 bg-gradient-to-r ${colorSchemes[item.color as keyof typeof colorSchemes]}/20 rounded-2xl blur-lg opacity-60 group-hover:opacity-80 transition-opacity duration-500`} />

                    <div className="relative bg-black/90 backdrop-blur-xl border border-emerald-500/30 rounded-2xl p-6">
                      <div className="grid md:grid-cols-4 gap-6 items-center">
                        {/* Product Image */}
                        <div className="relative">
                          <div className={`w-24 h-24 rounded-xl overflow-hidden border-2 border-emerald-500/30`}>
                            {item.image ? (
                              <Image
                                src={item.image}
                                alt={item.name}
                                width={96}
                                height={96}
                                className="object-cover w-full h-full"
                              />
                            ) : (
                              <div className={`w-full h-full bg-gradient-to-r ${colorSchemes[item.color as keyof typeof colorSchemes]}/20 flex items-center justify-center`}>
                                <ShoppingBag className="w-8 h-8 text-emerald-400" />
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Product Info */}
                        <div className="md:col-span-2">
                          <h3 className="text-xl font-bold text-white mb-1">{item.name}</h3>
                          <p className="text-emerald-400 mb-2">{item.subtitle}</p>
                          <div className="grid grid-cols-2 gap-4 text-sm text-gray-400">
                            <div>THC: <span className="text-white">{item.thc}</span></div>
                            <div>Genotipo: <span className="text-white">{item.genotype}</span></div>
                          </div>
                        </div>

                        {/* Quantity and Price */}
                        <div className="flex flex-col items-end gap-4">
                          <div className="text-right">
                            <div className="text-2xl font-bold text-emerald-400">${item.price.toLocaleString()}</div>
                            <div className="text-sm text-gray-400">por 3 semillas</div>
                          </div>

                          <div className="flex items-center gap-3">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 p-0 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10"
                            >
                              <Minus className="w-4 h-4" />
                            </Button>

                            <span className="w-8 text-center text-white font-semibold">{item.quantity}</span>

                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 p-0 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10"
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>

                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => removeItem(item.id)}
                            className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="space-y-6">
                {/* Summary Card */}
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/50 via-lime-500/50 to-emerald-500/50 rounded-3xl blur-xl opacity-60" />
                  <div className="relative bg-black/90 backdrop-blur-xl border border-emerald-500/30 rounded-3xl p-8">
                    <h3 className="text-2xl font-bold text-white mb-6">Resumen del Pedido</h3>

                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between text-gray-400">
                        <span>Subtotal ({totalItems} productos)</span>
                        <span className="text-white">${subtotal.toLocaleString()}</span>
                      </div>

                      {discount > 0 && (
                        <div className="flex justify-between text-emerald-400">
                          <span>Descuento ({(discount * 100).toFixed(0)}%)</span>
                          <span>-${discountAmount.toLocaleString()}</span>
                        </div>
                      )}

                      <div className="flex justify-between text-gray-400">
                        <span>Envío</span>
                        <span className={shipping === 0 ? 'text-emerald-400' : 'text-white'}>
                          {shipping === 0 ? 'Gratis' : `$${shipping.toLocaleString()}`}
                        </span>
                      </div>

                      {shipping === 0 && (
                        <div className="flex items-center gap-2 text-emerald-400 text-sm">
                          <CheckCircle className="w-4 h-4" />
                          <span>¡Envío gratis aplicado!</span>
                        </div>
                      )}

                      <div className="border-t border-emerald-500/30 pt-4">
                        <div className="flex justify-between text-xl font-bold">
                          <span className="text-white">Total</span>
                          <span className="text-emerald-400">${finalTotal.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    <Link href="/checkout">
                      <Button className="w-full bg-gradient-to-r from-emerald-500 to-lime-500 hover:from-emerald-600 hover:to-lime-600 text-black font-bold py-4 text-lg transition-all duration-300 hover:scale-105 mb-4">
                        <CreditCard className="w-5 h-5 mr-2" />
                        Proceder al Pago
                      </Button>
                    </Link>

                    <div className="text-center text-sm text-gray-400">
                      Pago seguro con encriptación SSL
                    </div>
                  </div>
                </div>

                {/* Promo Code */}
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-2xl blur-lg opacity-60" />
                  <div className="relative bg-black/90 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-6">
                    <h4 className="text-lg font-bold text-white mb-4">Código de Descuento</h4>

                    <div className="flex gap-2 mb-4">
                      <input
                        type="text"
                        placeholder="Ingresa tu código"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="flex-1 px-4 py-3 bg-black/60 border border-blue-500/30 rounded-xl text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                      />
                      <Button
                        onClick={applyPromoCode}
                        className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold px-6"
                      >
                        Aplicar
                      </Button>
                    </div>

                    {discount > 0 && (
                      <div className="flex items-center gap-2 text-emerald-400 text-sm">
                        <CheckCircle className="w-4 h-4" />
                        <span>¡Código aplicado! {(discount * 100).toFixed(0)}% de descuento</span>
                      </div>
                    )}

                    <div className="text-xs text-gray-400 mt-2">
                      Códigos disponibles: CHEX10 (10% off), PRIMERA20 (20% off)
                    </div>
                  </div>
                </div>

                {/* Benefits */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-emerald-400">
                    <Truck className="w-5 h-5" />
                    <span className="text-white">Envío gratis en compras +$100k</span>
                  </div>
                  <div className="flex items-center gap-3 text-emerald-400">
                    <Shield className="w-5 h-5" />
                    <span className="text-white">Garantía de germinación 98%</span>
                  </div>
                  <div className="flex items-center gap-3 text-emerald-400">
                    <Gift className="w-5 h-5" />
                    <span className="text-white">Semilla gratis en tu cumpleaños</span>
                  </div>
                  <div className="flex items-center gap-3 text-emerald-400">
                    <Zap className="w-5 h-5" />
                    <span className="text-white">Soporte técnico 24/7</span>
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