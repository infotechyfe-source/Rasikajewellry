import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const bucket = formData.get("bucket") as string;

    if (!file || !bucket) {
      return NextResponse.json({ success: false, error: "Missing file or bucket" }, { status: 400 });
    }

    const fileExt = file.name.split(".").pop();
    const fileName = `${bucket}-${Date.now()}.${fileExt}`;

    const { error } = await supabaseServer.storage
      .from(bucket)
      .upload(fileName, file, { upsert: true });

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    const { data } = supabaseServer.storage
      .from(bucket)
      .getPublicUrl(fileName);

    return NextResponse.json({
      success: true,
      path: data.publicUrl,
    });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: "Upload failed" }, { status: 500 });
  }
}