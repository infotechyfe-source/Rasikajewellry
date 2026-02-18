export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const allowedStatuses = [
  "pending",
  "confirmed",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
];

/* =========================
   VERIFY ADMIN
========================= */
async function verifyAdmin() {
  const cookieStore = await cookies(); // await cookies
  const token = cookieStore.get("admin_token")?.value;

  if (!token) return false;

  try {
    jwt.verify(token, process.env.JWT_SECRET!);
    return true;
  } catch {
    return false;
  }
}

/* =========================
   PATCH ORDER STATUS
========================= */
export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> } // Must be a Promise
) {
  try {
    if (!verifyAdmin()) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await context.params; //  await the Promise

    if (!id) {
      return NextResponse.json({ success: false, error: "Order ID is required" }, { status: 400 });
    }

    const body = await req.json() as { status?: string };
    const { status } = body;

    if (!status || !allowedStatuses.includes(status)) {
      return NextResponse.json({ success: false, error: "Invalid status" }, { status: 400 });
    }

    const { data, error } = await supabaseServer
      .from("orders")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single();

    if (error) return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    if (!data) return NextResponse.json({ success: false, error: "Order not found" }, { status: 404 });

    return NextResponse.json({ success: true, message: "Order status updated successfully" });
  } catch (err) {
    console.error("PATCH Order Error:", err);
    return NextResponse.json({ success: false, error: "Failed to update status" }, { status: 500 });
  }
}

/* =========================
   DELETE ORDER
========================= */
export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> } // ✅ Must be a Promise
) {
  try {
    if (!verifyAdmin()) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await context.params; //  await the Promise

    if (!id) return NextResponse.json({ success: false, error: "Order ID is required" }, { status: 400 });

    const { error } = await supabaseServer.from("orders").delete().eq("id", id);

    if (error) return NextResponse.json({ success: false, error: error.message }, { status: 500 });

    return NextResponse.json({ success: true, message: "Order deleted successfully" });
  } catch (err) {
    console.error("DELETE Order Error:", err);
    return NextResponse.json({ success: false, error: "Failed to delete order" }, { status: 500 });
  }
}
