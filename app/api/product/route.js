import prisma from '../../../lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const products = await prisma.product.findMany();
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const { name, modelNumber, imgUrl, warrantyMonths } = await req.json();

    if (!name || !modelNumber) {
      return NextResponse.json(
        { error: 'Name and model number are required' },
        { status: 400 }
      );
    }

    const product = await prisma.product.create({
      data: {
        name,
        modelNumber,
        imgUrl: imgUrl || 'https://via.placeholder.com/300',
        warrantyMonths: warrantyMonths || 12,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
