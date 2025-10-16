import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
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

    // Mensaje de prueba simple
    const message = '🧪 Test desde ChexSeeds - ' + new Date().toLocaleTimeString('es-AR');

    // Intentar enviar mensaje
    const response = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${process.env.TWILIO_ACCOUNT_SID}/Messages.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + Buffer.from(
            `${process.env.TWILIO_API_KEY_SID}:${process.env.TWILIO_API_KEY_SECRET}`
          ).toString('base64')
        },
        body: new URLSearchParams({
          From: process.env.TWILIO_WHATSAPP_NUMBER,
          To: process.env.CLIENT_WHATSAPP_NUMBER,
          Body: message
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error('❌ Twilio Error:', data);
      return NextResponse.json({
        success: false,
        error: data.message || 'Failed to send',
        code: data.code,
        moreInfo: data.more_info,
        config: config,
        status: response.status
      }, { status: response.status });
    }

    console.log('✅ Message sent:', data.sid);

    return NextResponse.json({
      success: true,
      messageSid: data.sid,
      status: data.status,
      message: 'WhatsApp test message sent successfully!',
      config: config
    });

  } catch (error) {
    console.error('💥 Exception:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 });
  }
}
