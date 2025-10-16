import { NextResponse } from 'next/server';
import twilio from 'twilio';

export async function GET() {
  try {
    // Log environment variables (sin mostrar los valores completos por seguridad)
    const config = {
      accountSid: process.env.TWILIO_ACCOUNT_SID?.substring(0, 10) + '...',
      apiKeySid: process.env.TWILIO_API_KEY_SID?.substring(0, 10) + '...',
      hasApiKeySecret: !!process.env.TWILIO_API_KEY_SECRET,
      from: process.env.TWILIO_WHATSAPP_NUMBER,
      to: process.env.CLIENT_WHATSAPP_NUMBER
    };

    console.log('🔍 Twilio Config:', config);

    // Verificar que todas las variables existan
    if (!process.env.TWILIO_ACCOUNT_SID) {
      return NextResponse.json({ error: 'Missing TWILIO_ACCOUNT_SID' }, { status: 500 });
    }
    if (!process.env.TWILIO_API_KEY_SID) {
      return NextResponse.json({ error: 'Missing TWILIO_API_KEY_SID' }, { status: 500 });
    }
    if (!process.env.TWILIO_API_KEY_SECRET) {
      return NextResponse.json({ error: 'Missing TWILIO_API_KEY_SECRET' }, { status: 500 });
    }
    if (!process.env.TWILIO_WHATSAPP_NUMBER) {
      return NextResponse.json({ error: 'Missing TWILIO_WHATSAPP_NUMBER' }, { status: 500 });
    }
    if (!process.env.CLIENT_WHATSAPP_NUMBER) {
      return NextResponse.json({ error: 'Missing CLIENT_WHATSAPP_NUMBER' }, { status: 500 });
    }

    // Initialize Twilio client with API Key credentials
    const client = twilio(
      process.env.TWILIO_API_KEY_SID,
      process.env.TWILIO_API_KEY_SECRET,
      { accountSid: process.env.TWILIO_ACCOUNT_SID }
    );

    // Mensaje de prueba simple
    const message = '🧪 Test desde ChexSeeds - ' + new Date().toLocaleTimeString('es-AR');

    // Intentar enviar mensaje usando el SDK
    const messageResponse = await client.messages.create({
      from: process.env.TWILIO_WHATSAPP_NUMBER,
      to: process.env.CLIENT_WHATSAPP_NUMBER,
      body: message
    });

    console.log('✅ Message sent:', messageResponse.sid);

    return NextResponse.json({
      success: true,
      messageSid: messageResponse.sid,
      status: messageResponse.status,
      message: 'WhatsApp test message sent successfully!',
      config: config
    });

  } catch (error) {
    console.error('💥 Exception:', error);

    // Si es un error de Twilio, extraer detalles útiles
    const twilioError = error as any;

    return NextResponse.json({
      success: false,
      error: twilioError.message || 'Unknown error',
      code: twilioError.code,
      moreInfo: twilioError.moreInfo,
      status: twilioError.status
    }, { status: 500 });
  }
}
