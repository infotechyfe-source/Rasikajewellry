import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { products } from "@/data/products"; // adjust path if needed

export async function POST() {
  try {
    const client = await clientPromise;
    const db = client.db("jewellery-store");

    // Optional: clear old products before seeding
    await db.collection("products").deleteMany({});

    // Insert all products
    const result = await db.collection("products").insertMany(products);

    return NextResponse.json({
      success: true,
      insertedCount: result.insertedCount,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: (error as Error).message });
  }
}
