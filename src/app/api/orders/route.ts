import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

/* =========================
   HELPER: VERIFY ADMIN
========================= */
async function verifyAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;

  if (!token) {
    return false;
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET as string);
    return true;
  } catch {
    return false;
  }
}

/* =========================
   GET ALL ORDERS (ADMIN ONLY)
========================= */
export async function GET() {
  try {
    const isAdmin = await verifyAdmin();

    if (!isAdmin) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const client = await clientPromise;
    const db = client.db("jewellery-store");

    const orders = await db
      .collection("orders")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    const formattedOrders = orders.map((order) => ({
      _id: order._id.toString(),
      product: order.product,
      quantity: order.quantity,
      totalPrice: order.totalPrice,
      customer: order.customer,
      status: order.status,
      createdAt: order.createdAt,
    }));

    return NextResponse.json({
      success: true,
      orders: formattedOrders,
    });

  } catch (error) {
    console.error("GET Orders Error:", error);

    return NextResponse.json(
      { success: false, error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}

/* =========================
   CREATE ORDER (PUBLIC)
========================= */
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { product, quantity, totalPrice, customer } = body;

    if (
      !product?._id ||
      !quantity ||
      !customer?.name ||
      !customer?.phone ||
      !customer?.address
    ) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("jewellery-store");

    const result = await db.collection("orders").insertOne({
      product,
      quantity: Number(quantity),
      totalPrice: Number(totalPrice),
      customer,
      status: "pending",
      createdAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      orderId: result.insertedId.toString(),
    });

  } catch (error) {
    console.error("POST Order Error:", error);

    return NextResponse.json(
      { success: false, error: "Failed to save order" },
      { status: 500 }
    );
  }
}

