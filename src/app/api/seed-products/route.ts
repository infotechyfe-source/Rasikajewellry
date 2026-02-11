import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("jewellery-store");

    const earrings = [
      {
        id: 90,
        name: "Oxidised Earring",
        category: "earring",
        price: 299,
        image: "/images/ear1.jpeg",
        active: true,
      },
      {
        id: 91,
        name: "Ethnic",
        category: "earring",
        price: 79,
        image: "/images/ear2.jpeg",
        active: true,
      },
      {
        id: 92,
        name: "Punjabi Style",
        category: "earring",
        price: 99,
        image: "/images/punjabi.jpeg",
        active: true,
      },
      {
        id: 93,
        name: "Trendy",
        category: "earring",
        price: 199,
        image: "/images/ear4.jpeg",
        active: true,
      },
      {
        id: 94,
        name: "Fancy",
        category: "earring",
        price: 299,
        image: "/images/ear5.jpeg",
        active: true,
      },
      {
        id: 95,
        name: "Korean Style",
        category: "earring",
        price: 149,
        image: "/images/ear6.jpeg",
        active: true,
      },
      {
        id: 96,
        name: "Gold Style",
        category: "earring",
        price: 199,
        image: "/images/ear7.jpeg",
        active: true,
      },
    ];

    const result = await db.collection("products").insertMany(earrings);

    return NextResponse.json({
      success: true,
      insertedCount: result.insertedCount,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: (error as Error).message,
    });
  }
}
