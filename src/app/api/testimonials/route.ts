import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseServer = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // SERVER ONLY
);

// GET all testimonials
export async function GET() {
  const { data, error } = await supabaseServer
    .from("testimonials")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ success: false, error: error.message }, { status: 500 });

  return NextResponse.json({ success: true, testimonials: data });
}

// POST a new testimonial
export async function POST(req: Request) {
  try {
    const { name, location, message, image_url } = await req.json();

    const { data, error } = await supabaseServer
      .from("testimonials")
      .insert([{ name, location, message, image_url, created_at: new Date().toISOString() }])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, testimonial: data });
  } catch (err) {
    return NextResponse.json({ success: false, error: (err as Error).message }, { status: 500 });
  }
}

// DELETE a testimonial
export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    if (!id) throw new Error("Testimonial ID is required");

    const { error } = await supabaseServer.from("testimonials").delete().eq("id", id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ success: false, error: (err as Error).message }, { status: 500 });
  }
}
