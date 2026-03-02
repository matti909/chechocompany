import { NextRequest, NextResponse } from "next/server";
import { MercadoPagoConfig, Payment } from "mercadopago";
import { db } from "@/db";
import { orders } from "@/db/schema";
import { eq } from "drizzle-orm";

const mercadopago = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, data } = body;

    // Solo procesamos notificaciones de pagos
    if (type !== "payment" || !data?.id) {
      return NextResponse.json({ received: true });
    }

    const paymentId = String(data.id);

    // Consultar el pago a la API de MP para verificarlo
    const payment = await new Payment(mercadopago).get({ id: paymentId });

    const orderNumber = payment.external_reference;
    const mpStatus = payment.status; // approved | rejected | in_process | pending
    const mpStatusDetail = payment.status_detail;

    if (!orderNumber) {
      console.error("[MP Webhook] Sin external_reference en el pago", paymentId);
      return NextResponse.json({ received: true });
    }

    // Mapear status de MP a status interno
    const internalStatus =
      mpStatus === "approved" ? "paid"
      : mpStatus === "rejected" ? "rejected"
      : "pending_payment";

    // Actualizar la orden en DB
    await db
      .update(orders)
      .set({
        status: internalStatus,
        mercadopagoPaymentId: paymentId,
        mercadopagoStatus: mpStatus ?? null,
      })
      .where(eq(orders.orderNumber, orderNumber));

    // Solo enviar notificaciones si el pago fue aprobado
    if (mpStatus === "approved") {
      const [order] = await db
        .select()
        .from(orders)
        .where(eq(orders.orderNumber, orderNumber))
        .limit(1);

      if (order) {
        const orderData = {
          orderNumber: order.orderNumber,
          customerInfo: {
            fullName: order.customerName,
            email: order.customerEmail,
            phone: order.customerPhone,
            address: order.shippingAddress,
            city: order.shippingCity,
            postalCode: order.shippingPostalCode,
          },
          total: order.total,
        };

        // Email de confirmación
        await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/order-confirmation`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderData),
        });

        // Notificación WhatsApp
        await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/notify-whatsapp`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderData),
        });
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("[MP Webhook] Error:", error);
    // Devolvemos 200 para que MP no reintente
    return NextResponse.json({ received: true });
  }
}
