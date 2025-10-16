import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface OrderItem {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  quantity: number;
  thc: string;
  genotype: string;
  color: string;
}

interface CustomerInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  notes?: string;
}

interface OrderData {
  customerInfo: CustomerInfo;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  orderNumber: string;
}

export async function POST(request: NextRequest) {
  try {
    const orderData: OrderData = await request.json();
    if (!orderData.customerInfo.email || !orderData.items.length) {
      return NextResponse.json(
        { error: "Datos de pedido incompletos" },
        { status: 400 },
      );
    }

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: "Error de configuración del servidor" },
        { status: 500 },
      );
    }

    const orderItemsHtml = orderData.items
      .map(
        (item) => `
      <div style="background: rgba(0, 0, 0, 0.5); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 15px; padding: 20px; margin-bottom: 15px;">
        <div style="display: flex; justify-content: space-between; align-items: start; gap: 20px;">
          <div style="flex: 1;">
            <h3 style="color: #10b981; margin: 0 0 5px 0; font-size: 18px;">${item.name}</h3>
            <p style="color: #84cc16; margin: 0 0 10px 0; font-size: 14px;">${item.subtitle}</p>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; font-size: 13px;">
              <div>
                <span style="color: #666;">THC:</span>
                <span style="color: white;">${item.thc}</span>
              </div>
              <div>
                <span style="color: #666;">Genotipo:</span>
                <span style="color: white;">${item.genotype}</span>
              </div>
            </div>
          </div>
          <div style="text-align: right; min-width: 120px;">
            <div style="color: #10b981; font-size: 20px; font-weight: bold; margin-bottom: 5px;">
              $${item.price.toLocaleString()}
            </div>
            <div style="color: #666; font-size: 14px;">
              Cantidad: ${item.quantity}
            </div>
            <div style="color: white; font-size: 14px; font-weight: bold; margin-top: 5px;">
              Total: $${(item.price * item.quantity).toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    `,
      )
      .join("");

    const customerEmailData = {
      from: "contacto@chexseeds.com",
      to: orderData.customerInfo.email,
      subject: `✅ Pedido Confirmado #${orderData.orderNumber} - CHEX SEEDS`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto; background: linear-gradient(135deg, #000000, #1a1a1a); color: white; border-radius: 20px; overflow: hidden;">
          <!-- Header -->
          <div style="background: linear-gradient(90deg, #10b981, #84cc16); padding: 40px 30px; text-align: center;">
            <h1 style="margin: 0; color: black; font-weight: bold; font-size: 28px;">
              🌿 CHEX SEEDS
            </h1>
            <p style="margin: 10px 0 0 0; color: rgba(0, 0, 0, 0.8); font-size: 16px; font-weight: 600;">Cannabis del Futuro</p>
          </div>

          <!-- Success Badge -->
          <div style="padding: 30px; text-align: center;">
            <div style="display: inline-block; background: rgba(16, 185, 129, 0.2); border: 3px solid #10b981; border-radius: 50%; width: 100px; height: 100px; line-height: 94px; font-size: 48px; margin-bottom: 20px;">
              ✅
            </div>
            <h2 style="color: #10b981; margin: 0 0 10px 0; font-size: 32px; font-weight: bold;">¡Pedido Confirmado!</h2>
            <p style="color: #84cc16; font-size: 18px; margin: 0;">Pedido #${orderData.orderNumber}</p>
          </div>

          <!-- Customer Info -->
          <div style="padding: 0 30px 30px 30px;">
            <div style="background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 15px; padding: 25px; margin-bottom: 25px;">
              <h3 style="color: #10b981; margin: 0 0 20px 0; font-size: 20px;">¡Gracias ${orderData.customerInfo.fullName}!</h3>
              <p style="color: white; line-height: 1.6; margin: 0 0 20px 0;">
                Tu pedido ha sido confirmado y está siendo preparado con el máximo cuidado. Te enviaremos actualizaciones sobre el estado de tu envío a este email.
              </p>

              <div style="background: rgba(0, 0, 0, 0.3); border-radius: 10px; padding: 20px; margin-top: 20px;">
                <h4 style="color: #84cc16; margin: 0 0 15px 0; font-size: 16px;">📦 Información de Envío</h4>
                <div style="display: grid; gap: 10px; font-size: 14px;">
                  <div>
                    <span style="color: #666;">Nombre:</span>
                    <span style="color: white;">${orderData.customerInfo.fullName}</span>
                  </div>
                  <div>
                    <span style="color: #666;">Email:</span>
                    <span style="color: #10b981;">${orderData.customerInfo.email}</span>
                  </div>
                  <div>
                    <span style="color: #666;">Teléfono:</span>
                    <span style="color: white;">${orderData.customerInfo.phone}</span>
                  </div>
                  <div>
                    <span style="color: #666;">Dirección:</span>
                    <span style="color: white;">${orderData.customerInfo.address}, ${orderData.customerInfo.city} (CP: ${orderData.customerInfo.postalCode})</span>
                  </div>
                  ${
                    orderData.customerInfo.notes
                      ? `
                  <div>
                    <span style="color: #666;">Notas:</span>
                    <span style="color: white;">${orderData.customerInfo.notes}</span>
                  </div>
                  `
                      : ""
                  }
                </div>
              </div>
            </div>

            <!-- Order Items -->
            <div style="background: rgba(132, 204, 22, 0.1); border: 1px solid rgba(132, 204, 22, 0.3); border-radius: 15px; padding: 25px; margin-bottom: 25px;">
              <h3 style="color: #84cc16; margin: 0 0 20px 0; font-size: 20px;">🧬 Tus Genéticas</h3>
              ${orderItemsHtml}
            </div>

            <!-- Order Summary -->
            <div style="background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 15px; padding: 25px; margin-bottom: 25px;">
              <h3 style="color: #10b981; margin: 0 0 20px 0; font-size: 20px;">💰 Resumen del Pedido</h3>
              <div style="display: grid; gap: 12px; font-size: 16px;">
                <div style="display: flex; justify-content: space-between;">
                  <span style="color: #666;">Subtotal:</span>
                  <span style="color: white; font-weight: 600;">$${orderData.subtotal.toLocaleString()}</span>
                </div>
                <div style="display: flex; justify-content: space-between;">
                  <span style="color: #666;">Envío:</span>
                  <span style="color: ${orderData.shipping === 0 ? "#10b981" : "white"}; font-weight: 600;">
                    ${orderData.shipping === 0 ? "GRATIS" : "$" + orderData.shipping.toLocaleString()}
                  </span>
                </div>
                <div style="border-top: 2px solid rgba(16, 185, 129, 0.3); padding-top: 12px; margin-top: 12px;">
                  <div style="display: flex; justify-content: space-between; font-size: 24px;">
                    <span style="color: white; font-weight: bold;">Total:</span>
                    <span style="color: #10b981; font-weight: bold;">$${orderData.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Timeline -->
            <div style="background: rgba(0, 0, 0, 0.5); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 15px; padding: 25px;">
              <h3 style="color: #10b981; margin: 0 0 20px 0; font-size: 20px;">⏱️ ¿Qué sigue?</h3>
              <div style="display: grid; gap: 20px;">
                <div style="display: flex; gap: 15px; align-items: start;">
                  <div style="background: #10b981; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 20px;">
                    📦
                  </div>
                  <div>
                    <h4 style="color: #10b981; margin: 0 0 5px 0; font-size: 16px;">Preparación del Pedido</h4>
                    <p style="color: #666; margin: 0; font-size: 14px;">1-2 días hábiles - Empaquetado con máximo cuidado</p>
                  </div>
                </div>
                <div style="display: flex; gap: 15px; align-items: start;">
                  <div style="background: #84cc16; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 20px;">
                    🚚
                  </div>
                  <div>
                    <h4 style="color: #84cc16; margin: 0 0 5px 0; font-size: 16px;">Envío</h4>
                    <p style="color: #666; margin: 0; font-size: 14px;">3-5 días hábiles - Envío discreto y seguro</p>
                  </div>
                </div>
                <div style="display: flex; gap: 15px; align-items: start;">
                  <div style="background: #10b981; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 20px;">
                    🎉
                  </div>
                  <div>
                    <h4 style="color: #10b981; margin: 0 0 5px 0; font-size: 16px;">¡A Cultivar!</h4>
                    <p style="color: #666; margin: 0; font-size: 14px;">Con garantía de 98% de germinación</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div style="background: rgba(16, 185, 129, 0.1); padding: 30px; text-align: center; border-top: 1px solid rgba(16, 185, 129, 0.3);">
            <p style="margin: 0 0 15px 0; color: white; font-size: 16px;">
              ¿Necesitas ayuda? Estamos aquí para ti
            </p>
            <p style="margin: 0 0 10px 0; color: #10b981; font-size: 14px;">
              📧 <strong>contacto@chexseeds.com</strong>
            </p>
            <p style="margin: 0 0 20px 0; color: #10b981; font-size: 14px;">
              🇦🇷 Buenos Aires, Argentina
            </p>
            <p style="margin: 0; color: #84cc16; font-size: 14px; font-weight: 600;">
              💚 Cultivando el futuro, una semilla a la vez
            </p>
          </div>
        </div>
      `,
    };

    // Company notification email
    const companyEmailData = {
      from: "contacto@chexseeds.com",
      to: "chexseed@gmail.com",
      subject: `🎉 NUEVO PEDIDO #${orderData.orderNumber} - $${orderData.total.toLocaleString()}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto; background: linear-gradient(135deg, #000000, #1a1a1a); color: white; border-radius: 20px; overflow: hidden;">
          <div style="background: linear-gradient(90deg, #10b981, #84cc16); padding: 30px; text-align: center;">
            <h1 style="margin: 0; color: black; font-weight: bold; font-size: 24px;">
              🎉 NUEVO PEDIDO RECIBIDO
            </h1>
            <p style="margin: 10px 0 0 0; color: rgba(0, 0, 0, 0.8); font-size: 18px;">
              Pedido #${orderData.orderNumber}
            </p>
          </div>

          <div style="padding: 30px;">
            <div style="background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 15px; padding: 25px; margin-bottom: 25px;">
              <h3 style="color: #10b981; margin: 0 0 20px 0; font-size: 20px;">👤 Cliente</h3>
              <div style="display: grid; gap: 10px; font-size: 14px;">
                <div><span style="color: #666;">Nombre:</span> <span style="color: white;">${orderData.customerInfo.fullName}</span></div>
                <div><span style="color: #666;">Email:</span> <span style="color: #10b981;">${orderData.customerInfo.email}</span></div>
                <div><span style="color: #666;">Teléfono:</span> <span style="color: white;">${orderData.customerInfo.phone}</span></div>
                <div><span style="color: #666;">Dirección:</span> <span style="color: white;">${orderData.customerInfo.address}, ${orderData.customerInfo.city} (CP: ${orderData.customerInfo.postalCode})</span></div>
                ${orderData.customerInfo.notes ? `<div><span style="color: #666;">Notas:</span> <span style="color: #84cc16;">${orderData.customerInfo.notes}</span></div>` : ""}
              </div>
            </div>

            <div style="background: rgba(132, 204, 22, 0.1); border: 1px solid rgba(132, 204, 22, 0.3); border-radius: 15px; padding: 25px; margin-bottom: 25px;">
              <h3 style="color: #84cc16; margin: 0 0 20px 0; font-size: 20px;">📦 Productos</h3>
              ${orderItemsHtml}
            </div>

            <div style="background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 15px; padding: 25px;">
              <h3 style="color: #10b981; margin: 0 0 20px 0; font-size: 20px;">💰 Total</h3>
              <div style="display: grid; gap: 12px; font-size: 16px;">
                <div style="display: flex; justify-content: space-between;">
                  <span style="color: #666;">Subtotal:</span>
                  <span style="color: white;">$${orderData.subtotal.toLocaleString()}</span>
                </div>
                <div style="display: flex; justify-content: space-between;">
                  <span style="color: #666;">Envío:</span>
                  <span style="color: white;">${orderData.shipping === 0 ? "GRATIS" : "$" + orderData.shipping.toLocaleString()}</span>
                </div>
                <div style="border-top: 2px solid rgba(16, 185, 129, 0.3); padding-top: 12px; margin-top: 12px;">
                  <div style="display: flex; justify-content: space-between; font-size: 28px;">
                    <span style="color: white; font-weight: bold;">Total:</span>
                    <span style="color: #10b981; font-weight: bold;">$${orderData.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `,
    };

    try {
      const companyResult = await resend.emails.send(companyEmailData);
      const customerResult = await resend.emails.send(customerEmailData);

      return NextResponse.json(
        {
          message: "Emails de confirmación enviados exitosamente",
          companyEmailSent: true,
          customerEmailSent: true,
        },
        { status: 200 },
      );
    } catch (emailError) {
      return NextResponse.json(
        {
          error:
            "Error al enviar emails de confirmación: " +
            (emailError as Error).message,
        },
        { status: 500 },
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 },
    );
  }
}
