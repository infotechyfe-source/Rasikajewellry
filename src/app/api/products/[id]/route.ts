import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// Helper to convert string to ObjectId
function toObjectId(id: string) {
  if (!ObjectId.isValid(id)) throw new Error("Invalid ID");
  return new ObjectId(id);
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } | Promise<{ id: string }> }
) {
  try {
    //  unwrap params (same as DELETE)
    const { id } = await params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({
        success: false,
        error: "Invalid ID",
      });
    }

    const client = await clientPromise;
    const db = client.db("jewellery-store");

    const data = await req.json();

    // ❌ Never allow updating _id
    delete data._id;

    const updatedProduct = await db.collection("products").findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: data },
      { returnDocument: "after" }
    );

    if (!updatedProduct) {
      return NextResponse.json({
        success: false,
        error: "Product not found",
      });
    }

    return NextResponse.json({
      success: true,
      product: {
        ...updatedProduct,
        _id: updatedProduct._id.toString(),
      },
    });
  } catch (error) {
    console.error("PUT product error:", error);
    return NextResponse.json({
      success: false,
      error: (error as Error).message,
    });
  }
}

// DELETE = delete product
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } | Promise<{ id: string }> }
) {
  try {
    // Unwrap params if it's a Promise
    const { id } = await params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: "Invalid product ID" });
    }

    const client = await clientPromise;
    const db = client.db("jewellery-store");

    const result = await db.collection("products").deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ success: false, error: "Product not found" });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE product error:", error);
    return NextResponse.json({ success: false, error: (error as Error).message });
  }
}
