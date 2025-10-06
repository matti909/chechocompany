# Configuración de Notificaciones por WhatsApp

Este documento explica cómo configurar las notificaciones de WhatsApp para recibir alertas de nuevas compras en Chex Seeds.

## Opción Recomendada: Twilio WhatsApp API

### 1. Crear Cuenta en Twilio

1. Ve a [Twilio Console](https://www.twilio.com/console)
2. Crea una cuenta (tiene trial gratuito con crédito)
3. Verifica tu número de teléfono

### 2. Configurar WhatsApp Sandbox

1. En el dashboard de Twilio, ve a **Messaging** → **Try it out** → **Send a WhatsApp message**
2. Sigue las instrucciones para unirte al sandbox:
   - Envía un mensaje de WhatsApp al número de Twilio (ej: `+1 415 523 8886`)
   - El mensaje debe ser: `join <código-único>` (te lo dan en el dashboard)
3. Una vez unido, verás confirmación en WhatsApp

### 3. Obtener Credenciales

En tu Twilio Console, encuentra:

- **Account SID**: Dashboard principal
- **Auth Token**: Dashboard principal (click en "Show" para verlo)
- **WhatsApp Number**: El número del sandbox (formato: `whatsapp:+14155238886`)

### 4. Agregar Variables de Entorno en Vercel

Ejecuta estos comandos o agrégalas manualmente en Vercel Dashboard:

```bash
# Account SID de Twilio
vercel env add TWILIO_ACCOUNT_SID production

# Auth Token de Twilio
vercel env add TWILIO_AUTH_TOKEN production

# Número de WhatsApp de Twilio (formato: whatsapp:+14155238886)
vercel env add TWILIO_WHATSAPP_NUMBER production

# Tu número de WhatsApp para recibir notificaciones (formato: whatsapp:+5493515123456)
vercel env add CLIENT_WHATSAPP_NUMBER production
```

**IMPORTANTE:** El formato del número de WhatsApp debe incluir:
- Prefijo `whatsapp:`
- Código de país con `+` (ej: +54 para Argentina)
- Código de área SIN 0 (ej: 351 para Córdoba, no 0351)
- Número completo sin espacios

Ejemplo correcto: `whatsapp:+5493515123456`

### 5. Re-deploy en Vercel

Después de agregar las variables de entorno:

```bash
vercel deploy --prod
```

## Formato del Mensaje de WhatsApp

Cuando alguien completa una compra, recibirás un mensaje como este:

```
🌿 NUEVA COMPRA - CHEX SEEDS 🌿

📋 Pedido: #CHX-1234567890-ABC123

👤 Cliente:
Nombre: Juan Pérez
Email: juan@email.com
Teléfono: +54 351 123-4567

📍 Envío:
Av. Colón 123, Dpto 4B
Córdoba, Córdoba
CP: 5000

🛍️ Productos:
1. EPILEPSIA
   Big Bud x Skunk #1
   Cantidad: 1
   Precio: $45.000

💰 Resumen:
Subtotal: $45.000
Envío: $8.000
TOTAL: $53.000

📝 Notas:
Preferencia de horario: 14-18hs

---
⏰ 5/10/2025, 10:30:45
```

## Flujo de Notificaciones

Cuando un cliente completa una compra:

1. ✅ Se genera el número de orden
2. ✅ Se envía email de confirmación al cliente
3. ✅ Se envía email de notificación a pedidos@chexseeds.com
4. ✅ **Se envía mensaje de WhatsApp a tu número** ← NUEVO

## Costos de Twilio

- **Trial Account**: Crédito gratuito inicial (~$15 USD)
- **WhatsApp Sandbox**: GRATIS (para pruebas)
- **WhatsApp Business API (producción)**: ~$0.005 USD por mensaje
  - 1000 mensajes = ~$5 USD/mes

## Límites del Sandbox

- ⚠️ Solo puedes enviar mensajes a números que se hayan unido al sandbox
- ⚠️ Aparecerá "Sent from your Twilio Sandbox number" en los mensajes
- ⚠️ No es ideal para producción

## Upgrade a WhatsApp Business API (Producción)

Para producción real sin limitaciones:

1. Ve a Twilio Console → Messaging → WhatsApp
2. Solicita acceso a **WhatsApp Business API**
3. Completa el proceso de verificación de negocio
4. Usa un número de WhatsApp dedicado

## Testing

Para probar que funciona:

1. Asegúrate de estar unido al WhatsApp Sandbox de Twilio
2. Haz una compra de prueba en chexseeds.com
3. Deberías recibir el mensaje en WhatsApp en ~5 segundos

## Troubleshooting

### No recibo mensajes

1. Verifica que estás unido al sandbox (`join <codigo>`)
2. Revisa que el número en `CLIENT_WHATSAPP_NUMBER` sea correcto
3. Chequea los logs en Vercel: `vercel logs`
4. Revisa la consola de Twilio para ver errores

### Error de autenticación

1. Verifica que `TWILIO_ACCOUNT_SID` y `TWILIO_AUTH_TOKEN` sean correctos
2. Asegúrate de que el Auth Token no haya expirado

### Mensaje no formateado

WhatsApp usa **markdown básico**:
- `*texto*` = **negrita**
- `_texto_` = _cursiva_
- Los emojis funcionan perfectamente

## Alternativas

Si prefieres otra opción:

1. **WhatsApp Business API Oficial**: Requiere aprobación de Meta
2. **Waboxapp**: API no oficial, más simple pero menos confiable
3. **Baileys**: Librería open-source para WhatsApp Web
4. **360Dialog**: Partner oficial de WhatsApp Business API

## Soporte

Para más info:
- [Twilio WhatsApp Docs](https://www.twilio.com/docs/whatsapp)
- [Twilio Console](https://console.twilio.com/)
