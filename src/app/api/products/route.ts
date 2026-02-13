import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  const { data: products, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true,
    products,
  });
}



// POST a new product
export async function POST(req: Request) {
  try {
    const data = await req.json();

    const { data: insertedProduct, error } = await supabase
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
