import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json();

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Todos los campos son requeridos" },
        { status: 400 },
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Formato de email inválido" },
        { status: 400 },
      );
    }

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: "Error de configuración del servidor" },
        { status: 500 },
      );
    }

    const companyEmailData = {
      from: "contacto@chexseeds.com",
      to: "matias.saantiago@gmail.com",
      subject: `[CONTACTO WEB] ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #000000, #1a1a1a); color: white; border-radius: 20px; overflow: hidden;">
          <!-- Header -->
          <div style="background: linear-gradient(90deg, #10b981, #84cc16); padding: 30px; text-align: center;">
            <h1 style="margin: 0; color: black; font-weight: bold; font-size: 24px;">
              🌿 NUEVO MENSAJE DE CONTACTO
            </h1>
          </div>

          <!-- Content -->
          <div style="padding: 40px 30px;">
            <div style="background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 15px; padding: 25px; margin-bottom: 25px;">
              <h2 style="color: #10b981; margin: 0 0 20px 0; font-size: 20px;">Información del Cliente</h2>

              <div style="display: grid; gap: 15px;">
                <div style="display: flex; align-items: center; gap: 10px;">
                  <span style="color: #84cc16; font-weight: bold; min-width: 80px;">Nombre:</span>
                  <span style="color: white;">${name}</span>
                </div>

                <div style="display: flex; align-items: center; gap: 10px;">
                  <span style="color: #84cc16; font-weight: bold; min-width: 80px;">Email:</span>
                  <span style="color: #10b981;">${email}</span>
                </div>

                <div style="display: flex; align-items: center; gap: 10px;">
                  <span style="color: #84cc16; font-weight: bold; min-width: 80px;">Asunto:</span>
                  <span style="color: white;">${subject}</span>
                </div>
              </div>
            </div>

            <div style="background: rgba(132, 204, 22, 0.1); border: 1px solid rgba(132, 204, 22, 0.3); border-radius: 15px; padding: 25px;">
              <h3 style="color: #84cc16; margin: 0 0 15px 0; font-size: 18px;">Mensaje:</h3>
              <div style="background: rgba(0, 0, 0, 0.5); padding: 20px; border-radius: 10px; border-left: 4px solid #10b981;">
                <p style="color: white; line-height: 1.6; margin: 0; white-space: pre-wrap;">${message}</p>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div style="background: rgba(16, 185, 129, 0.1); padding: 20px; text-align: center; border-top: 1px solid rgba(16, 185, 129, 0.3);">
            <p style="margin: 0; color: #10b981; font-size: 14px;">
              📧 Responder directamente a: <strong>${email}</strong>
            </p>
            <p style="margin: 10px 0 0 0; color: #84cc16; font-size: 12px;">
              💚 CHEX SEEDS - Cannabis del Futuro
            </p>
          </div>
        </div>
      `,
    };

    // Send auto-reply to customer
    const customerEmailData = {
      from: "contacto@chexseeds.com",
      to: email,
      subject: "✅ Hemos recibido tu mensaje - CHEX SEEDS",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #000000, #1a1a1a); color: white; border-radius: 20px; overflow: hidden;">
          <!-- Header -->
          <div style="background: linear-gradient(90deg, #10b981, #84cc16); padding: 30px; text-align: center;">
            <h1 style="margin: 0; color: black; font-weight: bold; font-size: 24px;">
              🌿 CHEX SEEDS
            </h1>
            <p style="margin: 10px 0 0 0; color: rgba(0, 0, 0, 0.8); font-size: 14px;">Cannabis del Futuro</p>
          </div>

          <!-- Content -->
          <div style="padding: 40px 30px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <div style="display: inline-block; background: rgba(16, 185, 129, 0.2); border: 2px solid #10b981; border-radius: 50%; width: 80px; height: 80px; line-height: 76px; font-size: 36px; margin-bottom: 20px;">
                ✅
              </div>
              <h2 style="color: #10b981; margin: 0; font-size: 24px;">¡Mensaje Recibido!</h2>
            </div>

            <div style="background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 15px; padding: 25px; margin-bottom: 25px;">
              <p style="color: white; line-height: 1.6; margin: 0 0 20px 0;">
                Hola <strong style="color: #84cc16;">${name}</strong>,
              </p>

              <p style="color: white; line-height: 1.6; margin: 0 0 20px 0;">
                Gracias por contactarnos. Hemos recibido tu mensaje sobre <strong style="color: #10b981;">"${subject}"</strong> y nuestro equipo de expertos lo está revisando.
              </p>

              <p style="color: white; line-height: 1.6; margin: 0;">
                Te responderemos en un plazo máximo de <strong style="color: #84cc16;">24 horas</strong> con la información que necesitas para llevar tu cultivo al siguiente nivel.
              </p>
            </div>

            <div style="background: rgba(132, 204, 22, 0.1); border: 1px solid rgba(132, 204, 22, 0.3); border-radius: 15px; padding: 25px; text-align: center;">
              <h3 style="color: #84cc16; margin: 0 0 15px 0; font-size: 18px;">Mientras tanto...</h3>

              <div style="display: grid; gap: 15px; text-align: left;">
                <div style="display: flex; align-items: center; gap: 10px;">
                  <span style="color: #10b981; font-size: 18px;">🧬</span>
                  <span style="color: white;">Explora nuestras genéticas premium</span>
                </div>

                <div style="display: flex; align-items: center; gap: 10px;">
                  <span style="color: #84cc16; font-size: 18px;">📚</span>
                  <span style="color: white;">Consulta nuestras guías de cultivo</span>
                </div>

                <div style="display: flex; align-items: center; gap: 10px;">
                  <span style="color: #10b981; font-size: 18px;">💬</span>
                  <span style="color: white;">Únete a nuestra comunidad</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div style="background: rgba(16, 185, 129, 0.1); padding: 20px; text-align: center; border-top: 1px solid rgba(16, 185, 129, 0.3);">
            <p style="margin: 0 0 10px 0; color: #10b981; font-size: 14px;">
              📧 <strong>contacto@chexseeds.com</strong> | 🇦🇷 Buenos Aires, Argentina
            </p>
            <p style="margin: 0; color: #84cc16; font-size: 12px;">
              💚 Cultivando el futuro, una semilla a la vez
            </p>
          </div>
        </div>
      `,
    };

    try {
      const companyResult = await resend.emails.send(companyEmailData);
      const customerResult = await resend.emails.send(customerEmailData);

      return NextResponse.json(
        { message: "Mensaje enviado exitosamente" },
        { status: 200 },
      );
    } catch (emailError) {
      return NextResponse.json(
        { error: "Error al enviar el email: " + (emailError as Error).message },
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
