import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// UPDATE product
export async function PUT(
  req: Request,
  { params }: { params: any } // use any to safely handle Promise
) {
  try {
    // Await params to handle Promise
    const resolvedParams = await params;
    const { id } = resolvedParams;

    const data = await req.json();

    // Never allow updating id
    delete data.id;

    const { data: updatedProduct, error } = await supabase
      .from("products")
      .update(data)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({
        success: false,
        error: error.message,
      });
    }

    if (!updatedProduct) {
      return NextResponse.json({
        success: false,
        error: "Product not found",
      });
    }

    return NextResponse.json({
      success: true,
      product: updatedProduct,
    });
  } catch (error) {
    console.error("PUT product error:", error);
    return NextResponse.json({
      success: false,
      error: (error as Error).message,
    });
  }
}

// DELETE product
export async function DELETE(
  req: Request,
  { params }: { params: any } // use any to safely handle Promise
) {
  try {
    // Await params to handle Promise
    const resolvedParams = await params;
    const { id } = resolvedParams;

    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", id);

    if (error) {
      return NextResponse.json({
        success: false,
        error: error.message,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE product error:", error);
    return NextResponse.json({
      success: false,
      error: (error as Error).message,
    });
  }
}
