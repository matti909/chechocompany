"use server";

import { MercadoPagoConfig, Preference } from "mercadopago";

const mercadopago = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
});

interface CheckoutData {
  orderNumber: string;
  customerData: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
    notes?: string;
  };
  cartItems: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    image?: string;
  }>;
  cartTotal: number;
}

export async function createPaymentPreference(checkoutData: CheckoutData) {
  const { orderNumber, customerData, cartItems, cartTotal } = checkoutData;

  if (!orderNumber || !customerData || !cartItems || cartItems.length === 0) {
    throw new Error("Datos de checkout incompletos");
  }

  const items = cartItems.map((item) => ({
    id: item.id,
    title: item.name,
    description: item.name,
    category_id: "others",
    unit_price: item.price,
    quantity: item.quantity,
    currency_id: "ARS" as const,
  }));

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    process.env.BASE_URL ||
    "http://localhost:3000";

  const preferenceBody = {
    items,
    payer: {
      email: customerData.email,
      first_name: customerData.fullName.split(" ")[0],
      last_name: customerData.fullName.split(" ").slice(1).join(" ") || customerData.fullName,
    },
    back_urls: {
      success: `${baseUrl}/checkout/success`,
      failure: `${baseUrl}/checkout/failure`,
      pending: `${baseUrl}/checkout/pending`,
    },
    auto_return: "approved" as const,
    notification_url: `${baseUrl}/api/webhooks/mercadopago`,
    external_reference: orderNumber,
    statement_descriptor: "Chex Seeds",
  };

  try {
    const preference = new Preference(mercadopago).create({
      body: preferenceBody,
    });

    // Use sandbox in development, production in production
    const isDevelopment = process.env.NODE_ENV === "development";
    const paymentUrl = isDevelopment
      ? (await preference).sandbox_init_point!
      : (await preference).init_point;

    console.log(
      `🟢 [5] Using ${isDevelopment ? "SANDBOX" : "PRODUCTION"} URL:`,
      paymentUrl,
    );

    return paymentUrl;
  } catch (error: any) {
    console.log("🔴 [5] Error al crear preferencia:");
    console.log("🔴 Error completo:", JSON.stringify(error, null, 2));
    console.log("🔴 Error message:", error.message);
    console.log("🔴 Error stack:", error.stack);
    throw error;
  }
}

