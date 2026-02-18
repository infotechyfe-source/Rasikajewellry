import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ success: false, error: "No file provided" });
  }

  const fileName = `testimonial-${Date.now()}-${file.name}`;

  const { error } = await supabaseServer.storage
    .from("testimonials")
    .upload(fileName, file, { upsert: true });

  if (error) {
    return NextResponse.json({ success: false, error: error.message });
  }

  const { data } = supabaseServer.storage
    .from("testimonials")
    .getPublicUrl(fileName);

  return NextResponse.json({
    success: true,
    publicUrl: data.publicUrl,
  });
}
