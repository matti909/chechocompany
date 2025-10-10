import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { orders, orderItems } from '@/db/schema';
import { nanoid } from 'nanoid';

interface CartItem {
  id: string;
  name: string;
  subtitle?: string;
  image?: string;
  quantity: number;
  price: number;
  thc?: string;
  genotype?: string;
  color?: string;
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

interface OrderRequest {
  customerInfo: CustomerInfo;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  orderNumber: string;
  userId?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as OrderRequest;
    const { customerInfo, items, subtotal, shipping, total, orderNumber, userId } = body;

    // Validate required fields
    if (!customerInfo || !items || !orderNumber) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create the order
    const orderId = nanoid();

    await db.insert(orders).values({
      id: orderId,
      orderNumber,
      userId: userId || null,
      customerName: customerInfo.fullName,
      customerEmail: customerInfo.email,
      customerPhone: customerInfo.phone,
      shippingAddress: customerInfo.address,
      shippingCity: customerInfo.city,
      shippingPostalCode: customerInfo.postalCode,
      subtotal: subtotal.toString(),
      shippingCost: shipping.toString(),
      total: total.toString(),
      status: 'pending',
      notes: customerInfo.notes || null,
    });

    // Create order items
    const orderItemsData = items.map((item: CartItem) => ({
      id: nanoid(),
      orderId,
      productId: item.id,
      productName: item.name,
      productSubtitle: item.subtitle || null,
      productImage: item.image || null,
      quantity: item.quantity,
      unitPrice: item.price.toString(),
      totalPrice: (item.price * item.quantity).toString(),
      thc: item.thc || null,
      genotype: item.genotype || null,
      color: item.color || null,
    }));

    await db.insert(orderItems).values(orderItemsData);

    return NextResponse.json(
      {
        success: true,
        orderId,
        orderNumber,
        message: 'Order created successfully'
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { error: 'Failed to create order', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
