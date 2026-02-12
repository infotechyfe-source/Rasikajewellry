import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const page = Number(searchParams.get("page")) || 1;
  const limit = 10;
  const skip = (page - 1) * limit;

  const client = await clientPromise;
  const db = client.db("jewellery-store");

  const products = await db
    .collection("products")
    .find()
    .skip(skip)
    .limit(limit)
    .toArray();

  const total = await db.collection("products").countDocuments();

  return NextResponse.json({
    success: true,
    products: products.map(p => ({
      ...p,
      _id: p._id.toString()
    })),
     total,
    totalPages: Math.ceil(total / limit)
  });
}


// POST a new product
export async function POST(req: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("jewellery-store");

    const data = await req.json();
    const result = await db.collection("products").insertOne({
      ...data,
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true, insertedId: result.insertedId.toString() });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: (err as Error).message });
  }
}
