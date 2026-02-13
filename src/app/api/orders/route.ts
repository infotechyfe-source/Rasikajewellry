import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

/* =========================
   HELPER: VERIFY ADMIN
========================= */
async function verifyAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;

  if (!token) return false;

  try {
    jwt.verify(token, process.env.JWT_SECRET as string);
    return true;
  } catch {
    return false;
  }
}

/* =========================
   GET ALL ORDERS WITH PRODUCT INFO
========================= */
export async function GET() {
  try {
    // Fetch orders
    const { data: orders, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ success: false, error: error.message });
    }

    // For each order, fetch the product details
    const ordersWithProduct = await Promise.all(
      orders.map(async (order: any) => {
        let product = null;
        if (order.product_id) {
          const { data: prodData } = await supabase
            .from("products")
            .select("*")
            .eq("id", order.product_id)
            .single();

          product = prodData || null;
        }

        return {
          ...order,
          product, // add product object directly
        };
      })
    );

    return NextResponse.json({
      success: true,
      orders: ordersWithProduct,
    });
  } catch (err) {
    console.error(err);
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

    // Fetch product info
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

    // Calculate total price
    const totalPrice = Number(product.price) * quantity;

    // Insert order
    const { data, error } = await supabase
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

    return NextResponse.json({
      success: true,
      orderId: data.id,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
