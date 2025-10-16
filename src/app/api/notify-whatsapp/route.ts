import { NextRequest, NextResponse } from 'next/server';
import twilio from 'twilio';

interface OrderItem {
  name: string;
  subtitle: string;
  quantity: number;
  price: number;
}

export async function POST(request: NextRequest) {
  try {
    const orderData = await request.json();

    const {
      orderNumber,
      customerInfo,
      items,
      subtotal,
      shipping,
      total
    } = orderData;

    // Twilio credentials from environment variables
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const apiKeySid = process.env.TWILIO_API_KEY_SID;
    const apiKeySecret = process.env.TWILIO_API_KEY_SECRET;
    const twilioWhatsAppNumber = process.env.TWILIO_WHATSAPP_NUMBER; // Format: whatsapp:+14155238886
    const clientWhatsAppNumber = process.env.CLIENT_WHATSAPP_NUMBER; // Format: whatsapp:+5493515156822

    if (!accountSid || !apiKeySid || !apiKeySecret || !twilioWhatsAppNumber || !clientWhatsAppNumber) {
      console.error('Missing Twilio configuration');
      return NextResponse.json(
        { error: 'WhatsApp notification configuration incomplete' },
        { status: 500 }
      );
    }

    // Initialize Twilio client with API Key credentials
    const client = twilio(apiKeySid, apiKeySecret, { accountSid });

    // Format items list
    const itemsList = items
      .map((item: OrderItem, index: number) =>
        `${index + 1}. *${item.name}*\n   ${item.subtitle}\n   Cantidad: ${item.quantity}\n   Precio: $${item.price.toLocaleString('es-AR')}`
      )
      .join('\n\n');

    // Create WhatsApp message
    const message = `🌿 *NUEVA COMPRA - CHEX SEEDS* 🌿

📋 *Pedido:* #${orderNumber}

👤 *Cliente:*
Nombre: ${customerInfo.fullName}
Email: ${customerInfo.email}
Teléfono: ${customerInfo.phone}

📍 *Envío:*
${customerInfo.address}
${customerInfo.city}
CP: ${customerInfo.postalCode}

🛍️ *Productos:*
${itemsList}

💰 *Resumen:*
Subtotal: $${subtotal.toLocaleString('es-AR')}
Envío: $${shipping.toLocaleString('es-AR')}
*TOTAL: $${total.toLocaleString('es-AR')}*

📝 *Notas:*
${customerInfo.notes || 'Sin notas adicionales'}

---
⏰ ${new Date().toLocaleString('es-AR', { timeZone: 'America/Argentina/Cordoba' })}`;

    // Send WhatsApp message using Twilio SDK
    const messageResponse = await client.messages.create({
      from: twilioWhatsAppNumber,
      to: clientWhatsAppNumber,
      body: message
    });

    console.log('✅ WhatsApp sent:', messageResponse.sid);

    return NextResponse.json({
      success: true,
      messageSid: messageResponse.sid,
      status: messageResponse.status,
      message: 'WhatsApp notification sent successfully'
    });

  } catch (error) {
    console.error('❌ Error sending WhatsApp:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
