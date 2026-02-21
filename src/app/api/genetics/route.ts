import { NextResponse } from 'next/server';
import { getAllGenetics } from '@/lib/genetics';

export async function GET() {
  try {
    const genetics = getAllGenetics();
    return NextResponse.json(genetics);
  } catch (error) {
    console.error('Error fetching genetics:', error);
    return NextResponse.json({ error: 'Failed to fetch genetics' }, { status: 500 });
  }
}
