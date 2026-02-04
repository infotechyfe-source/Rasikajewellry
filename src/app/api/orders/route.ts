import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

type Order = {
  _id?: ObjectId;
  product: string;
  amount: number;
  phone: string;
  status: "NEW" | "CONTACTED" | "CONFIRMED" | "CANCELLED";
  date: Date;
};

// ================= GET ORDERS =================
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();

    const orders = await db
      .collection<Order>("orders")
      .find({})
      .sort({ date: -1 })
      .toArray();

    return NextResponse.json(orders);
  } catch (err) {
    console.error("GET orders error:", err);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}

// ================= CREATE ORDER =================
export async function POST(req: NextRequest) {
  try {
    const { product, amount, phone } = await req.json();

    if (!product || !amount || !phone) {
      return NextResponse.json(
        { error: "Missing fields" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db();

    const newOrder: Order = {
      product,
      amount,
      phone,
      status: "NEW",
      date: new Date(),
    };

    const result = await db.collection<Order>("orders").insertOne(newOrder);

    return NextResponse.json(
      { ...newOrder, _id: result.insertedId },
      { status: 200 }
    );
  } catch (err) {
    console.error("POST order error:", err);
    return NextResponse.json(
      { error: "Order save failed" },
      { status: 500 }
    );
  }
}
