import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const ordersFile = path.join(process.cwd(), 'src', 'data', 'orders.json');

export async function GET() {
  try {
    const data = fs.readFileSync(ordersFile, 'utf-8');
    const orders = data ? JSON.parse(data) : [];
    return NextResponse.json(orders);
  } catch (err) {
    console.error("Failed to read orders:", err);
    return NextResponse.json([]);
  }
}

export async function POST(req: NextRequest) {
  try {
    const { product, amount } = await req.json();
    const data = fs.readFileSync(ordersFile, 'utf-8');
    const orders = data ? JSON.parse(data) : [];

    const newOrder = {
      id: orders.length + 1,
      product,
      amount,
      date: new Date().toISOString(),
    };

    orders.push(newOrder);
    fs.writeFileSync(ordersFile, JSON.stringify(orders, null, 2));

    return NextResponse.json({ message: 'Order added', order: newOrder });
  } catch (err) {
    console.error("Failed to add order:", err);
    return NextResponse.json({ message: 'Error adding order' }, { status: 500 });
  }
}
