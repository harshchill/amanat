import prisma from '../../../lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { customerName, customerEmail, customerPassword, customerRole, productId, serialNumber, soldById } = await req.json();

    // 1. Validate required fields
    if (!customerName || !customerEmail || !serialNumber || !productId || !soldById) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // 2. Check if customer already exists by email
    let customer = await prisma.user.findUnique({
      where: { email: customerEmail },
    });

    // 3. If customer doesn't exist, create them
    if (!customer) {
      const bcrypt = require('bcryptjs');
      const hashedPassword = customerPassword ? await bcrypt.hash(customerPassword, 10) : await bcrypt.hash('DefaultPassword123!', 10);

      customer = await prisma.user.create({
        data: {
          name: customerName,
          email: customerEmail,
          password: hashedPassword,
          role: customerRole || 'CUSTOMER',
        },
      });
    }

    // 4. Check if product exists
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    // 5. Check if serial number is already used
    const existingSoldItem = await prisma.soldItem.findUnique({
      where: { serialNumber },
    });

    if (existingSoldItem) {
      return NextResponse.json(
        { error: 'Serial number already exists' },
        { status: 409 }
      );
    }

    // 6. Create sold item entry
    const soldItem = await prisma.soldItem.create({
      data: {
        serialNumber,
        ownerId: customer.id,
        productId,
        soldById,
      },
      include: {
        owner: true,
        product: true,
        soldBy: true,
      },
    });

    return NextResponse.json(
      {
        message: 'Sold item created successfully',
        soldItem,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating sold item:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const soldItems = await prisma.soldItem.findMany({
      include: {
        owner: true,
        product: true,
        soldBy: true,
        tickets: true,
      },
    });

    return NextResponse.json(soldItems, { status: 200 });
  } catch (error) {
    console.error('Error fetching sold items:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
