import { NextRequest, NextResponse } from 'next/server';

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
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const twilioWhatsAppNumber = process.env.TWILIO_WHATSAPP_NUMBER; // Format: whatsapp:+14155238886
    const clientWhatsAppNumber = process.env.CLIENT_WHATSAPP_NUMBER; // Format: whatsapp:+5493515123456

    if (!accountSid || !authToken || !twilioWhatsAppNumber || !clientWhatsAppNumber) {
      console.error('Missing Twilio configuration');
      return NextResponse.json(
        { error: 'WhatsApp notification configuration incomplete' },
        { status: 500 }
      );
    }

    // Format items list
    const itemsList = items.map((item: OrderItem, index: number) =>
      `${index + 1}. *${item.name}*\n   ${item.subtitle}\n   Cantidad: ${item.quantity}\n   Precio: $${item.price.toLocaleString('es-AR')}`
    ).join('\n\n');

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

    // Send WhatsApp message via Twilio
    const response = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + Buffer.from(`${accountSid}:${authToken}`).toString('base64')
        },
        body: new URLSearchParams({
          From: twilioWhatsAppNumber,
          To: clientWhatsAppNumber,
          Body: message
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error('Twilio API error:', data);
      throw new Error(data.message || 'Failed to send WhatsApp message');
    }

    return NextResponse.json({
      success: true,
      messageSid: data.sid,
      message: 'WhatsApp notification sent successfully'
    });

  } catch (error) {
    console.error('Error sending WhatsApp notification:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
