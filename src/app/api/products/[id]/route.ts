import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// PUT = update product
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const client = await clientPromise;
    const db = client.db("jewellery-store");

    const { id } = params;
    const data = await req.json();

    // Update product
    const result = await db.collection("products").findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: data },
      { returnDocument: "after" } // return updated document
    );

    if (!result.value) {
      return NextResponse.json({ success: false, error: "Product not found" });
    }

    return NextResponse.json({ success: true, product: result.value });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: (error as Error).message });
  }
}

// DELETE = delete product
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const client = await clientPromise;
    const db = client.db("jewellery-store");

    const { id } = params;

    const result = await db.collection("products").deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ success: false, error: "Product not found" });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: (error as Error).message });
  }
}
