import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const ordersFile = path.join(process.cwd(), "data", "orders.json");

type Order = {
  id: number;
  product: string;
  amount: number;
  phone: string;
  status: "NEW" | "CONTACTED" | "CONFIRMED" | "CANCELLED";
  date: string;
};

export async function GET() {
  try {
    const data = fs.existsSync(ordersFile)
      ? fs.readFileSync(ordersFile, "utf-8")
      : "[]";

    return NextResponse.json(JSON.parse(data));
  } catch {
    return NextResponse.json([]);
  }
}

export async function POST(req: NextRequest) {
  try {
    const { product, amount, phone } = await req.json();

    const data = fs.existsSync(ordersFile)
      ? fs.readFileSync(ordersFile, "utf-8")
      : "[]";

    const orders: Order[] = JSON.parse(data);

    const newOrder: Order = {
      id: Date.now(),
      product,
      amount,
      phone,
      status: "NEW",
      date: new Date().toISOString(),
    };

    orders.push(newOrder);

    fs.writeFileSync(ordersFile, JSON.stringify(orders, null, 2));

    return NextResponse.json(newOrder);
  } catch (err) {
    return NextResponse.json({ error: "Order failed" }, { status: 500 });
  }
}
