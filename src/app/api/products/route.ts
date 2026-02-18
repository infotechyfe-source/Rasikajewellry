import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export async function GET() {
  try {
    // Fetch all products
    const { data: products, error } = await supabaseServer
      .from("products")
      .select("*")
      .order("id", { ascending: false }); // order by id to avoid created_at issues

    if (error) throw error;

    return NextResponse.json({
      success: true,
      products,
      currentPage: 1,
      totalPages: 1,
    });
  } catch (err) {
    console.error("GET /api/products error:", err);
    return NextResponse.json(
      { success: false, error: (err as Error).message },
      { status: 500 }
    );
  }
}

// POST a new product
export async function POST(req: Request) {
  try {
    const data = await req.json();

    const { data: insertedProduct, error } = await supabaseServer
      .from("products")
      .insert([
        {
          ...data,
          created_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({
      success: true,
      insertedId: insertedProduct.id,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({
      success: false,
      error: (err as Error).message,
    });
  }
}
