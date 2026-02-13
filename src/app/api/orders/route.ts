import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

/* =========================
   GET ALL ORDERS WITH PRODUCT INFO
========================= */
export async function GET() {
  try {
    // Fetch all orders
    const { data: orders, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ success: false, error: error.message });
    }

    // Fetch products for all orders in parallel
    const ordersWithProduct = await Promise.all(
      orders.map(async (order) => {
        if (!order.product_id) return { ...order, product: null };

        const { data: product } = await supabase
          .from("products")
          .select("*")
          .eq("id", order.product_id)
          .single();

        return { ...order, product: product || null };
      })
    );

    return NextResponse.json({ success: true, orders: ordersWithProduct });
  } catch (err) {
    console.error("GET orders error:", err);
    return NextResponse.json({
      success: false,
      error: (err as Error).message,
    });
  }
}

/* =========================
   CREATE ORDER
========================= */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { productId, quantity, customer } = body;

    if (!productId || !quantity || !customer) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Fetch product
    const { data: product, error: productError } = await supabase
      .from("products")
      .select("*")
      .eq("id", productId)
      .single();

    if (productError || !product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    const totalPrice = Number(product.price) * quantity;

    // Insert order
    const { data: orderData, error } = await supabase
      .from("orders")
      .insert([
        {
          product_id: product.id,
          quantity,
          total_price: totalPrice,
          customer_name: customer.name,
          customer_phone: customer.phone,
          customer_address: customer.address,
        },
      ])
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, orderId: orderData.id });
  } catch (err) {
    console.error("POST order error:", err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
