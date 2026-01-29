import clientPromise from "@/lib/mongodb";
import { NextRequest } from "next/server";
import { ObjectId } from "mongodb";

// GET all products
export async function GET() {
  const client = await clientPromise;
  const db = client.db("rasikajewels");
  const products = await db.collection("products").find({}).toArray();
  return new Response(JSON.stringify(products), { headers: { "Content-Type": "application/json" } });
}

// POST new product
export async function POST(req: NextRequest) {
  const client = await clientPromise;
  const db = client.db("rasikajewels");
  const data = await req.json(); // { name, category, metal, price, image }
  const result = await db.collection("products").insertOne(data);
  return new Response(JSON.stringify(result), { status: 201 });
}

// PUT update product
export async function PUT(req: NextRequest) {
  const client = await clientPromise;
  const db = client.db("rasikajewels");
  const { _id, ...updates } = await req.json();
  await db.collection("products").updateOne({ _id: new ObjectId(_id) }, { $set: updates });
  return new Response(JSON.stringify({ message: "Updated" }));
}

// DELETE product
export async function DELETE(req: NextRequest) {
  const client = await clientPromise;
  const db = client.db("rasikajewels");
  const { _id } = await req.json();
  await db.collection("products").deleteOne({ _id: new ObjectId(_id) });
  return new Response(JSON.stringify({ message: "Deleted" }));
}
