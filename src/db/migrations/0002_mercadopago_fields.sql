ALTER TABLE "orders" ADD COLUMN IF NOT EXISTS "mercadopago_payment_id" text;
--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN IF NOT EXISTS "mercadopago_status" text;
